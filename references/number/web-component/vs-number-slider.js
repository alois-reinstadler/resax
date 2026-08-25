const d="http://www.w3.org/2000/svg",g=`
  :host { display: inline-flex; }
  .sld {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --accent: var(--ui-accent, #ededed);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: var(--h);
    padding: 4px;
    border: 1px solid var(--inp-border, #2a2a2a);
    border-radius: calc(var(--r) * 1.25);
    background: var(--bg-elevated, #111);
  }
  .sld--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); }
  .sld--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: calc(var(--ctrl-fs-lg, 15px) + 1px); }

  .sld__btn {
    --bs: calc(var(--h) - 8px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--bs);
    height: var(--bs);
    flex: none;
    padding: 0;
    border: 1px solid var(--inp-border, #2a2a2a);
    border-radius: calc(var(--r) * 0.9);
    background: var(--bg-input, #0d0d0d);
    color: var(--inp-text, #ededed);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: border-color 180ms ease, background-color 180ms ease, opacity 180ms ease;
  }
  .sld__btn:hover:not(:disabled) {
    border-color: var(--inp-border-hover, #3d3d3d);
    background: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
  }
  .sld__btn:focus-visible { outline: none; border-color: var(--ui-accent, #ededed); }
  .sld__btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .sld__icon {
    width: 56%;
    height: 56%;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .sld__track {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 5ch;
    height: calc(var(--h) - 8px);
    padding: 0 0.6ch;
    border-radius: calc(var(--r) * 0.7);
    background: var(--bg-input, #0d0d0d);
    border: 1px solid var(--inp-border, #2a2a2a);
    touch-action: none;
  }
  .sld__track.is-live { cursor: ew-resize; }
  .sld__fill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      color-mix(in srgb, var(--ui-accent, #ededed) 30%, transparent),
      color-mix(in srgb, var(--ui-accent, #ededed) 62%, transparent)
    );
    transition: width 240ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .sld.is-dragging .sld__fill { transition: none; }
  .sld__value {
    position: relative;
    z-index: 1;
    color: var(--inp-text, #ededed);
    font-size: var(--fs);
    font-weight: 600;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum' 1;
    user-select: none;
  }

  .sld--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .sld--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .sld--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .sld.is-disabled { opacity: 0.55; }

  @media (prefers-reduced-motion: reduce) {
    .sld__btn,
    .sld__fill { transition: none; }
  }
`;function u(a){const t=document.createElementNS(d,"svg");t.setAttribute("class","sld__icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");const e=i=>{const r=document.createElementNS(d,"path");return r.setAttribute("d",i),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),r};return t.appendChild(e("M6 12H18")),a&&t.appendChild(e("M12 18V6")),t}let o;function f(a){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=a;const t=o.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(a,t){const e=t?f(String(t).trim()):null;if(!e){for(const s of m)a.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),l=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(s=>Math.round(l?s*.92:s+(255-s)*.16)),n=(s,b)=>a.style.setProperty(s,b);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(s,h);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(s,l?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])n(s,l?"0 0 0":"255 255 255");n("--vs-color",h),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["value","min","max","step","size","tone","disabled","draggable","color"];#t=0;#m=null;#l=!1;#e;#i;#s;#r;#h;#f;#d=0;#v=0;#u=!1;#c=0;#E=0;#p=null;#n=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#e=document.createElement("div"),this.#e.className="sld",this.#e.setAttribute("role","spinbutton"),this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="sld__btn",this.#i.setAttribute("aria-label","Decrease"),this.#i.appendChild(u(!1)),this.#r=document.createElement("div"),this.#r.className="sld__track",this.#h=document.createElement("span"),this.#h.className="sld__fill",this.#h.setAttribute("aria-hidden","true"),this.#f=document.createElement("span"),this.#f.className="sld__value",this.#r.append(this.#h,this.#f),this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="sld__btn",this.#s.setAttribute("aria-label","Increase"),this.#s.appendChild(u(!0)),this.#e.append(this.#i,this.#r,this.#s),t.append(e,this.#e),this.#i.addEventListener("pointerdown",i=>{i.preventDefault(),this.#M(-1)}),this.#s.addEventListener("pointerdown",i=>{i.preventDefault(),this.#M(1)});for(const i of[this.#i,this.#s])for(const r of["pointerup","pointerleave","pointercancel"])i.addEventListener(r,()=>this.#w());this.#r.addEventListener("pointerdown",i=>this.#z(i))}connectedCallback(){p(this,this.getAttribute("color")),this.#l=!0,this.#t=this.#x(this.#b("value",0)),this.#D()}disconnectedCallback(){this.#l=!1,this.#w(),this.#L()}attributeChangedCallback(t,e,i){if(p(this,this.getAttribute("color")),!(!this.#l||e===i)){if(t==="value"){if(this.#m!==null&&Number(i)===this.#m)return;this.#t=this.#x(this.#b("value",0))}this.#D()}}get value(){return this.#t}set value(t){this.setAttribute("value",String(t))}#b(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}get#a(){return this.#b("min",0)}get#g(){return this.#b("max",100)}get#I(){return this.#b("step",1)}get#o(){return this.hasAttribute("disabled")}get#k(){return this.hasAttribute("draggable")}#C(){const t=String(this.getAttribute("step")??1);return t.includes(".")?t.split(".")[1].length:0}#x(t){return Math.min(this.#g,Math.max(this.#a,t))}#T(t){const e=Math.pow(10,this.#C());return Math.round(t*e)/e}get#_(){return this.#t<=this.#a}get#y(){return this.#t>=this.#g}#A(t){const e=this.#x(this.#T(t));if(e===this.#t)return;this.#t=e,this.#m=e,this.setAttribute("value",String(e)),this.#$();const i={value:e};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:i})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:i}))}#S(t){this.#o||this.#A(this.#t+t*this.#I)}#M(t){this.#o||t===-1&&this.#_||t===1&&this.#y||this.#j(t)}#j(t){this.#v=t,this.#S(t);let e=340;const i=()=>{if(!(this.#v!==t||!this.#l)){if(t===1&&this.#y||t===-1&&this.#_)return this.#w();this.#S(t),e=Math.max(40,e*.8),this.#d=setTimeout(i,e)}};this.#d=setTimeout(i,e)}#w(){this.#v=0,this.#d&&(clearTimeout(this.#d),this.#d=0)}#N(t){const e=this.#r;if(!e)return this.#t;const i=e.getBoundingClientRect();if(!i.width)return this.#t;const r=Math.min(1,Math.max(0,(t-i.left)/i.width));return this.#a+r*(this.#g-this.#a)}#z(t){if(!(this.#o||!this.#k)){this.#u=!0,this.#e.classList.add("is-dragging");try{this.#r.setPointerCapture?.(t.pointerId)}catch{}this.#A(this.#N(t.clientX)),this.#p=e=>this.#B(e),this.#n=e=>this.#F(e,t.pointerId),document.addEventListener("pointermove",this.#p,{passive:!0}),document.addEventListener("pointerup",this.#n),document.addEventListener("pointercancel",this.#n)}}#B(t){this.#u&&(this.#E=t.clientX,!this.#c&&(this.#c=requestAnimationFrame(()=>{this.#c=0,!(!this.#u||!this.#l)&&this.#A(this.#N(this.#E))})))}#F(t,e){try{this.#r.releasePointerCapture?.(e)}catch{}this.#L()}#L(){this.#c&&(cancelAnimationFrame(this.#c),this.#c=0),this.#p&&(document.removeEventListener("pointermove",this.#p),this.#p=null),this.#n&&(document.removeEventListener("pointerup",this.#n),document.removeEventListener("pointercancel",this.#n),this.#n=null),this.#u=!1,this.#l&&this.#e.classList.remove("is-dragging")}#D(){const t=(e,i)=>this.getAttribute(e)??i;this.#e.className=`sld sld--${t("size","md")} sld--t-${t("tone","default")}`+(this.#o?" is-disabled":"")+(this.#u?" is-dragging":""),this.#r.classList.toggle("is-live",this.#k),this.#o?this.#e.setAttribute("aria-disabled","true"):this.#e.removeAttribute("aria-disabled"),this.#$()}#$(){const t=this.#C(),e=this.#g-this.#a,i=e<=0?0:(this.#t-this.#a)/e*100;this.#f.textContent=this.#t.toFixed(t),this.#h.style.width=i+"%",this.#i.disabled=this.#o||this.#_,this.#s.disabled=this.#o||this.#y,this.#e.setAttribute("aria-valuenow",String(this.#t)),this.#e.setAttribute("aria-valuemin",String(this.#a)),this.#e.setAttribute("aria-valuemax",String(this.#g))}}customElements.define("vs-number-slider",v);
