const f=`
  :host { position: relative; display: inline-flex; }
  .vstl-trigger {
    display: inline-flex;
    align-items: center;
    outline: none;
    border-radius: var(--ctrl-r-sm, 8px);
    color: var(--text, #ededed);
    cursor: default;
  }
  .vstl-trigger:focus-visible {
    box-shadow: 0 0 0 2px var(--ui-accent, #ededed);
  }

  .vstl-tip {
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
    /* SLIDE: directional entry (translate) + fade */
    opacity: 0;
    transition:
      opacity 200ms ease,
      translate 300ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  /* hidden offset per placement (slides IN toward its resting spot) */
  .vstl-tip--top { translate: -50% 8px; }
  .vstl-tip--bottom { translate: -50% -8px; }
  .vstl-tip--left { translate: 8px -50%; }
  .vstl-tip--right { translate: -8px -50%; }

  .vstl-tip--top.is-open,
  .vstl-tip--bottom.is-open { opacity: 1; translate: -50% 0; }
  .vstl-tip--left.is-open,
  .vstl-tip--right.is-open { opacity: 1; translate: 0 -50%; }

  .vstl-tip__content :where(b, strong) { font-weight: 700; }

  .vstl-tip__arrow {
    position: absolute;
    width: 9px;
    height: 9px;
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    border-right: none;
    border-bottom: none;
  }
  .vstl-tip--top .vstl-tip__arrow { bottom: -5px; left: 50%; transform: translateX(-50%) rotate(225deg); }
  .vstl-tip--bottom .vstl-tip__arrow { top: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); }
  .vstl-tip--left .vstl-tip__arrow { right: -5px; top: 50%; transform: translateY(-50%) rotate(135deg); }
  .vstl-tip--right .vstl-tip__arrow { left: -5px; top: 50%; transform: translateY(-50%) rotate(315deg); }

  @media (prefers-reduced-motion: reduce) {
    .vstl-tip,
    .vstl-tip.is-open { transition: opacity 120ms ease; translate: -50% 0; }
    .vstl-tip--left,
    .vstl-tip--right,
    .vstl-tip--left.is-open,
    .vstl-tip--right.is-open { translate: 0 -50%; }
  }
`,m=["top","bottom","left","right","marginTop","marginBottom","marginLeft","marginRight"];let l;function g(n){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=n;const e=l.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(n,e){const t=e?g(String(e).trim()):null;if(!t){for(const i of b)n.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),o=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,p=t.map(i=>Math.round(o?i*.92:i+(255-i)*.16)),r=(i,d)=>n.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(i,c);r("--btn-primary-bg-hover",`rgb(${p[0]} ${p[1]} ${p[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(i,o?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])r(i,o?"0 0 0":"255 255 255");r("--vs-color",c),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["content","placement","offset","delay","arrow","color"];#i;#t;#s;#r;#o=!1;#e=null;#p=null;#a="top";#c=`vstl-${Math.random().toString(36).slice(2,9)}`;#h=()=>this.#g();#d=()=>this.#b();#f=()=>this.#g();#m=()=>this.#b();constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#i=document.createElement("span"),this.#i.className="vstl-trigger",this.#i.tabIndex=0;const s=document.createElement("slot");s.textContent="Hover me",this.#i.append(s),this.#t=document.createElement("span"),this.#t.id=this.#c,this.#t.setAttribute("role","tooltip"),this.#t.style.display="none",this.#s=document.createElement("span"),this.#s.className="vstl-tip__content",this.#r=document.createElement("span"),this.#r.className="vstl-tip__arrow",this.#r.setAttribute("aria-hidden","true"),this.#t.append(this.#s,this.#r),e.append(t,this.#i,this.#t)}connectedCallback(){h(this,this.getAttribute("color")),this.#u(),this.addEventListener("mouseenter",this.#h),this.addEventListener("mouseleave",this.#d),this.addEventListener("focusin",this.#f),this.addEventListener("focusout",this.#m)}disconnectedCallback(){this.#e&&(clearTimeout(this.#e),this.#e=null),this.removeEventListener("mouseenter",this.#h),this.removeEventListener("mouseleave",this.#d),this.removeEventListener("focusin",this.#f),this.removeEventListener("focusout",this.#m)}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#u()}#n(e,t){return this.hasAttribute(e)?this.getAttribute(e):t}#g(){this.#e&&clearTimeout(this.#e);const e=Math.max(0,Number(this.#n("delay",120))||0);this.#e=setTimeout(()=>{this.#o=!0,this.#l()},e)}#b(){this.#e&&(clearTimeout(this.#e),this.#e=null),this.#o=!1,this.#l()}#u(){const e=this.#n("content","Tooltip"),t=this.#n("placement","top"),s=Number(this.#n("offset",10)),a=Number.isFinite(s)?s:10,o=this.#n("arrow","true")!=="false";this.#s.innerHTML!==e&&(this.#s.innerHTML=e),this.#r.style.display=o?"":"none",this.#a=t==="bottom"||t==="left"||t==="right"?t:"top",this.#p={top:{bottom:"100%",left:"50%",marginBottom:`${a}px`},bottom:{top:"100%",left:"50%",marginTop:`${a}px`},left:{right:"100%",top:"50%",marginRight:`${a}px`},right:{left:"100%",top:"50%",marginLeft:`${a}px`}}[this.#a],this.#l()}#l(){this.#t.className=`vstl-tip vstl-tip--${this.#a}${this.#o?" is-open":""}`,this.#t.style.display=this.#o?"":"none";for(const e of m)this.#t.style[e]="";Object.assign(this.#t.style,this.#p),this.#o?this.#i.setAttribute("aria-describedby",this.#c):this.#i.removeAttribute("aria-describedby")}}customElements.define("vs-tooltip-slide",u);
