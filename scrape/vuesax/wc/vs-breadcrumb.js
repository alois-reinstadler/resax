function y(){const p="http://www.w3.org/2000/svg",t=document.createElementNS(p,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none");const e=document.createElementNS(p,"path");return e.setAttribute("d","M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-miterlimit","10"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t.appendChild(e),t}const g=[{label:"Home"},{label:"Breadcrumb"}],_=120,w=`
  :host { display: inline-flex; max-width: 100%; }
  .bc {
    --fs: var(--ctrl-fs-md, 14px);
    --gap: 8px;
    --sep-size: 16px;
    --glow-rgb: var(--fx-tint, 255 255 255);
    --drop-rgb: 10 10 10;
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .bc--sm { --fs: var(--ctrl-fs-sm, 13px); --gap: 6px; --sep-size: 14px; }
  .bc--md { --fs: var(--ctrl-fs-md, 14px); --gap: 8px; --sep-size: 16px; }
  .bc--lg { --fs: var(--ctrl-fs-lg, 15px); --gap: 10px; --sep-size: 18px; }

  .bc__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 var(--gap);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .bc__item {
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
  }

  .bc__crumb,
  .bc__sep {
    --lit: 0;
    --mx: 50%;
    --my: 50%;
  }

  .bc__crumb {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--text-muted, #8a8a8a);
    transform-origin: center;
    transition: transform 620ms linear(
      0, 0.013 1.2%, 0.05 2.5%, 0.193 5.1%, 0.704 12.3%, 0.9 15.6%, 1.04 19.1%,
      1.106 21.6%, 1.143 24.3%, 1.15 26%, 1.14 28.1%, 1.07 33%, 1.013 38.2%,
      0.984 43.9%, 0.977 50%, 0.986 60%, 1.003 75%, 1
    );
  }
  .bc__crumb.is-pressing {
    transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .bc__crumb.is-current { cursor: default; }
  .bc__crumb.is-current .bc__text {
    background: none;
    -webkit-text-fill-color: var(--text, #ededed);
    color: var(--text, #ededed);
  }
  .bc__crumb.is-disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  .bc__text {
    position: relative;
    display: inline-block;
    background: radial-gradient(
      140px circle at var(--mx, 50%) var(--my, 50%),
      var(--text, #ededed),
      var(--text, #ededed) 25%,
      var(--text-muted, #8a8a8a) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @property --bc-r {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }
  .bc__drop {
    position: absolute;
    inset: 0;
    pointer-events: none;
    white-space: nowrap;
    --d2: calc(var(--bc-r) * 0.52);
    background:
      radial-gradient(
        circle at var(--rx, 50%) var(--ry, 50%),
        transparent calc(var(--bc-r) - 17px),
        rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--bc-r) - 13px),
        rgb(var(--drop-rgb, 10 10 10) / 0.55) calc(var(--bc-r) - 6px),
        rgb(var(--drop-rgb, 10 10 10) / 0.98) calc(var(--bc-r) - 1px),
        rgb(var(--drop-rgb, 10 10 10) / 0.62) calc(var(--bc-r) + 4px),
        rgb(var(--drop-rgb, 10 10 10) / 0.14) calc(var(--bc-r) + 11px),
        transparent calc(var(--bc-r) + 16px)
      ),
      radial-gradient(
        circle at var(--rx, 50%) var(--ry, 50%),
        transparent calc(var(--d2) - 12px),
        rgb(var(--drop-rgb, 10 10 10) / 0.30) calc(var(--d2) - 5px),
        rgb(var(--drop-rgb, 10 10 10) / 0.55) var(--d2),
        rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--d2) + 7px),
        transparent calc(var(--d2) + 12px)
      );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: bc-drop 1820ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes bc-drop {
    0%   { --bc-r: 0px; opacity: 0.4; }
    12%  { opacity: 1; }
    100% { --bc-r: 150px; opacity: 0; }
  }

  .bc__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .bc__icon svg { width: 1.05em; height: 1.05em; display: block; }

  .bc__sep {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: color-mix(in srgb, var(--text, #ededed) calc(var(--lit) * 100%), var(--text-muted, #8a8a8a));
    user-select: none;
  }
  .bc__sep--svg svg {
    width: var(--sep-size);
    height: var(--sep-size);
    display: block;
  }

  .bc--t-danger { --glow-rgb: 255 99 105; }
  .bc--t-warn { --glow-rgb: 255 178 36; }
  .bc--t-success { --glow-rgb: 76 195 138; }

  :host-context([data-theme='light']) .bc { --drop-rgb: 255 255 255; }

  .bc.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .bc__crumb,
    .bc__sep { transition: none; }
  }
`;let m;function A(p){if(m||=document.createElement("canvas").getContext("2d"),!m)return null;m.fillStyle="#000",m.fillStyle=p;const t=m.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(p,t){const e=t?A(String(t).trim()):null;if(!e){for(const r of E)p.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),c=(r,d)=>p.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(r,l);c("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])c(r,o?"0 0 0":"255 255 255");c("--vs-color",l),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["separator","size","tone","disabled","color"];#t;#r;#n=null;#i=[];#g=0;#e=0;#s=null;#a;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=w,this.#t=document.createElement("nav"),this.#t.className="bc",this.#t.setAttribute("aria-label","Breadcrumb"),this.#r=document.createElement("ol"),this.#r.className="bc__list",this.#t.appendChild(this.#r),t.append(e,this.#t),this.#t.addEventListener("pointerleave",()=>this.#b()),this.#a=i=>{this.#s=i,!this.#e&&(this.#e=requestAnimationFrame(()=>{this.#e=0,this.#s&&this.#p(this.#s)}))}}connectedCallback(){f(this,this.getAttribute("color")),this.#l(),this.#o(),window.addEventListener("pointermove",this.#a,{passive:!0})}disconnectedCallback(){window.removeEventListener("pointermove",this.#a),this.#e&&cancelAnimationFrame(this.#e),this.#e=0}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&(this.#l(),this.#o())}set items(t){this.#n=Array.isArray(t)&&t.length?t:null,this.#t&&this.#o()}get items(){return this.#n??g}#c(){return this.#n??g}#l(){const t=(i,n)=>this.getAttribute(i)??n,e=this.hasAttribute("disabled");this.#t.className=`bc bc--${t("size","md")} bc--t-${t("tone","default")}${e?" is-disabled":""}`}#d(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}#o(){const t=this.#c();this.#r.textContent="",this.#i=[];const e=this.getAttribute("separator")||"",i=e.trim().startsWith("<");t.forEach((n,o)=>{const l=o===t.length-1,a=document.createElement("li");a.className="bc__item";const c=!!n.href&&!l,r=document.createElement(c?"a":"span");if(r.className="bc__crumb",l&&r.classList.add("is-current"),n.disabled&&r.classList.add("is-disabled"),c&&(r.href=n.href),l&&r.setAttribute("aria-current","page"),n.icon){const s=document.createElement("span");s.className="bc__icon",s.innerHTML=n.icon,r.appendChild(s)}const d=document.createElement("span");d.className="bc__text",d.textContent=n.label,r.appendChild(d),r.addEventListener("pointerdown",s=>this.#h(s,o,n,r,d));const h=()=>this.#m(r);if(r.addEventListener("pointerup",h),r.addEventListener("pointerleave",h),r.addEventListener("pointercancel",h),r.addEventListener("click",s=>this.#u(n,o,s)),a.appendChild(r),this.#i.push(r),!l){const s=document.createElement("span");s.className="bc__sep",s.setAttribute("aria-hidden","true"),e?i?(s.classList.add("bc__sep--svg"),s.innerHTML=e):s.textContent=e:(s.classList.add("bc__sep--svg"),s.appendChild(y())),a.appendChild(s),this.#i.push(s)}this.#r.appendChild(a)})}#p(t){if(!this.hasAttribute("disabled"))for(const e of this.#i){const i=e.getBoundingClientRect();e.style.setProperty("--mx",`${t.clientX-i.left}px`),e.style.setProperty("--my",`${t.clientY-i.top}px`);const n=Math.max(i.left,Math.min(t.clientX,i.right)),o=Math.max(i.top,Math.min(t.clientY,i.bottom)),l=Math.hypot(t.clientX-n,t.clientY-o),a=Math.max(0,1-l/_);e.style.setProperty("--lit",a.toFixed(3))}}#b(){for(const t of this.#i)t.style.setProperty("--lit","0")}#h(t,e,i,n,o){const l=this.#c();if(this.hasAttribute("disabled")||i.disabled||this.#d()||e===l.length-1)return;const a=n.getBoundingClientRect(),c=x=>Math.max(-1,Math.min(1,x)),r=c(((t.clientX-a.left)/a.width-.5)*2),d=c(((t.clientY-a.top)/a.height-.5)*2),h=1-.2*Math.min(Math.abs(r),Math.abs(d)),s=(-d*12*h).toFixed(2),v=(r*9*h).toFixed(2);n.classList.add("is-pressing"),n.style.transform=`perspective(420px) rotateX(${s}deg) rotateY(${v}deg) scale(0.93)`;const u=o.getBoundingClientRect(),b=document.createElement("span");b.className="bc__drop",b.setAttribute("aria-hidden","true"),b.textContent=i.label,b.style.setProperty("--rx",`${t.clientX-u.left}px`),b.style.setProperty("--ry",`${t.clientY-u.top}px`),b.addEventListener("animationend",()=>b.remove()),o.appendChild(b)}#m(t){t.classList.remove("is-pressing"),t.style.transform=""}#u(t,e,i){const n=this.#c();this.hasAttribute("disabled")||t.disabled||e!==n.length-1&&(t.href||i.preventDefault(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t,index:e}})))}}customElements.define("vs-breadcrumb",k);
