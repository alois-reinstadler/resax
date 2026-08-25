const m=`
  :host { display: inline-flex; }
  .vstg-wrap {
    position: relative;
    display: inline-flex;
  }
  .vstg-trigger {
    display: inline-flex;
    align-items: center;
    outline: none;
    border-radius: var(--ctrl-r-sm, 8px);
    color: var(--text, #ededed);
    cursor: default;
  }
  .vstg-trigger:focus-visible {
    box-shadow: 0 0 0 2px var(--ui-accent, #ededed);
  }

  .vstg-tip {
    --vstg-glow: var(--ui-accent, #ededed);
    position: absolute;
    z-index: 10000;
    display: inline-flex;
    align-items: center;
    max-width: 240px;
    padding: 7px 11px;
    border-radius: var(--ctrl-r-md, 10px);
    border: 1px solid color-mix(in srgb, var(--vstg-glow) 45%, var(--border, #2a2a2a));
    background: var(--bg-elevated, #161616);
    color: var(--text, #ededed);
    font-size: var(--ctrl-fs-sm, 12.5px);
    font-weight: 500;
    line-height: 1.4;
    white-space: normal;
    pointer-events: none;
    /* GLOW: fade in while an accent aura flares then settles */
    /* Perf: the shadow is never transitioned nor animated per frame. The settled
       state is static on .is-open; the flare peak is baked into ::before and only
       its opacity (compositable) animates, with the same timing. */
    opacity: 0;
    transition: opacity 200ms ease;
  }
  .vstg-tip[hidden] { display: none; }
  .vstg-tip::before {
    content: '';
    position: absolute;
    inset: -1px; /* starts at the border-box, like the original shadow */
    border-radius: inherit;
    pointer-events: none;
    box-shadow:
      0 0 0 3px color-mix(in srgb, var(--vstg-glow) 45%, transparent),
      0 0 28px 2px color-mix(in srgb, var(--vstg-glow) 70%, transparent);
    opacity: 0;
  }
  .vstg-tip.is-open {
    opacity: 1;
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--vstg-glow) 30%, transparent),
      0 0 16px -2px color-mix(in srgb, var(--vstg-glow) 55%, transparent);
  }
  .vstg-tip.is-open::before {
    animation: vstg-flare 620ms ease-out;
  }
  @keyframes vstg-flare {
    0% { opacity: 0; }
    40% { opacity: 1; }
    100% { opacity: 0; }
  }

  .vstg-tip__content :where(b, strong) { font-weight: 700; }

  .vstg-tip__arrow {
    position: absolute;
    width: 9px;
    height: 9px;
    background: var(--bg-elevated, #161616);
    border: 1px solid color-mix(in srgb, var(--vstg-glow) 45%, var(--border, #2a2a2a));
    border-right: none;
    border-bottom: none;
  }
  .vstg-tip--top .vstg-tip__arrow { bottom: -5px; left: 50%; transform: translateX(-50%) rotate(225deg); }
  .vstg-tip--bottom .vstg-tip__arrow { top: -5px; left: 50%; transform: translateX(-50%) rotate(45deg); }
  .vstg-tip--left .vstg-tip__arrow { right: -5px; top: 50%; transform: translateY(-50%) rotate(135deg); }
  .vstg-tip--right .vstg-tip__arrow { left: -5px; top: 50%; transform: translateY(-50%) rotate(315deg); }

  @media (prefers-reduced-motion: reduce) {
    .vstg-tip { transition: opacity 120ms ease; }
    .vstg-tip.is-open { animation: none; }
    .vstg-tip.is-open::before { animation: none; opacity: 0; }
  }
`,g={top:s=>({bottom:"100%",left:"50%",transform:"translateX(-50%)",marginBottom:`${s}px`}),bottom:s=>({top:"100%",left:"50%",transform:"translateX(-50%)",marginTop:`${s}px`}),left:s=>({right:"100%",top:"50%",transform:"translateY(-50%)",marginRight:`${s}px`}),right:s=>({left:"100%",top:"50%",transform:"translateY(-50%)",marginLeft:`${s}px`})};let f=0,l;function v(s){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=s;const i=l.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const t=i.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(s,i){const t=i?v(String(i).trim()):null;if(!t){for(const e of b)s.style.removeProperty(e);return}const o=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),r=.2126*o(t[0])+.7152*o(t[1])+.0722*o(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,p=t.map(e=>Math.round(r?e*.92:e+(255-e)*.16)),n=(e,d)=>s.style.setProperty(e,d);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(e,c);n("--btn-primary-bg-hover",`rgb(${p[0]} ${p[1]} ${p[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(e,r?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])n(e,r?"0 0 0":"255 255 255");n("--vs-color",c),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["content","placement","offset","delay","arrow","glow-color","color"];#e;#i;#t;#r;#s;#o=!1;#n=0;#p=`vstg-${Date.now().toString(36)}${(f++).toString(36)}`;constructor(){super();const i=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=m,this.#e=document.createElement("span"),this.#e.className="vstg-wrap",this.#i=document.createElement("span"),this.#i.className="vstg-trigger",this.#i.tabIndex=0;const o=document.createElement("slot");o.textContent="Hover me",this.#i.appendChild(o),this.#t=document.createElement("span"),this.#t.className="vstg-tip",this.#t.id=this.#p,this.#t.setAttribute("role","tooltip"),this.#t.hidden=!0,this.#r=document.createElement("span"),this.#r.className="vstg-tip__content",this.#s=document.createElement("span"),this.#s.className="vstg-tip__arrow",this.#s.setAttribute("aria-hidden","true"),this.#t.append(this.#r,this.#s),this.#e.append(this.#i,this.#t),i.append(t,this.#e),this.#e.addEventListener("mouseenter",this.#a),this.#e.addEventListener("mouseleave",this.#l),this.#e.addEventListener("focusin",this.#a),this.#e.addEventListener("focusout",this.#l)}connectedCallback(){h(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){clearTimeout(this.#n),this.#e.removeEventListener("mouseenter",this.#a),this.#e.removeEventListener("mouseleave",this.#l),this.#e.removeEventListener("focusin",this.#a),this.#e.removeEventListener("focusout",this.#l)}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#c()}#c(){const i=this.getAttribute("content")??"Tooltip",t=this.getAttribute("placement")??"top",o=Number(this.getAttribute("offset")),a=this.getAttribute("glow-color")??"",r=this.hasAttribute("arrow");this.#r.innerHTML=i,this.#s.style.display=r?"":"none",this.#t.className=`vstg-tip vstg-tip--${t}${this.#o?" is-open":""}`,this.#g(t,Number.isFinite(o)?o:10),a?this.#t.style.setProperty("--vstg-glow",a):this.#t.style.removeProperty("--vstg-glow")}#g(i,t){const a=(g[i]||g.top)(t);this.#t.style.top=this.#t.style.bottom=this.#t.style.left=this.#t.style.right="",this.#t.style.marginTop=this.#t.style.marginBottom=this.#t.style.marginLeft=this.#t.style.marginRight="",this.#t.style.transform="";for(const r in a)this.#t.style[r]=a[r]}#h(){const i=Number(this.getAttribute("delay"));return Math.max(0,Number.isFinite(i)?i:120)}#a=()=>{clearTimeout(this.#n),this.#n=setTimeout(()=>this.#d(),this.#h())};#l=()=>{clearTimeout(this.#n),this.#m()};#d(){this.#o||(this.#o=!0,this.#t.hidden=!1,this.#t.offsetWidth,this.#t.classList.add("is-open"),this.#i.setAttribute("aria-describedby",this.#p))}#m(){this.#o&&(this.#o=!1,this.#t.classList.remove("is-open"),this.#t.hidden=!0,this.#i.removeAttribute("aria-describedby"))}}customElements.define("vs-tooltip-glow",u);
