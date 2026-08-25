const f=`
  /* max-width, not a breakpoint: the bar is shrink-to-fit, so without this it
     keeps its widest natural size and hangs out of any box narrower than the
     triggers laid end to end. */
  :host { display: inline-flex; max-width: 100%; }
  .vnu {
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
  .vnu--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .vnu--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .vnu--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .vnu--r-subtle { --rr: 10px; }
  .vnu--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .vnu--r-squircle { --rr: 22px; } }

  .vnu__list {
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
  .vnu--ghost .vnu__list { border-color: transparent; background: transparent; }
  .vnu__item { position: relative; z-index: 1; }

  .vnu__trigger {
    position: relative;
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
    transition: color 200ms ease;
  }
  .vnu__trigger:hover,
  .vnu__trigger[data-state='open'] { color: var(--text, #ededed); }
  .vnu__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .vnu__chev { width: 13px; height: 13px; color: var(--text-secondary, #a1a1a1); transition: transform 300ms var(--spring, ease); }
  .vnu__chev.is-open { transform: rotate(180deg); }

  /* sliding underline bar — unique effect */
  .vnu__bar {
    position: absolute;
    bottom: 2px;
    left: 0;
    height: var(--bar-h, 2px);
    border-radius: 999px;
    background: var(--ui-accent, #ededed);
    box-shadow: 0 0 8px -1px var(--ui-accent, #ededed);
    opacity: 0;
    transform-origin: center;
    pointer-events: none;
    transition:
      transform 340ms var(--spring, cubic-bezier(0.34, 1.4, 0.4, 1)),
      width 340ms var(--spring, cubic-bezier(0.34, 1.4, 0.4, 1)),
      opacity 180ms ease;
  }
  .vnu__bar.is-on { opacity: 1; }

  .vnu__bridge { position: absolute; top: 100%; left: 0; width: 100%; height: 12px; z-index: 49; }
  .vnu__bridge[hidden] { display: none; }

  /* submenu panel */
  .vnu__panel-wrap {
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
  .vnu__panel-wrap[hidden] { display: none; }
  @supports (corner-shape: squircle) { .vnu--r-squircle .vnu__panel-wrap { corner-shape: squircle; } }

  .vnu__panel { display: grid; gap: 2px; padding: 6px; }
  .vnu__panel--grid { grid-template-columns: repeat(2, minmax(0, 1fr)); width: 440px; }
  .vnu__panel--list { width: 280px; }

  .vnu__link {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 9px 12px;
    border-radius: calc(var(--rr) - 4px);
    text-decoration: none;
    color: inherit;
    transition: background 160ms ease;
  }
  .vnu__link:hover { background: var(--bg-card, #0a0a0a); }
  .vnu__link-title { font-size: 14px; font-weight: 600; line-height: 1.2; color: var(--text, #ededed); }
  .vnu__link-desc { font-size: 12.5px; line-height: 1.35; color: var(--text-muted, #888); }

  /* directional panel transition */
  .vnu-r-enter-active, .vnu-l-enter-active { transition: transform 320ms var(--spring, ease), opacity 240ms ease; }
  .vnu-r-leave-active, .vnu-l-leave-active { transition: transform 260ms var(--spring, ease), opacity 180ms ease; }
  .vnu-r-enter-from { transform: translateX(-50%) translateX(24px); opacity: 0; }
  .vnu-r-leave-to { transform: translateX(-50%) translateX(-24px); opacity: 0; }
  .vnu-l-enter-from { transform: translateX(-50%) translateX(-24px); opacity: 0; }
  .vnu-l-leave-to { transform: translateX(-50%) translateX(24px); opacity: 0; }

  .vnu.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vnu__bar, .vnu__chev,
    .vnu-r-enter-active, .vnu-r-leave-active,
    .vnu-l-enter-active, .vnu-l-leave-active { transition-duration: 1ms; }
    .vnu__panel-wrap { -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
`,u=[{value:"productos",label:"Products",layout:"grid",links:[{title:"Components",desc:"Buttons, inputs, overlays and more."},{title:"Sections",desc:"Complete blocks ready to use."},{title:"Templates",desc:"Prebuilt landings and dashboards."},{title:"Icons",desc:"1,500+ SVGs ready to copy."},{title:"Themes",desc:"Light, dark and your own tokens."},{title:"MCP",desc:"Bring the catalog to your agent."}]},{value:"soluciones",label:"Solutions",layout:"list",links:[{title:"For startups",desc:"Ship your MVP in days, not months."},{title:"For agencies",desc:"Reuse and deliver faster."},{title:"For teams",desc:"One shared design system."}]},{value:"recursos",label:"Resources",layout:"list",links:[{title:"Documentation",desc:"Install and usage guides."},{title:"Changelog",desc:"What's new in every release."},{title:"Support",desc:"Talk to the team."}]},{value:"precios",label:"Pricing",href:"#"}],h="http://www.w3.org/2000/svg";function b(){const s=document.createElementNS(h,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("aria-hidden","true"),s.setAttribute("class","vnu__chev");const t=document.createElementNS(h,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),s.appendChild(t),s}function v(s){return!!(s&&s.links&&s.links.length>0)}let c;function g(s){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=s;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(s,t){const e=t?g(String(t).trim()):null;if(!e){for(const n of x)s.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(n=>Math.round(a?n*.92:n+(255-n)*.16)),o=(n,m)=>s.style.setProperty(n,m);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,l);o("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,a?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,a?"0 0 0":"255 255 255");o("--vs-color",l),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["variant","tone","radius","bounce","disabled","thickness","active","color"];#t;#i;#n;#s;#a;#o;#c=u;#v=new Map;#e="";#p="";#m="";#g=1;#x="";#f=null;#l=0;#d=null;#u=null;#_=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("nav"),this.#t.className="vnu",this.#i=document.createElement("ul"),this.#i.className="vnu__list",this.#n=document.createElement("span"),this.#n.className="vnu__bar",this.#n.setAttribute("aria-hidden","true"),this.#i.appendChild(this.#n),this.#s=document.createElement("div"),this.#s.className="vnu__bridge",this.#s.setAttribute("aria-hidden","true"),this.#s.hidden=!0,this.#a=document.createElement("div"),this.#a.className="vnu__panel-wrap",this.#a.hidden=!0,this.#o=document.createElement("div"),this.#o.className="vnu__panel vnu__panel--list",this.#a.appendChild(this.#o),this.#t.append(this.#i,this.#s,this.#a),t.append(e,this.#t),this.#t.addEventListener("pointerleave",this.#P),this.#t.addEventListener("keydown",this.#q)}connectedCallback(){p(this,this.getAttribute("color")),this.hasAttribute("active")&&(this.#e=this.getAttribute("active")),this.#A(),this.#w(),window.addEventListener("resize",this.#r,{passive:!0}),document.addEventListener("pointerdown",this.#T,!0),this.#f=new ResizeObserver(()=>this.#r()),this.#f.observe(this.#i)}disconnectedCallback(){window.removeEventListener("resize",this.#r),document.removeEventListener("pointerdown",this.#T,!0),this.#f?.disconnect(),this.#f=null,this.#l&&(cancelAnimationFrame(this.#l),this.#l=0),this.#E()}attributeChangedCallback(t){if(p(this,this.getAttribute("color")),!!this.#t){if(t==="active"){this.#h(this.getAttribute("active")??"",!1);return}this.#w()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const i=JSON.parse(t);Array.isArray(i)&&(e=i)}catch{}this.#c=e&&e.length?e:u,this.#t&&(this.#e="",this.#p="",this.#m="",this.#A(),this.#L(""),this.#r())}get items(){return this.#c}get active(){return this.#e}set active(t){this.#h(t==null?"":String(t),!0)}#y(t){return this.#c.findIndex(e=>e.value===t)}#w(){const t=(a,l)=>this.getAttribute(a)??l;this.#t.className=`vnu vnu--t-${t("tone","default")} vnu--r-${t("radius","rounded")} vnu--${t("variant","solid")}`+(this.hasAttribute("disabled")?" is-disabled":"")+(this.#e?" is-open":"");const i=(1+Math.max(0,Math.min(1,Number(this.getAttribute("bounce")??.55)||0))*.9).toFixed(3);this.#t.style.setProperty("--spring",`cubic-bezier(0.34, ${i}, 0.4, 1)`);const r=Math.max(1,Number(this.getAttribute("thickness"))||2);this.#t.style.setProperty("--bar-h",`${r}px`)}#A(){for(this.#v.clear();this.#i.lastElementChild&&this.#i.lastElementChild!==this.#n;)this.#i.lastElementChild.remove();for(const t of this.#c){const e=document.createElement("li");e.className="vnu__item",e.setAttribute("data-value",t.value),e.addEventListener("pointerenter",()=>this.#b(t));let i;t.href&&!v(t)?(i=document.createElement("a"),i.className="vnu__trigger",i.href=t.href,i.textContent=t.label??"",i.addEventListener("focus",()=>this.#b(t)),i.addEventListener("click",()=>this.#S(t,[t]))):(i=document.createElement("button"),i.type="button",i.className="vnu__trigger",i.setAttribute("data-state",this.#e===t.value?"open":"closed"),i.setAttribute("aria-expanded",this.#e===t.value?"true":"false"),i.append(document.createTextNode(t.label??""),b()),i.addEventListener("focus",()=>this.#b(t)),i.addEventListener("click",()=>this.#b(t))),this.#v.set(t.value,i),e.appendChild(i),this.#i.appendChild(e)}this.#C()}#C(){for(const[t,e]of this.#v){const i=t===this.#e;if(e.tagName==="BUTTON"){e.setAttribute("data-state",i?"open":"closed"),e.setAttribute("aria-expanded",i?"true":"false");const r=e.querySelector(".vnu__chev");r&&r.classList.toggle("is-open",i)}}}#b(t){if(this.hasAttribute("disabled"))return;if(this.#p=t.value,!v(t)){this.#h("",!0),this.#r();return}if(t.value===this.#e){this.#r();return}const e=this.#y(this.#m),i=this.#y(t.value);e!==-1&&i!==-1&&(this.#g=i>e?1:-1),this.#m=t.value,this.#h(t.value,!0)}#P=()=>{this.hasAttribute("disabled")||this.#k()};#k(){this.#p="",this.#m="",this.#h("",!0)}#h(t,e){if(t===this.#e&&this.#x===t){this.#r();return}this.#e=t,e&&(this.dispatchEvent(new CustomEvent("update:active",{bubbles:!0,composed:!0,detail:t})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:t}))),this.#w(),this.#C(),this.#L(t),this.#r()}#L(t){if(!t){this.#s.hidden=!0,this.#N();return}const e=this.#c[this.#y(t)];if(!e){this.#s.hidden=!0,this.#N();return}this.#x=t,this.#z(e),this.#s.hidden=!1,this.#B()}#z(t){this.#o.className=`vnu__panel vnu__panel--${t.layout||"list"}`,this.#o.replaceChildren();for(const e of t.links||[]){const i=document.createElement("a");i.className="vnu__link",i.href=e.href||"#";const r=document.createElement("span");if(r.className="vnu__link-title",r.textContent=e.title??"",i.appendChild(r),e.desc){const a=document.createElement("span");a.className="vnu__link-desc",a.textContent=e.desc,i.appendChild(a)}i.addEventListener("click",()=>this.#S(e,[t,e])),this.#o.appendChild(i)}}#B(){const t=this.#a,e=this.#g===1?"vnu-r":"vnu-l";this.#E(),t.hidden=!1,t.classList.remove("vnu-r-enter-active","vnu-l-enter-active","vnu-r-leave-active","vnu-l-leave-active","vnu-r-leave-to","vnu-l-leave-to","vnu-r-enter-from","vnu-l-enter-from"),t.classList.add(`${e}-enter-from`,`${e}-enter-active`),t.offsetWidth,requestAnimationFrame(()=>t.classList.remove(`${e}-enter-from`)),this.#$(t,()=>t.classList.remove(`${e}-enter-active`),400)}#N(){const t=this.#a;if(t.hidden)return;const e=this.#g===1?"vnu-r":"vnu-l";this.#E(),t.classList.remove("vnu-r-enter-from","vnu-l-enter-from","vnu-r-enter-active","vnu-l-enter-active"),t.classList.add(`${e}-leave-active`),t.offsetWidth,requestAnimationFrame(()=>t.classList.add(`${e}-leave-to`)),this.#$(t,()=>{t.hidden=!0,t.classList.remove(`${e}-leave-active`,`${e}-leave-to`),this.#x=""},320)}#S(t,e){this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t,path:e}}))}#r=()=>{this.#l||(this.#l=requestAnimationFrame(()=>{this.#l=0,this.#M()}))};#M(){const t=this.#p||this.#e,e=t?this.#v.get(t):null;if(!e){this.#n.classList.remove("is-on");return}const i=this.#i.getBoundingClientRect(),r=e.getBoundingClientRect();this.#n.style.transform=`translateX(${r.left-i.left}px)`,this.#n.style.width=`${r.width}px`,this.#n.classList.add("is-on")}#$(t,e,i){const r=()=>{t.removeEventListener("transitionend",a),clearTimeout(this.#_),this.#d=null,this.#u=null,e()},a=l=>{l.target===t&&r()};this.#d=a,this.#u=t,t.addEventListener("transitionend",a),this.#_=setTimeout(r,i)}#E(){this.#d&&this.#u&&this.#u.removeEventListener("transitionend",this.#d),clearTimeout(this.#_),this.#d=null,this.#u=null}#T=t=>{t.composedPath().includes(this)||this.#k()};#q=t=>{t.key==="Escape"&&this.#k()}}customElements.define("vs-nav-menu-underline",_);
