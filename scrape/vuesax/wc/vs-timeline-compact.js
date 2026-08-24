const p=[{title:"Order placed",description:"We confirmed your purchase.",time:"09:24",done:!0},{title:"Preparing",description:"Packing your items.",time:"10:02",done:!0},{title:"Shipped",description:"On its way to your address.",time:"13:40"},{title:"Issue",description:"Delayed by weather.",time:"15:10"}],f=`
  .tlk {
    --mk: 9px;
    --row: 30px;
    --fs: var(--ctrl-fs-md, 14px);
    --tlk-accent: var(--ui-accent, #ededed);
    --tlk-border: var(--border, #2a2a2a);
    --tlk-text: var(--text, #ededed);
    --muted: color-mix(in srgb, var(--text, #ededed) 52%, transparent);
    --card: var(--bg-card, #111);
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    font: inherit;
    font-size: var(--fs);
    color: var(--tlk-text);
  }
  .tlk--sm { --fs: var(--ctrl-fs-sm, 13px); --row: 26px; --mk: 8px; }
  .tlk--lg { --fs: var(--ctrl-fs-lg, 15px); --row: 34px; --mk: 10px; }

  .tlk__item {
    position: relative;
    display: grid;
    grid-template-columns: 3.4em 18px auto 1fr;
    align-items: center;
    column-gap: 8px;
    min-height: var(--row);
    padding: 3px 0;
  }

  /* thin rail through the dots (column 2 center) */
  .tlk__item::before {
    content: '';
    position: absolute;
    top: 50%;
    bottom: -3px;
    left: calc(3.4em + 8px + 9px);
    width: 1.5px;
    transform: translateX(-50%);
    background: var(--tlk-border);
  }
  .tlk--l-dashed .tlk__item::before {
    background: repeating-linear-gradient(to bottom, var(--tlk-border) 0 4px, transparent 4px 8px);
  }
  /* Progress: a segment lights up only when the row BELOW it has been reached —
     colouring it from the row above would run the line past the last dot. */
  .tlk__item--ln-done::before { background: var(--tlk-accent); }
  .tlk--l-dashed .tlk__item--ln-done::before {
    background: repeating-linear-gradient(to bottom, var(--tlk-accent) 0 4px, transparent 4px 8px);
  }
  .tlk__item:last-child::before { display: none; }

  .tlk__time {
    grid-column: 1;
    font-size: 0.78em;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  .tlk__marker {
    grid-column: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tlk__dot {
    width: var(--mk);
    height: var(--mk);
    border-radius: 999px;
    border: 1.5px solid var(--tlk-accent);
    background: var(--card);
    z-index: 2;
    transition: background 200ms ease;
  }
  .tlk__item--done .tlk__dot { background: var(--tlk-accent); }

  .tlk__title { grid-column: 3; font-weight: 600; line-height: 1.2; white-space: nowrap; }
  .tlk__item--done .tlk__title { color: var(--muted); text-decoration: line-through; }
  .tlk__desc {
    grid-column: 4;
    color: var(--muted);
    font-size: 0.86em;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* hover-reveal mode: hide desc until the row is hovered */
  .tlk--reveal .tlk__desc {
    opacity: 0;
    transition: opacity 200ms ease;
  }
  .tlk--reveal .tlk__item:hover .tlk__desc { opacity: 1; }

  /* status tints */
  .tlk__item--danger  { --tlk-accent: #ff6369; }
  .tlk__item--warn    { --tlk-accent: #ffb224; }
  .tlk__item--success { --tlk-accent: #4cc38a; }

  @media (prefers-reduced-motion: reduce) {
    .tlk--reveal .tlk__desc { transition: none; }
  }
`;let d;function k(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const r=d.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const t=r.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const b=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(c,r){const t=r?k(String(r).trim()):null;if(!t){for(const e of b)c.style.removeProperty(e);return}const i=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),o=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,s=t.map(e=>Math.round(o?e*.92:e+(255-e)*.16)),n=(e,m)=>c.style.setProperty(e,m);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(e,l);n("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(e,o?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])n(e,o?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["size","tone","line-style","progress","hover-reveal","color"];#t;#r=null;#e=[];constructor(){super();const r=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#t=document.createElement("ol"),this.#t.className="tlk",r.append(t,this.#t)}connectedCallback(){h(this,this.getAttribute("color")),this.#i(),this.#n()}disconnectedCallback(){}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#n()}get items(){return this.#r??p}set items(r){this.#r=Array.isArray(r)&&r.length?r:null,this.#t&&(this.#i(),this.#n())}#o(r,t){if(!this.hasAttribute(r))return t;const i=this.getAttribute(r);return i!=="false"&&i!=="0"}#i(){this.#t.textContent="",this.#e=[],(this.#r??p).forEach(t=>{const i=document.createElement("li");i.className="tlk__item";const a=document.createElement("time");a.className="tlk__time",a.textContent=t.time||"";const o=document.createElement("span");o.className="tlk__marker",o.setAttribute("aria-hidden","true");const l=document.createElement("span");l.className="tlk__dot",o.appendChild(l);const s=document.createElement("span");if(s.className="tlk__title",s.textContent=t.title,i.append(a,o,s),t.description){const n=document.createElement("span");n.className="tlk__desc",n.textContent=t.description,i.appendChild(n)}this.#t.appendChild(i),this.#e.push({li:i,item:t})})}#n(){const r=this.getAttribute("size")||"md",t=this.getAttribute("tone")||"default",i=this.getAttribute("line-style")||"solid",a=this.#o("hover-reveal",!1),l=this.hasAttribute("progress")?parseInt(this.getAttribute("progress"),10)||0:null;this.#t.className=["tlk",`tlk--${r}`,`tlk--l-${i}`,a?"tlk--reveal":""].filter(Boolean).join(" ");const s=n=>l!=null?n<l:!!this.#e[n]?.item.done;this.#e.forEach((n,e)=>{const m=n.item.status??t,u=s(e),g=e+1<this.#e.length&&s(e+1);n.li.className=`tlk__item tlk__item--${m}`+(u?" tlk__item--done":"")+(g?" tlk__item--ln-done":"")})}}customElements.define("vs-timeline-compact",_);
