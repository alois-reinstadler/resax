const f=`
  :host { display: block; }
  .accb {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --pad-x: 16px;
    --r: var(--ctrl-r-md, 12px);
    --rr: var(--r);
    --acc: var(--ui-accent, #ededed);
    /* extra-bouncy spring: bigger overshoot than the base family */
    --spring: cubic-bezier(0.2, 2.2, 0.35, 1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 520px;
    font-family: inherit;
    font-size: var(--fs);
    color: var(--inp-text, #ededed);
  }
  .accb--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 34px); --pad-x: 13px; --r: var(--ctrl-r-sm, 10px); }
  .accb--md { --fs: var(--ctrl-fs-md, 14px); --h: var(--ctrl-h-md, 40px); --pad-x: 16px; --r: var(--ctrl-r-md, 12px); }
  .accb--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --pad-x: 20px; --r: var(--ctrl-r-lg, 14px); }

  .accb--r-none .accb__item { --rr: 0px; }
  .accb--r-subtle .accb__item { --rr: 8px; }
  .accb--r-rounded .accb__item { --rr: var(--r); }
  @supports (corner-shape: squircle) {
    .accb--r-squircle .accb__item { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .accb__item {
    position: relative;
    border-radius: var(--rr);
    background: var(--bg-card, #111);
    border: 1px solid var(--inp-border, #2a2a2a);
    transform-origin: center top;
    transition: border-color 240ms ease, transform 420ms var(--spring);
  }
  .accb__item.is-open { border-color: color-mix(in srgb, var(--acc) 40%, var(--inp-border, #2a2a2a)); }
  /* BOUNCE effect: the whole item squashes then springs back on click */
  .accb__item:active:not(.is-disabled) { transform: scale(0.97); }

  .accb__head {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: var(--h);
    padding: calc((var(--h) - 1.3em) / 2) var(--pad-x);
    border: 0;
    background: transparent;
    border-radius: inherit;
    font: inherit;
    font-weight: 600;
    text-align: left;
    color: inherit;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: color 200ms ease;
  }
  .accb__head:disabled { cursor: not-allowed; opacity: 0.45; }
  .accb__item.is-open .accb__head { color: var(--acc); }

  .accb__icon { display: inline-flex; flex: 0 0 auto; }
  .accb__icon svg { width: 1.1em; height: 1.1em; display: block; }
  .accb__title { flex: 1 1 auto; line-height: 1.3; }

  /* chevron: base rotation + a re-firing elastic pop (restarted manually per toggle) */
  .accb__chev {
    flex: 0 0 auto;
    display: inline-flex;
    color: var(--text-muted, #8a8a8a);
    transition: transform 520ms var(--spring), color 200ms ease;
    animation: accb-pop 520ms var(--spring);
  }
  .accb__chev svg { width: 1.2em; height: 1.2em; display: block; }
  .accb__item.is-open .accb__chev { transform: rotate(180deg); color: var(--acc); }
  @keyframes accb-pop {
    0% { scale: 0.4; }
    60% { scale: 1.35; }
    100% { scale: 1; }
  }

  .accb__panel {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 620ms var(--spring);
  }
  .accb__item.is-open .accb__panel { grid-template-rows: 1fr; }
  .accb__panel-clip { min-height: 0; overflow: hidden; }
  .accb__body {
    padding: 2px var(--pad-x) calc(var(--h) / 3.2);
    color: var(--text-muted, #8a8a8a);
    line-height: 1.55;
    font-weight: 400;
    transform-origin: top center;
    opacity: 0;
    transform: translateY(-10px) scale(0.96);
    transition: opacity 300ms ease, transform 560ms var(--spring);
  }
  .accb__item.is-open .accb__body { opacity: 1; transform: translateY(0) scale(1); transition-delay: 70ms; }

  /* ── layout variants ── */
  .accb--contained { gap: 0; border: 1px solid var(--inp-border, #2a2a2a); border-radius: var(--rr); overflow: hidden; }
  @supports (corner-shape: squircle) { .accb--contained.accb--r-squircle { corner-shape: squircle; } }
  .accb--contained .accb__item { border-radius: 0; border: 0; background: transparent; }
  .accb--contained .accb__item + .accb__item { border-top: 1px solid var(--inp-border, #2a2a2a); }
  .accb--line { gap: 0; }
  .accb--line .accb__item { border-radius: 0; border: 0; border-bottom: 1px solid var(--inp-border, #2a2a2a); background: transparent; }
  .accb--line .accb__head { padding-left: 0; padding-right: 4px; }
  .accb--line .accb__body { padding-left: 0; }

  /* ── tones ── */
  .accb--t-default { --acc: var(--ui-accent, #ededed); }
  .accb--t-danger { --acc: var(--danger, #e5484d); }
  .accb--t-warn { --acc: var(--warn, #f5a623); }
  .accb--t-success { --acc: var(--success, #30a46c); }

  .accb.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .accb__panel { transition: none; }
    .accb__item, .accb__item:active:not(.is-disabled) { transition: border-color 200ms ease; transform: none; }
    .accb__chev { transition: transform 200ms ease; animation: none; }
    .accb__body { transform: none; transition: opacity 200ms ease; }
  }
`,h=[{title:"What is Vuesax?",content:"A catalog of portable, animation-first components. Copy the source, drop it in, ship it.",value:"a"},{title:"How does theming work?",content:"Every component reads from CSS custom properties with sane fallbacks, so it adapts to light/dark out of the box.",value:"b"},{title:"Can I use it without a build step?",content:"Yes. Components are self-contained — no global CSS or runtime dependency required.",value:"c"},{title:"Is there a Pro tier?",content:"Yes — unlocks source copy and exclusive sections.",value:"d",disabled:!0}],u="http://www.w3.org/2000/svg";function g(){const c=document.createElementNS(u,"svg");c.setAttribute("viewBox","0 0 24 24"),c.setAttribute("fill","none");const t=document.createElementNS(u,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),c.appendChild(t),c}let b;function v(c){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=c;const t=b.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(c,t){const e=t?v(String(t).trim()):null;if(!e){for(const a of _)c.style.removeProperty(a);return}const r=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),i=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(a=>Math.round(i?a*.92:a+(255-a)*.16)),s=(a,d)=>c.style.setProperty(a,d);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(a,l);s("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(a,i?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])s(a,i?"0 0 0":"255 255 255");s("--vs-color",l),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["variant","tone","size","radius","multiple","disabled","value","color"];#e;#c=h;#a=[];#t=new Set;#d=!1;#n=!1;#r=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#e=document.createElement("div"),this.#e.className="accb",t.append(e,this.#e),this.#t=this.#o(this.getAttribute("value"))}connectedCallback(){m(this,this.getAttribute("color")),this.#d||this.#p(),this.#b()}disconnectedCallback(){this.#r?.abort(),this.#r=null}attributeChangedCallback(t){if(m(this,this.getAttribute("color")),!!this.#e){if(t==="value"){if(this.#n)return;this.#t=this.#o(this.getAttribute("value")),this.#i();return}t==="multiple"&&!this.#s()&&this.#t.size>1&&(this.#t=new Set([[...this.#t][0]]),this.#l(),this.#i()),this.#b()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const r=JSON.parse(t);Array.isArray(r)&&(e=r)}catch{}this.#c=e&&e.length?e:h,this.#e&&this.#p()}get items(){return this.#c}get value(){return this.#s()?[...this.#t]:[...this.#t][0]??""}set value(t){this.#t=this.#o(t),this.#l(),this.#i()}#s(){return this.hasAttribute("multiple")}#o(t){return t==null||t===""?new Set:Array.isArray(t)?new Set(t):new Set(String(t).split(",").map(e=>e.trim()).filter(Boolean))}#l(){this.#n=!0;const t=[...this.#t];t.length?this.setAttribute("value",t.join(",")):this.removeAttribute("value"),this.#n=!1}#h(){const t=(e,r)=>this.getAttribute(e)??r;this.#e.className=`accb accb--${t("variant","separated")} accb--t-${t("tone","default")} accb--${t("size","md")} accb--r-${t("radius","squircle")}`+(this.hasAttribute("disabled")?" is-disabled":"")}#b(){this.#h();const t=this.hasAttribute("disabled");for(const{head:e,it:r}of this.#a)e.disabled=t||!!r.disabled}#p(){this.#r?.abort(),this.#r=new AbortController;const{signal:t}=this.#r;this.#a.forEach(({row:e})=>e.remove()),this.#a=[],this.#c.forEach((e,r)=>{const n=document.createElement("div");n.className="accb__item"+(e.disabled?" is-disabled":"");const i=document.createElement("button");if(i.type="button",i.className="accb__head",i.setAttribute("aria-expanded","false"),i.disabled=this.hasAttribute("disabled")||!!e.disabled,e.icon){const p=document.createElement("span");p.className="accb__icon",p.innerHTML=e.icon,i.appendChild(p)}const l=document.createElement("span");l.className="accb__title",l.textContent=e.title??"",i.appendChild(l);const o=document.createElement("span");o.className="accb__chev",o.setAttribute("aria-hidden","true"),o.appendChild(g()),i.appendChild(o),i.addEventListener("click",()=>this.#u(e,r),{signal:t});const s=document.createElement("div");s.className="accb__panel";const a=document.createElement("div");a.className="accb__panel-clip";const d=document.createElement("div");d.className="accb__body",d.textContent=e.content??"",a.appendChild(d),s.appendChild(a),n.append(i,s),this.#e.appendChild(n),this.#a.push({row:n,head:i,chev:o,panel:s,body:d,it:e})}),this.#d=!0,this.#i()}#i(){for(const{row:t,head:e,it:r}of this.#a){const n=this.#t.has(r.value);t.classList.toggle("is-open",n),e.setAttribute("aria-expanded",n?"true":"false")}}#u(t,e){if(this.hasAttribute("disabled")||t.disabled)return;const r=new Set(this.#t);r.has(t.value)?r.delete(t.value):(this.#s()||r.clear(),r.add(t.value)),this.#t=r,this.#l(),this.#i(),this.#m(e);const n=this.#s()?[...r]:[...r][0]??"";this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:n}}))}#m(t){const e=this.#a[t]?.chev;e&&(e.style.animation="none",e.offsetWidth,e.style.animation="")}}customElements.define("vs-accordion-bounce",y);
