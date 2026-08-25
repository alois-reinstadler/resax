const p=(c,t,e)=>{if(!c.hasAttribute(t))return e;const s=c.getAttribute(t);return!(s==="false"||s==="0")},l=(c,t,e)=>c.getAttribute(t)??e,f="http://www.w3.org/2000/svg";function u(c,t){const e=document.createElementNS(f,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),c&&e.setAttribute("class",c);for(const s of t){const i=document.createElementNS(f,"path");i.setAttribute("d",s),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i)}return e}const g=()=>u("cmr__zone-ico",["M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z","M12 6.44V12","M8.11035 8.11L12.0004 12"]),v=()=>u("cmr__check",["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z","M7.75 11.9999L10.58 14.8299L16.25 9.16992"]),x=c=>u("cmr__item-icon",[c]),_=[{label:"Cut",value:"cut",shortcut:"⌘X",icon:"M5.5 10C7.433 10 9 8.433 9 6.5C9 4.567 7.433 3 5.5 3C3.567 3 2 4.567 2 6.5C2 8.433 3.567 10 5.5 10Z M5.5 21C7.433 21 9 19.433 9 17.5C9 15.567 7.433 14 5.5 14C3.567 14 2 15.567 2 17.5C2 19.433 3.567 21 5.5 21Z M22 6L8.65002 15.98 M22 17.9705L8.65002 7.98047"},{label:"Copy",value:"copy",shortcut:"⌘C",icon:"M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"},{label:"Paste",value:"paste",shortcut:"⌘V",icon:"M8 12.1992H15 M8 16.1992H12.38 M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z M16 4.01953C19.33 4.19953 21 5.42953 21 9.99953V15.9995C21 19.9995 20 21.9995 15 21.9995H9C4 21.9995 3 19.9995 3 15.9995V9.99953C3 5.43953 4.67 4.19953 8 4.01953"},{label:"Rename",value:"rename",shortcut:"F2",divider:!0,icon:"M13.26 3.59924L5.04997 12.2892C4.73997 12.6192 4.43997 13.2692 4.37997 13.7192L4.00997 16.9592C3.87997 18.1292 4.71997 18.9292 5.87997 18.7292L9.09997 18.1792C9.54997 18.0992 10.18 17.7692 10.49 17.4292L18.7 8.73924C20.12 7.23924 20.76 5.52924 18.55 3.43924C16.35 1.36924 14.68 2.09924 13.26 3.59924Z M11.89 5.05078C12.32 7.81078 14.56 9.92078 17.34 10.2008 M3 22H21"},{label:"Delete",value:"delete",shortcut:"Del",tone:"danger",icon:"M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047 M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97 M18.85 9.14062L18.2 19.2106C18.09 20.7806 18 22.0006 15.21 22.0006H8.79002C6.00002 22.0006 5.91002 20.7806 5.80002 19.2106L5.15002 9.14062 M10.33 16.5H13.66 M9.5 12.5H14.5"}],y=`
  :host { display: inline-block; }
  .cmr {
    --fs: var(--ctrl-fs-md, 14px);
    --r: var(--ctrl-r-md, 12px);
    display: inline-block;
    color: var(--text, #ededed);
  }
  .cmr--sm { --fs: var(--ctrl-fs-sm, 13px); --r: var(--ctrl-r-sm, 10px); }
  .cmr--lg { --fs: var(--ctrl-fs-lg, 15px); --r: var(--ctrl-r-lg, 14px); }
  .cmr__zone {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
    width: 260px; height: 150px; text-align: center; user-select: none;
    border: 1px dashed var(--border, #2a2a2a);
    border-radius: calc(var(--r) * 1.2);
    background: color-mix(in srgb, var(--bg-elevated, #161616) 40%, transparent);
    color: var(--text, #ededed);
  }
  .cmr--embed .cmr__zone { display: none; }
  .cmr__zone-ico { width: 26px; height: 26px; opacity: 0.7; }
  .cmr__zone-title { font-size: var(--fs); font-weight: 600; }
  .cmr__zone-sub { font-size: 11px; opacity: 0.55; }
  .cmr.is-disabled { opacity: 0.5; pointer-events: none; }
`,C=`
  .cmr--sm { --fs: var(--ctrl-fs-sm, 13px); --r: var(--ctrl-r-sm, 10px); --ih: 32px; }
  .cmr--lg { --fs: var(--ctrl-fs-lg, 15px); --r: var(--ctrl-r-lg, 14px); --ih: 40px; }
  .cmr__panel {
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
    /* iris starts as a tiny circle at the cursor corner; grows to cover the panel */
    clip-path: circle(0% at var(--iris, 0% 0%));
    transition: opacity 140ms ease, clip-path 460ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cmr--sm .cmr__panel { min-width: 200px; }
  .cmr--lg .cmr__panel { min-width: 256px; }
  .cmr__panel.is-expanded { opacity: 1; clip-path: circle(150% at var(--iris, 0% 0%)); }
  .cmr__panel.has-glow { box-shadow: 0 18px 48px -18px rgba(0,0,0,0.7), 0 0 0 1px color-mix(in srgb, var(--ui-accent, #ededed) 22%, transparent); }

  .cmr__inner { padding: 6px; }
  .cmr__heading { padding: 4px 10px 6px; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase; opacity: 0.5; }
  .cmr__list { list-style: none; margin: 0; padding: 0; }
  .cmr__divider { height: 1px; margin: 5px 8px; background: var(--border, #2a2a2a); }

  .cmr__item {
    display: flex; align-items: center; gap: 10px;
    height: var(--ih); padding: 0 10px; margin: 1px 0;
    border-radius: calc(var(--r) * 0.7);
    font-size: var(--fs); text-decoration: none; color: inherit;
    cursor: pointer; user-select: none;
    opacity: 0; transform: scale(0.85);
    transition: background 140ms ease, color 140ms ease;
  }
  .cmr__panel.is-expanded .cmr__item {
    animation: cmr-pop 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(160ms + var(--i) * 50ms);
  }
  @keyframes cmr-pop {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  .cmr__item.is-active { background: color-mix(in srgb, var(--ui-accent, #ededed) 18%, transparent); }
  .cmr__item.is-disabled { opacity: 0.4 !important; cursor: not-allowed; pointer-events: none; }
  .cmr__item--t-danger { color: color-mix(in srgb, var(--text, #ededed) 40%, #ff5a5a); }
  .cmr__item--t-danger.is-active { background: color-mix(in srgb, #ff5a5a 18%, transparent); }
  .cmr__item--t-warn.is-active { background: color-mix(in srgb, #ffb020 18%, transparent); }
  .cmr__item--t-success.is-active { background: color-mix(in srgb, #33c481 18%, transparent); }

  .cmr__item-icon { width: 17px; height: 17px; flex: none; opacity: 0.85; }
  .cmr__item-label { flex: 1; white-space: nowrap; }
  .cmr__shortcut { font-size: 11px; opacity: 0.5; }
  .cmr__check { width: 15px; height: 15px; color: var(--ui-accent, #ededed); }

  @media (prefers-reduced-motion: reduce) {
    .cmr__panel { transition: none; opacity: 1; clip-path: none; }
    .cmr__item { animation: none !important; opacity: 1; transform: none; }
  }
`;let m;function w(c){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=c;const t=m.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(c,t){const e=t?w(String(t).trim()):null;if(!e){for(const r of E)c.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),d=(r,h)=>c.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(r,o);d("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])d(r,n?"0 0 0":"255 255 255");d("--vs-color",o),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["size","radius","tone","disabled","glow","embed","label","items","value","color"];#r;#t=null;#l=null;#s=null;#n=null;#d=[];#h=null;#o="";#e=!1;#m=!1;#i=-1;#b={x:0,y:0};#v="top left";#x="0% 0%";#p=!1;#u=[];constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=y,this.#r=document.createElement("div"),this.#r.className="cmr",this.#r.addEventListener("contextmenu",a=>this.#H(a));const s=document.createElement("slot");s.name="target";const i=document.createElement("div");i.className="cmr__zone",i.appendChild(g());const n=document.createElement("span");n.className="cmr__zone-title",n.textContent="Right-click here";const o=document.createElement("span");o.className="cmr__zone-sub",o.textContent="radial iris reveal",i.append(n,o),s.appendChild(i),this.#r.appendChild(s),t.append(e,this.#r)}connectedCallback(){b(this,this.getAttribute("color")),this.#o=l(this,"value",""),this.#z()}disconnectedCallback(){this.#a()}attributeChangedCallback(t){if(b(this,this.getAttribute("color")),!!this.#r&&(this.#z(),t==="value"&&(this.#o=l(this,"value","")),!!this.#e)){if(t==="items"||t==="value"){this.#f();return}(t==="label"||t==="size"||t==="tone"||t==="radius"||t==="glow")&&this.#k()}}get items(){return this.#g()}set items(t){typeof t=="string"?this.#h=this.#_(t):this.#h=Array.isArray(t)&&t.length?t:null,this.#e&&this.#f()}get value(){return this.#o}set value(t){this.#o=t==null?"":String(t),this.#e&&this.#f()}#_(t){if(!t||!t.trim())return null;try{const e=JSON.parse(t);return Array.isArray(e)&&e.length?e:null}catch{return null}}#g(){return Array.isArray(this.#h)&&this.#h.length?this.#h:this.#_(this.getAttribute("items"))||_}#S(){const t=l(this,"size","md");return t==="sm"?200:t==="lg"?256:224}#$(t){const e=l(this,"size","md"),s=e==="sm"?32:e==="lg"?40:36,i=t.filter(o=>o.divider).length;return 6+(l(this,"label","")?30:0)+t.length*s+i*11+6}#N(t,e,s){const i=window.innerWidth,n=window.innerHeight,o=8,a=this.#S(),d=Math.min(this.#$(s),Math.round(n*.7)),r=t+a+o>i,h=e+d+o>n;this.#b={x:r?Math.max(o,t-a):t,y:h?Math.max(o,e-d):e},this.#v=`${h?"bottom":"top"} ${r?"right":"left"}`,this.#x=`${r?100:0}% ${h?100:0}%`}#y(){this.#t&&(this.#t.style.left=`${this.#b.x}px`,this.#t.style.top=`${this.#b.y}px`,this.#t.style.transformOrigin=this.#v,this.#t.style.setProperty("--iris",this.#x))}#H(t){if(p(this,"disabled",!1))return;t.preventDefault();const e=this.#g();if(this.#N(t.clientX,t.clientY,e),this.#i=-1,this.#e){this.#y();return}this.#e=!0,this.#m=!1,this.#u=e,this.#Z(),document.body.appendChild(this.#t),this.#y(),this.#t.offsetWidth,requestAnimationFrame(()=>requestAnimationFrame(()=>{this.#e&&(this.#m=!0,this.#t.classList.add("is-expanded"))})),this.#I(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#a(){this.#e&&(this.#e=!1,this.#m=!1,this.#i=-1,this.#P(),this.#t&&(this.#t.remove(),this.#t=null),this.#l=this.#s=this.#n=null,this.#d=[],this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}#D(t){return!!(this.#t&&this.#t.contains(t))}#C=t=>{this.#D(t.target)||this.#a()};#w=t=>{this.contains(t.target)||this.#a()};#E=t=>{if(this.#e){if(t.key==="Escape"||t.key==="Tab"){t.preventDefault(),this.#a();return}if(t.key==="ArrowDown")t.preventDefault(),this.#A(1);else if(t.key==="ArrowUp")t.preventDefault(),this.#A(-1);else if(t.key==="Enter"&&this.#i>=0){t.preventDefault();const e=this.#u[this.#i];e&&this.#M(e)}}};#c=()=>this.#a();#I(){this.#p||(this.#p=!0,document.addEventListener("pointerdown",this.#C,!0),document.addEventListener("contextmenu",this.#w,!0),document.addEventListener("keydown",this.#E,!0),window.addEventListener("blur",this.#c),window.addEventListener("resize",this.#c),window.addEventListener("scroll",this.#c,!0))}#P(){this.#p&&(this.#p=!1,document.removeEventListener("pointerdown",this.#C,!0),document.removeEventListener("contextmenu",this.#w,!0),document.removeEventListener("keydown",this.#E,!0),window.removeEventListener("blur",this.#c),window.removeEventListener("resize",this.#c),window.removeEventListener("scroll",this.#c,!0))}#V(){const t=[];return this.#u.forEach((e,s)=>{e.disabled||t.push(s)}),t}#A(t){const e=this.#V();if(!e.length)return;const s=e.indexOf(this.#i),i=s<0?t===1?0:e.length-1:(s+t+e.length)%e.length;this.#i=e[i],this.#L()}#L(){for(let t=0;t<this.#d.length;t++)this.#d[t].classList.toggle("is-active",t===this.#i)}#M(t){t.disabled||(this.#o=t.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t,value:t.value}})),this.#a())}#Z(){const t=document.createElement("div");t.setAttribute("role","menu");const e=t.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=C,this.#l=document.createElement("div"),this.#l.className="cmr__inner",this.#s=document.createElement("div"),this.#s.className="cmr__heading",this.#n=document.createElement("ul"),this.#n.className="cmr__list",this.#l.append(this.#s,this.#n),e.append(s,this.#l),this.#t=t,this.#k(),this.#f()}#k(){if(!this.#t)return;const t=l(this,"size","md"),e=l(this,"tone","default"),s=l(this,"radius","squircle"),i=p(this,"glow",!0),n=l(this,"label","");this.#t.className=`cmr__panel cmr--${t} cmr--t-${e} cmr--r-${s}${i?" has-glow":""}${this.#m?" is-expanded":""}`,n?(this.#s.textContent=n,this.#s.style.display=""):(this.#s.textContent="",this.#s.style.display="none")}#f(){if(!this.#t)return;const t=this.#g();this.#u=t,this.#d=[],this.#n.textContent="",t.forEach((e,s)=>{if(e.divider){const a=document.createElement("li");a.className="cmr__divider",a.setAttribute("role","separator"),a.setAttribute("aria-hidden","true"),this.#n.appendChild(a)}const i=document.createElement(e.href?"a":"li");e.href&&(i.href=e.href);const n=["cmr__item"];e.tone&&n.push(`cmr__item--t-${e.tone}`),s===this.#i&&n.push("is-active"),e.value===this.#o&&n.push("is-selected"),e.disabled&&n.push("is-disabled"),i.className=n.join(" "),i.style.setProperty("--i",String(s)),i.setAttribute("role","menuitem"),e.disabled&&i.setAttribute("aria-disabled","true"),i.addEventListener("pointerenter",()=>{this.#i=s,this.#L()}),i.addEventListener("click",()=>this.#M(e)),e.icon&&i.appendChild(x(e.icon));const o=document.createElement("span");if(o.className="cmr__item-label",o.textContent=e.label,i.appendChild(o),e.shortcut){const a=document.createElement("span");a.className="cmr__shortcut",a.textContent=e.shortcut,i.appendChild(a)}else e.value===this.#o&&i.appendChild(v());this.#d.push(i),this.#n.appendChild(i)})}#z(){const t=l(this,"size","md"),e=l(this,"tone","default"),s=l(this,"radius","squircle"),i=p(this,"disabled",!1),n=p(this,"embed",!1),o=["cmr",`cmr--${t}`,`cmr--t-${e}`,`cmr--r-${s}`];i&&o.push("is-disabled"),n&&o.push("cmr--embed"),this.#r.className=o.join(" ")}}customElements.define("vs-context-menu-radial",A);
