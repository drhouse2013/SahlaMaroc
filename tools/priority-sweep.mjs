import {chromium} from '@playwright/test';
import {readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
const base='http://127.0.0.1:4333';
async function scan(dir='dist'){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await scan(p));else if(e.name==='index.html')out.push('/'+path.relative('dist',path.dirname(p)).replaceAll('\\','/')+'/');}return out;}
const all=await scan();
const paths=['/fr/','/en/','/ar/','/fr/villes/','/fr/regions/','/fr/guides/','/fr/visiter-le-maroc/','/ar/mudun/','/en/cities/','/fr/villes/marrakech/','/fr/villes/essaouira/','/ar/abbara-ila-al-maghrib-dalil/'].filter(x=>all.includes(x));
const b=await chromium.launch({executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH});const out=[];
try{const p=await b.newPage();for(const url of paths){for(const width of [390,1448]){await p.setViewportSize({width,height:900});await p.addInitScript(()=>localStorage.setItem('sahla-theme-preference','light'));const resp=await p.goto(base+url,{waitUntil:'domcontentloaded',timeout:12000});const r=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+2,title:document.title,imgBroken:[...document.images].filter(i=>i.complete&&i.currentSrc&&!i.naturalWidth).map(i=>i.currentSrc)}));out.push({url,width,status:resp?.status(),...r});}}await writeFile('visual-audit/priority-sweep-20261118.json',JSON.stringify(out,null,2)+'\n');console.log(JSON.stringify(out,null,2));}finally{await b.close()}
