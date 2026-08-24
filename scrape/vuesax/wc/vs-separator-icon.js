const v=`
  :host { display: block; }
  .vsicon {
    --vsicon-col: var(--border, #2a2a2a);
    --vsicon-hi: var(--ui-accent, #ededed);
    --vsicon-gap: 10px;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .vsicon__line {
    flex: 1;
    height: 1px;
    border: 0;
    background: var(--vsicon-col);
  }
  .vsicon__line--l {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 92%);
    mask-image: linear-gradient(to right, transparent, #000 92%);
  }
  .vsicon__line--r {
    -webkit-mask-image: linear-gradient(to left, transparent, #000 92%);
    mask-image: linear-gradient(to left, transparent, #000 92%);
  }

  .vsicon__node {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: var(--vsicon-gap);
    padding: 0 var(--vsicon-gap);
    color: var(--vsicon-hi);
  }
  .vsicon__mark {
    display: block;
    animation: vsicon-spin 6s linear infinite;
    transform-origin: center;
  }
  @keyframes vsicon-spin {
    to { transform: rotate(360deg); }
  }

  .vsicon__label {
    font-family: inherit;
    font-size: 13px;
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    white-space: nowrap;
    user-select: none;
  }
  .vsicon__label[hidden] { display: none; }

  /* vertical */
  .vsicon--vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 100%;
    min-height: 64px;
    align-self: stretch;
  }
  .vsicon--vertical .vsicon__line {
    width: 1px;
    height: auto;
    flex: 1;
    align-self: center;
  }
  .vsicon--vertical .vsicon__line--l {
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 92%);
    mask-image: linear-gradient(to bottom, transparent, #000 92%);
  }
  .vsicon--vertical .vsicon__line--r {
    -webkit-mask-image: linear-gradient(to top, transparent, #000 92%);
    mask-image: linear-gradient(to top, transparent, #000 92%);
  }
  .vsicon--vertical .vsicon__node {
    flex-direction: column;
    padding: var(--vsicon-gap) 0;
  }

  /* tones override the node color */
  .vsicon--t-danger { --vsicon-hi: var(--accent-danger, #e5484d); }
  .vsicon--t-warn { --vsicon-hi: var(--accent-warn, #f5a623); }
  .vsicon--t-success { --vsicon-hi: var(--accent-success, #30a46c); }

  @media (prefers-reduced-motion: reduce) {
    .vsicon__mark { animation: none !important; }
  }
`,g="http://www.w3.org/2000/svg";let d;function h(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const n=d.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const t=n.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(c,n){const t=n?h(String(n).trim()):null;if(!t){for(const e of b)c.style.removeProperty(e);return}const i=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),r=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,o=`rgb(${t[0]} ${t[1]} ${t[2]})`,s=t.map(e=>Math.round(r?e*.92:e+(255-e)*.16)),a=(e,p)=>c.style.setProperty(e,p);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(e,o);a("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(e,r?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])a(e,r?"0 0 0":"255 255 255");a("--vs-color",o),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["orientation","tone","label","color"];#t;#e;#n;constructor(){super();const n=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=v,this.#t=document.createElement("div"),this.#t.setAttribute("role","separator");const i=document.createElement("span");i.className="vsicon__line vsicon__line--l",i.setAttribute("aria-hidden","true");const l=document.createElement("span");l.className="vsicon__node",l.setAttribute("aria-hidden","true"),this.#n=document.createElement("slot");const r=document.createElementNS(g,"svg");r.setAttribute("viewBox","0 0 12 12"),r.setAttribute("width","12"),r.setAttribute("height","12"),r.setAttribute("class","vsicon__mark");const o=document.createElementNS(g,"path");o.setAttribute("d","M6 0.5 11.5 6 6 11.5 0.5 6Z"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.4"),r.appendChild(o),this.#n.appendChild(r),this.#e=document.createElement("span"),this.#e.className="vsicon__label",l.append(this.#n,this.#e);const s=document.createElement("span");s.className="vsicon__line vsicon__line--r",s.setAttribute("aria-hidden","true"),this.#t.append(i,l,s),n.append(t,this.#t)}connectedCallback(){m(this,this.getAttribute("color")),this.#i()}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&this.#i()}#i(){const n=this.getAttribute("orientation")||"horizontal",t=this.getAttribute("tone")||"default",i=this.getAttribute("label")||"";this.#t.className=`vsicon vsicon--${n} vsicon--t-${t}${i?" has-label":""}`,this.#t.setAttribute("aria-orientation",n),this.#e.textContent=i,this.#e.hidden=!i}}customElements.define("vs-separator-icon",f);
