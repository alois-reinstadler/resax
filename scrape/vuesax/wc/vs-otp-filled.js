const u=`
/* borders must not push the control out of its cell (inputs default to
   content-box, so width/height 100% + a border overflowed by 2px) */
*, *::before, *::after { box-sizing: border-box; }

:host { display: inline-flex; }
:host([disabled]) { pointer-events: none; }
.otf {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --fs: var(--ctrl-fs-md, 16px);
  --otf-accent: var(--ui-accent, #ededed);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
}
.otf__cell {
  position: relative;
  width: var(--h);
  height: var(--h);
  display: inline-flex;
}
.otf__control {
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: var(--r);
  border: 1px solid var(--inp-border, #2a2a2a);
  background: var(--inp-bg, transparent);
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  font-weight: 700;
  text-align: center;
  caret-color: var(--otf-accent);
  outline: none;
  transition: background-color 200ms ease, border-color 200ms ease,
    color 200ms ease, transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 200ms ease;
}
.otf__cell:hover .otf__control { border-color: var(--inp-border-hover, #3d3d3d); }
.otf__cell.is-focused .otf__control {
  border-color: var(--otf-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--otf-accent) 25%, transparent);
}
/* effect: solid fill + pop when the cell has a value */
.otf__cell.has-value .otf__control {
  background: var(--otf-accent);
  border-color: var(--otf-accent);
  color: var(--ui-accent-fg, #0b0b0b);
  transform: scale(1.06);
}
.otf.is-disabled { opacity: 0.5; }
.otf.is-disabled .otf__control { cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) {
  .otf__control { transition: background-color 200ms ease, border-color 200ms ease; }
  .otf__cell.has-value .otf__control { transform: none; }
}
`,p=a=>Math.max(1,Math.min(12,Number.isFinite(a)?a:6));let d;function b(a){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=a;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(a,t){const e=t?b(String(t).trim()):null;if(!e){for(const n of g)a.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),r=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,h=e.map(n=>Math.round(r?n*.92:n+(255-n)*.16)),o=(n,l)=>a.style.setProperty(n,l);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,c);o("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,r?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,r?"0 0 0":"255 255 255");o("--vs-color",c),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["value","length","type","disabled","auto-focus","accent","color"];#t;#o=[];#e=[];#i=0;#a=-1;#h=t=>this.#y(t);#d=t=>this.#x(t);#f=t=>this.#_(t);#u=t=>this.#g(t,!0);#p=t=>this.#g(t,!1);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.className="otf",this.#t.setAttribute("role","group"),this.#t.setAttribute("aria-label","One-time code"),t.append(e,this.#t),this.#t.addEventListener("input",this.#h),this.#t.addEventListener("keydown",this.#d),this.#t.addEventListener("paste",this.#f),this.#t.addEventListener("focusin",this.#u),this.#t.addEventListener("focusout",this.#p)}connectedCallback(){f(this,this.getAttribute("color")),this.#r(),this.hasAttribute("auto-focus")&&this.#s(0)}disconnectedCallback(){this.#t.removeEventListener("input",this.#h),this.#t.removeEventListener("keydown",this.#d),this.#t.removeEventListener("paste",this.#f),this.#t.removeEventListener("focusin",this.#u),this.#t.removeEventListener("focusout",this.#p)}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#t&&this.#r()}get value(){return this.#e.join("")}set value(t){const e=t==null?"":String(t);this.getAttribute("value")!==e?this.setAttribute("value",e):this.#r()}focus(){this.#s(0)}#l(){return this.getAttribute("type")==="alphanumeric"?/[^a-zA-Z0-9]/g:/[^0-9]/g}#v(){return this.getAttribute("type")==="alphanumeric"?"text":"numeric"}#m(t){this.#t.textContent="",this.#o=[];for(let e=0;e<t;e++){const i=document.createElement("label");i.className="otf__cell";const s=document.createElement("input");s.className="otf__control",s.type="text",s.maxLength=1,s.dataset.i=String(e),s.setAttribute("autocomplete","one-time-code"),i.appendChild(s),this.#t.appendChild(i),this.#o.push({label:i,input:s})}this.#i=t}#r(){const t=p(parseInt(this.getAttribute("length")??"6",10));t!==this.#i&&this.#m(t);const e=this.hasAttribute("disabled"),i=this.getAttribute("accent")||"";i?this.#t.style.setProperty("--otf-accent",i):this.#t.style.removeProperty("--otf-accent"),this.#t.classList.toggle("is-disabled",e);const s=this.#l(),r=(this.getAttribute("value")??"").replace(s,"").slice(0,t),c=new Array(t).fill("");for(let o=0;o<r.length;o++)c[o]=r[o];this.#e=c;const h=this.#v();for(let o=0;o<t;o++){const{label:n,input:l}=this.#o[o];l.value!==this.#e[o]&&(l.value=this.#e[o]),l.disabled=e,l.inputMode=h,l.setAttribute("aria-label",`Digit ${o+1} of ${t}`),n.classList.toggle("has-value",this.#e[o]!==""),n.classList.toggle("is-focused",this.#a===o)}}#s(t){const e=this.#o[t];e&&(e.input.focus(),e.input.select())}#n(){const t=this.#e.join("");this.getAttribute("value")!==t?this.setAttribute("value",t):this.#r(),this.#c("input"),this.#c("change"),this.#e.length===this.#i&&this.#e.every(e=>e!=="")&&this.#c("complete")}#c(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#e.join("")}}))}#b(t,e){const i=(t||"").replace(this.#l(),"");let s=e;for(const r of i){if(s>=this.#i)break;this.#e[s++]=r}this.#n(),this.#s(Math.min(s,this.#i-1))}#y(t){const e=t.target;if(!e.dataset||e.dataset.i===void 0)return;const i=+e.dataset.i,s=e.value.replace(this.#l(),"");if(!s){this.#e[i]="",e.value="",this.#n();return}if(s.length>1){this.#b(s,i);return}this.#e[i]=s[0],e.value=s[0],this.#n(),i<this.#i-1&&this.#s(i+1)}#x(t){const e=t.target;if(!e.dataset||e.dataset.i===void 0)return;const i=+e.dataset.i,s=t.key;s==="Backspace"?(this.#e[i]?(this.#e[i]="",this.#n()):i>0&&(this.#e[i-1]="",this.#n(),this.#s(i-1)),t.preventDefault()):s==="ArrowLeft"&&i>0?(this.#s(i-1),t.preventDefault()):s==="ArrowRight"&&i<this.#i-1?(this.#s(i+1),t.preventDefault()):s==="Delete"&&(this.#e[i]="",this.#n(),t.preventDefault())}#_(t){const e=t.target;!e.dataset||e.dataset.i===void 0||(t.preventDefault(),this.#b(t.clipboardData?.getData("text")??"",+e.dataset.i))}#g(t,e){const i=t.target;if(!(!i.dataset||i.dataset.i===void 0)){this.#a=e?+i.dataset.i:-1;for(let s=0;s<this.#i;s++)this.#o[s].label.classList.toggle("is-focused",this.#a===s)}}}customElements.define("vs-otp-filled",v);
