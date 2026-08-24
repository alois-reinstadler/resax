const M="http://www.w3.org/2000/svg",k=new Set;let w=0,L=0,P=!1,_=0,S=!1,E=null;function z(){if(_=0,!!P)for(const n of k){if(!n.visible)continue;if(n.disabled()){n.lastI!==0&&(n.el.style.setProperty("--glow","0"),n.lastI=0);continue}n.rect||(n.rect=n.el.getBoundingClientRect());const t=n.rect,e=Math.max(t.left,Math.min(w,t.right)),r=Math.max(t.top,Math.min(L,t.bottom)),i=Math.max(0,1-Math.hypot(w-e,L-r)/n.radius);i===0&&n.lastI===0||(n.el.style.setProperty("--gx",`${w-t.left}px`),n.el.style.setProperty("--gy",`${L-t.top}px`),n.el.style.setProperty("--glow",i.toFixed(3)),n.lastI=i)}}function O(n){w=n.clientX,L=n.clientY,P=!0,_||(_=requestAnimationFrame(z))}function I(){for(const n of k)n.rect=null;P&&!_&&(_=requestAnimationFrame(z))}function D(n,t,e){S||(S=!0,addEventListener("pointermove",O,{passive:!0}),addEventListener("scroll",I,{passive:!0,capture:!0}),addEventListener("resize",I,{passive:!0}),E=new IntersectionObserver(s=>{for(const o of s)for(const c of k)c.el===o.target&&(c.visible=o.isIntersecting,o.isIntersecting&&(c.rect=null))}));const r={el:n,radius:t,disabled:e,rect:null,visible:!0,lastI:0};k.add(r),E.observe(n);const i=j.add(n);return()=>{k.delete(r),E.unobserve(n),i()}}const j=globalThis[Symbol.for("vs-light")]||=(()=>{const n=new Set,t=110,e=1.6,r=1.7,i=34,s=72,o=[[.6,0],[.42,30],[.16,58],[0,82]],c=[[.6,0],[.27,42],[.08,66],[0,85]],h=[[.85,0],[.4,42],[.12,66],[0,84]];let l=0,u=null;const A=(p,a,g)=>{const b=a.w/2+p,m=a.h/2+p,f=a.h/2/m;return`radial-gradient(${b.toFixed(1)}px ${m.toFixed(1)}px at ${a.x.toFixed(1)}px ${a.y.toFixed(1)}px,`+g.map(([d,v])=>` rgb(${a.rgb} / ${(d*a.k).toFixed(3)}) ${((f+v/100*(1-f))*100).toFixed(1)}%`).join(",")+")"};function H(){const p=[];for(const a of document.querySelectorAll("[color],[data-lamp]")){const g=getComputedStyle(a),b=g.getPropertyValue("--vs-color-rgb").trim()||(a.hasAttribute("data-lamp")?(g.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");b&&p.push({el:a,rgb:b,rect:a.getBoundingClientRect()})}return p}function $(){if(l=0,!n.size)return;const p=H();for(const a of n){if(!a.visible)continue;if(!p.length){a.on&&(a.el.style.setProperty("--lit","0"),a.on=!1);continue}const g=a.el.getBoundingClientRect(),b=g.left+g.width/2,m=g.top+g.height/2,f=[];for(const d of p){if(d.el===a.el||d.el.contains(a.el)||a.el.contains(d.el))continue;const v=Math.max(d.rect.left,Math.min(b,d.rect.right)),V=Math.max(d.rect.top,Math.min(m,d.rect.bottom)),T=Math.max(g.left,Math.min(v,g.right)),R=Math.max(g.top,Math.min(V,g.bottom)),F=Math.max(0,1-Math.hypot(v-T,V-R)/t)**e*r;F&&f.push({rgb:d.rgb,k:Math.min(1,F),w:d.rect.width,h:d.rect.height,x:d.rect.left+d.rect.width/2-g.left,y:d.rect.top+d.rect.height/2-g.top})}if(!f.length){a.on&&(a.el.style.setProperty("--lit","0"),a.on=!1);continue}f.sort((d,v)=>d.k-v.k),a.el.style.setProperty("--lit-ring",f.flatMap(d=>[A(i,d,o),A(s,d,c)]).join(",")),a.el.style.setProperty("--lit-fill",f.map(d=>A(s,d,h)).join(",")),a.el.style.setProperty("--lit","1"),a.on=!0}}const x=()=>{l||(l=requestAnimationFrame($))};return addEventListener("scroll",x,{passive:!0,capture:!0}),addEventListener("resize",x,{passive:!0}),globalThis.vsLight=x,{add(p){u||=new IntersectionObserver(g=>{for(const b of g)for(const m of n)m.el===b.target&&(m.visible=b.isIntersecting);x()});const a={el:p,visible:!0,on:!1};return n.add(a),u.observe(p),x(),()=>{n.delete(a),u.unobserve(p)}}}})(),B=`
  :host { display: inline-flex; max-width: 100%; }
  /* demo-bg turns the host into a full-bleed scene (see .gdock.has-demo below) */
  :host([demo-bg]:not([demo-bg='false'])) { display: block; width: 100%; height: 100%; }
  .gdock {
    --box: 52px;
    --icon: 24px;
    --gap: 6px;
    --pad: 8px;
    --rr: 26px;
    --sheen-r: 190px;
    --accent: var(--text, #ededed);
    --ring: 255 255 255; /* glow/ring rgb (space-separated) */
    --sheen-rgb: var(--ring); /* specular light — follows the tone */
    --glass-hi: 255 255 255; /* glass edge highlight rgb */
    --glass-rim: 255 255 255; /* inner rim rgb (flips dark on light theme) */
    display: inline-flex;
    justify-content: center;
    /* the slab tilts in 3D toward the cursor — perspective lives on the parent */
    perspective: 900px;
    perspective-origin: 50% 50%;
    /* room above the bar for the lifted icons */
    padding-top: calc(var(--box) * 0.72);
    max-width: 100%;
  }
  .gdock--sm { --box: 44px; --icon: 20px; --gap: 5px; --pad: 6px; --rr: 20px; --sheen-r: 150px; }
  .gdock--lg { --box: 60px; --icon: 28px; --gap: 8px; --pad: 10px; --rr: 30px; --sheen-r: 230px; }

  /* ── The frosted glass capsule ── */
  .gdock__bar {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: flex-end;
    flex-wrap: wrap; justify-content: center; max-width: 100%;
    gap: var(--gap);
    padding: var(--pad);
    border: 1px solid var(--border, #262626);
    border-radius: var(--rr);
    background: color-mix(in srgb, var(--bg-elevated, #141416) 62%, transparent);
    backdrop-filter: blur(26px) saturate(180%);
    -webkit-backdrop-filter: blur(26px) saturate(180%);
    box-shadow:
      0 1px 0 0 rgb(var(--glass-hi) / 0.08) inset,
      0 28px 70px -26px rgba(0, 0, 0, 0.62);
    /* tilt toward the cursor — the transition trails the per-frame var writes */
    transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
    transform-origin: center;
    transition: transform 460ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
    will-change: transform;
    /* lifted icons rise out of the bar — never clip them */
    overflow: visible;
  }
  .gdock--r-none .gdock__bar { --rr: 0px; }
  .gdock--r-subtle .gdock__bar { --rr: 14px; }
  .gdock--r-rounded .gdock__bar { --rr: 20px; }
  .gdock--r-pill .gdock__bar { --rr: 999px; }
  @supports (corner-shape: squircle) {
    .gdock--r-squircle .gdock__bar { corner-shape: squircle; }
  }

  /* ── Signature: specular sheen that follows the cursor ── */
  .gdock__sheen {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    background:
      radial-gradient(
        var(--sheen-r) circle at var(--mx, 50%) var(--my, 50%),
        rgb(var(--sheen-rgb) / 0.26),
        rgb(var(--sheen-rgb) / 0.10) 34%,
        rgb(var(--sheen-rgb) / 0) 68%
      );
    opacity: var(--sheen-o, 0);
    transition: opacity 420ms var(--ease-out, ease);
    will-change: opacity;
  }
  @supports (corner-shape: squircle) {
    .gdock--r-squircle .gdock__sheen { corner-shape: squircle; }
  }

  /* ── Glass edge: bright top inner highlight line + whisper of an inner ring ── */
  .gdock__edge {
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    pointer-events: none;
    background: linear-gradient(180deg, rgb(var(--glass-hi) / 0.14), rgb(var(--glass-hi) / 0) 42%);
    box-shadow:
      inset 0 1px 0 0 rgb(var(--glass-hi) / 0.5),
      inset 0 0 0 1px rgb(var(--glass-rim) / 0.05);
  }
  @supports (corner-shape: squircle) {
    .gdock--r-squircle .gdock__edge { corner-shape: squircle; }
  }

  /* proximity glow — soft feathered ring on the capsule border (self-contained
     fx-glow; MUST stay position:absolute + carry class fx-glow) */
  .fx-glow {
    position: absolute;
    inset: var(--glow-inset, -1px);
    z-index: 1;
    border-radius: inherit;
    padding: var(--glow-ring, 1px);
    pointer-events: none;
    background:
      radial-gradient(60px circle at var(--gx, 50%) var(--gy, 50%),
        rgb(var(--fx-tint, 255 255 255) / .6), rgb(var(--fx-tint, 255 255 255) / .42) 30%, rgb(var(--fx-tint, 255 255 255) / .16) 58%, rgb(var(--fx-tint, 255 255 255) / 0) 82%),
      radial-gradient(200px circle at var(--gx, 50%) var(--gy, 50%),
        rgb(var(--fx-tint, 255 255 255) / .6), rgb(var(--fx-tint, 255 255 255) / .27) 42%, rgb(var(--fx-tint, 255 255 255) / .08) 66%, rgb(var(--fx-tint, 255 255 255) / 0) 85%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude;
    opacity: calc(var(--glow, 0) * var(--glow-strength, .5));
    transition: opacity 140ms;
  }
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .gdock__bar::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .gdock__bar::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .gdock__glow { border-radius: inherit; }
  @supports (corner-shape: squircle) {
    .gdock--r-squircle .gdock__glow { corner-shape: squircle; }
  }

  /* ── Each icon ── */
  .gdock__item {
    position: relative;
    z-index: 2;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: var(--box);
    height: var(--box);
    padding: 0;
    border: 0;
    border-radius: calc(var(--box) * 0.3);
    background: transparent;
    font-family: inherit;
    /* rest → secondary, brightening toward --text as the cursor nears (--near) */
    color: color-mix(in srgb, var(--text-secondary, #a6a6a6), var(--text, #ededed) calc(var(--near, 0) * 100%));
    cursor: pointer;
    /* gentle lift + hair of scale; grows upward from the glass floor */
    transform: translateY(var(--ty, 0)) scale(var(--s, 1));
    transform-origin: bottom center;
    transition:
      transform 260ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      background-color 200ms var(--ease-out, ease),
      color 200ms var(--ease-out, ease);
    will-change: transform;
    -webkit-tap-highlight-color: transparent;
  }
  @supports (corner-shape: squircle) {
    .gdock__item { corner-shape: squircle; border-radius: calc(var(--box) * 0.42); }
  }
  .gdock__item:hover { color: var(--text, #ededed); background: rgb(var(--glass-hi) / 0.06); }
  .gdock__item:focus-visible { outline: none; color: var(--text, #ededed); box-shadow: 0 0 0 2px rgb(var(--ring) / 0.7); }
  .gdock__item.is-active { color: var(--accent); }

  .gdock__ico { display: grid; place-items: center; width: var(--icon); height: var(--icon); }
  .gdock__ico svg { width: 100%; height: 100%; display: block; }

  /* running-app dot under the active icon */
  .gdock__dot {
    position: absolute;
    bottom: calc(var(--pad) * -0.5 - 2px);
    left: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
    translate: -50% 0;
    scale: 0;
    opacity: 0;
    transition: scale 260ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)), opacity 200ms ease;
  }
  .gdock__item.is-active .gdock__dot { scale: 1; opacity: 1; }

  /* ── Tones — recolor accent, glow ring and the specular sheen ── */
  .gdock--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
  .gdock--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
  .gdock--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }

  /* ── Disabled ── */
  .gdock.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .gdock__bar { transform: none !important; transition: none; }
    .gdock__sheen { display: none; }
    .gdock__item { transition: color 160ms ease, background-color 160ms ease; transform: none !important; }
    .gdock__dot { transition: none; }
  }

  /* light-theme glass tuning (was a non-scoped :root override in the SFC) */
  :host-context([data-theme='light']) .gdock { --glass-rim: 17 17 17; }

  /* ── demo-bg: a photo scene behind the capsule ──────────────────────────
     The whole point of this dock is the acrylic: blur(26px) + saturate(180%)
     sampling whatever sits behind it. Over a flat page background there is
     nothing to sample, so the frost is invisible and the dock reads as a plain
     dark pill. This opt-in scene puts a real image behind it — same convention
     (and same wallpaper) as <vs-slider-fluent demo-bg>. */
  .gdock__scene { display: none; }
  .gdock.has-demo {
    width: 100%;
    height: 100%;
    min-height: 190px;
    padding: 26px;
    padding-top: calc(var(--box) * 0.72 + 26px);
    box-sizing: border-box;
    position: relative;
    display: grid;
    place-items: center;
    overflow: hidden;
  }
  .gdock.has-demo .gdock__scene {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
      linear-gradient(rgb(0 0 0 / 0.28), rgb(0 0 0 / 0.42)),
      url(/bg/236.webp) center / cover no-repeat;
  }
  /* the capsule floats ON the scene — and its own translucency is what lets the
     photo read through the frost */
  .gdock.has-demo .gdock__bar { z-index: 1; background: rgb(255 255 255 / 0.10); }
  :host-context([data-theme='light']) .gdock.has-demo .gdock__bar { background: rgb(255 255 255 / 0.22); }
`,y=[{label:"Home",linear:["M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z","M12 17.9902V14.9902"],bold:["M20.04 6.81969L14.28 2.78969C12.71 1.68969 10.3 1.74969 8.78999 2.91969L3.77999 6.82969C2.77999 7.60969 1.98999 9.20969 1.98999 10.4697V17.3697C1.98999 19.9197 4.05999 21.9997 6.60999 21.9997H17.39C19.94 21.9997 22.01 19.9297 22.01 17.3797V10.5997C22.01 9.24969 21.14 7.58969 20.04 6.81969ZM12.75 17.9997C12.75 18.4097 12.41 18.7497 12 18.7497C11.59 18.7497 11.25 18.4097 11.25 17.9997V14.9997C11.25 14.5897 11.59 14.2497 12 14.2497C12.41 14.2497 12.75 14.5897 12.75 14.9997V17.9997Z"]},{label:"Profile",linear:["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"],bold:["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M11.9999 14.5C6.98991 14.5 2.90991 17.86 2.90991 22C2.90991 22.28 3.12991 22.5 3.40991 22.5H20.5899C20.8699 22.5 21.0899 22.28 21.0899 22C21.0899 17.86 17.0099 14.5 11.9999 14.5Z"]},{label:"Messages",linear:["M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z","M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"],bold:["M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"]},{label:"Photos",linear:["M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z","M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z","M2.67004 18.9496L7.60004 15.6396C8.39004 15.1096 9.53004 15.1696 10.24 15.7796L10.57 16.0696C11.35 16.7396 12.61 16.7396 13.39 16.0696L17.55 12.4996C18.33 11.8296 19.59 11.8296 20.37 12.4996L22 13.8996"],bold:["M9.00012 10.3801C10.3146 10.3801 11.3801 9.31456 11.3801 8.00012C11.3801 6.68568 10.3146 5.62012 9.00012 5.62012C7.68568 5.62012 6.62012 6.68568 6.62012 8.00012C6.62012 9.31456 7.68568 10.3801 9.00012 10.3801Z","M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z"]},{label:"Music",linear:["M6.28003 21.9998C8.00316 21.9998 9.40003 20.6029 9.40003 18.8798C9.40003 17.1566 8.00316 15.7598 6.28003 15.7598C4.55691 15.7598 3.16003 17.1566 3.16003 18.8798C3.16003 20.6029 4.55691 21.9998 6.28003 21.9998Z","M20.84 16.8003V4.60034C20.84 2.00034 19.21 1.64034 17.56 2.09034L11.32 3.79034C10.18 4.10034 9.40002 5.00034 9.40002 6.30034V8.47034V9.93034V18.8703","M17.72 19.9197C19.4431 19.9197 20.84 18.5228 20.84 16.7997C20.84 15.0766 19.4431 13.6797 17.72 13.6797C15.9968 13.6797 14.6 15.0766 14.6 16.7997C14.6 18.5228 15.9968 19.9197 17.72 19.9197Z","M9.40002 9.52039L20.84 6.40039"],bold:["M20.8901 5.17958V16.4796C20.8901 18.4596 19.2801 20.0696 17.3001 20.0696C15.3301 20.0696 13.7101 18.4596 13.7101 16.4796C13.7101 14.5096 15.3301 12.8996 17.3001 12.8996C18.1401 12.8996 18.8901 13.1896 19.5001 13.6696V7.71958L10.2901 10.3396V18.4096C10.2901 20.3896 8.67011 21.9996 6.70011 21.9996C4.72011 21.9996 3.11011 20.3896 3.11011 18.4096C3.11011 16.4396 4.72011 14.8296 6.70011 14.8296C7.53011 14.8296 8.28011 15.1196 8.89011 15.5896V6.74958C8.89011 5.27958 9.78011 4.13958 11.1901 3.75958L16.9701 2.17958C18.1401 1.85958 19.1301 1.96958 19.8301 2.50958C20.5401 3.03958 20.8901 3.93958 20.8901 5.17958Z"]},{label:"Settings",linear:["M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z","M2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"],bold:["M20.1 9.21945C18.29 9.21945 17.55 7.93945 18.45 6.36945C18.97 5.45945 18.66 4.29945 17.75 3.77945L16.02 2.78945C15.23 2.31945 14.21 2.59945 13.74 3.38945L13.63 3.57945C12.73 5.14945 11.25 5.14945 10.34 3.57945L10.23 3.38945C9.78 2.59945 8.76 2.31945 7.97 2.78945L6.24 3.77945C5.33 4.29945 5.02 5.46945 5.54 6.37945C6.45 7.93945 5.71 9.21945 3.9 9.21945C2.86 9.21945 2 10.0694 2 11.1194V12.8794C2 13.9194 2.85 14.7794 3.9 14.7794C5.71 14.7794 6.45 16.0594 5.54 17.6294C5.02 18.5394 5.33 19.6994 6.24 20.2194L7.97 21.2094C8.76 21.6794 9.78 21.3995 10.25 20.6094L10.36 20.4194C11.26 18.8494 12.74 18.8494 13.65 20.4194L13.76 20.6094C14.23 21.3995 15.25 21.6794 16.04 21.2094L17.77 20.2194C18.68 19.6994 18.99 18.5294 18.47 17.6294C17.56 16.0594 18.3 14.7794 20.11 14.7794C21.15 14.7794 22.01 13.9294 22.01 12.8794V11.1194C22 10.0794 21.15 9.21945 20.1 9.21945ZM12 15.2494C10.21 15.2494 8.75 13.7894 8.75 11.9994C8.75 10.2094 10.21 8.74945 12 8.74945C13.79 8.74945 15.25 10.2094 15.25 11.9994C15.25 13.7894 13.79 15.2494 12 15.2494Z"]}],N=6,q=.08;let C;function G(n){if(C||=document.createElement("canvas").getContext("2d"),!C)return null;C.fillStyle="#000",C.fillStyle=n;const t=C.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const Y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function Z(n,t){const e=t?G(String(t).trim()):null;if(!e){for(const l of Y)n.style.removeProperty(l);return}const r=l=>(l/=255,l<=.03928?l/12.92:((l+.055)/1.055)**2.4),s=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(l=>Math.round(s?l*.92:l+(255-l)*.16)),h=(l,u)=>n.style.setProperty(l,u);for(const l of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])h(l,o);h("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const l of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])h(l,e.join(" "));for(const l of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])h(l,s?"#0b0b0b":"#ffffff");for(const l of["--btn-primary-rip","--btn-primary-glow"])h(l,s?"0 0 0":"255 255 255");h("--vs-color",o),h("--vs-color-rgb",e.join(" ")),h("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class X extends HTMLElement{static observedAttributes=["active","size","radius","tone","tilt","tooltips","disabled","demo-bg","color"];#a;#o;#t;#c;#r=null;#e=[];#f;#s=0;#l=0;#m=0;#d=!1;#n=46;#i=0;constructor(){super(),this.#a=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=B,this.#o=document.createElement("nav"),this.#o.className="gdock",this.#o.setAttribute("aria-label","Dock"),this.#t=document.createElement("div"),this.#t.className="gdock__bar",this.#t.setAttribute("role","toolbar"),this.#t.setAttribute("aria-label","Dock");const e=document.createElement("span");e.className="gdock__sheen",e.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="gdock__edge",r.setAttribute("aria-hidden","true");const i=document.createElement("span");i.className="fx-glow gdock__glow",i.setAttribute("aria-hidden","true"),this.#t.append(e,r,i),this.#c=document.createElement("span"),this.#c.className="gdock__scene",this.#c.setAttribute("aria-hidden","true"),this.#o.append(this.#c,this.#t),this.#a.append(t,this.#o),this.#t.addEventListener("click",this.#k),this.#t.addEventListener("pointermove",this.#C,{passive:!0}),this.#t.addEventListener("pointerleave",this.#b,{passive:!0}),this.#t.addEventListener("keydown",this.#y)}set items(t){this.#r=Array.isArray(t)?t:null,this.#p()}get items(){return this.#r??y}connectedCallback(){Z(this,this.getAttribute("color")),this.#d=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,this.#i=this.#h(Number(this.getAttribute("active"))||0),this.#g(),this.#p(),addEventListener("resize",this.#u),this.#f=D(this.#t,260,()=>this.hasAttribute("disabled"))}disconnectedCallback(){this.#t.removeEventListener("click",this.#k),this.#t.removeEventListener("pointermove",this.#C),this.#t.removeEventListener("pointerleave",this.#b),this.#t.removeEventListener("keydown",this.#y),removeEventListener("resize",this.#u),this.#s&&(cancelAnimationFrame(this.#s),this.#s=0),this.#f?.()}attributeChangedCallback(t){if(Z(this,this.getAttribute("color")),!!this.#o){if(t==="active"){this.#x(this.#h(Number(this.getAttribute("active"))||0));return}if(t==="tone"||t==="radius"||t==="tooltips"){this.#g(),this.#p();return}t==="tilt"&&!this.hasAttribute("tilt")&&(this.#t.style.setProperty("--rx","0deg"),this.#t.style.setProperty("--ry","0deg")),this.#g()}}#h(t){const e=(this.#r?.length?this.#r:y).length;return Math.max(0,Math.min(e-1,t|0))}#g(){const t=(r,i)=>this.getAttribute(r)??i;let e=`gdock gdock--${t("size","md")} gdock--r-${t("radius","squircle")} gdock--t-${t("tone","default")}`;this.hasAttribute("disabled")&&(e+=" is-disabled"),this.#_()&&(e+=" has-demo"),this.#o.className=e}#_(){const t=this.getAttribute("demo-bg");return t!==null&&t!=="false"}#p(){if(!this.#t)return;const t=this.#r?.length?this.#r:y;this.#i=this.#h(this.#i);for(const i of this.#e)i.remove();this.#e=[];const e=this.hasAttribute("disabled"),r=this.hasAttribute("tooltips");t.forEach((i,s)=>{const o=document.createElement("button");o.type="button",o.className="gdock__item"+(s===this.#i?" is-active":""),o.style.cssText="--s:1;--ty:0px;--near:0",o.dataset.i=s,o.disabled=e,o.setAttribute("aria-label",i.label??""),s===this.#i&&o.setAttribute("aria-current","page"),o.tabIndex=s===this.#i?0:-1,r&&(o.title=i.label??"");const c=document.createElement("span");c.className="gdock__ico",c.append(this.#v(i,s===this.#i));const h=document.createElement("span");h.className="gdock__dot",h.setAttribute("aria-hidden","true"),o.append(c,h),o.addEventListener("focus",()=>this.#w(s)),o.addEventListener("blur",()=>{this.#t.contains(this.#a.activeElement)||this.#b()}),this.#t.append(o),this.#e.push(o)}),this.#u()}#v(t,e){const r=document.createElementNS(M,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("aria-hidden","true");const i=(e?t.bold:t.linear)||[];if(e){r.setAttribute("fill","currentColor");for(const s of i){const o=document.createElementNS(M,"path");o.setAttribute("d",s),r.append(o)}}else{r.setAttribute("fill","none");for(const s of i){const o=document.createElementNS(M,"path");o.setAttribute("d",s),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),r.append(o)}}return r}#x(t){if(t===this.#i)return;const e=this.#r?.length?this.#r:y,r=this.#i;this.#i=t,[r,t].forEach(i=>{const s=this.#e[i];if(!s)return;const o=i===t;s.classList.toggle("is-active",o),o?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current");const c=s.querySelector(".gdock__ico");c&&(c.textContent="",c.append(this.#v(e[i],o)))}),this.#e.forEach((i,s)=>{i&&(i.tabIndex=s===t?0:-1)})}#w(t){this.#d||this.hasAttribute("disabled")||this.#e.forEach((e,r)=>{const i=(r-t)*(e.offsetWidth||52),s=Math.exp(-(i*i)/(2*this.#n*this.#n));e.style.setProperty("--s",(1+q*s).toFixed(3)),e.style.setProperty("--ty",(-6*s).toFixed(2)+"px"),e.style.setProperty("--near",s.toFixed(3))})}#y=t=>{const e={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1},r=this.#e.length;if(!r||this.hasAttribute("disabled"))return;const i=this.#e.indexOf(this.#a.activeElement);if(i<0)return;let s=-1;t.key in e?s=(i+e[t.key]+r)%r:t.key==="Home"?s=0:t.key==="End"&&(s=r-1),!(s<0)&&(t.preventDefault(),this.#e.forEach((o,c)=>{o.tabIndex=c===s?0:-1}),this.#e[s].focus())};#u=()=>{const t=this.#e[0];this.#n=(t?.offsetWidth||52)*.85};#L=()=>{this.#s=0;const t=this.#t;if(!t)return;const e=t.getBoundingClientRect(),r=this.#l-e.left,i=this.#m-e.top;if(t.style.setProperty("--mx",r.toFixed(1)+"px"),t.style.setProperty("--my",i.toFixed(1)+"px"),t.style.setProperty("--sheen-o","1"),this.hasAttribute("tilt")){const c=Math.max(-1,Math.min(1,r/e.width*2-1)),h=Math.max(-1,Math.min(1,i/e.height*2-1));t.style.setProperty("--ry",(c*N).toFixed(2)+"deg"),t.style.setProperty("--rx",(-h*N).toFixed(2)+"deg")}const s=e.left,o=2*this.#n*this.#n;for(const c of this.#e){const h=s+c.offsetLeft+c.offsetWidth/2,l=this.#l-h,u=Math.exp(-(l*l)/o);c.style.setProperty("--s",(1+q*u).toFixed(3)),c.style.setProperty("--ty",(-6*u).toFixed(2)+"px"),c.style.setProperty("--near",u.toFixed(3))}};#C=t=>{this.hasAttribute("disabled")||this.#d||(this.#l=t.clientX,this.#m=t.clientY,this.#s||(this.#s=requestAnimationFrame(this.#L)))};#b=()=>{this.#s&&(cancelAnimationFrame(this.#s),this.#s=0);const t=this.#t;t&&(t.style.setProperty("--sheen-o","0"),t.style.setProperty("--rx","0deg"),t.style.setProperty("--ry","0deg"));for(const e of this.#e)e.style.setProperty("--s","1"),e.style.setProperty("--ty","0px"),e.style.setProperty("--near","0")};#k=t=>{const e=t.target.closest(".gdock__item");if(!e||this.hasAttribute("disabled"))return;const r=Number(e.dataset.i),i=this.#r?.length?this.#r:y;this.#x(r),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:i[r],index:r}}))}}customElements.define("vs-dock-glass",X);
