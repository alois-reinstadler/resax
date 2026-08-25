const S="http://www.w3.org/2000/svg",q=globalThis[Symbol.for("vs-light")]||=(()=>{const r=new Set,t=110,e=1.6,s=1.7,n=34,c=72,h=[[.6,0],[.42,30],[.16,58],[0,82]],p=[[.6,0],[.27,42],[.08,66],[0,85]],u=[[.85,0],[.4,42],[.12,66],[0,84]];let o=0,v=null;const C=(d,i,l)=>{const f=i.w/2+d,g=i.h/2+d,b=i.h/2/g;return`radial-gradient(${f.toFixed(1)}px ${g.toFixed(1)}px at ${i.x.toFixed(1)}px ${i.y.toFixed(1)}px,`+l.map(([a,m])=>` rgb(${i.rgb} / ${(a*i.k).toFixed(3)}) ${((b+m/100*(1-b))*100).toFixed(1)}%`).join(",")+")"};function j(){const d=[];for(const i of document.querySelectorAll("[color],[data-lamp]")){const l=getComputedStyle(i),f=l.getPropertyValue("--vs-color-rgb").trim()||(i.hasAttribute("data-lamp")?(l.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");f&&d.push({el:i,rgb:f,rect:i.getBoundingClientRect()})}return d}function R(){if(o=0,!r.size)return;const d=j();for(const i of r){if(!i.visible)continue;if(!d.length){i.on&&(i.el.style.setProperty("--lit","0"),i.on=!1);continue}const l=i.el.getBoundingClientRect(),f=l.left+l.width/2,g=l.top+l.height/2,b=[];for(const a of d){if(a.el===i.el||a.el.contains(i.el)||i.el.contains(a.el))continue;const m=Math.max(a.rect.left,Math.min(f,a.rect.right)),I=Math.max(a.rect.top,Math.min(g,a.rect.bottom)),B=Math.max(l.left,Math.min(m,l.right)),O=Math.max(l.top,Math.min(I,l.bottom)),N=Math.max(0,1-Math.hypot(m-B,I-O)/t)**e*s;N&&b.push({rgb:a.rgb,k:Math.min(1,N),w:a.rect.width,h:a.rect.height,x:a.rect.left+a.rect.width/2-l.left,y:a.rect.top+a.rect.height/2-l.top})}if(!b.length){i.on&&(i.el.style.setProperty("--lit","0"),i.on=!1);continue}b.sort((a,m)=>a.k-m.k),i.el.style.setProperty("--lit-ring",b.flatMap(a=>[C(n,a,h),C(c,a,p)]).join(",")),i.el.style.setProperty("--lit-fill",b.map(a=>C(c,a,u)).join(",")),i.el.style.setProperty("--lit","1"),i.on=!0}}const w=()=>{o||(o=requestAnimationFrame(R))};return addEventListener("scroll",w,{passive:!0,capture:!0}),addEventListener("resize",w,{passive:!0}),globalThis.vsLight=w,{add(d){v||=new IntersectionObserver(l=>{for(const f of l)for(const g of r)g.el===f.target&&(g.visible=f.isIntersecting);w()});const i={el:d,visible:!0,on:!1};return r.add(i),v.observe(d),w(),()=>{r.delete(i),v.unobserve(d)}}}})(),H=`
  :host { display: inline-block; }
  :host([block]) { display: block; }

  /* proximity glow rim (same shape as the shared FX_CSS in vs-fx.js) */
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
  .sw::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .sw::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
.sw__glow { --glow-strength: 0.5; --glow-ring: 1px; --glow-inset: -1px; border-radius: var(--rr, var(--r)); }
.sw {
  --r: var(--ctrl-r-md, 12px);
  --w: 256px;
  --accent: var(--inp-accent, #ededed);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: var(--w);
  padding: 16px;
  border: 1px solid var(--inp-border, var(--border, #2a2a2a));
  border-radius: var(--rr, var(--r));
  background: var(--bg-card, #111);
  color: var(--inp-text, #ededed);
  font: inherit;
  transition: border-color 200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.sw--block { width: 100%; }
.sw:hover:not(.is-disabled) { border-color: var(--inp-border-hover, #3d3d3d); }

.sw--sm { --r: var(--ctrl-r-sm, 8px); --w: 224px; font-size: var(--ctrl-fs-sm, 13px); }
.sw--lg { --r: var(--ctrl-r-lg, 16px); --w: 296px; font-size: var(--ctrl-fs-lg, 15px); }

.sw--r-none { --rr: 0px; }
.sw--r-subtle { --rr: 10px; }
.sw--r-rounded { --rr: 18px; }
.sw--r-pill { --rr: 24px; }
@supports (corner-shape: squircle) {
  .sw--r-squircle { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
}

.sw__head { display: flex; align-items: center; gap: 10px; }
.sw__preview {
  flex: none;
  width: var(--ctrl-h-md, 38px);
  height: var(--ctrl-h-md, 38px);
  border-radius: 10px;
  border: 1px solid var(--inp-border, var(--border, #2a2a2a));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}
.sw--sm .sw__preview { width: var(--ctrl-h-sm, 32px); height: var(--ctrl-h-sm, 32px); }
.sw--lg .sw__preview { width: var(--ctrl-h-lg, 44px); height: var(--ctrl-h-lg, 44px); }
.sw__field {
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  height: var(--ctrl-h-md, 38px);
  padding: 0 10px;
  border: 1px solid var(--inp-border, var(--border, #2a2a2a));
  border-radius: 9px;
  background: var(--bg-input, var(--bg-elevated, #1a1a1a));
  transition: border-color 160ms ease;
}
.sw__field:focus-within { border-color: var(--accent); }
.sw__hash { color: var(--inp-placeholder, #8b8b8b); }
.sw__hex {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  text-transform: lowercase;
  outline: none;
}
.sw__cur-label { font-size: 13px; font-variant-numeric: tabular-nums; color: var(--text-secondary, #a1a1a1); }

.sw__grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 8), 1fr);
  gap: 6px;
}
.sw__cell {
  position: relative;
  aspect-ratio: 1;
  border-radius: 7px;
  border: 1px solid rgba(127, 127, 127, 0.25);
  background: var(--c);
  cursor: pointer;
  padding: 0;
  color: #fff;
  transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 150ms ease;
}
.sw__cell:hover:not(:disabled) { transform: translateY(-3px) scale(1.08); z-index: 1; }
.sw__cell:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--accent); }
.sw__cell.is-active {
  box-shadow: 0 0 0 2px var(--bg-card, #111), 0 0 0 4px var(--accent);
}
.sw__check {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.5);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 140ms ease;
}
.sw__check svg { width: 60%; height: 60%; }
.sw__cell.is-active .sw__check { opacity: 1; transform: scale(1); }

.sw--t-danger  { --accent: #ff6369; }
.sw--t-warn    { --accent: #ffb224; }
.sw--t-success { --accent: #4cc38a; }

.sw.is-disabled { opacity: 0.5; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .sw, .sw__cell, .sw__check, .sw__field { transition: none; }
  .sw__cell:hover:not(:disabled) { transform: none; }
}
`,_=new Set;let A=0,E=0,M=!1,k=0,$=!1,L=null;function z(){if(k=0,!!M)for(const r of _){if(!r.visible)continue;if(r.disabled()){r.lastI!==0&&(r.el.style.setProperty("--glow","0"),r.lastI=0);continue}r.rect||(r.rect=r.el.getBoundingClientRect());const t=r.rect,e=Math.max(t.left,Math.min(A,t.right)),s=Math.max(t.top,Math.min(E,t.bottom)),n=Math.max(0,1-Math.hypot(A-e,E-s)/r.radius);n===0&&r.lastI===0||(r.el.style.setProperty("--gx",`${A-t.left}px`),r.el.style.setProperty("--gy",`${E-t.top}px`),r.el.style.setProperty("--glow",n.toFixed(3)),r.lastI=n)}}function T(r){A=r.clientX,E=r.clientY,M=!0,k||(k=requestAnimationFrame(z))}function F(){for(const r of _)r.rect=null;M&&!k&&(k=requestAnimationFrame(z))}function G(r,t,e){$||($=!0,addEventListener("pointermove",T,{passive:!0}),addEventListener("scroll",F,{passive:!0,capture:!0}),addEventListener("resize",F,{passive:!0}),L=new IntersectionObserver(c=>{for(const h of c)for(const p of _)p.el===h.target&&(p.visible=h.isIntersecting,h.isIntersecting&&(p.rect=null))}));const s={el:r,radius:t,disabled:e,rect:null,visible:!0,lastI:0};_.add(s),L.observe(r);const n=q.add(r);return()=>{_.delete(s),L.unobserve(r),n()}}const V=["#ff6369","#ff8f6b","#ffb224","#ffd60a","#8ce99a","#4cc38a","#33b1c8","#0091ff","#6e56cf","#a970ff","#ec4899","#f472b6","#ededed","#a1a1a1","#525252","#111111"];function x(r){let t=String(r).trim().replace(/^#/,"");return t.length===3&&(t=t.split("").map(e=>e+e).join("")),/^[0-9a-fA-F]{6}$/.test(t)?`#${t.toLowerCase()}`:null}let y;function D(r){if(y||=document.createElement("canvas").getContext("2d"),!y)return null;y.fillStyle="#000",y.fillStyle=r;const t=y.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const U=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function P(r,t){const e=t?D(String(t).trim()):null;if(!e){for(const o of U)r.style.removeProperty(o);return}const s=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),c=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,h=`rgb(${e[0]} ${e[1]} ${e[2]})`,p=e.map(o=>Math.round(c?o*.92:o+(255-o)*.16)),u=(o,v)=>r.style.setProperty(o,v);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])u(o,h);u("--btn-primary-bg-hover",`rgb(${p[0]} ${p[1]} ${p[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])u(o,e.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])u(o,c?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])u(o,c?"0 0 0":"255 255 255");u("--vs-color",h),u("--vs-color-rgb",e.join(" ")),u("--vs-color-fg",c?"#0b0b0b":"#ffffff")}class X extends HTMLElement{static observedAttributes=["value","size","radius","tone","columns","disabled","show-inputs","glow","block","color"];#g;#r;#l;#n;#o;#t;#a;#s;#d=null;#i=[];#c=V.slice();#e="#6e56cf";#h=!1;constructor(){super(),this.#g=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=H,this.#r=document.createElement("div"),this.#r.setAttribute("role","group"),this.#l=document.createElement("span"),this.#l.className="fx-glow sw__glow",this.#l.setAttribute("aria-hidden","true"),this.#r.setAttribute("aria-label","Color picker");const e=document.createElement("div");e.className="sw__head",this.#n=document.createElement("span"),this.#n.className="sw__preview",this.#n.setAttribute("aria-hidden","true"),this.#o=document.createElement("div"),this.#o.className="sw__field";const s=document.createElement("span");s.className="sw__hash",s.setAttribute("aria-hidden","true"),s.textContent="#",this.#t=document.createElement("input"),this.#t.className="sw__hex",this.#t.type="text",this.#t.maxLength=6,this.#t.spellcheck=!1,this.#t.setAttribute("aria-label","Hex value"),this.#o.append(s,this.#t),this.#a=document.createElement("span"),this.#a.className="sw__cur-label",e.append(this.#n,this.#o,this.#a),this.#s=document.createElement("div"),this.#s.className="sw__grid",this.#s.setAttribute("role","group"),this.#s.setAttribute("aria-label","Colors"),this.#r.append(this.#l,e,this.#s),this.#g.append(t,this.#r),this.#t.addEventListener("input",()=>{const n=x(this.#t.value);n&&this.#p(n,!0)}),this.#t.addEventListener("blur",()=>{this.#t.value=this.#e.replace(/^#/,"")}),this.#s.addEventListener("click",n=>{const c=n.target.closest(".sw__cell");if(!c||this.hasAttribute("disabled"))return;const h=c.dataset.color;h&&this.#p(h,!0)})}connectedCallback(){P(this,this.getAttribute("color"));const t=this.getAttribute("value"),e=t?x(t):null;e&&(this.#e=e),this.#d=G(this.#r,260,()=>this.hasAttribute("disabled")||this.getAttribute("glow")==="false"),this.#m(),this.#b()}disconnectedCallback(){this.#d?.(),this.#d=null,this.#i=[]}attributeChangedCallback(t,e,s){if(P(this,this.getAttribute("color")),!!this.#r){if(t==="value"){if(this.#h)return;const n=s?x(s):null;n&&n!==this.#e&&(this.#e=n,this.#u(),this.#f());return}if(t==="columns"){this.#b();return}this.#b()}}get value(){return this.#e}set value(t){this.#p(t,!1)}get swatches(){return this.#c.slice()}set swatches(t){!Array.isArray(t)||!t.length||(this.#c=t.slice(),this.#r&&this.#m())}get colors(){return this.swatches}set colors(t){this.swatches=t}#m(){this.#s.replaceChildren(),this.#i=this.#c.map(t=>{const e=document.createElement("button");e.className="sw__cell",e.type="button",e.dataset.color=t,e.style.setProperty("--c",t),e.setAttribute("aria-label",t),this.hasAttribute("disabled")&&(e.disabled=!0);const s=document.createElement("span");return s.className="sw__check",s.setAttribute("aria-hidden","true"),s.append(this.#v()),e.append(s),e}),this.#s.append(...this.#i),this.#u()}#v(){const t=document.createElementNS(S,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none");const e=document.createElementNS(S,"path");e.setAttribute("d","M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z");const s=document.createElementNS(S,"path");s.setAttribute("d","M7.75 11.9999L10.58 14.8299L16.25 9.16992");for(const n of[e,s])n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round");return t.append(e,s),t}#u(){for(let t=0;t<this.#i.length;t++){const e=(x(this.#c[t])||"")===this.#e;this.#i[t].classList.toggle("is-active",e),this.#i[t].setAttribute("aria-pressed",e?"true":"false")}}#p(t,e){const s=x(t);if(!s)return;const n=s!==this.#e;this.#e=s,this.#u(),this.#f(),this.getAttribute("value")!==s&&(this.#h=!0,this.setAttribute("value",s),this.#h=!1),e&&n&&this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{value:s}}))}#f(){this.#n.style.background=this.#e,document.activeElement!==this.#t&&(this.#t.value=this.#e.replace(/^#/,"")),this.#a.textContent=this.#e}#b(){const t=(n,c)=>this.getAttribute(n)??c,e=this.hasAttribute("disabled"),s=this.hasAttribute("show-inputs");this.#r.className=["sw",`sw--${t("size","md")}`,`sw--r-${t("radius","rounded")}`,`sw--t-${t("tone","default")}`,e?"is-disabled":"",this.hasAttribute("block")?"sw--block":""].filter(Boolean).join(" "),this.#r.style.setProperty("--cur",this.#e),this.#r.style.setProperty("--cols",t("columns","8")),this.#o.style.display=s?"":"none",this.#a.style.display=s?"none":"",this.#t.disabled=e;for(const n of this.#i)n.disabled=e;this.#f()}}customElements.define("vs-color-picker-swatches",X);
