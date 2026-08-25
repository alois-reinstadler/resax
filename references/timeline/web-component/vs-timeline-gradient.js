const m="http://www.w3.org/2000/svg",u=[{title:"Order placed",description:"We confirmed your purchase.",time:"09:24",done:!0},{title:"Preparing",description:"Packing your products.",time:"10:02",done:!0},{title:"Shipped",description:"On its way to your address.",time:"13:40"},{title:"Issue",description:"Delayed by weather.",time:"15:10"}];function _(){const d=document.createElementNS(m,"svg");d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.setAttribute("aria-hidden","true");const t=document.createElementNS(m,"path");return t.setAttribute("d","M5 12.5L9.5 17L19 7.5"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","2.4"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),d.appendChild(t),d}const x=`
  .tlgr {
    --mk: 18px;
    --gut: 42px;
    --rail: 3px;
    --fs: var(--ctrl-fs-md, 14px);
    /* Distinct names on purpose: a custom property may NOT reference itself
       (--accent: var(--accent, …) is invalid at computed-value time and the
       whole thing silently resolves to nothing — that is how the rail went
       missing). These read the host token and keep a literal fallback. */
    --g-accent: var(--ui-accent, #ededed);
    --g-accent2: color-mix(in srgb, var(--ui-accent, #ededed) 40%, #8a8a8a);
    --g-border: var(--border, #2a2a2a);
    --g-text: var(--text, #ededed);
    --g-muted: color-mix(in srgb, var(--text, #ededed) 55%, transparent);
    --g-card: var(--bg-card, #111);
    --fill: 0px;

    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    font: inherit;
    font-size: var(--fs);
    color: var(--g-text);
  }
  .tlgr--sm { --mk: 15px; --gut: 36px; --rail: 2.5px; --fs: var(--ctrl-fs-sm, 13px); }
  .tlgr--lg { --mk: 21px; --gut: 48px; --rail: 3.5px; --fs: var(--ctrl-fs-lg, 15px); }

  /* ── the rail ───────────────────────────────────────────────────────────── */
  /* dim track: the whole route, always visible so the remaining distance reads */
  .tlgr__track,
  .tlgr__beam {
    position: absolute;
    top: var(--rail-top, 10px);
    left: calc(var(--gut) / 2);
    width: var(--rail);
    transform: translateX(-50%);
    border-radius: 999px;
    pointer-events: none;
  }
  .tlgr__track {
    bottom: var(--rail-bottom, 10px);
    background: var(--g-border);
    z-index: 0;
  }
  /* the beam: gradient clipped to how far the process got */
  .tlgr__beam {
    height: var(--fill);
    background: linear-gradient(180deg,
      color-mix(in srgb, var(--g-accent) 65%, transparent),
      var(--g-accent) 38%,
      var(--g-accent2));
    z-index: 1;
    transition: height 620ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  /* travelling sheen — a MASK moving over the gradient that is really there,
     instead of scrolling a background nobody can see at 3px wide */
  .tlgr__beam::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(180deg, transparent 0%, #fff 50%, transparent 100%);
    opacity: 0;
    mix-blend-mode: screen;
  }
  .tlgr--flow .tlgr__beam::after {
    opacity: 0.85;
    background-size: 100% 44%;
    background-repeat: no-repeat;
    animation: tlgr-sheen 2600ms cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes tlgr-sheen {
    0%, 12% { background-position: 0 -50%; }
    88%, 100% { background-position: 0 150%; }
  }
  .tlgr--l-dashed .tlgr__track,
  .tlgr--l-dashed .tlgr__beam {
    -webkit-mask: repeating-linear-gradient(to bottom, #000 0 6px, transparent 6px 12px);
            mask: repeating-linear-gradient(to bottom, #000 0 6px, transparent 6px 12px);
  }

  /* the head: where the process stands right now */
  .tlgr__head {
    position: absolute;
    left: calc(var(--gut) / 2);
    top: var(--rail-top, 10px);
    width: calc(var(--rail) * 2.6);
    height: calc(var(--rail) * 2.6);
    margin-top: calc(var(--fill) - var(--rail) * 1.3);
    transform: translateX(-50%);
    border-radius: 999px;
    background: var(--g-accent2);
    box-shadow: 0 0 10px 2px color-mix(in srgb, var(--g-accent2) 55%, transparent);
    opacity: var(--head-on, 0);
    z-index: 2;
    pointer-events: none;
    transition: margin-top 620ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease;
  }
  .tlgr--flow .tlgr__head { animation: tlgr-breathe 2200ms ease-in-out infinite; }
  @keyframes tlgr-breathe {
    0%, 100% { box-shadow: 0 0 8px 1px color-mix(in srgb, var(--g-accent2) 45%, transparent); }
    50% { box-shadow: 0 0 16px 5px color-mix(in srgb, var(--g-accent2) 65%, transparent); }
  }

  /* ── rows ───────────────────────────────────────────────────────────────── */
  .tlgr__item {
    position: relative;
    display: grid;
    grid-template-columns: var(--gut) 1fr;
    column-gap: 14px;
    padding-bottom: 22px;
  }
  .tlgr__item:last-child { padding-bottom: 0; }

  .tlgr__marker {
    grid-column: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 1px;
  }
  .tlgr__dot {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--mk);
    height: var(--mk);
    border-radius: 999px;
    border: 2px solid var(--g-border);
    background: var(--g-card);
    /* the ring sits ON the rail — the card-coloured halo punches the track out
       behind it so the line never crosses the glyph */
    box-shadow: 0 0 0 4px var(--g-card);
    z-index: 3;
    transition: border-color 260ms ease, background 260ms ease, transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .tlgr__dot svg { width: 68%; height: 68%; opacity: 0; transition: opacity 200ms ease; color: var(--g-card); }

  /* covered */
  .tlgr__item--done .tlgr__dot {
    border-color: transparent;
    background: linear-gradient(135deg, var(--g-accent), var(--g-accent2));
  }
  .tlgr__item--done .tlgr__dot svg { opacity: 1; }

  /* current — a ring with a conic sweep running inside it */
  .tlgr__item--now .tlgr__dot {
    border-color: var(--g-accent);
    transform: scale(1.16);
  }
  .tlgr__item--now .tlgr__dot::before {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 999px;
    background: conic-gradient(from 0deg,
      transparent 0deg, color-mix(in srgb, var(--g-accent) 85%, transparent) 90deg, transparent 200deg);
  }
  .tlgr--flow .tlgr__item--now .tlgr__dot::before { animation: tlgr-spin 1600ms linear infinite; }
  @keyframes tlgr-spin { to { transform: rotate(1turn); } }

  .tlgr__content { grid-column: 2; min-width: 0; }
  .tlgr__time {
    display: block;
    font-size: 0.8em;
    color: var(--g-muted);
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }
  .tlgr__title {
    display: block;
    font-weight: 600;
    line-height: 1.25;
    margin-top: 2px;
    /* future rows sit back; the eye lands on the current one first */
    color: color-mix(in srgb, var(--g-text) 62%, transparent);
    transition: color 240ms ease;
  }
  .tlgr__desc {
    margin: 4px 0 0;
    color: var(--g-muted);
    line-height: 1.45;
    font-size: 0.92em;
  }
  .tlgr__item--done .tlgr__title {
    background: linear-gradient(90deg, var(--g-accent), var(--g-accent2));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
  .tlgr__item--now .tlgr__title { color: var(--g-text); }
  .tlgr__item--now .tlgr__desc { color: color-mix(in srgb, var(--g-text) 78%, transparent); }

  /* per-item status recolours BOTH ends of that row's gradient */
  .tlgr__item--danger  { --g-accent: #ff6369; --g-accent2: #ffb224; }
  .tlgr__item--warn    { --g-accent: #ffb224; --g-accent2: #ff6369; }
  .tlgr__item--success { --g-accent: #4cc38a; --g-accent2: #5b8cff; }

  .tlgr__sr {
    position: absolute;
    width: 1px; height: 1px;
    margin: -1px; padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .tlgr__beam, .tlgr__head { transition: none; }
    .tlgr--flow .tlgr__beam::after,
    .tlgr--flow .tlgr__head,
    .tlgr--flow .tlgr__item--now .tlgr__dot::before { animation: none; }
    .tlgr__dot { transition: none; }
  }
`;let h;function v(d){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=d;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(d,t){const e=t?v(String(t).trim()):null;if(!e){for(const r of y)d.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,i=e.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),s=(r,g)=>d.style.setProperty(r,g);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(r,c);s("--btn-primary-bg-hover",`rgb(${i[0]} ${i[1]} ${i[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])s(r,a?"0 0 0":"255 255 255");s("--vs-color",c),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["size","tone","line-style","progress","flow","color"];#t;#c;#i;#n;#s=null;#r=[];#e=[];#a=null;#o=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=x,this.#t=document.createElement("ol"),this.#t.className="tlgr";const n=l=>{const a=document.createElement("span");return a.className=l,a.setAttribute("aria-hidden","true"),a};this.#c=n("tlgr__track"),this.#i=n("tlgr__beam"),this.#n=n("tlgr__head"),this.#t.append(this.#c,this.#i,this.#n),t.append(e,this.#t)}connectedCallback(){b(this,this.getAttribute("color")),this.#o=!1,this.#g(),this.#l(),this.#a=new ResizeObserver(()=>this.#p()),this.#a.observe(this)}disconnectedCallback(){this.#o=!0,this.#a?.disconnect(),this.#a=null}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#l()}get items(){return this.#s??u}set items(t){this.#s=Array.isArray(t)&&t.length?t:null,this.#t&&(this.#g(),this.#l())}get progress(){const t=this.getAttribute("progress");if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?e:null}set progress(t){t==null?this.removeAttribute("progress"):this.setAttribute("progress",String(t))}#g(){for(const t of this.#e)t.li.remove();this.#e=[],this.#r=this.#s??u,this.#r.forEach((t,e)=>{const n=document.createElement("li");n.className="tlgr__item";const l=document.createElement("span");l.className="tlgr__marker",l.setAttribute("aria-hidden","true");const a=document.createElement("span");a.className="tlgr__dot",a.appendChild(_()),l.appendChild(a);const c=document.createElement("div");c.className="tlgr__content";const i=document.createElement("time");i.className="tlgr__time";const s=document.createElement("span");s.className="tlgr__title";const r=document.createElement("p");r.className="tlgr__desc";const g=document.createElement("span");g.className="tlgr__sr",c.append(i,s,r,g),n.append(l,c),this.#t.appendChild(n),s.textContent=t.title||"",t.time?(i.textContent=t.time,i.style.display=""):i.style.display="none",t.description?(r.textContent=t.description,r.style.display=""):r.style.display="none",this.#e.push({li:n,item:t,i:e,marker:l,srEl:g})})}#d(t,e){return e!=null?t<Math.floor(e+1e-6):!!this.#r[t]?.done}#l(){const t=this.getAttribute("size")||"md",e=this.getAttribute("line-style")||"solid",n=this.hasAttribute("flow")&&this.getAttribute("flow")!=="false"&&this.getAttribute("flow")!=="0";this.#t.className=["tlgr",`tlgr--${t}`,`tlgr--l-${e}`,n?"tlgr--flow":""].filter(Boolean).join(" ");const l=this.getAttribute("tone")||"default",a=this.progress;let c=-1;for(let i=0;i<this.#e.length;i++)if(!this.#d(i,a)){c=i;break}for(const i of this.#e){const s=i.item.status??l,r=this.#d(i.i,a),g=i.i===c;i.li.className=`tlgr__item tlgr__item--${s}`+(r?" tlgr__item--done":"")+(g?" tlgr__item--now":""),g?i.li.setAttribute("aria-current","step"):i.li.removeAttribute("aria-current"),i.srEl.textContent=r?" (completed)":g?" (in progress)":""}this.#p()}#p(){if(this.#o||!this.#e.length)return;const t=this.progress,e=this.#e.length;let n;if(t!=null)n=Math.max(0,Math.min(e-1,t-1));else{let o=-1;for(let p=0;p<e;p++)this.#r[p]?.done&&(o=p);n=Math.max(0,o)}const l=t!=null?t>0:this.#r.some(o=>o.done),a=n-Math.floor(n),c=l&&a>.06?"1":"0",i=this.#e.map(o=>{const p=o.marker.firstElementChild;return p?p.offsetTop+p.offsetHeight/2+o.li.offsetTop:0}),s=i.length>1&&i[i.length-1]>i[0];let r,g;if(s){r=i[0];const o=Math.floor(n),p=Math.min(e-1,o+1),f=n-o;g=i[o]+(i[p]-i[o])*f-r,this.#t.style.setProperty("--rail-top",`${r}px`),this.#t.style.setProperty("--rail-bottom",`${Math.max(0,this.#t.clientHeight-i[e-1])}px`)}else{const o=e>1?n/(e-1)*100:0;this.#t.style.setProperty("--rail-top","10px"),this.#t.style.setProperty("--rail-bottom","10px"),this.#i.style.height=`${o}%`,this.#n.style.marginTop=`calc(${o}% - var(--rail) * 1.3)`,this.#t.style.setProperty("--head-on",c);return}this.#t.style.setProperty("--fill",`${Math.max(0,g).toFixed(1)}px`),this.#i.style.height="",this.#n.style.marginTop="",this.#t.style.setProperty("--head-on",c)}}customElements.define("vs-timeline-gradient",w);
