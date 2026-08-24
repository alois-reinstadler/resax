const g=`
.glo {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --fs: var(--ctrl-fs-md, 14px);
  --accent: var(--ui-accent, #ededed);
  --intensity: 1;
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: var(--h);
  padding: 4px;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: calc(var(--r) * 1.25);
  background: var(--bg-elevated, #111);
  transition: border-color 260ms ease, box-shadow 320ms ease;
}
.glo--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); }
.glo--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: calc(var(--ctrl-fs-lg, 15px) + 1px); }

/* diffuse aura behind the pill — absolutely positioned, out of flow */
.glo__aura {
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(
    120% 120% at 50% 50%,
    color-mix(in srgb, var(--ui-accent, #ededed) 55%, transparent),
    transparent 70%
  );
  transition: opacity 480ms ease;
}
.glo.is-pulsing {
  border-color: color-mix(in srgb, var(--ui-accent, #ededed) 80%, var(--inp-border, #2a2a2a));
  box-shadow: 0 0 calc(14px * var(--intensity)) color-mix(in srgb, var(--ui-accent, #ededed) calc(45% * var(--intensity)), transparent);
}
.glo.is-pulsing .glo__aura { opacity: calc(0.8 * var(--intensity)); }

.glo__btn {
  --bs: calc(var(--h) - 8px);
  position: relative;
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
.glo__btn:hover:not(:disabled) {
  border-color: var(--inp-border-hover, #3d3d3d);
  background: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
}
.glo__btn:focus-visible { outline: none; border-color: var(--ui-accent, #ededed); }
.glo__btn:disabled { opacity: 0.35; cursor: not-allowed; }
.glo__icon {
  width: 56%;
  height: 56%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.glo__value {
  min-width: 3ch;
  text-align: center;
  padding: 0 0.4ch;
  color: var(--inp-text, #ededed);
  font-size: var(--fs);
  font-weight: 600;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
  user-select: none;
  transition: text-shadow 320ms ease, color 320ms ease;
}
.glo.is-pulsing .glo__value {
  color: color-mix(in srgb, var(--ui-accent, #ededed) 40%, var(--inp-text, #ededed));
  text-shadow: 0 0 calc(10px * var(--intensity)) color-mix(in srgb, var(--ui-accent, #ededed) 70%, transparent);
}

.glo--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
.glo--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
.glo--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

.glo.is-disabled { opacity: 0.55; }

@media (prefers-reduced-motion: reduce) {
  .glo,
  .glo__btn,
  .glo__aura,
  .glo__value { transition: none; }
  .glo.is-pulsing { box-shadow: none; }
  .glo.is-pulsing .glo__aura { opacity: 0; }
  .glo.is-pulsing .glo__value { text-shadow: none; }
}
`,u="http://www.w3.org/2000/svg";function d(c){const t=document.createElementNS(u,"svg");t.setAttribute("class","glo__icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of c){const i=document.createElementNS(u,"path");i.setAttribute("d",e),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),t.appendChild(i)}return t}let h;function m(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(c,t){const e=t?m(String(t).trim()):null;if(!e){for(const s of f)c.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),r=(s,p)=>c.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,o);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,a?"0 0 0":"255 255 255");r("--vs-color",o),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["value","duration","decimals","prefix","suffix","separator","start-on-view","min","max","step","size","tone","intensity","disabled","color"];#x;#t;#b;#s;#r;#n;#a=0;#i=0;#c=0;#h=0;#m=0;#l=null;#p=!1;constructor(){super(),this.#x=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=g,this.#t=document.createElement("div"),this.#t.setAttribute("role","spinbutton"),this.#b=document.createElement("span"),this.#b.className="glo__aura",this.#b.setAttribute("aria-hidden","true"),this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="glo__btn",this.#s.setAttribute("aria-label","Decrease"),this.#s.appendChild(d(["M6 12H18"])),this.#n=document.createElement("span"),this.#n.className="glo__value",this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="glo__btn",this.#r.setAttribute("aria-label","Increase"),this.#r.appendChild(d(["M6 12H18","M12 18V6"])),this.#t.append(this.#b,this.#s,this.#n,this.#r),this.#x.append(t,this.#t),this.#s.addEventListener("pointerdown",e=>{e.preventDefault(),this.#N(-1)}),this.#r.addEventListener("pointerdown",e=>{e.preventDefault(),this.#N(1)});for(const e of["pointerup","pointerleave","pointercancel"])this.#s.addEventListener(e,()=>this.#g()),this.#r.addEventListener(e,()=>this.#g())}connectedCallback(){b(this,this.getAttribute("color")),this.#f();const t=this.#e(this.value);this.hasAttribute("start-on-view")?(this.#a=this.#e(this.#o),this.#n.textContent=this.#d(this.#a),this.#l=new IntersectionObserver(e=>{for(const i of e)i.isIntersecting&&!this.#p&&(this.#p=!0,this.#v(t),this.#l?.disconnect(),this.#l=null)}),this.#l.observe(this.#t)):(this.#p=!0,this.#a=this.#e(this.#o),this.#v(t))}disconnectedCallback(){this.#i&&cancelAnimationFrame(this.#i),this.#i=0,this.#g(),this.#c&&clearTimeout(this.#c),this.#l?.disconnect(),this.#l=null}attributeChangedCallback(t,e,i){b(this,this.getAttribute("color")),!(!this.#t||e===i)&&(t==="value"?(this.#p&&(this.#E(),this.#v(this.#e(this.value))),this.#f()):(this.#f(),this.#i||(this.#n.textContent=this.#d(this.#a))))}get value(){const t=Number(this.getAttribute("value"));return Number.isFinite(t)?t:0}set value(t){this.setAttribute("value",String(t))}get#o(){const t=Number(this.getAttribute("min"));return Number.isFinite(t)?t:0}get#u(){const t=Number(this.getAttribute("max"));return Number.isFinite(t)?t:100}get#y(){const t=Number(this.getAttribute("step"));return Number.isFinite(t)&&t>0?t:1}get#w(){if(this.hasAttribute("decimals")){const e=parseInt(this.getAttribute("decimals"),10);if(Number.isFinite(e)&&e>=0)return e}const t=String(this.#y);return t.includes(".")?t.split(".")[1].length:0}#e(t){return Math.min(this.#u,Math.max(this.#o,t))}#C(t){const e=Math.pow(10,this.#w);return Math.round(t*e)/e}#d(t){let e=Number(t).toFixed(this.#w);const i=this.getAttribute("separator");if(i){const n=e.startsWith("-");n&&(e=e.slice(1));const[a,o]=e.split("."),l=a.replace(/\B(?=(\d{3})+(?!\d))/g,i);e=(n?"-":"")+(o!=null?l+"."+o:l)}return(this.getAttribute("prefix")??"")+e+(this.getAttribute("suffix")??"")}#f(){const t=(n,a)=>this.getAttribute(n)??a;this.#t.className=`glo glo--${t("size","md")} glo--t-${t("tone","default")}`+(this.hasAttribute("disabled")?" is-disabled":"");const e=this.#e(this.value);this.#t.setAttribute("aria-valuenow",String(e)),this.#t.setAttribute("aria-valuemin",String(this.#o)),this.#t.setAttribute("aria-valuemax",String(this.#u)),this.#t.style.setProperty("--intensity",t("intensity","1")),this.hasAttribute("disabled")?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");const i=this.hasAttribute("disabled");this.#s.disabled=i||e<=this.#o,this.#r.disabled=i||e>=this.#u}#v(t){this.#i&&cancelAnimationFrame(this.#i),this.#i=0;const e=this.#a,i=Math.max(0,Number(this.getAttribute("duration")??800)),n=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(i===0||n||e===t){this.#a=t,this.#n.textContent=this.#d(t),this.#A(t);return}const a=performance.now(),o=l=>{if(!this.isConnected||!this.#n)return;const r=Math.min(1,(l-a)/i),s=1-Math.pow(1-r,3);this.#a=e+(t-e)*s,this.#n.textContent=this.#d(this.#a),r<1?this.#i=requestAnimationFrame(o):(this.#i=0,this.#a=t,this.#n.textContent=this.#d(t),this.#A(t))};this.#i=requestAnimationFrame(o)}#A(t){this.dispatchEvent(new CustomEvent("complete",{detail:{value:t},bubbles:!0}))}#E(){typeof window>"u"||(this.#t.classList.remove("is-pulsing"),requestAnimationFrame(()=>{this.#t.classList.add("is-pulsing"),this.#c&&clearTimeout(this.#c),this.#c=window.setTimeout(()=>this.#t.classList.remove("is-pulsing"),520)}))}#k(t){const e=this.#e(this.#C(t));e!==this.#e(this.value)&&(this.value=e,this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0})))}#_(t){this.hasAttribute("disabled")||this.#k(this.#e(this.value)+t*this.#y)}#N(t){if(this.hasAttribute("disabled")||t===1&&this.#e(this.value)>=this.#u||t===-1&&this.#e(this.value)<=this.#o)return;this.#m=t,this.#_(t);let e=340;const i=()=>{if(this.#m!==t)return;const n=this.#e(this.value);if(t===1&&n>=this.#u||t===-1&&n<=this.#o)return this.#g();this.#_(t),e=Math.max(40,e*.8),this.#h=window.setTimeout(i,e)};this.#h=window.setTimeout(i,e)}#g(){this.#m=0,this.#h&&(clearTimeout(this.#h),this.#h=0)}}customElements.define("vs-number-glow",v);
