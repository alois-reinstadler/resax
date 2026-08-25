const f=`
  :host { display: inline-flex; }
  .spingrid {
    --sz: 32px;
    --dur: 1.3s;
    --gap: 10px;
    --fs: 13px;
    --ring: var(--inp-ring, 237 237 237);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));

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

  .spingrid__box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: calc(var(--sz) * 0.14);
    width: var(--sz);
    height: var(--sz);
    flex: 0 0 auto;
  }

  .spingrid__d {
    border-radius: 999px;
    background: rgb(var(--ring));
    animation: spingrid-fade var(--dur) ease-in-out infinite;
  }
  /* diagonal wave: delay by index (row+col) */
  .spingrid__d:nth-child(1) { animation-delay: 0s; }
  .spingrid__d:nth-child(2), .spingrid__d:nth-child(4) { animation-delay: calc(var(--dur) * 0.12); }
  .spingrid__d:nth-child(3), .spingrid__d:nth-child(5), .spingrid__d:nth-child(7) { animation-delay: calc(var(--dur) * 0.24); }
  .spingrid__d:nth-child(6), .spingrid__d:nth-child(8) { animation-delay: calc(var(--dur) * 0.36); }
  .spingrid__d:nth-child(9) { animation-delay: calc(var(--dur) * 0.48); }

  @keyframes spingrid-fade {
    0%, 70%, 100% { transform: scale(0.4); opacity: 0.3; }
    35%           { transform: scale(1);   opacity: 1; }
  }

  /* sizes */
  .spingrid--sm { --sz: 20px; --fs: 12px; --gap: 8px; }
  .spingrid--md { --sz: 32px; --fs: 13px; }
  .spingrid--lg { --sz: 44px; --fs: 14px; --gap: 12px; }
  .spingrid--xl { --sz: 60px; --fs: 16px; --gap: 14px; }

  /* speed */
  .spingrid--s-slow   { --dur: 1.8s; }
  .spingrid--s-normal { --dur: 1.3s; }
  .spingrid--s-fast   { --dur: 0.85s; }

  .spingrid__label { color: var(--tint); white-space: nowrap; }

  .spingrid.is-overlay {
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
  .spingrid--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .spingrid--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
  .spingrid--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

  @media (prefers-reduced-motion: reduce) {
    .spingrid__d { animation-duration: 3s; }
  }
`;let d;function h(a){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=a;const n=d.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const i=n.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(a,n){const i=n?h(String(n).trim()):null;if(!i){for(const t of b)a.style.removeProperty(t);return}const o=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),e=.2126*o(i[0])+.7152*o(i[1])+.0722*o(i[2])>.45,l=`rgb(${i[0]} ${i[1]} ${i[2]})`,s=i.map(t=>Math.round(e?t*.92:t+(255-t)*.16)),r=(t,g)=>a.style.setProperty(t,g);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(t,l);r("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(t,i.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(t,e?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])r(t,e?"0 0 0":"255 255 255");r("--vs-color",l),r("--vs-color-rgb",i.join(" ")),r("--vs-color-fg",e?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["size","tone","speed","label","overlay","color"];#i;#n;#t;#r=0;constructor(){super();const n=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=f,this.#i=document.createElement("div"),this.#i.className="spingrid",this.#i.setAttribute("role","status"),this.#i.setAttribute("aria-live","polite"),this.#n=document.createElement("span"),this.#n.className="spingrid__box",this.#n.setAttribute("aria-hidden","true"),this.#t=document.createElement("span"),this.#t.className="spingrid__label",this.#i.append(this.#n),n.append(i,this.#i)}connectedCallback(){p(this,this.getAttribute("color")),this.#e()}disconnectedCallback(){}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#i&&this.#e()}#e(){const n=(s,r)=>this.getAttribute(s)??r,i=n("size","md"),o=n("tone","default"),c=n("speed","normal"),e=n("label",""),l=this.hasAttribute("overlay");if(this.#i.className=`spingrid spingrid--${i} spingrid--t-${o} spingrid--s-${c}${l?" is-overlay":""}`,this.#i.setAttribute("aria-label",e||"Loading"),this.#r!==9){this.#r=9,this.#n.replaceChildren();for(let s=0;s<9;s++){const r=document.createElement("i");r.className="spingrid__d",this.#n.appendChild(r)}}e?(this.#t.textContent=e,this.#t.isConnected||this.#i.append(this.#t)):this.#t.isConnected&&this.#t.remove()}}customElements.define("vs-spinner-grid",u);
