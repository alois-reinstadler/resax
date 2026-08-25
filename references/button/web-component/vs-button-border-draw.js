const g=`
  :host { display: inline-flex; }
  @property --bd-a {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  .bdraw {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --accent: var(--inp-accent, #ededed);
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: calc(var(--r) * var(--r-mult, 1));
    border: 1px solid var(--inp-border, #2a2a2a);
    font: inherit;
    font-weight: 500;
    font-size: var(--fs);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    background: transparent;
    color: var(--inp-text, #ededed);
    transition: color 220ms var(--ease-out, ease), box-shadow 260ms var(--ease-out, ease), transform 160ms ease;
  }
  .bdraw:hover:not(:disabled) {
    color: #fff;
    box-shadow: 0 0 22px -8px color-mix(in srgb, var(--accent) 70%, transparent);
  }
  .bdraw:active:not(:disabled) { transform: scale(0.98); }
  .bdraw:disabled { opacity: 0.45; cursor: not-allowed; }

  /* sizes */
  .bdraw--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .bdraw--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .bdraw--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  /* radius */
  .bdraw--r-none { --r: 0px; }
  .bdraw--r-subtle { --r: 8px; }
  .bdraw--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .bdraw--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  /* variants: mostly change the base fill; the drawn ring stays the accent */
  .bdraw--primary { background: var(--btn-primary-bg, #ededed); color: var(--btn-primary-fg, #000); border-color: transparent; }
  .bdraw--primary:hover:not(:disabled) { color: var(--btn-primary-fg, #000); }
  .bdraw--secondary { background: var(--btn-secondary-bg, #1a1a1a); }

  /* the ring: a 1px conic band masked to the border only. The conic sweep angle
     (--bd-a) animates 0→360 on hover → the stroke draws around the perimeter,
     hugging the radius because border-radius:inherit + mask. */
  .bdraw__ring {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    padding: 1.5px;
    pointer-events: none;
    opacity: 0;
    background: conic-gradient(from -90deg, var(--accent) var(--bd-a), transparent 0);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    transition: --bd-a 560ms cubic-bezier(0.65, 0, 0.35, 1), opacity 120ms ease;
  }
  .bdraw:hover:not(:disabled) .bdraw__ring { opacity: 1; --bd-a: 360deg; }

  /* No @property support → the animation of --bd-a can't run; show a full ring
     that just fades in instead (graceful fallback). */
  @supports not (background: conic-gradient(from 0deg, red var(--bd-a), transparent 0)) {
    .bdraw__ring { background: transparent; border: 1.5px solid var(--accent); padding: 0; -webkit-mask: none; mask: none; }
  }

  .bdraw__label { position: relative; z-index: 1; }

  @media (prefers-reduced-motion: reduce) {
    .bdraw { transition: color 200ms ease; }
    .bdraw__ring { transition: opacity 160ms ease; }
    .bdraw:hover:not(:disabled) .bdraw__ring { --bd-a: 360deg; }
  }
`;let s;function m(o){if(s||=document.createElement("canvas").getContext("2d"),!s)return null;s.fillStyle="#000",s.fillStyle=o;const e=s.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const r=e.match(/[\d.]+/g);return r&&r.length>=3?[+r[0],+r[1],+r[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(o,e){const r=e?m(String(e).trim()):null;if(!r){for(const t of u)o.style.removeProperty(t);return}const a=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),i=.2126*a(r[0])+.7152*a(r[1])+.0722*a(r[2])>.45,l=`rgb(${r[0]} ${r[1]} ${r[2]})`,c=r.map(t=>Math.round(i?t*.92:t+(255-t)*.16)),n=(t,p)=>o.style.setProperty(t,p);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(t,l);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(t,r.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(t,i?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])n(t,i?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",r.join(" ")),n("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class h extends HTMLElement{static observedAttributes=["label","variant","size","radius","disabled","color"];#r;#t;constructor(){super();const e=this.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=g,this.#r=document.createElement("button"),this.#r.type="button";const a=document.createElement("span");a.className="bdraw__ring",a.setAttribute("aria-hidden","true");const d=document.createElement("span");d.className="bdraw__label";const i=document.createElement("slot");this.#t=document.createTextNode("Button"),i.append(this.#t),d.append(i),this.#r.append(a,d),e.append(r,this.#r)}connectedCallback(){b(this,this.getAttribute("color")),this.#e()}disconnectedCallback(){}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#r&&this.#e()}#e(){const e=(r,a)=>this.getAttribute(r)??a;this.#r.className=`bdraw bdraw--${e("variant","ghost")} bdraw--${e("size","md")} bdraw--r-${e("radius","rounded")}`,this.#r.disabled=this.hasAttribute("disabled"),this.#t.data=e("label","Button")}}customElements.define("vs-button-border-draw",h);
