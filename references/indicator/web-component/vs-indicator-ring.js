const b="http://www.w3.org/2000/svg",C=`
  :host { display: inline-flex; }
  .rng {
    --rng-spring: cubic-bezier(0.22, 1, 0.36, 1);
    --badge: 19px;
    --dot: 10px;
    --pushx: 35%;
    --pushy: -35%;
    position: relative;
    isolation: isolate;
    display: inline-flex;
    flex: none;
    vertical-align: middle;
  }

  .rng--sm { --badge: 16px; --dot: 8px; }
  .rng--md { --badge: 19px; --dot: 10px; }
  .rng--lg { --badge: 24px; --dot: 13px; }

  .rng__anchor { display: inline-flex; border-radius: inherit; }

  .rng__demo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--surface-2, #1a1a1a);
    color: var(--text-muted, #8a8a8a);
    box-shadow: inset 0 0 0 1px var(--border, #2a2a2a);
  }
  .rng__demo svg { width: 60%; height: 60%; }
  .rng--sm .rng__demo { width: 34px; height: 34px; }
  .rng--lg .rng__demo { width: 60px; height: 60px; }

  .rng--p-top-right    .rng__badge, .rng--p-top-right    .rng__orbit { top: 0; right: 0; }
  .rng--p-top-left     .rng__badge, .rng--p-top-left     .rng__orbit { top: 0; left: 0; }
  .rng--p-bottom-right .rng__badge, .rng--p-bottom-right .rng__orbit { bottom: 0; right: 0; }
  .rng--p-bottom-left  .rng__badge, .rng--p-bottom-left  .rng__orbit { bottom: 0; left: 0; }

  .rng--p-top-right    { --pushx: 35%;  --pushy: -35%; }
  .rng--p-top-left     { --pushx: -35%; --pushy: -35%; }
  .rng--p-bottom-right { --pushx: 35%;  --pushy: 35%; }
  .rng--p-bottom-left  { --pushx: -35%; --pushy: 35%; }

  .rng__badge {
    position: absolute;
    z-index: 5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-sizing: border-box;
    height: var(--badge);
    min-width: var(--badge);
    width: calc(var(--badge) + (var(--digits, 1) - 1) * 0.6em);
    border-radius: 999px;
    color: #fff;
    font-size: calc(var(--badge) * 0.52);
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    box-shadow: 0 0 0 2px var(--bg, #0a0a0a);
    transform: translate(var(--pushx), var(--pushy));
    transform-origin: var(--pushx) var(--pushy);
    transition:
      width 420ms var(--rng-spring),
      border-radius 300ms var(--rng-spring),
      background-color 300ms ease,
      transform 420ms var(--rng-spring),
      opacity 220ms ease,
      filter 280ms ease;
  }
  .rng__badge[hidden] { display: none; }

  .rng--m-dot { width: var(--dot); min-width: var(--dot); height: var(--dot); }
  .rng--m-icon { width: var(--badge); min-width: var(--badge); }
  .rng__content { display: inline-flex; align-items: center; justify-content: center; }
  .rng--m-icon .rng__content ::slotted(svg) {
    width: calc(var(--badge) * 0.62);
    height: calc(var(--badge) * 0.62);
    display: block;
  }
  .rng__num { display: block; }

  .rng--t-danger  { --tone-c: var(--tone-danger,  #f23f43); }
  .rng--t-success { --tone-c: var(--tone-success, #23a55a); }
  .rng--t-warn    { --tone-c: var(--tone-warn,    #f0b232); }
  .rng--t-info    { --tone-c: var(--ui-accent, #ededed); }
  .rng--t-neutral { --tone-c: var(--tone-neutral, var(--ui-accent, #ededed)); }
  .rng__badge { background: var(--tone-c, var(--ui-accent, #ededed)); }
  .rng--t-warn.rng__badge { color: #160f02; }

  /* ── orbiting ring: conic arc spinning around the badge ────────────── */
  .rng__orbit {
    position: absolute;
    z-index: 4;
    box-sizing: border-box;
    /* slightly bigger than the badge so it can orbit it */
    width: calc(var(--badge) + 6px);
    height: calc(var(--badge) + 6px);
    border-radius: 999px;
    transform: translate(var(--pushx), var(--pushy));
    transform-origin: var(--pushx) var(--pushy);
    /* conic arc: solid for ~30% of the turn, transparent for the rest */
    background: conic-gradient(
      var(--tone-c, var(--ui-accent, #ededed)) 0deg 110deg,
      transparent 110deg 360deg
    );
    /* hollow ring: cuts out the center leaving only the edge */
    -webkit-mask: radial-gradient(circle at center, transparent 60%, #000 62%);
            mask: radial-gradient(circle at center, transparent 60%, #000 62%);
    animation: rng-spin var(--spin, 1.4s) linear infinite;
    pointer-events: none;
  }
  .rng__orbit[hidden] { display: none; }
  .rng__orbit--dot {
    width: calc(var(--dot) + 6px);
    height: calc(var(--dot) + 6px);
  }
  @keyframes rng-spin {
    from { transform: translate(var(--pushx), var(--pushy)) rotate(0deg); }
    to   { transform: translate(var(--pushx), var(--pushy)) rotate(360deg); }
  }

  .rng__badge.rng-pop-out {
    opacity: 0; filter: blur(7px);
    transform: translate(var(--pushx), var(--pushy)) scale(0.2);
  }

  .rng__content {
    transition: opacity 200ms ease, filter 200ms ease, scale 320ms var(--rng-spring);
  }
  .rng__content.rng-swap-out {
    opacity: 0; filter: blur(6px); scale: 0.45;
  }

  @media (prefers-reduced-motion: reduce) {
    .rng__badge,
    .rng__content { transition: none; }
    .rng__orbit { animation: none; }
  }
`;let l;function k(d){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=d;const n=l.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const t=n.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function _(d,n){const t=n?k(String(n).trim()):null;if(!t){for(const e of E)d.style.removeProperty(e);return}const i=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),o=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,r=t.map(e=>Math.round(o?e*.92:e+(255-e)*.16)),s=(e,h)=>d.style.setProperty(e,h);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(e,a);s("--btn-primary-bg-hover",`rgb(${r[0]} ${r[1]} ${r[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(e,o?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])s(e,o?"0 0 0":"255 255 255");s("--vs-color",a),s("--vs-color-rgb",t.join(" ")),s("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class S extends HTMLElement{static observedAttributes=["count","max","dot","show-zero","position","tone","size","spin","color"];#r;#o;#a;#e;#t;#s;#n;#i;#g=null;#d=()=>this.#c();constructor(){super();const n=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=C,this.#r=document.createElement("span"),this.#r.className="rng",this.#o=document.createElement("span"),this.#o.className="rng__anchor",this.#a=document.createElement("slot");const i=document.createElement("span");i.className="rng__demo",i.setAttribute("aria-hidden","true");const g=document.createElementNS(b,"svg");g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none");const o=document.createElementNS(b,"path");o.setAttribute("d","M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z");const a=document.createElementNS(b,"path");a.setAttribute("d","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22");for(const r of[o,a])r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round"),g.appendChild(r);i.appendChild(g),this.#a.appendChild(i),this.#o.appendChild(this.#a),this.#e=document.createElement("span"),this.#e.className="rng__orbit",this.#e.setAttribute("aria-hidden","true"),this.#t=document.createElement("span"),this.#t.className="rng__badge",this.#t.setAttribute("role","status"),this.#s=document.createElement("span"),this.#s.className="rng__content",this.#n=document.createElement("slot"),this.#n.name="badge",this.#i=document.createElement("span"),this.#i.className="rng__num",this.#s.append(this.#n,this.#i),this.#t.appendChild(this.#s),this.#r.append(this.#o,this.#e,this.#t),n.append(t,this.#r),this.#n.addEventListener("slotchange",this.#d)}connectedCallback(){_(this,this.getAttribute("color")),this.#c()}disconnectedCallback(){this.#n.removeEventListener("slotchange",this.#d)}attributeChangedCallback(){_(this,this.getAttribute("color")),this.#r&&this.#c()}#c(){const n=(p,u)=>this.getAttribute(p)??u,t=(p,u)=>{const v=this.getAttribute(p);return v===null?u:Number(v)},i=t("max",99),o=(this.hasAttribute("count")?t("count",0):null)??0,a=o>i?`${i}+`:String(o),r=this.hasAttribute("dot"),s=this.#n.assignedNodes({flatten:!0}).length>0,e=this.hasAttribute("show-zero"),h=r||s||o>0||e,c=r?"dot":s?"icon":"count",y=c==="count"?a.length:1,x=n("position","top-right"),m=n("tone","danger"),w=n("size","md"),A=Math.max(.4,t("spin",1.4));this.#r.className=`rng rng--${w} rng--p-${x}`,this.#e.hidden=!h,this.#e.className=`rng__orbit rng--t-${m}${c==="dot"?" rng__orbit--dot":""}`,this.#e.style.setProperty("--spin",`${A}s`),this.#t.style.display=h?"":"none",this.#t.className=`rng__badge rng--t-${m} rng--m-${c}`,this.#t.style.setProperty("--digits",String(y)),c==="count"?this.#t.setAttribute("aria-label",`${a} notifications`):this.#t.removeAttribute("aria-label");const f=c==="count"?`n:${a}`:c;f!==this.#g&&(this.#g=f,this.#n.style.display=c==="icon"?"":"none",this.#i.style.display=c==="count"?"":"none",this.#i.textContent=c==="count"?a:"")}}customElements.define("vs-indicator-ring",S);
