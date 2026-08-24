const f=`
  :host { display: inline-flex; }
  .rgglow {
    --h: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 14px);
    --acc: var(--ui-accent, #ededed);
    display: inline-flex;
    gap: 8px;
    font-family: inherit;
  }
  .rgglow--vertical { flex-direction: column; align-items: flex-start; }
  .rgglow--horizontal { flex-direction: row; align-items: center; gap: 20px; }
  .rgglow--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); }
  .rgglow--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); }
  .rgglow--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); }

  .rgglow--danger  { --acc: var(--tone-danger, #ef4444); }
  .rgglow--warn    { --acc: var(--tone-warn, #f59e0b); }
  .rgglow--success { --acc: var(--tone-success, #22c55e); }

  .rgglow__opt {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    min-height: var(--h);
    padding: 0 6px;
    border: 0;
    background: transparent;
    color: color-mix(in srgb, var(--inp-text, #ededed) 72%, transparent);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    border-radius: 10px;
    -webkit-tap-highlight-color: transparent;
    transition: color 220ms ease;
  }
  .rgglow__opt:hover:not(:disabled) { color: var(--inp-text, #ededed); }
  .rgglow__opt--active { color: var(--inp-text, #ededed); }
  .rgglow__opt:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--acc) 70%, transparent);
    outline-offset: 2px;
  }
  .rgglow__opt:disabled { opacity: 0.4; cursor: not-allowed; }
  .rgglow--disabled { opacity: 0.6; }

  .rgglow__mark {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    flex: none;
    border-radius: 999px;
    border: 1.5px solid color-mix(in srgb, var(--inp-text, #ededed) 34%, transparent);
    background: var(--bg-card, #111);
    transition: border-color 260ms ease, box-shadow 320ms ease;
  }
  /* active mark: neon halo via box-shadow (paint only, no layout) */
  .rgglow__opt--active .rgglow__mark {
    border-color: var(--acc);
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--acc) 60%, transparent),
      0 0 10px 1px color-mix(in srgb, var(--acc) 55%, transparent),
      0 0 20px 3px color-mix(in srgb, var(--acc) 35%, transparent);
  }

  .rgglow__core {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--acc);
    transform: scale(0);
    box-shadow: 0 0 8px 1px color-mix(in srgb, var(--acc) 80%, transparent);
    transition: transform 300ms cubic-bezier(0.34, 1.8, 0.5, 1);
  }
  .rgglow__opt--active .rgglow__core { transform: scale(1); }

  /* glow ripple ring — out of flow (position:absolute), fires once on selection */
  .rgglow__ripple {
    position: absolute;
    inset: -1.5px;
    border-radius: 999px;
    border: 1.5px solid var(--acc);
    opacity: 0;
    pointer-events: none;
  }
  .rgglow__ripple--fire { animation: rgglow-ripple 620ms ease-out; }
  @keyframes rgglow-ripple {
    0%   { opacity: 0.7; transform: scale(0.7); }
    100% { opacity: 0; transform: scale(2.4); }
  }

  @media (prefers-reduced-motion: reduce) {
    .rgglow__opt, .rgglow__mark, .rgglow__core { transition: none; }
    .rgglow__ripple--fire { animation: none; }
  }
`,b=[{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"Lifetime",value:"lifetime"}];function m(c){if(c==null||c==="")return null;const e=String(c).trim();try{const t=JSON.parse(e);if(Array.isArray(t)&&t.length)return t.map(r=>typeof r=="object"&&r?r:{label:String(r),value:r})}catch{const t=e.split(",").map(r=>r.trim()).filter(Boolean);if(t.length)return t.map(r=>({label:r,value:r}))}return null}let g;function v(c){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=c;const e=g.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(c,e){const t=e?v(String(e).trim()):null;if(!t){for(const i of w)c.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,s=t.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),o=(i,p)=>c.style.setProperty(i,p);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,l);o("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,n?"0 0 0":"255 255 255");o("--vs-color",l),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["value","disabled","size","tone","name","direction","options","color"];#a;#t;#e=[];#l=null;#r;#n;constructor(){super(),this.#a=this.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=f,this.#t=document.createElement("div"),this.#t.className="rgglow",this.#t.setAttribute("role","radiogroup"),this.#a.append(e,this.#t),this.#n=t=>this.#p(t)}connectedCallback(){h(this,this.getAttribute("color")),this.#t.addEventListener("keydown",this.#n),this.#s(),this.#o()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#n);for(const e of this.#e)e.btn.removeEventListener("click",e.onClick),e.ripple.removeEventListener("animationend",e.onEnd)}attributeChangedCallback(e,t,r){h(this,this.getAttribute("color")),!(!this.isConnected||t===r)&&(e==="options"&&this.#s(),this.#o())}get options(){return this.#i()}set options(e){this.#l=Array.isArray(e)?e.map(t=>typeof t=="object"&&t?t:{label:String(t),value:t}):null,this.isConnected&&(this.#s(),this.#o())}get value(){return this.#r}set value(e){this.setAttribute("value",String(e))}#i(){return this.#l??m(this.getAttribute("options"))??b}#c(e){const t=this.getAttribute("value");return t!=null&&e.some(r=>String(r.value)===t)?t:e.length?String(e[0].value):void 0}#s(){for(const t of this.#e)t.btn.removeEventListener("click",t.onClick),t.ripple.removeEventListener("animationend",t.onEnd);this.#t.textContent="",this.#e=[];const e=this.#i();this.#r=this.#c(e);for(const t of e){const r=document.createElement("button");r.type="button",r.className="rgglow__opt",r.setAttribute("role","radio");const a=document.createElement("span");a.className="rgglow__mark",a.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="rgglow__core";const l=document.createElement("span");l.className="rgglow__ripple",a.append(n,l);const s=document.createElement("span");s.className="rgglow__label",s.textContent=t.label,r.append(a,s);const o=()=>this.#g(t),i=()=>l.classList.remove("rgglow__ripple--fire");r.addEventListener("click",o),l.addEventListener("animationend",i),this.#t.append(r),this.#e.push({btn:r,ripple:l,opt:t,onClick:o,onEnd:i})}}#o(){const e=(o,i)=>this.getAttribute(o)??i,t=e("size","md"),r=e("tone","default"),a=e("direction","vertical")!=="horizontal",n=this.hasAttribute("disabled"),l=this.#i();this.#r=this.#c(l),this.#t.className=`rgglow rgglow--${a?"vertical":"horizontal"} rgglow--${t} rgglow--${r}`+(n?" rgglow--disabled":""),n?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled");const s=this.getAttribute("name");s!=null?this.#t.setAttribute("aria-label",s):this.#t.removeAttribute("aria-label"),this.#e.forEach(({btn:o},i)=>{const p=l[i]||{},d=String(p.value)===this.#r,u=n||!!p.disabled;o.classList.toggle("rgglow__opt--active",d),o.setAttribute("aria-checked",d?"true":"false"),u?o.setAttribute("aria-disabled","true"):o.removeAttribute("aria-disabled"),o.tabIndex=d?0:-1,o.disabled=u})}#g(e){if(this.hasAttribute("disabled")||e.disabled)return;const t=String(e.value),r=t!==this.#r;if(this.getAttribute("value")!==t?this.setAttribute("value",t):this.#o(),r){const a=this.#e.find(n=>String(n.opt.value)===t);a&&(a.ripple.classList.remove("rgglow__ripple--fire"),a.ripple.offsetWidth,a.ripple.classList.add("rgglow__ripple--fire"))}this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value}}))}#p(e){if(this.hasAttribute("disabled")||!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp"].includes(e.key))return;e.preventDefault();const t=this.#i().filter(s=>!s.disabled);if(!t.length)return;const r=t.findIndex(s=>String(s.value)===this.#r),a=e.key==="ArrowRight"||e.key==="ArrowDown",n=r<0?0:(r+(a?1:-1)+t.length)%t.length;this.#g(t[n]),this.#e.find(s=>String(s.opt.value)===String(t[n].value))?.btn.focus()}}customElements.define("vs-radio-group-glow",x);
