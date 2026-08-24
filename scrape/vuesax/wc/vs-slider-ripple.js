const d=`
  :host { display: inline-block; }
  .srp {
    --srp-w: 200px;
    --srp-h: 8px;
    --srp-thumb: 16px;
    --accent: var(--ui-accent, #ededed);
    --srp-color: var(--accent);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: var(--srp-w);
    font-family: inherit;
    color: var(--text, #ededed);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .srp--sm { --srp-w: 160px; --srp-h: 6px; --srp-thumb: 13px; }
  .srp--lg { --srp-w: 260px; --srp-h: 10px; --srp-thumb: 20px; }

  .srp--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .srp--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .srp--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .srp__value {
    margin: 0;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.04em;
    color: var(--text-secondary, #a1a1a1);
  }
  .srp__value.is-hidden { display: none; }

  .srp__track {
    position: relative;
    width: 100%;
    height: var(--srp-h);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    cursor: grab;
    touch-action: none;
    outline: none;
  }
  .srp__track:active { cursor: grabbing; }
  .srp__track:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--ui-accent, #ededed) 80%, #fff);
    outline-offset: 4px;
  }

  .srp__fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--srp-color);
  }

  /* build-once absolute layer hosting independent, self-removing ripple nodes */
  .srp__ripples {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* UNIQUE EFFECT: expanding ripple ring emitted at each value change */
  .srp__ripple {
    position: absolute;
    top: 50%;
    width: var(--srp-thumb);
    height: var(--srp-thumb);
    transform: translate(-50%, -50%);
    border-radius: var(--ctrl-r-full, 999px);
    border: 2px solid var(--srp-color);
    pointer-events: none;
    animation: srp-wave 550ms ease-out forwards;
  }
  @keyframes srp-wave {
    0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(3.2); opacity: 0; }
  }

  .srp__thumb {
    position: absolute;
    top: 50%;
    width: var(--srp-thumb);
    height: var(--srp-thumb);
    border-radius: var(--ctrl-r-full, 999px);
    background: #fff;
    border: 2px solid var(--srp-color);
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.35);
    z-index: 1;
  }

  .srp__tip {
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
  .srp__tip.is-hidden { display: none; }

  .is-disabled { opacity: 0.45; }
  .is-disabled .srp__track { cursor: not-allowed; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .srp__ripple { animation: none; display: none; }
  }
`;let a;function f(n){if(a||=document.createElement("canvas").getContext("2d"),!a)return null;a.fillStyle="#000",a.fillStyle=n;const t=a.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function c(n,t){const e=t?f(String(t).trim()):null;if(!e){for(const s of m)n.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,p=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),r=(s,u)=>n.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,p);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,o?"0 0 0":"255 255 255");r("--vs-color",p),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class b extends HTMLElement{static observedAttributes=["value","default-value","min","max","stepped","step-size","size","tone","disabled","show-value","tooltip","ripple-color","color"];#t=50;#p=null;#v=!1;#a;#c;#e;#g;#r;#u;#d;#x=!1;#o=0;#_=0;#f=null;#n=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=d,this.#a=document.createElement("div"),this.#a.className="srp",this.#c=document.createElement("p"),this.#c.className="srp__value",this.#e=document.createElement("div"),this.#e.className="srp__track",this.#e.setAttribute("role","slider"),this.#e.tabIndex=0,this.#g=document.createElement("div"),this.#g.className="srp__fill",this.#r=document.createElement("div"),this.#r.className="srp__ripples",this.#r.setAttribute("aria-hidden","true"),this.#u=document.createElement("div"),this.#u.className="srp__thumb",this.#d=document.createElement("span"),this.#d.className="srp__tip",this.#u.appendChild(this.#d),this.#e.append(this.#g,this.#r,this.#u),this.#a.append(this.#c,this.#e),t.append(e,this.#a),this.#e.addEventListener("pointerdown",i=>this.#I(i)),this.#e.addEventListener("keydown",i=>this.#F(i))}connectedCallback(){c(this,this.getAttribute("color")),this.#v=!0;const t=this.hasAttribute("value")?this.#i("value",50):this.#i("default-value",50);this.#t=this.#b(t),this.#C()}disconnectedCallback(){this.#v=!1,this.#k()}attributeChangedCallback(t,e,i){if(c(this,this.getAttribute("color")),!(!this.#v||e===i)){if(t==="value"){if(i===null)this.#t=this.#b(this.#i("default-value",this.#t));else{if(this.#p!==null&&Number(i)===this.#p)return;this.#t=this.#b(this.#i("value",50))}this.#p=this.#t}else t==="default-value"&&!this.hasAttribute("value")&&(this.#t=this.#b(this.#i("default-value",this.#t)),this.#p=this.#t);this.#C()}}get value(){return this.#t}set value(t){this.setAttribute("value",String(t))}#i(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}get#s(){return this.#i("min",0)}get#l(){return this.#i("max",100)}get#w(){return this.hasAttribute("stepped")}get#y(){return this.#i("step-size",1)}get#m(){return this.hasAttribute("disabled")}get#M(){return this.hasAttribute("show-value")}get#N(){return this.hasAttribute("tooltip")}get#L(){return this.getAttribute("ripple-color")||""}#b(t){return Math.min(this.#l,Math.max(this.#s,t))}#D(t){return this.#w?Math.round(t/this.#y)*this.#y:t}#z(){return matchMedia("(prefers-reduced-motion: reduce)").matches}#E(){const t=this.#l-this.#s;return t<=0?0:Math.min(100,Math.max(0,(this.#t-this.#s)/t*100))}#h(t){const e=this.#b(this.#D(t));if(this.#m||e===this.#t)return;this.#t=e,this.#p=e,this.setAttribute("value",String(e)),this.#S(),this.#$();const i={value:e};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:i})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:i}))}#$(){if(this.#z())return;const t=document.createElement("span");for(t.className="srp__ripple",t.style.left=this.#E()+"%",t.addEventListener("animationend",()=>t.remove()),this.#r.appendChild(t);this.#r.childElementCount>8;)this.#r.firstElementChild.remove()}#F(t){if(this.#m)return;const e=this.#w?this.#y:(this.#l-this.#s)/100||1;t.key==="ArrowRight"||t.key==="ArrowUp"?(t.preventDefault(),this.#h(this.#t+e)):t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),this.#h(this.#t-e)):t.key==="Home"?(t.preventDefault(),this.#h(this.#s)):t.key==="End"&&(t.preventDefault(),this.#h(this.#l))}#A(t){const e=this.#e;if(!e)return this.#t;const i=e.getBoundingClientRect();if(!i.width)return this.#t;const h=Math.min(1,Math.max(0,(t-i.left)/i.width));return this.#s+h*(this.#l-this.#s)}#I(t){if(!this.#m){this.#x=!0;try{this.#e.setPointerCapture?.(t.pointerId)}catch{}this.#h(this.#A(t.clientX)),this.#f=e=>this.#R(e),this.#n=e=>this.#P(e,t.pointerId),document.addEventListener("pointermove",this.#f,{passive:!0}),document.addEventListener("pointerup",this.#n),document.addEventListener("pointercancel",this.#n)}}#R(t){this.#x&&(this.#_=t.clientX,!this.#o&&(this.#o=requestAnimationFrame(()=>{this.#o=0,!(!this.#x||!this.#v)&&this.#h(this.#A(this.#_))})))}#P(t,e){try{this.#e.releasePointerCapture?.(e)}catch{}this.#k()}#k(){this.#o&&(cancelAnimationFrame(this.#o),this.#o=0),this.#f&&(document.removeEventListener("pointermove",this.#f),this.#f=null),this.#n&&(document.removeEventListener("pointerup",this.#n),document.removeEventListener("pointercancel",this.#n),this.#n=null),this.#x=!1}#C(){const t=(e,i)=>this.getAttribute(e)??i;this.#a.className=`srp srp--${t("size","md")} srp--t-${t("tone","default")}`+(this.#m?" is-disabled":""),this.#a.style.setProperty("--srp-color",this.#L||"var(--ui-accent, #ededed)"),this.#c.classList.toggle("is-hidden",!this.#M),this.#d.classList.toggle("is-hidden",!this.#N),this.#m?this.#e.setAttribute("aria-disabled","true"):this.#e.removeAttribute("aria-disabled"),this.#S()}#S(){const t=Math.round(this.#t),e=this.#E();this.#c.textContent=String(t),this.#d.textContent=String(t),this.#g.style.width=e+"%",this.#u.style.left=e+"%",this.#e.setAttribute("aria-valuenow",String(t)),this.#e.setAttribute("aria-valuemin",String(this.#s)),this.#e.setAttribute("aria-valuemax",String(this.#l))}}customElements.define("vs-slider-ripple",b);
