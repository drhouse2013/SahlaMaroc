import {test,expect} from '@playwright/test';
import {readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';

const langs=['fr','en','es','de','ar'];
const widths=[360,390,430,768,901,950,1024,1080,1081,1320,1321,1366,1440,1920];
const ferryRoutes=Object.fromEntries(langs.map(lang=>{
 const dir=path.join('src/content/pages',lang);
 const file=readdirSync(dir).find(file=>/\.mdx?$/.test(file)&&/translationKey:\s*["']calc-ferry-compare["']/.test(readFileSync(path.join(dir,file),'utf8')));
 const slug=readFileSync(path.join(dir,file),'utf8').match(/^slug:\s*["']([^"']+)/m)[1];
 return[lang,`/${lang}/${slug}`];
}));

for(const lang of langs){
 test(`header ${lang}: intermediate widths, menus and themes`,async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`/${lang}`);await page.evaluate(()=>document.fonts.ready);
  for(const theme of ['light','dark']){
   await page.evaluate(theme=>document.dispatchEvent(new CustomEvent('sahla:theme-change',{detail:theme})),theme);
   await expect(page.locator('html')).toHaveAttribute('data-theme-preference',theme);
   for(const width of widths){
    await page.setViewportSize({width,height:1000});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),{message:`${lang} ${theme} ${width}: horizontal overflow`}).toBeLessThanOrEqual(1);
    const bounds=await page.locator('.tpl-controls').evaluate(e=>({left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right}));
    expect(bounds.left).toBeGreaterThanOrEqual(-1);expect(bounds.right).toBeLessThanOrEqual(width+1);
    const summary=await page.locator('.tpl-nav').isVisible()?page.locator('.tpl-nav details > summary').first():page.locator('.tpl-burger-wrap > summary');
    await expect(summary).toBeVisible();
    await summary.focus();await page.keyboard.press('Enter');
    await expect(summary.locator('..')).toHaveAttribute('open','');
    await page.keyboard.press('Escape');await expect(summary.locator('..')).not.toHaveAttribute('open','');
    if(theme==='light'&&process.env.SAHLA_REVIEW_OUTPUT&&((lang==='fr'&&[1024,1366].includes(width))||(lang==='de'&&width===1024))){
     await page.evaluate(()=>Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,3000))]));
     await page.screenshot({path:path.join(process.env.SAHLA_REVIEW_OUTPUT,`apres-${lang}-${width}.png`),animations:'disabled'});
    }
   }
  }
  expect(errors).toEqual([]);
 });

 test(`ferries ${lang}: keyboard region, filters and specific notice`,async({page})=>{
  await page.setViewportSize({width:390,height:1000});await page.goto(ferryRoutes[lang]);
  const ui=JSON.parse(readFileSync(`src/i18n/ui/${lang}.json`,'utf8'));
  const region=page.getByRole('table',{name:ui['calc.ferryTable']});
  await expect(region).toBeVisible();await region.focus();await expect(region).toBeFocused();
  expect(await region.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  const canScroll=await region.evaluate(e=>e.scrollWidth>e.clientWidth);
  if(canScroll){await region.press(lang==='ar'?'ArrowLeft':'ArrowRight');await expect.poll(()=>region.evaluate(e=>Math.abs(e.scrollLeft))).toBeGreaterThan(0)}
  const notice=page.locator('.alert-warn').filter({hasText:ui['calc.ferryDisclaimer']});
  await expect(notice).toHaveCount(1);await expect(notice).not.toContainText(ui['calc.disclaimer']);
  const origin=page.locator('[data-ferry] select[name=origin]');
  const rows=page.locator('[data-ferry] tbody').first().locator('tr');
  const original=await rows.filter({visible:true}).count();
  await origin.selectOption('es');
  const visible=rows.filter({visible:true});await expect(visible.first()).toBeVisible();
  expect(await visible.evaluateAll(es=>es.every(e=>e.dataset.origin==='es'))).toBe(true);
  await origin.selectOption('');await expect(rows.filter({visible:true})).toHaveCount(original);
  await page.setViewportSize({width:1440,height:1000});await expect(region).toBeVisible();
 });
}

test('financial tools keep their existing warning',async({page})=>{
 const ui=JSON.parse(readFileSync('src/i18n/ui/fr.json','utf8'));
 await page.goto('/fr/convertisseur-euro-dirham');
 await expect(page.locator('.alert-warn').filter({hasText:ui['calc.disclaimer']})).toHaveCount(1);
 await expect(page.locator('.alert-warn').filter({hasText:ui['calc.ferryDisclaimer']})).toHaveCount(0);
});
