const g=`
  :host { display: inline-flex; }
  .btn2 {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --rip: 255 255 255;
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: calc(var(--r, 12px) * var(--r-mult, 1));
    border: 1px solid transparent;
    overflow: hidden;
    font-family: inherit;
    font-weight: 500;
    font-size: var(--fs);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    transition:
      transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1),
      background-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 200ms ease;
  }
  .btn2:active:not(:disabled) { transform: scale(0.97); }
  .btn2:disabled { opacity: 0.45; cursor: not-allowed; }

  /* sizes — same token scale as VsButton */
  .btn2--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .btn2--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .btn2--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  /* radius */
  .btn2--r-none { --r: 0px; }
  .btn2--r-subtle { --r: 8px; }
  .btn2--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .btn2--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  /* variants */
  .btn2--primary {
    --rip: var(--t-rip, 0 0 0);
    background: var(--t-fill, var(--btn-primary-bg, #ededed));
    color: var(--t-on, var(--btn-primary-fg, #000));
  }
  .btn2--primary:hover:not(:disabled) { opacity: 0.85; }
  .btn2--secondary {
    --rip: var(--t-rgb, 255 255 255);
    background: var(--t-soft, var(--btn-secondary-bg, #1a1a1a));
    color: var(--t-text, var(--inp-text, #ededed));
    border-color: var(--t-border, var(--inp-border, #2a2a2a));
  }
  .btn2--secondary:hover:not(:disabled) {
    background: var(--t-soft-strong, var(--btn-secondary-bg-hover, #242424));
    border-color: var(--t-border-hover, var(--inp-border-hover, #3d3d3d));
  }
  .btn2--ghost {
    --rip: var(--t-rgb, 255 255 255);
    background: transparent;
    color: var(--t-text, var(--inp-text, #ededed));
  }
  .btn2--ghost:hover:not(:disabled) {
    background: var(--t-soft, var(--inp-hover-bg, rgba(255, 255, 255, 0.06)));
  }

  /* tones — recolor any variant */
  .btn2--t-danger {
    --t-rip: 255 255 255;
    --t-fill: #e5484d; --t-on: #fff;
    --t-text: #ff6369;
    --t-border: #5b1a1d; --t-border-hover: #8c2c30;
    --t-soft: rgba(229, 72, 77, 0.13); --t-soft-strong: rgba(229, 72, 77, 0.22);
    --t-rgb: 255 99 105;
  }
  .btn2--t-warn {
    --t-rip: 0 0 0;
    --t-fill: #f5a623; --t-on: #1a1206;
    --t-text: #ffb224;
    --t-border: #5a3d10; --t-border-hover: #8a5e1a;
    --t-soft: rgba(245, 166, 35, 0.13); --t-soft-strong: rgba(245, 166, 35, 0.22);
    --t-rgb: 255 178 36;
  }
  .btn2--t-success {
    --t-rip: 255 255 255;
    --t-fill: #30a46c; --t-on: #fff;
    --t-text: #4cc38a;
    --t-border: #1b3b2a; --t-border-hover: #2a5e42;
    --t-soft: rgba(48, 164, 108, 0.13); --t-soft-strong: rgba(48, 164, 108, 0.22);
    --t-rgb: 76 195 138;
  }

  /* ── own effect: label lift/reveal ──
     two copies of the text stacked in a column that shifts on hover: the top
     one (front) rises and exits, the bottom one (back) enters. */
  .btn2__label {
    position: relative;
    z-index: 2;
    display: inline-grid;
    overflow: hidden;
    align-self: stretch;
    height: 100%;
    line-height: 1;
  }
  .btn2__face {
    grid-area: 1 / 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 100%;
    white-space: nowrap;
    transform: translateY(0);
    filter: blur(0);
    opacity: 1;
    transition:
      transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
      filter 320ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .btn2__face--back {
    transform: translateY(100%);
    filter: blur(6px);
    opacity: 0;
  }
  .btn2:hover:not(:disabled) .btn2__face--front {
    transform: translateY(-100%);
    filter: blur(6px);
    opacity: 0;
  }
  .btn2:hover:not(:disabled) .btn2__face--back {
    transform: translateY(0);
    filter: blur(0);
    opacity: 1;
  }

  .btn2__spinner {
    position: relative;
    z-index: 2;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-top-color: transparent;
    animation: btn2-spin 0.7s linear infinite;
  }
  @keyframes btn2-spin {
    to { transform: rotate(360deg); }
  }

  /* ripple wrapper */
  .btn2__ripples {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
  }
  .btn2__ripple {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: radial-gradient(
      circle,
      rgb(var(--rip) / 0.38) 0%,
      rgb(var(--rip) / 0.20) 24%,
      rgb(var(--rip) / 0.09) 44%,
      rgb(var(--rip) / 0.03) 60%,
      transparent 76%
    );
    opacity: 0;
    will-change: transform, opacity;
    animation:
      btn2-ripple-scale 780ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
      btn2-ripple-fade 780ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  @keyframes btn2-ripple-scale {
    from { transform: translate(-50%, -50%) scale(0); }
    to   { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes btn2-ripple-fade {
    from { opacity: 0.8; }
    to   { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .btn2 { transition: none; }
    .btn2:active:not(:disabled) { transform: none; }
    .btn2__face { transition: none; }
    .btn2__ripple { display: none; }
    .btn2__spinner { animation-duration: 1.2s; }
  }
`;let c;function u(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const e=c.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(l,e){const t=e?u(String(e).trim()):null;if(!t){for(const r of v)l.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,d=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),i=(r,p)=>l.style.setProperty(r,p);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(r,d);i("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])i(r,a?"0 0 0":"255 255 255");i("--vs-color",d),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["variant","tone","size","radius","label","disabled","loading","color"];#t;#e;#i;#a;#s;#r;#n;#o=!1;#l=()=>this.#p();#c=()=>{this.#t.style.transform=""};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=g,this.#t=document.createElement("button"),this.#t.type="button",this.#e=document.createElement("span"),this.#e.className="btn2__ripples",this.#e.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="btn2__spinner",this.#i.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="btn2__label",this.#s=document.createElement("span"),this.#s.className="btn2__face btn2__face--front",this.#r=document.createElement("span"),this.#r.className="btn2__face btn2__face--back",this.#r.setAttribute("aria-hidden","true"),this.#n=document.createElement("slot"),this.#n.style.display="none",this.#a.append(this.#s,this.#r,this.#n),this.#t.append(this.#e,this.#i,this.#a),e.append(t,this.#t),this.#t.addEventListener("pointerdown",n=>this.#b(n));for(const n of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(n,this.#c);this.#n.addEventListener("slotchange",this.#l)}connectedCallback(){f(this,this.getAttribute("color")),this.#d()}disconnectedCallback(){this.#n.removeEventListener("slotchange",this.#l);for(const e of["pointerup","pointerleave","pointercancel"])this.#t.removeEventListener(e,this.#c)}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&this.#d()}#d(){const e=(s,a)=>this.getAttribute(s)??a,t=this.hasAttribute("loading"),n=this.hasAttribute("disabled");this.#t.className=`btn2 btn2--${e("variant","primary")} btn2--t-${e("tone","default")} btn2--${e("size","md")} btn2--r-${e("radius","squircle")}${t?" btn2--loading":""}`,this.#t.disabled=n||t,this.#i.style.display=t?"":"none",this.#a.style.display=t?"none":"",this.#p()}#p(){const e=this.#n.assignedNodes({flatten:!0});if(this.#o=e.length>0,this.#o)this.#s.replaceChildren(...e.map(t=>t.cloneNode(!0))),this.#r.replaceChildren(...e.map(t=>t.cloneNode(!0)));else{const t=this.getAttribute("label")??"Button";this.#s.textContent=t,this.#r.textContent=t}}#b(e){if(this.#t.disabled||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=this.#t.getBoundingClientRect(),n=e.clientX-t.left,s=e.clientY-t.top,a=Math.max(n,t.width-n),d=Math.max(s,t.height-s),o=Math.hypot(a,d)*2,i=document.createElement("span");for(i.className="btn2__ripple",i.style.cssText=`left:${n}px;top:${s}px;width:${o}px;height:${o}px`,i.addEventListener("animationend",()=>i.remove()),this.#e.appendChild(i);this.#e.childElementCount>6;)this.#e.firstElementChild.remove();const r=m=>Math.max(-1,Math.min(1,m)),p=r((n/t.width-.5)*2),b=r((s/t.height-.5)*2),h=1-.2*Math.min(Math.abs(p),Math.abs(b));this.#t.style.transform=`perspective(450px) rotateX(${(-b*15*h).toFixed(2)}deg) rotateY(${(p*10*h).toFixed(2)}deg) scale(.96)`}}customElements.define("vs-button-v2",x);
