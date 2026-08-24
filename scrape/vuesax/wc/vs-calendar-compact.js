const x=l=>String(l).padStart(2,"0");function g(l){return`${l.getFullYear()}-${x(l.getMonth()+1)}-${x(l.getDate())}`}function h(l){const[t,e,i]=String(l).split("T")[0].split("-").map(Number);return!Number.isFinite(t)||!Number.isFinite(e)||!Number.isFinite(i)||e<1||e>12||i<1||i>31?new Date:new Date(t,e-1,i)}function p(l){return new Date(l.getFullYear(),l.getMonth(),1)}function m(l,t){return new Date(l.getFullYear(),l.getMonth(),l.getDate()+t)}function y(l,t){return new Date(l.getFullYear(),l.getMonth()+t,1)}const b=g(new Date),w="http://www.w3.org/2000/svg";function v(l,t={}){const e=document.createElementNS(w,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true");for(const[i,r]of Object.entries(t))e.setAttribute(i,r);for(const i of l){const r=document.createElementNS(w,"path");r.setAttribute("d",i.d),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width",i.w||"1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),(!i.w||i.w==="1.5")&&r.setAttribute("stroke-miterlimit","10"),e.appendChild(r)}return e}const A=[{d:"M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"}],E=[{d:"M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"}],C=[{d:"M8 2V5"},{d:"M16 2V5"},{d:"M3.5 9.08984H20.5"},{d:"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"},{d:"M15.6947 13.6992H15.7037",w:"2"},{d:"M15.6947 16.6992H15.7037",w:"2"},{d:"M11.9955 13.6992H12.0045",w:"2"},{d:"M11.9955 16.6992H12.0045",w:"2"},{d:"M8.29431 13.6992H8.30329",w:"2"},{d:"M8.29431 16.6992H8.30329",w:"2"}],S=`
  :host { display: inline-block; }
  .cpt-root {
    --h: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --rr: var(--ctrl-r-md, 12px);
    --cell: 30px;
    --day-r: 8px;
    --accent: var(--ui-accent, #ededed);
    position: relative; display: inline-flex; flex-direction: column;
    font-family: inherit; font-size: var(--fs); color: var(--text, #ededed);
    user-select: none; -webkit-user-select: none;
  }
  /* compact: smaller cells than the base at every size */
  .cpt--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --rr: var(--ctrl-r-sm, 10px); --cell: 26px; --day-r: 7px; }
  .cpt--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); --rr: var(--ctrl-r-md, 12px); --cell: 30px; --day-r: 8px; }
  .cpt--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --rr: var(--ctrl-r-lg, 14px); --cell: 36px; --day-r: 10px; }
  .cpt--r-none { --rr: 0px; --day-r: 4px; }
  .cpt--r-subtle { --rr: 8px; --day-r: 6px; }
  .cpt--r-rounded { --rr: 14px; --day-r: 9px; }
  .cpt--r-pill { --rr: 20px; --day-r: 999px; }
  .cpt--r-squircle { --rr: var(--ctrl-r-md, 12px); --day-r: 8px; }

  .cpt-input {
    display: inline-flex; align-items: center; gap: 9px;
    width: 100%; min-width: 180px; height: var(--h); padding: 0 var(--px);
    border-radius: var(--rr); border: 1px solid var(--inp-border, #2a2a2a);
    background: var(--inp-bg, transparent); color: var(--inp-text, #ededed);
    font: inherit; font-weight: 500; cursor: pointer; white-space: nowrap;
    -webkit-tap-highlight-color: transparent; transition: border-color 200ms ease;
  }
  .cpt-input:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .cpt-input__icon { width: 15px; height: 15px; flex: none; color: var(--inp-prefix, #7a7a7a); }
  .cpt-input__value { overflow: hidden; text-overflow: ellipsis; }
  .cpt-input__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }

  .cpt-panel {
    position: relative; padding: 8px; border-radius: var(--rr);
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--bg-card, #111);
  }
  .cpt-panel--float { box-shadow: var(--sel-menu-shadow, 0 12px 40px rgba(0, 0, 0, 0.5)); }
  /* WC-only: popover panel is absolutely positioned + hidden until open */
  .cpt-panel--float { position: absolute; top: calc(var(--h) + 6px); left: 0; z-index: 40;
    transition: opacity 200ms ease, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .cpt-panel--float[hidden] { display: none; }
  .cpt-panel--closing { opacity: 0; transform: translateY(-6px) scale(0.97);
    transition: opacity 150ms ease, transform 180ms ease; }
  .cpt-panel--opening { opacity: 0; transform: translateY(-6px) scale(0.97); }

  .cpt-head { display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 4px; }
  .cpt-nav {
    display: inline-flex; align-items: center; justify-content: center;
    width: 24px; height: 24px; flex: none; border: 0; border-radius: 7px;
    background: transparent; color: var(--text-muted, #666); cursor: pointer;
    transition: color 140ms ease, background-color 140ms ease;
  }
  .cpt-nav svg { width: 14px; height: 14px; }
  .cpt-nav:hover:not(:disabled) { color: var(--text, #ededed); background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }
  .cpt-title {
    flex: 1; height: 24px; border: 0; background: transparent; font: inherit;
    font-size: calc(var(--fs) - 1px); font-weight: 600; text-transform: capitalize;
    letter-spacing: -0.01em; color: var(--text, #ededed); cursor: pointer; text-align: center;
  }

  .cpt-week { display: grid; grid-template-columns: repeat(7, var(--cell)); margin-bottom: 1px; }
  .cpt-week__cell {
    display: grid; place-items: center; height: 20px; font-size: 10px; font-weight: 500;
    text-transform: uppercase; color: var(--text-muted, #666);
  }

  .cpt-grid { position: relative; display: flex; flex-direction: column; outline: none; }
  .cpt-row { display: grid; grid-template-columns: repeat(7, var(--cell)); grid-auto-rows: var(--cell); }

  /* SIGNATURE EFFECT: single accent pill that slides between cells */
  .cpt-pill {
    position: absolute; top: 0; left: 0;
    width: var(--cell); height: var(--cell);
    border-radius: var(--day-r);
    background: var(--ui-accent, #ededed);
    transform: translate(calc(var(--sx, 0) * var(--cell)), calc(var(--sy, 0) * var(--cell)));
    opacity: 0; pointer-events: none; z-index: 0;
    transition: transform 320ms cubic-bezier(0.34, 1.5, 0.64, 1), opacity 180ms ease;
  }
  .cpt-pill.is-on { opacity: 1; }

  .cpt-day {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    width: var(--cell); height: var(--cell); border: 0; border-radius: var(--day-r);
    background: transparent; color: var(--text, #ededed); font: inherit;
    font-size: calc(var(--fs) - 2px); font-variant-numeric: tabular-nums; cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 140ms ease, color 200ms ease, transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .cpt-day__n { position: relative; z-index: 1; }
  .cpt-day:hover:not(:disabled):not(.selected) { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }
  .cpt-day:active:not(:disabled) { transform: scale(0.88); }
  .cpt-day.is-out { opacity: 0.3; }
  .cpt-day.is-disabled { opacity: 0.22; cursor: not-allowed; }
  .cpt-day.is-today::after {
    content: ''; position: absolute; bottom: 3px; left: 50%; width: 3px; height: 3px;
    border-radius: 50%; background: currentColor; transform: translateX(-50%); z-index: 1;
  }
  .cpt-day.selected { color: var(--accent-fg, #fff); font-weight: 600; }
  .cpt-day.selected.is-today::after { background: var(--accent-fg, #fff); }
  /* single mode: the moving pill IS the fill → no per-cell bg. range/multiple keep it. */
  .cpt-panel:not(.cpt--single) .cpt-day.selected { background: var(--ui-accent, #ededed); z-index: 1; }
  .cpt-day.inRange { background: color-mix(in srgb, var(--ui-accent, #ededed) 14%, transparent); border-radius: 0; }
  .cpt-day.start:not(.end) { border-top-right-radius: 0; border-bottom-right-radius: 0; }
  .cpt-day.end:not(.start) { border-top-left-radius: 0; border-bottom-left-radius: 0; }

  .cpt-grid:focus-visible .cpt-day.is-focus { box-shadow: inset 0 0 0 1.5px var(--ui-accent, #ededed); }
  .cpt-grid:focus-visible .cpt-day.is-focus.selected { box-shadow: inset 0 0 0 1.5px var(--bg-card, #111); }

  .is-disabled .cpt-day { cursor: not-allowed; }
  .cpt-root.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .cpt-pill, .cpt-day, .cpt-nav, .cpt-panel--float { transition: none; }
  }
`;let f;function M(l){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=l;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const N=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function k(l,t){const e=t?M(String(t).trim()):null;if(!e){for(const s of N)l.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),o=(s,d)=>l.style.setProperty(s,d);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(s,a);o("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])o(s,n?"0 0 0":"255 255 255");o("--vs-color",a),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class D extends HTMLElement{static observedAttributes=["mode","display","size","radius","week-start","locale","min","max","placeholder","disabled","value","color"];#m;#o;#b;#l;#p;#A;#a;#c;#_;#s="";#e=[];#t=null;#r=null;#v=null;#i;#h;#u=!1;#E=!1;#g=[];#C;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=S,this.#m=document.createElement("div"),this.#m.className="cpt-root",this.#o=document.createElement("button"),this.#o.type="button",this.#o.className="cpt-input",this.#o.setAttribute("aria-haspopup","dialog");const i=v(C,{class:"cpt-input__icon"});i.classList.add("cpt-input__icon"),this.#b=document.createElement("span"),this.#b.className="cpt-input__value",this.#o.append(i,this.#b),this.#o.addEventListener("click",()=>this.#W()),this.#l=document.createElement("div"),this.#l.className="cpt-panel",this.#l.setAttribute("role","dialog"),this.#l.setAttribute("aria-label","Choose date");const r=document.createElement("div");r.className="cpt-head";const n=document.createElement("button");n.type="button",n.className="cpt-nav",n.setAttribute("aria-label","Previous month"),n.appendChild(v(A)),n.addEventListener("click",()=>this.#q()),this.#p=document.createElement("button"),this.#p.type="button",this.#p.className="cpt-title",this.#p.title="Go to today",this.#p.addEventListener("click",()=>this.#F());const a=document.createElement("button");a.type="button",a.className="cpt-nav",a.setAttribute("aria-label","Next month"),a.appendChild(v(E)),a.addEventListener("click",()=>this.#K()),r.append(n,this.#p,a),this.#_=[n,this.#p,a];const c=document.createElement("div");c.className="cpt-week",c.setAttribute("aria-hidden","true"),this.#A=[];for(let o=0;o<7;o++){const s=document.createElement("span");s.className="cpt-week__cell",this.#A.push(s),c.appendChild(s)}this.#a=document.createElement("div"),this.#a.className="cpt-grid",this.#a.setAttribute("role","grid"),this.#a.tabIndex=0,this.#c=document.createElement("div"),this.#c.className="cpt-pill",this.#c.setAttribute("aria-hidden","true"),this.#a.appendChild(this.#c),this.#a.addEventListener("keydown",o=>this.#X(o)),this.#a.addEventListener("pointerleave",()=>{this.#v=null,this.#d()==="range"&&this.#M()}),this.#a.addEventListener("click",o=>{const s=o.target.closest?.(".cpt-day");if(!s)return;const d=this.#g.find(u=>u.iso===s.dataset.iso);d&&this.#z(d)}),this.#a.addEventListener("pointerover",o=>{const s=o.target.closest?.(".cpt-day");s&&this.#U(s.dataset.iso)}),this.#l.append(r,c,this.#a),this.#m.append(this.#o,this.#l),t.append(e,this.#m),this.#S(this.getAttribute("value")),this.#i=this.#V(),this.#h=this.#s||this.#t||this.#e[0]||b,this.#C=o=>{this.#u&&!this.contains(o.target)&&this.#k()}}connectedCallback(){k(this,this.getAttribute("color")),this.#n(),document.addEventListener("pointerdown",this.#C,!0)}disconnectedCallback(){document.removeEventListener("pointerdown",this.#C,!0)}attributeChangedCallback(t,e,i){if(k(this,this.getAttribute("color")),!(!this.#m||e===i)){if(t==="value"&&!this.#E){this.#S(i);const r=this.#s||this.#t||this.#e[0];r&&(this.#i=p(h(r)),this.#h=r)}this.#n()}}#d(){return this.getAttribute("mode")||"single"}#x(){return this.getAttribute("display")||"inline"}#H(){return this.getAttribute("size")||"md"}#R(){return this.getAttribute("radius")||"squircle"}#$(){return this.getAttribute("week-start")==="sun"?0:1}#y(){return this.getAttribute("locale")||"en-US"}#O(){return this.getAttribute("min")||""}#T(){return this.getAttribute("max")||""}#P(){return this.getAttribute("placeholder")||"Pick a date"}#f(){return this.hasAttribute("disabled")}get value(){const t=this.#d();return t==="single"?this.#s:t==="multiple"?[...this.#e]:this.#t?[this.#t,this.#r].filter(Boolean):[]}set value(t){this.#S(t);const e=this.#s||this.#t||this.#e[0];e&&(this.#i=p(h(e)),this.#h=e),this.#L(),this.#n()}#S(t){if(t==null)return;const e=Array.isArray(t)?t:typeof t=="string"&&t.includes(",")?t.split(",").map(r=>r.trim()):t?[t]:[],i=this.#d();i==="single"?this.#s=typeof t=="string"?t.split(",")[0].trim():e[0]??"":i==="multiple"?this.#e=[...e]:(this.#t=e[0]??null,this.#r=e[1]??null)}#V(){const t=this.#s||this.#t||this.#e[0]||b;return p(h(t))}#L(){const t=this.#d();let e;t==="single"?e=this.#s:t==="multiple"?e=this.#e.join(","):e=[this.#t,this.#r].filter(Boolean).join(","),this.#E=!0,e?this.setAttribute("value",e):this.removeAttribute("value"),this.#E=!1}#I(){const t=p(this.#i),e=(t.getDay()-this.#$()+7)%7;return m(t,-e)}#j(t){const e=this.#O(),i=this.#T();return!!(e&&t<e||i&&t>i)}#Y(){const t=new Intl.DateTimeFormat(this.#y(),{dateStyle:"full"}),e=this.#I(),i=this.#i.getMonth(),r=[];for(let n=0;n<42;n++){const a=m(e,n),c=g(a),o=this.#j(c);r.push({date:a,iso:c,day:a.getDate(),inMonth:a.getMonth()===i,today:c===b,disabled:o,label:t.format(a)+(o?", unavailable":"")})}return r}#B(){const t=this.#t,e=this.#r??(t&&!this.#r?this.#v:null);return!t||!e?null:t<=e?[t,e]:[e,t]}#G(t){const e=this.#d();if(e==="single")return{selected:t.iso===this.#s,start:!1,end:!1,inRange:!1};if(e==="multiple")return{selected:this.#e.includes(t.iso),start:!1,end:!1,inRange:!1};const i=this.#B(),r=t.iso===this.#t;if(!i)return{selected:r,start:r,end:r,inRange:!1};const[n,a]=i;return{selected:t.iso===n||t.iso===a,start:t.iso===n,end:t.iso===a,inRange:t.iso>n&&t.iso<a}}#n(){const t=this.#d()==="single";this.#m.className=`cpt-root cpt--${this.#H()} cpt--r-${this.#R()}`+(t?" cpt--single":"")+(this.#f()?" is-disabled":"");const e=this.#x()==="popover";this.#o.style.display=e?"":"none",this.#l.classList.toggle("cpt-panel--float",e),this.#l.classList.toggle("cpt--single",t),e?this.#l.hidden=!this.#u:this.#l.hidden=!1,this.#o.disabled=this.#f(),this.#o.setAttribute("aria-expanded",String(this.#u));for(const a of this.#_)a.disabled=this.#f();const i=this.#Z();this.#b.textContent=i||this.#P(),this.#b.classList.toggle("is-placeholder",!i),this.#p.textContent=new Intl.DateTimeFormat(this.#y(),{month:"short",year:"numeric"}).format(this.#i);const r=new Intl.DateTimeFormat(this.#y(),{weekday:"narrow"}),n=this.#I();for(let a=0;a<7;a++)this.#A[a].textContent=r.format(m(n,a));this.#M()}#M(){this.#g=this.#Y();const t=this.#d(),e=this.#f(),i=[];for(let r=0;r<6;r++){const n=document.createElement("div");n.className="cpt-row",n.setAttribute("role","row");for(let a=0;a<7;a++){const c=this.#g[r*7+a],o=this.#G(c),s=document.createElement("button");s.type="button",s.setAttribute("role","gridcell"),s.dataset.iso=c.iso;let d="cpt-day";o.selected&&(d+=" selected"),o.start&&(d+=" start"),o.end&&(d+=" end"),o.inRange&&(d+=" inRange"),c.inMonth||(d+=" is-out"),c.today&&(d+=" is-today"),c.disabled&&(d+=" is-disabled"),c.iso===this.#h&&(d+=" is-focus"),s.className=d,s.disabled=e||c.disabled,s.tabIndex=-1,s.setAttribute("aria-label",c.label),s.setAttribute("aria-selected",String(o.selected)),c.today&&s.setAttribute("aria-current","date");const u=document.createElement("span");u.className="cpt-day__n",u.textContent=String(c.day),s.appendChild(u),n.appendChild(s)}i.push(n)}if(t==="single"&&this.#s){const r=this.#g.findIndex(n=>n.iso===this.#s);r>=0?(this.#c.style.setProperty("--sx",String(r%7)),this.#c.style.setProperty("--sy",String(Math.floor(r/7))),this.#c.classList.add("is-on")):this.#c.classList.remove("is-on")}else this.#c.classList.remove("is-on");this.#a.replaceChildren(this.#c,...i)}#N(t,e){this.#L(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t,date:e}}))}#z(t){if(this.#f()||t.disabled)return;t.inMonth||(this.#i=p(t.date)),this.#h=t.iso;const e=this.#d();if(e==="single"){this.#s=t.iso,this.#N(t.iso,t.iso),this.#x()==="popover"?this.#k():this.#n();return}if(e==="multiple"){this.#e.indexOf(t.iso)>=0?this.#e=this.#e.filter(r=>r!==t.iso):this.#e=[...this.#e,t.iso].sort(),this.#N([...this.#e],t.iso),this.#n();return}!this.#t||this.#t&&this.#r?(this.#t=t.iso,this.#r=null,this.#v=null):(t.iso<this.#t?(this.#r=this.#t,this.#t=t.iso):this.#r=t.iso,this.#N([this.#t,this.#r],t.iso),this.#x()==="popover"&&this.#k()),this.#n()}#U(t){this.#d()==="range"&&this.#t&&!this.#r&&(this.#v=t,this.#M())}#q(){this.#i=y(this.#i,-1),this.#n(),this.#D()}#K(){this.#i=y(this.#i,1),this.#n(),this.#D()}#F(){this.#i=p(new Date),this.#h=b,this.#n(),this.#D()}#D(){this.dispatchEvent(new CustomEvent("monthchange",{bubbles:!0,composed:!0,detail:{month:g(this.#i)}}))}#w(t){const e=m(h(this.#h),t);this.#h=g(e),(e.getMonth()!==this.#i.getMonth()||e.getFullYear()!==this.#i.getFullYear())&&(this.#i=p(e)),this.#n()}#X(t){if(!this.#f())switch(t.key){case"ArrowLeft":t.preventDefault(),this.#w(-1);break;case"ArrowRight":t.preventDefault(),this.#w(1);break;case"ArrowUp":t.preventDefault(),this.#w(-7);break;case"ArrowDown":t.preventDefault(),this.#w(7);break;case"Home":t.preventDefault(),this.#F();break;case"Enter":case" ":{t.preventDefault();const e=this.#g.find(i=>i.iso===this.#h);e&&this.#z(e);break}case"Escape":this.#x()==="popover"&&this.#u&&(t.preventDefault(),this.#k());break}}#W(){this.#f()||(this.#u=!this.#u,this.#n())}#k(){this.#u&&(this.#u=!1,this.#n())}#Z(){const t=new Intl.DateTimeFormat(this.#y(),{dateStyle:"medium"}),e=this.#d();if(e==="single")return this.#s?t.format(h(this.#s)):"";if(e==="multiple")return this.#e.length?this.#e.length<=2?this.#e.map(n=>t.format(h(n))).join(", "):`${this.#e.length} dates`:"";if(!this.#t)return"";const i=t.format(h(this.#t)),r=this.#r?t.format(h(this.#r)):"…";return`${i} – ${r}`}}customElements.define("vs-calendar-compact",D);
