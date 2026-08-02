// ===================================================
// Maneswar & Sameera — Wedding Invitation
// ===================================================

const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
const lerp = (a,b,t)=>a+(b-a)*t;
const smooth = t=>t*t*(3-2*t);

/* ---------------- EVENT DATA ---------------- */
const EVENTS = [
  {
    te:"వధువు ముచ్చట", en:"Pellikoduku & Vodugu",
    note:"The groom's traditional rituals begin here — where it all starts for Maneswar.",
    date:"Saturday, 22 August 2026", time:"",
    venue:"RVS Royale", address:"Pulaganipalem, Pendurthi Road, Visakhapatnam, Andhra Pradesh 531173",
    mapQuery:"RVS Royale, Pulaganipalem, Pendurthi Road, Visakhapatnam",
    accent:"#8A5F33", motif:"thread"
  },
  {
    te:"పసుపు కుంకుమ", en:"Haldi, Mehendi & Sangeet",
    note:"Turmeric, henna, and music that runs late.",
    date:"Wednesday, 26 August 2026", time:"",
    venue:"Aura The Luxuria", address:"Chakradwarabandham, Divancheruvu, Rajahmundry, Andhra Pradesh 533296",
    mapQuery:"Aura The Luxuria, Rajahmundry",
    accent:"#8F6414", motif:"henna"
  },
  {
    te:"వివాహ మహోత్సవం", en:"The Wedding",
    note:"The muhurtham. Please be seated by 10:45 — this one waits for nobody.",
    date:"Thursday, 27 August 2026", time:"11:06 AM",
    venue:"Manjeera International Convention Centre", address:"College Road, Suviseshapuram, Rajamahendravaram, Andhra Pradesh 533105",
    mapQuery:"Manjeera International Convention Centre, Rajamahendravaram",
    accent:"#B01B33", motif:"kalasam"
  }
];
const MUHURTHAM = new Date("2026-08-27T11:06:00+05:30");
const MUSIC_URL = "song.mp3";

/* ---------------- THORANAM: mango leaves on a string ---------------- */
(function thoranam(){
  const svg = document.getElementById("thoranam");
  const W=1200, parts=[];
  parts.push(`<path d="M0 6 Q 300 26 600 6 T 1200 6" fill="none" stroke="rgba(140,94,20,.45)" stroke-width="1"/>`);
  for(let i=0;i<=48;i++){
    const x=(i/48)*W, t=x/W;
    const y=6+Math.sin(t*Math.PI*2)*10+(t<.5? t*2*10 : (1-t)*2*10);
    const h=16+(i%3)*5, tilt=(i%2?6:-6);
    parts.push(`<path d="M${x} ${y} q ${tilt} ${h*0.5} 0 ${h} q ${-tilt} ${-h*0.5} 0 ${-h} Z" fill="rgba(46,125,91,.55)" stroke="rgba(46,125,91,.85)" stroke-width=".6"/>`);
    if(i%6===0) parts.push(`<circle cx="${x}" cy="${y+h+5}" r="2.4" fill="rgba(196,30,58,.7)"/>`);
  }
  svg.innerHTML = parts.join("");
})();

/* ---------------- MUGGU: a rangoli that draws itself ---------------- */
(function muggu(){
  const svg=document.getElementById("muggu");
  if(!svg) return;
  const C=200, inner=[], outer=[];
  const P=(buf,d,w=1)=>buf.push(`<path d="${d}" stroke-width="${w}"/>`);

  for(let r=1;r<=5;r++){
    const n=r*6, rad=r*26;
    for(let i=0;i<n;i++){
      const a=(i/n)*Math.PI*2;
      inner.push(`<circle class="dot" cx="${(C+Math.cos(a)*rad).toFixed(1)}" cy="${(C+Math.sin(a)*rad).toFixed(1)}" r="1.1"/>`);
    }
  }
  for(let i=0;i<8;i++){
    const a=(i/8)*Math.PI*2;
    const x=C+Math.cos(a)*30, y=C+Math.sin(a)*30;
    const cx1=C+Math.cos(a-.42)*54, cy1=C+Math.sin(a-.42)*54;
    const cx2=C+Math.cos(a+.42)*54, cy2=C+Math.sin(a+.42)*54;
    P(inner,`M${C} ${C} Q${cx1.toFixed(1)} ${cy1.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)} Q${cx2.toFixed(1)} ${cy2.toFixed(1)} ${C} ${C} Z`,1.2);
  }
  for(let ring=0;ring<2;ring++){
    const n=8+ring*8, rad=78+ring*46, amp=20+ring*8;
    let d="";
    for(let i=0;i<=n;i++){
      const a=(i/n)*Math.PI*2, rr=rad+(i%2?amp:-amp);
      const x=C+Math.cos(a)*rr, y=C+Math.sin(a)*rr;
      d += (i? " Q"+(C+Math.cos(a-Math.PI/n)*(rad+amp*1.5)).toFixed(1)+" "+(C+Math.sin(a-Math.PI/n)*(rad+amp*1.5)).toFixed(1)+" ":"M")+x.toFixed(1)+" "+y.toFixed(1);
    }
    P(outer,d+" Z",1);
  }
  outer.push(`<circle cx="${C}" cy="${C}" r="176" stroke-width=".8"/>`);
  outer.push(`<circle cx="${C}" cy="${C}" r="184" stroke-width=".5"/>`);
  for(let i=0;i<24;i++){
    const a=(i/24)*Math.PI*2;
    outer.push(`<circle class="dot" cx="${(C+Math.cos(a)*180).toFixed(1)}" cy="${(C+Math.sin(a)*180).toFixed(1)}" r="1.4"/>`);
  }
  svg.innerHTML = `<g class="spin-r">${inner.join("")}</g><g class="spin">${outer.join("")}</g>`;

  const paths=[...svg.querySelectorAll("path, circle:not(.dot)")];
  paths.forEach((p,i)=>{
    const len = p.getTotalLength ? p.getTotalLength() : 1200;
    p.style.strokeDasharray=len;
    p.style.strokeDashoffset=RM?0:len;
    if(!RM){
      p.style.transition=`stroke-dashoffset 2.6s cubic-bezier(.22,.61,.36,1) ${1.75+i*0.05}s`;
      requestAnimationFrame(()=>requestAnimationFrame(()=>{p.style.strokeDashoffset=0}));
    }
  });
  const dots=[...svg.querySelectorAll(".dot")];
  dots.forEach((d,i)=>{
    d.style.opacity=RM?1:0;
    if(!RM){
      d.style.transition=`opacity .8s ease ${1.8+i*0.009}s`;
      requestAnimationFrame(()=>requestAnimationFrame(()=>{d.style.opacity=1}));
    }
  });
})();

/* ---------------- NAMES, letter by letter ---------------- */
(function letters(){
  const h=document.getElementById("names");
  if(!h) return;
  h.querySelectorAll("[data-t]").forEach(sp=>{
    const words=sp.dataset.t.split(" ");
    sp.textContent="";
    words.forEach((w,wi)=>{
      const wrap=document.createElement("span");
      [...w].forEach(c=>{
        const s=document.createElement("span");
        s.className="ltr"; s.textContent=c;
        wrap.appendChild(s);
      });
      sp.appendChild(wrap);
      if(wi<words.length-1) sp.appendChild(document.createElement("br"));
    });
  });
  [...h.querySelectorAll(".ltr")].forEach((l,i)=>{
    l.style.transitionDelay=(1.75+i*0.05).toFixed(2)+"s";
  });
})();

/* ---------------- TERA — part the curtain ---------------- */
(function tera(){
  const el=document.getElementById("tera");
  const names=document.getElementById("names");
  const hero=document.getElementById("heroArt");
  const lightUp=()=>{ names&&names.classList.add("lit"); hero&&hero.classList.add("lit"); };
  if(!el){ lightUp(); return; }
  if(RM){ el.classList.add("gone"); lightUp(); return; }

  document.body.classList.add("locked");
  let opened=false;
  function open(){
    if(opened) return; opened=true;
    el.classList.add("open");
    document.body.classList.remove("locked");
    lightUp();
    setTimeout(()=>el.classList.add("gone"),1800);
  }
  const t=setTimeout(open,1500);
  el.addEventListener("click",()=>{clearTimeout(t);open();});
})();

/* ---------------- VERSE, line by line ---------------- */
document.querySelectorAll(".verse").forEach(v=>{
  v.innerHTML = v.innerHTML.split(/<br\s*\/?>/i)
    .map((l,i)=>`<span class="vline" style="transition-delay:${(0.06+i*0.13).toFixed(2)}s">${l}</span>`)
    .join("");
});

/* ---------------- EVENTS render ---------------- */
const MOTIFS = {
  thread:`<path d="M20 130 C 60 60, 140 60, 180 130"/><path d="M20 130 C 60 200, 140 200, 180 130"/><circle cx="100" cy="130" r="7"/><path d="M100 20 v 40"/><path d="M80 46 h40"/><circle cx="100" cy="14" r="6"/>`,
  henna:`<path d="M100 190 C 100 140, 60 130, 60 90 C 60 55, 100 45, 100 20 C 100 45, 140 55, 140 90 C 140 130, 100 140, 100 190"/><path d="M100 160 c -22 -6 -32 -22 -30 -40"/><path d="M100 160 c 22 -6 32 -22 30 -40"/><circle cx="100" cy="70" r="5"/>`,
  kalasam:`<path d="M62 96 q38 -34 76 0 q6 60 -38 92 q-44 -32 -38 -92"/><path d="M56 92 h88"/><path d="M74 92 q26 -20 52 0"/><path d="M100 74 c -22 -6 -30 -26 -18 -40 c 4 16 12 22 18 24 c 6 -2 14 -8 18 -24 c 12 14 4 34 -18 40"/><circle cx="100" cy="60" r="4"/>`
};
const PIN=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`;
const MAPQ = e => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}`;

const evList = document.getElementById("ev-list");
if(evList){
  evList.innerHTML = EVENTS.map((e,i)=>`
    <article class="event rv" style="--accent:${e.accent}" data-ev="${i}">
      <svg class="motif" viewBox="0 0 200 200" aria-hidden="true">${MOTIFS[e.motif]}</svg>
      <div class="ev-body">
        <p class="ev-no">Event ${["one","two","three"][i]}</p>
        <h3 class="te">${e.te}</h3>
        <p class="en">${e.en}</p>
        <div class="ev-meta">
          <div><span>Date</span><strong>${e.date}</strong></div>
          ${e.time?`<div><span>Time</span><strong>${e.time}</strong></div>`:""}
          <div><span>Venue</span><strong>${e.venue}</strong></div>
          <div><span>Address</span><em>${e.address}</em></div>
        </div>
        <p style="color:var(--fg-soft);font-size:.9rem;margin:0 0 1.4rem">${e.note}</p>
        <div class="acts">
          <a class="btn solid" href="${MAPQ(e)}" target="_blank" rel="noopener">${PIN} Get Directions</a>
        </div>
      </div>
    </article>
  `).join("");
}

/* ---------------- COUNTDOWN ---------------- */
(function countdown(){
  const $=id=>document.getElementById(id);
  const el={d:$("cd-days"),h:$("cd-hours"),m:$("cd-mins"),s:$("cd-secs")};
  if(!el.d) return;
  const pad=n=>String(n).padStart(2,"0");
  function tick(){
    let ms = MUHURTHAM - Date.now();
    if(ms<0) ms=0;
    const s=Math.floor(ms/1000);
    el.d.textContent=pad(Math.floor(s/86400));
    el.h.textContent=pad(Math.floor(s/3600)%24);
    el.m.textContent=pad(Math.floor(s/60)%60);
    el.s.textContent=pad(s%60);
  }
  tick();
  setInterval(tick,1000);
})();

/* ---------------- NAVBAR + LIGHTBOX + MOBILE NAV ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(navbar){
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));
  }
  if(navToggle && navLinks){
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }
});

/* ---------------- PHOTO BLEND injection ---------------- */
(function photos(){
  const put=(hostId, src, alt, cut)=>{
    const host=document.getElementById(hostId);
    if(!host || !src) return;
    const slot=host.querySelector(".blend");
    if(!slot) return;
    if(cut) slot.classList.add("cut");
    const i=new Image();
    i.src=src; i.alt=alt; i.loading="lazy";
    slot.appendChild(i);
  };
  const ALT="Maneswar and Sameera";
  put("heroArt","assets/img/cutouts/red-backdrop-cutout.png",ALT,true);
  put("midArt","assets/img/candid-laugh.jpg",ALT,false);
  put("bandFig","assets/img/bench-wide.jpg",ALT,false);
  put("closeArt","assets/img/hero-traditional.jpg",ALT,false);
})();

/* ---------------- HERO parallax (desktop pointer only) ---------------- */
(function heroParallax(){
  if(RM || !matchMedia("(pointer:fine)").matches) return;
  const hero=document.querySelector(".hero");
  const art=document.getElementById("heroArt");
  const photo=art ? art.querySelector(".blend") : null;
  const muggu=document.getElementById("muggu");
  if(!hero || !art) return;
  let tx=0,ty=0,qx=0,qy=0;
  hero.addEventListener("mousemove", e=>{
    const r=hero.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5)*2;
    ty=((e.clientY-r.top)/r.height-.5)*2;
  });
  hero.addEventListener("mouseleave", ()=>{ tx=0; ty=0; });
  function tick(){
    qx=lerp(qx,tx,.06); qy=lerp(qy,ty,.06);
    if(photo) photo.style.transform = `translate3d(${(qx*9).toFixed(2)}px,${(qy*7).toFixed(2)}px,0)`;
    if(muggu) muggu.style.transform = `translate3d(${(qx*-6).toFixed(2)}px,${(qy*-6).toFixed(2)}px,0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ---------------- REVEALS + THREAD GROWTH + EVENT LIGHTING ---------------- */
(function(){
  const io=new IntersectionObserver(en=>{
    en.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
  },{rootMargin:"0px 0px -12% 0px",threshold:.08});
  document.querySelectorAll(".rv, .ch").forEach(n=>io.observe(n));

  const lit=new IntersectionObserver(en=>{
    en.forEach(e=>e.target.classList.toggle("lit",e.isIntersecting));
  },{threshold:.35});
  document.querySelectorAll(".event").forEach(n=>lit.observe(n));
})();

/* ---------------- SCROLL CHOREOGRAPHY ---------------- */
let SCROLL=0, DAY=0;
const thread = document.getElementById("thread");
const bar = document.getElementById("prog");

function onScroll(){
  const max = document.documentElement.scrollHeight - innerHeight;
  SCROLL = max>0 ? clamp(scrollY/max,0,1) : 0;
  DAY = smooth(clamp((SCROLL-0.30)/0.55,0,1));
  if(bar) bar.style.transform = `scaleX(${SCROLL.toFixed(4)})`;
  if(thread){
    const r = thread.getBoundingClientRect();
    const g = clamp((innerHeight*0.72 - r.top)/(r.height*0.9),0,1);
    thread.style.setProperty("--grow",(g*100).toFixed(1)+"%");
  }
}
if(!RM){
  addEventListener("scroll", onScroll, {passive:true});
  addEventListener("resize", onScroll);
}
onScroll();

/* ---------------- SKY: canvas atmosphere ---------------- */
(function sky(){
  const cv=document.getElementById("sky");
  if(!cv) return;
  const cx=cv.getContext("2d",{alpha:false});
  let W=0,H=0,DPR=1,parts=[],running=true;

  const NIGHT=[[253,248,239],[248,238,220],[240,224,196]];
  const MORN =[[252,244,228],[246,228,196],[233,203,152]];
  function mix(a,b,t){return `rgb(${Math.round(lerp(a[0],b[0],t))},${Math.round(lerp(a[1],b[1],t))},${Math.round(lerp(a[2],b[2],t))})`}

  let orb=null;
  function makeOrb(){
    const s=128, c=document.createElement("canvas"); c.width=c.height=s;
    const g=c.getContext("2d");
    const rg=g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
    rg.addColorStop(0,"rgba(226,174,86,1)");
    rg.addColorStop(.34,"rgba(214,150,66,.45)");
    rg.addColorStop(1,"rgba(200,132,52,0)");
    g.fillStyle=rg; g.fillRect(0,0,s,s);
    orb=c;
  }
  function resize(){
    DPR=Math.min(devicePixelRatio||1,2);
    W=cv.width=Math.floor(innerWidth*DPR);
    H=cv.height=Math.floor(innerHeight*DPR);
    cv.style.width=innerWidth+"px"; cv.style.height=innerHeight+"px";
    if(!orb) makeOrb();
    seed();
  }
  const KINDS=["dust","petal","rice","spark","bokeh","diya"];
  function recipe(p){
    if(p<0.20) return {dust:.34,petal:.10,rice:0,spark:0,bokeh:.34,diya:.22,n:isMobile?46:80};
    if(p<0.45) return {dust:.18,petal:.40,rice:0,spark:0,bokeh:.22,diya:.10,n:isMobile?52:92};
    if(p<0.65) return {dust:.14,petal:.14,rice:0,spark:.24,bokeh:.18,diya:.30,n:isMobile?52:94};
    if(p<0.88) return {dust:.10,petal:.20,rice:.20,spark:.06,bokeh:.18,diya:.12,n:isMobile?56:100};
    return {dust:.04,petal:.08,rice:.56,spark:.08,bokeh:.14,diya:0,n:isMobile?66:150};
  }
  function pick(r){ const x=Math.random(); let a=0; for(const k of KINDS){ a+=r[k]||0; if(x<=a) return k; } return "dust"; }
  function make(r,fresh){
    const t=pick(r);
    const rises = t==="spark"||t==="diya"||t==="bokeh";
    let rad;
    if(t==="bokeh") rad=(13+Math.random()*30);
    else if(t==="diya") rad=(2.4+Math.random()*2.2);
    else if(t==="rice") rad=(1.6+Math.random()*1.6);
    else if(t==="petal") rad=(2.4+Math.random()*3.4);
    else rad=(1+Math.random()*1.6);
    return {
      t, x:Math.random()*W, y:fresh?Math.random()*H:(rises?H+40:-30),
      z:.4+Math.random()*.9,
      vx:(Math.random()-.5)*(t==="bokeh"?.12:.28)*DPR,
      vy:(rises?-(t==="bokeh"?.05+Math.random()*.10:.22+Math.random()*.46):(.14+Math.random()*.55))*DPR,
      r:rad*DPR, a:Math.random()*Math.PI*2, sp:(Math.random()-.5)*.045,
      fl:Math.random()*6.283, o:t==="bokeh"?(.05+Math.random()*.10):(.34+Math.random()*.60)
    };
  }
  function seed(){ const r=recipe(SCROLL); parts=Array.from({length:r.n},()=>make(r,true)); }

  let bursts=[], nextBurst=90;
  function burst(x,y){
    const n=12+Math.floor(Math.random()*8);
    for(let i=0;i<n;i++){
      const a=Math.random()*6.283, sp=(.5+Math.random()*2)*DPR;
      bursts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r:(.9+Math.random()*1.4)*DPR,life:1});
    }
  }

  let last=performance.now(), acc=0;
  function frame(now){
    if(!running) return;
    const dt=Math.min((now-last)/16.67,3); last=now;
    const r=recipe(SCROLL);
    const fade=1-DAY*.42;

    acc+=dt;
    if(acc>6){
      acc=0;
      if(parts.length<r.n) parts.push(make(r,false));
      else if(parts.length>r.n+12) parts.splice(0,1);
    }

    const g=cx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,mix(NIGHT[0],MORN[0],DAY));
    g.addColorStop(.55,mix(NIGHT[1],MORN[1],DAY));
    g.addColorStop(1,mix(NIGHT[2],MORN[2],DAY));
    cx.fillStyle=g; cx.fillRect(0,0,W,H);

    if(DAY>0.02){
      const gr=cx.createRadialGradient(W*.5,H*(1.12-DAY*.42),0,W*.5,H*(1.12-DAY*.42),H*.95);
      gr.addColorStop(0,`rgba(233,178,84,${.22*DAY})`);
      gr.addColorStop(.4,`rgba(214,132,64,${.10*DAY})`);
      gr.addColorStop(1,"rgba(0,0,0,0)");
      cx.fillStyle=gr; cx.fillRect(0,0,W,H);
    }

    cx.globalCompositeOperation="source-over";
    for(let i=0;i<parts.length;i++){
      const p=parts[i];
      p.x+=p.vx*p.z*dt + Math.sin((p.y+p.a*40)/220)*.22*dt*DPR;
      p.y+=p.vy*p.z*dt;
      p.a+=p.sp*dt;
      cx.globalAlpha=p.o*p.z*fade;

      if(p.t==="bokeh"){
        cx.globalAlpha=p.o*fade*(.75+Math.sin(now*.001+p.fl)*.25);
        cx.drawImage(orb,p.x-p.r,p.y-p.r,p.r*2,p.r*2);
      }else if(p.t==="diya"){
        const fl=.78+Math.sin(now*.005+p.fl)*.22;
        const gr=p.r*5.5*fl;
        cx.globalAlpha=p.o*p.z*fade*.5;
        cx.drawImage(orb,p.x-gr,p.y-gr,gr*2,gr*2);
        cx.globalAlpha=p.o*p.z*fade;
        cx.fillStyle="#E08A28";
        cx.beginPath(); cx.ellipse(p.x,p.y,p.r*.5,p.r*fl,0,0,6.283); cx.fill();
      }else if(p.t==="dust"){
        cx.fillStyle="#C08A22";
        cx.beginPath(); cx.arc(p.x,p.y,p.r*.6,0,6.283); cx.fill();
      }else if(p.t==="petal"){
        cx.save(); cx.translate(p.x,p.y); cx.rotate(p.a);
        cx.fillStyle="rgba(226,142,150,.62)";
        cx.beginPath(); cx.ellipse(0,0,p.r,p.r*.46,0,0,6.283); cx.fill();
        cx.restore();
      }else if(p.t==="rice"){
        cx.save(); cx.translate(p.x,p.y); cx.rotate(p.a);
        cx.fillStyle="#D9A32C";
        cx.beginPath(); cx.ellipse(0,0,p.r*.42,p.r,0,0,6.283); cx.fill();
        cx.restore();
      }else{
        cx.fillStyle="#D68A2E";
        cx.beginPath(); cx.arc(p.x,p.y,p.r*.5,0,6.283); cx.fill();
        cx.globalAlpha=p.o*.16*fade;
        cx.beginPath(); cx.arc(p.x,p.y,p.r*2.6,0,6.283); cx.fill();
      }
      if(p.y>H+80||p.y<-90||p.x<-80||p.x>W+80) parts[i]=make(r,false);
    }

    nextBurst-=dt;
    if(nextBurst<=0){
      burst(W*(.15+Math.random()*.7), H*(.12+Math.random()*.55));
      nextBurst=130+Math.random()*210;
    }
    for(let i=bursts.length-1;i>=0;i--){
      const s=bursts[i];
      s.x+=s.vx*dt; s.y+=s.vy*dt; s.vy+=.028*dt*DPR; s.vx*=Math.pow(.985,dt);
      s.life-=.011*dt;
      if(s.life<=0){ bursts.splice(i,1); continue; }
      cx.globalAlpha=s.life*s.life*.85*fade;
      cx.fillStyle="#C9962F";
      cx.beginPath(); cx.arc(s.x,s.y,s.r,0,6.283); cx.fill();
      cx.globalAlpha=s.life*s.life*.12*fade;
      cx.beginPath(); cx.arc(s.x,s.y,s.r*4,0,6.283); cx.fill();
    }
    cx.globalAlpha=1;
    requestAnimationFrame(frame);
  }

  const isMobile = innerWidth < 700;
  addEventListener("resize",resize);
  document.addEventListener("visibilitychange",()=>{
    running=!document.hidden;
    if(running){ last=performance.now(); requestAnimationFrame(frame); }
  });
  resize();
  if(RM){
    const g=cx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"#FDF8EF"); g.addColorStop(1,"#F0E0C4");
    cx.fillStyle=g; cx.fillRect(0,0,W,H);
  }else{
    requestAnimationFrame(frame);
  }
})();

/* ---------------- MUSIC toggle: gentle generative ambience ---------------- */
(function music(){
  const btn=document.getElementById("music");
  if(!btn) return;
  let on=false, ctx=null, bus=null, timer=null, audio=null;

  const BPM=70, BEAT=60/BPM, BAR=BEAT*4;
  const F=s=>220*Math.pow(2,s/12);
  const PAD=[[0,3,7,12],[-4,0,3,8],[-9,-5,-2,3],[-2,2,5,10]];

  function reverb(){
    const len=ctx.sampleRate*2.4, b=ctx.createBuffer(2,len,ctx.sampleRate);
    for(let c=0;c<2;c++){
      const d=b.getChannelData(c);
      for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6);
    }
    const cv=ctx.createConvolver(); cv.buffer=b; return cv;
  }
  function voice(t,freq,dur,vol,type,atk,cut){
    const o=ctx.createOscillator(), g=ctx.createGain(), f=ctx.createBiquadFilter();
    o.type=type; o.frequency.value=freq;
    f.type="lowpass"; f.frequency.value=cut;
    g.gain.setValueAtTime(.0001,t);
    g.gain.exponentialRampToValueAtTime(vol,t+atk);
    g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(f); f.connect(g); g.connect(bus);
    o.start(t); o.stop(t+dur+.06);
  }
  let bar=0, next=0;
  function scheduleBar(t,n){
    const i=n%4;
    PAD[i].forEach(s=>voice(t,F(s),BAR*1.1,.026,"sine",1.0,900));
    voice(t,F(PAD[i][0]-12),BEAT*3.6,.07,"sine",.05,420);
    PAD[i].forEach((s,k)=>voice(t+BEAT*(k*0.6+0.4),F(s+12),1.4,.024,"triangle",.02,2400));
  }
  function loop(){ while(next<ctx.currentTime+0.6){ scheduleBar(next,bar); next+=BAR; bar++; } }

  let useFile=!!MUSIC_URL, fade=null;
  function fadeAudio(to,done){
    clearInterval(fade);
    fade=setInterval(()=>{
      const v=audio.volume, step=.045;
      if(Math.abs(v-to)<=step){ audio.volume=to; clearInterval(fade); done&&done(); }
      else audio.volume=Math.min(1,Math.max(0,v+(to>v?step:-step)));
    },55);
  }
  function fallback(){
    if(!useFile) return;
    useFile=false;
    if(audio){ try{audio.pause();}catch(e){} audio=null; }
    if(on) startSynth();
  }
  function startFile(){
    if(!audio){
      audio=new Audio(MUSIC_URL);
      audio.loop=true; audio.volume=0; audio.preload="auto";
      audio.addEventListener("error",fallback,{once:true});
    }
    const p=audio.play();
    if(p&&p.then) p.then(()=>fadeAudio(.5)).catch(fallback);
  }
  function startSynth(){
    if(!ctx){
      ctx=new (window.AudioContext||window.webkitAudioContext)();
      bus=ctx.createGain(); bus.gain.value=0;
      const warm=ctx.createBiquadFilter(); warm.type="lowpass"; warm.frequency.value=5000;
      const wet=ctx.createGain(); wet.gain.value=.26;
      const rv=reverb();
      bus.connect(warm); warm.connect(ctx.destination);
      bus.connect(rv); rv.connect(wet); wet.connect(ctx.destination);
      next=ctx.currentTime+.15;
    }
    ctx.resume();
    bus.gain.cancelScheduledValues(ctx.currentTime);
    bus.gain.setValueAtTime(Math.max(bus.gain.value,.0001),ctx.currentTime);
    bus.gain.linearRampToValueAtTime(1,ctx.currentTime+1.6);
    if(next<ctx.currentTime) next=ctx.currentTime+.15;
    loop();
    clearInterval(timer);
    timer=setInterval(loop,140);
  }
  function start(){ useFile?startFile():startSynth(); }
  function stop(){
    if(useFile&&audio){ fadeAudio(0,()=>audio.pause()); return; }
    if(!ctx) return;
    clearInterval(timer);
    bus.gain.cancelScheduledValues(ctx.currentTime);
    bus.gain.setValueAtTime(bus.gain.value,ctx.currentTime);
    bus.gain.linearRampToValueAtTime(.0001,ctx.currentTime+.9);
  }
  btn.addEventListener("click",()=>{
    on=!on;
    btn.classList.toggle("on",on);
    btn.setAttribute("aria-pressed",String(on));
    on?start():stop();
  });
})();
