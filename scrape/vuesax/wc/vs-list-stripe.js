const u=[{id:1,title:"Ada Lovelace",subtitle:"Track your order #4821",meta:"09:24"},{id:2,title:"Grace Hopper",subtitle:"Invoice ready for review",meta:"Yesterday"},{id:3,title:"Alan Turing",subtitle:"Commented on your proposal",meta:"Mon"},{id:4,title:"Katherine Johnson",subtitle:"New connection accepted",meta:"Mon"}],h=`
  :host { display: block; }
  .vsls {
    --accent: var(--inp-accent, var(--ui-accent, #ededed));
    position: relative;
    isolation: isolate;
    width: 100%;
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--vsls-radius, 12px);
    overflow: hidden;
  }
  .vsls--plain { border: none; background: transparent; border-radius: 0; }
  .vsls--r-none { --vsls-radius: 0px; }
  .vsls--r-subtle { --vsls-radius: 8px; }
  .vsls--r-rounded { --vsls-radius: var(--ctrl-radius, 12px); }
  .vsls--r-pill { --vsls-radius: 26px; }
  @supports (corner-shape: squircle) { .vsls--r-squircle { corner-shape: squircle; --vsls-radius: 22px; } }

  /* sliding highlighter */
  .vsls-marker {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    background: color-mix(in srgb, var(--accent) 14%, transparent);
    border-left: 2px solid var(--accent);
    opacity: 0;
    transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
      height 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
  }
  .vsls-marker.is-on { opacity: 1; }

  .vsls-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: var(--vsls-py, 14px) var(--vsls-px, 16px);
    color: var(--text, #ededed);
    cursor: pointer;
    outline: none;
  }
  /* zebra: even rows tinted proportionally to --vsls-stripe */
  .vsls-row:nth-child(even) {
    background: rgba(255, 255, 255, calc(0.05 * var(--vsls-stripe)));
  }
  .vsls-row.is-selected { box-shadow: inset 2px 0 0 var(--accent); }
  .vsls-row.is-active { background: color-mix(in srgb, var(--accent) 12%, transparent); }
  .vsls-row:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
  .vsls-row.is-disabled { opacity: 0.5; cursor: default; pointer-events: none; }

  .vsls--sm .vsls-row { --vsls-py: 10px; --vsls-px: 12px; }
  .vsls--lg .vsls-row { --vsls-py: 18px; --vsls-px: 20px; }

  .vsls-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .vsls-title { font-size: var(--vsls-fs, 14px); font-weight: 560; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vsls--sm .vsls-title { --vsls-fs: 13px; }
  .vsls--lg .vsls-title { --vsls-fs: 15px; }
  .vsls-subtitle { font-size: 12.5px; color: var(--text-secondary, #a1a1a1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vsls-meta { flex: none; font-size: 12px; color: var(--text-muted, #666); }

  .vsls-empty { margin: 0; padding: 24px 16px; text-align: center; font-size: 13px; color: var(--text-muted, #666); }
  .vsls.is-disabled { opacity: 0.6; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vsls-marker { transition: opacity 180ms ease; }
  }
`;let d;function b(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,t){const e=t?b(String(t).trim()):null;if(!e){for(const i of m)c.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,r=e.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),a=(i,v)=>c.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,o);a("--btn-primary-bg-hover",`rgb(${r[0]} ${r[1]} ${r[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,n?"0 0 0":"255 255 255");a("--vs-color",o),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["select","active","size","radius","variant","disabled","stripe","color"];#t;#e;#i=null;#s=[];constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=h,this.#t=document.createElement("div"),this.#t.className="vsls",this.#t.setAttribute("role","list"),this.#e=document.createElement("span"),this.#e.className="vsls-marker",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e),t.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#a()}disconnectedCallback(){}attributeChangedCallback(t){if(p(this,this.getAttribute("color")),!!this.#t){if(t==="stripe"){this.#t.style.setProperty("--vsls-stripe",this.#r());return}if(t==="select"||t==="active"||t==="disabled"){this.#p();return}this.#l()}}set items(t){this.#i=Array.isArray(t)&&t.length?t:null,this.#t&&this.#a()}get items(){return this.#i??u}#r(){const t=Number(this.getAttribute("stripe"));return Number.isFinite(t)?t:.5}#n(){return this.hasAttribute("disabled")}#v(){return this.getAttribute("select")}#u(){return this.getAttribute("active")}#l(){const t=(e,s)=>this.getAttribute(e)??s;this.#t.className=`vsls vsls--${t("size","md")} vsls--r-${t("radius","rounded")} vsls--${t("variant","inset")}`+(this.#n()?" is-disabled":"")}#a(){for(;this.#t.lastChild!==this.#e;)this.#t.removeChild(this.#t.lastChild);this.#s=[],this.#l(),this.#t.style.setProperty("--vsls-stripe",this.#r());const t=this.items;if(t.forEach(e=>{const s=document.createElement("div");s.className="vsls-row",s.setAttribute("role","listitem"),s.setAttribute("tabindex","0");const l=document.createElement("div");l.className="vsls-text";const n=document.createElement("span");if(n.className="vsls-title",n.textContent=e.title??"",l.appendChild(n),e.subtitle){const r=document.createElement("span");r.className="vsls-subtitle",r.textContent=e.subtitle,l.appendChild(r)}if(s.appendChild(l),e.meta){const r=document.createElement("span");r.className="vsls-meta",r.textContent=e.meta,s.appendChild(r)}const o={el:s,item:e};this.#s.push(o),s.addEventListener("pointerenter",()=>this.#o(s)),s.addEventListener("pointerleave",()=>this.#c()),s.addEventListener("focus",()=>this.#o(s)),s.addEventListener("blur",()=>this.#c()),s.addEventListener("click",()=>this.#d(e)),s.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" "||r.key==="Spacebar")&&(r.preventDefault(),this.#d(e))}),this.#t.appendChild(s)}),!t.length){const e=document.createElement("p");e.className="vsls-empty",e.textContent="No items.",this.#t.appendChild(e)}this.#p()}#o(t){this.#e.style.transform=`translateY(${t.offsetTop}px)`,this.#e.style.height=`${t.offsetHeight}px`,this.#e.classList.add("is-on")}#c(){this.#e.classList.remove("is-on")}#d(t){this.#n()||t.disabled||this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t}}))}#p(){const t=this.#v(),e=this.#u();for(const{el:s,item:l}of this.#s){const n=l.id,o=t!=null&&String(t)===String(n),r=e!=null&&String(e)===String(n);s.classList.toggle("is-selected",o),s.classList.toggle("is-active",r),s.classList.toggle("is-disabled",!!l.disabled)}}}customElements.define("vs-list-stripe",f);
