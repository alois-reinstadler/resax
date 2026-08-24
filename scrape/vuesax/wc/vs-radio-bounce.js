const u=`
  :host { display: inline-flex; }
.rbo {
  --box: 20px;
  --fs: 14px;
  --accent: var(--inp-accent, var(--ui-accent, #ededed));
  --ring: var(--inp-ring, 255 255 255);
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
.rbo--lbl-left { flex-direction: row-reverse; }
.rbo--sm { --box: 16px; --fs: 13px; }
.rbo--md { --box: 20px; --fs: 14px; }
.rbo--lg { --box: 24px; --fs: 15px; }

.rbo__box {
  position: relative;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--box);
  height: var(--box);
  padding: 0;
  border: 1.5px solid var(--inp-border, #2a2a2a);
  border-radius: 50%;
  background: var(--bg-input, #0d0d0d);
  cursor: inherit;
  outline: none;
  transition: border-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
}
.rbo__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
.rbo__box:focus-visible { box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3); }
.rbo.is-on .rbo__box { border-color: var(--accent); }

.rbo__dot {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: var(--accent);
  transform: scale(0);
  opacity: 0;
  transform-origin: center bottom;
}
.rbo.is-on .rbo__dot {
  opacity: 1;
  animation: rbo-bounce 760ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
/* ball drops in and bounces with squash-and-stretch, damping out */
@keyframes rbo-bounce {
  0%   { transform: translateY(-90%) scale(0.7, 1.25); }
  22%  { transform: translateY(0)    scale(1.3, 0.72); }
  40%  { transform: translateY(-42%) scale(0.86, 1.16); }
  55%  { transform: translateY(0)    scale(1.18, 0.84); }
  70%  { transform: translateY(-18%) scale(0.94, 1.07); }
  84%  { transform: translateY(0)    scale(1.07, 0.94); }
  100% { transform: translateY(0)    scale(1, 1); }
}

.rbo__label { line-height: 1.2; }

.rbo--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; }
.rbo--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; }
.rbo--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; }

.rbo.is-disabled { opacity: 0.45; cursor: not-allowed; }
.rbo.is-disabled .rbo__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .rbo__box { transition-duration: 0ms; }
  .rbo.is-on .rbo__dot { animation: none; transform: scale(1); }
}
`,f=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let a;function m(o){if(a||=document.createElement("canvas").getContext("2d"),!a)return null;a.fillStyle="#000",a.fillStyle=o;const t=a.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,t){const e=t?m(String(t).trim()):null;if(!e){for(const r of g)o.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,b=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(r=>Math.round(s?r*.92:r+(255-r)*.16)),n=(r,h)=>o.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,b);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,s?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,s?"0 0 0":"255 255 255");n("--vs-color",b),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class p extends HTMLElement{static observedAttributes=["checked","disabled","label","name","value","size","tone","label-position","color"];#i;#t;#e;#n;#r;#s=!1;#a=()=>this.#h();#c=t=>this.#f(t);#l=()=>this.#d();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#i=document.createElement("label"),this.#i.className="rbo",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="rbo__box",this.#t.setAttribute("role","radio"),this.#e=document.createElement("span"),this.#e.className="rbo__dot",this.#e.setAttribute("aria-hidden","true"),this.#t.append(this.#e),this.#n=document.createElement("span"),this.#n.className="rbo__label",this.#r=document.createElement("slot"),this.#n.append(this.#r),this.#i.append(this.#t,this.#n),t.append(e,this.#i),this.#t.addEventListener("click",this.#a),this.#t.addEventListener("keydown",this.#c),this.#r.addEventListener("slotchange",this.#l)}connectedCallback(){d(this,this.getAttribute("color")),this.#s=this.#o(),this.#b()}disconnectedCallback(){this.#t.removeEventListener("click",this.#a),this.#t.removeEventListener("keydown",this.#c),this.#r.removeEventListener("slotchange",this.#l)}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#b()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}get value(){return this.getAttribute("value")??""}#o(){return this.hasAttribute("checked")}#b(){const t=(l,s)=>this.getAttribute(l)??s,e=this.#o(),i=this.hasAttribute("disabled");this.#i.className=`rbo rbo--${t("size","md")} rbo--t-${t("tone","default")} rbo--lbl-${t("label-position","right")}`+(e?" is-on":"")+(i?" is-disabled":""),this.#t.disabled=i,this.#t.setAttribute("aria-checked",String(e)),this.#r.textContent=t("label",""),this.#d(),e!==this.#s&&(this.#s=e,e&&!f()&&this.#u())}#d(){const t=!!this.getAttribute("label")||this.#r.assignedNodes({flatten:!0}).length>0;this.#n.style.display=t?"":"none"}#u(){this.#e.style.animation="none",this.#e.offsetWidth,this.#e.style.animation=""}#h(){if(this.hasAttribute("disabled")||this.#o())return;const t=this.getAttribute("name");if(t){const e=this.getRootNode();for(const i of e.querySelectorAll("vs-radio-bounce[name]"))i!==this&&i.getAttribute("name")===t&&(i.checked=!1)}this.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:!0,value:this.value}}))}#f(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#h())}}customElements.define("vs-radio-bounce",p);
