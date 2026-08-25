import{FX_CSS as m,attachGlow as f}from"./vs-fx.CLXiCjCI.js";const g=`
${m}
:host { display: inline-flex; }
.stp {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --fs: var(--ctrl-fs-md, 14px);
  --accent: var(--ui-accent, #ededed);
  --fx-tint: var(--ui-ring, 255 255 255);
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: stretch;
  gap: 4px;
  height: var(--h);
  padding: 4px;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: calc(var(--r) * 1.1);
  background: var(--bg-elevated, #111);
}
.stp--left { flex-direction: row-reverse; }
.stp--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); }
.stp--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: calc(var(--ctrl-fs-lg, 15px) + 1px); }

.stp__value {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3ch;
  padding: 0 0.6ch;
  color: var(--inp-text, #ededed);
  font-size: var(--fs);
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
  user-select: none;
  transition: transform 340ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.stp.is-bump-up .stp__value { transform: translateY(-14%) scale(1.08); }
.stp.is-bump-down .stp__value { transform: translateY(14%) scale(1.08); }

.stp__controls {
  position: relative;
  z-index: 2;
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  flex: none;
}
/* Two keys splitting a 40px column are 19px tall each — well under the 24px
   thumb floor, and the column cannot grow without the control growing with it.
   So the button box is padded past the floor and the padding handed back with
   margin (4/3, not 4/4: the extra 1px replaces the border that moved to
   ::before, which keeps the content box — and with it the 62%-sized chevron —
   exactly the size it was). The key itself is ::before, pinned to the old
   19px band so the 2px seam between the two reads the same. */
.stp__btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--h) - 8px);
  flex: 1 1 0;
  min-height: 0;
  padding: 4px 1px;
  margin: -3px 0;
  border: 0;
  background: none;
  color: var(--inp-text, #ededed);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: opacity 180ms ease;
}
.stp__btn::before {
  content: '';
  position: absolute;
  inset: 3px 0;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: calc(var(--r) * 0.6);
  background: var(--bg-input, #0d0d0d);
  transition: border-color 180ms ease, background-color 180ms ease;
}
.stp__btn:hover:not(:disabled)::before {
  border-color: var(--inp-border-hover, #3d3d3d);
  background: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
}
.stp__btn:focus-visible { outline: none; }
.stp__btn:focus-visible::before { border-color: var(--ui-accent, #ededed); }
.stp__btn:disabled { opacity: 0.35; cursor: not-allowed; }
.stp__icon {
  /* The key is an absolutely positioned ::before, which paints above ordinary
     in-flow children — the chevron has to be positioned too or it goes under. */
  position: relative;
  width: 62%;
  height: 62%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.stp--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --fx-tint: 255 99 105; }
.stp--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --fx-tint: 255 178 36; }
.stp--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --fx-tint: 76 195 138; }

.stp.is-disabled { opacity: 0.55; }

/* glow — feathered ring on the container border, out of flow (position:absolute) */
.stp__glow { z-index: 1; }

@media (prefers-reduced-motion: reduce) {
  .stp__btn,
  .stp__btn::before,
  .stp__value { transition: none; }
  .stp.is-bump-up .stp__value,
  .stp.is-bump-down .stp__value { transform: none; }
}
`,u="http://www.w3.org/2000/svg";function p(n){const t=document.createElementNS(u,"svg");t.setAttribute("class","stp__icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");const e=document.createElementNS(u,"path");return e.setAttribute("d",n),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-miterlimit","10"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t.appendChild(e),t}const v="M19.9201 15.0496L13.4001 8.52965C12.6301 7.75965 11.3701 7.75965 10.6001 8.52965L4.08008 15.0496",x="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502";let l;function w(n){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=n;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(n,t){const e=t?w(String(t).trim()):null;if(!e){for(const s of _)n.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),r=(s,b)=>n.style.setProperty(s,b);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,c);r("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,a?"0 0 0":"255 255 255");r("--vs-color",c),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["value","min","max","step","size","tone","disabled","controls-side","glow","color"];#_;#t;#l;#h;#i;#s;#e=0;#p;#d=!1;#b=!1;#r=0;#n=0;#o=0;#m=0;constructor(){super(),this.#_=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=g,this.#t=document.createElement("div"),this.#t.setAttribute("role","spinbutton"),this.#l=document.createElement("span"),this.#l.className="fx-glow stp__glow",this.#l.setAttribute("aria-hidden","true"),this.#h=document.createElement("span"),this.#h.className="stp__value";const e=document.createElement("span");e.className="stp__controls",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="stp__btn stp__btn--up",this.#i.setAttribute("aria-label","Increase"),this.#i.appendChild(p(v)),this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="stp__btn stp__btn--down",this.#s.setAttribute("aria-label","Decrease"),this.#s.appendChild(p(x)),e.append(this.#i,this.#s),this.#t.append(this.#l,this.#h,e),this.#_.append(t,this.#t),this.#C(this.#i,1),this.#C(this.#s,-1)}connectedCallback(){d(this,this.getAttribute("color")),this.#e=this.#c(this.#a("value",0)),this.#b=!0,this.#A(),this.#u(),this.#p=f(this.#t,200,()=>this.hasAttribute("disabled")||this.getAttribute("glow")==="false")}disconnectedCallback(){this.#w(),this.#r&&cancelAnimationFrame(this.#r),this.#n&&clearTimeout(this.#n),this.#r=this.#n=0,this.#p?.(),this.#p=void 0,this.#b=!1}attributeChangedCallback(t,e,i){if(d(this,this.getAttribute("color")),!(!this.#b||e===i)){if(t==="value"){if(this.#d)return;const o=this.#c(this.#a("value",this.#e));o!==this.#e&&(this.#k(o>this.#e?1:-1),this.#e=o),this.#u();return}this.#e=this.#c(this.#e),this.#A(),this.#u()}}get value(){return this.#e}set value(t){this.setAttribute("value",String(t))}#a(t,e){const i=parseFloat(this.getAttribute(t));return Number.isFinite(i)?i:e}get#f(){return this.#a("min",0)}get#g(){return this.#a("max",100)}get#E(){const t=this.#a("step",1);return t>0?t:1}get#y(){const t=String(this.getAttribute("step")??"1");return t.includes(".")?t.split(".")[1].length:0}get#v(){return this.#e<=this.#f}get#x(){return this.#e>=this.#g}#c(t){return Math.min(this.#g,Math.max(this.#f,t))}#N(t){const e=Math.pow(10,this.#y);return Math.round(t*e)/e}#A(){const t=this.getAttribute("size")||"md",e=this.getAttribute("tone")||"default",i=this.getAttribute("controls-side")||"right",o=this.hasAttribute("disabled"),a=this.#t.classList.contains("is-bump-up")?" is-bump-up":this.#t.classList.contains("is-bump-down")?" is-bump-down":"";this.#t.className=`stp stp--${t} stp--t-${e} stp--${i}${o?" is-disabled":""}${a}`,this.#t.setAttribute("aria-valuemin",String(this.#f)),this.#t.setAttribute("aria-valuemax",String(this.#g)),o?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled")}#u(){const t=this.hasAttribute("disabled");this.#h.textContent=this.#e.toFixed(this.#y),this.#t.setAttribute("aria-valuenow",String(this.#e)),this.#i.disabled=t||this.#x,this.#s.disabled=t||this.#v}#k(t){this.#t.classList.remove("is-bump-up","is-bump-down"),this.#r&&cancelAnimationFrame(this.#r),this.#r=requestAnimationFrame(()=>{this.#r=0,this.#t.classList.add(t===1?"is-bump-up":"is-bump-down"),this.#n&&clearTimeout(this.#n),this.#n=setTimeout(()=>this.#t.classList.remove("is-bump-up","is-bump-down"),360)})}#T(t,e){const i=this.#c(this.#N(t));i!==this.#e&&(this.#k(e??(i>this.#e?1:-1)),this.#e=i,this.#d=!0,this.setAttribute("value",String(i)),this.#d=!1,this.#u(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:i}})))}#S(t){this.hasAttribute("disabled")||this.#T(this.#e+t*this.#E,t)}#L(t){if(this.hasAttribute("disabled"))return;this.#m=t,this.#S(t);let e=340;const i=()=>{if(this.#m===t){if(t===1&&this.#x||t===-1&&this.#v)return this.#w();this.#S(t),e=Math.max(40,e*.8),this.#o=setTimeout(i,e)}};this.#o=setTimeout(i,e)}#w(){this.#m=0,this.#o&&(clearTimeout(this.#o),this.#o=0)}#C(t,e){t.addEventListener("pointerdown",i=>{if(i.preventDefault(),!(this.hasAttribute("disabled")||(e===1?this.#x:this.#v))){try{t.setPointerCapture(i.pointerId)}catch{}this.#L(e)}});for(const i of["pointerup","pointerleave","pointercancel"])t.addEventListener(i,()=>this.#w())}}customElements.define("vs-number-stepper",y);
