import { chromium } from "playwright";
/**
 * Measures what the browser ACTUALLY renders, at fourteen viewport sizes and
 * every level, and fails on any overlap.
 *
 * This exists because the unit tests passed for days while the live page was
 * visibly colliding. They checked the model; the model and the CSS had drifted
 * apart, and only a real layout could tell me. Run it against a dev server:
 *
 *   PORT=3000 node scripts/overlap.mjs
 *
 * CHROME points at whatever Playwright build is installed locally.
 */
const C = process.env.CHROME ?? "";
const PORT = Number(process.env.PORT ?? 3000);
const SIZES=[[1920,1080],[1600,900],[1440,900],[1280,800],[1024,768],[900,900],[834,1112],[768,1024],[600,900],[430,932],[390,844],[360,780],[1280,600],[1440,700]];
const LEVELS=["","#falls","#guitar","#tennis","#camera","#working"];
const b = await chromium.launch(C ? { executablePath: C } : {});
const bad=[];
for (const [w,h] of SIZES) {
  const p=await b.newPage({viewport:{width:w,height:h}});
  for (const lv of LEVELS) {
    await p.goto(`http://localhost:${PORT}/${lv}`,{waitUntil:"domcontentloaded"});
    await p.waitForTimeout(1500);
    const hits=await p.evaluate(() => {
      const vis=[...document.querySelectorAll('.mark')].filter(e=>+getComputedStyle(e).opacity>0.05);
      const R=e=>{const r=e.getBoundingClientRect();return {n:e.dataset.mark||e.className,x:r.x,y:r.y,r:r.right,b:r.bottom,w:r.width,h:r.height};};
      const boxes=vis.map(R), out=[];
      for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){
        const a=boxes[i],c=boxes[j];
        const ox=Math.min(a.r,c.r)-Math.max(a.x,c.x), oy=Math.min(a.b,c.b)-Math.max(a.y,c.y);
        if(ox>2&&oy>2) out.push(`${a.n}~${c.n} ${Math.round(Math.min(ox,oy))}px`);
      }
      // Chrome vs the fixed bar / header.
      const bar=document.querySelector('.bar')?.getBoundingClientRect();
      const tags=[...document.querySelectorAll('.tags .tag')].filter(e=>+getComputedStyle(e).opacity>0.05);
      for(const t of tags){const r=t.getBoundingClientRect();
        if(bar&&r.bottom>bar.top+2&&r.right>bar.left&&r.left<bar.right) out.push(`TAG:${t.textContent}~bar`);
        if(r.bottom>innerHeight||r.right>innerWidth||r.left<0) out.push(`TAG:${t.textContent}~offscreen`);
      }
      for(const m of boxes){ if(m.x<-2||m.y<-2||m.r>innerWidth+2||m.b>innerHeight+2) out.push(`${m.n}~offscreen`); }
      return out;
    });
    if (hits.length) bad.push(`${w}x${h} ${lv||"far"}: ${hits.slice(0,6).join(" | ")}`);
  }
  await p.close();
}
console.log(bad.length? bad.join("\n") : "CLEAN at every size and level");
console.log("---total problem combos:", bad.length, "of", SIZES.length*LEVELS.length);
process.exit(bad.length ? 1 : 0);
await b.close();
