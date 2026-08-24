import{FX_CSS as v,pressRipple as _}from"./vs-fx.CLXiCjCI.js";const x=`
${v}
  :host { display: block; }
  .acc {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --pad-x: 16px;
    --r: var(--ctrl-r-md, 12px);
    --rr: var(--r);
    --acc: var(--t-acc, #ededed);
    --spring: cubic-bezier(0.34, 1.8, 0.42, 1);
    --spring-soft: cubic-bezier(0.22, 1.2, 0.36, 1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 520px;
    font-family: inherit;
    font-size: var(--fs);
    color: var(--text, #ededed);
  }

  /* sizes */
  .acc--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 34px); --pad-x: 13px; --r: var(--ctrl-r-sm, 10px); }
  .acc--md { --fs: var(--ctrl-fs-md, 14px); --h: var(--ctrl-h-md, 40px); --pad-x: 16px; --r: var(--ctrl-r-md, 12px); }
  .acc--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --pad-x: 20px; --r: var(--ctrl-r-lg, 14px); }

  /* radii */
  .acc--r-none .acc__item { --rr: 0px; }
  .acc--r-subtle .acc__item { --rr: 8px; }
  .acc--r-rounded .acc__item { --rr: var(--r); }
  @supports (corner-shape: squircle) {
    .acc--r-squircle .acc__item { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .acc__item {
    position: relative;
    overflow: hidden; /* clip the ripple/glow to the item radius */
    border-radius: var(--rr);
    transition: background 240ms ease, border-color 240ms ease;
  }

  /* ── header ───────────────────────────────────────── */
  .acc__head {
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
    transition: transform 320ms var(--spring), color 200ms ease;
  }
  .acc__head:active:not(:disabled) { transform: scale(0.985); }
  .acc__head:disabled { cursor: not-allowed; opacity: 0.45; }
  .acc__item.is-open .acc__head { color: var(--acc); }

  .acc__icon,
  .acc__title,
  .acc__chev { z-index: 2; }

  .acc__glow { --glow-ring: 1.5px; --glow-strength: 0.85; --glow-r-core: 80px; --glow-r-soft: 240px; }
  @supports (corner-shape: squircle) {
    .acc--r-squircle .acc__glow,
    .acc--r-squircle .acc__ripples { corner-shape: squircle; }
  }

  .acc__title {
    background:
      radial-gradient(
        120px circle at var(--mx, 50%) var(--my, 50%),
        rgb(255 255 255 / calc(var(--lit, 0) * 0.95)),
        transparent 55%
      ),
      currentColor;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 calc(var(--lit, 0) * 16px) rgb(var(--fx-tint, 255 255 255) / calc(var(--lit, 0) * 0.4));
  }

  .acc__icon { display: inline-flex; flex: 0 0 auto; }
  .acc__icon svg { width: 1.1em; height: 1.1em; display: block; }

  .acc__title { flex: 1 1 auto; line-height: 1.3; }

  .acc__chev {
    flex: 0 0 auto;
    display: inline-flex;
    color: var(--text-muted, #8a8a8a);
    transition: transform 540ms var(--spring), color 200ms ease;
  }
  .acc__chev svg { width: 1.2em; height: 1.2em; display: block; }
  .acc__item.is-open .acc__chev { transform: rotate(180deg); color: var(--acc); }

  /* ── panel — grid-rows 0fr↔1fr collapse (no continuous layout from JS) ─── */
  .acc__panel {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 600ms var(--spring);
  }
  .acc__item.is-open .acc__panel { grid-template-rows: 1fr; }

  .acc__panel-clip {
    min-height: 0;
    overflow: hidden;
  }

  .acc__body {
    padding: 2px var(--pad-x) calc(var(--h) / 3.2);
    color: var(--text-muted, #8a8a8a);
    line-height: 1.55;
    font-weight: 400;
    transform-origin: top center;
    opacity: 0;
    filter: blur(6px);
    transform: translateY(-8px);
    transition:
      opacity 300ms ease,
      filter 380ms ease,
      transform 520ms var(--spring-soft);
  }
  .acc__item.is-open .acc__body {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
    transition-delay: 60ms;
  }

  /* ── variant: separated (default) — each item its own card ── */
  .acc--separated .acc__item {
    background: var(--bg-elevated, #111111);
    border: 1px solid var(--border, #2a2a2a);
  }
  .acc--separated .acc__item.is-open { border-color: color-mix(in srgb, var(--acc) 45%, var(--border, #2a2a2a)); }

  /* ── variant: contained — one shared card, dividers between ── */
  .acc--contained {
    gap: 0;
    background: var(--bg-elevated, #111111);
    border: 1px solid var(--border, #2a2a2a);
    border-radius: var(--rr);
    overflow: hidden;
  }
  @supports (corner-shape: squircle) {
    .acc--contained.acc--r-squircle { corner-shape: squircle; }
  }
  .acc--contained .acc__item { border-radius: 0; }
  .acc--contained .acc__item + .acc__item { border-top: 1px solid var(--border, #2a2a2a); }

  /* ── variant: line — bare rows, bottom rule only ── */
  .acc--line { gap: 0; }
  .acc--line .acc__item { border-radius: 0; border-bottom: 1px solid var(--border, #2a2a2a); }
  .acc--line .acc__head { padding-left: 0; padding-right: 4px; }
  .acc--line .acc__body { padding-left: 0; }

  /* ── tones ── */
  .acc--t-default { --t-acc: var(--inp-accent, #ededed); --fx-tint: 255 255 255; }
  .acc--t-danger { --t-acc: #e5484d; --fx-tint: 255 99 105; }
  .acc--t-warn { --t-acc: #f5a623; --fx-tint: 255 178 36; }
  .acc--t-success { --t-acc: #30a46c; --fx-tint: 76 195 138; }
  :host-context([data-theme='light']) .acc--t-default { --fx-tint: 20 20 20; }

  .acc.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .acc__panel { transition: none; }
    .acc__chev { transition: transform 200ms ease; }
    .acc__body { filter: none; transform: none; transition: opacity 200ms ease; }
    .acc__head:active:not(:disabled) { transform: none; }
  }
`,y=[{title:"What is Vuesax?",content:"A catalog of portable, animation-first components. Copy the source, drop it in, ship it — every motion is tuned to feel alive.",value:"a"},{title:"How does theming work?",content:"Every component reads from CSS custom properties with sane fallbacks, so it adapts to light/dark and your own tokens out of the box.",value:"b"},{title:"Can I use it without a build step?",content:"Yes. Components are self-contained — no global CSS or runtime dependency required.",value:"c"},{title:"Is there a Pro tier?",content:"Yes — unlocks source copy and exclusive sections.",value:"d",disabled:!0}],f="http://www.w3.org/2000/svg";function w(){const l=document.createElementNS(f,"svg");l.setAttribute("viewBox","0 0 24 24"),l.setAttribute("fill","none");const t=document.createElementNS(f,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),l.appendChild(t),l}const A=220;let h;function S(l){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=l;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(l,t){const e=t?S(String(t).trim()):null;if(!e){for(const i of C)l.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),c=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(c?i*.92:i+(255-i)*.16)),s=(i,d)=>l.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(i,a);s("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(i,c?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])s(i,c?"0 0 0":"255 255 255");s("--vs-color",a),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["value","variant","tone","size","radius","multiple","disabled","glow","ripple","color"];#e;#p=null;#t=new Set;#a=[];#c=!1;#r=0;#o=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=x,this.#e=document.createElement("div"),this.#e.className="acc",t.append(e,this.#e),this.#t=this.#m(this.getAttribute("value"))}connectedCallback(){g(this,this.getAttribute("color")),this.#f(),window.addEventListener("pointermove",this.#g,{passive:!0})}disconnectedCallback(){window.removeEventListener("pointermove",this.#g),this.#r&&cancelAnimationFrame(this.#r),this.#r=0}attributeChangedCallback(t){if(g(this,this.getAttribute("color")),!!this.#e){if(t==="value"){if(this.#c)return;this.#t=this.#m(this.getAttribute("value")),this.#i();return}if(t==="multiple"){if(!this.#s()&&this.#t.size>1){const e=[...this.#t][0];this.#t=new Set(e!=null?[e]:[]),this.#l(),this.#i()}return}if(t==="disabled"){this.#d(),this.#i();return}if(t==="glow"){this.#u()||this.#b();return}t!=="ripple"&&this.#d()}}set items(t){this.#p=Array.isArray(t)&&t.length?t:null,this.#e&&this.#f()}get items(){return this.#p??y}get value(){return this.#s()?[...this.#t]:[...this.#t][0]??""}set value(t){this.#t=this.#x(t),this.#l(),this.#i()}#s(){return this.hasAttribute("multiple")}#h(){return this.hasAttribute("disabled")}#u(){const t=this.getAttribute("glow");return t===null||t!=="false"}#v(){const t=this.getAttribute("ripple");return t===null||t!=="false"}#_(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}#x(t){return t==null?new Set:new Set(Array.isArray(t)?t.map(String):[String(t)])}#m(t){return t==null||t===""?new Set:this.#s()?new Set(t.split(",").map(e=>e.trim()).filter(Boolean)):new Set([t])}#l(){this.#c=!0;const t=[...this.#t];t.length?this.setAttribute("value",t.join(",")):this.removeAttribute("value"),this.#c=!1}#d(){const t=(e,r)=>this.getAttribute(e)??r;this.#e.className=`acc acc--${t("variant","separated")} acc--t-${t("tone","default")} acc--${t("size","md")} acc--r-${t("radius","squircle")}`+(this.#h()?" is-disabled":"")}#f(){this.#e.textContent="",this.#a=[],this.#d(),this.items.forEach(e=>{const r=document.createElement("div");r.className="acc__item";const n=document.createElement("span");n.className="fx-glow acc__glow",n.setAttribute("aria-hidden","true");const c=document.createElement("span");c.className="fx-ripples acc__ripples",c.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="acc__head";let o=null;e.icon&&(o=document.createElement("span"),o.className="acc__icon",o.innerHTML=e.icon);const s=document.createElement("span");s.className="acc__title",s.textContent=e.title??"";const i=document.createElement("span");i.className="acc__chev",i.setAttribute("aria-hidden","true"),i.appendChild(w()),a.append(...o?[o]:[],s,i);const d=document.createElement("div");d.className="acc__panel";const p=document.createElement("div");p.className="acc__panel-clip";const u=document.createElement("div");u.className="acc__body",u.textContent=e.content??"",p.appendChild(u),d.appendChild(p),r.append(n,c,a,d);const m={el:r,head:a,title:s,panel:d,ripples:c,item:e};this.#a.push(m),r.addEventListener("pointerdown",b=>this.#w(b,m)),a.addEventListener("click",()=>this.#y(m)),this.#e.appendChild(r)}),this.#i()}#n(t){return this.#h()||!!t.disabled}#i(){for(const t of this.#a){const e=this.#t.has(String(t.item.value)),r=this.#n(t.item);t.el.classList.toggle("is-open",e),t.el.classList.toggle("is-disabled",r),t.head.setAttribute("aria-expanded",String(e)),t.head.disabled=r}}#y(t){if(this.#n(t.item))return;const e=String(t.item.value),r=new Set(this.#t);r.has(e)?r.delete(e):(this.#s()||r.clear(),r.add(e)),this.#t=r,this.#l(),this.#i();const n=this.#s()?[...r]:[...r][0]??"";this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:n}})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:n}}))}#w(t,e){!this.#v()||this.#n(e.item)||this.#_()||_(e.el,e.ripples,t,{tilt:!1})}#g=t=>{this.#o=t,!this.#r&&(this.#r=requestAnimationFrame(()=>{this.#r=0,this.#o&&this.#A(this.#o)}))};#A(t){if(!this.#u()){this.#b();return}for(const e of this.#a){const{el:r,title:n,item:c}=e;if(this.#n(c)){r.style.setProperty("--glow","0"),n.style.setProperty("--lit","0");continue}const a=r.getBoundingClientRect(),o=Math.max(a.left,Math.min(t.clientX,a.right)),s=Math.max(a.top,Math.min(t.clientY,a.bottom)),i=Math.hypot(t.clientX-o,t.clientY-s),d=Math.max(0,1-i/A);r.style.setProperty("--glow",d.toFixed(3)),r.style.setProperty("--gx",`${t.clientX-a.left}px`),r.style.setProperty("--gy",`${t.clientY-a.top}px`);const p=n.getBoundingClientRect();n.style.setProperty("--mx",`${t.clientX-p.left}px`),n.style.setProperty("--my",`${t.clientY-p.top}px`),n.style.setProperty("--lit",d.toFixed(3))}}#b(){for(const t of this.#a)t.el.style.setProperty("--glow","0"),t.title.style.setProperty("--lit","0")}}customElements.define("vs-accordion",E);
