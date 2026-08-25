const p=[{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"Lifetime",value:"lifetime"}],g=`
  :host { display: inline-flex; max-width: 100%; }
  .rgp {
    --h: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --acc: var(--ui-accent, #ededed);
    position: relative;                /* indicator offsetParent */
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    border: 1.5px solid var(--inp-border, #2a2a2a);
    border-radius: 999px;
    background: var(--bg-card, #111);
    font-family: inherit;
  }
  .rgp--vertical { flex-direction: column; align-items: stretch; }
  .rgp--horizontal { flex-direction: row; align-items: center; }

  .rgp--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .rgp--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .rgp--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  .rgp--danger  { --acc: var(--tone-danger, #ef4444); }
  .rgp--warn    { --acc: var(--tone-warn, #f59e0b); }
  .rgp--success { --acc: var(--tone-success, #22c55e); }

  /* One persistent indicator that slides under the selected option. left / top /
     width / height are set imperatively; the transition is what makes it glide. */
  .rgp__ind {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-radius: 999px;
    background: var(--acc);
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transform: translate(0, 0);
    transition:
      transform 420ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      width 420ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      height 420ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
      opacity 200ms ease;
  }
  .rgp.is-ready .rgp__ind { opacity: 1; }

  .rgp__opt {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: calc(var(--h) - 8px);
    padding: 0 var(--px);
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: color-mix(in srgb, var(--inp-text, #ededed) 72%, transparent);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: color 240ms ease;
  }
  .rgp__opt:not(.is-active):hover { color: var(--inp-text, #ededed); }
  .rgp__opt.is-active { color: var(--on-accent, #fff); }
  .rgp__opt:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--acc) 70%, transparent);
    outline-offset: 2px;
  }
  .rgp__opt:disabled { opacity: 0.4; cursor: not-allowed; }
  .rgp--disabled { opacity: 0.6; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .rgp__ind { transition: opacity 200ms ease; }
    .rgp__opt { transition: none; }
  }
`;let d;function f(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(c,t){const e=t?f(String(t).trim()):null;if(!e){for(const i of b)c.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),o=(i,h)=>c.style.setProperty(i,h);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,r);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,a?"0 0 0":"255 255 255");o("--vs-color",r),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["value","disabled","size","tone","direction","name","color"];#t;#e;#r=[];#c=null;#a=null;#i=0;#d;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#t=document.createElement("div"),this.#t.className="rgp",this.#t.setAttribute("role","radiogroup"),this.#e=document.createElement("span"),this.#e.className="rgp__ind",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e),this.#d=n=>this.#f(n),t.append(e,this.#t)}connectedCallback(){u(this,this.getAttribute("color")),this.#h(),this.#p(),this.#t.addEventListener("keydown",this.#d),this.#a=new ResizeObserver(()=>this.#l()),this.#a.observe(this.#t),this.#l()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#d),this.#a?.disconnect(),this.#a=null,this.#i&&cancelAnimationFrame(this.#i),this.#i=0}attributeChangedCallback(t){u(this,this.getAttribute("color")),this.#t&&(this.#h(),t==="value"&&this.#g())}set options(t){this.#c=Array.isArray(t)&&t.length?t:null,this.#t&&this.#p()}get options(){return this.#c??p}set value(t){this.setAttribute("value",String(t))}get value(){return this.getAttribute("value")??this.#s()[0]?.value}set name(t){this.setAttribute("name",String(t))}get name(){return this.getAttribute("name")??""}#s(){return this.#c??p}#n(){return this.hasAttribute("disabled")&&this.hasAttribute("disabled")}#o(){const t=String(this.value),e=this.#s().findIndex(n=>String(n.value)===t);return e<0?0:e}#h(){const t=(s,a)=>this.getAttribute(s)??a,e=this.#t.classList.contains("is-ready")?" is-ready":"",n=this.#n()?" rgp--disabled":"";this.#t.className=`rgp rgp--${t("direction","horizontal")} rgp--${t("size","md")} rgp--${t("tone","default")}${n}${e}`,this.#t.setAttribute("aria-disabled",this.#n()?"true":"false")}#p(){for(;this.#t.lastChild&&this.#t.lastChild!==this.#e;)this.#t.removeChild(this.#t.lastChild);this.#r=[];const t=this.#s(),e=this.#o(),n=this.#n();t.forEach((s,a)=>{const r=document.createElement("button");r.type="button",r.className="rgp__opt"+(a===e?" is-active":""),r.setAttribute("role","radio"),r.setAttribute("aria-checked",a===e?"true":"false"),r.textContent=s.label;const l=n||!!s.disabled;r.disabled=l,l&&r.setAttribute("aria-disabled","true"),r.tabIndex=a===e?0:-1,r.addEventListener("click",()=>this.#u(a)),this.#t.appendChild(r),this.#r.push(r)}),this.#l()}#g(){const t=this.#o();this.#r.forEach((e,n)=>{const s=n===t;e.classList.toggle("is-active",s),e.setAttribute("aria-checked",s?"true":"false"),e.tabIndex=s?0:-1}),this.#l()}#l(){this.#i||(this.#i=requestAnimationFrame(()=>{this.#i=0;const t=this.#r[this.#o()];t&&(this.#e.style.transform=`translate(${t.offsetLeft}px, ${t.offsetTop}px)`,this.#e.style.width=`${t.offsetWidth}px`,this.#e.style.height=`${t.offsetHeight}px`,this.#t.classList.contains("is-ready")||this.#t.classList.add("is-ready"))}))}#u(t){if(this.#n())return;const e=this.#s()[t];!e||e.disabled||(this.value=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value}})))}#f(t){if(this.#n()||!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp"].includes(t.key))return;t.preventDefault();const s=this.#s().map((i,h)=>({o:i,i:h})).filter(i=>!i.o.disabled);if(!s.length)return;const a=s.findIndex(i=>i.i===this.#o()),r=t.key==="ArrowRight"||t.key==="ArrowDown",l=a<0?0:(a+(r?1:-1)+s.length)%s.length,o=s[l].i;this.#u(o),this.#r[o]?.focus()}}customElements.define("vs-radio-group-pill",m);
