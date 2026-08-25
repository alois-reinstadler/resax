function g(){const c="http://www.w3.org/2000/svg",s=document.createElementNS(c,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none");const t=document.createElementNS(c,"path");return t.setAttribute("d","M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),s.appendChild(t),s}const u=[{label:"Home"},{label:"Breadcrumb"}],f=`
  :host { display: inline-flex; max-width: 100%; }
  /* Effect: each crumb is a soft pill that inflates + fills with an accent
     background on hover, sliding smoothly like a physical capsule. */
  .bcp {
    --fs: var(--ctrl-fs-md, 14px);
    --gap: 6px;
    --sep-size: 15px;
    --accent-rgb: var(--fx-tint, var(--ui-ring, 255 255 255));
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .bcp--sm { --fs: var(--ctrl-fs-sm, 13px); --gap: 5px; --sep-size: 13px; }
  .bcp--md { --fs: var(--ctrl-fs-md, 14px); --gap: 6px; --sep-size: 15px; }
  .bcp--lg { --fs: var(--ctrl-fs-lg, 15px); --gap: 8px; --sep-size: 17px; }

  .bcp__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 var(--gap);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .bcp__item {
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
  }

  .bcp__crumb {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.32em 0.7em;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    color: var(--text-muted, #8a8a8a);
    background: transparent;
    transition:
      background-color 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
      color 200ms ease,
      transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 260ms ease;
  }
  .bcp__crumb:hover:not(.is-current):not(.is-disabled) {
    color: var(--text, #ededed);
    background: rgb(var(--accent-rgb) / 0.16);
    transform: scale(1.06);
    box-shadow: inset 0 0 0 1px rgb(var(--accent-rgb) / 0.35);
  }
  .bcp__crumb:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgb(var(--accent-rgb) / 0.55);
  }
  .bcp__crumb.is-current {
    cursor: default;
    color: var(--ui-accent-fg, #0b0b0b);
    background: rgb(var(--accent-rgb) / 0.12);
  }
  .bcp__crumb.is-disabled { pointer-events: none; opacity: 0.4; }

  .bcp__icon { display: inline-flex; align-items: center; justify-content: center; }
  .bcp__icon svg { width: 1.05em; height: 1.05em; display: block; }

  .bcp__sep {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted, #8a8a8a);
    user-select: none;
  }
  .bcp__sep--svg svg { width: var(--sep-size); height: var(--sep-size); display: block; }

  .bcp--t-danger { --accent-rgb: 255 99 105; }
  .bcp--t-warn { --accent-rgb: 255 178 36; }
  .bcp--t-success { --accent-rgb: 76 195 138; }

  .bcp.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .bcp__crumb { transition: color 120ms ease, background-color 120ms ease; }
    .bcp__crumb:hover:not(.is-current):not(.is-disabled) { transform: none; }
  }
`;let d;function h(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const s=d.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const t=s.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(c,s){const t=s?h(String(s).trim()):null;if(!t){for(const e of v)c.style.removeProperty(e);return}const a=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),l=.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])>.45,p=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(e=>Math.round(l?e*.92:e+(255-e)*.16)),i=(e,b)=>c.style.setProperty(e,b);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(e,p);i("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(e,l?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])i(e,l?"0 0 0":"255 255 255");i("--vs-color",p),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["separator","size","tone","disabled","color"];#t;#e;#s=null;constructor(){super();const s=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#t=document.createElement("nav"),this.#t.className="bcp",this.#t.setAttribute("aria-label","Breadcrumb"),this.#e=document.createElement("ol"),this.#e.className="bcp__list",this.#t.appendChild(this.#e),s.append(t,this.#t)}connectedCallback(){m(this,this.getAttribute("color")),this.#i(),this.#r()}disconnectedCallback(){}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&(this.#i(),this.#r())}set items(s){this.#s=Array.isArray(s)&&s.length?s:null,this.#t&&this.#r()}get items(){return this.#s??u}#n(){return this.#s??u}#i(){const s=(a,n)=>this.getAttribute(a)??n,t=this.hasAttribute("disabled");this.#t.className=`bcp bcp--${s("size","md")} bcp--t-${s("tone","default")}${t?" is-disabled":""}`}#r(){const s=this.#n();this.#e.replaceChildren();const t=this.getAttribute("separator")||"",a=t.trim().startsWith("<");s.forEach((n,l)=>{const p=l===s.length-1,o=document.createElement("li");o.className="bcp__item";const i=!!n.href&&!p,e=document.createElement(i?"a":"span");if(e.className="bcp__crumb",p&&e.classList.add("is-current"),n.disabled&&e.classList.add("is-disabled"),i&&(e.href=n.href),p&&e.setAttribute("aria-current","page"),n.icon){const r=document.createElement("span");r.className="bcp__icon",r.innerHTML=n.icon,e.appendChild(r)}const b=document.createElement("span");if(b.className="bcp__text",b.textContent=n.label,e.appendChild(b),e.addEventListener("click",r=>this.#a(n,l,r)),o.appendChild(e),!p){const r=document.createElement("span");r.className="bcp__sep",r.setAttribute("aria-hidden","true"),t?a?(r.classList.add("bcp__sep--svg"),r.innerHTML=t):r.textContent=t:(r.classList.add("bcp__sep--svg"),r.appendChild(g())),o.appendChild(r)}this.#e.appendChild(o)})}#a(s,t,a){const n=this.#n();this.hasAttribute("disabled")||s.disabled||t!==n.length-1&&(s.href||a.preventDefault(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:s,index:t}})))}}customElements.define("vs-breadcrumb-pill",_);
