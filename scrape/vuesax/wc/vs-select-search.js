const m=`
  :host { display: inline-flex; }
  .sls {
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
  }
  .sls--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); font-size: var(--ctrl-fs-sm, 13px); }
  .sls--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --px: var(--ctrl-px-md, 14px); font-size: var(--ctrl-fs-md, 14px); }
  .sls--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); font-size: var(--ctrl-fs-lg, 15px); }

  .sls__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: var(--r);
    border: 1px solid var(--inp-border, #2a2a2a);
    background: var(--btn-secondary-bg, #1a1a1a);
    color: var(--inp-text, #ededed);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: border-color 200ms ease;
  }
  .sls__trigger:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .sls.is-open .sls__trigger { border-color: var(--accent); }
  .sls__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .sls__trigger:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .sls__value { overflow: hidden; text-overflow: ellipsis; }
  .sls__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }
  .sls__caret { flex: none; width: 16px; height: 16px; color: var(--inp-btn, #8a8a8a); transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .sls.is-open .sls__caret { transform: rotate(180deg); }

  .sls__menu {
    position: absolute;
    z-index: 50;
    top: calc(var(--h) + 6px);
    left: 0;
    right: 0;
    padding: 5px;
    border-radius: 14px;
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--sel-menu-bg, #0b0b0b);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    transform-origin: top center;
  }
  .sls__menu[hidden] { display: none; }

  .sls__search {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--inp-border, #2a2a2a);
    color: var(--inp-btn, #8a8a8a);
  }
  .sls__search svg { flex: none; width: 15px; height: 15px; }
  .sls__search-input { flex: 1 1 auto; min-width: 0; border: none; background: transparent; color: var(--inp-text, #ededed); font: inherit; outline: none; }
  .sls__search-input::placeholder { color: var(--inp-placeholder, #5a5a5a); }

  .sls__list { margin: 0; padding: 0; list-style: none; max-height: 220px; overflow-y: auto; }
  .sls__opt {
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
  .sls__opt.is-active { background: var(--sel-opt-hover, rgba(255, 255, 255, 0.07)); }
  .sls__opt.is-selected { color: var(--accent); font-weight: 600; }
  .sls__opt.is-disabled { opacity: 0.4; cursor: not-allowed; }
  .sls__opt-label { overflow: hidden; text-overflow: ellipsis; }
  .sls__check { flex: none; width: 16px; height: 16px; color: var(--accent); }
  .sls__empty { padding: 10px; text-align: center; color: var(--inp-placeholder, #5a5a5a); }

  /* tones — recolor the accent (focus border, selected option, check) */
  .sls--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .sls--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .sls--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  /* dropdown enter/leave (manual transition mirroring the SFC <Transition>) */
  .sls-pop-enter-active { transition: opacity 200ms ease, transform 320ms cubic-bezier(0.34, 1.46, 0.44, 1), filter 240ms ease; }
  .sls-pop-leave-active { transition: opacity 140ms ease, transform 160ms ease, filter 140ms ease; }
  .sls-pop-enter-from, .sls-pop-leave-to { opacity: 0; transform: translateY(-6px) scaleY(0.9); filter: blur(6px); }

  @media (prefers-reduced-motion: reduce) {
    .sls__caret, .sls-pop-enter-active, .sls-pop-leave-active { transition: none; }
    .sls-pop-enter-from, .sls-pop-leave-to { filter: none; transform: none; }
  }
`,p=[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"},{label:"Cherry",value:"cherry"},{label:"Peach",value:"peach"},{label:"Grape",value:"grape"},{label:"Mango",value:"mango"},{label:"Orange",value:"orange"},{label:"Pear",value:"pear"},{label:"Watermelon",value:"watermelon"},{label:"Strawberry",value:"strawberry"},{label:"Kiwi",value:"kiwi"},{label:"Lemon",value:"lemon"}],f="http://www.w3.org/2000/svg";function u(n){const t=document.createElementNS(f,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),n&&t.setAttribute("class",n),t}function o(n,t){const e=document.createElementNS(f,"path");if(e.setAttribute("d",n),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}let g=0,h;function x(n){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=n;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(n,t){const e=t?x(String(t).trim()):null;if(!e){for(const i of _)n.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),l=(i,v)=>n.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(i,c);l("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])l(i,r?"0 0 0":"255 255 255");l("--vs-color",c),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["value","placeholder","disabled","size","tone","open","color"];#r;#t;#p;#n;#s;#c;#l;#u=p;#o=p;#b=[];#a="";#e=-1;#y="";#i=!1;#f=`vs-select-search-${++g}`;#v=!1;#m=null;#g=null;#w=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#r=document.createElement("div"),this.#r.className="sls",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="sls__trigger",this.#t.setAttribute("role","combobox"),this.#t.setAttribute("aria-haspopup","listbox"),this.#t.setAttribute("aria-expanded","false"),this.#t.setAttribute("aria-controls",`${this.#f}-list`),this.#p=document.createElement("span"),this.#p.className="sls__value";const s=u("sls__caret");s.appendChild(o("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(this.#p,s),this.#n=document.createElement("div"),this.#n.className="sls__menu",this.#n.setAttribute("role","listbox"),this.#n.hidden=!0;const a=document.createElement("div");a.className="sls__search";const r=u("");r.appendChild(o("M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z")),r.appendChild(o("M18.8978 20.4629C19.1822 22.1242 20.3546 22.4637 21.4838 21.2188C22.5159 20.0805 22.1195 18.9585 20.5969 18.7278C19.4713 18.5472 18.7052 19.3313 18.8978 20.4629Z")),this.#s=document.createElement("input"),this.#s.className="sls__search-input",this.#s.type="text",this.#s.setAttribute("placeholder","Search…"),this.#s.setAttribute("aria-autocomplete","list"),this.#s.setAttribute("aria-controls",`${this.#f}-list`),a.append(r,this.#s),this.#c=document.createElement("ul"),this.#c.className="sls__list",this.#c.id=`${this.#f}-list`,this.#l=document.createElement("li"),this.#l.className="sls__empty",this.#l.textContent="No results",this.#l.hidden=!0,this.#c.appendChild(this.#l),this.#n.append(a,this.#c),this.#r.append(this.#t,this.#n),t.append(e,this.#r),this.#a=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#F),this.#r.addEventListener("keydown",this.#K),this.#s.addEventListener("input",this.#B)}connectedCallback(){b(this,this.getAttribute("color")),this.#_(),this.#h(),this.#L(),this.hasAttribute("open")&&this.#D()}disconnectedCallback(){this.#z(),this.#k()}attributeChangedCallback(t){if(b(this,this.getAttribute("color")),!!this.#r){if(t==="open"){this.hasAttribute("open")?this.#D():this.#V();return}if(t==="value"){if(this.#v)return;this.#a=this.getAttribute("value")??"",this.#h(),this.#x();return}this.#L()}}set options(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#u=e&&e.length?e:p,this.#r&&(this.#_(),this.#h(),this.#x())}get options(){return this.#u}get value(){return this.#a}set value(t){const e=t==null?"":String(t);this.#v=!0,e?this.setAttribute("value",e):this.removeAttribute("value"),this.#v=!1,this.#a=e,this.#r&&(this.#h(),this.#x())}get open(){return this.#i}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#I(){return this.getAttribute("placeholder")??"Select…"}#q(){return this.#u.find(t=>t.value===this.#a)||null}#_(){const t=this.#y.trim().toLowerCase();this.#o=t?this.#u.filter(e=>(e.label||"").toLowerCase().includes(t)):this.#u}#E(){const t=(e,s)=>this.getAttribute(e)??s;this.#r.className=`sls sls--${t("size","md")} sls--t-${t("tone","default")}`+(this.#i?" is-open":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#L(){this.#E(),this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#i?"true":"false"),this.#x()}#x(){const t=this.#q();this.#p.textContent=t?t.label:this.#I(),this.#p.classList.toggle("is-placeholder",!t)}#h(){this.#b.forEach(t=>t.remove()),this.#b=[],this.#o.forEach((t,e)=>{const s=document.createElement("li");s.className="sls__opt"+(e===this.#e?" is-active":"")+(t.value===this.#a?" is-selected":"")+(t.disabled?" is-disabled":""),s.id=`${this.#f}-opt-${e}`,s.setAttribute("role","option"),s.setAttribute("aria-selected",t.value===this.#a?"true":"false"),t.disabled&&s.setAttribute("aria-disabled","true");const a=document.createElement("span");if(a.className="sls__opt-label",a.textContent=t.label??"",s.appendChild(a),t.value===this.#a){const r=u("sls__check");r.appendChild(o("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),r.appendChild(o("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),s.appendChild(r)}s.addEventListener("pointerenter",()=>{t.disabled||(this.#e=e,this.#A())}),s.addEventListener("click",()=>this.#T(t)),this.#b[e]=s,this.#c.insertBefore(s,this.#l)}),this.#l.hidden=this.#o.length>0,this.#A()}#A(){this.#b.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#e)}),this.#e>=0?this.#s.setAttribute("aria-activedescendant",`${this.#f}-opt-${this.#e}`):this.#s.removeAttribute("aria-activedescendant")}#S(){return this.#o.findIndex(t=>!t.disabled)}#N(){this.#e>=0&&this.#b[this.#e]?.scrollIntoView({block:"nearest"})}#$(t){const e=this.#o.length;if(!e)return;let s=this.#e;for(let a=0;a<e;a++)if(s=(s+t+e)%e,!this.#o[s]?.disabled){this.#e=s;break}this.#A(),this.#N()}#T(t){!t||t.disabled||(this.#a=t.value,this.#v=!0,t.value?this.setAttribute("value",t.value):this.removeAttribute("value"),this.#v=!1,this.#h(),this.#x(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t.value}})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:t.value}})),this.#d())}#B=()=>{this.#y=this.#s.value,this.#_(),this.#e=this.#S(),this.#h()};#C(){this.setAttribute("open","")}#d(){this.removeAttribute("open")}#D(){if(this.#i)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#i=!0,this.#y="",this.#s.value="",this.#_(),this.#E(),this.#t.setAttribute("aria-expanded","true");const t=this.#n;this.#k(),t.hidden=!1,t.classList.remove("sls-pop-leave-active","sls-pop-leave-to"),t.classList.add("sls-pop-enter-from","sls-pop-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("sls-pop-enter-from")),this.#M(t,()=>t.classList.remove("sls-pop-enter-active"),380),this.#e=this.#S(),this.#h(),this.#N(),this.#s.focus(),this.#j(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#V(){if(!this.#i)return;this.#i=!1,this.#E(),this.#t.setAttribute("aria-expanded","false"),this.#e=-1,this.#A(),this.#z();const t=this.#n;this.#k(),t.classList.remove("sls-pop-enter-from","sls-pop-enter-active"),t.classList.add("sls-pop-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("sls-pop-leave-to")),this.#M(t,()=>{t.hidden=!0,t.classList.remove("sls-pop-leave-active","sls-pop-leave-to")},240),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#M(t,e,s){const a=()=>{t.removeEventListener("transitionend",r),clearTimeout(this.#w),this.#m=null,this.#g=null,e()},r=c=>{c.target===t&&a()};this.#m=r,this.#g=t,t.addEventListener("transitionend",r),this.#w=setTimeout(a,s)}#k(){this.#m&&this.#g&&this.#g.removeEventListener("transitionend",this.#m),clearTimeout(this.#w),this.#m=null,this.#g=null}#j(){document.addEventListener("pointerdown",this.#O,!0),document.addEventListener("keydown",this.#P,!0)}#z(){document.removeEventListener("pointerdown",this.#O,!0),document.removeEventListener("keydown",this.#P,!0)}#O=t=>{t.composedPath().includes(this)||this.#d()};#P=t=>{t.key==="Escape"&&this.#i&&(t.preventDefault(),this.#d())};#F=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#d():this.#C())};#K=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"ArrowDown":t.preventDefault(),this.#i?this.#$(1):this.#C();break;case"ArrowUp":t.preventDefault(),this.#i?this.#$(-1):this.#C();break;case"Enter":this.#i&&(t.preventDefault(),this.#e>=0&&this.#T(this.#o[this.#e]));break;case"Escape":this.#i&&(t.preventDefault(),this.#d());break;case"Tab":this.#i&&this.#d();break}}}customElements.define("vs-select-search",A);
