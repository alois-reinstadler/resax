const d="http://www.w3.org/2000/svg";let w=0;const m=["iOS","macOS","tvOS"],_=560,x=440,v=26,E=`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /* Apple's control curve, and the springier one used on the way out. */
    --sb-ease: cubic-bezier(0.32, 0.72, 0, 1);
    --sb-spring: cubic-bezier(0.34, 1.26, 0.4, 1);
  }
  :host([hidden]) { display: none; }

  .sb {
    --h: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: 18px;
    --r: 999px;
    /* fill = the liquid; on-fill = the readable colour of a label over it */
    --fill: var(--btn-secondary-bg, #1a1a1a);
    --on-fill: var(--inp-text, #ededed);
    --ring: var(--fx-tint, 255 255 255);
    /* both travel times are overridable from outside (--sb-open-ms /
       --sb-close-ms), which is also the only way to slow the liquid down
       enough to look at it frame by frame */
    --open-ms: var(--sb-open-ms, ${_}ms);
    --close-ms: var(--sb-close-ms, ${x}ms);
    --dur: var(--open-ms);
    --ease: var(--sb-spring);
    position: relative;
    height: var(--h);
    font-family: inherit;
    font-size: var(--fs);
    line-height: 1;
  }
  .sb--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: 14px; }
  .sb--md { --h: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 14px); --px: 18px; }
  .sb--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: 22px; }

  /* radius — the blob and every button share it */
  .sb--r-none { --r: 0px; }
  .sb--r-subtle { --r: 10px; }
  .sb--r-rounded { --r: 14px; }
  .sb--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .sb--r-squircle { --r: calc(var(--h) * 0.5); }
    .sb--r-squircle .sb__blob { corner-shape: squircle; }
  }

  /* tones — recolour the liquid, its on-colour and the focus ring */
  .sb--t-danger  { --fill: #ff6369; --on-fill: #2a0c0e; --ring: 255 99 105; }
  .sb--t-warn    { --fill: #ffb224; --on-fill: #2a1c02; --ring: 255 178 36; }
  .sb--t-success { --fill: #4cc38a; --on-fill: #06231a; --ring: 76 195 138; }

  /* ── The stage: width is the only thing that reflows, and both layers are
     positioned from its CENTRE, so the group stays coherent while it grows. ── */
  .sb__stage {
    position: relative;
    height: 100%;
    width: 0;
    transition: width var(--dur) var(--ease);
  }
  .sb.is-closing { --dur: var(--close-ms); --ease: var(--sb-ease); }

  /* ── Liquid layer (behind the labels) ── */
  .sb__goo {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 200ms ease;
  }
  .sb.is-ready .sb__goo { opacity: 1; }
  /* Plain holder. The stickiness is NOT a CSS blur — it's the filter's own
     stdDeviation, ramped from JS so it is zero whenever the group is at rest
     (see #rampGoo). A constant blur left the pills welded together and their
     edges soft even when nothing was moving. */
  .sb__soft { position: absolute; inset: 0; }

  .sb__slot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--w, 0px);
    height: var(--h);
    transform: translate(calc(-50% + var(--x, 0px)), -50%);
    transition:
      transform var(--dur) var(--ease) var(--d, 0ms),
      width var(--dur) var(--ease) var(--d, 0ms);
  }
  .sb__blob {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: var(--r);
    background: var(--fill);
    transform-origin: 50% 50%;
    transition: background 200ms ease;
  }
  /* the squish rides on the INNER node so it never fights the slot's transform */
  .sb__stage.is-moving .sb__blob {
    animation: sb-liquid var(--dur) var(--sb-ease) var(--d, 0ms);
  }
  @keyframes sb-liquid {
    0%   { transform: scale(1, 1); }
    28%  { transform: scale(1.12, 0.86); }
    64%  { transform: scale(0.97, 1.05); }
    100% { transform: scale(1, 1); }
  }
  .sb__slot.is-hot .sb__blob { filter: brightness(1.14); }
  /* keyboard focus: NO ring, no outline, nothing drawn around the shape — the
     blob itself just shifts towards the label's colour. Reads on any tone and
     in both themes, and never looks like a stray border on the liquid. */
  .sb__slot.is-focus .sb__blob {
    background: color-mix(in srgb, var(--fill) 82%, var(--on-fill));
  }
  .sb__slot.is-selected .sb__blob { box-shadow: 0 0 0 1px rgb(var(--ring) / 0.5) inset; }

  /* ── Label layer (above the liquid, never filtered — text stays crisp) ── */
  .sb__layer { position: absolute; inset: 0; }

  .sb__btn {
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: var(--h);
    padding: 0 var(--px);
    margin: 0;
    border: 0;
    border-radius: var(--r);
    background: transparent;
    color: var(--on-fill);
    font: inherit;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transform: translate(calc(-50% + var(--x, 0px)), -50%);
    /* A label RESOLVES: it comes in out of focus and sharpens as it settles.
       Safe here only because the two label sets never overlap in time — a
       blurred label on top of a sharp one is what read as mush before. */
    filter: blur(0px);
    transition:
      transform var(--dur) var(--ease) var(--d, 0ms),
      opacity 220ms var(--sb-ease) var(--ld, 0ms),
      scale 320ms var(--sb-spring) var(--ld, 0ms),
      filter 300ms var(--sb-ease) var(--ld, 0ms);
  }
  /* No ring drawn AROUND the button: a hard outline on top of a liquid pill
     reads as a stray border. Keyboard focus is marked on the blob itself
     (.sb__slot.is-focus below), which is the shape the user actually sees. */
  .sb__btn:focus-visible { outline: none; box-shadow: none; }
  /* the collapsed trigger has no blob of its own — it sits over the whole
     pill, so focusing it tints every slice at once (same treatment, one shape) */
  .sb__btn:active:not(:disabled) { scale: 0.96; }
  .sb__back { padding: 0; width: var(--h); }
  .sb__back svg { width: 18px; height: 18px; display: block; }

  /* hidden set: faded down, out of the tab order and untouchable. It leaves
     FASTER than the incoming set arrives — a clean handover, never two labels
     dissolving through each other in the same box. */
  .sb__btn.is-off {
    opacity: 0;
    scale: 0.86;
    /* it dissolves rather than cuts: the blur outruns the fade, so the last
       thing on screen is a soft smear of the word, not a hard edge popping */
    filter: blur(6px);
    pointer-events: none;
    transition:
      transform var(--dur) var(--ease) var(--d, 0ms),
      opacity 110ms var(--sb-ease) var(--ld, 0ms),
      scale 220ms var(--sb-ease) var(--ld, 0ms),
      filter 170ms var(--sb-ease) var(--ld, 0ms);
  }

  .sb.is-disabled { opacity: 0.5; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .sb__stage, .sb__slot, .sb__btn { transition-duration: 1ms; transition-delay: 0ms; }
    .sb__stage.is-moving .sb__blob { animation: none; }
    .sb__btn, .sb__btn.is-off { filter: none; }
  }
`;let f;function A(u){if(f||=document.createElement("canvas").getContext("2d"),!f)return null;f.fillStyle="#000",f.fillStyle=u;const t=f.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function y(u,t){const e=t?A(String(t).trim()):null;if(!e){for(const o of k)u.style.removeProperty(o);return}const s=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),i=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(o=>Math.round(i?o*.92:o+(255-o)*.16)),l=(o,b)=>u.style.setProperty(o,b);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(o,n);l("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(o,e.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(o,i?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])l(o,i?"0 0 0":"255 255 255");l("--vs-color",n),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class S extends HTMLElement{static observedAttributes=["label","items","size","radius","tone","gap","goo","goo-strength","open","collapse-on-select","disabled","color"];#o;#l;#d;#_;#p;#t;#s;#b;#N;#a=m;#i=[];#x=[];#r=[];#e=!1;#u=-1;#n=0;#w=!1;#C=!1;#f=0;#h=0;#$=!1;#E=null;#q=()=>this.#S();#F=t=>this.#K(t);constructor(){super(),this.#N=`vssplitbutton-${++w}`;const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=E,this.#o=document.createElement("div"),this.#o.className="sb",this.#l=document.createElement("div"),this.#l.className="sb__stage",this.#d=document.createElement("div"),this.#d.className="sb__goo",this.#d.setAttribute("aria-hidden","true"),this.#_=document.createElement("div"),this.#_.className="sb__soft",this.#d.append(this.#_),this.#p=document.createElement("div"),this.#p.className="sb__layer",this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="sb__btn sb__trigger",this.#t.addEventListener("click",s=>this.#P(!0,s.detail===0)),this.#t.addEventListener("focus",()=>this.#c(-1,!0,this.#t)),this.#t.addEventListener("blur",()=>this.#c(-1,!1,this.#t)),this.#s=document.createElement("button"),this.#s.type="button",this.#s.className="sb__btn sb__back",this.#s.setAttribute("aria-label","Back"),this.#s.append(this.#D()),this.#s.addEventListener("click",s=>this.#P(!1,s.detail===0)),this.#s.addEventListener("pointerenter",()=>this.#A(0,!0)),this.#s.addEventListener("pointerleave",()=>this.#A(0,!1)),this.#s.addEventListener("focus",()=>this.#c(0,!0,this.#s)),this.#s.addEventListener("blur",()=>this.#c(0,!1,this.#s)),this.#p.append(this.#t,this.#s),this.#l.append(this.#d,this.#p),this.#o.append(this.#l,this.#j()),t.append(e,this.#o),this.addEventListener("keydown",this.#F)}connectedCallback(){y(this,this.getAttribute("color")),this.#w=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.#e=this.#m("open"),this.#M(),this.#y(),this.#L(),this.#C=!0,this.#o.classList.add("is-ready"),window.addEventListener("resize",this.#q),typeof ResizeObserver<"u"&&(this.#E=new ResizeObserver(()=>this.#S()),this.#E.observe(this.#t)),document.fonts?.ready.then(()=>this.#S()).catch(()=>{})}disconnectedCallback(){window.removeEventListener("resize",this.#q),this.removeEventListener("keydown",this.#F),this.#E?.disconnect(),this.#E=null,this.#f&&(cancelAnimationFrame(this.#f),this.#f=0),this.#n&&(cancelAnimationFrame(this.#n),this.#n=0),this.#h&&(clearTimeout(this.#h),this.#h=0)}attributeChangedCallback(t){if(y(this,this.getAttribute("color")),!(!this.#o||this.#$)){if(t==="items"&&this.#M(),t==="open"){const e=this.#m("open");if(e!==this.#e){this.#v(e);return}}this.#y(),this.#z(),this.#S()}}get items(){return this.#a}set items(t){const e=Array.isArray(t)?t.map(String).filter(Boolean):[];this.#a=e.length?e:m,this.#u=-1,this.#o&&(this.#M(!0),this.#y(),this.#L())}get open(){return this.#e}set open(t){this.#v(!!t)}get selected(){return this.#u}#g(t,e){return this.getAttribute(t)??e}#m(t){const e=this.getAttribute(t);return e!==null&&e!=="false"}#O(t,e){const s=parseFloat(this.getAttribute(t));return Number.isFinite(s)?s:e}#G(){const t=this.getAttribute("goo");return t===null||t!=="false"}#B(){const t=this.getAttribute("collapse-on-select");return t===null||t!=="false"}#I(){const t=this.getAttribute("items");if(!t)return m;const e=t.split(",").map(s=>s.trim()).filter(Boolean);return e.length?e:m}#R(){const t=this.#g("size","md"),e=t==="sm"?.8:t==="lg"?1.2:1;return this.#O("goo-strength",9)*e}#j(){const t=document.createElementNS(d,"svg");t.setAttribute("width","0"),t.setAttribute("height","0"),t.setAttribute("aria-hidden","true"),t.setAttribute("focusable","false"),t.style.position="absolute",t.style.width="0",t.style.height="0";const e=document.createElementNS(d,"defs"),s=document.createElementNS(d,"filter");s.setAttribute("id",this.#N),s.setAttribute("x","-25%"),s.setAttribute("y","-80%"),s.setAttribute("width","150%"),s.setAttribute("height","260%"),s.setAttribute("color-interpolation-filters","sRGB"),this.#b=document.createElementNS(d,"feGaussianBlur"),this.#b.setAttribute("in","SourceGraphic"),this.#b.setAttribute("stdDeviation",String(this.#R())),this.#b.setAttribute("result","blur");const r=document.createElementNS(d,"feColorMatrix");r.setAttribute("in","blur"),r.setAttribute("mode","matrix"),r.setAttribute("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"),r.setAttribute("result","goo");const i=document.createElementNS(d,"feComposite");return i.setAttribute("in","SourceGraphic"),i.setAttribute("in2","goo"),i.setAttribute("operator","atop"),s.append(this.#b,r,i),e.append(s),t.append(e),t}#D(){const t=document.createElementNS(d,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");const e=document.createElementNS(d,"path");return e.setAttribute("d","M15 5 L8 12 L15 19"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.8"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t.append(e),t}#M(t){const e=t?this.#a:this.#I();if(!t&&e.join("\0")===this.#a.join("\0")&&this.#r.length)return;this.#a=e;for(const r of this.#r)r.remove();for(const r of this.#i)r.remove();this.#r=[],this.#i=[];const s=this.#a.length+1;for(let r=0;r<s;r++){const i=document.createElement("i");i.className="sb__slot";const n=document.createElement("i");n.className="sb__blob",i.append(n),this.#_.append(i),this.#i.push(i)}this.#a.forEach((r,i)=>{const n=document.createElement("button");n.type="button",n.className="sb__btn sb__item",n.textContent=r,n.dataset.index=String(i),n.addEventListener("click",()=>this.#V(i)),n.addEventListener("pointerenter",()=>this.#A(i+1,!0)),n.addEventListener("pointerleave",()=>this.#A(i+1,!1)),n.addEventListener("focus",()=>this.#c(i+1,!0,n)),n.addEventListener("blur",()=>this.#c(i+1,!1,n)),this.#p.append(n),this.#r.push(n)}),this.#x=[this.#s,...this.#r]}#A(t,e){this.#i[t]?.classList.toggle("is-hot",!!e&&this.#e)}#c(t,e,s){const r=!!e&&(!s||s.matches(":focus-visible"));if(t<0){for(const i of this.#i)i.classList.toggle("is-focus",r&&!this.#e);return}this.#i[t]?.classList.toggle("is-focus",r&&this.#e)}#W(){const t=this.shadowRoot.activeElement;for(const s of this.#i)s.classList.remove("is-focus");if(!t)return;const e=t===this.#t?-1:this.#x.indexOf(t);e>=-1&&this.#c(e,!0,t)}#P(t,e){this.#m("disabled")||this.#v(t,e)}#v(t,e){if(t===this.#e)return;this.#e=t,this.#$=!0,t?this.setAttribute("open",""):this.removeAttribute("open"),this.#$=!1;const s=this.#T(t);if(this.#L(),this.#y(),this.#W(),this.#H(s),this.dispatchEvent(new CustomEvent("vs-toggle",{detail:{open:t},bubbles:!0})),!e||this.#w)return;const r=t?this.#r[0]:this.#t;setTimeout(()=>r?.focus(),t?120:60)}#V(t){this.#m("disabled")||(this.#u=t,this.dispatchEvent(new CustomEvent("vs-select",{detail:{index:t,value:this.#a[t]},bubbles:!0})),this.#B()?this.#v(!1):this.#y())}#T(t){const e=getComputedStyle(this.#o).getPropertyValue(t?"--open-ms":"--close-ms").trim(),s=parseFloat(e);return Number.isFinite(s)?/ms$/.test(e)?s:s*1e3:t?_:x}#H(t){if(this.#w)return;const e=this.#l;this.#U(t+v*this.#i.length),e.classList.remove("is-moving"),e.offsetWidth,e.classList.add("is-moving"),this.#h&&clearTimeout(this.#h),this.#h=setTimeout(()=>{e.classList.remove("is-moving"),this.#h=0},t+v*this.#i.length+60)}#K(t){if(this.#m("disabled"))return;if(t.key==="Escape"&&this.#e){t.preventDefault(),this.#v(!1,!0);return}if(!this.#e)return;const e=this.#r.indexOf(this.shadowRoot.activeElement);if(e<0)return;const s=this.#r.length-1;let r=-1;t.key==="ArrowRight"?r=e===s?0:e+1:t.key==="ArrowLeft"?r=e===0?s:e-1:t.key==="Home"?r=0:t.key==="End"&&(r=s),!(r<0)&&(t.preventDefault(),this.#r[r].focus())}#y(){const t=this.#g("size","md"),e=this.#g("radius","pill"),s=this.#g("tone","default"),r=this.#m("disabled");this.#o.className=`sb sb--${t} sb--r-${e} sb--t-${s}`+(this.#C?" is-ready":"")+(this.#e?" is-open":" is-closing")+(r?" is-disabled":""),this.#t.textContent=this.#g("label","New Project"),this.#t.setAttribute("aria-expanded",String(this.#e)),this.#t.classList.toggle("is-off",this.#e),this.#t.tabIndex=this.#e?-1:0,this.#t.disabled=r;for(const i of this.#x)i.classList.toggle("is-off",!this.#e),i.tabIndex=this.#e?0:-1,i.disabled=r;this.#r.forEach((i,n)=>{i.setAttribute("aria-pressed",String(n===this.#u))}),this.#i.forEach((i,n)=>{i.classList.toggle("is-selected",this.#e&&this.#u>=0&&n-1===this.#u),this.#e||i.classList.remove("is-hot")}),this.#z()}#z(){this.#n||this.#k(0)}#k(t){const e=t>.15;this.#b?.setAttribute("stdDeviation",t.toFixed(2)),this.#d.style.filter=e?`url(#${this.#N})`:"none"}#U(t){if(this.#n&&(cancelAnimationFrame(this.#n),this.#n=0),!this.#G()||this.#w){this.#k(0);return}const e=this.#R(),s=performance.now(),r=i=>{const n=Math.min(1,(i-s)/t);if(this.#k(e*Math.sin(Math.PI*n)**.7),n<1){this.#n=requestAnimationFrame(r);return}this.#n=0,this.#k(0)};this.#n=requestAnimationFrame(r)}#J(){const t=this.#t.offsetWidth,e=this.#s.offsetWidth,s=this.#r.map(a=>a.offsetWidth);if(!t||!e||s.some(a=>!a))return null;const r=Math.max(0,this.#O("gap",8)),i=[e,...s],n=i.reduce((a,h)=>a+h,0)+r*(i.length-1);let c=-n/2;const l=i.map(a=>{const h=c+a/2;return c+=a+r,{cx:h,w:a}}),o=l.map((a,h)=>h).sort((a,h)=>Math.abs(l[a].cx)-Math.abs(l[h].cx)),b=[];return o.forEach((a,h)=>{b[a]=h}),{trigW:t,total:n,slots:l,rank:b,last:l.length-1}}#S(){this.#f||(this.#f=requestAnimationFrame(()=>{this.#f=0,this.#L()}))}#L(){const t=this.#J();if(!t)return;const e=this.#e,s=this.#T(e);this.#l.style.width=`${(e?t.total:t.trigW).toFixed(2)}px`,this.#t.style.setProperty("--x","0px"),this.#t.style.setProperty("--ld",e?"0ms":`${Math.round(s*.62)}ms`);const r=t.trigW/t.total,i=this.#l.offsetHeight*.5;t.slots.forEach((n,c)=>{const l=(e?t.rank[c]:t.last-t.rank[c])*v;let o=n.cx,b=n.w;if(!e){let p=(n.cx-n.w/2)*r,g=(n.cx+n.w/2)*r;c>0&&(p-=i),c<t.last&&(g+=i),o=(p+g)/2,b=g-p}const a=this.#i[c];a&&(a.style.setProperty("--x",`${o.toFixed(2)}px`),a.style.setProperty("--w",`${b.toFixed(2)}px`),a.style.setProperty("--d",`${l}ms`));const h=this.#x[c];h&&(h.style.setProperty("--x",`${(e?n.cx:o).toFixed(2)}px`),h.style.setProperty("--d",`${l}ms`),h.style.setProperty("--ld",e?`${Math.round(s*.58)+l}ms`:"0ms"))})}}customElements.define("vs-split-button",S);
