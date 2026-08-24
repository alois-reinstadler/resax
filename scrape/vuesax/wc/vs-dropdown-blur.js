const v=`
  :host { display: inline-flex; }
  .blr {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --blr-w: 248px;
    --item-h: 38px;
    position: relative;
    display: inline-flex;
    font-size: var(--ctrl-fs-md, 14px);
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  .blr--sm { --h: var(--ctrl-h-sm, 34px); --r: var(--ctrl-r-sm, 10px); --blr-w: 216px; --item-h: 34px; font-size: var(--ctrl-fs-sm, 13px); }
  .blr--lg { --h: var(--ctrl-h-lg, 46px); --r: var(--ctrl-r-lg, 14px); --blr-w: 280px; --item-h: 42px; font-size: var(--ctrl-fs-lg, 15px); }

  .blr__trigger {
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
  .blr__trigger:hover:not(:disabled) { border-color: var(--ui-accent, #ededed); }
  .blr__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .blr__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .blr__caret { width: 14px; height: 14px; opacity: 0.8; transition: transform 240ms ease; }
  .is-open .blr__caret { transform: rotate(180deg); }

  .blr--r-none .blr__trigger, .blr--r-none .blr__panel { border-radius: 4px; }
  .blr--r-subtle .blr__trigger, .blr--r-subtle .blr__panel { border-radius: 8px; }
  .blr--r-rounded .blr__trigger, .blr--r-rounded .blr__panel { border-radius: 14px; }
  .blr--r-pill .blr__trigger { border-radius: 999px; }
  .blr--r-pill .blr__panel { border-radius: 20px; }
  @supports (corner-shape: squircle) {
    .blr--r-squircle .blr__trigger, .blr--r-squircle .blr__panel { corner-shape: squircle; border-radius: 16px; }
  }

  .blr__panel {
    position: absolute;
    z-index: 50;
    width: var(--blr-w);
    max-height: min(70vh, 420px);
    padding: 6px;
    border-radius: 16px;
    border: 1px solid var(--border, #2a2a2a);
    background: color-mix(in srgb, var(--bg-elevated, #161616) 82%, transparent);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
  }
  .blr__panel[hidden] { display: none; }
  .blr--p-bottom-start .blr__panel { top: calc(var(--h) + 8px); left: 0; }
  .blr--p-bottom-end .blr__panel { top: calc(var(--h) + 8px); right: 0; }
  .blr--p-top-start .blr__panel { bottom: calc(var(--h) + 8px); left: 0; }
  .blr--p-top-end .blr__panel { bottom: calc(var(--h) + 8px); right: 0; }

  /* ── UNIQUE EFFECT: frosted-glass condense (heavy blur → crisp) ── */
  .blr-frost-enter-active { transition: filter 340ms ease, opacity 300ms ease, transform 340ms cubic-bezier(0.22, 1, 0.36, 1); }
  .blr-frost-leave-active { transition: filter 220ms ease, opacity 200ms ease, transform 220ms ease; }
  .blr-frost-enter-from { filter: blur(var(--blur, 14px)); opacity: 0; transform: translateY(-6px) scale(0.98); }
  .blr-frost-leave-to { filter: blur(calc(var(--blur, 14px) * 0.7)); opacity: 0; transform: translateY(-4px) scale(0.98); }

  .blr__list { position: relative; margin: 0; padding: 0; list-style: none; }
  .blr__divider { height: 1px; margin: 5px 6px; background: var(--border, #2a2a2a); }

  .blr__item {
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
    transition: background-color 120ms ease, color 120ms ease;
  }
  /* each item focuses from blur → sharp in a staggered wave */
  .is-open .blr__item {
    animation: blr-item-focus 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--i, 0) * 40ms + 80ms);
  }
  @keyframes blr-item-focus {
    0% { opacity: 0; filter: blur(6px); transform: translateX(-6px); }
    100% { opacity: 1; filter: blur(0); transform: none; }
  }
  .blr__item.is-active:not(.is-disabled) { background: var(--sel-opt-hover, rgba(255,255,255,0.06)); color: var(--text, #ededed); }
  .blr__item.is-selected { color: var(--ui-accent, #ededed); font-weight: 600; }
  .blr__item.is-disabled { opacity: 0.4; cursor: not-allowed; }

  .blr__item-icon { flex: none; width: 17px; height: 17px; opacity: 0.85; }
  .blr__item-label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
  .blr__check { flex: none; width: 16px; height: 16px; color: var(--ui-accent, #ededed); }

  .blr__item--t-danger { color: #ff8a8e; }
  .blr__item--t-danger.is-active:not(.is-disabled) { color: #ff8a8e; }
  .blr__item--t-warn { color: #ffce7a; }
  .blr__item--t-warn.is-active:not(.is-disabled) { color: #ffce7a; }
  .blr__item--t-success { color: #7ed4a6; }
  .blr__item--t-success.is-active:not(.is-disabled) { color: #7ed4a6; }

  .blr--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .blr--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .blr--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .blr__caret,
    .blr-frost-enter-active, .blr-frost-leave-active { transition: none; }
    .blr-frost-enter-from, .blr-frost-leave-to { filter: none; transform: none; opacity: 0; }
    .is-open .blr__item { animation: none; }
  }
`,p=[{label:"Profile",value:"profile",icon:"M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"},{label:"Settings",value:"settings",icon:"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"},{label:"Billing",value:"billing",icon:"M2 8.50488H22M6 16.5049H8M10.5 16.5049H14.5M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z"},{label:"Sign out",value:"signout",tone:"danger",divider:!0,icon:"M17.4399 14.62L19.9999 12.06L17.4399 9.5M9.75977 12.0596H19.9298M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"}],f="http://www.w3.org/2000/svg";function h(l,t="0 0 24 24"){const e=document.createElementNS(f,"svg");return e.setAttribute("viewBox",t),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",l),e}function d(l,t){const e=document.createElementNS(f,"path");if(e.setAttribute("d",l),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const r in t)e.setAttribute(r,t[r]);return e}let c;function g(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(l,t){const e=t?g(String(t).trim()):null;if(!e){for(const s of _)l.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,b=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),o=(s,m)=>l.style.setProperty(s,m);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(s,n);o("--btn-primary-bg-hover",`rgb(${b[0]} ${b[1]} ${b[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])o(s,a?"0 0 0":"255 255 255");o("--vs-color",n),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["label","size","radius","tone","placement","disabled","blur","value","open","color"];#i;#t;#f;#s;#l;#n=p;#p=[];#a="";#r=-1;#e=!1;#_=null;#c=null;#d=null;#m=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#i=document.createElement("div"),this.#i.className="blr",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="blr__trigger",this.#t.setAttribute("aria-haspopup","menu"),this.#t.setAttribute("aria-expanded","false");const r=document.createElement("span");r.className="blr__trigger-label";const i=document.createElement("slot");this.#f=document.createTextNode("Menu"),i.append(this.#f),r.append(i);const a=h("blr__caret");a.appendChild(d("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(r,a),this.#s=document.createElement("div"),this.#s.className="blr__panel",this.#s.setAttribute("role","menu"),this.#s.hidden=!0,this.#l=document.createElement("ul"),this.#l.className="blr__list",this.#s.appendChild(this.#l),this.#i.append(this.#t,this.#s),t.append(e,this.#i),this.#a=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#D),this.#t.addEventListener("keydown",this.#$)}connectedCallback(){u(this,this.getAttribute("color")),this.#b(),this.#x(),this.hasAttribute("open")&&this.#w()}disconnectedCallback(){this.#k(),this.#g(),this.#_?.abort(),this.#_=null}attributeChangedCallback(t){if(u(this,this.getAttribute("color")),!!this.#i){if(t==="open"){this.hasAttribute("open")?this.#w():this.#N();return}if(t==="value"){this.#a=this.getAttribute("value")??"",this.#b();return}this.#x()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const r=JSON.parse(t);Array.isArray(r)&&(e=r)}catch{}this.#n=e&&e.length?e:p,this.#i&&this.#b()}get items(){return this.#n}set value(t){this.#a=t==null?"":String(t),this.#i&&this.#b()}get value(){return this.#a}get open(){return this.#e}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#v(){const t=(e,r)=>this.getAttribute(e)??r;this.#i.className=`blr blr--${t("size","md")} blr--t-${t("tone","default")} blr--r-${t("radius","squircle")} blr--p-${t("placement","bottom-start")}`+(this.#e?" is-open":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#x(){this.#v();const t=Math.min(Math.max(Number(this.getAttribute("blur"))||14,0),40);this.#i.style.setProperty("--blur",`${t}px`),this.#f.data=this.getAttribute("label")??"Menu",this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#e?"true":"false")}#b(){this.#l.replaceChildren(),this.#p=[],this.#n.forEach((t,e)=>{if(t.divider){const n=document.createElement("li");n.className="blr__divider",n.setAttribute("role","separator"),n.setAttribute("aria-hidden","true"),this.#l.appendChild(n)}const r=t.href?"a":"li",i=document.createElement(r);if(i.className="blr__item"+(t.tone?` blr__item--t-${t.tone}`:"")+(t.value===this.#a?" is-selected":"")+(t.disabled?" is-disabled":""),i.style.setProperty("--i",e),i.setAttribute("role","menuitem"),t.href&&i.setAttribute("href",t.href),t.disabled&&i.setAttribute("aria-disabled","true"),t.icon){const n=h("blr__item-icon");n.appendChild(d(t.icon)),i.appendChild(n)}const a=document.createElement("span");if(a.className="blr__item-label",a.textContent=t.label??"",i.appendChild(a),t.value===this.#a){const n=h("blr__check");n.appendChild(d("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),n.appendChild(d("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),i.appendChild(n)}i.addEventListener("pointerenter",()=>{t.disabled||(this.#r=e,this.#h())}),i.addEventListener("click",()=>this.#A(e)),this.#p[e]=i,this.#l.appendChild(i)}),this.#h()}#h(){this.#p.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#r)})}#S(){return this.#n.findIndex(t=>!t.disabled)}#C(){this.#r<0||this.#p[this.#r]?.scrollIntoView({block:"nearest"})}#y(t){const e=this.#n.length;if(!e)return;let r=this.#r;for(let i=0;i<e;i++)if(r=(r+t+e)%e,!this.#n[r]?.disabled){this.#r=r;break}this.#h(),this.#C()}#A(t){const e=this.#n[t];!e||e.disabled||(this.#a=e.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,index:t,value:e.value}})),this.#o(),this.#b())}#u(){this.setAttribute("open","")}#o(){this.removeAttribute("open")}#w(){if(this.#e)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#e=!0,this.#v(),this.#t.setAttribute("aria-expanded","true");const t=this.#s;this.#g(),t.hidden=!1,t.classList.remove("blr-frost-leave-active","blr-frost-leave-to"),t.classList.add("blr-frost-enter-from","blr-frost-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("blr-frost-enter-from")),this.#E(t,()=>t.classList.remove("blr-frost-enter-active"),400),this.#r=this.#S(),this.#h(),this.#C(),this.#T(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#N(){if(!this.#e)return;this.#e=!1,this.#v(),this.#t.setAttribute("aria-expanded","false"),this.#r=-1,this.#h(),this.#k();const t=this.#s;this.#g(),t.classList.remove("blr-frost-enter-from","blr-frost-enter-active"),t.classList.add("blr-frost-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("blr-frost-leave-to")),this.#E(t,()=>{t.hidden=!0,t.classList.remove("blr-frost-leave-active","blr-frost-leave-to")},300),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#E(t,e,r){const i=()=>{t.removeEventListener("transitionend",a),clearTimeout(this.#m),this.#c=null,this.#d=null,e()},a=n=>{n.target===t&&i()};this.#c=a,this.#d=t,t.addEventListener("transitionend",a),this.#m=setTimeout(i,r)}#g(){this.#c&&this.#d&&this.#d.removeEventListener("transitionend",this.#c),clearTimeout(this.#m),this.#c=null,this.#d=null}#T(){document.addEventListener("pointerdown",this.#L,!0),document.addEventListener("keydown",this.#M,!0)}#k(){document.removeEventListener("pointerdown",this.#L,!0),document.removeEventListener("keydown",this.#M,!0)}#L=t=>{t.composedPath().includes(this)||this.#o()};#M=t=>{t.key==="Escape"&&this.#e&&(t.preventDefault(),this.#o())};#D=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#o():this.#u())};#$=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#e?this.#r>=0&&this.#A(this.#r):this.#u();break;case"ArrowDown":t.preventDefault(),this.#e?this.#y(1):this.#u();break;case"ArrowUp":t.preventDefault(),this.#e?this.#y(-1):this.#u();break;case"Escape":this.#e&&(t.preventDefault(),this.#o());break;case"Tab":this.#e&&this.#o();break}}}customElements.define("vs-dropdown-blur",x);
