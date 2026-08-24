const b=[{title:"Order placed",description:"We confirmed your purchase.",time:"09:24",done:!0},{title:"Preparing",description:"Packing your items.",time:"10:02",done:!0},{title:"Shipped",description:"On its way to your address.",time:"13:40"},{title:"Issue",description:"Delayed by weather.",time:"15:10"}],f=`
  :host { display: block; }
  .tlc {
    --mk: 14px;
    --gut: 34px;
    --fs: var(--ctrl-fs-md, 14px);
    --tlc-accent: var(--ui-accent, #ededed);
    --tlc-border: var(--border, #2a2a2a);
    --tlc-text: var(--text, #ededed);
    --muted: color-mix(in srgb, var(--text, #ededed) 55%, transparent);
    --card: var(--bg-card, #111);
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    font: inherit;
    font-size: var(--fs);
    color: var(--tlc-text);
  }
  .tlc--sm { --fs: var(--ctrl-fs-sm, 13px); --gut: 30px; }
  .tlc--lg { --fs: var(--ctrl-fs-lg, 15px); --gut: 38px; }

  .tlc__item {
    position: relative;
    display: grid;
    grid-template-columns: var(--gut) 1fr;
    column-gap: 12px;
    padding-bottom: 18px;
    animation: tlc-in 480ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    animation-delay: var(--d);
  }
  .tlc__item:last-child { padding-bottom: 0; }

  /* spine */
  .tlc__item::before {
    content: '';
    position: absolute;
    top: 18px;
    bottom: -2px;
    left: calc(var(--gut) / 2);
    width: 2px;
    transform: translateX(-50%);
    background: var(--tlc-border);
  }
  .tlc--l-dashed .tlc__item::before {
    background: repeating-linear-gradient(to bottom, var(--tlc-border) 0 5px, transparent 5px 11px);
  }
  /* progress: covered segments take the accent */
  .tlc__item--ln-done::before { background: var(--tlc-accent); }
  .tlc--l-dashed .tlc__item--ln-done::before {
    background: repeating-linear-gradient(to bottom, var(--tlc-accent) 0 5px, transparent 5px 11px);
  }
  .tlc__item:last-child::before { display: none; }

  .tlc__marker {
    grid-column: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 10px;
  }
  .tlc__dot {
    width: var(--mk);
    height: var(--mk);
    border-radius: 999px;
    border: 2px solid var(--tlc-accent);
    background: var(--card);
    z-index: 2;
    transition: background 200ms ease;
  }
  .tlc__item--done .tlc__dot { background: var(--tlc-accent); }

  .tlc__card {
    grid-column: 2;
    position: relative;
    border: 1px solid var(--tlc-border);
    border-radius: 12px;
    background: color-mix(in srgb, var(--card) 92%, var(--tlc-text) 4%);
    padding: 10px 14px;
    box-shadow: 0 4px 14px -10px rgba(0, 0, 0, 0.6);
    transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 220ms ease, border-color 220ms ease;
  }
  /* stem connecting spine to the card */
  .tlc__card::before {
    content: '';
    position: absolute;
    top: 14px;
    left: -8px;
    width: 8px;
    height: 2px;
    background: var(--tlc-border);
  }
  .tlc__item--done .tlc__card { border-color: color-mix(in srgb, var(--tlc-accent) 55%, var(--tlc-border)); }
  .tlc--lift .tlc__card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 26px -14px rgba(0, 0, 0, 0.7);
    border-color: color-mix(in srgb, var(--tlc-accent) 40%, var(--tlc-border));
  }

  .tlc__head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
  .tlc__title { font-weight: 600; line-height: 1.25; }
  .tlc__time { font-size: 0.8em; color: var(--muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tlc__desc { margin: 4px 0 0; color: var(--muted); line-height: 1.45; font-size: 0.92em; }
  .tlc__item--done .tlc__title { color: var(--muted); }

  /* status tints */
  .tlc__item--danger  { --tlc-accent: #ff6369; }
  .tlc__item--warn    { --tlc-accent: #ffb224; }
  .tlc__item--success { --tlc-accent: #4cc38a; }

  @keyframes tlc-in {
    0% { opacity: 0; transform: translateY(12px) scale(0.97); }
    100% { opacity: 1; transform: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tlc__item { animation: none; }
    .tlc--lift .tlc__card:hover { transform: none; }
  }
`;let p;function h(d){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=d;const n=p.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const t=n.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(d,n){const t=n?h(String(n).trim()):null;if(!t){for(const e of _)d.style.removeProperty(e);return}const o=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),i=.2126*o(t[0])+.7152*o(t[1])+.0722*o(t[2])>.45,s=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(e=>Math.round(i?e*.92:e+(255-e)*.16)),r=(e,l)=>d.style.setProperty(e,l);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(e,s);r("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(e,i?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])r(e,i?"0 0 0":"255 255 255");r("--vs-color",s),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["size","tone","line-style","progress","hover-lift","color"];#t;#n=null;#r=[];#e=[];constructor(){super();const n=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=f,this.#t=document.createElement("ol"),this.#t.className="tlc",n.append(t,this.#t)}connectedCallback(){g(this,this.getAttribute("color")),this.#c(),this.#i()}disconnectedCallback(){}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#t&&this.#i()}get items(){return this.#n??b}set items(n){this.#n=Array.isArray(n)&&n.length?n:null,this.#t&&(this.#c(),this.#i())}#o(n,t){if(!this.hasAttribute(n))return t;const o=this.getAttribute(n);return o!=="false"&&o!=="0"}#c(){this.#t.textContent="",this.#e=[];const n=this.#n??b;this.#r=n.map(t=>t||{}),this.#r.forEach((t,o)=>{const a=document.createElement("li");a.className="tlc__item",a.style.setProperty("--d",`${o*70}ms`);const i=document.createElement("span");i.className="tlc__marker",i.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="tlc__dot",i.appendChild(s);const c=document.createElement("div");c.className="tlc__card";const r=document.createElement("div");r.className="tlc__head";const e=document.createElement("span");e.className="tlc__title",e.textContent=t.title||"",r.appendChild(e);let l=null;if(t.time&&(l=document.createElement("time"),l.className="tlc__time",l.textContent=t.time,r.appendChild(l)),c.appendChild(r),t.description){const m=document.createElement("p");m.className="tlc__desc",m.textContent=t.description,c.appendChild(m)}a.append(i,c),this.#t.appendChild(a),this.#e.push({li:a})})}#i(){const n=this.getAttribute("size")||"md",t=this.getAttribute("tone")||"default",o=this.getAttribute("line-style")||"solid",a=this.hasAttribute("hover-lift"),i=this.getAttribute("progress"),s=i==null?null:parseInt(i,10)||0;this.#t.className=["tlc",`tlc--${n}`,`tlc--l-${o}`,a?"tlc--lift":""].filter(Boolean).join(" ");const c=r=>s!=null?r<s:!!this.#r[r]?.done;for(let r=0;r<this.#e.length;r++){const l=this.#r[r].status??t,m=c(r),u=r+1<this.#e.length&&c(r+1);this.#e[r].li.className=`tlc__item tlc__item--${l}`+(m?" tlc__item--done":"")+(u?" tlc__item--ln-done":"")}}}customElements.define("vs-timeline-cards",x);
