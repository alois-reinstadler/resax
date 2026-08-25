const h="http://www.w3.org/2000/svg",v=[{key:"name",label:"Member",sortable:!0},{key:"role",label:"Role",sortable:!0},{key:"status",label:"Status",align:"center",sortable:!0},{key:"usage",label:"Usage",align:"right",sortable:!0,width:"120px"}],b=[{id:1,name:"Ada Lovelace",role:"Owner",status:"Active",usage:9820},{id:2,name:"Alan Turing",role:"Admin",status:"Active",usage:7415},{id:3,name:"Grace Hopper",role:"Developer",status:"Pending",usage:3120},{id:4,name:"Linus Torvalds",role:"Developer",status:"Away",usage:1890},{id:5,name:"Margaret Hamilton",role:"Viewer",status:"Banned",usage:0}],m=l=>typeof l=="number"?l.toLocaleString():String(l??"");function g(){const l=document.createElementNS(h,"svg");l.setAttribute("viewBox","0 0 24 24"),l.setAttribute("fill","none");const t=document.createElementNS(h,"path");return t.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-miterlimit","10"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),l.appendChild(t),l}const f=`
  /* The stacked layout below switches on the HOST's width, not the window's —
     this table is just as likely to sit in a 320px sidebar of a 1440px page as
     on a phone. */
  :host { display: block; width: 100%; container-type: inline-size; }
  .vcrd {
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --py: 12px;
    --r: var(--ctrl-r-md, 12px);
    --accent: var(--vcrd-accent, var(--ui-accent, #ededed));
    --line: var(--border, #2a2a2a);
    --surface: var(--bg-card, #111);
    --surface-2: var(--bg-elevated, #171717);
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
  .vcrd__bar { padding: 0 4px calc(var(--py)) 4px; }
  .vcrd__title { margin: 0; font-size: calc(var(--fs) + 2px); font-weight: 600; }
  .vcrd__scroll { width: 100%; overflow-x: auto; }

  /* separated rows: the key trick for the card look */
  .vcrd__table { width: 100%; border-collapse: separate; border-spacing: 0 8px; }

  .vcrd__th {
    padding: 4px var(--px);
    background: transparent;
    color: var(--txt-3);
    font-size: calc(var(--fs) - 2px);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-align: left;
    white-space: nowrap;
    user-select: none;
  }
  .vcrd__th.is-center { text-align: center; }
  .vcrd__th.is-right { text-align: right; }
  .vcrd__sort {
    display: inline-flex; align-items: center; gap: 6px;
    /* The label line is 15px tall — under the 24px thumb floor. The padding
       grows the hit box; the negative margin cancels it again in the header
       row's height, so nothing moves. */
    padding: 5px 0; margin: -5px 0;
    border: 0; background: none; color: inherit; font: inherit;
    letter-spacing: inherit; text-transform: inherit; cursor: pointer;
    transition: color 160ms ease;
  }
  .vcrd__th.is-right .vcrd__sort { flex-direction: row-reverse; }
  .vcrd__th.is-center .vcrd__sort { justify-content: center; }
  .vcrd__sort:hover { color: var(--txt); }
  .vcrd__sort:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
  .vcrd__arrow { display: inline-flex; transition: opacity 160ms ease, transform 200ms ease; }
  .vcrd__arrow svg { width: 13px; height: 13px; }
  .vcrd__arrow.is-idle { opacity: 0; transform: scale(0.8); }
  .vcrd__sort:hover .vcrd__arrow.is-idle { opacity: 0.4; }
  .vcrd__arrow.is-asc { opacity: 1; transform: rotate(180deg); color: var(--accent); }
  .vcrd__arrow.is-desc { opacity: 1; transform: rotate(0deg); color: var(--accent); }

  /* card cells: shared top/bottom border, rounded on the row ends */
  .vcrd__td {
    padding: var(--py) var(--px);
    height: 52px;
    vertical-align: middle;
    text-align: left;
    background: var(--surface-2);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 220ms ease, border-color 160ms ease;
  }
  .vcrd__td.is-center { text-align: center; }
  .vcrd__td.is-right { text-align: right; font-variant-numeric: tabular-nums; }
  .vcrd__td:first-child {
    border-left: 1px solid var(--line);
    border-top-left-radius: var(--r);
    border-bottom-left-radius: var(--r);
    font-weight: 500;
    color: var(--txt);
  }
  .vcrd__td:last-child {
    border-right: 1px solid var(--line);
    border-top-right-radius: var(--r);
    border-bottom-right-radius: var(--r);
  }
  .vcrd__td:not(:first-child):not(:last-child) { color: var(--txt-2); }

  /* lift the whole card row on hover */
  .vcrd.is-hover .vcrd__row:hover .vcrd__td {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent) 60%, var(--line));
    box-shadow: 0 10px 24px -14px rgba(0, 0, 0, 0.7);
  }

  .vcrd__td--empty {
    height: 120px; text-align: center; color: var(--txt-3);
    border-radius: var(--r); border: 1px solid var(--line);
  }

  @media (prefers-reduced-motion: reduce) {
    .vcrd__td, .vcrd__arrow, .vcrd__sort { transition: none; }
    .vcrd.is-hover .vcrd__row:hover .vcrd__td { transform: none; }
  }

  /* Under ~480px the four columns stop fitting: the last one (Usage) ends up
     parked inside .vcrd__scroll with nothing on screen to say it is there, and
     every name breaks over two lines. The variant is already a stack of cards
     sideways, so it just turns 90 degrees — the row keeps being the card, and
     each field becomes a label/value line inside it. */
  @container (max-width: 480px) {
    .vcrd__head { display: none; }             /* its labels moved into the cells */
    .vcrd__scroll { overflow-x: visible; }     /* stacked content never overflows */
    .vcrd__table, .vcrd__body, .vcrd__row, .vcrd__td { display: block; }
    /* A column group with no table to size spawns an anonymous one around itself. */
    .vcrd__table colgroup { display: none; }
    .vcrd__table { border-spacing: 0; }        /* the card gap is a margin now */

    /* the frame, radius and lift move off the end-cells and onto the row */
    .vcrd__row {
      background: var(--surface-2);
      border: 1px solid var(--line);
      border-radius: var(--r);
      transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 220ms ease, border-color 160ms ease;
    }
    .vcrd__row + .vcrd__row { margin-top: 8px; }

    .vcrd__td {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      height: auto; min-height: 42px;
      padding: 8px var(--px);
      background: none;
      border: 0; border-radius: 0;
      text-align: right;
      overflow-wrap: anywhere;                 /* an email or URL must not push the card wide */
    }
    .vcrd__td + .vcrd__td { border-top: 1px solid color-mix(in srgb, var(--line) 70%, transparent); }
    .vcrd__td::before {
      content: attr(data-label);
      flex: none;
      color: var(--txt-3);
      font-size: calc(var(--fs) - 2px);
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .vcrd.is-hover .vcrd__row:hover {
      transform: translateY(-2px);
      border-color: color-mix(in srgb, var(--accent) 60%, var(--line));
      box-shadow: 0 10px 24px -14px rgba(0, 0, 0, 0.7);
    }
    .vcrd.is-hover .vcrd__row:hover .vcrd__td { transform: none; box-shadow: none; }

    .vcrd__row--empty { background: none; border: 0; }
    .vcrd__td--empty { display: block; text-align: center; border: 1px solid var(--line); }
  }

  /* The lift now lives on the row, and the opt-out above cannot reach it from
     earlier in the sheet — same specificity, older source position. */
  @media (prefers-reduced-motion: reduce) {
    .vcrd.is-hover .vcrd__row:hover { transition: none; transform: none; }
  }
`;let d;function _(l){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=l;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(l,t){const e=t?_(String(t).trim()):null;if(!e){for(const r of x)l.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,i=e.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),c=(r,u)=>l.style.setProperty(r,u);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(r,s);c("--btn-primary-bg-hover",`rgb(${i[0]} ${i[1]} ${i[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])c(r,o?"0 0 0":"255 255 255");c("--vs-color",s),c("--vs-color-rgb",e.join(" ")),c("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["row-key","title","sortable","hoverable","empty-text","card-accent","color"];#t;#i;#n;#s;#v;#c;#l;#o;#d=null;#b=null;#_=null;#a=[];#h=[];#r=null;#e=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("div"),this.#t.className="vcrd",this.#i=document.createElement("div"),this.#i.className="vcrd__bar",this.#n=document.createElement("h3"),this.#n.className="vcrd__title",this.#s=document.createElement("slot"),this.#s.name="toolbar",this.#v=()=>this.#A(),this.#s.addEventListener("slotchange",this.#v),this.#i.append(this.#n,this.#s);const n=document.createElement("div");n.className="vcrd__scroll";const a=document.createElement("table");a.className="vcrd__table",this.#c=document.createElement("colgroup");const o=document.createElement("thead");o.className="vcrd__head",this.#l=document.createElement("tr"),o.appendChild(this.#l),this.#o=document.createElement("tbody"),this.#o.className="vcrd__body",a.append(this.#c,o,this.#o),n.appendChild(a),this.#t.append(this.#i,n),t.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#g(),this.#u(),this.#C()}disconnectedCallback(){this.#s.removeEventListener("slotchange",this.#v),this.#w(),this.#k()}attributeChangedCallback(t){p(this,this.getAttribute("color")),this.#t&&(t==="sortable"&&this.#g(),this.#C())}get columns(){return this.#b?.length?this.#b:v}set columns(t){this.#b=Array.isArray(t)?t:null,this.#t&&(this.#g(),this.#u())}get rows(){return this.#_??b}set rows(t){this.#_=Array.isArray(t)?t:null,this.#t&&this.#u()}get rowKey(){return this.getAttribute("row-key")??"id"}set rowKey(t){this.#p("row-key",t)}get title(){return this.getAttribute("title")??""}set title(t){this.#p("title",t)}get emptyText(){return this.getAttribute("empty-text")??"No data to display"}set emptyText(t){this.#p("empty-text",t)}get cardAccent(){return this.getAttribute("card-accent")??""}set cardAccent(t){this.#p("card-accent",t)}get sortable(){return this.#m("sortable",!0)}set sortable(t){this.#x("sortable",t)}get hoverable(){return this.#m("hoverable",!0)}set hoverable(t){this.#x("hoverable",t)}#p(t,e){e==null?this.removeAttribute(t):this.setAttribute(t,String(e))}#x(t,e){e?this.removeAttribute(t):this.setAttribute(t,"false")}#m(t,e){if(!this.hasAttribute(t))return e;const n=this.getAttribute(t);return n!=="false"&&n!=="0"}#y(t){return this.#m("sortable",!0)&&!!t.sortable}#g(){this.#w(),this.#c.textContent="",this.#l.textContent="",this.#a=[];for(const t of this.columns){const e=document.createElement("col");t.width&&(e.style.width=t.width),this.#c.appendChild(e);const n=t.align??"left",a=this.#y(t),o=document.createElement("th");o.className=`vcrd__th is-${n}`+(a?" is-sortable":""),o.setAttribute("scope","col");let s=null,i=null,c=null;if(a){s=document.createElement("button"),s.type="button",s.className="vcrd__sort";const r=document.createElement("span");r.textContent=t.label,i=document.createElement("span"),i.className="vcrd__arrow is-idle",i.setAttribute("aria-hidden","true"),i.appendChild(g()),s.append(r,i),c=()=>this.#S(t),s.addEventListener("click",c),o.appendChild(s)}else{const r=document.createElement("span");r.textContent=t.label,o.appendChild(r)}this.#l.appendChild(o),this.#a.push({th:o,col:t,btn:s,arrowSpan:i,onClick:c})}this.#f()}#w(){for(const t of this.#a)t.btn&&t.onClick&&t.btn.removeEventListener("click",t.onClick);this.#a=[]}#f(){for(const t of this.#a){const e=this.#r===t.col.key;t.th.classList.toggle("is-active",e),t.btn?t.th.setAttribute("aria-sort",e?this.#e==="asc"?"ascending":"descending":"none"):t.th.removeAttribute("aria-sort"),t.arrowSpan&&(t.arrowSpan.className="vcrd__arrow "+(e?`is-${this.#e}`:"is-idle"))}}#u(){this.#k(),this.#o.textContent="",this.#h=[],this.#d=null;const t=this.columns,e=this.#E();if(!e.length){const a=document.createElement("tr");a.className="vcrd__row vcrd__row--empty";const o=document.createElement("td");o.className="vcrd__td vcrd__td--empty",o.colSpan=t.length||1;const s=document.createElement("slot");s.name="empty",s.textContent=this.emptyText,o.appendChild(s),a.appendChild(o),this.#o.appendChild(a),this.#d=s;return}const n=this.rowKey;e.forEach((a,o)=>{const s=document.createElement("tr");s.className="vcrd__row",s.dataset.key=String(a?.[n]??o);for(const c of t){const r=document.createElement("td");r.className=`vcrd__td is-${c.align??"left"}`,r.dataset.label=c.label,r.textContent=m(a[c.key]),s.appendChild(r)}const i=()=>this.#N(a,o);s.addEventListener("click",i),this.#o.appendChild(s),this.#h.push({tr:s,onClick:i})})}#k(){for(const t of this.#h)t.tr.removeEventListener("click",t.onClick);this.#h=[]}#E(){const t=this.rows.slice();if(!this.#r||!this.#e)return t;const e=this.#r,n=this.#e==="asc"?1:-1;return t.sort((a,o)=>{const s=a[e],i=o[e];return s==null?1:i==null?-1:typeof s=="number"&&typeof i=="number"?(s-i)*n:String(s).localeCompare(String(i))*n})}#S(t){this.#y(t)&&(this.#r!==t.key?(this.#r=t.key,this.#e="asc"):this.#e==="asc"?this.#e="desc":(this.#r=null,this.#e=null),this.dispatchEvent(new CustomEvent("sort",{bubbles:!0,composed:!0,detail:{key:this.#r,dir:this.#e}})),this.#f(),this.#u())}#N(t,e){this.dispatchEvent(new CustomEvent("row-click",{bubbles:!0,composed:!0,detail:{row:t,index:e}}))}#A(){const t=this.#s.assignedNodes({flatten:!0}).length>0;this.#i.style.display=this.title||t?"":"none"}#C(){this.#t.classList.toggle("is-hover",this.hoverable);const t=this.cardAccent;t?this.#t.style.setProperty("--vcrd-accent",t):this.#t.style.removeProperty("--vcrd-accent"),this.#n.textContent=this.title,this.#n.style.display=this.title?"":"none",this.#A(),this.#d&&(this.#d.textContent=this.emptyText),this.#f()}}customElements.define("vs-table-cards",y);
