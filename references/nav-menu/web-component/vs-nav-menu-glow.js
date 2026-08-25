const b=`
  /* max-width, not a breakpoint: the bar is shrink-to-fit, so without this it
     keeps its widest natural size and hangs out of any box narrower than the
     triggers laid end to end. */
  :host { display: inline-flex; max-width: 100%; }
  .vng {
    --accent: var(--ui-accent, #ededed);
    --rr: 14px;
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    font-family: inherit;
    color: var(--text, #ededed);
  }
  .vng--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .vng--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .vng--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .vng--r-subtle { --rr: 10px; }
  .vng--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .vng--r-squircle { --rr: 22px; } }

  .vng__list {
    position: relative;
    display: flex;
    align-items: center;
    /* Wrap rather than scroll: the pill and the viewport are positioned from
       measured trigger rects, so a second row lands correctly, and every
       trigger stays reachable without a hidden scroll gesture. */
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    gap: 2px;
    margin: 0;
    padding: 4px;
    list-style: none;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: calc(var(--rr) + 4px);
    background: var(--bg-card, #0a0a0a);
  }
  .vng--ghost .vng__list { border-color: transparent; background: transparent; }
  .vng__item { position: relative; z-index: 1; }

  .vng__trigger {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 36px;
    padding: 0 14px;
    border: 0;
    border-radius: var(--rr);
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    color: var(--text-muted, #888);
    background: transparent;
    transition: color 220ms ease, text-shadow 220ms ease;
  }
  .vng__label { position: relative; z-index: 1; }
  .vng__trigger:hover { color: var(--text, #ededed); }
  .vng__trigger[data-state='open'] {
    color: var(--ui-accent, #ededed);
    text-shadow: 0 0 calc(10px * var(--gi, 0.7)) color-mix(in srgb, var(--ui-accent, #ededed) 80%, transparent);
  }
  .vng__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .vng__chev { position: relative; z-index: 1; width: 13px; height: 13px; transition: transform 300ms var(--spring, ease); }
  .vng__chev.is-open { transform: rotate(180deg); }

  /* pulsing neon aura on the active trigger — unique effect (self-animated, out of flow) */
  .vng__aura {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: var(--rr);
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(
      circle at center,
      color-mix(in srgb, var(--ui-accent, #ededed) calc(var(--gi, 0.7) * 30%), transparent),
      transparent 72%
    );
    box-shadow:
      0 0 calc(16px * var(--gi, 0.7)) color-mix(in srgb, var(--ui-accent, #ededed) 55%, transparent),
      inset 0 0 0 1px color-mix(in srgb, var(--ui-accent, #ededed) 60%, transparent);
    transition: opacity 240ms ease;
  }
  @supports (corner-shape: squircle) { .vng--r-squircle .vng__aura { corner-shape: squircle; } }
  /* Perf: the open aura keeps the min shadow static; the max state is baked
     into ::after and only its opacity animates (compositable). The aura's
     enter fade (opacity transition) still multiplies into the child. */
  .vng__trigger[data-state='open'] .vng__aura {
    opacity: 1;
    box-shadow:
      0 0 calc(12px * var(--gi, 0.7)) color-mix(in srgb, var(--ui-accent, #ededed) 45%, transparent),
      inset 0 0 0 1px color-mix(in srgb, var(--ui-accent, #ededed) 55%, transparent);
  }
  .vng__aura::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow:
      0 0 calc(22px * var(--gi, 0.7)) color-mix(in srgb, var(--ui-accent, #ededed) 70%, transparent),
      inset 0 0 0 1px color-mix(in srgb, var(--ui-accent, #ededed) 70%, transparent);
    opacity: 0;
  }
  .vng__trigger[data-state='open'] .vng__aura::after {
    animation: vng-breathe 2.4s ease-in-out infinite;
  }

  @keyframes vng-breathe {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  .vng__bridge { position: absolute; top: 100%; left: 0; width: 100%; height: 12px; z-index: 49; }
  .vng__bridge[hidden] { display: none; }

  .vng__panel-wrap {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 50;
    margin-top: 8px;
    transform: translateX(-50%);
    border-radius: var(--rr);
    border: 1px solid color-mix(in srgb, var(--ui-accent, #ededed) calc(var(--gi, 0.7) * 55%), var(--border, #2a2a2a));
    background: var(--bg-elevated, #161616);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    box-shadow:
      0 18px 40px -20px rgba(0, 0, 0, 0.6),
      0 0 calc(28px * var(--gi, 0.7)) -6px color-mix(in srgb, var(--ui-accent, #ededed) 60%, transparent);
  }
  .vng__panel-wrap[hidden] { display: none; }
  @supports (corner-shape: squircle) { .vng--r-squircle .vng__panel-wrap { corner-shape: squircle; } }

  .vng__panel { display: grid; gap: 2px; padding: 6px; }
  .vng__panel--grid { grid-template-columns: repeat(2, minmax(0, 1fr)); width: 440px; }
  .vng__panel--list { width: 280px; }

  .vng__link {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 9px 12px;
    border-radius: calc(var(--rr) - 4px);
    text-decoration: none;
    color: inherit;
    transition: background 160ms ease;
  }
  .vng__link:hover { background: var(--bg-card, #0a0a0a); }
  .vng__link-title { font-size: 14px; font-weight: 600; line-height: 1.2; color: var(--text, #ededed); }
  .vng__link-desc { font-size: 12.5px; line-height: 1.35; color: var(--text-muted, #888); }

  .vng-r-enter-active, .vng-l-enter-active { transition: transform 320ms var(--spring, ease), opacity 240ms ease; }
  .vng-r-leave-active, .vng-l-leave-active { transition: transform 260ms var(--spring, ease), opacity 180ms ease; }
  .vng-r-enter-from { transform: translateX(-50%) translateX(24px); opacity: 0; }
  .vng-r-leave-to { transform: translateX(-50%) translateX(-24px); opacity: 0; }
  .vng-l-enter-from { transform: translateX(-50%) translateX(-24px); opacity: 0; }
  .vng-l-leave-to { transform: translateX(-50%) translateX(24px); opacity: 0; }

  .vng.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vng__aura, .vng__chev,
    .vng-r-enter-active, .vng-r-leave-active,
    .vng-l-enter-active, .vng-l-leave-active { transition-duration: 1ms; }
    .vng__trigger[data-state='open'] .vng__aura { animation: none; }
    .vng__trigger[data-state='open'] .vng__aura::after { animation: none; opacity: 0; }
    .vng__panel-wrap { -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
`,u=[{value:"products",label:"Products",layout:"grid",links:[{title:"Components",desc:"Buttons, inputs, overlays and more."},{title:"Sections",desc:"Complete blocks ready to use."},{title:"Templates",desc:"Prebuilt landings and dashboards."},{title:"Icons",desc:"1,500+ SVGs ready to copy."},{title:"Themes",desc:"Light, dark and your own tokens."},{title:"MCP",desc:"Bring the catalog to your agent."}]},{value:"solutions",label:"Solutions",layout:"list",links:[{title:"For startups",desc:"Ship your MVP in days, not months."},{title:"For agencies",desc:"Reuse and deliver faster."},{title:"For teams",desc:"One shared design system."}]},{value:"resources",label:"Resources",layout:"list",links:[{title:"Documentation",desc:"Install and usage guides."},{title:"Changelog",desc:"What's new in every release."},{title:"Support",desc:"Talk to the team."}]},{value:"pricing",label:"Pricing",href:"#"}],f="http://www.w3.org/2000/svg";function _(){const r=document.createElementNS(f,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true"),r.setAttribute("class","vng__chev");const t=document.createElementNS(f,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),r.appendChild(t),r}function g(r){return!!(r&&r.links&&r.links.length>0)}let p;function x(r){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=r;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(r,t){const e=t?x(String(t).trim()):null;if(!e){for(const n of y)r.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(n=>Math.round(s?n*.92:n+(255-n)*.16)),c=(n,d)=>r.style.setProperty(n,d);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(n,l);c("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(n,s?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])c(n,s?"0 0 0":"255 255 255");c("--vs-color",l),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["variant","tone","radius","bounce","disabled","intensity","active","color"];#t;#a;#i;#s=u;#l=new Map;#d=new Map;#p=new Map;#e="";#g="";#b=1;#v=!1;#r=null;#n=new Set;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#t=document.createElement("nav"),this.#t.className="vng",this.#a=document.createElement("ul"),this.#a.className="vng__list",this.#i=document.createElement("div"),this.#i.className="vng__bridge",this.#i.setAttribute("aria-hidden","true"),this.#i.hidden=!0,this.#t.append(this.#a,this.#i),t.append(e,this.#t),this.#e=this.getAttribute("active")??"",this.#t.addEventListener("pointerleave",this.#L),this.#t.addEventListener("keydown",this.#N)}connectedCallback(){m(this,this.getAttribute("color")),this.#x(),this.#h(),this.#o(),document.addEventListener("pointerdown",this.#k,!0)}disconnectedCallback(){document.removeEventListener("pointerdown",this.#k,!0);for(const t of[...this.#n])this.#c(t);this.#n.clear()}attributeChangedCallback(t){if(m(this,this.getAttribute("color")),!!this.#t){if(t==="active"){this.#e=this.getAttribute("active")??"",this.#o();return}this.#h()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&(e=i)}catch{}this.#s=e&&e.length?e:u,this.#t&&(this.#x(),this.#h(),this.#o())}get items(){return this.#s}get active(){return this.#e}set active(t){const e=t==null?"":String(t);e?this.setAttribute("active",e):this.removeAttribute("active")}#_(t){return this.#s.findIndex(e=>e.value===t)}#x(){this.#a.replaceChildren(),this.#l.clear(),this.#d.clear(),this.#p.clear(),this.#r=null;for(const t of[...this.#n])this.#c(t);this.#n.clear(),this.#s.forEach(t=>{const e=document.createElement("li");e.className="vng__item",e.dataset.value=t.value,e.addEventListener("pointerenter",()=>this.#u(t));const i=t.href&&!g(t),a=document.createElement(i?"a":"button");a.className="vng__trigger",i?a.setAttribute("href",t.href):(a.type="button",a.dataset.state="closed",a.setAttribute("aria-expanded","false"),a.addEventListener("click",()=>this.#u(t))),a.addEventListener("focus",()=>this.#u(t));const s=document.createElement("span");s.className="vng__aura",s.setAttribute("aria-hidden","true");const l=document.createElement("span");if(l.className="vng__label",l.textContent=t.label??"",a.append(s,l),!i&&g(t)){const o=_();a.appendChild(o),this.#p.set(t.value,o)}if(e.appendChild(a),this.#a.appendChild(e),this.#l.set(t.value,a),g(t)){const o=document.createElement("div");o.className="vng__panel-wrap",o.hidden=!0;const c=document.createElement("div");c.className=`vng__panel vng__panel--${t.layout||"list"}`;for(const n of t.links){const d=document.createElement("a");d.className="vng__link",d.setAttribute("href",n.href||"#");const v=document.createElement("span");if(v.className="vng__link-title",v.textContent=n.title??"",d.appendChild(v),n.desc){const h=document.createElement("span");h.className="vng__link-desc",h.textContent=n.desc,d.appendChild(h)}d.addEventListener("click",()=>this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:n,path:[t.value,n.title]}}))),c.appendChild(d)}o.appendChild(c),this.#t.appendChild(o),this.#d.set(t.value,o)}})}#y(){const t=(e,i)=>this.getAttribute(e)??i;this.#v=this.hasAttribute("disabled"),this.#t.className=`vng vng--t-${t("tone","default")} vng--r-${t("radius","rounded")} vng--${t("variant","solid")}`+(this.#v?" is-disabled":"")+(this.#e?" is-open":"")}#h(){this.#y();const t=(s,l)=>this.getAttribute(s)??l;let e=Number(t("bounce","0.55"));Number.isFinite(e)||(e=.55),e=Math.max(0,Math.min(1,e));const i=(1+e*.9).toFixed(3);this.#t.style.setProperty("--spring",`cubic-bezier(0.34, ${i}, 0.4, 1)`);let a=Number(t("intensity","0.7"));Number.isFinite(a)||(a=.7),a=Math.max(0,Math.min(1,a)),this.#t.style.setProperty("--gi",String(a))}#o(){this.#y(),this.#l.forEach((t,e)=>{if(t.tagName==="BUTTON"){const i=e===this.#e;t.dataset.state=i?"open":"closed",t.setAttribute("aria-expanded",i?"true":"false")}}),this.#p.forEach((t,e)=>t.classList.toggle("is-open",e===this.#e)),this.#i.hidden=!this.#e,this.#E(this.#d.get(this.#e)||null)}#u(t){if(this.#v)return;if(!g(t)){this.#m("");return}if(t.value===this.#e)return;const e=this.#_(this.#g),i=this.#_(t.value);e!==-1&&i!==-1&&(this.#b=i>e?1:-1),this.#g=t.value,this.#m(t.value)}#f(){this.#m(""),this.#g=""}#m(t){t!==this.#e&&(this.#e=t,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t}})),this.#o())}#E(t){if(t===this.#r)return;const e=this.#b===1?"vng-r":"vng-l";this.#r&&this.#C(this.#r,e),t&&this.#A(t,e),this.#r=t}#A(t,e){this.#c(t),t.hidden=!1,t.classList.remove(`${e}-leave-active`,`${e}-leave-to`),t.classList.add(`${e}-enter-from`,`${e}-enter-active`),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove(`${e}-enter-from`)),this.#w(t,()=>t.classList.remove(`${e}-enter-active`),340)}#C(t,e){this.#c(t),t.classList.remove(`${e}-enter-from`,`${e}-enter-active`),t.classList.add(`${e}-leave-active`),t.offsetWidth,requestAnimationFrame(()=>t.classList.add(`${e}-leave-to`)),this.#w(t,()=>{t.hidden=!0,t.classList.remove(`${e}-leave-active`,`${e}-leave-to`)},300)}#w(t,e,i){const a=()=>{t.removeEventListener("transitionend",t._vngEnd),clearTimeout(t._vngTimer),t._vngEnd=null,t._vngTimer=0,this.#n.delete(t),e()},s=l=>{l.target===t&&a()};t._vngEnd=s,t.addEventListener("transitionend",s),t._vngTimer=setTimeout(a,i),this.#n.add(t)}#c(t){t._vngEnd&&t.removeEventListener("transitionend",t._vngEnd),clearTimeout(t._vngTimer),t._vngEnd=null,t._vngTimer=0,this.#n.delete(t)}#k=t=>{t.composedPath().includes(this)||this.#f()};#L=()=>this.#f();#N=t=>{t.key==="Escape"&&this.#f()}}customElements.define("vs-nav-menu-glow",w);
