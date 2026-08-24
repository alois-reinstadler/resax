const p=`
  :host { display: inline-flex; }
.vswdn {
  --w: 58px;
  --h: 30px;
  --pad: 3px;
  --dur: 520ms;
  --spring: cubic-bezier(0.34, 1.45, 0.64, 1);
  --track-on: linear-gradient(160deg, var(--vs-color, #d8d8d8) 0%, color-mix(in srgb, var(--vs-color, #9a9a9a) 72%, #000) 100%);
  --thumb-on-bg: #ffffff;
  --thumb-on-glow: 0 0 6px #ffffff, 0 0 14px rgba(255, 255, 255, 0.7), inset -1px -1px 3px rgba(200, 130, 0, 0.35);

  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: inherit;
  font-size: 14px;
  color: #ededed;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.vswdn--lbl-left { flex-direction: row-reverse; }
.vswdn--sm { --w: 46px; --h: 24px; --pad: 2.5px; font-size: 13px; }
.vswdn--lg { --w: 70px; --h: 36px; --pad: 4px; font-size: 15px; }

.vswdn__track {
  position: relative;
  flex: none;
  width: var(--w);
  height: var(--h);
  padding: 0;
  border: none;
  border-radius: 999px;
  cursor: inherit;
  outline: none;
  overflow: hidden;
  background: linear-gradient(160deg, #1a1a1a 0%, #0b0b0b 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  transition: background var(--dur) ease;
}
.is-on .vswdn__track { background: var(--track-on); }
.vswdn__track:focus-visible { outline: 2px solid #ededed; outline-offset: 3px; }

/* stars */
.vswdn__stars, .vswdn__clouds { position: absolute; inset: 0; pointer-events: none; }
.vswdn__stars i {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: 2px;
  height: 2px;
  border-radius: 999px;
  background: #fff;
  opacity: calc(var(--d) * 0.9);
  transition: opacity var(--dur) ease;
}
.is-on .vswdn__stars i { opacity: 0; }

/* clouds */
.vswdn__clouds i {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: calc(10px * var(--s));
  height: calc(4px * var(--s));
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: calc(4px * var(--s)) calc(-1px * var(--s)) 0 calc(-0.5px * var(--s)) rgba(255, 255, 255, 0.9);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity var(--dur) ease, transform var(--dur) ease;
}
.is-on .vswdn__clouds i { opacity: 1; transform: translateX(0); }

/* celestial body */
.vswdn__thumb {
  position: absolute;
  z-index: 2;
  top: var(--pad);
  left: var(--pad);
  width: calc(var(--h) - var(--pad) * 2);
  height: calc(var(--h) - var(--pad) * 2);
  border-radius: 999px;
  background: #e6e7ea;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35), inset -2px -2px 4px rgba(0, 0, 0, 0.12);
  transition: transform var(--dur) var(--spring), background-color var(--dur) ease, box-shadow var(--dur) ease;
  will-change: transform;
}
.is-on .vswdn__thumb {
  transform: translateX(calc(var(--w) - var(--h)));
  background: var(--thumb-on-bg);
  box-shadow: var(--thumb-on-glow);
}

/* craters (moon) → fade out on sun */
.vswdn__craters {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 1;
  transition: opacity var(--dur) ease;
}
.vswdn__craters::before,
.vswdn__craters::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.1);
  box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.14);
}
.vswdn__craters::before { width: 26%; height: 26%; left: 24%; top: 22%; }
.vswdn__craters::after  { width: 18%; height: 18%; left: 54%; top: 54%; }
.is-on .vswdn__craters { opacity: 0; }

/* tones — retint the day-state track/sun via the CSS custom props above */
.vswdn--t-danger { --track-on: linear-gradient(160deg, #ff8a8a 0%, #e5484d 100%); --thumb-on-bg: #fff5f5; --thumb-on-glow: 0 0 6px #e5484d, 0 0 14px rgba(229, 72, 77, 0.7), inset -1px -1px 3px rgba(150, 20, 20, 0.35); }
.vswdn--t-warn { --track-on: linear-gradient(160deg, #ffce6b 0%, #f5a623 100%); --thumb-on-bg: #fffdf5; --thumb-on-glow: 0 0 6px #f5a623, 0 0 14px rgba(245, 166, 35, 0.7), inset -1px -1px 3px rgba(150, 90, 0, 0.35); }
.vswdn--t-success { --track-on: linear-gradient(160deg, #6bdba0 0%, #30a46c 100%); --thumb-on-bg: #f5fffa; --thumb-on-glow: 0 0 6px #30a46c, 0 0 14px rgba(48, 164, 108, 0.7), inset -1px -1px 3px rgba(10, 90, 50, 0.35); }

.vswdn__label { line-height: 1; }
.is-disabled { cursor: not-allowed; opacity: 0.45; }
.is-disabled .vswdn__track { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .vswdn__track, .vswdn__thumb, .vswdn__craters, .vswdn__stars i, .vswdn__clouds i { transition-duration: 0ms; }
}
`,u=[["60%","32%","1"],["74%","60%","0.7"],["86%","40%","1"],["68%","76%","0.6"]],f=[["20%","62%","1"],["36%","40%","0.7"]];let h;function g(d){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=d;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const s=t.match(/[\d.]+/g);return s&&s.length>=3?[+s[0],+s[1],+s[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(d,t){const s=t?g(String(t).trim()):null;if(!s){for(const e of v)d.style.removeProperty(e);return}const r=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),a=.2126*r(s[0])+.7152*r(s[1])+.0722*r(s[2])>.45,l=`rgb(${s[0]} ${s[1]} ${s[2]})`,o=s.map(e=>Math.round(a?e*.92:e+(255-e)*.16)),n=(e,c)=>d.style.setProperty(e,c);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(e,l);n("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(e,s.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(e,a?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])n(e,a?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",s.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["checked","disabled","label","size","tone","label-position","color"];#s;#t;#n;#e;#i=()=>this.#a();#o=t=>this.#h(t);#c=()=>this.#l();constructor(){super();const t=this.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=p,this.#s=document.createElement("label"),this.#s.className="vswdn",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vswdn__track",this.#t.setAttribute("role","switch");const r=document.createElement("span");r.className="vswdn__stars",r.setAttribute("aria-hidden","true");for(const[o,n,e]of u){const c=document.createElement("i");c.style.cssText=`--x:${o};--y:${n};--d:${e}`,r.appendChild(c)}const i=document.createElement("span");i.className="vswdn__clouds",i.setAttribute("aria-hidden","true");for(const[o,n,e]of f){const c=document.createElement("i");c.style.cssText=`--x:${o};--y:${n};--s:${e}`,i.appendChild(c)}const a=document.createElement("span");a.className="vswdn__thumb",a.setAttribute("aria-hidden","true");const l=document.createElement("span");l.className="vswdn__craters",a.appendChild(l),this.#t.append(r,i,a),this.#n=document.createElement("span"),this.#n.className="vswdn__label",this.#e=document.createElement("slot"),this.#n.append(this.#e),this.#s.append(this.#t,this.#n),t.append(s,this.#s),this.#t.addEventListener("click",this.#i),this.#t.addEventListener("keydown",this.#o),this.#e.addEventListener("slotchange",this.#c)}connectedCallback(){b(this,this.getAttribute("color")),this.#d()}disconnectedCallback(){this.#t.removeEventListener("click",this.#i),this.#t.removeEventListener("keydown",this.#o),this.#e.removeEventListener("slotchange",this.#c)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#d()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#r(){return this.hasAttribute("checked")}#d(){const t=(i,a)=>this.getAttribute(i)??a,s=this.#r(),r=this.hasAttribute("disabled");this.#s.className=`vswdn vswdn--${t("size","md")} vswdn--t-${t("tone","default")} vswdn--lbl-${t("label-position","right")}`+(s?" is-on":"")+(r?" is-disabled":""),this.#t.disabled=r,this.#t.setAttribute("aria-checked",String(s)),this.#t.setAttribute("aria-label",s?"Day":"Night"),this.#e.textContent=t("label",""),this.#l()}#l(){const t=!!this.getAttribute("label")||this.#e.assignedNodes({flatten:!0}).length>0;this.#n.style.display=t?"":"none"}#a(){if(this.hasAttribute("disabled"))return;const t=!this.#r();this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#h(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter"?(t.preventDefault(),this.#a()):t.key==="ArrowRight"&&!this.#r()?this.#a():t.key==="ArrowLeft"&&this.#r()&&this.#a())}}customElements.define("vs-switch-day-night",m);
