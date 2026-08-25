const h="http://www.w3.org/2000/svg",g=`
  :host { display: inline-flex; }
.ckn {
  --box: 20px;
  --fs: 14px;
  --accent: var(--inp-accent, #ededed);
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
.ckn--lbl-left { flex-direction: row-reverse; }
.ckn--sm { --box: 16px; --fs: 13px; }
.ckn--md { --box: 20px; --fs: 14px; }
.ckn--lg { --box: 24px; --fs: 15px; }

.ckn__box {
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
  transition: border-color 240ms var(--ease-out, ease), box-shadow 300ms var(--ease-out, ease);
}
.ckn__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
.ckn__box:focus-visible { box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3); }

/* neon glow layer — out of flow, inset over the box; lit only when ON */
.ckn__glow {
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  box-shadow:
    0 0 0 1px rgb(var(--ring) / 0.6),
    0 0 8px rgb(var(--ring) / 0.55),
    0 0 18px rgb(var(--ring) / 0.4),
    inset 0 0 10px rgb(var(--ring) / 0.25);
  transition: opacity 300ms var(--ease-out, ease);
}

/* neon ON: accent border + reveal the bloom layer */
.ckn.is-on .ckn__box { border-color: rgb(var(--ring)); }
.ckn.is-on .ckn__glow { opacity: 1; animation: ckn-bloom 300ms var(--ease-out, ease); }
@keyframes ckn-bloom {
  0%   { opacity: 0; }
  60%  { opacity: 1; }
  100% { opacity: 1; }
}

.ckn__mark {
  position: relative;
  z-index: 1;
  width: 78%;
  height: 78%;
  color: rgb(var(--ring));
  filter: drop-shadow(0 0 4px rgb(var(--ring) / 0.9));
}
.ckn__check {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  transition: stroke-dashoffset 320ms cubic-bezier(0.65, 0, 0.35, 1);
}
.ckn.is-on .ckn__check { stroke-dashoffset: 0; }

.ckn__label { line-height: 1.2; }

.ckn--t-danger { --ring: 255 99 105; }
.ckn--t-warn { --ring: 255 178 36; }
.ckn--t-success { --ring: 76 195 138; }

.ckn.is-disabled { opacity: 0.45; cursor: not-allowed; }
.ckn.is-disabled .ckn__box { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .ckn__box, .ckn__check, .ckn__glow { transition-duration: 0ms; }
  .ckn.is-on .ckn__glow { animation: none; }
}
`;let a;function p(c){if(a||=document.createElement("canvas").getContext("2d"),!a)return null;a.fillStyle="#000",a.fillStyle=c;const t=a.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(c,t){const e=t?p(String(t).trim()):null;if(!e){for(const n of k)c.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),i=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(n=>Math.round(i?n*.92:n+(255-n)*.16)),o=(n,u)=>c.style.setProperty(n,u);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,d);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,i?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,i?"0 0 0":"255 255 255");o("--vs-color",d),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["checked","disabled","label","size","tone","label-position","color"];#n;#t;#i;#e;#s=()=>this.#l();#r=t=>this.#d(t);#o=()=>this.#a();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#n=document.createElement("label"),this.#n.className="ckn",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="ckn__box",this.#t.setAttribute("role","checkbox");const s=document.createElement("span");s.className="ckn__glow",s.setAttribute("aria-hidden","true");const r=document.createElementNS(h,"svg");r.setAttribute("class","ckn__mark"),r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("aria-hidden","true");const i=document.createElementNS(h,"path");i.setAttribute("class","ckn__check"),i.setAttribute("d","M5 12.5l4.2 4.2L19 7"),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","2.6"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),r.append(i),this.#t.append(s,r),this.#i=document.createElement("span"),this.#i.className="ckn__label",this.#e=document.createElement("slot"),this.#i.append(this.#e),this.#n.append(this.#t,this.#i),t.append(e,this.#n),this.#t.addEventListener("click",this.#s),this.#t.addEventListener("keydown",this.#r),this.#e.addEventListener("slotchange",this.#o)}connectedCallback(){b(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){this.#t.removeEventListener("click",this.#s),this.#t.removeEventListener("keydown",this.#r),this.#e.removeEventListener("slotchange",this.#o)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#c()}get checked(){return this.hasAttribute("checked")}set checked(t){t?this.setAttribute("checked",""):this.removeAttribute("checked")}#c(){const t=(r,i)=>this.getAttribute(r)??i,e=this.hasAttribute("checked"),s=this.hasAttribute("disabled");this.#n.className=`ckn ckn--${t("size","md")} ckn--t-${t("tone","success")} ckn--lbl-${t("label-position","right")}`+(e?" is-on":"")+(s?" is-disabled":""),this.#t.disabled=s,this.#t.setAttribute("aria-checked",String(e)),this.#e.textContent=t("label",""),this.#a()}#a(){const t=!!this.getAttribute("label")||this.#e.assignedNodes({flatten:!0}).length>0;this.#i.style.display=t?"":"none"}#l(){if(this.hasAttribute("disabled"))return;const t=!this.hasAttribute("checked");this.checked=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{checked:t}}))}#d(t){this.hasAttribute("disabled")||(t.key===" "||t.key==="Enter")&&(t.preventDefault(),this.#l())}}customElements.define("vs-checkbox-neon",f);
