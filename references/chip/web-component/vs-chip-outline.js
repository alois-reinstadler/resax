const h=`
  @property --vco-ang {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  :host { display: inline-flex; }
  :host([hidden]) { display: none; }

  .vco {
    --h: var(--ctrl-h-md, 28px);
    --px: 11px;
    --fs: var(--ctrl-fs-md, 13px);
    --gap: 6px;
    --rr: var(--ctrl-r-pill, 999px);
    --bw: 1.5px;
    --accent: var(--ui-accent, #ededed);
    --ring: var(--inp-ring, var(--ui-ring, 255 255 255));
    --solid-fg: var(--badge-solid-fg, #0b0b0b);

    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    height: var(--h);
    padding: 0 var(--px);
    border: none;
    border-radius: var(--rr);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    color: var(--inp-text, #ededed);
    background: rgb(var(--ring) / 0.10);
    transition: color 200ms ease, background-color 200ms ease;
  }
  .vco.is-clickable { cursor: pointer; }

  /* animated conic border via mask */
  .vco__ring {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    padding: var(--bw);
    background: conic-gradient(
      from var(--vco-ang),
      rgb(var(--ring) / 0.25),
      var(--accent),
      rgb(var(--ring) / 0.25),
      rgb(var(--ring) / 0.25),
      var(--accent),
      rgb(var(--ring) / 0.25)
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: 0.55;
    transition: opacity 220ms ease;
  }
  .vco.is-clickable:hover:not(.is-disabled) .vco__ring { opacity: 0.9; animation: vco-spin 2.4s linear infinite; }
  .vco.is-selected .vco__ring { opacity: 1; animation: vco-spin 1.6s linear infinite; }
  .vco.is-selected { background: rgb(var(--ring) / 0.18); }

  @keyframes vco-spin {
    to { --vco-ang: 360deg; }
  }

  /* variants */
  .vco--v-solid { background: rgb(var(--ring) / 0.9); color: var(--solid-fg); }
  .vco--v-outline { background: transparent; }

  /* sizes */
  .vco--sm { --h: var(--ctrl-h-sm, 24px); --px: 9px; --fs: var(--ctrl-fs-sm, 12px); --gap: 5px; }
  .vco--lg { --h: var(--ctrl-h-lg, 32px); --px: 14px; --fs: var(--ctrl-fs-lg, 14px); --gap: 7px; }

  /* radii */
  .vco--r-subtle { --rr: var(--ctrl-r-sm, 7px); }
  .vco--r-rounded { --rr: var(--ctrl-r-md, 10px); }
  .vco--r-pill { --rr: var(--ctrl-r-pill, 999px); }

  .vco:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  .vco__dot { position: relative; z-index: 1; width: 7px; height: 7px; border-radius: 999px; background: var(--accent); flex: 0 0 auto; }
  .vco.is-selected .vco__dot { background: currentColor; }
  .vco__avatar { position: relative; z-index: 1; display: inline-flex; margin-left: -3px; }
  .vco__avatar ::slotted(img), .vco__avatar ::slotted(*) { width: 1.45em; height: 1.45em; border-radius: 999px; object-fit: cover; }
  .vco__check { position: relative; z-index: 1; flex: 0 0 auto; margin-left: -1px; width: 1em; height: 1em; }
  .vco__close svg { width: 1em; height: 1em; }
  .vco__label { position: relative; z-index: 1; }

  .vco__close {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    margin-right: -3px;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font-size: inherit;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 160ms ease, background-color 160ms ease;
  }
  .vco__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.25); }
  .vco__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }

  /* tones */
  .vco--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --solid-fg: #160405; }
  .vco--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --solid-fg: #160f02; }
  .vco--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --solid-fg: #04120b; }

  .vco.is-disabled { opacity: 0.5; cursor: not-allowed; }
  .vco.is-disabled .vco__close { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .vco, .vco__close { transition: none; }
    .vco.is-clickable:hover:not(.is-disabled) .vco__ring,
    .vco.is-selected .vco__ring { animation: none; }
  }
`,g="http://www.w3.org/2000/svg";function v(n,t){const e=document.createElementNS(g,n);for(const r in t)e.setAttribute(r,t[r]);return e}function m(){const n=v("svg",{class:"vco__check",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"});return n.append(v("path",{d:"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),v("path",{d:"M7.75 11.9999L10.58 14.8299L16.25 9.16992",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),n}function f(){const n=v("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"});return n.append(v("path",{d:"M6 6L18 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),v("path",{d:"M18 6L6 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),n}let b;function x(n){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=n;const t=b.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(n,t){const e=t?x(String(t).trim()):null;if(!e){for(const i of k)n.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),c=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(i=>Math.round(c?i*.92:i+(255-i)*.16)),o=(i,l)=>n.style.setProperty(i,l);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,s);o("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,c?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,c?"0 0 0":"255 255 255");o("--vs-color",s),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","selectable","model-value","dot","removable","disabled","color"];#s;#t;#d;#a;#c;#i;#v;#l;#e;#r;#o;constructor(){super(),this.#s=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=h;const e=document.createElement("button");e.className="vco",this.#t=e;const r=document.createElement("span");r.className="vco__ring",r.setAttribute("aria-hidden","true"),this.#d=r;const d=document.createElement("span");d.className="vco__avatar";const c=document.createElement("slot");c.setAttribute("name","avatar"),d.append(c),this.#a=d;const s=document.createElement("span");s.className="vco__dot",s.setAttribute("aria-hidden","true"),this.#c=s,this.#i=m();const a=document.createElement("span");a.className="vco__label";const o=document.createElement("slot"),i=document.createElement("span");o.append(i),a.append(o),this.#v=a,this.#l=i;const l=document.createElement("button");l.type="button",l.className="vco__close",l.append(f()),this.#e=l,e.append(r,d,s,this.#i,a,l),this.#s.append(t,e),c.addEventListener("slotchange",()=>this.#n()),this.#r=()=>this.#b(),this.#o=p=>this.#u(p)}connectedCallback(){u(this,this.getAttribute("color")),this.#t.addEventListener("click",this.#r),this.#e.addEventListener("click",this.#o),this.#n()}disconnectedCallback(){this.#t.removeEventListener("click",this.#r),this.#e.removeEventListener("click",this.#o)}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#t&&this.#n()}get modelValue(){return this.hasAttribute("model-value")}set modelValue(t){t?this.setAttribute("model-value",""):this.removeAttribute("model-value")}get selectable(){return this.hasAttribute("selectable")}set selectable(t){t?this.setAttribute("selectable",""):this.removeAttribute("selectable")}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#b(){const t=this.hasAttribute("disabled"),e=this.hasAttribute("selectable");if(t||!e)return;const r=!this.hasAttribute("model-value");r?this.setAttribute("model-value",""):this.removeAttribute("model-value"),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:r})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:r}))}#u(t){this.hasAttribute("disabled")||(t.stopPropagation(),this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0})))}#n(){const t=(i,l)=>this.getAttribute(i)??l,e=this.hasAttribute("disabled"),r=this.hasAttribute("selectable"),d=this.hasAttribute("dot"),c=this.hasAttribute("removable"),s=r&&this.hasAttribute("model-value"),a=t("label","Chip"),o=this.querySelector('[slot="avatar"]')!=null;this.#t.className=["vco",`vco--${t("size","md")}`,`vco--v-${t("variant","soft")}`,`vco--r-${t("radius","pill")}`,`vco--t-${t("tone","default")}`,e?"is-disabled":"",s?"is-selected":"",r?"is-clickable":""].filter(Boolean).join(" "),r?(this.#t.type="button",this.#t.disabled=e,this.#t.setAttribute("aria-pressed",String(s)),this.#t.removeAttribute("tabindex")):(this.#t.removeAttribute("type"),this.#t.disabled=!1,this.#t.removeAttribute("aria-pressed"),this.#t.setAttribute("tabindex","-1")),this.#a.style.display=o?"":"none",this.#c.style.display=!o&&d?"":"none",this.#i.style.display=s?"":"none",this.#l.textContent=a,this.#e.style.display=c?"":"none",this.#e.disabled=e,this.#e.setAttribute("aria-label",`Remove ${a}`)}}customElements.define("vs-chip-outline",y);
