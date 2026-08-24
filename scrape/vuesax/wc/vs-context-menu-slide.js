const g="http://www.w3.org/2000/svg";function u(o){const t=document.createElementNS(g,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),o&&t.setAttribute("class",o),t}function d(o){const t=document.createElementNS(g,"path");return t.setAttribute("d",o),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t}const f=[{label:"Cut",value:"cut",shortcut:"⌘X",icon:"M5.5 10C7.433 10 9 8.433 9 6.5C9 4.567 7.433 3 5.5 3C3.567 3 2 4.567 2 6.5C2 8.433 3.567 10 5.5 10Z M5.5 21C7.433 21 9 19.433 9 17.5C9 15.567 7.433 14 5.5 14C3.567 14 2 15.567 2 17.5C2 19.433 3.567 21 5.5 21Z M22 6L8.65002 15.98 M22 17.9705L8.65002 7.98047"},{label:"Copy",value:"copy",shortcut:"⌘C",icon:"M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"},{label:"Paste",value:"paste",shortcut:"⌘V",icon:"M8 12.1992H15 M8 16.1992H12.38 M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V15.9995C21 19.9995 20 21.9995 15 21.9995H9C4 21.9995 3 19.9995 3 15.9995V9.99953C3 5.43953 4.67 4.19953 8 4.01953"},{label:"Rename",value:"rename",shortcut:"F2",divider:!0,icon:"M13.26 3.59924L5.04997 12.2892C4.73997 12.6192 4.43997 13.2692 4.37997 13.7192L4.00997 16.9592C3.87997 18.1292 4.71997 18.9292 5.87997 18.7292L9.09997 18.1792C9.54997 18.0992 10.18 17.7692 10.49 17.4292L18.7 8.73924C20.12 7.23924 20.76 5.52924 18.55 3.43924C16.35 1.36924 14.68 2.09924 13.26 3.59924Z M11.89 5.05078C12.32 7.81078 14.56 9.92078 17.34 10.2008 M3 22H21"},{label:"Delete",value:"delete",shortcut:"Del",tone:"danger",icon:"M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047 M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97 M18.85 9.14062L18.2 19.2106C18.09 20.7806 18 22.0006 15.21 22.0006H8.79002C6.00002 22.0006 5.91002 20.7806 5.80002 19.2106L5.15002 9.14062 M10.33 16.5H13.66 M9.5 12.5H14.5"}],p=(o,t,e)=>{if(!o.hasAttribute(t))return e;const i=o.getAttribute(t);return!(i==="false"||i==="0")},h=(o,t,e)=>o.getAttribute(t)??e;function x(o){let t=requestAnimationFrame(()=>{t=requestAnimationFrame(o)});return()=>cancelAnimationFrame(t)}const _=`
  :host { display: inline-block; }
  .cms {
    --fs: var(--ctrl-fs-md, 14px);
    --r: var(--ctrl-r-md, 12px);
    display: inline-block;
    color: var(--text, #ededed);
  }
  .cms--sm { --fs: var(--ctrl-fs-sm, 13px); --r: var(--ctrl-r-sm, 10px); }
  .cms--lg { --fs: var(--ctrl-fs-lg, 15px); --r: var(--ctrl-r-lg, 14px); }

  .cms__zone {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
    width: 260px; height: 150px; text-align: center; user-select: none;
    border: 1px dashed var(--border, #2a2a2a);
    border-radius: calc(var(--r) * 1.2);
    background: color-mix(in srgb, var(--bg-elevated, #161616) 40%, transparent);
    color: var(--text, #ededed);
    font-size: var(--fs);
  }
  .cms--embed .cms__zone { display: none; }
  .cms__zone-ico { width: 26px; height: 26px; opacity: 0.7; }
  .cms__zone-title { font-size: var(--fs); font-weight: 600; }
  .cms__zone-sub { font-size: 11px; opacity: 0.55; }
  .cms.is-disabled { opacity: 0.5; pointer-events: none; }
`,C=`
  .cms__panel {
    --fs: var(--ctrl-fs-md, 14px);
    --r: var(--ctrl-r-md, 12px);
    --ih: 36px;
    position: fixed; z-index: 9999; min-width: 224px;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: calc(var(--r) * 1.3);
    background: var(--bg-elevated, #161616);
    box-shadow: 0 18px 48px -18px rgba(0,0,0,0.7);
    color: var(--text, #ededed);
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
    transition: opacity 220ms ease, transform 300ms cubic-bezier(0.2,0.9,0.25,1);
    overflow: hidden;
  }
  .cms__panel.cms--sm { --fs: var(--ctrl-fs-sm, 13px); --r: var(--ctrl-r-sm, 10px); --ih: 32px; min-width: 200px; }
  .cms__panel.cms--lg { --fs: var(--ctrl-fs-lg, 15px); --r: var(--ctrl-r-lg, 14px); --ih: 40px; min-width: 256px; }
  .cms__panel.is-expanded { opacity: 1; transform: translateY(0) scale(1); }
  .cms__panel.has-glow { box-shadow: 0 18px 48px -18px rgba(0,0,0,0.7), 0 0 0 1px color-mix(in srgb, var(--ui-accent, #ededed) 22%, transparent); }

  .cms__inner { padding: 6px; overflow: hidden; }
  .cms__heading { padding: 4px 10px 6px; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; opacity: 0.5; }
  .cms__list { list-style: none; margin: 0; padding: 0; }
  .cms__divider { height: 1px; margin: 5px 8px; background: var(--border, #2a2a2a); }

  .cms__item {
    display: flex; align-items: center; gap: 10px;
    height: var(--ih); padding: 0 10px; margin: 1px 0;
    border-radius: calc(var(--r) * 0.7);
    font-size: var(--fs); text-decoration: none; color: inherit;
    cursor: pointer; user-select: none;
    opacity: 0; transform: translateX(-18px);
    transition: background 140ms ease, color 140ms ease;
  }
  .cms__panel.is-expanded .cms__item {
    animation: cms-slide 320ms cubic-bezier(0.2,0.9,0.25,1) forwards;
    animation-delay: calc(110ms + var(--i) * 46ms);
  }
  @keyframes cms-slide {
    from { opacity: 0; transform: translateX(-18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .cms__item.is-active { background: color-mix(in srgb, var(--ui-accent, #ededed) 18%, transparent); }
  .cms__item.is-disabled { opacity: 0.4 !important; cursor: not-allowed; pointer-events: none; }
  .cms__item--t-danger { color: color-mix(in srgb, var(--text, #ededed) 40%, #ff5a5a); }
  .cms__item--t-danger.is-active { background: color-mix(in srgb, #ff5a5a 18%, transparent); }
  .cms__item--t-warn.is-active { background: color-mix(in srgb, #ffb020 18%, transparent); }
  .cms__item--t-success.is-active { background: color-mix(in srgb, #33c481 18%, transparent); }

  .cms__item-icon { width: 17px; height: 17px; flex: none; opacity: 0.85; }
  .cms__item-label { flex: 1; white-space: nowrap; }
  .cms__shortcut { font-size: 11px; opacity: 0.5; }
  .cms__check { width: 15px; height: 15px; color: var(--ui-accent, #ededed); }

  @media (prefers-reduced-motion: reduce) {
    .cms__panel { transition: none; opacity: 1; transform: none; }
    .cms__item { animation: none !important; opacity: 1; transform: none; }
  }
`;let m;function y(o){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=o;const t=m.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(o,t){const e=t?y(String(t).trim()):null;if(!e){for(const a of w)o.style.removeProperty(a);return}const i=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),r=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(a=>Math.round(r?a*.92:a+(255-a)*.16)),c=(a,v)=>o.style.setProperty(a,v);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(a,n);c("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(a,r?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])c(a,r?"0 0 0":"255 255 255");c("--vs-color",n),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["size","radius","tone","disabled","glow","embed","label","value","color"];#s;#h;#l=null;#t=null;#m=null;#a=null;#i=f;#p=[];#n="";#e=-1;#r=!1;#b={x:0,y:0};#x="top left";#u=!1;#d=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=_,this.#s=document.createElement("div"),this.#s.className="cms";const i=document.createElement("slot");i.name="target",this.#h=document.createElement("div"),this.#h.className="cms__zone";const s=u("cms__zone-ico");s.append(d("M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"),d("M12 6.44V12"),d("M8.11035 8.11L12.0004 12"));const r=document.createElement("span");r.className="cms__zone-title",r.textContent="Right-click here";const n=document.createElement("span");n.className="cms__zone-sub",n.textContent="slide-in cascade",this.#h.append(s,r,n),i.appendChild(this.#h),this.#s.appendChild(i),t.append(e,this.#s),this.#s.addEventListener("contextmenu",this.#S),this.#n=this.getAttribute("value")??""}connectedCallback(){b(this,this.getAttribute("color")),this.#_()}disconnectedCallback(){this.#o(),this.#v()}attributeChangedCallback(t){if(b(this,this.getAttribute("color")),!!this.#s){if(t==="value"){this.#n=this.getAttribute("value")??"",this.#t&&this.#f();return}this.#_()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&(e=i)}catch{}this.#i=e&&e.length?e:f,this.#t&&this.#f()}get items(){return this.#i}set value(t){this.#n=t==null?"":String(t),this.#t&&this.#f()}get value(){return this.#n}get open(){return this.#r}#_(){const t=(e,i)=>h(this,e,i);this.#s.className=`cms cms--${t("size","md")} cms--t-${t("tone","default")} cms--r-${t("radius","squircle")}`+(p(this,"disabled",!1)?" is-disabled":"")+(p(this,"embed",!1)?" cms--embed":""),this.#t&&this.#y()}#k(){const t=h(this,"size","md");return t==="sm"?200:t==="lg"?256:224}#z(){const t=h(this,"size","md"),e=t==="sm"?32:t==="lg"?40:36,i=this.#i.filter(r=>r.divider).length;return 6+(h(this,"label","")?30:0)+this.#i.length*e+i*11+6}#N(t,e){const i=window.innerWidth,s=window.innerHeight,r=8,n=this.#k(),l=Math.min(this.#z(),Math.round(s*.7)),c=t+n+r>i,a=e+l+r>s;this.#b={x:c?Math.max(r,t-n):t,y:a?Math.max(r,e-l):e},this.#x=`${a?"bottom":"top"} ${c?"right":"left"}`}#C(){this.#t&&(this.#t.style.left=`${this.#b.x}px`,this.#t.style.top=`${this.#b.y}px`,this.#t.style.transformOrigin=this.#x)}#S=t=>{if(!p(this,"disabled",!1)){if(t.preventDefault(),this.#N(t.clientX,t.clientY),this.#e=-1,this.#r){this.#C(),this.#g();return}this.#H()}};#H(){this.#r=!0,this.#D(),this.#C(),document.body.appendChild(this.#l),this.#v(),this.#d=x(()=>{this.#d=null,!(!this.#r||!this.#t)&&this.#t.classList.add("is-expanded")}),this.#V(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#o(){this.#r&&(this.#r=!1,this.#e=-1,this.#Z(),this.#v(),this.#$(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}#$(){this.#l&&this.#l.remove(),this.#l=this.#t=this.#m=this.#a=null,this.#p=[]}#D(){const t=document.createElement("div"),e=t.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=C;const s=document.createElement("div");s.className="cms__panel",s.setAttribute("role","menu"),s.tabIndex=-1;const r=document.createElement("div");r.className="cms__inner";const n=document.createElement("div");n.className="cms__heading";const l=document.createElement("ul");l.className="cms__list",r.append(n,l),s.appendChild(r),e.append(i,s),this.#l=t,this.#t=s,this.#m=n,this.#a=l,this.#y(),this.#f()}#y(){if(!this.#t)return;const t=(i,s)=>h(this,i,s);this.#t.className=`cms__panel cms--${t("size","md")} cms--t-${t("tone","default")} cms--r-${t("radius","squircle")}`+(this.#t.classList.contains("is-expanded")?" is-expanded":"")+(p(this,"glow",!0)?" has-glow":"");const e=h(this,"label","");this.#m.textContent=e,this.#m.hidden=!e}#f(){this.#a&&(this.#a.replaceChildren(),this.#p=[],this.#i.forEach((t,e)=>{if(t.divider){const n=document.createElement("li");n.className="cms__divider",n.setAttribute("role","separator"),n.setAttribute("aria-hidden","true"),this.#a.appendChild(n)}const i=t.href?"a":"li",s=document.createElement(i);if(s.className="cms__item"+(t.tone?` cms__item--t-${t.tone}`:"")+(e===this.#e?" is-active":"")+(t.value===this.#n?" is-selected":"")+(t.disabled?" is-disabled":""),s.style.setProperty("--i",e),s.setAttribute("role","menuitem"),t.href&&s.setAttribute("href",t.href),t.disabled&&s.setAttribute("aria-disabled","true"),t.icon){const n=u("cms__item-icon");n.appendChild(d(t.icon)),s.appendChild(n)}const r=document.createElement("span");if(r.className="cms__item-label",r.textContent=t.label??"",s.appendChild(r),t.shortcut){const n=document.createElement("span");n.className="cms__shortcut",n.textContent=t.shortcut,s.appendChild(n)}else if(t.value===this.#n){const n=u("cms__check");n.append(d("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"),d("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),s.appendChild(n)}s.addEventListener("pointerenter",()=>{t.disabled||(this.#e=e,this.#g())}),s.addEventListener("click",()=>this.#w(e)),this.#p[e]=s,this.#a.appendChild(s)}))}#g(){this.#p.forEach((t,e)=>{t&&t.classList.toggle("is-active",e===this.#e)})}#w(t){const e=this.#i[t];!e||e.disabled||(this.#n=e.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,index:t,value:e.value}})),this.#o())}#P(){const t=[];return this.#i.forEach((e,i)=>{e.disabled||t.push(i)}),t}#E(t){const e=this.#P();if(!e.length)return;const i=e.indexOf(this.#e),s=i<0?t===1?0:e.length-1:(i+t+e.length)%e.length;this.#e=e[s],this.#g()}#A=t=>{if(this.#r){if(t.key==="Escape"||t.key==="Tab"){t.preventDefault(),this.#o();return}t.key==="ArrowDown"?(t.preventDefault(),this.#E(1)):t.key==="ArrowUp"?(t.preventDefault(),this.#E(-1)):(t.key==="Enter"||t.key===" ")&&this.#e>=0&&(t.preventDefault(),this.#w(this.#e))}};#L=t=>{(!this.#t||!this.#t.contains(t.composedPath()[0]))&&this.#o()};#M=t=>{t.composedPath().includes(this)||this.#o()};#c=()=>this.#o();#V(){this.#u||(this.#u=!0,document.addEventListener("pointerdown",this.#L,!0),document.addEventListener("contextmenu",this.#M,!0),document.addEventListener("keydown",this.#A,!0),window.addEventListener("blur",this.#c),window.addEventListener("resize",this.#c),window.addEventListener("scroll",this.#c,!0))}#Z(){this.#u&&(this.#u=!1,document.removeEventListener("pointerdown",this.#L,!0),document.removeEventListener("contextmenu",this.#M,!0),document.removeEventListener("keydown",this.#A,!0),window.removeEventListener("blur",this.#c),window.removeEventListener("resize",this.#c),window.removeEventListener("scroll",this.#c,!0))}#v(){this.#d&&(this.#d(),this.#d=null)}}customElements.define("vs-context-menu-slide",E);
