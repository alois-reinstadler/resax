const v=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
.tau {
  --fs: var(--ctrl-fs-md, 14px);
  --px: 2px;
  --py: 8px;
  --lh: 1.5;
  --accent: var(--inp-accent, #ededed);
  --ring: var(--inp-ring, 255 255 255);
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 280px;
  font-family: inherit;
}
.tau--block { display: flex; width: 100%; min-width: 0; }
.tau--sm { --fs: var(--ctrl-fs-sm, 13px); --py: 6px; }
.tau--lg { --fs: var(--ctrl-fs-lg, 15px); --py: 10px; }

.tau__field { position: relative; display: flex; flex-direction: column; }

/* floating label anchored to the first text line */
.tau__label {
  position: absolute;
  left: var(--px);
  top: var(--py);
  transform-origin: left top;
  color: var(--inp-label, #6a6a6a);
  font-size: var(--fs);
  line-height: var(--lh);
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - var(--px) * 2);
  transition: transform 240ms cubic-bezier(0.34, 1.4, 0.5, 1), color 200ms ease;
}
.tau.is-floated .tau__label {
  transform: translateY(calc(-1 * var(--fs) - 4px)) scale(0.82);
}
.tau.is-focused .tau__label { color: var(--accent); }

.tau__control {
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: 0;
  min-height: calc(var(--rows) * var(--lh) * var(--fs) + var(--py) * 2);
  padding: var(--py) var(--px);
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  line-height: var(--lh);
  outline: none;
  resize: vertical;
}
.tau.is-autosize .tau__control { resize: none; overflow: hidden; }
.tau__control::placeholder { color: var(--inp-placeholder, #5a5a5a); }

/* underline: base line + accent that scales from center */
.tau__line {
  height: 1px;
  width: 100%;
  background: var(--inp-border, #2a2a2a);
  transition: background-color 200ms ease;
}
.tau__field:hover .tau__line { background: var(--inp-border-hover, #3d3d3d); }
.tau__line--accent {
  position: absolute;
  left: 0; bottom: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.tau.is-focused .tau__line--accent { transform: scaleX(1); }

/* meta */
.tau__meta { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding: 0 2px; }
.tau__hint { margin: 0; font-size: calc(var(--fs) - 1px); color: var(--inp-hint, #7a7a7a); }
.tau__counter { margin-left: auto; font-size: calc(var(--fs) - 2px); font-variant-numeric: tabular-nums; color: var(--inp-hint, #7a7a7a); }
.tau__counter.is-full { color: var(--inp-t-danger-hint, #ff8d91); }

/* tones */
.tau--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; }
.tau--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; }
.tau--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; }
.tau--t-danger .tau__label,
.tau--t-warn .tau__label,
.tau--t-success .tau__label { color: rgb(var(--ring) / 0.85); }

/* disabled / readonly */
.tau.is-disabled { opacity: 0.5; }
.tau.is-disabled .tau__control { cursor: not-allowed; resize: none; }

@media (prefers-reduced-motion: reduce) {
  .tau__label, .tau__line, .tau__line--accent { transition: none; }
}
`;let u;function _(c){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=c;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(c,t){const e=t?_(String(t).trim()):null;if(!e){for(const i of y)c.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),n=(i,h)=>c.style.setProperty(i,h);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,o);n("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,a?"0 0 0":"255 255 255");n("--vs-color",o),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["value","placeholder","disabled","readonly","rows","size","tone","label","hint","maxlength","autosize","block","color"];#i;#r;#t;#s;#n;#e;#l=!1;#o=t=>this.#p(t);#c=t=>{t.stopPropagation(),this.#f("change")};#u=t=>this.#b(t);#h=t=>this.#m(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#i=document.createElement("div"),this.#i.className="tau",this.#r=document.createElement("div"),this.#r.className="tau__field",this.#s=document.createElement("label"),this.#s.className="tau__label",this.#t=document.createElement("textarea"),this.#t.className="tau__control";const s=document.createElement("span");s.className="tau__line",s.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="tau__line tau__line--accent",r.setAttribute("aria-hidden","true");const a=document.createElement("div");a.className="tau__meta",this.#n=document.createElement("p"),this.#n.className="tau__hint",this.#e=document.createElement("span"),this.#e.className="tau__counter",a.append(this.#n,this.#e),this.#r.append(this.#s,this.#t,s,r),this.#i.append(this.#r,a),t.append(e,this.#i),this.#t.addEventListener("input",this.#o),this.#t.addEventListener("change",this.#c),this.#t.addEventListener("focus",this.#u),this.#t.addEventListener("blur",this.#h)}connectedCallback(){b(this,this.getAttribute("color")),this.#a()}disconnectedCallback(){this.#t.removeEventListener("input",this.#o),this.#t.removeEventListener("change",this.#c),this.#t.removeEventListener("focus",this.#u),this.#t.removeEventListener("blur",this.#h)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#a()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#a(),this.#d()}focus(){this.#t.focus()}blur(){this.#t.blur()}#a(){const t=(d,g)=>this.getAttribute(d)??g,e=this.hasAttribute("disabled"),s=this.hasAttribute("readonly"),r=t("label","Message"),a=t("hint",""),o=Number(t("rows","3"))||3,l=Number(t("maxlength","0"))||0,n=this.hasAttribute("autosize"),i=t("value","");this.#t.value!==i&&(this.#t.value=i);const h=this.#t.value.length>0,f=this.#l||h;this.#t.rows!==o&&(this.#t.rows=o),this.#i.style.setProperty("--rows",o),l>0?this.#t.setAttribute("maxlength",String(l)):this.#t.removeAttribute("maxlength");const m=t("placeholder",""),p=f?m:"";if(this.#t.getAttribute("placeholder")!==p&&this.#t.setAttribute("placeholder",p),this.#t.disabled=e,this.#t.readOnly=s,r?this.#t.setAttribute("aria-label",r):this.#t.removeAttribute("aria-label"),this.#i.className=`tau tau--${t("size","md")} tau--t-${t("tone","default")}`+(this.#l?" is-focused":"")+(e?" is-disabled":"")+(s?" is-readonly":"")+(h?" has-value":"")+(f?" is-floated":"")+(n?" is-autosize":"")+(this.hasAttribute("block")?" tau--block":""),this.#s.textContent=r,this.#s.style.display=r?"":"none",this.#n.textContent=a,this.#n.style.display=a?"":"none",l>0){const d=this.#t.value.length;this.#e.textContent=`${d}/${l}`,this.#e.classList.toggle("is-full",d>=l),this.#e.style.display=""}else this.#e.style.display="none"}#d(){if(!this.hasAttribute("autosize"))return;const t=this.#t;t.style.height="auto",t.style.height=`${t.scrollHeight}px`}#p(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#a(),this.#d(),this.#f("input")}#f(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#b(t){this.#l=!0,this.#a(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#m(t){this.#l=!1,this.#a(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}}customElements.define("vs-textarea-underline",x);
