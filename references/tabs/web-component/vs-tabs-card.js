const d=[{label:"Overview",value:"overview"},{label:"Activity",value:"activity"},{label:"Settings",value:"settings"},{label:"Members",value:"members",disabled:!0}],p=`
  :host { display: inline-block; max-width: 100%; }
  :host([block]) { display: block; width: 100%; }
  .tbc {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --tab-px: 16px;
    --r: 10px;
    --acc: var(--inp-accent, #ededed);
    --panel: var(--bg-card, #111);
    --line: var(--border, #2a2a2a);
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .tbc--block { display: flex; width: 100%; }
  .tbc--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 32px); --tab-px: 13px; }
  .tbc--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --tab-px: 20px; }

  /* the strip sits on a baseline; active tab merges into it (folder look) */
  .tbc__list {
    position: relative;
    display: inline-flex;
    gap: 4px;
    width: 100%;
    padding: 0 2px;
    border-bottom: 1px solid var(--line);
    /* More tabs than the box can hold become a rail: the cards sit on a single
       shared baseline, so wrapping would leave a second row hanging off the
       border. The top padding (with a matching negative margin) buys back the
       vertical room overflow-x takes away — it forces overflow-y to auto, which
       would otherwise clip the raised active card and the focus ring. */
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    padding-top: 6px;
    margin-top: -6px;
  }
  .tbc__list::-webkit-scrollbar { display: none; }

  .tbc__tab {
    position: relative;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    height: var(--h);
    padding: 0 var(--tab-px);
    margin-bottom: -1px; /* overlap the baseline */
    border: 1px solid transparent;
    border-bottom: none;
    border-radius: var(--r) var(--r) 0 0;
    background: transparent;
    color: var(--text-muted, #8a8a8a);
    font: inherit;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: color 200ms ease, background-color 200ms ease, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .tbc--block .tbc__tab { flex: 1 1 0; }
  .tbc__tab:hover:not(:disabled):not(.is-active) {
    color: var(--text, #ededed);
    background: color-mix(in srgb, var(--line) 30%, transparent);
  }
  /* active = raised folder tab connected to the panel below (covers the baseline) */
  .tbc__tab.is-active {
    color: var(--acc);
    background: var(--panel);
    border-color: var(--line);
  }
  /* the little tongue that hides the baseline under the active tab */
  .tbc__tab.is-active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: var(--panel);
  }
  /* accent bar on top of the active tab */
  .tbc__tab.is-active::before {
    content: '';
    position: absolute;
    left: -1px;
    right: -1px;
    top: -1px;
    height: 2px;
    border-radius: var(--r) var(--r) 0 0;
    background: var(--acc);
  }
  .tbc__tab:disabled { opacity: 0.4; cursor: not-allowed; }
  .tbc__icon { display: inline-flex; }
  .tbc__icon svg { width: 18px; height: 18px; display: block; }

  /* tones */
  .tbc--t-danger { --acc: #e5484d; }
  .tbc--t-warn { --acc: #f5a623; }
  .tbc--t-success { --acc: #30a46c; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .tbc__tab { transition: color 200ms ease, background-color 200ms ease; }
  }
`;let b;function f(c){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=c;const t=b.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(c,t){const e=t?f(String(t).trim()):null;if(!e){for(const r of g)c.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,i=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),a=(r,u)=>c.style.setProperty(r,u);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(r,i);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])a(r,o?"0 0 0":"255 255 255");a("--vs-color",i),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["value","size","tone","block","disabled","color"];#t;#e;#r=[];#a=null;#n;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=p,this.#t=document.createElement("div"),this.#t.className="tbc",this.#t.setAttribute("role","tablist"),this.#e=document.createElement("div"),this.#e.className="tbc__list",this.#t.appendChild(this.#e),this.#n=n=>this.#h(n),t.append(e,this.#t)}connectedCallback(){h(this,this.getAttribute("color")),this.#l(),this.#c(),this.#t.addEventListener("keydown",this.#n)}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#n)}attributeChangedCallback(t){h(this,this.getAttribute("color")),this.#t&&(this.#l(),t==="value"&&this.#d())}set items(t){this.#a=Array.isArray(t)&&t.length?t:null,this.#t&&this.#c()}get items(){return this.#a??d}set value(t){this.setAttribute("value",String(t))}get value(){return this.getAttribute("value")??this.#i()[0]?.value??""}#i(){return this.#a??d}#s(){return this.hasAttribute("disabled")&&this.hasAttribute("disabled")}#o(){const t=this.value,e=this.#i().findIndex(n=>n.value===t);return e<0?0:e}#l(){const t=(s,o)=>this.getAttribute(s)??o,e=this.hasAttribute("block")&&this.hasAttribute("block"),n=this.#s();this.#t.className=`tbc tbc--${t("size","md")} tbc--t-${t("tone","default")}${e?" tbc--block":""}${n?" is-disabled":""}`,this.#t.setAttribute("aria-disabled",n?"true":"false")}#c(){for(;this.#e.firstChild;)this.#e.removeChild(this.#e.firstChild);this.#r=[];const t=this.#i(),e=this.#o(),n=this.#s();t.forEach((s,o)=>{const i=document.createElement("button");i.type="button",i.className="tbc__tab"+(o===e?" is-active":""),i.setAttribute("role","tab"),i.setAttribute("aria-selected",o===e?"true":"false");const l=n||!!s.disabled;if(i.disabled=l,l&&i.setAttribute("aria-disabled","true"),i.tabIndex=o===e?0:-1,s.icon){const a=document.createElement("span");a.className="tbc__icon",a.innerHTML=s.icon,i.appendChild(a)}else i.textContent=s.label;i.addEventListener("click",()=>this.#b(o)),this.#e.appendChild(i),this.#r.push(i)})}#d(){const t=this.#o();this.#r.forEach((e,n)=>{const s=n===t;e.classList.toggle("is-active",s),e.setAttribute("aria-selected",s?"true":"false"),e.tabIndex=s?0:-1})}#b(t){if(this.#s())return;const e=this.#i()[t];!e||e.disabled||e.value===this.value||(this.value=e.value,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e.value,index:t}})))}#h(t){if(this.#s()||!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"].includes(t.key))return;const s=this.#i().map((a,r)=>({t:a,i:r})).filter(a=>!a.t.disabled);if(!s.length)return;const o=s.findIndex(a=>a.i===this.#o());let i=-1;if(t.key==="ArrowRight"||t.key==="ArrowDown"?i=(o+1+s.length)%s.length:t.key==="ArrowLeft"||t.key==="ArrowUp"?i=(o-1+s.length)%s.length:t.key==="Home"?i=0:t.key==="End"&&(i=s.length-1),i<0)return;t.preventDefault();const l=s[i].i;this.#b(l),this.#r[l]?.focus()}}customElements.define("vs-tabs-card",v);
