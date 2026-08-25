const p=`
  :host { display: inline-block; }
.ckc {
  --fs: 14px;
  --pad: 14px;
  --accent: var(--inp-accent, #ededed);
  --ring: var(--inp-ring, 255 255 255);
  --on-fg: var(--bg, #0a0a0a);
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 260px;
  max-width: 100%;
  padding: var(--pad);
  border: 1.5px solid var(--inp-border, #2a2a2a);
  border-radius: 12px;
  background: var(--bg-card, #111);
  color: var(--text, #ededed);
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition:
    border-color 220ms var(--ease-out, ease),
    background-color 220ms var(--ease-out, ease),
    box-shadow 220ms var(--ease-out, ease),
    transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ckc--sm { --fs: 13px; --pad: 11px; }
.ckc--md { --fs: 14px; --pad: 14px; }
.ckc--lg { --fs: 15px; --pad: 17px; }

.ckc:hover { border-color: var(--inp-border-hover, #3d3d3d); }
.ckc:active { transform: scale(0.98); }
.ckc:focus-visible { box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3); }
.ckc.is-on {
  border-color: rgb(var(--ring));
  background: rgb(var(--ring) / 0.08);
  box-shadow: inset 0 0 0 1px rgb(var(--ring) / 0.4);
}

.ckc__body { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1 1 auto; }
.ckc__label { font-size: var(--fs); font-weight: 500; }
.ckc__desc { font-size: calc(var(--fs) - 2px); color: var(--text-muted, #8a8a8a); }

/* corner check badge: empty ring → filled accent with check on select */
.ckc__badge {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 1.5px solid var(--inp-border, #3a3a3a);
  border-radius: 50%;
  background: transparent;
  color: transparent;
  transition: background-color 220ms var(--ease-out, ease), border-color 220ms var(--ease-out, ease), transform 340ms cubic-bezier(0.34, 1.7, 0.5, 1);
}
.ckc.is-on .ckc__badge {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-fg);
  transform: scale(1);
  animation: ckc-pop 400ms cubic-bezier(0.34, 1.7, 0.5, 1);
}
@keyframes ckc-pop { 0% { transform: scale(0.7); } 55% { transform: scale(1.18); } 100% { transform: scale(1); } }
.ckc__badge svg { width: 15px; height: 15px; }
.ckc__check { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset 300ms cubic-bezier(0.65, 0, 0.35, 1) 100ms; }
.ckc.is-on .ckc__check { stroke-dashoffset: 0; }

.ckc--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; --on-fg: #fff; }
.ckc--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; --on-fg: #1a1206; }
.ckc--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; --on-fg: #fff; }

.ckc.is-disabled { opacity: 0.45; cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .ckc, .ckc__badge, .ckc__check { transition-duration: 0ms; }
  .ckc.is-on .ckc__badge { animation: none; }
}
`,h="http://www.w3.org/2000/svg";let l;function g(d){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=d;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(d,t){const e=t?g(String(t).trim()):null;if(!e){for(const c of u)d.style.removeProperty(c);return}const r=c=>(c/=255,c<=.03928?c/12.92:((c+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,s=e.map(c=>Math.round(n?c*.92:c+(255-c)*.16)),i=(c,f)=>d.style.setProperty(c,f);for(const c of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(c,a);i("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const c of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(c,e.join(" "));for(const c of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(c,n?"#0b0b0b":"#ffffff");for(const c of["--btn-primary-rip","--btn-primary-glow"])i(c,n?"0 0 0":"255 255 255");i("--vs-color",a),i("--vs-color-rgb",e.join(" ")),i("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["checked","disabled","label","description","size","tone","color"];#t;#c;#e;#s;#r=()=>this.#d();#i=t=>this.#l(t);#n=()=>this.#a();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="ckc",this.#t.setAttribute("role","checkbox");const r=document.createElement("span");r.className="ckc__body";const o=document.createElement("span");o.className="ckc__label",this.#c=document.createElement("slot"),o.append(this.#c),this.#s=document.createElement("span"),this.#s.className="ckc__desc",this.#e=document.createElement("slot"),this.#e.name="description",this.#s.append(this.#e),r.append(o,this.#s);const n=document.createElement("span");n.className="ckc__badge",n.setAttribute("aria-hidden","true");const a=document.createElementNS(h,"svg");a.setAttribute("viewBox","0 0 24 24");const s=document.createElementNS(h,"path");s.setAttribute("class","ckc__check"),s.setAttribute("d","M5 12.5l4.2 4.2L19 7"),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","2.8"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),a.append(s),n.append(a),this.#t.append(r,n),t.append(e,this.#t),this.#t.addEventListener("click",this.#r),this.#t.addEventListener("keydown",this.#i),this.#c.addEventListener("slotchange",this.#n),this.#e.addEventListener("slotchange",this.#n)}connectedCallback(){b(this,this.getAttribute("color")),this.#o()}disconnectedCallback(){this.#t.removeEventListener("click",this.#r),this.#t.removeEventListener("keydown",this.#i),this.#c.removeEventListener("slotchange",this.#n),this.#e.removeEventListener("slotchange",this.#n)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#o()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#o(){const t=(o,n)=>this.getAttribute(o)??n,e=this.hasAttribute("checked"),r=this.hasAttribute("disabled");this.#t.className=`ckc ckc--${t("size","md")} ckc--t-${t("tone","default")}`+(e?" is-on":"")+(r?" is-disabled":""),this.#t.disabled=r,this.#t.setAttribute("aria-checked",String(e)),this.#c.textContent=t("label","Option"),this.#e.textContent=t("description",""),this.#a()}#a(){const t=!!this.getAttribute("description")||this.#e.assignedNodes({flatten:!0}).length>0;this.#s.style.display=t?"":"none"}#d(){if(this.hasAttribute("disabled"))return;const t=!this.hasAttribute("checked");this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#l(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#d())}}customElements.define("vs-checkbox-card",m);
