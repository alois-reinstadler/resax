const m=`
  :host { display: inline-flex; }
  .slu {
    --h: var(--ctrl-h-md, 40px);
    --px: 2px;
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
  .slu--sm { --h: var(--ctrl-h-sm, 32px); font-size: var(--ctrl-fs-sm, 13px); }
  .slu--md { --h: var(--ctrl-h-md, 40px); font-size: var(--ctrl-fs-md, 14px); }
  .slu--lg { --h: var(--ctrl-h-lg, 48px); font-size: var(--ctrl-fs-lg, 15px); }

  .slu__trigger {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: var(--h);
    padding: 0 var(--px);
    border: none;
    background: transparent;
    color: var(--inp-text, #ededed);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }
  .slu__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .slu__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 3px; }
  .slu__value { overflow: hidden; text-overflow: ellipsis; }
  .slu__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }
  .slu__caret { flex: none; width: 16px; height: 16px; color: var(--inp-btn, #8a8a8a); transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .slu.is-open .slu__caret { transform: rotate(180deg); }

  /* baseline hairline + the accent line that grows from center on open */
  .slu__trigger::before,
  .slu__line { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 1px; pointer-events: none; }
  .slu__trigger::before { background: var(--inp-border, #2a2a2a); }
  .slu__line { height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: center; transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1); }
  .slu.is-open .slu__line { transform: scaleX(1); }
  .slu__trigger:hover::before { background: var(--inp-border-hover, #3d3d3d); }

  /* floating menu — in-shadow, absolutely positioned UNDER the trigger */
  .slu__menu {
    position: absolute;
    z-index: 50;
    top: calc(var(--h) + 4px);
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
  .slu__menu[hidden] { display: none; }
  /* list scrolls in-shadow (replaces the SFC's VsScrollbar, max-height 240) */
  .slu__list { margin: 0; padding: 0; list-style: none; max-height: 240px; overflow-y: auto; }
  .slu__opt {
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
  .slu__opt.is-active { background: var(--sel-opt-hover, rgba(255, 255, 255, 0.07)); }
  .slu__opt.is-selected { color: var(--accent); font-weight: 600; }
  .slu__opt.is-disabled { opacity: 0.4; cursor: not-allowed; }
  .slu__opt-label { overflow: hidden; text-overflow: ellipsis; }
  .slu__check { flex: none; width: 16px; height: 16px; color: var(--accent); }

  .slu-pop-enter-active { transition: opacity 200ms ease, transform 320ms cubic-bezier(0.34, 1.46, 0.44, 1), filter 240ms ease; }
  .slu-pop-leave-active { transition: opacity 140ms ease, transform 160ms ease, filter 140ms ease; }
  .slu-pop-enter-from, .slu-pop-leave-to { opacity: 0; transform: translateY(-6px) scaleY(0.9); filter: blur(6px); }

  @media (prefers-reduced-motion: reduce) {
    .slu__caret, .slu__line, .slu-pop-enter-active, .slu-pop-leave-active { transition: none; }
    .slu-pop-enter-from, .slu-pop-leave-to { filter: none; transform: none; }
  }
`,d=[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Cherry",value:"cherry"},{label:"Peach",value:"peach"},{label:"Grape",value:"grape"},{label:"Mango",value:"mango"},{label:"Orange",value:"orange"},{label:"Pear",value:"pear"},{label:"Watermelon",value:"watermelon"}],f="http://www.w3.org/2000/svg";function p(a){const t=document.createElementNS(f,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),t.setAttribute("class",a),t}function c(a,t){const e=document.createElementNS(f,"path");if(e.setAttribute("d",a),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}let g=0,o;function _(a){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=a;const t=o.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(a,t){const e=t?_(String(t).trim()):null;if(!e){for(const i of x)a.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,u=e.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),l=(i,v)=>a.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(i,h);l("--btn-primary-bg-hover",`rgb(${u[0]} ${u[1]} ${u[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])l(i,n?"0 0 0":"255 255 255");l("--vs-color",h),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["value","placeholder","disabled","size","tone","open","color"];#n;#t;#h;#a;#l;#i=d;#u=[];#r="";#s=-1;#e=!1;#m=`vs-select-underline-${++g}`;#c=!1;#d=null;#p=null;#_=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#n=document.createElement("div"),this.#n.className="slu",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="slu__trigger",this.#t.setAttribute("role","combobox"),this.#t.setAttribute("aria-haspopup","listbox"),this.#t.setAttribute("aria-expanded","false"),this.#t.setAttribute("aria-controls",`${this.#m}-list`),this.#h=document.createElement("span"),this.#h.className="slu__value";const s=p("slu__caret");s.appendChild(c("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"}));const r=document.createElement("span");r.className="slu__line",r.setAttribute("aria-hidden","true"),this.#t.append(this.#h,s,r),this.#a=document.createElement("div"),this.#a.className="slu__menu",this.#a.hidden=!0,this.#l=document.createElement("ul"),this.#l.className="slu__list",this.#l.id=`${this.#m}-list`,this.#l.setAttribute("role","listbox"),this.#a.appendChild(this.#l),this.#n.append(this.#t,this.#a),t.append(e,this.#n),this.#r=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#I),this.#t.addEventListener("keydown",this.#M)}connectedCallback(){b(this,this.getAttribute("color")),this.#f(),this.#y(),this.hasAttribute("open")&&this.#L()}disconnectedCallback(){this.#N(),this.#A()}attributeChangedCallback(t){if(b(this,this.getAttribute("color")),!!this.#n){if(t==="open"){this.hasAttribute("open")?this.#L():this.#O();return}if(t==="value"){if(this.#c)return;this.#r=this.getAttribute("value")??"",this.#f(),this.#b();return}this.#y()}}set options(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#i=e&&e.length?e:d,this.#n&&(this.#f(),this.#b())}get options(){return this.#i}get value(){return this.#r}set value(t){const e=t==null?"":String(t);this.#c=!0,e?this.setAttribute("value",e):this.removeAttribute("value"),this.#c=!1,this.#r=e,this.#n&&(this.#f(),this.#b())}get open(){return this.#e}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#T(){return this.getAttribute("placeholder")??"Select…"}#w(){return this.#i.find(t=>t.value===this.#r)||null}#x(){const t=(e,s)=>this.getAttribute(e)??s;this.#n.className=`slu slu--${t("size","md")} slu--t-${t("tone","default")}`+(this.#e?" is-open":"")+(this.#w()?" has-value":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#y(){this.#x(),this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#e?"true":"false"),this.#b()}#b(){const t=this.#w();this.#h.textContent=t?t.label:this.#T(),this.#h.classList.toggle("is-placeholder",!t)}#f(){this.#u.forEach(t=>t.remove()),this.#u=[],this.#i.forEach((t,e)=>{const s=document.createElement("li");s.className="slu__opt"+(t.value===this.#r?" is-selected":"")+(t.disabled?" is-disabled":""),s.id=`${this.#m}-opt-${e}`,s.setAttribute("role","option"),s.setAttribute("aria-selected",t.value===this.#r?"true":"false"),t.disabled&&s.setAttribute("aria-disabled","true");const r=document.createElement("span");if(r.className="slu__opt-label",r.textContent=t.label??"",s.appendChild(r),t.value===this.#r){const n=p("slu__check");n.appendChild(c("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),n.appendChild(c("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),s.appendChild(n)}s.addEventListener("pointerenter",()=>{t.disabled||(this.#s=e,this.#v())}),s.addEventListener("click",()=>this.#C(e)),this.#u[e]=s,this.#l.appendChild(s)}),this.#v()}#v(){this.#u.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#s)}),this.#s>=0?this.#t.setAttribute("aria-activedescendant",`${this.#m}-opt-${this.#s}`):this.#t.removeAttribute("aria-activedescendant")}#z(){return this.#i.findIndex(t=>!t.disabled)}#E(){this.#s<0||this.#u[this.#s]?.scrollIntoView({block:"nearest"})}#k(t){const e=this.#i.length;if(!e)return;let s=this.#s;for(let r=0;r<e;r++)if(s=(s+t+e)%e,!this.#i[s]?.disabled){this.#s=s;break}this.#v(),this.#E()}#C(t){const e=this.#i[t];!e||e.disabled||(this.#r=e.value,this.#c=!0,e.value?this.setAttribute("value",e.value):this.removeAttribute("value"),this.#c=!1,this.#f(),this.#b(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.#o())}#g(){this.setAttribute("open","")}#o(){this.removeAttribute("open")}#L(){if(this.#e)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#e=!0,this.#x(),this.#t.setAttribute("aria-expanded","true");const t=this.#a;this.#A(),t.hidden=!1,t.classList.remove("slu-pop-leave-active","slu-pop-leave-to"),t.classList.add("slu-pop-enter-from","slu-pop-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("slu-pop-enter-from")),this.#S(t,()=>t.classList.remove("slu-pop-enter-active"),400);const e=this.#i.findIndex(s=>s.value===this.#r);this.#s=e>=0&&!this.#i[e]?.disabled?e:this.#z(),this.#v(),this.#E(),this.#P(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#O(){if(!this.#e)return;this.#e=!1,this.#x(),this.#t.setAttribute("aria-expanded","false"),this.#s=-1,this.#v(),this.#N();const t=this.#a;this.#A(),t.classList.remove("slu-pop-enter-from","slu-pop-enter-active"),t.classList.add("slu-pop-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("slu-pop-leave-to")),this.#S(t,()=>{t.hidden=!0,t.classList.remove("slu-pop-leave-active","slu-pop-leave-to")},220),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#S(t,e,s){const r=()=>{t.removeEventListener("transitionend",n),clearTimeout(this.#_),this.#d=null,this.#p=null,e()},n=h=>{h.target===t&&r()};this.#d=n,this.#p=t,t.addEventListener("transitionend",n),this.#_=setTimeout(r,s)}#A(){this.#d&&this.#p&&this.#p.removeEventListener("transitionend",this.#d),clearTimeout(this.#_),this.#d=null,this.#p=null}#P(){document.addEventListener("pointerdown",this.#$,!0),document.addEventListener("keydown",this.#D,!0)}#N(){document.removeEventListener("pointerdown",this.#$,!0),document.removeEventListener("keydown",this.#D,!0)}#$=t=>{t.composedPath().includes(this)||this.#o()};#D=t=>{t.key==="Escape"&&this.#e&&(t.preventDefault(),this.#o())};#I=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#o():this.#g())};#M=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#e?this.#s>=0&&this.#C(this.#s):this.#g();break;case"ArrowDown":t.preventDefault(),this.#e?this.#k(1):this.#g();break;case"ArrowUp":t.preventDefault(),this.#e?this.#k(-1):this.#g();break;case"Escape":this.#e&&(t.preventDefault(),this.#o());break;case"Tab":this.#e&&this.#o();break}}}customElements.define("vs-select-underline",A);
