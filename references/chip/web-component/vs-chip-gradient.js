const u=`
  :host { display: inline-flex; }
  :host([hidden]) { display: none; }
  .vcg {
    --h: var(--ctrl-h-md, 28px);
    --px: 11px;
    --fs: var(--ctrl-fs-md, 13px);
    --gap: 6px;
    --rr: var(--ctrl-r-pill, 999px);
    --vcg-accent: var(--ui-accent, #ededed);
    --ring: var(--inp-ring, var(--ui-ring, 255 255 255));
    --solid-fg: var(--badge-solid-fg, #0b0b0b);

    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    height: var(--h);
    padding: 0 var(--px);
    border: 1px solid transparent;
    border-radius: var(--rr);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    overflow: hidden;
    color: var(--inp-text, #ededed);
    background: rgb(var(--ring) / 0.12);
    border-color: rgb(var(--ring) / 0.2);
    transition: border-color 200ms ease, color 200ms ease, transform 200ms ease;
  }
  .vcg.is-clickable { cursor: pointer; }

  /* animated gradient */
  .vcg__grad {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    background: linear-gradient(
      100deg,
      rgb(var(--ring) / 0.10) 0%,
      rgb(var(--ring) / 0.42) 35%,
      var(--vcg-accent) 55%,
      rgb(var(--ring) / 0.42) 75%,
      rgb(var(--ring) / 0.10) 100%
    );
    background-size: 260% 100%;
    background-position: 0% 50%;
    opacity: 0.35;
    animation: vcg-pan 5s linear infinite;
    transition: opacity 220ms ease;
  }
  .vcg.is-clickable:hover:not(.is-disabled) .vcg__grad { opacity: 0.6; }
  .vcg.is-selected .vcg__grad { opacity: 1; animation-duration: 3s; }
  .vcg.is-selected { color: var(--solid-fg); border-color: transparent; }
  /* selected + hover: keep the opaque grad (higher specificity than the plain
     hover rule above), otherwise hovering a selected chip dims the gradient
     the solid-fg text was tuned against */
  .vcg.is-selected.is-clickable:hover:not(.is-disabled) .vcg__grad { opacity: 1; }

  @keyframes vcg-pan {
    to { background-position: 260% 50%; }
  }

  /* variants (base color layer) */
  .vcg--v-solid { background: rgb(var(--ring) / 0.9); color: var(--solid-fg); border-color: transparent; }
  .vcg--v-outline { background: transparent; border-color: rgb(var(--ring) / 0.45); }

  /* sizes */
  .vcg--sm { --h: var(--ctrl-h-sm, 24px); --px: 9px; --fs: var(--ctrl-fs-sm, 12px); --gap: 5px; }
  .vcg--lg { --h: var(--ctrl-h-lg, 32px); --px: 14px; --fs: var(--ctrl-fs-lg, 14px); --gap: 7px; }

  /* radii */
  .vcg--r-subtle { --rr: var(--ctrl-r-sm, 7px); }
  .vcg--r-rounded { --rr: var(--ctrl-r-md, 10px); }
  .vcg--r-pill { --rr: var(--ctrl-r-pill, 999px); }

  .vcg:focus-visible { outline: 2px solid var(--vcg-accent); outline-offset: 2px; }

  /* inner elements */
  .vcg__dot { position: relative; z-index: 1; width: 7px; height: 7px; border-radius: 999px; background: var(--vcg-accent); flex: 0 0 auto; }
  .vcg.is-selected .vcg__dot { background: currentColor; }
  .vcg__avatar { position: relative; z-index: 1; display: inline-flex; margin-left: -3px; }
  .vcg__avatar ::slotted(img), .vcg__avatar ::slotted(*) { width: 1.45em; height: 1.45em; border-radius: 999px; object-fit: cover; }
  .vcg__check { position: relative; z-index: 1; flex: 0 0 auto; margin-left: -1px; width: 1em; height: 1em; }
  .vcg__close svg { width: 1em; height: 1em; }
  .vcg__label { position: relative; z-index: 1; }

  .vcg__close {
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
  .vcg__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.25); }
  .vcg__close:focus-visible { outline: 2px solid var(--vcg-accent); outline-offset: 1px; }

  /* tones */
  .vcg--t-danger { --vcg-accent: #ff6369; --ring: 255 99 105; --solid-fg: #160405; }
  .vcg--t-warn { --vcg-accent: #ffb224; --ring: 255 178 36; --solid-fg: #160f02; }
  .vcg--t-success { --vcg-accent: #4cc38a; --ring: 76 195 138; --solid-fg: #04120b; }

  .vcg.is-disabled { opacity: 0.5; cursor: not-allowed; }
  .vcg.is-disabled .vcg__close { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .vcg, .vcg__close { transition: none; }
    .vcg__grad { animation: none; }
  }
`,p="http://www.w3.org/2000/svg";function g(n,e){const t=document.createElementNS(p,n);for(const r in e)t.setAttribute(r,e[r]);return t}function m(){const n=g("svg",{class:"vcg__check",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"});return n.append(g("path",{d:"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),g("path",{d:"M7.75 11.9999L10.58 14.8299L16.25 9.16992",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),n}function f(){const n=g("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"});return n.append(g("path",{d:"M6 6L18 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),g("path",{d:"M18 6L6 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),n}let v;function x(n){if(v||=document.createElement("canvas").getContext("2d"),!v)return null;v.fillStyle="#000",v.fillStyle=n;const e=v.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(n,e){const t=e?x(String(e).trim()):null;if(!t){for(const i of k)n.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),l=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(i=>Math.round(l?i*.92:i+(255-i)*.16)),s=(i,c)=>n.style.setProperty(i,c);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(i,a);s("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(i,l?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])s(i,l?"0 0 0":"255 255 255");s("--vs-color",a),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","selectable","model-value","dot","removable","disabled","color"];#a;#e;#d;#o;#l;#i;#g;#c;#t;#r;#s;constructor(){super(),this.#a=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=u;const t=document.createElement("button");t.className="vcg",this.#e=t;const r=document.createElement("span");r.className="vcg__grad",r.setAttribute("aria-hidden","true"),this.#d=r;const d=document.createElement("span");d.className="vcg__avatar";const l=document.createElement("slot");l.setAttribute("name","avatar"),d.append(l),this.#o=d;const a=document.createElement("span");a.className="vcg__dot",a.setAttribute("aria-hidden","true"),this.#l=a,this.#i=m();const o=document.createElement("span");o.className="vcg__label";const s=document.createElement("slot"),i=document.createElement("span");s.append(i),o.append(s),this.#g=o,this.#c=i;const c=document.createElement("button");c.type="button",c.className="vcg__close",c.append(f()),this.#t=c,t.append(r,d,a,this.#i,o,c),this.#a.append(e,t),l.addEventListener("slotchange",()=>this.#n()),this.#r=()=>this.#v(),this.#s=h=>this.#b(h)}connectedCallback(){b(this,this.getAttribute("color")),this.#e.addEventListener("click",this.#r),this.#t.addEventListener("click",this.#s),this.#n()}disconnectedCallback(){this.#e.removeEventListener("click",this.#r),this.#t.removeEventListener("click",this.#s)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#e&&this.#n()}get modelValue(){return this.hasAttribute("model-value")}set modelValue(e){e?this.setAttribute("model-value",""):this.removeAttribute("model-value")}get selectable(){return this.hasAttribute("selectable")}set selectable(e){e?this.setAttribute("selectable",""):this.removeAttribute("selectable")}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#v(){const e=this.hasAttribute("disabled"),t=this.hasAttribute("selectable");if(e||!t)return;const r=!this.hasAttribute("model-value");r?this.setAttribute("model-value",""):this.removeAttribute("model-value"),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:r})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:r}))}#b(e){this.hasAttribute("disabled")||(e.stopPropagation(),this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0})))}#n(){const e=(i,c)=>this.getAttribute(i)??c,t=this.hasAttribute("disabled"),r=this.hasAttribute("selectable"),d=this.hasAttribute("dot"),l=this.hasAttribute("removable"),a=r&&this.hasAttribute("model-value"),o=e("label","Chip"),s=this.querySelector('[slot="avatar"]')!=null;this.#e.className=["vcg",`vcg--${e("size","md")}`,`vcg--v-${e("variant","soft")}`,`vcg--r-${e("radius","pill")}`,`vcg--t-${e("tone","default")}`,t?"is-disabled":"",a?"is-selected":"",r?"is-clickable":""].filter(Boolean).join(" "),r?(this.#e.type="button",this.#e.disabled=t,this.#e.setAttribute("aria-pressed",String(a)),this.#e.removeAttribute("tabindex")):(this.#e.removeAttribute("type"),this.#e.disabled=!1,this.#e.removeAttribute("aria-pressed"),this.#e.setAttribute("tabindex","-1")),this.#o.style.display=s?"":"none",this.#l.style.display=!s&&d?"":"none",this.#i.style.display=a?"":"none",this.#c.textContent=o,this.#t.style.display=l?"":"none",this.#t.disabled=t,this.#t.setAttribute("aria-label",`Remove ${o}`)}}customElements.define("vs-chip-gradient",y);
