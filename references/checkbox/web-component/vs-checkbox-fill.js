const u=`
  :host { display: inline-flex; }
.ckf {
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
.ckf--lbl-left { flex-direction: row-reverse; }
.ckf--sm { --box: 16px; --fs: 13px; }
.ckf--md { --box: 20px; --fs: 14px; }
.ckf--lg { --box: 24px; --fs: 15px; }

.ckf__box {
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
  border-radius: 6px;
  background: var(--bg-input, #0d0d0d);
  cursor: inherit;
  outline: none;
  overflow: hidden;
  transition: border-color 200ms var(--ease-out, ease);
}
.ckf__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
.ckf__box:focus-visible { border-color: var(--accent); box-shadow: 0 0 0 3px rgb(var(--inp-ring, 255 255 255) / 0.3); }
.ckf.is-on .ckf__box { border-color: var(--accent); }

/* accent fill grows from the center */
.ckf__fill {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: var(--accent);
  border-radius: 50%;
  transform: scale(0);
  transform-origin: center;
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 300ms ease;
}
.ckf.is-on .ckf__fill { transform: scale(1.6); border-radius: 4px; }

.ckf__mark {
  position: relative;
  z-index: 1;
  width: 78%;
  height: 78%;
  color: var(--on-fg);
}
.ckf__check {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  transition: stroke-dashoffset 300ms cubic-bezier(0.65, 0, 0.35, 1) 120ms;
}
.ckf.is-on .ckf__check { stroke-dashoffset: 0; }

.ckf__label { line-height: 1.2; }

.ckf--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --on-fg: #fff; }
.ckf--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --on-fg: #1a1206; }
.ckf--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --on-fg: #fff; }

.ckf.is-disabled { opacity: 0.45; cursor: not-allowed; }
.ckf.is-disabled .ckf__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .ckf__fill, .ckf__check { transition-duration: 0ms; }
}
`,d="http://www.w3.org/2000/svg";let a;function g(c){if(a||=document.createElement("canvas").getContext("2d"),!a)return null;a.fillStyle="#000",a.fillStyle=c;const t=a.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(c,t){const e=t?g(String(t).trim()):null;if(!e){for(const i of p)c.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,f=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),o=(i,b)=>c.style.setProperty(i,b);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,f);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,s?"0 0 0":"255 255 255");o("--vs-color",f),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["checked","disabled","label","size","tone","label-position","color"];#i;#t;#s;#e;#r=()=>this.#f();#n=t=>this.#d(t);#o=()=>this.#l();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#i=document.createElement("label"),this.#i.className="ckf",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="ckf__box",this.#t.setAttribute("role","checkbox");const r=document.createElement("span");r.className="ckf__fill",r.setAttribute("aria-hidden","true");const n=document.createElementNS(d,"svg");n.setAttribute("class","ckf__mark"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("aria-hidden","true");const s=document.createElementNS(d,"path");s.setAttribute("class","ckf__check"),s.setAttribute("d","M5 12.5l4.2 4.2L19 7"),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","2.6"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),n.append(s),this.#t.append(r,n),this.#s=document.createElement("span"),this.#s.className="ckf__label",this.#e=document.createElement("slot"),this.#s.append(this.#e),this.#i.append(this.#t,this.#s),t.append(e,this.#i),this.#t.addEventListener("click",this.#r),this.#t.addEventListener("keydown",this.#n),this.#e.addEventListener("slotchange",this.#o)}connectedCallback(){h(this,this.getAttribute("color")),this.#a()}disconnectedCallback(){this.#t.removeEventListener("click",this.#r),this.#t.removeEventListener("keydown",this.#n),this.#e.removeEventListener("slotchange",this.#o)}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#a()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#c(){return this.hasAttribute("checked")}#a(){const t=(n,s)=>this.getAttribute(n)??s,e=this.#c(),r=this.hasAttribute("disabled");this.#i.className=`ckf ckf--${t("size","md")} ckf--t-${t("tone","default")} ckf--lbl-${t("label-position","right")}`+(e?" is-on":"")+(r?" is-disabled":""),this.#t.disabled=r,this.#t.setAttribute("aria-checked",String(e)),this.#e.textContent=t("label",""),this.#l()}#l(){const t=!!this.getAttribute("label")||this.#e.assignedNodes({flatten:!0}).length>0;this.#s.style.display=t?"":"none"}#f(){if(this.hasAttribute("disabled"))return;const t=!this.#c();this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#d(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#f())}}customElements.define("vs-checkbox-fill",k);
