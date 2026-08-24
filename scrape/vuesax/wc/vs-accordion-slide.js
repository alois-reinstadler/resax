const v=`
  :host { display: block; }
  .accs {
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
  .accs--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 34px); --pad-x: 13px; --r: var(--ctrl-r-sm, 10px); }
  .accs--md { --fs: var(--ctrl-fs-md, 14px); --h: var(--ctrl-h-md, 40px); --pad-x: 16px; --r: var(--ctrl-r-md, 12px); }
  .accs--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --pad-x: 20px; --r: var(--ctrl-r-lg, 14px); }

  .accs--r-none .accs__item { --rr: 0px; }
  .accs--r-subtle .accs__item { --rr: 8px; }
  .accs--r-rounded .accs__item { --rr: var(--r); }
  @supports (corner-shape: squircle) {
    .accs--r-squircle .accs__item { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .accs__item {
    position: relative;
    overflow: hidden;
    border-radius: var(--rr);
    background: var(--bg-card, #111);
    border: 1px solid var(--inp-border, #2a2a2a);
    transition: border-color 240ms ease;
  }
  .accs__item.is-open { border-color: color-mix(in srgb, var(--acc) 40%, var(--inp-border, #2a2a2a)); }

  .accs__head {
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
  .accs__head:disabled { cursor: not-allowed; opacity: 0.45; }
  .accs__item.is-open .accs__head { color: var(--acc); }

  .accs__icon { display: inline-flex; flex: 0 0 auto; }
  .accs__icon svg { width: 1.1em; height: 1.1em; display: block; }
  .accs__title { flex: 1 1 auto; line-height: 1.3; }

  /* ── SLIDE effect part 1: a plus that rotates into a minus ── */
  .accs__sign {
    position: relative;
    flex: 0 0 auto;
    width: 1.1em;
    height: 1.1em;
    color: var(--text-muted, #8a8a8a);
    transition: color 200ms ease, transform 500ms var(--spring);
  }
  .accs__bar {
    position: absolute;
    left: 50%;
    top: 50%;
    background: currentColor;
    border-radius: 2px;
    transition: transform 460ms var(--spring), opacity 300ms ease;
  }
  .accs__bar--h { width: 0.85em; height: 2px; transform: translate(-50%, -50%); }
  .accs__bar--v { width: 2px; height: 0.85em; transform: translate(-50%, -50%); }
  .accs__item.is-open .accs__sign { transform: rotate(180deg); color: var(--acc); }
  .accs__item.is-open .accs__bar--v { transform: translate(-50%, -50%) scaleY(0); opacity: 0; }

  .accs__panel {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 560ms var(--spring);
  }
  .accs__item.is-open .accs__panel { grid-template-rows: 1fr; }
  .accs__panel-clip { min-height: 0; overflow: hidden; }

  /* ── SLIDE effect part 2: body glides in from the left behind an accent rail ── */
  .accs__body {
    position: relative;
    padding: 2px var(--pad-x) calc(var(--h) / 3.2);
    padding-left: calc(var(--pad-x) + 14px);
    color: var(--text-muted, #8a8a8a);
    line-height: 1.55;
    font-weight: 400;
  }
  .accs__rail {
    position: absolute;
    left: var(--pad-x);
    top: 4px;
    bottom: calc(var(--h) / 3.2);
    width: 2px;
    border-radius: 2px;
    background: var(--acc);
    transform: scaleY(0);
    transform-origin: top center;
    transition: transform 460ms var(--spring);
  }
  .accs__text {
    display: block;
    opacity: 0;
    transform: translateX(-18px);
    transition: opacity 320ms ease, transform 540ms var(--spring);
  }
  .accs__item.is-open .accs__rail { transform: scaleY(1); }
  .accs__item.is-open .accs__text { opacity: 1; transform: translateX(0); transition-delay: 90ms; }

  /* line variant: rail sits at the row edge */
  .accs--line .accs__body { padding-left: 14px; }
  .accs--line .accs__rail { left: 0; }

  /* ── layout variants ── */
  .accs--contained { gap: 0; border: 1px solid var(--inp-border, #2a2a2a); border-radius: var(--rr); overflow: hidden; }
  @supports (corner-shape: squircle) { .accs--contained.accs--r-squircle { corner-shape: squircle; } }
  .accs--contained .accs__item { border-radius: 0; border: 0; background: transparent; }
  .accs--contained .accs__item + .accs__item { border-top: 1px solid var(--inp-border, #2a2a2a); }
  .accs--line { gap: 0; }
  .accs--line .accs__item { border-radius: 0; border: 0; border-bottom: 1px solid var(--inp-border, #2a2a2a); background: transparent; }
  .accs--line .accs__head { padding-left: 0; padding-right: 4px; }

  /* ── tones ── */
  .accs--t-default { --acc: var(--ui-accent, #ededed); }
  .accs--t-danger { --acc: var(--danger, #e5484d); }
  .accs--t-warn { --acc: var(--warn, #f5a623); }
  .accs--t-success { --acc: var(--success, #30a46c); }

  .accs.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .accs__panel { transition: none; }
    .accs__sign, .accs__bar { transition: transform 200ms ease; }
    .accs__text { transform: none; transition: opacity 200ms ease; }
    .accs__rail { transition: none; transform: scaleY(1); }
  }
`,g=[{title:"What is Vuesax?",content:"A catalog of portable, animation-first components. Copy the source, drop it in, ship it.",value:"a"},{title:"How does theming work?",content:"Every component reads from CSS custom properties with sane fallbacks, so it adapts to light/dark out of the box.",value:"b"},{title:"Can I use it without a build step?",content:"Yes. Components are self-contained — no global CSS or runtime dependency required.",value:"c"},{title:"Is there a Pro tier?",content:"Yes — unlocks source copy and exclusive sections.",value:"d",disabled:!0}];let x=0,p;function y(l){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=l;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function _(l,t){const e=t?y(String(t).trim()):null;if(!e){for(const a of w)l.style.removeProperty(a);return}const r=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),i=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(a=>Math.round(i?a*.92:a+(255-a)*.16)),c=(a,d)=>l.style.setProperty(a,d);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(a,n);c("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(a,e.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(a,i?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])c(a,i?"0 0 0":"255 255 255");c("--vs-color",n),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class A extends HTMLElement{static observedAttributes=["variant","tone","size","radius","multiple","disabled","value","color"];#e;#s=g;#r=[];#t=new Set;#i=`vs-accs-${++x}`;#c=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#e=document.createElement("div"),this.#e.className="accs",t.append(e,this.#e),this.#t=this.#n(this.getAttribute("value"))}connectedCallback(){_(this,this.getAttribute("color")),this.#d(),this.#l()}disconnectedCallback(){this.#p()}attributeChangedCallback(t){if(_(this,this.getAttribute("color")),!!this.#e){if(t==="value"){if(this.#c)return;this.#t=this.#n(this.getAttribute("value")),this.#a();return}t==="multiple"&&!this.multiple&&this.#t.size>1&&(this.#t=new Set([[...this.#t][0]]),this.#o(),this.#a()),this.#l()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const r=JSON.parse(t);Array.isArray(r)&&(e=r)}catch{}this.#s=e&&e.length?e:g,this.#e&&this.#d()}get items(){return this.#s}get value(){return this.multiple?[...this.#t]:[...this.#t][0]??""}set value(t){this.#t=this.#n(t),this.#o(),this.#e&&this.#a()}get modelValue(){return this.value}set modelValue(t){this.value=t}get multiple(){return this.hasAttribute("multiple")}set multiple(t){t?this.setAttribute("multiple",""):this.removeAttribute("multiple")}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#n(t){if(t==null)return new Set;if(Array.isArray(t))return new Set(t.filter(e=>e!=null).map(String));if(typeof t!="string")return new Set([String(t)]);if(!t.trim())return new Set;if(t.trim().startsWith("["))try{const e=JSON.parse(t);if(Array.isArray(e))return new Set(e.map(String))}catch{}return new Set(t.split(",").map(e=>e.trim()).filter(Boolean))}#o(){this.#c=!0;const t=[...this.#t];t.length?this.setAttribute("value",t.join(",")):this.removeAttribute("value"),this.#c=!1}#h(){const t=(e,r)=>this.getAttribute(e)??r;this.#e.className=`accs accs--${t("variant","separated")} accs--t-${t("tone","default")} accs--${t("size","md")} accs--r-${t("radius","squircle")}`+(this.hasAttribute("disabled")?" is-disabled":"")}#l(){this.#h(),this.#a()}#d(){this.#p(),this.#s.forEach((t,e)=>{const r=document.createElement("div");r.className="accs__item";const s=document.createElement("button");if(s.type="button",s.className="accs__head",s.id=`${this.#i}-head-${e}`,s.setAttribute("aria-controls",`${this.#i}-panel-${e}`),t.icon){const b=document.createElement("span");b.className="accs__icon",b.innerHTML=t.icon,s.appendChild(b)}const i=document.createElement("span");i.className="accs__title",i.textContent=t.title??"",s.appendChild(i);const n=document.createElement("span");n.className="accs__sign",n.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="accs__bar accs__bar--h";const c=document.createElement("span");c.className="accs__bar accs__bar--v",n.append(o,c),s.appendChild(n);const a=document.createElement("div");a.className="accs__panel",a.id=`${this.#i}-panel-${e}`,a.setAttribute("role","region"),a.setAttribute("aria-labelledby",s.id);const d=document.createElement("div");d.className="accs__panel-clip";const h=document.createElement("div");h.className="accs__body";const m=document.createElement("span");m.className="accs__rail",m.setAttribute("aria-hidden","true");const u=document.createElement("span");u.className="accs__text",u.textContent=t.content??"",h.append(m,u),d.appendChild(h),a.appendChild(d),r.append(s,a),this.#e.appendChild(r);const f=()=>this.#m(t);s.addEventListener("click",f),this.#r[e]={el:r,head:s,panel:a,it:t,handler:f}}),this.#a()}#p(){this.#r.forEach(({el:t,head:e,handler:r})=>{e.removeEventListener("click",r),t.remove()}),this.#r=[]}#a(){const t=this.hasAttribute("disabled");this.#r.forEach(({el:e,head:r,it:s})=>{const i=this.#t.has(s.value);e.classList.toggle("is-open",i),e.classList.toggle("is-disabled",!!s.disabled),r.setAttribute("aria-expanded",i?"true":"false"),r.disabled=t||!!s.disabled})}#m(t){if(this.hasAttribute("disabled")||t.disabled)return;const e=new Set(this.#t);e.has(t.value)?e.delete(t.value):(this.multiple||e.clear(),e.add(t.value)),this.#t=e,this.#o(),this.#a();const r=this.multiple?[...e]:[...e][0]??"";this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:r}}))}}customElements.define("vs-accordion-slide",A);
