const E=new Set;let L=0,M=0,S=!1,A=0,I=!1,C=null;function N(){if(A=0,!!S)for(const n of E){if(!n.visible)continue;if(n.disabled()){n.lastI!==0&&(n.el.style.setProperty("--glow","0"),n.lastI=0);continue}n.rect||(n.rect=n.el.getBoundingClientRect());const t=n.rect,e=Math.max(t.left,Math.min(L,t.right)),r=Math.max(t.top,Math.min(M,t.bottom)),i=Math.max(0,1-Math.hypot(L-e,M-r)/n.radius);i===0&&n.lastI===0||(n.el.style.setProperty("--gx",`${L-t.left}px`),n.el.style.setProperty("--gy",`${M-t.top}px`),n.el.style.setProperty("--glow",i.toFixed(3)),n.lastI=i)}}function T(n){L=n.clientX,M=n.clientY,S=!0,A||(A=requestAnimationFrame(N))}function F(){for(const n of E)n.rect=null;S&&!A&&(A=requestAnimationFrame(N))}function B(n,t,e){I||(I=!0,addEventListener("pointermove",T,{passive:!0}),addEventListener("scroll",F,{passive:!0,capture:!0}),addEventListener("resize",F,{passive:!0}),C=new IntersectionObserver(l=>{for(const c of l)for(const d of E)d.el===c.target&&(d.visible=c.isIntersecting,c.isIntersecting&&(d.rect=null))}));const r={el:n,radius:t,disabled:e,rect:null,visible:!0,lastI:0};E.add(r),C.observe(n);const i=G.add(n);return()=>{E.delete(r),C.unobserve(n),i()}}const R=[{label:"Monthly",value:"monthly"},{label:"Yearly",value:"yearly"},{label:"Lifetime",value:"lifetime"}],G=globalThis[Symbol.for("vs-light")]||=(()=>{const n=new Set,t=110,e=1.6,r=1.7,i=34,l=72,c=[[.6,0],[.42,30],[.16,58],[0,82]],d=[[.6,0],[.27,42],[.08,66],[0,85]],a=[[.85,0],[.4,42],[.12,66],[0,84]];let s=0,h=null;const u=(b,o,f)=>{const x=o.w/2+b,_=o.h/2+b,y=o.h/2/_;return`radial-gradient(${x.toFixed(1)}px ${_.toFixed(1)}px at ${o.x.toFixed(1)}px ${o.y.toFixed(1)}px,`+f.map(([p,w])=>` rgb(${o.rgb} / ${(p*o.k).toFixed(3)}) ${((y+w/100*(1-y))*100).toFixed(1)}%`).join(",")+")"};function v(){const b=[];for(const o of document.querySelectorAll("[color],[data-lamp]")){const f=getComputedStyle(o),x=f.getPropertyValue("--vs-color-rgb").trim()||(o.hasAttribute("data-lamp")?(f.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");x&&b.push({el:o,rgb:x,rect:o.getBoundingClientRect()})}return b}function g(){if(s=0,!n.size)return;const b=v();for(const o of n){if(!o.visible)continue;if(!b.length){o.on&&(o.el.style.setProperty("--lit","0"),o.on=!1);continue}const f=o.el.getBoundingClientRect(),x=f.left+f.width/2,_=f.top+f.height/2,y=[];for(const p of b){if(p.el===o.el||p.el.contains(o.el)||o.el.contains(p.el))continue;const w=Math.max(p.rect.left,Math.min(x,p.rect.right)),$=Math.max(p.rect.top,Math.min(_,p.rect.bottom)),D=Math.max(f.left,Math.min(w,f.right)),O=Math.max(f.top,Math.min($,f.bottom)),z=Math.max(0,1-Math.hypot(w-D,$-O)/t)**e*r;z&&y.push({rgb:p.rgb,k:Math.min(1,z),w:p.rect.width,h:p.rect.height,x:p.rect.left+p.rect.width/2-f.left,y:p.rect.top+p.rect.height/2-f.top})}if(!y.length){o.on&&(o.el.style.setProperty("--lit","0"),o.on=!1);continue}y.sort((p,w)=>p.k-w.k),o.el.style.setProperty("--lit-ring",y.flatMap(p=>[u(i,p,c),u(l,p,d)]).join(",")),o.el.style.setProperty("--lit-fill",y.map(p=>u(l,p,a)).join(",")),o.el.style.setProperty("--lit","1"),o.on=!0}}const m=()=>{s||(s=requestAnimationFrame(g))};return addEventListener("scroll",m,{passive:!0,capture:!0}),addEventListener("resize",m,{passive:!0}),globalThis.vsLight=m,{add(b){h||=new IntersectionObserver(f=>{for(const x of f)for(const _ of n)_.el===x.target&&(_.visible=x.isIntersecting);m()});const o={el:b,visible:!0,on:!1};return n.add(o),h.observe(b),m(),()=>{n.delete(o),h.unobserve(b)}}}})(),j=`
  :host { display: inline-flex; }

  /* ── group container (VsRadioGroup) ── */
  .vrg { display: inline-flex; gap: 14px; }
  .vrg--vertical { flex-direction: column; align-items: flex-start; }
  .vrg--horizontal { flex-direction: row; align-items: center; gap: 22px; }

  /* ── option (VsRadio) ── */
  .vrd {
    --box: 20px;
    --fs: 14px;
    --accent: var(--inp-accent, #ededed);
    --on-fg: var(--bg, #0a0a0a);
    --ring: var(--inp-ring, 255 255 255);
    --fx-tint: var(--ring);
    --drop-rgb: 10 10 10;

    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-family: inherit;
    font-size: var(--fs);
    color: var(--text, #ededed);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .vrd--lbl-left { flex-direction: row-reverse; }

  /* sizes */
  .vrd--sm { --box: 16px; --fs: 13px; }
  .vrd--md { --box: 20px; --fs: 14px; }
  .vrd--lg { --box: 24px; --fs: 15px; }

  /* ── circle box ── */
  .vrd__box {
    position: relative;
    isolation: isolate;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--box);
    height: var(--box);
    padding: 0;
    border: 1.5px solid var(--inp-border, #3a3a3a);
    border-radius: 50%;
    background: var(--bg-input, #0d0d0d);
    cursor: inherit;
    outline: none;
    transition:
      border-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      background-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      transform 340ms cubic-bezier(0.34, 1.7, 0.5, 1);
  }
  .vrd__box:hover { border-color: var(--inp-border-hover, #5a5a5a); }
  .vrd__box:focus-visible {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgb(var(--ring) / 0.3);
  }
  .is-pressed .vrd__box { transform: scale(0.82); }
  .is-pop .vrd__box { animation: vrd-pop 420ms cubic-bezier(0.34, 1.7, 0.5, 1); }
  @keyframes vrd-pop {
    0% { scale: 0.86; }
    45% { scale: 1.14; }
    100% { scale: 1; }
  }

  /* checked → border in accent */
  .is-on .vrd__box { border-color: var(--accent); }

  /* ── inner dot ── */
  .vrd__dot {
    position: relative;
    z-index: 1;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background: var(--accent);
    transform: scale(0);
    opacity: 0;
    transition:
      transform 360ms cubic-bezier(0.34, 1.7, 0.5, 1),
      opacity 180ms ease;
  }
  .is-on .vrd__dot { transform: scale(1); opacity: 1; }

  /* ── proximity glow — soft feathered ring on the circle edge ── */
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .vrd__box::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .vrd__box::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .vrd__glow {
    position: absolute;
    inset: -2px;
    z-index: 0;
    border-radius: 50%;
    padding: 1.5px;
    pointer-events: none;
    background: radial-gradient(28px circle at var(--gx, 50%) var(--gy, 50%),
      rgb(var(--fx-tint, 255 255 255) / 0.75),
      rgb(var(--fx-tint, 255 255 255) / 0.4) 42%,
      rgb(var(--fx-tint, 255 255 255) / 0.12) 66%,
      rgb(var(--fx-tint, 255 255 255) / 0) 82%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: calc(var(--glow, 0) * 0.9);
    transition: opacity 140ms;
  }

  /* ── ripples ── */
  .vrd__ripples {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    overflow: visible;
    pointer-events: none;
  }
  .vrd__ripple {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: radial-gradient(
      circle,
      rgb(var(--ring) / 0.35) 0%,
      rgb(var(--ring) / 0.18) 42%,
      rgb(var(--ring) / 0.06) 62%,
      transparent 78%
    );
    opacity: 0;
    will-change: transform, opacity;
    animation:
      vrd-ripple-scale 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
      vrd-ripple-fade 620ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  .vrd__ripple--inner {
    background: radial-gradient(
      circle,
      rgb(var(--ring) / 0.6) 0%,
      rgb(var(--ring) / 0.32) 40%,
      rgb(var(--ring) / 0.1) 62%,
      transparent 76%
    );
    animation:
      vrd-ripple-scale 460ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
      vrd-ripple-fade 460ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  .vrd__ripple:not(.vrd__ripple--inner) { animation-delay: 90ms; }
  @keyframes vrd-ripple-scale {
    from { transform: translate(-50%, -50%) scale(0); }
    to   { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes vrd-ripple-fade {
    from { opacity: 0.7; }
    to   { opacity: 0; }
  }

  /* ── label ── */
  .vrd__label {
    position: relative;
    display: inline-block;
    line-height: 1.2;
    transform-origin: center;
    transition: transform 620ms linear(
      0, 0.013 1.2%, 0.05 2.5%, 0.193 5.1%, 0.704 12.3%, 0.9 15.6%, 1.04 19.1%,
      1.106 21.6%, 1.143 24.3%, 1.15 26%, 1.14 28.1%, 1.07 33%, 1.013 38.2%,
      0.984 43.9%, 0.977 50%, 0.986 60%, 1.003 75%, 1
    );
  }
  .vrd__label.is-pressing { transition: transform 120ms cubic-bezier(0.4, 0, 0.2, 1); }

  @property --vrd-r {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }
  .vrd__drop {
    position: absolute;
    inset: 0;
    pointer-events: none;
    white-space: nowrap;
    --d2: calc(var(--vrd-r) * 0.52);
    background:
      radial-gradient(
        circle at var(--rx, 50%) var(--ry, 50%),
        transparent calc(var(--vrd-r) - 17px),
        rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--vrd-r) - 13px),
        rgb(var(--drop-rgb, 10 10 10) / 0.55) calc(var(--vrd-r) - 6px),
        rgb(var(--drop-rgb, 10 10 10) / 0.98) calc(var(--vrd-r) - 1px),
        rgb(var(--drop-rgb, 10 10 10) / 0.62) calc(var(--vrd-r) + 4px),
        rgb(var(--drop-rgb, 10 10 10) / 0.14) calc(var(--vrd-r) + 11px),
        transparent calc(var(--vrd-r) + 16px)
      ),
      radial-gradient(
        circle at var(--rx, 50%) var(--ry, 50%),
        transparent calc(var(--d2) - 12px),
        rgb(var(--drop-rgb, 10 10 10) / 0.30) calc(var(--d2) - 5px),
        rgb(var(--drop-rgb, 10 10 10) / 0.55) var(--d2),
        rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--d2) + 7px),
        transparent calc(var(--d2) + 12px)
      );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: vrd-drop 1820ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes vrd-drop {
    0%   { --vrd-r: 0px; opacity: 0.4; }
    12%  { opacity: 1; }
    100% { --vrd-r: 150px; opacity: 0; }
  }
  :host-context([data-theme='light']) .vrd { --drop-rgb: 255 255 255; }

  /* ── tones ── */
  .vrd--t-danger { --accent: #e5484d; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
  .vrd--t-warn { --accent: #f5a623; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
  .vrd--t-success { --accent: #30a46c; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }

  /* ── disabled ── */
  .is-disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  .is-disabled .vrd__box { cursor: not-allowed; }

  @media (prefers-reduced-motion: reduce) {
    .vrd__box,
    .vrd__dot { transition-duration: 0ms; }
    .is-pop .vrd__box { animation: none; }
    .vrd__ripple { display: none; }
    .vrd__label { transition: none; }
  }
`;let k;function q(n){if(k||=document.createElement("canvas").getContext("2d"),!k)return null;k.fillStyle="#000",k.fillStyle=n;const t=k.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const V=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function P(n,t){const e=t?q(String(t).trim()):null;if(!e){for(const s of V)n.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),l=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,d=e.map(s=>Math.round(l?s*.92:s+(255-s)*.16)),a=(s,h)=>n.style.setProperty(s,h);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,c);a("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,l?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,l?"0 0 0":"255 255 255");a("--vs-color",c),a("--vs-color-rgb",e.join(" ")),a("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class Y extends HTMLElement{static observedAttributes=["value","disabled","size","tone","direction","name","color"];#e;#n=null;#t;#r=[];#a=[];#k=0;#o=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=j,this.#e=document.createElement("div"),this.#e.className="vrg vrg--vertical",this.#e.setAttribute("role","radiogroup"),t.append(e,this.#e)}connectedCallback(){P(this,this.getAttribute("color")),this.#c(),this.#d()}disconnectedCallback(){this.#h()}attributeChangedCallback(t){if(P(this,this.getAttribute("color")),!(!this.#e||this.#o)){if(t==="value"){this.#l(),this.#i();return}if(t==="direction"){this.#c();return}this.#c(),this.#d()}}set options(t){this.#n=Array.isArray(t)&&t.length?t:null,this.#e&&this.#d()}get options(){return this.#n??R}get value(){return this.#t}set value(t){this.#v(t),this.#l(),this.#i()}#b(){return this.#n??R}#u(){return this.hasAttribute("disabled")}#f(t){return this.#u()||!!t.disabled}#s(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}#v(t){this.#o=!0,t==null?this.removeAttribute("value"):this.setAttribute("value",String(t)),this.#o=!1}#l(){const t=this.#b(),e=this.getAttribute("value");if(e!=null){const r=t.find(i=>String(i.value)===e);if(this.#t=r?r.value:this.#t,r)return}this.#t!=null&&t.some(r=>String(r.value)===String(this.#t))||(this.#t=t[0]?.value)}#c(){const t=this.getAttribute("direction")==="horizontal"?"horizontal":"vertical";this.#e.className=`vrg vrg--${t}`}#d(){this.#h(),this.#e.textContent="",this.#r=[],this.#l();const t=this.getAttribute("size")||"md",e=this.getAttribute("tone")||"default";this.#b().forEach((i,l)=>{const c=this.#f(i),d=document.createElement("label");d.className=`vrd vrd--${t} vrd--t-${e} vrd--lbl-right${c?" is-disabled":""}`;const a=document.createElement("button");a.type="button",a.className="vrd__box",a.setAttribute("role","radio"),c&&(a.disabled=!0);const s=document.createElement("span");s.className="fx-glow vrd__glow",s.setAttribute("aria-hidden","true");const h=document.createElement("span");h.className="vrd__ripples",h.setAttribute("aria-hidden","true");const u=document.createElement("span");u.className="vrd__dot",u.setAttribute("aria-hidden","true"),a.append(s,h,u),d.appendChild(a);let v=null;i.label!=null&&i.label!==""&&(v=document.createElement("span"),v.className="vrd__label",v.textContent=i.label,d.appendChild(v)),this.#e.appendChild(d);const g={opt:i,label:d,box:a,dot:u,labelEl:v,ripples:h,value:i.value,disabled:c};this.#r.push(g),a.addEventListener("pointerdown",b=>this.#x(b,g));const m=()=>this.#y(g);if(a.addEventListener("pointerup",m),a.addEventListener("pointerleave",m),a.addEventListener("pointercancel",m),a.addEventListener("click",()=>this.#p(g)),a.addEventListener("keydown",b=>this.#m(b,l)),a.addEventListener("animationend",()=>g.label.classList.remove("is-pop")),v){v.addEventListener("pointerdown",o=>this.#_(o,g));const b=()=>this.#w(g);v.addEventListener("pointerup",b),v.addEventListener("pointerleave",b),v.addEventListener("pointercancel",b)}this.#a.push(B(a,90,()=>this.#f(i)))}),this.#i()}#h(){for(const t of this.#a)t();this.#a=[]}#i(){const t=this.#t;let e=-1;this.#r.forEach((r,i)=>{const l=t!=null&&String(r.value)===String(t);r.label.classList.toggle("is-on",l),r.box.setAttribute("aria-checked",String(l)),l&&!r.disabled&&e<0&&(e=i)}),e<0&&(e=this.#r.findIndex(r=>!r.disabled)),this.#r.forEach((r,i)=>{r.box.tabIndex=i===e?0:-1})}#p(t){t.disabled||this.#t!=null&&String(t.value)===String(this.#t)||(this.#t=t.value,this.#v(t.value),this.#i(),this.#s()||(t.label.classList.remove("is-pop"),requestAnimationFrame(()=>requestAnimationFrame(()=>t.label.classList.add("is-pop")))),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t.value}})))}#m(t,e){if(this.#u())return;const r=t.key;if(r===" "||r==="Enter"){t.preventDefault(),this.#p(this.#r[e]);return}let i=0;if(r==="ArrowDown"||r==="ArrowRight")i=1;else if(r==="ArrowUp"||r==="ArrowLeft")i=-1;else return;t.preventDefault();const l=this.#r.length;let c=e;for(let a=0;a<l&&(c=(c+i+l)%l,!!this.#r[c].disabled);a++);const d=this.#r[c];!d||d.disabled||(this.#p(d),d.box.focus())}#x(t,e){if(e.disabled||(e.label.classList.add("is-pressed"),this.#s()))return;const r=e.box.getBoundingClientRect(),i=t.clientX-r.left,l=t.clientY-r.top,c=Math.max(i,r.width-i),d=Math.max(l,r.height-l),a=Math.hypot(c,d)*2;for(this.#g(e,i,l,a*.8,!0),this.#g(e,i,l,a*1.9,!1);e.ripples.childElementCount>6;)e.ripples.firstElementChild.remove()}#y(t){t.label.classList.remove("is-pressed")}#g(t,e,r,i,l){const c=document.createElement("span");c.className="vrd__ripple"+(l?" vrd__ripple--inner":""),c.style.cssText=`left:${e}px;top:${r}px;width:${i}px;height:${i}px`,c.addEventListener("animationend",()=>c.remove()),t.ripples.appendChild(c)}#_(t,e){if(e.disabled||this.#s()||!e.labelEl)return;const r=e.labelEl,i=r.getBoundingClientRect(),l=v=>Math.max(-1,Math.min(1,v)),c=l(((t.clientX-i.left)/i.width-.5)*2),d=l(((t.clientY-i.top)/i.height-.5)*2),a=1-.2*Math.min(Math.abs(c),Math.abs(d)),s=(-d*12*a).toFixed(2),h=(c*9*a).toFixed(2);r.classList.add("is-pressing"),r.style.transform=`perspective(420px) rotateX(${s}deg) rotateY(${h}deg) scale(0.93)`;const u=document.createElement("span");u.className="vrd__drop",u.setAttribute("aria-hidden","true"),u.textContent=e.opt.label,u.style.setProperty("--rx",`${t.clientX-i.left}px`),u.style.setProperty("--ry",`${t.clientY-i.top}px`),u.addEventListener("animationend",()=>u.remove()),r.appendChild(u)}#w(t){t.labelEl&&(t.labelEl.classList.remove("is-pressing"),t.labelEl.style.transform="")}}customElements.define("vs-radio-group",Y);
