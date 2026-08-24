const f=`
/* borders must not push the control out of its cell (inputs default to
   content-box, so width/height 100% + a border overflowed by 2px) */
*, *::before, *::after { box-sizing: border-box; }

:host { display: inline-block; }
.otd {
  --h: var(--ctrl-h-md, 40px);
  --otd-accent: var(--ui-accent, #ededed);
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: inherit;
}
.otd__cell {
  position: relative;
  width: var(--h);
  height: var(--h);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* real transparent input on top: keeps native caret, keyboard and paste */
.otd__control {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: transparent;
  caret-color: transparent;
  font: inherit;
  text-align: center;
  outline: none;
  cursor: pointer;
}
/* the dot: hollow by default */
.otd__dot {
  width: 40%;
  height: 40%;
  border-radius: 999px;
  background: transparent;
  border: 2px solid var(--inp-border, #3d3d3d);
  transition: transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
}
.otd__cell:hover .otd__dot { border-color: var(--inp-border-hover, #555); }
/* focus: accent ring around the empty dot */
.otd__cell.is-focused .otd__dot {
  border-color: var(--otd-accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--otd-accent) 20%, transparent);
}
/* with value: solid dot with an elastic pop (dot-fill keyframes) */
.otd__cell.has-value .otd__dot {
  background: var(--otd-accent);
  border-color: var(--otd-accent);
  box-shadow: 0 0 10px 0 color-mix(in srgb, var(--otd-accent) 55%, transparent);
  animation: otd-fill 300ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes otd-fill {
  0% { transform: scale(0.4); }
  60% { transform: scale(1.35); }
  100% { transform: scale(1.25); }
}
.otd.is-disabled { opacity: 0.5; }
.otd.is-disabled .otd__control { cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) {
  .otd__dot { transition: background-color 200ms ease, border-color 200ms ease; }
  .otd__cell.has-value .otd__dot { animation: none; transform: none; }
}
`;let h;function p(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(c,t){const e=t?p(String(t).trim()):null;if(!e){for(const s of b)c.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),a=(s,u)=>c.style.setProperty(s,u);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,r);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,o?"0 0 0":"255 255 255");a("--vs-color",r),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["value","length","type","disabled","accent","autofocus","color"];#t;#r=[];#o=[];#e=[];#i=0;#c=-1;#f=t=>this.#A(t);#p=t=>{t.stopPropagation(),this.#u("change")};#b=t=>this.#w(t);#g=t=>this.#E(t);#m=t=>this.#k(t);#v=()=>{this.#c=-1,this.#a()};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("div"),this.#t.className="otd",this.#t.setAttribute("role","group"),this.#t.setAttribute("aria-label","One-time code"),t.append(e,this.#t),this.#t.addEventListener("input",this.#f),this.#t.addEventListener("change",this.#p),this.#t.addEventListener("keydown",this.#b),this.#t.addEventListener("paste",this.#g),this.#t.addEventListener("focusin",this.#m),this.#t.addEventListener("focusout",this.#v)}connectedCallback(){d(this,this.getAttribute("color")),this.#d(),this.hasAttribute("autofocus")&&this.#s(0)}disconnectedCallback(){this.#t.removeEventListener("input",this.#f),this.#t.removeEventListener("change",this.#p),this.#t.removeEventListener("keydown",this.#b),this.#t.removeEventListener("paste",this.#g),this.#t.removeEventListener("focusin",this.#m),this.#t.removeEventListener("focusout",this.#v)}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#d()}get value(){return this.#e.join("")}set value(t){const e=t==null?"":String(t);this.getAttribute("value")!==e?this.setAttribute("value",e):this.#d()}focus(){this.#s(0)}#h(t){const e=(this.getAttribute("type")||"numeric")!=="alphanumeric";return(t??"").replace(e?/[^0-9]/g:/[^a-zA-Z0-9]/g,"")}#_(){const t=parseInt(this.getAttribute("length")??"6",10);return Number.isFinite(t)&&t>0?t:6}#d(){const t=this.#_();t!==this.#i&&this.#x(t);const e=this.#h(this.getAttribute("value")).slice(0,t);this.#e=new Array(t).fill("");for(let r=0;r<e.length;r++)this.#e[r]=e[r];const i=this.hasAttribute("disabled"),n=this.getAttribute("accent"),o=(this.getAttribute("type")||"numeric")!=="alphanumeric";this.#t.classList.toggle("is-disabled",i),this.#t.setAttribute("aria-disabled",i?"true":"false"),n?this.#t.style.setProperty("--otd-accent",n):this.#t.style.removeProperty("--otd-accent");for(let r=0;r<t;r++){const l=this.#o[r];l.disabled=i,l.setAttribute("inputmode",o?"numeric":"text")}this.#a()}#x(t){this.#t.textContent="",this.#r=[],this.#o=[];for(let e=0;e<t;e++){const i=document.createElement("label");i.className="otd__cell";const n=document.createElement("span");n.className="otd__dot",n.setAttribute("aria-hidden","true");const o=document.createElement("input");o.className="otd__control",o.type="text",o.value="",o.maxLength=1,o.autocomplete="one-time-code",o.setAttribute("aria-label",`Digit ${e+1} of ${t}`),i.append(n,o),this.#t.appendChild(i),this.#r.push({cell:i,dot:n,input:o}),this.#o.push(o)}this.#i=t}#a(){for(let t=0;t<this.#i;t++)this.#r[t].cell.classList.toggle("has-value",this.#e[t]!==""),this.#r[t].cell.classList.toggle("is-focused",this.#c===t)}#l(t){return this.#o.indexOf(t)}#s(t){const e=this.#o[Math.max(0,Math.min(t,this.#i-1))];e&&(e.focus(),e.select())}#n(){const t=this.#e.join("");this.getAttribute("value")!==t?this.setAttribute("value",t):this.#a(),this.#u("input"),t.length===this.#i&&this.#e.every(e=>e!=="")&&this.#u("complete")}#u(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#e.join("")}}))}#y(t,e){const i=this.#h(t);let n=e;for(const o of i){if(n>=this.#i)break;this.#e[n]=o,n++}this.#n(),this.#s(Math.min(n,this.#i-1))}#A(t){t.stopPropagation();const e=t.target,i=this.#l(e);if(i<0)return;const n=this.#h(e.value);if(e.value="",!n){this.#e[i]="",this.#n();return}if(n.length>1){this.#y(n,i);return}this.#e[i]=n[0],this.#n(),i<this.#i-1&&this.#s(i+1)}#w(t){const e=this.#l(t.target);if(e<0)return;const i=t.key;i==="Backspace"?(this.#e[e]?(this.#e[e]="",this.#n()):e>0&&(this.#e[e-1]="",this.#n(),this.#s(e-1)),t.preventDefault()):i==="ArrowLeft"&&e>0?(this.#s(e-1),t.preventDefault()):i==="ArrowRight"&&e<this.#i-1?(this.#s(e+1),t.preventDefault()):i==="Delete"&&(this.#e[e]="",this.#n(),t.preventDefault())}#E(t){const e=this.#l(t.target);e<0||(t.preventDefault(),this.#y(t.clipboardData?.getData("text")??"",e))}#k(t){const e=this.#l(t.target);e<0||(this.#c=e,this.#a())}}customElements.define("vs-otp-dots",g);
