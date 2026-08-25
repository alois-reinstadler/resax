const M="http://www.w3.org/2000/svg",R="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z";function T(){const t=document.createElementNS(M,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const n of[R,"M7.75 11.9999L10.58 14.8299L16.25 9.16992"]){const e=document.createElementNS(M,"path");e.setAttribute("d",n),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),t.appendChild(e)}return t}const k=new Set;let A=0,E=0,I=!1,w=0,z=!1,L=null;function V(){if(w=0,!!I)for(const t of k){if(!t.visible)continue;if(t.disabled()){t.lastI!==0&&(t.el.style.setProperty("--glow","0"),t.lastI=0);continue}t.rect||(t.rect=t.el.getBoundingClientRect());const n=t.rect,e=Math.max(n.left,Math.min(A,n.right)),c=Math.max(n.top,Math.min(E,n.bottom)),a=Math.max(0,1-Math.hypot(A-e,E-c)/t.radius);a===0&&t.lastI===0||(t.el.style.setProperty("--gx",`${A-n.left}px`),t.el.style.setProperty("--gy",`${E-n.top}px`),t.el.style.setProperty("--glow",a.toFixed(3)),t.lastI=a)}}function Z(t){A=t.clientX,E=t.clientY,I=!0,w||(w=requestAnimationFrame(V))}function H(){for(const t of k)t.rect=null;I&&!w&&(w=requestAnimationFrame(V))}function D(t,n,e){z||(z=!0,addEventListener("pointermove",Z,{passive:!0}),addEventListener("scroll",H,{passive:!0,capture:!0}),addEventListener("resize",H,{passive:!0}),L=new IntersectionObserver(m=>{for(const p of m)for(const f of k)f.el===p.target&&(f.visible=p.isIntersecting,p.isIntersecting&&(f.rect=null))}));const c={el:t,radius:n,disabled:e,rect:null,visible:!0,lastI:0};k.add(c),L.observe(t);const a=G.add(t);return()=>{k.delete(c),L.unobserve(t),a()}}function B(t){const n=document.createElementNS(M,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("aria-hidden","true");const e=document.createElementNS(M,"path");return e.setAttribute("d",t),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-miterlimit","10"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),n.appendChild(e),n}const N=[{title:"Order placed",description:"We confirmed your purchase.",time:"09:24",done:!0},{title:"Preparing",description:"Packing your products.",time:"10:02",done:!0},{title:"Shipped",description:"On its way to your address.",time:"13:40"},{title:"Issue",description:"Delayed due to weather.",time:"15:10"}],F={default:"#ffffff",danger:"#ff6369",warn:"#ffce6b",success:"#7fd1a0"},$=["M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z M7.32996 14.4898L9.70996 11.3998C10.05 10.9598 10.68 10.8798 11.12 11.2198L12.95 12.6598C13.39 12.9998 14.02 12.9198 14.36 12.4898L16.67 9.50977","M12.61 2.21C12.25 1.93 11.75 1.93 11.39 2.21C9.49004 3.66 3.88003 8.39 3.91003 13.9C3.91003 18.36 7.54004 22 12.01 22C16.48 22 20.11 18.37 20.11 13.91C20.12 8.48 14.5 3.67 12.61 2.21Z","M13.26 3.59924L5.04997 12.2892C4.73997 12.6192 4.43997 13.2692 4.37997 13.7192L4.00997 16.9592C3.87997 18.1292 4.71997 18.9292 5.87997 18.7292L9.09997 18.1792C9.54997 18.0992 10.18 17.7692 10.49 17.4292L18.7 8.73924C20.12 7.23924 20.76 5.52924 18.55 3.43924C16.35 1.36924 14.68 2.09924 13.26 3.59924Z M11.89 5.05078C12.32 7.81078 14.56 9.92078 17.34 10.2008 M3 22H21","M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"],G=globalThis[Symbol.for("vs-light")]||=(()=>{const t=new Set,n=110,e=1.6,c=1.7,a=34,m=72,p=[[.6,0],[.42,30],[.16,58],[0,82]],f=[[.6,0],[.27,42],[.08,66],[0,85]],h=[[.85,0],[.4,42],[.12,66],[0,84]];let o=0,d=null;const u=(l,i,s)=>{const _=i.w/2+l,y=i.h/2+l,x=i.h/2/y;return`radial-gradient(${_.toFixed(1)}px ${y.toFixed(1)}px at ${i.x.toFixed(1)}px ${i.y.toFixed(1)}px,`+s.map(([r,C])=>` rgb(${i.rgb} / ${(r*i.k).toFixed(3)}) ${((x+C/100*(1-x))*100).toFixed(1)}%`).join(",")+")"};function b(){const l=[];for(const i of document.querySelectorAll("[color],[data-lamp]")){const s=getComputedStyle(i),_=s.getPropertyValue("--vs-color-rgb").trim()||(i.hasAttribute("data-lamp")?(s.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");_&&l.push({el:i,rgb:_,rect:i.getBoundingClientRect()})}return l}function g(){if(o=0,!t.size)return;const l=b();for(const i of t){if(!i.visible)continue;if(!l.length){i.on&&(i.el.style.setProperty("--lit","0"),i.on=!1);continue}const s=i.el.getBoundingClientRect(),_=s.left+s.width/2,y=s.top+s.height/2,x=[];for(const r of l){if(r.el===i.el||r.el.contains(i.el)||i.el.contains(r.el))continue;const C=Math.max(r.rect.left,Math.min(_,r.rect.right)),S=Math.max(r.rect.top,Math.min(y,r.rect.bottom)),j=Math.max(s.left,Math.min(C,s.right)),O=Math.max(s.top,Math.min(S,s.bottom)),P=Math.max(0,1-Math.hypot(C-j,S-O)/n)**e*c;P&&x.push({rgb:r.rgb,k:Math.min(1,P),w:r.rect.width,h:r.rect.height,x:r.rect.left+r.rect.width/2-s.left,y:r.rect.top+r.rect.height/2-s.top})}if(!x.length){i.on&&(i.el.style.setProperty("--lit","0"),i.on=!1);continue}x.sort((r,C)=>r.k-C.k),i.el.style.setProperty("--lit-ring",x.flatMap(r=>[u(a,r,p),u(m,r,f)]).join(",")),i.el.style.setProperty("--lit-fill",x.map(r=>u(m,r,h)).join(",")),i.el.style.setProperty("--lit","1"),i.on=!0}}const v=()=>{o||(o=requestAnimationFrame(g))};return addEventListener("scroll",v,{passive:!0,capture:!0}),addEventListener("resize",v,{passive:!0}),globalThis.vsLight=v,{add(l){d||=new IntersectionObserver(s=>{for(const _ of s)for(const y of t)y.el===_.target&&(y.visible=_.isIntersecting);v()});const i={el:l,visible:!0,on:!1};return t.add(i),d.observe(l),v(),()=>{t.delete(i),d.unobserve(l)}}}})(),X=`
  .tl {
    --mk: 48px;
    --line: 3px;
    --gut: 48px;
    --gap: 22px;
    --fs: 14px;
    --fs-time: 12px;

    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--text-primary, #ededed);
    --muted: var(--text-secondary, #a1a1a1);
    --card: var(--surface-2, rgb(255 255 255 / 0.04));
    --card-bd: var(--inp-border, rgb(255 255 255 / 0.1));

    position: relative;
    isolation: isolate;
    list-style: none;
    margin: 0;
    padding: 0;
    font: inherit;
    font-size: var(--fs);
    color: var(--tint);
  }

  .tl--sm { --mk: 40px; --gut: 40px; --gap: 18px; --fs: 13px; --fs-time: 11px; }
  .tl--lg { --mk: 56px; --gut: 56px; --gap: 26px; --fs: 15px; --fs-time: 13px; }

  .tl__item {
    position: relative;
    display: grid;
    grid-template-columns: var(--gut) 1fr;
    column-gap: 14px;
    padding-bottom: var(--gap);
    animation: tl-in 560ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    animation-delay: var(--d);
  }
  .tl__item:last-child { padding-bottom: 0; }

  .tl__item::before {
    content: '';
    position: absolute;
    top: calc(50% + var(--mk) / 2 - 16px);
    bottom: calc(-1 * (var(--gap) + var(--mk) / 2 + 4px));
    left: calc(var(--gut) / 2);
    width: var(--line);
    transform: translateX(-50%);
    border-radius: 999px;
    background: linear-gradient(to bottom, var(--c, var(--card-bd)), var(--c2, var(--card-bd)));
    transition: background 300ms ease;
  }
  .tl__item:not(.tl__item--ln-done)::before {
    background: var(--card-bd);
  }
  .tl--l-dashed .tl__item::before {
    -webkit-mask: repeating-linear-gradient(to bottom, #000 0 5px, transparent 5px 10px);
    mask: repeating-linear-gradient(to bottom, #000 0 5px, transparent 5px 10px);
  }
  .tl__item:last-child::before { display: none; }

  .tl__marker {
    position: relative;
    isolation: isolate;
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tl__dot {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--mk);
    height: var(--mk);
    border-radius: 999px;
    background: var(--c, rgb(var(--ring) / 0.92));
    color: #15161a;
    font-size: calc(var(--mk) * 0.46);
    transition: background 200ms ease, color 200ms ease;
  }
  .tl__dot svg { display: block; width: 1em; height: 1em; }
  /* proximity glow: each dot lights on its own as the cursor nears it */
  .tl__dot::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(circle at center,
      rgb(var(--ring) / 0.55), rgb(var(--ring) / 0.18) 55%, rgb(var(--ring) / 0) 78%);
    opacity: calc(var(--glow, 0) * 0.9);
    transition: opacity 140ms;
  }
  @media (prefers-reduced-motion: reduce) { .tl__dot::after { transition: none; } }
  .tl__item:not(.tl__item--done) .tl__dot {
    background: var(--surface-3, #34353a);
    color: var(--muted);
  }

  .tl__check {
    position: absolute;
    z-index: 3;
    right: calc(50% - var(--mk) / 2 - 2px);
    bottom: calc(50% + var(--mk) / 2 - 16px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    background: var(--c);
    color: #15161a;
    font-size: 11px;
    border: 2px solid var(--surface-1, #1c1c1f);
    animation: tl-pop 360ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .tl__check svg { width: 0.95em; height: 0.95em; display: block; }
  @keyframes tl-pop {
    0% { opacity: 0; transform: scale(0); }
    100% { opacity: 1; transform: scale(1); }
  }

  .tl__content {
    grid-column: 2;
    min-width: 0;
    align-self: center;
    padding: 4px 0;
  }
  .tl__head {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .tl__title { font-weight: 600; font-size: calc(var(--fs) + 3px); line-height: 1.25; }
  .tl__item--done .tl__title { text-decoration: line-through; color: var(--muted); font-weight: 500; }
  .tl__item--done .tl__desc { text-decoration: line-through; }
  .tl__time {
    font-size: var(--fs-time);
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }
  .tl__desc {
    margin: 4px 0 0;
    color: var(--muted);
    line-height: 1.45;
    font-size: calc(var(--fs) - 1px);
  }

  .tl--a-right .tl__item {
    grid-template-columns: 1fr var(--gut);
  }
  .tl--a-right .tl__marker { grid-column: 2; }
  .tl--a-right .tl__content { grid-column: 1; text-align: right; }
  .tl--a-right .tl__item::before { left: auto; right: calc(var(--gut) / 2); transform: translateX(50%); }

  .tl--a-alternate .tl__item {
    grid-template-columns: 1fr var(--gut) 1fr;
    column-gap: 14px;
  }
  .tl--a-alternate .tl__marker { grid-column: 2; }
  .tl--a-alternate .tl__content { grid-column: 1; text-align: right; }
  .tl--a-alternate .tl__item--right .tl__content { grid-column: 3; text-align: left; }
  .tl--a-alternate .tl__item::before { left: 50%; transform: translateX(-50%); }

  .tl__item--t-danger {
    --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; --solid-fg: #160405; }
  .tl__item--t-warn {
    --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; --solid-fg: #160f02;
  }
  .tl__item--t-success {
    --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; --solid-fg: #04120b;
  }

  @keyframes tl-in {
    0%   { opacity: 0; transform: translateY(14px) scale(0.86); filter: blur(8px); }
    60%  { opacity: 1; transform: translateY(0) scale(1.04); filter: blur(0); }
    100% { opacity: 1; transform: none; filter: blur(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .tl__item { animation: none; }
  }
`;class q extends HTMLElement{static observedAttributes=["size","tone","align","line-style","color","progress","glow"];#t;#i=null;#e=[];#n=[];#r=null;constructor(){super();const n=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=X,this.#t=document.createElement("ol"),this.#t.className="tl",n.append(e,this.#t)}connectedCallback(){this.#l(),this.#o(),this.#r=D(this.#t,200,()=>this.getAttribute("glow")==="false")}disconnectedCallback(){this.#r?.(),this.#r=null}attributeChangedCallback(){this.#t&&this.#o()}get items(){return this.#i??N}set items(n){this.#i=Array.isArray(n)?n:null,this.#t&&(this.#l(),this.#o())}#s(n,e){return n&&n.tone||e}#a(n,e,c){return n&&n.color||c||F[e]||F.default}#l(){this.#t.textContent="",this.#n=[];const n=this.#i??N;this.#e=n.length?n:N,this.#e.forEach((e,c)=>{const a=document.createElement("li");a.className="tl__item",a.style.setProperty("--d",`${c*60}ms`);const m=document.createElement("span");m.className="tl__marker",m.setAttribute("aria-hidden","true");const p=document.createElement("span");p.className="tl__dot";const f=e.icon??$[c%$.length];p.appendChild(B(f));const h=document.createElement("span");h.className="tl__check",h.appendChild(T()),m.append(p,h);const o=document.createElement("div");o.className="tl__content";const d=document.createElement("div");d.className="tl__head";const u=document.createElement("time");u.className="tl__time",e.time?(u.textContent=e.time,u.style.display=""):u.style.display="none";const b=document.createElement("span");b.className="tl__title",b.textContent=e.title||"",d.append(u,b);const g=document.createElement("p");g.className="tl__desc",e.description?(g.textContent=e.description,g.style.display=""):g.style.display="none",o.append(d,g),a.append(m,o),this.#t.appendChild(a),this.#n.push({li:a,check:h})})}#o(){const n=this.getAttribute("size")||"md",e=this.getAttribute("align")||"left",c=this.getAttribute("line-style")||"solid",a=this.getAttribute("tone")||"default",m=this.getAttribute("color")||null,p=this.getAttribute("progress"),f=p==null?null:parseInt(p,10)||0;this.#t.className=["tl",`tl--${n}`,`tl--a-${e}`,`tl--l-${c}`].join(" ");const h=o=>f!=null?o<f:!!this.#e[o]?.done;for(let o=0;o<this.#n.length;o++){const d=this.#n[o],u=this.#e[o],b=this.#s(u,a),g=h(o),v=h(o+1),l=this.#e[o+1]??u,i=this.#s(l,a);d.li.className=["tl__item",`tl__item--t-${b}`,e==="alternate"&&o%2===1?"tl__item--right":"",g?"tl__item--done":"",v?"tl__item--ln-done":""].filter(Boolean).join(" "),d.li.style.setProperty("--d",`${o*60}ms`),d.li.style.setProperty("--c",this.#a(u,b,m)),d.li.style.setProperty("--c2",this.#a(l,i,m)),d.check.style.display=g?"":"none"}}}customElements.define("vs-timeline",q);
