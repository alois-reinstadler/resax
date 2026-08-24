const d=`
  :host { display: block; }
.skp {
  --w: 100%;
  --h: 14px;
  --r: var(--ctrl-r-sm, 6px);
  --dur: 1.4s;
  --skp-glow: 0.35;
  --skp-base: var(--bg-elevated, #161616);
  --skp-bone: var(--vs-color, var(--border, #2a2a2a));

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 240px;
}

.skp__bone {
  display: block;
  width: var(--w);
  height: var(--h);
  border-radius: var(--r);
  background: var(--skp-bone);
  position: relative;
}

.skp__bone--line { width: var(--w); height: var(--h); }
.skp__bone--solid { width: var(--w); height: var(--h); }

.skp--s-slow   { --dur: 2.1s; }
.skp--s-normal { --dur: 1.4s; }
.skp--s-fast   { --dur: 0.9s; }

/* ── pulse: uniform beat with an expanding halo ────────────────── */
/* Perf: the halo (box-shadow) is baked into ::after and only opacity
   is animated (compositable) — no per-frame repaint. The original
   shadow interpolated 0px/α→4px/0, whose visible peak is ~2px at half
   alpha: that peak state is baked and cross-fades 0↔1 on the same beat. */
@keyframes skp-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
@keyframes skp-halo {
  0%, 50%, 100% { opacity: 0; }
  25%, 75% { opacity: 1; }
}
.skp--a-pulse .skp__bone {
  animation: skp-pulse var(--dur) ease-in-out infinite;
}
.skp--a-pulse .skp__bone::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: 0 0 0 2px rgb(255 255 255 / calc(var(--skp-glow) * 0.5));
  opacity: 0;
  animation: skp-halo var(--dur) ease-in-out infinite;
}

/* ── shapes ──────────────────────────────────────────────────── */
.skp--rect   { --h: 120px; --r: var(--ctrl-r-md, 10px); }
.skp--circle .skp__bone--solid,
.skp--avatar .skp__bone--solid {
  --w: 48px;
  --h: 48px;
  --r: 999px;
}
.skp--rect, .skp--circle, .skp--avatar { gap: 0; }

.skp--card {
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;
}
.skp__bone--avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.skp__stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
}

@media (prefers-reduced-motion: reduce) {
  .skp__bone {
    animation: none !important;
    opacity: 0.85;
    box-shadow: none;
  }
  .skp__bone::after {
    animation: none !important;
    opacity: 0;
  }
}
`;let p;function u(o){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=o;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(o,e){const t=e?u(String(e).trim()):null;if(!t){for(const i of f)o.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),r=(i,b)=>o.style.setProperty(i,b);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(i,l);r("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])r(i,a?"0 0 0":"255 255 255");r("--vs-color",l),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["shape","animation","speed","count","width","height","radius","glow","color"];#t;#i=null;#n=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=d,this.#t=document.createElement("div"),this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-busy","true"),this.#t.setAttribute("aria-label","Loading"),e.append(t,this.#t)}connectedCallback(){h(this,this.getAttribute("color")),this.#r()}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#r()}disconnectedCallback(){}#r(){const e=(a,l)=>this.getAttribute(a)??l,t=e("shape","text"),s=Math.max(1,parseInt(e("count","3"),10)||1);(t!==this.#i||s!==this.#n)&&(this.#i=t,this.#n=s,this.#a(t,s)),this.#t.className=`skp skp--${t} skp--a-${e("animation","pulse")} skp--s-${e("speed","normal")}`,this.#s("--w",this.getAttribute("width")),this.#s("--h",this.getAttribute("height")),this.#s("--r",this.getAttribute("radius"));const n=Math.min(1,Math.max(0,Number(e("glow","0.35"))||0));this.#t.style.setProperty("--skp-glow",String(n))}#s(e,t){t?this.#t.style.setProperty(e,t):this.#t.style.removeProperty(e)}#e(e,t,s){const n=document.createElement("span");return n.className=e,n.setAttribute("aria-hidden","true"),n.style.setProperty("--i",String(t)),s&&n.style.setProperty("--w",s),n}#a(e,t){if(this.#t.textContent="",e==="card"){const s=document.createElement("span");s.className="skp__stack",s.setAttribute("aria-hidden","true"),s.append(this.#e("skp__bone skp__bone--line",1,"60%"),this.#e("skp__bone skp__bone--line",2,"90%"),this.#e("skp__bone skp__bone--line",3,"75%")),this.#t.append(this.#e("skp__bone skp__bone--avatar",0),s)}else if(e==="text")for(let s=1;s<=t;s++)this.#t.appendChild(this.#e("skp__bone skp__bone--line",s-1,s===t&&t>1?"65%":null));else this.#t.appendChild(this.#e("skp__bone skp__bone--solid",0))}}customElements.define("vs-skeleton-pulse",k);
