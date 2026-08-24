const b=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
.isp {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --px: var(--ctrl-px-md, 14px);
  --fs: var(--ctrl-fs-md, 14px);
  --accent: var(--inp-accent, #ededed);
  --ring: var(--inp-ring, 255 255 255);
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 260px;
  font-family: inherit;
}
.isp--block { display: flex; width: 100%; min-width: 0; }
.isp--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); --fs: var(--ctrl-fs-sm, 13px); }
.isp--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); --fs: var(--ctrl-fs-lg, 15px); }

.isp__field {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--h);
  border-radius: var(--rr, var(--r));
  background: var(--btn-secondary-bg, #1a1a1a);
}
.isp--r-none .isp__field { --rr: 0px; }
.isp--r-subtle .isp__field { --rr: 8px; }
.isp--r-pill .isp__field { --rr: 999px; }

/* spotlight: radial glow centered on the cursor (--mx/--my), fades in on hover.
   Clipped to the field's rounded box via border-radius (no field overflow:hidden
   so the floated label above the top edge is NOT clipped). position:absolute →
   out of flow. */
.isp__spot {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    150px circle at var(--mx, 50%) var(--my, 50%),
    rgb(var(--ring) / 0.16),
    transparent 60%
  );
  transition: opacity 220ms ease;
}
.isp.is-hovering .isp__spot,
.isp.is-focused .isp__spot { opacity: 1; }

/* border on a fieldset → the legend opens a real gap in the top line */
.isp__outline {
  position: absolute;
  inset: 0;
  z-index: 1;
  margin: 0;
  padding: 0 calc(var(--px) - 5px);
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: inherit;
  pointer-events: none;
  min-inline-size: 0;
  transition: border-color 200ms ease;
}
.isp__legend {
  display: block;
  width: auto;
  max-width: 0.01px;
  height: 0;
  padding: 0;
  font-size: calc(var(--fs) * 0.82);
  line-height: 0;
  white-space: nowrap;
  visibility: hidden;
  transition: max-width 220ms cubic-bezier(0.34, 1.4, 0.5, 1);
}
.isp__legend span { display: inline-block; padding: 0 4px; }
.isp.has-label.is-focused .isp__legend,
.isp.has-label.has-value .isp__legend { max-width: 100%; }
.isp__field:hover .isp__outline { border-color: var(--inp-border-hover, #3d3d3d); }
.isp.is-focused .isp__outline { border-color: var(--accent); }

.isp__control {
  position: relative;
  z-index: 2;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 0 var(--px);
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  outline: none;
}
.isp__control::placeholder { color: var(--inp-placeholder, #5a5a5a); transition: color 200ms ease; }

/* floating label — NO background: the real gap is opened by the legend */
.isp__label {
  position: absolute;
  z-index: 2;
  left: var(--px);
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
  color: var(--inp-label, #6a6a6a);
  font-size: var(--fs);
  pointer-events: none;
  transition: transform 240ms cubic-bezier(0.34, 1.4, 0.5, 1), color 220ms ease;
}
.isp.is-focused .isp__label,
.isp.has-value .isp__label {
  transform: translateY(calc(-50% - var(--h) / 2)) scale(0.82);
}
.isp.is-focused .isp__label { color: var(--accent); }

.isp__hint { margin: 0; padding: 0 2px; font-size: calc(var(--fs) - 1px); color: var(--inp-hint, #7a7a7a); }

.isp.is-disabled { opacity: 0.5; }
.isp.is-disabled .isp__control { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .isp__spot, .isp__label, .isp__legend { transition: none; }
}
`;let p;function f(l){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=l;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function c(l,t){const e=t?f(String(t).trim()):null;if(!e){for(const i of m)l.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),n=(i,d)=>l.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,h);n("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,a?"0 0 0":"255 255 255");n("--vs-color",h),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["value","placeholder","type","disabled","readonly","size","radius","tone","label","hint","block","color"];#r;#e;#h;#a;#u;#t;#o;#l;#p=!1;#d=!1;#s=null;#n=0;#v=0;#b=0;#f=t=>this.#k(t);#m=t=>{t.stopPropagation(),this.#w("change")};#g=()=>{this.#p=!0,this.#i()};#_=()=>{this.#p=!1,this.#i()};#x=()=>this.#C();#y=t=>this.#z(t);#E=()=>this.#N();#c=()=>{this.#s=null};#L=()=>{this.#n=0,this.#s||(this.#s=this.#e.getBoundingClientRect());const t=this.#s;this.#e.style.setProperty("--mx",`${(this.#v-t.left)/t.width*100}%`),this.#e.style.setProperty("--my",`${(this.#b-t.top)/t.height*100}%`)};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#r=document.createElement("div"),this.#r.className="isp",this.#e=document.createElement("div"),this.#e.className="isp__field",this.#h=document.createElement("span"),this.#h.className="isp__spot",this.#h.setAttribute("aria-hidden","true"),this.#a=document.createElement("fieldset"),this.#a.className="isp__outline",this.#a.setAttribute("aria-hidden","true");const s=document.createElement("legend");s.className="isp__legend",this.#u=document.createElement("span"),s.appendChild(this.#u),this.#a.appendChild(s),this.#t=document.createElement("input"),this.#t.className="isp__control",this.#o=document.createElement("label"),this.#o.className="isp__label",this.#l=document.createElement("p"),this.#l.className="isp__hint",this.#e.append(this.#h,this.#a,this.#t,this.#o),this.#r.append(this.#e,this.#l),t.append(e,this.#r),this.#t.addEventListener("input",this.#f),this.#t.addEventListener("change",this.#m),this.#t.addEventListener("focus",this.#g),this.#t.addEventListener("blur",this.#_),this.#e.addEventListener("pointerenter",this.#x),this.#e.addEventListener("pointermove",this.#y),this.#e.addEventListener("pointerleave",this.#E)}connectedCallback(){c(this,this.getAttribute("color")),this.#i()}disconnectedCallback(){this.#t.removeEventListener("input",this.#f),this.#t.removeEventListener("change",this.#m),this.#t.removeEventListener("focus",this.#g),this.#t.removeEventListener("blur",this.#_),this.#e.removeEventListener("pointerenter",this.#x),this.#e.removeEventListener("pointermove",this.#y),this.#e.removeEventListener("pointerleave",this.#E),this.#A()}attributeChangedCallback(){c(this,this.getAttribute("color")),this.#t&&this.#i()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#i()}focus(){this.#t.focus()}blur(){this.#t.blur()}#i(){const t=(u,v)=>this.getAttribute(u)??v,e=this.hasAttribute("disabled"),s=this.hasAttribute("readonly"),r=t("label",""),a=t("hint",""),h=t("type","text"),o=t("value","");this.#t.value!==o&&(this.#t.value=o);const n=this.#t.value.length>0;this.#t.type!==h&&(this.#t.type=h);const i=t("placeholder",""),d=r?this.#p?i:"":i;this.#t.getAttribute("placeholder")!==d&&this.#t.setAttribute("placeholder",d),this.#t.disabled=e,this.#t.readOnly=s,r?this.#t.setAttribute("aria-label",r):this.#t.removeAttribute("aria-label"),this.#r.className=`isp isp--${t("size","md")} isp--r-${t("radius","rounded")} isp--t-${t("tone","default")}`+(this.#p?" is-focused":"")+(this.#d?" is-hovering":"")+(e?" is-disabled":"")+(s?" is-readonly":"")+(n?" has-value":"")+(r?" has-label":"")+(this.hasAttribute("block")?" isp--block":""),this.#o.textContent=r,this.#o.style.display=r?"":"none",this.#u.textContent=r||" ",this.#l.textContent=a,this.#l.style.display=a?"":"none"}#k(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#i(),this.#w("input")}#w(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#C(){this.#s=null,addEventListener("scroll",this.#c,{passive:!0,capture:!0}),addEventListener("resize",this.#c,{passive:!0})}#z(t){this.hasAttribute("disabled")||(this.#v=t.clientX,this.#b=t.clientY,this.#d||(this.#d=!0,this.#i()),this.#n||(this.#n=requestAnimationFrame(this.#L)))}#N(){this.#d=!1,this.#i(),this.#A()}#A(){removeEventListener("scroll",this.#c,{capture:!0}),removeEventListener("resize",this.#c),this.#n&&(cancelAnimationFrame(this.#n),this.#n=0),this.#s=null}}customElements.define("vs-input-spotlight",g);
