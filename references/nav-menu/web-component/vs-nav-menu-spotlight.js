const m=`
  /* max-width, not a breakpoint: the bar is shrink-to-fit, so without this it
     keeps its widest natural size and hangs out of any box narrower than the
     triggers laid end to end. */
  :host { display: inline-flex; max-width: 100%; }
  .vns {
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
  .vns--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .vns--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .vns--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .vns--r-subtle { --rr: 10px; }
  .vns--r-pill { --rr: 22px; }
  @supports (corner-shape: squircle) { .vns--r-squircle { --rr: 22px; } }

  .vns__list {
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
    overflow: hidden;
  }
  .vns--ghost .vns__list { border-color: transparent; background: transparent; }

  /* radial spotlight that follows the cursor — unique effect (out of flow) */
  .vns__spot {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    border-radius: inherit;
    opacity: var(--son, 0);
    background: radial-gradient(
      var(--spot, 120px) circle at var(--sx, 50%) var(--sy, 50%),
      color-mix(in srgb, var(--ui-accent, #ededed) 32%, transparent),
      transparent 70%
    );
    transition: opacity 220ms ease;
  }
  .vns__spot--panel {
    border-radius: var(--rr);
    background: radial-gradient(
      var(--spot, 120px) circle at var(--sx, 50%) var(--sy, 50%),
      color-mix(in srgb, var(--ui-accent, #ededed) 22%, transparent),
      transparent 70%
    );
  }

  .vns__item { position: relative; z-index: 1; }
  .vns__trigger {
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
  .vns__trigger:hover,
  .vns__trigger[data-state='open'] { color: var(--text, #ededed); }
  .vns__trigger:focus-visible { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }
  .vns__chev { width: 13px; height: 13px; color: var(--text-secondary, #a1a1a1); transition: transform 300ms var(--spring, ease); }
  .vns__chev.is-open { transform: rotate(180deg); }

  .vns__bridge { position: absolute; top: 100%; left: 0; width: 100%; height: 12px; z-index: 49; }
  .vns__bridge[hidden] { display: none; }

  .vns__panel-wrap {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 50;
    margin-top: 8px;
    transform: translateX(-50%);
    isolation: isolate;
    overflow: hidden;
    border-radius: var(--rr);
    border: 1px solid var(--border, #2a2a2a);
    background: var(--bg-elevated, #161616);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    box-shadow: 0 18px 40px -20px rgba(0, 0, 0, 0.6);
  }
  .vns__panel-wrap[hidden] { display: none; }
  @supports (corner-shape: squircle) { .vns--r-squircle .vns__panel-wrap { corner-shape: squircle; } }

  .vns__panel { position: relative; z-index: 1; display: grid; gap: 2px; padding: 6px; }
  .vns__panel--grid { grid-template-columns: repeat(2, minmax(0, 1fr)); width: 440px; }
  .vns__panel--list { width: 280px; }

  .vns__link {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 9px 12px;
    border-radius: calc(var(--rr) - 4px);
    text-decoration: none;
    color: inherit;
    transition: background 160ms ease;
  }
  .vns__link:hover { background: color-mix(in srgb, var(--bg-card, #0a0a0a) 70%, transparent); }
  .vns__link-title { font-size: 14px; font-weight: 600; line-height: 1.2; color: var(--text, #ededed); }
  .vns__link-desc { font-size: 12.5px; line-height: 1.35; color: var(--text-muted, #888); }

  .vns-r-enter-active, .vns-l-enter-active { transition: transform 320ms var(--spring, ease), opacity 240ms ease; }
  .vns-r-leave-active, .vns-l-leave-active { transition: transform 260ms var(--spring, ease), opacity 180ms ease; }
  .vns-r-enter-from { transform: translateX(-50%) translateX(24px); opacity: 0; }
  .vns-r-leave-to { transform: translateX(-50%) translateX(-24px); opacity: 0; }
  .vns-l-enter-from { transform: translateX(-50%) translateX(-24px); opacity: 0; }
  .vns-l-leave-to { transform: translateX(-50%) translateX(24px); opacity: 0; }

  .vns.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .vns__spot, .vns__chev,
    .vns-r-enter-active, .vns-r-leave-active,
    .vns-l-enter-active, .vns-l-leave-active { transition-duration: 1ms; }
    .vns__panel-wrap { -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
`,h=[{value:"products",label:"Products",layout:"grid",links:[{title:"Components",desc:"Buttons, inputs, overlays and more."},{title:"Sections",desc:"Complete blocks ready to use."},{title:"Templates",desc:"Prebuilt landings and dashboards."},{title:"Icons",desc:"1,500+ SVGs ready to copy."},{title:"Themes",desc:"Light, dark and your own tokens."},{title:"MCP",desc:"Bring the catalog to your agent."}]},{value:"solutions",label:"Solutions",layout:"list",links:[{title:"For startups",desc:"Ship your MVP in days, not months."},{title:"For agencies",desc:"Reuse and deliver faster."},{title:"For teams",desc:"One shared design system."}]},{value:"resources",label:"Resources",layout:"list",links:[{title:"Documentation",desc:"Install and usage guides."},{title:"Changelog",desc:"What's new in every release."},{title:"Support",desc:"Talk to the team."}]},{value:"pricing",label:"Pricing",href:"#"}],v="http://www.w3.org/2000/svg";function g(a,t="0 0 24 24"){const e=document.createElementNS(v,"svg");return e.setAttribute("viewBox",t),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),e.setAttribute("class",a),e}function b(a,t){const e=document.createElementNS(v,"path");if(e.setAttribute("d",a),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}function p(a){return!!a.links&&a.links.length>0}let c;function x(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(a,t){const e=t?x(String(t).trim()):null;if(!e){for(const i of y)a.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),l=(i,f)=>a.style.setProperty(i,f);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(i,o);l("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])l(i,r?"0 0 0":"255 255 255");l("--vs-color",o),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["variant","tone","radius","bounce","disabled","spotlight","active","color"];#t;#i;#p;#n;#e;#l;#r=null;#c=h;#f=[];#s="";#m="";#g=1;#w=null;#E=0;#A=0;#a=0;#d=null;#h=null;#b=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#t=document.createElement("nav"),this.#t.className="vns",this.#t.setAttribute("role","navigation"),this.#i=document.createElement("ul"),this.#i.className="vns__list",this.#p=document.createElement("span"),this.#p.className="vns__spot",this.#p.setAttribute("aria-hidden","true"),this.#i.appendChild(this.#p),this.#n=document.createElement("div"),this.#n.className="vns__bridge",this.#n.setAttribute("aria-hidden","true"),this.#n.hidden=!0,this.#e=document.createElement("div"),this.#e.className="vns__panel-wrap",this.#e.hidden=!0,this.#l=document.createElement("span"),this.#l.className="vns__spot vns__spot--panel",this.#l.setAttribute("aria-hidden","true"),this.#e.appendChild(this.#l),this.#t.append(this.#i,this.#n,this.#e),t.append(e,this.#t),this.#i.addEventListener("pointermove",this.#S),this.#i.addEventListener("pointerleave",this.#N),this.#e.addEventListener("pointermove",this.#S),this.#e.addEventListener("pointerleave",this.#N),this.#t.addEventListener("pointerleave",this.#q),this.#t.addEventListener("keydown",this.#z)}connectedCallback(){u(this,this.getAttribute("color")),this.#s=this.getAttribute("active")??"",this.#k(),this.#x(),document.addEventListener("pointerdown",this.#$,!0)}disconnectedCallback(){document.removeEventListener("pointerdown",this.#$,!0),this.#a&&(cancelAnimationFrame(this.#a),this.#a=0),this.#_()}attributeChangedCallback(t){if(u(this,this.getAttribute("color")),!!this.#t){if(t==="active"){this.#o(this.getAttribute("active")??"",!1);return}this.#x()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#c=e&&e.length?e:h,this.#t&&(this.#o("",!1),this.#k())}get items(){return this.#c}get active(){return this.#s}set active(t){this.#o(t==null?"":String(t),!1)}#x(){const t=(r,o)=>this.getAttribute(r)??o;this.#t.className=`vns vns--t-${t("tone","default")} vns--r-${t("radius","rounded")} vns--${t("variant","solid")}`+(this.hasAttribute("disabled")?" is-disabled":"")+(this.#s?" is-open":"");const s=(1+Math.max(0,Math.min(1,Number(this.getAttribute("bounce")??.55)))*.9).toFixed(3);this.#t.style.setProperty("--spring",`cubic-bezier(0.34, ${s}, 0.4, 1)`);const n=Math.max(0,Number(this.getAttribute("spotlight")??120))||120;this.#t.style.setProperty("--spot",`${n}px`)}#k(){for(const t of this.#i.querySelectorAll(".vns__item"))t.remove();this.#f=[],this.#c.forEach(t=>{const e=document.createElement("li");e.className="vns__item",e.dataset.value=t.value,e.addEventListener("pointerenter",()=>this.#u(t));let s,n=null;t.href&&!p(t)?(s=document.createElement("a"),s.className="vns__trigger",s.setAttribute("href",t.href),s.textContent=t.label??"",s.addEventListener("focus",()=>this.#u(t))):(s=document.createElement("button"),s.type="button",s.className="vns__trigger",s.setAttribute("aria-expanded","false"),s.append(document.createTextNode(t.label??"")),n=g("vns__chev"),n.appendChild(b("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),s.appendChild(n),s.addEventListener("focus",()=>this.#u(t)),s.addEventListener("click",()=>this.#u(t))),e.appendChild(s),this.#f.push({value:t.value,el:s,chev:n}),this.#i.appendChild(e)}),this.#L()}#L(){for(const t of this.#f){const e=t.value===this.#s;t.el.setAttribute("data-state",e?"open":"closed"),t.el.tagName==="BUTTON"&&t.el.setAttribute("aria-expanded",e?"true":"false"),t.chev?.classList.toggle("is-open",e)}}#y(t){return this.#c.findIndex(e=>e.value===t)}#u(t){if(this.hasAttribute("disabled"))return;if(!p(t)){this.#o("",!0);return}if(t.value===this.#s)return;const e=this.#y(this.#m),s=this.#y(t.value);e!==-1&&s!==-1&&(this.#g=s>e?1:-1),this.#m=t.value,this.#o(t.value,!0)}#v(){this.#o("",!0),this.#m=""}#o(t,e){if(t===this.#s)return;const s=!this.#s&&!!t,n=!!this.#s&&!t;this.#s=t,e&&(this.dispatchEvent(new CustomEvent("update:active",{bubbles:!0,composed:!0,detail:t})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:t}))),this.#L(),this.#x(),t?(this.#P(),this.#T(!s)):(n||!t)&&this.#M()}#P(){const t=this.#c[this.#y(this.#s)];if(!t)return;this.#r&&this.#r.remove();const e=document.createElement("div");e.className=`vns__panel vns__panel--${t.layout||"list"}`,(t.links||[]).forEach(s=>{const n=document.createElement("a");n.className="vns__link",n.setAttribute("href",s.href||"#");const r=document.createElement("span");if(r.className="vns__link-title",r.textContent=s.title??"",n.appendChild(r),s.desc){const o=document.createElement("span");o.className="vns__link-desc",o.textContent=s.desc,n.appendChild(o)}n.addEventListener("click",o=>{(!s.href||s.href==="#")&&o.preventDefault(),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:s,path:[t,s]}})),this.#v()}),e.appendChild(n)}),this.#r=e,this.#e.appendChild(e),this.#l.style.setProperty("--son","0")}#T(t){const e=this.#e,s=this.#g===1?"vns-r":"vns-l";this.#n.hidden=!1,this.#_(),e.classList.remove("vns-r-leave-active","vns-r-leave-to","vns-l-leave-active","vns-l-leave-to"),e.hidden=!1,e.classList.add(`${s}-enter-from`,`${s}-enter-active`),e.offsetWidth,requestAnimationFrame(()=>e.classList.remove(`${s}-enter-from`)),this.#C(e,()=>e.classList.remove(`${s}-enter-active`),360)}#M(){const t=this.#e,e=this.#g===1?"vns-r":"vns-l";this.#n.hidden=!0,this.#_(),t.classList.remove(`${e}-enter-from`,`${e}-enter-active`),t.classList.add(`${e}-leave-active`),t.offsetWidth,requestAnimationFrame(()=>t.classList.add(`${e}-leave-to`)),this.#C(t,()=>{t.hidden=!0,t.classList.remove(`${e}-leave-active`,`${e}-leave-to`),this.#r&&(this.#r.remove(),this.#r=null)},300)}#C(t,e,s){const n=()=>{t.removeEventListener("transitionend",r),clearTimeout(this.#b),this.#d=null,this.#h=null,e()},r=o=>{o.target===t&&n()};this.#d=r,this.#h=t,t.addEventListener("transitionend",r),this.#b=setTimeout(n,s)}#_(){this.#d&&this.#h&&this.#h.removeEventListener("transitionend",this.#d),clearTimeout(this.#b),this.#d=null,this.#h=null}#S=t=>{this.hasAttribute("disabled")||(this.#w=t.currentTarget,this.#E=t.clientX,this.#A=t.clientY,this.#a||(this.#a=requestAnimationFrame(this.#X)))};#X=()=>{this.#a=0;const t=this.#w;if(!t)return;const e=t.getBoundingClientRect();t.style.setProperty("--sx",`${this.#E-e.left}px`),t.style.setProperty("--sy",`${this.#A-e.top}px`),t.style.setProperty("--son","1")};#N=t=>{t.currentTarget.style.setProperty("--son","0")};#q=()=>this.#v();#z=t=>{t.key==="Escape"&&this.#v()};#$=t=>{t.composedPath().includes(this)||this.#v()}}customElements.define("vs-nav-menu-spotlight",_);
