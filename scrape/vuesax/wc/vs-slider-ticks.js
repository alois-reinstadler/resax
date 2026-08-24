const p=`
  :host { display: inline-flex; }
  .stk {
    --stk-w: 200px;
    --stk-h: 8px;
    --stk-thumb: 16px;
    --accent: var(--ui-accent, #ededed);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: var(--stk-w);
    font-family: inherit;
    color: var(--text, #ededed);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .stk--sm { --stk-w: 160px; --stk-h: 6px; --stk-thumb: 13px; }
  .stk--lg { --stk-w: 260px; --stk-h: 10px; --stk-thumb: 20px; }

  .stk__value {
    margin: 0;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.04em;
    color: var(--text-secondary, #a1a1a1);
  }

  .stk__tip {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    padding: 2px 7px;
    font-size: 11px;
    border-radius: var(--ctrl-r-sm, 6px);
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    white-space: nowrap;
  }

  .stk__track {
    position: relative;
    width: 100%;
    height: var(--stk-h);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    cursor: grab;
    touch-action: none;
    outline: none;
  }
  .stk__track:active { cursor: grabbing; }
  .stk__track:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--ui-accent, #ededed) 80%, #fff);
    outline-offset: 4px;
  }

  .stk__tick {
    position: absolute;
    top: 50%;
    width: 2px;
    height: calc(var(--stk-h) + 6px);
    transform: translate(-50%, -50%);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--border, #2a2a2a);
    transition: background 180ms ease, transform 180ms ease;
  }
  .stk__tick.is-on {
    background: var(--ui-accent, #ededed);
    transform: translate(-50%, -50%) scaleY(1.15);
  }
  .stk--no-ticks .stk__tick { display: none; }

  .stk__fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--ui-accent, #ededed);
  }

  .stk__thumb {
    position: absolute;
    top: 50%;
    width: var(--stk-thumb);
    height: var(--stk-thumb);
    border-radius: var(--ctrl-r-full, 999px);
    background: #fff;
    border: 2px solid var(--ui-accent, #ededed);
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.35);
  }

  .stk--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .stk--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .stk--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .is-disabled { opacity: 0.45; }
  .is-disabled .stk__track { cursor: not-allowed; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .stk__tick { transition: none; }
  }
`;let h;function f(o){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=o;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(o,t){const e=t?f(String(t).trim()):null;if(!e){for(const s of b)o.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),r=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(s=>Math.round(r?s*.92:s+(255-s)*.16)),n=(s,d)=>o.style.setProperty(s,d);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(s,l);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(s,r?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])n(s,r?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["value","default-value","min","max","stepped","step-size","size","tone","disabled","tick-count","show-value","tooltip","show-ticks","color"];#e=50;#l=null;#v=!1;#y=-1;#c;#u;#t;#d;#p;#f;#b=[];#k=!1;#n=0;#_=0;#m=null;#r=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#c=document.createElement("div"),this.#c.className="stk",this.#u=document.createElement("p"),this.#u.className="stk__value",this.#t=document.createElement("div"),this.#t.className="stk__track",this.#t.setAttribute("role","slider"),this.#t.setAttribute("tabindex","0"),this.#d=document.createElement("div"),this.#d.className="stk__fill",this.#d.setAttribute("aria-hidden","true"),this.#p=document.createElement("div"),this.#p.className="stk__thumb",this.#f=document.createElement("span"),this.#f.className="stk__tip",this.#p.appendChild(this.#f),this.#t.append(this.#d,this.#p),this.#c.append(this.#u,this.#t),t.append(e,this.#c),this.#t.addEventListener("pointerdown",i=>this.#F(i)),this.#t.addEventListener("keydown",i=>this.#z(i))}connectedCallback(){u(this,this.getAttribute("color")),this.#v=!0;const t=this.hasAttribute("value")?this.#i("value",50):this.#i("default-value",50);this.#e=this.#g(t),this.#C()}disconnectedCallback(){this.#v=!1,this.#E()}attributeChangedCallback(t,e,i){if(u(this,this.getAttribute("color")),!(!this.#v||e===i)){if(t==="value"){if(i===null)this.#e=this.#g(this.#i("default-value",this.#e));else{if(this.#l!==null&&Number(i)===this.#l)return;this.#e=this.#g(this.#i("value",50))}this.#l=this.#e}else t==="default-value"&&!this.hasAttribute("value")&&(this.#e=this.#g(this.#i("default-value",this.#e)),this.#l=this.#e);this.#C()}}get value(){return this.#e}set value(t){this.setAttribute("value",String(t))}#i(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}get#s(){return this.#i("min",0)}get#a(){return this.#i("max",100)}get#w(){return this.hasAttribute("stepped")}get#x(){return this.#i("step-size",1)}get#o(){return this.hasAttribute("disabled")}get#M(){return this.getAttribute("show-ticks")!=="false"}get#D(){return this.hasAttribute("show-value")}get#N(){return this.hasAttribute("tooltip")}get#L(){return Math.max(2,Math.round(this.#i("tick-count",11)))}#g(t){return Math.min(this.#a,Math.max(this.#s,t))}#$(t){return this.#w?Math.round(t/this.#x)*this.#x:t}#h(t){const e=this.#g(this.#$(t));if(this.#o||e===this.#e)return;this.#e=e,this.#l=e,this.setAttribute("value",String(e)),this.#S();const i={value:e};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:i})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:i}))}#z(t){if(this.#o)return;const e=this.#w?this.#x:(this.#a-this.#s)/100||1;t.key==="ArrowRight"||t.key==="ArrowUp"?(t.preventDefault(),this.#h(this.#e+e)):t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),this.#h(this.#e-e)):t.key==="Home"?(t.preventDefault(),this.#h(this.#s)):t.key==="End"&&(t.preventDefault(),this.#h(this.#a))}#A(t){const e=this.#t;if(!e)return this.#e;const i=e.getBoundingClientRect();if(!i.width)return this.#e;const a=Math.min(1,Math.max(0,(t-i.left)/i.width));return this.#s+a*(this.#a-this.#s)}#F(t){if(!this.#o){this.#k=!0;try{this.#t.setPointerCapture?.(t.pointerId)}catch{}this.#h(this.#A(t.clientX)),this.#m=e=>this.#T(e),this.#r=e=>this.#I(e,t.pointerId),document.addEventListener("pointermove",this.#m,{passive:!0}),document.addEventListener("pointerup",this.#r),document.addEventListener("pointercancel",this.#r)}}#T(t){this.#k&&(this.#_=t.clientX,!this.#n&&(this.#n=requestAnimationFrame(()=>{this.#n=0,!(!this.#k||!this.#v)&&this.#h(this.#A(this.#_))})))}#I(t,e){try{this.#t.releasePointerCapture?.(e)}catch{}this.#E()}#E(){this.#n&&(cancelAnimationFrame(this.#n),this.#n=0),this.#m&&(document.removeEventListener("pointermove",this.#m),this.#m=null),this.#r&&(document.removeEventListener("pointerup",this.#r),document.removeEventListener("pointercancel",this.#r),this.#r=null),this.#k=!1}#P(){return Math.min(50,this.#L)}#R(t){for(const e of this.#b)e.remove();this.#b=[];for(let e=0;e<t;e++){const i=document.createElement("span");i.className="stk__tick",i.setAttribute("aria-hidden","true"),i.style.left=`${e/(t-1)*100}%`,this.#t.appendChild(i),this.#b.push(i)}this.#y=t}#C(){const t=(i,a)=>this.getAttribute(i)??a;this.#c.className=`stk stk--${t("size","md")} stk--t-${t("tone","default")}`+(this.#o?" is-disabled":"")+(this.#M?"":" stk--no-ticks"),this.#t.setAttribute("tabindex",this.#o?"-1":"0"),this.#o?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#u.style.display=this.#D?"":"none",this.#f.style.display=this.#N?"":"none";const e=this.#P();e!==this.#y&&this.#R(e),this.#S()}#S(){const t=this.#a-this.#s,e=t<=0?0:Math.min(100,Math.max(0,(this.#e-this.#s)/t*100)),i=Math.round(this.#e);this.#u.textContent=String(i),this.#f.textContent=String(i),this.#d.style.width=e+"%",this.#p.style.left=e+"%";const a=this.#b.length;for(let r=0;r<a;r++){const l=r/(a-1)*100;this.#b[r].classList.toggle("is-on",l<=e+.001)}this.#t.setAttribute("aria-valuenow",String(i)),this.#t.setAttribute("aria-valuemin",String(this.#s)),this.#t.setAttribute("aria-valuemax",String(this.#a))}}customElements.define("vs-slider-ticks",m);
