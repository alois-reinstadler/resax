const O=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,b=(a,t,e)=>{if(!a.hasAttribute(t))return e;const o=a.getAttribute(t);return!(o==="false"||o==="0")},_=(a,t,e)=>a.getAttribute(t)??e,N=new Set;let z=0,P=0,q=!1,F=0,I=!1,T=null;function j(){if(F=0,!!q)for(const a of N){if(!a.visible)continue;if(a.disabled()){a.lastI!==0&&(a.el.style.setProperty("--glow","0"),a.lastI=0);continue}a.rect||(a.rect=a.el.getBoundingClientRect());const t=a.rect,e=Math.max(t.left,Math.min(z,t.right)),o=Math.max(t.top,Math.min(P,t.bottom)),i=Math.max(0,1-Math.hypot(z-e,P-o)/a.radius);i===0&&a.lastI===0||(a.el.style.setProperty("--gx",`${z-t.left}px`),a.el.style.setProperty("--gy",`${P-t.top}px`),a.el.style.setProperty("--glow",i.toFixed(3)),a.lastI=i)}}function Y(a){z=a.clientX,P=a.clientY,q=!0,F||(F=requestAnimationFrame(j))}function D(){for(const a of N)a.rect=null;q&&!F&&(F=requestAnimationFrame(j))}function W(a,t,e){I||(I=!0,addEventListener("pointermove",Y,{passive:!0}),addEventListener("scroll",D,{passive:!0,capture:!0}),addEventListener("resize",D,{passive:!0}),T=new IntersectionObserver(r=>{for(const h of r)for(const s of N)s.el===h.target&&(s.visible=h.isIntersecting,h.isIntersecting&&(s.rect=null))}));const o={el:a,radius:t,disabled:e,rect:null,visible:!0,lastI:0};N.add(o),T.observe(a);const i=K.add(a);return()=>{N.delete(o),T.unobserve(a),i()}}const R="cubic-bezier(0.34, 1.46, 0.44, 1)",S="cubic-bezier(0.22, 1, 0.36, 1)",k="cubic-bezier(0.65, 0, 0.35, 1)",U=["padding-top","padding-right","padding-bottom","padding-left","border-top-width","border-right-width","border-bottom-width","border-left-width","border-style","border-color","border-radius","corner-shape","font-family","font-size","font-weight","font-style","line-height","letter-spacing","color","text-transform","white-space","display","align-items","justify-content","gap","flex-direction"],B=".vt__surface, .vt__ghost, .vt__panel-glow",K=globalThis[Symbol.for("vs-light")]||=(()=>{const a=new Set,t=110,e=1.6,o=1.7,i=34,r=72,h=[[.6,0],[.42,30],[.16,58],[0,82]],s=[[.6,0],[.27,42],[.08,66],[0,85]],p=[[.85,0],[.4,42],[.12,66],[0,84]];let n=0,l=null;const f=(m,c,v)=>{const $=c.w/2+m,M=c.h/2+m,E=c.h/2/M;return`radial-gradient(${$.toFixed(1)}px ${M.toFixed(1)}px at ${c.x.toFixed(1)}px ${c.y.toFixed(1)}px,`+v.map(([u,g])=>` rgb(${c.rgb} / ${(u*c.k).toFixed(3)}) ${((E+g/100*(1-E))*100).toFixed(1)}%`).join(",")+")"};function d(){const m=[];for(const c of document.querySelectorAll("[color],[data-lamp]")){const v=getComputedStyle(c),$=v.getPropertyValue("--vs-color-rgb").trim()||(c.hasAttribute("data-lamp")?(v.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");$&&m.push({el:c,rgb:$,rect:c.getBoundingClientRect()})}return m}function y(){if(n=0,!a.size)return;const m=d();for(const c of a){if(!c.visible)continue;if(!m.length){c.on&&(c.el.style.setProperty("--lit","0"),c.on=!1);continue}const v=c.el.getBoundingClientRect(),$=v.left+v.width/2,M=v.top+v.height/2,E=[];for(const u of m){if(u.el===c.el||u.el.contains(c.el)||c.el.contains(u.el))continue;const g=Math.max(u.rect.left,Math.min($,u.rect.right)),x=Math.max(u.rect.top,Math.min(M,u.rect.bottom)),w=Math.max(v.left,Math.min(g,v.right)),L=Math.max(v.top,Math.min(x,v.bottom)),H=Math.max(0,1-Math.hypot(g-w,x-L)/t)**e*o;H&&E.push({rgb:u.rgb,k:Math.min(1,H),w:u.rect.width,h:u.rect.height,x:u.rect.left+u.rect.width/2-v.left,y:u.rect.top+u.rect.height/2-v.top})}if(!E.length){c.on&&(c.el.style.setProperty("--lit","0"),c.on=!1);continue}E.sort((u,g)=>u.k-g.k),c.el.style.setProperty("--lit-ring",E.flatMap(u=>[f(i,u,h),f(r,u,s)]).join(",")),c.el.style.setProperty("--lit-fill",E.map(u=>f(r,u,p)).join(",")),c.el.style.setProperty("--lit","1"),c.on=!0}}const C=()=>{n||(n=requestAnimationFrame(y))};return addEventListener("scroll",C,{passive:!0,capture:!0}),addEventListener("resize",C,{passive:!0}),globalThis.vsLight=C,{add(m){l||=new IntersectionObserver(v=>{for(const $ of v)for(const M of a)M.el===$.target&&(M.visible=$.isIntersecting);C()});const c={el:m,visible:!0,on:!1};return a.add(c),l.observe(m),C(),()=>{a.delete(c),l.unobserve(m)}}}})(),X=`
  :host { display: inline-flex; }
.vt {
  --h: var(--ctrl-h-md, 40px);
  --fs: var(--ctrl-fs-md, 14px);
  --px: var(--ctrl-px-md, 16px);
  --accent: var(--ui-accent, #ededed);
  --fx-tint: var(--fx-tint, 255 255 255);
  display: inline-flex;
  align-items: center;
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
}
.vt--sm { --h: var(--ctrl-h-sm, 32px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
.vt--lg { --h: var(--ctrl-h-lg, 48px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 20px); }
.vt--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --fx-tint: 255 99 105; }
.vt--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --fx-tint: 255 178 36; }
.vt--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --fx-tint: 76 195 138; }
.vt__source { display: inline-flex; }
.vt.is-disabled { opacity: 0.6; pointer-events: none; }

.vt__demo-btn {
  height: var(--h);
  padding: 0 var(--px);
  font: inherit;
  font-weight: 600;
  color: var(--ui-accent-fg, #0b0b0b);
  white-space: nowrap;
  background: var(--accent);
  border: 0;
  border-radius: var(--ctrl-r-rounded, 12px);
  cursor: pointer;
  transition: filter 160ms ease, transform 140ms ease;
}
.vt--r-none .vt__demo-btn { border-radius: var(--ctrl-r-none, 4px); }
.vt--r-subtle .vt__demo-btn { border-radius: var(--ctrl-r-subtle, 8px); }
.vt--r-pill .vt__demo-btn { border-radius: var(--ctrl-r-pill, 999px); }
.vt--r-squircle .vt__demo-btn { border-radius: var(--ctrl-r-squircle, 14px); }
@supports (corner-shape: squircle) { .vt--r-squircle .vt__demo-btn { corner-shape: squircle; } }
.vt__demo-btn:hover { filter: brightness(1.06); }
.vt__demo-btn:active { transform: scale(0.97); }

@media (prefers-reduced-motion: reduce) { .vt__demo-btn { transition: none; } }
`,V=`
.vt__backdrop {
  position: fixed;
  inset: 0;
  /* above the page's fixed chrome (sticky headers, bottom blur strips), which
     would otherwise paint over the dialog */
  z-index: 1200;
  background: var(--backdrop, rgba(0, 0, 0, 0.5));
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.vt__panel {
  --fs: var(--ctrl-fs-md, 14px);
  --rr: 20px;
  --accent: var(--ui-accent, #ededed);
  --fx-tint: 255 255 255;
  position: fixed;
  z-index: 1210;
  border-radius: var(--rr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  font-size: var(--fs);
  color: var(--text, #ededed);
  /* the box itself never hit-tests (only .vt__content does, see below) — mid-morph
     the trigger sits in dead space under the growing box; without this a click on
     the panel before layout settles would hit nothing instead of falling through. */
  pointer-events: none;
}
.vt__panel.vt--sm { --fs: var(--ctrl-fs-sm, 13px); }
.vt__panel.vt--lg { --fs: var(--ctrl-fs-lg, 15px); }
.vt__panel.vt--r-none { --rr: 8px; }
.vt__panel.vt--r-subtle { --rr: 10px; }
.vt__panel.vt--r-rounded { --rr: 20px; }
.vt__panel.vt--r-pill { --rr: 30px; }
.vt__panel.vt--r-squircle { --rr: 28px; }
.vt__panel.vt--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --fx-tint: 255 99 105; }
.vt__panel.vt--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --fx-tint: 255 178 36; }
.vt__panel.vt--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --fx-tint: 76 195 138; }
@supports (corner-shape: squircle) { .vt__panel.vt--r-squircle { corner-shape: squircle; } }
.vt__panel.vt--test { border: 1px solid lime; }

/* painting layer (border/bg/shadow) — kept separate so the box itself can morph */
.vt__surface {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  border: 1px solid var(--sel-menu-border, rgba(255, 255, 255, 0.09));
  background: var(--bg-card, #0a0a0a);
  box-shadow: var(--sel-menu-shadow, 0 18px 50px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3));
  pointer-events: none;
}
@supports (corner-shape: squircle) {
  .vt__panel.vt--r-squircle .vt__panel-glow,
  .vt__panel.vt--r-squircle .vt__surface,
  .vt__panel.vt--r-squircle .vt__ghost { corner-shape: squircle; }
}

/* proximity border glow — shared engine, see attachGlow above */
.fx-glow {
  position: absolute;
  inset: -1px;
  z-index: 1;
  pointer-events: none;
  border-radius: inherit;
  padding: 1px;
  background:
    radial-gradient(60px circle at var(--gx, 50%) var(--gy, 50%),
      rgb(var(--fx-tint, 255 255 255) / .6), rgb(var(--fx-tint, 255 255 255) / .42) 30%, rgb(var(--fx-tint, 255 255 255) / .16) 58%, rgb(var(--fx-tint, 255 255 255) / 0) 82%),
    radial-gradient(200px circle at var(--gx, 50%) var(--gy, 50%),
      rgb(var(--fx-tint, 255 255 255) / .6), rgb(var(--fx-tint, 255 255 255) / .27) 42%, rgb(var(--fx-tint, 255 255 255) / .08) 66%, rgb(var(--fx-tint, 255 255 255) / 0) 85%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: calc(var(--glow, 0) * .9 * .7);
  transition: opacity 140ms;
}

/* ghost — the cloned trigger that expands trigger→panel */
.vt__ghost {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center; /* clone centred → scales (zooms) from the box centre */
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
.vt__ghost-clone { display: inline-flex; will-change: transform; }

/* content layer: absolutely centred so it SCALES (zoom) from the centre while
   the box grows — not an unfold with text pinned at the top. */
.vt__inner {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  overflow: hidden;
  will-change: transform;
}
.vt__content { width: max-content; pointer-events: auto; }

/* ── demo card ─────────────────────────────────────────────────────────── */
.vt__card { display: flex; flex-direction: column; gap: 14px; width: 300px; padding: 18px; }
.vt__card-head { display: flex; align-items: center; gap: 12px; }
.vt__card-avatar {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  flex: none;
  border-radius: 14px;
  background: var(--accent);
  color: var(--ui-accent-fg, #0b0b0b);
  font-weight: 700;
  letter-spacing: 0.02em;
}
@supports (corner-shape: squircle) { .vt__card-avatar { corner-shape: squircle; } }
.vt__card-id { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.vt__card-name { font-weight: 700; font-size: 1.05em; color: var(--text, #ededed); }
.vt__card-role { font-size: 0.85em; color: var(--text-muted, #8a8a8a); }
.vt__card-bio { margin: 0; font-size: 0.92em; line-height: 1.5; color: var(--text-secondary, #c4c4c4); }
.vt__card-stats { display: flex; gap: 18px; font-size: 0.88em; color: var(--text-muted, #8a8a8a); }
.vt__card-stats b { color: var(--text, #ededed); font-weight: 700; }
.vt__card-actions { display: flex; gap: 8px; margin-top: 2px; }
.vt__card-btn {
  flex: 1;
  height: 38px;
  border: 0;
  border-radius: 11px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: filter 160ms ease, transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
@supports (corner-shape: squircle) { .vt__card-btn { corner-shape: squircle; } }
.vt__card-btn:active { transform: scale(0.96); }
.vt__card-btn--ghost { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.06)); color: var(--text-secondary, #c4c4c4); }
.vt__card-btn--primary { background: var(--accent); color: var(--ui-accent-fg, #0b0b0b); }
.vt__card-btn--primary:hover { filter: brightness(1.06); }

@media (prefers-reduced-motion: reduce) { .vt__card-btn { transition: none; } }
`,Z=X+V;let A;function J(a){if(A||=document.createElement("canvas").getContext("2d"),!A)return null;A.fillStyle="#000",A.fillStyle=a;const t=A.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const Q=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function G(a,t){const e=t?J(String(t).trim()):null;if(!e){for(const n of Q)a.style.removeProperty(n);return}const o=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),r=.2126*o(e[0])+.7152*o(e[1])+.0722*o(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,s=e.map(n=>Math.round(r?n*.92:n+(255-n)*.16)),p=(n,l)=>a.style.setProperty(n,l);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])p(n,h);p("--btn-primary-bg-hover",`rgb(${s[0]} ${s[1]} ${s[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])p(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])p(n,r?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])p(n,r?"0 0 0":"255 255 255");p("--vs-color",h),p("--vs-color-rgb",e.join(" ")),p("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class tt extends HTMLElement{static observedAttributes=["size","radius","tone","placement","side","align","backdrop","flow","test","speed","manual","dismissable","disabled","glow","open","label","demo","color"];#n;#l;#r;#t=null;#f=null;#u=null;#c=null;#m=null;#v=null;#M=null;#o=null;#e=null;#z=!1;#h=!1;#i=!1;#w=!1;#g=null;#S=null;#P="transparent";#k=null;#$=new DOMRect(0,0,40,40);#L=12;#b="round";#y=null;#s=0;#E=0;#C=0;#x=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=Z,this.#n=document.createElement("div"),this.#n.className="vt",this.#l=document.createElement("div"),this.#l.className="vt__source",this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="vt__demo-btn",this.#r.setAttribute("aria-haspopup","dialog"),this.#r.addEventListener("click",()=>this.#T()),this.#l.appendChild(this.#r),this.#n.appendChild(this.#l),t.append(e,this.#n)}connectedCallback(){G(this,this.getAttribute("color")),this.#W(),this.#_()}disconnectedCallback(){this.#ht()}attributeChangedCallback(){G(this,this.getAttribute("color")),!(!this.#n||!this.isConnected)&&(this.#_(),this.#W())}get open(){return this.#a()}set open(t){this.setAttribute("open",t?"":"false")}get externalSource(){return this.#g}set externalSource(t){this.#g=t instanceof HTMLElement?t:null}toggle(){this.#T()}#a(){return this.hasAttribute("open")?b(this,"open",!1):this.#z}#O(){return this.hasAttribute("dismissable")?b(this,"dismissable",!0):!this.hasAttribute("open")}#T(){b(this,"disabled",!1)||this.#i||b(this,"manual",!1)||(this.#a()?this.#d():this.#U())}#U(){b(this,"disabled",!1)||this.#i||this.#a()||this.#q(!0)}#d(){!this.#a()||this.#i||this.#q(!1)}#q(t){const e=this.hasAttribute("open");e||(this.#z=t),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:t}})),e||this.#_()}#_(){if(this.#i)return;const t=this.#a();t!==this.#h&&(this.#h=t,t?this.#it():this.#rt())}#K(){return this.#g&&this.#g.isConnected?this.#g:this.#r}#X(t,e){const o=getComputedStyle(t);for(const i of U)e.style.setProperty(i,o.getPropertyValue(i))}#Z(){const t=this.#K();if(!t)return!1;this.#i=!0,this.#S=t,this.#$=t.getBoundingClientRect();const e=getComputedStyle(t),o=t.offsetHeight||40,i=parseFloat(e.borderTopLeftRadius);this.#L=isFinite(i)?i>o?o/2:i:o/2,this.#b=(e.getPropertyValue("corner-shape")||"round").trim()||"round",this.#P=e.backgroundColor;const r=t.cloneNode(!0);return this.#X(t,r),r.style.transition="none",r.style.transform="none",r.style.opacity="1",r.style.margin="0",r.style.width=`${t.offsetWidth}px`,r.style.height=`${t.offsetHeight}px`,r.style.boxSizing="border-box",r.style.whiteSpace="nowrap",r.style.overflow="hidden",r.style.background="transparent",r.style.boxShadow="none",this.#k=r,t.style.transition="none",t.style.opacity="0",b(this,"flow",!0)&&(this.#l.style.display="none"),this.#O()&&this.#ct(),!0}#J(){this.#i=!0,this.#j()}#A(){b(this,"flow",!0)&&(this.#l.style.display="");const t=this.#S;t&&(t.style.transition="",t.style.filter="",t.style.opacity="")}#H(t,e,o,i){const r=window.innerWidth,h=window.innerHeight,s=8;if(_(this,"placement","anchor")==="center")return{top:Math.round(Math.max(s,(h-o)/2)),left:Math.round(Math.max(s,(r-e)/2)),w:e,h:o,r:i};const n=_(this,"align","start"),l=_(this,"side","over");let f=n==="center"?t.left+(t.width-e)/2:t.left;const d=10;let y=l==="up"?t.top-o-d:l==="down"?t.bottom+d:t.top;return f+e+s>r&&(f=Math.max(s,t.right-e)),f=Math.max(s,Math.min(f,r-e-s)),y=Math.max(s,Math.min(y,h-o-s)),{top:y,left:f,w:e,h:o,r:i}}#p(t,e){b(this,"flow",!0)||(t.style.top=`${e.top}px`,t.style.left=`${e.left}px`),t.style.width=`${e.w}px`,t.style.height=`${e.h}px`,t.style.borderRadius=`${e.r}px`}#Q(t){const e=this.#v,o=e?.offsetWidth||t.offsetWidth,i=e?.offsetHeight||t.offsetHeight,r=parseFloat(getComputedStyle(t).borderTopLeftRadius)||18;return{w:o,h:i,r}}#I(t,e){t.style.setProperty("corner-shape",e),t.querySelectorAll(B).forEach(o=>o.style.setProperty("corner-shape",e))}#N(t){t.style.removeProperty("corner-shape"),t.querySelectorAll(B).forEach(e=>e.style.removeProperty("corner-shape"))}#F(){this.#y&&(this.#y.disconnect(),this.#y=null)}#tt(t){if(typeof ResizeObserver>"u")return;const e=this.#v;if(!e)return;let o=t.offsetWidth,i=t.offsetHeight;const r=h=>{if(!this.#h||this.#i)return;const s=e.offsetWidth,p=e.offsetHeight;if(Math.abs(s-o)<2&&Math.abs(p-i)<2)return;o=s,i=p;const n=parseFloat(getComputedStyle(t).borderTopLeftRadius)||18;t.style.transition=h?`top 360ms ${S}, left 360ms ${S}, width 360ms ${S}, height 360ms ${S}`:"none",this.#p(t,this.#H(this.#$,s,p,n))};r(!1),this.#y=new ResizeObserver(()=>r(!0)),this.#y.observe(e)}#et(){const t=document.createElement("div");t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),this.#t=t;const e=document.createElement("span");e.className="vt__surface",e.setAttribute("aria-hidden","true");const o=document.createElement("span");o.className="fx-glow vt__panel-glow",e.appendChild(o),this.#f=e,this.#M=o;const i=document.createElement("span");i.className="vt__ghost",i.setAttribute("aria-hidden","true"),i.style.background=this.#P;const r=document.createElement("span");r.className="vt__ghost-clone",i.appendChild(r),this.#u=i,this.#c=r;const h=document.createElement("div");h.className="vt__inner";const s=document.createElement("div");s.className="vt__content",s.appendChild(this.#st()),h.appendChild(s),this.#m=h,this.#v=s,t.append(e,i,h),this.#D()}#st(){const t=document.createElement("div");t.className="vt__card";const e=document.createElement("div");e.className="vt__card-head";const o=document.createElement("span");o.className="vt__card-avatar",o.textContent="AL";const i=document.createElement("div");i.className="vt__card-id";const r=document.createElement("span");r.className="vt__card-name",r.textContent="Ada Lovelace";const h=document.createElement("span");h.className="vt__card-role",h.textContent="Lead Engineer",i.append(r,h),e.append(o,i);const s=document.createElement("p");s.className="vt__card-bio",s.textContent="Morphing surfaces, one spring at a time. This whole card grew out of that little button.";const p=document.createElement("div");p.className="vt__card-stats";const n=document.createElement("span");n.innerHTML="<b>128</b> projects";const l=document.createElement("span");l.innerHTML="<b>4.9k</b> stars",p.append(n,l);const f=document.createElement("div");f.className="vt__card-actions";const d=document.createElement("button");d.type="button",d.className="vt__card-btn vt__card-btn--ghost",d.textContent="Close";const y=document.createElement("button");return y.type="button",y.className="vt__card-btn vt__card-btn--primary",y.textContent="Follow",d.addEventListener("click",()=>this.#d()),y.addEventListener("click",()=>this.#d()),f.append(d,y),t.append(e,s,p,f),t}#D(){const t=_(this,"size","md"),e=_(this,"radius","squircle"),o=_(this,"tone","default"),i=_(this,"placement","anchor"),r=b(this,"test",!1);this.#t.className=`vt__panel vt--${t} vt--r-${e} vt--t-${o} vt--p-${i}${r?" vt--test":""}`}#B(){const t=document.createElement("div");return t.className="vt__backdrop",t.style.opacity="0",t.addEventListener("click",()=>{this.#O()&&this.#d()}),t}#it(){if(!this.#Z()){this.#h=!1;return}this.#et(),this.#nt(),this.#e&&(this.#e.offsetWidth,this.#e.style.transition="opacity 320ms ease",this.#e.style.opacity="1"),this.#at()}#rt(){if(!this.#t){this.#i=!1;return}if(this.#J(),this.#e){const t=this.#e;t.style.transition="opacity 360ms ease 220ms",t.style.opacity="0";const e=()=>{t.remove(),this.#e===t&&(this.#e=null)};t.addEventListener("transitionend",e,{once:!0}),setTimeout(e,620)}this.#lt()}#nt(){const t=b(this,"flow",!0),o=_(this,"placement","anchor")==="center"&&b(this,"backdrop",!0);if(t)o&&(this.#e=this.#B(),this.#n.appendChild(this.#e)),this.#n.appendChild(this.#t);else{const i=document.createElement("div"),r=i.attachShadow({mode:"open"}),h=document.createElement("style");h.textContent=V,r.appendChild(h),o&&(this.#e=this.#B(),r.appendChild(this.#e)),r.appendChild(this.#t),document.body.appendChild(i),this.#o=i}b(this,"glow",!0)&&!b(this,"disabled",!1)&&(this.#x=W(this.#t,320,()=>b(this,"disabled",!1)||!b(this,"glow",!0)))}#ot(){this.#F(),clearTimeout(this.#s),this.#s=0,this.#x?.(),this.#x=null,this.#o?(this.#o.remove(),this.#o=null):this.#t&&this.#t.parentNode&&this.#t.parentNode.removeChild(this.#t),this.#e&&this.#e.parentNode&&this.#e.parentNode.removeChild(this.#e),this.#t=this.#f=this.#u=this.#c=null,this.#m=this.#v=this.#M=this.#e=null}#at(){const t=parseFloat(_(this,"speed","1")),e=Math.max(.1,isFinite(t)?t:1),i=b(this,"test",!1)?1e4:Math.round(720/e),r=b(this,"flow",!0),h=_(this,"placement","anchor"),s=this.#t,p=this.#f,n=this.#u,l=this.#m;if(this.#k){const g=this.#c;g.innerHTML="",g.appendChild(this.#k)}const f=this.#c,d=this.#$;s.style.position=r?"relative":"fixed";const y=this.#Q(s),C={top:d.top,left:d.left,w:d.width,h:d.height,r:this.#L},m=this.#H(d,y.w,y.h,y.r),c=m.w/C.w,v=h==="center"?1:c;if(O()){this.#p(s,m),s.style.overflow="visible",n&&(n.style.opacity="0"),this.#G();return}this.#p(s,C),this.#N(s);const $=(getComputedStyle(s).getPropertyValue("corner-shape")||"round").trim()||"round";this.#b!==$&&(this.#I(s,this.#b),clearTimeout(this.#s),this.#s=setTimeout(()=>{this.#s=0,this.#N(s)},Math.round(i*.28)));const M=h==="center"?"center center":r?`${(d.width/2).toFixed(1)}px ${(d.height/2).toFixed(1)}px`:`${(d.left+d.width/2-m.left).toFixed(1)}px ${(d.top+d.height/2-m.top).toFixed(1)}px`;if(p&&(p.style.opacity="0"),n&&(n.style.opacity="1",n.style.filter="blur(0px)"),f&&(f.style.transformOrigin=M,f.style.transform="scale(1)"),l&&(l.style.transformOrigin=M,l.style.transform=`scale(${(1/v).toFixed(4)})`,l.style.opacity="0",l.style.filter="blur(10px)"),s.offsetHeight,s.style.transition=`top ${i}ms ${R}, left ${i}ms ${R}, width ${i}ms ${S}, height ${i}ms ${S}, border-radius ${i}ms ${S}`,this.#p(s,m),p&&(p.style.transition=`opacity ${i}ms ${R}`,p.style.opacity="1"),n){const g=Math.round(i*.35),x=Math.round(i*.05);n.style.transition=`opacity ${g}ms ease ${x}ms, filter ${g}ms ease ${x}ms`,n.style.opacity="0",n.style.filter="blur(12px)"}if(f&&(f.style.transition=`transform ${i}ms ${R}`,f.style.transform=`scale(${v.toFixed(4)})`),l){const g=Math.round(i*.7),x=Math.round(i*.1);l.style.transition=`transform ${i}ms ${S}, opacity ${g}ms ease ${x}ms, filter ${g}ms ease ${x}ms`,l.style.transform="scale(1)",l.style.opacity="1",l.style.filter="blur(0px)"}let E=!1;const u=g=>{this.#t===s&&(g&&(g.target!==s||g.propertyName!=="width")||E||(E=!0,clearTimeout(this.#E),this.#s&&(clearTimeout(this.#s),this.#s=0),s.removeEventListener("transitionend",u),s.style.transition=s.style.borderRadius="",this.#N(s),r||(s.style.top=`${m.top}px`,s.style.left=`${m.left}px`),s.style.width=`${m.w}px`,s.style.height=`${m.h}px`,s.style.overflow="visible",l&&(l.style.transition=l.style.transform=l.style.opacity=l.style.filter="",l.style.overflow="visible"),p&&(p.style.transition="",p.style.opacity=""),n&&(n.style.transition=n.style.filter="",n.style.opacity="0"),f&&(f.style.transition=f.style.transform=""),this.#G()))};this.#E=setTimeout(()=>u(),i+150),s.addEventListener("transitionend",u)}#G(){this.#i=!1,this.#t&&this.#tt(this.#t),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})),this.#_()}#lt(){const t=parseFloat(_(this,"speed","1")),e=Math.max(.1,isFinite(t)?t:1),i=b(this,"test",!1)?1e4:Math.round(620/e),r=b(this,"flow",!0),h=_(this,"placement","anchor"),s=this.#t,p=this.#f,n=this.#u,l=this.#m;if(O()){this.#A(),this.#R();return}const f=this.#c,d=this.#$,y=getComputedStyle(s),C={top:parseFloat(y.top)||0,left:parseFloat(y.left)||0,w:s.offsetWidth,h:s.offsetHeight,r:parseFloat(y.borderTopLeftRadius)||18},m={top:d.top,left:d.left,w:d.width,h:d.height,r:this.#L},c=C.w/m.w,v=h==="center"?1:c,$=h==="center"?"center center":r?`${(d.width/2).toFixed(1)}px ${(d.height/2).toFixed(1)}px`:`${(d.left+d.width/2-C.left).toFixed(1)}px ${(d.top+d.height/2-C.top).toFixed(1)}px`;this.#F(),s.style.position=r?"relative":"fixed",s.style.overflow="hidden",l&&(l.style.overflow="hidden"),this.#p(s,C),s.offsetHeight,s.style.transition=`top ${i}ms ${k}, left ${i}ms ${k}, width ${i}ms ${k}, height ${i}ms ${k}, border-radius ${i}ms ${k}`,this.#p(s,m);const M=(getComputedStyle(s).getPropertyValue("corner-shape")||"round").trim()||"round";this.#b!==M&&(clearTimeout(this.#s),this.#s=setTimeout(()=>{this.#s=0,this.#I(s,this.#b)},Math.round(i*.72)));const E=14;if(l){const x=Math.round(i*.7),w=Math.round(i*.1);l.style.transformOrigin=$,l.style.transition=`transform ${i}ms ${k}, opacity ${x}ms ease ${w}ms, filter ${x}ms ease ${w}ms`,l.style.transform=`scale(${(1/v).toFixed(4)})`,l.style.opacity="0",l.style.filter=`blur(${E}px)`}if(p&&(p.style.transition=`opacity ${i}ms ${k}`,p.style.opacity="0"),n){const x=Math.round(i*.3),w=Math.round(i*.45);n.style.transition="none",n.style.opacity="0",n.style.filter=`blur(${E}px)`,n.offsetHeight,n.style.transition=`opacity ${x}ms ease ${w}ms, filter ${x}ms ease ${w}ms`,n.style.opacity="1",n.style.filter="blur(0px)"}f&&(f.style.transformOrigin=$,f.style.transition="none",f.style.transform=`scale(${v.toFixed(4)})`,f.offsetHeight,f.style.transition=`transform ${i}ms ${k}`,f.style.transform="scale(1)");let u=!1;const g=x=>{if(this.#t!==s||x&&(x.target!==s||x.propertyName!=="width")||u)return;u=!0,clearTimeout(this.#C),this.#s&&(clearTimeout(this.#s),this.#s=0),s.removeEventListener("transitionend",g);const w=this.#S,L=200;w&&!O()&&!r?(w.style.transition="none",w.style.opacity="0",w.style.filter="blur(2px)",w.style.transform="",w.offsetHeight,w.style.transition=`opacity ${L}ms ease, filter ${L}ms ease`,w.style.opacity="1",w.style.filter="blur(0px)",s.style.transition=`opacity ${L}ms ease, filter ${L}ms ease`,s.style.opacity="0",s.style.filter="blur(2px)",setTimeout(()=>{this.#A(),this.#R()},L+20)):(s.style.display=r?"none":"",s.style.opacity="0",this.#A(),this.#R())};this.#C=setTimeout(()=>g(),i+200),s.addEventListener("transitionend",g)}#R(){this.#i=!1,this.#ot(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0})),this.#_()}#ct(){this.#w||(this.#w=!0,document.addEventListener("pointerdown",this.#V,!0),document.addEventListener("keydown",this.#Y,!0))}#j(){this.#w&&(this.#w=!1,document.removeEventListener("pointerdown",this.#V,!0),document.removeEventListener("keydown",this.#Y,!0))}#V=t=>{if(this.#i)return;const e=t.composedPath();e.includes(this)||this.#t&&e.includes(this.#t)||this.#d()};#Y=t=>{t.key==="Escape"&&this.#a()&&!this.#i&&(t.preventDefault(),this.#d())};#W(){const t=this.#h,e=b(this,"disabled",!1),o=_(this,"size","md"),i=_(this,"radius","squircle"),r=_(this,"tone","default"),h=_(this,"placement","anchor"),s=_(this,"demo","card");this.#n.className=`vt vt--${o} vt--r-${i} vt--t-${r} vt--p-${h} vt--demo-${s}${t?" is-open":""}${e?" is-disabled":""}`,this.#r.disabled=e,this.#r.setAttribute("aria-expanded",String(this.#a())),this.#r.textContent=_(this,"label","Open card"),this.#t&&this.#D()}#ht(){clearTimeout(this.#E),this.#E=0,clearTimeout(this.#C),this.#C=0,clearTimeout(this.#s),this.#s=0,this.#j(),this.#F(),this.#x?.(),this.#x=null,this.#o?(this.#o.remove(),this.#o=null):this.#t&&this.#t.parentNode&&this.#t.parentNode.removeChild(this.#t),this.#e&&this.#e.parentNode&&this.#e.parentNode.removeChild(this.#e),this.#t=this.#f=this.#u=this.#c=null,this.#m=this.#v=this.#M=this.#e=null,this.#i=!1,this.#h=!1}}customElements.define("vs-transform",tt);
