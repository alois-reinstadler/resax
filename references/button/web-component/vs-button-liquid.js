const h=`
  :host { display: inline-flex; }
  .bliq {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    /* --liq = liquid color, --on-liq = color of the text over the liquid */
    --liq: var(--inp-text, #ededed);
    --on-liq: #0a0a0a;
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: calc(var(--r) * var(--r-mult, 1));
    border: 1px solid var(--inp-border, #2a2a2a);
    overflow: hidden;
    font-family: inherit;
    font-weight: 500;
    font-size: var(--fs);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    background: var(--btn-secondary-bg, #1a1a1a);
    color: var(--inp-text, #ededed);
    transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .bliq:active:not(:disabled) { transform: scale(0.97); }
  .bliq:disabled { opacity: 0.45; cursor: not-allowed; }

  /* sizes */
  .bliq--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .bliq--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .bliq--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  /* radius */
  .bliq--r-none { --r: 0px; }
  .bliq--r-subtle { --r: 8px; }
  .bliq--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .bliq--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  /* variants: recolor liquid + surface */
  .bliq--primary {
    background: var(--btn-secondary-bg, #1a1a1a);
    --liq: var(--btn-primary-bg, #ededed);
    --on-liq: #0a0a0a;
  }
  .bliq--ghost { background: transparent; }

  /* both label copies occupy the exact same box (centered on the button) */
  .bliq__label {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* the liquid: parked below, rises to fill on hover. overflow:hidden clips
     the colored copy inside → the surface reveals the text line by line. */
  .bliq__fill {
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    background: var(--liq);
    border-radius: 50% 50% 0 0 / 22% 22% 0 0;
    transition: height 520ms cubic-bezier(0.65, 0, 0.35, 1);
  }
  /* colored text copy: absolutely pinned so it stays aligned with the base
     label (same centered box, full button height, anchored to the bottom)
     while the fill grows upward around it. */
  .bliq__label--on {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: var(--h);
    color: var(--on-liq);
    pointer-events: none;
  }
  .bliq:hover:not(:disabled) .bliq__fill {
    height: 240%;
    animation: bliq-wobble 1.7s ease-in-out infinite;
  }
  @keyframes bliq-wobble {
    0%, 100% { border-radius: 50% 50% 0 0 / 22% 22% 0 0; }
    50%      { border-radius: 44% 56% 0 0 / 30% 16% 0 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bliq { transition: none; }
    .bliq__fill { transition: height 260ms ease; }
    .bliq:hover:not(:disabled) .bliq__fill { animation: none; }
  }
`;let a;function u(l){if(a||=document.createElement("canvas").getContext("2d"),!a)return null;a.fillStyle="#000",a.fillStyle=l;const i=a.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const t=i.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(l,i){const t=i?u(String(i).trim()):null;if(!t){for(const e of f)l.style.removeProperty(e);return}const r=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),s=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,b=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(e=>Math.round(s?e*.92:e+(255-e)*.16)),n=(e,p)=>l.style.setProperty(e,p);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(e,b);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(e,s?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])n(e,s?"0 0 0":"255 255 255");n("--vs-color",b),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["label","variant","size","radius","disabled","color"];#t;#e;#i;#r=()=>this.#l();constructor(){super();const i=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=h,this.#t=document.createElement("button"),this.#t.type="button";const r=document.createElement("span");r.className="bliq__label",this.#e=document.createElement("slot"),r.append(this.#e);const o=document.createElement("span");o.className="bliq__fill",o.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="bliq__label bliq__label--on",o.append(this.#i),this.#t.append(r,o),i.append(t,this.#t),this.#e.addEventListener("slotchange",this.#r)}connectedCallback(){d(this,this.getAttribute("color")),this.#n()}disconnectedCallback(){this.#e.removeEventListener("slotchange",this.#r)}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#n()}#n(){const i=(t,r)=>this.getAttribute(t)??r;this.#t.className=`bliq bliq--${i("variant","secondary")} bliq--${i("size","md")} bliq--r-${i("radius","pill")}`,this.#t.disabled=this.hasAttribute("disabled"),this.#e.textContent=i("label","Button"),this.#l()}#l(){const i=this.#e.assignedNodes({flatten:!0}),t=i.length?i.map(r=>r.textContent||"").join(""):this.getAttribute("label")??"Button";this.#i.textContent=t}}customElements.define("vs-button-liquid",m);
