const _=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }

@property --tag-a {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.tag {
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 14px);
  --py: 11px;
  --lh: 1.5;
  --r: var(--ctrl-r-md, 12px);
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 280px;
  font-family: inherit;
}
.tag--block { display: flex; width: 100%; min-width: 0; }
.tag--sm { --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --r: var(--ctrl-r-sm, 10px); --py: 8px; }
.tag--lg { --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --r: var(--ctrl-r-lg, 14px); --py: 14px; }

/* the border is a 1.5px gradient ring; the inner panel masks it into a border */
.tag__field {
  position: relative;
  padding: 1.5px;
  border-radius: var(--rr, var(--r));
  background: var(--inp-border, #2a2a2a);
  transition: background 220ms ease;
}
.tag--r-subtle { --rr: 8px; }
@supports (corner-shape: squircle) {
  .tag--r-squircle .tag__field,
  .tag--r-squircle .tag__inner { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
}
.tag__field:hover {
  background: conic-gradient(from 0deg, var(--from), var(--to), var(--from));
  opacity: 0.7;
}
/* focus: vivid conic gradient that rotates */
.tag.is-focused .tag__field {
  opacity: 1;
  background: conic-gradient(from var(--tag-a), var(--from), var(--to), var(--from));
  animation: tag-spin 3.5s linear infinite;
}
@keyframes tag-spin {
  to { --tag-a: 360deg; }
}

.tag__inner {
  position: relative;
  border-radius: calc(var(--rr, var(--r)) - 1.5px);
  background: var(--bg-card, #111);
  overflow: hidden;
}

.tag__label {
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
.tag.is-floated .tag__label { transform: translateY(-6px) scale(0.78); opacity: 0; }

.tag__control {
  position: relative;
  z-index: 1;
  display: block;
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
.tag.is-autosize .tag__control { resize: none; overflow: hidden; }
.tag__control::placeholder { color: var(--inp-placeholder, #5a5a5a); }

/* meta */
.tag__meta { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding: 0 2px; }
.tag__hint { margin: 0; font-size: calc(var(--fs) - 1px); color: var(--inp-hint, #7a7a7a); }
.tag__counter { margin-left: auto; font-size: calc(var(--fs) - 2px); font-variant-numeric: tabular-nums; color: var(--inp-hint, #7a7a7a); }
.tag__counter.is-full { color: var(--inp-t-danger-hint, #ff8d91); }

/* disabled / readonly */
.tag.is-disabled { opacity: 0.5; }
.tag.is-disabled .tag__control { cursor: not-allowed; resize: none; }

@media (prefers-reduced-motion: reduce) {
  .tag.is-focused .tag__field { animation: none; background: conic-gradient(from 0deg, var(--from), var(--to), var(--from)); }
  .tag__label { transition: none; }
}
`;let c;function w(l){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=l;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(l,t){const e=t?w(String(t).trim()):null;if(!e){for(const i of E)l.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,r=e.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),a=(i,h)=>l.style.setProperty(i,h);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,o);a("--btn-primary-bg-hover",`rgb(${r[0]} ${r[1]} ${r[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,s?"0 0 0":"255 255 255");a("--vs-color",o),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["value","placeholder","disabled","readonly","rows","size","radius","label","hint","maxlength","autosize","block","from","to","color"];#e;#o;#l;#s;#t;#r;#n;#i;#c=!1;#d=t=>this.#v(t);#u=t=>{t.stopPropagation(),this.#f("change")};#g=t=>this.#b(t);#p=t=>this.#m(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=_,this.#e=document.createElement("div"),this.#e.className="tag",this.#o=document.createElement("div"),this.#o.className="tag__field",this.#l=document.createElement("div"),this.#l.className="tag__inner",this.#s=document.createElement("label"),this.#s.className="tag__label",this.#t=document.createElement("textarea"),this.#t.className="tag__control",this.#l.append(this.#s,this.#t),this.#o.append(this.#l),this.#r=document.createElement("div"),this.#r.className="tag__meta",this.#n=document.createElement("p"),this.#n.className="tag__hint",this.#i=document.createElement("span"),this.#i.className="tag__counter",this.#r.append(this.#n,this.#i),this.#e.append(this.#o,this.#r),t.append(e,this.#e),this.#t.addEventListener("input",this.#d),this.#t.addEventListener("change",this.#u),this.#t.addEventListener("focus",this.#g),this.#t.addEventListener("blur",this.#p)}connectedCallback(){b(this,this.getAttribute("color")),this.#a(),this.hasAttribute("autosize")&&this.#h()}disconnectedCallback(){this.#t.removeEventListener("input",this.#d),this.#t.removeEventListener("change",this.#u),this.#t.removeEventListener("focus",this.#g),this.#t.removeEventListener("blur",this.#p)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#a()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#a(),this.hasAttribute("autosize")&&this.#h()}focus(){this.#t.focus()}blur(){this.#t.blur()}#a(){const t=(y,x)=>this.getAttribute(y)??x,e=this.hasAttribute("disabled"),n=this.hasAttribute("readonly"),u=this.hasAttribute("autosize"),s=t("label","Message"),o=t("hint",""),r=t("rows","3"),a=Number(t("maxlength","0"))||0,i=t("from",this.getAttribute("color")||"#ededed"),h=t("to","#8a8a8a"),g=t("value","");this.#t.value!==g&&(this.#t.value=g);const p=this.#t.value.length>0,f=this.#c||p;this.#t.disabled=e,this.#t.readOnly=n,this.#t.getAttribute("rows")!==r&&this.#t.setAttribute("rows",r),a>0?this.#t.setAttribute("maxlength",String(a)):this.#t.removeAttribute("maxlength");const m=t("placeholder",""),v=f?m:"";this.#t.getAttribute("placeholder")!==v&&this.#t.setAttribute("placeholder",v),s?this.#t.setAttribute("aria-label",s):this.#t.removeAttribute("aria-label"),this.#e.className=`tag tag--${t("size","md")} tag--r-${t("radius","squircle")}`+(this.#c?" is-focused":"")+(e?" is-disabled":"")+(n?" is-readonly":"")+(p?" has-value":"")+(f?" is-floated":"")+(this.hasAttribute("block")?" tag--block":"")+(u?" is-autosize":""),this.#e.style.setProperty("--rows",r),this.#e.style.setProperty("--from",i),this.#e.style.setProperty("--to",h),this.#s.textContent=s,this.#s.style.display=s?"":"none";const d=a>0;this.#n.textContent=o,this.#n.style.display=o?"":"none",this.#i.textContent=`${this.#t.value.length}/${a}`,this.#i.style.display=d?"":"none",this.#i.classList.toggle("is-full",d&&this.#t.value.length>=a),this.#r.style.display=o||d?"":"none"}#h(){const t=this.#t;t.style.height="auto",t.style.height=`${t.scrollHeight}px`}#v(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#a(),this.hasAttribute("autosize")&&this.#h(),this.#f("input")}#f(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#b(t){this.#c=!0,this.#a(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#m(t){this.#c=!1,this.#a(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}}customElements.define("vs-textarea-gradient-border",A);
