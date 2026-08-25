const p=`
  :host { display: block; }
.skw {
  --w: 100%;
  --h: 14px;
  --r: var(--ctrl-r-sm, 6px);
  --dur: 1.4s;
  --skw-stagger: 120ms;
  --skw-base: var(--bg-elevated, #161616);
  --skw-bone: var(--vs-color, var(--border, #2a2a2a));

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 240px;
}

.skw__bone {
  display: block;
  width: var(--w);
  height: var(--h);
  border-radius: var(--r);
  background: var(--skw-bone);
  position: relative;
  transform-origin: center;
}

.skw__bone--line { width: var(--w); height: var(--h); }
.skw__bone--solid { width: var(--w); height: var(--h); }

.skw--s-slow   { --dur: 2.1s; }
.skw--s-normal { --dur: 1.4s; }
.skw--s-fast   { --dur: 0.9s; }

/* ── wave: staggered wave of opacity + vertical scale ───────────── */
@keyframes skw-wave {
  0%, 100% { opacity: 0.55; transform: scaleY(0.85); }
  50%      { opacity: 1;    transform: scaleY(1.05); }
}
.skw--a-wave .skw__bone {
  animation: skw-wave var(--dur) ease-in-out infinite;
  animation-delay: calc(var(--i, 0) * var(--skw-stagger));
}

/* ── shapes ──────────────────────────────────────────────────── */
.skw--rect   { --h: 120px; --r: var(--ctrl-r-md, 10px); }
.skw--circle .skw__bone--solid,
.skw--avatar .skw__bone--solid {
  --w: 48px;
  --h: 48px;
  --r: 999px;
}
.skw--rect, .skw--circle, .skw--avatar { gap: 0; }

.skw--card {
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;
}
.skw__bone--avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.skw__stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
}

@media (prefers-reduced-motion: reduce) {
  .skw__bone {
    animation: none !important;
    opacity: 0.85;
    transform: none;
  }
}
`;let l;function w(o){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=o;const e=l.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,e){const t=e?w(String(e).trim()):null;if(!t){for(const r of g)o.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,h=t.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),n=(r,b)=>o.style.setProperty(r,b);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,c);n("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,a?"0 0 0":"255 255 255");n("--vs-color",c),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["shape","animation","speed","count","width","height","radius","stagger","color"];#t;#r=null;#i=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=p,this.#t=document.createElement("div"),this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-busy","true"),this.#t.setAttribute("aria-label","Loading"),e.append(t,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.#n()}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#n()}disconnectedCallback(){}#n(){const e=(a,c)=>this.getAttribute(a)??c,t=e("shape","text"),s=Math.max(1,parseInt(e("count","3"),10)||1);(t!==this.#r||s!==this.#i)&&(this.#r=t,this.#i=s,this.#a(t,s)),this.#t.className=`skw skw--${t} skw--a-${e("animation","wave")} skw--s-${e("speed","normal")}`,this.#s("--w",this.getAttribute("width")),this.#s("--h",this.getAttribute("height")),this.#s("--r",this.getAttribute("radius"));const i=Math.max(0,parseInt(e("stagger","120"),10)||0);this.#t.style.setProperty("--skw-stagger",`${i}ms`)}#s(e,t){t?this.#t.style.setProperty(e,t):this.#t.style.removeProperty(e)}#e(e,t,s){const i=document.createElement("span");return i.className=e,i.setAttribute("aria-hidden","true"),i.style.setProperty("--i",String(t)),s&&i.style.setProperty("--w",s),i}#a(e,t){if(this.#t.textContent="",e==="card"){const s=document.createElement("span");s.className="skw__stack",s.setAttribute("aria-hidden","true"),s.append(this.#e("skw__bone skw__bone--line",1,"60%"),this.#e("skw__bone skw__bone--line",2,"90%"),this.#e("skw__bone skw__bone--line",3,"75%")),this.#t.append(this.#e("skw__bone skw__bone--avatar",0),s)}else if(e==="text")for(let s=1;s<=t;s++)this.#t.appendChild(this.#e("skw__bone skw__bone--line",s-1,s===t&&t>1?"65%":null));else this.#t.appendChild(this.#e("skw__bone skw__bone--solid",0))}}customElements.define("vs-skeleton-wave",u);
