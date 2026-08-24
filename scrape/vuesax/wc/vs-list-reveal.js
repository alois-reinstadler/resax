const h=`
  :host { display: block; }
  .vslr {
    --accent: var(--inp-accent, var(--ui-accent, #ededed));
    position: relative;
    width: 100%;
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--vslr-radius, 12px);
    overflow: hidden;
  }
  .vslr--plain { border: none; background: transparent; border-radius: 0; }
  .vslr--r-none { --vslr-radius: 0px; }
  .vslr--r-subtle { --vslr-radius: 8px; }
  .vslr--r-rounded { --vslr-radius: var(--ctrl-radius, 12px); }
  .vslr--r-pill { --vslr-radius: 26px; }
  @supports (corner-shape: squircle) { .vslr--r-squircle { corner-shape: squircle; --vslr-radius: 22px; } }

  .vslr-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: var(--vslr-py, 14px) var(--vslr-px, 16px);
    color: var(--text, #ededed);
    cursor: pointer;
    outline: none;
    /* initial state: hidden and shifted; revealed with the staggered delay */
    opacity: 0;
    transform: translateX(-14px);
    transition: opacity 420ms cubic-bezier(0.22, 1, 0.36, 1) var(--vslr-delay, 0ms),
      transform 420ms cubic-bezier(0.22, 1, 0.36, 1) var(--vslr-delay, 0ms),
      background 200ms ease;
  }
  .vslr.is-shown .vslr-row { opacity: 1; transform: translateX(0); }
  .vslr-row + .vslr-row { border-top: 1px solid var(--border, #2a2a2a); }
  .vslr-row:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.03)); }
  .vslr-row.is-selected { background: color-mix(in srgb, var(--accent) 14%, transparent); }
  .vslr-row.is-active { box-shadow: inset 3px 0 0 var(--accent); }
  .vslr-row:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
  .vslr-row.is-disabled { opacity: 0.5; cursor: default; pointer-events: none; }

  .vslr--sm .vslr-row { --vslr-py: 10px; --vslr-px: 12px; }
  .vslr--lg .vslr-row { --vslr-py: 18px; --vslr-px: 20px; }

  .vslr-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .vslr-title { font-size: var(--vslr-fs, 14px); font-weight: 560; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vslr--sm .vslr-title { --vslr-fs: 13px; }
  .vslr--lg .vslr-title { --vslr-fs: 15px; }
  .vslr-subtitle { font-size: 12.5px; color: var(--text-secondary, #a1a1a1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vslr-meta { flex: none; font-size: 12px; color: var(--text-muted, #666); }

  .vslr-empty { margin: 0; padding: 24px 16px; text-align: center; font-size: 13px; color: var(--text-muted, #666); }
  .vslr.is-disabled { opacity: 0.6; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vslr-row { opacity: 1; transform: none; transition: background 200ms ease; }
  }
`,v=[{id:1,title:"Ada Lovelace",subtitle:"Track your order #4821",meta:"09:24"},{id:2,title:"Grace Hopper",subtitle:"Invoice ready for review",meta:"Yesterday"},{id:3,title:"Alan Turing",subtitle:"Commented on your proposal",meta:"Mon"},{id:4,title:"Katherine Johnson",subtitle:"New connection accepted",meta:"Mon"}];let p;function m(d){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=d;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(d,e){const t=e?m(String(e).trim()):null;if(!t){for(const s of b)d.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),a=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,o=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(s=>Math.round(a?s*.92:s+(255-s)*.16)),l=(s,n)=>d.style.setProperty(s,n);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(s,o);l("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(s,a?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])l(s,a?"0 0 0":"255 255 255");l("--vs-color",o),l("--vs-color-rgb",t.join(" ")),l("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["select","active","size","radius","variant","disabled","stagger","color"];#t;#s=v;#r=[];#e=null;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=h,this.#t=document.createElement("div"),this.#t.setAttribute("role","list"),e.append(t,this.#t)}connectedCallback(){u(this,this.getAttribute("color")),this.#n(),this.#i(),this.#e=requestAnimationFrame(()=>{this.#e=null,this.#t.classList.add("is-shown")})}disconnectedCallback(){this.#e!=null&&(cancelAnimationFrame(this.#e),this.#e=null),this.#a()}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#t&&this.#i()}set items(e){let t=null;if(Array.isArray(e))t=e;else if(typeof e=="string"&&e.trim())try{const r=JSON.parse(e);Array.isArray(r)&&(t=r)}catch{}this.#s=t&&t.length?t:v,this.#t&&this.#n()}get items(){return this.#s}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#o(){const e=(t,r)=>this.getAttribute(t)??r;this.#t.className=`vslr vslr--${e("size","md")} vslr--r-${e("radius","rounded")} vslr--${e("variant","inset")}`+(this.hasAttribute("disabled")?" is-disabled":"")+(this.#t.classList.contains("is-shown")?" is-shown":"")}#i(){this.#o(),this.#l()}#n(){this.#a();const e=Number(this.getAttribute("stagger")??70)||0;if(!this.#s.length){const t=document.createElement("p");t.className="vslr-empty",t.textContent="No items.",this.#t.appendChild(t);return}this.#s.forEach((t,r)=>{const i=document.createElement("div");i.className="vslr-row",i.setAttribute("role","listitem"),i.tabIndex=0,i.style.setProperty("--vslr-delay",`${r*e}ms`);const a=document.createElement("div");a.className="vslr-text";const o=document.createElement("span");if(o.className="vslr-title",o.textContent=t.title??"",a.appendChild(o),t.subtitle){const n=document.createElement("span");n.className="vslr-subtitle",n.textContent=t.subtitle,a.appendChild(n)}if(i.appendChild(a),t.meta){const n=document.createElement("span");n.className="vslr-meta",n.textContent=t.meta,i.appendChild(n)}const c=()=>this.#c(t),l=()=>c(),s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),c())};i.addEventListener("click",l),i.addEventListener("keydown",s),this.#t.appendChild(i),this.#r.push({el:i,it:t,handler:l,keyHandler:s})}),this.#l()}#a(){this.#r.forEach(({el:e,handler:t,keyHandler:r})=>{e.removeEventListener("click",t),e.removeEventListener("keydown",r),e.remove()}),this.#r=[],this.#t.querySelectorAll(".vslr-empty").forEach(e=>e.remove())}#l(){const e=this.getAttribute("select"),t=this.getAttribute("active");this.#r.forEach(({el:r,it:i})=>{const a=String(i.id);r.classList.toggle("is-selected",e!=null&&e===a),r.classList.toggle("is-active",t!=null&&t===a),r.classList.toggle("is-disabled",!!i.disabled)})}#c(e){this.hasAttribute("disabled")||e.disabled||this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e}}))}}customElements.define("vs-list-reveal",f);
