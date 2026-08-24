const _=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
.taf {
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 14px);
  --py: 24px; /* room for the shrunk label on top */
  --pb: 10px;
  --lh: 1.5;
  --r: var(--ctrl-r-md, 12px);
  --accent: var(--inp-accent, #ededed);
  --ring: var(--inp-ring, 255 255 255);
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 280px;
  font-family: inherit;
}
.taf--block { display: flex; width: 100%; min-width: 0; }
.taf--sm { --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --r: var(--ctrl-r-sm, 10px); }
.taf--lg { --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --r: var(--ctrl-r-lg, 14px); }

/* filled surface with rounded top, flat bottom (material) */
.taf__field {
  position: relative;
  display: flex;
  border-radius: var(--r) var(--r) 0 0;
  background: var(--inp-filled-bg, rgba(255, 255, 255, 0.06));
  overflow: hidden;
  transition: background-color 200ms ease;
}
.taf__field:hover { background: var(--inp-filled-hover-bg, rgba(255, 255, 255, 0.09)); }
.taf.is-focused .taf__field { background: var(--inp-filled-focus-bg, rgba(255, 255, 255, 0.11)); }

.taf__label {
  position: absolute;
  left: var(--px);
  top: calc(var(--py) - 4px);
  transform-origin: left top;
  color: var(--inp-label, #8a8a8a);
  font-size: var(--fs);
  line-height: var(--lh);
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - var(--px) * 2);
  transition: transform 240ms cubic-bezier(0.34, 1.4, 0.5, 1), color 200ms ease;
}
.taf.is-floated .taf__label { transform: translateY(-16px) scale(0.78); }
.taf.is-focused .taf__label { color: var(--accent); }

.taf__control {
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: 0;
  min-height: calc(var(--rows) * var(--lh) * var(--fs));
  padding: var(--py) var(--px) var(--pb);
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  line-height: var(--lh);
  outline: none;
  resize: vertical;
}
.taf.is-autosize .taf__control { resize: none; overflow: hidden; }
.taf__control::placeholder { color: var(--inp-placeholder, #5a5a5a); }

/* bottom line: rest + accent that grows from center */
.taf__line {
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--inp-border, #3a3a3a);
}
.taf__line::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.taf.is-focused .taf__line::after { transform: scaleX(1); }

/* meta */
.taf__meta { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding: 0 2px; }
.taf__hint { margin: 0; font-size: calc(var(--fs) - 1px); color: var(--inp-hint, #7a7a7a); }
.taf__counter { margin-left: auto; font-size: calc(var(--fs) - 2px); font-variant-numeric: tabular-nums; color: var(--inp-hint, #7a7a7a); }
.taf__counter.is-full { color: var(--inp-t-danger-hint, #ff8d91); }

/* tones */
.taf--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; }
.taf--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; }
.taf--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; }
.taf--t-danger .taf__label,
.taf--t-warn .taf__label,
.taf--t-success .taf__label { color: rgb(var(--ring) / 0.85); }

/* disabled / readonly */
.taf.is-disabled { opacity: 0.5; }
.taf.is-disabled .taf__control { cursor: not-allowed; resize: none; }

@media (prefers-reduced-motion: reduce) {
  .taf__label, .taf__line::after, .taf__field { transition: none; }
}
`;let c;function x(o){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=o;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(o,t){const e=t?x(String(t).trim()):null;if(!e){for(const i of y)o.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,r=e.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),a=(i,h)=>o.style.setProperty(i,h);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,l);a("--btn-primary-bg-hover",`rgb(${r[0]} ${r[1]} ${r[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,n?"0 0 0":"255 255 255");a("--vs-color",l),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["value","placeholder","disabled","readonly","rows","size","tone","label","hint","maxlength","autosize","block","color"];#i;#l;#t;#s;#n;#r;#e;#o=!1;#h=t=>this.#b(t);#f=t=>{t.stopPropagation(),this.#p("change")};#d=t=>this.#m(t);#u=t=>this.#g(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=_,this.#i=document.createElement("div"),this.#i.className="taf",this.#l=document.createElement("div"),this.#l.className="taf__field",this.#s=document.createElement("label"),this.#s.className="taf__label",this.#t=document.createElement("textarea"),this.#t.className="taf__control";const s=document.createElement("span");s.className="taf__line",s.setAttribute("aria-hidden","true"),this.#n=document.createElement("div"),this.#n.className="taf__meta",this.#r=document.createElement("p"),this.#r.className="taf__hint",this.#e=document.createElement("span"),this.#e.className="taf__counter",this.#l.append(this.#s,this.#t,s),this.#n.append(this.#r,this.#e),this.#i.append(this.#l,this.#n),t.append(e,this.#i),this.#t.addEventListener("input",this.#h),this.#t.addEventListener("change",this.#f),this.#t.addEventListener("focus",this.#d),this.#t.addEventListener("blur",this.#u)}connectedCallback(){m(this,this.getAttribute("color")),this.#a(),this.hasAttribute("autosize")&&this.#c()}disconnectedCallback(){this.#t.removeEventListener("input",this.#h),this.#t.removeEventListener("change",this.#f),this.#t.removeEventListener("focus",this.#d),this.#t.removeEventListener("blur",this.#u)}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&this.#a()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#a(),this.hasAttribute("autosize")&&this.#c()}focus(){this.#t.focus()}blur(){this.#t.blur()}#a(){const t=(f,v)=>this.getAttribute(f)??v,e=this.hasAttribute("disabled"),s=this.hasAttribute("readonly"),d=this.hasAttribute("autosize"),n=t("label","Message"),l=t("hint",""),r=Number(t("rows",3))||3,a=Number(t("maxlength",0))||0,i=t("value","");this.#t.value!==i&&(this.#t.value=i);const h=this.#t.value.length>0,u=this.#o||h;this.#t.rows!==r&&(this.#t.rows=r),this.#i.style.setProperty("--rows",r);const g=t("placeholder",""),p=u?g:"";this.#t.getAttribute("placeholder")!==p&&this.#t.setAttribute("placeholder",p),this.#t.disabled=e,this.#t.readOnly=s,a>0?this.#t.setAttribute("maxlength",String(a)):this.#t.removeAttribute("maxlength"),n?this.#t.setAttribute("aria-label",n):this.#t.removeAttribute("aria-label"),this.#i.className=`taf taf--${t("size","md")} taf--t-${t("tone","default")}`+(this.#o?" is-focused":"")+(e?" is-disabled":"")+(s?" is-readonly":"")+(h?" has-value":"")+(u?" is-floated":"")+(this.hasAttribute("block")?" taf--block":"")+(d?" is-autosize":""),this.#s.textContent=n,this.#s.style.display=n?"":"none";const b=a>0;if(this.#n.style.display=l||b?"":"none",this.#r.textContent=l,this.#r.style.display=l?"":"none",b){const f=this.#t.value.length;this.#e.textContent=`${f}/${a}`,this.#e.classList.toggle("is-full",f>=a),this.#e.style.display=""}else this.#e.style.display="none"}#c(){this.hasAttribute("autosize")&&(this.#t.style.height="auto",this.#t.style.height=`${this.#t.scrollHeight}px`)}#b(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#a(),this.hasAttribute("autosize")&&this.#c(),this.#p("input")}#p(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#m(t){this.#o=!0,this.#a(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#g(t){this.#o=!1,this.#a(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}}customElements.define("vs-textarea-filled",w);
