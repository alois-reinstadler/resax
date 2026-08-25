import{FX_CSS as v,attachGlow as u}from"./vs-fx.CLXiCjCI.js";const g=`
  :host { display: inline-flex; }
${v}
.vrd {
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
.vrd--lbl-left { flex-direction: row-reverse; }

/* sizes */
.vrd--sm { --box: 16px; --fs: 13px; }
.vrd--md { --box: 20px; --fs: 14px; }
.vrd--lg { --box: 24px; --fs: 15px; }

/* ── circle box ── */
.vrd__box {
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
  border-radius: 50%;
  background: var(--bg-input, #0d0d0d);
  cursor: inherit;
  outline: none;
  transition:
    border-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    background-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    transform 340ms cubic-bezier(0.34, 1.7, 0.5, 1);
}
.vrd__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
.vrd__box:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3);
}
.is-pressed .vrd__box { transform: scale(0.82); }
.is-pop .vrd__box { animation: vrd-pop 420ms cubic-bezier(0.34, 1.7, 0.5, 1); }
@keyframes vrd-pop {
  0% { scale: 0.86; }
  45% { scale: 1.14; }
  100% { scale: 1; }
}

/* checked → border in accent */
.is-on .vrd__box { border-color: var(--accent); }

/* ── inner dot ── */
.vrd__dot {
  position: relative;
  z-index: 1;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: var(--accent);
  transform: scale(0);
  opacity: 0;
  transition:
    transform 360ms cubic-bezier(0.34, 1.7, 0.5, 1),
    opacity 180ms ease;
}
.is-on .vrd__dot { transform: scale(1); opacity: 1; }

/* ── proximity glow ── */
.vrd__glow {
  --glow-strength: 0.9;
  --glow-ring: 1px;
  --glow-inset: -1px;
  --glow-r-core: 33px;
  --glow-r-soft: 110px;
  border-radius: 50%;
}

/* ── ripples ── */
.vrd__ripples {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  overflow: visible;
  pointer-events: none;
}
.vrd__ripple {
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
    vrd-ripple-scale 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
    vrd-ripple-fade 620ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
.vrd__ripple--inner {
  background: radial-gradient(
    circle,
    rgb(var(--ring) / 0.6) 0%,
    rgb(var(--ring) / 0.32) 40%,
    rgb(var(--ring) / 0.1) 62%,
    transparent 76%
  );
  animation:
    vrd-ripple-scale 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
    vrd-ripple-fade 460ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
.vrd__ripple:not(.vrd__ripple--inner) { animation-delay: 90ms; }
@keyframes vrd-ripple-scale {
  from { transform: translate(-50%, -50%) scale(0); }
  to   { transform: translate(-50%, -50%) scale(1); }
}
@keyframes vrd-ripple-fade {
  from { opacity: 0.7; }
  to   { opacity: 0; }
}

/* ── label ── */
.vrd__label {
  position: relative;
  display: inline-block;
  line-height: 1.2;
  transform-origin: center;
  transition: transform 620ms linear(
    0, 0.013 1.2%, 0.05 2.5%, 0.193 5.1%, 0.704 12.3%, 0.9 15.6%, 1.04 19.1%,
    1.106 21.6%, 1.143 24.3%, 1.15 26%, 1.14 28.1%, 1.07 33%, 1.013 38.2%,
    0.984 43.9%, 0.977 50%, 0.986 60%, 1.003 75%, 1
  );
}
.vrd__label.is-pressing { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }

/* water-drop ripple on the label — expanding double ring punched into the bg
   color, clipped to the letters only. Slow & fluid. */
@property --vrd-r {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}
.vrd__drop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  white-space: nowrap;
  --d2: calc(var(--vrd-r) * 0.52);
  background:
    radial-gradient(
      circle at var(--rx, 50%) var(--ry, 50%),
      transparent calc(var(--vrd-r) - 17px),
      rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--vrd-r) - 13px),
      rgb(var(--drop-rgb, 10 10 10) / 0.55) calc(var(--vrd-r) - 6px),
      rgb(var(--drop-rgb, 10 10 10) / 0.98) calc(var(--vrd-r) - 1px),
      rgb(var(--drop-rgb, 10 10 10) / 0.62) calc(var(--vrd-r) + 4px),
      rgb(var(--drop-rgb, 10 10 10) / 0.14) calc(var(--vrd-r) + 11px),
      transparent calc(var(--vrd-r) + 16px)
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
  animation: vrd-drop 1820ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes vrd-drop {
  0%   { --vrd-r: 0px; opacity: 0.4; }
  12%  { opacity: 1; }
  100% { --vrd-r: 150px; opacity: 0; }
}
/* light theme: bg is light → flip the drop to white so it reads on dark letters
   (adapted from the SFC :global rule for shadow DOM) */
:host-context([data-theme='light']) .vrd { --drop-rgb: 255 255 255; }

/* ── tones ── */
.vrd--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
.vrd--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
.vrd--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }

/* ── disabled ── */
.is-disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
.is-disabled .vrd__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .vrd__box,
  .vrd__dot { transition-duration: 0ms; }
  .is-pop .vrd__box { animation: none; }
  .vrd__ripple { display: none; }
  .vrd__label { transition: none; }
}
`,h=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let c;function m(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(l,t){const e=t?m(String(t).trim()):null;if(!e){for(const s of f)l.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),i=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(i?s*.92:s+(255-s)*.16)),a=(s,p)=>l.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,d);a("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,i?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,i?"0 0 0":"255 255 255");a("--vs-color",d),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["checked","disabled","label","name","value","size","tone","glow","label-position","color"];#r;#t;#n;#i;#e;#s;#d;#a=!1;#l=()=>this.#x();#c=t=>this.#w(t);#p=t=>this.#k(t);#h=()=>this.#E();#b=t=>{t.target===this.#t&&this.#r.classList.remove("is-pop")};#v=t=>this.#A(t);#u=()=>this.#L();#g=()=>this.#f();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#r=document.createElement("label"),this.#r.className="vrd",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vrd__box",this.#t.setAttribute("role","radio"),this.#n=document.createElement("span"),this.#n.className="fx-glow vrd__glow",this.#n.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="vrd__ripples",this.#i.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="vrd__dot",r.setAttribute("aria-hidden","true"),this.#t.append(this.#n,this.#i,r),this.#e=document.createElement("span"),this.#e.className="vrd__label",this.#s=document.createElement("slot"),this.#e.append(this.#s),this.#r.append(this.#t,this.#e),t.append(e,this.#r),this.#t.addEventListener("click",this.#l),this.#t.addEventListener("keydown",this.#c),this.#t.addEventListener("pointerdown",this.#p);for(const n of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(n,this.#h);this.#t.addEventListener("animationend",this.#b),this.#e.addEventListener("pointerdown",this.#v);for(const n of["pointerup","pointerleave","pointercancel"])this.#e.addEventListener(n,this.#u);this.#s.addEventListener("slotchange",this.#g)}connectedCallback(){b(this,this.getAttribute("color")),this.#a=this.#o(),this.#m(),this.#d=u(this.#t,90,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow"))}disconnectedCallback(){this.#d?.(),this.#t.removeEventListener("click",this.#l),this.#t.removeEventListener("keydown",this.#c),this.#t.removeEventListener("pointerdown",this.#p);for(const t of["pointerup","pointerleave","pointercancel"])this.#t.removeEventListener(t,this.#h);this.#t.removeEventListener("animationend",this.#b),this.#e.removeEventListener("pointerdown",this.#v);for(const t of["pointerup","pointerleave","pointercancel"])this.#e.removeEventListener(t,this.#u);this.#s.removeEventListener("slotchange",this.#g)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#m()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}get value(){return this.getAttribute("value")??void 0}set value(t){t==null?this.removeAttribute("value"):this.setAttribute("value",t)}#o(){return this.hasAttribute("checked")}#m(){const t=(n,i)=>this.getAttribute(n)??i,e=this.#o(),r=this.hasAttribute("disabled");this.#r.className=`vrd vrd--${t("size","md")} vrd--t-${t("tone","default")} vrd--lbl-${t("label-position","right")}`+(e?" is-on":"")+(r?" is-disabled":"")+(this.#r.classList.contains("is-pressed")?" is-pressed":"")+(this.#r.classList.contains("is-pop")?" is-pop":""),this.#t.disabled=r,this.#t.setAttribute("aria-checked",String(e)),this.#s.textContent=t("label",""),this.#f(),e!==this.#a&&(this.#a=e,e&&!h()&&(this.#r.classList.remove("is-pop"),requestAnimationFrame(()=>requestAnimationFrame(()=>this.#r.classList.add("is-pop")))))}#f(){const t=!!this.getAttribute("label")||this.#s.assignedNodes({flatten:!0}).length>0;this.#e.style.display=t?"":"none"}#x(){this.hasAttribute("disabled")||this.#o()||(this.#_(),this.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:!0,value:this.value}})))}#_(){const t=this.getAttribute("name");if(!t)return;const e=this.getRootNode()||document,r=e.querySelectorAll?e:document;for(const n of r.querySelectorAll("vs-radio[name]"))n!==this&&n.getAttribute("name")===t&&(n.checked=!1)}#w(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#x())}#k(t){if(this.hasAttribute("disabled")||(this.#r.classList.add("is-pressed"),h()))return;const e=this.#t.getBoundingClientRect(),r=t.clientX-e.left,n=t.clientY-e.top,i=Math.max(r,e.width-r),d=Math.max(n,e.height-n),o=Math.hypot(i,d)*2;for(this.#y(r,n,o*.8,!0),this.#y(r,n,o*1.9,!1);this.#i.childElementCount>6;)this.#i.firstElementChild.remove()}#y(t,e,r,n){const i=document.createElement("span");i.className="vrd__ripple"+(n?" vrd__ripple--inner":""),i.style.cssText=`left:${t}px;top:${e}px;width:${r}px;height:${r}px`,i.addEventListener("animationend",()=>i.remove()),this.#i.appendChild(i)}#E(){this.#r.classList.remove("is-pressed")}#A(t){if(this.hasAttribute("disabled")||h())return;const e=this.#e.getBoundingClientRect(),r=t.clientX-e.left,n=t.clientY-e.top,i=document.createElement("span");i.className="vrd__drop",i.setAttribute("aria-hidden","true"),i.textContent=this.#e.textContent,i.style.setProperty("--rx",`${r}px`),i.style.setProperty("--ry",`${n}px`),i.addEventListener("animationend",()=>i.remove()),this.#e.appendChild(i);const d=p=>Math.max(-1,Math.min(1,p)),o=d((r/e.width-.5)*2),a=d((n/e.height-.5)*2),s=1-.2*Math.min(Math.abs(o),Math.abs(a));this.#e.classList.add("is-pressing"),this.#e.style.transform=`perspective(420px) rotateX(${(-a*12*s).toFixed(2)}deg) rotateY(${(o*9*s).toFixed(2)}deg) scale(0.93)`}#L(){this.#e.classList.remove("is-pressing"),this.#e.style.transform=""}}customElements.define("vs-radio",x);
