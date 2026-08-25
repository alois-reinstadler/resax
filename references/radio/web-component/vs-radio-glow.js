const b=`
  :host { display: inline-flex; }
.rgw {
  --box: 20px;
  --fs: 14px;
  --accent: var(--inp-accent, var(--ui-accent, #ededed));
  --ring: var(--inp-ring, var(--ui-ring, 255 255 255));
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
.rgw--lbl-left { flex-direction: row-reverse; }
.rgw--sm { --box: 16px; --fs: 13px; }
.rgw--md { --box: 20px; --fs: 14px; }
.rgw--lg { --box: 24px; --fs: 15px; }

.rgw__box {
  position: relative;
  isolation: isolate;
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
  transition: border-color 220ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    box-shadow 300ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
}
.rgw__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
.rgw__box:focus-visible { box-shadow: 0 0 0 3px rgb(var(--ring) / 0.35); }
.rgw.is-on .rgw__box {
  border-color: var(--accent);
  box-shadow: 0 0 8px rgb(var(--ring) / 0.5), 0 0 16px rgb(var(--ring) / 0.3);
}

/* breathing halo around the dot (out of flow → absolute) */
.rgw__halo {
  position: absolute;
  z-index: 0;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(var(--ring) / 0.55) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.5);
}
.rgw.is-on .rgw__halo {
  animation: rgw-breathe 1800ms ease-in-out infinite;
}
@keyframes rgw-breathe {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(2.1); }
}

.rgw__dot {
  position: relative;
  z-index: 1;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px rgb(var(--ring) / 0.9);
  transform: scale(0);
  opacity: 0;
  transition: transform 340ms cubic-bezier(0.34, 1.56, 0.5, 1), opacity 180ms ease;
}
.rgw.is-on .rgw__dot { transform: scale(1); opacity: 1; }

.rgw__label { line-height: 1.2; }

.rgw--t-default { --ring: var(--ui-ring, 255 255 255); }
.rgw--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; }
.rgw--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; }
.rgw--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; }

.rgw.is-disabled { opacity: 0.45; cursor: not-allowed; }
.rgw.is-disabled .rgw__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .rgw__box, .rgw__dot { transition-duration: 0ms; }
  .rgw.is-on .rgw__halo { animation: none; opacity: 0.6; transform: scale(1.4); }
}
`;let c;function u(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(a,t){const e=t?u(String(t).trim()):null;if(!e){for(const r of f)a.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),n=(r,g)=>a.style.setProperty(r,g);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,d);n("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,o?"0 0 0":"255 255 255");n("--vs-color",d),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class p extends HTMLElement{static observedAttributes=["checked","disabled","label","name","value","size","tone","label-position","color"];#r;#t;#i;#e;#n=()=>this.#l();#s=t=>this.#h(t);#o=()=>this.#c();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#r=document.createElement("label"),this.#r.className="rgw",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="rgw__box",this.#t.setAttribute("role","radio");const i=document.createElement("span");i.className="rgw__halo",i.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="rgw__dot",s.setAttribute("aria-hidden","true"),this.#t.append(i,s),this.#i=document.createElement("span"),this.#i.className="rgw__label",this.#e=document.createElement("slot"),this.#i.append(this.#e),this.#r.append(this.#t,this.#i),t.append(e,this.#r),this.#t.addEventListener("click",this.#n),this.#t.addEventListener("keydown",this.#s),this.#e.addEventListener("slotchange",this.#o)}connectedCallback(){h(this,this.getAttribute("color")),this.#a()}disconnectedCallback(){this.#t.removeEventListener("click",this.#n),this.#t.removeEventListener("keydown",this.#s),this.#e.removeEventListener("slotchange",this.#o)}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#a()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}get value(){return this.getAttribute("value")}#a(){const t=(s,o)=>this.getAttribute(s)??o,e=this.hasAttribute("checked"),i=this.hasAttribute("disabled");this.#r.className=`rgw rgw--${t("size","md")} rgw--t-${t("tone","default")} rgw--lbl-${t("label-position","right")}`+(e?" is-on":"")+(i?" is-disabled":""),this.#t.disabled=i,this.#t.setAttribute("aria-checked",String(e)),this.#e.textContent=t("label",""),this.#c()}#c(){const t=!!this.getAttribute("label")||this.#e.assignedNodes({flatten:!0}).length>0;this.#i.style.display=t?"":"none"}#l(){this.hasAttribute("disabled")||this.hasAttribute("checked")||(this.#d(),this.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:!0,value:this.value}})))}#d(){const t=this.getAttribute("name");if(!t)return;const e=this.getRootNode()||document;for(const i of e.querySelectorAll("vs-radio-glow"))i!==this&&i.getAttribute("name")===t&&i.removeAttribute("checked")}#h(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#l())}}customElements.define("vs-radio-glow",p);
