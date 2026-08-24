const d=`
  :host { display: inline-flex; }
  .vsts-wrap { position: relative; display: inline-flex; }
  .vsts-trigger { display: inline-flex; align-items: center; outline: none; border-radius: var(--ctrl-r-sm, 8px); color: var(--text, #ededed); cursor: default; }
  .vsts-trigger:focus-visible { box-shadow: 0 0 0 2px var(--ui-accent, #ededed); }

  .vsts-tip {
    position: absolute; z-index: 10000; display: inline-flex; align-items: center; max-width: 240px;
    padding: 7px 11px; border-radius: var(--ctrl-r-md, 10px); border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-elevated, #161616); color: var(--text, #ededed); font-size: var(--ctrl-fs-sm, 12.5px);
    font-weight: 500; line-height: 1.4; white-space: normal; pointer-events: none;
    box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.6);
    /* SCALE: springy pop from the anchor side */
    opacity: 0;
    transition: opacity 160ms ease, scale 260ms cubic-bezier(0.34, 1.56, 0.44, 1), translate 0ms;
    scale: 0.7;
  }
  /* base translate to keep centering while scaling */
  .vsts-tip--top, .vsts-tip--bottom { translate: -50% 0; transform-origin: center var(--vsts-o, bottom); }
  .vsts-tip--left, .vsts-tip--right { translate: 0 -50%; transform-origin: var(--vsts-o, right) center; }
  .vsts-tip--top { --vsts-o: bottom; }
  .vsts-tip--bottom { --vsts-o: top; }
  .vsts-tip--left { --vsts-o: right; }
  .vsts-tip--right { --vsts-o: left; }

  .vsts-tip.is-open { opacity: 1; scale: 1; }

  .vsts-tip__content :where(b, strong) { font-weight: 700; }

  .vsts-tip__arrow {
    position: absolute; width: 9px; height: 9px; background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a); border-right: none; border-bottom: none;
  }
  .vsts-tip--top .vsts-tip__arrow { bottom: -5px; left: 50%; transform: translateX(-50%) rotate(225deg); }
  .vsts-tip--bottom .vsts-tip__arrow { top: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); }
  .vsts-tip--left .vsts-tip__arrow { right: -5px; top: 50%; transform: translateY(-50%) rotate(135deg); }
  .vsts-tip--right .vsts-tip__arrow { left: -5px; top: 50%; transform: translateY(-50%) rotate(315deg); }

  @media (prefers-reduced-motion: reduce) {
    .vsts-tip { transition: opacity 120ms ease; scale: 1; }
  }
`;let f=0,n;function g(o){if(n||=document.createElement("canvas").getContext("2d"),!n)return null;n.fillStyle="#000",n.fillStyle=o;const s=n.fillStyle;if(s.charAt(0)==="#")return[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];const t=s.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function c(o,s){const t=s?g(String(s).trim()):null;if(!t){for(const e of v)o.style.removeProperty(e);return}const i=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),a=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,p=`rgb(${t[0]} ${t[1]} ${t[2]})`,h=t.map(e=>Math.round(a?e*.92:e+(255-e)*.16)),r=(e,m)=>o.style.setProperty(e,m);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(e,p);r("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(e,a?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])r(e,a?"0 0 0":"255 255 255");r("--vs-color",p),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["content","placement","offset","delay","arrow","color"];#e;#i;#t;#n;#o;#h=`vsts-${Date.now().toString(36)}-${(f++).toString(36)}`;#r=!1;#s=null;#a=()=>this.#g();#l=()=>this.#v();constructor(){super();const s=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=d,this.#e=document.createElement("span"),this.#e.className="vsts-wrap",this.#i=document.createElement("span"),this.#i.className="vsts-trigger",this.#i.tabIndex=0;const i=document.createElement("slot");i.textContent="Hover me",this.#i.appendChild(i),this.#t=document.createElement("span"),this.#t.className="vsts-tip",this.#t.id=this.#h,this.#t.setAttribute("role","tooltip"),this.#t.style.display="none",this.#n=document.createElement("span"),this.#n.className="vsts-tip__content",this.#o=document.createElement("span"),this.#o.className="vsts-tip__arrow",this.#o.setAttribute("aria-hidden","true"),this.#t.append(this.#n,this.#o),this.#e.append(this.#i,this.#t),s.append(t,this.#e),this.#e.addEventListener("mouseenter",this.#a),this.#e.addEventListener("mouseleave",this.#l),this.#e.addEventListener("focusin",this.#a),this.#e.addEventListener("focusout",this.#l)}connectedCallback(){c(this,this.getAttribute("color")),this.#m()}disconnectedCallback(){this.#s&&(clearTimeout(this.#s),this.#s=null),this.#e.removeEventListener("mouseenter",this.#a),this.#e.removeEventListener("mouseleave",this.#l),this.#e.removeEventListener("focusin",this.#a),this.#e.removeEventListener("focusout",this.#l)}attributeChangedCallback(){c(this,this.getAttribute("color")),this.#t&&this.#m()}#p(s,t){const i=this.getAttribute(s);if(i===null)return t;const l=Number(i);return Number.isFinite(l)?l:t}#d(){const s=this.getAttribute("placement");return["top","bottom","left","right"].includes(s)?s:"top"}#f(){return this.hasAttribute("arrow")}#g(){this.#s&&clearTimeout(this.#s);const s=Math.max(0,this.#p("delay",120));this.#s=setTimeout(()=>{this.#s=null,this.#r=!0,this.#c()},s)}#v(){this.#s&&(clearTimeout(this.#s),this.#s=null),this.#r=!1,this.#c()}#c(){this.#t.style.display=this.#r?"":"none",this.#t.classList.toggle("is-open",this.#r),this.#r?this.#i.setAttribute("aria-describedby",this.#h):this.#i.removeAttribute("aria-describedby")}#m(){const s=this.getAttribute("content")??"Tooltip";this.#n.innerHTML=s;const t=this.#d(),i=this.#p("offset",10);this.#t.className=`vsts-tip vsts-tip--${t}${this.#r?" is-open":""}`,this.#t.style.top="",this.#t.style.bottom="",this.#t.style.left="",this.#t.style.right="",this.#t.style.marginTop="",this.#t.style.marginBottom="",this.#t.style.marginLeft="",this.#t.style.marginRight="",t==="top"?(this.#t.style.bottom="100%",this.#t.style.left="50%",this.#t.style.marginBottom=`${i}px`):t==="bottom"?(this.#t.style.top="100%",this.#t.style.left="50%",this.#t.style.marginTop=`${i}px`):t==="left"?(this.#t.style.right="100%",this.#t.style.top="50%",this.#t.style.marginRight=`${i}px`):t==="right"&&(this.#t.style.left="100%",this.#t.style.top="50%",this.#t.style.marginLeft=`${i}px`),this.#o.style.display=this.#f()?"":"none"}}customElements.define("vs-tooltip-scale",u);
