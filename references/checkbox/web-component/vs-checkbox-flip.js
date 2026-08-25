const p=`
  :host { display: inline-flex; }
.ckfl {
  --box: 20px;
  --fs: 14px;
  --accent: var(--inp-accent, #ededed);
  --on-fg: var(--bg, #0a0a0a);
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
.ckfl--lbl-left { flex-direction: row-reverse; }
.ckfl--sm { --box: 16px; --fs: 13px; }
.ckfl--md { --box: 20px; --fs: 14px; }
.ckfl--lg { --box: 24px; --fs: 15px; }

.ckfl__box {
  flex: none;
  width: var(--box);
  height: var(--box);
  padding: 0;
  border: none;
  background: transparent;
  cursor: inherit;
  outline: none;
  perspective: 300px;
}
.ckfl__box:focus-visible .ckfl__flipper { box-shadow: 0 0 0 3px rgb(var(--inp-ring, 255 255 255) / 0.3); border-radius: 6px; }

.ckfl__flipper {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 460ms cubic-bezier(0.34, 1.4, 0.5, 1);
}
.ckfl.is-on .ckfl__flipper { transform: rotateY(180deg); }

.ckfl__face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.ckfl__face--front {
  border: 1.5px solid var(--inp-border, #3a3a3a);
  background: var(--bg-input, #0d0d0d);
}
.ckfl__box:hover .ckfl__face--front { border-color: var(--inp-border-hover, #5a5a5a); }
.ckfl__face--back {
  transform: rotateY(180deg);
  background: var(--accent);
  color: var(--on-fg);
}
.ckfl__face--back svg { width: 78%; height: 78%; }

.ckfl__label { line-height: 1.2; }

.ckfl--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --on-fg: #fff; }
.ckfl--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --on-fg: #1a1206; }
.ckfl--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --on-fg: #fff; }

.ckfl.is-disabled { opacity: 0.45; cursor: not-allowed; }
.ckfl.is-disabled .ckfl__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .ckfl__flipper { transition-duration: 0ms; }
}
`,d="http://www.w3.org/2000/svg";let f;function u(l){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=l;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(l,t){const e=t?u(String(t).trim()):null;if(!e){for(const i of g)l.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,s=e.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),c=(i,h)=>l.style.setProperty(i,h);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(i,a);c("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])c(i,n?"0 0 0":"255 255 255");c("--vs-color",a),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["checked","disabled","label","size","tone","label-position","color"];#i;#t;#n;#e;#s=()=>this.#l();#r=t=>this.#f(t);#c=()=>this.#a();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#i=document.createElement("label"),this.#i.className="ckfl",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="ckfl__box",this.#t.setAttribute("role","checkbox");const r=document.createElement("span");r.className="ckfl__flipper";const o=document.createElement("span");o.className="ckfl__face ckfl__face--front",o.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="ckfl__face ckfl__face--back",n.setAttribute("aria-hidden","true");const a=document.createElementNS(d,"svg");a.setAttribute("viewBox","0 0 24 24");const s=document.createElementNS(d,"path");s.setAttribute("d","M5 12.5l4.2 4.2L19 7"),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","2.6"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),a.append(s),n.append(a),r.append(o,n),this.#t.append(r),this.#n=document.createElement("span"),this.#n.className="ckfl__label",this.#e=document.createElement("slot"),this.#n.append(this.#e),this.#i.append(this.#t,this.#n),t.append(e,this.#i),this.#t.addEventListener("click",this.#s),this.#t.addEventListener("keydown",this.#r),this.#e.addEventListener("slotchange",this.#c)}connectedCallback(){b(this,this.getAttribute("color")),this.#o()}disconnectedCallback(){this.#t.removeEventListener("click",this.#s),this.#t.removeEventListener("keydown",this.#r),this.#e.removeEventListener("slotchange",this.#c)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#o()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#o(){const t=(o,n)=>this.getAttribute(o)??n,e=this.hasAttribute("checked"),r=this.hasAttribute("disabled");this.#i.className=`ckfl ckfl--${t("size","md")} ckfl--t-${t("tone","default")} ckfl--lbl-${t("label-position","right")}`+(e?" is-on":"")+(r?" is-disabled":""),this.#t.disabled=r,this.#t.setAttribute("aria-checked",String(e)),this.#e.textContent=t("label",""),this.#a()}#a(){const t=!!this.getAttribute("label")||this.#e.assignedNodes({flatten:!0}).length>0;this.#n.style.display=t?"":"none"}#l(){if(this.hasAttribute("disabled"))return;const t=!this.hasAttribute("checked");this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#f(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#l())}}customElements.define("vs-checkbox-flip",k);
