const p=[{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"Lifetime",value:"lifetime"}],u=`
  :host { display: inline-flex; max-width: 100%; }
  .rgsld {
    --h: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --acc: var(--ui-accent, #ededed);
    position: relative;
    display: inline-flex;
    isolation: isolate;
    font-family: inherit;
  }
  .rgsld--vertical {
    flex-direction: column;
    align-items: stretch;
    padding-left: 12px;
    border-left: 1px solid var(--inp-border, #2a2a2a);
  }
  .rgsld--horizontal {
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--inp-border, #2a2a2a);
  }
  .rgsld--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .rgsld--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .rgsld--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  .rgsld--danger  { --acc: var(--tone-danger, #ef4444); }
  .rgsld--warn    { --acc: var(--tone-warn, #f59e0b); }
  .rgsld--success { --acc: var(--tone-success, #22c55e); }

  /* One persistent bar that slides to the active option. transform / width /
     height are set imperatively; the transition is what makes it glide. */
  .rgsld__bar {
    position: absolute;
    z-index: 1;
    width: 0;
    height: 0;
    border-radius: 999px;
    background: var(--acc);
    box-shadow: 0 0 10px -1px color-mix(in srgb, var(--acc) 65%, transparent);
    opacity: 0;
    transition:
      transform 360ms cubic-bezier(0.34, 1.35, 0.5, 1),
      width 360ms cubic-bezier(0.34, 1.35, 0.5, 1),
      height 360ms cubic-bezier(0.34, 1.35, 0.5, 1),
      opacity 160ms ease;
    pointer-events: none;
  }
  .rgsld.is-ready .rgsld__bar { opacity: 1; }
  .rgsld--vertical .rgsld__bar { left: -12.5px; top: 0; }
  .rgsld--horizontal .rgsld__bar { bottom: -8.5px; left: 0; }

  .rgsld__opt {
    display: inline-flex;
    align-items: center;
    min-height: var(--h);
    padding: 0 var(--px);
    border: 0;
    background: transparent;
    color: color-mix(in srgb, var(--inp-text, #ededed) 60%, transparent);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    border-radius: 8px;
    -webkit-tap-highlight-color: transparent;
    transition: color 240ms ease;
  }
  .rgsld--vertical .rgsld__opt { justify-content: flex-start; padding-left: 4px; }
  .rgsld__opt:hover:not(:disabled) { color: var(--inp-text, #ededed); }
  .rgsld__opt--active { color: var(--inp-text, #ededed); }
  .rgsld__opt:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--acc) 70%, transparent);
    outline-offset: 2px;
  }
  .rgsld__opt:disabled { opacity: 0.4; cursor: not-allowed; }
  .rgsld--disabled { opacity: 0.6; pointer-events: none; }

  .rgsld__label {
    transition: transform 340ms cubic-bezier(0.34, 1.35, 0.5, 1);
  }
  .rgsld--vertical .rgsld__opt--active .rgsld__label { transform: translateX(4px); }
  .rgsld--horizontal .rgsld__opt--active .rgsld__label { transform: translateY(-1px); }

  @media (prefers-reduced-motion: reduce) {
    .rgsld__bar { transition: opacity 120ms ease; }
    .rgsld__opt, .rgsld__label { transition: none; }
    .rgsld__opt--active .rgsld__label { transform: none; }
  }
`;let c;function b(d){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=d;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(d,t){const e=t?b(String(t).trim()):null;if(!e){for(const s of f)d.style.removeProperty(s);return}const n=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,i=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),l=(s,h)=>d.style.setProperty(s,h);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(s,i);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])l(s,a?"0 0 0":"255 255 255");l("--vs-color",i),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["value","disabled","size","tone","direction","name","color"];#t;#e;#i=[];#d=null;#l=null;#s=0;#c;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.className="rgsld",this.#t.setAttribute("role","radiogroup"),this.#e=document.createElement("span"),this.#e.className="rgsld__bar",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e),this.#c=n=>this.#f(n),t.append(e,this.#t)}connectedCallback(){g(this,this.getAttribute("color")),this.#h(),this.#p(),this.#t.addEventListener("keydown",this.#c),this.#l=new ResizeObserver(()=>this.#a()),this.#l.observe(this.#t),this.#a()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#c),this.#l?.disconnect(),this.#l=null,this.#s&&cancelAnimationFrame(this.#s),this.#s=0}attributeChangedCallback(t){g(this,this.getAttribute("color")),this.#t&&(this.#h(),t==="value"?this.#b():t==="direction"&&this.#a())}set options(t){this.#d=Array.isArray(t)&&t.length?t:null,this.#t&&this.#p()}get options(){return this.#d??p}set value(t){this.setAttribute("value",String(t))}get value(){return this.getAttribute("value")??this.#r()[0]?.value}set name(t){this.setAttribute("name",String(t))}get name(){return this.getAttribute("name")??""}#r(){return this.#d??p}#n(){return this.hasAttribute("disabled")&&this.hasAttribute("disabled")}#u(){return(this.getAttribute("direction")??"vertical")!=="horizontal"}#o(){const t=String(this.value),e=this.#r().findIndex(n=>String(n.value)===t);return e<0?0:e}#h(){const t=(r,a)=>this.getAttribute(r)??a,e=this.#t.classList.contains("is-ready")?" is-ready":"",n=this.#n()?" rgsld--disabled":"";this.#t.className=`rgsld rgsld--${t("direction","vertical")} rgsld--${t("size","md")} rgsld--${t("tone","default")}${n}${e}`,this.#t.setAttribute("aria-disabled",this.#n()?"true":"false")}#p(){for(;this.#t.lastChild&&this.#t.lastChild!==this.#e;)this.#t.removeChild(this.#t.lastChild);this.#i=[];const t=this.#r(),e=this.#o(),n=this.#n();t.forEach((r,a)=>{const i=document.createElement("button");i.type="button",i.className="rgsld__opt"+(a===e?" rgsld__opt--active":""),i.setAttribute("role","radio"),i.setAttribute("aria-checked",a===e?"true":"false");const o=document.createElement("span");o.className="rgsld__label",o.textContent=r.label,i.appendChild(o);const l=n||!!r.disabled;i.disabled=l,l&&i.setAttribute("aria-disabled","true"),i.tabIndex=a===e?0:-1,i.addEventListener("click",()=>this.#g(a)),this.#t.appendChild(i),this.#i.push(i)}),this.#a()}#b(){const t=this.#o();this.#i.forEach((e,n)=>{const r=n===t;e.classList.toggle("rgsld__opt--active",r),e.setAttribute("aria-checked",r?"true":"false"),e.tabIndex=r?0:-1}),this.#a()}#a(){this.#s||(this.#s=requestAnimationFrame(()=>{this.#s=0;const t=this.#i[this.#o()];t&&(this.#u()?(this.#e.style.transform=`translateY(${t.offsetTop}px)`,this.#e.style.width="3px",this.#e.style.height=`${t.offsetHeight}px`):(this.#e.style.transform=`translateX(${t.offsetLeft}px)`,this.#e.style.width=`${t.offsetWidth}px`,this.#e.style.height="3px"),this.#t.classList.contains("is-ready")||this.#t.classList.add("is-ready"))}))}#g(t){if(this.#n())return;const e=this.#r()[t];!e||e.disabled||(this.value=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value}})))}#f(t){if(this.#n()||!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp"].includes(t.key))return;t.preventDefault();const r=this.#r().map((s,h)=>({o:s,i:h})).filter(s=>!s.o.disabled);if(!r.length)return;const a=r.findIndex(s=>s.i===this.#o()),i=t.key==="ArrowRight"||t.key==="ArrowDown",o=a<0?0:(a+(i?1:-1)+r.length)%r.length,l=r[o].i;this.#g(l),this.#i[l]?.focus()}}customElements.define("vs-radio-group-slide",m);
