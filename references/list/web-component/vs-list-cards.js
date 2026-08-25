const m=[{id:1,title:"Ada Lovelace",subtitle:"Track your order #4821",meta:"09:24"},{id:2,title:"Grace Hopper",subtitle:"Invoice ready for review",meta:"Yesterday"},{id:3,title:"Alan Turing",subtitle:"Commented on your proposal",meta:"Mon"},{id:4,title:"Katherine Johnson",subtitle:"New connection accepted",meta:"Mon"}],f=`
  :host { display: block; width: 100%; }
  .vslc {
    --accent: var(--inp-accent, var(--ui-accent, #ededed));
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--vslc-gap, 10px);
    perspective: 900px;
  }
  .vslc--r-none { --vslc-radius: 0px; }
  .vslc--r-subtle { --vslc-radius: 8px; }
  .vslc--r-rounded { --vslc-radius: var(--ctrl-radius, 12px); }
  .vslc--r-pill { --vslc-radius: 26px; }
  @supports (corner-shape: squircle) { .vslc--r-squircle .vslc-card { corner-shape: squircle; } .vslc--r-squircle { --vslc-radius: 22px; } }

  .vslc-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: var(--vslc-py, 14px) var(--vslc-px, 16px);
    background: var(--bg-card, #111);
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--vslc-radius, 12px);
    color: var(--text, #ededed);
    cursor: pointer;
    outline: none;
    transform-style: preserve-3d;
    transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms ease, border-color 200ms ease;
  }
  .vslc-card:hover {
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.4);
    border-color: color-mix(in srgb, var(--accent) 40%, var(--border, #2a2a2a));
  }
  .vslc-card.is-selected { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 10px 24px rgba(0, 0, 0, 0.35); }
  .vslc-card.is-active { border-left: 3px solid var(--accent); }
  .vslc-card:focus-visible { box-shadow: 0 0 0 2px var(--accent); }
  .vslc-card.is-disabled { opacity: 0.5; cursor: default; pointer-events: none; }

  .vslc--sm .vslc-card { --vslc-py: 10px; --vslc-px: 12px; }
  .vslc--lg .vslc-card { --vslc-py: 18px; --vslc-px: 20px; }

  .vslc-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .vslc-title { font-size: var(--vslc-fs, 14px); font-weight: 560; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vslc--sm .vslc-title { --vslc-fs: 13px; }
  .vslc--lg .vslc-title { --vslc-fs: 15px; }
  .vslc-subtitle { font-size: 12.5px; color: var(--text-secondary, #a1a1a1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vslc-meta { flex: none; font-size: 12px; color: var(--text-muted, #666); }

  .vslc-empty { margin: 0; padding: 24px 16px; text-align: center; font-size: 13px; color: var(--text-muted, #666); }
  .vslc.is-disabled { opacity: 0.6; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vslc-card { transition: box-shadow 200ms ease, border-color 200ms ease; transform: none !important; }
  }
`;let p;function g(v){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=v;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(v,t){const e=t?g(String(t).trim()):null;if(!e){for(const s of x)v.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),r=(s,d)=>v.style.setProperty(s,d);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(s,o);r("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])r(s,n?"0 0 0":"255 255 255");r("--vs-color",o),r("--vs-color-rgb",e.join(" ")),r("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["select","active","size","radius","disabled","gap","color"];#e;#r;#o=null;#n=[];#l=!1;#s=null;#t=null;#i=0;#a=0;#d=0;#v=()=>{this.#t=null};#p=()=>{this.#t=null};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#e=document.createElement("div"),this.#e.className="vslc",this.#e.setAttribute("role","list"),this.#r=document.createElement("p"),this.#r.className="vslc-empty",this.#r.textContent="No items.",t.append(e,this.#e)}connectedCallback(){b(this,this.getAttribute("color")),window.addEventListener("scroll",this.#v,{passive:!0,capture:!0}),window.addEventListener("resize",this.#p,{passive:!0}),this.#h(),this.#c()}disconnectedCallback(){window.removeEventListener("scroll",this.#v,{capture:!0}),window.removeEventListener("resize",this.#p),this.#i&&(cancelAnimationFrame(this.#i),this.#i=0),this.#m(),this.#s=null,this.#t=null}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#e&&this.#c()}get items(){return this.#o??m}set items(t){this.#o=Array.isArray(t)?t:null,this.#e&&(this.#h(),this.#c())}get select(){return this.hasAttribute("select")?this.getAttribute("select"):null}set select(t){this.#u("select",t)}get active(){return this.hasAttribute("active")?this.getAttribute("active"):null}set active(t){this.#u("active",t)}#u(t,e){e==null?this.removeAttribute(t):this.setAttribute(t,String(e))}#h(){this.#m(),this.#e.textContent="",this.#n=[];const t=this.#o??m;if(!t.length){this.#e.appendChild(this.#r);return}for(const e of t){const i=document.createElement("div");i.className="vslc-card",i.setAttribute("role","listitem"),i.tabIndex=0;const a=document.createElement("div");a.className="vslc-text";const n=document.createElement("span");n.className="vslc-title",n.textContent=e.title||"",a.appendChild(n);const o=document.createElement("span");o.className="vslc-subtitle",e.subtitle?o.textContent=e.subtitle:o.style.display="none",a.appendChild(o);const l=document.createElement("span");l.className="vslc-meta",e.meta?l.textContent=e.meta:l.style.display="none",i.append(a,l),this.#e.appendChild(i);const r=c=>this.#f(c,e),s=c=>this.#g(c,e),d=c=>this.#y(c),u=()=>this.#b(e),h=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),this.#b(e))};i.addEventListener("pointerenter",r),i.addEventListener("pointermove",s),i.addEventListener("pointerleave",d),i.addEventListener("click",u),i.addEventListener("keydown",h),this.#n.push({card:i,item:e,onEnter:r,onMove:s,onLeave:d,onClick:u,onKey:h})}}#m(){for(const t of this.#n)t.card.removeEventListener("pointerenter",t.onEnter),t.card.removeEventListener("pointermove",t.onMove),t.card.removeEventListener("pointerleave",t.onLeave),t.card.removeEventListener("click",t.onClick),t.card.removeEventListener("keydown",t.onKey),this.#s===t.card&&(this.#s=null,this.#t=null)}#c(){const t=this.getAttribute("size")||"md",e=this.getAttribute("radius")||"rounded",i=this.getAttribute("disabled"),a=this.hasAttribute("disabled")&&i!=="false"&&i!=="0",n=this.getAttribute("gap"),o=n!=null&&n!==""&&Number.isFinite(Number(n))?Number(n):10;this.#e.className=["vslc",`vslc--${t}`,`vslc--r-${e}`,a?"is-disabled":""].filter(Boolean).join(" "),this.#e.style.setProperty("--vslc-gap",`${o}px`),this.#l=a;const l=this.getAttribute("select"),r=this.getAttribute("active");for(const s of this.#n){const d=l!=null&&String(s.item.id)===l,u=r!=null&&String(s.item.id)===r;s.card.classList.toggle("is-selected",d),s.card.classList.toggle("is-active",u),s.card.classList.toggle("is-disabled",!!s.item.disabled)}}#f(t,e){this.#l||e.disabled||(this.#s=t.currentTarget,this.#t=this.#s.getBoundingClientRect())}#g(t,e){if(this.#l||e.disabled)return;const i=t.currentTarget;i!==this.#s&&(this.#s=i,this.#t=null),this.#a=t.clientX,this.#d=t.clientY,this.#i||(this.#i=requestAnimationFrame(()=>this.#x()))}#x(){this.#i=0;const t=this.#s;if(!t)return;this.#t||(this.#t=t.getBoundingClientRect());const e=(this.#a-this.#t.left)/this.#t.width-.5,i=(this.#d-this.#t.top)/this.#t.height-.5;t.style.setProperty("--rx",`${(-i*5).toFixed(2)}deg`),t.style.setProperty("--ry",`${(e*6).toFixed(2)}deg`)}#y(t){const e=t.currentTarget;e.style.removeProperty("--rx"),e.style.removeProperty("--ry"),e===this.#s&&(this.#s=null,this.#t=null)}#b(t){this.#l||t.disabled||this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t}}))}}customElements.define("vs-list-cards",y);
