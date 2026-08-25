const d=`
  :host { display: block; }
  :host([orientation="vertical"]) { display: inline-block; align-self: stretch; height: 100%; }

  .vsflow {
    --vsflow-col: var(--vs-color, var(--border, #2a2a2a));
    --vsflow-gap: 14px;
    --vsflow-dash: 8px;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .vsflow__line {
    flex: 1;
    height: 1px;
    border: 0;
    background: repeating-linear-gradient(
      to right,
      var(--vsflow-col) 0 var(--vsflow-dash),
      transparent var(--vsflow-dash) calc(var(--vsflow-dash) * 2)
    );
    background-size: calc(var(--vsflow-dash) * 2) 100%;
    animation: vsflow-march var(--vsflow-speed) linear infinite;
  }
  @keyframes vsflow-march {
    to { background-position: calc(var(--vsflow-dash) * 2) 0; }
  }

  .vsflow__label {
    flex: none;
    padding: 0 var(--vsflow-gap);
    font-family: inherit;
    font-size: 13px;
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    white-space: nowrap;
    user-select: none;
  }
  .has-label .vsflow__line--l {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 92%);
    mask-image: linear-gradient(to right, transparent, #000 92%);
  }
  .has-label .vsflow__line--r {
    -webkit-mask-image: linear-gradient(to left, transparent, #000 92%);
    mask-image: linear-gradient(to left, transparent, #000 92%);
  }
  .vsflow--lbl-start.has-label .vsflow__line--l { flex: 0 0 var(--vsflow-gap); }
  .vsflow--lbl-end.has-label .vsflow__line--r { flex: 0 0 var(--vsflow-gap); }

  /* vertical */
  .vsflow--vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 100%;
    min-height: 28px;
    align-self: stretch;
  }
  .vsflow--vertical .vsflow__line {
    width: 1px;
    height: auto;
    flex: 1;
    align-self: center;
    background: repeating-linear-gradient(
      to bottom,
      var(--vsflow-col) 0 var(--vsflow-dash),
      transparent var(--vsflow-dash) calc(var(--vsflow-dash) * 2)
    );
    background-size: 100% calc(var(--vsflow-dash) * 2);
    animation: vsflow-march-v var(--vsflow-speed) linear infinite;
  }
  @keyframes vsflow-march-v {
    to { background-position: 0 calc(var(--vsflow-dash) * 2); }
  }
  .vsflow--vertical .vsflow__label { padding: var(--vsflow-gap) 0; }
  .vsflow--vertical.has-label { min-height: 96px; }
  .vsflow--vertical.has-label .vsflow__line--l {
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 92%);
    mask-image: linear-gradient(to bottom, transparent, #000 92%);
  }
  .vsflow--vertical.has-label .vsflow__line--r {
    -webkit-mask-image: linear-gradient(to top, transparent, #000 92%);
    mask-image: linear-gradient(to top, transparent, #000 92%);
  }
  .vsflow--vertical.vsflow--lbl-start.has-label .vsflow__line--l { flex: 0 0 var(--vsflow-gap); }
  .vsflow--vertical.vsflow--lbl-end.has-label .vsflow__line--r { flex: 0 0 var(--vsflow-gap); }

  /* tones */
  .vsflow--t-danger { --vsflow-col: var(--accent-danger, #e5484d); }
  .vsflow--t-warn { --vsflow-col: var(--accent-warn, #f5a623); }
  .vsflow--t-success { --vsflow-col: var(--accent-success, #30a46c); }

  @media (prefers-reduced-motion: reduce) {
    .vsflow__line { animation: none !important; }
  }
`;let c;function g(o){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=o;const a=c.fillStyle;if(a.charAt(0)==="#")return[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)];const e=a.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(o,a){const e=a?g(String(a).trim()):null;if(!e){for(const t of p)o.style.removeProperty(t);return}const i=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,r=e.map(t=>Math.round(n?t*.92:t+(255-t)*.16)),l=(t,f)=>o.style.setProperty(t,f);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(t,s);l("--btn-primary-bg-hover",`rgb(${r[0]} ${r[1]} ${r[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(t,n?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])l(t,n?"0 0 0":"255 255 255");l("--vs-color",s),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["orientation","tone","label","label-position","speed","color"];#t;#s;#a;#e;#l;constructor(){super();const a=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=d,this.#t=document.createElement("div"),this.#t.className="vsflow",this.#t.setAttribute("role","separator"),this.#s=document.createElement("span"),this.#s.className="vsflow__line vsflow__line--l",this.#s.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="vsflow__label",this.#e=document.createElement("slot"),this.#a.appendChild(this.#e),this.#l=document.createElement("span"),this.#l.className="vsflow__line vsflow__line--r",this.#l.setAttribute("aria-hidden","true"),this.#t.append(this.#s,this.#a,this.#l),a.append(e,this.#t),this.#e.addEventListener("slotchange",()=>this.#n())}connectedCallback(){h(this,this.getAttribute("color")),this.#n()}disconnectedCallback(){}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#n()}#n(){const a=(t,f)=>this.getAttribute(t)??f,e=a("orientation","horizontal"),i=a("tone","default"),v=a("label-position","center"),n=a("speed","2.4"),s=a("label",""),r=this.#e.assignedNodes().map(t=>t.textContent).join("").trim(),l=!!s||!!r;s&&this.#e.textContent!==s&&(this.#e.textContent=s),this.#t.className=`vsflow vsflow--${e} vsflow--t-${i} vsflow--lbl-${v}`+(l?" has-label":""),this.#t.setAttribute("aria-orientation",e),this.#t.style.setProperty("--vsflow-speed",`${n}s`),this.#a.style.display=l?"":"none",this.#l.style.display=l?"":"none"}}customElements.define("vs-separator-flow",w);
