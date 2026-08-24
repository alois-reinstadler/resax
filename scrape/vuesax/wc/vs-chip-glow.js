const u=`
  :host { display: inline-flex; }
  :host([hidden]) { display: none; }
  .vcgl {
    --h: var(--ctrl-h-md, 28px);
    --px: 11px;
    --fs: var(--ctrl-fs-md, 13px);
    --gap: 6px;
    --rr: var(--ctrl-r-pill, 999px);
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
    border: 1px solid rgb(var(--ring) / 0.2);
    border-radius: var(--rr);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    color: var(--inp-text, #ededed);
    background: rgb(var(--ring) / 0.12);
    box-shadow: 0 0 0 rgb(var(--ring) / 0);
    transition: box-shadow 260ms ease, border-color 200ms ease, background-color 200ms ease, color 200ms ease;
  }
  .vcgl.is-clickable { cursor: pointer; }

  .vcgl.is-clickable:hover:not(.is-disabled) {
    border-color: rgb(var(--ring) / 0.5);
    box-shadow: 0 0 14px -1px rgb(var(--ring) / 0.55);
  }

  /* selected → pulsing glow */
  /* Perf: static min shadow on the chip; the max state is baked into ::after
     and only its opacity animates (compositable) — no per-frame repaint. */
  .vcgl.is-selected {
    background: rgb(var(--ring) / 0.9);
    color: var(--solid-fg);
    border-color: transparent;
    box-shadow: 0 0 10px -2px rgb(var(--ring) / 0.5);
  }
  .vcgl.is-selected::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: 0 0 20px 2px rgb(var(--ring) / 0.75);
    opacity: 0;
    animation: vcgl-pulse 1.9s ease-in-out infinite;
  }
  /* selected + hover: keep the transparent border and selected shadow (the
     plain hover rule above has higher specificity and would otherwise
     re-show a border and swap in its own, smaller shadow) */
  .vcgl.is-selected.is-clickable:hover:not(.is-disabled) {
    border-color: transparent;
    box-shadow: 0 0 10px -2px rgb(var(--ring) / 0.5);
  }

  @keyframes vcgl-pulse {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  /* variants */
  .vcgl--v-solid { background: rgb(var(--ring) / 0.9); color: var(--solid-fg); border-color: transparent; }
  .vcgl--v-outline { background: transparent; border-color: rgb(var(--ring) / 0.45); }

  /* sizes */
  .vcgl--sm { --h: var(--ctrl-h-sm, 24px); --px: 9px; --fs: var(--ctrl-fs-sm, 12px); --gap: 5px; }
  .vcgl--lg { --h: var(--ctrl-h-lg, 32px); --px: 14px; --fs: var(--ctrl-fs-lg, 14px); --gap: 7px; }

  /* radii */
  .vcgl--r-subtle { --rr: var(--ctrl-r-sm, 7px); }
  .vcgl--r-rounded { --rr: var(--ctrl-r-md, 10px); }
  .vcgl--r-pill { --rr: var(--ctrl-r-pill, 999px); }

  .vcgl:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  .vcgl__dot { width: 7px; height: 7px; border-radius: 999px; background: var(--accent); flex: 0 0 auto; box-shadow: 0 0 6px var(--accent); }
  .vcgl.is-selected .vcgl__dot { background: currentColor; box-shadow: none; }
  .vcgl__avatar { display: inline-flex; margin-left: -3px; }
  .vcgl__avatar ::slotted(img), .vcgl__avatar ::slotted(*) { width: 1.45em; height: 1.45em; border-radius: 999px; object-fit: cover; }
  .vcgl__check { flex: 0 0 auto; margin-left: -1px; width: 1em; height: 1em; }
  .vcgl__close svg { width: 1em; height: 1em; }
  .vcgl__label { position: relative; z-index: 1; }

  .vcgl__close {
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
  .vcgl__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.25); }
  .vcgl__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }

  /* tones */
  .vcgl--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --solid-fg: #160405; }
  .vcgl--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --solid-fg: #160f02; }
  .vcgl--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --solid-fg: #04120b; }

  .vcgl.is-disabled { opacity: 0.5; cursor: not-allowed; }
  .vcgl.is-disabled .vcgl__close { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .vcgl, .vcgl__close { transition: none; }
    .vcgl.is-selected { animation: none; box-shadow: 0 0 16px 0 rgb(var(--ring) / 0.6); }
    .vcgl.is-selected::after { animation: none; opacity: 0; }
  }
`,v="http://www.w3.org/2000/svg";function b(o,e){const t=document.createElementNS(v,o);for(const i in e)t.setAttribute(i,e[i]);return t}function m(){const o=b("svg",{class:"vcgl__check",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"});return o.append(b("path",{d:"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),b("path",{d:"M7.75 11.9999L10.58 14.8299L16.25 9.16992",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),o}function f(){const o=b("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"});return o.append(b("path",{d:"M6 6L18 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),b("path",{d:"M18 6L6 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),o}let g;function x(o){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=o;const e=g.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(o,e){const t=e?x(String(e).trim()):null;if(!t){for(const r of k)o.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),l=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,n=`rgb(${t[0]} ${t[1]} ${t[2]})`,a=t.map(r=>Math.round(l?r*.92:r+(255-r)*.16)),s=(r,c)=>o.style.setProperty(r,c);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(r,n);s("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(r,l?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])s(r,l?"0 0 0":"255 255 255");s("--vs-color",n),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","selectable","model-value","dot","removable","disabled","color"];#e;#n;#a;#r;#c;#l;#t;#i;#s;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=u;const i=document.createElement("button");i.className="vcgl",this.#e=i;const d=document.createElement("span");d.className="vcgl__avatar";const l=document.createElement("slot");l.setAttribute("name","avatar"),d.append(l),this.#n=d;const n=document.createElement("span");n.className="vcgl__dot",n.setAttribute("aria-hidden","true"),this.#a=n,this.#r=m();const a=document.createElement("span");a.className="vcgl__label";const s=document.createElement("slot"),r=document.createElement("span");s.append(r),a.append(s),this.#c=a,this.#l=r;const c=document.createElement("button");c.type="button",c.className="vcgl__close",c.append(f()),this.#t=c,i.append(d,n,this.#r,a,c),e.append(t,i),l.addEventListener("slotchange",()=>this.#o()),this.#i=()=>this.#d(),this.#s=p=>this.#b(p)}connectedCallback(){h(this,this.getAttribute("color")),this.#e.addEventListener("click",this.#i),this.#t.addEventListener("click",this.#s),this.#o()}disconnectedCallback(){this.#e.removeEventListener("click",this.#i),this.#t.removeEventListener("click",this.#s)}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#e&&this.#o()}get modelValue(){return this.hasAttribute("model-value")}set modelValue(e){e?this.setAttribute("model-value",""):this.removeAttribute("model-value")}get selectable(){return this.hasAttribute("selectable")}set selectable(e){e?this.setAttribute("selectable",""):this.removeAttribute("selectable")}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#d(){const e=this.hasAttribute("disabled"),t=this.hasAttribute("selectable");if(e||!t)return;const i=!this.hasAttribute("model-value");i?this.setAttribute("model-value",""):this.removeAttribute("model-value"),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:i})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:i}))}#b(e){this.hasAttribute("disabled")||(e.stopPropagation(),this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0})))}#o(){const e=(r,c)=>this.getAttribute(r)??c,t=this.hasAttribute("disabled"),i=this.hasAttribute("selectable"),d=this.hasAttribute("dot"),l=this.hasAttribute("removable"),n=i&&this.hasAttribute("model-value"),a=e("label","Chip"),s=this.querySelector('[slot="avatar"]')!=null;this.#e.className=["vcgl",`vcgl--${e("size","md")}`,`vcgl--v-${e("variant","soft")}`,`vcgl--r-${e("radius","pill")}`,`vcgl--t-${e("tone","default")}`,t?"is-disabled":"",n?"is-selected":"",i?"is-clickable":""].filter(Boolean).join(" "),i?(this.#e.type="button",this.#e.disabled=t,this.#e.setAttribute("aria-pressed",String(n)),this.#e.removeAttribute("tabindex")):(this.#e.removeAttribute("type"),this.#e.disabled=!1,this.#e.removeAttribute("aria-pressed"),this.#e.setAttribute("tabindex","-1")),this.#n.style.display=s?"":"none",this.#a.style.display=!s&&d?"":"none",this.#r.style.display=n?"":"none",this.#l.textContent=a,this.#t.style.display=l?"":"none",this.#t.disabled=t,this.#t.setAttribute("aria-label",`Remove ${a}`)}}customElements.define("vs-chip-glow",y);
