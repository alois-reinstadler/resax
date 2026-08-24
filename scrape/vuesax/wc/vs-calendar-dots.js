const k=o=>String(o).padStart(2,"0");function w(o){return`${o.getFullYear()}-${k(o.getMonth()+1)}-${k(o.getDate())}`}function c(o){const[t,e,i]=String(o).split("T")[0].split("-").map(Number);return!Number.isFinite(t)||!Number.isFinite(e)||!Number.isFinite(i)||e<1||e>12||i<1||i>31?new Date:new Date(t,e-1,i)}function f(o){return new Date(o.getFullYear(),o.getMonth(),1)}function m(o,t){return new Date(o.getFullYear(),o.getMonth(),o.getDate()+t)}function A(o,t){return new Date(o.getFullYear(),o.getMonth()+t,1)}const g=w(new Date),E="http://www.w3.org/2000/svg";function x(o,t){const e=document.createElementNS(E,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),t&&e.setAttribute("class",t);for(const i of o){const s=document.createElementNS(E,"path");s.setAttribute("d",i),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-miterlimit","10"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),e.appendChild(s)}return e}const D=["M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"],S=["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"],N=`
  :host { display: inline-flex; }
  .dot-root {
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
  .dot--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --rr: var(--ctrl-r-sm, 10px); --cell: 32px; --day-r: 10px; }
  .dot--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); --rr: var(--ctrl-r-md, 12px); --cell: 38px; --day-r: 12px; }
  .dot--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --rr: var(--ctrl-r-lg, 14px); --cell: 44px; --day-r: 14px; }
  .dot--r-none { --rr: 0px; --day-r: 6px; }
  .dot--r-subtle { --rr: 8px; --day-r: 8px; }
  .dot--r-rounded { --rr: 14px; --day-r: 11px; }
  .dot--r-pill { --rr: 20px; --day-r: 999px; }
  .dot--r-squircle { --rr: var(--ctrl-r-md, 12px); --day-r: 12px; }

  .dot-input {
    display: inline-flex; align-items: center; gap: 9px;
    width: 100%; min-width: 200px; height: var(--h); padding: 0 var(--px);
    border-radius: var(--rr); border: 1px solid var(--inp-border, #2a2a2a);
    background: var(--inp-bg, transparent); color: var(--inp-text, #ededed);
    font: inherit; font-weight: 500; cursor: pointer; white-space: nowrap;
    -webkit-tap-highlight-color: transparent; transition: border-color 200ms ease;
  }
  .dot-input:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .dot-input__icon { width: 15px; height: 15px; flex: none; color: var(--inp-prefix, #7a7a7a); }
  .dot-input__value { overflow: hidden; text-overflow: ellipsis; }
  .dot-input__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }

  .dot-panel {
    position: relative; padding: 12px; border-radius: var(--rr);
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--bg-card, #111);
  }
  .dot-panel--float {
    position: absolute; top: calc(var(--h) + 8px); left: 0; z-index: 40;
    box-shadow: var(--sel-menu-shadow, 0 12px 40px rgba(0, 0, 0, 0.5));
    animation: dot-pop-in 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .dot-panel[hidden] { display: none; }
  @keyframes dot-pop-in { from { opacity: 0; transform: translateY(-8px) scale(0.97); } to { opacity: 1; transform: none; } }

  .dot-head { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 8px; }
  .dot-nav {
    display: inline-flex; align-items: center; justify-content: center;
    width: 30px; height: 30px; flex: none; border: 0; border-radius: 9px;
    background: transparent; color: var(--text-muted, #666); cursor: pointer;
    transition: color 140ms ease, background-color 140ms ease;
  }
  .dot-nav svg { width: 16px; height: 16px; }
  .dot-nav:hover:not(:disabled) { color: var(--text, #ededed); background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }
  .dot-title {
    flex: 1; height: 30px; border: 0; background: transparent; font: inherit;
    font-weight: 600; text-transform: capitalize; letter-spacing: -0.01em;
    color: var(--text, #ededed); cursor: pointer; text-align: center;
  }

  .dot-week { display: grid; grid-template-columns: repeat(7, var(--cell)); margin-bottom: 2px; }
  .dot-week__cell {
    display: grid; place-items: center; height: 28px; font-size: 11px; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted, #666);
  }

  .dot-grid { position: relative; display: flex; flex-direction: column; outline: none; }
  .dot-row { display: grid; grid-template-columns: repeat(7, var(--cell)); grid-auto-rows: var(--cell); }

  .dot-day {
    position: relative; display: inline-flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 1px;
    width: var(--cell); height: var(--cell); border: 0; border-radius: var(--day-r);
    background: transparent; color: var(--text, #ededed); font: inherit;
    font-size: calc(var(--fs) - 1px); font-variant-numeric: tabular-nums; cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 160ms ease, color 160ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .dot-day__n { position: relative; z-index: 1; line-height: 1; }
  .dot-day:hover:not(:disabled) { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }
  .dot-day:active:not(:disabled) { transform: scale(0.9); }
  .dot-day.is-out { opacity: 0.3; }
  .dot-day.is-disabled { opacity: 0.22; cursor: not-allowed; }
  .dot-day.is-today .dot-day__n { font-weight: 700; }

  /* SIGNATURE EFFECT: dot marker below the number, spring-scales in on selection */
  .dot-day__dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--ui-accent, #ededed);
    transform: scale(0);
    transition: transform 260ms cubic-bezier(0.34, 1.8, 0.36, 1);
  }
  .dot-day.selected { color: var(--ui-accent, #ededed); font-weight: 700; }
  .dot-day.selected .dot-day__dot { transform: scale(1); }
  /* today (unselected) shows a muted dot outline */
  .dot-day.is-today:not(.selected) .dot-day__dot { transform: scale(1); background: var(--text-muted, #666); }

  /* per-day EVENT INDICATORS — driven by the events data property */
  .dot-day__events { position: absolute; left: 0; right: 0; bottom: 3px; display: flex; gap: 2px; justify-content: center; pointer-events: none; }
  .dot-ev { width: 4px; height: 4px; border-radius: 50%; background: var(--ui-accent, #ededed); transform: scale(0); animation: dot-ev-pop 280ms cubic-bezier(0.34, 1.8, 0.36, 1) forwards; }
  @keyframes dot-ev-pop { to { transform: scale(1); } }

  /* range middle — soft veil, no dots between the ends */
  .dot-day.inRange { background: color-mix(in srgb, var(--ui-accent, #ededed) 12%, transparent); border-radius: 0; }

  .dot-grid:focus-visible .dot-day.is-focus { box-shadow: inset 0 0 0 1.5px var(--ui-accent, #ededed); }

  .is-disabled .dot-day { cursor: not-allowed; }
  .dot-root.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .dot-day, .dot-nav, .dot-day__dot, .dot-ev, .dot-panel--float { transition: none; animation: none; }
  }
`;let u;function M(o){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=o;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const L=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function C(o,t){const e=t?M(String(t).trim()):null;if(!e){for(const r of L)o.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,n=e.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),d=(r,h)=>o.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(r,l);d("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])d(r,a?"0 0 0":"255 255 255");d("--vs-color",l),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class I extends HTMLElement{static observedAttributes=["value","mode","display","size","radius","week-start","locale","min","max","placeholder","disabled","color"];#h="";#e=[];#t=null;#s=null;#p=null;#n=f(new Date);#f=g;#l=!1;#_=new Map;#j="";#g=!1;#b=!1;#v;#o;#y;#c;#u;#M=[];#r;#D=new Map;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){C(this,this.getAttribute("color")),this.#g||this.#B(),this.#F(),this.#n=this.#V(),this.#i(),document.addEventListener("pointerdown",this.#$,!0)}disconnectedCallback(){document.removeEventListener("pointerdown",this.#$,!0)}attributeChangedCallback(){C(this,this.getAttribute("color")),!(this.#b||!this.#g)&&(this.#F(),this.#i())}get value(){return this.#d()==="single"?this.#h:this.#d()==="multiple"?[...this.#e]:this.#t?[this.#t,this.#s].filter(Boolean):[]}set value(t){typeof t=="string"?(this.#b=!0,this.setAttribute("value",t),this.#b=!1,this.#S(t)):this.#S(t),this.#g&&(this.#n=this.#V(),this.#i())}get events(){return this.#_}set events(t){const e=new Map;if(Array.isArray(t))for(const i of t)typeof i=="string"?(e.get(i)||e.set(i,[]).get(i)).push("var(--ui-accent, #ededed)"):i&&i.date&&(e.get(i.date)||e.set(i.date,[]).get(i.date)).push(i.color||"var(--ui-accent, #ededed)");else if(t&&typeof t=="object")for(const i of Object.keys(t)){const s=t[i];Array.isArray(s)?e.set(i,s.slice(0,3)):typeof s=="number"?e.set(i,Array(Math.min(3,s)).fill("var(--ui-accent, #ededed)")):s&&e.set(i,["var(--ui-accent, #ededed)"])}this.#_=e,this.#g&&this.#A()}#a(t,e){return this.getAttribute(t)??e}#d(){return this.#a("mode","multiple")}#x(){return this.#a("display","inline")}#k(){return this.#a("locale","en-US")}#P(){return this.#a("week-start","mon")==="sun"?0:1}#L(){return this.#a("min","")}#I(){return this.#a("max","")}#m(){return this.hasAttribute("disabled")}#F(){this.#S(this.parseAttrValue())}parseAttrValue(){const t=this.getAttribute("value");if(t!=null)return this.#d()==="single"?t:t.split(",").map(e=>e.trim()).filter(Boolean)}#S(t){if(t!=null)if(this.#d()==="single")this.#h=typeof t=="string"?t:t[0]??"";else if(this.#d()==="multiple")this.#e=Array.isArray(t)?[...t]:t?[t]:[];else{const e=Array.isArray(t)?t:[t];this.#t=e[0]??null,this.#s=e[1]??null}}#V(){const t=this.#h||this.#t||this.#e[0]||g;return f(c(t))}#B(){this.#g=!0;const t=document.createElement("style");t.textContent=N,this.#v=document.createElement("div"),this.#v.className="dot-root",this.#o=document.createElement("button"),this.#o.type="button",this.#o.className="dot-input",this.#o.setAttribute("aria-haspopup","dialog");const e=x(["M8 2V5","M16 2V5","M3.5 9.08984H20.5","M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"],"dot-input__icon");this.#y=document.createElement("span"),this.#y.className="dot-input__value",this.#o.append(e,this.#y),this.#o.addEventListener("click",()=>this.#X()),this.#c=document.createElement("div"),this.#c.className="dot-panel",this.#c.setAttribute("role","dialog"),this.#c.setAttribute("aria-label","Choose date");const i=document.createElement("div");i.className="dot-head";const s=document.createElement("button");s.type="button",s.className="dot-nav",s.setAttribute("aria-label","Previous month"),s.appendChild(x(D)),s.addEventListener("click",()=>this.#q()),this.#u=document.createElement("button"),this.#u.type="button",this.#u.className="dot-title",this.#u.title="Go to today",this.#u.addEventListener("click",()=>this.#R());const a=document.createElement("button");a.type="button",a.className="dot-nav",a.setAttribute("aria-label","Next month"),a.appendChild(x(S)),a.addEventListener("click",()=>this.#K()),i.append(s,this.#u,a);const l=document.createElement("div");l.className="dot-week",l.setAttribute("aria-hidden","true");for(let n=0;n<7;n++){const d=document.createElement("span");d.className="dot-week__cell",l.appendChild(d),this.#M.push(d)}this.#r=document.createElement("div"),this.#r.className="dot-grid",this.#r.setAttribute("role","grid"),this.#r.tabIndex=0,this.#r.addEventListener("keydown",n=>this.#W(n)),this.#r.addEventListener("pointerleave",()=>{this.#p!=null&&(this.#p=null,this.#A())}),this.#r.addEventListener("click",n=>{const d=n.target.closest(".dot-day");d&&this.#z(d.dataset.iso)}),this.#r.addEventListener("pointerover",n=>{const d=n.target.closest(".dot-day");d&&this.#Z(d.dataset.iso)}),this.#c.append(i,l,this.#r),this.#v.append(this.#o,this.#c),this.shadowRoot.append(t,this.#v)}#i(){this.#v.className=`dot-root dot--${this.#a("size","md")} dot--r-${this.#a("radius","squircle")}`+(this.#m()?" is-disabled":"");const t=this.#x()==="popover";this.#o.style.display=t?"":"none",this.#o.disabled=this.#m(),this.#o.setAttribute("aria-expanded",String(this.#l)),this.#y.textContent=this.#O()||this.#a("placeholder","Pick dates"),this.#y.classList.toggle("is-placeholder",!this.#O()),this.#c.classList.toggle("dot-panel--float",t),this.#c.hidden=t&&!this.#l,this.#u.textContent=new Intl.DateTimeFormat(this.#k(),{month:"long",year:"numeric"}).format(this.#n);const e=this.#T(),i=new Intl.DateTimeFormat(this.#k(),{weekday:"short"});for(let s=0;s<7;s++)this.#M[s].textContent=i.format(m(e,s));this.#A()}#T(){const t=f(this.#n),e=(t.getDay()-this.#P()+7)%7;return m(t,-e)}#Y(t){return!!(this.#L()&&t<this.#L()||this.#I()&&t>this.#I())}#H(){const t=new Intl.DateTimeFormat(this.#k(),{dateStyle:"full"}),e=this.#T(),i=this.#n.getMonth(),s=[];for(let a=0;a<42;a++){const l=m(e,a),n=w(l),d=this.#Y(n);s.push({date:l,iso:n,day:l.getDate(),inMonth:l.getMonth()===i,today:n===g,disabled:d,label:t.format(l)+(d?", unavailable":"")})}return s}#G(){const t=this.#t,e=this.#s??(t&&!this.#s?this.#p:null);return!t||!e?null:t<=e?[t,e]:[e,t]}#U(t){const e=this.#d();if(e==="single")return{selected:t.iso===this.#h,inRange:!1};if(e==="multiple")return{selected:this.#e.includes(t.iso),inRange:!1};const i=this.#G(),s=t.iso===this.#t;if(!i)return{selected:s,inRange:!1};const[a,l]=i;return{selected:t.iso===a||t.iso===l,inRange:t.iso>a&&t.iso<l}}#A(){if(!this.#r)return;const t=this.#m(),e=this.#H();this.#D.clear();const i=document.createDocumentFragment();for(let s=0;s<6;s++){const a=document.createElement("div");a.className="dot-row",a.setAttribute("role","row");for(let l=0;l<7;l++){const n=e[s*7+l];this.#D.set(n.iso,n);const d=this.#U(n),r=document.createElement("button");r.type="button",r.className="dot-day",r.setAttribute("role","gridcell"),d.selected&&r.classList.add("selected"),d.inRange&&r.classList.add("inRange"),n.inMonth||r.classList.add("is-out"),n.today&&r.classList.add("is-today"),n.disabled&&r.classList.add("is-disabled"),n.iso===this.#f&&r.classList.add("is-focus"),r.disabled=t||n.disabled,r.tabIndex=-1,r.dataset.iso=n.iso,r.setAttribute("aria-label",n.label),r.setAttribute("aria-selected",String(d.selected)),n.today&&r.setAttribute("aria-current","date");const h=document.createElement("span");h.className="dot-day__n",h.textContent=String(n.day);const b=document.createElement("span");b.className="dot-day__dot",b.setAttribute("aria-hidden","true"),r.append(h,b);const v=this.#_.get(n.iso);if(v&&v.length){const p=document.createElement("span");p.className="dot-day__events",p.setAttribute("aria-hidden","true");for(const _ of v.slice(0,3)){const y=document.createElement("span");y.className="dot-ev",y.style.background=_,p.appendChild(y)}r.appendChild(p)}a.appendChild(r)}i.appendChild(a)}this.#r.replaceChildren(i)}#w(t){this.#n=f(t)}#q(){this.#w(A(this.#n,-1)),this.#i()}#K(){this.#w(A(this.#n,1)),this.#i()}#R(){this.#w(new Date),this.#f=g,this.#i()}#X(){this.#m()||(this.#l=!this.#l,this.#i())}#E(){this.#l&&(this.#l=!1,this.#i())}#$=t=>{this.#x()==="popover"&&this.#l&&!this.contains(t.target)&&this.#E()};#Z(t){this.#d()==="range"&&this.#t&&!this.#s&&this.#p!==t&&(this.#p=t,this.#A())}#z(t){const e=this.#D.get(t);e&&this.#J(e)}#J(t){if(this.#m()||t.disabled)return;t.inMonth||this.#w(t.date),this.#f=t.iso,this.#j=t.iso;const e=this.#d();if(e==="single"){this.#h=t.iso,this.#Q(t.iso),this.#N(t.iso,t.iso),this.#x()==="popover"?this.#E():this.#i();return}if(e==="multiple"){this.#e.indexOf(t.iso)>=0?this.#e=this.#e.filter(s=>s!==t.iso):this.#e=[...this.#e,t.iso].sort(),this.#N([...this.#e],t.iso),this.#i();return}!this.#t||this.#t&&this.#s?(this.#t=t.iso,this.#s=null,this.#p=null,this.#i()):(t.iso<this.#t?(this.#s=this.#t,this.#t=t.iso):this.#s=t.iso,this.#N([this.#t,this.#s],t.iso),this.#x()==="popover"?this.#E():this.#i())}#Q(t){this.#b=!0,this.setAttribute("value",t),this.#b=!1}#N(t,e){const i={value:t,date:e};this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:i})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{date:e}}))}#C(t){const e=m(c(this.#f),t);this.#f=w(e),(e.getMonth()!==this.#n.getMonth()||e.getFullYear()!==this.#n.getFullYear())&&this.#w(e),this.#i()}#W(t){if(!this.#m())switch(t.key){case"ArrowLeft":t.preventDefault(),this.#C(-1);break;case"ArrowRight":t.preventDefault(),this.#C(1);break;case"ArrowUp":t.preventDefault(),this.#C(-7);break;case"ArrowDown":t.preventDefault(),this.#C(7);break;case"Home":t.preventDefault(),this.#R();break;case"Enter":case" ":{t.preventDefault(),this.#z(this.#f);break}case"Escape":this.#x()==="popover"&&this.#l&&(t.preventDefault(),this.#E());break}}#O(){const t=new Intl.DateTimeFormat(this.#k(),{dateStyle:"medium"}),e=this.#d();if(e==="single")return this.#h?t.format(c(this.#h)):"";if(e==="multiple")return this.#e.length?this.#e.length<=2?this.#e.map(a=>t.format(c(a))).join(", "):`${this.#e.length} dates`:"";if(!this.#t)return"";const i=t.format(c(this.#t)),s=this.#s?t.format(c(this.#s)):"…";return`${i} – ${s}`}}customElements.define("vs-calendar-dots",I);
