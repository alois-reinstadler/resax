const p="http://www.w3.org/2000/svg",_=[{key:"name",label:"Member",type:"user",sub:"email",sortable:!0},{key:"role",label:"Role",sortable:!0},{key:"status",label:"Status",type:"badge",align:"center",sortable:!0},{key:"usage",label:"Usage",type:"number",align:"right",sortable:!0,width:"120px"}],v=[{id:1,name:"Ada Lovelace",email:"ada@vuesax.com",role:"Owner",status:"Active",usage:9820},{id:2,name:"Alan Turing",email:"alan@vuesax.com",role:"Admin",status:"Active",usage:7415},{id:3,name:"Grace Hopper",email:"grace@vuesax.com",role:"Developer",status:"Pending",usage:3120},{id:4,name:"Linus Torvalds",email:"linus@vuesax.com",role:"Developer",status:"Away",usage:1890},{id:5,name:"Margaret Hamilton",email:"margaret@vuesax.com",role:"Viewer",status:"Banned",usage:0}],g=`
  /* container-type turns the host into the yardstick the narrow layout is
     measured against. A table lives in someone's column, and that column runs
     out of room long before the window does — @media would still be reading
     1440px while these four columns are fighting over 320. */
  :host { display: block; width: 100%; container-type: inline-size; }
  .vtbl {
    /* sizing scale (driven by tokens with portable fallbacks) */
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    --py: 12px;
    --row-h: 48px;
    --r: var(--ctrl-r-md, 12px);
    --accent: var(--ui-accent, #ededed);
    --line: var(--border, #1f1f1f);
    --line-soft: color-mix(in srgb, var(--border, #1f1f1f) 65%, transparent);
    --surface: var(--bg-card, #0a0a0a);
    --surface-2: var(--bg-elevated, #111111);
    --txt: var(--text, #ededed);
    --txt-2: var(--text-secondary, #a1a1a1);
    --txt-3: var(--text-muted, #666666);
    --hover-bg: var(--inp-hover-bg, rgba(255, 255, 255, 0.045));
    --stripe-bg: var(--inp-readonly-bg, rgba(255, 255, 255, 0.022));

    display: flex;
    flex-direction: column;
    width: 100%;
    background: var(--surface);
    border-radius: var(--r);
    color: var(--txt);
    font-family: inherit;
    font-size: var(--fs);
    overflow: hidden;
  }
  .vtbl--sm { --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --py: 8px; --row-h: 40px; --r: var(--ctrl-r-sm, 10px); }
  .vtbl--lg { --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --py: 15px; --row-h: 56px; --r: var(--ctrl-r-lg, 14px); }

  .vtbl--r-none { --r: 0px; }
  .vtbl--r-subtle { --r: 8px; }
  .vtbl.is-bordered { border: 1px solid var(--line); }
  @supports (corner-shape: squircle) {
    .vtbl--r-squircle { corner-shape: squircle; --r: calc(var(--ctrl-r-md, 12px) * 1.5); }
    .vtbl--r-squircle.vtbl--sm { --r: calc(var(--ctrl-r-sm, 10px) * 1.5); }
    .vtbl--r-squircle.vtbl--lg { --r: calc(var(--ctrl-r-lg, 14px) * 1.5); }
  }

  /* ── toolbar ── */
  .vtbl__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: calc(var(--py) + 2px) var(--px);
    border-bottom: 1px solid var(--line-soft);
  }
  .vtbl__bar[hidden] { display: none; }
  .vtbl__bar-l { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .vtbl__title { margin: 0; font-size: calc(var(--fs) + 2px); font-weight: 600; letter-spacing: -0.01em; color: var(--txt); }
  .vtbl__title[hidden] { display: none; }
  .vtbl__count {
    flex: none;
    padding: 4px 10px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent) 16%, transparent);
    color: color-mix(in srgb, var(--accent) 88%, var(--txt));
    font-size: calc(var(--fs) - 3px);
    font-weight: 600;
    line-height: 1.2;
    white-space: nowrap;
    transition: opacity 160ms ease, transform 160ms ease;
  }
  .vtbl__count[hidden] { display: none; }

  /* ── scroll region ── */
  .vtbl__scroll { width: 100%; overflow-x: auto; }
  .vtbl.is-sticky .vtbl__scroll { max-height: 420px; overflow-y: auto; }

  .vtbl__table { width: 100%; border-collapse: collapse; border-spacing: 0; }

  /* ── header ── */
  .vtbl__th {
    position: relative;
    padding: var(--py) var(--px);
    background: var(--surface-2);
    color: var(--txt-3);
    font-size: calc(var(--fs) - 2px);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: left;
    white-space: nowrap;
    user-select: none;
  }
  .vtbl.is-sticky .vtbl__th { position: sticky; top: 0; z-index: 2; }
  .vtbl__th.is-center { text-align: center; }
  .vtbl__th.is-right { text-align: right; }
  .vtbl__head tr { border-bottom: 1px solid var(--line); }

  .vtbl__sort {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
    cursor: pointer;
    transition: color 160ms ease;
  }
  .vtbl__th.is-right .vtbl__sort { flex-direction: row-reverse; }
  .vtbl__th.is-center .vtbl__sort { justify-content: center; }
  .vtbl__sort:hover { color: var(--txt); }
  .vtbl__sort:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
  .vtbl__th.is-active { color: var(--txt); }
  .vtbl__th-label { display: inline-block; }

  .vtbl__arrow { display: inline-flex; transition: opacity 160ms ease, transform 220ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)); }
  .vtbl__arrow svg { width: 13px; height: 13px; }
  .vtbl__arrow.is-idle { opacity: 0; transform: scale(0.8); }
  .vtbl__sort:hover .vtbl__arrow.is-idle { opacity: 0.4; }
  /* the chevron pair: highlight the down half for asc, flip for desc */
  .vtbl__arrow.is-asc { opacity: 1; transform: rotate(180deg); color: var(--accent); }
  .vtbl__arrow.is-desc { opacity: 1; transform: rotate(0deg); color: var(--accent); }

  /* ── body ── */
  .vtbl__td {
    padding: var(--py) var(--px);
    color: var(--txt);
    text-align: left;
    vertical-align: middle;
    height: var(--row-h);
  }
  .vtbl__td.is-center { text-align: center; }
  .vtbl__td.is-right { text-align: right; }
  .vtbl__row { transition: background-color 140ms ease; }
  .vtbl__body tr + tr { border-top: 1px solid var(--line-soft); }
  .vtbl.is-bordered .vtbl__th + .vtbl__th,
  .vtbl.is-bordered .vtbl__td + .vtbl__td { border-left: 1px solid var(--line-soft); }

  .vtbl.is-striped .vtbl__body tr:nth-child(even) { background: var(--stripe-bg); }
  .vtbl.is-hoverable .vtbl__body tr:hover { background: var(--hover-bg); }
  .vtbl__row.is-selected { background: color-mix(in srgb, var(--accent) 12%, transparent) !important; }
  .vtbl__row.is-selected:hover { background: color-mix(in srgb, var(--accent) 16%, transparent) !important; }

  /* ── selection column ── */
  .vtbl__col-check { width: 52px; }
  .vtbl__th--check, .vtbl__td--check { width: 52px; padding-right: 0; text-align: center; }
  .vtbl__check { display: inline-flex; vertical-align: middle; }

  /* ── user cell ── */
  .vtbl__user { display: inline-flex; align-items: center; gap: 10px; min-width: 0; }
  .vtbl__avatar {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) 22%, var(--surface-2));
    color: var(--txt);
    font-size: calc(var(--fs) - 3px);
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .vtbl--sm .vtbl__avatar { width: 26px; height: 26px; }
  .vtbl--lg .vtbl__avatar { width: 36px; height: 36px; }
  .vtbl__user-txt { display: flex; flex-direction: column; min-width: 0; line-height: 1.3; }
  .vtbl__user-name { font-weight: 500; color: var(--txt); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .vtbl__user-sub { font-size: calc(var(--fs) - 2px); color: var(--txt-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .vtbl__num { font-variant-numeric: tabular-nums; }

  /* ── empty ── */
  .vtbl__td--empty { height: calc(var(--row-h) * 2.5); text-align: center; color: var(--txt-3); }

  /* ── skeleton ── */
  .vtbl__skel {
    display: block;
    width: 70%;
    height: 12px;
    border-radius: 6px;
    background: linear-gradient(90deg, var(--line-soft) 0%, var(--surface-2) 50%, var(--line-soft) 100%);
    background-size: 200% 100%;
    animation: vtbl-shimmer 1.3s linear infinite;
  }
  .vtbl__skel--box { width: 18px; height: 18px; margin: 0 auto; border-radius: 6px; }
  @keyframes vtbl-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }

  @media (prefers-reduced-motion: reduce) {
    .vtbl__row, .vtbl__arrow, .vtbl__sort, .vtbl__count { transition: none; }
    .vtbl__skel { animation: none; }
  }

  /* ── inline checkbox cell (stand-in for <VsCheckbox>, zero cross-import) ── */
  .vtbl__cb {
    flex: none;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 1.5px solid var(--line-soft);
    border-radius: 5px;
    background: var(--surface-2);
    color: #fff;
    cursor: pointer;
    outline: none;
    transition: border-color 180ms ease, background-color 180ms ease;
  }
  .vtbl__cb--md { width: 20px; height: 20px; border-radius: 6px; }
  .vtbl__cb:hover { border-color: var(--txt-3); }
  .vtbl__cb:focus-visible { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent); }
  .vtbl__cb.is-on, .vtbl__cb.is-indeterminate { background: var(--accent); border-color: var(--accent); }
  .vtbl__cb-mark { width: 76%; height: 76%; }
  .vtbl__cb-check { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset 220ms cubic-bezier(0.65, 0, 0.35, 1); }
  .vtbl__cb-dash { stroke-dasharray: 12; stroke-dashoffset: 12; transition: stroke-dashoffset 180ms cubic-bezier(0.65, 0, 0.35, 1); }
  .vtbl__cb.is-on:not(.is-indeterminate) .vtbl__cb-check { stroke-dashoffset: 0; }
  .vtbl__cb.is-indeterminate .vtbl__cb-dash { stroke-dashoffset: 0; }
  .vtbl__cb.is-indeterminate .vtbl__cb-check { stroke-dashoffset: 24; }
  /* An 18px square is 6px short of the WCAG 2.2 thumb floor, and shrinking the
     drawn box is not on the table — so the target is widened past the paint
     with a transparent overlay. Nothing moves; the miss rate drops. */
  .vtbl__cb::after {
    content: '';
    position: absolute;
    inset: 50% auto auto 50%;
    width: max(100%, 26px);
    height: max(100%, 26px);
    transform: translate(-50%, -50%);
  }

  /* ── inline status pill (stand-in for <VsBadge>, zero cross-import) ── */
  .vtbl__pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    height: 22px;
    padding: 0 9px;
    border-radius: 999px;
    font-size: calc(var(--fs) - 2px);
    font-weight: 600;
    line-height: 1;
    white-space: nowrap;
    background: color-mix(in srgb, var(--pill-ring, var(--txt-2)) 16%, transparent);
    color: var(--pill-ring, var(--txt-2));
    border: 1px solid color-mix(in srgb, var(--pill-ring, var(--txt-2)) 24%, transparent);
  }
  .vtbl__pill--md { height: 24px; padding: 0 10px; }
  .vtbl__pill-dot { width: 6px; height: 6px; border-radius: 999px; background: currentColor; flex: none; }
  .vtbl__pill--t-success { --pill-ring: var(--ui-accent, #ededed); }
  .vtbl__pill--t-warn { --pill-ring: var(--ui-accent, #ededed); }
  .vtbl__pill--t-danger { --pill-ring: var(--ui-accent, #ededed); }

  /* ── narrow: every row becomes a labelled card ──
     Four columns cannot share 320px, and the fallback — .vtbl__scroll's
     horizontal pan — is a trap: it has no scrollbar and no edge fade, so
     Status and Usage are not "off to the right", they are simply gone as far
     as the reader can tell. Below the switch the table stops being a grid and
     each row states its own fields, so nothing is hidden and nothing pans. */
  @container (max-width: 480px) {
    .vtbl__scroll { overflow-x: hidden; }
    /* the thead's job was to name the columns once; the cards now name them
       every time, and a colgroup under a non-table parent would otherwise
       conjure an anonymous table box */
    .vtbl__head, .vtbl__table > colgroup { display: none; }
    /* border-box or the cards run 28px (a --px pair) past the card they sit in:
       these boxes gain padding the table layout used to absorb for them */
    .vtbl__table, .vtbl__body, .vtbl__row, .vtbl__td { display: block; box-sizing: border-box; width: 100%; }

    .vtbl__row { position: relative; padding: 8px 0; }
    .vtbl__td {
      display: grid;
      grid-template-columns: 72px minmax(0, 1fr);
      align-items: center;
      /* grid stretches its items and blockifies inline-flex on the way in, so
         without this the status pill inflates into a full-width slab and the
         avatar drifts away from the name it belongs to */
      justify-items: start;
      gap: 10px;
      height: auto;
      padding: 5px var(--px);
    }
    /* the header's alignment was about lining up a column of figures; stacked
       there is no column to line up with, and a right-flung value reads as
       belonging to the row below it */
    .vtbl__td, .vtbl__td.is-center, .vtbl__td.is-right { text-align: left; }
    /* the label the thead no longer carries — stamped on the cell at render
       time, since the port builds its DOM in JS and CSS cannot reach columns */
    .vtbl__td::before {
      content: attr(data-label);
      overflow: hidden;
      color: var(--txt-3);
      font-size: calc(var(--fs) - 3px);
      font-weight: 600;
      letter-spacing: 0.04em;
      text-overflow: ellipsis;
      text-transform: uppercase;
      white-space: nowrap;
    }
    /* an unlabelled column would leave a 72px hole in front of every value */
    .vtbl__td[data-label=""] { grid-template-columns: minmax(0, 1fr); }
    .vtbl__td[data-label=""]::before { content: none; }

    /* the checkbox owned a column; with no columns left it rides the card's
       corner, and the cell beside it reserves the room so a long email cannot
       run underneath */
    .vtbl__td--check {
      position: absolute;
      top: 10px;
      right: 10px;
      /* back to a plain box: the label grid would otherwise hold a 72px empty
         track open in front of the checkbox and park it mid-card */
      display: block;
      width: auto;
      padding: 0;
    }
    .vtbl__td--check::before { content: none; }
    .vtbl__td--check + .vtbl__td { padding-right: 46px; }
    /* vertical rules separate columns; stacked they would just underline the
       left edge of every field */
    .vtbl.is-bordered .vtbl__td + .vtbl__td { border-left: 0; }

    .vtbl__td--empty { display: block; text-align: center; }
    .vtbl__td--empty::before { content: none; }

    /* Same trick as the ::after overlay, but real: at phone size the button
       itself is the 26px target and ::before paints the 18px box inside it, so
       what the thumb hits and what the accessibility tree measures agree. The
       desktop header row is untouched — it would have grown 8px taller. */
    .vtbl__cb { width: 26px; height: 26px; border: 0; background: none; }
    .vtbl__cb--md { width: 28px; height: 28px; }
    .vtbl__cb::before {
      content: '';
      position: absolute;
      inset: 4px;
      border: 1.5px solid var(--line-soft);
      border-radius: 5px;
      background: var(--surface-2);
      transition: border-color 180ms ease, background-color 180ms ease;
    }
    .vtbl__cb--md::before { border-radius: 6px; }
    .vtbl__cb:hover::before { border-color: var(--txt-3); }
    .vtbl__cb:focus-visible { box-shadow: none; }
    .vtbl__cb:focus-visible::before { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 30%, transparent); }
    .vtbl__cb.is-on, .vtbl__cb.is-indeterminate { background: none; }
    .vtbl__cb.is-on::before, .vtbl__cb.is-indeterminate::before { background: var(--accent); border-color: var(--accent); }
    /* the mark was 76% of the button; the button is now the target rather than
       the box, so the same tick has to be stated outright — 76% of 26px would
       draw a visibly fatter check than the desktop one. position lifts it over
       the absolutely positioned ::before. */
    .vtbl__cb-mark { position: relative; width: 12px; height: 12px; }
    .vtbl__cb--md .vtbl__cb-mark { width: 13.5px; height: 13.5px; }
  }
`;let u;function f(b){if(u||=document.createElement("canvas").getContext("2d"),!u)return null;u.fillStyle="#000",u.fillStyle=b;const t=u.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(b,t){const e=t?f(String(t).trim()):null;if(!e){for(const n of x)b.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),i=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(n=>Math.round(i?n*.92:n+(255-n)*.16)),a=(n,c)=>b.style.setProperty(n,c);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(n,o);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(n,i?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])a(n,i?"0 0 0":"255 255 255");a("--vs-color",o),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class w extends HTMLElement{static observedAttributes=["rowkey","title","size","radius","striped","bordered","hoverable","selectable","sortable","sticky-header","loading","emptytext","color"];#l;#o;#c;#r;#d;#u;#h;#v;#b;#t;#i=null;#m=null;#A=void 0;#_=void 0;#N=[];#s=null;#e=null;#D="";#g="";#L=[];#z=[];#$=[];#j=[];#R=()=>this.#S();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#l=document.createElement("div"),this.#l.className="vtbl",this.#o=document.createElement("div"),this.#o.className="vtbl__bar";const s=document.createElement("div");s.className="vtbl__bar-l",this.#c=document.createElement("h3"),this.#c.className="vtbl__title",this.#r=document.createElement("slot"),this.#r.name="toolbar",s.append(this.#c,this.#r),this.#d=document.createElement("span"),this.#d.className="vtbl__count",this.#o.append(s,this.#d);const r=document.createElement("div");r.className="vtbl__scroll",this.#u=document.createElement("table"),this.#u.className="vtbl__table",this.#h=document.createElement("colgroup"),this.#v=document.createElement("thead"),this.#v.className="vtbl__head",this.#b=document.createElement("tr"),this.#v.appendChild(this.#b),this.#t=document.createElement("tbody"),this.#t.className="vtbl__body",this.#u.append(this.#h,this.#v,this.#t),r.appendChild(this.#u),this.#l.append(this.#o,r),t.append(e,this.#l),this.#r.addEventListener("slotchange",this.#R)}connectedCallback(){m(this,this.getAttribute("color")),this.#W()}disconnectedCallback(){this.#O(),this.#U(),this.#r.removeEventListener("slotchange",this.#R)}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&this.#W()}get columns(){return this.#m&&this.#m.length?this.#m:_}set columns(t){this.#m=Array.isArray(t)?t:null,this.#t&&(this.#F(),this.#C())}get rows(){return this.#A??v}set rows(t){this.#A=t,this.#t&&this.#C()}get modelValue(){return this.#_??this.#N}set modelValue(t){this.#_=Array.isArray(t)?t.slice():void 0,this.#t&&this.#p()}#n(t,e){return this.getAttribute(t)??e}#f(t,e){if(!this.hasAttribute(t))return e;const s=this.getAttribute(t);return s!=="false"&&s!=="0"}#H(){return this.#n("rowkey","id")}#M(){return this.#n("size","md")}#x(){return this.#M()==="lg"?"md":"sm"}#a(){return this.#f("selectable",!1)}#V(){return this.#f("sortable",!0)}#B(t){return t.align??(t.type==="number"?"right":"left")}#w(t,e){const s=this.#H();return(t&&t[s])??e}#q(t){return this.#V()&&!!t.sortable}#Q(t){return String(t??"").trim().split(/\s+/).slice(0,2).map(e=>e[0]?.toUpperCase()??"").join("")}#X(t){const e=String(t).toLowerCase();return/(active|online|success|paid|done|approved|complete|live)/.test(e)?"success":/(pending|away|trial|warn|review|idle|draft)/.test(e)?"warn":/(banned|error|failed|offline|blocked|expired|rejected|inactive)/.test(e)?"danger":"default"}#Y(t){return typeof t=="number"?t.toLocaleString():String(t??"")}#Z(){return this.#A??v}#y(){const t=this.#Z().slice();if(!this.#s||!this.#e)return t;const e=this.#s,s=this.#e==="asc"?1:-1;return t.sort((r,i)=>{const o=r[e],l=i[e];return o==null?1:l==null?-1:typeof o=="number"&&typeof l=="number"?(o-l)*s:String(o).localeCompare(String(l))*s})}#k(){return this.#_??this.#N}#O(){for(const{el:t,type:e,fn:s}of this.#L)t.removeEventListener(e,s);this.#L=[]}#U(){for(const{el:t,type:e,fn:s}of this.#$)t.removeEventListener(e,s);this.#$=[]}#P(t,e,s){t.addEventListener(e,s),this.#L.push({el:t,type:e,fn:s})}#T(t,e,s){t.addEventListener(e,s),this.#$.push({el:t,type:e,fn:s})}#G(t){const e=document.createElement("button");e.type="button",e.className=`vtbl__cb vtbl__cb--${t}`,e.setAttribute("role","checkbox"),e.setAttribute("aria-checked","false");const s=document.createElementNS(p,"svg");s.setAttribute("class","vtbl__cb-mark"),s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("aria-hidden","true");const r=document.createElementNS(p,"path");r.setAttribute("class","vtbl__cb-check"),r.setAttribute("d","M5 12.5l4.2 4.2L19 7"),r.setAttribute("fill","none"),r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","2.4"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round");const i=document.createElementNS(p,"path");return i.setAttribute("class","vtbl__cb-dash"),i.setAttribute("d","M6 12h12"),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","2.4"),i.setAttribute("stroke-linecap","round"),s.append(r,i),e.appendChild(s),e}#tt(t,e,s){const r=document.createElement("span");r.className=`vtbl__pill vtbl__pill--${s} vtbl__pill--t-${e}`;const i=document.createElement("span");i.className="vtbl__pill-dot",i.setAttribute("aria-hidden","true");const o=document.createElement("span");return o.textContent=t,r.append(i,o),r}#F(){this.#O(),this.#h.replaceChildren(),this.#b.replaceChildren(),this.#z=[],this.#i=null;const t=this.#a(),e=this.#x(),s=this.columns;if(t){const r=document.createElement("col");r.className="vtbl__col-check",this.#h.appendChild(r)}for(const r of s){const i=document.createElement("col");r.width&&(i.style.width=r.width),this.#h.appendChild(i)}if(t){const r=document.createElement("th");r.className="vtbl__th vtbl__th--check",r.scope="col";const i=this.#G(e);i.classList.add("vtbl__check"),this.#i=i,this.#P(i,"click",()=>this.#it()),r.appendChild(i),this.#b.appendChild(r)}for(const r of s){const i=document.createElement("th"),o=this.#B(r),l=this.#q(r);i.className=`vtbl__th is-${o}`+(l?" is-sortable":""),i.scope="col";let a=null,n=null;if(l){a=document.createElement("button"),a.type="button",a.className="vtbl__sort";const c=document.createElement("span");c.className="vtbl__th-label",c.textContent=r.label,n=document.createElement("span"),n.className="vtbl__arrow is-idle",n.setAttribute("aria-hidden","true");const d=document.createElementNS(p,"svg");d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none");const h=document.createElementNS(p,"path");h.setAttribute("d","M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"),h.setAttribute("stroke","currentColor"),h.setAttribute("stroke-width","1.5"),h.setAttribute("stroke-miterlimit","10"),h.setAttribute("stroke-linecap","round"),h.setAttribute("stroke-linejoin","round"),d.appendChild(h),n.appendChild(d),a.append(c,n),this.#P(a,"click",()=>this.#rt(r)),i.appendChild(a)}else{const c=document.createElement("span");c.className="vtbl__th-label",c.textContent=r.label,i.appendChild(c)}this.#b.appendChild(i),this.#z.push({col:r,th:i,sortBtn:a,arrowSpan:n,sorts:l})}this.#D=this.#I(),this.#K(),this.#p()}#I(){return`${this.#a()}|${this.#V()}|${this.#x()}|${this.columns.map(t=>t.key).join(",")}`}#K(){for(const t of this.#z){if(!t.sorts)continue;const e=this.#s===t.col.key;t.th.classList.toggle("is-active",e),t.th.setAttribute("aria-sort",e?this.#e==="asc"?"ascending":"descending":"none"),t.arrowSpan.className="vtbl__arrow "+(e?`is-${this.#e}`:"is-idle")}}#C(){this.#U(),this.#t.replaceChildren(),this.#j=[];const t=this.#a(),e=this.hasAttribute("loading"),s=this.columns,r=this.#x(),i=s.length+(t?1:0);if(e){for(let l=0;l<4;l++){const a=document.createElement("tr");if(a.className="vtbl__row vtbl__row--skel",t){const n=document.createElement("td");n.className="vtbl__td vtbl__td--check";const c=document.createElement("span");c.className="vtbl__skel vtbl__skel--box",n.appendChild(c),a.appendChild(n)}for(const n of s){const c=document.createElement("td");c.className=`vtbl__td is-${this.#B(n)}`,c.dataset.label=n.label??"";const d=document.createElement("span");d.className="vtbl__skel",d.style.width=n.type==="number"?"40%":"70%",c.appendChild(d),a.appendChild(c)}this.#t.appendChild(a)}this.#g=this.#E(!0),this.#S();return}const o=this.#y();if(o.length===0){const l=document.createElement("tr");l.className="vtbl__row vtbl__row--empty";const a=document.createElement("td");a.className="vtbl__td vtbl__td--empty",a.colSpan=i;const n=document.createElement("slot");n.name="empty",n.textContent=this.#n("emptytext","No data to display"),a.appendChild(n),l.appendChild(a),this.#t.appendChild(l),this.#g=this.#E(!1),this.#p();return}o.forEach((l,a)=>{const n=document.createElement("tr");n.className="vtbl__row",this.#T(n,"click",()=>this.#at(l,a));let c=null;if(t){const d=document.createElement("td");d.className="vtbl__td vtbl__td--check",this.#T(d,"click",h=>h.stopPropagation()),c=this.#G(r),c.classList.add("vtbl__check"),this.#T(c,"click",()=>this.#nt(l,a)),d.appendChild(c),n.appendChild(d)}for(const d of s){const h=document.createElement("td");h.className=`vtbl__td is-${this.#B(d)}`,h.dataset.label=d.label??"",this.#et(h,d,l,r),n.appendChild(h)}this.#t.appendChild(n),this.#j.push({tr:n,row:l,index:a,cb:c})}),this.#g=this.#E(!1),this.#p()}#E(t){return t?"loading":[this.#a(),this.#H(),this.#n("emptytext",""),this.columns.map(e=>e.key+(e.type||"")).join(","),this.#x(),this.#y().length].join("|")}#et(t,e,s,r){const i=s?s[e.key]:void 0;if(e.type==="user"){const o=document.createElement("span");o.className="vtbl__user";const l=document.createElement("span");l.className="vtbl__avatar",l.setAttribute("aria-hidden","true"),l.textContent=this.#Q(i);const a=document.createElement("span");a.className="vtbl__user-txt";const n=document.createElement("span");if(n.className="vtbl__user-name",n.textContent=i==null?"":String(i),a.appendChild(n),e.sub&&s&&s[e.sub]!=null){const c=document.createElement("span");c.className="vtbl__user-sub",c.textContent=String(s[e.sub]),a.appendChild(c)}o.append(l,a),t.appendChild(o)}else if(e.type==="badge")t.appendChild(this.#tt(String(i??""),this.#X(i),r));else if(e.type==="number"){const o=document.createElement("span");o.className="vtbl__num",o.textContent=this.#Y(i),t.appendChild(o)}else t.textContent=i==null?"":String(i)}#p(){const t=this.#a(),e=new Set(this.#k());for(const s of this.#j){const r=this.#w(s.row,s.index),i=t&&e.has(r);s.tr.classList.toggle("is-selected",i),s.cb&&(s.cb.classList.toggle("is-on",i),s.cb.classList.remove("is-indeterminate"),s.cb.setAttribute("aria-checked",String(i)))}if(this.#i){const s=this.#y().map((o,l)=>this.#w(o,l)),r=s.length>0&&s.every(o=>e.has(o)),i=!r&&s.some(o=>e.has(o));this.#i.classList.toggle("is-on",r),this.#i.classList.toggle("is-indeterminate",i),this.#i.setAttribute("aria-checked",i?"mixed":String(r))}this.#S()}#st(){const t=this.#M(),e=this.#n("radius","squircle"),s=this.hasAttribute("striped"),r=this.#f("bordered",!0),i=this.#f("hoverable",!0),o=this.hasAttribute("sticky-header"),l=this.hasAttribute("loading");this.#l.className=["vtbl",`vtbl--${t}`,`vtbl--r-${e}`,s&&"is-striped",r&&"is-bordered",i&&!l&&"is-hoverable",o&&"is-sticky",l&&"is-loading"].filter(Boolean).join(" "),this.#S()}#S(){const t=this.#n("title",""),e=this.#a(),s=e?this.#k().length:0;this.#c.textContent=t,this.#c.hidden=!t;const r=this.#r.assignedNodes({flatten:!0}).length>0;this.#o.style.display=t||r||e&&s>0?"":"none",this.#d.textContent=`${s} selected`,this.#d.hidden=!(e&&s>0)}#W(){this.#I()!==this.#D&&this.#F(),this.#E(this.hasAttribute("loading"))!==this.#g&&this.#C(),this.#st()}#rt(t){this.#q(t)&&(this.#s!==t.key?(this.#s=t.key,this.#e="asc"):this.#e==="asc"?this.#e="desc":(this.#s=null,this.#e=null),this.dispatchEvent(new CustomEvent("sort",{bubbles:!0,composed:!0,detail:{key:this.#s,dir:this.#e}})),this.#K(),this.#C())}#it(){const t=this.#y().map((r,i)=>this.#w(r,i)),e=new Set(this.#k()),s=t.length>0&&t.every(r=>e.has(r));this.#J(s?[]:t.slice())}#nt(t,e){const s=this.#w(t,e),r=this.#k(),i=r.includes(s)?r.filter(o=>o!==s):[...r,s];this.#J(i)}#J(t){this.#_===void 0&&(this.#N=t),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:t.slice()}})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{value:t.slice()}})),this.#p()}#at(t,e){this.dispatchEvent(new CustomEvent("row-click",{bubbles:!0,composed:!0,detail:{row:t,index:e}}))}}customElements.define("vs-table",w);
