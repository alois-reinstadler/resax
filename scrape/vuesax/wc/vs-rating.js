const A=new Set;let N=0,F=0,k=!1,w=0,S=!1;function P(){if(w=0,!!k)for(const n of A){if(!n.active()){n.last!==0&&(n.el.style.setProperty("--p","0"),n.last=0);continue}n.rect||(n.rect=n.el.getBoundingClientRect());const t=n.rect,i=t.left+t.width/2,e=t.top+t.height/2,a=Math.max(0,1-Math.hypot(N-i,F-e)/n.radius);a===0&&n.last===0||(n.el.style.setProperty("--p",a.toFixed(3)),n.last=a)}}function j(n){N=n.clientX,F=n.clientY,k=!0,w||(w=requestAnimationFrame(P))}function C(){for(const n of A)n.rect=null;k&&!w&&(w=requestAnimationFrame(P))}function q(n,t,i){S||(S=!0,addEventListener("pointermove",j,{passive:!0}),addEventListener("scroll",C,{passive:!0,capture:!0}),addEventListener("resize",C,{passive:!0}));const e={el:n,radius:t,active:i,rect:null,last:0};A.add(e);const a=G.add(n);return()=>{A.delete(e),a()}}const z={star:"M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z",heart:"M16.44 3.09961C14.63 3.09961 13.01 3.97961 12 5.32961C10.99 3.97961 9.37 3.09961 7.56 3.09961C4.49 3.09961 2 5.59961 2 8.68961C2 9.87961 2.19 10.9796 2.52 11.9996C4.1 16.9996 8.97 19.9896 11.38 20.8096C11.72 20.9296 12.28 20.9296 12.62 20.8096C15.03 19.9896 19.9 16.9996 21.48 11.9996C21.81 10.9796 22 9.87961 22 8.68961C22 5.59961 19.51 3.09961 16.44 3.09961Z",circle:"M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z"},E="http://www.w3.org/2000/svg",G=globalThis[Symbol.for("vs-light")]||=(()=>{const n=new Set,t=110,i=1.6,e=1.7,a=34,l=72,u=[[.6,0],[.42,30],[.16,58],[0,82]],d=[[.6,0],[.27,42],[.08,66],[0,85]],h=[[.85,0],[.4,42],[.12,66],[0,84]];let s=0,m=null;const f=(p,r,c)=>{const g=r.w/2+p,v=r.h/2+p,b=r.h/2/v;return`radial-gradient(${g.toFixed(1)}px ${v.toFixed(1)}px at ${r.x.toFixed(1)}px ${r.y.toFixed(1)}px,`+c.map(([o,y])=>` rgb(${r.rgb} / ${(o*r.k).toFixed(3)}) ${((b+y/100*(1-b))*100).toFixed(1)}%`).join(",")+")"};function R(){const p=[];for(const r of document.querySelectorAll("[color],[data-lamp]")){const c=getComputedStyle(r),g=c.getPropertyValue("--vs-color-rgb").trim()||(r.hasAttribute("data-lamp")?(c.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");g&&p.push({el:r,rgb:g,rect:r.getBoundingClientRect()})}return p}function I(){if(s=0,!n.size)return;const p=R();for(const r of n){if(!r.visible)continue;if(!p.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}const c=r.el.getBoundingClientRect(),g=c.left+c.width/2,v=c.top+c.height/2,b=[];for(const o of p){if(o.el===r.el||o.el.contains(r.el)||r.el.contains(o.el))continue;const y=Math.max(o.rect.left,Math.min(g,o.rect.right)),L=Math.max(o.rect.top,Math.min(v,o.rect.bottom)),B=Math.max(c.left,Math.min(y,c.right)),O=Math.max(c.top,Math.min(L,c.bottom)),M=Math.max(0,1-Math.hypot(y-B,L-O)/t)**i*e;M&&b.push({rgb:o.rgb,k:Math.min(1,M),w:o.rect.width,h:o.rect.height,x:o.rect.left+o.rect.width/2-c.left,y:o.rect.top+o.rect.height/2-c.top})}if(!b.length){r.on&&(r.el.style.setProperty("--lit","0"),r.on=!1);continue}b.sort((o,y)=>o.k-y.k),r.el.style.setProperty("--lit-ring",b.flatMap(o=>[f(a,o,u),f(l,o,d)]).join(",")),r.el.style.setProperty("--lit-fill",b.map(o=>f(l,o,h)).join(",")),r.el.style.setProperty("--lit","1"),r.on=!0}}const x=()=>{s||(s=requestAnimationFrame(I))};return addEventListener("scroll",x,{passive:!0,capture:!0}),addEventListener("resize",x,{passive:!0}),globalThis.vsLight=x,{add(p){m||=new IntersectionObserver(c=>{for(const g of c)for(const v of n)v.el===g.target&&(v.visible=g.isIntersecting);x()});const r={el:p,visible:!0,on:!1};return n.add(r),m.observe(p),x(),()=>{n.delete(r),m.unobserve(p)}}}})(),H=`
  :host { display: inline-flex; }
  .rating {
    --sz: 24px;
    --gap: 4px;
    --fs: 13px;
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --track: var(--inp-track, 255 255 255);
    --star: var(--rating-fg, var(--accent));

    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 10px;
    font: inherit;
    user-select: none;
    outline: none;
  }

  .rating__icons {
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
  }

  /* sizes */
  .rating--sm { --sz: 18px; --gap: 3px; --fs: 12px; }
  .rating--lg { --sz: 30px; --gap: 6px; --fs: 15px; }

  .rating__item {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    width: var(--sz);
    height: var(--sz);
    padding: 0;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: transform 180ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }

  /* ripple layer (droplet of light) — blooms from the click, like VsButton */
  .rating__ripples {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }
  .rating__svg { position: relative; z-index: 1; }
  .rating__ripple {
    position: absolute;
    z-index: 0;
    pointer-events: none;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: radial-gradient(
      circle,
      rgb(var(--ring) / 0.42) 0%,
      rgb(var(--ring) / 0.22) 26%,
      rgb(var(--ring) / 0.08) 48%,
      transparent 70%
    );
    opacity: 0;
    will-change: transform, opacity;
    animation:
      rating-ripple-scale 640ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
      rating-ripple-fade 640ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  @keyframes rating-ripple-scale {
    from { transform: translate(-50%, -50%) scale(0); }
    to   { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes rating-ripple-fade {
    from { opacity: 0.8; }
    to   { opacity: 0; }
  }
  .rating__item:disabled { cursor: default; }
  .rating__item:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 5px;
  }

  .rating__svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .rating__bg {
    fill: transparent;
    stroke: rgb(var(--ring) / calc(0.28 + var(--p, 0) * 0.6));
    stroke-width: calc(0.8 + var(--p, 0) * 0.7);
    transition: fill 200ms ease, stroke 160ms ease, stroke-width 160ms ease;
  }

  /* partial fill: clip-path crops the icon at the --fill percentage */
  .rating__fg {
    fill: var(--star);
    clip-path: inset(0 calc((1 - var(--fill)) * 100%) 0 0);
    transition: clip-path 200ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
  }

  /* pop on select — sink + bounce: starts sunken, springs back w/ soft overshoot */
  .rating__item.is-pop { animation: rating-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes rating-pop {
    0% { transform: scale(0.82); }
    45% { transform: scale(1.22); }
    70% { transform: scale(0.94); }
    100% { transform: scale(1); }
  }

  .rating__value {
    font-size: var(--fs);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--text-secondary, #a1a1a1);
    min-width: 1.6em;
  }

  /* ── tones ── */
  .rating--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; --star: #ff6369; }
  .rating--t-warn { --accent: var(--ui-accent, #ededed); --ring: 255 178 36; --fx-tint: 255 178 36; --star: var(--ui-accent, #ededed); }
  .rating--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; --star: #4cc38a; }

  /* default: warm amber star when no token is set */
  .rating--t-default { --star: var(--rating-fg, var(--ui-accent, #ededed)); }

  /* readonly / disabled */
  .rating.is-readonly .rating__item { cursor: default; }
  .rating.is-disabled { opacity: 0.5; }

  @media (prefers-reduced-motion: reduce) {
    .rating__item,
    .rating__fg { transition: none; }
    .rating__item.is-pop { animation: none; }
    .rating__ripple { display: none; }
  }
`;let _;function T(n){if(_||=document.createElement("canvas").getContext("2d"),!_)return null;_.fillStyle="#000",_.fillStyle=n;const t=_.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const i=t.match(/[\d.]+/g);return i&&i.length>=3?[+i[0],+i[1],+i[2]]:null}const V=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function $(n,t){const i=t?T(String(t).trim()):null;if(!i){for(const s of V)n.style.removeProperty(s);return}const e=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),l=.2126*e(i[0])+.7152*e(i[1])+.0722*e(i[2])>.45,u=`rgb(${i[0]} ${i[1]} ${i[2]})`,d=i.map(s=>Math.round(l?s*.92:s+(255-s)*.16)),h=(s,m)=>n.style.setProperty(s,m);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])h(s,u);h("--btn-primary-bg-hover",`rgb(${d[0]} ${d[1]} ${d[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])h(s,i.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])h(s,l?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])h(s,l?"0 0 0":"255 255 255");h("--vs-color",u),h("--vs-color-rgb",i.join(" ")),h("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class D extends HTMLElement{static observedAttributes=["value","max","count","readonly","disabled","size","allow-half","tone","icon","show-value","color"];#t;#l;#e=null;#s=[];#u=[];#n=5;#i=0;#o=null;#d=!1;#F=0;constructor(){super();const t=this.attachShadow({mode:"open"}),i=document.createElement("style");i.textContent=H,this.#t=document.createElement("span"),this.#t.className="rating",this.#t.setAttribute("role","slider"),this.#l=document.createElement("span"),this.#l.className="rating__icons",this.#t.appendChild(this.#l),t.append(i,this.#t),this.#t.addEventListener("keydown",e=>this.#N(e)),this.#t.addEventListener("pointerleave",()=>this.#S()),this.#t.addEventListener("pointerenter",()=>C())}connectedCallback(){$(this,this.getAttribute("color")),this.#i=this.#v(),this.#_(),this.#A()}disconnectedCallback(){this.#w()}attributeChangedCallback(t){if($(this,this.getAttribute("color")),!(!this.#t||this.#d)){if(t==="value"){this.#i=this.#v(),this.#a(),this.#h();return}(t==="max"||t==="count"||t==="icon")&&(this.#f()!==this.#n||t==="icon")&&this.#_(),this.#A()}}get value(){return this.#i}set value(t){const i=this.#c(Number(t)||0);this.#i=i,this.#p(i),this.#a(),this.#h()}#p(t){this.#d=!0,this.setAttribute("value",String(t)),this.#d=!1}#v(){return this.#c(Number(this.getAttribute("value"))||0)}#f(){const t=Number(this.getAttribute("count")??this.getAttribute("max"));return Number.isFinite(t)&&t>0?Math.floor(t):5}#y(){return this.hasAttribute("allow-half")}#g(){return this.hasAttribute("readonly")}#m(){return this.hasAttribute("disabled")}#r(){return!this.#m()&&!this.#g()}#x(){return typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches}#c(t){return Math.max(0,Math.min(this.#n||this.#f(),t))}#k(){return z[this.getAttribute("icon")]??z.star}#_(){this.#w(),this.#l.textContent="",this.#s=[],this.#n=this.#f(),this.#i=this.#c(this.#i);const t=this.#k();for(let i=0;i<this.#n;i++){const e=document.createElement("button");e.type="button",e.className="rating__item",e.setAttribute("aria-label",`${i+1} of ${this.#n}`);const a=document.createElement("span");a.className="rating__ripples",a.setAttribute("aria-hidden","true");const l=document.createElementNS(E,"svg");l.setAttribute("viewBox","0 0 24 24"),l.setAttribute("class","rating__svg"),l.setAttribute("aria-hidden","true");const u=document.createElementNS(E,"path");u.setAttribute("class","rating__bg"),u.setAttribute("d",t);const d=document.createElementNS(E,"path");d.setAttribute("class","rating__fg"),d.setAttribute("d",t),l.append(u,d),e.append(a,l),this.#l.appendChild(e);const h={btn:e,ripples:a,bgPath:u,fgPath:d};this.#s.push(h);const s=i;e.addEventListener("pointermove",f=>this.#M(s,f)),e.addEventListener("pointerdown",f=>this.#$(s,f));const m=()=>{e.style.transform=""};e.addEventListener("pointerup",m),e.addEventListener("pointercancel",m),e.addEventListener("click",f=>this.#z(s,f)),e.addEventListener("animationend",()=>e.classList.remove("is-pop")),this.#u.push(q(e,90,()=>this.#r()))}this.#a()}#w(){for(const t of this.#u)t();this.#u=[]}#A(){const t=this.getAttribute("size")||"md",i=this.getAttribute("tone")||"default";this.#t.className=`rating rating--${t} rating--t-${i}`+(this.#g()?" is-readonly":"")+(this.#m()?" is-disabled":"");const e=!this.#r();for(const a of this.#s)a.btn.disabled=e;this.hasAttribute("show-value")?(this.#e||(this.#e=document.createElement("span"),this.#e.className="rating__value",this.#e.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#e)),this.#e.textContent=this.#b()):this.#e&&(this.#e.remove(),this.#e=null),this.#h()}#h(){const t=this.#n;this.#t.tabIndex=this.#r()?0:-1,this.#t.setAttribute("aria-valuenow",String(this.#i)),this.#t.setAttribute("aria-valuemin","0"),this.#t.setAttribute("aria-valuemax",String(t)),this.#g()?this.#t.setAttribute("aria-readonly","true"):this.#t.removeAttribute("aria-readonly"),this.#m()?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#t.setAttribute("aria-label",`Rating: ${this.#i} of ${t}`),this.#e&&(this.#e.textContent=this.#b())}#E(){return this.#o!==null?this.#o:this.#i}#b(){const t=this.#E();return Number.isInteger(t)?String(t):t.toFixed(1)}#L(t){const i=this.#E()-t;return i>=1?1:i<=0?0:i}#a(){for(let t=0;t<this.#s.length;t++)this.#s[t].btn.style.setProperty("--fill",String(this.#L(t)));this.#e&&(this.#e.textContent=this.#b())}#C(t,i){if(!this.#y())return t+1;const e=i.currentTarget.getBoundingClientRect();return t+(i.clientX-e.left<e.width/2?.5:1)}#M(t,i){if(!this.#r())return;const e=this.#C(t,i);e!==this.#o&&(this.#o=e,this.#a(),this.dispatchEvent(new CustomEvent("hover",{bubbles:!0,composed:!0,detail:{value:e}})))}#S(){this.#o!==null&&(this.#o=null,this.#a(),this.dispatchEvent(new CustomEvent("hover",{bubbles:!0,composed:!0,detail:{value:null}})))}#z(t,i){if(!this.#r())return;const e=this.#C(t,i);if(this.#i=e,this.#p(e),this.#a(),this.#h(),!this.#x()){const a=this.#s[t].btn;a.classList.remove("is-pop"),requestAnimationFrame(()=>requestAnimationFrame(()=>a.classList.add("is-pop")))}this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e}}))}#$(t,i){if(!this.#r()||this.#x())return;const e=this.#s[t];e.btn.style.transform="scale(0.82)";const a=e.btn.getBoundingClientRect(),l=i.clientX-a.left,u=i.clientY-a.top,d=Math.max(l,a.width-l),h=Math.max(u,a.height-u),s=document.createElement("span");for(s.className="rating__ripple",s.style.cssText=`left:${l}px;top:${u}px;width:${Math.hypot(d,h)*2.4}px;height:${Math.hypot(d,h)*2.4}px`,s.addEventListener("animationend",()=>s.remove()),e.ripples.appendChild(s);e.ripples.childElementCount>3;)e.ripples.firstElementChild.remove()}#N(t){if(!this.#r())return;const i=this.#y()?.5:1;let e=this.#i;switch(t.key){case"ArrowRight":case"ArrowUp":e=this.#c(e+i);break;case"ArrowLeft":case"ArrowDown":e=this.#c(e-i);break;case"Home":e=0;break;case"End":e=this.#n;break;default:return}t.preventDefault(),this.#i=e,this.#p(e),this.#a(),this.#h(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:e}}))}}customElements.define("vs-rating",D);
