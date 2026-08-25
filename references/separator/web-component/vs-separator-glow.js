const p=`
  :host { display: block; }
  :host([orientation="vertical"]) { display: inline-block; height: 100%; }

  .vsglow {
    --vsglow-col: var(--border, #2a2a2a);
    --vsglow-hi: var(--ui-accent, #ededed);
    --vsglow-gap: 14px;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .vsglow__line {
    flex: 1;
    height: 1px;
    border: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      var(--vsglow-hi) 50%,
      transparent 100%
    );
    /* Perf: max shadow baked statically; only opacity animates (compositable).
       The element opacity already modulates the glow intensity per frame. */
    box-shadow: 0 0 10px 1px var(--vsglow-hi);
    animation: vsglow-pulse var(--vsglow-speed, 2.8s) ease-in-out infinite;
  }
  @keyframes vsglow-pulse {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 1; }
  }

  .vsglow__label {
    flex: none;
    padding: 0 var(--vsglow-gap);
    font-family: inherit;
    font-size: 13px;
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    white-space: nowrap;
    user-select: none;
  }
  .has-label .vsglow__line--l {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 92%);
    mask-image: linear-gradient(to right, transparent, #000 92%);
  }
  .has-label .vsglow__line--r {
    -webkit-mask-image: linear-gradient(to left, transparent, #000 92%);
    mask-image: linear-gradient(to left, transparent, #000 92%);
  }
  .vsglow--lbl-start.has-label .vsglow__line--l { flex: 0 0 var(--vsglow-gap); }
  .vsglow--lbl-end.has-label .vsglow__line--r { flex: 0 0 var(--vsglow-gap); }

  /* vertical */
  .vsglow--vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 100%;
    min-height: 28px;
    align-self: stretch;
  }
  .vsglow--vertical .vsglow__line {
    width: 1px;
    height: auto;
    flex: 1;
    align-self: center;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--vsglow-hi) 50%,
      transparent 100%
    );
  }
  .vsglow--vertical .vsglow__label { padding: var(--vsglow-gap) 0; }
  .vsglow--vertical.has-label { min-height: 96px; }
  .vsglow--vertical.has-label .vsglow__line--l {
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 92%);
    mask-image: linear-gradient(to bottom, transparent, #000 92%);
  }
  .vsglow--vertical.has-label .vsglow__line--r {
    -webkit-mask-image: linear-gradient(to top, transparent, #000 92%);
    mask-image: linear-gradient(to top, transparent, #000 92%);
  }
  .vsglow--vertical.vsglow--lbl-start.has-label .vsglow__line--l { flex: 0 0 var(--vsglow-gap); }
  .vsglow--vertical.vsglow--lbl-end.has-label .vsglow__line--r { flex: 0 0 var(--vsglow-gap); }

  /* tones override the glow color */
  .vsglow--t-danger { --vsglow-hi: var(--accent-danger, #e5484d); }
  .vsglow--t-warn { --vsglow-hi: var(--accent-warn, #f5a623); }
  .vsglow--t-success { --vsglow-hi: var(--accent-success, #30a46c); }

  @media (prefers-reduced-motion: reduce) {
    .vsglow__line { animation: none !important; opacity: 1; box-shadow: 0 0 6px 0 var(--vsglow-hi); }
  }
`;let o;function d(n){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=n;const a=o.fillStyle;if(a.charAt(0)==="#")return[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)];const t=a.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(n,a){const t=a?d(String(a).trim()):null;if(!t){for(const e of b)n.style.removeProperty(e);return}const l=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),i=.2126*l(t[0])+.7152*l(t[1])+.0722*l(t[2])>.45,r=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(e=>Math.round(i?e*.92:e+(255-e)*.16)),s=(e,h)=>n.style.setProperty(e,h);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(e,r);s("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(e,i?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])s(e,i?"0 0 0":"255 255 255");s("--vs-color",r),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["orientation","tone","label","label-position","speed","color"];#t;#l;#e;#s;#a;constructor(){super();const a=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=p,this.#t=document.createElement("div"),this.#l=document.createElement("span"),this.#l.setAttribute("aria-hidden","true"),this.#e=document.createElement("span"),this.#e.className="vsglow__label",this.#s=document.createElement("slot"),this.#e.append(this.#s),this.#a=document.createElement("span"),this.#a.className="vsglow__line vsglow__line--r",this.#a.setAttribute("aria-hidden","true"),this.#t.append(this.#l,this.#e,this.#a),a.append(t,this.#t)}connectedCallback(){v(this,this.getAttribute("color")),this.setAttribute("role","separator"),this.#i()}disconnectedCallback(){}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#t&&this.#i()}#i(){const a=(i,r)=>this.getAttribute(i)??r,t=a("orientation","horizontal"),l=!!a("label","")||this.childNodes.length>0;this.setAttribute("aria-orientation",t),this.#t.className=`vsglow vsglow--${t} vsglow--t-${a("tone","default")} vsglow--lbl-${a("label-position","center")}${l?" has-label":""}`;const g=a("speed","");g?this.#t.style.setProperty("--vsglow-speed",`${g}s`):this.#t.style.removeProperty("--vsglow-speed"),this.#l.className=`vsglow__line${l?" vsglow__line--l":""}`,this.#s.textContent=a("label",""),this.#e.style.display=l?"":"none",this.#a.style.display=l?"":"none"}}customElements.define("vs-separator-glow",w);
