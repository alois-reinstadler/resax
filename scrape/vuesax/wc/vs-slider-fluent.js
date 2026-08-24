import{FX_CSS as g,attachGlow as b}from"./vs-fx.CLXiCjCI.js";const u=44,p=["/bg-demo/227.webp","/bg-demo/206.webp","/bg-demo/193.webp"],w=15,x=[20,16,12,10,8,6,5,4,3,2],f=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function _(l,t){const e=l/t;return 2*(1/(1+Math.exp(-e))-.5)*t}const y=`
  :host { display: block; }
  :host([block]) .vsf { width: 100%; }
  /* demo-bg fills the whole preview (full width + height) */
  :host([demo-bg]:not([demo-bg="false"])) { width: 100%; height: 100%; }
${g}
/* The four size tokens read an outer override first, so a host that needs a
   tighter slider than the sm size (the config panel) sets --vsf-h/--vsf-fs/
   --vsf-pad on the element instead of forcing a new size into the catalog.
   No backticks in here: this whole block is a JS template literal. */
.vsf {
  --w: var(--vsf-w, 260px);
  --h: var(--vsf-h, 48px);
  --fs: var(--vsf-fs, 14px);
  --pad: var(--vsf-pad, 16px);
  --r: var(--ctrl-r-md, 12px);
  position: relative;
  width: var(--w);
  font-family: inherit;
  color: var(--text, #ededed);
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.vsf--sm { --w: var(--vsf-w, 210px); --h: var(--vsf-h, 40px); --fs: var(--vsf-fs, 13px); --pad: var(--vsf-pad, 13px); --r: var(--ctrl-r-sm, 10px); }
.vsf--lg { --w: var(--vsf-w, 320px); --h: var(--vsf-h, 58px); --fs: var(--vsf-fs, 15px); --pad: var(--vsf-pad, 20px); --r: var(--ctrl-r-lg, 14px); }

/* radius (same options as VsButton) */
.vsf--r-none { --r: 0px; }
.vsf--r-subtle { --r: 8px; }
/* .vsf--r-rounded → uses the size-scaled --r (default var above) */
.vsf--r-pill { --r: 999px; }
/* squircle = the Apple continuous corner. pronounced radius (scales with height),
   and corner-shape on every rounded layer so the progress matches the track. */
@supports (corner-shape: squircle) {
  .vsf--r-squircle { --r: calc(var(--h) * 0.46 + 3px); --r-mult: 1; }
  .vsf--r-squircle .vsf__track,
  .vsf--r-squircle .vsf__mask,
  .vsf--r-squircle .vsf__fill { corner-shape: squircle; }
}

.vsf__row {
  position: relative;
  z-index: 1;
  display: flex;
}

.vsf__stretch {
  width: 100%;
  will-change: transform;
}

.vsf__track {
  --rr: calc(var(--r, 12px) * var(--r-mult, 1));
  position: relative;
  display: flex;
  align-items: center;
  height: var(--h);
  border-radius: var(--rr);
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  outline: none;
  /* fluent frosted glass */
  background: rgb(var(--fx-tint, 255 255 255) / 0.06);
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  backdrop-filter: blur(14px) saturate(1.4);
  box-shadow:
    inset 0 1px 0 rgb(var(--fx-tint, 255 255 255) / 0.14),
    inset 0 0 0 1px rgb(var(--fx-tint, 255 255 255) / 0.08);
}
.vsf__track:active,
.vsf__track.is-pressed { cursor: grabbing; }
.vsf__track:focus-visible {
  box-shadow:
    inset 0 1px 0 rgb(var(--fx-tint, 255 255 255) / 0.14),
    0 0 0 2px rgb(var(--fx-tint, 255 255 255) / 0.5);
}

/* step dots (pips), masked to transparent under label/value and following
   the progress so none show behind the frosted bar */
.vsf__dots {
  position: absolute;
  inset: 0 var(--pad);
  z-index: 1;
  font-size: var(--fs);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  --lz: max(calc(var(--labelw, 0) * 1ch + 6px), calc(var(--prog, 0) * 1%));
  --rz: calc(var(--valuew, 0) * 1ch);
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0,
    transparent var(--lz),
    #000 calc(var(--lz) + 12px),
    #000 calc(100% - var(--rz) - 12px),
    transparent calc(100% - var(--rz)),
    transparent 100%
  );
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    transparent var(--lz),
    #000 calc(var(--lz) + 12px),
    #000 calc(100% - var(--rz) - 12px),
    transparent calc(100% - var(--rz)),
    transparent 100%
  );
}
.vsf__dot {
  width: 3px;
  height: 3px;
  border-radius: 999px;
  background: rgb(var(--fx-tint, 255 255 255) / 0.4);
}

/* frosted progress — its own blur, a touch brighter than the track */
.vsf__fill {
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 3;
  height: 100%;
  border-radius: inherit;
  background: rgb(var(--fx-tint, 255 255 255) / 0.14);
  -webkit-backdrop-filter: blur(10px) saturate(1.3);
  backdrop-filter: blur(10px) saturate(1.3);
  box-shadow: inset 0 1px 0 rgb(var(--fx-tint, 255 255 255) / 0.16);
}

/* label + value INSIDE the track */
.vsf__content {
  position: relative;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 0 var(--pad);
  pointer-events: none;
}
.vsf__label {
  font-size: var(--fs);
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--text, #ededed);
  white-space: nowrap;
}
/* handle line pinned to the progress edge (left = displayPct), just inside the fill */
.vsf__thumb {
  position: absolute;
  top: 50%;
  z-index: 4;
  width: 2px;
  height: calc(var(--fs) + 4px);
  border-radius: 999px;
  background: var(--text, #ededed);
  transform: translate(-16px, -50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 160ms ease;
}
/* line shows only on hover/focus/drag AND only where it won't cross the
   label or value text (.is-clear, toggled from JS via cached widths) */
.vsf__track:hover .vsf__thumb.is-clear,
.vsf__track:focus-visible .vsf__thumb.is-clear,
.vsf__track.is-pressed .vsf__thumb.is-clear { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .vsf__thumb { transition: none; }
}
.vsf__value {
  margin-left: auto;
  font-size: var(--fs);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--text, #ededed);
  transition: transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* at 100% nudge the number left so the handle line doesn't crowd it */
.vsf__value.is-max { transform: translateX(-10px); }

/* proximity light on the border (.fx-glow base above), shaped by the track radius */
.vsf__glow {
  z-index: 5;
  --glow-strength: 0.9;
  --glow-ring: 1px;
  --glow-inset: 0;
  --glow-r-core: 60px;
  --glow-r-soft: 200px;
}
@supports (corner-shape: squircle) {
  .vsf--r-squircle .vsf__glow { corner-shape: squircle; }
}

/* demo-bg: full-bleed image scene with a dark scrim, frosted slider centered
   over it (ported from the SFC's .vsf-scene, minus the Foundry catalog CSS) */
.vsf__scene { display: none; }
.vsf.has-demo {
  width: 100%;
  height: 100%;
  /* 140, not 180: a catalog card's preview box is ~155px tall, and a taller
     min-height made the scene overflow the frame instead of filling it. */
  min-height: 140px;
  /* fluid gutter: fixed 28px + a 260px track needs 316px, more than a card
     preview has → the scene overflowed to the right and read off-centre. */
  padding: clamp(12px, 9%, 28px);
  box-sizing: border-box;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.vsf.has-demo .vsf__scene {
  display: block;
  position: absolute;
  inset: 0;
  z-index: 0;
  /* image set at runtime from a random pick (see DEMO_BGS); scrim stays here */
  background:
    linear-gradient(rgb(0 0 0 / 0.42), rgb(0 0 0 / 0.42)),
    var(--demo-img, url(/bg-demo/227.webp)) center / cover no-repeat;
}
/* Row spans the padding box so the track can measure against a real width and
   stay dead-centred; the track keeps --w until the box is narrower than that,
   then it shrinks instead of bleeding out of the frame. */
.vsf.has-demo .vsf__row { width: 100%; justify-content: center; }
/* margin-inline on the TRACK, not just justify-content on the row: .vsf__stretch
   (the elastic scaleX layer) is width:100%, so centring the row leaves the track
   pinned to its left edge on a wide stage. */
.vsf.has-demo .vsf__track { width: min(var(--w), 100%); margin-inline: auto; }

.is-disabled { opacity: 0.45; }
.is-disabled .vsf__track { cursor: not-allowed; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .vsf__stretch,
  .vsf__value { transition: none; }
}
`;let d;function k(l){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=l;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(l,t){const e=t?k(String(t).trim()):null;if(!e){for(const n of E)l.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),i=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(n=>Math.round(i?n*.92:n+(255-n)*.16)),o=(n,c)=>l.style.setProperty(n,c);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,a);o("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,i?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,i?"0 0 0":"255 255 255");o("--vs-color",a),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class M extends HTMLElement{static observedAttributes=["value","default-value","min","max","stepped","steps","decimals","size","radius","disabled","label","show-value","dots","glow","demo-bg","color"];#e=50;#E=null;#P=!1;#d="middle";#B=0;#h=0;#F=!1;#M=null;#n=0;#w=0;#x=0;#l=0;#I=null;#f=0;#T=0;#j=0;#q=0;#u=null;#_;#y;#p;#t;#i;#A;#v;#o;#L;#a;#z;#W=t=>this.#dt(t);#G=t=>this.#ft(t);#S=()=>this.#ut();#K=t=>this.#pt(t);#U=()=>{this.#M=null};#H=()=>{const t=this.#$(),e=t-this.#n;this.#w=this.#w*.6+e*.16,this.#n+=this.#w,Math.abs(e)<.04&&Math.abs(this.#w)<.04&&(this.#n=t,this.#w=0),this.#O(),this.#x=requestAnimationFrame(this.#H)};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=y,this.#_=document.createElement("div"),this.#_.className="vsf",this.#y=document.createElement("div"),this.#y.className="vsf__scene",this.#y.setAttribute("aria-hidden","true");const s=document.createElement("div");s.className="vsf__row",this.#p=document.createElement("div"),this.#p.className="vsf__stretch",this.#t=document.createElement("div"),this.#t.className="vsf__track",this.#t.setAttribute("role","slider"),this.#t.tabIndex=0,this.#i=document.createElement("div"),this.#i.className="vsf__dots",this.#i.setAttribute("aria-hidden","true"),this.#A=document.createElement("div"),this.#A.className="vsf__fill",this.#v=document.createElement("span"),this.#v.className="vsf__thumb",this.#v.setAttribute("aria-hidden","true");const r=document.createElement("div");r.className="vsf__content",this.#o=document.createElement("span"),this.#o.className="vsf__label",this.#L=document.createElement("slot"),this.#o.append(this.#L),this.#a=document.createElement("span"),this.#a.className="vsf__value",r.append(this.#o,this.#a),this.#z=document.createElement("span"),this.#z.className="fx-glow vsf__glow",this.#z.setAttribute("aria-hidden","true"),this.#t.append(this.#i,this.#A,this.#v,r,this.#z),this.#p.append(this.#t),s.append(this.#p),this.#_.append(this.#y,s),t.append(e,this.#_),this.#t.addEventListener("pointermove",this.#W),this.#t.addEventListener("pointerdown",this.#G),this.#t.addEventListener("pointerup",this.#S),this.#t.addEventListener("pointercancel",this.#S),this.#t.addEventListener("keydown",this.#K)}connectedCallback(){v(this,this.getAttribute("color")),this.#P=!0,this.#y.style.setProperty("--demo-img",`url(${p[Math.floor(Math.random()*p.length)]})`);const t=this.hasAttribute("value")?this.#c("value",50):this.#c("default-value",50);this.#e=this.#C(t),this.#n=this.#$(),this.#O(),this.#k(),this.#X(),window.addEventListener("resize",this.#U,{passive:!0}),this.#I=b(this.#t,120,()=>this.#g||!this.#at),typeof ResizeObserver<"u"&&(this.#u=new ResizeObserver(()=>this.#it()),this.#u.observe(this.#t),this.#u.observe(this.#o),this.#u.observe(this.#a)),this.#it(),f()||(this.#x=requestAnimationFrame(this.#H))}disconnectedCallback(){this.#P=!1,this.#x&&(cancelAnimationFrame(this.#x),this.#x=0),this.#l&&(cancelAnimationFrame(this.#l),this.#l=0),window.removeEventListener("resize",this.#U),this.#u?.disconnect(),this.#u=null,this.#I?.(),this.#t.removeEventListener("pointermove",this.#W),this.#t.removeEventListener("pointerdown",this.#G),this.#t.removeEventListener("pointerup",this.#S),this.#t.removeEventListener("pointercancel",this.#S),this.#t.removeEventListener("keydown",this.#K)}attributeChangedCallback(t,e,s){if(v(this,this.getAttribute("color")),!(!this.#P||e===s)){if(t==="value"){if(this.#E!==null&&Number(s)===this.#E){this.#E=null;return}this.#e=this.#C(this.#c("value",this.#e))}else t==="default-value"&&(this.hasAttribute("value")||(this.#e=this.#C(this.#c("default-value",50))));this.#X()}}get value(){return this.#e}set value(t){this.setAttribute("value",String(t))}#c(t,e){const s=parseFloat(this.getAttribute(t));return Number.isFinite(s)?s:e}#m(t){const e=this.getAttribute(t);return e!==null&&e!=="false"&&e!=="0"}get#s(){return this.#c("min",0)}get#r(){return this.#c("max",100)}get#J(){return this.#c("steps",10)}get#R(){return this.#m("stepped")}get#g(){return this.#m("disabled")}get#Y(){return this.#m("show-value")}get#Q(){return this.#m("dots")}get#at(){return this.#m("glow")}get#ht(){return this.#m("demo-bg")}#C(t){return Math.min(this.#r,Math.max(this.#s,t))}#N(){const t=Math.max(1,Math.round(this.#J));return(this.#r-this.#s)/t}#Z(){const t=this.getAttribute("decimals");if(t!==null){const s=parseInt(t,10);if(Number.isFinite(s))return Math.min(6,Math.max(0,s))}const e=this.#R?this.#N():(this.#r-this.#s)/100;return!(e>0)||e>=1?0:Math.min(4,Math.ceil(-Math.log10(e)))}#D(t){const e=Math.pow(10,this.#Z());return Math.round(t*e)/e}#ot(t){const e=this.#Z();return e?t.toFixed(e):String(Math.round(t))}#lt(){const t=Math.max(1,Math.round(this.#J)),e=this.#f?this.#f-this.#st()*2:0,s=e?Math.max(2,Math.floor(e/w)+1):41;if(t+1<=s)return Math.max(2,t+1);let r=2;for(let i=2;i<=t;i++)if(t%i===0&&t/i+1<=s){r=t/i+1;break}for(const i of x)if(i+1<=s){r=Math.max(r,i+1);break}return r}#$(){const t=this.#r-this.#s;return t===0?0:Math.min(Math.max((this.#e-this.#s)/t*100,0),100)}#b(t){const e=this.#C(t);if(this.#g||e===this.#e)return;this.#e=e,this.#E=e,this.setAttribute("value",String(e)),this.#X();const s=e;this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:s})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:s}))}#V(){return this.#M||this.#t.getBoundingClientRect()}#tt(t){const e=this.#V();if(!e)return this.#e;let s=this.#s+(t-e.left)/e.width*(this.#r-this.#s);return this.#R&&(s=this.#s+Math.round((s-this.#s)/this.#N())*this.#N(),s=this.#D(s)),Math.min(Math.max(s,this.#s),this.#r)}#et(t){this.#B=t;const e=this.#V();if(!e)return;const{left:s,right:r}=e;let i;t<s?(this.#d="left",i=s-t):t>r?(this.#d="right",i=t-r):(this.#d="middle",i=0),this.#h=_(i,u),this.#k()}#k(){const t=this.#V(),e=!t||t.width===0?1:1+this.#h/t.width,r=1+this.#h/u*(.82-1);let i;this.#d==="left"?i="right center":this.#d==="right"?i="left center":t?i=this.#B<t.left+t.width/2?"right center":"left center":i="center",this.#p.style.transform=`scaleX(${e}) scaleY(${r})`,this.#p.style.transformOrigin=i}#ct(){if(f()){this.#h=0,this.#k();return}const t=this.#h,e=performance.now(),s=210,r=22,i=Math.sqrt(s),a=r/(2*Math.sqrt(s)),h=i*Math.sqrt(Math.max(1-a*a,0)),o=n=>{const c=(n-e)/1e3,m=Math.exp(-a*i*c)*(Math.cos(h*c)+a*i/h*Math.sin(h*c));this.#h=t*m,this.#k(),Math.abs(this.#h)>.02&&c<1.4?this.#l=requestAnimationFrame(o):(this.#h=0,this.#k())};this.#l=requestAnimationFrame(o)}#dt(t){this.#g||t.buttons===0||(this.#b(this.#tt(t.clientX)),this.#et(t.clientX))}#ft(t){if(!this.#g){this.#F=!0,this.#t.classList.add("is-pressed"),this.#M=this.#t.getBoundingClientRect(),this.#b(this.#tt(t.clientX)),this.#et(t.clientX);try{this.#t.setPointerCapture(t.pointerId)}catch{}}}#ut(){this.#F=!1,this.#t.classList.remove("is-pressed"),this.#M=null,this.#d="middle",this.#l&&cancelAnimationFrame(this.#l),this.#ct()}#pt(t){if(this.#g)return;const e=this.#R?this.#N():(this.#r-this.#s)/100;t.key==="ArrowRight"||t.key==="ArrowUp"?(t.preventDefault(),this.#b(this.#D(this.#e+e))):t.key==="ArrowLeft"||t.key==="ArrowDown"?(t.preventDefault(),this.#b(this.#D(this.#e-e))):t.key==="Home"?(t.preventDefault(),this.#b(this.#s)):t.key==="End"&&(t.preventDefault(),this.#b(this.#r))}#O(){this.#A.style.width=`${this.#n}%`,this.#v.style.left=`${this.#n}%`,this.#i.style.setProperty("--prog",String(this.#n)),this.#rt()}#st(){if(this.#q>0)return this.#q;const t=this.getAttribute("size")||"md";return t==="sm"?13:t==="lg"?20:16}#it(){const t=this.#f;this.#f=this.#t.clientWidth,this.#T=this.#o.hidden?0:this.#o.offsetWidth,this.#j=this.#a.hidden?0:this.#a.offsetWidth,this.#q=parseFloat(getComputedStyle(this.#t).getPropertyValue("--pad"))||0,this.#f!==t&&this.#Q&&this.#nt(),this.#rt()}#rt(){const t=this.#f;if(!t)return;const e=t*this.#n/100,s=this.#st(),r=20,i=s+this.#T,a=t-s-this.#j,h=e>i+r&&e<a-r;this.#v.classList.toggle("is-clear",h)}#nt(){const t=this.#lt();for(;this.#i.children.length<t;){const e=document.createElement("span");e.className="vsf__dot",this.#i.appendChild(e)}for(;this.#i.children.length>t;)this.#i.lastElementChild.remove()}#X(){const t=(a,h)=>this.getAttribute(a)??h,e=this.#g;this.#_.className=`vsf vsf--${t("size","md")} vsf--r-${t("radius","pill")}`+(e?" is-disabled":"")+(this.#ht?" has-demo":""),this.#t.classList.toggle("is-pressed",this.#F);const s=t("label","Volume"),r=this.#ot(this.#e);this.#t.setAttribute("aria-valuemin",String(this.#s)),this.#t.setAttribute("aria-valuemax",String(this.#r)),this.#t.setAttribute("aria-valuenow",r),this.#t.setAttribute("aria-label",s),e?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");const i=this.#Q;this.#i.style.display=i?"":"none",i&&this.#nt(),this.#i.style.setProperty("--labelw",String(s?s.length||6:0)),this.#i.style.setProperty("--valuew",String(this.#Y?r.length:0)),this.#o.hidden=!s,this.#L.textContent=s,this.#a.hidden=!this.#Y,this.#a.textContent=r,this.#a.classList.toggle("is-max",this.#e>=this.#r),f()&&(this.#n=this.#$(),this.#O())}}customElements.define("vs-slider-fluent",M);
