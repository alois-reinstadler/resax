const y=new Set;let k=0,A=0,E=!1,_=0,N=!1,C=null;function L(){if(_=0,!!E)for(const r of y){if(!r.visible)continue;if(r.disabled()){r.lastI!==0&&(r.el.style.setProperty("--glow","0"),r.lastI=0);continue}r.rect||(r.rect=r.el.getBoundingClientRect());const t=r.rect,e=Math.max(t.left,Math.min(k,t.right)),i=Math.max(t.top,Math.min(A,t.bottom)),o=Math.max(0,1-Math.hypot(k-e,A-i)/r.radius);o===0&&r.lastI===0||(r.el.style.setProperty("--gx",`${k-t.left}px`),r.el.style.setProperty("--gy",`${A-t.top}px`),r.el.style.setProperty("--glow",o.toFixed(3)),r.lastI=o)}}function B(r){k=r.clientX,A=r.clientY,E=!0,_||(_=requestAnimationFrame(L))}function $(){for(const r of y)r.rect=null;E&&!_&&(_=requestAnimationFrame(L))}function S(r,t,e){N||(N=!0,addEventListener("pointermove",B,{passive:!0}),addEventListener("scroll",$,{passive:!0,capture:!0}),addEventListener("resize",$,{passive:!0}),C=new IntersectionObserver(l=>{for(const h of l)for(const u of y)u.el===h.target&&(u.visible=h.isIntersecting,h.isIntersecting&&(u.rect=null))}));const i={el:r,radius:t,disabled:e,rect:null,visible:!0,lastI:0};y.add(i),C.observe(r);const o=O.add(r);return()=>{y.delete(i),C.unobserve(r),o()}}const H=()=>typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,O=globalThis[Symbol.for("vs-light")]||=(()=>{const r=new Set,t=110,e=1.6,i=1.7,o=34,l=72,h=[[.6,0],[.42,30],[.16,58],[0,82]],u=[[.6,0],[.27,42],[.08,66],[0,85]],p=[[.85,0],[.4,42],[.12,66],[0,84]];let s=0,m=null;const M=(d,n,c)=>{const f=n.w/2+d,g=n.h/2+d,b=n.h/2/g;return`radial-gradient(${f.toFixed(1)}px ${g.toFixed(1)}px at ${n.x.toFixed(1)}px ${n.y.toFixed(1)}px,`+c.map(([a,v])=>` rgb(${n.rgb} / ${(a*n.k).toFixed(3)}) ${((b+v/100*(1-b))*100).toFixed(1)}%`).join(",")+")"};function P(){const d=[];for(const n of document.querySelectorAll("[color],[data-lamp]")){const c=getComputedStyle(n),f=c.getPropertyValue("--vs-color-rgb").trim()||(n.hasAttribute("data-lamp")?(c.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");f&&d.push({el:n,rgb:f,rect:n.getBoundingClientRect()})}return d}function R(){if(s=0,!r.size)return;const d=P();for(const n of r){if(!n.visible)continue;if(!d.length){n.on&&(n.el.style.setProperty("--lit","0"),n.on=!1);continue}const c=n.el.getBoundingClientRect(),f=c.left+c.width/2,g=c.top+c.height/2,b=[];for(const a of d){if(a.el===n.el||a.el.contains(n.el)||n.el.contains(a.el))continue;const v=Math.max(a.rect.left,Math.min(f,a.rect.right)),z=Math.max(a.rect.top,Math.min(g,a.rect.bottom)),j=Math.max(c.left,Math.min(v,c.right)),T=Math.max(c.top,Math.min(z,c.bottom)),F=Math.max(0,1-Math.hypot(v-j,z-T)/t)**e*i;F&&b.push({rgb:a.rgb,k:Math.min(1,F),w:a.rect.width,h:a.rect.height,x:a.rect.left+a.rect.width/2-c.left,y:a.rect.top+a.rect.height/2-c.top})}if(!b.length){n.on&&(n.el.style.setProperty("--lit","0"),n.on=!1);continue}b.sort((a,v)=>a.k-v.k),n.el.style.setProperty("--lit-ring",b.flatMap(a=>[M(o,a,h),M(l,a,u)]).join(",")),n.el.style.setProperty("--lit-fill",b.map(a=>M(l,a,p)).join(",")),n.el.style.setProperty("--lit","1"),n.on=!0}}const x=()=>{s||(s=requestAnimationFrame(R))};return addEventListener("scroll",x,{passive:!0,capture:!0}),addEventListener("resize",x,{passive:!0}),globalThis.vsLight=x,{add(d){m||=new IntersectionObserver(c=>{for(const f of c)for(const g of r)g.el===f.target&&(g.visible=f.isIntersecting);x()});const n={el:d,visible:!0,on:!1};return r.add(n),m.observe(d),x(),()=>{r.delete(n),m.unobserve(d)}}}})(),G=`
  :host { display: inline-flex; }
.num {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --fs: var(--ctrl-fs-md, 14px);
  --gap: 6px;
  --val-w: 3.2ch;
  /* glow/ripple tint (theme-aware); the tone recolors it */
  --fx-tint: var(--inp-ring, 255 255 255);
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: var(--gap);
  height: var(--h);
  padding: 4px;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: calc(var(--r) * 1.25);
  background: var(--bg-elevated, #111);
  transition:
    transform 260ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    border-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    background-color 200ms ease;
}

/* pill proximity glow (ring along its border) */
.num__rootglow {
  --glow-strength: 0.7;
  --glow-ring: 1px;
  --glow-inset: -1px;
  --glow-r-core: 70px;
  --glow-r-soft: 230px;
}
@supports (corner-shape: squircle) {
  .num__rootglow { corner-shape: squircle; }
}

/* pill click ripple (clipped to the border) */
.num__rootripples {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
@supports (corner-shape: squircle) {
  .num__rootripples { corner-shape: squircle; }
}
@supports (corner-shape: squircle) {
  .num { corner-shape: squircle; border-radius: calc(var(--r) * 1.9); }
}
.num:hover:not(.is-disabled) { border-color: var(--inp-border-hover, #3d3d3d); }

/* bare: no frame → just − n + */
.num--bare {
  border-color: transparent;
  background: transparent;
  padding: 0;
}
.num--bare:hover:not(.is-disabled) { border-color: transparent; }
/* frameless: top/bottom gradient softens the slot cutoff */
.num--bare .num__viewport {
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 28%,
    #000 72%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 28%,
    #000 72%,
    transparent 100%
  );
}

/* sizes */
.num--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --gap: 4px; }
.num--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: calc(var(--ctrl-fs-lg, 15px) + 1px); --gap: 8px; }

/* ── ± buttons ── */
.num__btn {
  --bs: calc(var(--h) - 8px);
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--bs);
  height: var(--bs);
  flex: none;
  padding: 0;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: calc(var(--r) * 0.9);
  background: var(--bg-input, #0d0d0d);
  color: var(--inp-text, #ededed);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition:
    transform 240ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    border-color 180ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    background-color 180ms ease,
    opacity 180ms ease;
}
@supports (corner-shape: squircle) {
  .num__btn { corner-shape: squircle; border-radius: calc(var(--r) * 1.5); }
}
.num__btn:hover:not(:disabled) {
  border-color: var(--inp-border-hover, #3d3d3d);
  background: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
}
.num__btn:focus-visible { outline: none; border-color: rgb(var(--fx-tint)); }
.num__btn:disabled { opacity: 0.35; cursor: not-allowed; }

.num__icon {
  position: relative;
  z-index: 2;
  width: 56%;
  height: 56%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* proximity glow on the icon */
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .num__btn::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .num__btn::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
.num__glow {
  --glow-strength: 1;
  --glow-ring: 1px;
  --glow-inset: -1px;
  --glow-r-core: 26px;
  --glow-r-soft: 90px;
}
@supports (corner-shape: squircle) {
  .num__btn .num__glow { corner-shape: squircle; }
}

/* ripple clip inside the button */
.num__ripples {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
@supports (corner-shape: squircle) {
  .num__btn .num__ripples { corner-shape: squircle; }
}

/* ── center number (slot) ── */
.num__viewport {
  position: relative;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--val-w, 3.2ch);
  align-self: stretch; /* fills the pill's FULL inner height */
  line-height: 1;
  overflow: hidden; /* >5 digits clip + slot clip */
  cursor: text; /* hints it is editable on tap */
  z-index: 1;
  /* fluid expand with bounce */
  transition:
    width 380ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    filter 280ms ease;
  will-change: width, filter;
}
.num__viewport.is-editing { overflow: visible; }
/* brief blur while the width changes → expand bounce blur */
.num__viewport.is-resizing { filter: blur(2.5px); }

/* inline input (same look as the number) */
.num__input {
  box-sizing: border-box;
  width: var(--val-w);
  min-width: 0;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
  letter-spacing: 0.01em;
  text-align: center;
  caret-color: rgb(var(--fx-tint));
  outline: none;
  -moz-appearance: textfield;
}
.num__input::-webkit-outer-spin-button,
.num__input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
.num__value {
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs);
  font-weight: 600;
  line-height: 1;
  color: var(--inp-text, #ededed);
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
  letter-spacing: 0.01em;
  user-select: none;
  will-change: transform, filter, opacity;
}

/* roll-up: rises (increment) — old exits upward, new enters from below */
.roll-up-enter-active {
  transition:
    transform 460ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    filter 280ms ease,
    opacity 240ms ease;
}
.roll-up-leave-active {
  transition:
    transform 360ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    filter 280ms ease,
    opacity 300ms ease;
}
.roll-up-enter-from { transform: translateY(100%); filter: blur(7px); opacity: 0; }
.roll-up-leave-to { transform: translateY(-100%); filter: blur(7px); opacity: 0; }

/* roll-down: falls (decrement) — old exits downward, new enters from above */
.roll-down-enter-active {
  transition:
    transform 460ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    filter 280ms ease,
    opacity 240ms ease;
}
.roll-down-leave-active {
  transition:
    transform 360ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    filter 280ms ease,
    opacity 300ms ease;
}
.roll-down-enter-from { transform: translateY(-100%); filter: blur(7px); opacity: 0; }
.roll-down-leave-to { transform: translateY(100%); filter: blur(7px); opacity: 0; }

/* tones — recolor glow/ripple + focus */
.num--t-danger { --fx-tint: 255 99 105; }
.num--t-warn { --fx-tint: 255 178 36; }
.num--t-success { --fx-tint: 76 195 138; }

/* disabled global */
.num.is-disabled { opacity: 0.55; }

@media (prefers-reduced-motion: reduce) {
  .num,
  .num__btn,
  .num__viewport { transition: none; filter: none !important; }
  /* slot without animation: instant, crisp swap */
  .roll-up-enter-active,
  .roll-up-leave-active,
  .roll-down-enter-active,
  .roll-down-leave-active { transition: none; }
  .roll-up-leave-active,
  .roll-down-leave-active { display: none; }
  .num__value { filter: none !important; }
}

  /* proximity glow + ripple base (ported from vs-fx FX_CSS; the SFC gets these
     from a global sheet). Glow nodes carry class fx-glow → position:absolute. */
  .fx-glow{ position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:
      radial-gradient(60px circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.42) 30%, rgb(var(--fx-tint,255 255 255)/.16) 58%, rgb(var(--fx-tint,255 255 255)/0) 82%),
      radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.27) 42%, rgb(var(--fx-tint,255 255 255)/.08) 66%, rgb(var(--fx-tint,255 255 255)/0) 85%);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:calc(var(--glow,0)*.63); transition:opacity 140ms; }
  .fx-ripple{ position:absolute; z-index:1; pointer-events:none; border-radius:50%; transform:translate(-50%,-50%) scale(0);
    background:radial-gradient(circle, rgb(var(--fx-tint,255 255 255)/.38) 0%, rgb(var(--fx-tint,255 255 255)/.20) 24%, rgb(var(--fx-tint,255 255 255)/.09) 44%, rgb(var(--fx-tint,255 255 255)/.03) 60%, transparent 76%);
    opacity:0; will-change:transform,opacity;
    animation:fx-rip 780ms cubic-bezier(.22,1,.36,1) forwards, fx-fade 780ms cubic-bezier(.25,.1,.25,1) forwards; }
  @keyframes fx-rip{ from{ transform:translate(-50%,-50%) scale(0); } to{ transform:translate(-50%,-50%) scale(1); } }
  @keyframes fx-fade{ from{ opacity:.8; } to{ opacity:0; } }
  @media (prefers-reduced-motion:reduce){ .fx-ripple{ display:none; } }
`,I="http://www.w3.org/2000/svg";function Y(r){const t=document.createElementNS(I,"svg");t.setAttribute("class","num__icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of r){const i=document.createElementNS(I,"path");i.setAttribute("d",e),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),t.appendChild(i)}return t}const D=5;let w;function V(r){if(w||=document.createElement("canvas").getContext("2d"),!w)return null;w.fillStyle="#000",w.fillStyle=r;const t=w.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const X=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function q(r,t){const e=t?V(String(t).trim()):null;if(!e){for(const s of X)r.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),l=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,u=e.map(s=>Math.round(l?s*.92:s+(255-s)*.16)),p=(s,m)=>r.style.setProperty(s,m);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])p(s,h);p("--btn-primary-bg-hover",`rgb(${u[0]} ${u[1]} ${u[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])p(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])p(s,l?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])p(s,l?"0 0 0":"255 255 255");p("--vs-color",h),p("--vs-color-rgb",e.join(" ")),p("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class K extends HTMLElement{static observedAttributes=["value","min","max","step","size","tone","disabled","glow","frame","color"];#C;#t;#c;#u;#r;#n;#S;#E;#g;#s;#e=0;#a=0;#o=0;#h=0;#y=0;#p=[];#_=!1;constructor(){super(),this.#C=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=G,this.#t=document.createElement("div"),this.#t.className="num",this.#t.setAttribute("role","spinbutton"),this.#c=document.createElement("span"),this.#c.className="fx-glow num__rootglow",this.#c.setAttribute("aria-hidden","true"),this.#u=document.createElement("span"),this.#u.className="fx-ripples num__rootripples",this.#u.setAttribute("aria-hidden","true"),this.#r=this.#z("Decrease",["M6 12H18"]),this.#S=this.#r.querySelector(".num__ripples"),this.#g=document.createElement("span"),this.#g.className="num__viewport",this.#s=document.createElement("span"),this.#s.className="num__value",this.#g.appendChild(this.#s),this.#n=this.#z("Increase",["M6 12H18","M12 18V6"]),this.#E=this.#n.querySelector(".num__ripples"),this.#t.append(this.#c,this.#u,this.#r,this.#g,this.#n),this.#C.append(t,this.#t),this.#r.addEventListener("pointerdown",e=>this.#R(e,-1,this.#S)),this.#n.addEventListener("pointerdown",e=>this.#R(e,1,this.#E));for(const e of["pointerup","pointerleave","pointercancel"])this.#r.addEventListener(e,()=>this.#w()),this.#n.addEventListener(e,()=>this.#w())}#z(t,e){const i=document.createElement("button");i.type="button",i.className="num__btn",i.setAttribute("aria-label",t);const o=document.createElement("span");o.className="fx-glow num__glow",o.setAttribute("aria-hidden","true");const l=document.createElement("span");return l.className="fx-ripples num__ripples",l.setAttribute("aria-hidden","true"),i.append(o,l,Y(e)),i}connectedCallback(){q(this,this.getAttribute("color")),this.#e=this.#f(this.#b(this.#v("value",0))),this.#a=this.#e,this.#s.textContent=this.#l(this.#e),this.#I(),this.#p.push(S(this.#r,130,()=>this.#i||this.#d||!this.#M)),this.#p.push(S(this.#n,130,()=>this.#i||this.#m||!this.#M)),this.#p.push(S(this.#t,240,()=>this.#i||!this.#M||!this.#x))}disconnectedCallback(){cancelAnimationFrame(this.#o),this.#o=0,this.#w();for(const t of this.#p)t?.();this.#p=[]}attributeChangedCallback(t,e,i){if(q(this,this.getAttribute("color")),!(!this.#t||e===i)){if(t==="value"){if(this.#_||!this.isConnected)return;const o=this.#f(this.#b(this.#F(i,this.#e)));o!==this.#e&&(this.#e=o,this.#t.setAttribute("aria-valuenow",String(o)),this.#j(this.#a,o));return}if((t==="min"||t==="max")&&this.isConnected){const o=this.#f(this.#b(this.#e));o!==this.#e&&this.#P(o,!1)}this.#I()}}get value(){return this.#e}set value(t){this.setAttribute("value",String(t))}#F(t,e){const i=parseFloat(t);return Number.isFinite(i)?i:e}#v(t,e){return this.#F(this.getAttribute(t),e)}get#k(){return this.#v("min",0)}get#A(){return this.#v("max",100)}get#N(){return this.#v("step",1)}get#i(){return this.hasAttribute("disabled")}get#M(){return this.hasAttribute("glow")}get#x(){const t=this.getAttribute("frame");return t!==null&&t!=="false"}get#$(){const t=String(this.#N);return t.includes(".")?t.split(".")[1].length:0}get#d(){return this.#e<=this.#k}get#m(){return this.#e>=this.#A}#f(t){return Math.min(this.#A,Math.max(this.#k,t))}#b(t){const e=Math.pow(10,this.#$);return Math.round(t*e)/e}#l(t){return Number(t).toFixed(this.#$)}#I(){const t=this.getAttribute("size")||"md",e=this.getAttribute("tone")||"default";let i=`num num--${t} num--t-${e}`;this.#i&&(i+=" is-disabled"),this.#x||(i+=" num--bare"),this.#t.className=i,this.#t.setAttribute("aria-valuenow",String(this.#e)),this.#t.setAttribute("aria-valuemin",String(this.#k)),this.#t.setAttribute("aria-valuemax",String(this.#A)),this.#i?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#r.disabled=this.#i||this.#d,this.#n.disabled=this.#i||this.#m,this.#c.hidden=!this.#x,this.#u.hidden=!this.#x,this.#q()}#q(){const t=this.#l(this.#e),e=Math.min(D,Math.max(1,t.length));this.#t.style.setProperty("--val-w",`calc(${e} * 1ch + 0.5ch)`)}#L(t){this.#i||this.#P(this.#f(this.#b(this.#e+t*this.#N)),!0)}#P(t,e){const i=this.#f(this.#b(t));i!==this.#e&&(this.#e=i,this.#_=!0,this.setAttribute("value",String(i)),this.#_=!1,this.#t.setAttribute("aria-valuenow",String(i)),this.#r.disabled=this.#i||this.#d,this.#n.disabled=this.#i||this.#m,this.#q(),this.#j(this.#a,i),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:i}})))}#R(t,e,i){if(!(this.#i||(e===-1?this.#d:this.#m))){try{t.target.setPointerCapture?.(t.pointerId)}catch{}this.#B(t,e===-1?this.#r:this.#n,i),this.#T(e)}}#T(t){if(this.#i)return;this.#y=t,this.#L(t);let e=340;const i=()=>{if(this.#y===t){if(t===1&&this.#m||t===-1&&this.#d){this.#w();return}this.#L(t),e=Math.max(40,e*.8),this.#h=window.setTimeout(i,e)}};this.#h=window.setTimeout(i,e)}#w(){this.#y=0,this.#h&&(clearTimeout(this.#h),this.#h=0)}#B(t,e,i){if(!i)return;const o=e.getBoundingClientRect(),l=t.clientX-o.left,h=t.clientY-o.top,u=Math.max(l,o.width-l),p=Math.max(h,o.height-h),s=Math.hypot(u,p)*2,m=document.createElement("span");for(m.className="fx-ripple",m.style.cssText=`left:${l}px;top:${h}px;width:${s}px;height:${s}px`,m.addEventListener("animationend",()=>m.remove()),i.appendChild(m);i.childElementCount>6;)i.firstElementChild.remove()}#j(t,e){if(cancelAnimationFrame(this.#o),this.#o=0,t===e){this.#a=e,this.#s.textContent=this.#l(e);return}if(H()){this.#a=e,this.#s.textContent=this.#l(e);return}const i=280,o=performance.now(),l=u=>u>=1?1:1-Math.pow(2,-10*u),h=u=>{if(!this.isConnected||!this.#s){this.#o=0;return}const p=Math.min(1,(u-o)/i),s=t+(e-t)*l(p);this.#a=s,this.#s.textContent=this.#l(s),p<1?this.#o=requestAnimationFrame(h):(this.#o=0,this.#a=e,this.#s.textContent=this.#l(e))};this.#o=requestAnimationFrame(h)}}customElements.define("vs-number",K);
