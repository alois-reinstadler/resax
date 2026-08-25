const g=`
  :host { display: block; }
  .accf {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --pad-x: 16px;
    --r: var(--ctrl-r-md, 12px);
    --rr: var(--r);
    --acc: var(--ui-accent, #ededed);
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
  .accf--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 34px); --pad-x: 13px; --r: var(--ctrl-r-sm, 10px); }
  .accf--md { --fs: var(--ctrl-fs-md, 14px); --h: var(--ctrl-h-md, 40px); --pad-x: 16px; --r: var(--ctrl-r-md, 12px); }
  .accf--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --pad-x: 20px; --r: var(--ctrl-r-lg, 14px); }

  .accf--r-none .accf__item { --rr: 0px; }
  .accf--r-subtle .accf__item { --rr: 8px; }
  .accf--r-rounded .accf__item { --rr: var(--r); }
  @supports (corner-shape: squircle) {
    .accf--r-squircle .accf__item { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .accf__item {
    position: relative;
    overflow: hidden;
    border-radius: var(--rr);
    background: var(--bg-card, #111);
    border: 1px solid var(--inp-border, #2a2a2a);
    transition: border-color 240ms ease;
  }
  .accf__item.is-open { border-color: color-mix(in srgb, var(--acc) 45%, var(--inp-border, #2a2a2a)); }

  /* ── FILL effect: a tinted accent wash that scales up from the bottom ── */
  .accf__fill {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--acc) 22%, transparent),
      color-mix(in srgb, var(--acc) 6%, transparent)
    );
    transform: scaleY(0);
    transform-origin: bottom center;
    opacity: 0;
    transition: transform 520ms var(--spring), opacity 280ms ease;
    pointer-events: none;
  }
  @supports (corner-shape: squircle) {
    .accf--r-squircle .accf__fill { corner-shape: squircle; }
  }
  .accf__item.is-open .accf__fill { transform: scaleY(1); opacity: 1; }

  .accf__head {
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
    transition: color 240ms ease;
  }
  .accf__head:disabled { cursor: not-allowed; opacity: 0.45; }
  .accf__item.is-open .accf__head { color: var(--acc); }

  .accf__icon { display: inline-flex; flex: 0 0 auto; }
  .accf__icon svg { width: 1.1em; height: 1.1em; display: block; }
  .accf__title { flex: 1 1 auto; line-height: 1.3; }

  .accf__chev {
    flex: 0 0 auto;
    display: inline-flex;
    color: var(--text-muted, #8a8a8a);
    transition: transform 500ms var(--spring), color 240ms ease;
  }
  .accf__chev svg { width: 1.2em; height: 1.2em; display: block; }
  .accf__item.is-open .accf__chev { transform: rotate(180deg); color: var(--acc); }

  .accf__panel {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 560ms var(--spring);
  }
  .accf__item.is-open .accf__panel { grid-template-rows: 1fr; }
  .accf__panel-clip { min-height: 0; overflow: hidden; }
  .accf__body {
    padding: 2px var(--pad-x) calc(var(--h) / 3.2);
    color: var(--inp-text, #ededed);
    line-height: 1.55;
    font-weight: 400;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 300ms ease, transform 520ms var(--spring);
  }
  .accf__item.is-open .accf__body { opacity: 0.85; transform: translateY(0); transition-delay: 60ms; }

  /* ── layout variants ── */
  .accf--contained { gap: 0; border: 1px solid var(--inp-border, #2a2a2a); border-radius: var(--rr); overflow: hidden; }
  @supports (corner-shape: squircle) { .accf--contained.accf--r-squircle { corner-shape: squircle; } }
  .accf--contained .accf__item { border-radius: 0; border: 0; background: transparent; }
  .accf--contained .accf__item + .accf__item { border-top: 1px solid var(--inp-border, #2a2a2a); }
  .accf--line { gap: 0; }
  .accf--line .accf__item { border-radius: 0; border: 0; border-bottom: 1px solid var(--inp-border, #2a2a2a); background: transparent; }
  .accf--line .accf__head { padding-left: 0; padding-right: 4px; }
  .accf--line .accf__body { padding-left: 0; }

  /* ── tones ── */
  .accf--t-default { --acc: var(--ui-accent, #ededed); }
  .accf--t-danger { --acc: var(--danger, #e5484d); }
  .accf--t-warn { --acc: var(--warn, #f5a623); }
  .accf--t-success { --acc: var(--success, #30a46c); }

  .accf.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .accf__panel { transition: none; }
    .accf__chev { transition: transform 200ms ease; }
    .accf__body { transform: none; transition: opacity 200ms ease; }
    .accf__fill { transition: opacity 200ms ease; transform: scaleY(1); }
  }
`,h=[{title:"What is Vuesax?",content:"A catalog of portable, animation-first components. Copy the source, drop it in, ship it.",value:"a"},{title:"How does theming work?",content:"Every component reads from CSS custom properties with sane fallbacks, so it adapts to light/dark out of the box.",value:"b"},{title:"Can I use it without a build step?",content:"Yes. Components are self-contained — no global CSS or runtime dependency required.",value:"c"},{title:"Is there a Pro tier?",content:"Yes — unlocks source copy and exclusive sections.",value:"d",disabled:!0}],b="http://www.w3.org/2000/svg";function v(s){const t=document.createElementNS(b,"svg");return t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true"),t.setAttribute("class",s),t}function _(s,t){const e=document.createElementNS(b,"path");if(e.setAttribute("d",s),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const a in t)e.setAttribute(a,t[a]);return e}function y(){const s=v("accf__chev-svg");return s.appendChild(_("M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",{"stroke-miterlimit":"10"})),s}function u(s){return s==null?new Set:new Set(Array.isArray(s)?s:[s])}let x=0,f;function A(s){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=s;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(s,t){const e=t?A(String(t).trim()):null;if(!e){for(const r of w)s.style.removeProperty(r);return}const a=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,n=e.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),c=(r,d)=>s.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(r,o);c("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])c(r,i?"0 0 0":"255 255 255");c("--vs-color",o),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class S extends HTMLElement{static observedAttributes=["variant","tone","size","radius","multiple","disabled","value","color"];#e;#s=h;#r=[];#t=new Set;#c=`vs-accf-${++x}`;#n=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#e=document.createElement("div"),this.#e.className="accf",t.append(e,this.#e)}connectedCallback(){m(this,this.getAttribute("color")),this.hasAttribute("value")&&(this.#t=u(this.#l())),this.#f(),this.#o()}disconnectedCallback(){this.#r=[]}attributeChangedCallback(t){if(m(this,this.getAttribute("color")),!!this.#e){if(t==="value"){if(this.#n)return;this.#t=u(this.#l()),this.#i();return}if(t==="multiple"){!this.#a()&&this.#t.size>1&&(this.#t=new Set([[...this.#t][0]]),this.#i());return}if(t==="disabled"){this.#o(),this.#p();return}this.#o()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const a=JSON.parse(t);Array.isArray(a)&&(e=a)}catch{}this.#s=e&&e.length?e:h,this.#e&&this.#f()}get items(){return this.#s}get value(){return this.#a()?[...this.#t]:[...this.#t][0]??""}set value(t){this.#t=u(t),this.#d(),this.#e&&this.#i()}#a(){return this.hasAttribute("multiple")}#l(){const t=this.getAttribute("value");return t==null?null:this.#a()?t.split(",").filter(Boolean):t}#d(){this.#n=!0;const t=[...this.#t];t.length?this.setAttribute("value",this.#a()?t.join(","):String(t[0])):this.removeAttribute("value"),this.#n=!1}#o(){const t=(e,a)=>this.getAttribute(e)??a;this.#e.className=`accf accf--${t("variant","separated")} accf--t-${t("tone","default")} accf--${t("size","md")} accf--r-${t("radius","squircle")}`+(this.hasAttribute("disabled")?" is-disabled":"")}#p(){const t=this.hasAttribute("disabled");for(const e of this.#r)e.head.disabled=t||!!e.item.disabled}#f(){this.#r.forEach(t=>t.el.remove()),this.#r=[],this.#s.forEach((t,e)=>{const a=document.createElement("div");a.className="accf__item";const l=document.createElement("span");l.className="accf__fill",l.setAttribute("aria-hidden","true");const i=document.createElement("button");if(i.type="button",i.className="accf__head",i.id=`${this.#c}-head-${e}`,i.setAttribute("aria-expanded","false"),i.setAttribute("aria-controls",`${this.#c}-panel-${e}`),i.disabled=this.hasAttribute("disabled")||!!t.disabled,t.icon){const p=document.createElement("span");p.className="accf__icon",p.innerHTML=t.icon,i.appendChild(p)}const o=document.createElement("span");o.className="accf__title",o.textContent=t.title??"",i.appendChild(o);const n=document.createElement("span");n.className="accf__chev",n.setAttribute("aria-hidden","true"),n.appendChild(y()),i.appendChild(n);const c=document.createElement("div");c.className="accf__panel",c.id=`${this.#c}-panel-${e}`,c.setAttribute("role","region"),c.setAttribute("aria-labelledby",i.id);const r=document.createElement("div");r.className="accf__panel-clip";const d=document.createElement("div");d.className="accf__body",d.textContent=t.content??"",r.appendChild(d),c.appendChild(r),i.addEventListener("click",()=>this.#u(t)),a.append(l,i,c),this.#e.appendChild(a),this.#r[e]={item:t,el:a,head:i,fill:l,panel:c,chev:n}}),this.#i()}#i(){for(const t of this.#r){const e=this.#t.has(t.item.value);t.el.classList.toggle("is-open",e),t.head.setAttribute("aria-expanded",e?"true":"false")}}#u(t){if(this.hasAttribute("disabled")||t.disabled)return;const e=new Set(this.#t);e.has(t.value)?e.delete(t.value):(this.#a()||e.clear(),e.add(t.value)),this.#t=e,this.#d(),this.#i();const a=this.#a()?[...e]:[...e][0]??"";this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:a}}))}}customElements.define("vs-accordion-filled",S);
