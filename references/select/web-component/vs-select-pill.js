const m=`
  :host { display: inline-flex; }
  .slp {
    --h: var(--ctrl-h-md, 40px);
    --px: var(--ctrl-px-md, 16px);
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
  .slp--sm { --h: var(--ctrl-h-sm, 32px); --px: 14px; font-size: var(--ctrl-fs-sm, 13px); }
  .slp--lg { --h: var(--ctrl-h-lg, 48px); --px: 20px; font-size: var(--ctrl-fs-lg, 15px); }

  /* tones — recolor the accent (selected label + open ring) */
  .slp--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .slp--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .slp--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .slp__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: 999px;
    border: 1px solid var(--inp-border, #2a2a2a);
    background: var(--btn-secondary-bg, #1a1a1a);
    color: var(--inp-text, #ededed);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition: border-color 200ms ease, background-color 200ms ease;
  }
  .slp__trigger:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .slp.is-open .slp__trigger { border-color: var(--accent); }
  .slp__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .slp__trigger:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .slp__value { overflow: hidden; text-overflow: ellipsis; }
  .slp__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }
  .slp__caret { flex: none; width: 16px; height: 16px; color: var(--inp-btn, #8a8a8a); transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .slp.is-open .slp__caret { transform: rotate(180deg); }

  /* floating menu — in-shadow, absolutely positioned UNDER the trigger */
  .slp__menu {
    position: absolute;
    z-index: 50;
    top: calc(var(--h) + 6px);
    left: 0;
    right: 0;
    padding: 5px;
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--sel-menu-bg, #0b0b0b);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    transform-origin: top center;
  }
  .slp__menu[hidden] { display: none; }

  .slp__list { position: relative; margin: 0; padding: 0; list-style: none; max-height: 238px; overflow-y: auto; }
  /* sliding highlight pill */
  .slp__highlight {
    position: absolute;
    z-index: 0;
    left: 0; right: 0;
    top: 0;
    height: var(--oh, 34px);
    border-radius: 999px;
    background: var(--sel-opt-hover, rgba(255, 255, 255, 0.08));
    transform: translateY(calc(var(--ai, 0) * var(--oh, 34px)));
    opacity: 0;
    pointer-events: none;
    transition: transform 280ms cubic-bezier(0.34, 1.42, 0.5, 1), opacity 160ms ease;
  }
  .slp__highlight.is-on { opacity: 1; }
  .slp__opt {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    color: var(--inp-text, #ededed);
    cursor: pointer;
    white-space: nowrap;
  }
  .slp__opt.is-selected { color: var(--accent); font-weight: 600; }
  .slp__opt.is-disabled { opacity: 0.4; cursor: not-allowed; }
  .slp__opt-label { overflow: hidden; text-overflow: ellipsis; }
  .slp__check { flex: none; width: 16px; height: 16px; color: var(--accent); }

  /* Apple-style morph: the menu emerges from the trigger, blurs and bounces */
  .slp-pop-enter-active { transition: opacity 200ms ease, transform 320ms cubic-bezier(0.34, 1.46, 0.44, 1), filter 240ms ease; }
  .slp-pop-leave-active { transition: opacity 140ms ease, transform 160ms ease, filter 140ms ease; }
  .slp-pop-enter-from, .slp-pop-leave-to { opacity: 0; transform: translateY(-6px) scaleY(0.9); filter: blur(6px); }

  @media (prefers-reduced-motion: reduce) {
    .slp__caret, .slp__highlight, .slp-pop-enter-active, .slp-pop-leave-active { transition: none; }
    .slp-pop-enter-from, .slp-pop-leave-to { filter: none; transform: none; }
  }
`;const d=[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Cherry",value:"cherry"},{label:"Peach",value:"peach"},{label:"Grape",value:"grape"},{label:"Mango",value:"mango"},{label:"Orange",value:"orange"},{label:"Pear",value:"pear"},{label:"Watermelon",value:"watermelon"}],f="http://www.w3.org/2000/svg";function u(a){const t=document.createElementNS(f,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),t.setAttribute("class",a),t}function c(a,t){const e=document.createElementNS(f,"path");if(e.setAttribute("d",a),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}let g=0,o;function x(a){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=a;const t=o.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(a,t){const e=t?x(String(t).trim()):null;if(!e){for(const i of _)a.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,p=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),l=(i,v)=>a.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(i,h);l("--btn-primary-bg-hover",`rgb(${p[0]} ${p[1]} ${p[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])l(i,r?"0 0 0":"255 255 255");l("--vs-color",h),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["value","placeholder","disabled","size","tone","open","color"];#n;#t;#p;#a;#l;#o;#i=d;#m=[];#r="";#e=-1;#s=!1;#g=`vs-select-pill-${++g}`;#c=!1;#d=null;#u=null;#_=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#n=document.createElement("div"),this.#n.className="slp",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="slp__trigger",this.#t.setAttribute("role","combobox"),this.#t.setAttribute("aria-haspopup","listbox"),this.#t.setAttribute("aria-expanded","false"),this.#t.setAttribute("aria-controls",`${this.#g}-list`),this.#p=document.createElement("span"),this.#p.className="slp__value";const s=u("slp__caret");s.appendChild(c("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(this.#p,s),this.#a=document.createElement("div"),this.#a.className="slp__menu",this.#a.hidden=!0,this.#l=document.createElement("ul"),this.#l.className="slp__list",this.#l.id=`${this.#g}-list`,this.#l.setAttribute("role","listbox"),this.#o=document.createElement("div"),this.#o.className="slp__highlight",this.#o.setAttribute("aria-hidden","true"),this.#o.style.setProperty("--oh","34px"),this.#l.appendChild(this.#o),this.#a.appendChild(this.#l),this.#n.append(this.#t,this.#a),t.append(e,this.#n),this.#r=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#M),this.#t.addEventListener("keydown",this.#V)}connectedCallback(){b(this,this.getAttribute("color")),this.#f(),this.#w(),this.hasAttribute("open")&&this.#L()}disconnectedCallback(){this.#N(),this.#y()}attributeChangedCallback(t){if(b(this,this.getAttribute("color")),!!this.#n){if(t==="open"){this.hasAttribute("open")?this.#L():this.#O();return}if(t==="value"){if(this.#c)return;this.#r=this.getAttribute("value")??"",this.#f(),this.#b();return}this.#w()}}set options(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#i=e&&e.length?e:d,this.#n&&(this.#f(),this.#b())}get options(){return this.#i}get value(){return this.#r}set value(t){const e=t==null?"":String(t);this.#c=!0,e?this.setAttribute("value",e):this.removeAttribute("value"),this.#c=!1,this.#r=e,this.#n&&(this.#f(),this.#b())}get open(){return this.#s}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#T(){return this.getAttribute("placeholder")??"Select…"}#D(){return this.#i.find(t=>t.value===this.#r)||null}#A(){const t=(e,s)=>this.getAttribute(e)??s;this.#n.className=`slp slp--${t("size","md")} slp--t-${t("tone","default")}`+(this.#s?" is-open":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#w(){this.#A(),this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#s?"true":"false"),this.#b()}#b(){const t=this.#D();this.#p.textContent=t?t.label:this.#T(),this.#p.classList.toggle("is-placeholder",!t)}#f(){this.#m.forEach(t=>t.remove()),this.#m=[],this.#i.forEach((t,e)=>{const s=document.createElement("li");s.className="slp__opt"+(t.value===this.#r?" is-selected":"")+(t.disabled?" is-disabled":""),s.id=`${this.#g}-opt-${e}`,s.setAttribute("role","option"),s.setAttribute("aria-selected",t.value===this.#r?"true":"false"),t.disabled&&s.setAttribute("aria-disabled","true");const n=document.createElement("span");if(n.className="slp__opt-label",n.textContent=t.label??"",s.appendChild(n),t.value===this.#r){const r=u("slp__check");r.appendChild(c("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),r.appendChild(c("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),s.appendChild(r)}s.addEventListener("pointerenter",()=>{t.disabled||(this.#e=e,this.#v())}),s.addEventListener("click",()=>this.#C(e)),this.#m[e]=s,this.#l.appendChild(s)}),this.#v()}#v(){this.#o.classList.toggle("is-on",this.#e>=0),this.#o.style.setProperty("--ai",this.#e<0?0:this.#e),this.#e>=0?this.#t.setAttribute("aria-activedescendant",`${this.#g}-opt-${this.#e}`):this.#t.removeAttribute("aria-activedescendant")}#z(){return this.#i.findIndex(t=>!t.disabled)}#E(){this.#e<0||this.#m[this.#e]?.scrollIntoView({block:"nearest"})}#k(t){const e=this.#i.length;if(!e)return;let s=this.#e;for(let n=0;n<e;n++)if(s=(s+t+e)%e,!this.#i[s]?.disabled){this.#e=s;break}this.#v(),this.#E()}#C(t){const e=this.#i[t];!e||e.disabled||(this.#r=e.value,this.#c=!0,e.value?this.setAttribute("value",e.value):this.removeAttribute("value"),this.#c=!1,this.#f(),this.#b(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.#h())}#x(){this.setAttribute("open","")}#h(){this.removeAttribute("open")}#L(){if(this.#s)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#s=!0,this.#A(),this.#t.setAttribute("aria-expanded","true");const t=this.#a;this.#y(),t.hidden=!1,t.classList.remove("slp-pop-leave-active","slp-pop-leave-to"),t.classList.add("slp-pop-enter-from","slp-pop-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("slp-pop-enter-from")),this.#S(t,()=>t.classList.remove("slp-pop-enter-active"),360);const e=this.#i.findIndex(s=>s.value===this.#r);this.#e=e>=0&&!this.#i[e]?.disabled?e:this.#z(),this.#v(),this.#E(),this.#I(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#O(){if(!this.#s)return;this.#s=!1,this.#A(),this.#t.setAttribute("aria-expanded","false"),this.#e=-1,this.#v(),this.#N();const t=this.#a;this.#y(),t.classList.remove("slp-pop-enter-from","slp-pop-enter-active"),t.classList.add("slp-pop-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("slp-pop-leave-to")),this.#S(t,()=>{t.hidden=!0,t.classList.remove("slp-pop-leave-active","slp-pop-leave-to")},220),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#S(t,e,s){const n=()=>{t.removeEventListener("transitionend",r),clearTimeout(this.#_),this.#d=null,this.#u=null,e()},r=h=>{h.target===t&&n()};this.#d=r,this.#u=t,t.addEventListener("transitionend",r),this.#_=setTimeout(n,s)}#y(){this.#d&&this.#u&&this.#u.removeEventListener("transitionend",this.#d),clearTimeout(this.#_),this.#d=null,this.#u=null}#I(){document.addEventListener("pointerdown",this.#$,!0),document.addEventListener("keydown",this.#P,!0)}#N(){document.removeEventListener("pointerdown",this.#$,!0),document.removeEventListener("keydown",this.#P,!0)}#$=t=>{t.composedPath().includes(this)||this.#h()};#P=t=>{t.key==="Escape"&&this.#s&&(t.preventDefault(),this.#h())};#M=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#h():this.#x())};#V=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#s?this.#e>=0&&this.#C(this.#e):this.#x();break;case"ArrowDown":t.preventDefault(),this.#s?this.#k(1):this.#x();break;case"ArrowUp":t.preventDefault(),this.#s?this.#k(-1):this.#x();break;case"Escape":this.#s&&(t.preventDefault(),this.#h());break;case"Tab":this.#s&&this.#h();break}}}customElements.define("vs-select-pill",A);
