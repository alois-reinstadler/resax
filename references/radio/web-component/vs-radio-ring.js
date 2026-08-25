const b=`
  :host { display: inline-flex; }
.rrg {
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
.rrg--lbl-left { flex-direction: row-reverse; }
.rrg--sm { --box: 16px; --fs: 13px; }
.rrg--md { --box: 20px; --fs: 14px; }
.rrg--lg { --box: 24px; --fs: 15px; }

.rrg__box {
  position: relative;
  isolation: isolate;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--box);
  height: var(--box);
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--bg-input, #0d0d0d);
  cursor: inherit;
  outline: none;
}
.rrg__box:focus-visible { box-shadow: 0 0 0 3px rgb(var(--ring) / 0.35); }

.rrg__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.rrg__track {
  stroke: var(--inp-border, #2a2a2a);
  transition: stroke 200ms ease;
}
.rrg__box:hover .rrg__track { stroke: var(--inp-border-hover, #5a5a5a); }

/* ring traces clockwise on select */
.rrg__ring {
  stroke: var(--accent);
  stroke-dasharray: 100.53; /* 2*pi*16 */
  stroke-dashoffset: 100.53;
  transition: stroke-dashoffset 480ms cubic-bezier(0.65, 0, 0.35, 1);
}
.rrg.is-on .rrg__ring { stroke-dashoffset: 0; }

.rrg__dot {
  position: relative;
  z-index: 1;
  width: 46%;
  height: 46%;
  border-radius: 50%;
  background: var(--accent);
  transform: scale(0);
  opacity: 0;
  transition: transform 380ms 120ms cubic-bezier(0.34, 1.56, 0.5, 1), opacity 160ms 120ms ease;
}
.rrg.is-on .rrg__dot { transform: scale(1); opacity: 1; }

.rrg__label { line-height: 1.2; }

.rrg--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; }
.rrg--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; }
.rrg--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; }

.rrg.is-disabled { opacity: 0.45; cursor: not-allowed; }
.rrg.is-disabled .rrg__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .rrg__ring, .rrg__dot, .rrg__track { transition-duration: 0ms; }
}
`,g="http://www.w3.org/2000/svg";let l;function f(c){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=c;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(c,t){const e=t?f(String(t).trim()):null;if(!e){for(const r of p)c.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),o=(r,u)=>c.style.setProperty(r,u);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,a);o("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,i?"0 0 0":"255 255 255");o("--vs-color",a),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["checked","disabled","label","name","value","size","tone","label-position","color"];#r;#t;#i;#e;#s=()=>this.#d();#n=t=>this.#h(t);#o=()=>this.#l();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#r=document.createElement("label"),this.#r.className="rrg",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="rrg__box",this.#t.setAttribute("role","radio");const s=document.createElementNS(g,"svg");s.setAttribute("class","rrg__svg"),s.setAttribute("viewBox","0 0 36 36"),s.setAttribute("aria-hidden","true");const n=document.createElementNS(g,"circle");n.setAttribute("class","rrg__track"),n.setAttribute("cx","18"),n.setAttribute("cy","18"),n.setAttribute("r","16"),n.setAttribute("fill","none"),n.setAttribute("stroke-width","3");const i=document.createElementNS(g,"circle");i.setAttribute("class","rrg__ring"),i.setAttribute("cx","18"),i.setAttribute("cy","18"),i.setAttribute("r","16"),i.setAttribute("fill","none"),i.setAttribute("stroke-width","3"),i.setAttribute("stroke-linecap","round"),i.setAttribute("transform","rotate(-90 18 18)"),s.append(n,i);const a=document.createElement("span");a.className="rrg__dot",a.setAttribute("aria-hidden","true"),this.#t.append(s,a),this.#i=document.createElement("span"),this.#i.className="rrg__label",this.#e=document.createElement("slot"),this.#i.append(this.#e),this.#r.append(this.#t,this.#i),t.append(e,this.#r),this.#t.addEventListener("click",this.#s),this.#t.addEventListener("keydown",this.#n),this.#e.addEventListener("slotchange",this.#o)}connectedCallback(){h(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){this.#t.removeEventListener("click",this.#s),this.#t.removeEventListener("keydown",this.#n),this.#e.removeEventListener("slotchange",this.#o)}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#c()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}get value(){return this.getAttribute("value")??void 0}set value(t){t==null?this.removeAttribute("value"):this.setAttribute("value",t)}#a(){return this.hasAttribute("checked")}#c(){const t=(n,i)=>this.getAttribute(n)??i,e=this.#a(),s=this.hasAttribute("disabled");this.#r.className=`rrg rrg--${t("size","md")} rrg--t-${t("tone","default")} rrg--lbl-${t("label-position","right")}`+(e?" is-on":"")+(s?" is-disabled":""),this.#t.disabled=s,this.#t.setAttribute("aria-checked",String(e)),this.#e.textContent=t("label",""),this.#l()}#l(){const t=!!this.getAttribute("label")||this.#e.assignedNodes({flatten:!0}).length>0;this.#i.style.display=t?"":"none"}#d(){this.hasAttribute("disabled")||this.#a()||(this.#g(),this.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:!0,value:this.value}})))}#g(){const t=this.getAttribute("name");if(!t)return;const e=this.getRootNode()||document,s=e.querySelectorAll?e:document;for(const n of s.querySelectorAll("vs-radio-ring[name]"))n!==this&&n.getAttribute("name")===t&&(n.checked=!1)}#h(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#d())}}customElements.define("vs-radio-ring",m);
