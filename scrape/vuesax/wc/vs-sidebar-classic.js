const A=new Set;let E=0,M=0,N=!1,L=0,I=!1,S=null;function z(){if(L=0,!!N)for(const n of A){if(!n.visible)continue;if(n.disabled()){n.lastI!==0&&(n.el.style.setProperty("--glow","0"),n.lastI=0);continue}n.rect||(n.rect=n.el.getBoundingClientRect());const t=n.rect,e=Math.max(t.left,Math.min(E,t.right)),s=Math.max(t.top,Math.min(M,t.bottom)),i=Math.max(0,1-Math.hypot(E-e,M-s)/n.radius);i===0&&n.lastI===0||(n.el.style.setProperty("--gx",`${E-t.left}px`),n.el.style.setProperty("--gy",`${M-t.top}px`),n.el.style.setProperty("--glow",i.toFixed(3)),n.lastI=i)}}function T(n){E=n.clientX,M=n.clientY,N=!0,L||(L=requestAnimationFrame(z))}function H(){for(const n of A)n.rect=null;N&&!L&&(L=requestAnimationFrame(z))}function B(n,t,e){I||(I=!0,addEventListener("pointermove",T,{passive:!0}),addEventListener("scroll",H,{passive:!0,capture:!0}),addEventListener("resize",H,{passive:!0}),S=new IntersectionObserver(r=>{for(const p of r)for(const f of A)f.el===p.target&&(f.visible=p.isIntersecting,p.isIntersecting&&(f.rect=null))}));const s={el:n,radius:t,disabled:e,rect:null,visible:!0,lastI:0};A.add(s),S.observe(n);const i=Y.add(n);return()=>{A.delete(s),S.unobserve(n),i()}}const $="http://www.w3.org/2000/svg",Z=["M244 21H199.018L122 140.315L44.9893 21H0L122 210L244 21Z","M121.996 230.888L18.7895 71H0L121.996 260L244 71H225.203L121.996 230.888Z","M186 3.59936L122 100L58 3.59936L105.097 15.3751V0H138.903V15.3751L186 3.59936Z"],D="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502",G="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008",w=n=>`<svg viewBox="0 0 24 24" fill="none">${n}</svg>`,P=[{id:"home",label:"Home",icon:w('<path d="M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 17.9902V14.9902" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>')},{id:"apps",label:"Applications",icon:w('<path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>'),children:[{id:"app-chat",label:"Chat",href:"#chat"},{id:"app-mail",label:"Mail",href:"#mail"},{id:"app-calendar",label:"Calendar",href:"#calendar"}]},{id:"analytics",label:"Analytics",badge:3,icon:w('<path d="M2 2V19C2 20.66 3.34 22 5 22H22" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 17L9.59 11.64C10.35 10.76 11.7 10.7 12.52 11.53L13.47 12.48C14.29 13.3 15.64 13.25 16.4 12.37L21 7" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>'),children:[{id:"an-overview",label:"Overview",href:"#overview"},{id:"an-reports",label:"Reports",href:"#reports"}]},{id:"team",label:"Team",icon:w('<path d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9699 14.4402C18.3399 14.6702 19.8499 14.4302 20.9099 13.7202C22.3199 12.7802 22.3199 11.2402 20.9099 10.3002C19.8399 9.59016 18.3099 9.35016 16.9399 9.59016" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.99994 14.4402C5.62994 14.6702 4.11994 14.4302 3.05994 13.7202C1.64994 12.7802 1.64994 11.2402 3.05994 10.3002C4.12994 9.59016 5.65994 9.35016 7.02994 9.59016" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0001 14.6297C11.9401 14.6197 11.8701 14.6197 11.8101 14.6297C10.4301 14.5797 9.33008 13.4497 9.33008 12.0497C9.33008 10.6197 10.4801 9.46973 11.9101 9.46973C13.3401 9.46973 14.4901 10.6297 14.4901 12.0497C14.4801 13.4497 13.3801 14.5897 12.0001 14.6297Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.09021 17.7794C7.68021 18.7194 7.68021 20.2594 9.09021 21.1994C10.6902 22.2694 13.3102 22.2694 14.9102 21.1994C16.3202 20.2594 16.3202 18.7194 14.9102 17.7794C13.3202 16.7194 10.6902 16.7194 9.09021 17.7794Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>')},{id:"settings",label:"Settings",icon:w('<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>')}],q=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,Y=globalThis[Symbol.for("vs-light")]||=(()=>{const n=new Set,t=110,e=1.6,s=1.7,i=34,r=72,p=[[.6,0],[.42,30],[.16,58],[0,82]],f=[[.6,0],[.27,42],[.08,66],[0,85]],d=[[.85,0],[.4,42],[.12,66],[0,84]];let o=0,v=null;const u=(c,a,h)=>{const x=a.w/2+c,_=a.h/2+c,y=a.h/2/_;return`radial-gradient(${x.toFixed(1)}px ${_.toFixed(1)}px at ${a.x.toFixed(1)}px ${a.y.toFixed(1)}px,`+h.map(([l,C])=>` rgb(${a.rgb} / ${(l*a.k).toFixed(3)}) ${((y+C/100*(1-y))*100).toFixed(1)}%`).join(",")+")"};function b(){const c=[];for(const a of document.querySelectorAll("[color],[data-lamp]")){const h=getComputedStyle(a),x=h.getPropertyValue("--vs-color-rgb").trim()||(a.hasAttribute("data-lamp")?(h.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");x&&c.push({el:a,rgb:x,rect:a.getBoundingClientRect()})}return c}function m(){if(o=0,!n.size)return;const c=b();for(const a of n){if(!a.visible)continue;if(!c.length){a.on&&(a.el.style.setProperty("--lit","0"),a.on=!1);continue}const h=a.el.getBoundingClientRect(),x=h.left+h.width/2,_=h.top+h.height/2,y=[];for(const l of c){if(l.el===a.el||l.el.contains(a.el)||a.el.contains(l.el))continue;const C=Math.max(l.rect.left,Math.min(x,l.rect.right)),j=Math.max(l.rect.top,Math.min(_,l.rect.bottom)),O=Math.max(h.left,Math.min(C,h.right)),R=Math.max(h.top,Math.min(j,h.bottom)),F=Math.max(0,1-Math.hypot(C-O,j-R)/t)**e*s;F&&y.push({rgb:l.rgb,k:Math.min(1,F),w:l.rect.width,h:l.rect.height,x:l.rect.left+l.rect.width/2-h.left,y:l.rect.top+l.rect.height/2-h.top})}if(!y.length){a.on&&(a.el.style.setProperty("--lit","0"),a.on=!1);continue}y.sort((l,C)=>l.k-C.k),a.el.style.setProperty("--lit-ring",y.flatMap(l=>[u(i,l,p),u(r,l,f)]).join(",")),a.el.style.setProperty("--lit-fill",y.map(l=>u(r,l,d)).join(",")),a.el.style.setProperty("--lit","1"),a.on=!0}}const g=()=>{o||(o=requestAnimationFrame(m))};return addEventListener("scroll",g,{passive:!0,capture:!0}),addEventListener("resize",g,{passive:!0}),globalThis.vsLight=g,{add(c){v||=new IntersectionObserver(h=>{for(const x of h)for(const _ of n)_.el===x.target&&(_.visible=x.isIntersecting);g()});const a={el:c,visible:!0,on:!1};return n.add(a),v.observe(c),g(),()=>{n.delete(a),v.unobserve(c)}}}})(),K=`
  :host { display: inline-flex; }

  /* Shell mode: the sidebar IS the column, so it takes the height it is given.
     The 560px default below is what makes the catalog card look like a
     sidebar; a real app layout hands it a full-height slot and expects it
     filled — without this it floats as a short panel with dead space under it. */
  :host([full]) { display: flex; align-self: stretch; height: 100%; }

/* proximity glow on the aside border (SFC parity: .sb__glow) */
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
  .sb::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .sb::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
.sb__glow { --glow-strength: 0.5; --glow-ring: 1px; --glow-inset: -1px; border-radius: 16px; }

.sb {
  --w: 256px;
  --w-collapsed: 72px;
  --pad: 12px;
  --item-h: 40px;
  --rr: 10px;
  --accent: var(--inp-accent, #ededed);
  --ring: var(--inp-ring, 255 255 255);
  --spring: cubic-bezier(0.34, 1.8, 0.5, 1);
  --spring-soft: cubic-bezier(0.34, 1.4, 0.6, 1);
  --ease: var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));

  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  width: var(--w);
  height: 560px;
  max-height: 80vh;
  padding: var(--pad);
  gap: 4px;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: 16px;
  background: var(--bg-card, #111);
  color: var(--inp-text, #ededed);
  font: inherit;
  overflow: hidden;
  transition: width 460ms var(--spring-soft);
}
  :host([full]) .sb { height: 100%; max-height: none; }
  /* Edge to edge: the app-shell cut. A floating panel with a radius and
     a border all round is a lovely catalog card and the wrong thing for a
     real sidebar, which meets the window on three sides and only shows a
     seam against the content. */
  :host([flush]) .sb { border-radius: 0; border-top: 0; border-left: 0; border-bottom: 0; }


.sb.is-collapsed { --w: var(--w-collapsed); }

.sb__head { display: flex; align-items: center; gap: 8px; height: var(--item-h); padding: 0 6px; }
.sb__logo { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1 1 auto; overflow: hidden; }
.sb__mark { display: inline-flex; color: var(--accent); flex: 0 0 auto; }
.sb__brand { font-weight: 650; font-size: 15px; letter-spacing: 0.01em; white-space: nowrap; }
.sb__collapse {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px; height: 30px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary, #a1a1a1);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, transform 480ms var(--spring);
}
.sb__collapse svg { width: 18px; height: 18px; }
.sb__collapse:hover:not(:disabled) { background: rgb(var(--ring) / 0.08); color: var(--inp-text, #ededed); }
.sb__collapse:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.is-collapsed .sb__collapse { transform: rotate(180deg); }
.is-collapsed .sb__head { justify-content: center; padding: 0; }
.is-collapsed .sb__logo { display: none; }

.sb__divider { height: 1px; margin: 4px 6px; background: rgb(var(--ring) / 0.1); flex: 0 0 auto; }

.sb__region { display: flex; flex-direction: column; gap: 2px; }
.sb__center { position: relative; flex: 1 1 auto; overflow-y: auto; overflow-x: hidden; min-height: 0; padding: 2px 0; }

.sb__hl {
  position: absolute;
  top: 0; left: 0;
  z-index: 0;
  border-radius: var(--rr);
  background: rgb(var(--ring) / 0.08);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 260ms var(--ease),
    width 260ms var(--ease),
    height 260ms var(--ease),
    opacity 180ms ease;
}
.sb__hl.is-on { opacity: 1; }
.sb__center::-webkit-scrollbar { width: 6px; }
.sb__center::-webkit-scrollbar-thumb { background: rgb(var(--ring) / 0.14); border-radius: 999px; }
.sb__group { display: flex; flex-direction: column; }

.sb__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 11px;
  --item-px: 11px;
  width: 100%;
  height: var(--item-h);
  padding: 0 var(--item-px);
  border: none;
  border-radius: var(--rr);
  background: transparent;
  color: var(--text-secondary, #a1a1a1);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  transition:
    background 180ms var(--ease),
    color 180ms var(--ease);
}
.sb__item:hover { color: var(--inp-text, #ededed); }
.sb__item:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.sb__item.is-active {
  background: rgb(var(--ring) / 0.12);
  color: var(--inp-text, #ededed);
}
.sb__item.is-active::before {
  content: '';
  position: absolute;
  left: 5px; top: 50%;
  width: 3px; height: 18px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: var(--accent);
}
.sb__icon {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px; height: 22px;
  color: currentColor;
}
.sb__icon svg { width: 20px; height: 20px; display: block; }
.sb__dot::after {
  content: '';
  width: 7px; height: 7px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.6;
}

.sb__label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.sb__badge {
  flex: 0 0 auto;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgb(var(--ring) / 0.12);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
}
.sb__chev { flex: 0 0 auto; color: var(--text-muted, #6b6b6b); transition: transform 300ms var(--spring); }
.sb__chev.is-open { transform: rotate(180deg); }

.sb__cbadge, .sb__cdot {
  position: absolute;
  top: 5px; right: 5px;
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 200ms var(--ease), transform 260ms var(--spring);
  pointer-events: none;
}
.sb__cbadge {
  min-width: 16px; height: 16px;
  padding: 0 4px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 999px;
  background: var(--accent);
  color: var(--badge-solid-fg, #0b0b0b);
  font-size: 10px; font-weight: 700; line-height: 1;
}
.sb__cdot {
  width: 6px; height: 6px;
  border-radius: 999px;
  background: var(--accent);
}
.is-collapsed .sb__cbadge,
.is-collapsed .sb__cdot { opacity: 1; transform: scale(1); }

.sb__fade { transition: opacity 200ms var(--ease); }
.is-collapsed .sb__group { width: 100%; }
.is-collapsed .sb__item.is-active::before { display: none; }

.sb__sub {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 500ms cubic-bezier(0.5, -0.6, 0.5, 1);
}
.sb__sub.is-open {
  grid-template-rows: 1fr;
  transition: grid-template-rows 560ms cubic-bezier(0.34, 1.8, 0.5, 1);
}
.sb__sub-clip { min-height: 0; overflow: hidden; }
.sb__sub-inner {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding-left: 16px;
  transform-origin: top left;
  opacity: 0;
  filter: blur(6px);
  transform: translateY(-6px) scale(0.95);
  transition:
    opacity 220ms ease,
    filter 240ms ease,
    transform 300ms var(--ease);
}
.sb__sub-inner.is-open {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0) scale(1);
  transition:
    opacity 300ms ease,
    filter 380ms ease,
    transform 520ms var(--spring-soft);
  transition-delay: 60ms;
}

.sb__subitem {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 34px;
  padding: 0 11px;
  margin-top: 1px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted, #6b6b6b);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background 160ms var(--ease), color 160ms var(--ease);
}
.sb__subitem:hover { color: var(--inp-text, #ededed); }
.sb__subitem:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.sb__subitem.is-active { color: var(--inp-text, #ededed); }
.sb__subdot {
  flex: 0 0 auto;
  width: 5px; height: 5px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.45;
  transition: opacity 160ms ease, transform 160ms ease;
}
.sb__subitem.is-active .sb__subdot { opacity: 1; transform: scale(1.3); background: var(--accent); }

.sb.is-disabled { opacity: 0.6; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .sb, .sb__sub, .sb__sub-inner, .sb__fade, .sb__chev, .sb__collapse, .sb__item {
    transition: none;
  }
  .is-collapsed .sb__fade { filter: none; }
  .sb__sub { transition: none; }
  .sb__sub-inner { filter: none; transform: none; }
}
`,W=`
.sb-flyout {
  position: fixed;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 6px;
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: 12px;
  background: var(--bg-elevated, #161616);
  color: var(--inp-text, #ededed);
  font: inherit;
  transform-origin: left center;
}
.sb-flyout__title {
  margin: 2px 8px 5px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--text-muted, #6b6b6b);
}
.sb-flyout__item {
  display: flex;
  align-items: center;
  gap: 9px;
  height: 34px;
  padding: 0 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary, #a1a1a1);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
}
.sb-flyout__item:hover { background: rgb(var(--ring) / 0.06); color: var(--inp-text, #ededed); }
.sb-flyout__item:focus-visible { outline: 2px solid var(--inp-accent, #ededed); outline-offset: -2px; }
.sb-flyout__item.is-active { color: var(--inp-text, #ededed); }
.sb-flyout__dot {
  width: 5px; height: 5px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.45;
}
.sb-flyout__item.is-active .sb-flyout__dot { opacity: 1; transform: scale(1.3); background: var(--inp-accent, #ededed); }

.sb-fly-enter-active { transition: opacity 220ms ease, transform 360ms cubic-bezier(0.34, 1.6, 0.5, 1), filter 240ms ease; }
.sb-fly-leave-active { transition: opacity 160ms ease, transform 200ms ease, filter 160ms ease; }
.sb-fly-enter-from, .sb-fly-leave-to {
  opacity: 0;
  transform: translateX(-8px) scale(0.94);
  filter: blur(6px);
}

@media (prefers-reduced-motion: reduce) {
  .sb-fly-enter-active, .sb-fly-leave-active { transition: none; }
  .sb-fly-enter-from, .sb-fly-leave-to { opacity: 1; transform: none; filter: none; }
}
`;let k;function X(n){if(k||=document.createElement("canvas").getContext("2d"),!k)return null;k.fillStyle="#000",k.fillStyle=n;const t=k.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const U=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function V(n,t){const e=t?X(String(t).trim()):null;if(!e){for(const o of U)n.style.removeProperty(o);return}const s=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,p=`rgb(${e[0]} ${e[1]} ${e[2]})`,f=e.map(o=>Math.round(r?o*.92:o+(255-o)*.16)),d=(o,v)=>n.style.setProperty(o,v);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])d(o,p);d("--btn-primary-bg-hover",`rgb(${f[0]} ${f[1]} ${f[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])d(o,e.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])d(o,r?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])d(o,r?"0 0 0":"255 255 255");d("--vs-color",p),d("--vs-color-rgb",e.join(" ")),d("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class J extends HTMLElement{static observedAttributes=["flush","full","value","collapsed","collapsible","dividers","sub-dots","title","disabled","glow","color"];#s;#f;#m;#g;#r;#h;#e;#o;#k=null;#v=P;#A=[];#i="";#t=!1;#d=new Set;#x={x:0,y:0,w:0,h:0,on:!1};#c=null;#p={top:0,left:0};#l=null;#n=null;#L=null;#u=[];#_=!1;#y=0;#C=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=K,this.#s=document.createElement("aside"),this.#s.className="sb",this.#f=document.createElement("span"),this.#f.className="fx-glow sb__glow",this.#f.setAttribute("aria-hidden","true"),this.#m=document.createElement("header"),this.#m.className="sb__head";const s=document.createElement("div");s.className="sb__logo";const i=document.createElement("span");i.className="sb__mark",i.setAttribute("aria-hidden","true"),i.appendChild(this.#S(Z,{viewBox:"0 0 244 260",width:"21",height:"22",fill:"currentColor"})),this.#g=document.createElement("span"),this.#g.className="sb__brand sb__fade",s.append(i,this.#g),this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="sb__collapse",this.#r.appendChild(this.#S([G],{viewBox:"0 0 24 24",fill:"none","aria-hidden":"true"})),this.#r.addEventListener("click",()=>this.#R()),this.#m.append(s,this.#r),this.#h=document.createElement("span"),this.#h.className="sb__divider",this.#h.setAttribute("aria-hidden","true"),this.#e=document.createElement("nav"),this.#e.className="sb__region sb__center",this.#e.setAttribute("aria-label","Main navigation"),this.#e.setAttribute("data-lenis-prevent",""),this.#e.addEventListener("pointerleave",()=>this.#Z()),this.#o=document.createElement("span"),this.#o.className="sb__hl",this.#o.setAttribute("aria-hidden","true"),this.#e.appendChild(this.#o),this.#s.append(this.#f,this.#m,this.#h,this.#e),t.append(e,this.#s)}connectedCallback(){V(this,this.getAttribute("color")),this.#t=this.hasAttribute("collapsed"),this.#d=new Set,this.#N(),this.#i=this.#E(),this.#b(),this.#k=B(this.#s,320,()=>this.hasAttribute("disabled")||this.getAttribute("glow")==="false")}disconnectedCallback(){this.#k?.(),this.#k=null,this.#P(),clearTimeout(this.#y),this.#w()}attributeChangedCallback(){V(this,this.getAttribute("color")),this.#s&&this.#b()}get value(){return this.#i}set value(t){t==null||t===""?this.removeAttribute("value"):this.setAttribute("value",String(t))}get collapsed(){return this.#t}set collapsed(t){t?this.setAttribute("collapsed",""):this.removeAttribute("collapsed")}get items(){return this.#v}set items(t){this.#v=Array.isArray(t)&&t.length?t:P,this.#s&&(this.#d=new Set,this.#a(!0),this.#N(),this.#i=this.#E(),this.#b())}#N(){for(const t of this.#e.querySelectorAll(":scope > .sb__group"))t.remove();this.#A=[];for(const t of this.#v){const e=!!t.children?.length,s=document.createElement("div");s.className="sb__group";const i=document.createElement(e||!t.href?"button":"a");i.className="sb__item",e||!t.href?i.type="button":i.setAttribute("href",t.href);const r=document.createElement("span");r.setAttribute("aria-hidden","true"),t.icon?(r.className="sb__icon",r.innerHTML=t.icon):r.className="sb__icon sb__dot";const p=document.createElement("span");if(p.className="sb__label sb__fade",p.textContent=t.label,i.append(r,p),t.badge!=null){const u=document.createElement("span");u.className="sb__badge sb__fade",u.textContent=String(t.badge),i.appendChild(u);const b=document.createElement("span");b.className="sb__cbadge",b.setAttribute("aria-hidden","true"),b.textContent=String(t.badge),i.appendChild(b)}else if(e){const u=document.createElement("span");u.className="sb__cdot",u.setAttribute("aria-hidden","true"),i.appendChild(u)}let f=null;e&&(f=this.#S([D],{viewBox:"0 0 24 24",width:"15",height:"15",fill:"none",class:"sb__chev sb__fade","aria-hidden":"true"}),i.appendChild(f)),i.addEventListener("pointerenter",()=>this.#F(i)),i.addEventListener("click",()=>this.#B(t,i)),s.appendChild(i);let d=null,o=null;const v=[];if(e){d=document.createElement("div"),d.className="sb__sub";const u=document.createElement("div");u.className="sb__sub-clip",o=document.createElement("div"),o.className="sb__sub-inner";for(const b of t.children){const m=document.createElement(b.href?"a":"button");m.className="sb__subitem",b.href?m.setAttribute("href",b.href):m.type="button";const g=document.createElement("span");g.className="sb__subdot",g.setAttribute("aria-hidden","true");const c=document.createElement("span");c.className="sb__label",c.textContent=b.label,m.append(g,c),m.addEventListener("pointerenter",()=>this.#F(m)),m.addEventListener("click",()=>this.#M(b)),o.appendChild(m),v.push({c:b,el:m,dot:g})}u.appendChild(o),d.appendChild(u),s.appendChild(d)}this.#e.appendChild(s),this.#A.push({it:t,item:i,chev:f,sub:d,subInner:o,subs:v})}this.#i||(this.#i=this.#E())}#E(){const t=this.getAttribute("value");if(t)return t;for(const e of this.#v)return e.children?.length?e.children[0].id:e.id;return""}#O(t){return!!t.children?.some(e=>e.id===this.#i)}#M(t){this.#i=t.id,this.setAttribute("value",t.id),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:t.id}})),this.dispatchEvent(new CustomEvent("select",{bubbles:!0,composed:!0,detail:{item:t}}))}#j(t){this.#t!==t&&(this.#t=t,t?this.setAttribute("collapsed",""):this.removeAttribute("collapsed"),t||this.#a(),this.dispatchEvent(new CustomEvent("toggle",{bubbles:!0,composed:!0,detail:{collapsed:t}})),this.#b())}#R(){this.hasAttribute("disabled")||this.#j(!this.#t)}#T(t){this.hasAttribute("disabled")||(this.#t&&this.#j(!1),this.#d.has(t.id)?this.#d.delete(t.id):this.#d.add(t.id),this.#b())}#B(t,e){if(!this.hasAttribute("disabled")){if(t.children?.length){if(this.#t){this.#D(t,e);return}this.#T(t);return}this.#a(),this.#M(t)}}#F(t){if(this.hasAttribute("disabled"))return;const e=t.getBoundingClientRect(),s=this.#e.getBoundingClientRect();this.#x={x:e.left-s.left+this.#e.scrollLeft,y:e.top-s.top+this.#e.scrollTop,w:e.width,h:e.height,on:!0},this.#I()}#Z(){this.#x={...this.#x,on:!1},this.#I()}#I(){const{x:t,y:e,w:s,h:i,on:r}=this.#x;this.#o.style.transform=`translate(${t}px, ${e}px)`,this.#o.style.width=`${s}px`,this.#o.style.height=`${i}px`,this.#o.classList.toggle("is-on",r)}#b(){const t=this.getAttribute("value");t&&(this.#i=t);const e=this.#t;this.#t=this.hasAttribute("collapsed"),e&&!this.#t&&this.#a();const s=this.hasAttribute("disabled"),i=this.hasAttribute("dividers"),r=this.hasAttribute("sub-dots");this.#s.classList.toggle("is-collapsed",this.#t),this.#s.classList.toggle("is-disabled",s),this.#s.classList.toggle("has-dividers",i),this.#h.style.display=i?"":"none",this.#g.textContent=this.getAttribute("title")||"Vuesax";const p=this.hasAttribute("collapsible");this.#r.style.display=p?"":"none",this.#r.disabled=s,this.#r.setAttribute("aria-label",this.#t?"Expand menu":"Collapse menu"),this.#r.setAttribute("aria-pressed",String(this.#t));for(const f of this.#A){const{it:d,item:o,chev:v,sub:u,subInner:b,subs:m}=f,g=!!d.children?.length,c=g&&this.#d.has(d.id),a=c&&!this.#t,h=this.#i===d.id;o.classList.toggle("is-active",h||this.#O(d)),o.classList.toggle("is-open",c),g?o.setAttribute("aria-expanded",String(c)):o.removeAttribute("aria-expanded"),h?o.setAttribute("aria-current","page"):o.removeAttribute("aria-current"),this.#t?o.setAttribute("title",d.label):o.removeAttribute("title"),v&&v.classList.toggle("is-open",c),u&&u.classList.toggle("is-open",a),b&&b.classList.toggle("is-open",a);for(const{c:x,el:_,dot:y}of m){const l=this.#i===x.id;_.classList.toggle("is-active",l),l?_.setAttribute("aria-current","page"):_.removeAttribute("aria-current"),y.style.display=r?"":"none"}}this.#$(r)}#D(t,e){if(this.#c===t.id){this.#a();return}const s=e.getBoundingClientRect();this.#p={top:Math.round(s.top),left:Math.round(s.right+10)};const i=this.#c!=null&&this.#_;this.#c=t.id,i?this.#q(t):this.#G(t)}#G(t){this.#w(),this.#K(t),document.body.appendChild(this.#l),this.#n.offsetWidth,this.#n.classList.remove("sb-fly-enter-from"),this.#_=!0,this.#W()}#q(t){this.#L.textContent=t.label,this.#n.style.top=`${this.#p.top}px`,this.#n.style.left=`${this.#p.left}px`,this.#H(t)}#a(t){if(this.#c!=null){if(this.#c=null,this.#P(),t||q()){this.#w();return}this.#Y()}}#Y(){this.#_=!1;const t=this.#l,e=this.#n;if(!t||!e)return;e.classList.remove("sb-fly-enter-active","sb-fly-enter-from"),e.classList.add("sb-fly-leave-active","sb-fly-leave-to"),clearTimeout(this.#y);const s=()=>{this.#l===t&&this.#w()},i=r=>{r.target===e&&(e.removeEventListener("transitionend",i),s())};e.addEventListener("transitionend",i),this.#y=setTimeout(s,500)}#w(){clearTimeout(this.#y),this.#l&&this.#l.remove(),this.#l=this.#n=this.#L=null,this.#u=[],this.#_=!1}#K(t){const e=document.createElement("div");e.className="sb-flyout-overlay";const s=e.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=W;const r=document.createElement("div");r.className="sb-flyout sb-fly-enter-active sb-fly-enter-from",r.setAttribute("role","menu"),r.style.top=`${this.#p.top}px`,r.style.left=`${this.#p.left}px`,r.style.minWidth="200px";const p=document.createElement("p");p.className="sb-flyout__title",p.textContent=t.label,r.appendChild(p),this.#L=p,this.#n=r,this.#H(t),s.append(i,r),this.#l=e}#H(t){for(const{el:s}of this.#u)s.remove();this.#u=[];const e=this.hasAttribute("sub-dots");for(const s of t.children||[]){const i=document.createElement(s.href?"a":"button");i.className="sb-flyout__item",s.href?i.setAttribute("href",s.href):i.type="button",i.setAttribute("role","menuitem");const r=document.createElement("span");r.className="sb-flyout__dot",r.setAttribute("aria-hidden","true"),r.style.display=e?"":"none",i.append(r,document.createTextNode(s.label)),i.addEventListener("click",()=>{this.#M(s),this.#a()}),this.#n.appendChild(i),this.#u.push({c:s,el:i,dot:r})}this.#$(e)}#$(t){for(const{c:e,el:s,dot:i}of this.#u){const r=this.#i===e.id;s.classList.toggle("is-active",r),r?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current"),t!==void 0&&(i.style.display=t?"":"none")}}#W(){this.#C||(this.#C=!0,document.addEventListener("pointerdown",this.#V,!0),document.addEventListener("keydown",this.#z))}#P(){this.#C&&(this.#C=!1,document.removeEventListener("pointerdown",this.#V,!0),document.removeEventListener("keydown",this.#z))}#V=t=>{if(this.#c==null)return;const e=t.composedPath(),s=e.includes(this),i=this.#n&&e.includes(this.#n);!s&&!i&&this.#a()};#z=t=>{t.key==="Escape"&&this.#a()};#S(t,e={}){const s=document.createElementNS($,"svg");for(const[i,r]of Object.entries(e))s.setAttribute(i,r);for(const i of t){const r=document.createElementNS($,"path");r.setAttribute("d",i),(!e.fill||e.fill==="none")&&(r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","1.5"),r.setAttribute("stroke-miterlimit","10"),r.setAttribute("stroke-linecap","round"),r.setAttribute("stroke-linejoin","round")),s.appendChild(r)}return s}}customElements.define("vs-sidebar-classic",J);
