const b=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
.tasp {
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
.tasp--block { display: flex; width: 100%; min-width: 0; }
.tasp--sm { --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --r: var(--ctrl-r-sm, 10px); --py: 8px; }
.tasp--lg { --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --r: var(--ctrl-r-lg, 14px); --py: 14px; }

.tasp__field {
  position: relative;
  isolation: isolate;
  display: flex;
  border-radius: var(--rr, var(--r));
  border: 1px solid var(--inp-border, #2a2a2a);
  background: var(--bg-card, #111);
  overflow: hidden;
  transition: border-color 220ms ease;
}
.tasp--r-subtle { --rr: 8px; }
@supports (corner-shape: squircle) {
  .tasp--r-squircle .tasp__field { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
}
.tasp.is-focused .tasp__field { border-color: color-mix(in srgb, var(--spot) 70%, var(--inp-border, #2a2a2a)); }

/* the spotlight: a radial glow following the pointer, opacity driven by --lit */
.tasp__spot {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: var(--lit, 0);
  background: radial-gradient(
    220px circle at var(--mx, 50%) var(--my, 50%),
    color-mix(in srgb, var(--spot) 28%, transparent) 0%,
    transparent 60%
  );
  transition: opacity 260ms ease;
}

.tasp__label {
  position: absolute;
  z-index: 1;
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
.tasp.is-floated .tasp__label { transform: translateY(-6px) scale(0.78); opacity: 0; }

.tasp__control {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
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
.tasp.is-autosize .tasp__control { resize: none; overflow: hidden; }
.tasp__control::placeholder { color: var(--inp-placeholder, #5a5a5a); }

/* meta */
.tasp__meta { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding: 0 2px; }
.tasp__hint { margin: 0; font-size: calc(var(--fs) - 1px); color: var(--inp-hint, #7a7a7a); }
.tasp__counter { margin-left: auto; font-size: calc(var(--fs) - 2px); font-variant-numeric: tabular-nums; color: var(--inp-hint, #7a7a7a); }
.tasp__counter.is-full { color: var(--inp-t-danger-hint, #ff8d91); }

/* disabled / readonly */
.tasp.is-disabled { opacity: 0.5; }
.tasp.is-disabled .tasp__control { cursor: not-allowed; resize: none; }

@media (prefers-reduced-motion: reduce) {
  .tasp__spot, .tasp__label, .tasp__field { transition: none; }
}
`;class f extends HTMLElement{static observedAttributes=["value","placeholder","disabled","readonly","rows","size","radius","label","hint","maxlength","autosize","block","color"];#s;#e;#d;#o;#t;#h;#p;#a;#c=!1;#i=0;#r=null;#n=0;#m=0;#b=0;#f=t=>this.#C(t);#x=t=>{t.stopPropagation(),this.#A("change")};#g=t=>this.#k(t);#y=t=>this.#N(t);#_=()=>this.#P();#E=t=>this.#S(t);#w=()=>this.#$();#u=()=>{this.#r=null};#L=()=>{this.#n=0,this.#r||(this.#r=this.#e.getBoundingClientRect());const t=this.#r;this.#e.style.setProperty("--mx",`${this.#m-t.left}px`),this.#e.style.setProperty("--my",`${this.#b-t.top}px`)};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#s=document.createElement("div"),this.#s.className="tasp",this.#e=document.createElement("div"),this.#e.className="tasp__field",this.#d=document.createElement("span"),this.#d.className="tasp__spot",this.#d.setAttribute("aria-hidden","true"),this.#o=document.createElement("label"),this.#o.className="tasp__label",this.#t=document.createElement("textarea"),this.#t.className="tasp__control",this.#h=document.createElement("div"),this.#h.className="tasp__meta",this.#p=document.createElement("p"),this.#p.className="tasp__hint",this.#a=document.createElement("span"),this.#a.className="tasp__counter",this.#e.append(this.#d,this.#o,this.#t),this.#h.append(this.#p,this.#a),this.#s.append(this.#e,this.#h),t.append(e,this.#s),this.#t.addEventListener("input",this.#f),this.#t.addEventListener("change",this.#x),this.#t.addEventListener("focus",this.#g),this.#t.addEventListener("blur",this.#y),this.#e.addEventListener("pointerenter",this.#_),this.#e.addEventListener("pointermove",this.#E),this.#e.addEventListener("pointerleave",this.#w)}connectedCallback(){this.#l(),this.hasAttribute("autosize")&&this.#v()}disconnectedCallback(){this.#t.removeEventListener("input",this.#f),this.#t.removeEventListener("change",this.#x),this.#t.removeEventListener("focus",this.#g),this.#t.removeEventListener("blur",this.#y),this.#e.removeEventListener("pointerenter",this.#_),this.#e.removeEventListener("pointermove",this.#E),this.#e.removeEventListener("pointerleave",this.#w),this.#z()}attributeChangedCallback(){this.#t&&this.#l()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#l(),this.hasAttribute("autosize")&&this.#v()}focus(){this.#t.focus()}blur(){this.#t.blur()}#l(){const t=(a,m)=>this.getAttribute(a)??m,e=this.hasAttribute("disabled"),l=this.hasAttribute("readonly"),u=this.hasAttribute("autosize"),i=t("label","Message"),r=t("hint",""),n=Number(t("rows",3))||3,s=Number(t("maxlength",0))||0,o=t("value","");this.#t.value!==o&&(this.#t.value=o);const h=this.#t.value.length>0,p=this.#c||h;this.#t.rows!==n&&(this.#t.rows=n),this.#s.style.setProperty("--rows",n),this.#s.style.setProperty("--spot",t("color","#ededed"));const v=t("placeholder",""),c=p?v:"";this.#t.getAttribute("placeholder")!==c&&this.#t.setAttribute("placeholder",c),this.#t.disabled=e,this.#t.readOnly=l,s>0?this.#t.setAttribute("maxlength",String(s)):this.#t.removeAttribute("maxlength"),i?this.#t.setAttribute("aria-label",i):this.#t.removeAttribute("aria-label"),this.#s.className=`tasp tasp--${t("size","md")} tasp--r-${t("radius","squircle")}`+(this.#c?" is-focused":"")+(e?" is-disabled":"")+(l?" is-readonly":"")+(h?" has-value":"")+(p?" is-floated":"")+(this.hasAttribute("block")?" tasp--block":"")+(u?" is-autosize":""),this.#o.textContent=i,this.#o.style.display=i?"":"none";const d=s>0;if(this.#h.style.display=r||d?"":"none",this.#p.textContent=r,this.#p.style.display=r?"":"none",d){const a=this.#t.value.length;this.#a.textContent=`${a}/${s}`,this.#a.classList.toggle("is-full",a>=s),this.#a.style.display=""}else this.#a.style.display="none"}#v(){this.hasAttribute("autosize")&&(this.#t.style.height="auto",this.#t.style.height=`${this.#t.scrollHeight}px`)}#C(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#l(),this.hasAttribute("autosize")&&this.#v(),this.#A("input")}#A(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#k(t){this.#c=!0,this.#i=Math.max(this.#i,.5),this.#s.style.setProperty("--lit",String(this.#i)),this.#l(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#N(t){this.#c=!1,this.#i=0,this.#s.style.setProperty("--lit","0"),this.#l(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#P(){this.#r=null,addEventListener("scroll",this.#u,{passive:!0,capture:!0}),addEventListener("resize",this.#u,{passive:!0})}#S(t){this.hasAttribute("disabled")||this.hasAttribute("readonly")||(this.#m=t.clientX,this.#b=t.clientY,this.#i!==1&&(this.#i=1,this.#s.style.setProperty("--lit","1")),this.#n||(this.#n=requestAnimationFrame(this.#L)))}#$(){this.#i=this.#c?.5:0,this.#s.style.setProperty("--lit",String(this.#i)),this.#z()}#z(){removeEventListener("scroll",this.#u,{capture:!0}),removeEventListener("resize",this.#u),this.#n&&(cancelAnimationFrame(this.#n),this.#n=0),this.#r=null}}customElements.define("vs-textarea-spotlight",f);
