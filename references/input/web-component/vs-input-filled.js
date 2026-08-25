const p=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
.ifl {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --px: var(--ctrl-px-md, 14px);
  --fs: var(--ctrl-fs-md, 14px);
  --accent: var(--inp-accent, #ededed);
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 260px;
  font-family: inherit;
}
.ifl--block { display: flex; width: 100%; min-width: 0; }
.ifl--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); --fs: var(--ctrl-fs-sm, 13px); }
.ifl--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); --fs: var(--ctrl-fs-lg, 15px); }

/* filled surface: rounded only on top so the accent bar sits on a flat bottom */
.ifl__field {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: calc(var(--h) + 8px);
  overflow: hidden;
  border-radius: var(--rr, var(--r)) var(--rr, var(--r)) 0 0;
  background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06));
  transition: background-color 200ms ease;
}
.ifl--r-none .ifl__field { --rr: 0px; }
.ifl--r-subtle .ifl__field { --rr: 8px; }
.ifl--r-rounded .ifl__field { --rr: var(--r); }
.ifl__field:hover { background: color-mix(in srgb, var(--inp-hover-bg, rgba(255,255,255,0.06)) 160%, transparent); }
.ifl.is-focused .ifl__field { background: color-mix(in srgb, var(--inp-hover-bg, rgba(255,255,255,0.06)) 200%, transparent); }

.ifl__control {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  height: calc(100% - 16px);
  padding: 0 var(--px);
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  outline: none;
}
.ifl__control::placeholder { color: var(--inp-placeholder, #5a5a5a); transition: color 200ms ease; }

/* resting bottom line + growing accent bar */
.ifl__field::before {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 1px;
  background: var(--inp-border, #2a2a2a);
  pointer-events: none;
}
.ifl__bar {
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.ifl.is-focused .ifl__bar { transform: scaleX(1); }

/* label floats inside, toward the top of the filled box */
.ifl__label {
  position: absolute;
  left: var(--px);
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
  color: var(--inp-label, #6a6a6a);
  font-size: var(--fs);
  pointer-events: none;
  transition: transform 240ms cubic-bezier(0.34, 1.4, 0.5, 1), color 220ms ease;
}
.ifl.is-focused .ifl__label,
.ifl.has-value .ifl__label {
  transform: translateY(calc(-50% - var(--h) / 2 + 2px)) scale(0.8);
}
.ifl.is-focused .ifl__label { color: var(--accent); }

.ifl__hint { margin: 0; padding: 0 2px; font-size: calc(var(--fs) - 1px); color: var(--inp-hint, #7a7a7a); }

.ifl.is-disabled { opacity: 0.5; }
.ifl.is-disabled .ifl__control { cursor: not-allowed; }
.ifl.is-readonly .ifl__field { background: var(--inp-readonly-bg, rgba(255, 255, 255, 0.02)); }

@media (prefers-reduced-motion: reduce) {
  .ifl__field, .ifl__bar, .ifl__label { transition: none; }
}
`;let h;function v(o){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=o;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,t){const e=t?v(String(t).trim()):null;if(!e){for(const i of m)o.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),l=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(i=>Math.round(l?i*.92:i+(255-i)*.16)),r=(i,f)=>o.style.setProperty(i,f);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(i,c);r("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(i,l?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])r(i,l?"0 0 0":"255 255 255");r("--vs-color",c),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["value","placeholder","type","disabled","readonly","size","radius","label","hint","block","color"];#i;#l;#t;#r;#n;#s;#a=!1;#o=t=>this.#u(t);#c=t=>{t.stopPropagation(),this.#d("change")};#h=t=>this.#b(t);#f=t=>this.#p(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#i=document.createElement("div"),this.#i.className="ifl",this.#l=document.createElement("div"),this.#l.className="ifl__field",this.#t=document.createElement("input"),this.#t.className="ifl__control",this.#r=document.createElement("label"),this.#r.className="ifl__label",this.#n=document.createElement("span"),this.#n.className="ifl__bar",this.#n.setAttribute("aria-hidden","true"),this.#s=document.createElement("p"),this.#s.className="ifl__hint",this.#l.append(this.#t,this.#r,this.#n),this.#i.append(this.#l,this.#s),t.append(e,this.#i),this.#t.addEventListener("input",this.#o),this.#t.addEventListener("change",this.#c),this.#t.addEventListener("focus",this.#h),this.#t.addEventListener("blur",this.#f)}connectedCallback(){d(this,this.getAttribute("color")),this.#e()}disconnectedCallback(){this.#t.removeEventListener("input",this.#o),this.#t.removeEventListener("change",this.#c),this.#t.removeEventListener("focus",this.#h),this.#t.removeEventListener("blur",this.#f)}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#e()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#e()}focus(){this.#t.focus()}blur(){this.#t.blur()}#e(){const t=(u,b)=>this.getAttribute(u)??b,e=this.hasAttribute("disabled"),n=this.hasAttribute("readonly"),s=t("label",""),l=t("hint",""),c=t("type","text"),a=t("value","");this.#t.value!==a&&(this.#t.value=a);const r=this.#t.value.length>0;this.#t.type!==c&&(this.#t.type=c);const i=t("placeholder",""),f=s?this.#a?i:"":i;this.#t.getAttribute("placeholder")!==f&&this.#t.setAttribute("placeholder",f),this.#t.disabled=e,this.#t.readOnly=n,s?this.#t.setAttribute("aria-label",s):this.#t.removeAttribute("aria-label"),this.#i.className=`ifl ifl--${t("size","md")} ifl--r-${t("radius","subtle")}`+(this.#a?" is-focused":"")+(e?" is-disabled":"")+(n?" is-readonly":"")+(r?" has-value":"")+(s?" has-label":"")+(this.hasAttribute("block")?" ifl--block":""),this.#r.textContent=s,this.#r.style.display=s?"":"none",this.#s.textContent=l,this.#s.style.display=l?"":"none"}#u(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#e(),this.#d("input")}#d(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#b(t){this.#a=!0,this.#e(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#p(t){this.#a=!1,this.#e(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}}customElements.define("vs-input-filled",g);
