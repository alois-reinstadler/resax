function v(i){let e=String(i).trim().replace(/^#/,"");return e.length===3&&(e=e.split("").map(t=>t+t).join("")),/^[0-9a-fA-F]{6}$/.test(e)?`#${e.toLowerCase()}`:null}const w=new Set;let A=0,E=0,M=!1,k=0,z=!1,L=null;function j(){if(k=0,!!M)for(const i of w){if(!i.visible)continue;if(i.disabled()){i.lastI!==0&&(i.el.style.setProperty("--glow","0"),i.lastI=0);continue}i.rect||(i.rect=i.el.getBoundingClientRect());const e=i.rect,t=Math.max(e.left,Math.min(A,e.right)),s=Math.max(e.top,Math.min(E,e.bottom)),a=Math.max(0,1-Math.hypot(A-t,E-s)/i.radius);a===0&&i.lastI===0||(i.el.style.setProperty("--gx",`${A-e.left}px`),i.el.style.setProperty("--gy",`${E-e.top}px`),i.el.style.setProperty("--glow",a.toFixed(3)),i.lastI=a)}}function q(i){A=i.clientX,E=i.clientY,M=!0,k||(k=requestAnimationFrame(j))}function N(){for(const i of w)i.rect=null;M&&!k&&(k=requestAnimationFrame(j))}function G(i,e,t){z||(z=!0,addEventListener("pointermove",q,{passive:!0}),addEventListener("scroll",N,{passive:!0,capture:!0}),addEventListener("resize",N,{passive:!0}),L=new IntersectionObserver(l=>{for(const f of l)for(const u of w)u.el===f.target&&(u.visible=f.isIntersecting,f.isIntersecting&&(u.rect=null))}));const s={el:i,radius:e,disabled:t,rect:null,visible:!0,lastI:0};w.add(s),L.observe(i);const a=D.add(i);return()=>{w.delete(s),L.unobserve(i),a()}}const T=["#ff6369","#ff8f6b","#ffb224","#ffd60a","#8ce99a","#4cc38a","#33b1c8","#0091ff","#6e56cf","#a970ff","#ec4899","#f472b6","#ededed","#a1a1a1","#525252","#111111"],D=globalThis[Symbol.for("vs-light")]||=(()=>{const i=new Set,e=110,t=1.6,s=1.7,a=34,l=72,f=[[.6,0],[.42,30],[.16,58],[0,82]],u=[[.6,0],[.27,42],[.08,66],[0,85]],h=[[.85,0],[.4,42],[.12,66],[0,84]];let n=0,x=null;const C=(d,r,c)=>{const p=r.w/2+d,b=r.h/2+d,g=r.h/2/b;return`radial-gradient(${p.toFixed(1)}px ${b.toFixed(1)}px at ${r.x.toFixed(1)}px ${r.y.toFixed(1)}px,`+c.map(([o,m])=>` rgb(${r.rgb} / ${(o*r.k).toFixed(3)}) ${((g+m/100*(1-g))*100).toFixed(1)}%`).join(",")+")"};function R(){const d=[];for(const r of document.querySelectorAll("[color],[data-lamp]")){const c=getComputedStyle(r),p=c.getPropertyValue("--vs-color-rgb").trim()||(r.hasAttribute("data-lamp")?(c.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");p&&d.push({el:r,rgb:p,rect:r.getBoundingClientRect()})}return d}function B(){if(n=0,!i.size)return;const d=R();for(const r of i){if(!r.visible)continue;if(!d.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}const c=r.el.getBoundingClientRect(),p=c.left+c.width/2,b=c.top+c.height/2,g=[];for(const o of d){if(o.el===r.el||o.el.contains(r.el)||r.el.contains(o.el))continue;const m=Math.max(o.rect.left,Math.min(p,o.rect.right)),S=Math.max(o.rect.top,Math.min(b,o.rect.bottom)),H=Math.max(c.left,Math.min(m,c.right)),O=Math.max(c.top,Math.min(S,c.bottom)),I=Math.max(0,1-Math.hypot(m-H,S-O)/e)**t*s;I&&g.push({rgb:o.rgb,k:Math.min(1,I),w:o.rect.width,h:o.rect.height,x:o.rect.left+o.rect.width/2-c.left,y:o.rect.top+o.rect.height/2-c.top})}if(!g.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}g.sort((o,m)=>o.k-m.k),r.el.style.setProperty("--lit-ring",g.flatMap(o=>[C(a,o,f),C(l,o,u)]).join(",")),r.el.style.setProperty("--lit-fill",g.map(o=>C(l,o,h)).join(",")),r.el.style.setProperty("--lit","1"),r.on=!0}}const _=()=>{n||(n=requestAnimationFrame(B))};return addEventListener("scroll",_,{passive:!0,capture:!0}),addEventListener("resize",_,{passive:!0}),globalThis.vsLight=_,{add(d){x||=new IntersectionObserver(c=>{for(const p of c)for(const b of i)b.el===p.target&&(b.visible=p.isIntersecting);_()});const r={el:d,visible:!0,on:!1};return i.add(r),x.observe(d),_(),()=>{i.delete(r),x.unobserve(d)}}}})(),Y=`
  :host { display: inline-block;
    --r: var(--ctrl-r-md, 12px);
    --accent: var(--inp-accent, #ededed);
    position: relative;
    color: var(--inp-text, #ededed);
    font: inherit; }
  :host([block]) { display: block; }
  :host([block]) .cc__trigger { width: 100%; }
  :host([hidden]) { display: none; }

  .cc__trigger {
    /* the light layers below are absolute against this box; without it they
       resolve against the host and the rim lands on the wrong rectangle */
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: var(--ctrl-h-md, 38px);
    padding: 0 10px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
    border-radius: var(--rr, var(--r));
    /* --cc-trigger-bg first: a panel that wants the swatch to sit on its own
       plate can clear this one without flattening the hex field in the popover,
       which is the other thing --bg-input paints. */
    background: var(--cc-trigger-bg, var(--bg-input, var(--bg-elevated, #1a1a1a)));
    color: var(--inp-text, #ededed);
    font: inherit;
    cursor: pointer;
    transition: border-color 160ms ease, background-color 160ms ease;
  }
  .cc__trigger:hover:not(:disabled) { border-color: var(--inp-border-hover, #3d3d3d); }
  .cc__trigger:focus-visible { outline: none; border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent); }
  :host([open]) .cc__trigger { border-color: var(--accent); }

  :host([size="sm"]) .cc__trigger { height: var(--ctrl-h-sm, 32px); font-size: var(--ctrl-fs-sm, 13px); }
  :host([size="lg"]) .cc__trigger { height: var(--ctrl-h-lg, 44px); font-size: var(--ctrl-fs-lg, 15px); }

  :host([radius="none"])    { --rr: 0px; }
  :host([radius="subtle"])  { --rr: 8px; }
  :host([radius="rounded"]) { --rr: 11px; }
  :host([radius="pill"])    { --rr: 999px; }
  @supports (corner-shape: squircle) {
    :host([radius="squircle"]) .cc__trigger { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }


  /* proximity glow rim (same shape as the shared FX_CSS in vs-fx.js) */
  .fx-glow {
    position: absolute; inset: var(--glow-inset, -1px); z-index: 1; border-radius: inherit;
    padding: var(--glow-ring, 1px); pointer-events: none;
    background:
      radial-gradient(var(--glow-r-core, 60px) circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.42) 30%, rgb(var(--fx-tint,255 255 255)/.16) 58%, rgb(var(--fx-tint,255 255 255)/0) 82%),
      radial-gradient(var(--glow-r-soft, 200px) circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.27) 42%, rgb(var(--fx-tint,255 255 255)/.08) 66%, rgb(var(--fx-tint,255 255 255)/0) 85%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude;
    opacity: calc(var(--glow,0) * var(--glow-strength,.4)); transition: opacity 140ms;
  }
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .cc__trigger::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .cc__trigger::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .cc__glow { --glow-strength: 0.5; --glow-ring: 1px; --glow-inset: -1px; border-radius: var(--rr, var(--r)); }
  .cc__swatch {
    flex: none;
    width: 18px;
    height: 18px;
    border-radius: 5px;
    border: 1px solid rgba(127, 127, 127, 0.3);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
  .cc__val { font-size: 13px; font-variant-numeric: tabular-nums; text-transform: lowercase; }
  .cc__caret {
    width: 13px; height: 13px; opacity: 0.6;
    transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  :host([open]) .cc__caret { transform: rotate(180deg); }

  .cc__pop {
    position: absolute;
    z-index: 20;
    top: calc(100% + 6px);
    left: 0;
    min-width: 192px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
    border-radius: 14px;
    background: var(--bg-card, #111);
    box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.6);
    transform-origin: top left;
    animation: cc-pop 180ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .cc__pop[hidden] { display: none; }
  @keyframes cc-pop {
    from { opacity: 0; transform: translateY(-6px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .cc__grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 5px;
  }
  .cc__cell {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 6px;
    border: 1px solid rgba(127, 127, 127, 0.25);
    background: var(--c);
    cursor: pointer;
    padding: 0;
    color: #fff;
    transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 150ms ease;
  }
  .cc__cell:hover { transform: scale(1.12); z-index: 1; }
  .cc__cell:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--accent); }
  .cc__cell.is-active { box-shadow: 0 0 0 2px var(--bg-card, #111), 0 0 0 4px var(--accent); }
  .cc__check {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: scale(0.5);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
    transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 140ms ease;
  }
  .cc__check svg { width: 62%; height: 62%; }
  .cc__cell.is-active .cc__check { opacity: 1; transform: scale(1); }

  .cc__field {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    height: 34px;
    padding: 0 10px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
    border-radius: 9px;
    background: var(--bg-input, var(--bg-elevated, #1a1a1a));
    transition: border-color 160ms ease;
  }
  .cc__field[hidden] { display: none; }
  .cc__field:focus-within { border-color: var(--accent); }
  .cc__hash { color: var(--inp-placeholder, #8b8b8b); }
  .cc__hex {
    flex: 1; min-width: 0; border: none; background: transparent;
    color: var(--inp-text, #ededed); font: inherit; font-size: 13px;
    font-variant-numeric: tabular-nums; text-transform: lowercase; outline: none;
  }

  :host([tone="danger"])  { --accent: #ff6369; }
  :host([tone="warn"])    { --accent: #ffb224; }
  :host([tone="success"]) { --accent: #4cc38a; }

  :host([disabled]) { opacity: 0.5; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .cc__trigger, .cc__caret, .cc__cell, .cc__check, .cc__field { transition: none; }
    .cc__pop { animation: none; }
    .cc__cell:hover { transform: none; }
  }
`,F="http://www.w3.org/2000/svg";function P(i,e){const t=document.createElementNS(F,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),i&&t.setAttribute("class",i),t.setAttribute("aria-hidden","true");for(const s of e){const a=document.createElementNS(F,"path");for(const l in s)a.setAttribute(l,s[l]);t.appendChild(a)}return t}let y;function K(i){if(y||=document.createElement("canvas").getContext("2d"),!y)return null;y.fillStyle="#000",y.fillStyle=i;const e=y.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const V=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function $(i,e){const t=e?K(String(e).trim()):null;if(!t){for(const n of V)i.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),l=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,f=`rgb(${t[0]} ${t[1]} ${t[2]})`,u=t.map(n=>Math.round(l?n*.92:n+(255-n)*.16)),h=(n,x)=>i.style.setProperty(n,x);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])h(n,f);h("--btn-primary-bg-hover",`rgb(${u[0]} ${u[1]} ${u[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])h(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])h(n,l?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])h(n,l?"0 0 0":"255 255 255");h("--vs-color",f),h("--vs-color-rgb",t.join(" ")),h("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class X extends HTMLElement{static observedAttributes=["value","disabled","size","radius","tone","show-inputs","glow","block","color"];#i;#l;#o;#d;#r;#s;#a;#t;#b=null;#h=[];#u=T.slice();#e="#6e56cf";#c=!1;#p;#f;#n=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=Y,this.#i=document.createElement("button"),this.#i.className="cc__trigger",this.#l=document.createElement("span"),this.#l.className="fx-glow cc__glow",this.#l.setAttribute("aria-hidden","true"),this.#i.type="button",this.#i.setAttribute("aria-haspopup","dialog"),this.#o=document.createElement("span"),this.#o.className="cc__swatch",this.#o.setAttribute("aria-hidden","true"),this.#d=document.createElement("span"),this.#d.className="cc__val";const s=P("cc__caret",[{d:"M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",stroke:"currentColor","stroke-width":"1.5","stroke-miterlimit":"10","stroke-linecap":"round","stroke-linejoin":"round"}]);this.#i.append(this.#l,this.#o,this.#d,s),this.#r=document.createElement("div"),this.#r.className="cc__pop",this.#r.setAttribute("role","dialog"),this.#r.setAttribute("aria-label","Choose color"),this.#r.hidden=!0,this.#s=document.createElement("div"),this.#s.className="cc__grid",this.#s.setAttribute("role","group"),this.#s.setAttribute("aria-label","Colors"),this.#a=document.createElement("div"),this.#a.className="cc__field";const a=document.createElement("span");a.className="cc__hash",a.setAttribute("aria-hidden","true"),a.textContent="#",this.#t=document.createElement("input"),this.#t.className="cc__hex",this.#t.type="text",this.#t.maxLength=6,this.#t.spellcheck=!1,this.#t.setAttribute("aria-label","Hex value"),this.#a.append(a,this.#t),this.#r.append(this.#s,this.#a),e.append(t,this.#i,this.#r),this.#i.addEventListener("click",()=>this.#A()),this.#t.addEventListener("input",()=>this.#w()),this.#t.addEventListener("blur",()=>this.#k()),this.#p=l=>{this.#c&&(l.composedPath().includes(this)||this.#x(!1))},this.#f=l=>{l.key==="Escape"&&this.#c&&this.#x(!1)},this.#_()}connectedCallback(){$(this,this.getAttribute("color"));const e=this.getAttribute("value"),t=e?v(e):null;t&&(this.#e=t),this.#m(),this.#g(),this.#b=G(this.#i,240,()=>this.hasAttribute("disabled")||this.getAttribute("glow")==="false")}disconnectedCallback(){this.#b?.(),this.#b=null,this.#n&&(document.removeEventListener("pointerdown",this.#p,!0),document.removeEventListener("keydown",this.#f,!0),this.#n=!1)}attributeChangedCallback(e,t,s){if($(this,this.getAttribute("color")),t!==s)if(e==="value"){const a=s?v(s):null;a&&a!==this.#e&&(this.#e=a,this.#m(),this.#g())}else e==="show-inputs"&&(this.#a.style.display=this.hasAttribute("show-inputs")?"":"none")}get value(){return this.#e}set value(e){const t=v(e);!t||t===this.#e||this.#v(t)}get swatches(){return this.#u.slice()}set swatches(e){Array.isArray(e)&&(this.#u=e.slice(),this.#_(),this.#g())}get presets(){return this.swatches}set presets(e){this.swatches=e}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#_(){this.#s.textContent="",this.#h=this.#u.map(e=>{const t=document.createElement("button");t.className="cc__cell",t.type="button",t.style.setProperty("--c",e),t.setAttribute("aria-label",e);const s=document.createElement("span");return s.className="cc__check",s.setAttribute("aria-hidden","true"),s.appendChild(P("",[{d:"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},{d:"M7.75 11.9999L10.58 14.8299L16.25 9.16992",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}])),t.appendChild(s),t.addEventListener("click",()=>this.#y(e)),this.#s.appendChild(t),t})}#m(){this.#o.style.background=this.#e,this.#d.textContent=this.#e,this.#i.setAttribute("aria-label",`Color ${this.#e}`),document.activeElement!==this.#t&&(this.#t.value=this.#e.replace(/^#/,""))}#g(){const e=this.#u.findIndex(t=>(v(t)||"")===this.#e);for(let t=0;t<this.#h.length;t++){const s=t===e;this.#h[t].classList.toggle("is-active",s),this.#h[t].setAttribute("aria-pressed",s?"true":"false")}}#v(e){const t=v(e);t&&(this.#e=t,this.getAttribute("value")!==t&&this.setAttribute("value",t),this.#m(),this.#g(),this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:{value:t}})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t}})))}#y(e){this.disabled||this.#v(e)}#w(){const e=v(this.#t.value);e&&this.#v(e)}#k(){this.#t.value=this.#e.replace(/^#/,"")}#A(){this.disabled||this.#x(!this.#c)}#x(e){e!==this.#c&&(this.#c=e,this.#r.hidden=!e,e?this.setAttribute("open",""):this.removeAttribute("open"),this.#i.setAttribute("aria-expanded",e?"true":"false"),e&&!this.#n?(document.addEventListener("pointerdown",this.#p,!0),document.addEventListener("keydown",this.#f,!0),this.#n=!0):!e&&this.#n&&(document.removeEventListener("pointerdown",this.#p,!0),document.removeEventListener("keydown",this.#f,!0),this.#n=!1))}}customElements.define("vs-color-picker-compact",X);
