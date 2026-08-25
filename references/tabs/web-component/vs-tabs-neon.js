const h=[{label:"Overview",value:"overview"},{label:"Activity",value:"activity"},{label:"Settings",value:"settings"},{label:"Members",value:"members",disabled:!0}],u=`
  :host { display: inline-flex; max-width: 100%; }
  :host([block]) { display: flex; width: 100%; }
  .tbn {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --gap: 4px;
    --tab-px: 14px;
    --from: var(--vs-color, #ededed);
    --to: #8a8a8a;
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .tbn--block { display: flex; width: 100%; }
  .tbn--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 32px); --tab-px: 11px; }
  .tbn--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --tab-px: 18px; }

  .tbn__list {
    position: relative;
    display: inline-flex;
    gap: var(--gap);
    width: 100%;
    padding-bottom: 3px;
    border-bottom: 1px solid var(--border, #2a2a2a);
    /* More tabs than the box can hold become a rail, not an overflow: the neon
       underline slides along one row and a wrapped second row would leave it
       behind. The top padding (with a matching negative margin) buys back the
       vertical room overflow-x takes away — it forces overflow-y to auto, which
       would clip the glow above the letters. */
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    padding-top: 8px;
    margin-top: -8px;
  }
  .tbn__list::-webkit-scrollbar { display: none; }

  .tbn__tab {
    position: relative;
    z-index: 1;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--tab-px);
    border: 0;
    background: transparent;
    color: var(--text-muted, #8a8a8a);
    font: inherit;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: color 240ms ease, text-shadow 240ms ease;
  }
  .tbn--block .tbn__tab { flex: 1 1 0; }
  .tbn__tab:hover:not(:disabled):not(.is-active) { color: var(--text, #ededed); }
  .tbn__tab.is-active {
    color: #fff;
    text-shadow:
      0 0 8px color-mix(in srgb, var(--from) 70%, transparent),
      0 0 16px color-mix(in srgb, var(--to) 45%, transparent);
  }
  .tbn__tab:disabled { opacity: 0.4; cursor: not-allowed; }
  .tbn__tab:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--from) 70%, transparent);
    outline-offset: 2px;
  }
  .tbn__icon { display: inline-flex; margin-right: 6px; }
  .tbn__icon svg { width: 18px; height: 18px; display: block; }

  /* neon underline: gradient bar that slides + sweeps its gradient + glows */
  .tbn__ind {
    position: absolute;
    z-index: 0;
    left: 0;
    bottom: -1px;
    height: 2px;
    border-radius: 2px;
    opacity: 0;
    pointer-events: none;
    background: linear-gradient(90deg, var(--from), var(--to), var(--from));
    background-size: 200% 100%;
    box-shadow:
      0 0 8px color-mix(in srgb, var(--from) 80%, transparent),
      0 0 16px color-mix(in srgb, var(--to) 55%, transparent);
    transition:
      transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      width 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      opacity 200ms ease;
    animation: tbn-sweep 3s linear infinite;
  }
  .tbn.is-ready .tbn__ind { opacity: 1; }
  @keyframes tbn-sweep {
    to { background-position: -200% 0; }
  }

  .tbn--disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .tbn__ind { transition: opacity 200ms ease; animation: none; }
    .tbn__tab { transition: color 240ms ease; }
  }
`;let d;function f(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(c,t){const e=t?f(String(t).trim()):null;if(!e){for(const s of m)c.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,i=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),n=(s,p)=>c.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(s,i);n("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])n(s,o?"0 0 0":"255 255 255");n("--vs-color",i),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["value","size","block","disabled","from","to","color"];#t;#e;#i;#a=[];#o=null;#l=null;#n=0;#h;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.setAttribute("role","tablist"),this.#e=document.createElement("div"),this.#e.className="tbn__list",this.#i=document.createElement("span"),this.#i.className="tbn__ind",this.#i.setAttribute("aria-hidden","true"),this.#e.appendChild(this.#i),this.#t.appendChild(this.#e),this.#h=r=>this.#m(r),t.append(e,this.#t)}connectedCallback(){b(this,this.getAttribute("color")),this.#b(),this.#p(),this.#t.addEventListener("keydown",this.#h),this.#l=new ResizeObserver(()=>this.#d()),this.#l.observe(this.#e),this.#d()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#h),this.#l?.disconnect(),this.#l=null,this.#n&&cancelAnimationFrame(this.#n),this.#n=0}attributeChangedCallback(t){b(this,this.getAttribute("color")),this.#t&&(this.#b(),t==="value"&&this.#f())}set tabs(t){this.#o=Array.isArray(t)&&t.length?t:null,this.#o?.some(e=>e.value===this.value)||(this.value=this.#s().find(e=>!e.disabled)?.value??this.#s()[0]?.value??""),this.#t&&this.#p()}get tabs(){return this.#o??h}set value(t){this.setAttribute("value",String(t))}get value(){return this.getAttribute("value")??this.#s()[0]?.value??""}#s(){return this.#o??h}#r(){return this.hasAttribute("disabled")&&this.hasAttribute("disabled")}#c(){const t=String(this.value),e=this.#s().findIndex(r=>String(r.value)===t);return e<0?0:e}#b(){const t=(o,i)=>this.getAttribute(o)??i,e=this.#t.classList.contains("is-ready")?" is-ready":"",r=this.hasAttribute("block")?" tbn--block":"",a=this.#r()?" tbn--disabled":"";this.#t.className=`tbn tbn--${t("size","md")}${r}${a}${e}`,this.#t.style.setProperty("--from",t("from","#ededed")),this.#t.style.setProperty("--to",t("to","#8a8a8a")),this.#t.setAttribute("aria-disabled",this.#r()?"true":"false")}#p(){for(;this.#e.lastChild&&this.#e.lastChild!==this.#i;)this.#e.removeChild(this.#e.lastChild);this.#a=[];const t=this.#s(),e=this.#c(),r=this.#r();t.forEach((a,o)=>{const i=document.createElement("button");i.type="button",i.className="tbn__tab"+(o===e?" is-active":""),i.setAttribute("role","tab"),i.setAttribute("aria-selected",o===e?"true":"false");const l=r||!!a.disabled;if(i.disabled=l,l&&i.setAttribute("aria-disabled","true"),i.tabIndex=o===e?0:-1,a.icon){const n=document.createElement("span");n.className="tbn__icon",n.innerHTML=a.icon,i.appendChild(n)}else i.append(a.label);i.addEventListener("click",()=>this.#u(o)),this.#e.appendChild(i),this.#a.push(i)}),this.#d()}#f(){const t=this.#c();this.#a.forEach((e,r)=>{const a=r===t;e.classList.toggle("is-active",a),e.setAttribute("aria-selected",a?"true":"false"),e.tabIndex=a?0:-1}),this.#d()}#d(){this.#n||(this.#n=requestAnimationFrame(()=>{this.#n=0;const t=this.#a[this.#c()];t&&(this.#i.style.transform=`translateX(${t.offsetLeft}px)`,this.#i.style.width=`${t.offsetWidth}px`,this.#t.classList.contains("is-ready")||this.#t.classList.add("is-ready"))}))}#u(t){if(this.#r())return;const e=this.#s()[t];!e||e.disabled||e.value===this.value||(this.value=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value,index:t}})))}#m(t){if(this.#r()||!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"].includes(t.key))return;const a=this.#s().map((n,s)=>({t:n,i:s})).filter(n=>!n.t.disabled);if(!a.length)return;t.preventDefault();const o=a.findIndex(n=>n.i===this.#c());let i;if(t.key==="Home")i=0;else if(t.key==="End")i=a.length-1;else{const n=t.key==="ArrowRight"||t.key==="ArrowDown";i=o<0?0:(o+(n?1:-1)+a.length)%a.length}const l=a[i].i;this.#u(l),this.#a[l]?.focus()}}customElements.define("vs-tabs-neon",g);
