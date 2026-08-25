const d="http://www.w3.org/2000/svg",b=`
:host { display: block; }
.cmp {
  --cmp-r: var(--ctrl-r-md, 12px);
  --cmp-h: var(--ctrl-h-md, 44px);
  --cmp-border: var(--inp-border, #2a2a2a);
  --cmp-bg: var(--bg-card, #111);
  --cmp-text: var(--text, #ededed);
  --cmp-accent: var(--ui-accent, #ededed);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 17rem;
  color: var(--cmp-text);
  font-family: inherit;
}

.cmp__bar {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: var(--cmp-h);
  padding: 8px 8px 8px 14px;
  border: 1px solid var(--cmp-border);
  border-radius: var(--cmp-r);
  background: var(--cmp-bg);
  cursor: pointer;
  transition: border-color 200ms ease, background-color 200ms ease;
}
.cmp__bar:hover, .cmp__bar:focus-visible { outline: none; border-color: color-mix(in srgb, var(--cmp-accent) 45%, var(--cmp-border)); }

.cmp__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  color: var(--cmp-accent);
}
.cmp__icon svg { width: 18px; height: 18px; }

.cmp__text { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 7px; overflow: hidden; }
.cmp__label { font-weight: 500; font-size: 0.92em; white-space: nowrap; }
.cmp__hint { font-size: 0.78em; color: var(--text-muted, #888); white-space: nowrap; }

.cmp__chip {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: calc(var(--cmp-r) * 0.7);
  background: color-mix(in srgb, var(--cmp-accent) 16%, transparent);
  color: var(--cmp-accent);
  font-size: 0.82em;
  font-weight: 600;
  transition: background-color 180ms ease;
}
.cmp__bar:hover .cmp__chip { background: color-mix(in srgb, var(--cmp-accent) 26%, transparent); }

/* dragover: accent underline slides in from the left */
.cmp__underline {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: var(--cmp-accent);
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cmp.is-dragging .cmp__bar { border-color: var(--cmp-accent); background: color-mix(in srgb, var(--cmp-accent) 8%, var(--cmp-bg)); }
.cmp.is-dragging .cmp__underline { transform: scaleX(1); }

.cmp__input { display: none; }

.cmp__pills { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 7px; }
.cmp__pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  padding: 5px 6px 5px 11px;
  border: 1px solid var(--cmp-border);
  border-radius: 999px;
  background: color-mix(in srgb, var(--cmp-bg) 70%, transparent);
  font-size: 0.8em;
}
.cmp__pill-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 12rem; font-weight: 500; }
.cmp__pill-size { flex-shrink: 0; color: var(--text-muted, #888); font-size: 0.9em; }
.cmp__pill-x {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: none;
  color: var(--text-muted, #888);
  cursor: pointer;
  transition: color 150ms ease, background-color 150ms ease;
}
.cmp__pill-x svg { width: 11px; height: 11px; }
.cmp__pill-x:hover { color: var(--cmp-accent); background: color-mix(in srgb, var(--cmp-accent) 16%, transparent); }

.cmp.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .cmp__bar, .cmp__chip, .cmp__underline, .cmp__pill-x { transition: none; }
  .cmp__underline { transition: none; }
}
`;function h(n){const t=document.createElementNS(d,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of n){const i=document.createElementNS(d,"path");i.setAttribute("d",e),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),t.appendChild(i)}return t}function f(n){return n<1024?`${n} B`:n<1024*1024?`${(n/1024).toFixed(1)} KB`:`${(n/1024/1024).toFixed(1)} MB`}let l;function g(n){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=n;const t=l.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(n,t){const e=t?g(String(t).trim()):null;if(!e){for(const r of v)n.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,p=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(r=>Math.round(s?r*.92:r+(255-r)*.16)),c=(r,u)=>n.style.setProperty(r,u);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(r,p);c("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(r,s?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])c(r,s?"0 0 0":"255 255 255");c("--vs-color",p),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["label","hint","multiple","accept","max-size","disabled","browse-text","color"];#r;#t;#s;#o;#l;#p;#d;#e;#n;#i=[];#b=0;#a=0;#h=!1;#f=()=>this.#m();#g=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.#m())};#v=t=>this.#L(t);#x=t=>{this.hasAttribute("disabled")||t.preventDefault()};#_=()=>this.#N();#E=t=>this.#z(t);#w=t=>this.#k(t);constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#r=document.createElement("div"),this.#r.className="cmp",this.#t=document.createElement("div"),this.#t.className="cmp__bar",this.#t.setAttribute("role","button"),this.#t.tabIndex=0,this.#s=document.createElement("span"),this.#s.className="cmp__icon",this.#s.setAttribute("aria-hidden","true"),this.#s.appendChild(h(["M12.3301 12.1499L9.86005 14.6199C8.49005 15.9899 8.49005 18.1999 9.86005 19.5699C11.2301 20.9399 13.4401 20.9399 14.8101 19.5699L18.7001 15.6799C21.4301 12.9499 21.4301 8.50992 18.7001 5.77992C15.9701 3.04992 11.5301 3.04992 8.80005 5.77992L4.56005 10.0199C2.22005 12.3599 2.22005 16.1599 4.56005 18.5099"]));const i=document.createElement("span");i.className="cmp__text",this.#o=document.createElement("span"),this.#o.className="cmp__label",this.#l=document.createElement("span"),this.#l.className="cmp__hint",i.append(this.#o,this.#l),this.#p=document.createElement("span"),this.#p.className="cmp__chip",this.#d=document.createElement("span"),this.#d.className="cmp__underline",this.#d.setAttribute("aria-hidden","true"),this.#e=document.createElement("input"),this.#e.className="cmp__input",this.#e.type="file",this.#t.append(this.#s,i,this.#p,this.#d,this.#e),this.#n=document.createElement("ul"),this.#n.className="cmp__pills",this.#r.append(this.#t,this.#n),t.append(e,this.#r),this.#t.addEventListener("click",this.#f),this.#t.addEventListener("keydown",this.#g),this.#t.addEventListener("dragenter",this.#v),this.#t.addEventListener("dragover",this.#x),this.#t.addEventListener("dragleave",this.#_),this.#t.addEventListener("drop",this.#E),this.#e.addEventListener("change",this.#w)}connectedCallback(){m(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){this.#t.removeEventListener("click",this.#f),this.#t.removeEventListener("keydown",this.#g),this.#t.removeEventListener("dragenter",this.#v),this.#t.removeEventListener("dragover",this.#x),this.#t.removeEventListener("dragleave",this.#_),this.#t.removeEventListener("drop",this.#E),this.#e.removeEventListener("change",this.#w)}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#e&&this.#c()}get files(){return this.#i.map(t=>t.file)}set files(t){const e=t?Array.from(t):[];this.#i=e.map(i=>({id:++this.#b,name:i.name,size:i.size,type:i.type,file:i})),this.#u()}openPicker(){this.#m()}#c(){const t=(c,r)=>this.getAttribute(c)??r,e=this.hasAttribute("disabled"),i=t("label","Attach files"),a=t("hint","drag here or"),s=t("browse-text","Browse");this.#r.className="cmp"+(e?" is-disabled":"")+(this.#h?" is-dragging":""),this.#t.setAttribute("aria-label",i),e?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#o.textContent=i,this.#l.textContent=a,this.#p.textContent=s;const p=this.hasAttribute("multiple");this.#e.multiple=p;const o=t("accept","");o?this.#e.setAttribute("accept",o):this.#e.removeAttribute("accept"),this.#e.disabled=e}#m(){this.hasAttribute("disabled")||this.#e.click()}#k(t){const e=t.target.files;e&&e.length&&this.#y(Array.from(e)),t.target.value=""}#y(t){if(this.hasAttribute("disabled")||!t.length)return;const e=this.hasAttribute("multiple"),i=e?t:t.slice(0,1);e||(this.#i=[]);const a=[];for(const s of i)this.#i.push({id:++this.#b,name:s.name,size:s.size,type:s.type,file:s}),a.push(s);a.length&&(this.#u(),this.dispatchEvent(new CustomEvent("add",{bubbles:!0,composed:!0,detail:{files:a}})),this.#A())}#C(t){this.#i=this.#i.filter(e=>e.id!==t),this.#u(),this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0,detail:{id:t}})),this.#A()}#A(){this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}}))}#u(){this.#n.textContent="";for(const t of this.#i){const e=document.createElement("li");e.className="cmp__pill";const i=document.createElement("span");i.className="cmp__pill-name",i.textContent=t.name;const a=document.createElement("span");a.className="cmp__pill-size",a.textContent=f(t.size);const s=document.createElement("button");s.type="button",s.className="cmp__pill-x",s.setAttribute("aria-label","Remove file"),s.appendChild(h(["M6 6L18 18","M18 6L6 18"])),s.addEventListener("click",()=>this.#C(t.id)),e.append(i,a,s),this.#n.appendChild(e)}}#L(t){this.hasAttribute("disabled")||(t.preventDefault(),this.#a++,this.#h=!0,this.#c())}#N(){this.hasAttribute("disabled")||(this.#a=Math.max(0,this.#a-1),this.#a===0&&(this.#h=!1,this.#c()))}#z(t){if(this.hasAttribute("disabled"))return;t.preventDefault(),this.#a=0,this.#h=!1,this.#c();const e=t.dataTransfer?.files;e&&this.#y(Array.from(e))}}customElements.define("vs-upload-file-compact",x);
