const p=`
  :host { display: inline-flex; }
  .sst {
    --sst-w: 200px;
    --sst-h: 8px;
    --sst-thumb: 16px;
    --accent: var(--ui-accent, #ededed);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: var(--sst-w);
    font-family: inherit;
    color: var(--text, #ededed);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .sst--sm { --sst-w: 160px; --sst-h: 6px; --sst-thumb: 13px; }
  .sst--lg { --sst-w: 260px; --sst-h: 10px; --sst-thumb: 20px; }

  .sst__value {
    margin: 0;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.04em;
    color: var(--text-secondary, #a1a1a1);
  }

  .sst__tip {
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

  .sst__track {
    position: relative;
    width: 100%;
    height: var(--sst-h);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--bg-elevated, #161616);
    border: 1px solid var(--border, #2a2a2a);
    cursor: grab;
    touch-action: none;
    outline: none;
  }
  .sst__track:active { cursor: grabbing; }
  .sst__track:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--ui-accent, #ededed) 80%, #fff);
    outline-offset: 4px;
  }

  .sst__notch {
    position: absolute;
    top: 50%;
    width: 4px;
    height: 4px;
    transform: translate(-50%, -50%);
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--border, #2a2a2a);
  }

  /* clips the fill to the track pill without cutting the thumb (which overhangs) */
  .sst__fill-clip {
    position: absolute;
    inset: 0;
    border-radius: var(--ctrl-r-full, 999px);
    overflow: hidden;
    pointer-events: none;
  }
  .sst__fill {
    position: absolute;
    inset: 0 auto 0 0;
    width: 100%;
    height: 100%;
    border-radius: var(--ctrl-r-full, 999px);
    background: var(--ui-accent, #ededed);
    /* spring-ish snap glide between notches */
    transition: transform 260ms cubic-bezier(0.22, 1.4, 0.36, 1);
  }

  /* invisible full-width rail: translateX(p%) of itself = p% of the track */
  .sst__thumb-rail {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: transform 260ms cubic-bezier(0.22, 1.4, 0.36, 1);
  }
  .sst__thumb {
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--sst-thumb);
    height: var(--sst-thumb);
    border-radius: var(--ctrl-r-full, 999px);
    background: #fff;
    border: 2px solid var(--ui-accent, #ededed);
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgb(0 0 0 / 0.35);
  }
  .sst__thumb.is-snap {
    animation: sst-snap 220ms ease-out;
  }
  @keyframes sst-snap {
    0% { box-shadow: 0 2px 6px rgb(0 0 0 / 0.35); }
    40% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--ui-accent, #ededed) 35%, transparent); }
    100% { box-shadow: 0 2px 6px rgb(0 0 0 / 0.35); }
  }

  .sst--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .sst--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .sst--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .is-disabled { opacity: 0.45; }
  .is-disabled .sst__track { cursor: not-allowed; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .sst__fill,
    .sst__thumb-rail { transition: none; }
    .sst__thumb.is-snap { animation: none; }
  }
`;let l;function f(h){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=h;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const s=t.match(/[\d.]+/g);return s&&s.length>=3?[+s[0],+s[1],+s[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(h,t){const s=t?f(String(t).trim()):null;if(!s){for(const i of m)h.style.removeProperty(i);return}const e=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*e(s[0])+.7152*e(s[1])+.0722*e(s[2])>.45,o=`rgb(${s[0]} ${s[1]} ${s[2]})`,c=s.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),n=(i,d)=>h.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,o);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,s.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,r?"0 0 0":"255 255 255");n("--vs-color",o),n("--vs-color-rgb",s.join(" ")),n("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class b extends HTMLElement{static observedAttributes=["value","default-value","min","max","step-size","size","tone","disabled","show-notches","show-value","tooltip","color"];#t=50;#d=null;#p=!1;#k=-1;#f;#m;#s;#o;#_;#b;#r;#v;#w=[];#y=!1;#h=0;#E=0;#g=null;#n=null;#a=0;constructor(){super();const t=this.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=p,this.#f=document.createElement("div"),this.#f.className="sst",this.#m=document.createElement("p"),this.#m.className="sst__value",this.#s=document.createElement("div"),this.#s.className="sst__track",this.#s.setAttribute("role","slider"),this.#s.setAttribute("tabindex","0"),this.#o=document.createElement("div"),this.#o.className="sst__fill-clip",this.#o.setAttribute("aria-hidden","true"),this.#_=document.createElement("div"),this.#_.className="sst__fill",this.#o.appendChild(this.#_),this.#b=document.createElement("div"),this.#b.className="sst__thumb-rail",this.#r=document.createElement("div"),this.#r.className="sst__thumb",this.#v=document.createElement("span"),this.#v.className="sst__tip",this.#r.appendChild(this.#v),this.#b.appendChild(this.#r),this.#s.append(this.#o,this.#b),this.#f.append(this.#m,this.#s),t.append(s,this.#f),this.#s.addEventListener("pointerdown",e=>this.#F(e)),this.#s.addEventListener("keydown",e=>this.#T(e))}connectedCallback(){u(this,this.getAttribute("color")),this.#p=!0;const t=this.hasAttribute("value")?this.#i("value",50):this.#i("default-value",50);this.#t=this.#c(t),this.#N()}disconnectedCallback(){this.#p=!1,this.#S(),this.#a&&(clearTimeout(this.#a),this.#a=0)}attributeChangedCallback(t,s,e){if(u(this,this.getAttribute("color")),!(!this.#p||s===e)){if(t==="value"){if(e===null)this.#t=this.#c(this.#i("default-value",this.#t));else{if(this.#d!==null&&Number(e)===this.#d)return;this.#t=this.#c(this.#i("value",50))}this.#d=this.#t}else t==="default-value"&&!this.hasAttribute("value")&&(this.#t=this.#c(this.#i("default-value",this.#t)),this.#d=this.#t);this.#N()}}get value(){return this.#t}set value(t){this.setAttribute("value",String(t))}#i(t,s){const e=parseFloat(this.getAttribute(t));return Number.isFinite(e)?e:s}get#e(){return this.#i("min",0)}get#l(){return this.#i("max",100)}get#A(){const t=this.#i("step-size",10);return t>0?t:1}get#x(){return this.hasAttribute("disabled")}get#D(){return this.hasAttribute("show-notches")}get#M(){return this.hasAttribute("show-value")}get#$(){return this.hasAttribute("tooltip")}#z(t){return Math.min(this.#l,Math.max(this.#e,t))}#c(t){const s=this.#A;return this.#z(Math.round((t-this.#e)/s)*s+this.#e)}#u(t){const s=this.#c(t);if(this.#x||s===this.#t)return;this.#t=s,this.#d=s,this.setAttribute("value",String(s)),this.#L(),this.#X();const e={value:s};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:e})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:e}))}#X(){this.#r.classList.remove("is-snap"),requestAnimationFrame(()=>{this.#p&&(this.#r.classList.add("is-snap"),this.#a&&clearTimeout(this.#a),this.#a=setTimeout(()=>{this.#a=0,this.#r.classList.remove("is-snap")},220))})}#T(t){if(this.#x)return;const s=this.#A;t.key==="ArrowRight"||t.key==="ArrowUp"?(t.preventDefault(),this.#u(this.#t+s)):t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),this.#u(this.#t-s)):t.key==="Home"?(t.preventDefault(),this.#u(this.#e)):t.key==="End"&&(t.preventDefault(),this.#u(this.#l))}#C(t){const s=this.#s;if(!s)return this.#t;const e=s.getBoundingClientRect();if(!e.width)return this.#t;const a=this.#e+(t-e.left)/e.width*(this.#l-this.#e);return this.#c(a)}#F(t){if(!this.#x){this.#y=!0;try{this.#s.setPointerCapture?.(t.pointerId)}catch{}this.#u(this.#C(t.clientX)),this.#g=s=>this.#R(s),this.#n=s=>this.#B(s,t.pointerId),document.addEventListener("pointermove",this.#g,{passive:!0}),document.addEventListener("pointerup",this.#n),document.addEventListener("pointercancel",this.#n)}}#R(t){this.#y&&(this.#E=t.clientX,!this.#h&&(this.#h=requestAnimationFrame(()=>{this.#h=0,!(!this.#y||!this.#p)&&this.#u(this.#C(this.#E))})))}#B(t,s){try{this.#s.releasePointerCapture?.(s)}catch{}this.#S()}#S(){this.#h&&(cancelAnimationFrame(this.#h),this.#h=0),this.#g&&(document.removeEventListener("pointermove",this.#g),this.#g=null),this.#n&&(document.removeEventListener("pointerup",this.#n),document.removeEventListener("pointercancel",this.#n),this.#n=null),this.#y=!1}#I(){const t=this.#l-this.#e,s=this.#A,e=s>0&&t>0?Math.floor(t/s):0,a=this.#D&&e>0&&e<=200?e+1:0;if(a!==this.#k){for(const r of this.#w)r.remove();this.#w=[];for(let r=0;r<a;r++){const o=document.createElement("span");o.className="sst__notch",o.setAttribute("aria-hidden","true"),this.#s.insertBefore(o,this.#o),this.#w.push(o)}this.#k=a}for(let r=0;r<a;r++)this.#w[r].style.left=(t>0?r*s/t*100:0)+"%"}#N(){const t=(s,e)=>this.getAttribute(s)??e;this.#f.className=`sst sst--${t("size","md")} sst--t-${t("tone","default")}`+(this.#x?" is-disabled":""),this.#x?this.#s.setAttribute("aria-disabled","true"):this.#s.removeAttribute("aria-disabled"),this.#s.setAttribute("aria-valuemin",String(this.#e)),this.#s.setAttribute("aria-valuemax",String(this.#l)),this.#m.style.display=this.#M?"":"none",this.#v.style.display=this.#$?"":"none",this.#I(),this.#L()}#L(){const t=this.#l-this.#e,s=t<=0?0:Math.min(100,Math.max(0,(this.#t-this.#e)/t*100)),e=Math.round(this.#t);this.#m.textContent=String(e),this.#v.textContent=String(e),this.#_.style.transform=`translateX(${s-100}%)`,this.#b.style.transform=`translateX(${s}%)`,this.#s.setAttribute("aria-valuenow",String(e))}}customElements.define("vs-slider-stepped",b);
