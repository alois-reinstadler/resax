const d=`
  :host { display: inline-flex; }
  .sgw {
    --sgw-w: 200px;
    --sgw-h: 8px;
    --sgw-thumb: 16px;
    --sgw-color: var(--ui-accent, #ededed);
    --sgw-i: 0.7;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: var(--sgw-w);
    font-family: inherit;
    color: var(--text, #ededed);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .sgw--sm { --sgw-w: 160px; --sgw-h: 6px; --sgw-thumb: 13px; }
  .sgw--lg { --sgw-w: 260px; --sgw-h: 10px; --sgw-thumb: 20px; }

  .sgw--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .sgw--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .sgw--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .sgw__value {
    margin: 0;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.04em;
    color: var(--text-secondary, #a1a1a1);
  }

  .sgw__track {
    position: relative;
    width: 100%;
    height: var(--sgw-h);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    cursor: grab;
    touch-action: none;
    outline: none;
  }
  .sgw__track:active { cursor: grabbing; }
  .sgw__track:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--ui-accent, #ededed) 80%, #fff);
    outline-offset: 4px;
  }

  /* UNIQUE EFFECT: neon bloom — the fill and thumb radiate a pulsing glow */
  .sgw__fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--sgw-color);
    box-shadow:
      0 0 calc(6px * var(--sgw-i)) color-mix(in srgb, var(--sgw-color) 90%, transparent),
      0 0 calc(16px * var(--sgw-i)) color-mix(in srgb, var(--sgw-color) 60%, transparent);
  }
  /* Perf: filter is not animated per frame. ::after is a copy of the fill (bg + glow
     inherited) with the max brightness baked in; only its opacity pulses (compositable). */
  .sgw__fill::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    background: inherit;
    box-shadow: inherit;
    filter: brightness(calc(1 + 0.35 * var(--sgw-i)));
    opacity: 0;
    animation: sgw-pulse 2.2s ease-in-out infinite;
  }
  @keyframes sgw-pulse {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  .sgw__thumb {
    position: absolute;
    top: 50%;
    width: var(--sgw-thumb);
    height: var(--sgw-thumb);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--sgw-color);
    transform: translate(-50%, -50%);
    box-shadow:
      0 0 calc(8px * var(--sgw-i)) color-mix(in srgb, var(--sgw-color) 90%, transparent),
      0 0 calc(20px * var(--sgw-i)) color-mix(in srgb, var(--sgw-color) 55%, transparent);
  }

  .sgw__tip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    padding: 2px 7px;
    font-size: 11px;
    border-radius: var(--ctrl-r-sm, 6px);
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    white-space: nowrap;
  }

  .is-disabled { opacity: 0.45; }
  .is-disabled .sgw__track { cursor: not-allowed; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .sgw__fill { animation: none; }
    .sgw__fill::after { animation: none; opacity: 0; }
  }
`;let a;function g(n){if(a||=document.createElement("canvas").getContext("2d"),!a)return null;a.fillStyle="#000",a.fillStyle=n;const t=a.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function c(n,t){const e=t?g(String(t).trim()):null;if(!e){for(const s of p)n.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),r=(s,u)=>n.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,h);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,o?"0 0 0":"255 255 255");r("--vs-color",h),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["value","default-value","min","max","stepped","step-size","size","tone","disabled","show-value","tooltip","intensity","glow-color","glow-intensity","color"];#t=50;#h=null;#m=!1;#r;#c;#e;#b;#u;#d;#v=!1;#a=0;#x=0;#g=null;#n=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=d,this.#r=document.createElement("div"),this.#r.className="sgw",this.#c=document.createElement("p"),this.#c.className="sgw__value",this.#e=document.createElement("div"),this.#e.className="sgw__track",this.#e.setAttribute("role","slider"),this.#e.tabIndex=0,this.#b=document.createElement("div"),this.#b.className="sgw__fill",this.#u=document.createElement("div"),this.#u.className="sgw__thumb",this.#d=document.createElement("span"),this.#d.className="sgw__tip",this.#u.append(this.#d),this.#e.append(this.#b,this.#u),this.#r.append(this.#c,this.#e),t.append(e,this.#r),this.#e.addEventListener("pointerdown",i=>this.#L(i)),this.#e.addEventListener("keydown",i=>this.#z(i))}connectedCallback(){c(this,this.getAttribute("color")),this.#m=!0;const t=this.hasAttribute("value")?this.#i("value",50):this.#i("default-value",50);this.#t=this.#f(t),this.#E()}disconnectedCallback(){this.#m=!1,this.#A()}attributeChangedCallback(t,e,i){if(c(this,this.getAttribute("color")),!(!this.#m||e===i)){if(t==="value"){if(i===null)this.#t=this.#f(this.#i("default-value",this.#t));else{if(this.#h!==null&&Number(i)===this.#h)return;this.#t=this.#f(this.#i("value",50))}this.#h=this.#t}else t==="default-value"&&!this.hasAttribute("value")&&(this.#t=this.#f(this.#i("default-value",this.#t)),this.#h=this.#t);this.#E()}}get value(){return this.#t}set value(t){this.setAttribute("value",String(t))}#i(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}get#s(){return this.#i("min",0)}get#o(){return this.#i("max",100)}get#y(){return this.hasAttribute("stepped")}get#w(){return this.#i("step-size",1)}get#p(){return this.hasAttribute("disabled")}get#S(){return this.hasAttribute("show-value")}get#C(){return this.hasAttribute("tooltip")}get#M(){const t=this.hasAttribute("intensity")?this.#i("intensity",.7):this.#i("glow-intensity",.7);return Math.min(1,Math.max(0,t))}get#D(){return this.getAttribute("glow-color")||""}#f(t){return Math.min(this.#o,Math.max(this.#s,t))}#N(t){return this.#y?Math.round(t/this.#w)*this.#w:t}#l(t){const e=this.#f(this.#N(t));if(this.#p||e===this.#t)return;this.#t=e,this.#h=e,this.setAttribute("value",String(e)),this.#k();const i={value:e};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:i})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:i}))}#_(t){const e=this.#e.getBoundingClientRect();if(!e.width)return this.#t;const i=Math.min(1,Math.max(0,(t-e.left)/e.width));return this.#s+i*(this.#o-this.#s)}#L(t){if(!this.#p){this.#v=!0;try{this.#e.setPointerCapture?.(t.pointerId)}catch{}this.#l(this.#_(t.clientX)),this.#g=e=>this.#P(e),this.#n=e=>this.#$(e,t.pointerId),document.addEventListener("pointermove",this.#g,{passive:!0}),document.addEventListener("pointerup",this.#n),document.addEventListener("pointercancel",this.#n)}}#P(t){this.#v&&(this.#x=t.clientX,!this.#a&&(this.#a=requestAnimationFrame(()=>{this.#a=0,!(!this.#v||!this.#m)&&this.#l(this.#_(this.#x))})))}#$(t,e){try{this.#e.releasePointerCapture?.(e)}catch{}this.#A()}#A(){this.#a&&(cancelAnimationFrame(this.#a),this.#a=0),this.#g&&(document.removeEventListener("pointermove",this.#g),this.#g=null),this.#n&&(document.removeEventListener("pointerup",this.#n),document.removeEventListener("pointercancel",this.#n),this.#n=null),this.#v=!1}#z(t){if(this.#p)return;const e=this.#y?this.#w:(this.#o-this.#s)/100||1;t.key==="ArrowRight"||t.key==="ArrowUp"?(t.preventDefault(),this.#l(this.#t+e)):t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),this.#l(this.#t-e)):t.key==="Home"?(t.preventDefault(),this.#l(this.#s)):t.key==="End"&&(t.preventDefault(),this.#l(this.#o))}#E(){const t=(e,i)=>this.getAttribute(e)??i;this.#r.className=`sgw sgw--${t("size","md")} sgw--t-${t("tone","default")}`+(this.#p?" is-disabled":""),this.#r.style.setProperty("--sgw-i",String(this.#M)),this.#r.style.setProperty("--sgw-color",this.#D||"var(--ui-accent, #ededed)"),this.#k()}#k(){const t=this.#o-this.#s,e=t<=0?0:Math.min(100,Math.max(0,(this.#t-this.#s)/t*100)),i=Math.round(this.#t);this.#b.style.width=e+"%",this.#u.style.left=e+"%",this.#c.textContent=String(i),this.#c.hidden=!this.#S,this.#d.textContent=String(i),this.#d.hidden=!this.#C,this.#e.setAttribute("aria-valuemin",String(this.#s)),this.#e.setAttribute("aria-valuemax",String(this.#o)),this.#e.setAttribute("aria-valuenow",String(i)),this.#p?this.#e.setAttribute("aria-disabled","true"):this.#e.removeAttribute("aria-disabled")}}customElements.define("vs-slider-glow",f);
