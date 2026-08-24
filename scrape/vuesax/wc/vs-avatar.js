const k=new Set;let M=0,N=0,L=!1,E=0,$=!1,z=null;function B(){if(E=0,!!L)for(const a of k){if(!a.visible)continue;if(a.disabled()){a.lastI!==0&&(a.el.style.setProperty("--glow","0"),a.lastI=0);continue}a.rect||(a.rect=a.el.getBoundingClientRect());const t=a.rect,e=Math.max(t.left,Math.min(M,t.right)),i=Math.max(t.top,Math.min(N,t.bottom)),s=Math.max(0,1-Math.hypot(M-e,N-i)/a.radius);s===0&&a.lastI===0||(a.el.style.setProperty("--gx",`${M-t.left}px`),a.el.style.setProperty("--gy",`${N-t.top}px`),a.el.style.setProperty("--glow",s.toFixed(3)),a.lastI=s)}}function V(a){M=a.clientX,N=a.clientY,L=!0,E||(E=requestAnimationFrame(B))}function P(){for(const a of k)a.rect=null;L&&!E&&(E=requestAnimationFrame(B))}function T(a,t,e){$||($=!0,addEventListener("pointermove",V,{passive:!0}),addEventListener("scroll",P,{passive:!0,capture:!0}),addEventListener("resize",P,{passive:!0}),z=new IntersectionObserver(c=>{for(const p of c)for(const g of k)g.el===p.target&&(g.visible=p.isIntersecting,p.isIntersecting&&(g.rect=null))}));const i={el:a,radius:t,disabled:e,rect:null,visible:!0,lastI:0};k.add(i),z.observe(a);const s=G.add(a);return()=>{k.delete(i),z.unobserve(a),s()}}function H(){return typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}const F=2*Math.PI*46,G=globalThis[Symbol.for("vs-light")]||=(()=>{const a=new Set,t=110,e=1.6,i=1.7,s=34,c=72,p=[[.6,0],[.42,30],[.16,58],[0,82]],g=[[.6,0],[.27,42],[.08,66],[0,85]],l=[[.85,0],[.4,42],[.12,66],[0,84]];let n=0,u=null;const m=(h,r,d)=>{const f=r.w/2+h,x=r.h/2+h,v=r.h/2/x;return`radial-gradient(${f.toFixed(1)}px ${x.toFixed(1)}px at ${r.x.toFixed(1)}px ${r.y.toFixed(1)}px,`+d.map(([o,C])=>` rgb(${r.rgb} / ${(o*r.k).toFixed(3)}) ${((v+C/100*(1-v))*100).toFixed(1)}%`).join(",")+")"};function b(){const h=[];for(const r of document.querySelectorAll("[color],[data-lamp]")){const d=getComputedStyle(r),f=d.getPropertyValue("--vs-color-rgb").trim()||(r.hasAttribute("data-lamp")?(d.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");f&&h.push({el:r,rgb:f,rect:r.getBoundingClientRect()})}return h}function w(){if(n=0,!a.size)return;const h=b();for(const r of a){if(!r.visible)continue;if(!h.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}const d=r.el.getBoundingClientRect(),f=d.left+d.width/2,x=d.top+d.height/2,v=[];for(const o of h){if(o.el===r.el||o.el.contains(r.el)||r.el.contains(o.el))continue;const C=Math.max(o.rect.left,Math.min(f,o.rect.right)),S=Math.max(o.rect.top,Math.min(x,o.rect.bottom)),q=Math.max(d.left,Math.min(C,d.right)),O=Math.max(d.top,Math.min(S,d.bottom)),I=Math.max(0,1-Math.hypot(C-q,S-O)/t)**e*i;I&&v.push({rgb:o.rgb,k:Math.min(1,I),w:o.rect.width,h:o.rect.height,x:o.rect.left+o.rect.width/2-d.left,y:o.rect.top+o.rect.height/2-d.top})}if(!v.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}v.sort((o,C)=>o.k-C.k),r.el.style.setProperty("--lit-ring",v.flatMap(o=>[m(s,o,p),m(c,o,g)]).join(",")),r.el.style.setProperty("--lit-fill",v.map(o=>m(c,o,l)).join(",")),r.el.style.setProperty("--lit","1"),r.on=!0}}const y=()=>{n||(n=requestAnimationFrame(w))};return addEventListener("scroll",y,{passive:!0,capture:!0}),addEventListener("resize",y,{passive:!0}),globalThis.vsLight=y,{add(h){u||=new IntersectionObserver(d=>{for(const f of d)for(const x of a)x.el===f.target&&(x.visible=f.isIntersecting);y()});const r={el:h,visible:!0,on:!1};return a.add(r),u.observe(h),y(),()=>{a.delete(r),u.unobserve(h)}}}})(),D=`
  :host { display: inline-flex; }
  .ava {
    --sz: var(--ctrl-h-md, 40px);
    --fs: var(--ctrl-fs-md, 15px);
    --dot: 11px;
    --badge: 19px;
    --r: 50%;
    --rip: 255 255 255;
    --fx-tint: 255 255 255;
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--sz);
    height: var(--sz);
    border-radius: var(--r);
    flex: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .ava--interactive { cursor: pointer; touch-action: manipulation; }
  .ava__face {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    overflow: hidden;
    background: var(--vs-color, hsl(var(--ava-hue, 220) 45% 22%));
    color: var(--vs-color-fg, hsl(var(--ava-hue, 220) 70% 78%));
  }
  /* sizes — --dot = presence dot, --badge = icon/typing badge & count capsule */
  .ava--xs { --sz: var(--ctrl-h-xs, 24px); --fs: var(--ctrl-fs-xs, 10px); --dot: 7px;  --badge: 13px; }
  .ava--sm { --sz: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 12px); --dot: 9px;  --badge: 16px; }
  .ava--md { --sz: var(--ctrl-h-md, 40px); --fs: var(--ctrl-fs-md, 15px); --dot: 11px; --badge: 19px; }
  .ava--lg { --sz: var(--ctrl-h-lg, 56px); --fs: var(--ctrl-fs-lg, 20px); --dot: 14px; --badge: 25px; }
  .ava--xl { --sz: var(--ctrl-h-xl, 80px); --fs: var(--ctrl-fs-xl, 28px); --dot: 18px; --badge: 34px; }
  /* shapes */
  .ava--s-circle { --r: 50%; }
  .ava--s-rounded { --r: var(--ctrl-r-md, 12px); }
  .ava--s-squircle { --r: var(--ctrl-r-lg, 16px); }
  @supports (corner-shape: squircle) {
    .ava--s-squircle,
    .ava--s-squircle .ava__face,
    .ava--s-squircle .ava__glow,
    .ava--s-squircle .ava__ripples,
    .ava--s-squircle .ava__ring { corner-shape: squircle; }
  }
  .ava--bordered .ava__face {
    box-shadow:
      0 0 0 2px var(--bg-card, #111),
      0 0 0 3px var(--inp-border, #2a2a2a);
  }
  .ava__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    -webkit-user-drag: none;
  }
  .ava__initials {
    font-family: inherit;
    font-weight: 600;
    font-size: var(--fs);
    line-height: 1;
    letter-spacing: 0.02em;
  }
  .ava__placeholder {
    width: 62%;
    height: 62%;
    color: var(--inp-text, #ededed);
    opacity: 0.5;
  }
  /* ── press water-drop ripple (clipped to the face shape) ───────── */
  .ava__ripples {
    position: absolute;
    inset: 0;
    z-index: 2;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
  }
  .ava__ripple {
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: radial-gradient(
      circle,
      rgb(var(--rip) / 0.40) 0%,
      rgb(var(--rip) / 0.22) 24%,
      rgb(var(--rip) / 0.10) 44%,
      rgb(var(--rip) / 0.03) 60%,
      transparent 76%
    );
    opacity: 0;
    will-change: transform, opacity;
    animation:
      ava-ripple-scale 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
      ava-ripple-fade 720ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  @keyframes ava-ripple-scale {
    from { transform: translate(-50%, -50%) scale(0); }
    to   { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes ava-ripple-fade {
    from { opacity: 0.85; }
    to   { opacity: 0; }
  }
  /* ── proximity glow on the rim ─────────────────────────────────── */
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .ava::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .ava::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .ava__glow {
    position: absolute;
    inset: -3px;
    z-index: 2;
    border-radius: inherit;
    padding: 2px;
    pointer-events: none;
    background:
      radial-gradient(36px circle at var(--gx, 50%) var(--gy, 50%),
        rgb(var(--fx-tint, 255 255 255) / 0.6), rgb(var(--fx-tint, 255 255 255) / 0.42) 30%, rgb(var(--fx-tint, 255 255 255) / 0.16) 58%, rgb(var(--fx-tint, 255 255 255) / 0) 82%),
      radial-gradient(130px circle at var(--gx, 50%) var(--gy, 50%),
        rgb(var(--fx-tint, 255 255 255) / 0.6), rgb(var(--fx-tint, 255 255 255) / 0.27) 42%, rgb(var(--fx-tint, 255 255 255) / 0.08) 66%, rgb(var(--fx-tint, 255 255 255) / 0) 85%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: calc(var(--glow, 0) * 0.9);
    transition: opacity 140ms;
  }
  /* ── corner badge: presence dot OR activity badge ─────────────── */
  .ava__status {
    position: absolute;
    right: 0;
    bottom: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--dot);
    height: var(--dot);
    border-radius: 999px;
    color: #fff;
    box-shadow: 0 0 0 2px var(--bg-card, #111);
    z-index: 3;
    transform: translate(8%, 8%);
    transform-origin: center;
    --ava-spring: linear(
      0, 0.009, 0.035, 0.078, 0.137, 0.211, 0.298, 0.396, 0.501, 0.609,
      0.715, 0.815, 0.905, 0.981, 1.04, 1.083, 1.108, 1.117, 1.114, 1.1,
      1.08, 1.057, 1.034, 1.014, 0.998, 0.987, 0.981, 0.979, 0.981, 0.985,
      0.99, 0.995, 0.999, 1.001, 1.002, 1.001, 1
    );
    transition:
      width 560ms var(--ava-spring),
      height 560ms var(--ava-spring),
      border-radius 300ms cubic-bezier(0.22, 1, 0.36, 1),
      transform 560ms var(--ava-spring),
      background-color 300ms ease,
      box-shadow 300ms ease;
  }
  .ava--s-circle .ava__status { transform: translate(-6%, -6%); }
  /* inner content holder — fills the capsule, centers the icon/dots */
  .ava__status-inner {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* icon / typing badges are larger, rounded, hold content */
  .ava__status--icon { width: var(--badge); height: var(--badge); border-radius: 999px; }
  .ava__status--typing {
    width: calc(var(--badge) * 1.28);
    height: calc(var(--badge) * 0.66);
    border-radius: 999px;
    transform: translate(22%, -8%);
  }
  .ava__icon { width: 64%; height: 64%; }
  /* presence colors */
  .ava__status--online { background: #23a55a; }
  .ava__status--idle { background: #f0b232; }
  .ava__status--dnd { background: #f23f43; }
  .ava__status--offline {
    background: var(--bg-card, #111);
    box-shadow: 0 0 0 2px var(--bg-card, #111), inset 0 0 0 2.5px #80848e;
  }
  /* idle → crescent moon (offset cutout, Discord) */
  .ava__crescent {
    position: absolute;
    top: -22%;
    left: -22%;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background: var(--bg-card, #111);
  }
  /* dnd → horizontal bar */
  .ava__bar {
    width: 56%;
    height: 22%;
    min-height: 2px;
    border-radius: 2px;
    background: #fff;
  }
  /* activity colors */
  .ava__status--typing { background: #23a55a; }
  .ava__status--call { background: #23a55a; }
  .ava__status--video { background: #4f8cff; }
  .ava__status--streaming { background: #9147ff; }
  /* typing → three bouncing dots */
  .ava__typing { display: inline-flex; align-items: center; gap: calc(var(--badge) * 0.14); }
  .ava__typing i {
    width: calc(var(--badge) * 0.2);
    height: calc(var(--badge) * 0.2);
    min-width: 3px;
    min-height: 3px;
    border-radius: 50%;
    background: #fff;
    animation: ava-typing 1.1s infinite ease-in-out both;
  }
  .ava__typing i:nth-child(1) { animation-delay: -0.22s; }
  .ava__typing i:nth-child(2) { animation-delay: -0.11s; }
  @keyframes ava-typing {
    0%, 70%, 100% { opacity: 0.45; transform: translateY(12%) scale(0.78); }
    35% { opacity: 1; transform: translateY(-30%) scale(1); }
  }
  /* ── custom corner badge (named "badge" slot) — wins over status ── */
  .ava__badge {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: var(--badge);
    height: var(--badge);
    box-sizing: border-box;
    padding: 0 calc(var(--badge) * 0.2);
    border-radius: 999px;
    color: #fff;
    font-size: calc(var(--badge) * 0.5);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.01em;
    white-space: nowrap;
    box-shadow: 0 0 0 2px var(--bg-card, #111);
    transform: translate(8%, 8%);
  }
  .ava--s-circle .ava__badge { transform: translate(-6%, -6%); }
  .ava__badge ::slotted(svg) {
    width: calc(var(--badge) * 0.6);
    height: calc(var(--badge) * 0.6);
    display: block;
  }
  /* ── surrounding ring: story (Instagram) / seen / live ─────────── */
  .ava--ring { --gap: 3px; --ring-w: 2.5px; }
  .ava--xs.ava--ring, .ava--sm.ava--ring { --gap: 2px; --ring-w: 2px; }
  .ava--lg.ava--ring, .ava--xl.ava--ring { --gap: 3px; --ring-w: 3px; }
  .ava__ring {
    position: absolute;
    inset: calc(-1 * (var(--gap) + var(--ring-w)));
    border-radius: inherit;
    z-index: 0;
    pointer-events: none;
  }
  .ava--ring .ava__face { box-shadow: 0 0 0 var(--gap) var(--bg-card, #111); }
  @property --ava-angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
  .ava--ring-story .ava__ring {
    background: conic-gradient(
      from var(--ava-angle),
      #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75
    );
    animation: ava-ring-spin 6s linear infinite;
  }
  @keyframes ava-ring-spin { to { --ava-angle: 360deg; } }
  .ava--ring-seen .ava__ring { background: var(--inp-border, #c7c7cf); }
  .ava--ring-live .ava__ring { background: #f23f43; }
  .ava--ring-live .ava__ring::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: 0 0 0 4px rgba(242, 63, 67, 0.3);
    opacity: 0;
    animation: ava-live-pulse 1.8s ease-out infinite;
  }
  @keyframes ava-live-pulse {
    0% { opacity: 0; }
    35% { opacity: 1; }
    70%, 100% { opacity: 0; }
  }
  /* LIVE label — pill centered on the bottom edge */
  .ava__live {
    position: absolute;
    left: 50%;
    bottom: calc(-1 * (var(--gap, 3px) + var(--ring-w, 2.5px)));
    transform: translate(-50%, 50%);
    z-index: 4;
    padding: 0.18em 0.5em;
    border-radius: 999px;
    background: #f23f43;
    color: #fff;
    font-size: calc(var(--fs) * 0.42);
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.06em;
    box-shadow: 0 0 0 2px var(--bg-card, #111);
  }
  /* ── circular progress ring ────────────────────────────────────── */
  .ava--progress { --gap: 3px; --ring-w: 4px; --ava-progress: #6354f6; }
  .ava--xs.ava--progress, .ava--sm.ava--progress { --gap: 2px; --ring-w: 3px; }
  .ava--lg.ava--progress, .ava--xl.ava--progress { --gap: 4px; --ring-w: 5px; }
  .ava__progress {
    position: absolute;
    inset: calc(-1 * (var(--gap) + var(--ring-w)));
    z-index: 0;
    pointer-events: none;
    transform: rotate(-90deg);
    overflow: visible;
  }
  .ava--progress .ava__face { box-shadow: 0 0 0 var(--gap) var(--bg-card, #111); }
  .ava__progress-track, .ava__progress-bar {
    fill: none;
    stroke-width: 6;
    stroke-linecap: round;
  }
  .ava__progress-track { stroke: var(--inp-border, rgba(140, 140, 160, 0.25)); }
  .ava__progress-bar {
    stroke: var(--ava-progress, #6354f6);
    transition: stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  /* progress % pill — under the avatar, like the LIVE label */
  .ava__percent {
    position: absolute;
    left: 50%;
    bottom: calc(-1 * (var(--gap, 3px) + var(--ring-w, 4px)));
    transform: translate(-50%, 50%);
    z-index: 4;
    padding: 0.2em 0.55em;
    border-radius: 999px;
    background: var(--ava-progress, #6354f6);
    color: #fff;
    font-size: calc(var(--fs) * 0.46);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.01em;
    font-variant-numeric: tabular-nums;
    box-shadow: 0 0 0 2px var(--bg-card, #111);
  }
  /* ── number badge (top-right) ──────────────────────────────────── */
  .ava__count {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: var(--badge);
    min-width: var(--badge);
    width: calc(var(--badge) + (var(--digits, 1) - 1) * 0.62em);
    border-radius: 999px;
    background: #f23f43;
    color: #fff;
    font-size: calc(var(--badge) * 0.52);
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    box-shadow: 0 0 0 2px var(--bg-card, #111);
    transform: translate(35%, -35%);
    transform-origin: bottom left;
    transition: width 460ms cubic-bezier(0.34, 1.46, 0.44, 1);
  }
  @media (prefers-reduced-motion: reduce) {
    .ava, .ava__status { transition: none; }
    .ava__ripple { display: none; }
    .ava__typing i,
    .ava--ring-story .ava__ring,
    .ava--ring-live .ava__ring { animation: none; }
    .ava--ring-live .ava__ring::after { animation: none; opacity: 0; }
  }
`,_="http://www.w3.org/2000/svg";function Y(){const a=document.createElementNS(_,"svg");a.setAttribute("class","ava__placeholder"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("aria-hidden","true");for(const t of["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"]){const e=document.createElementNS(_,"path");e.setAttribute("d",t),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),a.appendChild(e)}return a}function R(a){const t=document.createElementNS(_,"svg");t.setAttribute("class","ava__icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of a){const i=document.createElementNS(_,"path");i.setAttribute("d",e),i.setAttribute("fill","currentColor"),t.appendChild(i)}return t}const Z=["M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z","M21.9701 18.3291C21.9701 18.6091 21.9201 18.8991 21.8201 19.1791C21.7901 19.2591 21.7601 19.3391 21.7201 19.4191C21.5501 19.7791 21.3301 20.1191 21.0401 20.4391C20.5501 20.9791 20.0101 21.3691 19.4001 21.6191C19.3901 21.6191 19.3801 21.6291 19.3701 21.6291C18.7801 21.8691 18.1401 21.9991 17.4501 21.9991C16.4301 21.9991 15.3401 21.7591 14.1901 21.2691C13.0401 20.7791 11.8901 20.1191 10.7501 19.2891C10.3601 18.9991 9.9701 18.7091 9.6001 18.3991L12.8701 15.1291C13.1501 15.3391 13.4001 15.4991 13.6101 15.6091C13.6601 15.6291 13.7201 15.6591 13.7901 15.6891C13.8701 15.7191 13.9501 15.7291 14.0401 15.7291C14.2101 15.7291 14.3401 15.6691 14.4501 15.5591L15.2101 14.8091C15.4601 14.5591 15.7001 14.3691 15.9301 14.2491C16.1601 14.1091 16.3901 14.0391 16.6401 14.0391C16.8301 14.0391 17.0301 14.0791 17.2501 14.1691C17.4701 14.2591 17.7001 14.3891 17.9501 14.5591L21.2601 16.9091C21.5201 17.0891 21.7001 17.2991 21.8101 17.5491C21.9101 17.7991 21.9701 18.0491 21.9701 18.3291Z"],U=["M21.15 6.17C20.74 5.95 19.88 5.72 18.71 6.54L17.24 7.58C17.13 4.47 15.78 3.25 12.5 3.25H6.5C3.08 3.25 1.75 4.58 1.75 8V16C1.75 18.3 3 20.75 6.5 20.75H12.5C15.78 20.75 17.13 19.53 17.24 16.42L18.71 17.46C19.33 17.9 19.87 18.04 20.3 18.04C20.67 18.04 20.96 17.93 21.15 17.83C21.56 17.62 22.25 17.05 22.25 15.62V8.38C22.25 6.95 21.56 6.38 21.15 6.17ZM11 11.38C9.97 11.38 9.12 10.54 9.12 9.5C9.12 8.46 9.97 7.62 11 7.62C12.03 7.62 12.88 8.46 12.88 9.5C12.88 10.54 12.03 11.38 11 11.38Z"],X=["typing","call","video","streaming"];let A;function K(a){if(A||=document.createElement("canvas").getContext("2d"),!A)return null;A.fillStyle="#000",A.fillStyle=a;const t=A.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const J=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function j(a,t){const e=t?K(String(t).trim()):null;if(!e){for(const n of J)a.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),c=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,p=`rgb(${e[0]} ${e[1]} ${e[2]})`,g=e.map(n=>Math.round(c?n*.92:n+(255-n)*.16)),l=(n,u)=>a.style.setProperty(n,u);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(n,p);l("--btn-primary-bg-hover",`rgb(${g[0]} ${g[1]} ${g[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(n,c?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])l(n,c?"0 0 0":"255 255 255");l("--vs-color",p),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class Q extends HTMLElement{static observedAttributes=["src","alt","name","size","shape","bordered","badge-color","status","ring","progress","show-percent","count","interactive","glow","color"];#t;#b;#e;#l;#C;#c;#d;#s;#p;#g;#a;#i;#h;#u;#n;#f;#r;#m;#x;#y;#v;#A;#k;#_=!1;#w=null;#R=0;#E;#o;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=D,this.#t=document.createElement("span"),this.#t.className="ava",this.#g=document.createElement("span"),this.#g.className="ava__ring",this.#g.setAttribute("aria-hidden","true"),this.#a=document.createElementNS(_,"svg"),this.#a.setAttribute("class","ava__progress"),this.#a.setAttribute("viewBox","0 0 100 100"),this.#a.setAttribute("role","progressbar"),this.#a.setAttribute("aria-valuemin","0"),this.#a.setAttribute("aria-valuemax","100");const i=document.createElementNS(_,"circle");i.setAttribute("class","ava__progress-track"),i.setAttribute("cx","50"),i.setAttribute("cy","50"),i.setAttribute("r","46"),this.#i=document.createElementNS(_,"circle"),this.#i.setAttribute("class","ava__progress-bar"),this.#i.setAttribute("cx","50"),this.#i.setAttribute("cy","50"),this.#i.setAttribute("r","46"),this.#i.setAttribute("stroke-dasharray",String(F)),this.#a.append(i,this.#i),this.#b=document.createElement("span"),this.#b.className="ava__face",this.#s=document.createElement("span"),this.#s.className="ava__ripples",this.#s.setAttribute("aria-hidden","true"),this.#e=document.createElement("img"),this.#e.className="ava__img",this.#e.draggable=!1,this.#l=document.createElement("span"),this.#l.className="ava__initials",this.#l.setAttribute("aria-hidden","true"),this.#C=Y(),this.#b.append(this.#s,this.#e,this.#l,this.#C),this.#p=document.createElement("span"),this.#p.className="ava__glow",this.#p.setAttribute("aria-hidden","true"),this.#h=document.createElement("span"),this.#h.className="ava__live",this.#h.setAttribute("aria-label","live"),this.#h.textContent="LIVE",this.#u=document.createElement("span"),this.#u.className="ava__percent",this.#n=document.createElement("span"),this.#n.className="ava__count",this.#f=document.createElement("span"),this.#f.className="ava__count-num",this.#n.appendChild(this.#f),this.#r=document.createElement("span"),this.#r.className="ava__status",this.#r.setAttribute("role","img"),this.#m=document.createElement("span"),this.#m.className="ava__status-inner",this.#x=document.createElement("span"),this.#x.className="ava__crescent",this.#y=document.createElement("span"),this.#y.className="ava__bar",this.#v=document.createElement("span"),this.#v.className="ava__typing",this.#v.append(document.createElement("i"),document.createElement("i"),document.createElement("i")),this.#A=R(Z),this.#k=R(U),this.#m.append(this.#x,this.#y,this.#v,this.#A,this.#k),this.#r.appendChild(this.#m),this.#c=document.createElement("span"),this.#c.className="ava__badge",this.#d=document.createElement("slot"),this.#d.name="badge",this.#c.appendChild(this.#d),this.#d.addEventListener("slotchange",()=>{this.#S(),this.#L()}),this.#t.append(this.#g,this.#a,this.#b,this.#p,this.#h,this.#u,this.#n,this.#r,this.#c),t.append(e,this.#t),this.#e.addEventListener("error",()=>{this.#_||(this.#_=!0,this.#N(),this.dispatchEvent(new CustomEvent("error",{bubbles:!0,composed:!0,detail:{src:this.getAttribute("src")}})))}),this.#E=s=>this.#I(s),this.#o=()=>{this.#t.style.transform=""}}connectedCallback(){j(this,this.getAttribute("color")),this.#N(),this.#S(),this.addEventListener("pointerdown",this.#E),this.addEventListener("pointerup",this.#o),this.addEventListener("pointerleave",this.#o),this.addEventListener("pointercancel",this.#o),this.#w=T(this,160,()=>!this.#M()||!this.hasAttribute("glow"))}attributeChangedCallback(t){j(this,this.getAttribute("color")),this.#t&&(t==="src"&&(this.#_=!1),this.#N())}disconnectedCallback(){this.#e.removeAttribute("src"),this.removeEventListener("pointerdown",this.#E),this.removeEventListener("pointerup",this.#o),this.removeEventListener("pointerleave",this.#o),this.removeEventListener("pointercancel",this.#o),this.#w&&(this.#w(),this.#w=null)}#M(){return this.#z("interactive",!0)}#I(t){if(!this.#M()||H())return;const e=this.#t.getBoundingClientRect();if(!e.width||!e.height)return;const i=t.clientX-e.left,s=t.clientY-e.top,c=Math.max(i,e.width-i),p=Math.max(s,e.height-s),g=Math.hypot(c,p)*2,l=document.createElement("span");for(l.className="ava__ripple",l.style.left=`${i}px`,l.style.top=`${s}px`,l.style.width=`${g}px`,l.style.height=`${g}px`,l.addEventListener("animationend",()=>l.remove(),{once:!0}),this.#s.appendChild(l);this.#s.childElementCount>6;)this.#s.firstElementChild.remove();const n=h=>Math.max(-1,Math.min(1,h)),u=n((i/e.width-.5)*2),m=n((s/e.height-.5)*2),b=1-.2*Math.min(Math.abs(u),Math.abs(m)),w=(-m*14*b).toFixed(2),y=(u*10*b).toFixed(2);this.#t.style.transform=`perspective(320px) rotateX(${w}deg) rotateY(${y}deg) scale(0.94)`}#N(){const t=(v,o)=>this.getAttribute(v)??o,e=t("src",""),i=t("alt",""),s=t("name",""),c=!!e&&!this.#_,p=this.#P(s,i),g=this.#F(s,i),l=t("size","md"),n=t("shape","circle"),u=t("ring","none"),m=this.#$(),b=m>0,w=u!=="none"||b,h=this.#z("bordered",!0)&&!w,r=this.#M();this.#t.className=`ava ava--${l} ava--s-${n}`+(w?" ava--ring":"")+(b?" ava--progress":"")+(!b&&u!=="none"?` ava--ring-${u}`:"")+(h?" ava--bordered":"")+(r?" ava--interactive":""),this.#t.style.setProperty("--ava-hue",g),this.#c.style.backgroundColor=t("badge-color","#23a55a"),this.#e.style.display=c?"":"none",this.#l.style.display=!c&&p?"":"none",this.#C.style.display=!c&&!p?"":"none",c&&(this.#e.getAttribute("src")!==e&&this.#e.setAttribute("src",e),this.#e.alt=i||s),this.#l.textContent=p,this.#p.style.display=r?"":"none",r||(this.#t.style.transform=""),this.#g.style.display=u!=="none"&&!b?"":"none",this.#h.style.display=u==="live"&&!b?"":"none",this.#a.style.display=b?"":"none",b&&(this.#i.setAttribute("stroke-dashoffset",String(F*(1-m/100))),this.#a.setAttribute("aria-valuenow",String(Math.round(m))));const d=b&&this.#z("show-percent",!1);this.#u.style.display=d?"":"none",d&&(this.#u.textContent=`${Math.round(m)}%`);const f=Number(t("count","0"))||0,x=f>0;if(this.#n.style.display=x?"":"none",x){const v=f>99?"99+":String(f);this.#f.textContent=v,this.#n.style.setProperty("--digits",String(v.length)),this.#n.setAttribute("aria-label",`${v} notifications`)}this.#L()}#L(){const t=this.getAttribute("status")??"none",e=this.#d.assignedNodes({flatten:!0}).length>0,i=t!=="none"&&!e;if(this.#r.style.display=i?"":"none",!i)return;const s=X.includes(t);this.#r.className=`ava__status ava__status--${t}`+(s?" ava__status--icon":""),this.#r.setAttribute("aria-label",t),this.#x.style.display=t==="idle"?"":"none",this.#y.style.display=t==="dnd"?"":"none",this.#v.style.display=t==="typing"?"":"none",this.#A.style.display=t==="call"?"":"none",this.#k.style.display=t==="video"||t==="streaming"?"":"none"}#S(){const t=this.#d.assignedNodes({flatten:!0}).length>0;this.#c.style.display=t?"":"none"}#$(){const t=this.getAttribute("progress");if(t==null||t==="")return 0;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(100,e)):0}#P(t,e){const i=(t||e||"").trim();if(!i)return"";const s=i.split(/\s+/);return s.length===1?s[0].slice(0,2).toUpperCase():(s[0][0]+s[s.length-1][0]).toUpperCase()}#F(t,e){const i=t||e||"";let s=0;for(let c=0;c<i.length;c++)s=(s*31+i.charCodeAt(c))%360;return s}#z(t,e){const i=this.getAttribute(t);return i===null?e:i!=="false"}set src(t){t==null?this.removeAttribute("src"):this.setAttribute("src",t)}get src(){return this.getAttribute("src")||""}set name(t){t==null?this.removeAttribute("name"):this.setAttribute("name",t)}get name(){return this.getAttribute("name")||""}set status(t){t==null?this.removeAttribute("status"):this.setAttribute("status",t)}get status(){return this.getAttribute("status")||"none"}set ring(t){t==null?this.removeAttribute("ring"):this.setAttribute("ring",t)}get ring(){return this.getAttribute("ring")||"none"}set progress(t){t==null?this.removeAttribute("progress"):this.setAttribute("progress",String(t))}get progress(){const t=this.getAttribute("progress");return t==null||t===""?null:Number(t)}set count(t){t==null?this.removeAttribute("count"):this.setAttribute("count",String(t))}get count(){const t=this.getAttribute("count");return t==null?null:Number(t)}}customElements.define("vs-avatar",Q);
