const A=a=>String(a).padStart(2,"0"),S=a=>`${a.getFullYear()}-${A(a.getMonth()+1)}-${A(a.getDate())}`;function g(a){const[t,e,i]=String(a).split("T")[0].split("-").map(Number);return!Number.isFinite(t)||!Number.isFinite(e)||!Number.isFinite(i)||e<1||e>12||i<1||i>31?new Date:new Date(t,e-1,i)}const _=a=>new Date(a.getFullYear(),a.getMonth(),1),m=(a,t)=>new Date(a.getFullYear(),a.getMonth(),a.getDate()+t),C=(a,t)=>new Date(a.getFullYear(),a.getMonth()+t,1),h=S(new Date),D="http://www.w3.org/2000/svg";function y(a,t){const e=document.createElementNS(D,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),a&&e.setAttribute("class",a);for(const i of t){const s=document.createElementNS(D,"path");s.setAttribute("d",i.d),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width",i.w||"1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),i.m!==!1&&s.setAttribute("stroke-miterlimit","10"),e.appendChild(s)}return e}const M=[{d:"M8 2V5"},{d:"M16 2V5"},{d:"M3.5 9.08984H20.5"},{d:"M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"},{d:"M15.6947 13.6992H15.7037",w:"2",m:!1},{d:"M15.6947 16.6992H15.7037",w:"2",m:!1},{d:"M11.9955 13.6992H12.0045",w:"2",m:!1},{d:"M11.9955 16.6992H12.0045",w:"2",m:!1},{d:"M8.29431 13.6992H8.30329",w:"2",m:!1},{d:"M8.29431 16.6992H8.30329",w:"2",m:!1}],N=[{d:"M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"}],O=[{d:"M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"}],V=`
  :host { display: inline-block; }
  [hidden] { display: none !important; }
  .glw-root {
    --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px);
    --rr: var(--ctrl-r-md, 12px); --cell: 38px; --day-r: 12px; --accent: var(--ui-accent, #ededed);
    position: relative; display: inline-flex; flex-direction: column;
    font-family: inherit; font-size: var(--fs); color: var(--text, #ededed);
    user-select: none; -webkit-user-select: none;
  }
  .glw--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); --rr: var(--ctrl-r-sm, 10px); --cell: 32px; --day-r: 10px; }
  .glw--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); --rr: var(--ctrl-r-md, 12px); --cell: 38px; --day-r: 12px; }
  .glw--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); --rr: var(--ctrl-r-lg, 14px); --cell: 44px; --day-r: 14px; }
  .glw--r-none { --rr: 0px; --day-r: 6px; }
  .glw--r-subtle { --rr: 8px; --day-r: 8px; }
  .glw--r-rounded { --rr: 14px; --day-r: 11px; }
  .glw--r-pill { --rr: 20px; --day-r: 999px; }
  .glw--r-squircle { --rr: var(--ctrl-r-md, 12px); --day-r: 12px; }

  .glw-input {
    display: inline-flex; align-items: center; gap: 9px;
    width: 100%; min-width: 200px; height: var(--h); padding: 0 var(--px);
    border-radius: var(--rr); border: 1px solid var(--inp-border, #2a2a2a);
    background: var(--inp-bg, transparent); color: var(--inp-text, #ededed);
    font: inherit; font-weight: 500; cursor: pointer; white-space: nowrap;
    -webkit-tap-highlight-color: transparent; transition: border-color 200ms ease;
  }
  .glw-input:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .glw-input__icon { width: 15px; height: 15px; flex: none; color: var(--inp-prefix, #7a7a7a); }
  .glw-input__value { overflow: hidden; text-overflow: ellipsis; }
  .glw-input__value.is-placeholder { color: var(--inp-placeholder, #5a5a5a); }

  .glw-panel {
    position: relative; padding: 12px;
    border-radius: var(--rr);
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--bg-card, #111);
  }
  /* popover: float the panel over content and animate it in */
  .glw-panel--float {
    position: absolute; top: calc(var(--h) + 8px); left: 0; z-index: 50;
    box-shadow: var(--sel-menu-shadow, 0 12px 40px rgba(0, 0, 0, 0.5));
    animation: glw-pop-in 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes glw-pop-in { from { opacity: 0; transform: translateY(-8px) scale(0.97); } to { opacity: 1; transform: none; } }

  .glw-head { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 8px; }
  .glw-nav {
    display: inline-flex; align-items: center; justify-content: center;
    width: 30px; height: 30px; flex: none; border: 0; border-radius: 9px;
    background: transparent; color: var(--text-muted, #666); cursor: pointer;
    transition: color 140ms ease, background-color 140ms ease;
  }
  .glw-nav svg { width: 16px; height: 16px; }
  .glw-nav:hover:not(:disabled) { color: var(--text, #ededed); background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }
  .glw-title {
    flex: 1; height: 30px; border: 0; background: transparent; font: inherit;
    font-weight: 600; text-transform: capitalize; letter-spacing: -0.01em;
    color: var(--text, #ededed); cursor: pointer; text-align: center;
  }

  .glw-week { display: grid; grid-template-columns: repeat(7, var(--cell)); margin-bottom: 2px; }
  .glw-week__cell {
    display: grid; place-items: center; height: 28px; font-size: 11px; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted, #666);
  }

  .glw-grid { position: relative; display: flex; flex-direction: column; outline: none; }
  .glw-row { display: grid; grid-template-columns: repeat(7, var(--cell)); grid-auto-rows: var(--cell); }

  .glw-day {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    width: var(--cell); height: var(--cell); border: 0; border-radius: var(--day-r);
    background: transparent; color: var(--text, #ededed); font: inherit;
    font-size: calc(var(--fs) - 1px); font-variant-numeric: tabular-nums; cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 160ms ease, color 160ms ease, transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .glw-day__n { position: relative; z-index: 1; }
  .glw-day:hover:not(:disabled):not(.selected) { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); }
  .glw-day:active:not(:disabled) { transform: scale(0.9); }
  .glw-day.is-out { opacity: 0.3; }
  .glw-day.is-disabled { opacity: 0.22; cursor: not-allowed; }
  .glw-day.is-today::after {
    content: ''; position: absolute; bottom: 5px; left: 50%; width: 3px; height: 3px;
    border-radius: 50%; background: currentColor; transform: translateX(-50%); z-index: 1;
  }

  /* SIGNATURE EFFECT: selected day chip emits a pulsing glow halo.
     Static min shadow on the chip; max state baked into ::before (opacity only
     animates → compositable). ::after stays reserved for the "today" dot. */
  .glw-day.selected {
    color: var(--accent-fg, #fff); font-weight: 600;
    background: var(--ui-accent, #ededed);
    box-shadow: 0 0 6px 0 color-mix(in srgb, var(--ui-accent, #ededed) 55%, transparent);
  }
  .glw-day.selected::before {
    content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
    box-shadow: 0 0 16px 4px color-mix(in srgb, var(--ui-accent, #ededed) 70%, transparent);
    opacity: 0;
    animation: glw-pulse 2000ms ease-in-out infinite;
  }
  .glw-day.selected.is-today::after { background: var(--accent-fg, #fff); }
  @keyframes glw-pulse { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
  .glw--noglow .glw-day.selected { animation: none; box-shadow: none; }
  .glw--noglow .glw-day.selected::before { display: none; }

  /* range middle */
  .glw-day.inRange { background: color-mix(in srgb, var(--ui-accent, #ededed) 14%, transparent); border-radius: 0; }
  .glw-day.start:not(.end) { border-top-right-radius: 0; border-bottom-right-radius: 0; }
  .glw-day.end:not(.start) { border-top-left-radius: 0; border-bottom-left-radius: 0; }

  .glw-grid:focus-visible .glw-day.is-focus { box-shadow: inset 0 0 0 1.5px var(--ui-accent, #ededed); }
  .glw-grid:focus-visible .glw-day.is-focus.selected { box-shadow: inset 0 0 0 1.5px var(--bg-card, #111); }

  .is-disabled .glw-day { cursor: not-allowed; }
  .glw-root.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .glw-day, .glw-nav, .glw-panel--float { transition: none; animation: none; }
    .glw-day.selected { animation: none; box-shadow: 0 0 8px 1px color-mix(in srgb, var(--ui-accent, #ededed) 55%, transparent); }
    .glw-day.selected::before { animation: none; opacity: 0; }
  }
`;let f;function F(a){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=a;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const T=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function I(a,t){const e=t?F(String(t).trim()):null;if(!e){for(const o of T)a.style.removeProperty(o);return}const i=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),n=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(o=>Math.round(n?o*.92:o+(255-o)*.16)),d=(o,p)=>a.style.setProperty(o,p);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(o,r);d("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(o,e.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(o,n?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])d(o,n?"0 0 0":"255 255 255");d("--vs-color",r),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class H extends HTMLElement{static observedAttributes=["value","min","max","week-start","mode","display","size","radius","locale","placeholder","disabled","glow","color"];constructor(){super(),this._single="",this._multi=[],this._rangeStart=null,this._rangeEnd=null,this._hoverISO=null,this._open=!1,this._reflecting=!1,this._view=_(new Date),this._focusISO=h,this._cells=[],this._btns=[];const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=V,this._root=document.createElement("div"),this._root.className="glw-root",this._input=document.createElement("button"),this._input.type="button",this._input.className="glw-input",this._input.setAttribute("aria-haspopup","dialog"),this._input.appendChild(y("glw-input__icon",M)),this._inputVal=document.createElement("span"),this._inputVal.className="glw-input__value",this._input.appendChild(this._inputVal),this._input.addEventListener("click",()=>this._toggle()),this._panel=document.createElement("div"),this._panel.className="glw-panel",this._panel.setAttribute("role","dialog"),this._panel.setAttribute("aria-label","Choose date");const i=document.createElement("div");i.className="glw-head";const s=document.createElement("button");s.type="button",s.className="glw-nav",s.setAttribute("aria-label","Previous month"),s.appendChild(y(null,N)),s.addEventListener("click",()=>this._setView(C(this._view,-1))),this._title=document.createElement("button"),this._title.type="button",this._title.className="glw-title",this._title.title="Go to today",this._title.addEventListener("click",()=>this._goToday());const n=document.createElement("button");n.type="button",n.className="glw-nav",n.setAttribute("aria-label","Next month"),n.appendChild(y(null,O)),n.addEventListener("click",()=>this._setView(C(this._view,1))),i.append(s,this._title,n),this._week=document.createElement("div"),this._week.className="glw-week",this._week.setAttribute("aria-hidden","true"),this._grid=document.createElement("div"),this._grid.className="glw-grid",this._grid.setAttribute("role","grid"),this._grid.tabIndex=0,this._grid.addEventListener("keydown",r=>this._onKey(r)),this._grid.addEventListener("click",r=>{const l=r.target.closest(".glw-day");l&&this._pick(this._cells[+l.dataset.i])}),this._grid.addEventListener("pointerover",r=>{const l=r.target.closest(".glw-day");l&&this._onHover(this._cells[+l.dataset.i].iso)}),this._grid.addEventListener("pointerleave",()=>{this._hoverISO!=null&&(this._hoverISO=null,this._paint())}),this._panel.append(i,this._week,this._grid),this._root.append(this._input,this._panel),t.append(e,this._root),this._onDocDown=r=>{this._open&&!r.composedPath().includes(this)&&this._close()}}connectedCallback(){I(this,this.getAttribute("color")),this._seed(this.getAttribute("value")),this._focusISO=this._single||this._rangeStart||this._multi[0]||h,this._seedView(),this._update(),document.addEventListener("pointerdown",this._onDocDown,!0)}disconnectedCallback(){document.removeEventListener("pointerdown",this._onDocDown,!0)}attributeChangedCallback(t,e,i){if(I(this,this.getAttribute("color")),!!this.isConnected){if(t==="value"){if(this._reflecting)return;this._seed(i),this._seedView(),this._focusISO=this._single||this._rangeStart||this._multi[0]||h}this._update()}}get value(){const t=this._attr("mode","single");return t==="single"?this._single:t==="multiple"?[...this._multi]:[this._rangeStart,this._rangeEnd].filter(e=>e!=null)}set value(t){this._seed(t),this._seedView(),this._focusISO=this._single||this._rangeStart||this._multi[0]||h,this.isConnected&&this._update()}_attr(t,e){return this.getAttribute(t)??e}_disabled(){return this.hasAttribute("disabled")}_seed(t){if(t==null)return;const e=this._attr("mode","single"),i=s=>Array.isArray(s)?[...s]:s?String(s).split(",").map(n=>n.trim()).filter(Boolean):[];if(e==="single")this._single=typeof t=="string"?t:t[0]??"";else if(e==="multiple")this._multi=i(t);else{const s=i(t);this._rangeStart=s[0]??null,this._rangeEnd=s[1]??null}}_seedView(){const t=this._single||this._rangeStart||this._multi[0]||h;this._view=_(g(t))}_reflectValue(){this._attr("mode","single")==="single"&&(this._reflecting=!0,this._single?this.setAttribute("value",this._single):this.removeAttribute("value"),this._reflecting=!1)}_rangeBounds(){const t=this._rangeStart,e=this._rangeEnd??(t&&!this._rangeEnd?this._hoverISO:null);return!t||!e?null:t<=e?[t,e]:[e,t]}_cellState(t){const e=this._attr("mode","single");if(e==="single")return{selected:t===this._single,start:!1,end:!1,inRange:!1};if(e==="multiple")return{selected:this._multi.includes(t),start:!1,end:!1,inRange:!1};const i=this._rangeBounds(),s=t===this._rangeStart;if(!i)return{selected:s,start:s,end:s,inRange:!1};const[n,r]=i;return{selected:t===n||t===r,start:t===n,end:t===r,inRange:t>n&&t<r}}_update(){this._syncStatic(),this._renderHead(),this._renderGrid(),this._paint(),this._updateInput(),this._syncOpen()}_syncStatic(){const t=this._attr("size","md"),e=this._attr("radius","squircle"),i=this._attr("glow","true")!=="false";let s=`glw-root glw--${t} glw--r-${e}`;i||(s+=" glw--noglow"),this._disabled()&&(s+=" is-disabled"),this._root.className=s;const n=this._attr("display","inline")==="popover";this._input.hidden=!n,this._panel.classList.toggle("glw-panel--float",n)}_renderHead(){const t=this._attr("locale","en-US");this._title.textContent=new Intl.DateTimeFormat(t,{month:"long",year:"numeric"}).format(this._view);const e=this._attr("week-start","mon")==="sun"?0:1,i=_(this._view),s=m(i,-((i.getDay()-e+7)%7)),n=new Intl.DateTimeFormat(t,{weekday:"short"});this._week.textContent="";for(let r=0;r<7;r++){const l=document.createElement("span");l.className="glw-week__cell",l.textContent=n.format(m(s,r)),this._week.appendChild(l)}}_renderGrid(){const t=_(this._view),e=this._attr("week-start","mon")==="sun"?0:1,i=m(t,-((t.getDay()-e+7)%7)),s=this._view.getMonth(),n=this._attr("locale","en-US"),r=new Intl.DateTimeFormat(n,{dateStyle:"full"}),l=this._attr("min",""),d=this._attr("max","");this._cells=[],this._btns=[],this._grid.textContent="";for(let o=0;o<6;o++){const p=document.createElement("div");p.className="glw-row",p.setAttribute("role","row");for(let w=0;w<7;w++){const k=o*7+w,u=m(i,k),b=S(u),E=l&&b<l||d&&b>d,v={date:u,iso:b,day:u.getDate(),inMonth:u.getMonth()===s,today:b===h,disabled:E,label:r.format(u)+(E?", unavailable":"")},c=document.createElement("button");c.type="button",c.setAttribute("role","gridcell"),c.tabIndex=-1,c.dataset.i=k,c.setAttribute("aria-label",v.label);const x=document.createElement("span");x.className="glw-day__n",x.textContent=String(v.day),c.appendChild(x),p.appendChild(c),this._cells.push(v),this._btns.push(c)}this._grid.appendChild(p)}}_paint(){const t=this._disabled();for(let e=0;e<this._btns.length;e++){const i=this._cells[e],s=this._btns[e],n=this._cellState(i.iso);let r="glw-day";n.selected&&(r+=" selected"),n.start&&(r+=" start"),n.end&&(r+=" end"),n.inRange&&(r+=" inRange"),i.inMonth||(r+=" is-out"),i.today&&(r+=" is-today"),i.disabled&&(r+=" is-disabled"),i.iso===this._focusISO&&(r+=" is-focus"),s.className=r,s.disabled=t||i.disabled,s.setAttribute("aria-selected",String(n.selected)),i.today?s.setAttribute("aria-current","date"):s.removeAttribute("aria-current")}}_updateInput(){const t=this._displayText();this._inputVal.textContent=t||this._attr("placeholder","Pick a date"),this._inputVal.classList.toggle("is-placeholder",!t)}_displayText(){const t=new Intl.DateTimeFormat(this._attr("locale","en-US"),{dateStyle:"medium"}),e=this._attr("mode","single");if(e==="single")return this._single?t.format(g(this._single)):"";if(e==="multiple")return this._multi.length?this._multi.length<=2?this._multi.map(n=>t.format(g(n))).join(", "):`${this._multi.length} dates`:"";if(!this._rangeStart)return"";const i=t.format(g(this._rangeStart)),s=this._rangeEnd?t.format(g(this._rangeEnd)):"…";return`${i} – ${s}`}_setView(t){this._view=_(t),this._renderHead(),this._renderGrid(),this._paint()}_goToday(){this._focusISO=h,this._setView(new Date)}_pick(t){if(this._disabled()||t.disabled)return;const e=!t.inMonth;this._focusISO=t.iso;const i=this._attr("mode","single"),s=this._attr("display","inline")==="popover";if(i==="single")this._single=t.iso,this._reflectValue(),this._emit(t.iso,t.iso),s&&this._close();else if(i==="multiple"){const n=this._multi.indexOf(t.iso);this._multi=n>=0?this._multi.filter(r=>r!==t.iso):[...this._multi,t.iso].sort(),this._emit([...this._multi],t.iso)}else!this._rangeStart||this._rangeStart&&this._rangeEnd?(this._rangeStart=t.iso,this._rangeEnd=null,this._hoverISO=null):(t.iso<this._rangeStart?(this._rangeEnd=this._rangeStart,this._rangeStart=t.iso):this._rangeEnd=t.iso,this._emit([this._rangeStart,this._rangeEnd],t.iso),s&&this._close());e?this._setView(t.date):this._paint(),this._updateInput()}_onHover(t){this._attr("mode","single")==="range"&&this._rangeStart&&!this._rangeEnd&&this._hoverISO!==t&&(this._hoverISO=t,this._paint())}_emit(t,e){for(const i of["select","change"])this.dispatchEvent(new CustomEvent(i,{bubbles:!0,composed:!0,detail:{value:t,date:e}}))}_onKey(t){if(!this._disabled())switch(t.key){case"ArrowLeft":t.preventDefault(),this._moveFocus(-1);break;case"ArrowRight":t.preventDefault(),this._moveFocus(1);break;case"ArrowUp":t.preventDefault(),this._moveFocus(-7);break;case"ArrowDown":t.preventDefault(),this._moveFocus(7);break;case"Home":t.preventDefault(),this._goToday();break;case"Enter":case" ":{t.preventDefault();const e=this._cells.find(i=>i.iso===this._focusISO);e&&this._pick(e);break}case"Escape":this._attr("display","inline")==="popover"&&this._open&&(t.preventDefault(),this._close());break}}_moveFocus(t){const e=m(g(this._focusISO),t);this._focusISO=S(e),e.getMonth()!==this._view.getMonth()||e.getFullYear()!==this._view.getFullYear()?this._setView(e):this._paint()}_toggle(){this._disabled()||(this._open=!this._open,this._syncOpen())}_close(){this._open=!1,this._syncOpen()}_syncOpen(){const t=this._attr("display","inline")==="popover";this._panel.hidden=t&&!this._open,t&&this._input.setAttribute("aria-expanded",String(this._open))}}customElements.define("vs-calendar-glow",H);
