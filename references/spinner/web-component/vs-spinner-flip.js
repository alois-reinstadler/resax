const g=`
  :host { display: inline-flex; }
  :host([overlay]) { position: absolute; inset: 0; display: flex; }

  .flip {
    --sz: 32px;
    --dur: 1.4s;
    --gap: 10px;
    --fs: 13px;
    --rad: calc(var(--sz) * 0.28);
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

  .flip__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sz);
    height: var(--sz);
    flex: 0 0 auto;
    perspective: calc(var(--sz) * 3);
  }

  .flip__face {
    width: 76%;
    height: 76%;
    border-radius: var(--rad);
    background: rgb(var(--ring));
    box-shadow: 0 0 calc(var(--sz) * 0.3) rgb(var(--ring) / 0.35);
    animation: flip-3d var(--dur) cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  @keyframes flip-3d {
    0%        { transform: rotateX(0deg)   rotateY(0deg); }
    50%       { transform: rotateX(180deg) rotateY(0deg); }
    100%      { transform: rotateX(180deg) rotateY(180deg); }
  }

  /* ── sizes ───────────────────────────────────────────────────── */
  .flip--sm { --sz: 20px; --fs: 12px; --gap: 8px; }
  .flip--md { --sz: 32px; --fs: 13px; }
  .flip--lg { --sz: 44px; --fs: 14px; --gap: 12px; }
  .flip--xl { --sz: 60px; --fs: 16px; --gap: 14px; }

  /* ── speed ───────────────────────────────────────────────────── */
  .flip--s-slow   { --dur: 2s; }
  .flip--s-normal { --dur: 1.4s; }
  .flip--s-fast   { --dur: 0.9s; }

  .flip__label { color: var(--tint); white-space: nowrap; }

  /* ── overlay: covers the parent container (host: position:absolute) ─ */
  .flip.is-overlay {
    position: absolute;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    background: rgb(var(--overlay-rgb, 0 0 0) / 0.45);
    backdrop-filter: blur(2px);
    border-radius: inherit;
    z-index: 10;
  }

  /* ── tones — recolor face + label ────────────────────────────── */
  .flip--t-danger  { --ring: 255 99 105;  --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .flip--t-warn    { --ring: 255 178 36;  --tint: var(--inp-t-warn-hint, #f5b544); }
  .flip--t-success { --ring: 76 195 138;  --tint: var(--inp-t-success-hint, #5fd49b); }

  @media (prefers-reduced-motion: reduce) {
    .flip__face { animation-duration: 3.2s; }
  }
`;let c;function b(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const i=c.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const t=i.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const h=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(a,i){const t=i?b(String(i).trim()):null;if(!t){for(const e of h)a.style.removeProperty(e);return}const o=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),s=.2126*o(t[0])+.7152*o(t[1])+.0722*o(t[2])>.45,n=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(e=>Math.round(s?e*.92:e+(255-e)*.16)),r=(e,d)=>a.style.setProperty(e,d);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(e,n);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(e,s?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])r(e,s?"0 0 0":"255 255 255");r("--vs-color",n),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["size","tone","speed","label","overlay","color"];#t;#i;#r;#e;constructor(){super();const i=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=g,this.#t=document.createElement("div"),this.#t.className="flip",this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-live","polite"),this.#i=document.createElement("span"),this.#i.className="flip__box",this.#i.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="flip__face",this.#i.append(this.#r),this.#e=document.createElement("span"),this.#e.className="flip__label",this.#e.style.display="none",this.#t.append(this.#i,this.#e),i.append(t,this.#t)}connectedCallback(){f(this,this.getAttribute("color")),this.#n()}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&this.#n()}disconnectedCallback(){}#n(){const i=(l,r)=>this.getAttribute(l)??r,t=i("size","md"),o=i("tone","default"),p=i("speed","normal"),s=this.hasAttribute("overlay"),n=i("label","");this.#t.className=`flip flip--${t} flip--t-${o} flip--s-${p}`+(s?" is-overlay":""),this.#t.setAttribute("aria-label",n||"Loading"),this.#e.style.display=n?"":"none",n&&(this.#e.textContent=n)}}customElements.define("vs-spinner-flip",u);
