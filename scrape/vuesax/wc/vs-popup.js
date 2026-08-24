const P=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,w=(o,t,e)=>{if(!o.hasAttribute(t))return e;const i=o.getAttribute(t);return!(i==="false"||i==="0")},b=(o,t,e)=>o.getAttribute(t)??e,K='a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',z="http://www.w3.org/2000/svg";function U(){const o=document.createElementNS(z,"svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("fill","none"),o.setAttribute("aria-hidden","true");for(const t of["M6 6L18 18","M18 6L6 18"]){const e=document.createElementNS(z,"path");e.setAttribute("d",t),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","1.5"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),o.appendChild(e)}return o}const M="cubic-bezier(0.34, 1.46, 0.44, 1)",L="cubic-bezier(0.22, 1, 0.36, 1)",_="cubic-bezier(0.65, 0, 0.35, 1)",X=["padding-top","padding-right","padding-bottom","padding-left","border-top-width","border-right-width","border-bottom-width","border-left-width","border-style","border-color","border-radius","corner-shape","font-family","font-size","font-weight","font-style","line-height","letter-spacing","color","text-transform","white-space","display","align-items","justify-content","gap","flex-direction"],I=".vsp__surface, .vsp__ghost, .vsp__panel-glow";function B(){return Number(document.body.dataset.vspLocks||0)}function D(o){o>0?document.body.dataset.vspLocks=String(o):delete document.body.dataset.vspLocks}const A=new Set;let N=0,F=0,O=!1,S=0,H=!1,T=null;function G(){if(S=0,!!O)for(const o of A){if(!o.visible)continue;if(o.disabled()){o.lastI!==0&&(o.el.style.setProperty("--glow","0"),o.lastI=0);continue}o.rect||(o.rect=o.el.getBoundingClientRect());const t=o.rect,e=Math.max(t.left,Math.min(N,t.right)),i=Math.max(t.top,Math.min(F,t.bottom)),s=Math.max(0,1-Math.hypot(N-e,F-i)/o.radius);s===0&&o.lastI===0||(o.el.style.setProperty("--gx",`${N-t.left}px`),o.el.style.setProperty("--gy",`${F-t.top}px`),o.el.style.setProperty("--glow",s.toFixed(3)),o.lastI=s)}}function Z(o){N=o.clientX,F=o.clientY,O=!0,S||(S=requestAnimationFrame(G))}function j(){for(const o of A)o.rect=null;O&&!S&&(S=requestAnimationFrame(G))}function J(o,t,e){H||(H=!0,addEventListener("pointermove",Z,{passive:!0}),addEventListener("scroll",j,{passive:!0,capture:!0}),addEventListener("resize",j,{passive:!0}),T=new IntersectionObserver(r=>{for(const a of r)for(const l of A)l.el===a.target&&(l.visible=a.isIntersecting,a.isIntersecting&&(l.rect=null))}));const i={el:o,radius:t,disabled:e,rect:null,visible:!0,lastI:0};A.add(i),T.observe(o);const s=Q.add(o);return()=>{A.delete(i),T.unobserve(o),s()}}const Q=globalThis[Symbol.for("vs-light")]||=(()=>{const o=new Set,t=110,e=1.6,i=1.7,s=34,r=72,a=[[.6,0],[.42,30],[.16,58],[0,82]],l=[[.6,0],[.27,42],[.08,66],[0,85]],u=[[.85,0],[.4,42],[.12,66],[0,84]];let h=0,g=null;const v=(f,n,c)=>{const p=n.w/2+f,m=n.h/2+f,x=n.h/2/m;return`radial-gradient(${p.toFixed(1)}px ${m.toFixed(1)}px at ${n.x.toFixed(1)}px ${n.y.toFixed(1)}px,`+c.map(([d,E])=>` rgb(${n.rgb} / ${(d*n.k).toFixed(3)}) ${((x+E/100*(1-x))*100).toFixed(1)}%`).join(",")+")"};function $(){const f=[];for(const n of document.querySelectorAll("[color],[data-lamp]")){const c=getComputedStyle(n),p=c.getPropertyValue("--vs-color-rgb").trim()||(n.hasAttribute("data-lamp")?(c.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");p&&f.push({el:n,rgb:p,rect:n.getBoundingClientRect()})}return f}function C(){if(h=0,!o.size)return;const f=$();for(const n of o){if(!n.visible)continue;if(!f.length){n.on&&(n.el.style.setProperty("--lit","0"),n.on=!1);continue}const c=n.el.getBoundingClientRect(),p=c.left+c.width/2,m=c.top+c.height/2,x=[];for(const d of f){if(d.el===n.el||d.el.contains(n.el)||n.el.contains(d.el))continue;const E=Math.max(d.rect.left,Math.min(p,d.rect.right)),R=Math.max(d.rect.top,Math.min(m,d.rect.bottom)),Y=Math.max(c.left,Math.min(E,c.right)),W=Math.max(c.top,Math.min(R,c.bottom)),q=Math.max(0,1-Math.hypot(E-Y,R-W)/t)**e*i;q&&x.push({rgb:d.rgb,k:Math.min(1,q),w:d.rect.width,h:d.rect.height,x:d.rect.left+d.rect.width/2-c.left,y:d.rect.top+d.rect.height/2-c.top})}if(!x.length){n.on&&(n.el.style.setProperty("--lit","0"),n.on=!1);continue}x.sort((d,E)=>d.k-E.k),n.el.style.setProperty("--lit-ring",x.flatMap(d=>[v(s,d,a),v(r,d,l)]).join(",")),n.el.style.setProperty("--lit-fill",x.map(d=>v(r,d,u)).join(",")),n.el.style.setProperty("--lit","1"),n.on=!0}}const y=()=>{h||(h=requestAnimationFrame(C))};return addEventListener("scroll",y,{passive:!0,capture:!0}),addEventListener("resize",y,{passive:!0}),globalThis.vsLight=y,{add(f){g||=new IntersectionObserver(c=>{for(const p of c)for(const m of o)m.el===p.target&&(m.visible=p.isIntersecting);y()});const n={el:f,visible:!0,on:!1};return o.add(n),g.observe(f),y(),()=>{o.delete(n),g.unobserve(f)}}}})(),tt=`
  :host { display: inline-flex; }
  .vsp__trigger {
    height: var(--ctrl-h-md, 40px);
    padding: 0 16px;
    border-radius: 12px;
    border: 1px solid transparent;
    background: var(--btn-primary-bg, #ededed);
    color: var(--btn-primary-fg, #000);
    font: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 160ms ease, transform 120ms ease;
  }
  .vsp__trigger:hover { opacity: 0.9; }
  .vsp__trigger:active { transform: scale(0.97); }
  .vsp__trigger.vsp--t-danger { background: #e5484d; color: #fff; }
  .vsp__trigger.vsp--t-warn { background: #f5a623; color: #1a1206; }
  .vsp__trigger.vsp--t-success { background: #30a46c; color: #fff; }
  .vsp__trigger.vsp--r-none { border-radius: 0; }
  .vsp__trigger.vsp--r-subtle { border-radius: 8px; }
  .vsp__trigger.vsp--r-pill { border-radius: 999px; }
  .vsp__trigger.vsp--r-squircle { border-radius: 16px; }
  @supports (corner-shape: squircle) { .vsp__trigger.vsp--r-squircle { corner-shape: squircle; border-radius: 20px; } }
  @media (prefers-reduced-motion: reduce) { .vsp__trigger { transition: none; } .vsp__trigger:active { transform: none; } }
`,et=`
.vsp__backdrop {
  position: fixed;
  inset: 0;
  /* A modal sits above EVERY piece of page chrome. 1000 was under the kind of
     fixed decoration a real page keeps at the edges — a gradual-blur band along
     the bottom, a floating mobile nav — and those repainted over the dialog,
     blurring its footer and its primary button. */
  z-index: 2000;
  background: rgba(0, 0, 0, 0.55);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

.vsp__panel {
  --rr: 20px;
  --acc: var(--ui-accent, #ededed);
  --fx-tint: 255 255 255;
  position: fixed;
  z-index: 2001;
  border-radius: var(--rr);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  font-family: inherit;
  color: var(--text, #ededed);
  /* the box itself never hit-tests — mid-morph the trigger sits in dead space
     under the growing box; only .vsp__content (the dialog) opts back in. */
  pointer-events: none;
}
.vsp__panel.vsp--r-none { --rr: 8px; }
.vsp__panel.vsp--r-subtle { --rr: 10px; }
.vsp__panel.vsp--r-rounded { --rr: 20px; }
.vsp__panel.vsp--r-pill { --rr: 30px; }
.vsp__panel.vsp--r-squircle { --rr: 28px; }
@supports (corner-shape: squircle) { .vsp__panel.vsp--r-squircle { corner-shape: squircle; } }
.vsp__panel.vsp--t-danger { --acc: #ff6369; --fx-tint: 255 99 105; }
.vsp__panel.vsp--t-warn { --acc: #ffb224; --fx-tint: 255 178 36; }
.vsp__panel.vsp--t-success { --acc: #4cc38a; --fx-tint: 76 195 138; }

/* painting layer (border/bg/shadow) — kept separate so the box itself can morph */
.vsp__surface {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  border: 1px solid var(--border, #2a2a2a);
  background: var(--bg-card, #111);
  box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.6);
  pointer-events: none;
}
@supports (corner-shape: squircle) {
  .vsp__panel.vsp--r-squircle .vsp__panel-glow,
  .vsp__panel.vsp--r-squircle .vsp__surface,
  .vsp__panel.vsp--r-squircle .vsp__ghost { corner-shape: squircle; }
}

/* proximity border glow — shared engine, see attachGlow above */
.vsp__panel-glow {
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

/* ghost — the cloned trigger that expands trigger→dialog */
.vsp__ghost {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}
.vsp__ghost-clone { display: inline-flex; will-change: transform; }

/* content layer: absolutely centred in the box so the dialog fades/settles at
   the box centre while the box grows around it (center placement → no zoom). */
.vsp__inner {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  overflow: hidden;
  will-change: transform;
}
.vsp__content { width: max-content; pointer-events: auto; }

/* ── dialog chrome (transparent: surface paints bg/border/shadow/radius) ───── */
.vsp {
  --vsp-w: 460px;
  display: flex;
  flex-direction: column;
  width: min(var(--vsp-w, 460px), calc(100vw - 48px));
  max-height: calc(100vh - 48px);
  color: var(--text, #ededed);
  outline: none;
}
.vsp--sm { --vsp-w: 360px; }
.vsp--md { --vsp-w: 460px; }
.vsp--lg { --vsp-w: 640px; }
.vsp--fullscreen {
  width: calc(100vw - 16px);
  max-width: none;
  height: calc(100vh - 16px);
  max-height: none;
}

.vsp__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 20px; border-bottom: 1px solid var(--border, #2a2a2a); }
.vsp__title { margin: 0; font-size: 16px; font-weight: 600; color: var(--text, #ededed); }
.vsp__close { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; padding: 0; border: none; border-radius: 8px; background: transparent; color: var(--text-secondary, #a1a1a1); cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
.vsp__close:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--text, #ededed); }
.vsp__close:focus-visible { outline: 2px solid var(--acc, var(--ui-accent, #ededed)); outline-offset: 1px; }
.vsp__close svg { width: 18px; height: 18px; }

.vsp__body { padding: 20px; overflow-y: auto; font-size: 14px; line-height: 1.55; color: var(--text-secondary, #c4c4c4); }
/* body-scroll="false": the content brings its own scroller, so the body only
   clips. Flex column + min-height:0 so that scroller can claim the leftover
   height — this body has no definite height of its own to hand out. */
.vsp__body--clip { overflow: hidden; min-height: 0; display: flex; flex-direction: column; }
.vsp__body--clip > * { flex: 1; min-height: 0; }
.vsp__ph { margin: 0; }
.vsp__ph code { font-family: var(--font-mono, monospace); padding: 1px 6px; border-radius: 6px; background: var(--bg-input, rgba(255, 255, 255, 0.06)); color: var(--text, #ededed); }

.vsp__foot { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 20px; border-top: 1px solid var(--border, #2a2a2a); }
`;let k;function st(o){if(k||=document.createElement("canvas").getContext("2d"),!k)return null;k.fillStyle="#000",k.fillStyle=o;const t=k.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const it=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function V(o,t){const e=t?st(String(t).trim()):null;if(!e){for(const h of it)o.style.removeProperty(h);return}const i=h=>(h/=255,h<=.03928?h/12.92:((h+.055)/1.055)**2.4),r=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(h=>Math.round(r?h*.92:h+(255-h)*.16)),u=(h,g)=>o.style.setProperty(h,g);for(const h of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])u(h,a);u("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const h of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])u(h,e.join(" "));for(const h of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])u(h,r?"#0b0b0b":"#ffffff");for(const h of["--btn-primary-rip","--btn-primary-glow"])u(h,r?"0 0 0":"255 255 255");u("--vs-color",a),u("--vs-color-rgb",e.join(" ")),u("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class rt extends HTMLElement{static observedAttributes=["open","title","size","width","radius","tone","prevent-close","close-hidden","fullscreen","trigger-label","speed","body-scroll","color"];#e;#b;#I;#h=null;#n=null;#s=null;#x=null;#_=null;#p=null;#w=null;#L=null;#B=null;#i=null;#d=null;#o=null;#a=null;#u=null;#$=null;#C=null;#D=!1;#f=!1;#r=!1;#E=!1;#l=null;#k=!1;#N=null;#H="transparent";#A=null;#F=new DOMRect(0,0,40,40);#P=12;#g="round";#t=0;#S=0;#M=0;#T=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=tt,this.#e=document.createElement("button"),this.#e.type="button",this.#e.className="vsp__trigger",this.#e.setAttribute("part","trigger"),this.#e.setAttribute("aria-haspopup","dialog");const i=document.createElement("slot");i.name="trigger",this.#I=i,this.#b=document.createTextNode(""),i.appendChild(this.#b),this.#e.appendChild(i),this.#e.addEventListener("click",()=>this.#O()),t.append(e,this.#e)}connectedCallback(){V(this,this.getAttribute("color")),this.#Q(),this.#y()}disconnectedCallback(){this.#vt()}attributeChangedCallback(t){V(this,this.getAttribute("color")),this.#e&&(t==="trigger-label"&&(this.#b.textContent=b(this,"trigger-label","Open popup")),this.isConnected&&(this.#y(),this.#Q()))}get open(){return this.#c()}set open(t){this.setAttribute("open",t?"":"false")}show(){this.#O()}close(){this.#m()}toggle(){this.#c()?this.#m():this.#O()}#c(){return this.hasAttribute("open")?w(this,"open",!1):this.#D}#j(){return!w(this,"prevent-close",!1)}#O(){this.#r||this.#c()||this.#V(!0)}#m(){this.#j()&&(this.#r||!this.#c()||this.#V(!1))}#V(t){const e=this.hasAttribute("open");e||(this.#D=t),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{open:t}})),t||this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})),e||this.#y()}#y(){if(this.#r)return;const t=this.#c();t!==this.#f&&(this.#f=t,t?this.#ut():this.#ft())}#tt(){this.#k||(this.#k=!0,D(B()+1),document.body.style.overflow="hidden")}#G(){if(!this.#k)return;this.#k=!1;const t=Math.max(0,B()-1);D(t),t===0&&(document.body.style.overflow="")}#et(){return this.#e}#st(t,e){const i=getComputedStyle(t);for(const s of X)e.style.setProperty(s,i.getPropertyValue(s))}#it(t){const e=t.cloneNode(!0),i=this.#I?.assignedNodes?.({flatten:!0})||[];if(i.filter(r=>r.nodeType===1||r.nodeType===3&&r.textContent.trim()).length){const r=e.querySelector("slot");if(r){const a=document.createDocumentFragment();for(const l of i)a.appendChild(l.cloneNode(!0));r.replaceWith(a)}}return this.#st(t,e),e.style.transition="none",e.style.transform="none",e.style.opacity="1",e.style.margin="0",e.style.width=`${t.offsetWidth}px`,e.style.height=`${t.offsetHeight}px`,e.style.boxSizing="border-box",e.style.whiteSpace="nowrap",e.style.overflow="hidden",e.style.background="transparent",e.style.boxShadow="none",e}#rt(){const t=this.#et();if(!t)return!1;this.#r=!0,this.#l=document.activeElement,this.#N=t,this.#tt(),this.#F=t.getBoundingClientRect();const e=getComputedStyle(t),i=t.offsetHeight||40,s=parseFloat(e.borderTopLeftRadius);return this.#P=isFinite(s)?s>i?i/2:s:i/2,this.#g=(e.getPropertyValue("corner-shape")||"round").trim()||"round",this.#H=e.backgroundColor,this.#A=this.#it(t),t.style.transition="none",t.style.opacity="0",this.#yt(),!0}#ot(){this.#r=!0}#R(){const t=this.#N;t&&(t.style.transition="",t.style.filter="",t.style.opacity="")}#nt(t,e,i){const s=window.innerWidth,r=window.innerHeight,a=8;return{top:Math.round(Math.max(a,(r-e)/2)),left:Math.round(Math.max(a,(s-t)/2)),w:t,h:e,r:i}}#v(t,e){t.style.top=`${e.top}px`,t.style.left=`${e.left}px`,t.style.width=`${e.w}px`,t.style.height=`${e.h}px`,t.style.borderRadius=`${e.r}px`}#at(t){const e=this.#L,i=e?.offsetWidth||t.offsetWidth,s=e?.offsetHeight||t.offsetHeight,r=parseFloat(getComputedStyle(t).borderTopLeftRadius)||18;return{w:i,h:s,r}}#Y(t,e){t.style.setProperty("corner-shape",e),t.querySelectorAll(I).forEach(i=>i.style.setProperty("corner-shape",e))}#q(t){t.style.removeProperty("corner-shape"),t.querySelectorAll(I).forEach(e=>e.style.removeProperty("corner-shape"))}#W(){const t=parseFloat(b(this,"speed","1.25"));return Math.max(.1,isFinite(t)?t:1.25)}#lt(){const t=[],e=[];for(const s of Array.from(this.childNodes))if(!(s.nodeType===1&&s.getAttribute("slot")==="trigger")){if(s.nodeType===1&&s.getAttribute("slot")==="footer"){e.push(s);continue}t.push(s)}const i=t.some(s=>s.nodeType===1||s.nodeType===3&&s.textContent.trim());return{body:t,footer:e,hasBody:i,hasFooter:e.length>0}}#ct(){if(this.#$){for(const t of this.#$)this.appendChild(t);this.#$=null}if(this.#C){for(const t of this.#C)this.appendChild(t);this.#C=null}}#ht(){const t=document.createElement("div");t.className="vsp",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.tabIndex=-1,this.#i=t;const e=document.createElement("header");e.className="vsp__head",this.#d=document.createElement("h2"),this.#d.className="vsp__title",this.#o=document.createElement("button"),this.#o.type="button",this.#o.className="vsp__close",this.#o.setAttribute("aria-label","Close"),this.#o.appendChild(U()),this.#o.addEventListener("click",()=>this.#m()),e.append(this.#d,this.#o),this.#a=document.createElement("div"),this.#a.className="vsp__body",this.#u=document.createElement("footer"),this.#u.className="vsp__foot";const{body:i,footer:s,hasBody:r,hasFooter:a}=this.#lt();if(r){this.#$=i;for(const l of i)this.#a.appendChild(l)}else{const l=document.createElement("p");l.className="vsp__ph",l.append("Popup content. Pass your markup via ");const u=document.createElement("code");u.textContent="<slot>",l.append(u,"."),this.#a.appendChild(l)}if(t.append(e,this.#a),a){this.#C=s;for(const l of s)this.#u.appendChild(l);t.appendChild(this.#u)}return t}#pt(){const t=document.createElement("div");this.#s=t;const e=document.createElement("span");e.className="vsp__surface",e.setAttribute("aria-hidden","true");const i=document.createElement("span");i.className="vsp__panel-glow",e.appendChild(i),this.#x=e,this.#B=i;const s=document.createElement("span");s.className="vsp__ghost",s.setAttribute("aria-hidden","true"),s.style.background=this.#H;const r=document.createElement("span");r.className="vsp__ghost-clone",s.appendChild(r),this.#_=s,this.#p=r;const a=document.createElement("div");a.className="vsp__inner";const l=document.createElement("div");l.className="vsp__content",l.appendChild(this.#ht()),a.appendChild(l),this.#w=a,this.#L=l,t.append(e,s,a),this.#K()}#K(){if(!this.#s)return;const t=b(this,"size","md"),e=b(this,"radius","rounded"),i=b(this,"tone","default"),s=w(this,"fullscreen",!1),r=this.getAttribute("width");this.#s.className=`vsp__panel vsp--r-${e} vsp--t-${i}`,this.#i.className=`vsp vsp--${t}${s?" vsp--fullscreen":""}`,r?this.#i.style.setProperty("--vsp-w",r):this.#i.style.removeProperty("--vsp-w");const a=b(this,"title","Popup title");this.#d.textContent=a,this.#i.setAttribute("aria-label",a);const l=!w(this,"close-hidden",!1)&&!w(this,"prevent-close",!1);this.#o.style.display=l?"":"none",this.#a.className=`vsp__body${w(this,"body-scroll",!0)?"":" vsp__body--clip"}`}#dt(){const t=document.createElement("div");return t.className="vsp__backdrop",t.style.opacity="0",t.addEventListener("click",()=>this.#m()),t}#ut(){if(!this.#rt()){this.#f=!1,this.#r=!1;return}this.#pt();const t=document.createElement("div"),e=t.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=et,this.#n=this.#dt(),e.append(i,this.#n,this.#s),document.body.appendChild(t),this.#h=t,w(this,"glow",!0)&&(this.#T=J(this.#s,320,()=>!1)),this.#n.offsetWidth,this.#n.style.transition="opacity 320ms ease",this.#n.style.opacity="1",this.#gt()}#ft(){if(!this.#s){this.#r=!1;return}if(this.#ot(),this.#n){const t=this.#n;t.style.transition="opacity 360ms ease 180ms",t.style.opacity="0"}this.#mt()}#U(){clearTimeout(this.#t),this.#t=0,this.#T?.(),this.#T=null,this.#ct(),this.#h&&(this.#h.remove(),this.#h=null),this.#n=this.#s=this.#x=this.#_=this.#p=null,this.#w=this.#L=this.#B=null,this.#i=this.#d=this.#o=this.#a=this.#u=null}#gt(){const t=Math.round(720/this.#W()),e=this.#s,i=this.#x,s=this.#_,r=this.#w;if(this.#A){const n=this.#p;n.innerHTML="",n.appendChild(this.#A),this.#A=null}const a=this.#p,l=this.#F;e.style.position="fixed";const u=this.#at(e),h={top:l.top,left:l.left,w:l.width,h:l.height,r:this.#P},g=this.#nt(u.w,u.h,u.r),v=1;if(P()){this.#v(e,g),e.style.overflow="visible",s&&(s.style.opacity="0"),this.#X();return}this.#v(e,h),this.#q(e);const $=(getComputedStyle(e).getPropertyValue("corner-shape")||"round").trim()||"round";this.#g!==$&&(this.#Y(e,this.#g),clearTimeout(this.#t),this.#t=setTimeout(()=>{this.#t=0,this.#q(e)},Math.round(t*.28)));const C="center center";if(i&&(i.style.opacity="0"),s&&(s.style.opacity="1",s.style.filter="blur(0px)"),a&&(a.style.transformOrigin=C,a.style.transform="scale(1)"),r&&(r.style.transformOrigin=C,r.style.transform=`scale(${(1/v).toFixed(4)})`,r.style.opacity="0",r.style.filter="blur(10px)"),e.offsetHeight,e.style.transition=`top ${t}ms ${M}, left ${t}ms ${M}, width ${t}ms ${L}, height ${t}ms ${L}, border-radius ${t}ms ${L}`,this.#v(e,g),i&&(i.style.transition=`opacity ${t}ms ${M}`,i.style.opacity="1"),s){const n=Math.round(t*.35),c=Math.round(t*.05);s.style.transition=`opacity ${n}ms ease ${c}ms, filter ${n}ms ease ${c}ms`,s.style.opacity="0",s.style.filter="blur(12px)"}if(a&&(a.style.transition=`transform ${t}ms ${M}`,a.style.transform=`scale(${v.toFixed(4)})`),r){const n=Math.round(t*.7),c=Math.round(t*.1);r.style.transition=`transform ${t}ms ${L}, opacity ${n}ms ease ${c}ms, filter ${n}ms ease ${c}ms`,r.style.transform="scale(1)",r.style.opacity="1",r.style.filter="blur(0px)"}let y=!1;const f=n=>{this.#s===e&&(n&&(n.target!==e||n.propertyName!=="width")||y||(y=!0,clearTimeout(this.#S),this.#t&&(clearTimeout(this.#t),this.#t=0),e.removeEventListener("transitionend",f),e.style.transition=e.style.borderRadius="",this.#q(e),e.style.top=`${g.top}px`,e.style.left=`${g.left}px`,e.style.width=`${g.w}px`,e.style.height=`${g.h}px`,e.style.overflow="visible",r&&(r.style.transition=r.style.transform=r.style.opacity=r.style.filter="",r.style.overflow="visible"),i&&(i.style.transition="",i.style.opacity=""),s&&(s.style.transition=s.style.filter="",s.style.opacity="0"),a&&(a.style.transition=a.style.transform=""),this.#X()))};this.#S=setTimeout(()=>f(),t+150),e.addEventListener("transitionend",f)}#X(){this.#r=!1,this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})),requestAnimationFrame(()=>{this.#i&&this.#f&&this.#i.focus({preventScroll:!0})}),this.#y()}#mt(){const t=Math.round(620/this.#W()),e=this.#s,i=this.#x,s=this.#_,r=this.#w;if(P()){this.#R(),this.#z();return}const a=this.#p,l=this.#F,u=getComputedStyle(e),h={top:parseFloat(u.top)||0,left:parseFloat(u.left)||0,w:e.offsetWidth,h:e.offsetHeight,r:parseFloat(u.borderTopLeftRadius)||18},g={top:l.top,left:l.left,w:l.width,h:l.height,r:this.#P},v=1,$="center center";e.style.position="fixed",e.style.overflow="hidden",r&&(r.style.overflow="hidden"),this.#v(e,h),e.offsetHeight,e.style.transition=`top ${t}ms ${_}, left ${t}ms ${_}, width ${t}ms ${_}, height ${t}ms ${_}, border-radius ${t}ms ${_}`,this.#v(e,g);const C=(getComputedStyle(e).getPropertyValue("corner-shape")||"round").trim()||"round";this.#g!==C&&(clearTimeout(this.#t),this.#t=setTimeout(()=>{this.#t=0,this.#Y(e,this.#g)},Math.round(t*.72)));const y=14;if(r){const c=Math.round(t*.7),p=Math.round(t*.1);r.style.transformOrigin=$,r.style.transition=`transform ${t}ms ${_}, opacity ${c}ms ease ${p}ms, filter ${c}ms ease ${p}ms`,r.style.transform=`scale(${(1/v).toFixed(4)})`,r.style.opacity="0",r.style.filter=`blur(${y}px)`}if(i&&(i.style.transition=`opacity ${t}ms ${_}`,i.style.opacity="0"),s){const c=Math.round(t*.3),p=Math.round(t*.45);s.style.transition="none",s.style.opacity="0",s.style.filter=`blur(${y}px)`,s.offsetHeight,s.style.transition=`opacity ${c}ms ease ${p}ms, filter ${c}ms ease ${p}ms`,s.style.opacity="1",s.style.filter="blur(0px)"}a&&(a.style.transformOrigin=$,a.style.transition="none",a.style.transform=`scale(${v.toFixed(4)})`,a.offsetHeight,a.style.transition=`transform ${t}ms ${_}`,a.style.transform="scale(1)");let f=!1;const n=c=>{if(this.#s!==e||c&&(c.target!==e||c.propertyName!=="width")||f)return;f=!0,clearTimeout(this.#M),this.#t&&(clearTimeout(this.#t),this.#t=0),e.removeEventListener("transitionend",n);const p=this.#N,m=200;p&&!P()?(p.style.transition="none",p.style.opacity="0",p.style.filter="blur(2px)",p.style.transform="",p.offsetHeight,p.style.transition=`opacity ${m}ms ease, filter ${m}ms ease`,p.style.opacity="1",p.style.filter="blur(0px)",e.style.transition=`opacity ${m}ms ease, filter ${m}ms ease`,e.style.opacity="0",e.style.filter="blur(2px)",setTimeout(()=>{this.#R(),this.#z()},m+20)):(e.style.opacity="0",this.#R(),this.#z())};this.#M=setTimeout(()=>n(),t+200),e.addEventListener("transitionend",n)}#z(){this.#r=!1,this.#Z(),this.#G(),this.#U(),this.isConnected&&(this.#l&&this.#l.isConnected?this.#l:this.#e)?.focus?.({preventScroll:!0}),this.#l=null,this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0})),this.#y()}#yt(){this.#E||(this.#E=!0,document.addEventListener("keydown",this.#J,!0))}#Z(){this.#E&&(this.#E=!1,document.removeEventListener("keydown",this.#J,!0))}#J=t=>{if(t.key==="Escape"){if(!this.#j())return;t.preventDefault(),this.#m();return}if(t.key!=="Tab"||!this.#i)return;const e=this.#i.querySelectorAll(K);if(!e.length)return;const i=e[0],s=e[e.length-1],r=this.#h?.shadowRoot?.activeElement;t.shiftKey&&r===i?(t.preventDefault(),s.focus()):!t.shiftKey&&r===s&&(t.preventDefault(),i.focus())};#Q(){const t=b(this,"radius","rounded"),e=b(this,"tone","default");this.#e.className=`vsp__trigger vsp--r-${t} vsp--t-${e}`,this.#e.setAttribute("aria-expanded",String(this.#c())),this.#b.textContent=b(this,"trigger-label","Open popup"),this.#s&&this.#K()}#vt(){clearTimeout(this.#S),this.#S=0,clearTimeout(this.#M),this.#M=0,clearTimeout(this.#t),this.#t=0,this.#Z(),this.#G(),this.#U(),this.#r=!1,this.#f=!1,this.#l=null}}customElements.define("vs-popup",rt);
