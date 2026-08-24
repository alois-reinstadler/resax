const y=r=>String(r).padStart(2,"0");function x(r){return`${r.getFullYear()}-${y(r.getMonth()+1)}-${y(r.getDate())}`}function p(r){const[t,e,i]=String(r).split("T")[0].split("-").map(Number);return!Number.isFinite(t)||!Number.isFinite(e)||!Number.isFinite(i)||e<1||e>12||i<1||i>31?new Date:new Date(t,e-1,i)}function g(r){return new Date(r.getFullYear(),r.getMonth(),1)}function b(r,t){return new Date(r.getFullYear(),r.getMonth(),r.getDate()+t)}function w(r,t){return new Date(r.getFullYear(),r.getMonth()+t,1)}const m=x(new Date),A="http://www.w3.org/2000/svg";function v(r,t){const e=document.createElementNS(A,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),t&&e.setAttribute("class",t);for(const i of r){const a=document.createElementNS(A,"path");a.setAttribute("d",i),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),e.appendChild(a)}return e}const _=["M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"],E=["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"],C=["M8 2V5","M16 2V5","M3.5 9.08984H20.5","M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"],S=`
  :host { display: inline-flex; }
  .cmn-root {
    --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px);
    --rr: var(--ctrl-r-md, 12px); --cell: 38px; --accent: var(--ui-accent, #ededed);
    position: relative; display: inline-flex; flex-direction: column; font-family: inherit;
    font-size: var(--fs); color: var(--text, #ededed); user-select: none; -webkit-user-select: none;
  }
  .cmn--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --rr: var(--ctrl-r-sm, 10px); --cell: 32px; }
  .cmn--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); --rr: var(--ctrl-r-md, 12px); --cell: 38px; }
  .cmn--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --rr: var(--ctrl-r-lg, 14px); --cell: 44px; }
  .cmn--r-none { --rr: 0px; } .cmn--r-subtle { --rr: 8px; } .cmn--r-rounded { --rr: 14px; }
  .cmn--r-pill { --rr: 20px; } .cmn--r-squircle { --rr: var(--ctrl-r-md, 12px); }

  .cmn-input {
    display: inline-flex; align-items: center; gap: 9px; width: 100%; min-width: 200px;
    height: var(--h); padding: 0 var(--px); border-radius: var(--rr);
    border: 1px solid var(--inp-border, #2a2a2a); background: var(--inp-bg, transparent);
    color: var(--inp-text, #ededed); font: inherit; font-weight: 500; cursor: pointer;
    white-space: nowrap; -webkit-tap-highlight-color: transparent; transition: border-color 200ms ease;
  }
  .cmn-input:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .cmn-input__icon { width: 15px; height: 15px; flex: none; color: var(--inp-prefix, #7a7a7a); }
  .cmn-input__value { overflow: hidden; text-overflow: ellipsis; }
  .cmn-input__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }

  /* minimal panel: no border, no shadow — flat surface */
  .cmn-panel { position: relative; padding: 8px 4px; background: transparent; border-radius: var(--rr);
    transition: opacity 200ms ease, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .cmn-panel.is-closed { opacity: 0; transform: translateY(-6px); pointer-events: none;
    position: absolute; top: calc(var(--h) + 6px); left: 0; z-index: 40; }
  .cmn-panel.is-pop { position: absolute; top: calc(var(--h) + 6px); left: 0; z-index: 40;
    background: var(--bg-card, #111); box-shadow: 0 12px 40px rgba(0,0,0,.4); }

  .cmn-head { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 6px; padding: 0 4px; }
  .cmn-nav {
    display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px;
    flex: none; border: 0; border-radius: 8px; background: transparent; color: var(--text-muted, #666);
    cursor: pointer; transition: color 140ms ease, background-color 140ms ease;
  }
  .cmn-nav svg { width: 15px; height: 15px; }
  .cmn-nav:hover:not(:disabled) { color: var(--text, #ededed); }
  .cmn-title {
    flex: 1; height: 28px; border: 0; background: transparent; font: inherit; font-weight: 600;
    text-transform: capitalize; letter-spacing: -0.01em; color: var(--text, #ededed); cursor: pointer; text-align: center;
  }

  .cmn-week { display: grid; grid-template-columns: repeat(7, var(--cell)); margin-bottom: 2px; }
  .cmn-week__cell {
    display: grid; place-items: center; height: 26px; font-size: 11px; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted, #666);
  }

  .cmn-grid { position: relative; display: flex; flex-direction: column; outline: none; }
  .cmn-row { display: grid; grid-template-columns: repeat(7, var(--cell)); grid-auto-rows: var(--cell); }

  /* SIGNATURE EFFECT: thin underline that slides to the selected day */
  .cmn-underline {
    position: absolute; left: 0; top: 0; width: calc(var(--cell) - 12px); height: 2px;
    margin-left: 6px; border-radius: 2px; background: var(--ui-accent, #ededed);
    transform: translate(calc(var(--sx, 0) * var(--cell)), calc(var(--sy, 0) * var(--cell) + var(--cell) - 7px));
    opacity: 0; pointer-events: none; z-index: 0;
    transition: transform 340ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 200ms ease;
  }
  .cmn-underline.is-on { opacity: 1; }

  .cmn-day {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    width: var(--cell); height: var(--cell); border: 0; border-radius: var(--rr); background: transparent;
    color: var(--text, #ededed); font: inherit; font-size: calc(var(--fs) - 1px); font-variant-numeric: tabular-nums;
    cursor: pointer; -webkit-tap-highlight-color: transparent; transition: color 160ms ease, background-color 160ms ease;
  }
  .cmn-day__n { position: relative; z-index: 1; }
  .cmn-day:hover:not(:disabled) { color: var(--ui-accent, #ededed); }
  .cmn-day.is-out { opacity: 0.3; }
  .cmn-day.is-disabled { opacity: 0.22; cursor: not-allowed; }
  .cmn-day.is-today { font-weight: 700; }
  .cmn-day.selected { color: var(--ui-accent, #ededed); font-weight: 700; }
  .cmn-day.inRange { background: color-mix(in srgb, var(--ui-accent, #ededed) 12%, transparent); border-radius: 0; }
  .cmn-grid:focus-visible .cmn-day.is-focus { box-shadow: inset 0 0 0 1.5px var(--ui-accent, #ededed); }

  .cmn-root.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .cmn-underline, .cmn-day, .cmn-nav, .cmn-panel { transition: none; }
  }
`;let f;function N(r){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=r;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const D=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function k(r,t){const e=t?N(String(t).trim()):null;if(!e){for(const s of D)r.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),n=(s,h)=>r.style.setProperty(s,h);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(s,c);n("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])n(s,o?"0 0 0":"255 255 255");n("--vs-color",c),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class M extends HTMLElement{static observedAttributes=["mode","display","size","radius","week-start","locale","min","max","placeholder","disabled","value","color"];#f;#r;#g;#p;#h;#_=[];#a;#d;#b=[];#E=[];#s="";#e=[];#t=null;#n=null;#x=null;#o;#l=m;#m=!1;#C=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=S,this.#f=document.createElement("div"),this.#f.className="cmn-root",this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="cmn-input",this.#r.setAttribute("aria-haspopup","dialog"),this.#r.appendChild(v(C,"cmn-input__icon")),this.#g=document.createElement("span"),this.#g.className="cmn-input__value",this.#r.appendChild(this.#g),this.#r.addEventListener("click",()=>this.#Q()),this.#p=document.createElement("div"),this.#p.className="cmn-panel",this.#p.setAttribute("role","dialog"),this.#p.setAttribute("aria-label","Choose date");const i=document.createElement("div");i.className="cmn-head";const a=document.createElement("button");a.type="button",a.className="cmn-nav",a.setAttribute("aria-label","Previous month"),a.appendChild(v(_)),a.addEventListener("click",()=>this.#v(w(this.#o,-1))),this.#h=document.createElement("button"),this.#h.type="button",this.#h.className="cmn-title",this.#h.title="Go to today",this.#h.addEventListener("click",()=>{this.#v(new Date),this.#l=m});const o=document.createElement("button");o.type="button",o.className="cmn-nav",o.setAttribute("aria-label","Next month"),o.appendChild(v(E)),o.addEventListener("click",()=>this.#v(w(this.#o,1))),i.append(a,this.#h,o),this.#E=[a,o];const c=document.createElement("div");c.className="cmn-week",c.setAttribute("aria-hidden","true");for(let l=0;l<7;l++){const n=document.createElement("span");n.className="cmn-week__cell",this.#_.push(n),c.appendChild(n)}this.#a=document.createElement("div"),this.#a.className="cmn-grid",this.#a.setAttribute("role","grid"),this.#a.tabIndex=0,this.#d=document.createElement("div"),this.#d.className="cmn-underline",this.#d.setAttribute("aria-hidden","true"),this.#a.appendChild(this.#d);for(let l=0;l<6;l++){const n=document.createElement("div");n.className="cmn-row",n.setAttribute("role","row");for(let s=0;s<7;s++){const h=document.createElement("button");h.type="button",h.className="cmn-day",h.setAttribute("role","gridcell"),h.tabIndex=-1;const u=document.createElement("span");u.className="cmn-day__n",h.appendChild(u),h._n=u,this.#b.push(h),n.appendChild(h)}this.#a.appendChild(n)}this.#a.addEventListener("click",l=>{const n=l.target.closest(".cmn-day");n&&this.#T(n)}),this.#a.addEventListener("pointerover",l=>{const n=l.target.closest(".cmn-day");n&&this.#J(n._iso)}),this.#a.addEventListener("pointerleave",()=>{this.#x=null,this.#c()}),this.#a.addEventListener("keydown",l=>this.#W(l)),this.#p.append(i,c,this.#a),this.#f.append(this.#r,this.#p),t.append(e,this.#f)}connectedCallback(){k(this,this.getAttribute("color")),this.#S(this.#j()),this.#o=this.#G(),this.#l=this.#s||this.#t||this.#e[0]||m,this.#N()}disconnectedCallback(){this.#b=[],this.#_=[],this.#E=[]}attributeChangedCallback(t,e,i){if(k(this,this.getAttribute("color")),e!==i){if(t==="value"){if(this.#C)return;this.#S(i)}this.isConnected&&this.#N()}}get#i(){return this.getAttribute("mode")||"single"}get#y(){return this.getAttribute("display")||"inline"}get#O(){return this.getAttribute("size")||"md"}get#P(){return this.getAttribute("radius")||"squircle"}get#H(){return this.getAttribute("week-start")||"mon"}get#w(){return this.getAttribute("locale")||"en-US"}get#F(){return this.getAttribute("min")||""}get#R(){return this.getAttribute("max")||""}get#B(){return this.getAttribute("placeholder")||"Pick a date"}get#u(){return this.hasAttribute("disabled")}get#Y(){return this.#H==="sun"?0:1}get value(){if(this.#i==="single")return this.#s;if(this.#i==="multiple")return[...this.#e];const t=[];return this.#t&&t.push(this.#t),this.#n&&t.push(this.#n),t}set value(t){if(this.#S(t),this.#V(),this.isConnected){const e=this.#s||this.#t||this.#e[0];e&&(this.#$(p(e)),this.#l=e),this.#N()}}#j(){return this.getAttribute("value")??void 0}#V(){this.#C=!0,this.#i==="single"&&(this.#s?this.setAttribute("value",this.#s):this.removeAttribute("value")),this.#C=!1}#S(t){if(t!=null)if(typeof t=="string"&&t.includes(",")&&this.#i!=="single"&&(t=t.split(",").map(e=>e.trim()).filter(Boolean)),this.#i==="single")this.#s=typeof t=="string"?t:t[0]??"";else if(this.#i==="multiple")this.#e=Array.isArray(t)?[...t]:t?[t]:[];else{const e=Array.isArray(t)?t:[t];this.#t=e[0]??null,this.#n=e[1]??null}}#G(){const t=this.#s||this.#t||this.#e[0]||m;return g(p(t))}#v(t){this.#o=g(t),this.#M(),this.#c()}#$(t){this.#o=g(t)}#U(t){return!!(this.#F&&t<this.#F||this.#R&&t>this.#R)}#z(){const t=g(this.#o),e=(t.getDay()-this.#Y+7)%7;return b(t,-e)}#q(){const t=this.#t,e=this.#n??(t&&!this.#n?this.#x:null);return!t||!e?null:t<=e?[t,e]:[e,t]}#K(t){if(this.#i==="single")return{selected:t===this.#s,inRange:!1};if(this.#i==="multiple")return{selected:this.#e.includes(t),inRange:!1};const e=this.#q(),i=t===this.#t;if(!e)return{selected:i,inRange:!1};const[a,o]=e;return{selected:t===a||t===o,inRange:t>a&&t<o}}#N(){this.#D(),this.#M(),this.#c(),this.#A()}#D(){this.#f.className=`cmn-root cmn--${this.#O} cmn--r-${this.#P}`+(this.#i==="single"?" cmn--single":"")+(this.#u?" is-disabled":"");const t=this.#y==="popover";this.#r.style.display=t?"":"none",this.#r.disabled=this.#u,this.#r.setAttribute("aria-expanded",String(this.#m)),this.#p.className="cmn-panel"+(t?" is-pop":"")+(t&&!this.#m?" is-closed":"");for(const e of this.#E)e.disabled=this.#u;this.#h.disabled=this.#u}#M(){this.#h.textContent=new Intl.DateTimeFormat(this.#w,{month:"long",year:"numeric"}).format(this.#o);const t=new Intl.DateTimeFormat(this.#w,{weekday:"short"}),e=this.#z();for(let i=0;i<7;i++)this.#_[i].textContent=t.format(b(e,i))}#c(){const t=this.#z(),e=this.#o.getMonth(),i=new Intl.DateTimeFormat(this.#w,{dateStyle:"full"});for(let o=0;o<42;o++){const c=b(t,o),l=x(c),n=c.getMonth()===e,s=this.#U(l),h=l===m,u=this.#K(l),d=this.#b[o];d._iso=l,d._date=c,d._inMonth=n,d._disabled=s,d._n.textContent=c.getDate(),d.className="cmn-day"+(u.selected?" selected":"")+(u.inRange?" inRange":"")+(n?"":" is-out")+(h?" is-today":"")+(s?" is-disabled":"")+(l===this.#l?" is-focus":""),d.disabled=this.#u||s,d.setAttribute("aria-label",i.format(c)+(s?", unavailable":"")),d.setAttribute("aria-selected",String(u.selected)),h?d.setAttribute("aria-current","date"):d.removeAttribute("aria-current")}const a=this.#i==="single"&&this.#s?this.#b.findIndex(o=>o._iso===this.#s):-1;a>=0?(this.#d.style.setProperty("--sx",String(a%7)),this.#d.style.setProperty("--sy",String(Math.floor(a/7))),this.#d.classList.add("is-on")):this.#d.classList.remove("is-on")}#A(){const t=this.#Z();this.#g.textContent=t||this.#B,this.#g.classList.toggle("is-placeholder",!t)}#Z(){const t=new Intl.DateTimeFormat(this.#w,{dateStyle:"medium"});if(this.#i==="single")return this.#s?t.format(p(this.#s)):"";if(this.#i==="multiple")return this.#e.length?this.#e.length<=2?this.#e.map(a=>t.format(p(a))).join(", "):`${this.#e.length} dates`:"";if(!this.#t)return"";const e=t.format(p(this.#t)),i=this.#n?t.format(p(this.#n)):"…";return`${e} – ${i}`}#T(t){if(!(this.#u||t._disabled)){if(t._inMonth||(this.#$(t._date),this.#M()),this.#l=t._iso,this.#i==="single"){this.#s=t._iso,this.#V(),this.#I(t._iso),this.#y==="popover"&&this.#L(),this.#c(),this.#A();return}if(this.#i==="multiple"){this.#e.indexOf(t._iso)>=0?this.#e=this.#e.filter(i=>i!==t._iso):this.#e=[...this.#e,t._iso].sort(),this.#I([...this.#e]),this.#c(),this.#A();return}!this.#t||this.#t&&this.#n?(this.#t=t._iso,this.#n=null,this.#x=null):(t._iso<this.#t?(this.#n=this.#t,this.#t=t._iso):this.#n=t._iso,this.#I([this.#t,this.#n]),this.#y==="popover"&&this.#L()),this.#c(),this.#A()}}#J(t){this.#i==="range"&&this.#t&&!this.#n&&(this.#x=t,this.#c())}#I(t){const e={value:t,date:t};this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:e})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:e}))}#Q(){this.#u||(this.#m=!this.#m,this.#D())}#L(){this.#m=!1,this.#D()}#k(t){const e=b(p(this.#l),t);this.#l=x(e),e.getMonth()!==this.#o.getMonth()||e.getFullYear()!==this.#o.getFullYear()?this.#v(e):this.#c()}#W(t){if(!this.#u)switch(t.key){case"ArrowLeft":t.preventDefault(),this.#k(-1);break;case"ArrowRight":t.preventDefault(),this.#k(1);break;case"ArrowUp":t.preventDefault(),this.#k(-7);break;case"ArrowDown":t.preventDefault(),this.#k(7);break;case"Home":t.preventDefault(),this.#v(new Date),this.#l=m,this.#c();break;case"Enter":case" ":{t.preventDefault();const e=this.#b.find(i=>i._iso===this.#l);e&&this.#T(e);break}case"Escape":this.#y==="popover"&&this.#m&&(t.preventDefault(),this.#L());break}}}customElements.define("vs-calendar-minimal",M);
