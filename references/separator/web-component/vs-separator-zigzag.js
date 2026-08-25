const p=`
  :host { display: block; }
  :host([orientation="vertical"]) { display: inline-flex; align-self: stretch; height: 100%; }

  .vszig {
    --vszig-col: var(--vs-color, var(--border, #2a2a2a));
    --vszig-gap: 14px;
    --vszig-size: 8px;
    display: flex;
    align-items: center;
    width: 100%;
  }

  /* zigzag drawn as two mirrored diagonal gradients forming chevrons */
  .vszig__line {
    flex: 1;
    height: calc(var(--vszig-size) * 2);
    border: 0;
    background:
      linear-gradient(135deg, var(--vszig-col) 1px, transparent 1px 50%),
      linear-gradient(45deg, var(--vszig-col) 1px, transparent 1px 50%);
    background-size: var(--vszig-size) var(--vszig-size);
    background-repeat: repeat-x;
    background-position: 0 50%;
    animation: vszig-drift var(--vszig-speed, 3.5s) linear infinite;
  }
  @keyframes vszig-drift {
    to { background-position: var(--vszig-size) 50%; }
  }

  .vszig__label {
    flex: none;
    padding: 0 var(--vszig-gap);
    font-family: inherit;
    font-size: 13px;
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    white-space: nowrap;
    user-select: none;
  }
  /* no-label: only the single leading line shows, spanning full width */
  .vszig:not(.has-label) .vszig__label,
  .vszig:not(.has-label) .vszig__line--r { display: none; }

  .has-label .vszig__line--l {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 92%);
    mask-image: linear-gradient(to right, transparent, #000 92%);
  }
  .has-label .vszig__line--r {
    -webkit-mask-image: linear-gradient(to left, transparent, #000 92%);
    mask-image: linear-gradient(to left, transparent, #000 92%);
  }
  .vszig--lbl-start.has-label .vszig__line--l { flex: 0 0 var(--vszig-gap); }
  .vszig--lbl-end.has-label .vszig__line--r { flex: 0 0 var(--vszig-gap); }

  /* vertical */
  .vszig--vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 100%;
    min-height: 28px;
    align-self: stretch;
  }
  .vszig--vertical .vszig__line {
    width: calc(var(--vszig-size) * 2);
    height: auto;
    flex: 1;
    align-self: center;
    background:
      linear-gradient(225deg, var(--vszig-col) 1px, transparent 1px 50%),
      linear-gradient(315deg, var(--vszig-col) 1px, transparent 1px 50%);
    background-size: var(--vszig-size) var(--vszig-size);
    background-repeat: repeat-y;
    background-position: 50% 0;
    animation: vszig-drift-v var(--vszig-speed, 3.5s) linear infinite;
  }
  @keyframes vszig-drift-v {
    to { background-position: 50% var(--vszig-size); }
  }
  .vszig--vertical .vszig__label { padding: var(--vszig-gap) 0; }
  .vszig--vertical.has-label { min-height: 96px; }
  .vszig--vertical.has-label .vszig__line--l {
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 92%);
    mask-image: linear-gradient(to bottom, transparent, #000 92%);
  }
  .vszig--vertical.has-label .vszig__line--r {
    -webkit-mask-image: linear-gradient(to top, transparent, #000 92%);
    mask-image: linear-gradient(to top, transparent, #000 92%);
  }
  .vszig--vertical.vszig--lbl-start.has-label .vszig__line--l { flex: 0 0 var(--vszig-gap); }
  .vszig--vertical.vszig--lbl-end.has-label .vszig__line--r { flex: 0 0 var(--vszig-gap); }

  /* tones */
  .vszig--t-danger { --vszig-col: var(--accent-danger, #e5484d); }
  .vszig--t-warn { --vszig-col: var(--accent-warn, #f5a623); }
  .vszig--t-success { --vszig-col: var(--accent-success, #30a46c); }

  @media (prefers-reduced-motion: reduce) {
    .vszig__line { animation: none !important; }
  }
`;let o;function h(n){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=n;const i=o.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const t=i.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(n,i){const t=i?h(String(i).trim()):null;if(!t){for(const e of b)n.style.removeProperty(e);return}const r=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),s=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,g=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(e=>Math.round(s?e*.92:e+(255-e)*.16)),a=(e,c)=>n.style.setProperty(e,c);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(e,g);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(e,s?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])a(e,s?"0 0 0":"255 255 255");a("--vs-color",g),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class z extends HTMLElement{static observedAttributes=["orientation","tone","label","label-position","speed","color"];#e;#i;#a;#s;#t;constructor(){super();const i=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=p,this.#e=document.createElement("div"),this.#e.className="vszig",this.#e.setAttribute("role","separator"),this.#i=document.createElement("span"),this.#i.className="vszig__line vszig__line--l",this.#i.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="vszig__label",this.#s=document.createElement("span"),this.#s.className="vszig__line vszig__line--r",this.#s.setAttribute("aria-hidden","true"),this.#t=document.createElement("slot"),this.#a.appendChild(this.#t),this.#t.addEventListener("slotchange",()=>this.#n()),this.#e.append(this.#i,this.#a,this.#s),i.append(t,this.#e)}connectedCallback(){d(this,this.getAttribute("color")),this.#n()}disconnectedCallback(){}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#e&&this.#n()}#n(){const i=(e,c)=>this.getAttribute(e)??c,t=i("orientation","horizontal"),r=i("tone","default"),v=i("label-position","center"),s=this.getAttribute("label")||"",g=this.#t.assignedNodes().some(e=>e.nodeType!==3||e.textContent.trim()),l=!!s||g;this.#e.className=`vszig vszig--${t} vszig--t-${r} vszig--lbl-${v}${l?" has-label":""}`,this.#e.setAttribute("aria-orientation",t),this.#t.textContent!==s&&(this.#t.textContent=s);const a=this.getAttribute("speed");a?this.#e.style.setProperty("--vszig-speed",`${a}s`):this.#e.style.removeProperty("--vszig-speed")}}customElements.define("vs-separator-zigzag",z);
