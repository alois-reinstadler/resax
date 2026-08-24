const u="http://www.w3.org/2000/svg",f=`
  :host { display: inline-flex; max-width: 100%; }
  .bcg {
    --fs: var(--ctrl-fs-md, 14px);
    --gap: 8px;
    --sep-size: 16px;
    --accent-rgb: var(--fx-tint, var(--ui-ring, 255 255 255));
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .bcg--sm { --fs: var(--ctrl-fs-sm, 13px); --gap: 6px; --sep-size: 14px; }
  .bcg--md { --fs: var(--ctrl-fs-md, 14px); --gap: 8px; --sep-size: 16px; }
  .bcg--lg { --fs: var(--ctrl-fs-lg, 15px); --gap: 10px; --sep-size: 18px; }

  .bcg__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 var(--gap);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .bcg__item { display: inline-flex; align-items: center; gap: var(--gap); }

  .bcg__crumb {
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
  }
  .bcg__text {
    position: relative;
    display: inline-block;
    transition: color 260ms ease, text-shadow 380ms ease;
  }
  .bcg__crumb:hover:not(.is-current):not(.is-disabled) .bcg__text,
  .bcg__crumb:focus-visible:not(.is-current):not(.is-disabled) .bcg__text {
    color: var(--text, #ededed);
    text-shadow:
      0 0 4px rgb(var(--accent-rgb) / 0.9),
      0 0 12px rgb(var(--accent-rgb) / 0.7),
      0 0 22px rgb(var(--accent-rgb) / 0.45);
    animation: bcg-flicker 1600ms ease-in-out infinite;
  }
  .bcg__crumb:focus-visible { outline: none; }
  @keyframes bcg-flicker {
    0%, 100% { opacity: 1; }
    48% { opacity: 1; }
    50% { opacity: 0.82; }
    52% { opacity: 1; }
  }
  .bcg__crumb.is-current { cursor: default; }
  .bcg__crumb.is-current .bcg__text {
    color: var(--text, #ededed);
    text-shadow: 0 0 6px rgb(var(--accent-rgb) / 0.5), 0 0 14px rgb(var(--accent-rgb) / 0.3);
  }
  .bcg__crumb.is-disabled { pointer-events: none; opacity: 0.4; }

  .bcg__icon { display: inline-flex; align-items: center; justify-content: center; }
  .bcg__icon svg { width: 1.05em; height: 1.05em; display: block; }

  .bcg__sep {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted, #8a8a8a);
    user-select: none;
    transition: color 260ms ease, filter 260ms ease;
  }
  .bcg__item:hover .bcg__sep {
    color: rgb(var(--accent-rgb));
    filter: drop-shadow(0 0 5px rgb(var(--accent-rgb) / 0.7));
  }
  .bcg__sep--svg svg { width: var(--sep-size); height: var(--sep-size); display: block; }

  .bcg--t-danger { --accent-rgb: 255 99 105; }
  .bcg--t-warn { --accent-rgb: 255 178 36; }
  .bcg--t-success { --accent-rgb: 76 195 138; }

  .bcg.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .bcg__text { transition: color 120ms ease; }
    .bcg__crumb:hover:not(.is-current):not(.is-disabled) .bcg__text,
    .bcg__crumb:focus-visible:not(.is-current):not(.is-disabled) .bcg__text { animation: none; }
    .bcg__sep { transition: color 120ms ease; }
  }
`,d=[{label:"Home"},{label:"Breadcrumb"}];let p;function h(g){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=g;const s=p.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const t=s.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(g,s){const t=s?h(String(s).trim()):null;if(!t){for(const e of _)g.style.removeProperty(e);return}const r=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),n=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(e=>Math.round(n?e*.92:e+(255-e)*.16)),c=(e,b)=>g.style.setProperty(e,b);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(e,l);c("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(e,n?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])c(e,n?"0 0 0":"255 255 255");c("--vs-color",l),c("--vs-color-rgb",t.join(" ")),c("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["separator","size","tone","disabled","color"];#e;#t;#s=null;constructor(){super();const s=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#e=document.createElement("nav"),this.#e.className="bcg",this.#e.setAttribute("aria-label","Breadcrumb"),this.#t=document.createElement("ol"),this.#t.className="bcg__list",this.#e.append(this.#t),s.append(t,this.#e),this.#t.addEventListener("click",this.#n)}set items(s){this.#s=Array.isArray(s)?s:null,this.#i()}get items(){return this.#s??d}connectedCallback(){m(this,this.getAttribute("color")),this.#r(),this.#i()}disconnectedCallback(){this.#t.removeEventListener("click",this.#n)}attributeChangedCallback(s){m(this,this.getAttribute("color")),this.#e&&(s==="separator"?this.#i():this.#r())}#r(){const s=(r,i)=>this.getAttribute(r)??i;let t=`bcg bcg--${s("size","md")} bcg--t-${s("tone","default")}`;this.hasAttribute("disabled")&&(t+=" is-disabled"),this.#e.className=t}#i(){if(!this.#t)return;const s=this.#s?.length?this.#s:d,t=this.getAttribute("separator")||"",r=t.trim().startsWith("<");this.#t.textContent="",s.forEach((i,n)=>{const l=n===s.length-1,o=document.createElement("li");o.className="bcg__item";const c=!!(i.href&&!l),e=document.createElement(c?"a":"span");if(e.className="bcg__crumb",l&&e.classList.add("is-current"),i.disabled&&e.classList.add("is-disabled"),c&&(e.href=i.href),l&&e.setAttribute("aria-current","page"),e.dataset.i=n,i.icon){const a=document.createElement("span");a.className="bcg__icon",a.innerHTML=i.icon,e.append(a)}const b=document.createElement("span");if(b.className="bcg__text",b.dataset.label=i.label??"",b.textContent=i.label??"",e.append(b),o.append(e),!l){const a=document.createElement("span");a.className=r||!t?"bcg__sep bcg__sep--svg":"bcg__sep",a.setAttribute("aria-hidden","true"),t?r?a.innerHTML=t:a.textContent=t:a.append(this.#c()),o.append(a)}this.#t.append(o)})}#c(){const s=document.createElementNS(u,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none");const t=document.createElementNS(u,"path");return t.setAttribute("d","M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),s.append(t),s}#n=s=>{const t=s.target.closest(".bcg__crumb");if(!t)return;const r=Number(t.dataset.i),i=this.#s?.length?this.#s:d,n=i[r];this.hasAttribute("disabled")||n.disabled||r!==i.length-1&&(n.href||s.preventDefault(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:n,index:r}})))}}customElements.define("vs-breadcrumb-glow",v);
