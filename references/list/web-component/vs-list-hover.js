const h="http://www.w3.org/2000/svg";function u(){const n=document.createElementNS(h,"svg");n.setAttribute("class","vslh-chevron"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("aria-hidden","true");const t=document.createElementNS(h,"path");return t.setAttribute("d","M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),n.appendChild(t),n}const b=[{id:1,title:"Ada Lovelace",subtitle:"Track your order #4821",meta:"09:24"},{id:2,title:"Grace Hopper",subtitle:"Invoice ready for review",meta:"Yesterday"},{id:3,title:"Alan Turing",subtitle:"Commented on your proposal",meta:"Mon"},{id:4,title:"Katherine Johnson",subtitle:"New connection accepted",meta:"Mon"}],f=`
  :host { display: block; }
  .vslh {
    --accent: var(--inp-accent, var(--ui-accent, #ededed));
    position: relative;
    width: 100%;
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--vslh-radius, 12px);
    overflow: hidden;
  }
  .vslh--plain { border: none; background: transparent; border-radius: 0; }
  .vslh--r-none { --vslh-radius: 0px; }
  .vslh--r-subtle { --vslh-radius: 8px; }
  .vslh--r-rounded { --vslh-radius: var(--ctrl-radius, 12px); }
  .vslh--r-pill { --vslh-radius: 26px; }
  @supports (corner-shape: squircle) { .vslh--r-squircle { corner-shape: squircle; --vslh-radius: 22px; } }

  .vslh-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: var(--vslh-py, 14px) var(--vslh-px, 16px);
    color: var(--text, #ededed);
    cursor: pointer;
    outline: none;
    transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 260ms ease, opacity 200ms ease, background 200ms ease;
  }
  .vslh-row + .vslh-row { border-top: 1px solid var(--border, #2a2a2a); }
  .vslh-row.is-hover {
    z-index: 2;
    transform: translate3d(6px, calc(var(--vslh-lift) * -1), 0);
    background: var(--inp-hover-bg, rgba(255, 255, 255, 0.04));
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
  }
  .vslh-row.is-dim { opacity: 0.55; }
  .vslh-row.is-selected { background: color-mix(in srgb, var(--accent) 16%, transparent); }
  .vslh-row.is-active { box-shadow: inset 3px 0 0 var(--accent); }
  .vslh-row:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
  .vslh-row.is-disabled { opacity: 0.5; cursor: default; pointer-events: none; }

  .vslh--sm .vslh-row { --vslh-py: 10px; --vslh-px: 12px; }
  .vslh--lg .vslh-row { --vslh-py: 18px; --vslh-px: 20px; }

  .vslh-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .vslh-title { font-size: var(--vslh-fs, 14px); font-weight: 560; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vslh--sm .vslh-title { --vslh-fs: 13px; }
  .vslh--lg .vslh-title { --vslh-fs: 15px; }
  .vslh-subtitle { font-size: 12.5px; color: var(--text-secondary, #a1a1a1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vslh-meta { flex: none; font-size: 12px; color: var(--text-muted, #666); }
  .vslh-chevron { flex: none; width: 16px; height: 16px; color: var(--text-muted, #666); }

  .vslh-empty { margin: 0; padding: 24px 16px; text-align: center; font-size: 13px; color: var(--text-muted, #666); }
  .vslh.is-disabled { opacity: 0.6; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vslh-row { transition: background 200ms ease; }
    .vslh-row.is-hover { transform: none; }
  }
`;let d;function m(n){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=n;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(n,t){const e=t?m(String(t).trim()):null;if(!e){for(const i of g)n.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),l=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,r=e.map(i=>Math.round(l?i*.92:i+(255-i)*.16)),o=(i,v)=>n.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,c);o("--btn-primary-bg-hover",`rgb(${r[0]} ${r[1]} ${r[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,l?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,l?"0 0 0":"255 255 255");o("--vs-color",c),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["select","active","size","radius","variant","disabled","lift","color"];#t;#n=null;#i=[];#e=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("div"),this.#t.className="vslh",this.#t.setAttribute("role","list"),t.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){}attributeChangedCallback(t){if(p(this,this.getAttribute("color")),!!this.#t){if(t==="lift"){this.#t.style.setProperty("--vslh-lift",`${this.#l()}px`);return}if(t==="select"||t==="active"||t==="disabled"){this.#r();return}this.#a()}}set items(t){this.#n=Array.isArray(t)&&t.length?t:null,this.#t&&this.#c()}get items(){return this.#n??b}#l(){const t=Number(this.getAttribute("lift"));return Number.isFinite(t)?t:6}#o(){return this.hasAttribute("disabled")}#h(){return this.getAttribute("select")}#p(){return this.getAttribute("active")}#a(){const t=(e,s)=>this.getAttribute(e)??s;this.#t.className=`vslh vslh--${t("size","md")} vslh--r-${t("radius","rounded")} vslh--${t("variant","inset")}`+(this.#o()?" is-disabled":"")}#c(){this.#t.textContent="",this.#i=[],this.#a(),this.#t.style.setProperty("--vslh-lift",`${this.#l()}px`);const t=this.items;if(t.forEach(e=>{const s=document.createElement("div");s.className="vslh-row",s.setAttribute("role","listitem"),s.setAttribute("tabindex","0");const a=document.createElement("div");a.className="vslh-text";const l=document.createElement("span");if(l.className="vslh-title",l.textContent=e.title??"",a.appendChild(l),e.subtitle){const r=document.createElement("span");r.className="vslh-subtitle",r.textContent=e.subtitle,a.appendChild(r)}if(s.appendChild(a),e.meta){const r=document.createElement("span");r.className="vslh-meta",r.textContent=e.meta,s.appendChild(r)}s.appendChild(u());const c={el:s,item:e};this.#i.push(c),s.addEventListener("pointerenter",()=>this.#s(e.id)),s.addEventListener("pointerleave",()=>this.#s(null)),s.addEventListener("focus",()=>this.#s(e.id)),s.addEventListener("blur",()=>this.#s(null)),s.addEventListener("click",()=>this.#d(e)),s.addEventListener("keydown",r=>{(r.key==="Enter"||r.key===" "||r.key==="Spacebar")&&(r.preventDefault(),this.#d(e))}),this.#t.appendChild(s)}),!t.length){const e=document.createElement("p");e.className="vslh-empty",e.textContent="No items.",this.#t.appendChild(e)}this.#r()}#s(t){this.#e=t,this.#r()}#d(t){this.#o()||t.disabled||this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t}}))}#r(){const t=this.#h(),e=this.#p();for(const{el:s,item:a}of this.#i){const l=a.id,c=this.#e!=null&&String(this.#e)===String(l),r=this.#e!=null&&!c,o=t!=null&&String(t)===String(l),i=e!=null&&String(e)===String(l);s.classList.toggle("is-hover",c),s.classList.toggle("is-dim",r),s.classList.toggle("is-selected",o),s.classList.toggle("is-active",i),s.classList.toggle("is-disabled",!!a.disabled)}}}customElements.define("vs-list-hover",x);
