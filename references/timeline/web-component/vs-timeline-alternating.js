const f="http://www.w3.org/2000/svg",v="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z";function x(){const r=document.createElementNS(f,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");for(const a of[v,"M7.75 11.9999L10.58 14.8299L16.25 9.16992"]){const t=document.createElementNS(f,"path");t.setAttribute("d",a),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),r.appendChild(t)}return r}const u=[{title:"Order placed",description:"We confirmed your purchase.",time:"09:24",done:!0},{title:"Preparing",description:"Packing your items.",time:"10:02",done:!0},{title:"Shipped",description:"On its way to your address.",time:"13:40"},{title:"Issue",description:"Delayed by weather.",time:"15:10"}],w=`
  /* The layout switch at the bottom of this sheet measures THIS box, not the
     window — a timeline dropped in a sidebar is narrow on a wide screen. The
     container context has to sit here: an element is never matched by its own
     container query, so on .tla the query would measure the wrong box. */
  :host { display: block; container-type: inline-size; }

  .tla {
    --mk: 22px;
    --fs: var(--ctrl-fs-md, 14px);
    --tla-accent: var(--ui-accent, #ededed);
    --tla-border: var(--border, #2a2a2a);
    --tla-text: var(--text, #ededed);
    --muted: color-mix(in srgb, var(--text, #ededed) 55%, transparent);
    --card: var(--bg-card, #111);
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    font: inherit;
    font-size: var(--fs);
    color: var(--tla-text);
  }
  .tla--sm { --mk: 18px; --fs: var(--ctrl-fs-sm, 13px); }
  .tla--lg { --mk: 26px; --fs: var(--ctrl-fs-lg, 15px); }

  /* central spine */
  .tla::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    background: var(--tla-border);
  }
  .tla--l-dashed::before {
    background: repeating-linear-gradient(to bottom, var(--tla-border) 0 5px, transparent 5px 11px);
  }
  /* Progress beam over the spine. A single overlay, not per-item segments: the
     items here are half-width and alternate sides, so a per-row pseudo would sit
     off the centre line. Height comes from JS as a percentage of the list. */
  .tla::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: var(--tla-fill, 0%);
    transform: translateX(-50%);
    background: linear-gradient(180deg,
      var(--tla-accent),
      color-mix(in srgb, var(--tla-accent) 45%, transparent));
    transition: height 480ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  @media (prefers-reduced-motion: reduce) { .tla::after { transition: none; } }

  .tla__item {
    position: relative;
    width: 50%;
    padding: 0 30px 26px 0;
    box-sizing: border-box;
    text-align: right;
    animation: tla-in 500ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    animation-delay: var(--d);
  }
  .tla__item--right {
    margin-left: 50%;
    padding: 0 0 26px 30px;
    text-align: left;
  }
  .tla__item:last-child { padding-bottom: 0; }

  .tla__marker {
    position: absolute;
    top: 2px;
    right: calc(var(--mk) / -2);
    width: var(--mk);
    height: var(--mk);
    z-index: 2;
  }
  .tla__item--right .tla__marker { right: auto; left: calc(var(--mk) / -2); }
  .tla__dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 999px;
    border: 2px solid var(--tla-accent);
    background: var(--card);
    color: var(--tla-accent);
    font-size: calc(var(--mk) * 0.6);
    transition: background 200ms ease, color 200ms ease;
  }
  .tla__item--done .tla__dot { background: var(--tla-accent); color: var(--card); }
  .tla__dot svg { display: block; width: 1em; height: 1em; }

  .tla__time { display: block; font-size: 0.8em; color: var(--muted); font-variant-numeric: tabular-nums; }
  .tla__title { display: block; font-weight: 600; line-height: 1.25; margin-top: 2px; }
  .tla__desc { margin: 4px 0 0; color: var(--muted); line-height: 1.45; font-size: 0.92em; }
  .tla__item--done .tla__title { text-decoration: line-through; color: var(--muted); }

  /* status tints */
  .tla__item--danger  { --tla-accent: #ff6369; }
  .tla__item--warn    { --tla-accent: #ffb224; }
  .tla__item--success { --tla-accent: #4cc38a; }

  @keyframes tla-in {
    0% { opacity: 0; transform: translateX(-16px); }
    100% { opacity: 1; transform: none; }
  }
  .tla__item--right { animation-name: tla-in-right; }
  @keyframes tla-in-right {
    0% { opacity: 0; transform: translateX(16px); }
    100% { opacity: 1; transform: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .tla__item { animation: none; }
  }

  /* Under ~420px a half-width column is barely 145px wide, and every title and
     description shreds into ragged three-word slivers on both flanks of the
     spine. The alternation is decoration; the reading order is the content. So
     collapse to a single left rail: rows go full width, the spine and its
     markers move to one gutter, and both sides align left. */
  @container (max-width: 420px) {
    .tla::before,
    .tla::after { left: calc(var(--mk) / 2); }

    .tla__item,
    .tla__item--right {
      width: 100%;
      margin-left: 0;
      padding: 0 0 26px calc(var(--mk) + 14px);
      text-align: left;
    }
    /* Re-stated because the shorthand above outranks the wide-layout rule. */
    .tla__item:last-child { padding-bottom: 0; }

    .tla__marker,
    .tla__item--right .tla__marker { right: auto; left: 0; }

    /* Odd rows enter from +16px, which now reads as flying in from outside the
       box — every row starts at the same left edge, so there is no right side
       to come from. Send them the same way as their neighbours. */
    .tla__item--right { animation-name: tla-in; }
  }
`;let h;function k(r){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=r;const a=h.fillStyle;if(a.charAt(0)==="#")return[parseInt(a.slice(1,3),16),parseInt(a.slice(3,5),16),parseInt(a.slice(5,7),16)];const t=a.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const A=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(r,a){const t=a?k(String(a).trim()):null;if(!t){for(const e of A)r.style.removeProperty(e);return}const s=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),o=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,m=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(e=>Math.round(o?e*.92:e+(255-e)*.16)),i=(e,c)=>r.style.setProperty(e,c);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(e,m);i("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(e,o?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])i(e,o?"0 0 0":"255 255 255");i("--vs-color",m),i("--vs-color-rgb",t.join(" ")),i("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class C extends HTMLElement{static observedAttributes=["size","tone","line-style","progress","stagger","color"];#t;#i=null;#a=[];#e=[];constructor(){super();const a=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=w,this.#t=document.createElement("ol"),this.#t.className="tla",a.append(t,this.#t)}connectedCallback(){b(this,this.getAttribute("color")),this.#r(),this.#n()}disconnectedCallback(){}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#t&&this.#n()}get items(){return this.#i??u}set items(a){this.#i=Array.isArray(a)?a:null,this.#t&&(this.#r(),this.#n())}#r(){this.#t.textContent="",this.#e=[];const a=this.#i??u;this.#a=a.map(t=>t||{}),this.#a.forEach(t=>{const s=document.createElement("li");s.className="tla__item";const d=document.createElement("span");d.className="tla__marker",d.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="tla__dot";const m=x();o.appendChild(m),d.appendChild(o);const l=document.createElement("div");l.className="tla__content";const i=document.createElement("time");i.className="tla__time";const e=document.createElement("span");e.className="tla__title",e.textContent=t.title||"";const c=document.createElement("p");c.className="tla__desc",t.time?(i.textContent=t.time,i.style.display=""):i.style.display="none",t.description?(c.textContent=t.description,c.style.display=""):c.style.display="none",l.append(i,e,c),s.append(d,l),this.#t.appendChild(s),this.#e.push({li:s,checkIco:m})})}#n(){const a=this.getAttribute("size")||"md",t=this.getAttribute("tone")||"default",s=this.getAttribute("line-style")||"solid",d=this.getAttribute("progress"),o=d==null?null:parseInt(d,10)||0,m=parseInt(this.getAttribute("stagger")||"90",10)||90;this.#t.className=["tla",`tla--${a}`,`tla--l-${s}`].join(" "),this.#t.style.setProperty("--stagger",`${m}ms`);const l=this.#e.length,i=n=>o!=null?n<o:!!this.#a[n]?.done;let e=-1;for(let n=0;n<l;n++)i(n)&&(e=n);const c=e<0?0:Math.min(100,(e+.5)/l*100);this.#t.style.setProperty("--tla-fill",`${c.toFixed(2)}%`);for(let n=0;n<this.#e.length;n++){const p=this.#e[n],_=this.#a[n].status??t,g=i(n),y=n%2===1;p.li.className=["tla__item",`tla__item--${_}`,y?"tla__item--right":"",g?"tla__item--done":""].filter(Boolean).join(" "),p.li.style.setProperty("--d",`${n*m}ms`),p.checkIco.style.display=g?"":"none"}}}customElements.define("vs-timeline-alternating",C);
