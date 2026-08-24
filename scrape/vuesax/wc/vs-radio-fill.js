const b=`
  :host { display: inline-flex; }
.rfl {
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
.rfl--lbl-left { flex-direction: row-reverse; }
.rfl--sm { --box: 16px; --fs: 13px; }
.rfl--md { --box: 20px; --fs: 14px; }
.rfl--lg { --box: 24px; --fs: 15px; }

.rfl__box {
  position: relative;
  isolation: isolate;
  overflow: hidden;
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
  transition: border-color var(--rfl-ms) var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
}
.rfl__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
.rfl__box:focus-visible { box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3); }
.rfl.is-on .rfl__box { border-color: var(--accent); }

/* accent floods from the center */
.rfl__fill {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: 50%;
  background: var(--accent);
  transform: scale(0);
  transition: transform var(--rfl-ms) cubic-bezier(0.34, 1.56, 0.5, 1);
}
.rfl.is-on .rfl__fill { transform: scale(1); }

/* empty dot punched in the middle */
.rfl__hole {
  position: relative;
  z-index: 1;
  width: 34%;
  height: 34%;
  border-radius: 50%;
  background: var(--bg-input, #0d0d0d);
  transform: scale(0);
  transition: transform var(--rfl-ms) cubic-bezier(0.34, 1.56, 0.5, 1);
}
.rfl.is-on .rfl__hole { transform: scale(1); }

.rfl__label { line-height: 1.2; }

.rfl--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; }
.rfl--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; }
.rfl--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; }

.rfl.is-disabled { opacity: 0.45; cursor: not-allowed; }
.rfl.is-disabled .rfl__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .rfl__box, .rfl__fill, .rfl__hole { transition-duration: 0ms; }
}
`;let a;function u(l){if(a||=document.createElement("canvas").getContext("2d"),!a)return null;a.fillStyle="#000",a.fillStyle=l;const t=a.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(l,t){const e=t?u(String(t).trim()):null;if(!e){for(const r of g)l.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),s=(r,h)=>l.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(r,d);s("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])s(r,o?"0 0 0":"255 255 255");s("--vs-color",d),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["checked","disabled","label","name","value","size","tone","label-position","fill-ms","color"];#e;#t;#i;#r;#n=()=>this.#c();#s=t=>this.#f(t);#o=()=>this.#a();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#e=document.createElement("label"),this.#e.className="rfl",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="rfl__box",this.#t.setAttribute("role","radio");const i=document.createElement("span");i.className="rfl__fill",i.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="rfl__hole",n.setAttribute("aria-hidden","true"),this.#t.append(i,n),this.#i=document.createElement("span"),this.#i.className="rfl__label",this.#r=document.createElement("slot"),this.#i.append(this.#r),this.#e.append(this.#t,this.#i),t.append(e,this.#e),this.#t.addEventListener("click",this.#n),this.#t.addEventListener("keydown",this.#s),this.#r.addEventListener("slotchange",this.#o)}connectedCallback(){f(this,this.getAttribute("color")),this.#l()}disconnectedCallback(){this.#t.removeEventListener("click",this.#n),this.#t.removeEventListener("keydown",this.#s),this.#r.removeEventListener("slotchange",this.#o)}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&this.#l()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}get value(){return this.getAttribute("value")}#l(){const t=(n,o)=>this.getAttribute(n)??o,e=this.hasAttribute("checked"),i=this.hasAttribute("disabled");this.#e.className=`rfl rfl--${t("size","md")} rfl--t-${t("tone","default")} rfl--lbl-${t("label-position","right")}`+(e?" is-on":"")+(i?" is-disabled":""),this.#e.style.setProperty("--rfl-ms",`${t("fill-ms","420")}ms`),this.#t.disabled=i,this.#t.setAttribute("aria-checked",String(e)),this.#r.textContent=t("label",""),this.#a()}#a(){const t=!!this.getAttribute("label")||this.#r.assignedNodes({flatten:!0}).length>0;this.#i.style.display=t?"":"none"}#c(){this.hasAttribute("disabled")||this.hasAttribute("checked")||(this.#d(),this.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:!0,value:this.getAttribute("value")}})))}#d(){const t=this.getAttribute("name");if(!t)return;const e=this.getRootNode(),i=e&&e.querySelectorAll?e:document;for(const n of i.querySelectorAll("vs-radio-fill[name]"))n!==this&&n.getAttribute("name")===t&&n.removeAttribute("checked")}#f(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#c())}}customElements.define("vs-radio-fill",m);
