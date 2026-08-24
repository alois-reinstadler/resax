const p=`
  :host { display: block; }
.sks {
  --w: 100%;
  --h: 14px;
  --r: var(--ctrl-r-sm, 6px);
  --dur: 1.4s;
  --sks-int: 0.5;
  --sks-base: var(--bg-elevated, #161616);
  --sks-bone: var(--vs-color, var(--border, #2a2a2a));

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 240px;
}

.sks__bone {
  display: block;
  width: var(--w);
  height: var(--h);
  border-radius: var(--r);
  background: var(--sks-bone);
  position: relative;
  overflow: hidden;
}

.sks__bone--line { width: var(--w); height: var(--h); }
.sks__bone--solid { width: var(--w); height: var(--h); }

.sks--s-slow   { --dur: 2.1s; }
.sks--s-normal { --dur: 1.4s; }
.sks--s-fast   { --dur: 0.9s; }

/* ── shine: diagonal glass glint sweeping across ───────────────── */
.sks--a-shine .sks__bone::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 30%,
    rgb(255 255 255 / var(--sks-int)) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  animation: sks-shine var(--dur) ease-in-out infinite;
}
@keyframes sks-shine {
  0%   { transform: translateX(-120%); }
  60%, 100% { transform: translateX(120%); }
}

/* ── shapes ──────────────────────────────────────────────────── */
.sks--rect   { --h: 120px; --r: var(--ctrl-r-md, 10px); }
.sks--circle .sks__bone--solid,
.sks--avatar .sks__bone--solid {
  --w: 48px;
  --h: 48px;
  --r: 999px;
}
.sks--rect, .sks--circle, .sks--avatar { gap: 0; }

.sks--card {
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;
}
.sks__bone--avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.sks__stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
}

@media (prefers-reduced-motion: reduce) {
  .sks__bone::after {
    animation: none !important;
    display: none;
  }
  .sks__bone { opacity: 0.85; }
}
`;let l;function u(o){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=o;const s=l.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const t=s.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,s){const t=s?u(String(s).trim()):null;if(!t){for(const n of f)o.style.removeProperty(n);return}const e=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),a=.2126*e(t[0])+.7152*e(t[1])+.0722*e(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,h=t.map(n=>Math.round(a?n*.92:n+(255-n)*.16)),r=(n,b)=>o.style.setProperty(n,b);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(n,c);r("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(n,a?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])r(n,a?"0 0 0":"255 255 255");r("--vs-color",c),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["shape","animation","speed","count","width","height","radius","intensity","color"];#t;#n=null;#i=0;constructor(){super();const s=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=p,this.#t=document.createElement("div"),this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-busy","true"),this.#t.setAttribute("aria-label","Loading"),s.append(t,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.#r()}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#r()}disconnectedCallback(){}#r(){const s=(a,c)=>this.getAttribute(a)??c,t=s("shape","text"),e=Math.max(1,parseInt(s("count","3"),10)||1);(t!==this.#n||e!==this.#i)&&(this.#n=t,this.#i=e,this.#a(t,e)),this.#t.className=`sks sks--${t} sks--a-${s("animation","shine")} sks--s-${s("speed","normal")}`,this.#e("--w",this.getAttribute("width")),this.#e("--h",this.getAttribute("height")),this.#e("--r",this.getAttribute("radius"));const i=Math.min(1,Math.max(0,Number(s("intensity","0.5"))||0));this.#t.style.setProperty("--sks-int",String(i))}#e(s,t){t?this.#t.style.setProperty(s,t):this.#t.style.removeProperty(s)}#s(s,t,e){const i=document.createElement("span");return i.className=s,i.setAttribute("aria-hidden","true"),i.style.setProperty("--i",String(t)),e&&i.style.setProperty("--w",e),i}#a(s,t){if(this.#t.textContent="",s==="card"){const e=document.createElement("span");e.className="sks__stack",e.setAttribute("aria-hidden","true"),e.append(this.#s("sks__bone sks__bone--line",1,"60%"),this.#s("sks__bone sks__bone--line",2,"90%"),this.#s("sks__bone sks__bone--line",3,"75%")),this.#t.append(this.#s("sks__bone sks__bone--avatar",0),e)}else if(s==="text")for(let e=1;e<=t;e++)this.#t.appendChild(this.#s("sks__bone sks__bone--line",e-1,e===t&&t>1?"65%":null));else this.#t.appendChild(this.#s("sks__bone sks__bone--solid",0))}}customElements.define("vs-skeleton-shine",g);
