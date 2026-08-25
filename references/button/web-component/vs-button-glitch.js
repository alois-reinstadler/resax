const g=`
  :host { display: inline-flex; }
  .bgl {
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
    border-radius: calc(var(--r) * var(--r-mult, 1));
    border: 1px solid var(--inp-border, #2a2a2a);
    font: inherit;
    font-weight: 600;
    font-size: var(--fs);
    line-height: 1;
    letter-spacing: 0.02em;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    background: var(--btn-secondary-bg, #1a1a1a);
    color: var(--inp-text, #ededed);
    transition: border-color 200ms ease, box-shadow 200ms ease, transform 160ms ease;
  }
  .bgl:hover:not(:disabled) {
    border-color: rgb(var(--ui-ring, 255 255 255) / 0.6);
    box-shadow: 0 0 0 1px rgba(255, 0, 200, 0.25), 0 0 18px -6px rgba(0, 240, 255, 0.5);
  }
  .bgl:active:not(:disabled) { transform: translateY(1px); }
  .bgl:disabled { opacity: 0.45; cursor: not-allowed; }

  /* sizes */
  .bgl--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .bgl--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .bgl--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  /* radius */
  .bgl--r-none { --r: 0px; }
  .bgl--r-subtle { --r: 8px; }
  .bgl--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .bgl--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
  }

  /* variants */
  .bgl--primary { background: var(--btn-primary-bg, #ededed); color: var(--btn-primary-fg, #000); border-color: transparent; }
  .bgl--ghost { background: transparent; }

  /* label + two clipped RGB ghosts (cyan / magenta) stacked on top */
  .bgl__label {
    position: relative;
    z-index: 2;
    display: inline-block;
  }
  .bgl__label::before,
  .bgl__label::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    clip-path: inset(0 0 100% 0);
  }
  .bgl__label::before { color: #ffffff; text-shadow: -1px 0 #ffffff; }
  .bgl__label::after  { color: #7a7a7a; text-shadow: 1px 0 #7a7a7a; }

  .bgl:hover:not(:disabled) .bgl__label::before {
    opacity: 0.9;
    animation: bgl-glitch-a 560ms steps(2, end) infinite;
  }
  .bgl:hover:not(:disabled) .bgl__label::after {
    opacity: 0.9;
    animation: bgl-glitch-b 560ms steps(2, end) infinite;
  }

  @keyframes bgl-glitch-a {
    0%   { transform: translate(0, 0);      clip-path: inset(0 0 72% 0); }
    25%  { transform: translate(-2px, -1px); clip-path: inset(30% 0 40% 0); }
    50%  { transform: translate(2px, 1px);   clip-path: inset(60% 0 8% 0); }
    75%  { transform: translate(-1px, 1px);  clip-path: inset(12% 0 66% 0); }
    100% { transform: translate(0, 0);       clip-path: inset(0 0 72% 0); }
  }
  @keyframes bgl-glitch-b {
    0%   { transform: translate(0, 0);      clip-path: inset(70% 0 6% 0); }
    25%  { transform: translate(2px, 1px);   clip-path: inset(20% 0 55% 0); }
    50%  { transform: translate(-2px, -1px); clip-path: inset(48% 0 24% 0); }
    75%  { transform: translate(1px, -1px);  clip-path: inset(4% 0 78% 0); }
    100% { transform: translate(0, 0);       clip-path: inset(70% 0 6% 0); }
  }

  /* click ripple + press (sibling pattern, ported from vs-button.js — not in
     the source SFC, but every vs-button-* WC in this family carries it) */
  .bgl__ripples { position: absolute; inset: 0; z-index: 1; border-radius: inherit; overflow: hidden; pointer-events: none; }
  .bgl--r-pill .bgl__ripples { border-radius: 999px; }
  @supports (corner-shape: squircle) { .bgl--r-squircle .bgl__ripples { corner-shape: squircle; } }
  .bgl__ripple {
    position: absolute; z-index: 1; pointer-events: none; border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: radial-gradient(circle, rgb(var(--rip) / .38) 0%, rgb(var(--rip) / .20) 24%, rgb(var(--rip) / .09) 44%, rgb(var(--rip) / .03) 60%, transparent 76%);
    opacity: 0; will-change: transform, opacity;
    animation: bgl-rip 780ms cubic-bezier(.22,1,.36,1) forwards, bgl-fade 780ms cubic-bezier(.25,.1,.25,1) forwards;
  }
  @keyframes bgl-rip { from { transform: translate(-50%,-50%) scale(0); } to { transform: translate(-50%,-50%) scale(1); } }
  @keyframes bgl-fade { from { opacity: .8; } to { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    .bgl { transition: none; }
    .bgl:active:not(:disabled) { transform: none; }
    .bgl__label::before, .bgl__label::after { display: none; }
    .bgl__ripple { display: none; }
  }
`;let p;function h(o){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=o;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(o,e){const t=e?h(String(e).trim()):null;if(!t){for(const r of f)o.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,c=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),a=(r,d)=>o.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(r,c);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])a(r,n?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["label","variant","size","radius","disabled","color"];#t;#r;#a;#i;#e;#s=null;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=g,this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="bgl",this.#r=document.createElement("span"),this.#r.className="bgl__label",this.#a=document.createElement("slot"),this.#i=document.createTextNode("Button"),this.#a.append(this.#i),this.#r.append(this.#a),this.#e=document.createElement("span"),this.#e.className="bgl__ripples",this.#e.setAttribute("aria-hidden","true"),this.#t.append(this.#e,this.#r),e.append(t,this.#t)}connectedCallback(){b(this,this.getAttribute("color")),this.#l(),this.#s=new AbortController;const e={signal:this.#s.signal};this.#t.addEventListener("pointerdown",t=>this.#o(t),e);for(const t of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(t,()=>{this.#t.style.transform=""},e);this.#a.addEventListener("slotchange",()=>this.#n(),e)}disconnectedCallback(){this.#s?.abort(),this.#s=null}attributeChangedCallback(e){b(this,this.getAttribute("color")),this.#t&&(this.#l(),e==="label"&&this.#n())}#l(){const e=(t,s)=>this.getAttribute(t)??s;this.#t.className=`bgl bgl--${e("variant","secondary")} bgl--${e("size","md")} bgl--r-${e("radius","subtle")}`,this.#t.disabled=this.hasAttribute("disabled"),this.#n()}#n(){const e=this.getAttribute("label")??"Button";this.#i.data=e;const s=this.#a.assignedNodes({flatten:!0}).map(i=>i.textContent||"").join("").trim();this.#r.setAttribute("data-text",s||e)}#o(e){if(this.#t.disabled)return;const t=this.#t.getBoundingClientRect(),s=e.clientX-t.left,i=e.clientY-t.top,n=Math.max(s,t.width-s),c=Math.max(i,t.height-i),l=Math.hypot(n,c)*2,a=document.createElement("span");for(a.className="bgl__ripple",a.style.cssText=`left:${s}px;top:${i}px;width:${l}px;height:${l}px`,a.addEventListener("animationend",()=>a.remove()),this.#e.appendChild(a);this.#e.childElementCount>6;)this.#e.firstElementChild.remove()}}customElements.define("vs-button-glitch",m);
