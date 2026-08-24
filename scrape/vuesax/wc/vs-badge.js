const w=new Set;let k=0,A=0,M=!1,_=0,L=!1,C=null;function F(){if(_=0,!!M)for(const t of w){if(!t.visible)continue;if(t.disabled()){t.lastI!==0&&(t.el.style.setProperty("--glow","0"),t.lastI=0);continue}t.rect||(t.rect=t.el.getBoundingClientRect());const r=t.rect,e=Math.max(r.left,Math.min(k,r.right)),s=Math.max(r.top,Math.min(A,r.bottom)),l=Math.max(0,1-Math.hypot(k-e,A-s)/t.radius);l===0&&t.lastI===0||(t.el.style.setProperty("--gx",`${k-r.left}px`),t.el.style.setProperty("--gy",`${A-r.top}px`),t.el.style.setProperty("--glow",l.toFixed(3)),t.lastI=l)}}function j(t){k=t.clientX,A=t.clientY,M=!0,_||(_=requestAnimationFrame(F))}function I(){for(const t of w)t.rect=null;M&&!_&&(_=requestAnimationFrame(F))}function O(t,r,e){L||(L=!0,addEventListener("pointermove",j,{passive:!0}),addEventListener("scroll",I,{passive:!0,capture:!0}),addEventListener("resize",I,{passive:!0}),C=new IntersectionObserver(a=>{for(const b of a)for(const g of w)g.el===b.target&&(g.visible=b.isIntersecting,b.isIntersecting&&(g.rect=null))}));const s={el:t,radius:r,disabled:e,rect:null,visible:!0,lastI:0};w.add(s),C.observe(t);const l=T.add(t);return()=>{w.delete(s),C.unobserve(t),l()}}const T=globalThis[Symbol.for("vs-light")]||=(()=>{const t=new Set,r=110,e=1.6,s=1.7,l=34,a=72,b=[[.6,0],[.42,30],[.16,58],[0,82]],g=[[.6,0],[.27,42],[.08,66],[0,85]],d=[[.85,0],[.4,42],[.12,66],[0,84]];let n=0,v=null;const E=(p,i,c)=>{const f=i.w/2+p,u=i.h/2+p,h=i.h/2/u;return`radial-gradient(${f.toFixed(1)}px ${u.toFixed(1)}px at ${i.x.toFixed(1)}px ${i.y.toFixed(1)}px,`+c.map(([o,m])=>` rgb(${i.rgb} / ${(o*i.k).toFixed(3)}) ${((h+m/100*(1-h))*100).toFixed(1)}%`).join(",")+")"};function N(){const p=[];for(const i of document.querySelectorAll("[color],[data-lamp]")){const c=getComputedStyle(i),f=c.getPropertyValue("--vs-color-rgb").trim()||(i.hasAttribute("data-lamp")?(c.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");f&&p.push({el:i,rgb:f,rect:i.getBoundingClientRect()})}return p}function P(){if(n=0,!t.size)return;const p=N();for(const i of t){if(!i.visible)continue;if(!p.length){i.on&&(i.el.style.setProperty("--lit","0"),i.on=!1);continue}const c=i.el.getBoundingClientRect(),f=c.left+c.width/2,u=c.top+c.height/2,h=[];for(const o of p){if(o.el===i.el||o.el.contains(i.el)||i.el.contains(o.el))continue;const m=Math.max(o.rect.left,Math.min(f,o.rect.right)),$=Math.max(o.rect.top,Math.min(u,o.rect.bottom)),R=Math.max(c.left,Math.min(m,c.right)),B=Math.max(c.top,Math.min($,c.bottom)),z=Math.max(0,1-Math.hypot(m-R,$-B)/r)**e*s;z&&h.push({rgb:o.rgb,k:Math.min(1,z),w:o.rect.width,h:o.rect.height,x:o.rect.left+o.rect.width/2-c.left,y:o.rect.top+o.rect.height/2-c.top})}if(!h.length){i.on&&(i.el.style.setProperty("--lit","0"),i.on=!1);continue}h.sort((o,m)=>o.k-m.k),i.el.style.setProperty("--lit-ring",h.flatMap(o=>[E(l,o,b),E(a,o,g)]).join(",")),i.el.style.setProperty("--lit-fill",h.map(o=>E(a,o,d)).join(",")),i.el.style.setProperty("--lit","1"),i.on=!0}}const x=()=>{n||(n=requestAnimationFrame(P))};return addEventListener("scroll",x,{passive:!0,capture:!0}),addEventListener("resize",x,{passive:!0}),globalThis.vsLight=x,{add(p){v||=new IntersectionObserver(c=>{for(const f of c)for(const u of t)u.el===f.target&&(u.visible=f.isIntersecting);x()});const i={el:p,visible:!0,on:!1};return t.add(i),v.observe(p),x(),()=>{t.delete(i),v.unobserve(p)}}}})(),q=`
  :host { display: inline-flex; }
  .badge {
    /* compact sizes (does not use full control height) */
    --h: 24px; --px: 9px; --fs: 12px; --gap: 5px; --rr: 999px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255); /* space-separated rgb → rgb(var(--ring)/a) */
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --solid-fg: var(--badge-solid-fg, #0b0b0b);
    position: relative; isolation: isolate; display: inline-flex; align-items: center;
    gap: var(--gap); height: var(--h); padding: 0 var(--px);
    border: 1px solid transparent; border-radius: var(--rr);
    font: inherit; font-size: var(--fs); font-weight: 550; line-height: 1;
    letter-spacing: 0.01em; white-space: nowrap; user-select: none;
    transition:
      border-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      background-color 200ms ease, color 200ms ease;
  }

  /* sizes */
  .badge--sm { --h: 20px; --px: 7px; --fs: 11px; --gap: 4px; }
  .badge--lg { --h: 28px; --px: 12px; --fs: 13px; --gap: 6px; }

  /* radii */
  .badge--r-subtle { --rr: 6px; }
  .badge--r-rounded { --rr: 9px; }
  .badge--r-pill { --rr: 999px; }

  /* ── variants ───────────────────────────────────────────────── */
  /* soft: faint fill of the tone */
  .badge--v-soft { background: rgb(var(--ring) / 0.14); color: var(--tint); border-color: rgb(var(--ring) / 0.22); }
  /* solid: strong fill, contrasting text (--solid-fg) */
  .badge--v-solid { background: rgb(var(--ring) / 0.92); color: var(--solid-fg); border-color: transparent; }
  /* outline: border only + tone-colored text */
  .badge--v-outline { background: transparent; color: var(--tint); border-color: rgb(var(--ring) / 0.5); }

  /* status dot */
  .badge__dot { width: 6px; height: 6px; border-radius: 999px; background: currentColor; flex: 0 0 auto; }

  .badge__label { position: relative; z-index: 2; }

  /* remove button */
  .badge__close {
    position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center;
    width: 1.15em; height: 1.15em; margin-right: -2px; padding: 0;
    border: none; border-radius: 999px; background: transparent; color: inherit; font-size: inherit;
    cursor: pointer; opacity: 0.7;
    transition: opacity 160ms ease, background-color 160ms ease, transform 160ms ease;
  }
  .badge__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.18); }
  .badge--v-solid .badge__close:hover:not(:disabled) { background: rgb(0 0 0 / 0.18); }
  .badge__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .badge__close svg { width: 100%; height: 100%; display: block; }
  .badge__ripples { border-radius: inherit; }

  /* proximity glow */
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .badge::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .badge::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .badge__glow { --glow-strength: 0.45; --glow-ring: 1px; --glow-inset: -1px; border-radius: inherit; }

  /* ── tones — recolor accent, ring, glow/ripple ──────────────── */
  .badge--t-danger  { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; --tint: var(--inp-t-danger-hint, #ff8a8e);  --solid-fg: #160405; }
  .badge--t-warn    { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; --tint: var(--inp-t-warn-hint, #f5b544);    --solid-fg: #160f02; }
  .badge--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; --tint: var(--inp-t-success-hint, #5fd49b); --solid-fg: #04120b; }

  /* disabled */
  .badge.is-disabled { opacity: 0.5; }
  .badge.is-disabled .badge__close { cursor: not-allowed; }

  /* ── proximity glow layer (soft feathered ring on the border) ── */
  .fx-glow {
    position: absolute; inset: var(--glow-inset, -1px); z-index: 1; border-radius: inherit;
    padding: var(--glow-ring, 1px); pointer-events: none;
    background:
      radial-gradient(60px circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.42) 30%, rgb(var(--fx-tint,255 255 255)/.16) 58%, rgb(var(--fx-tint,255 255 255)/0) 82%),
      radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.27) 42%, rgb(var(--fx-tint,255 255 255)/.08) 66%, rgb(var(--fx-tint,255 255 255)/0) 85%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude;
    opacity: calc(var(--glow,0) * var(--glow-strength,.63)); transition: opacity 140ms;
  }

  /* ── ripple (droplet) on the remove button ──────────────────── */
  .fx-ripples { position: absolute; inset: 0; z-index: 0; border-radius: inherit; overflow: hidden; pointer-events: none; }
  .fx-ripple {
    position: absolute; z-index: 1; pointer-events: none; border-radius: 50%; transform: translate(-50%,-50%) scale(0);
    background: radial-gradient(circle, rgb(var(--ring,255 255 255)/.38) 0%, rgb(var(--ring,255 255 255)/.20) 24%, rgb(var(--ring,255 255 255)/.09) 44%, rgb(var(--ring,255 255 255)/.03) 60%, transparent 76%);
    opacity: 0; will-change: transform, opacity;
    animation: badge-rip 780ms cubic-bezier(.22,1,.36,1) forwards, badge-fade 780ms cubic-bezier(.25,.1,.25,1) forwards;
  }
  @keyframes badge-rip  { from { transform: translate(-50%,-50%) scale(0); } to { transform: translate(-50%,-50%) scale(1); } }
  @keyframes badge-fade { from { opacity: .8; } to { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    .badge, .badge__close { transition: none; }
    .fx-ripple { display: none; }
  }
`;let y;function G(t){if(y||=document.createElement("canvas").getContext("2d"),!y)return null;y.fillStyle="#000",y.fillStyle=t;const r=y.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const e=r.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const H=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function S(t,r){const e=r?G(String(r).trim()):null;if(!e){for(const n of H)t.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),a=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,b=`rgb(${e[0]} ${e[1]} ${e[2]})`,g=e.map(n=>Math.round(a?n*.92:n+(255-n)*.16)),d=(n,v)=>t.style.setProperty(n,v);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(n,b);d("--btn-primary-bg-hover",`rgb(${g[0]} ${g[1]} ${g[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(n,a?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])d(n,a?"0 0 0":"255 255 255");d("--vs-color",b),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class V extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","dot","removable","disabled","glow","color"];#i;#n;#r;#o;#s;#t;#e;#a;constructor(){super();const r=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=q,this.#i=document.createElement("span"),this.#n=document.createElement("span"),this.#n.className="fx-glow badge__glow",this.#n.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="badge__dot",this.#r.setAttribute("aria-hidden","true"),this.#o=document.createElement("span"),this.#o.className="badge__label",this.#s=document.createElement("slot"),this.#o.appendChild(this.#s),this.#t=document.createElement("button"),this.#t.className="badge__close",this.#t.type="button",this.#e=document.createElement("span"),this.#e.className="fx-ripples badge__ripples",this.#e.setAttribute("aria-hidden","true");const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("aria-hidden","true");for(const l of["M6 6L18 18","M18 6L6 18"]){const a=document.createElementNS("http://www.w3.org/2000/svg","path");a.setAttribute("d",l),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),s.appendChild(a)}this.#t.append(this.#e,s),this.#i.append(this.#n,this.#r,this.#o,this.#t),r.append(e,this.#i),this.#t.addEventListener("pointerdown",l=>this.#c(l));for(const l of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(l,()=>{this.#t.style.transform=""});this.#t.addEventListener("click",()=>this.#d())}connectedCallback(){S(this,this.getAttribute("color")),this.#l(),this.#a=O(this.#i,160,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow"))}disconnectedCallback(){this.#a?.()}attributeChangedCallback(){S(this,this.getAttribute("color")),this.#i&&this.#l()}#l(){const r=(b,g)=>this.getAttribute(b)??g,e=this.hasAttribute("disabled"),s=this.hasAttribute("removable"),l=this.hasAttribute("dot"),a=r("label","New");this.#i.className=`badge badge--${r("size","md")} badge--v-${r("variant","soft")} badge--r-${r("radius","pill")} badge--t-${r("tone","default")}${e?" is-disabled":""}`,this.#s.textContent=a,this.#r.hidden=!l,this.#t.style.display=s?"":"none",this.#t.disabled=e,this.#t.setAttribute("aria-label",`Remove ${a}`)}#c(r){if(this.#t.disabled)return;const e=this.#t.getBoundingClientRect(),s=r.clientX-e.left,l=r.clientY-e.top,a=Math.max(s,e.width-s),b=Math.max(l,e.height-l),g=Math.hypot(a,b)*2,d=document.createElement("span");for(d.className="fx-ripple",d.style.cssText=`left:${s}px;top:${l}px;width:${g}px;height:${g}px`,d.addEventListener("animationend",()=>d.remove()),this.#e.appendChild(d);this.#e.childElementCount>6;)this.#e.firstElementChild.remove();this.#t.style.transform="scale(.92)"}#d(){this.hasAttribute("disabled")||this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0,detail:{}}))}}customElements.define("vs-badge",V);
