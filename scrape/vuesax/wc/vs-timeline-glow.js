const p="http://www.w3.org/2000/svg";function h(){const l=document.createElementNS(p,"svg");l.setAttribute("viewBox","0 0 24 24"),l.setAttribute("fill","none");for(const n of["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z","M7.75 11.9999L10.58 14.8299L16.25 9.16992"]){const t=document.createElementNS(p,"path");t.setAttribute("d",n),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),l.appendChild(t)}return l}const m=[{title:"Order placed",description:"We confirmed your purchase.",time:"09:24",done:!0},{title:"Preparing",description:"Packing your products.",time:"10:02",done:!0},{title:"Shipped",description:"On its way to your address.",time:"13:40"},{title:"Issue",description:"Delayed by weather.",time:"15:10"}],_=`
  .tlg {
    --mk: 26px;
    --gut: 40px;
    --fs: var(--ctrl-fs-md, 14px);
    --tlg-accent: var(--ui-accent, #ededed);
    --tlg-border: var(--border, #2a2a2a);
    --tlg-text: var(--text, #ededed);
    --muted: color-mix(in srgb, var(--text, #ededed) 55%, transparent);
    --card: var(--bg-card, #111);
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    font: inherit;
    font-size: var(--fs);
    color: var(--tlg-text);
  }
  .tlg--sm { --mk: 22px; --gut: 36px; --fs: var(--ctrl-fs-sm, 13px); }
  .tlg--lg { --mk: 30px; --gut: 44px; --fs: var(--ctrl-fs-lg, 15px); }

  .tlg__item {
    position: relative;
    display: grid;
    grid-template-columns: var(--gut) 1fr;
    column-gap: 14px;
    padding-bottom: 22px;
  }
  .tlg__item:last-child { padding-bottom: 0; }

  /* connector line — glows when leading to a completed step */
  .tlg__item::before {
    content: '';
    position: absolute;
    top: calc(var(--mk) + 6px);
    bottom: -2px;
    left: calc(var(--gut) / 2);
    width: 2px;
    transform: translateX(-50%);
    background: var(--tlg-border);
    transition: background 300ms ease, box-shadow 300ms ease;
  }
  .tlg__item--ln-done::before {
    background: var(--tlg-accent);
    box-shadow: 0 0 8px color-mix(in srgb, var(--tlg-accent) 70%, transparent);
  }
  .tlg--l-dashed .tlg__item::before {
    background: repeating-linear-gradient(to bottom, var(--tlg-border) 0 5px, transparent 5px 11px);
    box-shadow: none;
  }
  .tlg--l-dashed .tlg__item--ln-done::before {
    background: repeating-linear-gradient(to bottom, var(--tlg-accent) 0 5px, transparent 5px 11px);
  }
  .tlg__item:last-child::before { display: none; }

  .tlg__marker {
    grid-column: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .tlg__dot {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--mk);
    height: var(--mk);
    border-radius: 999px;
    border: 2px solid var(--tlg-border);
    background: var(--card);
    color: var(--card);
    font-size: calc(var(--mk) * 0.5);
    z-index: 2;
    transition: box-shadow 300ms ease, border-color 300ms ease, background 300ms ease;
  }
  .tlg__dot svg { display: block; width: 1em; height: 1em; }
  .tlg__item--done .tlg__dot {
    background: var(--tlg-accent);
    border-color: var(--tlg-accent);
    box-shadow: 0 0 14px color-mix(in srgb, var(--tlg-accent) 65%, transparent);
  }
  .tlg__item--active .tlg__dot {
    border-color: var(--tlg-accent);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--tlg-accent) 55%, transparent);
  }
  /* Perf: the ping (spread 0/α.55→10px/α0) is baked at its visible peak (~35%:
     5px at half alpha) in ::after; only opacity animates (compositable). */
  .tlg--pulse .tlg__item--active .tlg__dot::after {
    content: '';
    position: absolute;
    inset: -2px; /* also covers the dot's border */
    border-radius: inherit;
    pointer-events: none;
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--tlg-accent) 28%, transparent);
    opacity: 0;
    animation: tlg-pulse 1800ms ease-out infinite;
  }
  @keyframes tlg-pulse {
    0%   { opacity: 0; }
    35%  { opacity: 1; }
    70%, 100% { opacity: 0; }
  }

  .tlg__content { grid-column: 2; padding-top: 2px; }
  .tlg__time { display: block; font-size: 0.8em; color: var(--muted); font-variant-numeric: tabular-nums; }
  .tlg__title { display: block; font-weight: 600; line-height: 1.25; margin-top: 2px; }
  .tlg__desc { margin: 4px 0 0; color: var(--muted); line-height: 1.45; font-size: 0.92em; }
  .tlg__item--active .tlg__title { color: var(--tlg-accent); }

  /* status tints */
  .tlg__item--danger  { --tlg-accent: #ff6369; }
  .tlg__item--warn    { --tlg-accent: #ffb224; }
  .tlg__item--success { --tlg-accent: #4cc38a; }

  @media (prefers-reduced-motion: reduce) {
    .tlg--pulse .tlg__item--active .tlg__dot { animation: none; }
    .tlg--pulse .tlg__item--active .tlg__dot::after { animation: none; opacity: 0; }
  }
`;let d;function v(l){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=l;const n=d.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const t=n.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(l,n){const t=n?v(String(n).trim()):null;if(!t){for(const e of x)l.style.removeProperty(e);return}const s=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),a=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,i=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(e=>Math.round(a?e*.92:e+(255-e)*.16)),r=(e,g)=>l.style.setProperty(e,g);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(e,i);r("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(e,a?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])r(e,a?"0 0 0":"255 255 255");r("--vs-color",i),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["size","tone","line-style","progress","pulse","color"];#t;#i=null;#e=[];#n=[];constructor(){super();const n=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=_,this.#t=document.createElement("ol"),this.#t.className="tlg",n.append(t,this.#t)}connectedCallback(){u(this,this.getAttribute("color")),this.#s(),this.#o()}disconnectedCallback(){}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#t&&this.#o()}get items(){return this.#i??m}set items(n){this.#i=Array.isArray(n)?n:null,this.#t&&(this.#s(),this.#o())}#l(n,t){if(!this.hasAttribute(n))return t;const s=this.getAttribute(n);return s!=="false"&&s!=="0"}#r(n){const t=this.getAttribute("progress");return t!=null&&t!==""?n<(parseInt(t,10)||0):!!this.#e[n]?.done}#s(){this.#t.textContent="",this.#n=[];const n=this.#i??m;this.#e=n.map(t=>t||{}),this.#e.forEach(()=>{const t=document.createElement("li");t.className="tlg__item";const s=document.createElement("span");s.className="tlg__marker",s.setAttribute("aria-hidden","true");const c=document.createElement("span");c.className="tlg__dot";const a=h();c.append(a),s.append(c);const i=document.createElement("div");i.className="tlg__content";const o=document.createElement("time");o.className="tlg__time";const r=document.createElement("span");r.className="tlg__title";const e=document.createElement("p");e.className="tlg__desc",i.append(o,r,e),t.append(s,i),this.#t.appendChild(t),this.#n.push({li:t,dot:c,checkIco:a,timeEl:o,titleEl:r,descEl:e})})}#o(){const n=this.getAttribute("size")||"md",t=this.getAttribute("tone")||"default",s=this.getAttribute("line-style")||"solid",c=this.hasAttribute("pulse");this.#t.className=["tlg",`tlg--${n}`,`tlg--l-${s}`,c?"tlg--pulse":""].filter(Boolean).join(" ");let a=-1;for(let i=0;i<this.#e.length;i++)if(!this.#r(i)){a=i;break}for(let i=0;i<this.#n.length;i++){const o=this.#n[i],r=this.#e[i],e=r.status||t,g=this.#r(i),b=i===a,f=this.#r(i+1);o.li.className=["tlg__item",`tlg__item--${e}`,g?"tlg__item--done":"",b?"tlg__item--active":"",f?"tlg__item--ln-done":""].filter(Boolean).join(" "),o.checkIco.style.display=g?"":"none",r.time?(o.timeEl.textContent=r.time,o.timeEl.style.display=""):o.timeEl.style.display="none",o.titleEl.textContent=r.title||"",r.description?(o.descEl.textContent=r.description,o.descEl.style.display=""):o.descEl.style.display="none"}}}customElements.define("vs-timeline-glow",y);
