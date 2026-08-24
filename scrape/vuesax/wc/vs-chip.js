const _=new Set;let C=0,E=0,L=!1,A=0,I=!1,M=null;function R(){if(A=0,!!L)for(const t of _){if(!t.visible)continue;if(t.disabled()){t.lastI!==0&&(t.el.style.setProperty("--glow","0"),t.lastI=0);continue}t.rect||(t.rect=t.el.getBoundingClientRect());const e=t.rect,i=Math.max(e.left,Math.min(C,e.right)),n=Math.max(e.top,Math.min(E,e.bottom)),h=Math.max(0,1-Math.hypot(C-i,E-n)/t.radius);h===0&&t.lastI===0||(t.el.style.setProperty("--gx",`${C-e.left}px`),t.el.style.setProperty("--gy",`${E-e.top}px`),t.el.style.setProperty("--glow",h.toFixed(3)),t.lastI=h)}}function O(t){C=t.clientX,E=t.clientY,L=!0,A||(A=requestAnimationFrame(R))}function z(){for(const t of _)t.rect=null;L&&!A&&(A=requestAnimationFrame(R))}function T(t,e,i){I||(I=!0,addEventListener("pointermove",O,{passive:!0}),addEventListener("scroll",z,{passive:!0,capture:!0}),addEventListener("resize",z,{passive:!0}),M=new IntersectionObserver(o=>{for(const c of o)for(const d of _)d.el===c.target&&(d.visible=c.isIntersecting,c.isIntersecting&&(d.rect=null))}));const n={el:t,radius:e,disabled:i,rect:null,visible:!0,lastI:0};_.add(n),M.observe(t);const h=V.add(t);return()=>{_.delete(n),M.unobserve(t),h()}}const V=globalThis[Symbol.for("vs-light")]||=(()=>{const t=new Set,e=110,i=1.6,n=1.7,h=34,o=72,c=[[.6,0],[.42,30],[.16,58],[0,82]],d=[[.6,0],[.27,42],[.08,66],[0,85]],p=[[.85,0],[.4,42],[.12,66],[0,84]];let s=0,b=null;const g=(u,r,l)=>{const f=r.w/2+u,v=r.h/2+u,m=r.h/2/v;return`radial-gradient(${f.toFixed(1)}px ${v.toFixed(1)}px at ${r.x.toFixed(1)}px ${r.y.toFixed(1)}px,`+l.map(([a,x])=>` rgb(${r.rgb} / ${(a*r.k).toFixed(3)}) ${((m+x/100*(1-m))*100).toFixed(1)}%`).join(",")+")"};function P(){const u=[];for(const r of document.querySelectorAll("[color],[data-lamp]")){const l=getComputedStyle(r),f=l.getPropertyValue("--vs-color-rgb").trim()||(r.hasAttribute("data-lamp")?(l.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");f&&u.push({el:r,rgb:f,rect:r.getBoundingClientRect()})}return u}function F(){if(s=0,!t.size)return;const u=P();for(const r of t){if(!r.visible)continue;if(!u.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}const l=r.el.getBoundingClientRect(),f=l.left+l.width/2,v=l.top+l.height/2,m=[];for(const a of u){if(a.el===r.el||a.el.contains(r.el)||r.el.contains(a.el))continue;const x=Math.max(a.rect.left,Math.min(f,a.rect.right)),$=Math.max(a.rect.top,Math.min(v,a.rect.bottom)),j=Math.max(l.left,Math.min(x,l.right)),B=Math.max(l.top,Math.min($,l.bottom)),S=Math.max(0,1-Math.hypot(x-j,$-B)/e)**i*n;S&&m.push({rgb:a.rgb,k:Math.min(1,S),w:a.rect.width,h:a.rect.height,x:a.rect.left+a.rect.width/2-l.left,y:a.rect.top+a.rect.height/2-l.top})}if(!m.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}m.sort((a,x)=>a.k-x.k),r.el.style.setProperty("--lit-ring",m.flatMap(a=>[g(h,a,c),g(o,a,d)]).join(",")),r.el.style.setProperty("--lit-fill",m.map(a=>g(o,a,p)).join(",")),r.el.style.setProperty("--lit","1"),r.on=!0}}const k=()=>{s||(s=requestAnimationFrame(F))};return addEventListener("scroll",k,{passive:!0,capture:!0}),addEventListener("resize",k,{passive:!0}),globalThis.vsLight=k,{add(u){b||=new IntersectionObserver(l=>{for(const f of l)for(const v of t)v.el===f.target&&(v.visible=f.isIntersecting);k()});const r={el:u,visible:!0,on:!1};return t.add(r),b.observe(u),k(),()=>{t.delete(r),b.unobserve(u)}}}})(),q=`
  :host { display: inline-flex; }
  :host([hidden]) { display: none; }

  .chip {
    --h: 28px;
    --px: 11px;
    --fs: 13px;
    --gap: 6px;
    --rr: 999px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --solid-fg: var(--badge-solid-fg, #0b0b0b);

    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    height: var(--h);
    padding: 0 var(--px);
    border: 1px solid transparent;
    border-radius: var(--rr);
    font: inherit;
    font-size: var(--fs);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    background: none;
    color: inherit;
    transition:
      transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1),
      border-color 200ms cubic-bezier(0.22, 1, 0.36, 1),
      background-color 200ms ease,
      color 200ms ease;
  }
  .chip.is-clickable { cursor: pointer; }

  /* sizes */
  .chip--sm { --h: 24px; --px: 9px; --fs: 12px; --gap: 5px; }
  .chip--lg { --h: 32px; --px: 14px; --fs: 14px; --gap: 7px; }

  /* radii */
  .chip--r-subtle { --rr: 7px; }
  .chip--r-rounded { --rr: 10px; }
  .chip--r-pill { --rr: 999px; }

  /* ── variants ───────────────────────────────────────────────── */
  .chip--v-soft {
    background: rgb(var(--ring) / 0.12);
    color: var(--inp-text, #ededed);
    border-color: rgb(var(--ring) / 0.2);
  }
  .chip--v-solid {
    background: rgb(var(--ring) / 0.9);
    color: var(--solid-fg);
    border-color: transparent;
  }
  .chip--v-outline {
    background: transparent;
    color: var(--inp-text, #ededed);
    border-color: rgb(var(--ring) / 0.45);
  }

  /* hover (clickable only) */
  .chip.is-clickable:hover:not(.is-disabled) { border-color: rgb(var(--ring) / 0.5); }
  .chip--v-soft.is-clickable:hover:not(.is-disabled) { background: rgb(var(--ring) / 0.2); }
  .chip:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

  /* selected → strong fill in the tone color */
  .chip.is-selected {
    background: rgb(var(--ring) / 0.95);
    color: var(--solid-fg);
    border-color: transparent;
  }
  /* selected + hover: keep the strong fill (otherwise the soft-variant hover
     rule reverts the bg to a translucent tint while the fg stays solid-fg,
     killing text contrast) */
  .chip.is-selected.is-clickable:hover:not(.is-disabled) {
    background: rgb(var(--ring) / 1);
    border-color: transparent;
  }

  /* dot / avatar / check */
  .chip__dot { width: 7px; height: 7px; border-radius: 999px; background: var(--accent); flex: 0 0 auto; }
  .chip.is-selected .chip__dot { background: currentColor; }
  .chip__avatar { display: inline-flex; margin-left: -3px; }
  .chip__avatar ::slotted(img),
  .chip__avatar ::slotted(*) { width: 1.45em; height: 1.45em; border-radius: 999px; object-fit: cover; }
  .chip__check { flex: 0 0 auto; margin-left: -1px; width: 1em; height: 1em; }
  .chip__label { position: relative; z-index: 2; }

  /* remove button */
  .chip__close {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    margin-right: -3px;
    padding: 0;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font-size: inherit;
    cursor: pointer;
    opacity: 0.65;
    transition: opacity 160ms ease, background-color 160ms ease;
  }
  .chip__close svg { width: 1em; height: 1em; display: block; }
  .chip__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.2); }
  .chip.is-selected .chip__close:hover:not(:disabled),
  .chip--v-solid .chip__close:hover:not(:disabled) { background: rgb(0 0 0 / 0.18); }
  .chip__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .chip__ripples, .chip__rm-ripples { border-radius: inherit; }

  /* proximity glow */
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .chip::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .chip::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .chip__glow {
    --glow-strength: 0.9;
    --glow-ring: 1px;
    --glow-inset: -1px;
    --glow-r-core: 50px;
    --glow-r-soft: 170px;
    border-radius: inherit;
  }

  /* ── tones ──────────────────────────────────────────────────── */
  .chip--t-danger {
    --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105;
    --tint: var(--inp-t-danger-hint, #ff8a8e); --solid-fg: #160405; }
  .chip--t-warn {
    --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36;
    --tint: var(--inp-t-warn-hint, #f5b544); --solid-fg: #160f02;
  }
  .chip--t-success {
    --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138;
    --tint: var(--inp-t-success-hint, #5fd49b); --solid-fg: #04120b;
  }

  /* disabled */
  .chip.is-disabled { opacity: 0.5; cursor: not-allowed; }
  .chip.is-disabled .chip__close { cursor: not-allowed; }

  /* ── proximity glow layer (soft feathered ring on the border, tunable) ── */
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

  /* ── ripple (droplet), tinted with --ring like the rest of the chip ──── */
  .fx-ripples { position: absolute; inset: 0; z-index: 0; border-radius: inherit; overflow: hidden; pointer-events: none; }
  .fx-ripple {
    position: absolute; z-index: 1; pointer-events: none; border-radius: 50%; transform: translate(-50%,-50%) scale(0);
    background: radial-gradient(circle, rgb(var(--ring,255 255 255)/.38) 0%, rgb(var(--ring,255 255 255)/.20) 24%, rgb(var(--ring,255 255 255)/.09) 44%, rgb(var(--ring,255 255 255)/.03) 60%, transparent 76%);
    opacity: 0; will-change: transform, opacity;
    animation: chip-rip 780ms cubic-bezier(.22,1,.36,1) forwards, chip-fade 780ms cubic-bezier(.25,.1,.25,1) forwards;
  }
  @keyframes chip-rip  { from { transform: translate(-50%,-50%) scale(0); } to { transform: translate(-50%,-50%) scale(1); } }
  @keyframes chip-fade { from { opacity: .8; } to { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    .chip, .chip__close { transition: none; }
    .fx-ripple { display: none; }
  }
`,G="http://www.w3.org/2000/svg";function y(t,e){const i=document.createElementNS(G,t);for(const n in e)i.setAttribute(n,e[n]);return i}function D(){const t=y("svg",{class:"chip__check",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"});return t.append(y("path",{d:"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),y("path",{d:"M7.75 11.9999L10.58 14.8299L16.25 9.16992",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),t}function H(){const t=y("svg",{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"});return t.append(y("path",{d:"M6 6L18 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"}),y("path",{d:"M18 6L6 18",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})),t}let w;function U(t){if(w||=document.createElement("canvas").getContext("2d"),!w)return null;w.fillStyle="#000",w.fillStyle=t;const e=w.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const i=e.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const X=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function N(t,e){const i=e?U(String(e).trim()):null;if(!i){for(const s of X)t.style.removeProperty(s);return}const n=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),o=.2126*n(i[0])+.7152*n(i[1])+.0722*n(i[2])>.45,c=`rgb(${i[0]} ${i[1]} ${i[2]})`,d=i.map(s=>Math.round(o?s*.92:s+(255-s)*.16)),p=(s,b)=>t.style.setProperty(s,b);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])p(s,c);p("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])p(s,i.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])p(s,o?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])p(s,o?"0 0 0":"255 255 255");p("--vs-color",c),p("--vs-color-rgb",i.join(" ")),p("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class Y extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","selectable","model-value","dot","removable","disabled","glow","color"];#t;#o;#i;#r;#n;#l;#a;#c;#e;#s;#p;#u;#b;#g;#f;#m;#d;constructor(){super();const e=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=q,this.#t=document.createElement("button"),this.#t.className="chip",this.#o=document.createElement("span"),this.#o.className="fx-glow chip__glow",this.#o.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="fx-ripples chip__ripples",this.#i.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="chip__avatar";const n=document.createElement("slot");n.name="avatar",this.#r.appendChild(n),this.#n=document.createElement("span"),this.#n.className="chip__dot",this.#n.setAttribute("aria-hidden","true"),this.#l=D(),this.#a=document.createElement("span"),this.#a.className="chip__label";const h=document.createElement("slot");this.#c=document.createTextNode(""),h.appendChild(this.#c),this.#a.appendChild(h),this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="chip__close",this.#s=document.createElement("span"),this.#s.className="fx-ripples chip__rm-ripples",this.#s.setAttribute("aria-hidden","true"),this.#e.append(this.#s,H()),this.#t.append(this.#o,this.#i,this.#r,this.#n,this.#l,this.#a,this.#e),e.append(i,this.#t),n.addEventListener("slotchange",()=>this.#h()),this.#u=o=>{this.hasAttribute("disabled")||!this.hasAttribute("selectable")||this.#v(this.#t,this.#i,o,.95)},this.#b=()=>{this.#t.style.transform=""},this.#t.addEventListener("pointerdown",this.#u);for(const o of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(o,this.#b);this.#p=()=>this.#x(),this.#t.addEventListener("click",this.#p),this.#g=o=>{this.hasAttribute("disabled")||(o.stopPropagation(),this.#v(this.#e,this.#s,o,.9))},this.#f=()=>{this.#e.style.transform=""},this.#e.addEventListener("pointerdown",this.#g);for(const o of["pointerup","pointerleave","pointercancel"])this.#e.addEventListener(o,this.#f);this.#m=o=>this.#y(o),this.#e.addEventListener("click",this.#m)}connectedCallback(){N(this,this.getAttribute("color")),this.#h(),this.#d=T(this.#t,160,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow"))}disconnectedCallback(){this.#d?.(),this.#d=null}attributeChangedCallback(){N(this,this.getAttribute("color")),this.#t&&this.#h()}get modelValue(){return this.hasAttribute("model-value")}set modelValue(e){e?this.setAttribute("model-value",""):this.removeAttribute("model-value")}get selectable(){return this.hasAttribute("selectable")}set selectable(e){e?this.setAttribute("selectable",""):this.removeAttribute("selectable")}get disabled(){return this.hasAttribute("disabled")}set disabled(e){e?this.setAttribute("disabled",""):this.removeAttribute("disabled")}#v(e,i,n,h){const o=e.getBoundingClientRect(),c=n.clientX-o.left,d=n.clientY-o.top,p=Math.max(c,o.width-c),s=Math.max(d,o.height-d),b=Math.hypot(p,s)*2,g=document.createElement("span");for(g.className="fx-ripple",g.style.cssText=`left:${c}px;top:${d}px;width:${b}px;height:${b}px`,g.addEventListener("animationend",()=>g.remove()),i.appendChild(g);i.childElementCount>6;)i.firstElementChild.remove();e.style.transform=`scale(${h})`}#x(){const e=this.hasAttribute("disabled"),i=this.hasAttribute("selectable");if(e||!i)return;const n=!this.hasAttribute("model-value");n?this.setAttribute("model-value",""):this.removeAttribute("model-value"),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:n})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:n}))}#y(e){this.hasAttribute("disabled")||(e.stopPropagation(),this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0})))}#h(){const e=(s,b)=>this.getAttribute(s)??b,i=this.hasAttribute("disabled"),n=this.hasAttribute("selectable"),h=this.hasAttribute("dot"),o=this.hasAttribute("removable"),c=n&&this.hasAttribute("model-value"),d=e("label","Chip"),p=this.querySelector('[slot="avatar"]')!=null;this.#t.className=["chip",`chip--${e("size","md")}`,`chip--v-${e("variant","soft")}`,`chip--r-${e("radius","pill")}`,`chip--t-${e("tone","default")}`,i?"is-disabled":"",c?"is-selected":"",n?"is-clickable":""].filter(Boolean).join(" "),n?(this.#t.type="button",this.#t.disabled=i,this.#t.setAttribute("aria-pressed",String(c)),this.#t.removeAttribute("tabindex")):(this.#t.removeAttribute("type"),this.#t.disabled=!1,this.#t.removeAttribute("aria-pressed"),this.#t.setAttribute("tabindex","-1"),this.#t.style.transform=""),this.#i.style.display=n?"":"none",this.#r.style.display=p?"":"none",this.#n.style.display=!p&&h?"":"none",this.#l.style.display=c?"":"none",this.#c.textContent=d,this.#e.style.display=o?"":"none",this.#e.disabled=i,this.#e.setAttribute("aria-label",`Remove ${d}`)}}customElements.define("vs-chip",Y);
