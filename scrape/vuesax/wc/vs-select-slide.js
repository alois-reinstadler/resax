const m=`
  :host { display: inline-flex; }
  .sld {
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
  .sld--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); font-size: var(--ctrl-fs-sm, 13px); }
  .sld--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); font-size: var(--ctrl-fs-lg, 15px); }

  .sld__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: var(--rr, var(--r));
    border: 1px solid var(--inp-border, #2a2a2a);
    background: var(--btn-secondary-bg, #1a1a1a);
    color: var(--inp-text, #ededed);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition: border-color 200ms ease;
  }
  .sld--r-none { --rr: 0px; }
  .sld--r-subtle { --rr: 8px; }
  .sld--r-pill { --rr: 999px; }
  .sld__trigger:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .sld.is-open .sld__trigger { border-color: var(--accent); }
  .sld__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .sld__trigger:focus-visible { outline: 2px solid var(--inp-accent, var(--ui-accent, #ededed)); outline-offset: 2px; }
  .sld__value { overflow: hidden; text-overflow: ellipsis; }
  .sld__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }
  .sld__caret { flex: none; width: 16px; height: 16px; color: var(--inp-btn, #8a8a8a); transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .sld.is-open .sld__caret { transform: rotate(180deg); }

  .sld__menu {
    position: absolute;
    z-index: 50;
    top: calc(var(--h) + 6px);
    left: 0;
    right: 0;
    margin: 0;
    padding: 5px;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--sel-menu-bg, #0b0b0b);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    transform-origin: top center;
  }
  .sld__menu[hidden] { display: none; }
  /* VsScrollbar (bare, max-height 240, sm) → plain scrollable list */
  .sld__list { margin: 0; padding: 0; list-style: none; max-height: 240px; overflow-y: auto; }
  .sld__opt {
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
    /* cascade in when the menu opens */
    opacity: 0;
    transform: translateY(-6px);
  }
  .sld.is-open .sld__opt {
    animation: sld-opt-in 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(var(--i, 0) * 26ms + 80ms);
  }
  @keyframes sld-opt-in { to { opacity: 1; transform: none; } }
  .sld__opt.is-active { background: var(--sel-opt-hover, rgba(255, 255, 255, 0.07)); }
  .sld__opt.is-selected { color: var(--accent); font-weight: 600; }
  .sld__opt.is-disabled { opacity: 0.4; cursor: not-allowed; }
  .sld__opt-label { overflow: hidden; text-overflow: ellipsis; }
  .sld__check { flex: none; width: 16px; height: 16px; color: var(--accent); }

  /* menu unfolds from the trigger with blur + spring */
  .sld-pop-enter-active { transition: opacity 220ms ease, transform 440ms cubic-bezier(0.34, 1.46, 0.44, 1), filter 300ms ease; }
  .sld-pop-leave-active { transition: opacity 150ms ease, transform 180ms ease, filter 150ms ease; }
  .sld-pop-enter-from, .sld-pop-leave-to { opacity: 0; transform: translateY(-8px) scaleY(0.55); filter: blur(8px); }

  @media (prefers-reduced-motion: reduce) {
    .sld__caret, .sld-pop-enter-active, .sld-pop-leave-active { transition: none; }
    .sld-pop-enter-from, .sld-pop-leave-to { filter: none; transform: none; }
    .sld.is-open .sld__opt { animation: none; opacity: 1; transform: none; }
  }
`,p=[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Cherry",value:"cherry"},{label:"Peach",value:"peach"},{label:"Grape",value:"grape"},{label:"Mango",value:"mango"},{label:"Orange",value:"orange"},{label:"Pear",value:"pear"},{label:"Watermelon",value:"watermelon"}],f="http://www.w3.org/2000/svg";function u(a){const t=document.createElementNS(f,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),t.setAttribute("class",a),t}function c(a,t){const e=document.createElementNS(f,"path");if(e.setAttribute("d",a),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}let g=0,o;function x(a){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=a;const t=o.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const A=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(a,t){const e=t?x(String(t).trim()):null;if(!e){for(const i of A)a.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),l=(i,v)=>a.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(i,d);l("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])l(i,r?"0 0 0":"255 255 255");l("--vs-color",d),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["value","placeholder","disabled","size","tone","radius","open","color"];#n;#t;#d;#a;#l;#i=p;#h=[];#r="";#e=-1;#s=!1;#m=`vs-select-slide-${++g}`;#c=!1;#p=null;#u=null;#x=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#n=document.createElement("div"),this.#n.className="sld",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="sld__trigger",this.#t.setAttribute("role","combobox"),this.#t.setAttribute("aria-haspopup","listbox"),this.#t.setAttribute("aria-expanded","false"),this.#t.setAttribute("aria-controls",`${this.#m}-list`),this.#d=document.createElement("span"),this.#d.className="sld__value";const s=u("sld__caret");s.appendChild(c("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(this.#d,s),this.#a=document.createElement("div"),this.#a.className="sld__menu",this.#a.hidden=!0,this.#l=document.createElement("ul"),this.#l.className="sld__list",this.#l.id=`${this.#m}-list`,this.#l.setAttribute("role","listbox"),this.#a.appendChild(this.#l),this.#n.append(this.#t,this.#a),t.append(e,this.#n),this.#r=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#I),this.#n.addEventListener("keydown",this.#M)}connectedCallback(){b(this,this.getAttribute("color")),this.#f(),this.#y(),this.hasAttribute("open")&&this.#C()}disconnectedCallback(){this.#S(),this.#_()}attributeChangedCallback(t){if(b(this,this.getAttribute("color")),!!this.#n){if(t==="open"){this.hasAttribute("open")?this.#C():this.#z();return}if(t==="value"){if(this.#c)return;this.#r=this.getAttribute("value")??"",this.#f(),this.#b();return}this.#y()}}set options(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#i=e&&e.length?e:p,this.#n&&(this.#f(),this.#b())}get options(){return this.#i}get value(){return this.#r}set value(t){const e=t==null?"":String(t);this.#c=!0,e?this.setAttribute("value",e):this.removeAttribute("value"),this.#c=!1,this.#r=e,this.#n&&(this.#f(),this.#b())}get open(){return this.#s}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#D(){return this.getAttribute("placeholder")??"Select…"}#T(){return this.#i.find(t=>t.value===this.#r)||null}#A(){const t=(e,s)=>this.getAttribute(e)??s;this.#n.className=`sld sld--${t("size","md")} sld--t-${t("tone","default")} sld--r-${t("radius","rounded")}`+(this.#s?" is-open":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#y(){this.#A(),this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#s?"true":"false"),this.#b()}#b(){const t=this.#T();this.#d.textContent=t?t.label:this.#D(),this.#d.classList.toggle("is-placeholder",!t)}#f(){this.#h.forEach(t=>t.remove()),this.#h=[],this.#i.forEach((t,e)=>{const s=document.createElement("li");s.className="sld__opt"+(e===this.#e?" is-active":"")+(t.value===this.#r?" is-selected":"")+(t.disabled?" is-disabled":""),s.style.setProperty("--i",e),s.id=`${this.#m}-opt-${e}`,s.setAttribute("role","option"),s.setAttribute("aria-selected",t.value===this.#r?"true":"false"),t.disabled&&s.setAttribute("aria-disabled","true");const n=document.createElement("span");if(n.className="sld__opt-label",n.textContent=t.label??"",s.appendChild(n),t.value===this.#r){const r=u("sld__check");r.appendChild(c("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),r.appendChild(c("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),s.appendChild(r)}s.addEventListener("pointerenter",()=>{t.disabled||(this.#e=e,this.#v())}),s.addEventListener("click",()=>this.#k(e)),this.#h[e]=s,this.#l.appendChild(s)}),this.#v()}#v(){this.#h.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#e)}),this.#e>=0?this.#t.setAttribute("aria-activedescendant",`${this.#m}-opt-${this.#e}`):this.#t.removeAttribute("aria-activedescendant")}#P(){return this.#i.findIndex(t=>!t.disabled)}#w(){this.#e<0||this.#h[this.#e]?.scrollIntoView({block:"nearest"})}#E(t){const e=this.#i.length;if(!e)return;let s=this.#e;for(let n=0;n<e;n++)if(s=(s+t+e)%e,!this.#i[s]?.disabled){this.#e=s;break}this.#v(),this.#w()}#k(t){const e=this.#i[t];!e||e.disabled||(this.#r=e.value,this.#c=!0,e.value?this.setAttribute("value",e.value):this.removeAttribute("value"),this.#c=!1,this.#f(),this.#b(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.#o())}#g(){this.setAttribute("open","")}#o(){this.removeAttribute("open")}#C(){if(this.#s)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#s=!0,this.#A(),this.#t.setAttribute("aria-expanded","true");const t=this.#a;this.#_(),t.hidden=!1,t.classList.remove("sld-pop-leave-active","sld-pop-leave-to"),t.classList.add("sld-pop-enter-from","sld-pop-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("sld-pop-enter-from")),this.#L(t,()=>t.classList.remove("sld-pop-enter-active"),500);const e=this.#i.findIndex(s=>s.value===this.#r);this.#e=e>=0&&!this.#i[e]?.disabled?e:this.#P(),this.#v(),this.#w(),this.#O(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#z(){if(!this.#s)return;this.#s=!1,this.#A(),this.#t.setAttribute("aria-expanded","false"),this.#e=-1,this.#v(),this.#S();const t=this.#a;this.#_(),t.classList.remove("sld-pop-enter-from","sld-pop-enter-active"),t.classList.add("sld-pop-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("sld-pop-leave-to")),this.#L(t,()=>{t.hidden=!0,t.classList.remove("sld-pop-leave-active","sld-pop-leave-to")},260),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#L(t,e,s){const n=()=>{t.removeEventListener("transitionend",r),clearTimeout(this.#x),this.#p=null,this.#u=null,e()},r=d=>{d.target===t&&n()};this.#p=r,this.#u=t,t.addEventListener("transitionend",r),this.#x=setTimeout(n,s)}#_(){this.#p&&this.#u&&this.#u.removeEventListener("transitionend",this.#p),clearTimeout(this.#x),this.#p=null,this.#u=null}#O(){document.addEventListener("pointerdown",this.#$,!0),document.addEventListener("keydown",this.#N,!0)}#S(){document.removeEventListener("pointerdown",this.#$,!0),document.removeEventListener("keydown",this.#N,!0)}#$=t=>{t.composedPath().includes(this)||this.#o()};#N=t=>{t.key==="Escape"&&this.#s&&(t.preventDefault(),this.#o())};#I=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#o():this.#g())};#M=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#s?this.#e>=0&&this.#k(this.#e):this.#g();break;case"ArrowDown":t.preventDefault(),this.#s?this.#E(1):this.#g();break;case"ArrowUp":t.preventDefault(),this.#s?this.#E(-1):this.#g();break;case"Escape":this.#s&&(t.preventDefault(),this.#o());break;case"Tab":this.#s&&this.#o();break}}}customElements.define("vs-select-slide",_);
