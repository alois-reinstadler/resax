const b=[{label:"Overview",value:"overview"},{label:"Activity",value:"activity"},{label:"Settings",value:"settings"},{label:"Members",value:"members",disabled:!0}],u=`
  :host { display: inline-flex; max-width: 100%; }
  .tbv {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --tab-px: 14px;
    --gap: 2px;
    --r: var(--ctrl-r-md, 12px);
    --acc: var(--inp-accent, #ededed);
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    min-width: 180px;
  }
  .tbv--block { display: flex; width: 100%; }
  .tbv--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 32px); --tab-px: 11px; --r: var(--ctrl-r-sm, 10px); }
  .tbv--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --tab-px: 18px; --r: var(--ctrl-r-lg, 14px); }

  .tbv__list {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
    padding-left: 10px; /* room for the rail */
  }

  /* left rail bar that slides vertically to the active row */
  .tbv__rail {
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    border-radius: 3px;
    background: var(--acc);
    opacity: 0;
    z-index: 2;
    transition:
      transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      height 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      opacity 200ms ease;
  }
  .tbv__rail.is-ready { opacity: 1; }

  /* solid variant: a soft filled surface that follows the active row */
  .tbv__fill {
    position: absolute;
    left: 10px;
    right: 0;
    top: 0;
    border-radius: var(--r);
    background: color-mix(in srgb, var(--acc) 12%, transparent);
    opacity: 0;
    z-index: 0;
    transition:
      transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      height 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      opacity 200ms ease;
  }
  .tbv__fill.is-ready { opacity: 1; }
  .tbv--ghost .tbv__fill { opacity: 0 !important; }

  .tbv__tab {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    height: var(--h);
    padding: 0 var(--tab-px);
    border: 0;
    background: transparent;
    color: var(--text-muted, #8a8a8a);
    font: inherit;
    font-weight: 500;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    border-radius: var(--r);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: color 220ms ease, background-color 200ms ease;
  }
  .tbv__tab:hover:not(:disabled):not(.is-active) { color: var(--text, #ededed); background: color-mix(in srgb, var(--acc) 6%, transparent); }
  .tbv__tab.is-active { color: var(--acc); }
  .tbv--ghost .tbv__tab.is-active { color: var(--acc); }
  .tbv__tab:disabled { opacity: 0.4; cursor: not-allowed; }
  .tbv__tab:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--acc) 70%, transparent);
    outline-offset: 2px;
  }
  .tbv__icon { display: inline-flex; flex: 0 0 auto; }
  .tbv__icon svg { width: 18px; height: 18px; display: block; }
  .tbv__label { flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis; }

  /* tones */
  .tbv--t-danger { --acc: #e5484d; }
  .tbv--t-warn { --acc: #f5a623; }
  .tbv--t-success { --acc: #30a46c; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .tbv__rail, .tbv__fill { transition: opacity 200ms ease; }
    .tbv__tab { transition: color 220ms ease; }
  }
`;let h;function f(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const p=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(c,t){const e=t?f(String(t).trim()):null;if(!e){for(const i of p)c.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),l=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(l?i*.92:i+(255-i)*.16)),a=(i,v)=>c.style.setProperty(i,v);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,s);a("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,l?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,l?"0 0 0":"255 255 255");a("--vs-color",s),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["active","value","size","tone","variant","block","disabled","color"];#t;#e;#s;#i;#r=[];#b=null;#o=null;#a=0;#d;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.className="tbv",this.#t.setAttribute("role","tablist"),this.#t.setAttribute("aria-orientation","vertical"),this.#e=document.createElement("div"),this.#e.className="tbv__list",this.#s=document.createElement("span"),this.#s.className="tbv__rail",this.#s.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="tbv__fill",this.#i.setAttribute("aria-hidden","true"),this.#e.append(this.#s,this.#i),this.#t.appendChild(this.#e),this.#d=n=>this.#g(n),t.append(e,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.#v(),this.#u(),this.#t.addEventListener("keydown",this.#d),this.#o=new ResizeObserver(()=>this.#h()),this.#o.observe(this.#e),this.#h()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#d),this.#o?.disconnect(),this.#o=null,this.#a&&cancelAnimationFrame(this.#a),this.#a=0}attributeChangedCallback(t){if(d(this,this.getAttribute("color")),!!this.#t){if(t==="value"){const e=this.getAttribute("value");e!==this.getAttribute("active")&&this.setAttribute("active",e);return}this.#v(),t==="active"&&this.#p()}}set tabs(t){this.#b=Array.isArray(t)&&t.length?t:null,this.#t&&this.#u()}get tabs(){return this.#b??b}set active(t){this.setAttribute("active",String(t))}get active(){return this.getAttribute("active")??this.getAttribute("value")??this.#n()[0]?.value}set value(t){this.active=t}get value(){return this.active}#n(){return this.#b??b}#l(){return this.hasAttribute("disabled")&&this.hasAttribute("disabled")}#c(){const t=String(this.active),e=this.#n().findIndex(n=>String(n.value)===t);return e<0?0:e}#v(){const t=(r,l)=>this.getAttribute(r)??l,e=this.#l()?" is-disabled":"",n=this.hasAttribute("block")&&this.hasAttribute("block")?" tbv--block":"";this.#t.className=`tbv tbv--${t("size","md")} tbv--t-${t("tone","default")} tbv--${t("variant","solid")}${n}${e}`,this.#t.setAttribute("aria-disabled",this.#l()?"true":"false")}#u(){for(;this.#e.lastChild&&this.#e.lastChild!==this.#i;)this.#e.removeChild(this.#e.lastChild);this.#r=[];const t=this.#n(),e=this.#c(),n=this.#l();t.forEach((r,l)=>{const s=document.createElement("button");if(s.type="button",s.className="tbv__tab"+(l===e?" is-active":""),s.setAttribute("role","tab"),s.setAttribute("aria-selected",l===e?"true":"false"),r.icon){const i=document.createElement("span");i.className="tbv__icon",i.innerHTML=r.icon,s.appendChild(i)}const o=document.createElement("span");o.className="tbv__label",o.textContent=r.label,s.appendChild(o);const a=n||!!r.disabled;s.disabled=a,a&&s.setAttribute("aria-disabled","true"),s.tabIndex=l===e?0:-1,s.addEventListener("click",()=>this.#f(l)),this.#e.appendChild(s),this.#r.push(s)}),this.#h()}#p(){const t=this.#c();this.#r.forEach((e,n)=>{const r=n===t;e.classList.toggle("is-active",r),e.setAttribute("aria-selected",r?"true":"false"),e.tabIndex=r?0:-1}),this.#h()}#h(){this.#a||(this.#a=requestAnimationFrame(()=>{this.#a=0;const t=this.#r[this.#c()];if(!t)return;const e=`translateY(${t.offsetTop}px)`,n=`${t.offsetHeight}px`;this.#s.style.transform=e,this.#s.style.height=n,this.#i.style.transform=e,this.#i.style.height=n,this.#s.classList.contains("is-ready")||this.#s.classList.add("is-ready"),this.#i.classList.contains("is-ready")||this.#i.classList.add("is-ready")}))}#f(t){if(this.#l())return;const e=this.#n()[t];!e||e.disabled||e.value===this.active||(this.active=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value,index:t}})))}#g(t){if(this.#l()||!["ArrowDown","ArrowUp","Home","End"].includes(t.key))return;const r=this.#n().map((a,i)=>({t:a,i})).filter(a=>!a.t.disabled);if(!r.length)return;t.preventDefault();const l=r.findIndex(a=>a.i===this.#c());let s;if(t.key==="Home")s=0;else if(t.key==="End")s=r.length-1;else{const a=t.key==="ArrowDown";s=l<0?0:(l+(a?1:-1)+r.length)%r.length}const o=r[s].i;this.#f(o),this.#r[o]?.focus()}}customElements.define("vs-tabs-vertical",g);
