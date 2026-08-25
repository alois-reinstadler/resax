const v=`
  :host { display: inline-flex; }
  .fld {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fld-w: 248px;
    --item-h: 38px;
    position: relative;
    display: inline-flex;
    font-size: var(--ctrl-fs-md, 14px);
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  .fld--sm { --h: var(--ctrl-h-sm, 34px); --r: var(--ctrl-r-sm, 10px); --fld-w: 216px; --item-h: 34px; font-size: var(--ctrl-fs-sm, 13px); }
  .fld--lg { --h: var(--ctrl-h-lg, 46px); --r: var(--ctrl-r-lg, 14px); --fld-w: 280px; --item-h: 42px; font-size: var(--ctrl-fs-lg, 15px); }

  .fld__trigger {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: var(--h);
    padding: 0 16px;
    border-radius: var(--r);
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-elevated, #161616);
    color: var(--text, #ededed);
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    -webkit-tap-highlight-color: transparent;
    transition: border-color 160ms ease;
  }
  .fld__trigger:hover:not(:disabled) { border-color: var(--ui-accent, #ededed); }
  .fld__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .fld__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .fld__caret { width: 14px; height: 14px; opacity: 0.8; transition: transform 240ms ease; }
  .is-open .fld__caret { transform: rotate(180deg); }

  .fld--r-none .fld__trigger, .fld--r-none .fld__panel { border-radius: 4px; }
  .fld--r-subtle .fld__trigger, .fld--r-subtle .fld__panel { border-radius: 8px; }
  .fld--r-rounded .fld__trigger, .fld--r-rounded .fld__panel { border-radius: 14px; }
  .fld--r-pill .fld__trigger { border-radius: 999px; }
  .fld--r-pill .fld__panel { border-radius: 20px; }
  @supports (corner-shape: squircle) {
    .fld--r-squircle .fld__trigger, .fld--r-squircle .fld__panel { corner-shape: squircle; border-radius: 16px; }
  }

  /* the scene carries the perspective for the 3D fold */
  .fld__scene {
    position: absolute;
    z-index: 50;
    perspective: var(--depth, 800px);
  }
  .fld--p-bottom-start .fld__scene { top: calc(var(--h) + 8px); left: 0; }
  .fld--p-bottom-end .fld__scene { top: calc(var(--h) + 8px); right: 0; }
  .fld--p-top-start .fld__scene { bottom: calc(var(--h) + 8px); left: 0; }
  .fld--p-top-end .fld__scene { bottom: calc(var(--h) + 8px); right: 0; }

  .fld__panel {
    width: var(--fld-w);
    max-height: min(70vh, 420px);
    padding: 6px;
    border-radius: 16px;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-elevated, #161616);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  .fld__panel[hidden] { display: none; }

  /* ── UNIQUE EFFECT: origami unfold — panel rotates open around its hinge edge ── */
  .fld--fold-top .fld__panel { transform-origin: top center; }
  .fld--fold-bottom .fld__panel { transform-origin: bottom center; }
  .fld-unfold-enter-active { transition: transform 380ms cubic-bezier(0.34, 1.3, 0.5, 1), opacity 200ms ease; }
  .fld-unfold-leave-active { transition: transform 240ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms ease; }
  .fld--fold-top .fld-unfold-enter-from,
  .fld--fold-top .fld-unfold-leave-to { transform: rotateX(-92deg); opacity: 0; }
  .fld--fold-bottom .fld-unfold-enter-from,
  .fld--fold-bottom .fld-unfold-leave-to { transform: rotateX(92deg); opacity: 0; }

  .fld__list { position: relative; margin: 0; padding: 0; list-style: none; overflow-y: auto; max-height: inherit; transform-style: preserve-3d; }
  .fld__divider { height: 1px; margin: 5px 6px; background: var(--border, #2a2a2a); }

  .fld__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    height: var(--item-h, 38px);
    border-radius: 9px;
    color: var(--text-secondary, #c4c4c4);
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;
    transform-origin: top center;
    transition: background-color 120ms ease, color 120ms ease;
  }
  /* each item flips down from -90deg like a page unfolding, in sequence */
  .is-open .fld__item {
    animation: fld-item-flip 400ms cubic-bezier(0.34, 1.3, 0.5, 1) both;
    animation-delay: calc(var(--i, 0) * 44ms + 120ms);
  }
  @keyframes fld-item-flip {
    0% { opacity: 0; transform: perspective(600px) rotateX(-80deg); }
    100% { opacity: 1; transform: perspective(600px) rotateX(0); }
  }
  .fld__item.is-active:not(.is-disabled) { background: var(--sel-opt-hover, rgba(255,255,255,0.06)); color: var(--text, #ededed); }
  .fld__item.is-selected { color: var(--ui-accent, #ededed); font-weight: 600; }
  .fld__item.is-disabled { opacity: 0.4; cursor: not-allowed; }

  .fld__item-icon { flex: none; width: 17px; height: 17px; opacity: 0.85; }
  .fld__item-label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
  .fld__check { flex: none; width: 16px; height: 16px; color: var(--ui-accent, #ededed); }

  .fld__item--t-danger { color: #ff8a8e; }
  .fld__item--t-danger.is-active:not(.is-disabled) { color: #ff8a8e; }
  .fld__item--t-warn { color: #ffce7a; }
  .fld__item--t-warn.is-active:not(.is-disabled) { color: #ffce7a; }
  .fld__item--t-success { color: #7ed4a6; }
  .fld__item--t-success.is-active:not(.is-disabled) { color: #7ed4a6; }

  .fld--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .fld--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .fld--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .fld__caret,
    .fld-unfold-enter-active, .fld-unfold-leave-active { transition: none; }
    .fld--fold-top .fld-unfold-enter-from, .fld--fold-top .fld-unfold-leave-to,
    .fld--fold-bottom .fld-unfold-enter-from, .fld--fold-bottom .fld-unfold-leave-to { transform: none; opacity: 0; }
    .is-open .fld__item { animation: none; }
  }
`,p=[{label:"Profile",value:"profile",icon:"M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"},{label:"Settings",value:"settings",icon:"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"},{label:"Billing",value:"billing",icon:"M2 8.50488H22M6 16.5049H8M10.5 16.5049H14.5M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z"},{label:"Sign out",value:"signout",tone:"danger",divider:!0,icon:"M17.4399 14.62L19.9999 12.06L17.4399 9.5M9.75977 12.0596H19.9298M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"}],m="http://www.w3.org/2000/svg";function h(o,t="0 0 24 24"){const e=document.createElementNS(m,"svg");return e.setAttribute("viewBox",t),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",o),e}function c(o,t){const e=document.createElementNS(m,"path");if(e.setAttribute("d",o),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const i in t)e.setAttribute(i,t[i]);return e}let d;function g(o){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=o;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(o,t){const e=t?g(String(t).trim()):null;if(!e){for(const s of _)o.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),l=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,f=e.map(s=>Math.round(l?s*.92:s+(255-s)*.16)),a=(s,b)=>o.style.setProperty(s,b);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,n);a("--btn-primary-bg-hover",`rgb(${f[0]} ${f[1]} ${f[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,l?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,l?"0 0 0":"255 255 255");a("--vs-color",n),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["label","size","radius","tone","placement","disabled","depth","value","open","color"];#r;#t;#b;#p;#s;#o;#n=p;#u=[];#l="";#i=-1;#e=!1;#d=null;#c=null;#v=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#r=document.createElement("div"),this.#r.className="fld",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="fld__trigger",this.#t.setAttribute("aria-haspopup","menu"),this.#t.setAttribute("aria-expanded","false");const i=document.createElement("span");i.className="fld__trigger-label";const r=document.createElement("slot");this.#b=document.createTextNode("Menu"),r.append(this.#b),i.append(r);const l=h("fld__caret");l.appendChild(c("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(i,l),this.#p=document.createElement("div"),this.#p.className="fld__scene",this.#s=document.createElement("div"),this.#s.className="fld__panel",this.#s.setAttribute("role","menu"),this.#s.hidden=!0,this.#o=document.createElement("ul"),this.#o.className="fld__list",this.#s.appendChild(this.#o),this.#p.appendChild(this.#s),this.#r.append(this.#t,this.#p),t.append(e,this.#r),this.#l=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#$),this.#t.addEventListener("keydown",this.#q)}connectedCallback(){u(this,this.getAttribute("color")),this.#f(),this.#x(),this.hasAttribute("open")&&this.#w()}disconnectedCallback(){this.#k(),this.#_()}attributeChangedCallback(t){if(u(this,this.getAttribute("color")),!!this.#r){if(t==="open"){this.hasAttribute("open")?this.#w():this.#D();return}if(t==="value"){this.#l=this.getAttribute("value")??"",this.#f();return}this.#x()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&(e=i)}catch{}this.#n=e&&e.length?e:p,this.#r&&this.#f()}get items(){return this.#n}set value(t){this.#l=t==null?"":String(t),this.#r&&this.#f()}get value(){return this.#l}get open(){return this.#e}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#N(){const t=this.getAttribute("placement")??"bottom-start";return t==="top-start"||t==="top-end"?"bottom":"top"}#g(){const t=(e,i)=>this.getAttribute(e)??i;this.#r.className=`fld fld--${t("size","md")} fld--t-${t("tone","default")} fld--r-${t("radius","squircle")} fld--p-${t("placement","bottom-start")} fld--fold-${this.#N()}`+(this.#e?" is-open":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#x(){this.#g();const t=Math.min(Math.max(Number(this.getAttribute("depth"))||800,200),2e3);this.#r.style.setProperty("--depth",`${t}px`),this.#b.data=this.getAttribute("label")??"Menu",this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#e?"true":"false")}#f(){this.#o.replaceChildren(),this.#u=[],this.#n.forEach((t,e)=>{if(t.divider){const n=document.createElement("li");n.className="fld__divider",n.setAttribute("role","separator"),n.setAttribute("aria-hidden","true"),this.#o.appendChild(n)}const i=t.href?"a":"li",r=document.createElement(i);if(r.className="fld__item"+(t.tone?` fld__item--t-${t.tone}`:"")+(t.value===this.#l?" is-selected":"")+(t.disabled?" is-disabled":""),r.style.setProperty("--i",e),r.setAttribute("role","menuitem"),t.href&&r.setAttribute("href",t.href),t.disabled&&r.setAttribute("aria-disabled","true"),t.icon){const n=h("fld__item-icon");n.appendChild(c(t.icon)),r.appendChild(n)}const l=document.createElement("span");if(l.className="fld__item-label",l.textContent=t.label??"",r.appendChild(l),t.value===this.#l){const n=h("fld__check");n.appendChild(c("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),n.appendChild(c("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),r.appendChild(n)}r.addEventListener("pointerenter",()=>{t.disabled||(this.#i=e,this.#h())}),r.addEventListener("click",()=>this.#A(e)),this.#u[e]=r,this.#o.appendChild(r)}),this.#h()}#h(){this.#u.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#i)})}#S(){return this.#n.findIndex(t=>!t.disabled)}#C(){this.#i<0||this.#u[this.#i]?.scrollIntoView({block:"nearest"})}#y(t){const e=this.#n.length;if(!e)return;let i=this.#i;for(let r=0;r<e;r++)if(i=(i+t+e)%e,!this.#n[i]?.disabled){this.#i=i;break}this.#h(),this.#C()}#A(t){const e=this.#n[t];!e||e.disabled||(this.#l=e.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,index:t,value:e.value}})),this.#a(),this.#f())}#m(){this.setAttribute("open","")}#a(){this.removeAttribute("open")}#w(){if(this.#e)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#e=!0,this.#g(),this.#t.setAttribute("aria-expanded","true");const t=this.#s;this.#_(),t.hidden=!1,t.classList.remove("fld-unfold-leave-active","fld-unfold-leave-to"),t.classList.add("fld-unfold-enter-from","fld-unfold-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("fld-unfold-enter-from")),this.#E(t,()=>t.classList.remove("fld-unfold-enter-active"),440),this.#i=this.#S(),this.#h(),this.#C(),this.#T(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#D(){if(!this.#e)return;this.#e=!1,this.#g(),this.#t.setAttribute("aria-expanded","false"),this.#i=-1,this.#h(),this.#k();const t=this.#s;this.#_(),t.classList.remove("fld-unfold-enter-from","fld-unfold-enter-active"),t.classList.add("fld-unfold-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("fld-unfold-leave-to")),this.#E(t,()=>{t.hidden=!0,t.classList.remove("fld-unfold-leave-active","fld-unfold-leave-to")},300),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#E(t,e,i){const r=()=>{t.removeEventListener("transitionend",l),clearTimeout(this.#v),this.#d=null,this.#c=null,e()},l=n=>{n.target===t&&r()};this.#d=l,this.#c=t,t.addEventListener("transitionend",l),this.#v=setTimeout(r,i)}#_(){this.#d&&this.#c&&this.#c.removeEventListener("transitionend",this.#d),clearTimeout(this.#v),this.#d=null,this.#c=null}#T(){document.addEventListener("pointerdown",this.#L,!0),document.addEventListener("keydown",this.#M,!0)}#k(){document.removeEventListener("pointerdown",this.#L,!0),document.removeEventListener("keydown",this.#M,!0)}#L=t=>{t.composedPath().includes(this)||this.#a()};#M=t=>{t.key==="Escape"&&this.#e&&(t.preventDefault(),this.#a())};#$=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#a():this.#m())};#q=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#e?this.#i>=0&&this.#A(this.#i):this.#m();break;case"ArrowDown":t.preventDefault(),this.#e?this.#y(1):this.#m();break;case"ArrowUp":t.preventDefault(),this.#e?this.#y(-1):this.#m();break;case"Escape":this.#e&&(t.preventDefault(),this.#a());break;case"Tab":this.#e&&this.#a();break}}}customElements.define("vs-dropdown-fold",x);
