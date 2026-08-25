const f=`
  :host { display: inline-flex; }
  .spg {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --spg-w: 248px;
    --item-h: 38px;
    position: relative;
    display: inline-flex;
    font-size: var(--ctrl-fs-md, 14px);
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  .spg--sm { --h: var(--ctrl-h-sm, 34px); --r: var(--ctrl-r-sm, 10px); --spg-w: 216px; --item-h: 34px; font-size: var(--ctrl-fs-sm, 13px); }
  .spg--lg { --h: var(--ctrl-h-lg, 46px); --r: var(--ctrl-r-lg, 14px); --spg-w: 280px; --item-h: 42px; font-size: var(--ctrl-fs-lg, 15px); }

  .spg__trigger {
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
    transition: transform 220ms var(--spring), border-color 160ms ease;
  }
  .spg__trigger:hover:not(:disabled) { border-color: var(--ui-accent, #ededed); }
  .spg__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .spg__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .is-open .spg__trigger { transform: scale(0.96); border-color: var(--ui-accent, #ededed); }
  .spg__caret { width: 14px; height: 14px; opacity: 0.8; transition: transform 260ms var(--spring); }
  .is-open .spg__caret { transform: rotate(180deg); }

  .spg--r-none .spg__trigger, .spg--r-none .spg__panel { border-radius: 4px; }
  .spg--r-subtle .spg__trigger, .spg--r-subtle .spg__panel { border-radius: 8px; }
  .spg--r-rounded .spg__trigger, .spg--r-rounded .spg__panel { border-radius: 14px; }
  .spg--r-pill .spg__trigger { border-radius: 999px; }
  .spg--r-pill .spg__panel { border-radius: 20px; }
  @supports (corner-shape: squircle) {
    .spg--r-squircle .spg__trigger, .spg--r-squircle .spg__panel { corner-shape: squircle; border-radius: 16px; }
  }

  .spg__panel {
    position: absolute;
    z-index: 50;
    width: var(--spg-w);
    max-height: min(70vh, 420px);
    padding: 6px;
    border-radius: 16px;
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-elevated, #161616);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
  }
  .spg__panel[hidden] { display: none; }
  .spg--p-bottom-start .spg__panel { top: calc(var(--h) + 8px); left: 0; transform-origin: top left; }
  .spg--p-bottom-end .spg__panel { top: calc(var(--h) + 8px); right: 0; transform-origin: top right; }
  .spg--p-top-start .spg__panel { bottom: calc(var(--h) + 8px); left: 0; transform-origin: bottom left; }
  .spg--p-top-end .spg__panel { bottom: calc(var(--h) + 8px); right: 0; transform-origin: bottom right; }

  /* ── UNIQUE EFFECT: springy pop with elastic overshoot ── */
  .spg-pop-enter-active {
    transition:
      transform calc(420ms + var(--bounce, 0.6) * 160ms) var(--spring),
      opacity 180ms ease;
  }
  .spg-pop-leave-active {
    transition: transform 200ms cubic-bezier(0.4, 0, 1, 1), opacity 160ms ease;
  }
  .spg-pop-enter-from { transform: scale(0.4); opacity: 0; }
  .spg-pop-leave-to { transform: scale(0.85); opacity: 0; }

  .spg__list { position: relative; margin: 0; padding: 0; list-style: none; }
  .spg__divider { height: 1px; margin: 5px 6px; background: var(--border, #2a2a2a); }

  .spg__item {
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
  /* each item snaps in with a per-item spring delay */
  .is-open .spg__item {
    animation: spg-item-in calc(360ms + var(--bounce, 0.6) * 200ms) var(--spring) both;
    animation-delay: calc(var(--i, 0) * 34ms + 60ms);
  }
  @keyframes spg-item-in {
    0% { opacity: 0; transform: translateY(-10px) scale(0.9); }
    100% { opacity: 1; transform: none; }
  }
  .spg__item.is-active:not(.is-disabled) { background: var(--sel-opt-hover, rgba(255,255,255,0.06)); color: var(--text, #ededed); }
  .spg__item.is-selected { color: var(--ui-accent, #ededed); font-weight: 600; }
  .spg__item.is-disabled { opacity: 0.4; cursor: not-allowed; }

  .spg__item-icon { flex: none; width: 17px; height: 17px; opacity: 0.85; }
  .spg__item-label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
  .spg__check { flex: none; width: 16px; height: 16px; color: var(--ui-accent, #ededed); }

  .spg__item--t-danger { color: #ff8a8e; }
  .spg__item--t-danger.is-active:not(.is-disabled) { color: #ff8a8e; }
  .spg__item--t-warn { color: #ffce7a; }
  .spg__item--t-warn.is-active:not(.is-disabled) { color: #ffce7a; }
  .spg__item--t-success { color: #7ed4a6; }
  .spg__item--t-success.is-active:not(.is-disabled) { color: #7ed4a6; }

  .spg--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .spg--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .spg--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .spg__trigger, .spg__caret,
    .spg-pop-enter-active, .spg-pop-leave-active { transition: none; }
    .spg-pop-enter-from, .spg-pop-leave-to { transform: none; opacity: 0; }
    .is-open .spg__item { animation: none; }
  }
`,g=[{label:"Profile",value:"profile",icon:"M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"},{label:"Settings",value:"settings",icon:"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"},{label:"Billing",value:"billing",icon:"M2 8.50488H22M6 16.5049H8M10.5 16.5049H14.5M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z"},{label:"Sign out",value:"signout",tone:"danger",divider:!0,icon:"M17.4399 14.62L19.9999 12.06L17.4399 9.5M9.75977 12.0596H19.9298M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"}],b="http://www.w3.org/2000/svg";function h(o,t="0 0 24 24"){const e=document.createElementNS(b,"svg");return e.setAttribute("viewBox",t),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",o),e}function d(o,t){const e=document.createElementNS(b,"path");if(e.setAttribute("d",o),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}let c;function v(o){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=o;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(o,t){const e=t?v(String(t).trim()):null;if(!e){for(const r of _)o.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,p=`rgb(${e[0]} ${e[1]} ${e[2]})`,n=e.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),l=(r,m)=>o.style.setProperty(r,m);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(r,p);l("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])l(r,i?"0 0 0":"255 255 255");l("--vs-color",p),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["label","size","radius","tone","placement","disabled","bounce","value","open","color"];#s;#t;#b;#r;#o;#n=g;#g=[];#a="";#i=-1;#e=!1;#l=null;#c=null;#m=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#s=document.createElement("div"),this.#s.className="spg",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="spg__trigger",this.#t.setAttribute("aria-haspopup","menu"),this.#t.setAttribute("aria-expanded","false");const s=document.createElement("span");s.className="spg__trigger-label";const a=document.createElement("slot");this.#b=document.createTextNode("Menu"),a.append(this.#b),s.append(a);const i=h("spg__caret");i.appendChild(d("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(s,i),this.#r=document.createElement("div"),this.#r.className="spg__panel",this.#r.setAttribute("role","menu"),this.#r.hidden=!0,this.#o=document.createElement("ul"),this.#o.className="spg__list",this.#r.appendChild(this.#o),this.#s.append(this.#t,this.#r),t.append(e,this.#s),this.#a=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#T),this.#t.addEventListener("keydown",this.#D)}connectedCallback(){u(this,this.getAttribute("color")),this.#d(),this.#_(),this.hasAttribute("open")&&this.#A()}disconnectedCallback(){this.#E(),this.#v()}attributeChangedCallback(t){if(u(this,this.getAttribute("color")),!!this.#s){if(t==="open"){this.hasAttribute("open")?this.#A():this.#N();return}if(t==="value"){this.#a=this.getAttribute("value")??"",this.#d();return}this.#_()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#n=e&&e.length?e:g,this.#s&&this.#d()}get items(){return this.#n}set value(t){this.#a=t==null?"":String(t),this.#s&&this.#d()}get value(){return this.#a}get open(){return this.#e}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#f(){const t=(e,s)=>this.getAttribute(e)??s;this.#s.className=`spg spg--${t("size","md")} spg--t-${t("tone","default")} spg--r-${t("radius","squircle")} spg--p-${t("placement","bottom-start")}`+(this.#e?" is-open":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#_(){this.#f();const t=this.getAttribute("bounce"),e=t==null||t.trim()===""?NaN:Number(t),s=Number.isFinite(e)?Math.min(Math.max(e,0),1):.6;this.#s.style.setProperty("--bounce",`${s}`),this.#s.style.setProperty("--spring",`cubic-bezier(0.34, ${(1.2+s*.9).toFixed(2)}, 0.4, 1)`),this.#b.data=this.getAttribute("label")??"Menu",this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#e?"true":"false")}#d(){this.#o.replaceChildren(),this.#g=[];const t=this.#n.length;this.#n.forEach((e,s)=>{if(e.divider){const n=document.createElement("li");n.className="spg__divider",n.setAttribute("role","separator"),n.setAttribute("aria-hidden","true"),this.#o.appendChild(n)}const a=e.href?"a":"li",i=document.createElement(a);if(i.className="spg__item"+(e.tone?` spg__item--t-${e.tone}`:"")+(e.value===this.#a?" is-selected":"")+(e.disabled?" is-disabled":""),i.style.setProperty("--i",s),i.style.setProperty("--n",t),i.setAttribute("role","menuitem"),e.href&&i.setAttribute("href",e.href),e.disabled&&i.setAttribute("aria-disabled","true"),e.icon){const n=h("spg__item-icon");n.appendChild(d(e.icon)),i.appendChild(n)}const p=document.createElement("span");if(p.className="spg__item-label",p.textContent=e.label??"",i.appendChild(p),e.value===this.#a){const n=h("spg__check");n.appendChild(d("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),n.appendChild(d("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),i.appendChild(n)}i.addEventListener("pointerenter",()=>{e.disabled||(this.#i=s,this.#h())}),i.addEventListener("click",()=>this.#C(s)),this.#g[s]=i,this.#o.appendChild(i)}),this.#h()}#h(){this.#g.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#i)})}#M(){return this.#n.findIndex(t=>!t.disabled)}#x(){this.#i<0||this.#g[this.#i]?.scrollIntoView({block:"nearest"})}#y(t){const e=this.#n.length;if(!e)return;let s=this.#i;for(let a=0;a<e;a++)if(s=(s+t+e)%e,!this.#n[s]?.disabled){this.#i=s;break}this.#h(),this.#x()}#C(t){const e=this.#n[t];!e||e.disabled||(this.#a=e.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,index:t,value:e.value}})),this.#p(),this.#d())}#u(){this.setAttribute("open","")}#p(){this.removeAttribute("open")}#A(){if(this.#e)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#e=!0,this.#f(),this.#t.setAttribute("aria-expanded","true");const t=this.#r;this.#v(),t.hidden=!1,t.classList.remove("spg-pop-leave-active","spg-pop-leave-to"),t.classList.add("spg-pop-enter-from","spg-pop-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("spg-pop-enter-from")),this.#w(t,()=>t.classList.remove("spg-pop-enter-active"),620),this.#i=this.#M(),this.#h(),this.#x(),this.#S(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#N(){if(!this.#e)return;this.#e=!1,this.#f(),this.#t.setAttribute("aria-expanded","false"),this.#i=-1,this.#h(),this.#E();const t=this.#r;this.#v(),t.classList.remove("spg-pop-enter-from","spg-pop-enter-active"),t.classList.add("spg-pop-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("spg-pop-leave-to")),this.#w(t,()=>{t.hidden=!0,t.classList.remove("spg-pop-leave-active","spg-pop-leave-to")},260),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#w(t,e,s){const a=()=>{t.removeEventListener("transitionend",i),clearTimeout(this.#m),this.#l=null,this.#c=null,e()},i=p=>{p.target===t&&a()};this.#l=i,this.#c=t,t.addEventListener("transitionend",i),this.#m=setTimeout(a,s)}#v(){this.#l&&this.#c&&this.#c.removeEventListener("transitionend",this.#l),clearTimeout(this.#m),this.#l=null,this.#c=null}#S(){document.addEventListener("pointerdown",this.#L,!0),document.addEventListener("keydown",this.#k,!0)}#E(){document.removeEventListener("pointerdown",this.#L,!0),document.removeEventListener("keydown",this.#k,!0)}#L=t=>{t.composedPath().includes(this)||this.#p()};#k=t=>{t.key==="Escape"&&this.#e&&(t.preventDefault(),this.#p())};#T=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#p():this.#u())};#D=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#e?this.#i>=0&&this.#C(this.#i):this.#u();break;case"ArrowDown":t.preventDefault(),this.#e?this.#y(1):this.#u();break;case"ArrowUp":t.preventDefault(),this.#e?this.#y(-1):this.#u();break;case"Escape":this.#e&&(t.preventDefault(),this.#p());break;case"Tab":this.#e&&this.#p();break}}}customElements.define("vs-dropdown-spring",x);
