const u=`
  /* The stacked layout below switches on the HOST's width, not the window's —
     this table is just as likely to sit in a 320px sidebar of a 1440px page as
     on a phone. */
  :host { display: block; width: 100%; container-type: inline-size; }
  .vmin {
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --py: 14px;
    --accent: var(--vmin-accent, var(--ui-accent, #ededed));
    --line: color-mix(in srgb, var(--border, #2a2a2a) 55%, transparent);
    --txt: var(--text, #ededed);
    --txt-2: var(--text-secondary, #a1a1a1);
    --txt-3: var(--text-muted, #666);

    display: flex;
    flex-direction: column;
    width: 100%;
    background: transparent;
    color: var(--txt);
    font-family: inherit;
    font-size: var(--fs);
  }
  .vmin__bar { padding: 0 0 calc(var(--py)) 0; }
  .vmin__bar.is-hidden { display: none; }
  .vmin__title { margin: 0; font-size: calc(var(--fs) + 3px); font-weight: 600; letter-spacing: -0.01em; }
  .vmin__scroll { width: 100%; overflow-x: auto; }
  .vmin__table { width: 100%; border-collapse: collapse; }

  .vmin__th {
    padding: calc(var(--py) - 4px) var(--px);
    background: transparent;
    color: var(--txt-3);
    font-size: calc(var(--fs) - 2px);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: left;
    white-space: nowrap;
    user-select: none;
    border-bottom: 1px solid var(--line);
  }
  .vmin__th.is-center { text-align: center; }
  .vmin__th.is-right { text-align: right; }
  .vmin__sort {
    display: inline-flex; align-items: center; gap: 6px;
    /* The label line is 15px tall — under the 24px thumb floor. The padding
       grows the hit box; the negative margin cancels it again in the header
       row's height, so nothing moves. */
    padding: 5px 0; margin: -5px 0;
    border: 0; background: none; color: inherit; font: inherit;
    letter-spacing: inherit; text-transform: inherit; cursor: pointer;
    transition: color 160ms ease;
  }
  .vmin__th.is-right .vmin__sort { flex-direction: row-reverse; }
  .vmin__th.is-center .vmin__sort { justify-content: center; }
  .vmin__sort:hover { color: var(--txt); }
  .vmin__sort:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
  .vmin__arrow { display: inline-flex; transition: opacity 160ms ease, transform 200ms ease; }
  .vmin__arrow svg { width: 13px; height: 13px; }
  .vmin__arrow.is-idle { opacity: 0; transform: scale(0.8); }
  .vmin__sort:hover .vmin__arrow.is-idle { opacity: 0.4; }
  .vmin__arrow.is-asc { opacity: 1; transform: rotate(180deg); color: var(--accent); }
  .vmin__arrow.is-desc { opacity: 1; transform: rotate(0deg); color: var(--accent); }

  /* borderless body — space does the work */
  .vmin__td {
    position: relative;
    padding: var(--py) var(--px);
    height: 52px;
    vertical-align: middle;
    text-align: left;
    color: var(--txt-2);
  }
  .vmin__td.is-center { text-align: center; }
  .vmin__td.is-right { text-align: right; font-variant-numeric: tabular-nums; }
  .vmin__td:first-child { color: var(--txt); font-weight: 500; }

  .vmin__row { transition: color 140ms ease; }
  /* thin accent underline that wipes L→R under the hovered row.
     Painted on each cell (rows aren't reliable positioning containers). */
  .vmin__td::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    bottom: 0;
    height: 1.5px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .vmin.is-hover .vmin__row:hover { color: var(--txt); }
  .vmin.is-hover .vmin__row:hover .vmin__td::after { transform: scaleX(1); }

  .vmin__td--empty { height: 120px; text-align: center; color: var(--txt-3); }

  @media (prefers-reduced-motion: reduce) {
    .vmin__row, .vmin__arrow, .vmin__sort, .vmin__td::after { transition: none; }
  }

  /* Under ~480px the four columns stop fitting: the last one (Usage) ends up
     parked inside .vmin__scroll with nothing on screen to say it is there, and
     every name breaks over two lines. So each row turns into a stack of
     label/value lines. No cards, no boxes — the variant's whole argument is
     that space and one hairline are enough. */
  @container (max-width: 480px) {
    .vmin__head { display: none; }             /* its labels moved into the cells */
    .vmin__scroll { overflow-x: visible; }     /* stacked content never overflows */
    .vmin__table, .vmin__body, .vmin__row, .vmin__td { display: block; }
    /* A column group with no table to size spawns an anonymous one around itself. */
    .vmin__table colgroup { display: none; }

    .vmin__row { position: relative; padding: 6px 0; }
    .vmin__row + .vmin__row { border-top: 1px solid var(--line); }

    .vmin__td {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      height: auto; min-height: 36px;
      padding: 4px var(--px);           /* same inset the cells keep at any width — values must not touch the edge */
      text-align: right;
      overflow-wrap: anywhere;                 /* an email or URL must not push the row wide */
    }
    .vmin__td::before {
      content: attr(data-label);
      flex: none;
      color: var(--txt-3);
      font-size: calc(var(--fs) - 2px);
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    /* the wipe underlines the hovered ROW; per cell it would fire four times at
       once and read as a grid, which is the one thing this variant refuses */
    .vmin__td::after { display: none; }
    .vmin__row::after {
      content: '';
      position: absolute;
      left: 0; right: 0;
      bottom: 0;
      height: 1.5px;
      background: var(--accent);
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
    }
    .vmin.is-hover .vmin__row:hover::after { transform: scaleX(1); }

    .vmin__row--empty { border-top: 0; }
    .vmin__td--empty { display: block; text-align: center; }
  }

  /* The wipe now lives on the row, and the opt-out above cannot reach it from
     earlier in the sheet. */
  @media (prefers-reduced-motion: reduce) {
    .vmin__row::after { transition: none; }
  }
`,v=[{key:"name",label:"Member",sortable:!0},{key:"role",label:"Role",sortable:!0},{key:"status",label:"Status",align:"center",sortable:!0},{key:"usage",label:"Usage",align:"right",sortable:!0,width:"120px"}],f=[{id:1,name:"Ada Lovelace",role:"Owner",status:"Active",usage:9820},{id:2,name:"Alan Turing",role:"Admin",status:"Active",usage:7415},{id:3,name:"Grace Hopper",role:"Developer",status:"Pending",usage:3120},{id:4,name:"Linus Torvalds",role:"Developer",status:"Away",usage:1890},{id:5,name:"Margaret Hamilton",role:"Viewer",status:"Banned",usage:0}],m="http://www.w3.org/2000/svg";function g(){const c=document.createElementNS(m,"svg");c.setAttribute("viewBox","0 0 24 24"),c.setAttribute("fill","none");const t=document.createElementNS(m,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),c.appendChild(t),c}let h;function b(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,t){const e=t?b(String(t).trim()):null;if(!e){for(const i of _)c.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),o=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,s=e.map(i=>Math.round(o?i*.92:i+(255-i)*.16)),l=(i,d)=>c.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(i,a);l("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(i,o?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])l(i,o?"0 0 0":"255 255 255");l("--vs-color",a),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["row-key","title","sortable","hoverable","empty-text","line-accent","color"];#t;#o;#l;#r;#c;#a;#s;#p=null;#u=null;#e=null;#n=null;#v=()=>this.#m();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=u,this.#t=document.createElement("div"),this.#t.className="vmin",this.#o=document.createElement("div"),this.#o.className="vmin__bar",this.#l=document.createElement("h3"),this.#l.className="vmin__title",this.#r=document.createElement("slot"),this.#r.name="toolbar",this.#o.append(this.#l,this.#r);const n=document.createElement("div");n.className="vmin__scroll";const r=document.createElement("table");r.className="vmin__table",this.#c=document.createElement("colgroup"),this.#a=document.createElement("thead"),this.#a.className="vmin__head",this.#s=document.createElement("tbody"),this.#s.className="vmin__body",r.append(this.#c,this.#a,this.#s),n.appendChild(r),this.#t.append(this.#o,n),t.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#r.addEventListener("slotchange",this.#v),this.#d(),this.#i(),this.#g(),this.#b(),this.#m()}disconnectedCallback(){this.#r.removeEventListener("slotchange",this.#v)}attributeChangedCallback(t){if(p(this,this.getAttribute("color")),!!this.#t){if(t==="title"){this.#l.textContent=this.#f(),this.#m();return}if(t==="hoverable"){this.#g();return}if(t==="sortable"){this.#d(),this.#i();return}if(t==="row-key"){this.#i();return}if(t==="empty-text"){this.#i();return}if(t==="line-accent"){this.#b();return}}}set columns(t){this.#p=Array.isArray(t)&&t.length?t:null,this.#t&&(this.#d(),this.#i())}get columns(){return this.#p??v}set rows(t){this.#u=Array.isArray(t)?t:null,this.#t&&this.#i()}get rows(){return this.#u??f}#h(t,e){return this.getAttribute(t)??e}#f(){return this.#h("title","")}#w(){return this.#h("row-key","id")}#x(){return this.#h("empty-text","No data to display")}#k(){const t=this.getAttribute("sortable");return t===null||t!=="false"}#E(){const t=this.getAttribute("hoverable");return t===null||t!=="false"}#C(){return this.#h("line-accent","")}#g(){this.#t.classList.toggle("is-hover",this.#E())}#b(){const t=this.#C();t?this.#t.style.setProperty("--vmin-accent",t):this.#t.style.removeProperty("--vmin-accent")}#m(){const t=this.#r.assignedNodes({flatten:!0}).length>0,e=!!this.#f();this.#o.classList.toggle("is-hidden",!e&&!t)}#_(t){return t.align??"left"}#A(t){return typeof t=="number"?t.toLocaleString():String(t??"")}#y(t){return this.#k()&&!!t.sortable}#T(t,e){const n=this.#w();return t&&t[n]!=null?t[n]:e}#d(){this.#c.textContent="",this.#a.textContent="";const t=this.columns;for(const n of t){const r=document.createElement("col");n.width&&(r.style.width=n.width),this.#c.appendChild(r)}const e=document.createElement("tr");for(const n of t){const r=document.createElement("th"),o=this.#_(n),a=this.#y(n);if(r.className=`vmin__th is-${o}${a?" is-sortable":""}${this.#e===n.key?" is-active":""}`,r.setAttribute("scope","col"),a){r.setAttribute("aria-sort",this.#e===n.key?this.#n==="asc"?"ascending":"descending":"none");const s=document.createElement("button");s.type="button",s.className="vmin__sort";const l=document.createElement("span");l.textContent=n.label;const i=document.createElement("span"),d=this.#e===n.key?`is-${this.#n}`:"is-idle";i.className=`vmin__arrow ${d}`,i.setAttribute("aria-hidden","true"),i.appendChild(g()),s.append(l,i),s.addEventListener("click",()=>this.#S(n)),r.appendChild(s)}else{const s=document.createElement("span");s.textContent=n.label,r.appendChild(s)}e.appendChild(r)}this.#a.appendChild(e)}#S(t){this.#y(t)&&(this.#e!==t.key?(this.#e=t.key,this.#n="asc"):this.#n==="asc"?this.#n="desc":(this.#e=null,this.#n=null),this.#d(),this.#i(),this.dispatchEvent(new CustomEvent("sort",{bubbles:!0,composed:!0,detail:{key:this.#e,dir:this.#n}})))}#N(){const t=this.rows.slice();if(!this.#e||!this.#n)return t;const e=this.#e,n=this.#n==="asc"?1:-1;return t.sort((r,o)=>{const a=r[e],s=o[e];return a==null?1:s==null?-1:typeof a=="number"&&typeof s=="number"?(a-s)*n:String(a).localeCompare(String(s))*n})}#i(){this.#s.textContent="";const t=this.columns,e=this.#N();if(e.length===0){const n=document.createElement("tr");n.className="vmin__row vmin__row--empty";const r=document.createElement("td");r.className="vmin__td vmin__td--empty",r.colSpan=t.length;const o=document.createElement("slot");o.name="empty",o.textContent=this.#x(),r.appendChild(o),n.appendChild(r),this.#s.appendChild(n);return}e.forEach((n,r)=>{const o=document.createElement("tr");o.className="vmin__row",o.addEventListener("click",()=>this.#L(n,r));for(const a of t){const s=document.createElement("td");s.className=`vmin__td is-${this.#_(a)}`,s.dataset.label=a.label;const l=document.createElement("slot");l.name=`cell-${a.key}`,l.textContent=this.#A(n[a.key]),s.appendChild(l),o.appendChild(s)}this.#s.appendChild(o)})}#L(t,e){this.dispatchEvent(new CustomEvent("row-click",{bubbles:!0,composed:!0,detail:{row:t,index:e}}))}}customElements.define("vs-table-minimal",y);
