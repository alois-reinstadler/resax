const h=`
  :host { display: block; }
  :host([orientation="vertical"]) { display: inline-flex; height: 100%; align-self: stretch; }

  .vsgrad {
    --vsgrad-col: var(--border, #2a2a2a);
    --vsgrad-hi: var(--ui-accent, #ededed);
    --vsgrad-gap: 14px;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .vsgrad__line {
    flex: 1;
    height: 1px;
    border: 0;
    background: linear-gradient(90deg,
      var(--vsgrad-col) 0%, var(--vsgrad-hi) 50%, var(--vsgrad-col) 100%);
    background-size: 220% 100%;
    animation: vsgrad-sweep var(--vsgrad-speed, 3s) linear infinite;
  }
  @keyframes vsgrad-sweep {
    from { background-position: 220% 0; }
    to { background-position: -220% 0; }
  }

  .vsgrad__label {
    flex: none;
    padding: 0 var(--vsgrad-gap);
    font-family: inherit;
    font-size: 13px;
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    white-space: nowrap;
    user-select: none;
  }

  /* label mode: show the two flanking lines; no-label mode: show the single line */
  .vsgrad:not(.has-label) .vsgrad__line--l,
  .vsgrad:not(.has-label) .vsgrad__line--r,
  .vsgrad:not(.has-label) .vsgrad__label { display: none; }
  .vsgrad.has-label .vsgrad__line--single { display: none; }

  .has-label .vsgrad__line--l {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 92%);
    mask-image: linear-gradient(to right, transparent, #000 92%);
  }
  .has-label .vsgrad__line--r {
    -webkit-mask-image: linear-gradient(to left, transparent, #000 92%);
    mask-image: linear-gradient(to left, transparent, #000 92%);
  }
  .vsgrad--lbl-start.has-label .vsgrad__line--l { flex: 0 0 var(--vsgrad-gap); }
  .vsgrad--lbl-end.has-label .vsgrad__line--r { flex: 0 0 var(--vsgrad-gap); }

  /* vertical */
  .vsgrad--vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 100%;
    min-height: 28px;
    align-self: stretch;
  }
  .vsgrad--vertical .vsgrad__line {
    width: 1px;
    height: auto;
    flex: 1;
    align-self: center;
    background: linear-gradient(180deg,
      var(--vsgrad-col) 0%, var(--vsgrad-hi) 50%, var(--vsgrad-col) 100%);
    background-size: 100% 220%;
    animation: vsgrad-sweep-v var(--vsgrad-speed, 3s) linear infinite;
  }
  @keyframes vsgrad-sweep-v {
    from { background-position: 0 220%; }
    to { background-position: 0 -220%; }
  }
  .vsgrad--vertical .vsgrad__label { padding: var(--vsgrad-gap) 0; }
  .vsgrad--vertical.has-label { min-height: 96px; }
  .vsgrad--vertical.has-label .vsgrad__line--l {
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 92%);
    mask-image: linear-gradient(to bottom, transparent, #000 92%);
  }
  .vsgrad--vertical.has-label .vsgrad__line--r {
    -webkit-mask-image: linear-gradient(to top, transparent, #000 92%);
    mask-image: linear-gradient(to top, transparent, #000 92%);
  }
  .vsgrad--vertical.vsgrad--lbl-start.has-label .vsgrad__line--l { flex: 0 0 var(--vsgrad-gap); }
  .vsgrad--vertical.vsgrad--lbl-end.has-label .vsgrad__line--r { flex: 0 0 var(--vsgrad-gap); }

  /* tones override the highlight color */
  .vsgrad--t-danger { --vsgrad-hi: var(--accent-danger, #e5484d); }
  .vsgrad--t-warn { --vsgrad-hi: var(--accent-warn, #f5a623); }
  .vsgrad--t-success { --vsgrad-hi: var(--accent-success, #30a46c); }

  @media (prefers-reduced-motion: reduce) {
    .vsgrad__line { animation: none !important; }
  }
`;let o;function b(i){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=i;const a=o.fillStyle;if(a.charAt(0)==="#")return[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)];const e=a.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function c(i,a){const e=a?b(String(a).trim()):null;if(!e){for(const t of p)i.style.removeProperty(t);return}const s=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),n=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,g=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(t=>Math.round(n?t*.92:t+(255-t)*.16)),r=(t,v)=>i.style.setProperty(t,v);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(t,g);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(t,n?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])r(t,n?"0 0 0":"255 255 255");r("--vs-color",g),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["orientation","tone","label","label-position","speed","color"];#e;#n;#i;#l;#a;#t;#o=!1;constructor(){super();const a=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=h,this.#e=document.createElement("div"),this.#n=this.#r("vsgrad__line--single"),this.#i=this.#r("vsgrad__line--l"),this.#a=document.createElement("span"),this.#a.className="vsgrad__label",this.#t=document.createElement("slot"),this.#a.append(this.#t),this.#l=this.#r("vsgrad__line--r"),this.#e.append(this.#n,this.#i,this.#a,this.#l),a.append(e,this.#e),this.#t.addEventListener("slotchange",()=>{this.#o=this.#t.assignedNodes().some(s=>s.textContent.trim()||s.nodeType===1),this.#s()})}#r(a){const e=document.createElement("span");return e.className=`vsgrad__line ${a}`,e.setAttribute("aria-hidden","true"),e}connectedCallback(){c(this,this.getAttribute("color")),this.#s()}disconnectedCallback(){}attributeChangedCallback(){c(this,this.getAttribute("color")),this.#e&&this.#s()}#s(){const a=(l,r)=>this.getAttribute(l)??r,e=a("orientation","horizontal"),s=a("tone","default"),d=a("label-position","center"),n=a("label",""),g=!!n||this.#o;this.#e.className=`vsgrad vsgrad--${e} vsgrad--t-${s} vsgrad--lbl-${d}`+(g?" has-label":""),this.#e.style.setProperty("--vsgrad-speed",`${a("speed","3")}s`),this.#t.textContent!==n&&(this.#t.textContent=n),this.setAttribute("role","separator"),this.setAttribute("aria-orientation",e)}}customElements.define("vs-separator-gradient",f);
