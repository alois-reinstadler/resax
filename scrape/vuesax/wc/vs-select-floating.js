const m=`
  :host { display: inline-flex; }
  .slf {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --px: var(--ctrl-px-md, 14px);
    --accent: var(--inp-accent, #ededed);
    position: relative;
    display: inline-flex;
    flex-direction: column;
    min-width: 220px;
    font-family: inherit;
    font-size: var(--ctrl-fs-md, 14px);
    user-select: none;
    -webkit-user-select: none;
  }
  .slf--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); font-size: var(--ctrl-fs-sm, 13px); }
  .slf--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); font-size: var(--ctrl-fs-lg, 15px); }

  /* tones — recolor the accent (open ring / label / selected option) */
  .slf--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .slf--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .slf--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .slf__trigger {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: var(--rr, var(--r));
    border: none;
    background: var(--btn-secondary-bg, #1a1a1a);
    color: var(--inp-text, #ededed);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  .slf--r-none { --rr: 0px; }
  .slf--r-subtle { --rr: 8px; }
  .slf--r-pill { --rr: 999px; }
  .slf__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .slf__trigger:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  /* fieldset border with a real gap for the floated label (like VsInput) */
  .slf__outline {
    position: absolute;
    inset: 0;
    z-index: 0;
    margin: 0;
    padding: 0 calc(var(--px) - 5px);
    border: 1px solid var(--inp-border, #2a2a2a);
    border-radius: inherit;
    pointer-events: none;
    min-inline-size: 0;
    transition: border-color 200ms ease;
  }
  .slf__legend {
    display: block; width: auto; max-width: 0.01px; height: 0; padding: 0;
    font-size: calc(var(--ctrl-fs-md, 14px) * 0.82); line-height: 0; white-space: nowrap; visibility: hidden;
    transition: max-width 220ms cubic-bezier(0.34, 1.4, 0.5, 1);
  }
  .slf__legend span { display: inline-block; padding: 0 4px; }
  .slf.has-label.is-floated .slf__legend { max-width: 100%; }
  .slf__trigger:hover .slf__outline { border-color: var(--inp-border-hover, #3d3d3d); }
  .slf.is-open .slf__outline { border-color: var(--accent); }

  .slf__value { position: relative; z-index: 1; overflow: hidden; text-overflow: ellipsis; }
  .slf__value.is-empty { color: color-mix(in srgb, var(--inp-label, #6a6a6a) 80%, transparent); }

  .slf__label {
    position: absolute;
    z-index: 1;
    left: var(--px);
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
    color: var(--inp-label, #6a6a6a);
    pointer-events: none;
    transition: transform 240ms cubic-bezier(0.34, 1.4, 0.5, 1), color 220ms ease;
  }
  .slf__label[hidden] { display: none; }
  .slf.is-floated .slf__label { transform: translateY(calc(-50% - var(--h) / 2)) scale(0.82); }
  .slf.is-open .slf__label { color: var(--accent); }

  .slf__caret { position: relative; z-index: 1; flex: none; width: 16px; height: 16px; color: var(--inp-btn, #8a8a8a); transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .slf.is-open .slf__caret { transform: rotate(180deg); }

  /* floating menu — in-shadow, absolutely positioned UNDER the trigger */
  .slf__menu {
    position: absolute;
    z-index: 50;
    top: calc(var(--h) + 6px);
    left: 0;
    right: 0;
    margin: 0;
    padding: 5px;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--sel-menu-bg, #0b0b0b);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    transform-origin: top center;
  }
  .slf__menu[hidden] { display: none; }
  /* plain scrollable list (replaces VsScrollbar — keeps this file zero-dep) */
  .slf__list { margin: 0; padding: 0; list-style: none; max-height: 240px; overflow-y: auto; }
  .slf__opt {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    height: 34px;
    padding: 0 10px;
    border-radius: 9px;
    color: var(--inp-text, #ededed);
    cursor: pointer;
    white-space: nowrap;
  }
  .slf__opt.is-active { background: var(--sel-opt-hover, rgba(255, 255, 255, 0.07)); }
  .slf__opt.is-selected { color: var(--accent); font-weight: 600; }
  .slf__opt.is-disabled { opacity: 0.4; cursor: not-allowed; }
  .slf__opt-label { overflow: hidden; text-overflow: ellipsis; }
  .slf__check { flex: none; width: 16px; height: 16px; color: var(--accent); }

  .slf-pop-enter-active { transition: opacity 200ms ease, transform 320ms cubic-bezier(0.34, 1.46, 0.44, 1), filter 240ms ease; }
  .slf-pop-leave-active { transition: opacity 140ms ease, transform 160ms ease, filter 140ms ease; }
  .slf-pop-enter-from, .slf-pop-leave-to { opacity: 0; transform: translateY(-6px) scaleY(0.9); filter: blur(6px); }

  @media (prefers-reduced-motion: reduce) {
    .slf__caret, .slf__label, .slf__legend, .slf-pop-enter-active, .slf-pop-leave-active { transition: none; }
    .slf-pop-enter-from, .slf-pop-leave-to { filter: none; transform: none; }
  }
`,p=[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Cherry",value:"cherry"},{label:"Peach",value:"peach"},{label:"Grape",value:"grape"},{label:"Mango",value:"mango"},{label:"Orange",value:"orange"},{label:"Pear",value:"pear"},{label:"Watermelon",value:"watermelon"}],b="http://www.w3.org/2000/svg";function f(l){const t=document.createElementNS(b,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),t.setAttribute("class",l),t}function d(l,t){const e=document.createElementNS(b,"path");if(e.setAttribute("d",l),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}let g=0,o;function x(l){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=l;const t=o.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(l,t){const e=t?x(String(t).trim()):null;if(!e){for(const i of _)l.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),a=(i,v)=>l.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,c);a("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,r?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["value","placeholder","disabled","size","tone","open","label","radius","color"];#n;#t;#_;#h;#d;#l;#a;#i=p;#p=[];#r="";#s=-1;#e=!1;#g=`vs-select-floating-${++g}`;#f=!1;#u=null;#b=null;#A=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#n=document.createElement("div"),this.#n.className="slf",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="slf__trigger",this.#t.setAttribute("role","combobox"),this.#t.setAttribute("aria-haspopup","listbox"),this.#t.setAttribute("aria-expanded","false"),this.#t.setAttribute("aria-controls",`${this.#g}-list`);const s=document.createElement("fieldset");s.className="slf__outline",s.setAttribute("aria-hidden","true");const n=document.createElement("legend");n.className="slf__legend",this.#_=document.createElement("span"),n.appendChild(this.#_),s.appendChild(n),this.#h=document.createElement("span"),this.#h.className="slf__value",this.#d=document.createElement("label"),this.#d.className="slf__label";const r=f("slf__caret");r.appendChild(d("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(s,this.#h,this.#d,r),this.#l=document.createElement("div"),this.#l.className="slf__menu",this.#l.hidden=!0,this.#a=document.createElement("ul"),this.#a.className="slf__list",this.#a.id=`${this.#g}-list`,this.#a.setAttribute("role","listbox"),this.#l.appendChild(this.#a),this.#n.append(this.#t,this.#l),t.append(e,this.#n),this.#r=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#B),this.#t.addEventListener("keydown",this.#F)}connectedCallback(){u(this,this.getAttribute("color")),this.#v(),this.#o(),this.hasAttribute("open")&&this.#S()}disconnectedCallback(){this.#$(),this.#E()}attributeChangedCallback(t){if(u(this,this.getAttribute("color")),!!this.#n){if(t==="open"){this.hasAttribute("open")?this.#S():this.#V();return}if(t==="value"){if(this.#f)return;this.#r=this.getAttribute("value")??"",this.#v(),this.#o();return}this.#o()}}set options(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#i=e&&e.length?e:p,this.#n&&(this.#v(),this.#o())}get options(){return this.#i}get value(){return this.#r}set value(t){const e=t==null?"":String(t);this.#f=!0,e?this.setAttribute("value",e):this.removeAttribute("value"),this.#f=!1,this.#r=e,this.#n&&(this.#v(),this.#o())}get open(){return this.#e}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#y(){return this.getAttribute("label")??""}#I(){return this.getAttribute("placeholder")??""}#k(){return this.#i.find(t=>t.value===this.#r)||null}#O(){return this.#e||!!this.#k()}#w(){const t=(e,s)=>this.getAttribute(e)??s;this.#n.className=`slf slf--${t("size","md")} slf--t-${t("tone","default")} slf--r-${t("radius","rounded")}`+(this.#e?" is-open":"")+(this.#O()?" is-floated":"")+(this.#y()?" has-label":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#o(){this.#w(),this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#e?"true":"false");const t=this.#y();t?this.#t.setAttribute("aria-label",t):this.#t.removeAttribute("aria-label"),this.#_.textContent=t||" ",this.#d.textContent=t,this.#d.hidden=!t,this.#P()}#P(){const t=this.#k();this.#h.textContent=t?t.label:this.#y()?"":this.#I(),this.#h.classList.toggle("is-empty",!t)}#v(){this.#p.forEach(t=>t.remove()),this.#p=[],this.#i.forEach((t,e)=>{const s=document.createElement("li");s.className="slf__opt"+(e===this.#s?" is-active":"")+(t.value===this.#r?" is-selected":"")+(t.disabled?" is-disabled":""),s.id=`${this.#g}-opt-${e}`,s.setAttribute("role","option"),s.setAttribute("aria-selected",t.value===this.#r?"true":"false"),t.disabled&&s.setAttribute("aria-disabled","true");const n=document.createElement("span");if(n.className="slf__opt-label",n.textContent=t.label??"",s.appendChild(n),t.value===this.#r){const r=f("slf__check");r.appendChild(d("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),r.appendChild(d("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),s.appendChild(r)}s.addEventListener("pointerenter",()=>{t.disabled||(this.#s=e,this.#m())}),s.addEventListener("click",()=>this.#N(e)),this.#p[e]=s,this.#a.appendChild(s)}),this.#m()}#m(){this.#p.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#s)}),this.#s>=0?this.#t.setAttribute("aria-activedescendant",`${this.#g}-opt-${this.#s}`):this.#t.removeAttribute("aria-activedescendant")}#M(){return this.#i.findIndex(t=>!t.disabled)}#C(){this.#s<0||this.#p[this.#s]?.scrollIntoView({block:"nearest"})}#L(t){const e=this.#i.length;if(!e)return;let s=this.#s;for(let n=0;n<e;n++)if(s=(s+t+e)%e,!this.#i[s]?.disabled){this.#s=s;break}this.#m(),this.#C()}#N(t){const e=this.#i[t];!e||e.disabled||(this.#r=e.value,this.#f=!0,e.value?this.setAttribute("value",e.value):this.removeAttribute("value"),this.#f=!1,this.#v(),this.#o(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.#c())}#x(){this.setAttribute("open","")}#c(){this.removeAttribute("open")}#S(){if(this.#e)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#e=!0,this.#w(),this.#t.setAttribute("aria-expanded","true");const t=this.#l;this.#E(),t.hidden=!1,t.classList.remove("slf-pop-leave-active","slf-pop-leave-to"),t.classList.add("slf-pop-enter-from","slf-pop-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("slf-pop-enter-from")),this.#z(t,()=>t.classList.remove("slf-pop-enter-active"),360);const e=this.#i.findIndex(s=>s.value===this.#r);this.#s=e>=0&&!this.#i[e]?.disabled?e:this.#M(),this.#m(),this.#C(),this.#j(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#V(){if(!this.#e)return;this.#e=!1,this.#w(),this.#t.setAttribute("aria-expanded","false"),this.#s=-1,this.#m(),this.#$();const t=this.#l;this.#E(),t.classList.remove("slf-pop-enter-from","slf-pop-enter-active"),t.classList.add("slf-pop-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("slf-pop-leave-to")),this.#z(t,()=>{t.hidden=!0,t.classList.remove("slf-pop-leave-active","slf-pop-leave-to")},200),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#z(t,e,s){const n=()=>{t.removeEventListener("transitionend",r),clearTimeout(this.#A),this.#u=null,this.#b=null,e()},r=c=>{c.target===t&&n()};this.#u=r,this.#b=t,t.addEventListener("transitionend",r),this.#A=setTimeout(n,s)}#E(){this.#u&&this.#b&&this.#b.removeEventListener("transitionend",this.#u),clearTimeout(this.#A),this.#u=null,this.#b=null}#j(){document.addEventListener("pointerdown",this.#D,!0),document.addEventListener("keydown",this.#T,!0)}#$(){document.removeEventListener("pointerdown",this.#D,!0),document.removeEventListener("keydown",this.#T,!0)}#D=t=>{t.composedPath().includes(this)||this.#c()};#T=t=>{t.key==="Escape"&&this.#e&&(t.preventDefault(),this.#c())};#B=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#c():this.#x())};#F=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#e?this.#s>=0&&this.#N(this.#s):this.#x();break;case"ArrowDown":t.preventDefault(),this.#e?this.#L(1):this.#x();break;case"ArrowUp":t.preventDefault(),this.#e?this.#L(-1):this.#x();break;case"Escape":this.#e&&(t.preventDefault(),this.#c());break;case"Tab":this.#e&&this.#c();break}}}customElements.define("vs-select-floating",A);
