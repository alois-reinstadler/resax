const w=new Set;let C=0,E=0,S=!1,_=0,N=!1,M=null;function R(){if(_=0,!!S)for(const e of w){if(!e.visible)continue;if(e.disabled()){e.lastI!==0&&(e.el.style.setProperty("--glow","0"),e.lastI=0);continue}e.rect||(e.rect=e.el.getBoundingClientRect());const t=e.rect,i=Math.max(t.left,Math.min(C,t.right)),s=Math.max(t.top,Math.min(E,t.bottom)),o=Math.max(0,1-Math.hypot(C-i,E-s)/e.radius);o===0&&e.lastI===0||(e.el.style.setProperty("--gx",`${C-t.left}px`),e.el.style.setProperty("--gy",`${E-t.top}px`),e.el.style.setProperty("--glow",o.toFixed(3)),e.lastI=o)}}function T(e){C=e.clientX,E=e.clientY,S=!0,_||(_=requestAnimationFrame(R))}function z(){for(const e of w)e.rect=null;S&&!_&&(_=requestAnimationFrame(R))}function V(e,t,i){N||(N=!0,addEventListener("pointermove",T,{passive:!0}),addEventListener("scroll",z,{passive:!0,capture:!0}),addEventListener("resize",z,{passive:!0}),M=new IntersectionObserver(a=>{for(const p of a)for(const h of w)h.el===p.target&&(h.visible=p.isIntersecting,p.isIntersecting&&(h.rect=null))}));const s={el:e,radius:t,disabled:i,rect:null,visible:!0,lastI:0};w.add(s),M.observe(e);const o=G.add(e);return()=>{w.delete(s),M.unobserve(e),o()}}function q(){return matchMedia("(prefers-reduced-motion: reduce)").matches}const L={dangerWarn:[["M12 9V14",1.5],["M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z",1.5],["M11.9945 17H12.0035",2]],success:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M7.75 11.9999L10.58 14.8299L16.25 9.16992",1.5]],default:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M12 8V13",1.5],["M11.9945 16H12.0035",2]]},F="http://www.w3.org/2000/svg";function k(e){const t=document.createElementNS(F,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const[i,s]of e){const o=document.createElementNS(F,"path");o.setAttribute("d",i),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width",String(s)),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),t.appendChild(o)}return t}const G=globalThis[Symbol.for("vs-light")]||=(()=>{const e=new Set,t=110,i=1.6,s=1.7,o=34,a=72,p=[[.6,0],[.42,30],[.16,58],[0,82]],h=[[.6,0],[.27,42],[.08,66],[0,85]],c=[[.85,0],[.4,42],[.12,66],[0,84]];let n=0,v=null;const A=(g,r,d)=>{const u=r.w/2+g,b=r.h/2+g,f=r.h/2/b;return`radial-gradient(${u.toFixed(1)}px ${b.toFixed(1)}px at ${r.x.toFixed(1)}px ${r.y.toFixed(1)}px,`+d.map(([l,m])=>` rgb(${r.rgb} / ${(l*r.k).toFixed(3)}) ${((f+m/100*(1-f))*100).toFixed(1)}%`).join(",")+")"};function B(){const g=[];for(const r of document.querySelectorAll("[color],[data-lamp]")){const d=getComputedStyle(r),u=d.getPropertyValue("--vs-color-rgb").trim()||(r.hasAttribute("data-lamp")?(d.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");u&&g.push({el:r,rgb:u,rect:r.getBoundingClientRect()})}return g}function H(){if(n=0,!e.size)return;const g=B();for(const r of e){if(!r.visible)continue;if(!g.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}const d=r.el.getBoundingClientRect(),u=d.left+d.width/2,b=d.top+d.height/2,f=[];for(const l of g){if(l.el===r.el||l.el.contains(r.el)||r.el.contains(l.el))continue;const m=Math.max(l.rect.left,Math.min(u,l.rect.right)),$=Math.max(l.rect.top,Math.min(b,l.rect.bottom)),O=Math.max(d.left,Math.min(m,d.right)),j=Math.max(d.top,Math.min($,d.bottom)),I=Math.max(0,1-Math.hypot(m-O,$-j)/t)**i*s;I&&f.push({rgb:l.rgb,k:Math.min(1,I),w:l.rect.width,h:l.rect.height,x:l.rect.left+l.rect.width/2-d.left,y:l.rect.top+l.rect.height/2-d.top})}if(!f.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}f.sort((l,m)=>l.k-m.k),r.el.style.setProperty("--lit-ring",f.flatMap(l=>[A(o,l,p),A(a,l,h)]).join(",")),r.el.style.setProperty("--lit-fill",f.map(l=>A(a,l,c)).join(",")),r.el.style.setProperty("--lit","1"),r.on=!0}}const x=()=>{n||(n=requestAnimationFrame(H))};return addEventListener("scroll",x,{passive:!0,capture:!0}),addEventListener("resize",x,{passive:!0}),globalThis.vsLight=x,{add(g){v||=new IntersectionObserver(d=>{for(const u of d)for(const b of e)b.el===u.target&&(b.visible=u.isIntersecting);x()});const r={el:g,visible:!0,on:!1};return e.add(r),v.observe(g),x(),()=>{e.delete(r),v.unobserve(g)}}}})(),W=`
  :host { display: block; }
  .alert {
    --rr: 12px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --solid-fg: var(--badge-solid-fg, #0b0b0b);
    position: relative; isolation: isolate; box-sizing: border-box;
    display: flex; align-items: flex-start; gap: 11px;
    width: 100%; max-width: 440px; padding: 13px 14px;
    border: 1px solid transparent; border-radius: var(--rr);
    font: inherit; line-height: 1.45;
    transition:
      border-color 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
      background-color 200ms ease;
  }

  /* radii */
  .alert--r-subtle { --rr: 8px; }
  .alert--r-rounded { --rr: 12px; }
  .alert--r-pill { --rr: 18px; }

  /* ── variants ───────────────────────────────────────────────── */
  .alert--v-soft { background: rgb(var(--ring) / 0.1); border-color: rgb(var(--ring) / 0.2); color: var(--inp-text, #ededed); }
  .alert--v-solid { background: rgb(var(--ring) / 0.92); border-color: transparent; color: var(--solid-fg); }
  .alert--v-outline { background: transparent; border-color: rgb(var(--ring) / 0.45); color: var(--inp-text, #ededed); }

  /* icon */
  .alert__icon { flex: 0 0 auto; display: inline-flex; margin-top: 1px; color: var(--accent); font-size: 16px; }
  .alert__icon svg { width: 1.15em; height: 1.15em; display: block; }
  .alert--v-solid .alert__icon { color: inherit; }

  /* body */
  .alert__body { position: relative; z-index: 2; flex: 1 1 auto; min-width: 0; }
  .alert__title { margin: 0 0 2px; font-weight: 600; font-size: 14px; }
  .alert__msg { margin: 0; font-size: 13px; color: var(--tint); }
  .alert--v-solid .alert__msg { color: inherit; opacity: 0.88; }
  .alert__action { margin-top: 9px; display: flex; gap: 8px; flex-wrap: wrap; }

  /* close button */
  .alert__close {
    position: relative; isolation: isolate; flex: 0 0 auto;
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.5em; height: 1.5em; margin: -2px -2px 0 0; padding: 0;
    border: none; border-radius: 7px; background: transparent; color: inherit; font-size: inherit;
    cursor: pointer; opacity: 0.6;
    transition: opacity 160ms ease, background-color 160ms ease, transform 160ms ease;
  }
  .alert__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.16); }
  .alert--v-solid .alert__close:hover:not(:disabled) { background: rgb(0 0 0 / 0.16); }
  .alert__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .alert__ripples { border-radius: inherit; }
  .alert__close svg { width: 1em; height: 1em; display: block; }

  /* proximity glow */
  /* neighbour light — a coloured element nearby throws ITS colour on this one.
     Fed by the engine at the top of the file: --lit-fill / --lit-ring hold one
     gradient per lamp in reach, --lit is the master fade so a lamp leaving
     range dims out instead of cutting. Deliberately not on --glow: that one is
     the cursor's and other rules read it as a 0..1 intensity. */
  .alert::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .alert::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .alert__glow { --glow-strength: 0.9; --glow-ring: 1px; --glow-inset: -1px; --glow-r-core: 90px; --glow-r-soft: 260px; border-radius: inherit; }

  /* ── tones ──────────────────────────────────────────────────── */
  .alert--t-danger  { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; --tint: var(--inp-t-danger-hint, #ff8a8e);  --solid-fg: #160405; }
  .alert--t-warn    { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; --tint: var(--inp-t-warn-hint, #f5b544);    --solid-fg: #160f02; }
  .alert--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; --tint: var(--inp-t-success-hint, #5fd49b); --solid-fg: #04120b; }

  /* disabled */
  .alert.is-disabled { opacity: 0.55; }
  .alert.is-disabled .alert__close { cursor: not-allowed; }

  /* dismiss: collapse height to 0 with anticipation bounce + blur */
  .alert.is-closing {
    overflow: hidden; opacity: 0; filter: blur(6px); transform: scale(0.97);
    padding-top: 0 !important; padding-bottom: 0 !important;
    margin-top: 0 !important; margin-bottom: 0 !important;
    border-top-width: 0 !important; border-bottom-width: 0 !important;
    transition:
      height 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      opacity 300ms ease,
      filter 340ms ease,
      transform 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      padding 440ms cubic-bezier(0.5, -0.45, 0.55, 1);
  }

  /* ── proximity glow layer (soft feathered ring on the border) ── */
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

  /* ── ripple (droplet) on the close button ────────────────────── */
  .fx-ripples { position: absolute; inset: 0; z-index: 0; border-radius: inherit; overflow: hidden; pointer-events: none; }
  .fx-ripple {
    position: absolute; z-index: 1; pointer-events: none; border-radius: 50%; transform: translate(-50%,-50%) scale(0);
    background: radial-gradient(circle, rgb(var(--ring,255 255 255)/.38) 0%, rgb(var(--ring,255 255 255)/.20) 24%, rgb(var(--ring,255 255 255)/.09) 44%, rgb(var(--ring,255 255 255)/.03) 60%, transparent 76%);
    opacity: 0; will-change: transform, opacity;
    animation: alert-rip 780ms cubic-bezier(.22,1,.36,1) forwards, alert-fade 780ms cubic-bezier(.25,.1,.25,1) forwards;
  }
  @keyframes alert-rip  { from { transform: translate(-50%,-50%) scale(0); } to { transform: translate(-50%,-50%) scale(1); } }
  @keyframes alert-fade { from { opacity: .8; } to { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    .alert, .alert__close { transition: none; }
    .fx-ripple { display: none; }
  }
`;let y;function D(e){if(y||=document.createElement("canvas").getContext("2d"),!y)return null;y.fillStyle="#000",y.fillStyle=e;const t=y.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const i=t.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const Z=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function P(e,t){const i=t?D(String(t).trim()):null;if(!i){for(const n of Z)e.style.removeProperty(n);return}const s=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),a=.2126*s(i[0])+.7152*s(i[1])+.0722*s(i[2])>.45,p=`rgb(${i[0]} ${i[1]} ${i[2]})`,h=i.map(n=>Math.round(a?n*.92:n+(255-n)*.16)),c=(n,v)=>e.style.setProperty(n,v);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])c(n,p);c("--btn-primary-bg-hover",`rgb(${h[0]} ${h[1]} ${h[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])c(n,i.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])c(n,a?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])c(n,a?"0 0 0":"255 255 255");c("--vs-color",p),c("--vs-color-rgb",i.join(" ")),c("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class X extends HTMLElement{static observedAttributes=["title","message","variant","tone","radius","icon","dismissible","disabled","glow","color"];#e;#a;#r;#d;#h;#p;#l;#s;#c;#g;#u;#n;#o;#t;#i;#f;#b=!1;constructor(){super();const t=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=W,this.#e=document.createElement("div"),this.#a=document.createElement("span"),this.#a.className="fx-glow alert__glow",this.#a.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="alert__icon",this.#r.setAttribute("aria-hidden","true"),this.#l=document.createElement("slot"),this.#l.name="icon",this.#d=k(L.dangerWarn),this.#h=k(L.success),this.#p=k(L.default),this.#l.append(this.#d,this.#h,this.#p),this.#r.appendChild(this.#l);const s=document.createElement("div");s.className="alert__body",this.#s=document.createElement("p"),this.#s.className="alert__title",this.#c=document.createElement("p"),this.#c.className="alert__msg",this.#g=document.createElement("slot"),this.#u=document.createTextNode(""),this.#g.appendChild(this.#u),this.#c.appendChild(this.#g),this.#n=document.createElement("div"),this.#n.className="alert__action",this.#n.hidden=!0,this.#o=document.createElement("slot"),this.#o.name="action",this.#n.appendChild(this.#o),this.#o.addEventListener("slotchange",()=>{this.#n.hidden=this.#o.assignedNodes({flatten:!0}).length===0}),s.append(this.#s,this.#c,this.#n),this.#t=document.createElement("button"),this.#t.className="alert__close",this.#t.type="button",this.#t.setAttribute("aria-label","Close alert"),this.#i=document.createElement("span"),this.#i.className="fx-ripples alert__ripples",this.#i.setAttribute("aria-hidden","true");const o=k([["M18 6L6 18",1.5],["M6 6L18 18",1.5]]);this.#t.append(this.#i,o),this.#e.append(this.#a,this.#r,s,this.#t),t.append(i,this.#e),this.#t.addEventListener("pointerdown",a=>this.#x(a));for(const a of["pointerup","pointerleave","pointercancel"])this.#t.addEventListener(a,()=>{this.#t.style.transform=""});this.#t.addEventListener("click",()=>this.#y())}connectedCallback(){P(this,this.getAttribute("color")),this.setAttribute("role","alert"),this.#m(),this.#f=V(this.#e,240,()=>this.hasAttribute("disabled")||!this.hasAttribute("glow"))}disconnectedCallback(){this.#f?.(),this.#f=null}attributeChangedCallback(){P(this,this.getAttribute("color")),this.#e&&this.#m()}#m(){const t=(c,n)=>this.getAttribute(c)??n,i=this.hasAttribute("disabled"),s=this.hasAttribute("dismissible"),o=this.hasAttribute("icon"),a=t("tone","default"),p=t("title",""),h=t("message","Something you should know.");this.#e.className=`alert alert--v-${t("variant","soft")} alert--r-${t("radius","rounded")} alert--t-${a}${i?" is-disabled":""}${this.#b?" is-closing":""}`,this.#r.style.display=o?"":"none",this.#d.style.display=a==="danger"||a==="warn"?"":"none",this.#h.style.display=a!=="success"?"none":"",this.#p.style.display=a==="danger"||a==="warn"||a==="success"?"none":"",this.#s.textContent=p,this.#s.hidden=!p,this.#u.textContent=h,this.#t.style.display=s?"":"none",this.#t.disabled=i}#x(t){if(this.#t.disabled)return;const i=this.#t.getBoundingClientRect(),s=t.clientX-i.left,o=t.clientY-i.top,a=Math.max(s,i.width-s),p=Math.max(o,i.height-o),h=Math.hypot(a,p)*2,c=document.createElement("span");for(c.className="fx-ripple",c.style.cssText=`left:${s}px;top:${o}px;width:${h}px;height:${h}px`,c.addEventListener("animationend",()=>c.remove()),this.#i.appendChild(c);this.#i.childElementCount>6;)this.#i.firstElementChild.remove();this.#t.style.transform="scale(.9)"}#y(){if(this.hasAttribute("disabled")||this.#b)return;const t=this.#e;if(!t||q()){this.#v();return}const i=t.getBoundingClientRect().height;t.style.height=`${i}px`,this.#b=!0,t.classList.add("is-closing"),t.offsetHeight,requestAnimationFrame(()=>{t.style.height="0px"});const s=o=>{o.propertyName==="height"&&(t.removeEventListener("transitionend",s),this.#v())};t.addEventListener("transitionend",s)}#v(){this.style.display="none",this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}}customElements.define("vs-alert",X);
