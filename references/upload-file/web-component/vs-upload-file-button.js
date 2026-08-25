const u="http://www.w3.org/2000/svg";function h(n){const t=document.createElementNS(u,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none");for(const e of n){const i=document.createElementNS(u,"path");i.setAttribute("d",e.d),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),e.miter&&i.setAttribute("stroke-miterlimit",e.miter),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),t.appendChild(i)}return t}const m=()=>h([{d:"M9 17V11L7 13"},{d:"M9 11L11 13"},{d:"M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"},{d:"M22 10H18C15 10 14 9 14 6V2L22 10Z"}]),g=()=>h([{d:"M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z",miter:"10"},{d:"M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5",miter:"10"},{d:"M8 13H12",miter:"10"},{d:"M8 17H16",miter:"10"}]),f=()=>h([{d:"M6 6L18 18"},{d:"M18 6L6 18"}]);function v(n){return n<1024?`${n} B`:n<1024*1024?`${(n/1024).toFixed(1)} KB`:`${(n/1024/1024).toFixed(1)} MB`}const _=`
  :host { display: block; }
  .btu {
    --btu-r: var(--ctrl-r-md, 12px);
    --btu-border: var(--inp-border, #2a2a2a);
    --btu-bg: var(--bg-card, #111);
    --btu-text: var(--text, #ededed);
    --btu-accent: var(--ui-accent, #ededed);
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    min-width: 17rem;
    color: var(--btu-text);
    font-family: inherit;
  }

  .btu__btn {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    min-height: var(--ctrl-h-md, 46px);
    padding: 12px 22px;
    border: 1px solid transparent;
    border-radius: 999px;
    background: var(--btu-accent);
    color: var(--ui-accent-fg, #0b0b0b);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 280ms ease, filter 200ms ease;
  }
  .btu__btn:hover { filter: brightness(1.06); box-shadow: 0 6px 20px color-mix(in srgb, var(--btu-accent) 40%, transparent); }
  .btu__btn:focus-visible { outline: none; box-shadow: 0 0 0 3px color-mix(in srgb, var(--btu-accent) 40%, transparent); }
  .btu__btn:active { transform: scale(0.98); }

  /* diagonal shine sweep on hover */
  .btu__shine {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.35) 50%, transparent 70%);
    transform: translateX(-120%);
    transition: transform 720ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .btu__btn:hover .btu__shine, .btu.is-dragging .btu__shine { transform: translateX(120%); }
  .btu.no-shine .btu__shine { display: none; }

  /* dragover: button swells + accent ring, label swap handled in JS */
  .btu.is-dragging .btu__btn {
    transform: scale(1.03);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--btu-accent) 26%, transparent),
                0 8px 26px color-mix(in srgb, var(--btu-accent) 45%, transparent);
  }

  .btu__ic { display: grid; place-items: center; transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  .btu__ic svg { width: 18px; height: 18px; }
  .btu.is-dragging .btu__ic { transform: translateY(-2px) scale(1.12); }
  .btu__txt { white-space: nowrap; }
  .btu__input { display: none; }

  .btu__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
  .btu__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 11px;
    border: 1px solid var(--btu-border);
    border-radius: var(--btu-r);
    background: var(--btu-bg);
  }
  .btu__thumb {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    overflow: hidden;
    background: color-mix(in srgb, var(--btu-accent) 12%, transparent);
    color: var(--btu-accent);
  }
  .btu__thumb svg { width: 18px; height: 18px; }
  .btu__thumb img { width: 100%; height: 100%; object-fit: cover; }
  .btu__meta { flex: 1; min-width: 0; display: grid; gap: 2px; }
  .btu__name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.88em; font-weight: 500; }
  .btu__size { font-size: 0.76em; color: var(--text-muted, #888); }
  .btu__x {
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
  .btu__x svg { width: 15px; height: 15px; }
  .btu__x:hover { color: var(--btu-accent); background: color-mix(in srgb, var(--btu-accent) 14%, transparent); }

  .btu.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .btu__btn, .btu__shine, .btu__ic { transition: none; }
    .btu__btn:hover .btu__shine, .btu.is-dragging .btu__shine { transform: translateX(-120%); }
    .btu.is-dragging .btu__btn, .btu.is-dragging .btu__ic { transform: none; }
  }
`;let d;function x(n){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=n;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(n,t){const e=t?x(String(t).trim()):null;if(!e){for(const s of E)n.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),a=(s,p)=>n.style.setProperty(s,p);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,c);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,o?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["label","drop-label","multiple","accept","max-size","disabled","shine","color"];#r;#t;#c;#a;#d;#e;#n;#i=[];#E=0;#o=0;#s=!1;#h;#u;#b;#p;#m;#g;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=_,this.#r=document.createElement("div"),this.#r.className="btu",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="btu__btn",this.#c=document.createElement("span"),this.#c.className="btu__shine",this.#c.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="btu__ic",this.#a.setAttribute("aria-hidden","true"),this.#a.appendChild(m()),this.#d=document.createElement("span"),this.#d.className="btu__txt",this.#e=document.createElement("input"),this.#e.type="file",this.#e.className="btu__input",this.#t.append(this.#c,this.#a,this.#d,this.#e),this.#n=document.createElement("ul"),this.#n.className="btu__list",this.#r.appendChild(this.#t),t.append(e,this.#r),this.#h=()=>{this.hasAttribute("disabled")||this.#e.click()},this.#u=i=>this.#y(i),this.#b=i=>{this.hasAttribute("disabled")||i.preventDefault()},this.#p=()=>this.#w(),this.#m=i=>this.#C(i),this.#g=i=>this.#A(i),this.#t.addEventListener("click",this.#h),this.#t.addEventListener("dragenter",this.#u),this.#t.addEventListener("dragover",this.#b),this.#t.addEventListener("dragleave",this.#p),this.#t.addEventListener("drop",this.#m),this.#e.addEventListener("change",this.#g)}connectedCallback(){b(this,this.getAttribute("color")),this.#l()}disconnectedCallback(){this.#t.removeEventListener("click",this.#h),this.#t.removeEventListener("dragenter",this.#u),this.#t.removeEventListener("dragover",this.#b),this.#t.removeEventListener("dragleave",this.#p),this.#t.removeEventListener("drop",this.#m),this.#e.removeEventListener("change",this.#g);for(const t of this.#i)t.url&&URL.revokeObjectURL(t.url)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#r&&this.#l()}get files(){return this.#i.map(t=>t.file)}#f(t,e){return this.getAttribute(t)??e}#v(t,e){const i=this.getAttribute(t);return i===null?e:i!=="false"}#l(){const t=this.hasAttribute("disabled"),e=this.#v("shine",!0),i=this.#f("label","Upload files"),r=this.#f("drop-label","Drop to upload"),o=this.#v("multiple",!0),c=this.#f("accept","");this.#r.className=`btu${t?" is-disabled":""}${this.#s?" is-dragging":""}${e?"":" no-shine"}`,this.#t.disabled=t,t?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#t.setAttribute("aria-label",this.#s?r:i),this.#d.textContent=this.#s?r:i,this.#e.multiple=o,c?this.#e.setAttribute("accept",c):this.#e.removeAttribute("accept"),this.#e.disabled=t}#y(t){this.hasAttribute("disabled")||(t.preventDefault(),this.#o++,this.#s||(this.#s=!0,this.#l()))}#w(){this.hasAttribute("disabled")||(this.#o=Math.max(0,this.#o-1),this.#o===0&&this.#s&&(this.#s=!1,this.#l()))}#C(t){if(this.hasAttribute("disabled"))return;t.preventDefault(),this.#o=0,this.#s&&(this.#s=!1,this.#l());const e=t.dataTransfer?.files;e&&this.#_(Array.from(e))}#A(t){const e=t.target.files;e&&this.#_(Array.from(e)),t.target.value=""}#_(t){if(this.hasAttribute("disabled")||!t.length)return;const e=this.#v("multiple",!0),i=e?t:t.slice(0,1);if(!e){for(const r of this.#i)r.url&&URL.revokeObjectURL(r.url);this.#i=[]}for(const r of i)this.#i.push({id:++this.#E,file:r,name:r.name,size:r.size,type:r.type,url:r.type.startsWith("image/")?URL.createObjectURL(r):void 0});this.#x(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}}))}#L(t){const e=this.#i.find(i=>i.id===t);e?.url&&URL.revokeObjectURL(e.url),this.#i=this.#i.filter(i=>i.id!==t),this.#x(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}}))}#x(){if(!this.#i.length){this.#n.remove(),this.#n.replaceChildren();return}const t=this.#i.map(e=>this.#k(e));this.#n.replaceChildren(...t),this.#n.isConnected||this.#r.appendChild(this.#n)}#k(t){const e=document.createElement("li");e.className="btu__item";const i=document.createElement("span");if(i.className=`btu__thumb${t.url?" has-img":""}`,i.setAttribute("aria-hidden","true"),t.url){const a=document.createElement("img");a.src=t.url,a.alt=t.name,i.appendChild(a)}else i.appendChild(g());const r=document.createElement("div");r.className="btu__meta";const o=document.createElement("span");o.className="btu__name",o.textContent=t.name;const c=document.createElement("span");c.className="btu__size",c.textContent=v(t.size),r.append(o,c);const l=document.createElement("button");return l.type="button",l.className="btu__x",l.setAttribute("aria-label","Remove file"),l.appendChild(f()),l.addEventListener("click",()=>this.#L(t.id)),e.append(i,r,l),e}}customElements.define("vs-upload-file-button",y);
