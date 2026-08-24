const _=new Set;let A=0,M=0,$=!1,k=0,z=!1,E=null;function F(){if(k=0,!!$)for(const t of _){if(!t.visible)continue;if(t.disabled()){t.lastI!==0&&(t.el.style.setProperty("--glow","0"),t.lastI=0);continue}t.rect||(t.rect=t.el.getBoundingClientRect());const n=t.rect,e=Math.max(n.left,Math.min(A,n.right)),s=Math.max(n.top,Math.min(M,n.bottom)),c=Math.max(0,1-Math.hypot(A-e,M-s)/t.radius);c===0&&t.lastI===0||(t.el.style.setProperty("--gx",`${A-n.left}px`),t.el.style.setProperty("--gy",`${M-n.top}px`),t.el.style.setProperty("--glow",c.toFixed(3)),t.lastI=c)}}function B(t){A=t.clientX,M=t.clientY,$=!0,k||(k=requestAnimationFrame(F))}function I(){for(const t of _)t.rect=null;$&&!k&&(k=requestAnimationFrame(F))}function O(t,n,e){z||(z=!0,addEventListener("pointermove",B,{passive:!0}),addEventListener("scroll",I,{passive:!0,capture:!0}),addEventListener("resize",I,{passive:!0}),E=new IntersectionObserver(p=>{for(const b of p)for(const a of _)a.el===b.target&&(a.visible=b.isIntersecting,b.isIntersecting&&(a.rect=null))}));const s={el:t,radius:n,disabled:e,rect:null,visible:!0,lastI:0};_.add(s),E.observe(t);const c=j.add(t);return()=>{_.delete(s),E.unobserve(t),c()}}const j=globalThis[Symbol.for("vs-light")]||=(()=>{const t=new Set,n=110,e=1.6,s=1.7,c=34,p=72,b=[[.6,0],[.42,30],[.16,58],[0,82]],a=[[.6,0],[.27,42],[.08,66],[0,85]],d=[[.85,0],[.4,42],[.12,66],[0,84]];let i=0,g=null;const x=(h,r,l)=>{const u=r.w/2+h,m=r.h/2+h,f=r.h/2/m;return`radial-gradient(${u.toFixed(1)}px ${m.toFixed(1)}px at ${r.x.toFixed(1)}px ${r.y.toFixed(1)}px,`+l.map(([o,v])=>` rgb(${r.rgb} / ${(o*r.k).toFixed(3)}) ${((f+v/100*(1-f))*100).toFixed(1)}%`).join(",")+")"};function S(){const h=[];for(const r of document.querySelectorAll("[color],[data-lamp]")){const l=getComputedStyle(r),u=l.getPropertyValue("--vs-color-rgb").trim()||(r.hasAttribute("data-lamp")?(l.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");u&&h.push({el:r,rgb:u,rect:r.getBoundingClientRect()})}return h}function P(){if(i=0,!t.size)return;const h=S();for(const r of t){if(!r.visible)continue;if(!h.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}const l=r.el.getBoundingClientRect(),u=l.left+l.width/2,m=l.top+l.height/2,f=[];for(const o of h){if(o.el===r.el||o.el.contains(r.el)||r.el.contains(o.el))continue;const v=Math.max(o.rect.left,Math.min(u,o.rect.right)),C=Math.max(o.rect.top,Math.min(m,o.rect.bottom)),R=Math.max(l.left,Math.min(v,l.right)),N=Math.max(l.top,Math.min(C,l.bottom)),q=Math.max(0,1-Math.hypot(v-R,C-N)/n)**e*s;q&&f.push({rgb:o.rgb,k:Math.min(1,q),w:o.rect.width,h:o.rect.height,x:o.rect.left+o.rect.width/2-l.left,y:o.rect.top+o.rect.height/2-l.top})}if(!f.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}f.sort((o,v)=>o.k-v.k),r.el.style.setProperty("--lit-ring",f.flatMap(o=>[x(c,o,b),x(p,o,a)]).join(",")),r.el.style.setProperty("--lit-fill",f.map(o=>x(p,o,d)).join(",")),r.el.style.setProperty("--lit","1"),r.on=!0}}const y=()=>{i||(i=requestAnimationFrame(P))};return addEventListener("scroll",y,{passive:!0,capture:!0}),addEventListener("resize",y,{passive:!0}),globalThis.vsLight=y,{add(h){g||=new IntersectionObserver(l=>{for(const u of l)for(const m of t)m.el===u.target&&(m.visible=u.isIntersecting);y()});const r={el:h,visible:!0,on:!1};return t.add(r),g.observe(h),y(),()=>{t.delete(r),g.unobserve(h)}}}})(),T=`
  :host { display: inline-flex; }
  :host([block]) { display: flex; width: 100%; }
  :host([block]) .btn { width: 100%; }
  .btn { --h:40px; --r:12px; --fs:14px; --px:14px; --rip:255 255 255;
    position:relative; isolation:isolate; display:inline-flex; align-items:center; justify-content:center;
    gap:8px; height:var(--h); padding:0 var(--px); border-radius:calc(var(--r)*var(--r-mult,1)); border:1px solid transparent;
    font-family:inherit; font-weight:500; font-size:var(--fs); line-height:1; cursor:pointer; user-select:none; white-space:nowrap;
    transition:transform 240ms cubic-bezier(.34,1.56,.64,1), background-color 200ms, border-color 200ms, opacity 200ms; }
  .btn:active:not(:disabled){ transform:scale(.97); } .btn:disabled{ opacity:.45; cursor:not-allowed; }
  .btn--sm{ --h:32px; --r:10px; --fs:13px; --px:12px; } .btn--lg{ --h:48px; --r:14px; --fs:15px; --px:18px; }
  @supports (corner-shape: squircle){ .btn--r-squircle{ corner-shape:squircle; --r-mult:1.7; } }
  .btn--r-none{ --r:0; } .btn--r-subtle{ --r:8px; } .btn--r-pill{ --r:999px; }
  .btn--primary{ --fx-tint:var(--btn-primary-glow,0 0 0); --rip:0 0 0; background:var(--btn-primary-bg,#ededed); color:var(--btn-primary-fg,#000); }
  .btn--primary:hover:not(:disabled){ opacity:.85; }
  .btn--secondary{ --fx-tint:var(--t-rgb,255 255 255); --rip:var(--t-rgb,255 255 255); background:var(--btn-secondary-bg,#1a1a1a); color:var(--inp-text,#ededed); border-color:var(--inp-border,#2a2a2a); }
  .btn--secondary:hover:not(:disabled){ background:var(--btn-secondary-bg-hover,#242424); border-color:var(--inp-border-hover,#3d3d3d); }
  .btn--ghost{ --fx-tint:var(--t-rgb,255 255 255); --rip:var(--t-rgb,255 255 255); background:transparent; color:var(--inp-text,#ededed); }
  .btn--ghost:hover:not(:disabled){ background:var(--inp-hover-bg,rgba(255,255,255,.06)); }
  .btn--t-danger{ --t-rgb:255 99 105; }
  .btn--primary.btn--t-danger{ --fx-tint:255 255 255; --rip:255 255 255; background:#e5484d; color:#fff; }
  .btn--secondary.btn--t-danger,.btn--ghost.btn--t-danger{ background:rgba(229,72,77,.13); color:#ff6369; border-color:#5b1a1d; }
  .btn__label{ position:relative; z-index:2; display:inline-flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap; }
  /* icon only: square box, no horizontal padding */
  .btn--icon{ --px:0px; width:var(--h); gap:0; }
  .btn--icon .btn__label ::slotted(svg){ width:19px; height:19px; display:block; }
  /* borderless: no border, no ring glow — proximity light lives on the icon/label (VsTabs-style) */
  .btn--borderless{ border-color:transparent !important; background:transparent; }
  .btn--borderless:hover:not(:disabled){ background:transparent; }
  .btn--borderless .btn__glow{ display:none; }
  .btn--borderless .btn__label{ filter:drop-shadow(0 0 5px rgb(var(--fx-tint,255 255 255)/.7)); opacity:calc(.5 + .5*var(--glow,0)); transition:opacity 160ms ease; }
  .btn--borderless.btn--no-glow .btn__label{ filter:none; opacity:1; }
  /* loading spinner */
  .btn__spinner{ position:relative; z-index:2; width:14px; height:14px; border-radius:50%; border:2px solid currentColor; border-top-color:transparent; animation:btn-spin .7s linear infinite; display:none; }
  .btn--loading .btn__spinner{ display:block; }
  @keyframes btn-spin{ to{ transform:rotate(360deg); } }
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     attachLight() fills --lit-fill / --lit-ring with one gradient per lamp in
     reach (intensity baked into each one's alphas) and --lit is the master
     fade, so a lamp going out of range dims out instead of cutting.
     Separate vars from --glow on purpose: --glow is the cursor's, read as 0..1
     by other rules (the borderless label dim), and must keep its meaning. */
  .btn::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .btn::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .btn--r-pill::before,.btn--r-pill::after{ border-radius:999px; }
  @supports (corner-shape:squircle){ .btn--r-squircle::before,.btn--r-squircle::after{ corner-shape:squircle; } }
  /* proximity glow — soft feathered ring on the border (2 layers, multi-stop falloff → no hard rim) */
  .btn__glow{ position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:
      radial-gradient(60px circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.42) 30%, rgb(var(--fx-tint,255 255 255)/.16) 58%, rgb(var(--fx-tint,255 255 255)/0) 82%),
      radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.27) 42%, rgb(var(--fx-tint,255 255 255)/.08) 66%, rgb(var(--fx-tint,255 255 255)/0) 85%);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:calc(var(--glow,0)*.9*.7); transition:opacity 140ms; }
  .btn--r-pill .btn__glow{ border-radius:999px; }
  @supports (corner-shape:squircle){ .btn--r-squircle .btn__glow{ corner-shape:squircle; } }
  .btn__ripples{ position:absolute; inset:0; z-index:0; border-radius:inherit; overflow:hidden; pointer-events:none; }
  .btn--r-pill .btn__ripples{ border-radius:999px; }
  @supports (corner-shape:squircle){ .btn--r-squircle .btn__ripples{ corner-shape:squircle; } }
  .btn__ripple{ position:absolute; z-index:1; pointer-events:none; border-radius:50%; transform:translate(-50%,-50%) scale(0);
    background:radial-gradient(circle, rgb(var(--rip)/.38) 0%, rgb(var(--rip)/.20) 24%, rgb(var(--rip)/.09) 44%, rgb(var(--rip)/.03) 60%, transparent 76%);
    opacity:0; will-change:transform,opacity;
    animation:btn-rip 780ms cubic-bezier(.22,1,.36,1) forwards, btn-fade 780ms cubic-bezier(.25,.1,.25,1) forwards; }
  @keyframes btn-rip{ from{ transform:translate(-50%,-50%) scale(0); } to{ transform:translate(-50%,-50%) scale(1); } }
  @keyframes btn-fade{ from{ opacity:.8; } to{ opacity:0; } }
  @media (prefers-reduced-motion:reduce){ .btn{ transition:none; } .btn:active:not(:disabled){ transform:none; } .btn__ripple{ display:none; } .btn__spinner{ animation-duration:1.2s; } }
`;let w;function G(t){if(w||=document.createElement("canvas").getContext("2d"),!w)return null;w.fillStyle="#000",w.fillStyle=t;const n=w.fillStyle;if(n.charAt(0)==="#")return[parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16)];const e=n.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const H=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function L(t,n){const e=n?G(String(n).trim()):null;if(!e){for(const i of H)t.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),p=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,b=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(i=>Math.round(p?i*.92:i+(255-i)*.16)),d=(i,g)=>t.style.setProperty(i,g);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(i,b);d("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(i,p?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])d(i,p?"0 0 0":"255 255 255");d("--vs-color",b),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",p?"#0b0b0b":"#ffffff")}class V extends HTMLElement{static observedAttributes=["label","variant","tone","size","radius","disabled","glow","icon-only","borderless","loading","block","aria-label","title","color"];#t;#n;#e;#r;#o;#i;#s;constructor(){super();const n=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=T,this.#t=document.createElement("button"),this.#t.type="button",this.#t.setAttribute("part","button"),this.#n=document.createElement("span"),this.#n.className="btn__glow",this.#n.setAttribute("aria-hidden","true"),this.#e=document.createElement("span"),this.#e.className="btn__ripples",this.#e.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="btn__spinner",this.#i.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="btn__label",this.#r.setAttribute("part","label"),this.#o=document.createElement("slot"),this.#r.append(this.#o),this.#t.append(this.#n,this.#e,this.#i,this.#r),n.append(e,this.#t),this.#t.addEventListener("pointerdown",s=>this.#l(s));for(const s of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(s,()=>{this.#t.style.transform=""})}connectedCallback(){L(this,this.getAttribute("color")),this.#a(),this.#s=O(this,200,()=>this.hasAttribute("disabled")||this.hasAttribute("loading")||!this.hasAttribute("glow"))}disconnectedCallback(){this.#s?.()}attributeChangedCallback(){L(this,this.getAttribute("color")),this.#t&&this.#a()}#a(){const n=(b,a)=>this.getAttribute(b)??a,e=this.hasAttribute("icon-only"),s=this.hasAttribute("borderless"),c=this.hasAttribute("loading"),p=!this.hasAttribute("glow");this.#t.className=`btn btn--${n("variant","primary")} btn--t-${n("tone","default")} btn--${n("size","md")} btn--r-${n("radius","squircle")}`+(e?" btn--icon":"")+(s?" btn--borderless":"")+(c?" btn--loading":"")+(p?" btn--no-glow":""),this.#t.disabled=this.hasAttribute("disabled")||c,this.#o.textContent=n("label","Button");for(const b of["aria-label","title"]){const a=this.getAttribute(b);a!=null?this.#t.setAttribute(b,a):this.#t.removeAttribute(b)}}#l(n){if(this.#t.disabled)return;const e=this.#t.getBoundingClientRect(),s=n.clientX-e.left,c=n.clientY-e.top,p=Math.max(s,e.width-s),b=Math.max(c,e.height-c),a=Math.hypot(p,b)*2,d=document.createElement("span");for(d.className="btn__ripple",d.style.cssText=`left:${s}px;top:${c}px;width:${a}px;height:${a}px`,d.addEventListener("animationend",()=>d.remove()),this.#e.appendChild(d);this.#e.childElementCount>6;)this.#e.firstElementChild.remove();const i=Math.max(-1,Math.min(1,(s/e.width-.5)*2)),g=Math.max(-1,Math.min(1,(c/e.height-.5)*2)),x=1-.2*Math.min(Math.abs(i),Math.abs(g));this.#t.style.transform=`perspective(450px) rotateX(${(-g*15*x).toFixed(2)}deg) rotateY(${(i*10*x).toFixed(2)}deg) scale(.96)`}}customElements.define("vs-button",V);
