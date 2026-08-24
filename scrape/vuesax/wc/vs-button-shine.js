const d=`
  :host { display: inline-flex; }
  .bshine {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: calc(var(--r) * var(--r-mult, 1));
    border: 1px solid transparent;
    overflow: hidden;
    font: inherit;
    font-weight: 500;
    font-size: var(--fs);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition:
      transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 260ms var(--ease-out, ease),
      opacity 200ms ease;
  }
  .bshine:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 26px -12px rgba(0, 0, 0, 0.55);
  }
  .bshine:active:not(:disabled) { transform: translateY(0) scale(0.98); }
  .bshine:disabled { opacity: 0.45; cursor: not-allowed; }

  /* sizes */
  .bshine--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .bshine--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .bshine--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  /* radius */
  .bshine--r-none { --r: 0px; }
  .bshine--r-subtle { --r: 8px; }
  .bshine--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .bshine--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  /* variants — --sheen is the streak's peak color, chosen to CONTRAST with the
     button fill (dark sheen over the light primary; light sheen over dark ones). */
  .bshine--primary {
    background: var(--btn-primary-bg, #ededed);
    color: var(--btn-primary-fg, #000);
    --sheen: rgba(255, 255, 255, 0.85); /* bright gloss over light fill */
  }
  .bshine--secondary {
    background: var(--btn-secondary-bg, #1a1a1a);
    color: var(--inp-text, #ededed);
    border-color: var(--inp-border, #2a2a2a);
    --sheen: rgba(255, 255, 255, 0.35);
  }
  .bshine--ghost {
    background: transparent;
    color: var(--inp-text, #ededed);
    border-color: var(--inp-border, #2a2a2a);
    --sheen: rgba(255, 255, 255, 0.35);
  }

  /* the gleam: a diagonal light streak parked fully off the LEFT edge; on hover it
     sweeps right across the whole face. Tall + rotated so it covers every corner.
     Sized in its own width units so translateX math is predictable. */
  .bshine__gleam {
    position: absolute;
    top: -60%;
    left: 0;
    z-index: 1;
    width: 55%;
    height: 220%;
    pointer-events: none;
    transform: translateX(-220%) rotate(20deg);
    background: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(in srgb, var(--sheen, rgba(255,255,255,0.4)) 15%, transparent) 35%,
      var(--sheen, rgba(255, 255, 255, 0.4)) 50%,
      color-mix(in srgb, var(--sheen, rgba(255,255,255,0.4)) 15%, transparent) 65%,
      transparent 100%
    );
    opacity: 0;
  }
  .bshine:hover:not(:disabled) .bshine__gleam {
    animation: bshine-sweep 760ms cubic-bezier(0.3, 0.7, 0.3, 1) forwards;
  }
  /* left:0 width:55% → element starts at 0..55%. Pre-translated -220% (of its own
     55% width ≈ -121% of the button) it sits fully off the left; sweeping to +320%
     (≈ +176% of the button) carries it fully off the right. */
  @keyframes bshine-sweep {
    0%   { opacity: 0; transform: translateX(-220%) rotate(20deg); }
    12%  { opacity: 1; }
    88%  { opacity: 1; }
    100% { opacity: 0; transform: translateX(320%) rotate(20deg); }
  }

  .bshine__label { position: relative; z-index: 2; }

  @media (prefers-reduced-motion: reduce) {
    .bshine { transition: none; }
    .bshine:hover:not(:disabled) { transform: none; }
    .bshine__gleam { display: none; }
  }
`;let i;function p(a){if(i||=document.createElement("canvas").getContext("2d"),!i)return null;i.fillStyle="#000",i.fillStyle=a;const r=i.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const t=r.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(a,r){const t=r?p(String(r).trim()):null;if(!t){for(const e of f)a.style.removeProperty(e);return}const n=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),o=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(e=>Math.round(o?e*.92:e+(255-e)*.16)),s=(e,b)=>a.style.setProperty(e,b);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(e,c);s("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(e,o?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])s(e,o?"0 0 0":"255 255 255");s("--vs-color",c),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["variant","size","radius","label","disabled","color"];#t;#e;#r;#n;constructor(){super();const r=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=d,this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="bshine";const n=document.createElement("span");n.className="bshine__gleam",n.setAttribute("aria-hidden","true"),this.#e=document.createElement("span"),this.#e.className="bshine__label",this.#r=document.createElement("slot"),this.#n=document.createTextNode("Button"),this.#r.appendChild(this.#n),this.#e.appendChild(this.#r),this.#t.append(n,this.#e),r.append(t,this.#t)}connectedCallback(){h(this,this.getAttribute("color")),this.#s()}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#s()}disconnectedCallback(){}#s(){const r=(t,n)=>this.getAttribute(t)??n;this.#t.className=`bshine bshine--${r("variant","primary")} bshine--${r("size","md")} bshine--r-${r("radius","squircle")}`,this.#t.disabled=this.hasAttribute("disabled"),this.#n.data=r("label","Button")}}customElements.define("vs-button-shine",g);
