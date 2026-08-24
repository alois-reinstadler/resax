const v=`
  :host { display: inline-flex; }
  .sld {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --sld-w: 248px;
    --item-h: 38px;
    position: relative;
    display: inline-flex;
    font-size: var(--ctrl-fs-md, 14px);
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  .sld--sm { --h: var(--ctrl-h-sm, 34px); --r: var(--ctrl-r-sm, 10px); --sld-w: 216px; --item-h: 34px; font-size: var(--ctrl-fs-sm, 13px); }
  .sld--lg { --h: var(--ctrl-h-lg, 46px); --r: var(--ctrl-r-lg, 14px); --sld-w: 280px; --item-h: 42px; font-size: var(--ctrl-fs-lg, 15px); }

  .sld__trigger {
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
  .sld__trigger:hover:not(:disabled) { border-color: var(--ui-accent, #ededed); }
  .sld__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .sld__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .sld__caret { width: 14px; height: 14px; opacity: 0.8; transition: transform 240ms ease; }
  .is-open .sld__caret { transform: rotate(180deg); }

  .sld--r-none .sld__trigger, .sld--r-none .sld__panel { border-radius: 4px; }
  .sld--r-subtle .sld__trigger, .sld--r-subtle .sld__panel { border-radius: 8px; }
  .sld--r-rounded .sld__trigger, .sld--r-rounded .sld__panel { border-radius: 14px; }
  .sld--r-pill .sld__trigger { border-radius: 999px; }
  .sld--r-pill .sld__panel { border-radius: 20px; }
  @supports (corner-shape: squircle) {
    .sld--r-squircle .sld__trigger, .sld--r-squircle .sld__panel { corner-shape: squircle; border-radius: 16px; }
  }

  .sld__panel {
    position: absolute;
    z-index: 50;
    width: var(--sld-w);
    max-height: min(70vh, 420px);
    padding: 6px;
    border-radius: 16px;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-elevated, #161616);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  .sld__panel[hidden] { display: none; }
  .sld--p-bottom-start .sld__panel { top: calc(var(--h) + 8px); left: 0; }
  .sld--p-bottom-end .sld__panel { top: calc(var(--h) + 8px); right: 0; }
  .sld--p-top-start .sld__panel { bottom: calc(var(--h) + 8px); left: 0; }
  .sld--p-top-end .sld__panel { bottom: calc(var(--h) + 8px); right: 0; }

  /* ── UNIQUE EFFECT: slide + clip-path wipe from the trigger edge ── */
  .sld-wipe-enter-active { transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), clip-path 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease; }
  .sld-wipe-leave-active { transition: transform 200ms cubic-bezier(0.4, 0, 1, 1), clip-path 220ms ease, opacity 180ms ease; }
  .sld--from-down .sld-wipe-enter-from,
  .sld--from-down .sld-wipe-leave-to { transform: translateY(calc(-1 * var(--dist, 16px))); clip-path: inset(0 0 100% 0); opacity: 0; }
  .sld--from-up .sld-wipe-enter-from,
  .sld--from-up .sld-wipe-leave-to { transform: translateY(var(--dist, 16px)); clip-path: inset(100% 0 0 0); opacity: 0; }

  .sld__list { position: relative; margin: 0; padding: 0; list-style: none; overflow-y: auto; max-height: inherit; }
  .sld__divider { height: 1px; margin: 5px 6px; background: var(--border, #2a2a2a); }

  .sld__item {
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
  /* each item slides in from the leading edge, one by one */
  .is-open .sld__item {
    animation: sld-item-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--i, 0) * 36ms + 90ms);
  }
  @keyframes sld-item-in {
    0% { opacity: 0; transform: translateX(calc(-1 * var(--dist, 16px))); }
    100% { opacity: 1; transform: none; }
  }
  .sld__item.is-active:not(.is-disabled) { background: var(--sel-opt-hover, rgba(255,255,255,0.06)); color: var(--text, #ededed); }
  .sld__item.is-selected { color: var(--ui-accent, #ededed); font-weight: 600; }
  .sld__item.is-disabled { opacity: 0.4; cursor: not-allowed; }

  .sld__item-icon { flex: none; width: 17px; height: 17px; opacity: 0.85; }
  .sld__item-label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
  .sld__check { flex: none; width: 16px; height: 16px; color: var(--ui-accent, #ededed); }

  .sld__item--t-danger { color: #ff8a8e; }
  .sld__item--t-danger.is-active:not(.is-disabled) { color: #ff8a8e; }
  .sld__item--t-warn { color: #ffce7a; }
  .sld__item--t-warn.is-active:not(.is-disabled) { color: #ffce7a; }
  .sld__item--t-success { color: #7ed4a6; }
  .sld__item--t-success.is-active:not(.is-disabled) { color: #7ed4a6; }

  .sld--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .sld--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .sld--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .sld__caret,
    .sld-wipe-enter-active, .sld-wipe-leave-active { transition: none; }
    .sld--from-down .sld-wipe-enter-from, .sld--from-down .sld-wipe-leave-to,
    .sld--from-up .sld-wipe-enter-from, .sld--from-up .sld-wipe-leave-to { transform: none; clip-path: none; opacity: 0; }
    .is-open .sld__item { animation: none; }
  }
`,u=[{label:"Profile",value:"profile",icon:"M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"},{label:"Settings",value:"settings",icon:"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"},{label:"Billing",value:"billing",icon:"M2 8.50488H22M6 16.5049H8M10.5 16.5049H14.5M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z"},{label:"Sign out",value:"signout",tone:"danger",divider:!0,icon:"M17.4399 14.62L19.9999 12.06L17.4399 9.5M9.75977 12.0596H19.9298M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"}],f="http://www.w3.org/2000/svg";function p(l,t="0 0 24 24"){const e=document.createElementNS(f,"svg");return e.setAttribute("viewBox",t),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",l),e}function c(l,t){const e=document.createElementNS(f,"path");if(e.setAttribute("d",l),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}let d;function g(l){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=l;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(l,t){const e=t?g(String(t).trim()):null;if(!e){for(const r of _)l.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),o=(r,b)=>l.style.setProperty(r,b);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,n);o("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,a?"0 0 0":"255 255 255");o("--vs-color",n),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["label","size","radius","tone","placement","disabled","distance","value","open","color"];#i;#t;#f;#r;#l;#n=u;#u=[];#a="";#s=-1;#e=!1;#d=null;#c=null;#b=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#i=document.createElement("div"),this.#i.className="sld",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="sld__trigger",this.#t.setAttribute("aria-haspopup","menu"),this.#t.setAttribute("aria-expanded","false");const s=document.createElement("span");s.className="sld__trigger-label";const i=document.createElement("slot");this.#f=document.createTextNode("Menu"),i.append(this.#f),s.append(i);const a=p("sld__caret");a.appendChild(c("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(s,a),this.#r=document.createElement("div"),this.#r.className="sld__panel",this.#r.setAttribute("role","menu"),this.#r.hidden=!0,this.#l=document.createElement("ul"),this.#l.className="sld__list",this.#r.appendChild(this.#l),this.#i.append(this.#t,this.#r),t.append(e,this.#i),this.#a=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#D),this.#t.addEventListener("keydown",this.#$)}connectedCallback(){m(this,this.getAttribute("color")),this.#h(),this.#_(),this.hasAttribute("open")&&this.#y()}disconnectedCallback(){this.#E(),this.#g()}attributeChangedCallback(t){if(m(this,this.getAttribute("color")),!!this.#i){if(t==="open"){this.hasAttribute("open")?this.#y():this.#N();return}if(t==="value"){this.#a=this.getAttribute("value")??"",this.#h();return}this.#_()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#n=e&&e.length?e:u,this.#i&&this.#h()}get items(){return this.#n}set value(t){this.#a=t==null?"":String(t),this.#i&&this.#h()}get value(){return this.#a}get open(){return this.#e}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#M(){const t=this.getAttribute("placement")??"bottom-start";return t==="top-start"||t==="top-end"?"up":"down"}#v(){const t=(e,s)=>this.getAttribute(e)??s;this.#i.className=`sld sld--${t("size","md")} sld--t-${t("tone","default")} sld--r-${t("radius","squircle")} sld--p-${t("placement","bottom-start")} sld--from-${this.#M()}`+(this.#e?" is-open":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#_(){this.#v();const t=Math.min(Math.max(Number(this.getAttribute("distance"))||16,0),60);this.#i.style.setProperty("--dist",`${t}px`),this.#f.data=this.getAttribute("label")??"Menu",this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#e?"true":"false")}#h(){this.#l.replaceChildren(),this.#u=[],this.#n.forEach((t,e)=>{if(t.divider){const n=document.createElement("li");n.className="sld__divider",n.setAttribute("role","separator"),n.setAttribute("aria-hidden","true"),this.#l.appendChild(n)}const s=t.href?"a":"li",i=document.createElement(s);if(i.className="sld__item"+(t.tone?` sld__item--t-${t.tone}`:"")+(t.value===this.#a?" is-selected":"")+(t.disabled?" is-disabled":""),i.style.setProperty("--i",e),i.setAttribute("role","menuitem"),t.href&&i.setAttribute("href",t.href),t.disabled&&i.setAttribute("aria-disabled","true"),t.icon){const n=p("sld__item-icon");n.appendChild(c(t.icon)),i.appendChild(n)}const a=document.createElement("span");if(a.className="sld__item-label",a.textContent=t.label??"",i.appendChild(a),t.value===this.#a){const n=p("sld__check");n.appendChild(c("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),n.appendChild(c("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),i.appendChild(n)}i.addEventListener("pointerenter",()=>{t.disabled||(this.#s=e,this.#p())}),i.addEventListener("click",()=>this.#C(e)),this.#u[e]=i,this.#l.appendChild(i)}),this.#p()}#p(){this.#u.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#s)})}#S(){return this.#n.findIndex(t=>!t.disabled)}#x(){this.#s<0||this.#u[this.#s]?.scrollIntoView({block:"nearest"})}#w(t){const e=this.#n.length;if(!e)return;let s=this.#s;for(let i=0;i<e;i++)if(s=(s+t+e)%e,!this.#n[s]?.disabled){this.#s=s;break}this.#p(),this.#x()}#C(t){const e=this.#n[t];!e||e.disabled||(this.#a=e.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,index:t,value:e.value}})),this.#o(),this.#h())}#m(){this.setAttribute("open","")}#o(){this.removeAttribute("open")}#y(){if(this.#e)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#e=!0,this.#v(),this.#t.setAttribute("aria-expanded","true");const t=this.#r;this.#g(),t.hidden=!1,t.classList.remove("sld-wipe-leave-active","sld-wipe-leave-to"),t.classList.add("sld-wipe-enter-from","sld-wipe-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("sld-wipe-enter-from")),this.#A(t,()=>t.classList.remove("sld-wipe-enter-active"),380),this.#s=this.#S(),this.#p(),this.#x(),this.#T(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#N(){if(!this.#e)return;this.#e=!1,this.#v(),this.#t.setAttribute("aria-expanded","false"),this.#s=-1,this.#p(),this.#E();const t=this.#r;this.#g(),t.classList.remove("sld-wipe-enter-from","sld-wipe-enter-active"),t.classList.add("sld-wipe-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("sld-wipe-leave-to")),this.#A(t,()=>{t.hidden=!0,t.classList.remove("sld-wipe-leave-active","sld-wipe-leave-to")},260),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#A(t,e,s){const i=()=>{t.removeEventListener("transitionend",a),clearTimeout(this.#b),this.#d=null,this.#c=null,e()},a=n=>{n.target===t&&i()};this.#d=a,this.#c=t,t.addEventListener("transitionend",a),this.#b=setTimeout(i,s)}#g(){this.#d&&this.#c&&this.#c.removeEventListener("transitionend",this.#d),clearTimeout(this.#b),this.#d=null,this.#c=null}#T(){document.addEventListener("pointerdown",this.#L,!0),document.addEventListener("keydown",this.#k,!0)}#E(){document.removeEventListener("pointerdown",this.#L,!0),document.removeEventListener("keydown",this.#k,!0)}#L=t=>{t.composedPath().includes(this)||this.#o()};#k=t=>{t.key==="Escape"&&this.#e&&(t.preventDefault(),this.#o())};#D=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#o():this.#m())};#$=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#e?this.#s>=0&&this.#C(this.#s):this.#m();break;case"ArrowDown":t.preventDefault(),this.#e?this.#w(1):this.#m();break;case"ArrowUp":t.preventDefault(),this.#e?this.#w(-1):this.#m();break;case"Escape":this.#e&&(t.preventDefault(),this.#o());break;case"Tab":this.#e&&this.#o();break}}}customElements.define("vs-dropdown-slide",x);
