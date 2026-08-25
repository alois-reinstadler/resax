const u=`
  :host { display: block; width: 100%; }
  .vslg {
    --accent: var(--inp-accent, var(--ui-accent, #ededed));
    position: relative;
    isolation: isolate;
    width: 100%;
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--vslg-radius, 12px);
    overflow: hidden;
  }
  .vslg--plain { border: none; background: transparent; border-radius: 0; }
  .vslg--r-none { --vslg-radius: 0px; }
  .vslg--r-subtle { --vslg-radius: 8px; }
  .vslg--r-rounded { --vslg-radius: var(--ctrl-radius, 12px); }
  .vslg--r-pill { --vslg-radius: 26px; }
  @supports (corner-shape: squircle) { .vslg--r-squircle { corner-shape: squircle; --vslg-radius: 22px; } }

  .vslg-row {
    position: relative;
    isolation: isolate;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: var(--vslg-py, 14px) var(--vslg-px, 16px);
    color: var(--text, #ededed);
    cursor: pointer;
    outline: none;
  }
  .vslg-row + .vslg-row { border-top: 1px solid var(--border, #2a2a2a); }

  /* halo: radial gradient tracking the cursor (--gx/--gy), intensity --glow */
  .vslg-halo {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: var(--glow, 0);
    background: radial-gradient(
      var(--vslg-r, 160px) circle at var(--gx, 50%) var(--gy, 50%),
      color-mix(in srgb, var(--accent) 30%, transparent),
      transparent 70%
    );
    transition: opacity 220ms ease;
  }
  .vslg-row:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.03)); }
  .vslg-row.is-selected { background: color-mix(in srgb, var(--accent) 14%, transparent); }
  .vslg-row.is-active { box-shadow: inset 3px 0 0 var(--accent); }
  .vslg-row:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
  .vslg-row.is-disabled { opacity: 0.5; cursor: default; pointer-events: none; }

  .vslg--sm .vslg-row { --vslg-py: 10px; --vslg-px: 12px; }
  .vslg--lg .vslg-row { --vslg-py: 18px; --vslg-px: 20px; }

  .vslg-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .vslg-title { font-size: var(--vslg-fs, 14px); font-weight: 560; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vslg--sm .vslg-title { --vslg-fs: 13px; }
  .vslg--lg .vslg-title { --vslg-fs: 15px; }
  .vslg-subtitle { font-size: 12.5px; color: var(--text-secondary, #a1a1a1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vslg-meta { flex: none; font-size: 12px; color: var(--text-muted, #666); }

  .vslg-empty { margin: 0; padding: 24px 16px; text-align: center; font-size: 13px; color: var(--text-muted, #666); }
  .vslg.is-disabled { opacity: 0.6; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vslg-halo { transition: none; }
  }
`,g=[{id:1,title:"Ada Lovelace",subtitle:"Track your order #4821",meta:"09:24"},{id:2,title:"Grace Hopper",subtitle:"Invoice ready for review",meta:"Yesterday"},{id:3,title:"Alan Turing",subtitle:"Commented on your proposal",meta:"Mon"},{id:4,title:"Katherine Johnson",subtitle:"New connection accepted",meta:"Mon"}];let c;function h(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(a,t){const e=t?h(String(t).trim()):null;if(!e){for(const r of b)a.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),l=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,i=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(r=>Math.round(l?r*.92:r+(255-r)*.16)),o=(r,v)=>a.style.setProperty(r,v);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,i);o("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,l?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,l?"0 0 0":"255 255 255");o("--vs-color",i),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["size","radius","variant","disabled","glow-size","select","active","color"];#t;#l=g;#r=[];#s=null;#e=null;#i=0;#a=0;#c=0;#n=()=>{this.#e=null};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.className="vslg",this.#t.setAttribute("role","list"),t.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#p(),this.#d(),this.#o(),window.addEventListener("scroll",this.#n,{passive:!0,capture:!0}),window.addEventListener("resize",this.#n,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this.#n,{capture:!0}),window.removeEventListener("resize",this.#n),this.#i&&cancelAnimationFrame(this.#i),this.#i=0,this.#s=null,this.#e=null}attributeChangedCallback(t){if(p(this,this.getAttribute("color")),!!this.#t){if(t==="select"||t==="active"){this.#o();return}this.#d()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#l=e&&e.length?e:g,this.#t&&(this.#p(),this.#o())}get items(){return this.#l}get select(){return this.getAttribute("select")}set select(t){t==null?this.removeAttribute("select"):this.setAttribute("select",String(t))}get active(){return this.getAttribute("active")}set active(t){t==null?this.removeAttribute("active"):this.setAttribute("active",String(t))}#d(){const t=(n,l)=>this.getAttribute(n)??l,e=this.hasAttribute("disabled");this.#t.className=`vslg vslg--${t("size","md")} vslg--r-${t("radius","rounded")} vslg--${t("variant","inset")}`+(e?" is-disabled":"");let s=Number(t("glow-size","160"));Number.isFinite(s)||(s=160),this.#t.style.setProperty("--vslg-r",`${s}px`)}#o(){const t=this.getAttribute("select"),e=this.getAttribute("active");for(const{el:s,item:n}of this.#r)s.classList.toggle("is-selected",this.#g(t,n.id)),s.classList.toggle("is-active",this.#g(e,n.id)),s.classList.toggle("is-disabled",!!n.disabled)}#g(t,e){return t!=null&&e!=null&&String(t)===String(e)}#p(){this.#t.replaceChildren(),this.#r=[],this.#s=null,this.#e=null;for(const t of this.#l){const e=document.createElement("div");e.className="vslg-row",e.setAttribute("role","listitem"),e.tabIndex=0;const s=document.createElement("span");s.className="vslg-halo",s.setAttribute("aria-hidden","true"),e.appendChild(s);const n=document.createElement("div");n.className="vslg-text";const l=document.createElement("span");if(l.className="vslg-title",l.textContent=t.title??"",n.appendChild(l),t.subtitle){const i=document.createElement("span");i.className="vslg-subtitle",i.textContent=t.subtitle,n.appendChild(i)}if(e.appendChild(n),t.meta){const i=document.createElement("span");i.className="vslg-meta",i.textContent=t.meta,e.appendChild(i)}e.addEventListener("pointerenter",i=>this.#u(i,t)),e.addEventListener("pointermove",i=>this.#h(i,t)),e.addEventListener("pointerleave",i=>this.#m(i)),e.addEventListener("click",()=>this.#v(t)),e.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),this.#v(t))}),this.#t.appendChild(e),this.#r.push({el:e,item:t})}if(!this.#r.length){const t=document.createElement("p");t.className="vslg-empty",t.textContent="No items.",this.#t.appendChild(t)}}#u(t,e){this.hasAttribute("disabled")||e.disabled||(this.#s=t.currentTarget,this.#e=this.#s.getBoundingClientRect())}#h(t,e){if(this.hasAttribute("disabled")||e.disabled)return;const s=t.currentTarget;s!==this.#s&&(this.#s=s,this.#e=null),this.#a=t.clientX,this.#c=t.clientY,this.#i||(this.#i=requestAnimationFrame(()=>this.#b()))}#b(){this.#i=0;const t=this.#s;t&&(this.#e||(this.#e=t.getBoundingClientRect()),t.style.setProperty("--gx",`${this.#a-this.#e.left}px`),t.style.setProperty("--gy",`${this.#c-this.#e.top}px`),t.style.setProperty("--glow","1"))}#m(t){const e=t.currentTarget;e.style.setProperty("--glow","0"),e===this.#s&&(this.#s=null,this.#e=null)}#v(t){this.hasAttribute("disabled")||t.disabled||this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t}}))}}customElements.define("vs-list-glow",m);
