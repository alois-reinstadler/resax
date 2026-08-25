const x="http://www.w3.org/2000/svg";function u(a,t="0 0 24 24"){const e=document.createElementNS(x,"svg");return e.setAttribute("viewBox",t),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",a),e}function d(a){const t=document.createElementNS(x,"path");return t.setAttribute("d",a),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t}function A(a){let t=requestAnimationFrame(()=>{t=requestAnimationFrame(a)});return()=>cancelAnimationFrame(t)}const g=[{label:"Cut",value:"cut",shortcut:"⌘X",icon:"M5.5 10C7.433 10 9 8.433 9 6.5C9 4.567 7.433 3 5.5 3C3.567 3 2 4.567 2 6.5C2 8.433 3.567 10 5.5 10Z M5.5 21C7.433 21 9 19.433 9 17.5C9 15.567 7.433 14 5.5 14C3.567 14 2 15.567 2 17.5C2 19.433 3.567 21 5.5 21Z M22 6L8.65002 15.98 M22 17.9705L8.65002 7.98047"},{label:"Copy",value:"copy",shortcut:"⌘C",icon:"M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"},{label:"Paste",value:"paste",shortcut:"⌘V",icon:"M8 12.1992H15 M8 16.1992H12.38 M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V15.9995C21 19.9995 20 21.9995 15 21.9995H9C4 21.9995 3 19.9995 3 15.9995V9.99953C3 5.43953 4.67 4.19953 8 4.01953"},{label:"Rename",value:"rename",shortcut:"F2",divider:!0,icon:"M13.26 3.59924L5.04997 12.2892C4.73997 12.6192 4.43997 13.2692 4.37997 13.7192L4.00997 16.9592C3.87997 18.1292 4.71997 18.9292 5.87997 18.7292L9.09997 18.1792C9.54997 18.0992 10.18 17.7692 10.49 17.4292L18.7 8.73924C20.12 7.23924 20.76 5.52924 18.55 3.43924C16.35 1.36924 14.68 2.09924 13.26 3.59924Z M11.89 5.05078C12.32 7.81078 14.56 9.92078 17.34 10.2008 M3 22H21"},{label:"Delete",value:"delete",shortcut:"Del",tone:"danger",icon:"M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047 M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97 M18.85 9.14062L18.2 19.2106C18.09 20.7806 18 22.0006 15.21 22.0006H8.79002C6.00002 22.0006 5.91002 20.7806 5.80002 19.2106L5.15002 9.14062 M10.33 16.5H13.66 M9.5 12.5H14.5"}],f={sm:200,md:224,lg:256},b={sm:32,md:36,lg:40};function L(a){return f[a]??f.md}function k(a,t,e){const i=b[a]??b.md,o=t.filter(n=>n.divider).length;return 6+(e?30:0)+t.length*i+o*11+6}const _=["cmg--t-default","cmg--t-danger","cmg--t-warn","cmg--t-success"],C=["cmg--r-none","cmg--r-subtle","cmg--r-rounded","cmg--r-pill","cmg--r-squircle"],M=`
  :host {
    display: inline-block;
    color: var(--text, #ededed);
    --fs: var(--ctrl-fs-md, 14px);
    --r: var(--ctrl-r-md, 12px);
  }
  :host(.cmg--sm) { --fs: var(--ctrl-fs-sm, 13px); --r: var(--ctrl-r-sm, 10px); }
  :host(.cmg--lg) { --fs: var(--ctrl-fs-lg, 15px); --r: var(--ctrl-r-lg, 14px); }
  :host([disabled]) { opacity: 0.5; pointer-events: none; }

  .cmg__zone {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
    width: 260px; height: 150px; text-align: center; user-select: none;
    border: 1px dashed var(--border, #2a2a2a);
    border-radius: calc(var(--r) * 1.2);
    background: color-mix(in srgb, var(--bg-elevated, #161616) 40%, transparent);
    color: var(--text, #ededed);
  }
  :host(.cmg--embed) .cmg__zone { display: none; }
  .cmg__zone-ico { width: 26px; height: 26px; opacity: 0.7; }
  .cmg__zone-title { font-size: var(--fs); font-weight: 600; }
  .cmg__zone-sub { font-size: 11px; opacity: 0.55; }
`;let h;function S(a){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=a;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const z=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(a,t){const e=t?S(String(t).trim()):null;if(!e){for(const r of z)a.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),c=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(c?r*.92:r+(255-r)*.16)),s=(r,m)=>a.style.setProperty(r,m);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(r,n);s("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(r,c?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])s(r,c?"0 0 0":"255 255 255");s("--vs-color",n),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class H extends HTMLElement{static observedAttributes=["size","radius","tone","disabled","glow","embed","label","value","color"];#t=null;#e=g;#i="";#n=-1;#s=!1;#r=null;#l=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=M;const i=document.createElement("slot");i.name="target";const o=document.createElement("div");o.className="cmg__zone";const c=u("cmg__zone-ico");c.appendChild(d("M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z")),c.appendChild(d("M12 6.44V12")),c.appendChild(d("M8.11035 8.11L12.0004 12"));const n=document.createElement("span");n.className="cmg__zone-title",n.textContent="Right-click here";const l=document.createElement("span");l.className="cmg__zone-sub",l.textContent="pulsing accent glow",o.append(c,n,l),i.appendChild(o),t.append(e,i),this.#i=this.getAttribute("value")??"",this.addEventListener("contextmenu",this.#y)}connectedCallback(){v(this,this.getAttribute("color")),this.#d()}disconnectedCallback(){this.#A()}attributeChangedCallback(t){if(v(this,this.getAttribute("color")),t==="value"){this.#i=this.getAttribute("value")??"",this.#t&&this.#s&&this.#t.setItems(this.#e,this.#i);return}this.#d(),this.#s&&this.#t&&this.#h()}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&(e=i)}catch{}this.#e=e&&e.length?e:g,this.#t&&this.#s&&this.#t.setItems(this.#e,this.#i)}get items(){return this.#e}set value(t){this.#i=t==null?"":String(t),this.#t&&this.#s&&this.#t.setItems(this.#e,this.#i)}get value(){return this.#i}get open(){return this.#s}#c(t,e){return this.getAttribute(t)??e}#v(){return this.hasAttribute("glow")}#d(){const t=(e,i)=>this.#c(e,i);this.classList.remove("cmg--sm","cmg--md","cmg--lg",..._,...C),this.classList.add(`cmg--${t("size","md")}`,`cmg--t-${t("tone","default")}`,`cmg--r-${t("radius","squircle")}`),this.classList.toggle("cmg--embed",this.hasAttribute("embed"))}#x(){return this.#t||(this.#t=document.createElement("vs-context-menu-glow-panel"),this.#t.onPick=t=>this.#u(this.#e[t]),this.#t.onHover=t=>{this.#n=t,this.#t.updateActive(t)}),this.#t}#h(){const t=(e,i)=>this.#c(e,i);this.#t.configure({size:t("size","md"),tone:t("tone","default"),radius:t("radius","squircle"),label:t("label",""),glow:this.#v()})}#_(t,e){const i=this.#c("size","md"),o=this.#c("label",""),c=window.innerWidth,n=window.innerHeight,l=8,s=L(i),r=Math.min(k(i,this.#e,o),Math.round(n*.7)),m=t+s+l>c,p=e+r+l>n,y=m?Math.max(l,t-s):t,w=p?Math.max(l,e-r):e,E=`${p?"bottom":"top"} ${m?"right":"left"}`;this.#t&&(this.#t.style.left=`${y}px`,this.#t.style.top=`${w}px`,this.#t.style.transformOrigin=E)}#C(){return this.#e.map((t,e)=>e).filter(t=>!this.#e[t].disabled)}#m(t){const e=this.#C();if(!e.length)return;const i=e.indexOf(this.#n),o=i<0?t===1?0:e.length-1:(i+t+e.length)%e.length;this.#n=e[o],this.#t?.updateActive(this.#n)}#u(t){!t||t.disabled||(this.#i=t.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t,value:t.value}})),this.#a())}#y=t=>{this.hasAttribute("disabled")||(t.preventDefault(),this.#x(),this.#t.isConnected||document.body.appendChild(this.#t),this.#h(),this.#t.setItems(this.#e,this.#i),this.#_(t.clientX,t.clientY),this.#n=-1,this.#t.updateActive(-1),!this.#s&&(this.#s=!0,this.#t.classList.remove("is-expanded"),this.#r?.(),this.#r=A(()=>{this.#r=null,this.#t?.classList.add("is-expanded")}),this.#E(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))))};#a(){this.#s&&(this.#s=!1,this.#n=-1,this.#b(),this.#r?.(),this.#r=null,this.#t&&(this.#t.classList.remove("is-expanded"),this.#t.remove()),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}#w(t){return!!(this.#t&&t.composedPath().includes(this.#t))}#p=t=>{this.#w(t)||this.#a()};#g=t=>{t.composedPath().includes(this)||this.#a()};#f=t=>{if(this.#s){if(t.key==="Escape"||t.key==="Tab"){t.preventDefault(),this.#a();return}t.key==="ArrowDown"?(t.preventDefault(),this.#m(1)):t.key==="ArrowUp"?(t.preventDefault(),this.#m(-1)):t.key==="Enter"&&this.#n>=0&&(t.preventDefault(),this.#u(this.#e[this.#n]))}};#o=()=>this.#a();#E(){document.addEventListener("pointerdown",this.#p,!0),document.addEventListener("contextmenu",this.#g,!0),document.addEventListener("keydown",this.#f,!0),window.addEventListener("blur",this.#o),window.addEventListener("resize",this.#o),window.addEventListener("scroll",this.#o,!0),this.#l=!0}#b(){document.removeEventListener("pointerdown",this.#p,!0),document.removeEventListener("contextmenu",this.#g,!0),document.removeEventListener("keydown",this.#f,!0),this.#l&&(window.removeEventListener("blur",this.#o),window.removeEventListener("resize",this.#o),window.removeEventListener("scroll",this.#o,!0),this.#l=!1)}#A(){this.#b(),this.#r?.(),this.#r=null,this.#s=!1,this.#t&&this.#t.remove()}}customElements.define("vs-context-menu-glow",H);const N=`
  :host {
    position: fixed; z-index: 9999; isolation: isolate;
    min-width: 224px;
    --fs: 14px; --r: 12px; --ih: 36px;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: calc(var(--r) * 1.3);
    background: var(--bg-elevated, #161616);
    box-shadow: 0 18px 48px -18px rgba(0, 0, 0, 0.7);
    color: var(--text, #ededed);
    font-family: inherit;
    opacity: 0; transform: scale(0.96);
    transition: opacity 200ms ease, transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  :host(.cmg--sm) { --fs: 13px; --r: 10px; --ih: 32px; min-width: 200px; }
  :host(.cmg--lg) { --fs: 15px; --r: 14px; --ih: 40px; min-width: 256px; }
  :host(.is-expanded) { opacity: 1; transform: scale(1); }

  /* pulsing accent halo just outside the border — STATIC (no cursor tracking):
     opacity animates via keyframes only, so it's cheap/compositable. */
  .cmg__halo {
    position: absolute; inset: -2px; z-index: -1; pointer-events: none;
    border-radius: inherit; opacity: 0;
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--ui-accent, #ededed) 45%, transparent);
  }
  :host(.has-glow.is-expanded) .cmg__halo {
    box-shadow: 0 0 34px 2px color-mix(in srgb, var(--ui-accent, #ededed) 60%, transparent);
    animation: cmg-pulse 2400ms ease-in-out infinite;
  }
  @keyframes cmg-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.95; } }

  .cmg__inner { position: relative; padding: 6px; }
  .cmg__heading { padding: 4px 10px 6px; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; opacity: 0.5; }
  .cmg__heading[hidden] { display: none; }
  .cmg__list { list-style: none; margin: 0; padding: 0; }
  .cmg__divider { height: 1px; margin: 5px 8px; background: var(--border, #2a2a2a); }

  .cmg__item {
    position: relative; overflow: hidden;
    display: flex; align-items: center; gap: 10px;
    height: var(--ih); padding: 0 10px; margin: 1px 0;
    border-radius: calc(var(--r) * 0.7);
    font-size: var(--fs); text-decoration: none; color: inherit;
    cursor: pointer; user-select: none;
    opacity: 0;
    transition: background 160ms ease, color 160ms ease;
  }
  :host(.is-expanded) .cmg__item {
    animation: cmg-fade 260ms ease forwards;
    animation-delay: calc(120ms + var(--i) * 40ms);
  }
  @keyframes cmg-fade { from { opacity: 0; } to { opacity: 1; } }
  /* active item lights up with an accent wash + a swept glow band */
  .cmg__item.is-active { background: color-mix(in srgb, var(--ui-accent, #ededed) 18%, transparent); }
  .cmg__item.is-active::after {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--ui-accent, #ededed) 34%, transparent), transparent);
    transform: translateX(-100%);
    animation: cmg-sweep 620ms ease forwards;
  }
  @keyframes cmg-sweep { to { transform: translateX(100%); } }
  .cmg__item.is-disabled { opacity: 0.4 !important; cursor: not-allowed; pointer-events: none; }
  .cmg__item--t-danger { color: color-mix(in srgb, var(--text, #ededed) 40%, #ff5a5a); }
  .cmg__item--t-danger.is-active { background: color-mix(in srgb, #ff5a5a 18%, transparent); }
  .cmg__item--t-warn.is-active { background: color-mix(in srgb, #ffb020 18%, transparent); }
  .cmg__item--t-success.is-active { background: color-mix(in srgb, #33c481 18%, transparent); }

  .cmg__item-icon { width: 17px; height: 17px; flex: none; opacity: 0.85; }
  .cmg__item-label { position: relative; z-index: 1; flex: 1; white-space: nowrap; }
  .cmg__shortcut { position: relative; z-index: 1; font-size: 11px; opacity: 0.5; }
  .cmg__check { position: relative; z-index: 1; width: 15px; height: 15px; color: var(--ui-accent, #ededed); }

  @media (prefers-reduced-motion: reduce) {
    :host { transition: none; opacity: 1; transform: none; }
    .cmg__halo { animation: none !important; opacity: 0.5; box-shadow: none !important; }
    .cmg__item { animation: none !important; opacity: 1; }
    .cmg__item.is-active::after { animation: none !important; display: none; }
  }
`;class P extends HTMLElement{#t;#e;#i=[];onPick=null;onHover=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=N;const i=document.createElement("span");i.className="cmg__halo",i.setAttribute("aria-hidden","true");const o=document.createElement("div");o.className="cmg__inner",this.#t=document.createElement("div"),this.#t.className="cmg__heading",this.#t.hidden=!0,this.#e=document.createElement("ul"),this.#e.className="cmg__list",this.#e.setAttribute("role","menu"),o.append(this.#t,this.#e),t.append(e,i,o)}configure({size:t,tone:e,radius:i,label:o,glow:c}){this.classList.remove("cmg--sm","cmg--md","cmg--lg",..._,...C),this.classList.add(`cmg--${t}`,`cmg--t-${e}`,`cmg--r-${i}`),this.classList.toggle("has-glow",!!c),this.#t.hidden=!o,this.#t.textContent=o||""}setItems(t,e){this.#e.replaceChildren(),this.#i=[],t.forEach((i,o)=>{if(i.divider){const s=document.createElement("li");s.className="cmg__divider",s.setAttribute("role","separator"),s.setAttribute("aria-hidden","true"),this.#e.appendChild(s)}const c=i.href?"a":"li",n=document.createElement(c);if(n.className="cmg__item"+(i.tone?` cmg__item--t-${i.tone}`:"")+(i.value===e?" is-selected":"")+(i.disabled?" is-disabled":""),n.style.setProperty("--i",String(o)),n.setAttribute("role","menuitem"),i.href&&n.setAttribute("href",i.href),i.disabled&&n.setAttribute("aria-disabled","true"),i.icon){const s=u("cmg__item-icon");s.appendChild(d(i.icon)),n.appendChild(s)}const l=document.createElement("span");if(l.className="cmg__item-label",l.textContent=i.label??"",n.appendChild(l),i.shortcut){const s=document.createElement("span");s.className="cmg__shortcut",s.textContent=i.shortcut,n.appendChild(s)}else if(i.value===e){const s=u("cmg__check");s.appendChild(d("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),s.appendChild(d("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),n.appendChild(s)}n.addEventListener("pointerenter",()=>{i.disabled||this.onHover?.(o)}),n.addEventListener("click",()=>this.onPick?.(o)),this.#i[o]=n,this.#e.appendChild(n)})}updateActive(t){this.#i.forEach((e,i)=>{e&&e.classList.toggle("is-active",i===t)})}}customElements.define("vs-context-menu-glow-panel",P);
