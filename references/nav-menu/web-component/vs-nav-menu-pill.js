const d=[{value:"products",label:"Products",layout:"grid",links:[{title:"Components",desc:"Buttons, inputs, overlays and more."},{title:"Sections",desc:"Complete blocks ready to use."},{title:"Templates",desc:"Prebuilt landings and dashboards."},{title:"Icons",desc:"1,500+ SVGs ready to copy."},{title:"Themes",desc:"Light, dark and your own tokens."},{title:"MCP",desc:"Bring the catalog to your agent."}]},{value:"solutions",label:"Solutions",layout:"list",links:[{title:"For startups",desc:"Ship your MVP in days, not months."},{title:"For agencies",desc:"Reuse and deliver faster."},{title:"For teams",desc:"One shared design system."}]},{value:"resources",label:"Resources",layout:"list",links:[{title:"Documentation",desc:"Install and usage guides."},{title:"Changelog",desc:"What's new in every release."},{title:"Support",desc:"Talk to the team."}]},{value:"pricing",label:"Pricing",href:"#"}],f=`
  /* max-width, not a breakpoint: the bar is shrink-to-fit, so without this it
     keeps its widest natural size and hangs out of any box narrower than the
     triggers laid end to end. */
  :host { display: inline-flex; max-width: 100%; }
  .vnp {
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
  .vnp--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .vnp--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .vnp--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .vnp--r-subtle { --rr: 10px; }
  .vnp--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .vnp--r-squircle { --rr: 22px; } }

  .vnp__list {
    position: relative;
    isolation: isolate;
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
  .vnp--ghost .vnp__list { border-color: transparent; background: transparent; }

  /* sliding filled pill — unique effect */
  .vnp__pill {
    position: absolute;
    top: 4px;
    left: 0;
    z-index: 0;
    border-radius: var(--rr);
    background: color-mix(in srgb, var(--ui-accent, #ededed) calc(var(--fill, 1) * 100%), transparent);
    box-shadow: 0 6px 18px -8px color-mix(in srgb, var(--ui-accent, #ededed) 70%, transparent);
    opacity: 0;
    pointer-events: none;
    transform-origin: left center;
    transition:
      transform 360ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      width 360ms var(--spring, cubic-bezier(0.34, 1.5, 0.4, 1)),
      opacity 200ms ease;
  }
  .vnp__pill.is-on { opacity: 1; }
  @supports (corner-shape: squircle) { .vnp--r-squircle .vnp__pill { corner-shape: squircle; } }

  .vnp__item { position: relative; z-index: 1; }
  .vnp__trigger {
    position: relative;
    z-index: 1;
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
    transition: color 220ms ease;
  }
  /* text inverts to a contrast color on top of the pill */
  .vnp__trigger.is-lit { color: var(--accent-fg, #0b0b0b); }
  .vnp__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .vnp__chev { width: 13px; height: 13px; transition: transform 300ms var(--spring, ease); }
  .vnp__chev.is-open { transform: rotate(180deg); }

  .vnp__bridge { position: absolute; top: 100%; left: 0; width: 100%; height: 12px; z-index: 49; }
  .vnp__bridge[hidden] { display: none; }

  .vnp__panel-wrap {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 50;
    margin-top: 8px;
    transform: translateX(-50%);
    border-radius: var(--rr);
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-elevated, #161616);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    box-shadow: 0 18px 40px -20px rgba(0, 0, 0, 0.6);
  }
  .vnp__panel-wrap[hidden] { display: none; }
  @supports (corner-shape: squircle) { .vnp--r-squircle .vnp__panel-wrap { corner-shape: squircle; } }

  .vnp__panel { display: grid; gap: 2px; padding: 6px; }
  .vnp__panel--grid { grid-template-columns: repeat(2, minmax(0, 1fr)); width: 440px; }
  .vnp__panel--list { width: 280px; }

  .vnp__link {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 9px 12px;
    border-radius: calc(var(--rr) - 4px);
    text-decoration: none;
    color: inherit;
    transition: background 160ms ease;
  }
  .vnp__link:hover { background: var(--bg-card, #0a0a0a); }
  .vnp__link-title { font-size: 14px; font-weight: 600; line-height: 1.2; color: var(--text, #ededed); }
  .vnp__link-desc { font-size: 12.5px; line-height: 1.35; color: var(--text-muted, #888); }

  .vnp-r-enter-active, .vnp-l-enter-active { transition: transform 320ms var(--spring, ease), opacity 240ms ease; }
  .vnp-r-leave-active, .vnp-l-leave-active { transition: transform 260ms var(--spring, ease), opacity 180ms ease; }
  .vnp-r-enter-from { transform: translateX(-50%) translateX(24px); opacity: 0; }
  .vnp-r-leave-to { transform: translateX(-50%) translateX(-24px); opacity: 0; }
  .vnp-l-enter-from { transform: translateX(-50%) translateX(-24px); opacity: 0; }
  .vnp-l-leave-to { transform: translateX(-50%) translateX(24px); opacity: 0; }

  .vnp.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vnp__pill, .vnp__chev,
    .vnp-r-enter-active, .vnp-r-leave-active,
    .vnp-l-enter-active, .vnp-l-leave-active { transition-duration: 1ms; }
    .vnp__panel-wrap { -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
`,h="http://www.w3.org/2000/svg";function m(){const a=document.createElementNS(h,"svg");a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("aria-hidden","true"),a.setAttribute("class","vnp__chev");const t=document.createElementNS(h,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),a.appendChild(t),a}let c;function g(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(a,t){const e=t?g(String(t).trim()):null;if(!e){for(const r of b)a.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,p=e.map(r=>Math.round(s?r*.92:r+(255-r)*.16)),l=(r,u)=>a.style.setProperty(r,u);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(r,o);l("--btn-primary-bg-hover",`rgb(${p[0]} ${p[1]} ${p[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(r,s?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])l(r,s?"0 0 0":"255 255 255");l("--vs-color",o),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["variant","tone","radius","bounce","fill","disabled","active","color"];#e;#i;#n;#r;#a;#o;#c=d;#p=[];#t="";#v="";#b="";#x=1;#_=!1;#l=0;#u=null;#d=null;#h=null;#y=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#e=document.createElement("nav"),this.#e.className="vnp",this.#i=document.createElement("ul"),this.#i.className="vnp__list",this.#n=document.createElement("span"),this.#n.className="vnp__pill",this.#n.setAttribute("aria-hidden","true"),this.#i.appendChild(this.#n),this.#r=document.createElement("div"),this.#r.className="vnp__bridge",this.#r.setAttribute("aria-hidden","true"),this.#r.hidden=!0,this.#a=document.createElement("div"),this.#a.className="vnp__panel-wrap",this.#a.hidden=!0,this.#o=document.createElement("div"),this.#o.className="vnp__panel vnp__panel--list",this.#a.appendChild(this.#o),this.#e.append(this.#i,this.#r,this.#a),t.append(e,this.#e),this.#e.addEventListener("pointerleave",this.#q),this.#e.addEventListener("keydown",this.#B)}connectedCallback(){v(this,this.getAttribute("color")),this.#t=this.getAttribute("active")??"",this.#N(),this.#L(),document.addEventListener("pointerdown",this.#z,!0),window.addEventListener("resize",this.#s,{passive:!0}),this.#u=new ResizeObserver(this.#s),this.#u.observe(this.#i),this.#t&&this.#S(this.#t,!0),this.#s()}disconnectedCallback(){document.removeEventListener("pointerdown",this.#z,!0),window.removeEventListener("resize",this.#s),this.#u?.disconnect(),this.#u=null,this.#l&&cancelAnimationFrame(this.#l),this.#l=0,this.#E()}attributeChangedCallback(t){if(v(this,this.getAttribute("color")),!!this.#e){if(t==="active"){this.#m(this.getAttribute("active")??"",!1);return}this.#L()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&(e=i)}catch{}this.#c=e&&e.length?e:d,this.#e&&(this.#N(),this.#s())}get items(){return this.#c}get active(){return this.#t}set active(t){t?this.setAttribute("active",String(t)):this.removeAttribute("active")}#k(t){return!!t.links&&t.links.length>0}#C(t){return this.#c.findIndex(e=>e.value===t)}#A(){return this.hasAttribute("disabled")}#L(){const t=(s,o)=>this.getAttribute(s)??o;this.#e.className=`vnp vnp--t-${t("tone","default")} vnp--r-${t("radius","rounded")} vnp--${t("variant","solid")}`+(this.#A()?" is-disabled":"")+(this.#t?" is-open":"");const i=(1+Math.max(0,Math.min(1,Number(t("bounce","0.55"))))*.9).toFixed(3);this.#e.style.setProperty("--spring",`cubic-bezier(0.34, ${i}, 0.4, 1)`);const n=Math.max(0,Math.min(1,Number(t("fill","1"))));this.#e.style.setProperty("--fill",String(n))}#N(){for(;this.#i.lastChild&&this.#i.lastChild!==this.#n;)this.#i.removeChild(this.#i.lastChild);this.#p=[],this.#c.forEach(t=>{const e=document.createElement("li");e.className="vnp__item",e.dataset.value=t.value,e.addEventListener("pointerenter",()=>this.#f(t));const i=this.#k(t);let n,s=null;t.href&&!i?(n=document.createElement("a"),n.className="vnp__trigger",n.href=t.href,n.textContent=t.label,n.addEventListener("focus",()=>this.#f(t)),n.addEventListener("click",()=>this.#X(t))):(n=document.createElement("button"),n.type="button",n.className="vnp__trigger",n.append(document.createTextNode(t.label+" ")),s=m(),n.appendChild(s),n.addEventListener("focus",()=>this.#f(t)),n.addEventListener("click",()=>this.#f(t))),e.appendChild(n),this.#i.appendChild(e),this.#p.push({value:t.value,item:t,triggerEl:n,chevEl:s,hasContent:i})}),this.#g(),this.#$()}#f(t){if(this.#A())return;if(this.#v=t.value,this.#g(),this.#s(),!this.#k(t)){this.#m("",!0);return}if(t.value===this.#t)return;const e=this.#C(this.#b),i=this.#C(t.value);e!==-1&&i!==-1&&(this.#x=i>e?1:-1),this.#b=t.value,this.#m(t.value,!0)}#q=()=>this.#w();#w(){this.#v="",this.#b="",this.#g(),this.#s(),this.#m("",!0)}#m(t,e){const i=this.#t;t!==i&&(this.#t=t,this.active=t,this.#$(),this.#g(),this.#s(),this.#t?this.#S(this.#t,!i):this.#M(),e&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t}})))}#g(){const t=this.#v||this.#t;for(const e of this.#p)e.triggerEl.classList.toggle("is-lit",e.value===t)}#$(){this.#e.classList.toggle("is-open",!!this.#t);for(const t of this.#p){const e=t.value===this.#t;t.chevEl&&t.chevEl.classList.toggle("is-open",e),t.triggerEl.setAttribute("data-state",e?"open":"closed"),t.hasContent&&t.triggerEl.setAttribute("aria-expanded",e?"true":"false")}}#T(t){const e=this.#c.find(i=>i.value===t);e&&(this.#o.className=`vnp__panel vnp__panel--${e.layout||"list"}`,this.#o.replaceChildren(),(e.links||[]).forEach(i=>{const n=document.createElement("a");n.className="vnp__link",n.href=i.href||"#";const s=document.createElement("span");if(s.className="vnp__link-title",s.textContent=i.title,n.appendChild(s),i.desc){const o=document.createElement("span");o.className="vnp__link-desc",o.textContent=i.desc,n.appendChild(o)}n.addEventListener("click",()=>this.#F(e,i)),this.#o.appendChild(n)}))}#S(t,e){this.#T(t),this.#r.hidden=!1;const i=this.#a,n=this.#x===1?"r":"l";this.#E(),i.classList.remove("vnp-r-leave-active","vnp-l-leave-active","vnp-r-leave-to","vnp-l-leave-to"),i.hidden=!1,this.#_=!0,e&&(i.classList.add(`vnp-${n}-enter-from`,`vnp-${n}-enter-active`),i.offsetWidth,requestAnimationFrame(()=>i.classList.remove(`vnp-${n}-enter-from`)),this.#P(i,()=>i.classList.remove(`vnp-${n}-enter-active`),360))}#M(){if(!this.#_)return;this.#_=!1,this.#r.hidden=!0;const t=this.#a,e=this.#x===1?"r":"l";this.#E(),t.classList.remove(`vnp-${e}-enter-from`,`vnp-${e}-enter-active`),t.classList.add(`vnp-${e}-leave-active`),t.offsetWidth,requestAnimationFrame(()=>t.classList.add(`vnp-${e}-leave-to`)),this.#P(t,()=>{t.hidden=!0,t.classList.remove("vnp-r-leave-active","vnp-l-leave-active","vnp-r-leave-to","vnp-l-leave-to")},300)}#P(t,e,i){const n=()=>{t.removeEventListener("transitionend",s),clearTimeout(this.#y),this.#d=null,this.#h=null,e()},s=o=>{o.target===t&&n()};this.#d=s,this.#h=t,t.addEventListener("transitionend",s),this.#y=setTimeout(n,i)}#E(){this.#d&&this.#h&&this.#h.removeEventListener("transitionend",this.#d),clearTimeout(this.#y),this.#d=null,this.#h=null}#s=()=>{this.#l||(this.#l=requestAnimationFrame(()=>{this.#l=0;const t=this.#v||this.#t,e=this.#p.find(s=>s.value===t);if(!e){this.#n.classList.remove("is-on");return}const i=this.#i.getBoundingClientRect(),n=e.triggerEl.getBoundingClientRect();this.#n.style.transform=`translateX(${n.left-i.left}px)`,this.#n.style.width=`${n.width}px`,this.#n.style.height=`${n.height}px`,this.#n.classList.add("is-on")}))};#X(t){this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t,path:[t.value]}}))}#F(t,e){this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,path:[t.value,e.title]}}))}#z=t=>{t.composedPath().includes(this)||this.#w()};#B=t=>{t.key==="Escape"&&this.#w()}}customElements.define("vs-nav-menu-pill",x);
