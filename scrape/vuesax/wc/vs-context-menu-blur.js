const b="http://www.w3.org/2000/svg";function m(c){const t=document.createElementNS(b,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),t.setAttribute("class",c),t}function d(c){const t=document.createElementNS(b,"path");return t.setAttribute("d",c),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t}const g=`
  :host { display: inline-block; }
  .cmb {
    --fs: var(--ctrl-fs-md, 14px);
    --r: var(--ctrl-r-md, 12px);
    display: inline-block;
    color: var(--text, #ededed);
  }
  .cmb--sm { --fs: var(--ctrl-fs-sm, 13px); --r: var(--ctrl-r-sm, 10px); }
  .cmb--lg { --fs: var(--ctrl-fs-lg, 15px); --r: var(--ctrl-r-lg, 14px); }

  .cmb__zone {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
    width: 260px; height: 150px; text-align: center; user-select: none;
    border: 1px dashed var(--border, #2a2a2a);
    border-radius: calc(var(--r) * 1.2);
    background: color-mix(in srgb, var(--bg-elevated, #161616) 40%, transparent);
    color: var(--text, #ededed);
  }
  .cmb--embed .cmb__zone { display: none; }
  .cmb__zone-ico { width: 26px; height: 26px; opacity: 0.7; }
  .cmb__zone-title { font-size: var(--fs); font-weight: 600; }
  .cmb__zone-sub { font-size: 11px; opacity: 0.55; }
  .cmb.is-disabled { opacity: 0.5; pointer-events: none; }
`,v=`
  :host { all: initial; }
  * { box-sizing: border-box; }
  .cmb {
    --fs: var(--ctrl-fs-md, 14px);
    --r: var(--ctrl-r-md, 12px);
    --ih: 36px;
    font-family: inherit;
    color: var(--text, #ededed);
  }
  .cmb--sm { --fs: var(--ctrl-fs-sm, 13px); --r: var(--ctrl-r-sm, 10px); --ih: 32px; }
  .cmb--lg { --fs: var(--ctrl-fs-lg, 15px); --r: var(--ctrl-r-lg, 14px); --ih: 40px; }

  .cmb__panel {
    position: fixed; z-index: 9999; min-width: 224px;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: calc(var(--r) * 1.3);
    background: color-mix(in srgb, var(--bg-elevated, #161616) 86%, transparent);
    box-shadow: 0 18px 48px -18px rgba(0,0,0,0.7);
    color: var(--text, #ededed);
    opacity: 0;
    filter: blur(14px);
    transform: scale(0.94);
    transition: opacity 260ms ease, filter 300ms ease, transform 320ms cubic-bezier(0.2,0.8,0.2,1);
    overflow: hidden;
  }
  .cmb--sm .cmb__panel { min-width: 200px; }
  .cmb--lg .cmb__panel { min-width: 256px; }
  .cmb__panel.is-expanded { opacity: 1; filter: blur(0); transform: scale(1); }
  .cmb__panel.has-glow { box-shadow: 0 18px 48px -18px rgba(0,0,0,0.7), 0 0 0 1px color-mix(in srgb, var(--ui-accent, #ededed) 22%, transparent); }

  .cmb__inner { padding: 6px; }
  .cmb__heading { padding: 4px 10px 6px; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; opacity: 0.5; }
  .cmb__heading[hidden] { display: none; }
  .cmb__list { list-style: none; margin: 0; padding: 0; }
  .cmb__divider { height: 1px; margin: 5px 8px; background: var(--border, #2a2a2a); }

  .cmb__item {
    display: flex; align-items: center; gap: 10px;
    height: var(--ih); padding: 0 10px; margin: 1px 0;
    border-radius: calc(var(--r) * 0.7);
    font-size: var(--fs); text-decoration: none; color: inherit;
    cursor: pointer; user-select: none;
    opacity: 0; filter: blur(6px); transform: translateY(4px);
    transition: background 140ms ease, color 140ms ease;
  }
  .cmb__panel.is-expanded .cmb__item {
    animation: cmb-reveal 340ms cubic-bezier(0.2,0.8,0.2,1) forwards;
    animation-delay: calc(120ms + var(--i) * 42ms);
  }
  @keyframes cmb-reveal {
    from { opacity: 0; filter: blur(6px); transform: translateY(4px); }
    to   { opacity: 1; filter: blur(0); transform: translateY(0); }
  }
  .cmb__item.is-active { background: color-mix(in srgb, var(--ui-accent, #ededed) 18%, transparent); }
  .cmb__item.is-disabled { opacity: 0.4 !important; cursor: not-allowed; pointer-events: none; }
  .cmb__item--t-danger { color: color-mix(in srgb, var(--text, #ededed) 40%, #ff5a5a); }
  .cmb__item--t-danger.is-active { background: color-mix(in srgb, #ff5a5a 18%, transparent); }
  .cmb__item--t-warn.is-active { background: color-mix(in srgb, #ffb020 18%, transparent); }
  .cmb__item--t-success.is-active { background: color-mix(in srgb, #33c481 18%, transparent); }

  .cmb__item-icon { width: 17px; height: 17px; flex: none; opacity: 0.85; }
  .cmb__item-label { flex: 1; white-space: nowrap; }
  .cmb__shortcut { font-size: 11px; opacity: 0.5; }
  .cmb__check { width: 15px; height: 15px; color: var(--ui-accent, #ededed); }

  @media (prefers-reduced-motion: reduce) {
    .cmb__panel { transition: none; opacity: 1; filter: none; transform: none; }
    .cmb__item { animation: none !important; opacity: 1; filter: none; transform: none; }
  }
`,p=[{label:"Cut",value:"cut",shortcut:"⌘X",icon:"M5.5 10C7.433 10 9 8.433 9 6.5C9 4.567 7.433 3 5.5 3C3.567 3 2 4.567 2 6.5C2 8.433 3.567 10 5.5 10Z M5.5 21C7.433 21 9 19.433 9 17.5C9 15.567 7.433 14 5.5 14C3.567 14 2 15.567 2 17.5C2 19.433 3.567 21 5.5 21Z M22 6L8.65002 15.98 M22 17.9705L8.65002 7.98047"},{label:"Copy",value:"copy",shortcut:"⌘C",icon:"M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"},{label:"Paste",value:"paste",shortcut:"⌘V",icon:"M8 12.1992H15 M8 16.1992H12.38 M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V15.9995C21 19.9995 20 21.9995 15 21.9995H9C4 21.9995 3 19.9995 3 15.9995V9.99953C3 5.43953 4.67 4.19953 8 4.01953"},{label:"Rename",value:"rename",shortcut:"F2",divider:!0,icon:"M13.26 3.59924L5.04997 12.2892C4.73997 12.6192 4.43997 13.2692 4.37997 13.7192L4.00997 16.9592C3.87997 18.1292 4.71997 18.9292 5.87997 18.7292L9.09997 18.1792C9.54997 18.0992 10.18 17.7692 10.49 17.4292L18.7 8.73924C20.12 7.23924 20.76 5.52924 18.55 3.43924C16.35 1.36924 14.68 2.09924 13.26 3.59924Z M11.89 5.05078C12.32 7.81078 14.56 9.92078 17.34 10.2008 M3 22H21"},{label:"Delete",value:"delete",shortcut:"Del",tone:"danger",icon:"M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047 M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97 M18.85 9.14062L18.2 19.2106C18.09 20.7806 18 22.0006 15.21 22.0006H8.79002C6.00002 22.0006 5.91002 20.7806 5.80002 19.2106L5.15002 9.14062 M10.33 16.5H13.66 M9.5 12.5H14.5"}];let h;function x(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(c,t){const e=t?x(String(t).trim()):null;if(!e){for(const r of _)c.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),o=(r,f)=>c.style.setProperty(r,f);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,s);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,a?"0 0 0":"255 255 255");o("--vs-color",s),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class C extends HTMLElement{static observedAttributes=["size","radius","tone","disabled","glow","embed","label","value","items","color"];#s;#h;#i=null;#t;#m;#l;#c;#n=p;#u=[];#o="";#r=-1;#a=!1;#b={x:0,y:0};#f="top left";constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#s=document.createElement("div"),this.#s.className="cmb";const i=document.createElement("slot");i.name="target",this.#h=document.createElement("div"),this.#h.className="cmb__zone";const n=m("cmb__zone-ico");n.append(d("M12 22C16.13 22 19.5 18.63 19.5 14.5V9.5C19.5 5.37 16.13 2 12 2C7.87 2 4.5 5.37 4.5 9.5V14.5C4.5 18.63 7.87 22 12 22Z"),d("M12 11C11.17 11 10.5 10.33 10.5 9.5V7.5C10.5 6.67 11.17 6 12 6C12.82 6 13.5 6.67 13.5 7.5V9.5C13.5 10.33 12.82 11 12 11Z"),d("M12 6V2"));const a=document.createElement("span");a.className="cmb__zone-title",a.textContent="Right-click here";const s=document.createElement("span");s.className="cmb__zone-sub",s.textContent="frosted blur reveal",this.#h.append(n,a,s),i.appendChild(this.#h),this.#s.appendChild(i),t.append(e,this.#s),this.#o=this.getAttribute("value")??"",this.#s.addEventListener("contextmenu",this.#C)}connectedCallback(){u(this,this.getAttribute("color")),this.#v()}disconnectedCallback(){this.#s.removeEventListener("contextmenu",this.#C),this.#e()}attributeChangedCallback(t){if(u(this,this.getAttribute("color")),!!this.#s){if(t==="value"){this.#o=this.getAttribute("value")??"",this.#t&&this.#d();return}if(t==="items"){this.#g(this.getAttribute("items"));return}this.#v(),this.#t&&this.#x()}}set items(t){if(typeof t=="string"){this.#g(t);return}this.#n=Array.isArray(t)&&t.length?t:p,this.#t&&this.#d()}get items(){return this.#n}#g(t){let e=null;if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&i.length&&(e=i)}catch{}this.#n=e||p,this.#t&&this.#d()}get value(){return this.#o}set value(t){this.#o=t==null?"":String(t),this.#t&&this.#d()}get open(){return this.#a}#v(){const t=(e,i)=>this.getAttribute(e)??i;this.#s.className=`cmb cmb--${t("size","md")} cmb--t-${t("tone","default")} cmb--r-${t("radius","squircle")}`+(this.hasAttribute("disabled")?" is-disabled":"")+(this.hasAttribute("embed")?" cmb--embed":"")}#M(){return this.hasAttribute("glow")}#x(){if(!this.#t)return;const t=(e,i)=>this.getAttribute(e)??i;this.#t.className=`cmb__panel cmb--${t("size","md")} cmb--t-${t("tone","default")} cmb--r-${t("radius","squircle")}`+(this.#a?" is-expanded":"")+(this.#M()?" has-glow":""),this.#l.hidden=!this.getAttribute("label"),this.#l.textContent=this.getAttribute("label")||""}#k(){if(this.#i)return;this.#i=document.createElement("div");const t=this.#i.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#t=document.createElement("div"),this.#t.className="cmb__panel",this.#t.setAttribute("role","menu"),this.#m=document.createElement("div"),this.#m.className="cmb__inner",this.#l=document.createElement("div"),this.#l.className="cmb__heading",this.#c=document.createElement("ul"),this.#c.className="cmb__list",this.#m.append(this.#l,this.#c),this.#t.appendChild(this.#m),t.append(e,this.#t)}#d(){this.#c.replaceChildren(),this.#u=[],this.#n.forEach((t,e)=>{if(t.divider){const s=document.createElement("li");s.className="cmb__divider",s.setAttribute("role","separator"),s.setAttribute("aria-hidden","true"),this.#c.appendChild(s)}const i=t.href?"a":"li",n=document.createElement(i);if(n.className="cmb__item"+(t.tone?` cmb__item--t-${t.tone}`:"")+(t.value===this.#o?" is-selected":"")+(t.disabled?" is-disabled":""),n.style.setProperty("--i",e),n.setAttribute("role","menuitem"),t.href&&n.setAttribute("href",t.href),t.disabled&&n.setAttribute("aria-disabled","true"),t.icon){const s=m("cmb__item-icon");s.appendChild(d(t.icon)),n.appendChild(s)}const a=document.createElement("span");if(a.className="cmb__item-label",a.textContent=t.label??"",n.appendChild(a),t.shortcut){const s=document.createElement("span");s.className="cmb__shortcut",s.textContent=t.shortcut,n.appendChild(s)}else if(t.value===this.#o){const s=m("cmb__check");s.append(d("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"),d("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),n.appendChild(s)}n.addEventListener("pointerenter",()=>{t.disabled||(this.#r=e,this.#p())}),n.addEventListener("click",()=>this.#L(t)),this.#u[e]=n,this.#c.appendChild(n)}),this.#p()}#p(){this.#u.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#r)})}#z(){const t=this.getAttribute("size");return t==="sm"?200:t==="lg"?256:224}#N(){const t=this.getAttribute("size"),e=t==="sm"?32:t==="lg"?40:36,i=this.#n.filter(a=>a.divider).length;return 6+(this.getAttribute("label")?30:0)+this.#n.length*e+i*11+6}#S(t,e){const i=window.innerWidth,n=window.innerHeight,a=8,s=this.#z(),l=Math.min(this.#N(),Math.round(n*.7)),o=t+s+a>i,r=e+l+a>n;this.#b={x:o?Math.max(a,t-s):t,y:r?Math.max(a,e-l):e},this.#f=`${r?"bottom":"top"} ${o?"right":"left"}`}#_(){this.#t&&(this.#t.style.left=`${this.#b.x}px`,this.#t.style.top=`${this.#b.y}px`,this.#t.style.transformOrigin=this.#f)}#C=t=>{if(!this.hasAttribute("disabled")){if(t.preventDefault(),this.#S(t.clientX,t.clientY),this.#r=-1,this.#a){this.#_(),this.#p();return}this.#H()}};#H(){this.#a=!0,this.#k(),this.#d(),this.#_(),this.#x(),this.#i.isConnected||document.body.appendChild(this.#i),this.#t.classList.remove("is-expanded"),this.#t.offsetWidth,requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.#a&&this.#t.classList.add("is-expanded")})}),document.addEventListener("pointerdown",this.#y,!0),document.addEventListener("contextmenu",this.#w,!0),document.addEventListener("keydown",this.#A,!0),window.addEventListener("blur",this.#e),window.addEventListener("resize",this.#e),window.addEventListener("scroll",this.#e,!0),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#e=()=>{this.#a&&(this.#a=!1,this.#r=-1,document.removeEventListener("pointerdown",this.#y,!0),document.removeEventListener("contextmenu",this.#w,!0),document.removeEventListener("keydown",this.#A,!0),window.removeEventListener("blur",this.#e),window.removeEventListener("resize",this.#e),window.removeEventListener("scroll",this.#e,!0),this.#i&&this.#i.isConnected&&this.#i.remove(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))};#$(t){return!!(this.#i&&t&&this.#i.contains(t))}#y=t=>{this.#$(t.composedPath()[0]??t.target)||this.#e()};#w=t=>{t.composedPath().includes(this)||this.#e()};#V(){const t=[];return this.#n.forEach((e,i)=>{e.disabled||t.push(i)}),t}#E(t){const e=this.#V();if(!e.length)return;const i=e.indexOf(this.#r),n=i<0?t===1?0:e.length-1:(i+t+e.length)%e.length;this.#r=e[n],this.#p()}#A=t=>{if(this.#a){if(t.key==="Escape"||t.key==="Tab"){t.preventDefault(),this.#e();return}t.key==="ArrowDown"?(t.preventDefault(),this.#E(1)):t.key==="ArrowUp"?(t.preventDefault(),this.#E(-1)):(t.key==="Enter"||t.key===" ")&&this.#r>=0&&(t.preventDefault(),this.#L(this.#n[this.#r]))}};#L(t){t.disabled||(this.#o=t.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t,value:t.value}})),this.#e())}}customElements.define("vs-context-menu-blur",C);
