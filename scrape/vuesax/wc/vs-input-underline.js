const b=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
.iun {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 14px);
  --accent: var(--inp-accent, #ededed);
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 260px;
  font-family: inherit;
}
.iun--block { display: flex; width: 100%; min-width: 0; }
.iun--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); }
.iun--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); }

.iun__field {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: var(--h);
}
.iun__control {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  height: calc(100% - 6px);
  padding: 0 2px;
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  outline: none;
}
.iun__control::placeholder { color: var(--inp-placeholder, #5a5a5a); transition: color 200ms ease; }

/* resting baseline + the accent that draws center-out on focus */
.iun__field::before,
.iun__line {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  pointer-events: none;
}
.iun__field::before { background: var(--inp-border, #2a2a2a); }
.iun__line {
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.iun.is-focused .iun__line { transform: scaleX(1); }
.iun__field:hover::before { background: var(--inp-border-hover, #3d3d3d); }

/* floating label */
.iun__label {
  position: absolute;
  left: 2px;
  bottom: 8px;
  transform-origin: left center;
  color: var(--inp-label, #6a6a6a);
  font-size: var(--fs);
  pointer-events: none;
  transition: transform 240ms cubic-bezier(0.34, 1.4, 0.5, 1), color 220ms ease;
}
.iun.is-focused .iun__label,
.iun.has-value .iun__label {
  transform: translateY(calc(-1 * (var(--h) - 14px))) scale(0.8);
}
.iun.is-focused .iun__label { color: var(--accent); }

.iun__hint {
  margin: 0;
  padding: 0 2px;
  font-size: calc(var(--fs) - 1px);
  color: var(--inp-hint, #7a7a7a);
}

.iun.is-disabled { opacity: 0.5; }
.iun.is-disabled .iun__control { cursor: not-allowed; }
.iun.is-readonly .iun__control { cursor: default; }

/* tones — recolor the focus accent (line + floated label) */
.iun--t-danger { --accent: var(--inp-t-danger, #ff6369); }
.iun--t-warn { --accent: var(--inp-t-warn, #ffb224); }
.iun--t-success { --accent: var(--inp-t-success, #4cc38a); }
.iun--t-danger .iun__hint { color: var(--inp-t-danger-hint, #ff8d91); }
.iun--t-warn .iun__hint { color: var(--inp-t-warn-hint, #ffce6e); }
.iun--t-success .iun__hint { color: var(--inp-t-success-hint, #79d3a6); }

@media (prefers-reduced-motion: reduce) {
  .iun__line, .iun__label { transition: none; }
}
`;let u;function v(o){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=o;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(o,t){const e=t?v(String(t).trim()):null;if(!e){for(const i of m)o.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),n=(i,h)=>o.style.setProperty(i,h);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,c);n("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,a?"0 0 0":"255 255 255");n("--vs-color",c),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["value","placeholder","type","disabled","readonly","size","tone","label","hint","block","color"];#i;#a;#t;#n;#r;#s;#l=!1;#o=t=>this.#f(t);#c=t=>{t.stopPropagation(),this.#d("change")};#u=t=>this.#p(t);#h=t=>this.#b(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#i=document.createElement("div"),this.#i.className="iun",this.#a=document.createElement("div"),this.#a.className="iun__field",this.#t=document.createElement("input"),this.#t.className="iun__control",this.#n=document.createElement("label"),this.#n.className="iun__label",this.#r=document.createElement("span"),this.#r.className="iun__line",this.#r.setAttribute("aria-hidden","true"),this.#s=document.createElement("p"),this.#s.className="iun__hint",this.#a.append(this.#t,this.#n,this.#r),this.#i.append(this.#a,this.#s),t.append(e,this.#i),this.#t.addEventListener("input",this.#o),this.#t.addEventListener("change",this.#c),this.#t.addEventListener("focus",this.#u),this.#t.addEventListener("blur",this.#h)}connectedCallback(){d(this,this.getAttribute("color")),this.#e()}disconnectedCallback(){this.#t.removeEventListener("input",this.#o),this.#t.removeEventListener("change",this.#c),this.#t.removeEventListener("focus",this.#u),this.#t.removeEventListener("blur",this.#h)}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#e()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#e()}focus(){this.#t.focus()}blur(){this.#t.blur()}#e(){const t=(f,p)=>this.getAttribute(f)??p,e=this.hasAttribute("disabled"),r=this.hasAttribute("readonly"),s=t("label",""),a=t("hint",""),c=t("type","text"),l=t("value","");this.#t.value!==l&&(this.#t.value=l);const n=this.#t.value.length>0;this.#t.type!==c&&(this.#t.type=c);const i=t("placeholder",""),h=s?this.#l?i:"":i;this.#t.getAttribute("placeholder")!==h&&this.#t.setAttribute("placeholder",h),this.#t.disabled=e,this.#t.readOnly=r,s?this.#t.setAttribute("aria-label",s):this.#t.removeAttribute("aria-label"),this.#i.className=`iun iun--${t("size","md")} iun--t-${t("tone","default")}`+(this.#l?" is-focused":"")+(e?" is-disabled":"")+(r?" is-readonly":"")+(n?" has-value":"")+(s?" has-label":"")+(this.hasAttribute("block")?" iun--block":""),this.#n.textContent=s,this.#n.style.display=s?"":"none",this.#s.textContent=a,this.#s.style.display=a?"":"none"}#f(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#e(),this.#d("input")}#d(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#p(t){this.#l=!0,this.#e(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#b(t){this.#l=!1,this.#e(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}}customElements.define("vs-input-underline",g);
