const b=`
  :host { display: inline-flex; }
  .dots {
    --sz: 32px;
    --dur: 1.1s;
    --gap: 10px;
    --fs: 13px;
    --ring: var(--inp-ring, 237 237 237);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --dot: calc(var(--sz) * 0.28);

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

  .dots__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: calc(var(--dot) * 0.55);
    width: var(--sz);
    height: var(--sz);
    flex: 0 0 auto;
  }

  .dots__d {
    width: var(--dot);
    height: var(--dot);
    border-radius: 999px;
    background: rgb(var(--ring));
    animation: dots-bounce var(--dur) cubic-bezier(0.45, 0, 0.55, 1) infinite;
    animation-delay: calc(var(--dur) * 0.16 * var(--i, 0));
  }

  @keyframes dots-bounce {
    0%, 80%, 100% { transform: translateY(0) scale(0.6); opacity: 0.35; }
    40%           { transform: translateY(calc(var(--dot) * -0.7)) scale(1); opacity: 1; }
  }

  /* sizes */
  .dots--sm { --sz: 20px; --fs: 12px; --gap: 8px; }
  .dots--md { --sz: 32px; --fs: 13px; }
  .dots--lg { --sz: 44px; --fs: 14px; --gap: 12px; }
  .dots--xl { --sz: 60px; --fs: 16px; --gap: 14px; }

  /* speed */
  .dots--s-slow   { --dur: 1.5s; }
  .dots--s-normal { --dur: 1.1s; }
  .dots--s-fast   { --dur: 0.75s; }

  .dots__label { color: var(--tint); white-space: nowrap; }

  .dots.is-overlay {
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
  .dots--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .dots--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
  .dots--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

  @media (prefers-reduced-motion: reduce) {
    .dots__d { animation-duration: 2.4s; }
  }
`;let c;function u(o){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=o;const s=c.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const e=s.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(o,s){const e=s?u(String(s).trim()):null;if(!e){for(const t of g)o.style.removeProperty(t);return}const a=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),i=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,r=e.map(t=>Math.round(i?t*.92:t+(255-t)*.16)),n=(t,f)=>o.style.setProperty(t,f);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(t,l);n("--btn-primary-bg-hover",`rgb(${r[0]} ${r[1]} ${r[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(t,i?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])n(t,i?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class h extends HTMLElement{static observedAttributes=["size","tone","speed","count","label","overlay","color"];#t;#s;#e;#n=0;constructor(){super();const s=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#t=document.createElement("div"),this.#t.className="dots",this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-live","polite"),this.#s=document.createElement("span"),this.#s.className="dots__box",this.#s.setAttribute("aria-hidden","true"),this.#e=document.createElement("span"),this.#e.className="dots__label",this.#t.append(this.#s),s.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#i()}disconnectedCallback(){}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#t&&this.#i()}#i(){const s=(n,t)=>this.getAttribute(n)??t,e=s("size","md"),a=s("tone","default"),d=s("speed","normal"),i=s("label",""),l=this.hasAttribute("overlay"),r=Math.max(1,Math.min(8,parseInt(s("count","3"),10)||3));if(this.#t.className=`dots dots--${e} dots--t-${a} dots--s-${d}${l?" is-overlay":""}`,this.#t.setAttribute("aria-label",i||"Loading"),r!==this.#n){this.#n=r,this.#s.replaceChildren();for(let n=0;n<r;n++){const t=document.createElement("i");t.className="dots__d",t.style.setProperty("--i",String(n)),this.#s.appendChild(t)}}i?(this.#e.textContent=i,this.#e.isConnected||this.#t.append(this.#e)):this.#e.isConnected&&this.#e.remove()}}customElements.define("vs-spinner-dots",h);
