const g="http://www.w3.org/2000/svg",_="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z";function x(c){const t=document.createElementNS(g,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of c){const i=document.createElementNS(g,"path");i.setAttribute("d",e),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),t.appendChild(i)}return t}const A=()=>x([_,"M7.75 11.9999L10.58 14.8299L16.25 9.16992"]),y=()=>x([_,"M9.17004 14.8299L14.83 9.16992","M14.83 14.8299L9.17004 9.16992"]),m=["Account","Profile","Confirm"],k=`
  .stp {
    --fs: var(--ctrl-fs-md, 14px);
    --h: 40px;
    --accent: var(--ui-accent, #ededed);
    --ring: var(--ui-ring, 255 255 255);
    --done-fg: var(--ui-accent-fg, #0b0b0b);
    display: inline-flex;
    gap: 8px;
    width: 100%;
    font-family: inherit;
    font-size: var(--fs);
    color: var(--text, #ededed);
  }
  .stp--sm { --fs: 13px; --h: 34px; }
  .stp--lg { --fs: 15px; --h: 46px; }

  .stp__pill {
    position: relative;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: var(--h);
    padding: 0 6px;
    border: 1px solid var(--border, #2a2a2a);
    border-radius: 999px;
    background: var(--bg-elevated, #16181d);
    color: var(--text-muted, #8a8a8a);
    font: inherit;
    cursor: default;
    overflow: hidden;
    white-space: nowrap;
    transition:
      flex-grow 460ms cubic-bezier(0.34, 1.4, 0.64, 1),
      background-color 300ms ease,
      border-color 300ms ease,
      color 260ms ease,
      padding 300ms ease;
  }
  /* the active pill grows to fill and reveals its label */
  .stp__pill.is-active { flex: 1 1 0; padding: 0 14px 0 6px; background: color-mix(in srgb, var(--accent) 14%, var(--bg-elevated, #16181d)); border-color: color-mix(in srgb, var(--accent) 55%, var(--border, #2a2a2a)); color: var(--text, #ededed); }

  .stp__badge {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: calc(var(--h) - 12px);
    height: calc(var(--h) - 12px);
    border-radius: 999px;
    background: var(--bg-card, #141414);
    border: 1.5px solid var(--border, #2a2a2a);
    color: var(--text-muted, #8a8a8a);
    font-size: calc(var(--fs) - 3px);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    transition: background-color 280ms ease, border-color 280ms ease, color 280ms ease;
  }
  .stp__badge svg { width: 56%; height: 56%; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }

  /* label: hidden (width 0) unless the pill is active */
  .stp__label {
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    font-weight: 600;
    transition: max-width 460ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 260ms ease;
  }
  .stp__pill.is-active .stp__label { max-width: 240px; opacity: 1; }

  /* states */
  .stp__pill.is-completed { border-color: color-mix(in srgb, var(--accent) 45%, var(--border, #2a2a2a)); }
  .stp__pill.is-completed .stp__badge { background: var(--accent); border-color: var(--accent); color: var(--done-fg); }
  .stp__pill.is-active .stp__badge { background: var(--accent); border-color: var(--accent); color: var(--done-fg); }
  .stp__pill.is-error .stp__badge { background: #ff6369; border-color: #ff6369; color: #fff; }
  .stp--clickable .stp__pill.is-nav { cursor: pointer; }
  .stp--clickable .stp__pill.is-nav:hover { border-color: var(--accent); }

  /* tones */
  .stp--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --done-fg: #fff; }
  .stp--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --done-fg: #1a1206; }
  .stp--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --done-fg: #06180f; }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .stp__pill, .stp__label, .stp__badge { transition: none; }
  }
`;let p;function w(c){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=c;const t=p.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function v(c,t){const e=t?w(String(t).trim()):null;if(!e){for(const r of C)c.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),s=(r,b)=>c.style.setProperty(r,b);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(r,o);s("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])s(r,a?"0 0 0":"255 255 255");s("--vs-color",o),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class S extends HTMLElement{static observedAttributes=["current","value","size","tone","orientation","clickable","disabled","color"];#t;#s=null;#r=[];#i=[];#e=1;#a=t=>{const e=t.target.closest(".stp__pill");if(!e||!this.#t.contains(e))return;const i=Number(e.dataset.idx);Number.isNaN(i)||this.#l(i)};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=k,this.#t=document.createElement("div"),this.#t.className="stp",this.#t.setAttribute("role","list"),t.append(e,this.#t),this.#t.addEventListener("click",this.#a)}connectedCallback(){v(this,this.getAttribute("color")),this.#o(),this.#n()}disconnectedCallback(){this.#t.removeEventListener("click",this.#a)}attributeChangedCallback(){v(this,this.getAttribute("color")),this.#t&&this.#n()}get steps(){return this.#s??m}set steps(t){this.#s=Array.isArray(t)?t:null,this.#t&&(this.#o(),this.#n())}get current(){return this.#e}set current(t){this.setAttribute("current",String(t|0))}get value(){return this.#e}set value(t){this.setAttribute("value",String(t|0))}#c(t,e){if(!this.hasAttribute(t))return e;const i=this.getAttribute(t);return i!=="false"&&i!=="0"}#o(){this.#t.replaceChildren(),this.#i=[];const t=this.#s??m;this.#r=t.map(e=>typeof e=="string"?{label:e}:e||{}),this.#r.forEach((e,i)=>{const n=document.createElement("button");n.type="button",n.className="stp__pill",n.setAttribute("role","listitem"),n.dataset.idx=String(i);const a=document.createElement("span");a.className="stp__badge",a.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="stp__label",o.textContent=e.label||"",n.append(a,o),this.#t.appendChild(n),this.#i.push({btn:n,badge:a,label:o,canNav:!1})})}#n(){const t=this.getAttribute("size")||"md",e=this.getAttribute("tone")||"default",i=this.#c("clickable",!1),n=this.hasAttribute("disabled");this.#t.className=["stp",`stp--${t}`,`stp--t-${e}`,i?"stp--clickable":"",n?"is-disabled":""].filter(Boolean).join(" ");const a=this.getAttribute("current")??this.getAttribute("value"),o=a==null?1:parseInt(a,10)||0,l=this.#r.length;this.#e=l?Math.min(Math.max(o,0),l-1):0;for(let s=0;s<this.#i.length;s++){const r=this.#i[s],d=this.#r[s]?.status||(s<this.#e?"completed":s===this.#e?"active":"pending"),u=i&&!n&&d==="completed";r.canNav=u;const f=this.#r[s]?.label||"";if(r.btn.className=`stp__pill is-${d}`+(u?" is-nav":""),r.btn.disabled=n,r.btn.setAttribute("aria-label",f),r.btn.title=f,d==="active"?r.btn.setAttribute("aria-current","step"):r.btn.removeAttribute("aria-current"),r.badge.replaceChildren(),d==="completed")r.badge.appendChild(A());else if(d==="error")r.badge.appendChild(y());else{const h=document.createElement("span");h.textContent=String(s+1),r.badge.appendChild(h)}}}#l(t){const e=this.#i[t];!e||!e.canNav||t!==this.#e&&(this.setAttribute("current",String(t)),this.setAttribute("value",String(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{index:t}})))}}customElements.define("vs-steps-pills",S);
