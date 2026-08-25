const f=`
/* borders must not push the control out of its cell (inputs default to
   content-box, so width/height 100% + a border overflowed by 2px) */
*, *::before, *::after { box-sizing: border-box; }

:host { display: inline-block; }
.otu {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 16px);
  --otu-accent: var(--ui-accent, #ededed);
  display: inline-flex;
  align-items: flex-end;
  gap: 12px;
  font-family: inherit;
}
.otu__cell {
  position: relative;
  width: calc(var(--h) * 0.8);
  height: var(--h);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.otu__control {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  font-weight: 600;
  text-align: center;
  caret-color: var(--otu-accent);
  outline: none;
}
.otu__line {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--inp-border, #2a2a2a);
  transform: scaleX(0.9);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 220ms ease, height 220ms ease, box-shadow 260ms ease;
}
.otu__cell.has-value .otu__line { background: var(--inp-border-hover, #3d3d3d); transform: scaleX(1); }
.otu__cell:hover .otu__line { background: var(--inp-border-hover, #3d3d3d); }
.otu__cell.is-focused .otu__line {
  background: var(--otu-accent);
  height: 3px;
  transform: scaleX(1);
  box-shadow: 0 0 12px 0 color-mix(in srgb, var(--otu-accent) 60%, transparent);
}
.otu.is-disabled { opacity: 0.5; }
.otu.is-disabled .otu__control { cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) {
  .otu__line { transition: none; }
}
`;let h;function p(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(c,t){const e=t?p(String(t).trim()):null;if(!e){for(const n of b)c.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(n=>Math.round(r?n*.92:n+(255-n)*.16)),a=(n,d)=>c.style.setProperty(n,d);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(n,o);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(n,r?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])a(n,r?"0 0 0":"255 255 255");a("--vs-color",o),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["length","value","type","disabled","accent","auto-focus","color"];#r;#t;#n=[];#e=[];#i=0;#c=t=>this.#x(t);#h=t=>this.#A(t);#u=t=>this.#w(t);#d=t=>this.#E(t);#f=t=>this.#L(t);constructor(){super(),this.#r=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=f,this.#t=document.createElement("div"),this.#t.className="otu",this.#t.setAttribute("role","group"),this.#t.setAttribute("aria-label","One-time code"),this.#r.append(t,this.#t),this.#t.addEventListener("input",this.#c),this.#t.addEventListener("keydown",this.#h),this.#t.addEventListener("paste",this.#u),this.#t.addEventListener("focusin",this.#d),this.#t.addEventListener("focusout",this.#f)}connectedCallback(){u(this,this.getAttribute("color")),this.#b(),this.hasAttribute("auto-focus")&&requestAnimationFrame(()=>this.#s(0))}disconnectedCallback(){this.#t.removeEventListener("input",this.#c),this.#t.removeEventListener("keydown",this.#h),this.#t.removeEventListener("paste",this.#u),this.#t.removeEventListener("focusin",this.#d),this.#t.removeEventListener("focusout",this.#f)}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#r&&this.#b()}get value(){return this.#e.join("")}set value(t){this.setAttribute("value",t==null?"":String(t))}focus(){this.#s(0)}#a(){return this.getAttribute("type")==="alphanumeric"?/[^a-zA-Z0-9]/g:/[^0-9]/g}#p(){return this.getAttribute("type")==="alphanumeric"?"text":"numeric"}#b(){const t=Math.max(1,parseInt(this.getAttribute("length"),10)||6);t!==this.#i&&this.#v(t);const e=this.hasAttribute("disabled");this.#t.classList.toggle("is-disabled",e);const s=this.getAttribute("accent");s?this.#t.style.setProperty("--otu-accent",s):this.#t.style.removeProperty("--otu-accent");const i=(this.getAttribute("value")??"").replace(this.#a(),"").slice(0,t);i!==this.#e.join("")&&(this.#e=this.#y(i,t));const r=this.#p();for(const o of this.#n)o.getAttribute("inputmode")!==r&&o.setAttribute("inputmode",r);this.#g(e)}#v(t){this.#i=t,this.#t.textContent="";const e=this.#e;this.#e=new Array(t).fill("");for(let i=0;i<Math.min(e.length,t);i++)this.#e[i]=e[i]||"";this.#n=[];const s=this.#p();for(let i=0;i<t;i++){const r=document.createElement("label");r.className="otu__cell";const o=document.createElement("input");o.className="otu__control",o.type="text",o.maxLength=1,o.autocomplete="one-time-code",o.setAttribute("inputmode",s),o.dataset.index=String(i),o.setAttribute("aria-label",`Digit ${i+1} of ${t}`);const l=document.createElement("span");l.className="otu__line",l.setAttribute("aria-hidden","true"),r.append(o,l),this.#t.appendChild(r),this.#n.push(o)}}#g(t){for(let e=0;e<this.#n.length;e++){const s=this.#n[e],i=this.#e[e]||"";s.value!==i&&(s.value=i),s.disabled=t,s.parentElement.classList.toggle("has-value",i!=="")}}#y(t,e){const s=new Array(e).fill("");for(let i=0;i<t.length&&i<e;i++)s[i]=t[i];return s}#_(){return this.#e.length===this.#i&&this.#e.every(t=>t!=="")}#s(t){const e=this.#n[t];e&&(e.focus(),e.select?.())}#o(){const t=this.#e.join("");this.getAttribute("value")!==t?this.setAttribute("value",t):this.#g(this.hasAttribute("disabled")),this.#l("input"),this.#l("change"),this.#_()&&this.#l("complete")}#l(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#e.join("")}}))}#x(t){const e=t.target;if(!e.classList?.contains("otu__control"))return;const s=+e.dataset.index,i=e.value.replace(this.#a(),"");if(!i){this.#e[s]="",this.#o();return}if(i.length>1){this.#m(i,s);return}this.#e[s]=i[0],this.#o(),s<this.#i-1&&this.#s(s+1)}#A(t){const e=t.target;if(!e.classList?.contains("otu__control"))return;const s=+e.dataset.index,i=t.key;i==="Backspace"?(this.#e[s]?(this.#e[s]="",this.#o()):s>0&&(this.#e[s-1]="",this.#o(),this.#s(s-1)),t.preventDefault()):i==="ArrowLeft"&&s>0?(this.#s(s-1),t.preventDefault()):i==="ArrowRight"&&s<this.#i-1?(this.#s(s+1),t.preventDefault()):i==="Delete"&&(this.#e[s]="",this.#o(),t.preventDefault())}#w(t){const e=t.target;e.classList?.contains("otu__control")&&(t.preventDefault(),this.#m(t.clipboardData?.getData("text")??"",+e.dataset.index))}#m(t,e){const s=t.replace(this.#a(),"");let i=e;for(const r of s){if(i>=this.#i)break;this.#e[i]=r,i++}this.#o(),this.#s(Math.min(i,this.#i-1))}#E(t){const e=t.target.closest?.(".otu__cell");if(e){for(const s of this.#t.children)s.classList.remove("is-focused");e.classList.add("is-focused"),t.target.select?.()}}#L(t){const e=t.target.closest?.(".otu__cell");e&&e.classList.remove("is-focused")}}customElements.define("vs-otp-underline",g);
