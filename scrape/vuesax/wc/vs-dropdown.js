const M=new Set;let S=0,N=0,F=!1,$=0,H=!1,z=null;function G(){if($=0,!!F)for(const l of M){if(!l.visible)continue;if(l.disabled()){l.lastI!==0&&(l.el.style.setProperty("--glow","0"),l.lastI=0);continue}l.rect||(l.rect=l.el.getBoundingClientRect());const t=l.rect,e=Math.max(t.left,Math.min(S,t.right)),s=Math.max(t.top,Math.min(N,t.bottom)),i=Math.max(0,1-Math.hypot(S-e,N-s)/l.radius);i===0&&l.lastI===0||(l.el.style.setProperty("--gx",`${S-t.left}px`),l.el.style.setProperty("--gy",`${N-t.top}px`),l.el.style.setProperty("--glow",i.toFixed(3)),l.lastI=i)}}function W(l){S=l.clientX,N=l.clientY,F=!0,$||($=requestAnimationFrame(G))}function O(){for(const l of M)l.rect=null;F&&!$&&($=requestAnimationFrame(G))}function X(l,t,e){H||(H=!0,addEventListener("pointermove",W,{passive:!0}),addEventListener("scroll",O,{passive:!0,capture:!0}),addEventListener("resize",O,{passive:!0}),z=new IntersectionObserver(a=>{for(const r of a)for(const o of M)o.el===r.target&&(o.visible=r.isIntersecting,r.isIntersecting&&(o.rect=null))}));const s={el:l,radius:t,disabled:e,rect:null,visible:!0,lastI:0};M.add(s),z.observe(l);const i=st.add(l);return()=>{M.delete(s),z.unobserve(l),i()}}const j="http://www.w3.org/2000/svg";function L(l,t="0 0 24 24"){const e=document.createElementNS(j,"svg");return e.setAttribute("viewBox",t),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true"),l&&e.setAttribute("class",l),e}function y(l,t){const e=document.createElementNS(j,"path");if(e.setAttribute("d",l),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t)for(const s in t)e.setAttribute(s,t[s]);return e}const K="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502";function T(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}const q=[{label:"Profile",value:"profile",icon:"M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"},{label:"Settings",value:"settings",icon:"M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"},{label:"Billing",value:"billing",icon:"M2 8.50488H22M6 16.5049H8M10.5 16.5049H14.5M6.44 3.50488H17.55C21.11 3.50488 22 4.38488 22 7.89488V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89488C2 4.38488 2.89 3.50488 6.44 3.50488Z"},{label:"Sign out",value:"signout",tone:"danger",divider:!0,icon:"M17.4399 14.62L19.9999 12.06L17.4399 9.5M9.75977 12.0596H19.9298M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"}],J=["avatar","button","icon","chip"],D={none:12,subtle:12,rounded:16,pill:22,squircle:22},P={sm:216,md:248,lg:280},B={sm:34,md:38,lg:42},Q="cubic-bezier(0.34, 1.46, 0.44, 1)",tt="cubic-bezier(0.34, 1.8, 0.36, 1)",et="cubic-bezier(0.34, 1.1, 0.44, 1)",it="cubic-bezier(0.34, 1.2, 0.36, 1)",C=610,b=530,st=globalThis[Symbol.for("vs-light")]||=(()=>{const l=new Set,t=110,e=1.6,s=1.7,i=34,a=72,r=[[.6,0],[.42,30],[.16,58],[0,82]],o=[[.6,0],[.27,42],[.08,66],[0,85]],d=[[.85,0],[.4,42],[.12,66],[0,84]];let n=0,c=null;const h=(m,p,u)=>{const g=p.w/2+m,w=p.h/2+m,_=p.h/2/w;return`radial-gradient(${g.toFixed(1)}px ${w.toFixed(1)}px at ${p.x.toFixed(1)}px ${p.y.toFixed(1)}px,`+u.map(([f,A])=>` rgb(${p.rgb} / ${(f*p.k).toFixed(3)}) ${((_+A/100*(1-_))*100).toFixed(1)}%`).join(",")+")"};function E(){const m=[];for(const p of document.querySelectorAll("[color],[data-lamp]")){const u=getComputedStyle(p),g=u.getPropertyValue("--vs-color-rgb").trim()||(p.hasAttribute("data-lamp")?(u.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");g&&m.push({el:p,rgb:g,rect:p.getBoundingClientRect()})}return m}function x(){if(n=0,!l.size)return;const m=E();for(const p of l){if(!p.visible)continue;if(!m.length){p.on&&(p.el.style.setProperty("--lit","0"),p.on=!1);continue}const u=p.el.getBoundingClientRect(),g=u.left+u.width/2,w=u.top+u.height/2,_=[];for(const f of m){if(f.el===p.el||f.el.contains(p.el)||p.el.contains(f.el))continue;const A=Math.max(f.rect.left,Math.min(g,f.rect.right)),I=Math.max(f.rect.top,Math.min(w,f.rect.bottom)),Z=Math.max(u.left,Math.min(A,u.right)),U=Math.max(u.top,Math.min(I,u.bottom)),R=Math.max(0,1-Math.hypot(A-Z,I-U)/t)**e*s;R&&_.push({rgb:f.rgb,k:Math.min(1,R),w:f.rect.width,h:f.rect.height,x:f.rect.left+f.rect.width/2-u.left,y:f.rect.top+f.rect.height/2-u.top})}if(!_.length){p.on&&(p.el.style.setProperty("--lit","0"),p.on=!1);continue}_.sort((f,A)=>f.k-A.k),p.el.style.setProperty("--lit-ring",_.flatMap(f=>[h(i,f,r),h(a,f,o)]).join(",")),p.el.style.setProperty("--lit-fill",_.map(f=>h(a,f,d)).join(",")),p.el.style.setProperty("--lit","1"),p.on=!0}}const v=()=>{n||(n=requestAnimationFrame(x))};return addEventListener("scroll",v,{passive:!0,capture:!0}),addEventListener("resize",v,{passive:!0}),globalThis.vsLight=v,{add(m){c||=new IntersectionObserver(u=>{for(const g of u)for(const w of l)w.el===g.target&&(w.visible=g.isIntersecting);v()});const p={el:m,visible:!0,on:!1};return l.add(p),c.observe(m),v(),()=>{l.delete(p),c.unobserve(m)}}}})(),Y=`
  .dd__btn {
    display: inline-flex; align-items: center; gap: 8px;
    height: var(--h, 40px); padding: 0 16px; border-radius: 999px;
    background: var(--btn-primary-bg, #ededed); color: var(--btn-primary-text, #0a0a0a);
    font-weight: 600; white-space: nowrap;
  }
  .dd__btn-caret { width: 14px; height: 14px; opacity: 0.8; }
  .dd__icon {
    display: grid; place-items: center;
    width: var(--h, 40px); height: var(--h, 40px); border-radius: 12px;
    border: 1px solid var(--inp-border, #2a2a2a); background: var(--bg-elevated, #161616);
    color: var(--text, #ededed);
  }
  .dd__icon svg { width: 20px; height: 20px; }
  .dd__chip {
    display: inline-flex; align-items: center; gap: 8px;
    height: var(--h, 40px); padding: 4px 14px 4px 4px; border-radius: 999px;
    border: 1px solid var(--inp-border, #2a2a2a); background: var(--bg-elevated, #161616);
    color: var(--text, #ededed); font-weight: 500;
  }
  .dd__chip-name { white-space: nowrap; }
  .dd__avatar {
    position: relative; flex: none;
    width: var(--h, 40px); height: var(--h, 40px); border-radius: 50%;
    background-color: var(--ui-accent, #ededed); background-position: center; background-size: cover;
    color: var(--ui-accent-fg, #0b0b0b); display: grid; place-items: center; font-size: 13px; font-weight: 700;
    overflow: visible;
  }
  .dd__avatar img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }
  .dd__avatar-dot {
    position: absolute; right: 1px; bottom: 1px; width: 26%; height: 26%; min-width: 8px; min-height: 8px;
    border-radius: 50%; background: #30c46c; box-shadow: 0 0 0 2px var(--bg, #000);
  }
  .dd__chip .dd__avatar { width: calc(var(--h, 40px) - 12px); height: calc(var(--h, 40px) - 12px); font-size: 11px; }
  .dd__chip .dd__avatar-dot { display: none; }
`,rt=`
  :host {
    position: fixed; z-index: 50; display: block;
    width: var(--dd-w, 248px); max-height: min(70vh, 420px);
    /* NO \`isolation: isolate\` here: \`position: fixed\` + \`z-index\` already makes
       the stacking context, and isolation would additionally form a Backdrop
       Root — the surface \`backdrop-filter\` samples — leaving .dd__surface's
       acrylic with nothing behind it to blur (flat panel instead of glass). */
    border-radius: var(--rr, 16px); overflow: hidden;
    font-family: inherit; font-size: var(--fs, 14px);
  }
  @supports (corner-shape: squircle) { :host(.r-squircle) { corner-shape: squircle; } }
  ${Y}

  .dd__surface {
    position: absolute; inset: 0; z-index: 0; border-radius: inherit;
    border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
    background: var(--sel-menu-bg, #000);
    -webkit-backdrop-filter: blur(20px) saturate(180%); backdrop-filter: blur(20px) saturate(180%);
    box-shadow: var(--sel-menu-shadow, 0 12px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06));
    pointer-events: none;
  }
  .dd__panel-glow {
    position: absolute; inset: -1px; z-index: 1; border-radius: inherit; padding: 1px; pointer-events: none;
    background:
      radial-gradient(60px circle at var(--gx,50%) var(--gy,50%), rgb(var(--fx-tint,255 255 255)/.55), rgb(var(--fx-tint,255 255 255)/.35) 30%, rgb(var(--fx-tint,255 255 255)/.12) 58%, rgb(var(--fx-tint,255 255 255)/0) 82%),
      radial-gradient(200px circle at var(--gx,50%) var(--gy,50%), rgb(var(--fx-tint,255 255 255)/.5), rgb(var(--fx-tint,255 255 255)/.22) 42%, rgb(var(--fx-tint,255 255 255)/.07) 66%, rgb(var(--fx-tint,255 255 255)/0) 85%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude;
    opacity: calc(var(--glow,0) * .63); transition: opacity 140ms;
  }
  @supports (corner-shape: squircle) { :host(.r-squircle) .dd__panel-glow { corner-shape: squircle; } }

  /* ghost — the trigger surface that morphs (image scales with the box; clone is
     counter-scaled so it stays natural size while the fill wrapper expands) */
  .dd__ghost { position: absolute; inset: 0; z-index: 2; display: grid; place-items: center; pointer-events: none; }
  .dd__ghost--image { overflow: hidden; border-radius: inherit; }
  .dd__ghost--clone { border-radius: inherit; }
  .dd__ghost-img { width: 100%; height: 100%; object-fit: cover; display: block; -webkit-user-drag: none; user-select: none; }
  .dd__ghost-clone { display: inline-flex; }

  .dd__inner { position: relative; z-index: 1; display: flex; flex-direction: column; width: 100%; max-height: 100%; padding: var(--dd-pad, 6px); box-sizing: border-box; }
  .dd__identity {
    display: flex; flex-direction: column; gap: 2px; padding: 8px 10px 10px;
    opacity: 0; transform: translateY(-6px);
    transition: opacity 240ms ease, transform 280ms var(--ease-out, cubic-bezier(0.22,1,0.36,1));
  }
  :host(.is-expanded) .dd__identity { opacity: 1; transform: none; transition-delay: 80ms; }
  .dd__identity[hidden] { display: none; }
  .dd__name { display: flex; align-items: center; gap: 8px; font-weight: 600; color: var(--text, #ededed); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dd__pro { flex: none; font-size: 9px; font-weight: 800; letter-spacing: 0.04em; padding: 2px 6px; border-radius: 999px; background: var(--text, #ededed); color: var(--bg, #000); }
  .dd__pro[hidden] { display: none; }
  .dd__email { font-size: 0.85em; color: var(--text-muted, #8a8a8a); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* the list scrolls, but never paints a scrollbar: transformed children stick a
     few px out of the scroll box (the press tilt's perspective/rotateX, the
     highlight spring overshooting past the last item) and that phantom overflow
     flashes a full-width classic bar on Windows. gutter-less + hidden bar keeps
     the panel stable whether or not the content really overflows. */
  .dd__list {
    position: relative; flex: 1 1 auto; min-height: 0; margin: 0; padding: 0; list-style: none;
    overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain;
    scrollbar-width: none; -ms-overflow-style: none;
  }
  .dd__list::-webkit-scrollbar { width: 0; height: 0; }
  .dd__highlight {
    position: absolute; left: 0; right: 0; top: 0; z-index: 0; border-radius: var(--dd-item-r, 9px);
    background: var(--sel-opt-hover, rgb(20, 20, 20)); opacity: 0; pointer-events: none; will-change: transform, height;
    transition: transform 280ms cubic-bezier(0.34,1.42,0.5,1), height 220ms cubic-bezier(0.34,1.42,0.5,1), opacity 160ms ease;
  }
  .dd__highlight.is-on { opacity: 1; }
  .dd__divider { height: 1px; margin: 5px 6px; background: var(--border, rgba(255, 255, 255, 0.09)); }

  .dd__item {
    position: relative; z-index: 1; isolation: isolate; overflow: hidden;
    display: flex; align-items: center; gap: var(--dd-item-gap, 10px); padding: 0 var(--dd-item-px, 10px); height: var(--dd-item-h, var(--item-h, 38px));
    border-radius: var(--dd-item-r, 9px); color: var(--text-secondary, #c4c4c4); cursor: pointer; white-space: nowrap; text-decoration: none;
    opacity: 0; transform: translateY(-6px);
    transition: opacity 240ms ease, transform 280ms var(--ease-out, cubic-bezier(0.22,1,0.36,1)), background-color 120ms ease, color 120ms ease;
  }
  :host(.is-expanded) .dd__item { opacity: 1; transform: none; transition-delay: calc(var(--i, 0) * 26ms + 110ms); }
  .dd__item.is-active:not(.is-disabled) { color: var(--text, #ededed); }
  .dd__item.is-selected { color: var(--ui-accent, #ededed); font-weight: 600; }
  .dd__item.is-disabled { opacity: 0.4; cursor: not-allowed; }
  .dd__item-ripples { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .dd__item-icon, .dd__item-label, .dd__check, .dd__item-ext, .dd__item-badge { position: relative; z-index: 1; }
  .dd__item-icon { flex: none; width: var(--dd-icon-sz, 17px); height: var(--dd-icon-sz, 17px); opacity: 0.85; }
  .dd__item-label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
  /* trailing tier-chip: dark-glass pill w/ inset hairline — a copy of the
     catalog card Free flag (white text, no color, no bleed). Sits at the row's
     right edge (the label eats the free space). */
  .dd__item-badge {
    flex: none;
    display: inline-flex; align-items: center; height: 18px; padding: 0 8px;
    border-radius: 999px;
    font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
    color: #fff;
    background: color-mix(in srgb, #07060c 78%, transparent);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16);
    -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
  }
  .dd__check { flex: none; width: 16px; height: 16px; color: var(--ui-accent, #ededed); }
  /* the ↗ of an external item. Bigger than the check, and its own square so the
     glyph (drawn 7→17 inside a 24 box) stays centred on the row's optical line.
     Hovered, it LOOPS: the arrow leaves through the top-right corner, wraps back
     in from the bottom-left and rests a beat before going again — the direction
     it travels IS what the link does. The item already clips (overflow:hidden),
     so the flight reads as leaving the row, not floating over it. */
  .dd__item-ext {
    flex: none;
    width: var(--dd-ext-sz, 16px); height: var(--dd-ext-sz, 16px);
    opacity: 0.45;
    /* transform is here for the EXIT: leave the row mid-flight and the arrow
       eases home instead of snapping the instant the animation is dropped */
    transition: opacity .18s ease, transform .22s var(--ease-out, cubic-bezier(0.22,1,0.36,1));
  }
  .dd__item.is-active .dd__item-ext {
    opacity: 0.95;
    animation: dd-ext-fly 1150ms cubic-bezier(0.22, 1, 0.36, 1) infinite;
  }
  /* per-stop easing, so the arrow ACCELERATES out (it still reads as an arrow
     while it travels) instead of dissolving on the spot the moment it moves */
  @keyframes dd-ext-fly {
    0%, 12%   { transform: translate(0, 0);        opacity: .95;
                animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.35); }
    34%       { transform: translate(5px, -5px);   opacity: .95;
                animation-timing-function: cubic-bezier(0.4, 0, 1, 1); }
    44%       { transform: translate(15px, -15px); opacity: 0; }
    /* the wrap happens while invisible — no streak back across the row */
    45%       { transform: translate(-13px, 13px); opacity: 0;
                animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
    72%, 100% { transform: translate(0, 0);        opacity: .95; }
  }
  @media (prefers-reduced-motion: reduce) {
    .dd__item.is-active .dd__item-ext { animation: none; transform: translate(1px, -1px); }
  }
  .dd__item--t-danger { --rip: 255 99 105; color: var(--inp-t-danger-hint, #ff8a8e); }
  .dd__item--t-danger.is-active:not(.is-disabled) { color: #ff8a8e; }
  .dd__item--t-warn { --rip: 255 178 36; color: var(--inp-t-warn-hint, #ffce7a); }
  .dd__item--t-warn.is-active:not(.is-disabled) { color: #ffce7a; }
  .dd__item--t-success { --rip: 76 195 138; color: var(--inp-t-success-hint, #7ed4a6); }
  .dd__item--t-success.is-active:not(.is-disabled) { color: #7ed4a6; }

  .dd__ripple {
    position: absolute; border-radius: 50%; transform: translate(-50%, -50%) scale(0);
    background: radial-gradient(circle, rgb(var(--rip,255 255 255)/.30) 0%, rgb(var(--rip,255 255 255)/.16) 26%, rgb(var(--rip,255 255 255)/.06) 48%, transparent 70%);
    opacity: 0; will-change: transform, opacity;
    animation: dd-ripple-scale 720ms cubic-bezier(0.22,1,0.36,1) forwards, dd-ripple-fade 720ms cubic-bezier(0.25,0.1,0.25,1) forwards;
  }
  @keyframes dd-ripple-scale { from { transform: translate(-50%,-50%) scale(0); } to { transform: translate(-50%,-50%) scale(1); } }
  @keyframes dd-ripple-fade { from { opacity: .8; } to { opacity: 0; } }

  :host(.dd--t-danger) { --accent: #ff6369; --ui-accent-fg: #fff; --fx-tint: 255 99 105; }
  :host(.dd--t-warn) { --accent: #ffb224; --ui-accent-fg: #160f02; --fx-tint: 255 178 36; }
  :host(.dd--t-success) { --accent: #4cc38a; --ui-accent-fg: #fff; --fx-tint: 76 195 138; }

  @media (prefers-reduced-motion: reduce) {
    .dd__ghost { display: none; }
    .dd__identity, .dd__item { transition: none; }
    .dd__ripple { display: none; }
  }
`;class nt extends HTMLElement{#o;#h;#n;#l;#t;#p;#s;#d;#e;#i;#a;#r;#f=[];onPick=null;onHover=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=rt,this.#o=document.createElement("span"),this.#o.className="dd__surface",this.#o.setAttribute("aria-hidden","true"),this.#h=document.createElement("span"),this.#h.className="dd__panel-glow",this.#h.setAttribute("aria-hidden","true"),this.#o.appendChild(this.#h),this.#n=document.createElement("span"),this.#n.className="dd__ghost",this.#n.setAttribute("aria-hidden","true"),this.#p=document.createElement("div"),this.#p.className="dd__inner",this.#s=document.createElement("div"),this.#s.className="dd__identity",this.#s.hidden=!0;const s=document.createElement("span");s.className="dd__name",this.#d=document.createTextNode(""),this.#e=document.createElement("span"),this.#e.className="dd__pro",this.#e.textContent="PRO",this.#e.hidden=!0,s.append(this.#d,this.#e);const i=document.createElement("span");i.className="dd__email",this.#i=document.createTextNode(""),i.append(this.#i),this.#s.append(s,i),this.#a=document.createElement("ul"),this.#a.className="dd__list",this.#a.setAttribute("role","menu"),this.#r=document.createElement("div"),this.#r.className="dd__highlight",this.#r.setAttribute("aria-hidden","true"),this.#a.appendChild(this.#r),this.#p.append(this.#s,this.#a),t.append(e,this.#o,this.#n,this.#p)}get surfaceEl(){return this.#o}get glowEl(){return this.#h}get ghostEl(){return this.#n}get innerEl(){return this.#p}get ghostCloneEl(){return this.#t}configure({size:t,radius:e,tone:s,panelWidth:i,panelClass:a}){if(this.style.setProperty("--dd-w",i||`${P[t]??P.md}px`),this.style.setProperty("--rr",`${D[e]??D.squircle}px`),this.style.setProperty("--item-h",`${B[t]??B.md}px`),this.style.setProperty("--fs",t==="sm"?"13px":t==="lg"?"15px":"14px"),this.style.setProperty("--h",t==="sm"?"34px":t==="lg"?"46px":"40px"),this.classList.toggle("r-squircle",e==="squircle"),this.classList.remove("dd--t-danger","dd--t-warn","dd--t-success"),s&&s!=="default"&&this.classList.add(`dd--t-${s}`),this.dataset.panelClass)for(const r of this.dataset.panelClass.split(/\s+/).filter(Boolean))this.classList.remove(r);if(this.dataset.panelClass=a||"",a)for(const r of a.split(/\s+/).filter(Boolean))this.classList.add(r)}setIdentity({name:t,email:e,pro:s}){this.#s.hidden=!(t||e),this.#d.data=t||"",this.#i.data=e||"",this.#e.hidden=!s}prepareGhost(t,{img:e,bg:s,cloneNode:i}={}){this.#n.className=`dd__ghost dd__ghost--${t}`,this.#n.style.background=t==="clone"?s||"transparent":"",this.#n.replaceChildren(),this.#l=null,this.#t=null,t==="image"&&e?(this.#l=document.createElement("img"),this.#l.className="dd__ghost-img",this.#l.src=e,this.#l.draggable=!1,this.#n.appendChild(this.#l)):(this.#t=document.createElement("span"),this.#t.className="dd__ghost-clone",i&&this.#t.appendChild(i),this.#n.appendChild(this.#t))}setItems(t,e,s){for(const i of[...this.#a.children])i!==this.#r&&i.remove();this.#f=[],t.forEach((i,a)=>{if(i.divider){const n=document.createElement("li");n.className="dd__divider",n.setAttribute("role","separator"),n.setAttribute("aria-hidden","true"),this.#a.appendChild(n)}const r=document.createElement(i.href?"a":"li");r.className="dd__item"+(i.tone?` dd__item--t-${i.tone}`:"")+(i.value===e?" is-selected":"")+(i.disabled?" is-disabled":""),r.style.setProperty("--i",a),r.setAttribute("role","menuitem"),i.href&&r.setAttribute("href",i.href),i.disabled&&r.setAttribute("aria-disabled","true");const o=document.createElement("span");if(o.className="dd__item-ripples",o.setAttribute("aria-hidden","true"),r.appendChild(o),i.icon){const n=L("dd__item-icon");for(const c of Array.isArray(i.icon)?i.icon:[i.icon])n.appendChild(y(c));r.appendChild(n)}const d=document.createElement("span");if(d.className="dd__item-label",d.textContent=i.label??"",r.appendChild(d),i.badge){const n=document.createElement("span");n.className="dd__item-badge",n.textContent=i.badge,r.appendChild(n)}if(i.external&&i.href){r.setAttribute("target","_blank"),r.setAttribute("rel","noopener noreferrer");const n=L("dd__item-ext");n.appendChild(y("M7 17L17 7")),n.appendChild(y("M9 7H17V15")),r.appendChild(n)}if(i.value===e){const n=L("dd__check");n.appendChild(y("M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z")),n.appendChild(y("M7.75 11.9999L10.58 14.8299L16.25 9.16992")),r.appendChild(n)}r.addEventListener("pointerenter",()=>{i.disabled||this.onHover?.(a)}),r.addEventListener("pointerdown",n=>this.#u(n,r,a,i)),r.addEventListener("pointerup",()=>{r.style.transform=""}),r.addEventListener("pointerleave",()=>{r.style.transform=""}),r.addEventListener("pointercancel",()=>{r.style.transform=""}),r.addEventListener("click",()=>this.onPick?.(a)),this.#f[a]=r,this.#a.appendChild(r)}),this.updateActive(s??-1)}#u(t,e,s,i){if(i.disabled||T())return;const a=e.querySelector(".dd__item-ripples"),r=e.getBoundingClientRect(),o=t.clientX-r.left,d=t.clientY-r.top,n=Math.max(o,r.width-o),c=Math.max(d,r.height-d),h=document.createElement("span");for(h.className="dd__ripple",h.style.cssText=`left:${o}px;top:${d}px;width:${Math.hypot(n,c)*2}px;height:${Math.hypot(n,c)*2}px`,h.addEventListener("animationend",()=>h.remove()),a.appendChild(h);a.childElementCount>4;)a.firstElementChild.remove();const E=(o/r.width-.5)*2,x=(d/r.height-.5)*2,v=1-.2*Math.min(Math.abs(E),Math.abs(x));e.style.transform=`perspective(400px) rotateX(${(-x*7*v).toFixed(2)}deg) rotateY(${(E*5*v).toFixed(2)}deg) scale(0.97)`}updateActive(t){this.#f.forEach((e,s)=>{e&&e.classList.toggle("is-active",s===t)})}scrollActiveIntoView(t){this.#f[t]?.scrollIntoView({block:"nearest"})}refreshHighlight(t,e){const s=this.#f[t];if(t<0||!e||!s){this.#r.classList.remove("is-on");return}this.#r.style.transform=`translateY(${s.offsetTop}px)`,this.#r.style.height=`${s.offsetHeight}px`,this.#r.classList.add("is-on")}}const at=`
  :host { display: inline-flex; }
  .dd { --h: var(--ctrl-h-md, 40px); font-size: var(--ctrl-fs-md, 14px); font-family: inherit; user-select: none; -webkit-user-select: none; }
  .dd--sm { --h: var(--ctrl-h-sm, 34px); font-size: var(--ctrl-fs-sm, 13px); }
  .dd--lg { --h: var(--ctrl-h-lg, 46px); font-size: var(--ctrl-fs-lg, 15px); }
  ${Y}

  .dd__row { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; justify-content: center; }
  .dd__slot { position: relative; display: inline-flex; }
  .dd--embed { display: inline-flex; }
  .dd--embed .dd__row { gap: 0; }
  .dd--embed .dd__trigger { border-radius: 999px; }

  .dd__trigger {
    display: inline-flex; padding: 0; border: 0; background: none; cursor: pointer;
    -webkit-tap-highlight-color: transparent; font: inherit; color: inherit;
  }
  .dd__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
  .dd__trigger:focus-visible { outline: none; }
  .dd__trigger:focus-visible [data-dd-face] { outline: 2px solid var(--ui-accent, #ededed); outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) { .dd__btn-caret { transition: none; } }
`;let ot=0,k;function dt(l){if(k||=document.createElement("canvas").getContext("2d"),!k)return null;k.fillStyle="#000",k.fillStyle=l;const t=k.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const lt=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function V(l,t){const e=t?dt(String(t).trim()):null;if(!e){for(const n of lt)l.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),a=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(n=>Math.round(a?n*.92:n+(255-n)*.16)),d=(n,c)=>l.style.setProperty(n,c);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(n,r);d("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(n,a?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])d(n,a?"0 0 0":"255 255 255");d("--vs-color",r),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class ct extends HTMLElement{static observedAttributes=["size","radius","tone","placement","disabled","glow","embed","name","email","avatar","pro","value","panel-width","panel-class","open","color"];#o;#h;#n=[];#l=[];#t=null;#p=null;#s=q;#d="";#e=-1;#i=!1;#a=!1;#r=!1;#f=-1;#u=null;#g="image";#nt=`vs-dd-${++ot}`;#P=20;#A="round";#z=22;#k=20;#M=.16;#b=0;#_=0;#w=0;#C=null;#L=0;#$=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=at,this.#o=document.createElement("div"),this.#o.className="dd",this.#h=document.createElement("div"),this.#h.className="dd__row",this.#o.appendChild(this.#h),t.append(e,this.#o),this.#d=this.getAttribute("value")??""}connectedCallback(){V(this,this.getAttribute("color")),this.#T(),this.#y(),this.hasAttribute("open")&&this.#x()}disconnectedCallback(){this.#p?.(),this.#p=null,this.#G(),this.#it(),this.#t&&(this.#t.remove(),this.#t=null)}attributeChangedCallback(t){if(V(this,this.getAttribute("color")),!!this.#o){if(t==="open"){this.hasAttribute("open")?this.#X():this.#K();return}if(t==="value"){this.#d=this.getAttribute("value")??"",this.#t&&this.#i&&this.#t.setItems(this.#s,this.#d,this.#e);return}if(t==="embed"||t==="name"||t==="avatar"){this.#T(),this.#y();return}this.#y(),this.#i&&this.#t&&this.#I()}}set items(t){let e=null;if(Array.isArray(t))e=t;else if(typeof t=="string"&&t.trim())try{const s=JSON.parse(t);Array.isArray(s)&&(e=s)}catch{}this.#s=e&&e.length?e:q,this.#t&&this.#i&&this.#t.setItems(this.#s,this.#d,this.#e)}get items(){return this.#s}set value(t){this.#d=t==null?"":String(t),this.#t&&this.#i&&this.#t.setItems(this.#s,this.#d,this.#e)}get value(){return this.#d}get open(){return this.#i}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}#c(t,e){return this.getAttribute(t)??e}#T(){this.#h.replaceChildren(),this.#n=[],this.#l=[];const t=this.hasAttribute("embed"),e=this.#c("name","Ada Lovelace"),s=(e||"Menu").split(" ")[0],i=this.#c("avatar","");(t?["__embed"]:J).forEach((r,o)=>{const d=document.createElement("div");d.className="dd__slot";const n=document.createElement("button");n.type="button",n.className="dd__trigger",n.setAttribute("aria-haspopup","menu"),n.setAttribute("aria-expanded","false");let c;if(r==="__embed")c=document.createElement("span"),c.setAttribute("data-dd-face",""),c.style.display="inline-flex",c.appendChild(document.createElement("slot"));else if(r==="avatar")c=this.#F(i,e);else if(r==="button"){c=document.createElement("span"),c.className="dd__btn",c.setAttribute("data-dd-face",""),c.append(document.createTextNode(s));const h=L("dd__btn-caret");h.appendChild(y(K,{"stroke-miterlimit":"10"})),c.appendChild(h)}else if(r==="icon"){c=document.createElement("span"),c.className="dd__icon",c.setAttribute("data-dd-face","");const h=L("");h.appendChild(y("M12 9.32C13.19 9.32 14.16 8.35 14.16 7.16C14.16 5.97 13.19 5 12 5C10.81 5 9.83997 5.97 9.83997 7.16C9.83997 8.35 10.81 9.32 12 9.32Z")),h.appendChild(y("M6.79 18.9997C7.98 18.9997 8.95 18.0297 8.95 16.8397C8.95 15.6497 7.98 14.6797 6.79 14.6797C5.6 14.6797 4.63 15.6497 4.63 16.8397C4.63 18.0297 5.59 18.9997 6.79 18.9997Z")),h.appendChild(y("M17.21 18.9997C18.4 18.9997 19.37 18.0297 19.37 16.8397C19.37 15.6497 18.4 14.6797 17.21 14.6797C16.02 14.6797 15.05 15.6497 15.05 16.8397C15.05 18.0297 16.02 18.9997 17.21 18.9997Z")),c.appendChild(h)}else{c=document.createElement("span"),c.className="dd__chip",c.setAttribute("data-dd-face",""),c.appendChild(this.#F(i,e,!0));const h=document.createElement("span");h.className="dd__chip-name",h.textContent=s,c.appendChild(h)}n.appendChild(c),n.addEventListener("click",h=>this.#U(h,o)),n.addEventListener("keydown",h=>this.#rt(h,o)),d.appendChild(n),this.#h.appendChild(d),this.#n[o]=c,this.#l[o]=n})}#F(t,e,s=!1){const i=document.createElement("span");if(i.className="dd__avatar",s||i.setAttribute("data-dd-face",""),t){const a=document.createElement("img");a.src=t,a.alt=e||"",a.draggable=!1,i.appendChild(a)}else i.textContent=(e||"?").trim().charAt(0).toUpperCase();if(!s){const a=document.createElement("span");a.className="dd__avatar-dot",i.appendChild(a)}return i}#y(){this.#o.className=`dd dd--${this.#c("size","md")} dd--t-${this.#c("tone","default")}`+(this.hasAttribute("embed")?" dd--embed":"")+(this.hasAttribute("disabled")?" is-disabled":"")+(this.#i?" is-open":"");const t=this.hasAttribute("disabled");for(const e of this.#l)e.disabled=t}#Z(){return this.#t||(this.#t=document.createElement("vs-dropdown-panel"),this.#t.onPick=t=>this.#O(t),this.#t.onHover=t=>{this.#e=t,this.#t.updateActive(t),this.#t.refreshHighlight(t,this.#a)}),this.#t}#I(){this.#t.configure({size:this.#c("size","md"),radius:this.#c("radius","squircle"),tone:this.#c("tone","default"),panelWidth:this.#c("panel-width",void 0),panelClass:this.#c("panel-class",void 0)}),this.#t.setIdentity({name:this.#c("name",""),email:this.#c("email",""),pro:this.hasAttribute("pro")})}#R(){return this.#s.findIndex(t=>!t.disabled)}#H(t){const e=this.#s.length;if(!e)return;let s=this.#e;for(let i=0;i<e;i++)if(s=(s+t+e)%e,!this.#s[s]?.disabled){this.#e=s;break}this.#t?.updateActive(this.#e),this.#t?.scrollActiveIntoView(this.#e),this.#t?.refreshHighlight(this.#e,this.#a)}#O(t){const e=this.#s[t];!e||e.disabled||(this.#d=e.value,this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:e,index:t,value:e.value}})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:{value:e.value}})),this.#m())}#x(){this.setAttribute("open","")}#m(){this.removeAttribute("open")}#U(t,e){if(!(this.hasAttribute("disabled")||this.#r)){if(this.#i){this.#m();return}this.#v=e,this.#x()}}#v=0;#W(t,e){const s=window.innerWidth,i=window.innerHeight,a=8,r=t.offsetWidth||P[this.#c("size","md")]||P.md,o=t.offsetHeight||200,d=e.top+o<=i-a,n=e.bottom-o>=a;let c=d||!n?e.top:e.bottom-o;c=Math.min(Math.max(a,c),Math.max(a,i-o-a));const h=e.left,E=e.right-r;let x=h+r<=s-a?h:E;x=Math.min(Math.max(a,x),Math.max(a,s-r-a)),t.style.top=`${c}px`,t.style.left=`${x}px`}#X(){if(this.#i)return;if(this.hasAttribute("disabled")){this.removeAttribute("open");return}this.#r=!0,this.#i=!0,this.#a=!1,this.#f=Math.min(this.#v,this.#n.length-1),this.#y();const t=this.#n[this.#f]||this.#n[0];this.#u=t,this.#J(t);const e=this.#Z();this.#I(),e.prepareGhost(this.#g,this.#E),e.setItems(this.#s,this.#d,this.#R()),this.#e=this.#R(),e.updateActive(this.#e),e.classList.remove("is-expanded"),e.isConnected||(e.style.visibility="hidden",document.body.appendChild(e)),e.offsetHeight,this.#W(e,t.getBoundingClientRect()),e.style.visibility="",this.#p||(this.#p=X(e,260,()=>this.getAttribute("glow")==="false")),t.style.transition="none",t.style.opacity="0",t.style.filter="";for(const s of this.#l)s.setAttribute("aria-expanded","false");this.#l[this.#f]?.setAttribute("aria-expanded","true"),this.#L=requestAnimationFrame(()=>{this.#$=requestAnimationFrame(()=>{this.#a=!0,e.classList.add("is-expanded"),e.refreshHighlight(this.#e,!0)})}),this.#tt(e),e.scrollActiveIntoView(this.#e),this.#st(),this.dispatchEvent(new CustomEvent("open",{bubbles:!0,composed:!0}))}#K(){this.#i&&(this.#r=!0,this.#i=!1,this.#a=!1,this.#e=-1,this.#y(),this.#t?.classList.remove("is-expanded"),this.#G(),this.#t&&this.#et(this.#t),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}#J(t){this.#E={};const e=getComputedStyle(t),s=t.offsetHeight||40,i=parseFloat(e.borderTopLeftRadius);this.#P=isFinite(i)?i>s?s/2:i:s/2,this.#A=(e.getPropertyValue("corner-shape")||"round").trim()||"round";const a=t.querySelector("img"),r=(t.textContent||"").trim().length>0;if(!!(a&&(a.currentSrc||a.src))&&!r)this.#g="image",this.#E={img:a.currentSrc||a.src};else{this.#g="clone";const d=t.cloneNode(!0);d.removeAttribute?.("data-dd-face"),d.style.transition="none",d.style.transform="none",d.style.opacity="1",d.style.filter="",d.style.background="transparent",d.style.boxShadow="none",this.#E={bg:e.backgroundColor,cloneNode:d}}}#E={};#S(t){const e=this.#u,s=t.getBoundingClientRect();if(!e)return"scale(0.16)";const i=e.getBoundingClientRect(),a=Math.max(i.width/s.width,.04),r=Math.max(i.height/s.height,.04);this.#M=a;const o=i.left+i.width/2-(s.left+s.width/2),d=i.top+i.height/2-(s.top+s.height/2);return`translate(${o}px, ${d}px) scale(${a.toFixed(4)}, ${r.toFixed(4)})`}#q(t){this.#z=parseFloat(getComputedStyle(t).borderTopLeftRadius)||22,this.#k=this.#P}#D(t,e){const s=()=>{const a=getComputedStyle(t).transform;let r=1,o=1;if(a&&a.startsWith("matrix")){const h=a.slice(7,-1).split(",").map(parseFloat);r=h[0]||1,o=h[3]||1}const d=`scale(${(1/r).toFixed(4)}, ${(1/o).toFixed(4)})`;for(const h of e)h&&(h.style.transform=d);const n=Math.min(Math.max((r-this.#M)/(1-this.#M),0),1),c=this.#k+(this.#z-this.#k)*n;t.style.borderRadius=`${(c/r).toFixed(2)}px / ${(c/o).toFixed(2)}px`};s();const i=()=>{s(),this.#b=requestAnimationFrame(i)};this.#b=requestAnimationFrame(i)}#N(){this.#b&&cancelAnimationFrame(this.#b),this.#b=0}#Q(){const t=this.#u;t&&(t.style.transition="",t.style.filter="",t.style.opacity="")}#tt(t){const e=t.surfaceEl,s=t.ghostEl,i=t.innerEl;if(T()){s&&(s.style.opacity="0"),this.#r=!1;return}this.#q(t),t.style.transformOrigin="center center",t.style.setProperty("corner-shape",this.#A),t.style.transform=this.#S(t),t.style.filter="blur(3px)",t.style.opacity="0",e&&(e.style.opacity="0"),s&&(s.style.opacity="1",s.style.filter="blur(0px)");const a=this.#g==="clone"?t.ghostCloneEl:null;if(i&&(i.style.opacity="0",i.style.filter="blur(12px)"),t.offsetHeight,this.#D(t,a?[i,a]:[i]),t.style.transition=`transform ${C}ms ${Q}, filter 200ms ease, opacity 120ms ease`,t.style.transform="none",t.style.filter="blur(0px)",t.style.opacity="1",e&&(e.style.transition="opacity 200ms ease 40ms",e.style.opacity="1"),s){const o=Math.round(C*.3),d=Math.round(C*.45);s.style.transition=`opacity ${o}ms ease, filter ${d}ms ease`,s.style.opacity="0",s.style.filter="blur(12px)"}const r=a?.firstElementChild;if(r){const o=Math.round(C*.55);r.style.transformOrigin="center center",r.style.transition=`transform ${o}ms ${tt}`,r.style.transform="scale(1.35)"}if(i){const o=Math.round(C*.18),d=C-o;i.style.transition=`opacity ${d}ms ease ${o}ms, filter ${d}ms ease ${o}ms`,i.style.opacity="1",i.style.filter="blur(0px)"}this.#V(t,()=>{this.#N(),t.style.transition=t.style.transform=t.style.transformOrigin=t.style.filter=t.style.opacity=t.style.borderRadius="",t.style.removeProperty("corner-shape"),e&&(e.style.transition="",e.style.opacity=""),i&&(i.style.transition=i.style.transform=i.style.opacity=i.style.filter=""),s&&(s.style.transition=s.style.transform=s.style.filter="",s.style.opacity="0"),a&&(a.style.transition=a.style.transform=""),this.#r=!1},C+150)}#et(t){const e=t.surfaceEl,s=t.ghostEl,i=t.innerEl;if(T()){this.#B(t);return}this.#q(t),t.style.transformOrigin="center center",t.style.setProperty("corner-shape",this.#A),t.style.transform="none",t.style.filter="blur(0px)",t.style.opacity="1",this.#S(t),t.offsetHeight;const a=this.#g==="clone"?t.ghostCloneEl:null;this.#D(t,a?[i,a]:[i]);const r=Math.round(b*.6),o=Math.round(b*.25),d=16;i&&(i.style.transition=`opacity ${r}ms ease ${o}ms, filter ${r}ms ease ${o}ms`,i.style.opacity="0",i.style.filter=`blur(${d}px)`),e&&(e.style.transition=`opacity ${r}ms ease ${o}ms`,e.style.opacity="0"),s&&(s.style.transition="none",s.style.opacity="0",s.style.filter=`blur(${d}px)`,s.offsetHeight,s.style.transition=`opacity ${r}ms ease ${o}ms, filter ${r}ms ease ${o}ms`,s.style.opacity="1",s.style.filter="blur(0px)");const n=a?.firstElementChild;n&&(n.style.transition="none",n.style.transformOrigin="center center",n.style.transform="scale(1.35)",n.offsetHeight,n.style.transition=`transform ${r}ms ${it} ${o}ms`,n.style.transform="scale(1)"),t.style.transition=`transform ${b}ms ${et}, filter ${Math.round(b*.5)}ms ease ${Math.round(b*.4)}ms, opacity 120ms ${Math.round(b*.85)}ms ease`,t.style.transform=this.#S(t),t.style.filter="blur(6px)",t.style.opacity="0";const c=.8,h=this.#u;h&&(this.#_=setTimeout(()=>{h.style.transition="none",h.style.opacity="1",h.style.filter="blur(3px)",h.offsetHeight,h.style.transition=`filter ${Math.round(b*(1-c))}ms ease`,h.style.filter="blur(0px)",this.#_=0},b*c)),this.#V(t,()=>this.#B(t),b+200)}#B(t){this.#N(),this.#Q(),this.#f=-1,t.remove(),t.style.cssText="",t.surfaceEl&&(t.surfaceEl.style.cssText=""),t.ghostEl&&(t.ghostEl.style.cssText=""),t.innerEl&&(t.innerEl.style.cssText=""),this.#r=!1}#V(t,e,s){let i=!1;const a=()=>{i||(i=!0,clearTimeout(this.#w),t.removeEventListener("transitionend",r),this.#C=null,e())},r=o=>{o.target===t&&o.propertyName==="transform"&&a()};this.#C=()=>t.removeEventListener("transitionend",r),t.addEventListener("transitionend",r),this.#w=setTimeout(a,s)}#it(){this.#C?.(),this.#C=null,this.#N(),clearTimeout(this.#w),this.#w=0,clearTimeout(this.#_),this.#_=0,cancelAnimationFrame(this.#L),cancelAnimationFrame(this.#$),this.#L=this.#$=0}#st(){document.addEventListener("pointerdown",this.#j,!0),document.addEventListener("keydown",this.#Y,!0)}#G(){document.removeEventListener("pointerdown",this.#j,!0),document.removeEventListener("keydown",this.#Y,!0)}#j=t=>{if(this.#r)return;const e=t.composedPath();e.includes(this)||this.#t&&e.includes(this.#t)||this.#m()};#Y=t=>{t.key==="Escape"&&this.#i&&(t.preventDefault(),this.#m())};#rt(t,e){if(!this.hasAttribute("disabled"))switch(t.key){case"Enter":case" ":t.preventDefault(),this.#i?this.#e>=0&&this.#O(this.#e):(this.#v=e,this.#x());break;case"ArrowDown":t.preventDefault(),this.#i?this.#H(1):(this.#v=e,this.#x());break;case"ArrowUp":t.preventDefault(),this.#i?this.#H(-1):(this.#v=e,this.#x());break;case"Escape":this.#i&&(t.preventDefault(),this.#m());break;case"Tab":this.#i&&this.#m();break}}}customElements.define("vs-dropdown-panel",nt);customElements.define("vs-dropdown",ct);
