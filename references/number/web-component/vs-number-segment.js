const g=`
  :host { display: inline-flex; }
  .seg {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --accent: var(--ui-accent, #ededed);
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: var(--h);
    padding: 4px;
    border: 1px solid var(--inp-border, #2a2a2a);
    border-radius: calc(var(--r) * 1.25);
    background: var(--bg-elevated, #111);
  }
  .seg--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); }
  .seg--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: calc(var(--ctrl-fs-lg, 15px) + 1px); }

  .seg__btn {
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
  .seg__btn:hover:not(:disabled) {
    border-color: var(--inp-border-hover, #3d3d3d);
    background: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
  }
  .seg__btn:focus-visible { outline: none; border-color: var(--ui-accent, #ededed); }
  .seg__btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .seg__icon {
    width: 56%;
    height: 56%;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .seg__panel {
    position: relative;
    display: inline-flex;
    align-items: stretch;
    gap: var(--gap, 4px);
    height: calc(var(--h) - 8px);
    padding: 0 2px;
  }
  .seg__cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.1em;
    padding: 0 0.15em;
    border-radius: calc(var(--r) * 0.5);
    background: var(--bg-input, #0d0d0d);
    border: 1px solid var(--inp-border, #2a2a2a);
    color: var(--inp-text, #ededed);
    font-size: var(--fs);
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum' 1;
  }
  .seg__cell--sym {
    min-width: 0.5em;
    background: transparent;
    border-color: transparent;
    color: color-mix(in srgb, var(--ui-accent, #ededed) 70%, var(--inp-text, #ededed));
  }

  /* brief per-cell vertical flip on change */
  .segflip-enter-active { transition: transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 180ms ease; }
  .segflip-leave-active { transition: transform 200ms ease, opacity 160ms ease; position: absolute; }
  .segflip-enter-from { transform: translateY(60%) rotateX(-70deg); opacity: 0; }
  .segflip-leave-to { transform: translateY(-60%) rotateX(70deg); opacity: 0; }

  .seg--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .seg--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .seg--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .seg.is-disabled { opacity: 0.55; }

  @media (prefers-reduced-motion: reduce) {
    .seg__btn { transition: none; }
    .segflip-enter-active,
    .segflip-leave-active { transition: none; }
    .segflip-leave-active { display: none; }
    .segflip-enter-from { transform: none; opacity: 1; }
  }
`,d="http://www.w3.org/2000/svg";let h;function f(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(c,t){const e=t?f(String(t).trim()):null;if(!e){for(const r of m)c.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),o=(r,p)=>c.style.setProperty(r,p);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,s);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,a?"0 0 0":"255 255 255");o("--vs-color",s),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class b extends HTMLElement{static observedAttributes=["value","modelvalue","min","max","step","size","tone","disabled","gap","color"];#t;#e;#s;#r;#d=[];#i=0;#u=!1;#f=!1;#c=0;#m=0;#n=new Set;#a=new Set;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#t=document.createElement("div"),this.#t.className="seg",this.#t.setAttribute("role","spinbutton"),this.#s=this.#$("Decrease",["M6 12H18"]),this.#e=document.createElement("span"),this.#e.className="seg__panel",this.#e.setAttribute("aria-hidden","true"),this.#r=this.#$("Increase",["M6 12H18","M12 18V6"]),this.#t.append(this.#s,this.#e,this.#r),t.append(e,this.#t),this.#s.addEventListener("pointerdown",i=>this.#T(-1,i,this.#s)),this.#r.addEventListener("pointerdown",i=>this.#T(1,i,this.#r));for(const i of["pointerup","pointerleave","pointercancel"])this.#s.addEventListener(i,()=>this.#g()),this.#r.addEventListener(i,()=>this.#g())}connectedCallback(){u(this,this.getAttribute("color")),this.#u=!0,this.#i=this.#l(this.#k()),this.#C(),this.#p(!1)}disconnectedCallback(){this.#u=!1,this.#g();for(const t of this.#n)clearTimeout(t);this.#n.clear();for(const t of this.#a)cancelAnimationFrame(t);this.#a.clear()}attributeChangedCallback(t,e,i){if(u(this,this.getAttribute("color")),!(!this.#u||e===i||this.#f))if(t==="value"||t==="modelvalue"){const n=this.#l(this.#k());if(n===this.#i)return;this.#i=n,this.#p(!0),this.#A(),this.#_()}else this.#i=this.#l(this.#i),this.#C(),this.#p(!0)}get value(){return this.#l(this.#i)}set value(t){this.setAttribute("value",String(t))}#h(t,e){const i=parseFloat(t);return Number.isFinite(i)?i:e}#b(){return this.#h(this.getAttribute("min"),0)}#v(){return this.#h(this.getAttribute("max"),100)}#w(){return this.#h(this.getAttribute("step"),1)}#B(){return this.#h(this.getAttribute("gap"),4)}#o(){return this.hasAttribute("disabled")}#k(){return this.#h(this.getAttribute("value")??this.getAttribute("modelvalue"),0)}#S(){const t=String(this.#w());return t.includes(".")?t.split(".")[1].length:0}#l(t){return Math.min(this.#v(),Math.max(this.#b(),t))}#F(t){const e=Math.pow(10,this.#S());return Math.round(t*e)/e}#j(){return this.#l(this.#i).toFixed(this.#S())}#x(){return this.value<=this.#b()}#y(){return this.value>=this.#v()}#C(){this.#t.className=`seg seg--${this.getAttribute("size")||"md"} seg--t-${this.getAttribute("tone")||"default"}`+(this.#o()?" is-disabled":""),this.#e.style.setProperty("--gap",this.#B()+"px"),this.#A(),this.#_()}#A(){this.#t.setAttribute("aria-valuenow",String(this.value)),this.#t.setAttribute("aria-valuemin",String(this.#b())),this.#t.setAttribute("aria-valuemax",String(this.#v())),this.#o()?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled")}#_(){const t=this.#o();this.#s.disabled=t||this.#x(),this.#r.disabled=t||this.#y()}#E(t){const e=document.createElement("span");return e.className="seg__cell"+(t==="."||t==="-"?" seg__cell--sym":""),e.dataset.ch=t,e.textContent=t,e}#p(t){const e=this.#j().split("");if(!t){this.#e.replaceChildren(),this.#d=e.map(a=>{const s=this.#E(a);return this.#e.appendChild(s),s});return}const i=[],n=Math.max(this.#d.length,e.length);for(let a=0;a<n;a++){const s=this.#d[a],l=e[a];if(l===void 0){s&&this.#M(s);continue}if(s&&s.dataset.ch===l){i[a]=s;continue}i[a]=this.#H(l,s||null),s&&this.#M(s)}this.#d=i}#H(t,e){const i=this.#E(t);i.classList.add("segflip-enter-from","segflip-enter-active"),e?this.#e.insertBefore(i,e):this.#e.appendChild(i),this.#N(()=>i.classList.remove("segflip-enter-from"));const n=setTimeout(()=>{i.classList.remove("segflip-enter-active"),this.#n.delete(n)},320);return this.#n.add(n),i}#M(t){t.classList.add("segflip-leave-active"),this.#N(()=>t.classList.add("segflip-leave-to"));const e=setTimeout(()=>{t.remove(),this.#n.delete(e)},260);this.#n.add(e)}#N(t){const e=requestAnimationFrame(()=>{this.#a.delete(e);const i=requestAnimationFrame(()=>{this.#a.delete(i),this.#u&&t()});this.#a.add(i)});this.#a.add(e)}#I(t){const e=this.#l(this.#F(t));e!==this.value&&(this.#i=e,this.#p(!0),this.#A(),this.#_(),this.#f=!0,this.setAttribute("value",String(e)),this.#f=!1,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e}})))}#L(t){this.#o()||this.#I(this.value+t*this.#w())}#P(t){if(this.#o())return;this.#m=t,this.#L(t);let e=340;const i=()=>{if(this.#m===t){if(t===1&&this.#y()||t===-1&&this.#x())return this.#g();this.#L(t),e=Math.max(40,e*.8),this.#c=setTimeout(i,e)}};this.#c=setTimeout(i,e)}#g(){this.#m=0,this.#c&&(clearTimeout(this.#c),this.#c=0)}#T(t,e,i){if(e.preventDefault(),!this.#o()&&!(t===-1&&this.#x())&&!(t===1&&this.#y())){try{i.setPointerCapture?.(e.pointerId)}catch{}this.#P(t)}}#$(t,e){const i=document.createElement("button");i.type="button",i.className="seg__btn",i.setAttribute("aria-label",t);const n=document.createElementNS(d,"svg");n.setAttribute("class","seg__icon"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("aria-hidden","true");for(const a of e){const s=document.createElementNS(d,"path");s.setAttribute("d",a),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),n.appendChild(s)}return i.appendChild(n),i}}customElements.define("vs-number-segment",b);
