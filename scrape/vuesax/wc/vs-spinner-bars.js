const h=`
  :host { display: inline-flex; }
.bars {
  --sz: 32px;
  --dur: 1s;
  --gap: 10px;
  --fs: 13px;
  --ring: var(--inp-ring, 237 237 237);
  --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
  --bar: calc(var(--sz) * 0.16);

  display: inline-flex;
  align-items: center;
  gap: var(--gap);
  color: var(--tint);
  font: inherit;
  font-size: var(--fs);
  font-weight: 500;
  line-height: 1;
  user-select: none;
}

.bars__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--bar) * 0.7);
  width: var(--sz);
  height: var(--sz);
  flex: 0 0 auto;
}

.bars__b {
  width: var(--bar);
  height: 100%;
  border-radius: 999px;
  background: rgb(var(--ring));
  transform-origin: center;
  animation: bars-eq var(--dur) ease-in-out infinite;
}
.bars__b:nth-child(1) { animation-delay: 0s; }
.bars__b:nth-child(2) { animation-delay: calc(var(--dur) * 0.18); }
.bars__b:nth-child(3) { animation-delay: calc(var(--dur) * 0.36); }
.bars__b:nth-child(4) { animation-delay: calc(var(--dur) * 0.12); }

@keyframes bars-eq {
  0%, 100% { transform: scaleY(0.35); opacity: 0.55; }
  50%      { transform: scaleY(1);    opacity: 1; }
}

/* sizes */
.bars--sm { --sz: 20px; --fs: 12px; --gap: 8px; }
.bars--md { --sz: 32px; --fs: 13px; }
.bars--lg { --sz: 44px; --fs: 14px; --gap: 12px; }
.bars--xl { --sz: 60px; --fs: 16px; --gap: 14px; }

/* speed */
.bars--s-slow   { --dur: 1.4s; }
.bars--s-normal { --dur: 1s; }
.bars--s-fast   { --dur: 0.65s; }

.bars__label { color: var(--tint); white-space: nowrap; }

.bars.is-overlay {
  position: absolute;
  inset: 0;
  flex-direction: column;
  justify-content: center;
  background: rgb(var(--overlay-rgb, 0 0 0) / 0.45);
  backdrop-filter: blur(2px);
  border-radius: inherit;
  z-index: 10;
}

/* tones */
.bars--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
.bars--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
.bars--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

@media (prefers-reduced-motion: reduce) {
  .bars__b { animation-duration: 2.4s; }
}
`,d=[0,.18,.36,.12];let o;function u(i){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=i;const e=o.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(i,e){const t=e?u(String(e).trim()):null;if(!t){for(const r of g)i.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,b=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),a=(r,f)=>i.style.setProperty(r,f);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(r,b);a("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])a(r,n?"0 0 0":"255 255 255");a("--vs-color",b),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["size","tone","speed","count","label","overlay","color"];#t;#e;#r;#s=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=h,this.#t=document.createElement("div"),this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-live","polite"),this.#e=document.createElement("span"),this.#e.className="bars__box",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e),e.append(t,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#a()}disconnectedCallback(){}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#t&&this.#a()}#a(){const e=(l,n)=>this.getAttribute(l)??n,t=Math.max(1,parseInt(e("count","4"),10)||1);t!==this.#s&&(this.#s=t,this.#n(t));const s=e("label","");this.#t.className=`bars bars--${e("size","md")} bars--t-${e("tone","default")} bars--s-${e("speed","normal")}`+(this.hasAttribute("overlay")?" is-overlay":""),this.#t.setAttribute("aria-label",s||"Loading"),s?(this.#r||(this.#r=document.createElement("span"),this.#r.className="bars__label",this.#t.appendChild(this.#r)),this.#r.textContent=s):this.#r&&(this.#r.remove(),this.#r=null)}#n(e){this.#e.textContent="";for(let t=0;t<e;t++){const s=document.createElement("i");s.className="bars__b";const l=d[t%d.length];s.style.animationDelay=`calc(var(--dur) * ${l})`,this.#e.appendChild(s)}}}customElements.define("vs-spinner-bars",m);
