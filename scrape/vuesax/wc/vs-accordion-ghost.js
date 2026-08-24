const u="http://www.w3.org/2000/svg";function f(){const s=document.createElementNS(u,"svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("aria-hidden","true");const t=document.createElementNS(u,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),s.appendChild(t),s}const b=[{title:"What is Vuesax?",content:"A catalog of portable, animation-first components. Copy the source, drop it in, ship it.",value:"a"},{title:"How does theming work?",content:"Every component reads from CSS custom properties with sane fallbacks, so it adapts to light/dark out of the box.",value:"b"},{title:"Can I use it without a build step?",content:"Yes. Components are self-contained — no global CSS or runtime dependency required.",value:"c"},{title:"Is there a Pro tier?",content:"Yes — unlocks source copy and exclusive sections.",value:"d",disabled:!0}],g=`
  :host { display: block; width: 100%; max-width: 520px; margin-inline: auto; }
  .acch {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --pad-x: 16px;
    --r: var(--ctrl-r-md, 12px);
    --rr: var(--r);
    --acc: var(--ui-accent, #ededed);
    --spring: cubic-bezier(0.34, 1.8, 0.42, 1);
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 520px;
    margin-inline: auto;
    font-family: inherit;
    font-size: var(--fs);
    color: var(--inp-text, #ededed);
  }
  .acch--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 34px); --pad-x: 13px; --r: var(--ctrl-r-sm, 10px); }
  .acch--md { --fs: var(--ctrl-fs-md, 14px); --h: var(--ctrl-h-md, 40px); --pad-x: 16px; --r: var(--ctrl-r-md, 12px); }
  .acch--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --pad-x: 20px; --r: var(--ctrl-r-lg, 14px); }

  .acch--r-none .acch__item { --rr: 0px; }
  .acch--r-subtle .acch__item { --rr: 8px; }
  .acch--r-rounded .acch__item { --rr: var(--r); }
  @supports (corner-shape: squircle) {
    .acch--r-squircle .acch__item { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  /* GHOST at rest: no card, just text — the frost surface appears on hover/open */
  .acch__item {
    position: relative;
    border-radius: var(--rr);
    background: transparent;
    border: 1px solid transparent;
    transition: border-color 300ms ease;
  }
  .acch__item.is-open { border-color: color-mix(in srgb, var(--acc) 28%, transparent); }

  .acch__frost {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: color-mix(in srgb, var(--bg-card, #111) 55%, transparent);
    -webkit-backdrop-filter: blur(0px) saturate(1);
    backdrop-filter: blur(0px) saturate(1);
    opacity: 0;
    /* Perf: backdrop-filter is NOT transitioned (re-blurs the backdrop per frame);
       it snaps to its final value and opacity does the fade — visually near identical. */
    transition: opacity 340ms ease;
    pointer-events: none;
  }
  @supports (corner-shape: squircle) {
    .acch--r-squircle .acch__frost { corner-shape: squircle; }
  }
  .acch__item:hover .acch__frost {
    opacity: 0.7;
    -webkit-backdrop-filter: blur(6px) saturate(1.2);
    backdrop-filter: blur(6px) saturate(1.2);
  }
  .acch__item.is-open .acch__frost {
    opacity: 1;
    -webkit-backdrop-filter: blur(12px) saturate(1.4);
    backdrop-filter: blur(12px) saturate(1.4);
  }

  .acch__head {
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
  .acch__head:disabled { cursor: not-allowed; opacity: 0.45; }
  .acch__item.is-open .acch__head { color: var(--acc); }

  .acch__icon { display: inline-flex; flex: 0 0 auto; }
  .acch__icon svg { width: 1.1em; height: 1.1em; display: block; }
  .acch__title { flex: 1 1 auto; line-height: 1.3; }

  .acch__chev {
    flex: 0 0 auto;
    display: inline-flex;
    color: var(--text-muted, #8a8a8a);
    transition: transform 480ms var(--spring), color 200ms ease;
  }
  .acch__chev svg { width: 1.2em; height: 1.2em; display: block; }
  .acch__item.is-open .acch__chev { transform: rotate(180deg); color: var(--acc); }

  .acch__panel {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 560ms var(--spring);
  }
  .acch__item.is-open .acch__panel { grid-template-rows: 1fr; }
  .acch__panel-clip { min-height: 0; overflow: hidden; }
  .acch__body {
    padding: 2px var(--pad-x) calc(var(--h) / 3.2);
    color: var(--text-muted, #8a8a8a);
    line-height: 1.55;
    font-weight: 400;
    opacity: 0;
    filter: blur(6px);
    transition: opacity 340ms ease, filter 400ms ease;
  }
  .acch__item.is-open .acch__body { opacity: 1; filter: blur(0); transition-delay: 80ms; }

  /* ── layout variants ── */
  .acch--contained { gap: 0; }
  .acch--contained .acch__item { border-radius: 0; }
  .acch--contained .acch__item + .acch__item { border-top: 1px solid color-mix(in srgb, var(--inp-border, #2a2a2a) 60%, transparent); }
  .acch--line { gap: 0; }
  .acch--line .acch__frost { display: none; }
  .acch--line .acch__item { border-radius: 0; border-bottom: 1px solid var(--inp-border, #2a2a2a); }
  .acch--line .acch__head { padding-left: 0; padding-right: 4px; }
  .acch--line .acch__body { padding-left: 0; }

  /* ── tones ── */
  .acch--t-default { --acc: var(--ui-accent, #ededed); }
  .acch--t-danger { --acc: var(--danger, #e5484d); }
  .acch--t-warn { --acc: var(--warn, #f5a623); }
  .acch--t-success { --acc: var(--success, #30a46c); }

  .acch.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .acch__panel { transition: none; }
    .acch__chev { transition: transform 200ms ease; }
    .acch__body { filter: none; transition: opacity 200ms ease; }
    .acch__frost { transition: opacity 200ms ease; }
  }
`;let d;function v(s){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=s;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(s,t){const e=t?v(String(t).trim()):null;if(!e){for(const a of _)s.style.removeProperty(a);return}const r=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(a=>Math.round(n?a*.92:a+(255-a)*.16)),c=(a,h)=>s.style.setProperty(a,h);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(a,l);c("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(a,n?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])c(a,n?"0 0 0":"255 255 255");c("--vs-color",l),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["value","size","tone","radius","variant","multiple","disabled","color"];#e;#c=null;#a=[];#t=new Set;#s=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#e=document.createElement("div"),this.#e.className="acch",t.append(e,this.#e),this.#t=this.#n(this.getAttribute("value"))}connectedCallback(){m(this,this.getAttribute("color")),this.#l()}disconnectedCallback(){for(const t of this.#a)t.head.removeEventListener("click",t.onClick)}attributeChangedCallback(t){if(m(this,this.getAttribute("color")),!!this.#e){if(t==="value"){if(this.#s)return;this.#t=this.#n(this.getAttribute("value")),this.#r();return}if(t==="multiple"){if(!this.#i()&&this.#t.size>1){const e=[...this.#t][0];this.#t=new Set(e!=null?[e]:[]),this.#o(this.#t)}this.#r();return}this.#r()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const r=JSON.parse(t);Array.isArray(r)&&(e=r)}catch{}this.#c=e,this.#e&&this.#l()}get items(){return this.#c&&this.#c.length?this.#c:b}get value(){const t=[...this.#t];return this.#i()?t:t[0]??""}set value(t){this.#t=this.#n(t),this.#o(this.#t),this.#e&&this.#r()}#i(){const t=this.getAttribute("multiple");return t!==null&&t!=="false"}#n(t){if(t==null)return new Set;if(Array.isArray(t))return new Set(t.map(String));if(typeof t=="string"){const e=t.trim();if(!e)return new Set;if(e.startsWith("["))try{const r=JSON.parse(e);if(Array.isArray(r))return new Set(r.map(String))}catch{}return new Set([e])}return new Set([String(t)])}#o(t){if(this.#s=!0,this.#i()){const e=[...t];e.length?this.setAttribute("value",JSON.stringify(e)):this.removeAttribute("value")}else{const e=[...t][0];e?this.setAttribute("value",e):this.removeAttribute("value")}this.#s=!1}#l(){for(const t of this.#a)t.head.removeEventListener("click",t.onClick);this.#e.textContent="",this.#a=[],this.items.forEach(t=>{const e=document.createElement("div");e.className="acch__item";const r=document.createElement("span");r.className="acch__frost",r.setAttribute("aria-hidden","true");const i=document.createElement("button");i.type="button",i.className="acch__head",i.setAttribute("aria-expanded","false");let n=null;t.icon&&(n=document.createElement("span"),n.className="acch__icon",n.innerHTML=t.icon,i.appendChild(n));const l=document.createElement("span");l.className="acch__title",l.textContent=t.title??"";const o=document.createElement("span");o.className="acch__chev",o.setAttribute("aria-hidden","true"),o.appendChild(f()),i.append(l,o);const c=document.createElement("div");c.className="acch__panel";const a=document.createElement("div");a.className="acch__panel-clip";const h=document.createElement("div");h.className="acch__body",h.textContent=t.content??"",a.appendChild(h),c.appendChild(a),e.append(r,i,c),this.#e.appendChild(e);const p=()=>this.#h(t);i.addEventListener("click",p),this.#a.push({el:e,head:i,item:t,onClick:p})}),this.#r()}#r(){const t=(r,i)=>this.getAttribute(r)??i,e=this.hasAttribute("disabled");this.#e.className=["acch",`acch--${t("variant","separated")}`,`acch--t-${t("tone","default")}`,`acch--${t("size","md")}`,`acch--r-${t("radius","squircle")}`,e?"is-disabled":""].filter(Boolean).join(" ");for(const r of this.#a){const i=this.#t.has(r.item.value);r.el.classList.toggle("is-open",i),r.el.classList.toggle("is-disabled",!!r.item.disabled),r.head.disabled=e||!!r.item.disabled,r.head.setAttribute("aria-expanded",i?"true":"false")}}#h(t){if(this.hasAttribute("disabled")||t.disabled)return;const e=new Set(this.#t);e.has(t.value)?e.delete(t.value):(this.#i()||e.clear(),e.add(t.value)),this.#t=e,this.#o(e),this.#r();const r=this.#i()?[...e]:[...e][0]??"";this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:r}}))}}customElements.define("vs-accordion-ghost",x);
