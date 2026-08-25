const g=`
:host { display: block; width: 100%; }
.dzn {
  --dzn-r: var(--ctrl-r-md, 12px);
  --dzn-border: var(--inp-border, #2a2a2a);
  --dzn-bg: var(--bg-card, #111);
  --dzn-text: var(--text, #ededed);
  --dzn-accent: var(--ui-accent, #ededed);
  --dzn-i: 0.7;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 17rem;
  color: var(--dzn-text);
  font-family: inherit;
}

.dzn__zone {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 190px;
  padding: 28px 24px;
  border: 1.5px dashed var(--dzn-border);
  border-radius: calc(var(--dzn-r) * 1.8);
  background: var(--dzn-bg);
  cursor: pointer;
  text-align: center;
  transition: transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1),
              border-color 240ms ease, box-shadow 320ms ease;
}
.dzn__zone:hover, .dzn__zone:focus-visible { outline: none; border-color: var(--dzn-accent); }

.dzn__aurora {
  position: absolute;
  inset: -40%;
  z-index: -1;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--dzn-accent) 40%, transparent), transparent 70%);
  opacity: calc(0.25 * var(--dzn-i));
  filter: blur(18px);
  animation: dzn-sweep 7s linear infinite;
}
@keyframes dzn-sweep {
  0%   { transform: translate(-18%, -12%) rotate(0deg); }
  50%  { transform: translate(18%, 12%) rotate(180deg); }
  100% { transform: translate(-18%, -12%) rotate(360deg); }
}

.dzn__ring {
  position: absolute;
  inset: 8px;
  z-index: -1;
  border-radius: inherit;
  border: 1.5px solid transparent;
  transition: inset 320ms cubic-bezier(0.34, 1.56, 0.64, 1), border-color 240ms ease;
}
.dzn.is-dragging .dzn__zone {
  transform: scale(1.02) translateY(-2px);
  border-color: var(--dzn-accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--dzn-accent) 22%, transparent);
}
.dzn.is-dragging .dzn__ring { inset: 4px; border-color: color-mix(in srgb, var(--dzn-accent) 55%, transparent); }
.dzn.is-dragging .dzn__aurora { opacity: calc(0.5 * var(--dzn-i)); }

.dzn__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--dzn-accent) 16%, transparent);
  color: var(--dzn-accent);
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.dzn__icon svg { width: 22px; height: 22px; }
.dzn.is-dragging .dzn__icon { transform: translateY(-5px) scale(1.12); }

.dzn__label { margin: 0; font-weight: 600; }
.dzn__hint { margin: 0; font-size: 0.86em; color: var(--text-muted, #888); }
.dzn__input { display: none; }

.dzn__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.dzn__list[hidden] { display: none; }
.dzn__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 11px;
  border: 1px solid var(--dzn-border);
  border-radius: var(--dzn-r);
  background: color-mix(in srgb, var(--dzn-bg) 70%, transparent);
}
.dzn__thumb {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  overflow: hidden;
  background: color-mix(in srgb, var(--dzn-accent) 12%, transparent);
  color: var(--dzn-accent);
}
.dzn__thumb svg { width: 18px; height: 18px; }
.dzn__thumb img { width: 100%; height: 100%; object-fit: cover; }
.dzn__meta { flex: 1; min-width: 0; display: grid; gap: 2px; }
.dzn__name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.88em; font-weight: 500; }
.dzn__size { font-size: 0.76em; color: var(--text-muted, #888); }
.dzn__x {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 7px;
  background: none;
  color: var(--text-muted, #888);
  cursor: pointer;
  transition: color 160ms ease, background-color 160ms ease;
}
.dzn__x svg { width: 15px; height: 15px; }
.dzn__x:hover { color: var(--dzn-accent); background: color-mix(in srgb, var(--dzn-accent) 14%, transparent); }

.dzn.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .dzn__aurora { animation: none; }
  .dzn__zone, .dzn__ring, .dzn__icon { transition: border-color 200ms ease; }
}
`,p="http://www.w3.org/2000/svg";function u(){const i=document.createElementNS(p,"svg");return i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("aria-hidden","true"),i}function l(i,t){const e=document.createElementNS(p,"path");if(e.setAttribute("d",i),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const r in t)e.setAttribute(r,t[r]);return e}function f(){const i=u();return i.append(l("M9 17V11L7 13"),l("M9 11L11 13"),l("M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"),l("M22 10H18C15 10 14 9 14 6V2L22 10Z")),i}function v(){const i=u(),t={"stroke-miterlimit":"10"};return i.append(l("M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z",t),l("M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5",t),l("M8 13H12",t),l("M8 17H16",t)),i}function z(){const i=u();return i.append(l("M6 6L18 18"),l("M18 6L6 18")),i}function _(i){return i<1024?`${i} B`:i<1024*1024?`${(i/1024).toFixed(1)} KB`:`${(i/1024/1024).toFixed(1)} MB`}let x=0,h;function y(i){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=i;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(i,t){const e=t?y(String(t).trim()):null;if(!e){for(const n of E)i.style.removeProperty(n);return}const r=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),a=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,d=`rgb(${e[0]} ${e[1]} ${e[2]})`,s=e.map(n=>Math.round(a?n*.92:n+(255-n)*.16)),o=(n,b)=>i.style.setProperty(n,b);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,d);o("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,a?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,a?"0 0 0":"255 255 255");o("--vs-color",d),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["label","hint","multiple","accept","max-size","disabled","intensity","color"];#i;#t;#d;#l;#a;#c;#h;#e;#r;#n=[];#s=new Map;#o=0;#p=!1;#f=()=>this.#L();#v=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.#L())};#z=t=>{this.hasAttribute("disabled")||(t.preventDefault(),this.#o++,this.#b(!0))};#_=t=>{this.hasAttribute("disabled")||t.preventDefault()};#x=()=>{this.hasAttribute("disabled")||(this.#o=Math.max(0,this.#o-1),this.#o===0&&this.#b(!1))};#y=t=>{if(this.hasAttribute("disabled"))return;t.preventDefault(),this.#o=0,this.#b(!1);const e=t.dataTransfer?.files;e&&e.length&&this.addFiles(Array.from(e))};#E=t=>{const e=t.target.files;e&&e.length&&this.addFiles(Array.from(e)),t.target.value=""};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#i=document.createElement("div"),this.#i.className="dzn",this.#t=document.createElement("div"),this.#t.className="dzn__zone",this.#t.setAttribute("role","button"),this.#t.tabIndex=0,this.#d=document.createElement("span"),this.#d.className="dzn__aurora",this.#d.setAttribute("aria-hidden","true"),this.#l=document.createElement("span"),this.#l.className="dzn__ring",this.#l.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="dzn__icon",this.#a.setAttribute("aria-hidden","true"),this.#a.appendChild(f()),this.#c=document.createElement("p"),this.#c.className="dzn__label",this.#h=document.createElement("p"),this.#h.className="dzn__hint",this.#e=document.createElement("input"),this.#e.type="file",this.#e.className="dzn__input",this.#t.append(this.#d,this.#l,this.#a,this.#c,this.#h,this.#e),this.#r=document.createElement("ul"),this.#r.className="dzn__list",this.#r.hidden=!0,this.#i.append(this.#t,this.#r),t.append(e,this.#i),this.#t.addEventListener("pointerdown",this.#f),this.#t.addEventListener("keydown",this.#v),this.#t.addEventListener("dragenter",this.#z),this.#t.addEventListener("dragover",this.#_),this.#t.addEventListener("dragleave",this.#x),this.#t.addEventListener("drop",this.#y),this.#e.addEventListener("change",this.#E)}connectedCallback(){m(this,this.getAttribute("color")),this.#w()}disconnectedCallback(){this.#t.removeEventListener("pointerdown",this.#f),this.#t.removeEventListener("keydown",this.#v),this.#t.removeEventListener("dragenter",this.#z),this.#t.removeEventListener("dragover",this.#_),this.#t.removeEventListener("dragleave",this.#x),this.#t.removeEventListener("drop",this.#y),this.#e.removeEventListener("change",this.#E);for(const{onRemove:t,removeBtn:e}of this.#s.values())e.removeEventListener("click",t);this.#s.clear();for(const t of this.#n)t.url&&URL.revokeObjectURL(t.url)}attributeChangedCallback(t){m(this,this.getAttribute("color")),this.#i&&((t==="multiple"||t==="accept"||t==="disabled")&&this.#k(),this.#w())}get files(){return this.#n.map(t=>({...t}))}set files(t){this.#g(),this.#u(),Array.isArray(t)&&t.length?this.addFiles(t):this.#m()}addFiles(t){if(this.hasAttribute("disabled")||!t||!t.length)return;const r=this.#A(),c=r?t:t.slice(0,1);r||this.#g();const a=this.#N();let d=!1;for(const s of c){if(a>0&&s.size>a*1024*1024){this.dispatchEvent(new CustomEvent("error",{bubbles:!0,composed:!0,detail:{file:s,reason:"size",maxSize:a}}));continue}const n={id:++x,file:s,name:s.name,size:s.size,type:s.type,url:s.type&&s.type.startsWith("image/")?URL.createObjectURL(s):void 0};this.#n.push(n),this.#D(n),d=!0}(d||!r)&&(this.#u(),this.#m())}removeFile(t){const e=this.#n.find(r=>r.id===t);e&&(e.url&&URL.revokeObjectURL(e.url),this.#n=this.#n.filter(r=>r.id!==t),this.#C(t),this.#u(),this.#m())}clearAll(){this.#g(),this.#u(),this.#m()}#A(){return this.hasAttribute("multiple")}#N(){const t=Number(this.getAttribute("max-size"));return Number.isFinite(t)?t:0}#S(){const t=Number(this.getAttribute("intensity"));return Number.isFinite(t)?t:.7}#k(){this.#e.multiple=this.#A();const t=this.getAttribute("accept")||"";t?this.#e.setAttribute("accept",t):this.#e.removeAttribute("accept"),this.#e.disabled=this.hasAttribute("disabled")}#w(){const t=(a,d)=>this.getAttribute(a)??d,e=this.hasAttribute("disabled"),r=t("label","Drop it like it’s hot"),c=t("hint","or click to browse your files");this.#i.classList.toggle("is-disabled",e),this.#i.classList.toggle("is-dragging",this.#p),this.#i.style.setProperty("--dzn-i",String(this.#S())),this.#t.setAttribute("aria-disabled",e?"true":"false"),this.#t.setAttribute("aria-label",r),e?this.#t.removeAttribute("tabindex"):this.#t.tabIndex=0,this.#c.textContent=r,this.#h.textContent=c,this.#k()}#b(t){this.#p!==t&&(this.#p=t,this.#i.classList.toggle("is-dragging",t))}#L(){this.hasAttribute("disabled")||this.#e.click()}#u(){this.#r.hidden=this.#n.length===0}#g(){for(const t of this.#n)t.url&&URL.revokeObjectURL(t.url);this.#n=[];for(const t of Array.from(this.#s.keys()))this.#C(t)}#D(t){const e=document.createElement("li");e.className="dzn__item";const r=document.createElement("span");if(r.className="dzn__thumb"+(t.url?" has-img":""),r.setAttribute("aria-hidden","true"),t.url){const n=document.createElement("img");n.src=t.url,n.alt=t.name,r.appendChild(n)}else r.appendChild(v());const c=document.createElement("div");c.className="dzn__meta";const a=document.createElement("span");a.className="dzn__name",a.textContent=t.name;const d=document.createElement("span");d.className="dzn__size",d.textContent=_(t.size),c.append(a,d);const s=document.createElement("button");s.type="button",s.className="dzn__x",s.setAttribute("aria-label","Remove file"),s.appendChild(z());const o=()=>this.removeFile(t.id);s.addEventListener("click",o),e.append(r,c,s),this.#r.appendChild(e),this.#s.set(t.id,{li:e,onRemove:o,removeBtn:s})}#C(t){const e=this.#s.get(t);e&&(e.removeBtn.removeEventListener("click",e.onRemove),this.#s.delete(t),e.li.remove())}#m(){this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}}))}}customElements.define("vs-upload-file-dropzone",A);
