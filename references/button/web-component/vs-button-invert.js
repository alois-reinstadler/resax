const y=`
  :host { display: inline-flex; }
  :host(:active) { transform: scale(0.975); }
  :host { transition: transform 160ms cubic-bezier(0.2, 0.8, 0.3, 1); }

  .binv {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    /* --fill = net white on dark / net black on light; --on-fill = its contrast */
    --fill: var(--btn-primary-bg-hover, #ffffff);
    --on-fill: var(--btn-primary-fg, #000000);
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--px);
    border-radius: calc(var(--r) * var(--r-mult, 1));
    border: 1px solid var(--inp-border, #2a2a2a);
    font: inherit;
    font-weight: 500;
    font-size: var(--fs);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    background: transparent;
    color: var(--inp-text, #ededed);
    /* the jelly: written by the loop, exactly 1 at rest */
    transform: scale(var(--sx, 1), var(--sy, 1));
    will-change: transform;
  }
  .binv:disabled { opacity: 0.45; cursor: not-allowed; }
  .binv:focus-visible { outline: 2px solid var(--inp-accent, #ededed); outline-offset: 2px; }

  /* sizes */
  .binv--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .binv--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .binv--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  /* radius */
  .binv--r-none { --r: 0px; }
  .binv--r-subtle { --r: 8px; }
  .binv--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .binv--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
    /* both overlays copy whatever corner geometry the button ended up with */
    .binv__ink, .binv__clip { corner-shape: inherit; }
  }

  /* variants: only the RESTING surface changes. The flood is always the
     maximum-contrast solid, so the invert reads identically on the three. */
  .binv--primary { background: var(--btn-primary-bg, #ededed); color: var(--btn-primary-fg, #000); border-color: transparent; }
  .binv--secondary { background: var(--btn-secondary-bg, #1a1a1a); }

  /* The ink and the inverted label share ONE circle. inset:-1px resolves to the
     button's border box, so the flood covers the hairline too — once it lands
     there is no border left, just the solid block. */
  .binv__ink,
  .binv__clip {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    clip-path: circle(var(--ink-r, 0px) at var(--ink-x, 50%) var(--ink-y, 50%));
  }
  .binv__ink {
    z-index: 0;
    background: var(--fill);
    will-change: clip-path;
  }
  .binv__clip {
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--on-fill);
  }

  /* both copies sit on the same centre and carry the same pull/blur, so they
     move as one piece of text under the wave */
  .binv__label {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transform: translate3d(var(--lx, 0px), 0, 0) scale(var(--lsx, 1), var(--lsy, 1));
    filter: var(--lf, none);
    will-change: transform, filter;
  }

  @media (prefers-reduced-motion: reduce) {
    :host { transition: none; }
    .binv, .binv__label { will-change: auto; }
  }
`;class v{x=0;v=0;target=0;constructor(e,t){this.k=e,this.d=t}step(e){const t=e/2;for(let i=0;i<2;i++){const r=-this.k*(this.x-this.target)-this.d*this.v;this.v+=r*t,this.x+=this.v*t}}get settled(){return Math.abs(this.v)<.002&&Math.abs(this.x-this.target)<.002}snap(){this.x=this.target,this.v=0}}const f=new Set;let u=0,b=0;function m(s){const e=Math.min(.032,b?(s-b)/1e3:.016666666666666666);b=s;for(const t of[...f])t(e);f.size?u=requestAnimationFrame(m):(u=0,b=0)}function k(s){f.add(s),u||(b=0,u=requestAnimationFrame(m))}const c=(s,e,t)=>s<e?e:s>t?t:s,p=(s,e)=>s===null||s===""||isNaN(+s)?e:+s;let d;function w(s){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=s;const e=d.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(s,e){const t=e?w(String(e).trim()):null;if(!t){for(const n of _)s.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),o=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,h=t.map(n=>Math.round(o?n*.92:n+(255-n)*.16)),a=(n,x)=>s.style.setProperty(n,x);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(n,l);a("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(n,o?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])a(n,o?"0 0 0":"255 255 255");a("--vs-color",l),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["label","variant","size","radius","disabled","stiffness","damping","lag","blur","squash","color"];#t;#n;#a;#o;#e=new v(260,17);#s=new v(187,15);#i=new v(150,18);#r=new v(150,18);#f={w:0,h:0,rmax:0};#l=1;#h=1;#c=!1;#v=2;#u=.05;#E=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):{matches:!1};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=y,this.#t=document.createElement("button"),this.#t.type="button",this.#o=document.createElement("span"),this.#o.className="binv__ink",this.#o.setAttribute("aria-hidden","true");const i=document.createElement("span");i.className="binv__label",this.#n=document.createElement("slot"),i.append(this.#n);const r=document.createElement("span");r.className="binv__clip",r.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="binv__label",r.append(this.#a),this.#t.append(this.#o,i,r),e.append(t,this.#t),this.#t.addEventListener("pointerenter",this.#k),this.#t.addEventListener("pointerleave",this.#w),this.#n.addEventListener("slotchange",this.#m)}connectedCallback(){g(this,this.getAttribute("color")),this.#g(),this.#b()}disconnectedCallback(){f.delete(this.#d),this.#t.removeEventListener("pointerenter",this.#k),this.#t.removeEventListener("pointerleave",this.#w),this.#n.removeEventListener("slotchange",this.#m)}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#t&&this.#g()}#g(){const e=(o,l)=>this.getAttribute(o)??l;this.#t.className=`binv binv--${e("variant","ghost")} binv--${e("size","md")} binv--r-${e("radius","rounded")}`,this.#t.disabled=this.hasAttribute("disabled"),this.#n.textContent=e("label","Button"),this.#x();const t=p(this.getAttribute("stiffness"),260),i=p(this.getAttribute("damping"),17),r=c(p(this.getAttribute("lag"),.45),0,.9);this.#v=c(p(this.getAttribute("blur"),2),0,14),this.#u=c(p(this.getAttribute("squash"),.05),0,.14),this.#e.k=t,this.#e.d=i,this.#s.k=t*(1-r*.62),this.#s.d=i*(1-r*.3),this.#i.k=this.#r.k=t*.58,this.#r.d=this.#i.d=i*1.1,this.#t.disabled&&this.#e.target!==0&&(this.#e.target=0,this.#s.target=0,this.#c=!1,this.#p())}#m=()=>this.#x();#x(){const e=this.#n.assignedNodes({flatten:!0}),t=e.length?e.map(i=>i.textContent||"").join(""):this.getAttribute("label")??"Button";this.#a.textContent=t}#y(e){const t=this.#t.getBoundingClientRect(),i=t.width/this.#l,r=t.height/this.#h,o=t.left+t.width/2,l=t.top+t.height/2,h=e?c((e.clientX-o)/this.#l+i/2,0,i):i/2,a=e?c((e.clientY-l)/this.#h+r/2,0,r):r/2;return{x:h,y:a,w:i,h:r}}#k=e=>{if(this.#t.disabled)return;const t=this.#y(e);this.#f={w:t.w,h:t.h,rmax:Math.max(Math.hypot(t.x,t.y),Math.hypot(t.w-t.x,t.y),Math.hypot(t.x,t.h-t.y),Math.hypot(t.w-t.x,t.h-t.y))},this.#i.x=this.#i.target=t.x,this.#r.x=this.#r.target=t.y,this.#i.v=this.#r.v=0,this.#e.target=1,this.#s.target=1,this.#_()};#w=e=>{if(!this.#t.disabled){if(e){const t=this.#y(e);this.#i.target=t.x,this.#r.target=t.y}this.#e.target=0,this.#s.target=0,this.#c=!1,this.#_()}};#_(){if(this.#E.matches){this.#p();return}k(this.#d)}#p(){this.#e.snap(),this.#s.snap(),this.#i.snap(),this.#r.snap(),f.delete(this.#d),this.#b()}#d=e=>{this.#e.step(e),this.#s.step(e),this.#i.step(e),this.#r.step(e),this.#b(),this.#e.settled&&this.#s.settled&&this.#p()};#b(){const e=this.#t.style,{w:t,rmax:i}=this.#f;let r=Math.max(0,this.#e.x)*i*1.08;i>0&&this.#e.target===1&&r>=i&&(this.#c=!0),this.#c&&(r=Math.max(r,i)),e.setProperty("--ink-r",r.toFixed(2)+"px"),e.setProperty("--ink-x",this.#i.x.toFixed(2)+"px"),e.setProperty("--ink-y",this.#r.x.toFixed(2)+"px");const o=c(this.#s.v*.12,-1,1),l=o*this.#u;this.#l=1+l,this.#h=1-l*.62,e.setProperty("--sx",this.#l.toFixed(4)),e.setProperty("--sy",this.#h.toFixed(4));const h=t?c((t/2-this.#i.x)/(t/2),-1,1):0;e.setProperty("--lx",(h*o*5).toFixed(2)+"px"),e.setProperty("--lsx",(1+l*.6).toFixed(4)),e.setProperty("--lsy",(1-l*.4).toFixed(4));const a=Math.abs(o)*this.#v;e.setProperty("--lf",a>.05?`blur(${a.toFixed(2)}px)`:"none")}}customElements.define("vs-button-invert",E);
