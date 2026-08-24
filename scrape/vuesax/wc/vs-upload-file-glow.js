const b=`
:host { display: flex; width: 100%; }
.glw {
  --glw-r: var(--ctrl-r-md, 12px);
  --glw-border: var(--inp-border, #2a2a2a);
  --glw-bg: var(--bg-card, #111);
  --glw-text: var(--text, #ededed);
  --glw-accent: var(--ui-accent, #ededed);
  --glw-speed: 6s;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 17rem;
  color: var(--glw-text);
  font-family: inherit;
}

/* frame holds the rotating conic border; inner zone masks it to a ring */
.glw__frame {
  position: relative;
  padding: 1.5px;
  border-radius: calc(var(--glw-r) * 1.7);
  overflow: hidden;
  isolation: isolate;
}
.glw__frame::before {
  content: '';
  position: absolute;
  inset: -50%;
  z-index: -1;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    color-mix(in srgb, var(--glw-accent) 70%, transparent) 60deg,
    transparent 140deg,
    color-mix(in srgb, var(--glw-accent) 40%, transparent) 220deg,
    transparent 300deg
  );
  opacity: 0.5;
  animation: glw-spin var(--glw-speed) linear infinite;
}
@keyframes glw-spin { to { transform: rotate(360deg); } }

.glw__zone {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 180px;
  padding: 26px 22px;
  border-radius: calc(var(--glw-r) * 1.6);
  background: var(--glw-bg);
  cursor: pointer;
  text-align: center;
  transition: box-shadow 320ms ease, background-color 220ms ease;
}
.glw__zone:focus-visible { outline: none; box-shadow: 0 0 0 2px color-mix(in srgb, var(--glw-accent) 60%, transparent); }

.glw.is-dragging .glw__frame::before { opacity: 1; animation-duration: calc(var(--glw-speed) / 3); }
.glw.is-dragging .glw__zone {
  background: color-mix(in srgb, var(--glw-accent) 8%, var(--glw-bg));
  box-shadow: 0 0 34px color-mix(in srgb, var(--glw-accent) 32%, transparent),
              inset 0 0 22px color-mix(in srgb, var(--glw-accent) 14%, transparent);
}

.glw__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--glw-accent) 16%, transparent);
  color: var(--glw-accent);
  transition: transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 320ms ease;
}
.glw__icon svg { width: 22px; height: 22px; }
.glw.is-dragging .glw__icon {
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 0 22px color-mix(in srgb, var(--glw-accent) 55%, transparent);
}

.glw__label { margin: 0; font-weight: 600; }
.glw__hint { margin: 0; font-size: 0.86em; color: var(--text-muted, #888); }
.glw__input { display: none; }

.glw__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.glw__list[hidden] { display: none; }
.glw__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 11px 9px 13px;
  border: 1px solid var(--glw-border);
  border-radius: var(--glw-r);
  background: var(--glw-bg);
  overflow: hidden;
}
.glw__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--glw-accent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--glw-accent) 70%, transparent);
}
.glw__thumb {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  overflow: hidden;
  background: color-mix(in srgb, var(--glw-accent) 12%, transparent);
  color: var(--glw-accent);
}
.glw__thumb svg { width: 18px; height: 18px; }
.glw__thumb img { width: 100%; height: 100%; object-fit: cover; }
.glw__meta { flex: 1; min-width: 0; display: grid; gap: 2px; }
.glw__name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.88em; font-weight: 500; }
.glw__size { font-size: 0.76em; color: var(--text-muted, #888); }
.glw__x {
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
.glw__x svg { width: 15px; height: 15px; }
.glw__x:hover { color: var(--glw-accent); background: color-mix(in srgb, var(--glw-accent) 14%, transparent); }

.glw.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .glw__frame::before { animation: none; }
  .glw__zone, .glw__icon { transition: background-color 200ms ease; }
  .glw.is-dragging .glw__icon { transform: none; }
}
`,u="http://www.w3.org/2000/svg";function m(){const r=document.createElementNS(u,"svg");return r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true"),r}function c(r,t){const e=document.createElementNS(u,"path");if(e.setAttribute("d",r),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}function f(){const r=m();return r.append(c("M9 17V11L7 13"),c("M9 11L11 13"),c("M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"),c("M22 10H18C15 10 14 9 14 6V2L22 10Z")),r}function w(){const r=m(),t={"stroke-miterlimit":"10"};return r.append(c("M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z",t),c("M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5",t),c("M8 13H12",t),c("M8 17H16",t)),r}function v(){const r=m();return r.append(c("M6 6L18 18"),c("M18 6L6 18")),r}function x(r){return r<1024?`${r} B`:r<1024*1024?`${(r/1024).toFixed(1)} KB`:`${(r/1024/1024).toFixed(1)} MB`}let _=0,h;function y(r){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=r;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(r,t){const e=t?y(String(t).trim()):null;if(!e){for(const i of E)r.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),o=(i,g)=>r.style.setProperty(i,g);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,n);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,a?"0 0 0":"255 255 255");o("--vs-color",n),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class k extends HTMLElement{static observedAttributes=["label","hint","multiple","accept","max-size","disabled","speed","color"];#r;#l;#t;#a;#c;#d;#e;#s;#i=[];#n=new Map;#o=0;#h=!1;#u=()=>this.#A();#b=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.#A())};#f=t=>{this.hasAttribute("disabled")||(t.preventDefault(),this.#o++,this.#g(!0))};#w=t=>{this.hasAttribute("disabled")||t.preventDefault()};#v=()=>{this.hasAttribute("disabled")||(this.#o=Math.max(0,this.#o-1),this.#o===0&&this.#g(!1))};#x=t=>{if(this.hasAttribute("disabled"))return;t.preventDefault(),this.#o=0,this.#g(!1);const e=t.dataTransfer?.files;e&&e.length&&this.addFiles(Array.from(e))};#_=t=>{const e=t.target.files;e&&e.length&&this.addFiles(Array.from(e)),t.target.value=""};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#r=document.createElement("div"),this.#r.className="glw",this.#l=document.createElement("div"),this.#l.className="glw__frame",this.#t=document.createElement("div"),this.#t.className="glw__zone",this.#t.setAttribute("role","button"),this.#t.tabIndex=0,this.#a=document.createElement("span"),this.#a.className="glw__icon",this.#a.setAttribute("aria-hidden","true"),this.#a.appendChild(f()),this.#c=document.createElement("p"),this.#c.className="glw__label",this.#d=document.createElement("p"),this.#d.className="glw__hint",this.#e=document.createElement("input"),this.#e.type="file",this.#e.className="glw__input",this.#t.append(this.#a,this.#c,this.#d,this.#e),this.#l.appendChild(this.#t),this.#s=document.createElement("ul"),this.#s.className="glw__list",this.#s.hidden=!0,this.#r.append(this.#l,this.#s),t.append(e,this.#r),this.#t.addEventListener("click",this.#u),this.#t.addEventListener("keydown",this.#b),this.#t.addEventListener("dragenter",this.#f),this.#t.addEventListener("dragover",this.#w),this.#t.addEventListener("dragleave",this.#v),this.#t.addEventListener("drop",this.#x),this.#e.addEventListener("change",this.#_)}connectedCallback(){p(this,this.getAttribute("color")),this.#k()}disconnectedCallback(){this.#t.removeEventListener("click",this.#u),this.#t.removeEventListener("keydown",this.#b),this.#t.removeEventListener("dragenter",this.#f),this.#t.removeEventListener("dragover",this.#w),this.#t.removeEventListener("dragleave",this.#v),this.#t.removeEventListener("drop",this.#x),this.#e.removeEventListener("change",this.#_);for(const[t,e]of this.#n)e.removeBtn.removeEventListener("click",e.onRemove);this.#n.clear();for(const t of this.#i)t.url&&URL.revokeObjectURL(t.url)}attributeChangedCallback(t){p(this,this.getAttribute("color")),this.#r&&((t==="multiple"||t==="accept"||t==="disabled")&&this.#E(),this.#k())}get files(){return this.#i.map(t=>({...t}))}set files(t){this.clearAll(),Array.isArray(t)&&t.length&&this.addFiles(t)}addFiles(t){if(this.hasAttribute("disabled")||!t||!t.length)return;const s=this.#y(),d=s?t:t.slice(0,1);s||this.clearAll();const a=this.#C();for(const n of d){if(a>0&&n.size>a*1024*1024){this.dispatchEvent(new CustomEvent("error",{bubbles:!0,composed:!0,detail:{file:n,reason:"size",maxSize:a}}));continue}const l={id:++_,file:n,name:n.name,size:n.size,type:n.type,url:n.type&&n.type.startsWith("image/")?URL.createObjectURL(n):void 0};this.#i.push(l),this.#N(l)}this.#m(),this.#p()}removeFile(t){const e=this.#i.find(s=>s.id===t);e&&(e.url&&URL.revokeObjectURL(e.url),this.#i=this.#i.filter(s=>s.id!==t),this.#L(t),this.#m(),this.#p())}clearAll(){for(const t of this.#i)t.url&&URL.revokeObjectURL(t.url);this.#i=[];for(const t of Array.from(this.#n.keys()))this.#L(t);this.#m(),this.#p()}#y(){return this.hasAttribute("multiple")}#C(){const t=Number(this.getAttribute("max-size"));return Number.isFinite(t)?t:0}#z(){const t=Number(this.getAttribute("speed"));return Number.isFinite(t)&&t>0?t:6}#E(){this.#e.multiple=this.#y();const t=this.getAttribute("accept")||"";t?this.#e.setAttribute("accept",t):this.#e.removeAttribute("accept"),this.#e.disabled=this.hasAttribute("disabled")}#k(){const t=(a,n)=>this.getAttribute(a)??n,e=this.hasAttribute("disabled"),s=t("label","Beam files in"),d=t("hint","drag & drop or click to select");this.#r.className="glw"+(e?" is-disabled":"")+(this.#h?" is-dragging":""),this.#r.style.setProperty("--glw-speed",`${this.#z()}s`),this.#t.setAttribute("aria-disabled",e?"true":"false"),this.#t.setAttribute("aria-label",s),e?this.#t.removeAttribute("tabindex"):this.#t.tabIndex=0,this.#c.textContent=s,this.#d.textContent=d,this.#E()}#g(t){this.#h!==t&&(this.#h=t,this.#r.classList.toggle("is-dragging",t))}#A(){this.hasAttribute("disabled")||this.#e.click()}#m(){this.#s.hidden=this.#i.length===0}#N(t){const e=document.createElement("li");e.className="glw__item";const s=document.createElement("span");s.className="glw__thumb"+(t.url?" has-img":""),s.setAttribute("aria-hidden","true");const d=document.createElement("img"),a=w();t.url?(d.src=t.url,d.alt=t.name,a.style.display="none"):d.style.display="none",s.append(d,a);const n=document.createElement("div");n.className="glw__meta";const l=document.createElement("span");l.className="glw__name",l.textContent=t.name;const o=document.createElement("span");o.className="glw__size",o.textContent=x(t.size),n.append(l,o);const i=document.createElement("button");i.type="button",i.className="glw__x",i.setAttribute("aria-label","Remove file"),i.appendChild(v());const g=()=>this.removeFile(t.id);i.addEventListener("click",g),e.append(s,n,i),this.#s.appendChild(e),this.#n.set(t.id,{li:e,removeBtn:i,onRemove:g})}#L(t){const e=this.#n.get(t);e&&(e.removeBtn.removeEventListener("click",e.onRemove),this.#n.delete(t),e.li.remove())}#p(){this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}}))}}customElements.define("vs-upload-file-glow",k);
