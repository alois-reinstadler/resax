const u=`
:host { display: inline-flex; }
.vswq {
  --w: 52px;
  --h: 32px;
  --pad: 4px;
  --accent: var(--ui-accent, #ededed);
  --off: var(--sw-off, #39393d);
  --dur: 300ms;
  --spring: cubic-bezier(0.34, 1.4, 0.6, 1);
  --travel: calc(var(--w) - var(--h));
  /* how far the blob leans ahead on press (intent) */
  --intent: calc(var(--h) * 0.12);

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
.vswq--lbl-left { flex-direction: row-reverse; }
.vswq--sm { --w: 40px; --h: 24px; --pad: 3px; font-size: 13px; }
.vswq--lg { --w: 64px; --h: 38px; --pad: 5px; font-size: 15px; }

.vswq__track {
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
.is-on .vswq__track { background: color-mix(in srgb, var(--accent) 32%, #000); }
.vswq__track:focus-visible { outline: 2px solid color-mix(in srgb, var(--accent) 80%, #fff); outline-offset: 3px; }

.vswq__goo {
  position: absolute;
  inset: 0;
  filter: url(#vswq-goo);
  pointer-events: none;
}
.vswq__blob {
  position: absolute;
  top: var(--pad);
  border-radius: 999px;
  background: #fff;
  transform-origin: center;
  will-change: transform;
}
/* base blob size */
.vswq__blob { --d: calc(var(--h) - var(--pad) * 2); }

.vswq__blob--main {
  left: var(--pad);
  width: var(--d);
  height: var(--d);
  transition: transform var(--dur) var(--spring);
  z-index: 3;
}
/* two trails of decreasing size and staggered lag → a tapering tail;
   the goo melts all 3 into one mass that "necks" and reforms (liquid).
   At rest they overlap and are centered = a single body. */
.vswq__blob--t1 {
  left: calc(var(--pad) + var(--d) * 0.05);
  top: calc(var(--pad) + var(--d) * 0.05);
  width: calc(var(--d) * 0.9);
  height: calc(var(--d) * 0.9);
  transition: transform calc(var(--dur) * 1.32) cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
}
.vswq__blob--t2 {
  left: calc(var(--pad) + var(--d) * 0.12);
  top: calc(var(--pad) + var(--d) * 0.12);
  width: calc(var(--d) * 0.76);
  height: calc(var(--d) * 0.76);
  transition: transform calc(var(--dur) * 1.62) cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}
.is-on .vswq__blob--main { transform: translateX(var(--travel)); }
.is-on .vswq__blob--t1   { transform: translateX(var(--travel)); }
.is-on .vswq__blob--t2   { transform: translateX(var(--travel)); }
.is-on .vswq__blob { background: var(--accent); }

/* ── press: the blob leans toward the target with intent + squish ──
   the trail stays put on press → instant separation → goo stretches now */
.is-pressed .vswq__blob--main {
  transform: translateX(var(--intent)) scaleX(1.1) scaleY(0.93);
}
.is-on.is-pressed .vswq__blob--main {
  transform: translateX(calc(var(--travel) - var(--intent))) scaleX(1.1) scaleY(0.93);
}

.vswq__label { line-height: 1; }
.is-disabled { cursor: not-allowed; opacity: 0.45; }
.is-disabled .vswq__track { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .vswq__blob { transition-duration: 0ms; }
  .vswq__goo { filter: none; }
}
`,i="http://www.w3.org/2000/svg";class p extends HTMLElement{static observedAttributes=["checked","disabled","label","size","tone","label-position","color"];#e;#t;#i;#s;#n=()=>this.#a();#o=t=>this.#v(t);#l=()=>this.#u();#c=()=>this.#p();#d=()=>this.#b();constructor(){super();const t=this.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=u,this.#e=document.createElement("label"),this.#e.className="vswq",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="vswq__track",this.#t.setAttribute("role","switch");const e=document.createElement("span");e.className="vswq__goo",e.setAttribute("aria-hidden","true");const a=document.createElement("span");a.className="vswq__blob vswq__blob--t2";const o=document.createElement("span");o.className="vswq__blob vswq__blob--t1";const l=document.createElement("span");l.className="vswq__blob vswq__blob--main",e.append(a,o,l),this.#t.append(e),this.#i=document.createElement("span"),this.#i.className="vswq__label",this.#s=document.createElement("slot"),this.#i.append(this.#s);const s=document.createElementNS(i,"svg");s.setAttribute("class","vswq__defs"),s.setAttribute("width","0"),s.setAttribute("height","0"),s.setAttribute("aria-hidden","true");const b=document.createElementNS(i,"defs"),h=document.createElementNS(i,"filter");h.setAttribute("id","vswq-goo");const c=document.createElementNS(i,"feGaussianBlur");c.setAttribute("in","SourceGraphic"),c.setAttribute("stdDeviation","3.7"),c.setAttribute("result","b");const n=document.createElementNS(i,"feColorMatrix");n.setAttribute("in","b"),n.setAttribute("mode","matrix"),n.setAttribute("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 23 -10"),n.setAttribute("result","g");const d=document.createElementNS(i,"feComposite");d.setAttribute("in","SourceGraphic"),d.setAttribute("in2","g"),d.setAttribute("operator","atop"),h.append(c,n,d),b.append(h),s.append(b),this.#e.append(this.#t,this.#i,s),t.append(r,this.#e),this.#t.addEventListener("click",this.#n),this.#t.addEventListener("keydown",this.#o),this.#t.addEventListener("pointerdown",this.#l);for(const v of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(v,this.#c);this.#s.addEventListener("slotchange",this.#d)}connectedCallback(){this.#h()}disconnectedCallback(){this.#t.removeEventListener("click",this.#n),this.#t.removeEventListener("keydown",this.#o),this.#t.removeEventListener("pointerdown",this.#l);for(const t of["pointerup","pointerleave","pointercancel"])this.#t.removeEventListener(t,this.#c);this.#s.removeEventListener("slotchange",this.#d)}attributeChangedCallback(){this.#t&&this.#h()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#r(){return this.hasAttribute("checked")}#h(){const t=(o,l)=>this.getAttribute(o)??l,r=this.#r(),e=this.hasAttribute("disabled");this.#e.className=`vswq vswq--${t("size","md")} vswq--lbl-${t("label-position","right")}`+(r?" is-on":"")+(e?" is-disabled":"")+(this.#e.classList.contains("is-pressed")?" is-pressed":""),this.#t.disabled=e,this.#t.setAttribute("aria-checked",String(r));const a=this.getAttribute("color");a?this.#e.style.setProperty("--accent",a):this.#e.style.removeProperty("--accent"),this.#s.textContent=t("label",""),this.#b()}#b(){const t=!!this.getAttribute("label")||this.#s.assignedNodes({flatten:!0}).length>0;this.#i.style.display=t?"":"none"}#a(){if(this.hasAttribute("disabled"))return;const t=!this.#r();this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#v(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter"?(t.preventDefault(),this.#a()):t.key==="ArrowRight"&&!this.#r()?this.#a():t.key==="ArrowLeft"&&this.#r()&&this.#a())}#u(){this.hasAttribute("disabled")||this.#e.classList.add("is-pressed")}#p(){this.#e.classList.remove("is-pressed")}}customElements.define("vs-switch-liquid",p);
