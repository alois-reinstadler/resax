const f=`
.ipl {
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
.ipl--block { display: flex; width: 100%; min-width: 0; }
.ipl--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); --fs: var(--ctrl-fs-sm, 13px); }
.ipl--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); --fs: var(--ctrl-fs-lg, 15px); }

.ipl__field {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--h);
  border-radius: var(--rr, var(--r));
  background: var(--btn-secondary-bg, #1a1a1a);
}
.ipl--r-none .ipl__field { --rr: 0px; }
.ipl--r-subtle .ipl__field { --rr: 8px; }
.ipl--r-pill .ipl__field { --rr: 999px; }

/* the ping: a ring pinned over the field that expands + fades once on focus.
   position:absolute → out of flow (does not shift the input) */
.ipl__ping {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  border: 2px solid rgb(var(--ring) / 0.7);
  opacity: 0;
}
.ipl.is-focused .ipl__ping { animation: ipl-ping 620ms cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes ipl-ping {
  0%   { opacity: 0.65; transform: scale(1); }
  100% { opacity: 0;    transform: scale(1.12); }
}

/* border on a fieldset → the legend opens a real gap in the top line */
.ipl__outline {
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
.ipl__legend {
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
.ipl__legend span { display: inline-block; padding: 0 4px; }
.ipl.has-label.is-focused .ipl__legend,
.ipl.has-label.has-value .ipl__legend { max-width: 100%; }
.ipl__field:hover .ipl__outline { border-color: var(--inp-border-hover, #3d3d3d); }
.ipl.is-focused .ipl__outline { border-color: var(--accent); }

.ipl__control {
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
.ipl__control::placeholder { color: var(--inp-placeholder, #5a5a5a); transition: color 200ms ease; }

/* floating label — NO background: the real gap is opened by the legend */
.ipl__label {
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
.ipl.is-focused .ipl__label,
.ipl.has-value .ipl__label {
  transform: translateY(calc(-50% - var(--h) / 2)) scale(0.82);
}
.ipl.is-focused .ipl__label { color: var(--accent); }

.ipl__hint { margin: 0; padding: 0 2px; font-size: calc(var(--fs) - 1px); color: var(--inp-hint, #7a7a7a); }

.ipl.is-disabled { opacity: 0.5; }
.ipl.is-disabled .ipl__control { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .ipl.is-focused .ipl__ping { animation: none; }
  .ipl__label, .ipl__legend { transition: none; }
}
`;let c;function g(o){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=o;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(o,t){const e=t?g(String(t).trim()):null;if(!e){for(const i of m)o.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,p=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),n=(i,d)=>o.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,p);n("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,r?"0 0 0":"255 255 255");n("--vs-color",p),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["value","placeholder","type","disabled","readonly","size","radius","label","hint","block","color"];#i;#r;#a;#n;#p;#t;#s;#l;#o=!1;#c=t=>this.#f(t);#d=t=>{t.stopPropagation(),this.#b("change")};#h=t=>this.#g(t);#u=t=>this.#m(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#i=document.createElement("div"),this.#i.className="ipl",this.#r=document.createElement("div"),this.#r.className="ipl__field",this.#a=document.createElement("span"),this.#a.className="ipl__ping",this.#a.setAttribute("aria-hidden","true"),this.#n=document.createElement("fieldset"),this.#n.className="ipl__outline",this.#n.setAttribute("aria-hidden","true");const s=document.createElement("legend");s.className="ipl__legend",this.#p=document.createElement("span"),s.appendChild(this.#p),this.#n.appendChild(s),this.#t=document.createElement("input"),this.#t.className="ipl__control",this.#s=document.createElement("label"),this.#s.className="ipl__label",this.#l=document.createElement("p"),this.#l.className="ipl__hint",this.#r.append(this.#a,this.#n,this.#t,this.#s),this.#i.append(this.#r,this.#l),t.append(e,this.#i),this.#t.addEventListener("input",this.#c),this.#t.addEventListener("change",this.#d),this.#t.addEventListener("focus",this.#h),this.#t.addEventListener("blur",this.#u)}connectedCallback(){h(this,this.getAttribute("color")),this.#e()}disconnectedCallback(){this.#t.removeEventListener("input",this.#c),this.#t.removeEventListener("change",this.#d),this.#t.removeEventListener("focus",this.#h),this.#t.removeEventListener("blur",this.#u)}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#e()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#e()}focus(){this.#t.focus()}blur(){this.#t.blur()}#e(){const t=(u,b)=>this.getAttribute(u)??b,e=this.hasAttribute("disabled"),s=this.hasAttribute("readonly"),l=t("label","Label"),r=t("hint",""),p=t("type","text"),a=t("value","");this.#t.value!==a&&(this.#t.value=a);const n=this.#t.value.length>0;this.#t.type!==p&&(this.#t.type=p);const i=t("placeholder",""),d=l?this.#o?i:"":i;this.#t.getAttribute("placeholder")!==d&&this.#t.setAttribute("placeholder",d),this.#t.disabled=e,this.#t.readOnly=s,l?this.#t.setAttribute("aria-label",l):this.#t.removeAttribute("aria-label"),this.#i.className=`ipl ipl--${t("size","md")} ipl--r-${t("radius","rounded")}`+(this.#o?" is-focused":"")+(e?" is-disabled":"")+(n?" has-value":"")+(l?" has-label":"")+(this.hasAttribute("block")?" ipl--block":""),this.#s.textContent=l,this.#s.style.display=l?"":"none",this.#p.textContent=l||" ",this.#l.textContent=r,this.#l.style.display=r?"":"none"}#f(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#e(),this.#b("input")}#b(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#g(t){this.#o=!0,this.#e(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#m(t){this.#o=!1,this.#e(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}}customElements.define("vs-input-pulse",v);
