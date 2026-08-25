const v=[{key:"name",label:"Member",sortable:!0},{key:"role",label:"Role",sortable:!0},{key:"status",label:"Status",align:"center",sortable:!0},{key:"usage",label:"Usage",align:"right",sortable:!0,width:"120px"}],m=[{id:1,name:"Ada Lovelace",role:"Owner",status:"Active",usage:9820},{id:2,name:"Alan Turing",role:"Admin",status:"Active",usage:7415},{id:3,name:"Grace Hopper",role:"Developer",status:"Pending",usage:3120},{id:4,name:"Linus Torvalds",role:"Developer",status:"Away",usage:1890},{id:5,name:"Margaret Hamilton",role:"Viewer",status:"Banned",usage:0}],h="http://www.w3.org/2000/svg";function b(){const c=document.createElementNS(h,"svg");c.setAttribute("viewBox","0 0 24 24"),c.setAttribute("fill","none");const t=document.createElementNS(h,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),c.appendChild(t),c}const f=`
  /* The stacked layout below switches on the HOST's width, not the window's —
     this table is just as likely to sit in a 320px sidebar of a 1440px page as
     on a phone. */
  :host { display: block; container-type: inline-size; }
  .vstr {
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --py: 12px;
    --r: var(--ctrl-r-md, 12px);
    --accent: var(--vstr-accent, var(--ui-accent, #ededed));
    --line: var(--border, #2a2a2a);
    --surface: var(--bg-card, #111);
    --surface-2: var(--bg-elevated, #171717);
    --txt: var(--text, #ededed);
    --txt-2: var(--text-secondary, #a1a1a1);
    --stripe: color-mix(in srgb, var(--txt) 5%, transparent);

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
  .vstr__bar { padding: calc(var(--py) + 2px) var(--px); border-bottom: 1px solid var(--line); }
  .vstr__title { margin: 0; font-size: calc(var(--fs) + 2px); font-weight: 600; }
  .vstr__scroll { width: 100%; overflow-x: auto; }
  .vstr__table { width: 100%; border-collapse: collapse; }

  .vstr__th {
    padding: var(--py) var(--px);
    background: var(--surface-2);
    color: var(--txt-2);
    font-size: calc(var(--fs) - 2px);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: left;
    white-space: nowrap;
    user-select: none;
    border-bottom: 2px solid var(--accent);
  }
  .vstr__th.is-center { text-align: center; }
  .vstr__th.is-right { text-align: right; }
  .vstr__sort {
    display: inline-flex; align-items: center; gap: 6px;
    /* The label line is 15px tall — under the 24px thumb floor. The padding
       grows the hit box; the negative margin cancels it again in the header
       row's height, so nothing moves. */
    padding: 5px 0; margin: -5px 0;
    border: 0; background: none; color: inherit; font: inherit;
    letter-spacing: inherit; text-transform: inherit; cursor: pointer;
    transition: color 160ms ease;
  }
  .vstr__th.is-right .vstr__sort { flex-direction: row-reverse; }
  .vstr__th.is-center .vstr__sort { justify-content: center; }
  .vstr__sort:hover { color: var(--txt); }
  .vstr__sort:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
  .vstr__arrow { display: inline-flex; transition: opacity 160ms ease, transform 200ms ease; }
  .vstr__arrow svg { width: 13px; height: 13px; }
  .vstr__arrow.is-idle { opacity: 0; transform: scale(0.8); }
  .vstr__sort:hover .vstr__arrow.is-idle { opacity: 0.4; }
  .vstr__arrow.is-asc { opacity: 1; transform: rotate(180deg); color: var(--accent); }
  .vstr__arrow.is-desc { opacity: 1; transform: rotate(0deg); color: var(--accent); }

  .vstr__td {
    position: relative;
    padding: var(--py) var(--px);
    height: 48px;
    vertical-align: middle;
    text-align: left;
  }
  .vstr__td.is-center { text-align: center; }
  .vstr__td.is-right { text-align: right; font-variant-numeric: tabular-nums; }

  /* zebra */
  .vstr__body tr:nth-child(odd) { background: var(--stripe); }
  .vstr__row { transition: background-color 140ms ease; }

  /* the sliding leading stripe on hover */
  .vstr__td:first-child::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: center;
    transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .vstr.is-hover .vstr__row:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
  .vstr.is-hover .vstr__row:hover .vstr__td:first-child::before { transform: scaleY(1); }

  .vstr__td--empty { height: 120px; text-align: center; color: var(--txt-2); }

  @media (prefers-reduced-motion: reduce) {
    .vstr__row, .vstr__arrow, .vstr__sort, .vstr__td:first-child::before { transition: none; }
  }

  /* Under ~480px the four columns stop fitting: the last one (Usage) ends up
     parked inside .vstr__scroll with nothing on screen to say it is there, and
     every name breaks over two lines. So each row turns into a stack of
     label/value lines — the zebra keeps banding one row from the next, which
     is exactly the separator a stacked table needs anyway. */
  @container (max-width: 480px) {
    .vstr__head { display: none; }             /* its labels moved into the cells */
    .vstr__scroll { overflow-x: visible; }     /* stacked content never overflows */
    .vstr__table, .vstr__body, .vstr__row, .vstr__td { display: block; }
    /* A column group with no table to size spawns an anonymous one around itself. */
    .vstr__table colgroup { display: none; }

    .vstr__row { position: relative; padding: 4px 0; }

    .vstr__td {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      height: auto; min-height: 38px;
      padding: 6px var(--px);
      text-align: right;
      overflow-wrap: anywhere;                 /* an email or URL must not push the row wide */
    }
    .vstr__td + .vstr__td { border-top: 1px solid color-mix(in srgb, var(--line) 50%, transparent); }

    /* The leading stripe below vacates ::before, so labels can use it — but the
       first cell's rule still outranks a plain .vstr__td::before, hence the
       second selector. */
    .vstr__td::before,
    .vstr__td:first-child::before {
      content: attr(data-label);
      position: static;
      width: auto;
      background: none;
      transform: none;
      flex: none;
      color: var(--txt-2);
      font-size: calc(var(--fs) - 2px);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* the stripe runs down the whole stack now — on the first cell alone it
       would only mark the top field of the row */
    .vstr__row::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: var(--accent);
      transform: scaleY(0);
      transform-origin: center;
      transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .vstr.is-hover .vstr__row:hover::before { transform: scaleY(1); }

    .vstr__td--empty { display: block; text-align: center; }
    .vstr__td--empty::before { content: none; }
  }

  /* The stripe now lives on the row, and the opt-out above cannot reach it from
     earlier in the sheet. */
  @media (prefers-reduced-motion: reduce) {
    .vstr__row::before { transition: none; }
  }
`;let d;function g(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,t){const e=t?g(String(t).trim()):null;if(!e){for(const i of _)c.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),l=(i,u)=>c.style.setProperty(i,u);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(i,a);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])l(i,n?"0 0 0":"255 255 255");l("--vs-color",a),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["row-key","title","sortable","hoverable","empty-text","stripe-accent","color"];#u=null;#v=null;#r=null;#e=null;#c=[];#t;#o;#i;#s;#l;#a;#n;#d;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("div"),this.#t.className="vstr",this.#o=document.createElement("div"),this.#o.className="vstr__bar",this.#i=document.createElement("h3"),this.#i.className="vstr__title",this.#s=document.createElement("slot"),this.#s.name="toolbar",this.#o.append(this.#i,this.#s);const r=document.createElement("div");r.className="vstr__scroll";const s=document.createElement("table");s.className="vstr__table",this.#l=document.createElement("colgroup"),this.#a=document.createElement("thead"),this.#a.className="vstr__head",this.#n=document.createElement("tbody"),this.#n.className="vstr__body",s.append(this.#l,this.#a,this.#n),r.appendChild(s),this.#t.append(this.#o,r),t.append(e,this.#t),this.#d=()=>this.#f(),this.#s.addEventListener("slotchange",this.#d)}connectedCallback(){p(this,this.getAttribute("color")),this.#b()}disconnectedCallback(){this.#s.removeEventListener("slotchange",this.#d)}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#t&&this.#b()}set columns(t){this.#u=Array.isArray(t)&&t.length?t:null,this.#t&&this.#g()}get columns(){return this.#u??v}set rows(t){this.#v=Array.isArray(t)?t:null,this.#t&&this.#p()}get rows(){return this.#v??m}#L(t,e){return this.hasAttribute(t)?this.getAttribute(t)!=="false":e}#y(){return this.getAttribute("row-key")||"id"}#w(){return this.hasAttribute("sortable")}#x(){return this.hasAttribute("hoverable")}#k(){return this.getAttribute("empty-text")??"No data to display"}#A(t,e){const r=this.#y();return t?.[r]??e}#h(t){return this.#w()&&!!t.sortable}#m(t){return t.align??"left"}#E(t){return typeof t=="number"?t.toLocaleString():String(t??"")}#C(t){this.#h(t)&&(this.#r!==t.key?(this.#r=t.key,this.#e="asc"):this.#e==="asc"?this.#e="desc":(this.#r=null,this.#e=null),this.dispatchEvent(new CustomEvent("sort",{bubbles:!0,composed:!0,detail:{key:this.#r,dir:this.#e}})),this.#_(),this.#p())}#S(){const t=this.rows.slice();if(!this.#r||!this.#e)return t;const e=this.#r,r=this.#e==="asc"?1:-1;return t.sort((s,n)=>{const a=s[e],o=n[e];return a==null?1:o==null?-1:typeof a=="number"&&typeof o=="number"?(a-o)*r:String(a).localeCompare(String(o))*r})}#b(){this.#f(),this.#t.classList.toggle("is-hover",this.#x());const t=this.getAttribute("stripe-accent");t?this.#t.style.setProperty("--vstr-accent",t):this.#t.style.removeProperty("--vstr-accent"),this.#g()}#f(){const t=this.getAttribute("title")||"";this.#i.textContent=t,this.#i.style.display=t?"":"none";const e=this.#s.assignedNodes({flatten:!0}).length>0;this.#o.style.display=t||e?"":"none"}#g(){this.#N(),this.#p()}#N(){const t=this.columns;this.#l.textContent="",t.forEach(r=>{const s=document.createElement("col");r.width&&(s.style.width=r.width),this.#l.appendChild(s)}),this.#a.textContent="",this.#c=[];const e=document.createElement("tr");t.forEach(r=>{const s=document.createElement("th");s.className=`vstr__th is-${this.#m(r)}`,s.scope="col";const n=this.#h(r);let a=null;if(n){const o=document.createElement("button");o.type="button",o.className="vstr__sort";const l=document.createElement("span");l.textContent=r.label,a=document.createElement("span"),a.className="vstr__arrow is-idle",a.setAttribute("aria-hidden","true"),a.appendChild(b()),o.append(l,a),o.addEventListener("click",()=>this.#C(r)),s.appendChild(o)}else{const o=document.createElement("span");o.textContent=r.label,s.appendChild(o)}this.#c.push({th:s,arrow:a,col:r}),e.appendChild(s)}),this.#a.appendChild(e),this.#_()}#_(){for(const{th:t,arrow:e,col:r}of this.#c){const s=this.#h(r),n=s&&this.#r===r.key;t.classList.toggle("is-sortable",s),t.classList.toggle("is-active",n),s?t.setAttribute("aria-sort",n?this.#e==="asc"?"ascending":"descending":"none"):t.removeAttribute("aria-sort"),e&&(e.className=`vstr__arrow ${n?`is-${this.#e}`:"is-idle"}`)}}#p(){const t=this.columns,e=this.#S();if(this.#n.textContent="",!e.length){const r=document.createElement("tr");r.className="vstr__row vstr__row--empty";const s=document.createElement("td");s.className="vstr__td vstr__td--empty",s.colSpan=t.length||1;const n=document.createElement("slot");n.name="empty",n.textContent=this.#k(),s.appendChild(n),r.appendChild(s),this.#n.appendChild(r);return}e.forEach((r,s)=>{const n=document.createElement("tr");n.className="vstr__row",n.dataset.rowKey=String(this.#A(r,s)),n.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("row-click",{bubbles:!0,composed:!0,detail:{row:r,index:s}}))}),t.forEach(a=>{const o=document.createElement("td");o.className=`vstr__td is-${this.#m(a)}`,o.dataset.label=a.label,o.textContent=this.#E(r[a.key]),n.appendChild(o)}),this.#n.appendChild(n)})}}customElements.define("vs-table-striped",y);
