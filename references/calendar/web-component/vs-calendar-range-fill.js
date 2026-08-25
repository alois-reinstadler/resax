const C="http://www.w3.org/2000/svg";function w(a,t){const e=document.createElementNS(C,a);for(const i in t)e.setAttribute(i,t[i]);return e}function y(a,t){const e=w("svg",{viewBox:a,fill:"none","aria-hidden":"true"});for(const i of t)e.appendChild(w("path",i));return e}const p={stroke:"currentColor","stroke-width":"1.5","stroke-miterlimit":"10","stroke-linecap":"round","stroke-linejoin":"round"},h={stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},D=()=>y("0 0 24 24",[{...p,d:"M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"}]),L=()=>y("0 0 24 24",[{...p,d:"M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"}]),M=()=>y("0 0 24 24",[{...p,d:"M8 2V5"},{...p,d:"M16 2V5"},{...p,d:"M3.5 9.08984H20.5"},{...p,d:"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"},{...h,d:"M15.6947 13.6992H15.7037"},{...h,d:"M15.6947 16.6992H15.7037"},{...h,d:"M11.9955 13.6992H12.0045"},{...h,d:"M11.9955 16.6992H12.0045"},{...h,d:"M8.29431 13.6992H8.30329"},{...h,d:"M8.29431 16.6992H8.30329"}]),k=a=>String(a).padStart(2,"0");function v(a){return`${a.getFullYear()}-${k(a.getMonth()+1)}-${k(a.getDate())}`}function c(a){const[t,e,i]=String(a).split("T")[0].split("-").map(Number);return!Number.isFinite(t)||!Number.isFinite(e)||!Number.isFinite(i)||e<1||e>12||i<1||i>31?new Date:new Date(t,e-1,i)}function m(a){return new Date(a.getFullYear(),a.getMonth(),1)}function b(a,t){return new Date(a.getFullYear(),a.getMonth(),a.getDate()+t)}function E(a,t){return new Date(a.getFullYear(),a.getMonth()+t,1)}const f=v(new Date),S=`
  :host { display: inline-flex; }
  .rgf-root {
    --h: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --rr: var(--ctrl-r-md, 12px);
    --cell: 38px;
    --day-r: 12px;
    --accent: var(--ui-accent, #ededed);
    position: relative; display: inline-flex; flex-direction: column;
    font-family: inherit; font-size: var(--fs); color: var(--text, #ededed);
    user-select: none; -webkit-user-select: none;
  }
  .rgf--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --rr: var(--ctrl-r-sm, 10px); --cell: 32px; --day-r: 10px; }
  .rgf--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); --rr: var(--ctrl-r-md, 12px); --cell: 38px; --day-r: 12px; }
  .rgf--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --rr: var(--ctrl-r-lg, 14px); --cell: 44px; --day-r: 14px; }
  .rgf--r-none { --rr: 0px; --day-r: 6px; }
  .rgf--r-subtle { --rr: 8px; --day-r: 8px; }
  .rgf--r-rounded { --rr: 14px; --day-r: 11px; }
  .rgf--r-pill { --rr: 20px; --day-r: 999px; }
  .rgf--r-squircle { --rr: var(--ctrl-r-md, 12px); --day-r: 12px; }

  .rgf-input {
    display: inline-flex; align-items: center; gap: 9px;
    width: 100%; min-width: 200px; height: var(--h); padding: 0 var(--px);
    border-radius: var(--rr); border: 1px solid var(--inp-border, #2a2a2a);
    background: var(--inp-bg, transparent); color: var(--inp-text, #ededed);
    font: inherit; font-weight: 500; cursor: pointer; white-space: nowrap;
    -webkit-tap-highlight-color: transparent; transition: border-color 200ms ease;
  }
  .rgf-input:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .rgf-input__icon { width: 15px; height: 15px; flex: none; color: var(--inp-prefix, #7a7a7a); }
  .rgf-input__value { overflow: hidden; text-overflow: ellipsis; }
  .rgf-input__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }

  .rgf-panel {
    position: relative; padding: 12px; border-radius: var(--rr);
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--bg-card, #111);
  }
  .rgf-panel--float { box-shadow: var(--sel-menu-shadow, 0 12px 40px rgba(0, 0, 0, 0.5)); }

  .rgf-head { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 8px; }
  .rgf-nav {
    display: inline-flex; align-items: center; justify-content: center;
    width: 30px; height: 30px; flex: none; border: 0; border-radius: 9px;
    background: transparent; color: var(--text-muted, #666); cursor: pointer;
    transition: color 140ms ease, background-color 140ms ease;
  }
  .rgf-nav svg { width: 16px; height: 16px; }
  .rgf-nav:hover:not(:disabled) { color: var(--text, #ededed); background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }
  .rgf-title {
    flex: 1; height: 30px; border: 0; background: transparent; font: inherit;
    font-weight: 600; text-transform: capitalize; letter-spacing: -0.01em;
    color: var(--text, #ededed); cursor: pointer; text-align: center;
  }

  .rgf-week { display: grid; grid-template-columns: repeat(7, var(--cell)); margin-bottom: 2px; }
  .rgf-week__cell {
    display: grid; place-items: center; height: 28px; font-size: 11px; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted, #666);
  }

  .rgf-grid { position: relative; display: flex; flex-direction: column; outline: none; }
  .rgf-row { position: relative; display: grid; grid-template-columns: repeat(7, var(--cell)); grid-auto-rows: var(--cell); }

  /* SIGNATURE EFFECT: liquid gradient fill bar that spans / animates across the
     in-range cells of the row. It grows in from its start edge, and a moving
     sheen sweeps across the accent gradient. */
  .rgf-fill {
    position: absolute; top: 4px; bottom: 4px; z-index: 0;
    left: calc(var(--from, 0) * var(--cell) + 3px);
    width: calc(var(--span, 1) * var(--cell) - 6px);
    border-radius: var(--day-r);
    background:
      linear-gradient(90deg, transparent, color-mix(in srgb, var(--ui-accent, #ededed) 55%, transparent), transparent),
      color-mix(in srgb, var(--ui-accent, #ededed) 22%, transparent);
    background-size: 220% 100%, 100% 100%;
    animation: rgf-sheen 2600ms linear infinite, rgf-grow 380ms cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: left center;
    pointer-events: none;
  }
  .rgf-fill:not(.is-on) { display: none; }
  .rgf-fill.is-preview { opacity: 0.6; }
  @keyframes rgf-sheen {
    0% { background-position: 200% 0, 0 0; }
    100% { background-position: -60% 0, 0 0; }
  }
  @keyframes rgf-grow {
    from { transform: scaleX(0.4); opacity: 0; }
    to { transform: scaleX(1); opacity: 1; }
  }

  .rgf-day {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    width: var(--cell); height: var(--cell); border: 0; border-radius: var(--day-r);
    background: transparent; color: var(--text, #ededed); font: inherit;
    font-size: calc(var(--fs) - 1px); font-variant-numeric: tabular-nums; cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 160ms ease, color 160ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .rgf-day__n { position: relative; z-index: 1; }
  .rgf-day:hover:not(:disabled):not(.selected) { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }
  .rgf-day:active:not(:disabled) { transform: scale(0.9); }
  .rgf-day.is-out { opacity: 0.3; }
  .rgf-day.is-disabled { opacity: 0.22; cursor: not-allowed; }
  .rgf-day.is-today::after {
    content: ''; position: absolute; bottom: 5px; left: 50%; width: 3px; height: 3px;
    border-radius: 50%; background: currentColor; transform: translateX(-50%); z-index: 1;
  }
  /* selected endpoints — solid accent chip riding above the fill bar */
  .rgf-day.selected {
    color: var(--accent-fg, #fff); font-weight: 600;
    background: var(--ui-accent, #ededed); z-index: 2;
  }
  .rgf-day.selected.is-today::after { background: var(--accent-fg, #fff); }

  .rgf-grid:focus-visible .rgf-day.is-focus { box-shadow: inset 0 0 0 1.5px var(--ui-accent, #ededed); }
  .rgf-grid:focus-visible .rgf-day.is-focus.selected { box-shadow: inset 0 0 0 1.5px var(--bg-card, #111); }

  .is-disabled .rgf-day { cursor: not-allowed; }
  .rgf-root.is-disabled { opacity: 0.55; pointer-events: none; }

  .rgf-pop-enter-active { transition: opacity 220ms ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .rgf-pop-leave-active { transition: opacity 160ms ease, transform 200ms ease; }
  .rgf-pop-enter-from, .rgf-pop-leave-to { opacity: 0; transform: translateY(-8px) scale(0.97); }

  @media (prefers-reduced-motion: reduce) {
    .rgf-day, .rgf-nav, .rgf-pop-enter-active, .rgf-pop-leave-active { transition: none; }
    .rgf-fill { animation: none; }
  }
`;let u;function N(a){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=a;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const F=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function A(a,t){const e=t?N(String(t).trim()):null;if(!e){for(const o of F)a.style.removeProperty(o);return}const i=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),r=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(o=>Math.round(r?o*.92:o+(255-o)*.16)),n=(o,g)=>a.style.setProperty(o,g);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(o,l);n("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(o,e.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(o,r?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])n(o,r?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["mode","display","size","radius","week-start","locale","min","max","placeholder","disabled","color"];#w;#s;#b;#r;#p;#u;#l;#_=[];#M=[];#k=[];#S=[];#n;#a="";#i=[];#t=null;#e=null;#E=null;#c=f;#f=!1;#N;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=S,this.#w=document.createElement("div"),this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="rgf-input",this.#s.setAttribute("aria-haspopup","dialog");const i=M();i.setAttribute("class","rgf-input__icon"),this.#b=document.createElement("span"),this.#b.className="rgf-input__value",this.#s.append(i,this.#b),this.#s.addEventListener("click",()=>this.#Q()),this.#r=document.createElement("div"),this.#r.className="rgf-panel",this.#r.setAttribute("role","dialog"),this.#r.setAttribute("aria-label","Choose date");const s=document.createElement("div");s.className="rgf-head";const r=document.createElement("button");r.type="button",r.className="rgf-nav",r.setAttribute("aria-label","Previous month"),r.appendChild(D()),r.addEventListener("click",()=>this.#X()),this.#p=document.createElement("button"),this.#p.type="button",this.#p.className="rgf-title",this.#p.title="Go to today",this.#p.addEventListener("click",()=>this.#j());const l=document.createElement("button");l.type="button",l.className="rgf-nav",l.setAttribute("aria-label","Next month"),l.appendChild(L()),l.addEventListener("click",()=>this.#W()),s.append(r,this.#p,l),this.#u=document.createElement("div"),this.#u.className="rgf-week",this.#u.setAttribute("aria-hidden","true"),this.#l=document.createElement("div"),this.#l.className="rgf-grid",this.#l.setAttribute("role","grid"),this.#l.tabIndex=0,this.#l.addEventListener("keydown",d=>this.#et(d)),this.#l.addEventListener("pointerleave",()=>{this.#E=null,this.#h()}),this.#r.append(s,this.#u,this.#l),this.#w.append(this.#s,this.#r),t.append(e,this.#w),this.#N=d=>{this.#f&&!d.composedPath().includes(this)&&this.#y()}}connectedCallback(){A(this,this.getAttribute("color")),this.#T(this.value===void 0?void 0:this.value),this.#a=this.#a||"",this.#n=this.#q(),this.#c=this.#a||this.#t||this.#i[0]||f,this.#H(),this.#F(),this.#D(),this.#P(),document.addEventListener("pointerdown",this.#N,!0)}disconnectedCallback(){document.removeEventListener("pointerdown",this.#N,!0)}attributeChangedCallback(t){A(this,this.getAttribute("color")),this.#l&&((t==="size"||t==="radius"||t==="disabled")&&this.#H(),(t==="week-start"||t==="locale")&&this.#F(),t==="display"&&this.#P(),this.#D(),this.#x())}#d(t,e){return this.getAttribute(t)??e}get#o(){return this.#d("mode","range")}get#A(){return this.#d("display","inline")}get#C(){return this.#d("locale","en-US")}get#V(){return this.#d("week-start","mon")==="sun"?0:1}get#I(){return this.#d("min","")}get#z(){return this.#d("max","")}get#g(){return this.hasAttribute("disabled")}get#Y(){return this.#d("placeholder","Pick a range")}get value(){if(this.#o==="single")return this.#a;if(this.#o==="multiple")return[...this.#i];const t=[];return this.#t&&t.push(this.#t),this.#e&&t.push(this.#e),t}set value(t){this.#T(t),this.#$()}get range(){return{start:this.#t,end:this.#e}}set range(t){Array.isArray(t)?(this.#t=t[0]??null,this.#e=t[1]??null):t&&typeof t=="object"?(this.#t=t.start??null,this.#e=t.end??null):(this.#t=t??null,this.#e=null),this.#$()}#$(){const t=this.#a||this.#t||this.#i[0];t&&(this.#n=m(c(t)),this.#c=t),this.#D(),this.#x()}#T(t){if(t!=null)if(this.#o==="single")this.#a=typeof t=="string"?t:t[0]??"";else if(this.#o==="multiple")this.#i=Array.isArray(t)?[...t]:t?[t]:[];else{let e;Array.isArray(t)?e=t:t&&typeof t=="object"?e=[t.start,t.end]:e=[t],this.#t=e[0]??null,this.#e=e[1]??null}}#q(){const t=this.#a||this.#t||this.#i[0]||f;return m(c(t))}#R(){const t=m(this.#n),e=(t.getDay()-this.#V+7)%7;return b(t,-e)}#B(t){return!!(this.#I&&t<this.#I||this.#z&&t>this.#z)}#G(){const t=new Intl.DateTimeFormat(this.#C,{dateStyle:"full"}),e=this.#R(),i=this.#n.getMonth(),s=[];for(let r=0;r<42;r++){const l=b(e,r),d=v(l),n=this.#B(d);s.push({date:l,iso:d,day:l.getDate(),inMonth:l.getMonth()===i,today:d===f,disabled:n,label:t.format(l)+(n?", unavailable":"")})}return s}#K(){const t=this.#t,e=this.#e??(t&&!this.#e?this.#E:null);return!t||!e?null:t<=e?[t,e]:[e,t]}#U(t,e){if(this.#o==="single")return{selected:t.iso===this.#a,start:!1,end:!1,inRange:!1};if(this.#o==="multiple")return{selected:this.#i.includes(t.iso),start:!1,end:!1,inRange:!1};const i=t.iso===this.#t;if(!e)return{selected:i,start:i,end:i,inRange:!1};const[s,r]=e;return{selected:t.iso===s||t.iso===r,start:t.iso===s,end:t.iso===r,inRange:t.iso>s&&t.iso<r}}#H(){this.#w.className=`rgf-root rgf--${this.#d("size","md")} rgf--r-${this.#d("radius","squircle")}${this.#g?" is-disabled":""}`}#P(){const t=this.#A==="popover";this.#s.style.display=t?"":"none",this.#r.classList.toggle("rgf-panel--float",t),t?this.#r.style.display=this.#f?"":"none":this.#r.style.display="",this.#s.disabled=this.#g}#F(){const t=new Intl.DateTimeFormat(this.#C,{weekday:"short"}),e=this.#R();this.#u.replaceChildren();for(let i=0;i<7;i++){const s=document.createElement("span");s.className="rgf-week__cell",s.textContent=t.format(b(e,i)),this.#u.appendChild(s)}}#D(){if(!this.#n)return;this.#p.textContent=new Intl.DateTimeFormat(this.#C,{month:"long",year:"numeric"}).format(this.#n);const t=this.#G();this.#S=[],this.#_=[],this.#M=[],this.#k=[];const e=document.createDocumentFragment();for(let i=0;i<6;i++){const s=t.slice(i*7,i*7+7);this.#S.push(s);const r=document.createElement("div");r.className="rgf-row",r.setAttribute("role","row");const l=document.createElement("div");l.className="rgf-fill",l.setAttribute("aria-hidden","true"),r.appendChild(l),this.#M.push(l);for(const d of s){const n=document.createElement("button");n.type="button",n.className="rgf-day",n.setAttribute("role","gridcell"),n.tabIndex=-1,n.setAttribute("aria-label",d.label),d.today&&n.setAttribute("aria-current","date"),n.disabled=this.#g||d.disabled;const o=document.createElement("span");o.className="rgf-day__n",o.textContent=d.day,n.appendChild(o),n.addEventListener("click",()=>this.#O(d)),n.addEventListener("pointerenter",()=>this.#J(d.iso)),r.appendChild(n),this.#k.push({btn:n,cell:d})}e.appendChild(r),this.#_.push(r)}this.#l.replaceChildren(e),this.#h()}#h(){const t=this.#K();for(const e of this.#k){const i=this.#U(e.cell,t),s=e.btn.classList;s.toggle("selected",i.selected),s.toggle("start",i.start),s.toggle("end",i.end),s.toggle("inRange",i.inRange),s.toggle("is-out",!e.cell.inMonth),s.toggle("is-today",e.cell.today),s.toggle("is-disabled",e.cell.disabled),s.toggle("is-focus",e.cell.iso===this.#c),e.btn.setAttribute("aria-selected",String(i.selected))}this.#S.forEach((e,i)=>{const s=this.#M[i];let r=null;if(t){const[l,d]=t;let n=-1,o=-1;e.forEach((g,x)=>{g.iso>=l&&g.iso<=d&&(n===-1&&(n=x),o=x)}),n!==-1&&(r={from:n,span:o-n+1,preview:!this.#e})}if(r){const l=s.classList.contains("is-on");s.style.setProperty("--from",r.from),s.style.setProperty("--span",r.span),s.classList.toggle("is-preview",r.preview),s.classList.add("is-on"),l||(s.style.animation="none",s.offsetWidth,s.style.animation="")}else s.classList.remove("is-on")})}#v(t){this.#n=m(t),this.#F(),this.#D()}#X(){this.#v(E(this.#n,-1))}#W(){this.#v(E(this.#n,1))}#j(){this.#v(new Date),this.#c=f,this.#h()}#Q(){this.#g||(this.#f?this.#y():this.#Z())}#Z(){this.#f=!0;const t=this.#r;t.style.display="",t.classList.add("rgf-pop-enter-active","rgf-pop-enter-from"),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.remove("rgf-pop-enter-from")));const e=()=>{t.classList.remove("rgf-pop-enter-active"),t.removeEventListener("transitionend",e)};t.addEventListener("transitionend",e),this.#s.setAttribute("aria-expanded","true")}#y(){if(!this.#f)return;this.#f=!1;const t=this.#r;t.classList.add("rgf-pop-leave-active","rgf-pop-leave-to");const e=()=>{t.classList.remove("rgf-pop-leave-active","rgf-pop-leave-to"),t.style.display="none",t.removeEventListener("transitionend",e)};t.addEventListener("transitionend",e),this.#s.setAttribute("aria-expanded","false")}#J(t){this.#o==="range"&&this.#t&&!this.#e&&(this.#E=t,this.#h())}#m(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e}))}#O(t){if(!(this.#g||t.disabled)){if(t.inMonth||this.#v(t.date),this.#c=t.iso,this.#o==="single"){this.#a=t.iso,this.#m("change",{value:t.iso,start:t.iso,end:t.iso}),this.#m("select",{value:t.iso,start:t.iso,end:t.iso}),this.#A==="popover"&&this.#y(),this.#tt();return}if(this.#o==="multiple"){this.#i.indexOf(t.iso)>=0?this.#i=this.#i.filter(i=>i!==t.iso):this.#i=[...this.#i,t.iso].sort(),this.#m("change",{value:[...this.#i]}),this.#m("select",{value:[...this.#i]}),this.#h(),this.#x();return}if(!this.#t||this.#t&&this.#e)this.#t=t.iso,this.#e=null,this.#E=null;else{t.iso<this.#t?(this.#e=this.#t,this.#t=t.iso):this.#e=t.iso;const e={start:this.#t,end:this.#e};this.#m("change",e),this.#m("select",e),this.#A==="popover"&&this.#y()}this.#h(),this.#x()}}#tt(){this.#h(),this.#x()}#L(t){const e=b(c(this.#c),t);this.#c=v(e),e.getMonth()!==this.#n.getMonth()||e.getFullYear()!==this.#n.getFullYear()?this.#v(e):this.#h()}#et(t){if(!this.#g)switch(t.key){case"ArrowLeft":t.preventDefault(),this.#L(-1);break;case"ArrowRight":t.preventDefault(),this.#L(1);break;case"ArrowUp":t.preventDefault(),this.#L(-7);break;case"ArrowDown":t.preventDefault(),this.#L(7);break;case"Home":t.preventDefault(),this.#j();break;case"Enter":case" ":{t.preventDefault();const e=this.#k.find(i=>i.cell.iso===this.#c);e&&this.#O(e.cell);break}case"Escape":this.#A==="popover"&&this.#f&&(t.preventDefault(),this.#y());break}}#x(){const t=new Intl.DateTimeFormat(this.#C,{dateStyle:"medium"});let e="";if(this.#o==="single")e=this.#a?t.format(c(this.#a)):"";else if(this.#o==="multiple")this.#i.length&&(e=this.#i.length<=2?this.#i.map(i=>t.format(c(i))).join(", "):`${this.#i.length} dates`);else if(this.#t){const i=t.format(c(this.#t)),s=this.#e?t.format(c(this.#e)):"…";e=`${i} – ${s}`}this.#b.textContent=e||this.#Y,this.#b.classList.toggle("is-placeholder",!e)}}customElements.define("vs-calendar-range-fill",_);
