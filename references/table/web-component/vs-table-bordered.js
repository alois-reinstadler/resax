const v=`
  /* The stacked layout below switches on the HOST's width, not the window's —
     this table is just as likely to sit in a 320px sidebar of a 1440px page as
     on a phone. */
  :host { display: block; container-type: inline-size; }
  .vbrd {
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --py: 12px;
    --r: var(--ctrl-r-md, 12px);
    --accent: var(--vbrd-accent, var(--ui-accent, #ededed));
    --line: var(--border, #2a2a2a);
    --surface: var(--bg-card, #111);
    --surface-2: var(--bg-elevated, #171717);
    --txt: var(--text, #ededed);
    --txt-2: var(--text-secondary, #a1a1a1);

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
  .vbrd__bar { padding: calc(var(--py) + 2px) var(--px); border-bottom: 1px solid var(--line); }
  .vbrd__title { margin: 0; font-size: calc(var(--fs) + 2px); font-weight: 600; }
  .vbrd__scroll { width: 100%; overflow-x: auto; }
  .vbrd__table { width: 100%; border-collapse: collapse; }

  .vbrd__th {
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
    border: 1px solid var(--line);
  }
  .vbrd__th.is-center { text-align: center; }
  .vbrd__th.is-right { text-align: right; }
  .vbrd__sort {
    display: inline-flex; align-items: center; gap: 6px;
    /* The label line is 15px tall — under the 24px thumb floor. The padding
       grows the hit box; the negative margin cancels it again in the header
       row's height, so nothing moves. */
    padding: 5px 0; margin: -5px 0;
    border: 0; background: none; color: inherit; font: inherit;
    letter-spacing: inherit; text-transform: inherit; cursor: pointer;
    transition: color 160ms ease;
  }
  .vbrd__th.is-right .vbrd__sort { flex-direction: row-reverse; }
  .vbrd__th.is-center .vbrd__sort { justify-content: center; }
  .vbrd__sort:hover { color: var(--txt); }
  .vbrd__sort:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
  .vbrd__arrow { display: inline-flex; transition: opacity 160ms ease, transform 200ms ease; }
  .vbrd__arrow svg { width: 13px; height: 13px; }
  .vbrd__arrow.is-idle { opacity: 0; transform: scale(0.8); }
  .vbrd__sort:hover .vbrd__arrow.is-idle { opacity: 0.4; }
  .vbrd__arrow.is-asc { opacity: 1; transform: rotate(180deg); color: var(--accent); }
  .vbrd__arrow.is-desc { opacity: 1; transform: rotate(0deg); color: var(--accent); }

  /* full grid rules — the spreadsheet look */
  .vbrd__td {
    padding: var(--py) var(--px);
    height: 48px;
    vertical-align: middle;
    text-align: left;
    border: 1px solid var(--line);
    transition: border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
  }
  .vbrd__td.is-center { text-align: center; }
  .vbrd__td.is-right { text-align: right; font-variant-numeric: tabular-nums; }

  /* hovered row: cell rules ignite in accent + inset glow */
  .vbrd.is-hover .vbrd__row:hover .vbrd__td {
    border-color: color-mix(in srgb, var(--accent) 70%, var(--line));
    background: color-mix(in srgb, var(--accent) 7%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent);
  }

  .vbrd__td--empty { height: 120px; text-align: center; color: var(--txt-2); }

  @media (prefers-reduced-motion: reduce) {
    .vbrd__td, .vbrd__arrow, .vbrd__sort { transition: none; }
  }

  /* Under ~480px the four columns stop fitting: the last one (Usage) ends up
     parked inside .vbrd__scroll with nothing on screen to say it is there, and
     every name breaks over two lines. So the grid turns 90 degrees — one card
     per row, one line per field, the header's labels reprinted next to their
     values. The rules stay on every edge, which is the whole point of this
     variant. */
  @container (max-width: 480px) {
    .vbrd__head { display: none; }             /* its labels moved into the cells */
    .vbrd__scroll { overflow-x: visible; }     /* stacked content never overflows */
    .vbrd__table, .vbrd__body, .vbrd__row, .vbrd__td { display: block; }
    /* A column group with no table to size spawns an anonymous one around itself. */
    .vbrd__table colgroup { display: none; }

    .vbrd__body { padding: 10px; }
    .vbrd__row {
      border: 1px solid var(--line);
      border-radius: calc(var(--r) - 4px);
      background: var(--surface-2);
      transition: border-color 160ms ease, box-shadow 160ms ease;
    }
    .vbrd__row + .vbrd__row { margin-top: 10px; }

    .vbrd__td {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      height: auto; min-height: 40px;
      padding: 8px var(--px);
      border: 0;
      text-align: right;
      overflow-wrap: anywhere;                 /* an email or URL must not push the card wide */
    }
    .vbrd__td + .vbrd__td { border-top: 1px solid var(--line); }
    .vbrd__td::before {
      content: attr(data-label);
      flex: none;
      color: var(--txt-2);
      font-size: calc(var(--fs) - 2px);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* hover moves up to the card: a ring per cell would draw five of them */
    .vbrd.is-hover .vbrd__row:hover {
      border-color: color-mix(in srgb, var(--accent) 70%, var(--line));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent);
    }
    .vbrd.is-hover .vbrd__row:hover .vbrd__td { box-shadow: none; }

    .vbrd__row--empty { border: 0; background: none; }
    .vbrd__td--empty { display: block; text-align: center; }
  }
`,m=[{key:"name",label:"Member",sortable:!0},{key:"role",label:"Role",sortable:!0},{key:"status",label:"Status",align:"center",sortable:!0},{key:"usage",label:"Usage",align:"right",sortable:!0,width:"120px"}],g=[{id:1,name:"Ada Lovelace",role:"Owner",status:"Active",usage:9820},{id:2,name:"Alan Turing",role:"Admin",status:"Active",usage:7415},{id:3,name:"Grace Hopper",role:"Developer",status:"Pending",usage:3120},{id:4,name:"Linus Torvalds",role:"Developer",status:"Away",usage:1890},{id:5,name:"Margaret Hamilton",role:"Viewer",status:"Banned",usage:0}],h="http://www.w3.org/2000/svg";function f(){const a=document.createElementNS(h,"svg");a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none");const t=document.createElementNS(h,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),a.appendChild(t),a}const _=a=>typeof a=="number"?a.toLocaleString():String(a??""),p=a=>a.align??"left";let c;function x(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const t=c.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(a,t){const e=t?x(String(t).trim()):null;if(!e){for(const s of y)a.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),i=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,l=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(i?s*.92:s+(255-s)*.16)),d=(s,b)=>a.style.setProperty(s,b);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(s,l);d("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(s,i?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])d(s,i?"0 0 0":"255 255 255");d("--vs-color",l),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["row-key","title","sortable","hoverable","empty-text","grid-accent","color"];#e;#n;#i;#a;#l;#s;#d=new Map;#h=null;#p=null;#r=null;#t=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=v,this.#e=document.createElement("div"),this.#e.className="vbrd",this.#n=document.createElement("div"),this.#n.className="vbrd__bar",this.#i=document.createElement("h3"),this.#i.className="vbrd__title",this.#n.appendChild(this.#i);const r=document.createElement("div");r.className="vbrd__scroll";const n=document.createElement("table");n.className="vbrd__table",this.#a=document.createElement("colgroup");const i=document.createElement("thead");i.className="vbrd__head",this.#l=document.createElement("tr"),i.appendChild(this.#l),this.#s=document.createElement("tbody"),this.#s.className="vbrd__body",n.append(this.#a,i,this.#s),r.appendChild(n),this.#e.append(this.#n,r),t.append(e,this.#e)}connectedCallback(){u(this,this.getAttribute("color")),this.#b(),this.#o(),this.#u()}disconnectedCallback(){}attributeChangedCallback(t){u(this,this.getAttribute("color")),this.#e&&(t==="sortable"&&(this.#b(),this.#o()),t==="empty-text"&&!this.rows.length&&this.#o(),this.#u())}set columns(t){this.#h=Array.isArray(t)&&t.length?t:null,this.#b(),this.#o()}get columns(){return this.#h??m}set rows(t){this.#p=Array.isArray(t)?t:null,this.#o()}get rows(){return this.#p??g}#c(t,e){return this.hasAttribute(t)?this.getAttribute(t)!=="false":e}#u(){this.#i.textContent=this.getAttribute("title")??"",this.#n.style.display=this.getAttribute("title")?"":"none";const t=this.getAttribute("grid-accent");t?this.#e.style.setProperty("--vbrd-accent",t):this.#e.style.removeProperty("--vbrd-accent"),this.#e.classList.toggle("is-hover",this.#c("hoverable",!0))}#b(){const t=this.columns,e=this.#c("sortable",!0);this.#a.textContent="",this.#l.textContent="",this.#d=new Map;for(const r of t){const n=document.createElement("col");r.width&&(n.style.width=r.width),this.#a.appendChild(n);const i=p(r),l=e&&!!r.sortable,o=document.createElement("th");o.className=`vbrd__th is-${i}`+(l?" is-sortable":""),o.setAttribute("scope","col"),l&&o.setAttribute("aria-sort","none");let d=null;if(l){const s=document.createElement("button");s.type="button",s.className="vbrd__sort";const b=document.createElement("span");b.textContent=r.label,d=document.createElement("span"),d.className="vbrd__arrow is-idle",d.setAttribute("aria-hidden","true"),d.appendChild(f()),s.append(b,d),s.addEventListener("click",()=>this.#m(r)),o.appendChild(s)}else{const s=document.createElement("span");s.textContent=r.label,o.appendChild(s)}this.#d.set(r.key,{th:o,arrow:d,col:r}),this.#l.appendChild(o)}this.#v()}#v(){for(const{th:t,arrow:e,col:r}of this.#d.values()){const n=this.#r===r.key;t.classList.toggle("is-active",n),t.classList.contains("is-sortable")&&t.setAttribute("aria-sort",n?this.#t==="asc"?"ascending":"descending":"none"),e&&(e.className="vbrd__arrow "+(n?`is-${this.#t}`:"is-idle"))}}#m(t){!this.#c("sortable",!0)||!t.sortable||(this.#r!==t.key?(this.#r=t.key,this.#t="asc"):this.#t==="asc"?this.#t="desc":(this.#r=null,this.#t=null),this.#v(),this.#o(),this.dispatchEvent(new CustomEvent("sort",{bubbles:!0,composed:!0,detail:{key:this.#r,dir:this.#t}})))}#g(){const t=this.rows.slice();if(!this.#r||!this.#t)return t;const e=this.#r,r=this.#t==="asc"?1:-1;return t.sort((n,i)=>{const l=n[e],o=i[e];return l==null?1:o==null?-1:typeof l=="number"&&typeof o=="number"?(l-o)*r:String(l).localeCompare(String(o))*r})}#o(){const t=this.columns,e=this.#g();if(this.#s.textContent="",!e.length){const r=document.createElement("tr");r.className="vbrd__row vbrd__row--empty";const n=document.createElement("td");n.className="vbrd__td vbrd__td--empty",n.colSpan=t.length,n.textContent=this.getAttribute("empty-text")??"No data to display",r.appendChild(n),this.#s.appendChild(r);return}e.forEach((r,n)=>{const i=document.createElement("tr");i.className="vbrd__row",i.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("row-click",{bubbles:!0,composed:!0,detail:{row:r,index:n}}))});for(const l of t){const o=document.createElement("td");o.className=`vbrd__td is-${p(l)}`,o.dataset.label=l.label,o.textContent=_(r[l.key]),i.appendChild(o)}this.#s.appendChild(i)})}}customElements.define("vs-table-bordered",w);
