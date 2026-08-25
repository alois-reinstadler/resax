const f=`
  :host { display: inline-flex; }
  .vstb-wrap { position: relative; display: inline-flex; }
  .vstb-trigger {
    display: inline-flex;
    align-items: center;
    outline: none;
    border-radius: var(--ctrl-r-sm, 8px);
    color: var(--text, #ededed);
    cursor: default;
  }
  .vstb-trigger:focus-visible { box-shadow: 0 0 0 2px var(--ui-accent, #ededed); }

  .vstb-tip {
    position: absolute;
    z-index: 10000;
    display: inline-flex;
    align-items: center;
    max-width: 240px;
    padding: 7px 11px;
    border-radius: var(--ctrl-r-md, 10px);
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-elevated, #161616);
    color: var(--text, #ededed);
    font-size: var(--ctrl-fs-sm, 12.5px);
    font-weight: 500;
    line-height: 1.4;
    white-space: normal;
    pointer-events: none;
    box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.6);
    /* BLUR: sharpen from a heavy gaussian blur into focus while fading in */
    opacity: 0;
    filter: blur(10px);
    transition:
      opacity 240ms ease,
      filter 300ms cubic-bezier(0.25, 0.8, 0.35, 1);
  }
  .vstb-tip[hidden] { display: none; }
  .vstb-tip.is-open { opacity: 1; filter: blur(0); }

  .vstb-tip__content :where(b, strong) { font-weight: 700; }

  .vstb-tip__arrow {
    position: absolute;
    width: 9px;
    height: 9px;
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    border-right: none;
    border-bottom: none;
  }
  .vstb-tip__arrow[hidden] { display: none; }
  .vstb-tip--top .vstb-tip__arrow { bottom: -5px; left: 50%; transform: translateX(-50%) rotate(225deg); }
  .vstb-tip--bottom .vstb-tip__arrow { top: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); }
  .vstb-tip--left .vstb-tip__arrow { right: -5px; top: 50%; transform: translateY(-50%) rotate(135deg); }
  .vstb-tip--right .vstb-tip__arrow { left: -5px; top: 50%; transform: translateY(-50%) rotate(315deg); }

  /* placement + offset (ported from the SFC's computed tipStyle, driven via a CSS var) */
  .vstb-tip--top { bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: var(--tip-offset, 10px); }
  .vstb-tip--bottom { top: 100%; left: 50%; transform: translateX(-50%); margin-top: var(--tip-offset, 10px); }
  .vstb-tip--left { right: 100%; top: 50%; transform: translateY(-50%); margin-right: var(--tip-offset, 10px); }
  .vstb-tip--right { left: 100%; top: 50%; transform: translateY(-50%); margin-left: var(--tip-offset, 10px); }

  @media (prefers-reduced-motion: reduce) {
    .vstb-tip { transition: opacity 120ms ease; filter: none; }
    .vstb-tip.is-open { filter: none; }
  }
`,b=["top","bottom","left","right"];let l;function m(a){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=a;const e=l.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(a,e){const t=e?m(String(e).trim()):null;if(!t){for(const i of u)a.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,p=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),n=(i,d)=>a.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,p);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,r?"0 0 0":"255 255 255");n("--vs-color",p),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["content","placement","offset","delay","arrow","color"];#e;#s;#t;#l;#r;#f=`vstb-${Math.random().toString(36).slice(2,9)}`;#n=!1;#i=0;#o=null;#a=null;#h=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#e=document.createElement("span"),this.#e.className="vstb-wrap",this.#s=document.createElement("span"),this.#s.className="vstb-trigger",this.#s.tabIndex=0;const s=document.createElement("slot");s.textContent="Hover me",this.#s.appendChild(s),this.#t=document.createElement("span"),this.#t.id=this.#f,this.#t.setAttribute("role","tooltip"),this.#t.hidden=!0,this.#l=document.createElement("span"),this.#l.className="vstb-tip__content",this.#r=document.createElement("span"),this.#r.className="vstb-tip__arrow",this.#r.setAttribute("aria-hidden","true"),this.#t.append(this.#l,this.#r),this.#e.append(this.#s,this.#t),e.append(t,this.#e),this.#e.addEventListener("mouseenter",this.#p),this.#e.addEventListener("mouseleave",this.#c),this.#e.addEventListener("focusin",this.#p),this.#e.addEventListener("focusout",this.#c)}connectedCallback(){h(this,this.getAttribute("color")),this.#b()}disconnectedCallback(){this.#e.removeEventListener("mouseenter",this.#p),this.#e.removeEventListener("mouseleave",this.#c),this.#e.removeEventListener("focusin",this.#p),this.#e.removeEventListener("focusout",this.#c),this.#i&&clearTimeout(this.#i),this.#d()}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#e&&this.#b()}#b(){const e=this.getAttribute("content")??"Tooltip";this.#l.innerHTML=e;const t=this.getAttribute("placement"),s=b.includes(t)?t:"top";this.#t.className=`vstb-tip vstb-tip--${s}`+(this.#n?" is-open":"");const o=Number(this.getAttribute("offset")),r=Number.isFinite(o)?o:10;this.#t.style.setProperty("--tip-offset",`${r}px`),this.#r.hidden=!this.hasAttribute("arrow")}#p=()=>{this.#i&&clearTimeout(this.#i);const e=Number(this.getAttribute("delay")),t=Number.isFinite(e)?e:120;this.#i=setTimeout(()=>this.#m(),Math.max(0,t))};#c=()=>{this.#i&&(clearTimeout(this.#i),this.#i=0),this.#u()};#m(){this.#n||(this.#n=!0,this.#d(),this.#t.hidden=!1,this.#t.offsetWidth,requestAnimationFrame(()=>this.#t.classList.add("is-open")),this.#s.setAttribute("aria-describedby",this.#f))}#u(){this.#n&&(this.#n=!1,this.#d(),this.#t.classList.remove("is-open"),this.#s.removeAttribute("aria-describedby"),this.#v(this.#t,()=>{this.#t.hidden=!0},320))}#v(e,t,s){const o=()=>{e.removeEventListener("transitionend",r),clearTimeout(this.#h),this.#o=null,this.#a=null,t()},r=p=>{p.target===e&&o()};this.#o=r,this.#a=e,e.addEventListener("transitionend",r),this.#h=setTimeout(o,s)}#d(){this.#o&&this.#a&&this.#a.removeEventListener("transitionend",this.#o),clearTimeout(this.#h),this.#o=null,this.#a=null}}customElements.define("vs-tooltip-blur",v);
