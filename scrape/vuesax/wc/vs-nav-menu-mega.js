const b=`
  /* max-width, not a breakpoint: the bar is shrink-to-fit, so without this it
     keeps its widest natural size and hangs out of any box narrower than the
     triggers laid end to end. */
  :host { display: inline-flex; max-width: 100%; }
  .vnm2 {
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
  .vnm2--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .vnm2--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .vnm2--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .vnm2--r-subtle { --rr: 10px; }
  .vnm2--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .vnm2--r-squircle { --rr: 22px; } }

  .vnm2__list {
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
  .vnm2--ghost .vnm2__list { border-color: transparent; background: transparent; }
  .vnm2__item { position: relative; z-index: 1; }

  .vnm2__trigger {
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
    transition: color 200ms ease, background 200ms ease;
  }
  .vnm2__trigger:hover,
  .vnm2__trigger[data-state='open'] { color: var(--text, #ededed); background: var(--bg-elevated, #161616); }
  .vnm2__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .vnm2__chev { width: 13px; height: 13px; color: var(--text-secondary, #a1a1a1); transition: transform 300ms var(--spring, ease); }
  .vnm2__chev.is-open { transform: rotate(180deg); }

  .vnm2__bridge { position: absolute; top: 100%; left: 0; width: 100%; height: 12px; z-index: 49; }
  .vnm2__bridge[hidden] { display: none; }

  /* fixed-width mega-panel, centered */
  .vnm2__panel-wrap {
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
    box-shadow: 0 22px 50px -22px rgba(0, 0, 0, 0.65);
  }
  .vnm2__panel-wrap[hidden] { display: none; }
  @supports (corner-shape: squircle) { .vnm2--r-squircle .vnm2__panel-wrap { corner-shape: squircle; } }

  /* only the active column is shown; others stay mounted but hidden in place */
  .vnm2__col[hidden] { display: none; }

  .vnm2__mega { display: grid; gap: 4px; padding: 10px; }
  .vnm2__mega--grid { grid-template-columns: repeat(3, minmax(0, 1fr)); width: 560px; }
  .vnm2__mega--list { grid-template-columns: repeat(2, minmax(0, 1fr)); width: 440px; }

  .vnm2__link {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 11px 13px;
    border-radius: calc(var(--rr) - 3px);
    text-decoration: none;
    color: inherit;
    border: 1px solid transparent;
    transition: background 160ms ease, border-color 160ms ease;
    /* staggered reveal — unique effect */
    opacity: 0;
    transform: translateY(10px);
    animation: vnm2-rise 420ms var(--spring, cubic-bezier(0.34, 1.4, 0.4, 1)) forwards;
    animation-delay: calc(var(--i, 0) * var(--stagger, 40ms));
  }
  .vnm2__link:hover {
    background: var(--bg-card, #0a0a0a);
    border-color: color-mix(in srgb, var(--ui-accent, #ededed) 40%, transparent);
  }
  .vnm2__link-title { font-size: 14px; font-weight: 600; line-height: 1.2; color: var(--text, #ededed); }
  .vnm2__link-desc { font-size: 12.5px; line-height: 1.35; color: var(--text-muted, #888); }

  @keyframes vnm2-rise {
    to { opacity: 1; transform: translateY(0); }
  }

  /* directional transition of the mega container */
  .vnm2__panel-wrap.vnm2-r-enter-active, .vnm2__panel-wrap.vnm2-l-enter-active { transition: transform 340ms var(--spring, ease), opacity 260ms ease; }
  .vnm2__panel-wrap.vnm2-r-leave-active, .vnm2__panel-wrap.vnm2-l-leave-active { transition: transform 260ms var(--spring, ease), opacity 180ms ease; }
  .vnm2__panel-wrap.vnm2-r-enter-from { transform: translateX(-50%) translateX(28px); opacity: 0; }
  .vnm2__panel-wrap.vnm2-r-leave-to { transform: translateX(-50%) translateX(-28px); opacity: 0; }
  .vnm2__panel-wrap.vnm2-l-enter-from { transform: translateX(-50%) translateX(-28px); opacity: 0; }
  .vnm2__panel-wrap.vnm2-l-leave-to { transform: translateX(-50%) translateX(28px); opacity: 0; }

  .vnm2.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vnm2__link {
      animation: none;
      opacity: 1;
      transform: none;
    }
    .vnm2__chev,
    .vnm2__panel-wrap.vnm2-r-enter-active, .vnm2__panel-wrap.vnm2-r-leave-active,
    .vnm2__panel-wrap.vnm2-l-enter-active, .vnm2__panel-wrap.vnm2-l-leave-active { transition-duration: 1ms; }
    .vnm2__panel-wrap { -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
`,v=[{value:"products",label:"Products",layout:"grid",links:[{title:"Components",desc:"Buttons, inputs, overlays and more."},{title:"Sections",desc:"Complete blocks ready to use."},{title:"Templates",desc:"Prebuilt landings and dashboards."},{title:"Icons",desc:"1,500+ SVGs ready to copy."},{title:"Themes",desc:"Light, dark and your own tokens."},{title:"MCP",desc:"Bring the catalog to your agent."}]},{value:"solutions",label:"Solutions",layout:"list",links:[{title:"For startups",desc:"Ship your MVP in days, not months."},{title:"For agencies",desc:"Reuse and deliver faster."},{title:"For teams",desc:"One shared design system."}]},{value:"resources",label:"Resources",layout:"list",links:[{title:"Documentation",desc:"Install and usage guides."},{title:"Changelog",desc:"What's new in every release."},{title:"Support",desc:"Talk to the team."}]},{value:"pricing",label:"Pricing",href:"#"}],u="http://www.w3.org/2000/svg";function _(){const s=document.createElementNS(u,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("aria-hidden","true"),s.setAttribute("class","vnm2__chev");const e=document.createElementNS(u,"path");return e.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-miterlimit","10"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),s.appendChild(e),s}function g(s){return!!(s&&s.links&&s.links.length>0)}let h;function x(s){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=s;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(s,e){const t=e?x(String(e).trim()):null;if(!t){for(const r of y)s.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),o=(r,d)=>s.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,l);o("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,a?"0 0 0":"255 255 255");o("--vs-color",l),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["variant","tone","radius","bounce","stagger","disabled","active","color"];#e;#l;#r;#n;#c=v;#p=[];#d=[];#m=[];#t="";#g="";#v=1;#s=0;#a=0;#o=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=b,this.#e=document.createElement("nav"),this.#e.className="vnm2",this.#l=document.createElement("ul"),this.#l.className="vnm2__list",this.#r=document.createElement("div"),this.#r.className="vnm2__bridge",this.#r.setAttribute("aria-hidden","true"),this.#r.hidden=!0,this.#n=document.createElement("div"),this.#n.className="vnm2__panel-wrap",this.#n.hidden=!0,this.#e.append(this.#l,this.#r,this.#n),e.append(t,this.#e),this.#e.addEventListener("pointerleave",this.#w),this.#e.addEventListener("pointerenter",this.#b),this.#e.addEventListener("keydown",this.#E)}connectedCallback(){f(this,this.getAttribute("color")),this.#t=this.getAttribute("active")??"",this.#f(),this.#u(),document.addEventListener("pointerdown",this.#_,!0)}disconnectedCallback(){document.removeEventListener("pointerdown",this.#_,!0),clearTimeout(this.#s),this.#s=0,clearTimeout(this.#a),this.#a=0,clearTimeout(this.#o),this.#o=0}attributeChangedCallback(e){if(f(this,this.getAttribute("color")),!!this.#e){if(e==="active"){this.#i(this.getAttribute("active")??"",!1);return}this.#u()}}set items(e){let t=null;if(Array.isArray(e))t=e;else if(typeof e=="string"&&e.trim())try{const n=JSON.parse(e);Array.isArray(n)&&(t=n)}catch{}this.#c=t&&t.length?t:v,this.#e&&(this.#f(),this.#u())}get items(){return this.#c}get active(){return this.#t}set active(e){this.#i(e==null?"":String(e),!1)}#f(){this.#l.replaceChildren(),this.#n.replaceChildren(),this.#p=[],this.#d=[],this.#m=[],this.#c.forEach((e,t)=>{const n=document.createElement("li");n.className="vnm2__item",n.dataset.value=e.value,n.addEventListener("pointerenter",()=>this.#h(e));let i;if(e.href&&!g(e))i=document.createElement("a"),i.className="vnm2__trigger",i.setAttribute("href",e.href),i.textContent=e.label??"",i.addEventListener("focus",()=>this.#h(e)),this.#d[t]=null,this.#m[t]=null;else{i=document.createElement("button"),i.type="button",i.className="vnm2__trigger",i.append(document.createTextNode((e.label??"")+" "));const a=_();i.appendChild(a),i.addEventListener("focus",()=>this.#h(e)),i.addEventListener("click",()=>this.#h(e)),this.#d[t]=a;const l=document.createElement("div");l.className="vnm2__col",l.hidden=!0;const c=document.createElement("div");c.className=`vnm2__mega vnm2__mega--${e.layout||"list"}`,(e.links||[]).forEach((o,r)=>{const d=document.createElement("a");d.className="vnm2__link",d.style.setProperty("--i",r),d.setAttribute("href",o.href||"#");const p=document.createElement("span");if(p.className="vnm2__link-title",p.textContent=o.title??"",d.appendChild(p),o.desc){const m=document.createElement("span");m.className="vnm2__link-desc",m.textContent=o.desc,d.appendChild(m)}d.addEventListener("click",m=>this.#C(m,e,o)),c.appendChild(d)}),l.appendChild(c),this.#n.appendChild(l),this.#m[t]=l}i.dataset.value=e.value,this.#p[t]=i,n.appendChild(i),this.#l.appendChild(n)}),this.#y()}#u(){const e=(a,l)=>this.getAttribute(a)??l,n=(1+Math.max(0,Math.min(1,Number(this.getAttribute("bounce"))||.55))*.9).toFixed(3),i=Math.max(0,Number(this.getAttribute("stagger"))||40);this.#e.className=`vnm2 vnm2--t-${e("tone","default")} vnm2--r-${e("radius","rounded")} vnm2--${e("variant","solid")}`+(this.hasAttribute("disabled")?" is-disabled":"")+(this.#t?" is-open":""),this.#e.style.setProperty("--spring",`cubic-bezier(0.34, ${n}, 0.4, 1)`),this.#e.style.setProperty("--stagger",`${i}ms`)}#h(e){if(!this.hasAttribute("disabled")){if(this.#b(),clearTimeout(this.#s),!g(e)){this.#i("",!0);return}e.value!==this.#t&&(this.#s=setTimeout(()=>this.#i(e.value,!0),60))}}#w=()=>{clearTimeout(this.#s),this.#s=0,clearTimeout(this.#a),this.#a=setTimeout(()=>this.#i("",!0),90)};#b=()=>{clearTimeout(this.#a),this.#a=0};#_=e=>{e.composedPath().includes(this)||this.#i("",!1)};#E=e=>{e.key==="Escape"&&this.#t&&(e.preventDefault(),this.#i("",!1))};#x(e){return this.#c.findIndex(t=>t.value===e)}#i(e,t){if(e===this.#t)return;const n=this.#x(this.#g),i=this.#x(e);e&&n!==-1&&i!==-1&&(this.#v=i>n?1:-1),this.#t=e,this.#g=e||"",this.#y(),this.#e.classList.toggle("is-open",!!this.#t),t&&(this.dispatchEvent(new CustomEvent("update:active",{bubbles:!0,composed:!0,detail:{value:e}})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e}})))}#y(){const e=!!this.#t;e?this.#k():this.#A(),this.#r.hidden=!e,this.#c.forEach((t,n)=>{const i=t.value===this.#t,a=this.#p[n];a&&a.tagName==="BUTTON"&&(a.dataset.state=i?"open":"closed",a.setAttribute("aria-expanded",i?"true":"false"));const l=this.#d[n];l&&l.classList.toggle("is-open",i);const c=this.#m[n];c&&(c.hidden=!i)})}#k(){const e=this.#n;clearTimeout(this.#o),e.hidden=!1;const t=this.#v===1?"vnm2-r":"vnm2-l";e.classList.remove("vnm2-r-leave-active","vnm2-r-leave-to","vnm2-l-leave-active","vnm2-l-leave-to"),e.classList.add(`${t}-enter-from`,`${t}-enter-active`),e.offsetWidth,requestAnimationFrame(()=>e.classList.remove(`${t}-enter-from`)),this.#o=setTimeout(()=>e.classList.remove(`${t}-enter-active`),360)}#A(){const e=this.#n;if(e.hidden)return;clearTimeout(this.#o);const t=this.#v===1?"vnm2-r":"vnm2-l";e.classList.remove(`${t}-enter-from`,`${t}-enter-active`),e.classList.add(`${t}-leave-active`),e.offsetWidth,requestAnimationFrame(()=>e.classList.add(`${t}-leave-to`)),this.#o=setTimeout(()=>{e.hidden=!0,e.classList.remove("vnm2-r-leave-active","vnm2-r-leave-to","vnm2-l-leave-active","vnm2-l-leave-to")},280)}#C(e,t,n){this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:n,path:[t.value,n.title]}})),(!n.href||n.href==="#")&&e.preventDefault(),this.#i("",!1)}}customElements.define("vs-nav-menu-mega",w);
