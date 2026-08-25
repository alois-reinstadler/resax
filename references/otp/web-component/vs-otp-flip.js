const u=`
/* borders must not push the control out of its cell (inputs default to
   content-box, so width/height 100% + a border overflowed by 2px) */
*, *::before, *::after { box-sizing: border-box; }

:host { display: inline-flex; }
.otp-flip {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --fs: var(--ctrl-fs-md, 16px);
  --otpf-accent: var(--ui-accent, #ededed);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  perspective: 500px;
}
.otp-flip__cell {
  position: relative;
  width: var(--h);
  height: var(--h);
  display: inline-flex;
  transform-style: preserve-3d;
  transition: transform 360ms cubic-bezier(0.34, 1.3, 0.5, 1);
}
.otp-flip__cell.is-flipping { transform: rotateX(360deg); }
.otp-flip__control {
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: var(--r);
  border: 1px solid var(--inp-border, #2a2a2a);
  background: var(--inp-bg, #121212);
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  font-weight: 700;
  text-align: center;
  caret-color: var(--otpf-accent);
  outline: none;
  transition: border-color 200ms ease;
}
/* center hinge of the split-flap */
.otp-flip__hinge {
  position: absolute;
  left: 6%;
  right: 6%;
  top: 50%;
  height: 1px;
  transform: translateY(-0.5px);
  background: var(--inp-border, #2a2a2a);
  opacity: 0.6;
  pointer-events: none;
}
.otp-flip__cell:hover .otp-flip__control { border-color: var(--inp-border-hover, #3d3d3d); }
.otp-flip__cell.has-value .otp-flip__control { border-color: var(--inp-border-hover, #3d3d3d); }
.otp-flip__cell.is-focused .otp-flip__control {
  border-color: var(--otpf-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--otpf-accent) 22%, transparent);
}
.otp-flip.is-disabled { opacity: 0.5; }
.otp-flip.is-disabled .otp-flip__control { cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) {
  .otp-flip__cell { transition: none; }
  .otp-flip__cell.is-flipping { transform: none; }
}
`,d=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let h;function g(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,t){const e=t?g(String(t).trim()):null;if(!e){for(const r of b)c.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),l=(r,f)=>c.style.setProperty(r,f);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(r,o);l("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])l(r,n?"0 0 0":"255 255 255");l("--vs-color",o),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["length","value","type","disabled","accent","autofocus","color"];#e;#c=[];#r=[];#t=[];#n=new Map;#p=-1;#i=0;#f=!1;#b=t=>this.#k(t);#v=t=>this.#C(t);#m=t=>this.#D(t);#y=t=>this.#S(t);#_=()=>{this.#p=-1,this.#s()};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#e=document.createElement("div"),this.#e.className="otp-flip",this.#e.setAttribute("role","group"),this.#e.setAttribute("aria-label","One-time code"),t.append(e,this.#e)}connectedCallback(){p(this,this.getAttribute("color")),this.#d(),this.hasAttribute("autofocus")&&this.#o(0)}disconnectedCallback(){for(const t of this.#n.values())clearTimeout(t);this.#n.clear(),this.#x()}attributeChangedCallback(){p(this,this.getAttribute("color")),!this.#f&&this.#e&&this.#d()}get value(){return this.#t.join("")}set value(t){const e=t==null?"":String(t);this.getAttribute("value")!==e?this.setAttribute("value",e):this.#d()}get length(){return this.#i}set length(t){this.setAttribute("length",String(t))}focus(){this.#o(0)}#w(){const t=parseInt(this.getAttribute("length")??"6",10);return t>0?t:6}#u(){return this.getAttribute("type")==="alphanumeric"?/[^a-zA-Z0-9]/g:/[^0-9]/g}#E(){return this.getAttribute("type")==="alphanumeric"?"text":"numeric"}#d(){const t=this.#w();t!==this.#i&&this.#L(t);const e=(this.getAttribute("value")??"").replace(this.#u(),"").slice(0,t);this.#t=new Array(t).fill("");for(let o=0;o<e.length;o++)this.#t[o]=e[o];const i=this.hasAttribute("disabled"),s=this.getAttribute("accent")||"";s?this.#e.style.setProperty("--otpf-accent",s):this.#e.style.removeProperty("--otpf-accent");const n=this.#E();for(let o=0;o<t;o++){const a=this.#r[o];a.disabled=i,a.setAttribute("inputmode",n),a.setAttribute("aria-label",`Digit ${o+1} of ${t}`)}this.#e.classList.toggle("is-disabled",i),this.#s()}#L(t){this.#x();for(const e of this.#n.values())clearTimeout(e);this.#n.clear(),this.#e.textContent="",this.#c=[],this.#r=[];for(let e=0;e<t;e++){const i=document.createElement("label");i.className="otp-flip__cell";const s=document.createElement("input");s.className="otp-flip__control",s.type="text",s.maxLength=1,s.autocomplete="one-time-code";const n=document.createElement("span");n.className="otp-flip__hinge",n.setAttribute("aria-hidden","true"),i.append(s,n),this.#e.appendChild(i),this.#c.push(i),this.#r.push(s),s.addEventListener("input",this.#b),s.addEventListener("keydown",this.#v),s.addEventListener("paste",this.#m),s.addEventListener("focus",this.#y),s.addEventListener("blur",this.#_)}this.#i=t}#x(){for(const t of this.#r)t.removeEventListener("input",this.#b),t.removeEventListener("keydown",this.#v),t.removeEventListener("paste",this.#m),t.removeEventListener("focus",this.#y),t.removeEventListener("blur",this.#_)}#s(){for(let t=0;t<this.#i;t++){const e=this.#t[t]??"";this.#r[t].value!==e&&(this.#r[t].value=e);const i=this.#c[t];i.classList.toggle("has-value",e!==""),i.classList.toggle("is-focused",this.#p===t)}}#h(t){return this.#r.indexOf(t)}#o(t){const e=this.#r[t];e&&(e.focus(),e.select())}#a(t){if(d())return;const e=this.#c[t];if(!e)return;e.classList.remove("is-flipping"),e.offsetWidth,e.classList.add("is-flipping");const i=this.#n.get(t);i&&clearTimeout(i),this.#n.set(t,setTimeout(()=>{this.#n.delete(t),e.classList.remove("is-flipping")},360))}#l(){const t=this.#t.join("");this.#f=!0,this.getAttribute("value")!==t&&this.setAttribute("value",t),this.#f=!1,this.#g("input"),this.#g("change"),this.#t.length===this.#i&&this.#t.every(e=>e!=="")&&this.#g("complete")}#g(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.join("")}}))}#A(t,e){const i=(t??"").replace(this.#u(),"");let s=e;for(const n of i){if(s>=this.#i)break;this.#t[s]=n,this.#a(s),s++}this.#s(),this.#l(),this.#o(Math.min(s,this.#i-1))}#k(t){const e=t.target,i=this.#h(e);if(i<0)return;const s=e.value.replace(this.#u(),"");if(!s){this.#t[i]="",e.value="",this.#s(),this.#l();return}if(s.length>1){this.#A(s,i);return}this.#t[i]=s[0],e.value=s[0],this.#a(i),this.#s(),this.#l(),i<this.#i-1&&this.#o(i+1)}#C(t){const e=this.#h(t.target);if(e<0)return;const i=t.key;i==="Backspace"?(this.#t[e]?(this.#t[e]="",this.#a(e),this.#s(),this.#l()):e>0&&(this.#t[e-1]="",this.#a(e-1),this.#s(),this.#l(),this.#o(e-1)),t.preventDefault()):i==="ArrowLeft"&&e>0?(this.#o(e-1),t.preventDefault()):i==="ArrowRight"&&e<this.#i-1?(this.#o(e+1),t.preventDefault()):i==="Delete"&&(this.#t[e]="",this.#a(e),this.#s(),this.#l(),t.preventDefault())}#D(t){const e=this.#h(t.target);e<0||(t.preventDefault(),this.#A(t.clipboardData?t.clipboardData.getData("text"):"",e))}#S(t){this.#p=this.#h(t.target),this.#s()}}customElements.define("vs-otp-flip",v);
