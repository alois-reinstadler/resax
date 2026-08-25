const b=`
  :host { display: inline-flex; }
  :host([overlay]) { position: absolute; inset: 0; display: flex; }

  .spinring {
    --sz: 32px;
    --bw: 3px;
    --dur: 1s;
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

  .spinring__box {
    position: relative;
    width: var(--sz);
    height: var(--sz);
    flex: 0 0 auto;
  }

  .spinring__spoke {
    position: absolute;
    top: 8%;
    left: calc(50% - var(--bw) / 2);
    width: var(--bw);
    height: 22%;
    border-radius: 999px;
    background: rgb(var(--ring));
    transform-origin: 50% calc(var(--sz) * 0.42);
    transform: rotate(calc(var(--i) * 30deg));
    animation: spinring-fade var(--dur) linear infinite;
    animation-delay: calc(var(--i) * var(--dur) / -12);
  }

  @keyframes spinring-fade {
    0%   { opacity: 1; }
    100% { opacity: 0.12; }
  }

  /* sizes */
  .spinring--sm { --sz: 20px; --bw: 2px; --fs: 12px; --gap: 8px; }
  .spinring--md { --sz: 32px; --bw: 3px; --fs: 13px; }
  .spinring--lg { --sz: 44px; --bw: 4px; --fs: 14px; --gap: 12px; }
  .spinring--xl { --sz: 60px; --bw: 5px; --fs: 16px; --gap: 14px; }

  /* speed */
  .spinring--s-slow   { --dur: 1.5s; }
  .spinring--s-normal { --dur: 1s; }
  .spinring--s-fast   { --dur: 0.65s; }

  .spinring__label { color: var(--tint); white-space: nowrap; }

  .spinring.is-overlay {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    background: rgb(var(--overlay-rgb, 0 0 0) / 0.45);
    backdrop-filter: blur(2px);
    border-radius: inherit;
  }

  /* tones */
  .spinring--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .spinring--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
  .spinring--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

  @media (prefers-reduced-motion: reduce) {
    .spinring__spoke { animation-duration: 2.6s; }
  }
`;let c;function d(p){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=p;const n=c.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const i=n.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const h=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(p,n){const i=n?d(String(n).trim()):null;if(!i){for(const t of h)p.style.removeProperty(t);return}const s=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),o=.2126*s(i[0])+.7152*s(i[1])+.0722*s(i[2])>.45,r=`rgb(${i[0]} ${i[1]} ${i[2]})`,l=i.map(t=>Math.round(o?t*.92:t+(255-t)*.16)),e=(t,f)=>p.style.setProperty(t,f);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])e(t,r);e("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])e(t,i.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])e(t,o?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])e(t,o?"0 0 0":"255 255 255");e("--vs-color",r),e("--vs-color-rgb",i.join(" ")),e("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["size","tone","speed","thickness","label","overlay","color"];#t;#i;#n;constructor(){super();const n=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=b,this.#t=document.createElement("div"),this.#t.className="spinring",this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-live","polite"),this.#i=document.createElement("span"),this.#i.className="spinring__box",this.#i.setAttribute("aria-hidden","true");for(let s=0;s<12;s++){const a=document.createElement("i");a.className="spinring__spoke",a.style.setProperty("--i",String(s)),this.#i.append(a)}this.#n=document.createElement("span"),this.#n.className="spinring__label",this.#n.style.display="none",this.#t.append(this.#i,this.#n),n.append(i,this.#t)}connectedCallback(){g(this,this.getAttribute("color")),this.#e()}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#t&&this.#e()}disconnectedCallback(){}#e(){const n=(e,t)=>this.getAttribute(e)??t,i=n("size","md"),s=n("tone","default"),a=n("speed","normal"),o=this.hasAttribute("overlay"),r=n("label","");this.#t.className=`spinring spinring--${i} spinring--t-${s} spinring--s-${a}`+(o?" is-overlay":"");const l=Number(this.getAttribute("thickness"))||0;l>0?this.#i.style.setProperty("--bw",`${l}px`):this.#i.style.removeProperty("--bw"),this.#t.setAttribute("aria-label",r||"Loading"),this.#n.style.display=r?"":"none",r&&(this.#n.textContent=r)}}customElements.define("vs-spinner-ring",u);
