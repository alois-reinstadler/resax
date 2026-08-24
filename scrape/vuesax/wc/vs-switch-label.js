const r=`
:host { display: inline-flex; }
.vswl {
  --w: 64px;
  --h: 30px;
  --pad: 3px;
  --accent: var(--inp-accent, var(--ui-accent, #ededed));
  --off: var(--sw-off, #39393d);
  --dur: 440ms;
  --spring: cubic-bezier(0.34, 1.45, 0.64, 1);

  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: inherit;
  font-size: 14px;
  color: var(--text, #ededed);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.vswl--lbl-left { flex-direction: row-reverse; }
.vswl--sm { --w: 52px; --h: 24px; --pad: 2.5px; font-size: 13px; }
.vswl--lg { --w: 76px; --h: 36px; --pad: 4px; font-size: 15px; }

.vswl__track {
  position: relative;
  flex: none;
  width: var(--w);
  height: var(--h);
  padding: 0;
  border: none;
  border-radius: 999px;
  background: var(--off);
  cursor: inherit;
  outline: none;
  overflow: hidden;
  transition: background-color var(--dur) ease;
}
.is-on .vswl__track { background: var(--accent); }
.vswl__track:focus-visible { outline: 2px solid color-mix(in srgb, var(--accent) 80%, #fff); outline-offset: 3px; }

/* state labels (inside the track) */
.vswl__txt {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: calc(var(--h) * 0.34);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  transition: opacity 240ms ease;
  pointer-events: none;
}
.vswl__txt--on  { left: calc(var(--h) * 0.34); color: #fff; opacity: 0; }
.vswl__txt--off { right: calc(var(--h) * 0.34); color: rgba(255, 255, 255, 0.55); opacity: 1; }
.is-on .vswl__txt--on  { opacity: 1; }
.is-on .vswl__txt--off { opacity: 0; }

.vswl__thumb {
  position: absolute;
  z-index: 2;
  top: var(--pad);
  left: var(--pad);
  width: calc(var(--h) - var(--pad) * 2);
  height: calc(var(--h) - var(--pad) * 2);
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 3px 8px rgba(0, 0, 0, 0.25);
  transition: transform var(--dur) var(--spring);
  will-change: transform;
}
.is-on .vswl__thumb { transform: translateX(calc(var(--w) - var(--h))); }

.vswl__label { line-height: 1; }
.is-disabled { cursor: not-allowed; opacity: 0.45; }
.is-disabled .vswl__track { cursor: not-allowed; }

/* ── tones ── */
.vswl--t-danger  { --accent: #e5484d; --ui-accent-fg: #fff; }
.vswl--t-warn    { --accent: #f5a623; --ui-accent-fg: #160f02; }
.vswl--t-success { --accent: #30a46c; --ui-accent-fg: #fff; }

@media (prefers-reduced-motion: reduce) {
  .vswl__track, .vswl__thumb, .vswl__txt { transition-duration: 0ms; }
}
`;class l extends HTMLElement{static observedAttributes=["checked","disabled","label","on-text","off-text","size","tone","label-position","color"];#s;#t;#i;#n;#a;#e;#l=()=>this.#r();#c=t=>this.#v(t);#h=()=>this.#u();constructor(){super();const t=this.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=r,this.#s=document.createElement("label"),this.#s.className="vswl",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vswl__track",this.#t.setAttribute("role","switch"),this.#i=document.createElement("span"),this.#i.className="vswl__txt vswl__txt--on",this.#i.setAttribute("aria-hidden","true"),this.#n=document.createElement("span"),this.#n.className="vswl__txt vswl__txt--off",this.#n.setAttribute("aria-hidden","true");const e=document.createElement("span");e.className="vswl__thumb",e.setAttribute("aria-hidden","true"),this.#t.append(this.#i,this.#n,e),this.#a=document.createElement("span"),this.#a.className="vswl__label",this.#e=document.createElement("slot"),this.#a.append(this.#e),this.#s.append(this.#t,this.#a),t.append(s,this.#s),this.#t.addEventListener("click",this.#l),this.#t.addEventListener("keydown",this.#c),this.#e.addEventListener("slotchange",this.#h)}connectedCallback(){this.#d()}disconnectedCallback(){this.#t.removeEventListener("click",this.#l),this.#t.removeEventListener("keydown",this.#c),this.#e.removeEventListener("slotchange",this.#h)}attributeChangedCallback(){this.#t&&this.#d()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#o(){return this.hasAttribute("checked")}#d(){const t=(i,o)=>this.getAttribute(i)??o,s=this.getAttribute("color"),e=["--sw-accent","--ui-accent","--inp-accent"];if(s)for(const i of e)this.style.setProperty(i,s);else for(const i of e)this.style.removeProperty(i);const n=this.#o(),a=this.hasAttribute("disabled");this.#s.className=`vswl vswl--${t("size","md")} vswl--t-${t("tone","default")} vswl--lbl-${t("label-position","right")}`+(n?" is-on":"")+(a?" is-disabled":""),this.#t.disabled=a,this.#t.setAttribute("aria-checked",String(n)),this.#i.textContent=t("on-text","ON"),this.#n.textContent=t("off-text","OFF"),this.#e.textContent=t("label",""),this.#u()}#u(){const t=!!this.getAttribute("label")||this.#e.assignedNodes({flatten:!0}).length>0;this.#a.style.display=t?"":"none"}#r(){if(this.hasAttribute("disabled"))return;const t=!this.#o();this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#v(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter"?(t.preventDefault(),this.#r()):t.key==="ArrowRight"&&!this.#o()?this.#r():t.key==="ArrowLeft"&&this.#o()&&this.#r())}}customElements.define("vs-switch-label",l);
