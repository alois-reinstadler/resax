const w=`
  :host { display: inline-flex; }
  .glw {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --glw-w: 248px;
    --item-h: 38px;
    --accent: var(--ui-accent, #ededed);
    position: relative;
    display: inline-flex;
    font-size: var(--ctrl-fs-md, 14px);
    font-family: inherit;
    user-select: none;
    -webkit-user-select: none;
  }
  .glw--sm { --h: var(--ctrl-h-sm, 34px); --r: var(--ctrl-r-sm, 10px); --glw-w: 216px; --item-h: 34px; font-size: var(--ctrl-fs-sm, 13px); }
  .glw--lg { --h: var(--ctrl-h-lg, 46px); --r: var(--ctrl-r-lg, 14px); --glw-w: 280px; --item-h: 42px; font-size: var(--ctrl-fs-lg, 15px); }

  .glw__trigger {
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
    transition: border-color 200ms ease, box-shadow 240ms ease;
  }
  .glw__trigger:hover:not(:disabled) { border-color: var(--accent); }
  .glw__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .glw__trigger:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .is-open .glw__trigger {
    border-color: var(--accent);
    box-shadow: 0 0 calc(14px + var(--glow, 0.7) * 14px) rgb(var(--ui-ring, 255 255 255) / calc(0.15 + var(--glow, 0.7) * 0.4));
  }
  .glw__caret { width: 14px; height: 14px; opacity: 0.8; transition: transform 240ms ease; }
  .is-open .glw__caret { transform: rotate(180deg); }

  .glw--r-none .glw__trigger, .glw--r-none .glw__panel { border-radius: 4px; }
  .glw--r-subtle .glw__trigger, .glw--r-subtle .glw__panel { border-radius: 8px; }
  .glw--r-rounded .glw__trigger, .glw--r-rounded .glw__panel { border-radius: 14px; }
  .glw--r-pill .glw__trigger { border-radius: 999px; }
  .glw--r-pill .glw__panel { border-radius: 20px; }
  @supports (corner-shape: squircle) {
    .glw--r-squircle .glw__trigger, .glw--r-squircle .glw__panel { corner-shape: squircle; border-radius: 16px; }
  }

  .glw__panel {
    position: absolute;
    z-index: 50;
    width: var(--glw-w);
    max-height: min(70vh, 420px);
    padding: 6px;
    border-radius: 16px;
    border: 1px solid var(--accent);
    background: var(--bg-elevated, #161616);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.5),
      0 0 calc(16px + var(--glow, 0.7) * 24px) rgb(var(--ui-ring, 255 255 255) / calc(0.12 + var(--glow, 0.7) * 0.3));
    overflow: hidden;
  }
  .glw__panel[hidden] { display: none; }
  .glw--p-bottom-start .glw__panel { top: calc(var(--h) + 8px); left: 0; }
  .glw--p-bottom-end .glw__panel { top: calc(var(--h) + 8px); right: 0; }
  .glw--p-top-start .glw__panel { bottom: calc(var(--h) + 8px); left: 0; }
  .glw--p-top-end .glw__panel { bottom: calc(var(--h) + 8px); right: 0; }

  /* ── UNIQUE EFFECT: neon ignite — border+aura pulse once on open ── */
  .glw__aura {
    position: absolute;
    inset: -1px;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px var(--accent);
    opacity: 0;
  }
  /* Perf: static baked shadow on open; only opacity is animated
     (compositable) — the fade curve replicates the original pulse. */
  .is-open .glw__aura {
    box-shadow: inset 0 0 0 1px var(--accent), 0 0 calc(6px + var(--glow, 0.7) * 22px) rgb(var(--ui-ring, 255 255 255) / 0.6);
    animation: glw-pulse 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @keyframes glw-pulse {
    0% { opacity: calc(0.5 + var(--glow, 0.7) * 0.5); }
    60% { opacity: calc(0.2 + var(--glow, 0.7) * 0.2); }
    100% { opacity: 0; }
  }

  .glw-ignite-enter-active { transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease; }
  .glw-ignite-leave-active { transition: transform 200ms ease, opacity 180ms ease; }
  .glw-ignite-enter-from, .glw-ignite-leave-to { transform: translateY(-8px) scale(0.98); opacity: 0; }

  .glw__list { position: relative; z-index: 1; margin: 0; padding: 0; list-style: none; overflow-y: auto; max-height: inherit; }
  .glw__divider { height: 1px; margin: 5px 6px; background: var(--border, #2a2a2a); }

  .glw__item {
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
    transition: background-color 160ms ease, color 160ms ease, box-shadow 200ms ease;
  }
  .is-open .glw__item {
    animation: glw-item-in 320ms ease both;
    animation-delay: calc(var(--i, 0) * 30ms + 100ms);
  }
  @keyframes glw-item-in {
    0% { opacity: 0; transform: translateY(-6px); }
    100% { opacity: 1; transform: none; }
  }
  /* the active item glows: soft inset halo in the accent */
  .glw__item.is-active:not(.is-disabled) {
    color: var(--text, #ededed);
    background: color-mix(in srgb, var(--accent) 16%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 40%, transparent),
      0 0 calc(6px + var(--glow, 0.7) * 14px) color-mix(in srgb, var(--accent) calc(20% + var(--glow, 0.7) * 25%), transparent);
  }
  .glw__item.is-selected { color: var(--accent); font-weight: 600; }
  .glw__item.is-disabled { opacity: 0.4; cursor: not-allowed; }

  .glw__item-icon { flex: none; width: 17px; height: 17px; opacity: 0.85; }
  .glw__item-label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
  .glw__check { flex: none; width: 16px; height: 16px; color: var(--accent); }

  .glw__item--t-danger { color: #ff8a8e; }
  .glw__item--t-danger.is-active:not(.is-disabled) { color: #ff8a8e; }
  .glw__item--t-warn { color: #ffce7a; }
  .glw__item--t-warn.is-active:not(.is-disabled) { color: #ffce7a; }
  .glw__item--t-success { color: #7ed4a6; }
  .glw__item--t-success.is-active:not(.is-disabled) { color: #7ed4a6; }

  .glw--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .glw--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .glw--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .glw__caret,
    .glw-ignite-enter-active, .glw-ignite-leave-active { transition: none; }
    .glw-ignite-enter-from, .glw-ignite-leave-to { transform: none; opacity: 0; }
    .is-open .glw__item, .is-open .glw__aura { animation: none; }
  }
`,p=[{label:"Profile",value:"profile",icon:"M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"},{label:"Settings",value:"settings",icon:"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"},{label:"Billing",value:"billing",icon:"M2 8.50488H22M6 16.5049H8M10.5 16.5049H14.5M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z"},{label:"Sign out",value:"signout",tone:"danger",divider:!0,icon:"M17.4399 14.62L19.9999 12.06L17.4399 9.5M9.75977 12.0596H19.9298M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"}],b="http://www.w3.org/2000/svg";function g(l,t="0 0 24 24"){const e=document.createElementNS(b,"svg");return e.setAttribute("viewBox",t),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",l),e}function d(l,t){const e=document.createElementNS(b,"path");if(e.setAttribute("d",l),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const i in t)e.setAttribute(i,t[i]);return e}let c;function f(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(l,t){const e=t?f(String(t).trim()):null;if(!e){for(const n of v)l.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(n=>Math.round(a?n*.92:n+(255-n)*.16)),o=(n,m)=>l.style.setProperty(n,m);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,r);o("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,a?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,a?"0 0 0":"255 255 255");o("--vs-color",r),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["label","size","radius","tone","placement","disabled","intensity","value","open","color"];#s;#t;#b;#r;#l;#n=p;#p=[];#a="";#i=-1;#e=!1;#c=null;#d=null;#m=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=w,this.#s=document.createElement("div"),this.#s.className="glw",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="glw__trigger",this.#t.setAttribute("aria-haspopup","menu"),this.#t.setAttribute("aria-expanded","false");const i=document.createElement("span");i.className="glw__trigger-label";const s=document.createElement("slot");this.#b=document.createTextNode("Menu"),s.append(this.#b),i.append(s);const a=g("glw__caret");a.appendChild(d("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),this.#t.append(i,a),this.#r=document.createElement("div"),this.#r.className="glw__panel",this.#r.setAttribute("role","menu"),this.#r.hidden=!0;const r=document.createElement("span");r.className="glw__aura",r.setAttribute("aria-hidden","true"),this.#l=document.createElement("ul"),this.#l.className="glw__list",this.#r.append(r,this.#l),this.#s.append(this.#t,this.#r),t.append(e,this.#s),this.#a=this.getAttribute("value")??"",this.#t.addEventListener("click",this.#T),this.#t.addEventListener("keydown",this.#D)}connectedCallback(){u(this,this.getAttribute("color")),this.#h(),this.#v(),this.hasAttribute("open")&&this.#C()}disconnectedCallback(){this.#E(),this.#f()}attributeChangedCallback(t){if(u(this,this.getAttribute("color")),!!this.#s){if(t==="open"){this.hasAttribute("open")?this.#C():this.#N();return}if(t==="value"){this.#a=this.getAttribute("value")??"",this.#h();return}this.#v()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&(e=i)}catch{}this.#n=e&&e.length?e:p,this.#s&&this.#h()}get items(){return this.#n}set value(t){this.#a=t==null?"":String(t),this.#s&&this.#h()}get value(){return this.#a}get open(){return this.#e}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#w(){const t=(e,i)=>this.getAttribute(e)??i;this.#s.className=`glw glw--${t("size","md")} glw--t-${t("tone","default")} glw--r-${t("radius","squircle")} glw--p-${t("placement","bottom-start")}`+(this.#e?" is-open":"")+(this.hasAttribute("disabled")?" is-disabled":"")}#v(){this.#w();const t=Math.min(Math.max(Number(this.getAttribute("intensity"))||.7,0),1);this.#s.style.setProperty("--glow",`${t}`),this.#b.data=this.getAttribute("label")??"Menu",this.#t.disabled=this.hasAttribute("disabled"),this.#t.setAttribute("aria-expanded",this.#e?"true":"false")}#h(){this.#l.replaceChildren(),this.#p=[],this.#n.forEach((t,e)=>{if(t.divider){const r=document.createElement("li");r.className="glw__divider",r.setAttribute("role","separator"),r.setAttribute("aria-hidden","true"),this.#l.appendChild(r)}const i=t.href?"a":"li",s=document.createElement(i);if(s.className="glw__item"+(t.tone?` glw__item--t-${t.tone}`:"")+(t.value===this.#a?" is-selected":"")+(t.disabled?" is-disabled":""),s.style.setProperty("--i",e),s.setAttribute("role","menuitem"),t.href&&s.setAttribute("href",t.href),t.disabled&&s.setAttribute("aria-disabled","true"),t.icon){const r=g("glw__item-icon");r.appendChild(d(t.icon)),s.appendChild(r)}const a=document.createElement("span");if(a.className="glw__item-label",a.textContent=t.label??"",s.appendChild(a),t.value===this.#a){const r=g("glw__check");r.appendChild(d("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),r.appendChild(d("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),s.appendChild(r)}s.addEventListener("pointerenter",()=>{t.disabled||(this.#i=e,this.#g())}),s.addEventListener("click",()=>this.#y(e)),this.#p[e]=s,this.#l.appendChild(s)}),this.#g()}#g(){this.#p.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#i)})}#M(){return this.#n.findIndex(t=>!t.disabled)}#_(){this.#i<0||this.#p[this.#i]?.scrollIntoView({block:"nearest"})}#x(t){const e=this.#n.length;if(!e)return;let i=this.#i;for(let s=0;s<e;s++)if(i=(i+t+e)%e,!this.#n[i]?.disabled){this.#i=i;break}this.#g(),this.#_()}#y(t){const e=this.#n[t];!e||e.disabled||(this.#a=e.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,index:t,value:e.value}})),this.#o(),this.#h())}#u(){this.setAttribute("open","")}#o(){this.removeAttribute("open")}#C(){if(this.#e)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#e=!0,this.#w(),this.#t.setAttribute("aria-expanded","true");const t=this.#r;this.#f(),t.hidden=!1,t.classList.remove("glw-ignite-leave-active","glw-ignite-leave-to"),t.classList.add("glw-ignite-enter-from","glw-ignite-enter-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove("glw-ignite-enter-from")),this.#A(t,()=>t.classList.remove("glw-ignite-enter-active"),340),this.#i=this.#M(),this.#g(),this.#_(),this.#S(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#N(){if(!this.#e)return;this.#e=!1,this.#w(),this.#t.setAttribute("aria-expanded","false"),this.#i=-1,this.#g(),this.#E();const t=this.#r;this.#f(),t.classList.remove("glw-ignite-enter-from","glw-ignite-enter-active"),t.classList.add("glw-ignite-leave-active"),t.offsetWidth,requestAnimationFrame(()=>t.classList.add("glw-ignite-leave-to")),this.#A(t,()=>{t.hidden=!0,t.classList.remove("glw-ignite-leave-active","glw-ignite-leave-to")},260),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}#A(t,e,i){const s=()=>{t.removeEventListener("transitionend",a),clearTimeout(this.#m),this.#c=null,this.#d=null,e()},a=r=>{r.target===t&&s()};this.#c=a,this.#d=t,t.addEventListener("transitionend",a),this.#m=setTimeout(s,i)}#f(){this.#c&&this.#d&&this.#d.removeEventListener("transitionend",this.#c),clearTimeout(this.#m),this.#c=null,this.#d=null}#S(){document.addEventListener("pointerdown",this.#k,!0),document.addEventListener("keydown",this.#L,!0)}#E(){document.removeEventListener("pointerdown",this.#k,!0),document.removeEventListener("keydown",this.#L,!0)}#k=t=>{t.composedPath().includes(this)||this.#o()};#L=t=>{t.key==="Escape"&&this.#e&&(t.preventDefault(),this.#o())};#T=()=>{this.hasAttribute("disabled")||(this.hasAttribute("open")?this.#o():this.#u())};#D=t=>{if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#e?this.#i>=0&&this.#y(this.#i):this.#u();break;case"ArrowDown":t.preventDefault(),this.#e?this.#x(1):this.#u();break;case"ArrowUp":t.preventDefault(),this.#e?this.#x(-1):this.#u();break;case"Escape":this.#e&&(t.preventDefault(),this.#o());break;case"Tab":this.#e&&this.#o();break}}}customElements.define("vs-dropdown-glow",_);
