const c=`
  :host { display: inline-flex; }
.vswm {
  --w: 52px;
  --h: 32px;
  --pad: 3px;
  --accent: var(--ui-accent, #ededed);
  --off: var(--sw-off, #4a4a4f);
  --track-off: transparent;
  --dur: 380ms;
  --spring: cubic-bezier(0.34, 1.4, 0.64, 1);

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
.vswm--lbl-left { flex-direction: row-reverse; }
.vswm--sm { --w: 40px; --h: 24px; --pad: 2.5px; font-size: 13px; }
.vswm--lg { --w: 64px; --h: 38px; --pad: 4px; font-size: 15px; }

.vswm__track {
  position: relative;
  flex: none;
  width: var(--w);
  height: var(--h);
  padding: 0;
  border: none;
  border-radius: 999px;
  background: var(--track-off);
  cursor: inherit;
  outline: none;
  /* ring as box-shadow (takes no layout space) → equal thumb gaps on all 4 sides */
  box-shadow: inset 0 0 0 2px var(--off);
  transition: background-color var(--dur) ease, box-shadow var(--dur) ease;
}
.is-on .vswm__track { background: var(--accent); box-shadow: inset 0 0 0 2px var(--accent); }
.vswm__track:focus-visible { outline: 2px solid color-mix(in srgb, var(--accent) 80%, #fff); outline-offset: 3px; }

.vswm__thumb {
  position: absolute;
  top: 50%;
  left: var(--pad);
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--h) - var(--pad) * 2);
  height: calc(var(--h) - var(--pad) * 2);
  border-radius: 999px;
  background: var(--off);
  color: var(--accent);
  transform: translateY(-50%) scale(0.5);
  transition: transform var(--dur) var(--spring), background-color var(--dur) ease;
  will-change: transform;
}
.is-on .vswm__thumb {
  background: #fff;
  transform: translateY(-50%) translateX(calc(var(--w) - var(--h))) scale(1);
}
/* press: grows slightly (Material feedback) */
.vswm__track.is-pressed .vswm__thumb { transform: translateY(-50%) scale(0.72); }
.is-on .vswm__track.is-pressed .vswm__thumb {
  transform: translateY(-50%) translateX(calc(var(--w) - var(--h))) scale(1.1);
}

.vswm__check {
  width: 62%;
  height: 62%;
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 200ms ease, transform var(--dur) var(--spring);
}
.is-on .vswm__check { opacity: 1; transform: scale(1); }

.vswm__label { line-height: 1; }
.is-disabled { cursor: not-allowed; opacity: 0.45; }
.is-disabled .vswm__track { cursor: not-allowed; }

/* ── tones (replace the SFC's free-form --color prop) ── */
.vswm--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; }
.vswm--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; }
.vswm--t-success { --accent: #30a46c; --ui-accent-fg: #fff; }

@media (prefers-reduced-motion: reduce) {
  .vswm__track, .vswm__thumb, .vswm__check { transition-duration: 0ms; }
}
`,o="http://www.w3.org/2000/svg";class l extends HTMLElement{static observedAttributes=["checked","disabled","label","size","tone","label-position","color"];#s;#t;#i;#e;#n=()=>this.#a();#o=t=>this.#m(t);#c=()=>this.#p();#l=()=>this.#v();#h=()=>this.#u();constructor(){super();const t=this.attachShadow({mode:"open"}),a=document.createElement("style");a.textContent=c,this.#s=document.createElement("label"),this.#s.className="vswm",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vswm__track",this.#t.setAttribute("role","switch");const r=document.createElement("span");r.className="vswm__thumb",r.setAttribute("aria-hidden","true");const i=document.createElementNS(o,"svg");i.setAttribute("class","vswm__check"),i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none");const s=document.createElementNS(o,"path");s.setAttribute("d","M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round");const e=document.createElementNS(o,"path");e.setAttribute("d","M7.75 11.9999L10.58 14.8299L16.25 9.16992"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),i.append(s,e),r.append(i),this.#t.append(r),this.#i=document.createElement("span"),this.#i.className="vswm__label",this.#e=document.createElement("slot"),this.#i.append(this.#e),this.#s.append(this.#t,this.#i),t.append(a,this.#s),this.#t.addEventListener("click",this.#n),this.#t.addEventListener("keydown",this.#o),this.#t.addEventListener("pointerdown",this.#c);for(const n of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(n,this.#l);this.#e.addEventListener("slotchange",this.#h)}connectedCallback(){this.#d()}disconnectedCallback(){this.#t.removeEventListener("click",this.#n),this.#t.removeEventListener("keydown",this.#o),this.#t.removeEventListener("pointerdown",this.#c);for(const t of["pointerup","pointerleave","pointercancel"])this.#t.removeEventListener(t,this.#l);this.#e.removeEventListener("slotchange",this.#h)}attributeChangedCallback(){this.#t&&this.#d()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#r(){return this.hasAttribute("checked")}#d(){const t=(e,n)=>this.getAttribute(e)??n,a=this.getAttribute("color"),r=["--sw-accent","--ui-accent","--inp-accent"];if(a)for(const e of r)this.style.setProperty(e,a);else for(const e of r)this.style.removeProperty(e);const i=this.#r(),s=this.hasAttribute("disabled");this.#s.className=`vswm vswm--${t("size","md")} vswm--t-${t("tone","default")} vswm--lbl-${t("label-position","right")}`+(i?" is-on":"")+(s?" is-disabled":""),this.#t.disabled=s,this.#t.setAttribute("aria-checked",String(i)),this.#e.textContent=t("label",""),this.#u()}#u(){const t=!!this.getAttribute("label")||this.#e.assignedNodes({flatten:!0}).length>0;this.#i.style.display=t?"":"none"}#a(){if(this.hasAttribute("disabled"))return;const t=!this.#r();this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#m(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter"?(t.preventDefault(),this.#a()):t.key==="ArrowRight"&&!this.#r()?this.#a():t.key==="ArrowLeft"&&this.#r()&&this.#a())}#p(){this.hasAttribute("disabled")||this.#t.classList.add("is-pressed")}#v(){this.#t.classList.remove("is-pressed")}}customElements.define("vs-switch-material",l);
