const f=[{label:"Home"},{label:"Breadcrumb"}],u=`
  .bcs {
    --fs: var(--ctrl-fs-md, 14px);
    --gap: 8px;
    --sep-size: 15px;
    --accent-rgb: var(--fx-tint, var(--ui-ring, 255 255 255));
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  :host { display: inline-flex; max-width: 100%; }
  .bcs--sm { --fs: var(--ctrl-fs-sm, 13px); --gap: 6px; --sep-size: 13px; }
  .bcs--md { --fs: var(--ctrl-fs-md, 14px); --gap: 8px; --sep-size: 15px; }
  .bcs--lg { --fs: var(--ctrl-fs-lg, 15px); --gap: 10px; --sep-size: 17px; }

  .bcs__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 var(--gap);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .bcs__item {
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
  }

  .bcs__crumb {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.4;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--text-muted, #8a8a8a);
    transition: color 200ms ease;
  }
  .bcs__text {
    position: relative;
    display: inline-block;
  }
  /* the swipe underline */
  .bcs__text::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 100%;
    border-radius: 2px;
    background: rgb(var(--accent-rgb));
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 320ms cubic-bezier(0.65, 0, 0.35, 1);
  }
  .bcs__crumb:hover:not(.is-current):not(.is-disabled) { color: var(--text, #ededed); }
  .bcs__crumb:hover:not(.is-current):not(.is-disabled) .bcs__text::after { transform: scaleX(1); }
  .bcs__crumb:focus-visible { outline: none; color: var(--text, #ededed); }
  .bcs__crumb:focus-visible .bcs__text::after { transform: scaleX(1); }
  .bcs__crumb.is-current { cursor: default; color: var(--ui-accent-fg, #0b0b0b); }
  .bcs__crumb.is-disabled { pointer-events: none; opacity: 0.4; }

  .bcs__icon { display: inline-flex; align-items: center; justify-content: center; }
  .bcs__icon svg { width: 1.05em; height: 1.05em; display: block; }

  /* leaning slash separator */
  .bcs__sep {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    font-weight: 300;
    color: color-mix(in srgb, var(--text, #ededed) 30%, var(--text-muted, #8a8a8a));
    transform: skewX(-8deg);
    user-select: none;
    transition: transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .bcs__item:hover .bcs__sep { transform: skewX(-16deg) translateY(-1px); }
  .bcs__sep--svg svg { width: var(--sep-size); height: var(--sep-size); display: block; }

  .bcs--t-danger { --accent-rgb: 255 99 105; }
  .bcs--t-warn { --accent-rgb: 255 178 36; }
  .bcs--t-success { --accent-rgb: 76 195 138; }

  .bcs.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .bcs__text::after { transition: none; }
    .bcs__sep { transition: none; }
    .bcs__item:hover .bcs__sep { transform: skewX(-8deg); }
  }
`;let p;function g(b){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=b;const s=p.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const e=s.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const h=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(b,s){const e=s?g(String(s).trim()):null;if(!e){for(const t of h)b.style.removeProperty(t);return}const a=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),o=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(t=>Math.round(o?t*.92:t+(255-t)*.16)),r=(t,d)=>b.style.setProperty(t,d);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(t,l);r("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(t,o?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])r(t,o?"0 0 0":"255 255 255");r("--vs-color",l),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["separator","size","tone","disabled","color"];#t;#e;#s=null;constructor(){super();const s=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("nav"),this.#t.className="bcs",this.#t.setAttribute("aria-label","Breadcrumb"),this.#e=document.createElement("ol"),this.#e.className="bcs__list",this.#t.appendChild(this.#e),s.append(e,this.#t)}connectedCallback(){m(this,this.getAttribute("color")),this.#r(),this.#n()}disconnectedCallback(){this.#e.textContent=""}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&(this.#r(),this.#n())}set items(s){this.#s=Array.isArray(s)&&s.length?s:null,this.#t&&this.#n()}get items(){return this.#s??f}#i(){return this.#s??f}#r(){const s=(a,n)=>this.getAttribute(a)??n,e=this.hasAttribute("disabled");this.#t.className=`bcs bcs--${s("size","md")} bcs--t-${s("tone","default")}${e?" is-disabled":""}`}#n(){const s=this.#i();this.#e.textContent="";const e=this.getAttribute("separator")||"/",a=e.trim().startsWith("<");s.forEach((n,o)=>{const l=o===s.length-1,c=document.createElement("li");c.className="bcs__item";const r=!!n.href&&!l,t=document.createElement(r?"a":"span");if(t.className="bcs__crumb",l&&t.classList.add("is-current"),n.disabled&&t.classList.add("is-disabled"),r&&(t.href=n.href),l&&t.setAttribute("aria-current","page"),n.icon){const i=document.createElement("span");i.className="bcs__icon",i.innerHTML=n.icon,t.appendChild(i)}const d=document.createElement("span");if(d.className="bcs__text",d.textContent=n.label,t.appendChild(d),t.addEventListener("click",i=>this.#a(n,o,i)),c.appendChild(t),!l){const i=document.createElement("span");i.className="bcs__sep",i.setAttribute("aria-hidden","true"),a?(i.classList.add("bcs__sep--svg"),i.innerHTML=e):i.textContent=e,c.appendChild(i)}this.#e.appendChild(c)})}#a(s,e,a){const n=this.#i();this.hasAttribute("disabled")||s.disabled||e!==n.length-1&&(s.href||a.preventDefault(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:s,index:e}})))}}customElements.define("vs-breadcrumb-slash",_);
