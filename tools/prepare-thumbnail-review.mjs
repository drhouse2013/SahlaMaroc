import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { createJiti } from 'jiti';
const { isVerified } = await createJiti(import.meta.url).import('../src/utils/photoStatus.ts');
const group=process.argv[2]??'spots';
if(!['spots','cities','regions'].includes(group)) throw new Error('Groupe attendu : spots, cities ou regions');
const root=process.cwd();
const out=path.resolve(root,`../../outputs/miniatures-revue${group==='spots'?'':'-'+group}`);
await fs.mkdir(out,{recursive:true});
const manifest=JSON.parse(await fs.readFile(`src/assets/photos/${group}/manifest.json`,'utf8'));
const entries=Object.entries(manifest).filter(([,v])=>isVerified(v));
const boards=[];
for(let offset=0;offset<entries.length;offset+=12){
 const layers=[];
 const batch=entries.slice(offset,offset+12);
 for(let i=0;i<batch.length;i++){
  const [id,v]=batch[i]; const [x,y]=v.focalPoint??[50,50];
  const gravity=((y<33?'north':y>67?'south':'')+(x<33?'west':x>67?'east':''))||'centre';
  const tile=await sharp(path.join(`src/assets/photos/${group}`,v.file)).rotate().resize(320,240,{fit:'cover',position:gravity}).toBuffer();
  const left=(i%3)*340+10,top=Math.floor(i/3)*280+10;
  layers.push({input:tile,left,top});
  const safe=id.replaceAll('&','&amp;').replaceAll('<','&lt;');
  layers.push({input:Buffer.from(`<svg width="320" height="30"><text x="2" y="20" font-size="12" fill="white">${safe}</text></svg>`),left,top:top+240});
 }
 const filename=`planche-${String(boards.length+1).padStart(2,'0')}.jpg`;
 await sharp({create:{width:1020,height:1120,channels:3,background:'#172322'}}).composite(layers).jpeg({quality:88}).toFile(path.join(out,filename));
 boards.push({file:filename,places:batch.map(([id])=>id)});
}
await fs.writeFile(path.join(out,'index.json'),JSON.stringify(boards,null,2));
console.log(`${entries.length} miniatures préparées dans ${boards.length} planches : ${out}`);
