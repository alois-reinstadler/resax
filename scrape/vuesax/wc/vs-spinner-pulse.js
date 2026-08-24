const b=`
  :host { display: inline-flex; }
  :host([overlay]) { position: absolute; inset: 0; display: flex; }

  .pulse {
    --sz: 32px;
    --bw: 3px;
    --dur: 1.4s;
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

  .pulse__box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sz);
    height: var(--sz);
    flex: 0 0 auto;
  }

  .pulse__wave {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    border: var(--bw) solid rgb(var(--ring));
    animation: pulse-ripple var(--dur) cubic-bezier(0.2, 0.6, 0.3, 1) infinite;
  }
  .pulse__wave--2 { animation-delay: calc(var(--dur) * -0.5); }

  .pulse__core {
    width: calc(var(--sz) * 0.32);
    height: calc(var(--sz) * 0.32);
    border-radius: 999px;
    background: rgb(var(--ring));
    animation: pulse-core var(--dur) ease-in-out infinite;
  }

  @keyframes pulse-ripple {
    0%   { transform: scale(0.25); opacity: 0.9; }
    100% { transform: scale(1);    opacity: 0; }
  }
  @keyframes pulse-core {
    0%, 100% { transform: scale(0.7); opacity: 0.6; }
    50%      { transform: scale(1);   opacity: 1; }
  }

  /* ── sizes ───────────────────────────────────────────────────── */
  .pulse--sm { --sz: 20px; --bw: 2px; --fs: 12px; --gap: 8px; }
  .pulse--md { --sz: 32px; --bw: 3px; --fs: 13px; }
  .pulse--lg { --sz: 44px; --bw: 4px; --fs: 14px; --gap: 12px; }
  .pulse--xl { --sz: 60px; --bw: 5px; --fs: 16px; --gap: 14px; }

  /* ── speed ───────────────────────────────────────────────────── */
  .pulse--s-slow   { --dur: 2s; }
  .pulse--s-normal { --dur: 1.4s; }
  .pulse--s-fast   { --dur: 0.9s; }

  .pulse__label { color: var(--tint); white-space: nowrap; }

  /* ── overlay: covers the parent container (host: position:absolute) ─ */
  .pulse.is-overlay {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    background: rgb(var(--overlay-rgb, 0 0 0) / 0.45);
    backdrop-filter: blur(2px);
    border-radius: inherit;
  }

  /* ── tones — recolor ring + label ────────────────────────────── */
  .pulse--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .pulse--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
  .pulse--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

  @media (prefers-reduced-motion: reduce) {
    .pulse__wave,
    .pulse__core { animation-duration: 3s; }
  }
`;let c;function f(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const s=c.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const e=s.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const h=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(a,s){const e=s?f(String(s).trim()):null;if(!e){for(const t of h)a.style.removeProperty(t);return}const l=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),n=.2126*l(e[0])+.7152*l(e[1])+.0722*l(e[2])>.45,i=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(t=>Math.round(n?t*.92:t+(255-t)*.16)),r=(t,d)=>a.style.setProperty(t,d);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(t,i);r("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(t,n?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])r(t,n?"0 0 0":"255 255 255");r("--vs-color",i),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["size","tone","speed","label","overlay","color"];#e;#s;#r;#i;#n;#t;constructor(){super();const s=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#e=document.createElement("div"),this.#e.className="pulse",this.#e.setAttribute("role","status"),this.#e.setAttribute("aria-live","polite"),this.#s=document.createElement("span"),this.#s.className="pulse__box",this.#s.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="pulse__wave",this.#i=document.createElement("span"),this.#i.className="pulse__wave pulse__wave--2",this.#n=document.createElement("span"),this.#n.className="pulse__core",this.#s.append(this.#r,this.#i,this.#n),this.#t=document.createElement("span"),this.#t.className="pulse__label",this.#t.style.display="none",this.#e.append(this.#s,this.#t),s.append(e,this.#e)}connectedCallback(){u(this,this.getAttribute("color")),this.#a()}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#e&&this.#a()}disconnectedCallback(){}#a(){const s=(o,r)=>this.getAttribute(o)??r,e=s("size","md"),l=s("tone","default"),p=s("speed","normal"),n=this.hasAttribute("overlay"),i=s("label","");this.#e.className=`pulse pulse--${e} pulse--t-${l} pulse--s-${p}`+(n?" is-overlay":""),this.#e.setAttribute("aria-label",i||"Loading"),this.#t.style.display=i?"":"none",i&&(this.#t.textContent=i)}}customElements.define("vs-spinner-pulse",g);
