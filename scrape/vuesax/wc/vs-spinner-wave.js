const v=`
  :host { display: inline-flex; }
.wave {
  --sz: 32px;
  --dur: 1.1s;
  --gap: 10px;
  --fs: 13px;
  --ring: var(--inp-ring, 237 237 237);
  --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
  --dot: calc(var(--sz) * 0.18);

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

.wave__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--dot) * 0.6);
  width: var(--sz);
  height: var(--sz);
  flex: 0 0 auto;
}

.wave__d {
  width: var(--dot);
  height: var(--dot);
  border-radius: 999px;
  background: rgb(var(--ring));
  animation: wave-sine var(--dur) ease-in-out infinite;
  animation-delay: calc(var(--i) * var(--dur) / -6);
}

@keyframes wave-sine {
  0%, 100% { transform: translateY(calc(var(--sz) * 0.22)); opacity: 0.45; }
  50%      { transform: translateY(calc(var(--sz) * -0.22)); opacity: 1; }
}

/* sizes */
.wave--sm { --sz: 20px; --fs: 12px; --gap: 8px; }
.wave--md { --sz: 32px; --fs: 13px; }
.wave--lg { --sz: 44px; --fs: 14px; --gap: 12px; }
.wave--xl { --sz: 60px; --fs: 16px; --gap: 14px; }

/* speed */
.wave--s-slow   { --dur: 1.5s; }
.wave--s-normal { --dur: 1.1s; }
.wave--s-fast   { --dur: 0.75s; }

.wave__label { color: var(--tint); white-space: nowrap; }

.wave.is-overlay {
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
.wave--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
.wave--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
.wave--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

@media (prefers-reduced-motion: reduce) {
  .wave__d { animation-duration: 2.6s; }
}
`;let o;function u(s){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=s;const n=o.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const t=n.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(s,n){const t=n?u(String(n).trim()):null;if(!t){for(const e of g)s.style.removeProperty(e);return}const i=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),r=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,d=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(e=>Math.round(r?e*.92:e+(255-e)*.16)),a=(e,f)=>s.style.setProperty(e,f);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(e,d);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(e,r?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])a(e,r?"0 0 0":"255 255 255");a("--vs-color",d),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class h extends HTMLElement{static observedAttributes=["size","tone","speed","count","label","overlay","color"];#t;#n;#e;#i=0;constructor(){super();const n=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=v,this.#t=document.createElement("div"),this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-live","polite"),this.#n=document.createElement("span"),this.#n.className="wave__box",this.#n.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#n),n.append(t,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#a()}disconnectedCallback(){}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#t&&this.#a()}#a(){const n=(c,r)=>this.getAttribute(c)??r,t=Math.max(1,parseInt(n("count","5"),10)||1);t!==this.#i&&(this.#i=t,this.#r(t));const i=n("label","");this.#t.className=`wave wave--${n("size","md")} wave--t-${n("tone","default")} wave--s-${n("speed","normal")}`+(this.hasAttribute("overlay")?" is-overlay":""),this.#t.setAttribute("aria-label",i||"Loading"),i?(this.#e||(this.#e=document.createElement("span"),this.#e.className="wave__label",this.#t.appendChild(this.#e)),this.#e.textContent=i):this.#e&&(this.#e.remove(),this.#e=null)}#r(n){this.#n.textContent="";for(let t=0;t<n;t++){const i=document.createElement("i");i.className="wave__d",i.style.setProperty("--i",String(t)),this.#n.appendChild(i)}}}customElements.define("vs-spinner-wave",h);
