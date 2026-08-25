const u="http://www.w3.org/2000/svg",f=`
:host { display: block; width: 100%; }
.gal {
  --gal-r: var(--ctrl-r-md, 12px);
  --gal-tile: 96px;
  --gal-border: var(--inp-border, #2a2a2a);
  --gal-bg: var(--bg-card, #111);
  --gal-text: var(--text, #ededed);
  --gal-accent: var(--ui-accent, #ededed);
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* 14px of padding and the dashed border have to live inside the 100%: as a
     content-box the dropzone was 30px wider than its column at every width, and
     the 17rem floor made it worse the narrower the column got. */
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  border: 1px dashed var(--gal-border);
  border-radius: calc(var(--gal-r) * 1.3);
  background: color-mix(in srgb, var(--gal-bg) 40%, transparent);
  color: var(--gal-text);
  font-family: inherit;
  transition: border-color 220ms ease, background-color 220ms ease;
}
.gal.is-dragging { border-color: var(--gal-accent); background: color-mix(in srgb, var(--gal-accent) 8%, transparent); }

.gal__head { display: flex; align-items: baseline; gap: 8px; }
.gal__label { font-weight: 600; font-size: 0.94em; }
.gal__hint { font-size: 0.8em; color: var(--text-muted, #888); }

.gal__grid {
  display: grid;
  /* min() so a column narrower than one tile collapses to a single stretched
     tile instead of pushing the track past the dropzone */
  grid-template-columns: repeat(auto-fill, minmax(min(var(--gal-tile), 100%), 1fr));
  gap: 10px;
}

.gal__tile,
.gal__add {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--gal-r);
  overflow: hidden;
}

.gal__tile {
  border: 1px solid var(--gal-border);
  background: var(--gal-bg);
}
.gal.is-dragging .gal__tile { border-color: color-mix(in srgb, var(--gal-accent) 40%, var(--gal-border)); }

.gal__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.gal__doc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  color: var(--text-secondary, #aaa);
}
.gal__doc svg { width: 26px; height: 26px; }
.gal__ext { font-size: 0.68em; font-weight: 600; letter-spacing: 0.04em; color: var(--text-muted, #888); }

.gal__cap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  gap: 1px;
  padding: 14px 8px 6px;
  background: linear-gradient(to top, color-mix(in srgb, #000 82%, transparent), transparent);
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 200ms ease, transform 200ms ease;
}
.gal__tile:hover .gal__cap, .gal__tile:focus-within .gal__cap { opacity: 1; transform: translateY(0); }
.gal__cap-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.7em; font-weight: 500; color: #fff; }
.gal__cap-size { font-size: 0.64em; color: rgba(255, 255, 255, 0.7); }

.gal__x {
  position: absolute;
  top: 6px;
  right: 6px;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: color-mix(in srgb, #000 55%, transparent);
  color: #fff;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 180ms ease, transform 180ms ease, background-color 160ms ease;
}
.gal__x svg { width: 12px; height: 12px; }
.gal__tile:hover .gal__x, .gal__tile:focus-within .gal__x { opacity: 1; transform: scale(1); }
.gal__x:hover { background: var(--gal-accent); }

.gal__add {
  display: grid;
  place-items: center;
  border: 1.5px dashed var(--gal-border);
  background: none;
  color: var(--text-muted, #888);
  cursor: pointer;
  transition: border-color 200ms ease, color 200ms ease, background-color 200ms ease;
}
.gal__add:hover, .gal__add:focus-visible {
  outline: none;
  border-color: var(--gal-accent);
  color: var(--gal-accent);
  background: color-mix(in srgb, var(--gal-accent) 8%, transparent);
}
.gal__add[hidden] { display: none; }
.gal__plus { display: grid; place-items: center; transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.gal__plus svg { width: 24px; height: 24px; }
.gal__add:hover .gal__plus { transform: rotate(90deg); }

.gal__input { display: none; }
.gal.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .gal, .gal__tile, .gal__cap, .gal__x, .gal__add, .gal__plus { transition: none; }
  .gal__add:hover .gal__plus { transform: none; }
}
`;function p(){const i=document.createElementNS(u,"svg");return i.setAttribute("viewBox","0 0 24 24"),i.setAttribute("fill","none"),i.setAttribute("aria-hidden","true"),i}function d(i,t){const e=document.createElementNS(u,"path");if(e.setAttribute("d",i),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const a in t)e.setAttribute(a,t[a]);return e}function b(){const i=p(),t={"stroke-miterlimit":"10"};return i.append(d("M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z",t),d("M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5",t),d("M8 13H12",t),d("M8 17H16",t)),i}function _(){const i=p();return i.append(d("M6 6L18 18"),d("M18 6L6 18")),i}function v(){const i=p();return i.append(d("M6 12H18"),d("M12 18V6")),i}function x(i){return i<1024?`${i} B`:i<1024*1024?`${(i/1024).toFixed(1)} KB`:`${(i/1024/1024).toFixed(1)} MB`}function y(i){const t=i.lastIndexOf(".");return t>-1?i.slice(t+1).toUpperCase():"FILE"}let E=0,g;function k(i){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=i;const t=g.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const A=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(i,t){const e=t?k(String(t).trim()):null;if(!e){for(const r of A)i.style.removeProperty(r);return}const a=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),n=(r,h)=>i.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,s);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,o?"0 0 0":"255 255 255");n("--vs-color",s),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["label","hint","multiple","accept","max-size","disabled","tile-size","color"];#t;#l;#c;#s;#e;#n;#i;#a=[];#r=new Map;#o=0;#h=!1;#m=t=>{this.hasAttribute("disabled")||(t.preventDefault(),this.#o++,this.#p(!0))};#u=t=>{this.hasAttribute("disabled")||t.preventDefault()};#f=()=>{this.hasAttribute("disabled")||(this.#o=Math.max(0,this.#o-1),this.#o===0&&this.#p(!1))};#b=t=>{if(this.hasAttribute("disabled"))return;t.preventDefault(),this.#o=0,this.#p(!1);const e=t.dataTransfer?.files;e&&e.length&&this.addFiles(Array.from(e))};#_=()=>this.#w();#v=t=>{const e=t.target.files;e&&e.length&&this.addFiles(Array.from(e)),t.target.value=""};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("div"),this.#t.className="gal",this.#t.addEventListener("dragenter",this.#m),this.#t.addEventListener("dragover",this.#u),this.#t.addEventListener("dragleave",this.#f),this.#t.addEventListener("drop",this.#b);const a=document.createElement("div");a.className="gal__head",this.#l=document.createElement("span"),this.#l.className="gal__label",this.#c=document.createElement("span"),this.#c.className="gal__hint",a.append(this.#l,this.#c),this.#s=document.createElement("div"),this.#s.className="gal__grid",this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="gal__add",this.#n=document.createElement("span"),this.#n.className="gal__plus",this.#n.setAttribute("aria-hidden","true"),this.#n.appendChild(v()),this.#e.appendChild(this.#n),this.#e.addEventListener("click",this.#_),this.#s.appendChild(this.#e),this.#i=document.createElement("input"),this.#i.type="file",this.#i.className="gal__input",this.#i.addEventListener("change",this.#v),this.#t.append(a,this.#s,this.#i),t.append(e,this.#t)}connectedCallback(){m(this,this.getAttribute("color")),this.#y()}disconnectedCallback(){this.#t.removeEventListener("dragenter",this.#m),this.#t.removeEventListener("dragover",this.#u),this.#t.removeEventListener("dragleave",this.#f),this.#t.removeEventListener("drop",this.#b),this.#e.removeEventListener("click",this.#_),this.#i.removeEventListener("change",this.#v);for(const[t,e]of this.#r)e.xBtn.removeEventListener("click",e.onRemove);this.#r.clear();for(const t of this.#a)t.url&&URL.revokeObjectURL(t.url)}attributeChangedCallback(t){m(this,this.getAttribute("color")),this.#t&&((t==="multiple"||t==="accept"||t==="disabled")&&this.#x(),this.#y())}get files(){return this.#a.map(t=>({...t}))}addFiles(t){if(this.hasAttribute("disabled")||!t||!t.length)return;const a=this.#g(),l=a?t:t.slice(0,1);a||this.clearAll();const o=this.#A();for(const s of l){if(o>0&&s.size>o*1024*1024){this.dispatchEvent(new CustomEvent("error",{bubbles:!0,composed:!0,detail:{file:s,reason:"size",maxSize:o}}));continue}const c={id:++E,name:s.name,size:s.size,type:s.type,ext:y(s.name),url:s.type&&s.type.startsWith("image/")?URL.createObjectURL(s):void 0};this.#a.push(c),this.#C(c)}this.#d(),this.#k()}removeFile(t){const e=this.#a.find(a=>a.id===t);e&&(e.url&&URL.revokeObjectURL(e.url),this.#a=this.#a.filter(a=>a.id!==t),this.#E(t),this.#d(),this.#k())}clearAll(){for(const t of this.#a)t.url&&URL.revokeObjectURL(t.url);this.#a=[];for(const t of Array.from(this.#r.keys()))this.#E(t);this.#d()}#g(){return this.hasAttribute("multiple")}#A(){const t=Number(this.getAttribute("max-size"));return Number.isFinite(t)?t:0}#x(){this.#i.multiple=this.#g();const t=this.getAttribute("accept")||"";t?this.#i.setAttribute("accept",t):this.#i.removeAttribute("accept");const e=this.hasAttribute("disabled");this.#i.disabled=e,this.#e.disabled=e}#y(){const t=(a,l)=>this.getAttribute(a)??l,e=this.hasAttribute("disabled");this.#t.className="gal"+(e?" is-disabled":"")+(this.#h?" is-dragging":""),this.#t.style.setProperty("--gal-tile",`${Number(t("tile-size",96))||96}px`),this.#l.textContent=t("label","Add media"),this.#c.textContent=t("hint","drop or click a tile"),this.#e.setAttribute("aria-label",t("label","Add media")),this.#x(),this.#d()}#p(t){this.#h!==t&&(this.#h=t,this.#t.classList.toggle("is-dragging",t))}#w(){this.hasAttribute("disabled")||this.#i.click()}#d(){const t=this.#g()||this.#a.length===0;this.#e.hidden=!t}#C(t){const e=document.createElement("div");e.className="gal__tile";let a,l;if(t.url)a=document.createElement("img"),a.className="gal__img",a.src=t.url,a.alt=t.name,e.appendChild(a);else{l=document.createElement("div"),l.className="gal__doc",l.setAttribute("aria-hidden","true");const h=document.createElement("span");h.className="gal__ext",h.textContent=t.ext,l.append(b(),h),e.appendChild(l)}const o=document.createElement("span");o.className="gal__cap";const s=document.createElement("span");s.className="gal__cap-name",s.textContent=t.name;const c=document.createElement("span");c.className="gal__cap-size",c.textContent=x(t.size),o.append(s,c);const n=document.createElement("button");n.type="button",n.className="gal__x",n.setAttribute("aria-label","Remove file"),n.appendChild(_());const r=()=>this.removeFile(t.id);n.addEventListener("click",r),e.append(o,n),this.#s.insertBefore(e,this.#e),this.#r.set(t.id,{tile:e,img:a,doc:l,xBtn:n,onRemove:r})}#E(t){const e=this.#r.get(t);e&&(e.xBtn.removeEventListener("click",e.onRemove),this.#r.delete(t),e.tile.remove())}#k(){this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}}))}}customElements.define("vs-upload-file-gallery",w);
