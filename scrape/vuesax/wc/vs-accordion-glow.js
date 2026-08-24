const g=[{title:"What is Vuesax?",content:"A catalog of portable, animation-first components. Copy the source, drop it in, ship it.",value:"a"},{title:"How does theming work?",content:"Every component reads from CSS custom properties with sane fallbacks, so it adapts to light/dark out of the box.",value:"b"},{title:"Can I use it without a build step?",content:"Yes. Components are self-contained — no global CSS or runtime dependency required.",value:"c"},{title:"Is there a Pro tier?",content:"Yes — unlocks source copy and exclusive sections.",value:"d",disabled:!0}],h="http://www.w3.org/2000/svg";function m(n){const t=document.createElementNS(h,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),t.setAttribute("class",n),t}function b(n,t){const e=document.createElementNS(h,"path");if(e.setAttribute("d",n),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const r in t)e.setAttribute(r,t[r]);return e}function f(){const n=m("accg__chev-svg");return n.appendChild(b("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),n}const v=`
  :host { display: block; width: 100%; max-width: 520px; }
  .accg {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --pad-x: 16px;
    --r: var(--ctrl-r-md, 12px);
    --rr: var(--r);
    --acc: var(--ui-accent, #ededed);
    --ring-w: 1.5px;
    --spring: cubic-bezier(0.34, 1.8, 0.42, 1);
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 520px;
    font-family: inherit;
    font-size: var(--fs);
    color: var(--inp-text, #ededed);
  }
  .accg--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 34px); --pad-x: 13px; --r: var(--ctrl-r-sm, 10px); }
  .accg--md { --fs: var(--ctrl-fs-md, 14px); --h: var(--ctrl-h-md, 40px); --pad-x: 16px; --r: var(--ctrl-r-md, 12px); }
  .accg--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --pad-x: 20px; --r: var(--ctrl-r-lg, 14px); }

  .accg--r-none .accg__item { --rr: 0px; }
  .accg--r-subtle .accg__item { --rr: 8px; }
  .accg--r-rounded .accg__item { --rr: var(--r); }
  @supports (corner-shape: squircle) {
    .accg--r-squircle .accg__item { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .accg__item {
    position: relative;
    border-radius: var(--rr);
    background: var(--bg-card, #111);
    border: 1px solid var(--inp-border, #2a2a2a);
    transition: border-color 240ms ease;
  }

  /* ── GLOW effect: a conic-gradient ring that spins around the item when open ── */
  .accg__ring {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: var(--ring-w);
    background: conic-gradient(
      from var(--spin, 0deg),
      transparent 0deg,
      var(--acc) 60deg,
      transparent 140deg,
      transparent 360deg
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 300ms ease;
    pointer-events: none;
  }
  @supports (corner-shape: squircle) {
    .accg--r-squircle .accg__ring { corner-shape: squircle; }
  }
  .accg__item.is-open .accg__ring {
    opacity: 1;
    animation: accg-spin 3.2s linear infinite;
  }
  @property --spin { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
  @keyframes accg-spin {
    to { --spin: 360deg; }
  }

  .accg__head {
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
  .accg__head:disabled { cursor: not-allowed; opacity: 0.45; }
  .accg__item.is-open .accg__head { color: var(--acc); }

  .accg__icon { display: inline-flex; flex: 0 0 auto; }
  .accg__icon svg { width: 1.1em; height: 1.1em; display: block; }
  .accg__title { flex: 1 1 auto; line-height: 1.3; }

  .accg__chev {
    flex: 0 0 auto;
    display: inline-flex;
    color: var(--text-muted, #8a8a8a);
    transition: transform 480ms var(--spring), color 200ms ease;
  }
  .accg__chev svg { width: 1.2em; height: 1.2em; display: block; }
  .accg__item.is-open .accg__chev { transform: rotate(180deg); color: var(--acc); }

  .accg__panel {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 560ms var(--spring);
  }
  .accg__item.is-open .accg__panel { grid-template-rows: 1fr; }
  .accg__panel-clip { min-height: 0; overflow: hidden; }
  .accg__body {
    padding: 2px var(--pad-x) calc(var(--h) / 3.2);
    color: var(--text-muted, #8a8a8a);
    line-height: 1.55;
    font-weight: 400;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 300ms ease, transform 520ms var(--spring);
  }
  .accg__item.is-open .accg__body { opacity: 1; transform: translateY(0); transition-delay: 60ms; }

  /* ── layout variants ── */
  .accg--separated .accg__item.is-open { border-color: color-mix(in srgb, var(--acc) 30%, var(--inp-border, #2a2a2a)); }
  .accg--contained { gap: 0; border: 1px solid var(--inp-border, #2a2a2a); border-radius: var(--rr); overflow: hidden; }
  @supports (corner-shape: squircle) { .accg--contained.accg--r-squircle { corner-shape: squircle; } }
  .accg--contained .accg__item { border-radius: 0; border: 0; background: transparent; }
  .accg--contained .accg__item + .accg__item { border-top: 1px solid var(--inp-border, #2a2a2a); }
  .accg--contained .accg__ring { display: none; }
  .accg--line { gap: 0; }
  .accg--line .accg__item { border-radius: 0; border: 0; border-bottom: 1px solid var(--inp-border, #2a2a2a); background: transparent; }
  .accg--line .accg__ring { display: none; }
  .accg--line .accg__head { padding-left: 0; padding-right: 4px; }
  .accg--line .accg__body { padding-left: 0; }

  /* ── tones ── */
  .accg--t-default { --acc: var(--ui-accent, #ededed); }
  .accg--t-danger { --acc: var(--danger, #e5484d); }
  .accg--t-warn { --acc: var(--warn, #f5a623); }
  .accg--t-success { --acc: var(--success, #30a46c); }

  .accg.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .accg__panel { transition: none; }
    .accg__chev { transition: transform 200ms ease; }
    .accg__body { transform: none; transition: opacity 200ms ease; }
    .accg__item.is-open .accg__ring { animation: none; }
  }
`;let p;function _(n){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=n;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(n,t){const e=t?_(String(t).trim()):null;if(!e){for(const a of x)n.style.removeProperty(a);return}const r=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),s=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(a=>Math.round(s?a*.92:a+(255-a)*.16)),c=(a,d)=>n.style.setProperty(a,d);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(a,o);c("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(a,s?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])c(a,s?"0 0 0":"255 255 255");c("--vs-color",o),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["variant","tone","size","radius","multiple","disabled","value","color"];#e;#i=g;#r=[];#t=new Set;#n=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#e=document.createElement("div"),this.#e.className="accg",t.append(e,this.#e)}connectedCallback(){u(this,this.getAttribute("color")),this.#t=this.#s(),this.#l()}disconnectedCallback(){}attributeChangedCallback(t){if(u(this,this.getAttribute("color")),!!this.#e){if(t==="value"){if(this.#n)return;this.#t=this.#s(),this.#a();return}if(t==="multiple"){if(!this.hasAttribute("multiple")&&this.#t.size>1){const e=[...this.#t][0];this.#t=new Set(e!=null?[e]:[]),this.#c()}this.#a();return}this.#o()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const r=JSON.parse(t);Array.isArray(r)&&(e=r)}catch{}this.#i=e&&e.length?e:g,this.#e&&this.#l()}get items(){return this.#i}get value(){return this.hasAttribute("multiple")?[...this.#t]:[...this.#t][0]??""}set value(t){this.#t=t==null||t===""?new Set:Array.isArray(t)?new Set(t):new Set([t]),this.#c(),this.#e&&this.#a()}#s(){const t=this.getAttribute("value");return t==null||t===""?new Set:this.hasAttribute("multiple")?new Set(t.split(",").map(e=>e.trim()).filter(Boolean)):new Set([t])}#c(){this.#n=!0;const t=[...this.#t],e=this.hasAttribute("multiple")?t.join(","):t[0]??"";e?this.setAttribute("value",e):this.removeAttribute("value"),this.#n=!1}#o(){const t=(r,i)=>this.getAttribute(r)??i,e=this.hasAttribute("disabled");this.#e.className=`accg accg--${t("variant","separated")} accg--t-${t("tone","default")} accg--${t("size","md")} accg--r-${t("radius","squircle")}`+(e?" is-disabled":""),this.#r.forEach(({head:r,item:i})=>{r.disabled=e||!!i.disabled})}#l(){this.#e&&(this.#e.textContent="",this.#r=[],this.#i.forEach(t=>{const e=document.createElement("div");e.className="accg__item"+(t.disabled?" is-disabled":"");const r=document.createElement("span");r.className="accg__ring",r.setAttribute("aria-hidden","true");const i=document.createElement("button");if(i.type="button",i.className="accg__head",i.setAttribute("aria-expanded","false"),t.icon){const d=document.createElement("span");d.className="accg__icon",d.innerHTML=t.icon,i.appendChild(d)}const s=document.createElement("span");s.className="accg__title",s.textContent=t.title??"",i.appendChild(s);const o=document.createElement("span");o.className="accg__chev",o.setAttribute("aria-hidden","true"),o.appendChild(f()),i.appendChild(o);const l=document.createElement("div");l.className="accg__panel";const c=document.createElement("div");c.className="accg__panel-clip";const a=document.createElement("div");a.className="accg__body",a.textContent=t.content??"",c.appendChild(a),l.appendChild(c),i.addEventListener("click",()=>this.#d(t)),e.append(r,i,l),this.#e.appendChild(e),this.#r.push({root:e,head:i,item:t})}),this.#o(),this.#a())}#a(){this.#r.forEach(({root:t,head:e,item:r})=>{const i=this.#t.has(r.value);t.classList.toggle("is-open",i),e.setAttribute("aria-expanded",String(i))})}#d(t){if(this.hasAttribute("disabled")||t.disabled)return;const e=new Set(this.#t);e.has(t.value)?e.delete(t.value):(this.hasAttribute("multiple")||e.clear(),e.add(t.value)),this.#t=e,this.#a(),this.#c();const r=this.hasAttribute("multiple")?[...e]:[...e][0]??"";this.dispatchEvent(new CustomEvent("update:modelValue",{detail:{value:r},bubbles:!0,composed:!0}))}}customElements.define("vs-accordion-glow",y);
