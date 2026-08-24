const h=`
  :host { display: block; width: 100%; }
  :host([orientation="vertical"]) { display: inline-flex; width: auto; height: 100%; align-self: stretch; }

  .vsep {
    --col: var(--vs-color, var(--border, #2a2a2a));
    --gap: 14px;
    --dash: 6px;
    display: flex;
    align-items: center;
    width: 100%;
  }
  /* hide the far line + label when there is no label (single-line mode) */
  .vsep:not(.has-label) .vsep__label,
  .vsep:not(.has-label) .vsep__line--r { display: none; }

  /* ── line: a true hairline ── */
  .vsep__line {
    flex: 1;
    height: 1px;
    background: var(--col);
    border: 0;
  }

  /* full solid line (no label): fade from the center toward both ends */
  .vsep--v-solid:not(.has-label) .vsep__line {
    background: linear-gradient(
      to right,
      transparent 0%,
      var(--col) 50%,
      transparent 100%
    );
  }
  .vsep--vertical.vsep--v-solid .vsep__line {
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--col) 50%,
      transparent 100%
    );
  }

  /* variants */
  .vsep--v-dashed .vsep__line {
    background: repeating-linear-gradient(
      to right,
      var(--col) 0 var(--dash),
      transparent var(--dash) calc(var(--dash) * 2)
    );
  }
  .vsep--v-dotted .vsep__line {
    background: repeating-linear-gradient(
      to right,
      var(--col) 0 1px,
      transparent 1px 4px
    );
  }

  /* ── label: line on each side, masked to fade toward the outer ends ── */
  .vsep__label {
    flex: none;
    padding: 0 var(--gap);
    font-family: inherit;
    font-size: 13px;
    line-height: 1;
    color: var(--text-muted, #8a8a8a);
    white-space: nowrap;
    user-select: none;
  }
  .has-label .vsep__line--l {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 92%);
    mask-image: linear-gradient(to right, transparent, #000 92%);
  }
  .has-label .vsep__line--r {
    -webkit-mask-image: linear-gradient(to left, transparent, #000 92%);
    mask-image: linear-gradient(to left, transparent, #000 92%);
  }
  /* alignment: shrink one side so the label sits near it */
  .vsep--lbl-start.has-label .vsep__line--l { flex: 0 0 var(--gap); }
  .vsep--lbl-end.has-label .vsep__line--r { flex: 0 0 var(--gap); }

  /* ── vertical ── */
  .vsep--vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: 100%;
    min-height: 28px;
    align-self: stretch;
  }
  .vsep--vertical .vsep__line {
    width: 1px;
    height: auto;
    flex: 1;
    align-self: center;
  }
  /* vertical label: text between top/bottom lines */
  .vsep--vertical .vsep__label { padding: var(--gap) 0; }
  .vsep--vertical.has-label .vsep__line--l {
    -webkit-mask-image: linear-gradient(to bottom, transparent, #000 92%);
    mask-image: linear-gradient(to bottom, transparent, #000 92%);
  }
  .vsep--vertical.has-label .vsep__line--r {
    -webkit-mask-image: linear-gradient(to top, transparent, #000 92%);
    mask-image: linear-gradient(to top, transparent, #000 92%);
  }
  .vsep--vertical.vsep--lbl-start.has-label .vsep__line--l { flex: 0 0 var(--gap); }
  .vsep--vertical.vsep--lbl-end.has-label .vsep__line--r { flex: 0 0 var(--gap); }
  .vsep--vertical.has-label { min-height: 96px; }
  .vsep--vertical.vsep--v-dashed .vsep__line {
    background: repeating-linear-gradient(
      to bottom,
      var(--col) 0 var(--dash),
      transparent var(--dash) calc(var(--dash) * 2)
    );
  }
  .vsep--vertical.vsep--v-dotted .vsep__line {
    background: repeating-linear-gradient(
      to bottom,
      var(--col) 0 1px,
      transparent 1px 4px
    );
  }

  /* ── tones ── */
  .vsep--t-danger { --col: #e5484d; }
  .vsep--t-warn { --col: #f5a623; }
  .vsep--t-success { --col: #30a46c; }
`;let p;function g(l){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=l;const a=p.fillStyle;if(a.charAt(0)==="#")return[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)];const e=a.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function c(l,a){const e=a?g(String(a).trim()):null;if(!e){for(const t of b)l.style.removeProperty(t);return}const i=t=>(t/=255,t<=.03928?t/12.92:((t+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(t=>Math.round(s?t*.92:t+(255-t)*.16)),n=(t,d)=>l.style.setProperty(t,d);for(const t of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(t,r);n("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const t of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(t,e.join(" "));for(const t of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(t,s?"#0b0b0b":"#ffffff");for(const t of["--btn-primary-rip","--btn-primary-glow"])n(t,s?"0 0 0":"255 255 255");n("--vs-color",r),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["orientation","variant","tone","label","label-position","color"];#e;#a;#n;#t;#i;constructor(){super();const a=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=h,this.#e=document.createElement("div"),this.#e.setAttribute("role","separator"),this.#a=document.createElement("span"),this.#a.className="vsep__line vsep__line--l",this.#a.setAttribute("aria-hidden","true"),this.#n=document.createElement("span"),this.#n.className="vsep__label",this.#t=document.createElement("slot"),this.#n.appendChild(this.#t),this.#i=document.createElement("span"),this.#i.className="vsep__line vsep__line--r",this.#i.setAttribute("aria-hidden","true"),this.#e.append(this.#a,this.#n,this.#i),a.append(e,this.#e),this.#t.addEventListener("slotchange",()=>this.#r())}connectedCallback(){c(this,this.getAttribute("color")),this.#r()}disconnectedCallback(){}attributeChangedCallback(){c(this,this.getAttribute("color")),this.#e&&this.#r()}#r(){const a=(r,o)=>this.getAttribute(r)??o,e=a("orientation","horizontal"),i=this.getAttribute("label")??"";this.#t.textContent!==i&&(this.#t.textContent=i);const s=this.#t.assignedNodes({flatten:!0}).some(r=>r.nodeType!==3||r.textContent.trim())||!!i;this.#e.className=`vsep vsep--${e} vsep--v-${a("variant","solid")} vsep--t-${a("tone","default")} vsep--lbl-${a("label-position","center")}${s?" has-label":""}`,this.#e.setAttribute("aria-orientation",e)}}customElements.define("vs-separator",m);
