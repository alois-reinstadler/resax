import{FX_CSS as u,attachGlow as f}from"./vs-fx.CLXiCjCI.js";const g=`
  :host { display: inline-flex; }
${u}
.vck {
  --box: 20px;
  --fs: 14px;
  --accent: var(--inp-accent, #ededed);
  --on-fg: var(--bg, #0a0a0a);
  --ring: var(--inp-ring, 255 255 255);
  --drop-rgb: 10 10 10;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.vck--lbl-left { flex-direction: row-reverse; }

/* sizes */
.vck--sm { --box: 16px; --fs: 13px; }
.vck--md { --box: 20px; --fs: 14px; }
.vck--lg { --box: 24px; --fs: 15px; }

/* ── box ── */
.vck__box {
  position: relative;
  isolation: isolate;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--box);
  height: var(--box);
  padding: 0;
  border: 1.5px solid var(--inp-border, #3a3a3a);
  border-radius: var(--rr, 6px);
  background: var(--bg-input, #0d0d0d);
  cursor: inherit;
  outline: none;
  transition:
    border-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    background-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    transform 340ms cubic-bezier(0.34, 1.7, 0.5, 1);
}
.vck__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
.vck__box:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3);
}
.is-pressed .vck__box { transform: scale(0.82); }
/* bounce pop on toggle (scale is independent of the press transform) */
.is-pop .vck__box { animation: vck-pop 420ms cubic-bezier(0.34, 1.7, 0.5, 1); }
@keyframes vck-pop {
  0% { scale: 0.86; }
  45% { scale: 1.14; }
  100% { scale: 1; }
}

/* checked / indeterminate → fill with the accent */
.is-on .vck__box,
.is-indeterminate .vck__box {
  background: var(--accent);
  border-color: var(--accent);
}

/* radii */
.vck--r-none { --rr: 0px; }
.vck--r-subtle { --rr: 6px; }
.vck--r-rounded { --rr: 8px; }
.vck--r-pill { --rr: 999px; }
@supports (corner-shape: squircle) {
  .vck--r-squircle { corner-shape: squircle; --rr: 12px; }
  .vck--r-squircle .vck__box { corner-shape: squircle; }
  .vck--r-squircle .vck__ripples { corner-shape: squircle; }
}

/* ── proximity glow ── */
.vck__glow {
  --glow-strength: 0.9;
  --glow-ring: 1px;
  --glow-inset: -1px;
  --glow-r-core: 33px;
  --glow-r-soft: 110px;
}
.vck--r-pill .vck__glow { border-radius: 999px; }
@supports (corner-shape: squircle) {
  .vck--r-squircle .vck__glow { corner-shape: squircle; }
}

/* ── ripples ── */
/* halo: the ripple expands AROUND the box (it is not clipped) */
.vck__ripples {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  overflow: visible;
  pointer-events: none;
}
.vck__ripple {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: radial-gradient(
    circle,
    rgb(var(--ring) / 0.35) 0%,
    rgb(var(--ring) / 0.18) 42%,
    rgb(var(--ring) / 0.06) 62%,
    transparent 78%
  );
  opacity: 0;
  will-change: transform, opacity;
  animation:
    vck-ripple-scale 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
    vck-ripple-fade 620ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
/* core: smaller radius but more intense and faster light */
.vck__ripple--inner {
  background: radial-gradient(
    circle,
    rgb(var(--ring) / 0.6) 0%,
    rgb(var(--ring) / 0.32) 40%,
    rgb(var(--ring) / 0.1) 62%,
    transparent 76%
  );
  animation:
    vck-ripple-scale 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
    vck-ripple-fade 460ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
/* outer wave: slight delay → ripple feel */
.vck__ripple:not(.vck__ripple--inner) { animation-delay: 90ms; }
@keyframes vck-ripple-scale {
  from { transform: translate(-50%, -50%) scale(0); }
  to   { transform: translate(-50%, -50%) scale(1); }
}
@keyframes vck-ripple-fade {
  from { opacity: 0.7; }
  to   { opacity: 0; }
}

/* ── check / dash ── */
.vck__mark {
  position: relative;
  z-index: 1;
  width: 78%;
  height: 78%;
  color: var(--on-fg);
}
.vck__check {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  transition: stroke-dashoffset 300ms cubic-bezier(0.65, 0, 0.35, 1);
}
.vck__dash {
  stroke-dasharray: 12;
  stroke-dashoffset: 12;
  transition: stroke-dashoffset 220ms cubic-bezier(0.65, 0, 0.35, 1);
}
.is-on:not(.is-indeterminate) .vck__check { stroke-dashoffset: 0; }
.is-indeterminate .vck__dash { stroke-dashoffset: 0; }
.is-indeterminate .vck__check { stroke-dashoffset: 24; }

/* ── label ── */
.vck__label {
  position: relative;
  display: inline-block;
  line-height: 1.2;
  transform-origin: center;
  /* default = spring back on release: Apple-style damped spring (linear()) */
  transition: transform 620ms linear(
    0, 0.013 1.2%, 0.05 2.5%, 0.193 5.1%, 0.704 12.3%, 0.9 15.6%, 1.04 19.1%,
    1.106 21.6%, 1.143 24.3%, 1.15 26%, 1.14 28.1%, 1.07 33%, 1.013 38.2%,
    0.984 43.9%, 0.977 50%, 0.986 60%, 1.003 75%, 1
  );
}
/* while held: sink fast and direct, spring is only for the return */
.vck__label.is-pressing { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }

/* water-drop ripple on the label — expanding double ring punched into the bg color,
   clipped to the letters only. Slow & fluid. */
@property --vck-r {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}
.vck__drop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  white-space: nowrap;
  --d2: calc(var(--vck-r) * 0.52);
  background:
    radial-gradient(
      circle at var(--rx, 50%) var(--ry, 50%),
      transparent calc(var(--vck-r) - 17px),
      rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--vck-r) - 13px),
      rgb(var(--drop-rgb, 10 10 10) / 0.55) calc(var(--vck-r) - 6px),
      rgb(var(--drop-rgb, 10 10 10) / 0.98) calc(var(--vck-r) - 1px),
      rgb(var(--drop-rgb, 10 10 10) / 0.62) calc(var(--vck-r) + 4px),
      rgb(var(--drop-rgb, 10 10 10) / 0.14) calc(var(--vck-r) + 11px),
      transparent calc(var(--vck-r) + 16px)
    ),
    radial-gradient(
      circle at var(--rx, 50%) var(--ry, 50%),
      transparent calc(var(--d2) - 12px),
      rgb(var(--drop-rgb, 10 10 10) / 0.30) calc(var(--d2) - 5px),
      rgb(var(--drop-rgb, 10 10 10) / 0.55) var(--d2),
      rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--d2) + 7px),
      transparent calc(var(--d2) + 12px)
    );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: vck-drop 1820ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes vck-drop {
  0%   { --vck-r: 0px; opacity: 0.4; }
  12%  { opacity: 1; }
  100% { --vck-r: 150px; opacity: 0; }
}
/* light theme: bg is light → flip the drop to white so it reads on dark letters
   (adapted from the SFC :global rule for shadow DOM) */
:host-context([data-theme='light']) .vck { --drop-rgb: 255 255 255; }

/* ── tones ── */
.vck--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; --on-fg: #fff; }
.vck--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; --on-fg: #1a1206; }
.vck--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; --on-fg: #fff; }

/* ── disabled ── */
.is-disabled {
  cursor: not-allowed;
  opacity: 0.45;
  pointer-events: none;
}
.is-disabled .vck__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .vck__box,
  .vck__check,
  .vck__dash { transition-duration: 0ms; }
  .is-pop .vck__box { animation: none; }
  .vck__ripple { display: none; }
  .vck__label { transition: none; }
}
`,h="http://www.w3.org/2000/svg",b=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let d;function m(l){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=l;const e=d.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(l,e){const t=e?m(String(e).trim()):null;if(!t){for(const s of k)l.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),r=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(s=>Math.round(r?s*.92:s+(255-s)*.16)),o=(s,p)=>l.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(s,a);o("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(s,r?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])o(s,r?"0 0 0":"255 255 255");o("--vs-color",a),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["checked","disabled","indeterminate","label","size","tone","radius","labelposition","glow","color"];#r;#e;#n;#i;#t;#s;#c;#a=!1;#L=0;#C=0;#l=()=>this.#k();#d=e=>this.#_(e);#p=e=>this.#y(e);#h=()=>this.#w();#b=e=>{e.target===this.#e&&this.#r.classList.remove("is-pop")};#v=e=>this.#A(e);#u=()=>this.#E();#f=()=>this.#m();constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=g,this.#r=document.createElement("label"),this.#r.className="vck",this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="vck__box",this.#e.setAttribute("role","checkbox"),this.#n=document.createElement("span"),this.#n.className="fx-glow vck__glow",this.#n.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="vck__ripples",this.#i.setAttribute("aria-hidden","true");const i=document.createElementNS(h,"svg");i.setAttribute("class","vck__mark"),i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("aria-hidden","true");const n=document.createElementNS(h,"path");n.setAttribute("class","vck__check"),n.setAttribute("d","M5 12.5l4.2 4.2L19 7"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2.6"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round");const r=document.createElementNS(h,"path");r.setAttribute("class","vck__dash"),r.setAttribute("d","M6 12h12"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2.6"),r.setAttribute("stroke-linecap","round"),i.append(n,r),this.#e.append(this.#n,this.#i,i),this.#t=document.createElement("span"),this.#t.className="vck__label",this.#s=document.createElement("slot"),this.#t.append(this.#s),this.#r.append(this.#e,this.#t),e.append(t,this.#r),this.#e.addEventListener("click",this.#l),this.#e.addEventListener("keydown",this.#d),this.#e.addEventListener("pointerdown",this.#p);for(const a of["pointerup","pointerleave","pointercancel"])this.#e.addEventListener(a,this.#h);this.#e.addEventListener("animationend",this.#b),this.#t.addEventListener("pointerdown",this.#v);for(const a of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(a,this.#u);this.#s.addEventListener("slotchange",this.#f)}connectedCallback(){v(this,this.getAttribute("color")),this.#a=this.#o(),this.#g(),this.#c=f(this.#e,90,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow"))}disconnectedCallback(){this.#c?.(),this.#e.removeEventListener("click",this.#l),this.#e.removeEventListener("keydown",this.#d),this.#e.removeEventListener("pointerdown",this.#p);for(const e of["pointerup","pointerleave","pointercancel"])this.#e.removeEventListener(e,this.#h);this.#e.removeEventListener("animationend",this.#b),this.#t.removeEventListener("pointerdown",this.#v);for(const e of["pointerup","pointerleave","pointercancel"])this.#t.removeEventListener(e,this.#u);this.#s.removeEventListener("slotchange",this.#f)}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#e&&this.#g()}get checked(){return this.hasAttribute("checked")}set checked(e){e?this.setAttribute("checked",""):this.removeAttribute("checked")}get indeterminate(){return this.hasAttribute("indeterminate")}#o(){return this.hasAttribute("checked")}#g(){const e=(r,a)=>this.getAttribute(r)??a,t=this.#o(),i=this.hasAttribute("indeterminate"),n=this.hasAttribute("disabled");this.#r.className=`vck vck--${e("size","md")} vck--r-${e("radius","subtle")} vck--t-${e("tone","default")} vck--lbl-${e("labelposition","right")}`+(t?" is-on":"")+(i?" is-indeterminate":"")+(n?" is-disabled":"")+(this.#r.classList.contains("is-pressed")?" is-pressed":"")+(this.#r.classList.contains("is-pop")?" is-pop":""),this.#e.disabled=n,this.#e.setAttribute("aria-checked",i?"mixed":String(t)),this.#s.textContent=e("label",""),this.#m(),t!==this.#a&&(this.#a=t,b()||(this.#r.classList.remove("is-pop"),requestAnimationFrame(()=>requestAnimationFrame(()=>this.#r.classList.add("is-pop")))))}#m(){const e=!!this.getAttribute("label")||this.#s.assignedNodes({flatten:!0}).length>0;this.#t.style.display=e?"":"none"}#k(){if(this.hasAttribute("disabled"))return;let e;this.hasAttribute("indeterminate")?(this.removeAttribute("indeterminate"),e=!0):e=!this.#o(),this.checked=e,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:e}}))}#_(e){this.hasAttribute("disabled")||(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this.#k())}#y(e){if(this.hasAttribute("disabled")||(this.#r.classList.add("is-pressed"),b()))return;const t=this.#e.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top,r=Math.max(i,t.width-i),a=Math.max(n,t.height-n),c=Math.hypot(r,a)*2;for(this.#x(i,n,c*.8,!0),this.#x(i,n,c*1.9,!1);this.#i.childElementCount>6;)this.#i.firstElementChild.remove()}#x(e,t,i,n){const r=document.createElement("span");r.className="vck__ripple"+(n?" vck__ripple--inner":""),r.style.cssText=`left:${e}px;top:${t}px;width:${i}px;height:${i}px`,r.addEventListener("animationend",()=>r.remove()),this.#i.appendChild(r)}#w(){this.#r.classList.remove("is-pressed")}#A(e){if(this.hasAttribute("disabled")||b())return;const t=this.#t.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top,r=document.createElement("span");r.className="vck__drop",r.setAttribute("aria-hidden","true"),r.textContent=this.#t.textContent,r.style.setProperty("--rx",`${i}px`),r.style.setProperty("--ry",`${n}px`),r.addEventListener("animationend",()=>r.remove()),this.#t.appendChild(r);const a=p=>Math.max(-1,Math.min(1,p)),c=a((i/t.width-.5)*2),o=a((n/t.height-.5)*2),s=1-.2*Math.min(Math.abs(c),Math.abs(o));this.#t.classList.add("is-pressing"),this.#t.style.transform=`perspective(420px) rotateX(${(-o*12*s).toFixed(2)}deg) rotateY(${(c*9*s).toFixed(2)}deg) scale(0.93)`}#E(){this.#t.classList.remove("is-pressing"),this.#t.style.transform=""}}customElements.define("vs-checkbox",x);
