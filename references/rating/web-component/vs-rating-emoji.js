const u=["😖","🙁","😐","🙂","😍","🤩","🥳","😻","🔥","💯"];function m(a,e){const t=Math.round(a/Math.max(1,e-1)*(u.length-1));return u[Math.min(u.length-1,Math.max(0,t))]}const b=`
  :host { display: inline-flex; }
.vre {
  --sz: 26px;
  --gap: 6px;
  --fs: var(--ctrl-fs-sm, 13px);
  --accent-c: var(--ui-accent, #ededed);
  --muted: var(--text-muted, #8a8a8a);

  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font: inherit;
  user-select: none;
  outline: none;
}
.vre__row { display: inline-flex; align-items: center; gap: var(--gap); }

.vre--sm { --sz: 20px; --gap: 4px; --fs: var(--ctrl-fs-xs, 12px); }
.vre--lg { --sz: 34px; --gap: 8px; --fs: var(--ctrl-fs-md, 15px); }

.vre__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--sz) + 6px);
  height: calc(var(--sz) + 6px);
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), background 160ms ease;
}
.vre__item:disabled { cursor: default; }
.vre.is-readonly .vre__item { cursor: default; }
.vre__item:hover:not(:disabled) {
  background: color-mix(in srgb, var(--accent-c) 14%, transparent);
}
.vre__item:focus-visible {
  outline: 2px solid var(--accent-c);
  outline-offset: 1px;
}

.vre__face {
  font-size: var(--sz);
  line-height: 1;
  filter: grayscale(0);
  opacity: 1;
  transition: filter 200ms ease, opacity 200ms ease, transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
}
/* dimmed by default when grayscale */
.vre.is-gray .vre__item:not(.is-on) .vre__face {
  filter: grayscale(1);
  opacity: 0.45;
}
.vre__item.is-on .vre__face { transform: scale(1.04); }

.vre__item.is-bounce .vre__face { animation: vre-bounce 560ms cubic-bezier(0.34, 1.56, 0.64, 1); }
@keyframes vre-bounce {
  0% { transform: scale(0.7) rotate(-8deg); }
  40% { transform: scale(1.3) rotate(6deg); }
  70% { transform: scale(0.92) rotate(-2deg); }
  100% { transform: scale(1.04) rotate(0); }
}

.vre__value {
  font-size: var(--fs);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--muted);
  min-width: 1.4em;
}

/* tones tint the hover / focus background */
.vre--t-danger { --accent-c: #ff6369; }
.vre--t-warn { --accent-c: #ffb224; }
.vre--t-success { --accent-c: #4cc38a; }

.vre.is-disabled { opacity: 0.5; }

@media (prefers-reduced-motion: reduce) {
  .vre__item, .vre__face { transition: none; }
  .vre__item.is-bounce .vre__face { animation: none; }
}
`;let h;function f(a){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=a;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(a,e){const t=e?f(String(e).trim()):null;if(!t){for(const s of p)a.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),c=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(s=>Math.round(c?s*.92:s+(255-s)*.16)),r=(s,v)=>a.style.setProperty(s,v);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,l);r("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,c?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,c?"0 0 0":"255 255 255");r("--vs-color",l),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["value","max","count","grayscale","clearable","show-value","readonly","disabled","size","tone","color"];#t;#e;#i;#s=[];#c=0;#r=null;#l=e=>this.#_(e);#h=()=>{this.#r=null,this.#o()};#u=e=>this.#g(e);#d=e=>this.#y(e);#v=e=>{const t=e.target.closest?.(".vre__item");t&&t.classList.remove("is-bounce")};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=b,this.#t=document.createElement("span"),this.#t.className="vre",this.#t.setAttribute("role","slider"),this.#t.setAttribute("aria-valuemin","0"),this.#e=document.createElement("span"),this.#e.className="vre__row",this.#i=document.createElement("span"),this.#i.className="vre__value",this.#i.setAttribute("aria-hidden","true"),this.#i.style.display="none",this.#t.append(this.#e,this.#i),e.append(t,this.#t),this.#t.addEventListener("keydown",this.#l),this.#t.addEventListener("pointerleave",this.#h),this.#e.addEventListener("pointermove",this.#u),this.#e.addEventListener("click",this.#d),this.#e.addEventListener("animationend",this.#v)}connectedCallback(){d(this,this.getAttribute("color")),this.#m()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#l),this.#t.removeEventListener("pointerleave",this.#h),this.#e.removeEventListener("pointermove",this.#u),this.#e.removeEventListener("click",this.#d),this.#e.removeEventListener("animationend",this.#v)}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#m()}get value(){return this.#a(Number(this.getAttribute("value"))||0)}set value(e){this.setAttribute("value",String(e))}get max(){return Math.max(1,Number(this.getAttribute("count")??this.getAttribute("max"))||5)}#n(){return!this.hasAttribute("disabled")&&!this.hasAttribute("readonly")}#a(e){return Math.max(0,Math.min(this.max,e))}#f(){return this.#r!==null?this.#r:this.value}#p(e){this.#e.textContent="",this.#s=[];for(let t=0;t<e;t++){const i=document.createElement("button");i.type="button",i.className="vre__item",i.setAttribute("aria-label",`${t+1} of ${e}`);const n=document.createElement("span");n.className="vre__face",n.setAttribute("aria-hidden","true"),n.textContent=m(t,e),i.appendChild(n),this.#e.appendChild(i),this.#s.push(i)}this.#c=e}#m(){const e=(o,r)=>this.getAttribute(o)??r,t=this.max;t!==this.#c&&this.#p(t);const i=this.hasAttribute("disabled"),n=this.hasAttribute("readonly"),c=e("grayscale","true")!=="false";this.#t.className=`vre vre--${e("size","md")} vre--t-${e("tone","default")}`+(c?" is-gray":"")+(i?" is-disabled":"")+(n?" is-readonly":"");const l=this.#n();this.#t.setAttribute("tabindex",l?"0":"-1"),this.#t.setAttribute("aria-valuenow",String(this.value)),this.#t.setAttribute("aria-valuemax",String(t)),this.#t.setAttribute("aria-label",`Rating: ${this.value} of ${t}`),n?this.#t.setAttribute("aria-readonly","true"):this.#t.removeAttribute("aria-readonly"),i?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");for(const o of this.#s)o.disabled=!l;this.#i.style.display=this.hasAttribute("show-value")?"":"none",this.#o()}#o(){const e=this.#f();this.#i.textContent=String(Math.round(e));for(let t=0;t<this.#s.length;t++)this.#s[t].classList.toggle("is-on",e>=t+1)}#b(e){const t=e.target.closest?.(".vre__item");return t?this.#s.indexOf(t):-1}#g(e){if(!this.#n())return;const t=this.#b(e);if(t<0)return;const i=t+1;this.#r!==i&&(this.#r=i,this.#o(),this.dispatchEvent(new CustomEvent("hover",{bubbles:!0,composed:!0,detail:{value:i}})))}#y(e){if(!this.#n())return;const t=this.#b(e);if(t<0)return;let i=t+1;(this.getAttribute("clearable")===""||this.getAttribute("clearable")==="true")&&i===this.value&&(i=0),this.value=i,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:i}})),i>0&&this.#s[i-1]?.classList.add("is-bounce")}#_(e){if(!this.#n())return;let t=this.value;switch(e.key){case"ArrowRight":case"ArrowUp":t=this.#a(t+1);break;case"ArrowLeft":case"ArrowDown":t=this.#a(t-1);break;case"Home":t=0;break;case"End":t=this.max;break;default:return}e.preventDefault(),this.value=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t}}))}}customElements.define("vs-rating-emoji",g);
