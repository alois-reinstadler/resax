const g=[{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"Lifetime",value:"lifetime"}],u=`
.rgseg {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 14px);
  --acc: var(--ui-accent, #ededed);
  position: relative;
  display: inline-flex;
  padding: 4px;
  gap: 2px;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: calc(var(--h) / 2 + 4px);
  background: var(--bg-card, #111);
  isolation: isolate;
}
.rgseg--vertical { flex-direction: column; align-items: stretch; }
.rgseg--horizontal { flex-direction: row; align-items: center; }
.rgseg--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
.rgseg--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
.rgseg--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

.rgseg--danger  { --acc: var(--tone-danger, #ef4444); }
.rgseg--warn    { --acc: var(--tone-warn, #f59e0b); }
.rgseg--success { --acc: var(--tone-success, #22c55e); }

.rgseg__thumb {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  border-radius: calc(var(--h) / 2);
  background: color-mix(in srgb, var(--acc) 22%, transparent);
  border: 1px solid color-mix(in srgb, var(--acc) 55%, transparent);
  box-shadow: 0 4px 14px -6px color-mix(in srgb, var(--acc) 70%, transparent);
  transition:
    transform 340ms cubic-bezier(0.34, 1.4, 0.5, 1),
    width 340ms cubic-bezier(0.34, 1.4, 0.5, 1),
    height 340ms cubic-bezier(0.34, 1.4, 0.5, 1),
    opacity 160ms ease;
  pointer-events: none;
}

.rgseg__opt {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--h);
  padding: 0 var(--px);
  border: 0;
  border-radius: calc(var(--h) / 2);
  background: transparent;
  color: color-mix(in srgb, var(--inp-text, #ededed) 62%, transparent);
  font: inherit;
  font-size: var(--fs);
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: color 220ms ease;
}
.rgseg__opt:hover:not(:disabled) { color: var(--inp-text, #ededed); }
.rgseg__opt--active { color: var(--inp-text, #ededed); }
.rgseg__opt:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--acc) 70%, transparent);
  outline-offset: 2px;
}
.rgseg__opt:disabled { opacity: 0.4; cursor: not-allowed; }
.rgseg--disabled { opacity: 0.6; }

@media (prefers-reduced-motion: reduce) {
  .rgseg__thumb { transition: opacity 120ms ease; }
  .rgseg__opt { transition: none; }
}
`;let h;function b(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,t){const e=t?b(String(t).trim()):null;if(!e){for(const r of f)c.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),a=(r,d)=>c.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(r,s);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])a(r,o?"0 0 0":"255 255 255");a("--vs-color",s),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["value","disabled","size","tone","direction","name","color"];#t;#e;#s=[];#c=null;#a=null;#r=0;#h;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.className="rgseg",this.#t.setAttribute("role","radiogroup"),this.#e=document.createElement("span"),this.#e.className="rgseg__thumb",this.#e.setAttribute("aria-hidden","true"),this.#e.style.opacity="0",this.#t.appendChild(this.#e),this.#h=n=>this.#b(n),t.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#d(),this.#g(),this.#t.addEventListener("keydown",this.#h),this.#a=new ResizeObserver(()=>this.#l()),this.#a.observe(this.#t),this.#l()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#h),this.#a?.disconnect(),this.#a=null,this.#r&&cancelAnimationFrame(this.#r),this.#r=0}attributeChangedCallback(t){p(this,this.getAttribute("color")),this.#t&&(this.#d(),t==="value"&&this.#u())}set options(t){this.#c=Array.isArray(t)&&t.length?t:null,this.#t&&this.#g()}get options(){return this.#c??g}set value(t){this.setAttribute("value",String(t))}get value(){return this.getAttribute("value")??this.#i()[0]?.value}set name(t){this.setAttribute("name",String(t))}get name(){return this.getAttribute("name")??""}#i(){return this.#c??g}#n(){return this.hasAttribute("disabled")&&this.hasAttribute("disabled")}#o(){const t=String(this.value),e=this.#i().findIndex(n=>String(n.value)===t);return e<0?0:e}#d(){const t=(n,i)=>this.getAttribute(n)??i,e=this.#n()?" rgseg--disabled":"";this.#t.className=`rgseg rgseg--${t("direction","horizontal")} rgseg--${t("size","md")} rgseg--${t("tone","default")}${e}`,this.#t.setAttribute("aria-disabled",this.#n()?"true":"false")}#g(){for(;this.#t.lastChild&&this.#t.lastChild!==this.#e;)this.#t.removeChild(this.#t.lastChild);this.#s=[];const t=this.#i(),e=this.#o(),n=this.#n();t.forEach((i,o)=>{const s=document.createElement("button");s.type="button",s.className="rgseg__opt"+(o===e?" rgseg__opt--active":""),s.setAttribute("role","radio"),s.setAttribute("aria-checked",o===e?"true":"false");const l=document.createElement("span");l.className="rgseg__label",l.textContent=i.label,s.appendChild(l);const a=n||!!i.disabled;s.disabled=a,a&&s.setAttribute("aria-disabled","true"),s.tabIndex=o===e?0:-1,s.addEventListener("click",()=>this.#p(o)),this.#t.appendChild(s),this.#s.push(s)}),this.#l()}#u(){const t=this.#o();this.#s.forEach((e,n)=>{const i=n===t;e.classList.toggle("rgseg__opt--active",i),e.setAttribute("aria-checked",i?"true":"false"),e.tabIndex=i?0:-1}),this.#l()}#l(){this.#r||(this.#r=requestAnimationFrame(()=>{this.#r=0;const t=this.#s[this.#o()];t&&(this.#e.style.transform=`translate(${t.offsetLeft}px, ${t.offsetTop}px)`,this.#e.style.width=`${t.offsetWidth}px`,this.#e.style.height=`${t.offsetHeight}px`,this.#e.style.opacity="1")}))}#p(t){if(this.#n())return;const e=this.#i()[t];!e||e.disabled||(this.value=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value}})))}#b(t){if(this.#n()||!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp"].includes(t.key))return;t.preventDefault();const i=this.#i().map((r,d)=>({o:r,i:d})).filter(r=>!r.o.disabled);if(!i.length)return;const o=i.findIndex(r=>r.i===this.#o()),s=t.key==="ArrowRight"||t.key==="ArrowDown",l=o<0?0:(o+(s?1:-1)+i.length)%i.length,a=i[l].i;this.#p(a),this.#s[a]?.focus()}}customElements.define("vs-radio-group-segment",m);
