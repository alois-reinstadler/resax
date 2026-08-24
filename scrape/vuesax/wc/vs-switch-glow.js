const o=`
  :host { display: inline-flex; }
.vswg {
  --w: 52px;
  --h: 32px;
  --pad: 4px;
  --accent: var(--sw-accent, var(--ui-accent, #ededed));
  --off: var(--sw-off, #2b2b30);
  --dur: 420ms;
  --spring: cubic-bezier(0.34, 1.5, 0.6, 1);
  --d: calc(var(--h) - var(--pad) * 2);
  --travel: calc(var(--w) - var(--h));

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
.vswg--lbl-left { flex-direction: row-reverse; }
.vswg--sm { --w: 40px; --h: 24px; --pad: 3px; font-size: 13px; }
.vswg--lg { --w: 64px; --h: 38px; --pad: 5px; font-size: 15px; }

/* tones — preset accents (default keeps the neon teal) */
.vswg--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; }
.vswg--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; }
.vswg--t-success { --accent: #30a46c; --ui-accent-fg: #fff; }

.vswg__track {
  position: relative;
  isolation: isolate; /* keeps ::after (z:-1) above the bg but below the thumb */
  flex: none;
  width: var(--w);
  height: var(--h);
  padding: 0;
  border: none;
  border-radius: 999px;
  background: var(--off);
  cursor: inherit;
  outline: none;
  /* ring as box-shadow → takes no layout, thumb gaps stay equal */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transition: background var(--dur) ease, box-shadow var(--dur) ease;
}
/* Perf: the track keeps the minimal shadow set static; the full set is baked
   into ::after and only its opacity animates (compositable) — no repaint per frame. */
.is-on .vswg__track {
  background: linear-gradient(90deg,
    color-mix(in srgb, var(--accent) 48%, #000),
    color-mix(in srgb, var(--accent) 26%, #000));
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--accent) 65%, transparent),
    inset 0 0 12px color-mix(in srgb, var(--accent) 28%, transparent),
    0 0 8px color-mix(in srgb, var(--accent) 50%, transparent),
    0 0 18px color-mix(in srgb, var(--accent) 30%, transparent);
}
.vswg__track::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--accent) 75%, transparent),
    inset 0 0 14px color-mix(in srgb, var(--accent) 38%, transparent),
    0 0 12px color-mix(in srgb, var(--accent) 65%, transparent),
    0 0 26px color-mix(in srgb, var(--accent) 45%, transparent);
  opacity: 0;
}
.is-on .vswg__track::after {
  animation: vswg-breathe 2.2s ease-in-out infinite;
}
@keyframes vswg-breathe {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
.vswg__track:focus-visible { outline: 2px solid color-mix(in srgb, var(--accent) 80%, #fff); outline-offset: 3px; }

.vswg__thumb {
  position: absolute;
  top: var(--pad);
  left: var(--pad);
  width: var(--d);
  height: var(--d);
  border-radius: 999px;
  /* off: dimmed orb */
  background: radial-gradient(circle at 50% 38%, #8b8b93, #56565e 78%);
  box-shadow: inset 0 -1px 2px rgba(0, 0, 0, 0.35);
  transition: transform var(--dur) var(--spring), background var(--dur) ease, box-shadow var(--dur) ease;
  will-change: transform;
}
.is-on .vswg__thumb {
  transform: translateX(var(--travel));
  /* on: lit orb with a bright core */
  background: radial-gradient(circle at 50% 36%, #ffffff, var(--accent) 72%);
  box-shadow:
    0 0 5px var(--accent),
    0 0 13px color-mix(in srgb, var(--accent) 65%, transparent),
    inset 0 0 3px rgba(255, 255, 255, 0.6);
}
/* press: slight elastic squish */
.is-pressed .vswg__thumb { transform: scaleX(1.12) scaleY(0.92); }
.is-on.is-pressed .vswg__thumb { transform: translateX(var(--travel)) scaleX(1.12) scaleY(0.92); }

.vswg__label { line-height: 1; }
.vswg__label:empty { display: none; }
.is-disabled { cursor: not-allowed; opacity: 0.45; }
.is-disabled .vswg__track { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .vswg__track, .vswg__thumb { transition-duration: 0ms; }
  .is-on .vswg__track { animation: none; }
  .is-on .vswg__track::after { animation: none; opacity: 0; }
}
`;class c extends HTMLElement{static observedAttributes=["checked","disabled","label","size","tone","label-position","color"];#e;#t;#a;#i;#s;#o=()=>this.#r();#c=t=>this.#v(t);#l=()=>this.#g();#h=()=>this.#u();#d=()=>this.#b();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=o,this.#e=document.createElement("label"),this.#e.className="vswg",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vswg__track",this.#t.setAttribute("role","switch"),this.#a=document.createElement("span"),this.#a.className="vswg__thumb",this.#a.setAttribute("aria-hidden","true"),this.#t.append(this.#a),this.#i=document.createElement("span"),this.#i.className="vswg__label",this.#s=document.createElement("slot"),this.#i.append(this.#s),this.#e.append(this.#t,this.#i),t.append(e,this.#e),this.#t.addEventListener("click",this.#o),this.#t.addEventListener("keydown",this.#c),this.#t.addEventListener("pointerdown",this.#l);for(const i of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(i,this.#h);this.#s.addEventListener("slotchange",this.#d)}connectedCallback(){this.#p()}disconnectedCallback(){this.#t.removeEventListener("click",this.#o),this.#t.removeEventListener("keydown",this.#c),this.#t.removeEventListener("pointerdown",this.#l);for(const t of["pointerup","pointerleave","pointercancel"])this.#t.removeEventListener(t,this.#h);this.#s.removeEventListener("slotchange",this.#d)}attributeChangedCallback(){this.#t&&this.#p()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#n(){return this.hasAttribute("checked")}#p(){const t=(s,r)=>this.getAttribute(s)??r,e=this.getAttribute("color"),i=["--sw-accent","--ui-accent","--inp-accent"];if(e)for(const s of i)this.style.setProperty(s,e);else for(const s of i)this.style.removeProperty(s);const a=this.#n(),n=this.hasAttribute("disabled");this.#e.className=`vswg vswg--${t("size","md")} vswg--t-${t("tone","default")} vswg--lbl-${t("label-position","right")}`+(a?" is-on":"")+(n?" is-disabled":"")+(this.#e.classList.contains("is-pressed")?" is-pressed":""),this.#t.disabled=n,this.#t.setAttribute("aria-checked",String(a)),this.#s.textContent=t("label",""),this.#b()}#b(){const t=!!this.getAttribute("label")||this.#s.assignedNodes({flatten:!0}).length>0;this.#i.style.display=t?"":"none"}#r(){if(this.hasAttribute("disabled"))return;const t=!this.#n();this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#v(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter"?(t.preventDefault(),this.#r()):t.key==="ArrowRight"&&!this.#n()?this.#r():t.key==="ArrowLeft"&&this.#n()&&this.#r())}#g(){this.hasAttribute("disabled")||this.#e.classList.add("is-pressed")}#u(){this.#e.classList.remove("is-pressed")}}customElements.define("vs-switch-glow",c);
