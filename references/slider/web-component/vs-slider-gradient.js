const g=`
  :host { display: inline-flex; }
  .sg {
    --sg-w: 200px;
    --sg-h: 8px;
    --sg-thumb: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: var(--sg-w);
    font-family: inherit;
    color: var(--text, #ededed);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .sg--sm { --sg-w: 160px; --sg-h: 6px; --sg-thumb: 13px; }
  .sg--lg { --sg-w: 260px; --sg-h: 10px; --sg-thumb: 20px; }

  .sg__value {
    margin: 0;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.04em;
    color: var(--text-secondary, #a1a1a1);
  }

  .sg__track {
    position: relative;
    width: 100%;
    height: var(--sg-h);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    cursor: grab;
    touch-action: none;
    outline: none;
  }
  .sg__track:active { cursor: grabbing; }
  .sg__track:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--ui-accent, #ededed) 80%, #fff);
    outline-offset: 4px;
  }

  /* UNIQUE EFFECT: animated multi-stop gradient fill that slowly pans */
  .sg__fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: var(--ctrl-r-full, 999px);
    background: linear-gradient(90deg, var(--sg-from), var(--sg-to), var(--sg-from));
    background-size: 200% 100%;
    animation: sg-pan 3s linear infinite;
  }
  @keyframes sg-pan {
    from { background-position: 0% 0; }
    to { background-position: -200% 0; }
  }

  .sg__thumb {
    position: absolute;
    top: 50%;
    width: var(--sg-thumb);
    height: var(--sg-thumb);
    border-radius: var(--ctrl-r-full, 999px);
    background: #fff;
    border: 2px solid var(--sg-to);
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.35);
    transition: box-shadow 160ms ease;
  }
  .sg__track:focus-visible .sg__thumb,
  .sg__track:active .sg__thumb {
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--sg-to) 30%, transparent);
  }

  .sg__tip {
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
  .is-disabled .sg__track { cursor: not-allowed; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .sg__fill { animation: none; }
    .sg__thumb { transition: none; }
  }

  /* extension (not in source SFC): optional tone presets, same idea as the
     sibling vs-number-slider's --accent tones — sets a local --accent that
     the default --sg-from/--sg-to expressions fall back to below, unless
     from-color/to-color attrs override them via inline style. */
  .sg--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .sg--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .sg--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }
`;let o;function p(a){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=a;const t=o.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(a,t){const e=t?p(String(t).trim()):null;if(!e){for(const s of f)a.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),r=(s,d)=>a.style.setProperty(s,d);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,c);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,n?"0 0 0":"255 255 255");r("--vs-color",c),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class b extends HTMLElement{static observedAttributes=["value","default-value","min","max","stepped","step-size","size","tone","disabled","show-value","tooltip","from-color","to-color","color"];#e=50;#c=null;#m=!1;#i;#u;#t;#d;#a;#g;#v=!1;#o=0;#y=0;#p=null;#n=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#i=document.createElement("div"),this.#i.className="sg",this.#u=document.createElement("p"),this.#u.className="sg__value",this.#t=document.createElement("div"),this.#t.className="sg__track",this.#t.setAttribute("role","slider"),this.#t.setAttribute("tabindex","0"),this.#d=document.createElement("div"),this.#d.className="sg__fill",this.#d.setAttribute("aria-hidden","true"),this.#a=document.createElement("div"),this.#a.className="sg__thumb",this.#a.setAttribute("aria-hidden","true"),this.#g=document.createElement("span"),this.#g.className="sg__tip",this.#a.appendChild(this.#g),this.#t.append(this.#d,this.#a),this.#i.append(this.#u,this.#t),t.append(e,this.#i),this.#t.addEventListener("pointerdown",i=>this.#z(i)),this.#t.addEventListener("keydown",i=>this.#L(i))}connectedCallback(){u(this,this.getAttribute("color")),this.#m=!0;const t=this.hasAttribute("value")?this.#s("value",50):this.#s("default-value",50);this.#e=this.#b(t),this.#C()}disconnectedCallback(){this.#m=!1,this.#E()}attributeChangedCallback(t,e,i){if(u(this,this.getAttribute("color")),!(!this.#m||e===i)){if(t==="value"){if(i===null)this.#e=this.#b(this.#s("default-value",this.#e));else{if(this.#c!==null&&Number(i)===this.#c)return;this.#e=this.#b(this.#s("value",50))}this.#c=this.#e}else t==="default-value"&&!this.hasAttribute("value")&&(this.#e=this.#b(this.#s("default-value",this.#e)),this.#c=this.#e);this.#C()}}get value(){return this.#e}set value(t){this.setAttribute("value",String(t))}#s(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}get#r(){return this.#s("min",0)}get#l(){return this.#s("max",100)}get#_(){return this.hasAttribute("stepped")}get#x(){return this.#s("step-size",1)}get#f(){return this.hasAttribute("disabled")}get#D(){return this.hasAttribute("show-value")}get#M(){return this.hasAttribute("tooltip")}get#w(){return this.getAttribute("from-color")||""}get#A(){return this.getAttribute("to-color")||""}#b(t){return Math.min(this.#l,Math.max(this.#r,t))}#N(t){return this.#_?Math.round(t/this.#x)*this.#x:t}#h(t){const e=this.#b(t);if(this.#f||e===this.#e)return;this.#e=e,this.#c=e,this.setAttribute("value",String(e)),this.#S();const i={value:e};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:i})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:i}))}#L(t){if(this.#f)return;const e=this.#_?this.#x:(this.#l-this.#r)/100||1;t.key==="ArrowRight"||t.key==="ArrowUp"?(t.preventDefault(),this.#h(this.#e+e)):t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),this.#h(this.#e-e)):t.key==="Home"?(t.preventDefault(),this.#h(this.#r)):t.key==="End"&&(t.preventDefault(),this.#h(this.#l))}#k(t){const e=this.#t;if(!e)return this.#e;const i=e.getBoundingClientRect();if(!i.width)return this.#e;const h=Math.min(1,Math.max(0,(t-i.left)/i.width)),n=this.#r+h*(this.#l-this.#r);return this.#N(n)}#z(t){if(!this.#f){this.#v=!0;try{this.#t.setPointerCapture?.(t.pointerId)}catch{}this.#h(this.#k(t.clientX)),this.#p=e=>this.#P(e),this.#n=e=>this.#F(e,t.pointerId),document.addEventListener("pointermove",this.#p,{passive:!0}),document.addEventListener("pointerup",this.#n),document.addEventListener("pointercancel",this.#n)}}#P(t){this.#v&&(this.#y=t.clientX,!this.#o&&(this.#o=requestAnimationFrame(()=>{this.#o=0,!(!this.#v||!this.#m)&&this.#h(this.#k(this.#y))})))}#F(t,e){try{this.#t.releasePointerCapture?.(e)}catch{}this.#E()}#E(){this.#o&&(cancelAnimationFrame(this.#o),this.#o=0),this.#p&&(document.removeEventListener("pointermove",this.#p),this.#p=null),this.#n&&(document.removeEventListener("pointerup",this.#n),document.removeEventListener("pointercancel",this.#n),this.#n=null),this.#v=!1}#C(){const t=this.getAttribute("size")||"md",e=this.getAttribute("tone")||"default";this.#i.className=`sg sg--${t}`+(e!=="default"?` sg--t-${e}`:"")+(this.#f?" is-disabled":""),this.#w?this.#i.style.setProperty("--sg-from",this.#w):this.#i.style.setProperty("--sg-from","var(--ui-accent, #ededed)"),this.#A?this.#i.style.setProperty("--sg-to",this.#A):this.#i.style.setProperty("--sg-to","color-mix(in srgb, var(--ui-accent, #ededed) 40%, #8a8a8a)"),this.#u.style.display=this.#D?"":"none",this.#g.style.display=this.#M?"":"none",this.#t.setAttribute("aria-valuemin",String(this.#r)),this.#t.setAttribute("aria-valuemax",String(this.#l)),this.#f?(this.#t.setAttribute("aria-disabled","true"),this.#t.setAttribute("tabindex","-1")):(this.#t.removeAttribute("aria-disabled"),this.#t.setAttribute("tabindex","0")),this.#S()}#S(){const t=this.#l-this.#r,e=t<=0?0:Math.min(100,Math.max(0,(this.#e-this.#r)/t*100)),i=Math.round(this.#e);this.#u.textContent=String(i),this.#g.textContent=String(i),this.#d.style.width=e+"%",this.#a.style.left=e+"%",this.#t.setAttribute("aria-valuenow",String(i))}}customElements.define("vs-slider-gradient",b);
