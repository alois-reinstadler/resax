const u=[{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"Lifetime",value:"lifetime"}],b=`
  /* shrink-to-fit host: it keeps the whole row's intrinsic width forever, so in
     a narrow column the last tile is sliced in half by the container edge */
  :host { display: inline-flex; max-width: 100%; }
  .rgcard {
    --h: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --acc: var(--ui-accent, #ededed);
    display: inline-flex;
    gap: 12px;
    max-width: 100%;
    font-family: inherit;
  }
  .rgcard--vertical { flex-direction: column; align-items: stretch; }
  /* a row of tiles is a wrapping row: three cards do not fit a phone column, and
     a sliced card reads as a bug, not as "there is more to the right" */
  .rgcard--horizontal { flex-direction: row; align-items: stretch; flex-wrap: wrap; }
  /* columns > 0 → grid layout overriding direction. auto-fit only counts
     repetitions against a DEFINITE width; shrink-wrapped it resolves to one
     column at every size, so grid mode takes the whole line. */
  :host([columns]:not([columns='0'])) { display: block; width: 100%; }
  .rgcard--grid {
    display: grid;
    /* the asked-for 1/N share is the track's ideal minimum, floored at 140px, so
       a starved row drops to fewer columns instead of shaving Lifetime down to L */
    --share: calc((100% - (var(--cols, 2) - 1) * 12px) / var(--cols, 2));
    grid-template-columns: repeat(auto-fit, minmax(min(max(140px, var(--share)), 100%), 1fr));
  }
  .rgcard--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .rgcard--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .rgcard--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  .rgcard--danger  { --acc: var(--tone-danger, #ef4444); }
  .rgcard--warn    { --acc: var(--tone-warn, #f59e0b); }
  .rgcard--success { --acc: var(--tone-success, #22c55e); }

  .rgcard__tile {
    position: relative;
    display: inline-flex;
    align-items: center;
    /* flex and grid children floor at min-content: without this a tile refuses to
       give up a pixel and pushes the row past the box instead of wrapping */
    min-width: 0;
    min-height: calc(var(--h) + 12px);
    padding: 0 calc(var(--px) + 6px);
    border: 1.5px solid var(--inp-border, #2a2a2a);
    border-radius: 14px;
    background: var(--bg-card, #111);
    color: color-mix(in srgb, var(--inp-text, #ededed) 78%, transparent);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    text-align: left;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    transition:
      transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
      border-color 220ms ease,
      box-shadow 260ms ease,
      color 220ms ease;
  }
  .rgcard__tile:hover:not(:disabled) {
    transform: translateY(-3px);
    border-color: color-mix(in srgb, var(--acc) 45%, var(--inp-border, #2a2a2a));
    box-shadow: 0 12px 26px -16px color-mix(in srgb, var(--acc) 60%, #000);
  }
  .rgcard__tile:active:not(:disabled) { transform: translateY(-1px); }
  .rgcard__tile:focus-visible {
    outline: 2px solid color-mix(in srgb, var(--acc) 70%, transparent);
    outline-offset: 2px;
  }
  .rgcard__tile--active {
    border-color: var(--acc);
    color: var(--inp-text, #ededed);
    box-shadow:
      0 0 0 1px var(--acc) inset,
      0 12px 30px -18px color-mix(in srgb, var(--acc) 80%, #000);
  }
  .rgcard__tile:disabled { opacity: 0.4; cursor: not-allowed; }
  .rgcard--disabled { opacity: 0.6; }

  .rgcard__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    flex: none;
    border-radius: 999px;
    border: 1.5px solid color-mix(in srgb, var(--inp-text, #ededed) 30%, transparent);
    color: var(--bg-card, #111);
    background: transparent;
    transition:
      background 240ms ease,
      border-color 240ms ease,
      transform 300ms cubic-bezier(0.34, 1.8, 0.5, 1);
  }
  .rgcard__tile--active .rgcard__badge {
    background: var(--acc);
    border-color: var(--acc);
    transform: scale(1.08);
  }
  .rgcard__check {
    width: 13px;
    height: 13px;
    opacity: 0;
    transform: scale(0.4);
    transition: opacity 200ms ease 60ms, transform 320ms cubic-bezier(0.34, 1.9, 0.5, 1) 60ms;
  }
  .rgcard__tile--active .rgcard__check { opacity: 1; transform: scale(1); }

  @media (prefers-reduced-motion: reduce) {
    .rgcard__tile,
    .rgcard__badge,
    .rgcard__check { transition: none; }
    .rgcard__tile:hover:not(:disabled) { transform: none; }
  }
`;let h;function f(l){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=l;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const m=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(l,t){const e=t?f(String(t).trim()):null;if(!e){for(const r of m)l.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),s=(r,d)=>l.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(r,o);s("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])s(r,n?"0 0 0":"255 255 255");s("--vs-color",o),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["value","disabled","size","tone","name","columns","direction","color"];#t;#e=u;#r=[];#i;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#t=document.createElement("div"),this.#t.className="rgcard",this.#t.setAttribute("role","radiogroup"),t.append(e,this.#t),this.#i=i=>this.#l(i),this.#t.addEventListener("keydown",this.#i)}connectedCallback(){p(this,this.getAttribute("color")),this.#r.length||this.#o(),this.#s()}disconnectedCallback(){this.#t.removeEventListener("keydown",this.#i)}attributeChangedCallback(){p(this,this.getAttribute("color")),(this.#t.isConnected||this.#r.length)&&this.#s()}set options(t){this.#e=Array.isArray(t)&&t.length?t:u,this.#o(),this.#s()}get options(){return this.#e}get value(){return this.getAttribute("value")??String(this.#n()??"")}set value(t){t==null?this.removeAttribute("value"):this.setAttribute("value",String(t))}#n(){const t=this.#e.find(e=>!e.disabled)??this.#e[0];return t?t.value:void 0}#a(){const t=this.getAttribute("value");return t??String(this.#n()??"")}#o(){this.#t.textContent="",this.#r=this.#e.map(t=>{const e=document.createElement("button");e.type="button",e.className="rgcard__tile",e.setAttribute("role","radio"),e.dataset.value=String(t.value);const i=document.createElement("span");i.className="rgcard__badge",i.setAttribute("aria-hidden","true");const c="http://www.w3.org/2000/svg",n=document.createElementNS(c,"svg");n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("class","rgcard__check");const o=document.createElementNS(c,"path");o.setAttribute("d","M3.5 8.5l3 3 6-6.5"),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","2.2"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.appendChild(o),i.appendChild(n);const a=document.createElement("span");return a.className="rgcard__label",a.textContent=t.label,e.append(i,a),e.addEventListener("click",()=>this.#c(t)),this.#t.appendChild(e),e})}#c(t){if(this.hasAttribute("disabled")||t.disabled)return;const e=String(t.value);e!==this.#a()&&(this.value=e,this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t.value}})))}#l(t){if(this.hasAttribute("disabled")||!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp"].includes(t.key))return;t.preventDefault();const i=this.#e.filter(r=>!r.disabled);if(!i.length)return;const c=this.#a(),n=i.findIndex(r=>String(r.value)===c),o=t.key==="ArrowRight"||t.key==="ArrowDown",a=n<0?0:(n+(o?1:-1)+i.length)%i.length;this.#c(i[a]);const s=this.#e.indexOf(i[a]);this.#r[s]?.focus()}#s(){const t=(a,s)=>this.getAttribute(a)??s,e=this.hasAttribute("disabled"),i=parseInt(t("columns",""),10),c=Number.isFinite(i)&&i>0,n=t("direction","horizontal");this.#t.className=`rgcard rgcard--${t("size","md")} rgcard--${t("tone","default")} `+(c?"rgcard--grid ":`rgcard--${n} `)+(e?"rgcard--disabled":""),c?this.#t.style.setProperty("--cols",String(i)):this.#t.style.removeProperty("--cols"),this.#t.setAttribute("aria-disabled",e?"true":"false"),this.hasAttribute("name")&&this.#t.setAttribute("aria-label",this.getAttribute("name"));const o=this.#a();if(this.#e.forEach((a,s)=>{const r=this.#r[s];if(!r)return;const d=String(a.value)===o,g=e||!!a.disabled;r.classList.toggle("rgcard__tile--active",d),r.setAttribute("aria-checked",d?"true":"false"),r.tabIndex=d?0:-1,r.disabled=g,g?r.setAttribute("aria-disabled","true"):r.removeAttribute("aria-disabled")}),!this.#r.some(a=>a&&a.tabIndex===0)){const a=this.#r.find((s,r)=>s&&!(e||this.#e[r].disabled));a&&(a.tabIndex=0)}}}customElements.define("vs-radio-group-cards",v);
