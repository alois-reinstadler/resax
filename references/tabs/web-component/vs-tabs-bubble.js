const h=[{label:"Overview",value:"overview"},{label:"Activity",value:"activity"},{label:"Settings",value:"settings"},{label:"Members",value:"members",disabled:!0}],f=`
  :host { display: inline-flex; max-width: 100%; }
  :host([block]) { display: flex; width: 100%; }
  .tbb {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --gap: 6px;
    --tab-px: 14px;
    --acc: var(--inp-accent, #ededed);
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .tbb--block { display: flex; width: 100%; }
  .tbb--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 32px); --tab-px: 11px; }
  .tbb--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --tab-px: 18px; }

  .tbb__list {
    position: relative;
    display: inline-flex;
    gap: var(--gap);
    padding-bottom: 12px; /* room for the bubble below the row */
    width: 100%;
    /* More tabs than the box can hold become a rail, not an overflow: wrapping
       would strand the bubble, which slides along a single row. The top padding
       (with a matching negative margin) buys back the vertical room that
       overflow-x takes away — overflow-x: auto forces overflow-y to auto, and
       without it the pressed-tab scale and the focus ring get clipped. */
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    padding-top: 6px;
    margin-top: -6px;
  }
  .tbb__list::-webkit-scrollbar { display: none; }

  .tbb__tab {
    position: relative;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--tab-px);
    border: 0;
    background: transparent;
    color: var(--text-muted, #8a8a8a);
    font: inherit;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: color 260ms ease, transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .tbb--block .tbb__tab { flex: 1 1 0; }
  .tbb__tab:hover:not(:disabled):not(.is-active) { color: var(--text, #ededed); }
  .tbb__tab.is-active { color: var(--acc); }
  .tbb__tab:disabled { opacity: 0.4; cursor: not-allowed; }
  .tbb__icon { display: inline-flex; }
  .tbb__icon svg { width: 18px; height: 18px; display: block; }

  /* the bubble sits on the bottom edge, centered under the active tab */
  .tbb__dot {
    position: absolute;
    left: 0;
    bottom: 2px;
    margin-left: -4px;
    opacity: 0;
    pointer-events: none;
    transition:
      transform 420ms cubic-bezier(0.5, 1.4, 0.5, 1),
      opacity 200ms ease;
  }
  .tbb__dot.is-ready { opacity: 1; }
  .tbb__dot-i {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--acc);
    box-shadow: 0 0 10px color-mix(in srgb, var(--acc) 60%, transparent);
  }
  /* the vertical hop: lifts up mid-travel then lands (arc feel) */
  .tbb__dot.is-hop .tbb__dot-i { animation: tbb-hop 440ms cubic-bezier(0.4, 0, 0.2, 1); }
  @keyframes tbb-hop {
    0% { transform: translateY(0) scale(1); }
    45% { transform: translateY(-14px) scale(0.8); }
    100% { transform: translateY(0) scale(1); }
  }

  /* tones */
  .tbb--t-danger { --acc: #e5484d; }
  .tbb--t-warn { --acc: #f5a623; }
  .tbb--t-success { --acc: #30a46c; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .tbb__dot { transition: opacity 200ms ease; }
    .tbb__dot.is-hop .tbb__dot-i { animation: none; }
    .tbb__tab { transition: color 260ms ease; }
  }
`;let b;function p(c){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=c;const t=b.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(c,t){const e=t?p(String(t).trim()):null;if(!e){for(const a of m)c.style.removeProperty(a);return}const i=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(a=>Math.round(s?a*.92:a+(255-a)*.16)),l=(a,u)=>c.style.setProperty(a,u);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(a,n);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(a,s?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])l(a,s?"0 0 0":"255 255 255");l("--vs-color",n),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["active","value","size","tone","block","disabled","color"];#i;#e;#t;#r=[];#b=null;#o=null;#a=0;#s=0;#h;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#i=document.createElement("div"),this.#i.setAttribute("role","tablist"),this.#e=document.createElement("div"),this.#e.className="tbb__list",this.#t=document.createElement("span"),this.#t.className="tbb__dot",this.#t.setAttribute("aria-hidden","true");const i=document.createElement("span");i.className="tbb__dot-i",this.#t.appendChild(i),this.#t.addEventListener("animationend",()=>this.#t.classList.remove("is-hop")),this.#e.appendChild(this.#t),this.#i.appendChild(this.#e),this.#h=r=>this.#x(r),t.append(e,this.#i)}connectedCallback(){d(this,this.getAttribute("color")),this.#f(),this.#u(),this.#p(),this.#i.addEventListener("keydown",this.#h),this.#o=new ResizeObserver(()=>this.#c()),this.#o.observe(this.#e),this.#c()}disconnectedCallback(){this.#i.removeEventListener("keydown",this.#h),this.#o?.disconnect(),this.#o=null,this.#a&&cancelAnimationFrame(this.#a),this.#a=0,this.#s&&cancelAnimationFrame(this.#s),this.#s=0}attributeChangedCallback(t){d(this,this.getAttribute("color")),this.#i&&(this.#f(),t==="active"||t==="value"?this.#y(!0):(t==="size"||t==="block")&&this.#c())}set tabs(t){this.#b=Array.isArray(t)&&t.length?t:null,this.#e&&(this.#u(),this.#p())}get tabs(){return this.#b??h}set active(t){this.setAttribute("active",String(t))}get active(){return this.getAttribute("active")??this.getAttribute("value")??this.#n()[0]?.value??""}#n(){return this.#b??h}#l(){return this.hasAttribute("disabled")&&this.hasAttribute("disabled")}#g(){return this.hasAttribute("block")&&this.hasAttribute("block")}#d(){const t=this.active;return this.#n().findIndex(e=>e.value===t)}#u(){const t=this.#n(),e=this.getAttribute("active")??this.getAttribute("value");if(e!=null&&t.some(r=>r.value===e))return;const i=t[0]?.value;i!=null?this.setAttribute("active",i):this.removeAttribute("active")}#f(){const t=(i,r)=>this.getAttribute(i)??r,e=this.#l();this.#i.className=`tbb tbb--${t("size","md")} tbb--t-${t("tone","default")}`+(this.#g()?" tbb--block":"")+(e?" is-disabled":""),this.#i.setAttribute("aria-disabled",e?"true":"false")}#p(){for(;this.#e.lastChild&&this.#e.lastChild!==this.#t;)this.#e.removeChild(this.#e.lastChild);this.#r=[];const t=this.#n(),e=this.#d(),i=this.#l();t.forEach((r,s)=>{const n=document.createElement("button");if(n.type="button",n.className="tbb__tab"+(s===e?" is-active":""),n.setAttribute("role","tab"),n.setAttribute("aria-selected",s===e?"true":"false"),n.disabled=i||!!r.disabled,n.tabIndex=s===e?0:-1,r.icon){const o=document.createElement("span");o.className="tbb__icon",o.innerHTML=r.icon,n.appendChild(o)}else n.textContent=r.label??"";n.addEventListener("click",()=>this.#v(s)),this.#e.insertBefore(n,this.#t),this.#r.push(n)}),this.#c()}#y(t){const e=this.#d();this.#r.forEach((i,r)=>{const s=r===e;i.classList.toggle("is-active",s),i.setAttribute("aria-selected",s?"true":"false"),i.tabIndex=s?0:-1}),this.#m(t)}#m(t){const e=this.#r[this.#d()];if(!e)return;const i=e.offsetLeft+e.offsetWidth/2;this.#t.style.transform=`translateX(${i}px)`,this.#t.classList.contains("is-ready")||this.#t.classList.add("is-ready"),t&&(this.#t.classList.remove("is-hop"),this.#s&&cancelAnimationFrame(this.#s),this.#s=requestAnimationFrame(()=>{this.#s=requestAnimationFrame(()=>{this.#s=0,this.#t.classList.add("is-hop")})}))}#c(){this.#a||(this.#a=requestAnimationFrame(()=>{this.#a=0,this.#m(!1)}))}#v(t){if(this.#l())return;const e=this.#n()[t];!e||e.disabled||e.value===this.active||(this.active=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value,index:t}})))}#x(t){if(this.#l())return;const i=this.#n().map((o,l)=>({t:o,i:l})).filter(o=>!o.t.disabled);if(!i.length)return;const r=i.findIndex(o=>o.t.value===this.active);let s=-1;if(t.key==="ArrowRight"||t.key==="ArrowDown"?s=(r+1+i.length)%i.length:t.key==="ArrowLeft"||t.key==="ArrowUp"?s=(r-1+i.length)%i.length:t.key==="Home"?s=0:t.key==="End"&&(s=i.length-1),s<0)return;t.preventDefault();const n=i[s].i;this.#v(n),this.#r[n]?.focus()}}customElements.define("vs-tabs-bubble",v);
