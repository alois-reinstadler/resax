const p=`
/* borders must not push the control out of its cell (inputs default to
   content-box, so width/height 100% + a border overflowed by 2px) */
*, *::before, *::after { box-sizing: border-box; }

:host { display: inline-flex; }
.otg {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --fs: var(--ctrl-fs-md, 16px);
  --otg-accent: var(--ui-accent, #ededed);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: inherit;
}
.otg__cell {
  position: relative;
  width: var(--h);
  height: var(--h);
  display: inline-flex;
}
.otg__aura {
  position: absolute;
  inset: -2px;
  border-radius: calc(var(--r) + 2px);
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--otg-accent) 80%, transparent),
    0 0 16px 2px color-mix(in srgb, var(--otg-accent) 55%, transparent);
  transition: opacity 240ms ease;
}
/* soft halo on cells that are already filled */
.otg__cell.has-value .otg__aura { opacity: 0.5; }
/* pulsing aura on the focused cell */
/* Perf: min shadow stays static on the aura; the max state is baked into ::after
   and only its opacity animates (compositable) — no per-frame repaint. */
.otg__cell.is-focused .otg__aura {
  opacity: 1;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--otg-accent) 80%, transparent),
    0 0 14px 2px color-mix(in srgb, var(--otg-accent) 45%, transparent);
}
.otg__aura::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 1px var(--otg-accent),
    0 0 26px 5px color-mix(in srgb, var(--otg-accent) 70%, transparent);
  opacity: 0;
}
.otg__cell.is-focused .otg__aura::after {
  animation: otg-pulse 1.6s ease-in-out infinite;
}
.otg__control {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: var(--r);
  border: 1px solid var(--inp-border, #2a2a2a);
  background: var(--inp-bg, #0d0d0d);
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  font-weight: 600;
  text-align: center;
  caret-color: var(--otg-accent);
  outline: none;
  transition: border-color 200ms ease;
}
.otg__cell:hover .otg__control { border-color: var(--inp-border-hover, #3d3d3d); }
.otg__cell.is-focused .otg__control,
.otg__cell.has-value .otg__control { border-color: var(--otg-accent); }
.otg.is-disabled { opacity: 0.5; }
.otg.is-disabled .otg__control { cursor: not-allowed; }
@keyframes otg-pulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .otg__aura { transition: none; }
  .otg__cell.is-focused .otg__aura { animation: none; }
  .otg__cell.is-focused .otg__aura::after { animation: none; opacity: 0; }
}
`;let c;function f(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(l,t){const e=t?f(String(t).trim()):null;if(!e){for(const s of g)l.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),a=(s,d)=>l.style.setProperty(s,d);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,r);a("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,o?"0 0 0":"255 255 255");a("--vs-color",r),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class b extends HTMLElement{static observedAttributes=["length","value","type","disabled","accent","auto-focus","color"];#t;#i=[];#p=[];#s=[];#r=[];#e=0;#h=!1;#f=t=>this.#L(t);#g=t=>this.#k(t);#b=t=>this.#C(t);#m=t=>this.#D(t);#v=t=>this.#S(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#t=document.createElement("div"),this.#t.className="otg",this.#t.setAttribute("role","group"),this.#t.setAttribute("aria-label","One-time code"),this.#t.addEventListener("input",this.#f),this.#t.addEventListener("keydown",this.#g),this.#t.addEventListener("paste",this.#b),this.#t.addEventListener("focusin",this.#m),this.#t.addEventListener("focusout",this.#v),t.append(e,this.#t)}connectedCallback(){u(this,this.getAttribute("color")),this.#y(),this.hasAttribute("auto-focus")&&this.#n(0)}disconnectedCallback(){this.#t.removeEventListener("input",this.#f),this.#t.removeEventListener("keydown",this.#g),this.#t.removeEventListener("paste",this.#b),this.#t.removeEventListener("focusin",this.#m),this.#t.removeEventListener("focusout",this.#v)}attributeChangedCallback(t){u(this,this.getAttribute("color")),!(!this.#t||t==="auto-focus")&&this.#y()}get value(){return this.#r.join("")}set value(t){const e=t==null?"":String(t);this.getAttribute("value")!==e?this.setAttribute("value",e):this.#_(e)}focus(){this.#n(0)}#w(){const t=parseInt(this.getAttribute("length")??"6",10);return Number.isFinite(t)&&t>0?t:6}#u(){return(this.getAttribute("type")??"numeric")!=="alphanumeric"}#d(){return this.#u()?/[^0-9]/g:/[^a-zA-Z0-9]/g}#y(){const t=this.#w();t!==this.#e&&this.#A(t);const e=this.hasAttribute("disabled");this.#t.classList.toggle("is-disabled",e);const i=this.#u();for(const o of this.#i)o.disabled=e,o.setAttribute("inputmode",i?"numeric":"text");const n=this.getAttribute("accent");n?this.#t.style.setProperty("--otg-accent",n):this.#t.style.removeProperty("--otg-accent"),this.#h||this.#_(this.getAttribute("value")??"")}#A(t){this.#e=t,this.#t.textContent="",this.#i=[],this.#p=[],this.#s=[],this.#r=new Array(t).fill("");const e=this.#u();for(let i=0;i<t;i++){const n=document.createElement("label");n.className="otg__cell";const o=document.createElement("span");o.className="otg__aura",o.setAttribute("aria-hidden","true");const r=document.createElement("input");r.className="otg__control",r.type="text",r.maxLength=1,r.autocomplete="one-time-code",r.setAttribute("inputmode",e?"numeric":"text"),r.setAttribute("aria-label",`Digit ${i+1} of ${t}`),n.append(o,r),this.#t.appendChild(n),this.#i.push(r),this.#p.push(o),this.#s.push(n)}}#o(t,e){this.#r[t]=e,this.#i[t]&&this.#i[t].value!==e&&(this.#i[t].value=e),this.#s[t]&&this.#s[t].classList.toggle("has-value",e!=="")}#_(t){const e=(t??"").replace(this.#d(),"").slice(0,this.#e);for(let i=0;i<this.#e;i++)this.#o(i,e[i]??"")}#a(){const t=this.value;this.#h=!0,this.getAttribute("value")!==t&&this.setAttribute("value",t),this.#h=!1}#E(){return this.#r.length===this.#e&&this.#r.every(t=>t!=="")}#l(){const e={bubbles:!0,composed:!0,detail:{value:this.value}};this.dispatchEvent(new CustomEvent("input",e)),this.dispatchEvent(new CustomEvent("change",e)),this.#E()&&this.dispatchEvent(new CustomEvent("complete",e))}#x(t,e){const i=(t??"").replace(this.#d(),"");let n=e;for(const o of i){if(n>=this.#e)break;this.#o(n,o),n++}this.#a(),this.#l(),this.#n(Math.min(n,this.#e-1))}#n(t){const e=this.#i[t];e&&(e.focus(),e.select())}#c(t){return t instanceof HTMLInputElement?this.#i.indexOf(t):-1}#L(t){t.stopPropagation();const e=this.#c(t.target);if(e<0)return;const i=t.target.value.replace(this.#d(),"");if(!i){this.#o(e,""),this.#a(),this.#l();return}if(i.length>1){this.#x(i,e);return}this.#o(e,i[0]),this.#a(),this.#l(),e<this.#e-1&&this.#n(e+1)}#k(t){const e=this.#c(t.target);e<0||(t.key==="Backspace"?(this.#r[e]?(this.#o(e,""),this.#a(),this.#l()):e>0&&(this.#o(e-1,""),this.#a(),this.#l(),this.#n(e-1)),t.preventDefault()):t.key==="ArrowLeft"&&e>0?(this.#n(e-1),t.preventDefault()):t.key==="ArrowRight"&&e<this.#e-1?(this.#n(e+1),t.preventDefault()):t.key==="Delete"&&(this.#o(e,""),this.#a(),this.#l(),t.preventDefault()))}#C(t){const e=this.#c(t.target);e<0||(t.preventDefault(),this.#x(t.clipboardData?.getData("text")??"",e))}#D(t){const e=this.#c(t.target);if(!(e<0)){for(const i of this.#s)i.classList.remove("is-focused");this.#s[e].classList.add("is-focused")}}#S(t){const e=this.#c(t.target);e>=0&&this.#s[e].classList.remove("is-focused")}}customElements.define("vs-otp-glow",b);
