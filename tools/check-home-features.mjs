import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH });
const base = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4333';
const results=[];
try {
 for(const width of [390,768,1448]) for(const lang of ['fr','en','es','de','ar']) {
  const page=await browser.newPage({viewport:{width,height:1086},reducedMotion:'reduce'});
  await page.goto(`${base}/${lang}/`,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const cards=await page.locator('.tpl-feature').evaluateAll(els=>els.map(el=>{
   const card=el.getBoundingClientRect();
   const children=[...el.querySelectorAll('h2,p')];
   return {title:el.querySelector('h2')?.textContent,height:card.height,clipped:children.some(child=>{const b=child.getBoundingClientRect();return b.bottom>card.bottom+1||b.left<card.left-1||b.right>card.right+1;})};
  }));
  results.push({width,lang,cards});
  if(lang==='fr'&&width===1448) await page.screenshot({path:'visual-audit/features-desktop-20261118.png'});
  if(lang==='ar'&&width===390) await page.screenshot({path:'visual-audit/features-mobile-ar-20261118.png',fullPage:true});
  await page.close();
 }
 await writeFile('visual-audit/features-20261118.json',JSON.stringify(results,null,2)+'\n');
 const failures=results.filter(r=>r.cards.length!==3||r.cards.some(c=>c.clipped));
 console.log(JSON.stringify({renders:results.length,failures},null,2));
 if(failures.length) process.exitCode=1;
} finally {await browser.close();}
