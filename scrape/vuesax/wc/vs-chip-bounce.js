const v=`
  :host { display: inline-flex; }
  :host([hidden]) { display: none; }
  .vcb {
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
    transform-origin: center bottom;
    color: var(--inp-text, #ededed);
    background: rgb(var(--ring) / 0.12);
    transition: border-color 200ms ease, background-color 200ms ease, color 200ms ease;
  }
  .vcb.is-clickable { cursor: pointer; }
  .vcb.is-clickable:hover:not(.is-disabled) { border-color: rgb(var(--ring) / 0.5); }

  .vcb.is-clickable:active:not(.is-disabled) { transform: scale(0.94); }
  .vcb.is-bouncing { animation: vcb-bounce 520ms cubic-bezier(0.34, 1.56, 0.64, 1); }

  @keyframes vcb-bounce {
    0% { transform: scale(0.9, 1.05); }
    35% { transform: scale(1.12, 0.9); }
    60% { transform: scale(0.96, 1.04); }
    80% { transform: scale(1.03, 0.98); }
    100% { transform: scale(1, 1); }
  }

  /* selected */
  .vcb.is-selected { background: rgb(var(--ring) / 0.9); color: var(--solid-fg); border-color: transparent; }
  /* selected + hover: keep the border transparent (the plain hover rule
     above has higher specificity and would otherwise re-show a border) */
  .vcb.is-selected.is-clickable:hover:not(.is-disabled) { border-color: transparent; }

  /* variants */
  .vcb--v-solid { background: rgb(var(--ring) / 0.9); color: var(--solid-fg); border-color: transparent; }
  .vcb--v-outline { background: transparent; border-color: rgb(var(--ring) / 0.45); }

  /* sizes */
  .vcb--sm { --h: var(--ctrl-h-sm, 24px); --px: 9px; --fs: var(--ctrl-fs-sm, 12px); --gap: 5px; }
  .vcb--lg { --h: var(--ctrl-h-lg, 32px); --px: 14px; --fs: var(--ctrl-fs-lg, 14px); --gap: 7px; }

  /* radii */
  .vcb--r-subtle { --rr: var(--ctrl-r-sm, 7px); }
  .vcb--r-rounded { --rr: var(--ctrl-r-md, 10px); }
  .vcb--r-pill { --rr: var(--ctrl-r-pill, 999px); }

  .vcb:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  .vcb__dot { width: 7px; height: 7px; border-radius: 999px; background: var(--accent); flex: 0 0 auto; }
  .vcb.is-selected .vcb__dot { background: currentColor; }
  .vcb__avatar { display: inline-flex; margin-left: -3px; }
  .vcb__avatar ::slotted(img), .vcb__avatar ::slotted(*) { width: 1.45em; height: 1.45em; border-radius: 999px; object-fit: cover; }
  .vcb__check { flex: 0 0 auto; margin-left: -1px; animation: vcb-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .vcb__label { position: relative; z-index: 1; }

  @keyframes vcb-pop {
    0% { transform: scale(0); }
    60% { transform: scale(1.35); }
    100% { transform: scale(1); }
  }

  .vcb__close {
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
    transition: opacity 160ms ease, background-color 160ms ease, transform 160ms ease;
  }
  .vcb__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.25); transform: scale(1.15); }
  .vcb__close:active:not(:disabled) { transform: scale(0.85); }
  .vcb__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }

  /* tones */
  .vcb--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --solid-fg: #160405; }
  .vcb--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --solid-fg: #160f02; }
  .vcb--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --solid-fg: #04120b; }

  .vcb.is-disabled { opacity: 0.5; cursor: not-allowed; }
  .vcb.is-disabled .vcb__close { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .vcb, .vcb__close { transition: none; }
    .vcb.is-clickable:active:not(.is-disabled) { transform: none; }
    .vcb.is-bouncing { animation: none; }
    .vcb__check { animation: none; }
  }
`,p="http://www.w3.org/2000/svg";function c(n,e){const t=document.createElementNS(p,n);for(const r in e)t.setAttribute(r,e[r]);return t}function m(){const n=c("svg",{class:"vcb__check",viewBox:"0 0 24 24",width:"1em",height:"1em",fill:"none","aria-hidden":"true"}),e=c("g",{"clip-path":"url(#vcb-clip)"});e.append(c("path",{d:"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),c("path",{d:"M7.75 11.9999L10.58 14.8299L16.25 9.16992",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}));const t=c("defs",{}),r=c("clipPath",{id:"vcb-clip"});return r.append(c("rect",{width:"24",height:"24",fill:"currentColor"})),t.append(r),n.append(e,t),n}function f(){const n=c("svg",{viewBox:"0 0 24 24",width:"1em",height:"1em",fill:"none","aria-hidden":"true"});return n.append(c("path",{d:"M6 6L18 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),c("path",{d:"M18 6L6 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),n}let h;function g(n){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=n;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(n,e){const t=e?g(String(e).trim()):null;if(!t){for(const i of k)n.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),o=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(i=>Math.round(o?i*.92:i+(255-i)*.16)),s=(i,b)=>n.style.setProperty(i,b);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(i,a);s("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(i,o?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])s(i,o?"0 0 0":"255 255 255");s("--vs-color",a),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","selectable","model-value","dot","removable","disabled","color"];#c;#e;#l;#d;#r;#h;#b;#i;#t=null;#s;#n;#o;constructor(){super(),this.#c=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=v;const t=document.createElement("button");t.className="vcb",this.#e=t;const r=document.createElement("span");r.className="vcb__avatar";const d=document.createElement("slot");d.setAttribute("name","avatar"),r.append(d),this.#l=r;const o=document.createElement("span");o.className="vcb__dot",o.setAttribute("aria-hidden","true"),this.#d=o,this.#r=m();const a=document.createElement("span");a.className="vcb__label";const l=document.createElement("slot"),s=document.createElement("span");l.append(s),a.append(l),this.#h=a,this.#b=s;const i=document.createElement("button");i.type="button",i.className="vcb__close",i.append(f()),this.#i=i,t.append(r,o,this.#r,a,i),this.#c.append(e,t),d.addEventListener("slotchange",()=>this.#a()),this.#s=()=>this.#v(),this.#n=b=>this.#p(b),this.#o=()=>this.#e.classList.remove("is-bouncing")}connectedCallback(){u(this,this.getAttribute("color")),this.#e.addEventListener("click",this.#s),this.#i.addEventListener("click",this.#n),this.#e.addEventListener("animationend",this.#o),this.#a()}disconnectedCallback(){this.#e.removeEventListener("click",this.#s),this.#i.removeEventListener("click",this.#n),this.#e.removeEventListener("animationend",this.#o),this.#t!=null&&(cancelAnimationFrame(this.#t),this.#t=null)}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#e&&this.#a()}get modelValue(){return this.hasAttribute("model-value")}set modelValue(e){e?this.setAttribute("model-value",""):this.removeAttribute("model-value")}get selectable(){return this.hasAttribute("selectable")}set selectable(e){e?this.setAttribute("selectable",""):this.removeAttribute("selectable")}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#u(){this.#e.classList.remove("is-bouncing"),this.#t!=null&&cancelAnimationFrame(this.#t),this.#t=requestAnimationFrame(()=>{this.#t=null,this.#e.classList.add("is-bouncing")})}#v(){const e=this.hasAttribute("disabled"),t=this.hasAttribute("selectable");if(e||!t)return;this.#u();const r=!this.hasAttribute("model-value");r?this.setAttribute("model-value",""):this.removeAttribute("model-value"),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:r})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:r}))}#p(e){this.hasAttribute("disabled")||(e.stopPropagation(),this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0})))}#a(){const e=(i,b)=>this.getAttribute(i)??b,t=this.hasAttribute("disabled"),r=this.hasAttribute("selectable"),d=this.hasAttribute("dot"),o=this.hasAttribute("removable"),a=r&&this.hasAttribute("model-value"),l=e("label","Chip"),s=this.querySelector('[slot="avatar"]')!=null;this.#e.className=["vcb",`vcb--${e("size","md")}`,`vcb--v-${e("variant","soft")}`,`vcb--r-${e("radius","pill")}`,`vcb--t-${e("tone","default")}`,t?"is-disabled":"",a?"is-selected":"",r?"is-clickable":""].filter(Boolean).join(" "),r?(this.#e.type="button",this.#e.disabled=t,this.#e.setAttribute("aria-pressed",String(a)),this.#e.removeAttribute("tabindex")):(this.#e.removeAttribute("type"),this.#e.disabled=!1,this.#e.removeAttribute("aria-pressed"),this.#e.setAttribute("tabindex","-1")),this.#l.style.display=s?"":"none",this.#d.style.display=!s&&d?"":"none",this.#r.style.display=a?"":"none",this.#b.textContent=l,this.#i.style.display=o?"":"none",this.#i.disabled=t,this.#i.setAttribute("aria-label",`Remove ${l}`)}}customElements.define("vs-chip-bounce",x);
