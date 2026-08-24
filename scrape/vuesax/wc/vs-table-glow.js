const w="http://www.w3.org/2000/svg",b=`
  /* The stacked layout below switches on the HOST's width, not the window's —
     this table is just as likely to sit in a 320px sidebar of a 1440px page as
     on a phone. */
  :host { display: block; width: 100%; container-type: inline-size; }
  .vglw {
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --py: 12px;
    --r: var(--ctrl-r-md, 12px);
    --accent: var(--vglw-accent, var(--ui-accent, #ededed));
    --line: var(--border, #2a2a2a);
    --surface: var(--bg-card, #111);
    --surface-2: var(--bg-elevated, #171717);
    --txt: var(--text, #ededed);
    --txt-2: var(--text-secondary, #a1a1a1);

    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--r);
    color: var(--txt);
    font-family: inherit;
    font-size: var(--fs);
    overflow: hidden;
  }

  /* cursor-following radial glow behind the content */
  .vglw__glow {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 240ms ease;
    background: radial-gradient(
      240px 240px at var(--vglw-mx, 50%) var(--vglw-my, 0%),
      color-mix(in srgb, var(--accent) 26%, transparent) 0%,
      transparent 70%
    );
  }
  .vglw:hover .vglw__glow { opacity: 1; }

  .vglw__bar { position: relative; z-index: 1; padding: calc(var(--py) + 2px) var(--px); border-bottom: 1px solid var(--line); }
  .vglw__title { margin: 0; font-size: calc(var(--fs) + 2px); font-weight: 600; }
  .vglw__scroll { position: relative; z-index: 1; width: 100%; overflow-x: auto; }
  .vglw__table { width: 100%; border-collapse: collapse; }

  .vglw__th {
    padding: var(--py) var(--px);
    background: color-mix(in srgb, var(--surface-2) 82%, transparent);
    color: var(--txt-2);
    font-size: calc(var(--fs) - 2px);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: left;
    white-space: nowrap;
    user-select: none;
    border-bottom: 1px solid var(--line);
  }
  .vglw__th.is-center { text-align: center; }
  .vglw__th.is-right { text-align: right; }
  .vglw__sort {
    display: inline-flex; align-items: center; gap: 6px;
    /* The label line is 15px tall — under the 24px thumb floor. The padding
       grows the hit box; the negative margin cancels it again in the header
       row's height, so nothing moves. */
    padding: 5px 0; margin: -5px 0;
    border: 0; background: none; color: inherit; font: inherit;
    letter-spacing: inherit; text-transform: inherit; cursor: pointer;
    transition: color 160ms ease;
  }
  .vglw__th.is-right .vglw__sort { flex-direction: row-reverse; }
  .vglw__th.is-center .vglw__sort { justify-content: center; }
  .vglw__sort:hover { color: var(--txt); }
  .vglw__sort:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
  .vglw__arrow { display: inline-flex; transition: opacity 160ms ease, transform 200ms ease; }
  .vglw__arrow svg { width: 13px; height: 13px; }
  .vglw__arrow.is-idle { opacity: 0; transform: scale(0.8); }
  .vglw__sort:hover .vglw__arrow.is-idle { opacity: 0.4; }
  .vglw__arrow.is-asc { opacity: 1; transform: rotate(180deg); color: var(--accent); }
  .vglw__arrow.is-desc { opacity: 1; transform: rotate(0deg); color: var(--accent); }

  .vglw__td {
    padding: var(--py) var(--px);
    height: 48px;
    vertical-align: middle;
    text-align: left;
    transition: background-color 160ms ease, box-shadow 160ms ease;
  }
  .vglw__td.is-center { text-align: center; }
  .vglw__td.is-right { text-align: right; font-variant-numeric: tabular-nums; }
  .vglw__body tr + tr .vglw__td { border-top: 1px solid color-mix(in srgb, var(--line) 60%, transparent); }

  /* hovered row glows with accent tint + inset edge light */
  .vglw.is-hover .vglw__row:hover .vglw__td {
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    box-shadow: inset 0 0 22px -8px color-mix(in srgb, var(--accent) 60%, transparent);
  }

  .vglw__td--empty { height: 120px; text-align: center; color: var(--txt-2); }

  @media (prefers-reduced-motion: reduce) {
    .vglw__glow, .vglw__td, .vglw__arrow, .vglw__sort { transition: none; }
    .vglw__glow { display: none; }
  }

  /* Under ~480px the four columns stop fitting: the last one (Usage) ends up
     parked inside .vglw__scroll with nothing on screen to say it is there, and
     every name breaks over two lines. So each row turns into a stack of
     label/value lines. Rows stay full-bleed rather than becoming inset cards —
     the radial glow behind them only reads across an unbroken surface. */
  @container (max-width: 480px) {
    .vglw__head { display: none; }             /* its labels moved into the cells */
    .vglw__scroll { overflow-x: visible; }     /* stacked content never overflows */
    .vglw__table, .vglw__body, .vglw__row, .vglw__td { display: block; }
    /* A column group with no table to size spawns an anonymous one around itself. */
    .vglw__table colgroup { display: none; }

    .vglw__row {
      /* breathing room around each stack, so the row rule reads as a group
         boundary and not as one more field hairline */
      padding: 4px 0;
      transition: background-color 160ms ease, box-shadow 160ms ease;
    }
    .vglw__row + .vglw__row { border-top: 1px solid var(--line); }
    /* that rule drew the row rules while rows were table-rows; the separator
       above does it now, and leaving it on would double the line */
    .vglw__body tr + tr .vglw__td { border-top: 0; }
    /* higher class count than the rule above, so the in-card hairlines survive it */
    .vglw__body .vglw__td + .vglw__td { border-top: 1px solid color-mix(in srgb, var(--line) 45%, transparent); }

    .vglw__td {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      height: auto; min-height: 40px;
      padding: 8px var(--px);
      text-align: right;
      overflow-wrap: anywhere;                 /* an email or URL must not push the row wide */
    }
    .vglw__td::before {
      content: attr(data-label);
      flex: none;
      color: var(--txt-2);
      font-size: calc(var(--fs) - 2px);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* the tint and the inset edge light belong to the whole row — per cell they
       would draw one glowing box per field */
    .vglw.is-hover .vglw__row:hover {
      background: color-mix(in srgb, var(--accent) 12%, transparent);
      box-shadow: inset 0 0 22px -8px color-mix(in srgb, var(--accent) 60%, transparent);
    }
    .vglw.is-hover .vglw__row:hover .vglw__td { background: none; box-shadow: none; }

    .vglw__row--empty { border-top: 0; }
    .vglw__td--empty { display: block; text-align: center; }
  }
`,_=[{key:"name",label:"Member",sortable:!0},{key:"role",label:"Role",sortable:!0},{key:"status",label:"Status",align:"center",sortable:!0},{key:"usage",label:"Usage",align:"right",sortable:!0,width:"120px"}],f=[{id:1,name:"Ada Lovelace",role:"Owner",status:"Active",usage:9820},{id:2,name:"Alan Turing",role:"Admin",status:"Active",usage:7415},{id:3,name:"Grace Hopper",role:"Developer",status:"Pending",usage:3120},{id:4,name:"Linus Torvalds",role:"Developer",status:"Away",usage:1890},{id:5,name:"Margaret Hamilton",role:"Viewer",status:"Banned",usage:0}],y=c=>typeof c=="number"?c.toLocaleString():String(c??""),v=c=>c.align??"left";let d;function x(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(c,t){const e=t?x(String(t).trim()):null;if(!e){for(const r of k)c.style.removeProperty(r);return}const a=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),s=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(s?r*.92:r+(255-r)*.16)),o=(r,g)=>c.style.setProperty(r,g);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,n);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,s?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,s?"0 0 0":"255 255 255");o("--vs-color",n),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["row-key","title","sortable","hoverable","empty-text","glow-accent","color"];#t;#d;#a;#l;#c;#g;#p;#u;#n;#r;#m=null;#b=null;#s=null;#e=null;#_=[];#i=null;#o=0;#f=0;#y=0;#x=()=>{this.#i=this.#t.getBoundingClientRect()};#k=t=>{this.#f=t.clientX,this.#y=t.clientY,this.#o||(this.#o=requestAnimationFrame(this.#N))};#N=()=>{this.#o=0,this.#t&&(this.#i||(this.#i=this.#t.getBoundingClientRect()),this.#t.style.setProperty("--vglw-mx",`${this.#f-this.#i.left}px`),this.#t.style.setProperty("--vglw-my",`${this.#y-this.#i.top}px`))};#w=()=>{this.#i=null};#L=t=>{const e=t.target.closest?.(".vglw__sort");if(!e)return;const a=e.dataset.colKey,i=this.#v().find(s=>s.key===a);i&&this.#R(i)};#T=t=>{const e=t.target.closest?.(".vglw__row");if(!e||e.classList.contains("vglw__row--empty"))return;const a=Number(e.dataset.index),i=this.#_[a];i&&this.dispatchEvent(new CustomEvent("row-click",{bubbles:!0,composed:!0,detail:{row:i,index:a}}))};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=b,this.#t=document.createElement("div"),this.#t.className="vglw",this.#d=document.createElement("span"),this.#d.className="vglw__glow",this.#d.setAttribute("aria-hidden","true"),this.#a=document.createElement("div"),this.#a.className="vglw__bar",this.#l=document.createElement("h3"),this.#l.className="vglw__title",this.#c=document.createElement("slot"),this.#c.name="toolbar",this.#c.addEventListener("slotchange",()=>this.#S()),this.#a.append(this.#l,this.#c),this.#g=document.createElement("div"),this.#g.className="vglw__scroll",this.#p=document.createElement("table"),this.#p.className="vglw__table",this.#u=document.createElement("colgroup"),this.#n=document.createElement("thead"),this.#n.className="vglw__head",this.#n.addEventListener("click",this.#L),this.#r=document.createElement("tbody"),this.#r.className="vglw__body",this.#r.addEventListener("click",this.#T),this.#p.append(this.#u,this.#n,this.#r),this.#g.appendChild(this.#p),this.#t.append(this.#d,this.#a,this.#g),t.append(e,this.#t)}connectedCallback(){m(this,this.getAttribute("color")),this.#t.addEventListener("mouseenter",this.#x),this.#t.addEventListener("mousemove",this.#k),window.addEventListener("scroll",this.#w,{passive:!0,capture:!0}),window.addEventListener("resize",this.#w,{passive:!0}),this.#C(),this.#h()}disconnectedCallback(){this.#t.removeEventListener("mouseenter",this.#x),this.#t.removeEventListener("mousemove",this.#k),window.removeEventListener("scroll",this.#w,{capture:!0}),window.removeEventListener("resize",this.#w),this.#o&&cancelAnimationFrame(this.#o),this.#o=0,this.#i=null}attributeChangedCallback(t){m(this,this.getAttribute("color")),this.#t&&(this.#C(),t==="sortable"&&this.#h())}set columns(t){this.#m=Array.isArray(t)&&t.length?t:null,this.#t&&this.#h()}get columns(){return this.#v()}set rows(t){this.#b=Array.isArray(t)?t:null,this.#t&&this.#h()}get rows(){return this.#E()}get rowKey(){return this.getAttribute("row-key")??"id"}set rowKey(t){this.setAttribute("row-key",t)}get title(){return this.getAttribute("title")??""}set title(t){t?this.setAttribute("title",t):this.removeAttribute("title")}get sortable(){return this.hasAttribute("sortable")}set sortable(t){this.setAttribute("sortable",t===!1?"false":"true")}get hoverable(){return this.hasAttribute("hoverable")}set hoverable(t){this.setAttribute("hoverable",t===!1?"false":"true")}get emptyText(){return this.getAttribute("empty-text")??"No data to display"}set emptyText(t){this.setAttribute("empty-text",t)}get glowAccent(){return this.getAttribute("glow-accent")??""}set glowAccent(t){t?this.setAttribute("glow-accent",t):this.removeAttribute("glow-accent")}#v(){return this.#m??_}#E(){return this.#b??f}#z(t,e){const a=this.rowKey;return t?.[a]??e}#A(t){return this.sortable&&!!t.sortable}#R(t){this.#A(t)&&(this.#s!==t.key?(this.#s=t.key,this.#e="asc"):this.#e==="asc"?this.#e="desc":(this.#s=null,this.#e=null),this.dispatchEvent(new CustomEvent("sort",{bubbles:!0,composed:!0,detail:{key:this.#s,dir:this.#e}})),this.#h())}#$(){const t=this.#E().slice();if(!this.#s||!this.#e)return t;const e=this.#s,a=this.#e==="asc"?1:-1;return t.sort((i,s)=>{const n=i[e],l=s[e];return n==null?1:l==null?-1:typeof n=="number"&&typeof l=="number"?(n-l)*a:String(n).localeCompare(String(l))*a})}#C(){const t=this.hoverable;this.#t.className=`vglw${t?" is-hover":""}`;const e=this.glowAccent;e?this.#t.style.setProperty("--vglw-accent",e):this.#t.style.removeProperty("--vglw-accent"),this.#l.textContent=this.title,this.#S()}#S(){const t=!!this.title,e=this.#c.assignedNodes({flatten:!0}).length>0;this.#l.style.display=t?"":"none",this.#a.style.display=t||e?"":"none"}#h(){const t=this.#v(),e=this.#$();this.#_=e,this.#u.replaceChildren();for(const i of t){const s=document.createElement("col");i.width&&(s.style.width=i.width),this.#u.appendChild(s)}this.#n.replaceChildren();const a=document.createElement("tr");for(const i of t){const s=document.createElement("th"),n=v(i),l=this.#A(i),o=this.#s===i.key;if(s.className=`vglw__th is-${n}${l?" is-sortable":""}${o?" is-active":""}`,s.scope="col",l&&s.setAttribute("aria-sort",o?this.#e==="asc"?"ascending":"descending":"none"),l){const r=document.createElement("button");r.type="button",r.className="vglw__sort",r.dataset.colKey=i.key;const g=document.createElement("span");g.textContent=i.label;const p=document.createElement("span");p.className=`vglw__arrow ${o?`is-${this.#e}`:"is-idle"}`,p.setAttribute("aria-hidden","true");const u=document.createElementNS(w,"svg");u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none");const h=document.createElementNS(w,"path");h.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),h.setAttribute("stroke","currentColor"),h.setAttribute("stroke-width","1.5"),h.setAttribute("stroke-miterlimit","10"),h.setAttribute("stroke-linecap","round"),h.setAttribute("stroke-linejoin","round"),u.appendChild(h),p.appendChild(u),r.append(g,p),s.appendChild(r)}else{const r=document.createElement("span");r.textContent=i.label,s.appendChild(r)}a.appendChild(s)}if(this.#n.appendChild(a),this.#r.replaceChildren(),e.length===0){const i=document.createElement("tr");i.className="vglw__row vglw__row--empty";const s=document.createElement("td");s.className="vglw__td vglw__td--empty",s.colSpan=t.length;const n=document.createElement("slot");n.name="empty",n.textContent=this.emptyText,s.appendChild(n),i.appendChild(s),this.#r.appendChild(i);return}e.forEach((i,s)=>{const n=document.createElement("tr");n.className="vglw__row",n.dataset.index=String(s);for(const l of t){const o=document.createElement("td");o.className=`vglw__td is-${v(l)}`,o.dataset.label=l.label,o.textContent=y(i[l.key]),n.appendChild(o)}this.#r.appendChild(n)})}}customElements.define("vs-table-glow",E);
