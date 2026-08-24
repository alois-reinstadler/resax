const R="http://www.w3.org/2000/svg";function z(s){const e=document.createElementNS(R,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none");for(const t of s){const i=document.createElementNS(R,"path");i.setAttribute("d",t.d),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),t.miter&&i.setAttribute("stroke-miterlimit",t.miter),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),e.appendChild(i)}return e}const V=()=>z([{d:"M9 17V11L7 13"},{d:"M9 11L11 13"},{d:"M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"},{d:"M22 10H18C15 10 14 9 14 6V2L22 10Z"}]),N=()=>z([{d:"M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z",miter:"10"},{d:"M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5",miter:"10"},{d:"M8 13H12",miter:"10"},{d:"M8 17H16",miter:"10"}]),S=()=>z([{d:"M6 6L18 18"},{d:"M18 6L6 18"}]),U=()=>z([{d:"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"},{d:"M7.75 11.9999L10.58 14.8299L16.25 9.16992"}]),O=()=>z([{d:"M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"},{d:"M9.17004 14.8299L14.83 9.16992"},{d:"M14.83 14.8299L9.17004 9.16992"}]),C=new Set;let L=0,A=0,$=!1,k=0,P=!1,M=null;function q(){if(k=0,!!$)for(const s of C){if(!s.visible)continue;if(s.disabled()){s.lastI!==0&&(s.el.style.setProperty("--glow","0"),s.lastI=0);continue}s.rect||(s.rect=s.el.getBoundingClientRect());const e=s.rect,t=Math.max(e.left,Math.min(L,e.right)),i=Math.max(e.top,Math.min(A,e.bottom)),r=Math.max(0,1-Math.hypot(L-t,A-i)/s.radius);r===0&&s.lastI===0||(s.el.style.setProperty("--gx",`${L-e.left}px`),s.el.style.setProperty("--gy",`${A-e.top}px`),s.el.style.setProperty("--glow",r.toFixed(3)),s.lastI=r)}}function G(s){L=s.clientX,A=s.clientY,$=!0,k||(k=requestAnimationFrame(q))}function j(){for(const s of C)s.rect=null;$&&!k&&(k=requestAnimationFrame(q))}function Z(s,e,t){P||(P=!0,addEventListener("pointermove",G,{passive:!0}),addEventListener("scroll",j,{passive:!0,capture:!0}),addEventListener("resize",j,{passive:!0}),M=new IntersectionObserver(n=>{for(const d of n)for(const c of C)c.el===d.target&&(c.visible=d.isIntersecting,d.isIntersecting&&(c.rect=null))}));const i={el:s,radius:e,disabled:t,rect:null,visible:!0,lastI:0};C.add(i),M.observe(s);const r=Y.add(s);return()=>{C.delete(i),M.unobserve(s),r()}}function D(s){return s<1024?`${s} B`:s<1024*1024?`${(s/1024).toFixed(1)} KB`:`${(s/1024/1024).toFixed(1)} MB`}const Y=globalThis[Symbol.for("vs-light")]||=(()=>{const s=new Set,e=110,t=1.6,i=1.7,r=34,n=72,d=[[.6,0],[.42,30],[.16,58],[0,82]],c=[[.6,0],[.27,42],[.08,66],[0,85]],p=[[.85,0],[.4,42],[.12,66],[0,84]];let a=0,h=null;const m=(b,o,g)=>{const _=o.w/2+b,y=o.h/2+b,v=o.h/2/y;return`radial-gradient(${_.toFixed(1)}px ${y.toFixed(1)}px at ${o.x.toFixed(1)}px ${o.y.toFixed(1)}px,`+g.map(([l,w])=>` rgb(${o.rgb} / ${(l*o.k).toFixed(3)}) ${((v+w/100*(1-v))*100).toFixed(1)}%`).join(",")+")"};function f(){const b=[];for(const o of document.querySelectorAll("[color],[data-lamp]")){const g=getComputedStyle(o),_=g.getPropertyValue("--vs-color-rgb").trim()||(o.hasAttribute("data-lamp")?(g.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");_&&b.push({el:o,rgb:_,rect:o.getBoundingClientRect()})}return b}function x(){if(a=0,!s.size)return;const b=f();for(const o of s){if(!o.visible)continue;if(!b.length){o.on&&(o.el.style.setProperty("--lit","0"),o.on=!1);continue}const g=o.el.getBoundingClientRect(),_=g.left+g.width/2,y=g.top+g.height/2,v=[];for(const l of b){if(l.el===o.el||l.el.contains(o.el)||o.el.contains(l.el))continue;const w=Math.max(l.rect.left,Math.min(_,l.rect.right)),I=Math.max(l.rect.top,Math.min(y,l.rect.bottom)),B=Math.max(g.left,Math.min(w,g.right)),T=Math.max(g.top,Math.min(I,g.bottom)),F=Math.max(0,1-Math.hypot(w-B,I-T)/e)**t*i;F&&v.push({rgb:l.rgb,k:Math.min(1,F),w:l.rect.width,h:l.rect.height,x:l.rect.left+l.rect.width/2-g.left,y:l.rect.top+l.rect.height/2-g.top})}if(!v.length){o.on&&(o.el.style.setProperty("--lit","0"),o.on=!1);continue}v.sort((l,w)=>l.k-w.k),o.el.style.setProperty("--lit-ring",v.flatMap(l=>[m(r,l,d),m(n,l,c)]).join(",")),o.el.style.setProperty("--lit-fill",v.map(l=>m(n,l,p)).join(",")),o.el.style.setProperty("--lit","1"),o.on=!0}}const u=()=>{a||(a=requestAnimationFrame(x))};return addEventListener("scroll",u,{passive:!0,capture:!0}),addEventListener("resize",u,{passive:!0}),globalThis.vsLight=u,{add(b){h||=new IntersectionObserver(g=>{for(const _ of g)for(const y of s)y.el===_.target&&(y.visible=_.isIntersecting);u()});const o={el:b,visible:!0,on:!1};return s.add(o),h.observe(b),u(),()=>{s.delete(o),h.unobserve(b)}}}})(),K=`
  :host { display: block; }
  .upl {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    display: inline-flex;
    flex-direction: column;
    min-width: 17rem;
    font-size: var(--fs);
    font-family: inherit;
    color: var(--inp-text, #ededed);
  }
  .upl--block { display: flex; width: 100%; }
  .upl--sm { --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); }
  .upl--lg { --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); }

  /* drop zone */
  .upl__zone {
    --rr: calc(var(--r) * 1.4);
    --zone-h: 172px;
    --zone-px: 24px;
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: var(--zone-h);
    padding: 0 var(--zone-px);
    border: 1.5px dashed var(--inp-border, #2a2a2a);
    border-radius: var(--rr);
    background: var(--bg-elevated, #111);
    cursor: pointer;
    text-align: center;
    transition:
      min-height 620ms cubic-bezier(0.34, 1.56, 0.64, 1),
      border-color 220ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      background-color 220ms ease,
      transform 320ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .upl--sm .upl__zone { --zone-h: 140px; --zone-px: 18px; }
  .upl--lg .upl__zone { --zone-h: 210px; --zone-px: 32px; }
  .upl.is-filled .upl__zone { --zone-h: calc(52px + 2 * var(--zone-px)); cursor: default; }

  .upl__empty, .upl__single {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 380ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      filter 380ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      transform 380ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }
  .upl__single { padding: 0 var(--zone-px); gap: 14px; text-align: left; }
  .upl__empty { flex-direction: column; gap: 12px; padding: 0 14px; }
  .upl__empty.is-hidden, .upl__single.is-hidden { opacity: 0; filter: blur(5px); transform: scale(0.97); pointer-events: none; }

  .upl--r-none .upl__zone { --rr: 0px; }
  .upl--r-subtle .upl__zone { --rr: 8px; }
  .upl--r-pill .upl__zone { --rr: 28px; }
  @supports (corner-shape: squircle) {
    .upl--r-squircle .upl__zone { --rr: calc(var(--r) * 2.4); corner-shape: squircle; }
    .upl--r-squircle .upl__glow { corner-shape: squircle; }
  }

  /* proximity glow on the zone border (SFC parity: .upl__glow in the SFC) */
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
  .upl__zone::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .upl__zone::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .upl__glow { --glow-strength: 0.6; --glow-ring: 1.5px; --glow-inset: -1.5px; border-radius: var(--rr); }

  .upl__zone:hover:not(.is-disabled), .upl__zone:focus-visible {
    outline: none;
    border-color: var(--inp-border-hover, #3d3d3d);
    background: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
  }
  .upl.is-dragging .upl__zone {
    border-color: var(--accent);
    border-style: solid;
    background: rgb(var(--ring) / 0.06);
    transform: scale(1.012);
  }

  .upl__icon {
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: rgb(var(--ring) / 0.08);
    color: var(--accent);
    transition: transform 320ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  .upl__icon svg { width: 22px; height: 22px; }
  .upl.is-dragging .upl__icon { transform: translateY(-4px) scale(1.08); }
  .upl__zone:hover:not(.is-disabled) .upl__icon { transform: translateY(-2px); }

  .upl__copy { position: relative; z-index: 2; display: grid; gap: 2px; }
  .upl__label { margin: 0; font-weight: 600; text-wrap: balance; line-height: 1.25; }
  .upl__hint { margin: 0; font-size: 0.86em; color: var(--text-secondary, #aaa); text-wrap: balance; line-height: 1.3; }

  .upl__input { display: none; }

  .upl__single-thumb {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 52px;
    height: 52px;
    border-radius: 12px;
    overflow: hidden;
    background: rgb(var(--ring) / 0.08);
    color: var(--text-secondary, #aaa);
  }
  .upl__single-thumb svg { width: 24px; height: 24px; }
  .upl__single-thumb.has-img { background: rgb(var(--ring) / 0.04); }
  .upl__single-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .upl__single-main { flex: 1; min-width: 0; display: grid; gap: 8px; }

  .upl__file-icon.has-img { background: rgb(var(--ring) / 0.04); overflow: hidden; }
  .upl__file-icon img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }

  /* list */
  .upl__list { display: grid; grid-template-rows: 0fr; margin-top: 0; opacity: 0;
    transition: grid-template-rows 580ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
                margin-top 580ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
                opacity 360ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)); }
  .upl__list.has-files { grid-template-rows: 1fr; margin-top: 14px; opacity: 1; }
  .upl__list-inner { overflow: hidden; min-height: 0; display: grid; gap: 8px; }
  .upl__list-head { display: flex; align-items: center; justify-content: space-between; font-size: 0.82em; color: var(--text-secondary, #aaa); }
  .upl__clear { border: none; background: none; color: var(--text-muted, #888); font: inherit; font-size: 0.95em; cursor: pointer; transition: color 160ms ease; }
  .upl__clear:hover { color: var(--accent); }

  .upl__items { list-style: none; margin: 0; padding: 0; }
  .upl__item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    padding: 10px 12px;
    border: 1px solid var(--inp-border, #2a2a2a);
    border-radius: 12px;
    background: var(--bg-card, #161616);
    overflow: hidden;
    max-height: 120px;
    transform-origin: center top;
    transition:
      opacity 300ms ease,
      filter 300ms ease,
      transform 400ms var(--ease-spring, cubic-bezier(0.34, 1.4, 0.6, 1)),
      max-height 400ms var(--ease-out, cubic-bezier(0.4, 0, 0.2, 1)),
      margin 400ms var(--ease-out, cubic-bezier(0.4, 0, 0.2, 1)),
      padding 400ms var(--ease-out, cubic-bezier(0.4, 0, 0.2, 1));
  }
  .upl__item:last-child { margin-bottom: 0; }
  .upl__item.is-entering { opacity: 0; filter: blur(8px); transform: translateY(-16px) scale(0.9); }
  .upl__item.is-leaving { opacity: 0; filter: blur(7px); max-height: 0; margin-bottom: 0; padding-top: 0; padding-bottom: 0; transform: scaleY(0.96); }

  .upl__file-icon {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: rgb(var(--ring) / 0.08);
    color: var(--text-secondary, #aaa);
  }
  .upl__file-icon svg { width: 18px; height: 18px; }

  .upl__file-main { flex: 1; min-width: 0; display: grid; gap: 6px; }
  .upl__file-row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
  .upl__file-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.88em; font-weight: 500; }
  .upl__file-size { flex-shrink: 0; font-size: 0.78em; color: var(--text-muted, #888); }

  .upl__bar { position: relative; height: 5px; border-radius: 999px; background: rgb(var(--ring) / 0.1); overflow: hidden; }
  .upl__bar-fill { display: block; height: 100%; border-radius: inherit; background: var(--accent); transition: width 320ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)); }
  .upl__bar.is-done .upl__bar-fill { background: var(--inp-t-success-rest, #4cc38a); }
  .upl__bar.is-error .upl__bar-fill { background: var(--inp-t-danger-rest, #ff6369); }

  .upl__status { display: grid; place-items: center; flex-shrink: 0; width: 26px; height: 26px; }
  .upl__status svg { width: 16px; height: 16px; }
  .upl__status.is-done { color: #4cc38a; }
  .upl__status.is-error { color: #ff6369; }
  .upl__pct { font-size: 0.72em; color: var(--text-muted, #888); font-variant-numeric: tabular-nums; }

  .upl__remove {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 7px;
    background: none;
    color: var(--text-muted, #888);
    cursor: pointer;
    transition: color 160ms ease, background-color 160ms ease;
  }
  .upl__remove svg { width: 15px; height: 15px; }
  .upl__remove:hover { color: #ff6369; background: rgb(255 99 105 / 0.1); }

  .upl--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; }
  .upl--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; }
  .upl--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; }

  .upl.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .upl__zone, .upl__icon, .upl__bar-fill, .upl__empty, .upl__single,
    .upl__list, .upl__item { transition: none; }
  }
`;let E;function W(s){if(E||=document.createElement("canvas").getContext("2d"),!E)return null;E.fillStyle="#000",E.fillStyle=s;const e=E.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const X=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function H(s,e){const t=e?W(String(e).trim()):null;if(!t){for(const a of X)s.style.removeProperty(a);return}const i=a=>(a/=255,a<=.03928?a/12.92:((a+.055)/1.055)**2.4),n=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,d=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(a=>Math.round(n?a*.92:a+(255-a)*.16)),p=(a,h)=>s.style.setProperty(a,h);for(const a of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])p(a,d);p("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const a of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])p(a,t.join(" "));for(const a of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])p(a,n?"#0b0b0b":"#ffffff");for(const a of["--btn-primary-rip","--btn-primary-glow"])p(a,n?"0 0 0":"255 255 255");p("--vs-color",d),p("--vs-color-rgb",t.join(" ")),p("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class J extends HTMLElement{static observedAttributes=["label","hint","size","radius","tone","multiple","accept","max-size","disabled","glow","block","color"];#a;#e;#m;#c;#p;#g;#f;#d;#i;#u;#b;#x;#_;#N;#t=[];#j=0;#h=0;#n=!1;#o=new Set;#y=null;#w;#E;#C;#k;#z;#L;#A;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=K,this.#a=document.createElement("div"),this.#a.className="upl",this.#e=document.createElement("div"),this.#e.className="upl__zone",this.#e.setAttribute("role","button"),this.#e.setAttribute("tabindex","0"),this.#m=document.createElement("span"),this.#m.className="fx-glow upl__glow",this.#m.setAttribute("aria-hidden","true"),this.#c=document.createElement("div"),this.#c.className="upl__empty",this.#p=document.createElement("span"),this.#p.className="upl__icon",this.#p.setAttribute("aria-hidden","true"),this.#p.appendChild(V());const i=document.createElement("div");i.className="upl__copy",this.#g=document.createElement("p"),this.#g.className="upl__label",this.#f=document.createElement("p"),this.#f.className="upl__hint",i.append(this.#g,this.#f),this.#c.append(this.#p,i),this.#d=document.createElement("div"),this.#d.className="upl__single is-hidden";const r=document.createElement("span");r.className="upl__single-thumb",r.setAttribute("aria-hidden","true"),r.appendChild(N());const n=document.createElement("div");n.className="upl__single-main";const d=document.createElement("div");d.className="upl__file-row";const c=document.createElement("span");c.className="upl__file-name";const p=document.createElement("span");p.className="upl__file-size",d.append(c,p);const a=document.createElement("div");a.className="upl__bar";const h=document.createElement("span");h.className="upl__bar-fill",a.appendChild(h),n.append(d,a);const m=document.createElement("button");m.type="button",m.className="upl__remove",m.setAttribute("aria-label","Remove"),m.appendChild(S()),this.#d.append(r,n,m),this.#N={thumb:r,name:c,size:p,bar:a,fill:h,remove:m},this.#i=document.createElement("input"),this.#i.type="file",this.#i.className="upl__input",this.#e.append(this.#m,this.#c,this.#d,this.#i),this.#u=document.createElement("div"),this.#u.className="upl__list";const f=document.createElement("div");f.className="upl__list-inner",this.#b=document.createElement("div"),this.#b.className="upl__list-head",this.#x=document.createElement("span");const x=document.createElement("button");x.type="button",x.className="upl__clear",x.textContent="Clear",this.#b.append(this.#x,x),this.#_=document.createElement("ul"),this.#_.className="upl__items",f.append(this.#b,this.#_),this.#u.appendChild(f),this.#a.append(this.#e,this.#u),e.append(t,this.#a),this.#w=()=>this.#F(),this.#E=u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),this.#F())},this.#C=u=>this.#H(u),this.#k=u=>{this.hasAttribute("disabled")||u.preventDefault()},this.#z=()=>this.#q(),this.#L=u=>this.#B(u),this.#A=u=>this.#T(u),m.addEventListener("click",u=>{u.stopPropagation(),this.#S(this.#I)}),x.addEventListener("click",u=>{u.stopPropagation(),this.#V()})}#D(){this.#M(),this.#e.addEventListener("click",this.#w),this.#e.addEventListener("keydown",this.#E),this.#e.addEventListener("dragenter",this.#C),this.#e.addEventListener("dragover",this.#k),this.#e.addEventListener("dragleave",this.#z),this.#e.addEventListener("drop",this.#L),this.#i.addEventListener("change",this.#A)}#M(){this.#e.removeEventListener("click",this.#w),this.#e.removeEventListener("keydown",this.#E),this.#e.removeEventListener("dragenter",this.#C),this.#e.removeEventListener("dragover",this.#k),this.#e.removeEventListener("dragleave",this.#z),this.#e.removeEventListener("drop",this.#L),this.#i.removeEventListener("change",this.#A)}connectedCallback(){this.#D(),H(this,this.getAttribute("color")),this.#s(),this.#y=Z(this.#e,280,()=>this.hasAttribute("disabled")||this.getAttribute("glow")==="false")}disconnectedCallback(){this.#y?.(),this.#y=null,this.#M(),queueMicrotask(()=>{if(!this.isConnected){for(const e of this.#o)clearTimeout(e);this.#o.clear();for(const e of this.#t)e.url&&URL.revokeObjectURL(e.url)}})}attributeChangedCallback(){H(this,this.getAttribute("color")),this.#a&&this.#s()}get files(){return this.#t.map(e=>e.file)}#l(e,t){return this.getAttribute(e)??t}#$(e,t){const i=this.getAttribute(e);return i===null?t:i!=="false"}get#v(){return this.#$("multiple",!0)}get#r(){return!this.#v&&this.#t.length>0}get#I(){return this.#t[0]?.id}#s(){const e=this.hasAttribute("disabled"),t=this.#l("size","md"),i=this.#l("radius","squircle"),r=this.#l("tone","default"),n=this.#$("block",!0),d=this.#l("label","Drag your files here"),c=this.#l("hint","or click to browse"),p=this.#l("accept",""),a=["upl",`upl--${t}`,`upl--r-${i}`,`upl--t-${r}`];e&&a.push("is-disabled"),this.#n&&a.push("is-dragging"),this.#r&&a.push("is-filled"),n&&a.push("upl--block"),this.#a.className=a.join(" "),this.#e.setAttribute("aria-disabled",e?"true":"false"),this.#g.textContent=d,this.#f.textContent=c,this.#i.multiple=this.#v,p?this.#i.setAttribute("accept",p):this.#i.removeAttribute("accept"),this.#i.disabled=e,this.#c.classList.toggle("is-hidden",this.#r),this.#d.classList.toggle("is-hidden",!this.#r),this.#r&&this.#O(this.#t[0]),this.#u.classList.toggle("has-files",!this.#r&&this.#t.length>0),this.#x.textContent=`${this.#t.filter(h=>h.status==="done").length}/${this.#t.length} ${this.#t.length===1?"file":"files"}`}#F(){this.hasAttribute("disabled")||this.#r||this.#i.click()}#H(e){this.hasAttribute("disabled")||(e.preventDefault(),this.#h++,this.#n||(this.#n=!0,this.#s()))}#q(){this.hasAttribute("disabled")||(this.#h=Math.max(0,this.#h-1),this.#h===0&&this.#n&&(this.#n=!1,this.#s()))}#B(e){if(this.hasAttribute("disabled"))return;e.preventDefault(),this.#h=0,this.#n&&(this.#n=!1,this.#s());const t=e.dataTransfer?.files;t&&this.#R(Array.from(t))}#T(e){const t=e.target.files;t&&this.#R(Array.from(t)),e.target.value=""}#R(e){if(this.hasAttribute("disabled")||!e.length||this.#r)return;const t=this.#v?e:e.slice(0,1),i=parseFloat(this.getAttribute("max-size"))||0,r=[];for(const n of t){const d=i>0&&n.size>i*1024*1024,c={id:++this.#j,file:n,name:n.name,size:n.size,type:n.type,progress:d?100:0,status:d?"error":"uploading",url:n.type.startsWith("image/")?URL.createObjectURL(n):void 0,el:null};this.#t.push(c),r.push(c)}if(this.#v)for(const n of r)this.#Z(n);this.#s();for(const n of r)n.status==="uploading"&&this.#U(n);this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}}))}#S(e){const t=this.#t.find(i=>i.id===e);t&&(t.url&&URL.revokeObjectURL(t.url),this.#t=this.#t.filter(i=>i.id!==e),t.el&&this.#P(t.el),this.#s(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}})))}#V(){if(this.#t.length){for(const e of this.#t)e.url&&URL.revokeObjectURL(e.url),e.el&&this.#P(e.el);this.#t=[],this.#s(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{files:this.files}}))}}#U(e){const t=()=>{const r=this.#t.find(n=>n.id===e.id);if(!(!r||r.status!=="uploading"))if(r.progress=Math.min(100,r.progress+Math.random()*18+6),r.progress>=100&&(r.progress=100,r.status="done"),this.#G(r),r.status==="uploading"){const n=setTimeout(()=>{this.#o.delete(n),t()},180+Math.random()*220);this.#o.add(n)}else this.#s()},i=setTimeout(()=>{this.#o.delete(i),t()},200);this.#o.add(i)}#G(e){if(this.#r&&e.id===this.#I){this.#O(e);return}if(!e.el)return;const{bar:t,fill:i,status:r}=e.el;if(t.className=`upl__bar is-${e.status}`,i.style.width=`${e.progress}%`,r.className=`upl__status is-${e.status}`,r.replaceChildren(),e.status==="done")r.appendChild(U());else if(e.status==="error")r.appendChild(O());else{const n=document.createElement("span");n.className="upl__pct",n.textContent=`${Math.round(e.progress)}%`,r.appendChild(n)}}#O(e){const t=this.#N;if(t.name.textContent=e.name,t.size.textContent=D(e.size),t.bar.className=`upl__bar is-${e.status}`,t.fill.style.width=`${e.progress}%`,t.thumb.classList.toggle("has-img",!!e.url),t.thumb.replaceChildren(),e.url){const i=document.createElement("img");i.src=e.url,i.alt=e.name,t.thumb.appendChild(i)}else t.thumb.appendChild(N())}#Z(e){const t=document.createElement("li");t.className="upl__item is-entering";const i=document.createElement("span");if(i.className="upl__file-icon",i.setAttribute("aria-hidden","true"),e.url){i.classList.add("has-img");const f=document.createElement("img");f.src=e.url,f.alt=e.name,i.appendChild(f)}else i.appendChild(N());const r=document.createElement("div");r.className="upl__file-main";const n=document.createElement("div");n.className="upl__file-row";const d=document.createElement("span");d.className="upl__file-name",d.textContent=e.name;const c=document.createElement("span");c.className="upl__file-size",c.textContent=D(e.size),n.append(d,c);const p=document.createElement("div");p.className=`upl__bar is-${e.status}`;const a=document.createElement("span");a.className="upl__bar-fill",a.style.width=`${e.progress}%`,p.appendChild(a),r.append(n,p);const h=document.createElement("span");if(h.className=`upl__status is-${e.status}`,h.setAttribute("aria-hidden","true"),e.status==="error")h.appendChild(O());else{const f=document.createElement("span");f.className="upl__pct",f.textContent=`${Math.round(e.progress)}%`,h.appendChild(f)}const m=document.createElement("button");m.type="button",m.className="upl__remove",m.setAttribute("aria-label","Remove file"),m.appendChild(S()),m.addEventListener("click",f=>{f.stopPropagation(),this.#S(e.id)}),t.append(i,r,h,m),e.el={li:t,bar:p,fill:a,status:h},this.#_.appendChild(t),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.remove("is-entering")))}#P(e){const{li:t}=e;t.classList.add("is-leaving");let i=!1;const r=()=>{i||(i=!0,t.remove())};t.addEventListener("transitionend",r,{once:!0}),setTimeout(r,500)}}customElements.define("vs-upload-file",J);
