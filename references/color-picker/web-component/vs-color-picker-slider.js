const E=new Set;let L=0,$=0,z=!1,A=0,N=!1,I=null;function B(){if(A=0,!!z)for(const r of E){if(!r.visible)continue;if(r.disabled()){r.lastI!==0&&(r.el.style.setProperty("--glow","0"),r.lastI=0);continue}r.rect||(r.rect=r.el.getBoundingClientRect());const t=r.rect,e=Math.max(t.left,Math.min(L,t.right)),i=Math.max(t.top,Math.min($,t.bottom)),n=Math.max(0,1-Math.hypot(L-e,$-i)/r.radius);n===0&&r.lastI===0||(r.el.style.setProperty("--gx",`${L-t.left}px`),r.el.style.setProperty("--gy",`${$-t.top}px`),r.el.style.setProperty("--glow",n.toFixed(3)),r.lastI=n)}}function G(r){L=r.clientX,$=r.clientY,z=!0,A||(A=requestAnimationFrame(B))}function R(){for(const r of E)r.rect=null;z&&!A&&(A=requestAnimationFrame(B))}function D(r,t,e){N||(N=!0,addEventListener("pointermove",G,{passive:!0}),addEventListener("scroll",R,{passive:!0,capture:!0}),addEventListener("resize",R,{passive:!0}),I=new IntersectionObserver(l=>{for(const o of l)for(const c of E)c.el===o.target&&(c.visible=o.isIntersecting,o.isIntersecting&&(c.rect=null))}));const i={el:r,radius:t,disabled:e,rect:null,visible:!0,lastI:0};E.add(i),I.observe(r);const n=U.add(r);return()=>{E.delete(i),I.unobserve(r),n()}}function S(r,t,e){return Math.min(e,Math.max(t,r))}function K(r){let t=r.trim().replace(/^#/,"");return t.length===3&&(t=t.split("").map(e=>e+e).join("")),/^[0-9a-fA-F]{6}$/.test(t)?[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]:null}function H(r,t,e){r/=255,t/=255,e/=255;const i=Math.max(r,t,e),n=Math.min(r,t,e),l=i-n;let o=0;const c=(i+n)/2,h=l?l/(1-Math.abs(2*c-1)):0;return l&&(i===r?o=(t-e)/l%6:i===t?o=(e-r)/l+2:o=(r-t)/l+4,o=(o*60+360)%360),[o,h,c]}function j(r,t,e){const i=(1-Math.abs(2*e-1))*t,n=i*(1-Math.abs(r/60%2-1)),l=e-i/2;let o=0,c=0,h=0;return r<60?[o,c,h]=[i,n,0]:r<120?[o,c,h]=[n,i,0]:r<180?[o,c,h]=[0,i,n]:r<240?[o,c,h]=[0,n,i]:r<300?[o,c,h]=[n,0,i]:[o,c,h]=[i,0,n],[Math.round((o+l)*255),Math.round((c+l)*255),Math.round((h+l)*255)]}function y(r,t,e){const[i,n,l]=j(r,t,e),o=c=>c.toString(16).padStart(2,"0");return`#${o(i)}${o(n)}${o(l)}`}function M(r){if(!r)return null;const t=String(r).trim(),e=K(t);if(e)return H(e[0],e[1],e[2]);let i=t.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);return i?H(+i[1],+i[2],+i[3]):(i=t.match(/^hsla?\(\s*([\d.]+)[\s,]+([\d.]+)%?[\s,]+([\d.]+)%?/i),i?[(+i[1]%360+360)%360,S(+i[2]/100,0,1),S(+i[3]/100,0,1)]:null)}const U=globalThis[Symbol.for("vs-light")]||=(()=>{const r=new Set,t=110,e=1.6,i=1.7,n=34,l=72,o=[[.6,0],[.42,30],[.16,58],[0,82]],c=[[.6,0],[.27,42],[.08,66],[0,85]],h=[[.85,0],[.4,42],[.12,66],[0,84]];let s=0,b=null;const _=(u,a,p)=>{const g=a.w/2+u,v=a.h/2+u,m=a.h/2/v;return`radial-gradient(${g.toFixed(1)}px ${v.toFixed(1)}px at ${a.x.toFixed(1)}px ${a.y.toFixed(1)}px,`+p.map(([d,x])=>` rgb(${a.rgb} / ${(d*a.k).toFixed(3)}) ${((m+x/100*(1-m))*100).toFixed(1)}%`).join(",")+")"};function C(){const u=[];for(const a of document.querySelectorAll("[color],[data-lamp]")){const p=getComputedStyle(a),g=p.getPropertyValue("--vs-color-rgb").trim()||(a.hasAttribute("data-lamp")?(p.backgroundColor.match(/[\d.]+/g)||[]).slice(0,3).join(" "):"");g&&u.push({el:a,rgb:g,rect:a.getBoundingClientRect()})}return u}function w(){if(s=0,!r.size)return;const u=C();for(const a of r){if(!a.visible)continue;if(!u.length){a.on&&(a.el.style.setProperty("--lit","0"),a.on=!1);continue}const p=a.el.getBoundingClientRect(),g=p.left+p.width/2,v=p.top+p.height/2,m=[];for(const d of u){if(d.el===a.el||d.el.contains(a.el)||a.el.contains(d.el))continue;const x=Math.max(d.rect.left,Math.min(g,d.rect.right)),P=Math.max(d.rect.top,Math.min(v,d.rect.bottom)),O=Math.max(p.left,Math.min(x,p.right)),q=Math.max(p.top,Math.min(P,p.bottom)),F=Math.max(0,1-Math.hypot(x-O,P-q)/t)**e*i;F&&m.push({rgb:d.rgb,k:Math.min(1,F),w:d.rect.width,h:d.rect.height,x:d.rect.left+d.rect.width/2-p.left,y:d.rect.top+d.rect.height/2-p.top})}if(!m.length){a.on&&(a.el.style.setProperty("--lit","0"),a.on=!1);continue}m.sort((d,x)=>d.k-x.k),a.el.style.setProperty("--lit-ring",m.flatMap(d=>[_(n,d,o),_(l,d,c)]).join(",")),a.el.style.setProperty("--lit-fill",m.map(d=>_(l,d,h)).join(",")),a.el.style.setProperty("--lit","1"),a.on=!0}}const f=()=>{s||(s=requestAnimationFrame(w))};return addEventListener("scroll",f,{passive:!0,capture:!0}),addEventListener("resize",f,{passive:!0}),globalThis.vsLight=f,{add(u){b||=new IntersectionObserver(p=>{for(const g of p)for(const v of r)v.el===g.target&&(v.visible=g.isIntersecting);f()});const a={el:u,visible:!0,on:!1};return r.add(a),b.observe(u),f(),()=>{r.delete(a),b.unobserve(u)}}}})(),X=`
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
  .sl::before{ content:''; position:absolute; inset:0; z-index:0; border-radius:inherit; pointer-events:none;
    background:var(--lit-fill,none); opacity:calc(var(--lit,0)*var(--lit-fill-amt,.3)); transition:opacity 140ms; }
  .sl::after{ content:''; position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:var(--lit-ring,none);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:var(--lit,0); transition:opacity 140ms; }
  .sl__glow { --glow-strength: 0.5; --glow-ring: 1px; --glow-inset: -1px; border-radius: var(--rr, var(--r)); }
  .sl {
    --r: var(--ctrl-r-md, 12px);
    --w: 268px;
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
    box-sizing: border-box;
    transition: border-color 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .sl--block { width: 100%; }
  .sl:hover:not(.is-disabled) { border-color: var(--inp-border-hover, #3d3d3d); }

  .sl--sm { --r: var(--ctrl-r-sm, 8px); --w: 236px; font-size: var(--ctrl-fs-sm, 13px); }
  .sl--lg { --r: var(--ctrl-r-lg, 16px); --w: 308px; font-size: var(--ctrl-fs-lg, 15px); }

  .sl--r-none { --rr: 0px; }
  .sl--r-subtle { --rr: 10px; }
  .sl--r-rounded { --rr: 18px; }
  .sl--r-pill { --rr: 24px; }
  @supports (corner-shape: squircle) {
    .sl--r-squircle { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  }

  .sl__head { display: flex; align-items: center; gap: 10px; }
  .sl__preview {
    flex: none;
    width: var(--ctrl-h-md, 38px);
    height: var(--ctrl-h-md, 38px);
    border-radius: 10px;
    border: 1px solid var(--inp-border, var(--border, #2a2a2a));
  }
  .sl--sm .sl__preview { width: var(--ctrl-h-sm, 32px); height: var(--ctrl-h-sm, 32px); }
  .sl--lg .sl__preview { width: var(--ctrl-h-lg, 44px); height: var(--ctrl-h-lg, 44px); }
  .sl__field {
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
  .sl__field:focus-within { border-color: var(--accent); }
  .sl__hash { color: var(--inp-placeholder, #8b8b8b); }
  .sl__hex {
    flex: 1; min-width: 0; border: none; background: transparent;
    color: var(--inp-text, #ededed); font: inherit; font-size: 13px;
    font-variant-numeric: tabular-nums; text-transform: lowercase; outline: none;
  }
  .sl__cur-label { font-size: 13px; font-variant-numeric: tabular-nums; color: var(--text-secondary, #a1a1a1); }

  .sl__row { display: flex; flex-direction: column; gap: 6px; }
  .sl__label {
    font-size: 12px; font-weight: 600;
    color: var(--text-secondary, #a1a1a1); letter-spacing: -0.01em;
  }
  .sl__bar {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 14px; border-radius: 999px;
    cursor: pointer; outline: none; margin: 0;
    background: var(--track, #444);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
  }
  .sl__bar:focus-visible { box-shadow: 0 0 0 2px var(--accent); }
  .sl__bar::-webkit-slider-thumb {
    -webkit-appearance: none; width: 12px; height: 22px; border-radius: 6px;
    background: var(--cur); border: 3px solid #fff; cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .sl__bar::-moz-range-thumb {
    width: 12px; height: 22px; border-radius: 6px;
    background: var(--cur); border: 3px solid #fff; cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .sl__bar.is-active::-webkit-slider-thumb { transform: scale(1.35); }
  .sl__bar.is-active::-moz-range-thumb { transform: scale(1.35); }

  .sl--t-danger  { --accent: #ff6369; }
  .sl--t-warn    { --accent: #ffb224; }
  .sl--t-success { --accent: #4cc38a; }

  .sl.is-disabled { opacity: 0.5; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .sl, .sl__field { transition: none; }
    .sl__bar::-webkit-slider-thumb, .sl__bar::-moz-range-thumb { transition: none; }
    .sl__bar.is-active::-webkit-slider-thumb,
    .sl__bar.is-active::-moz-range-thumb { transform: none; }
  }
`,Y="linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%)";let k;function J(r){if(k||=document.createElement("canvas").getContext("2d"),!k)return null;k.fillStyle="#000",k.fillStyle=r;const t=k.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const Q=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function T(r,t){const e=t?J(String(t).trim()):null;if(!e){for(const s of Q)r.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),l=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(s=>Math.round(l?s*.92:s+(255-s)*.16)),h=(s,b)=>r.style.setProperty(s,b);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])h(s,o);h("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])h(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])h(s,l?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])h(s,l?"0 0 0":"255 255 255");h("--vs-color",o),h("--vs-color-rgb",e.join(" ")),h("--vs-color-fg",l?"#0b0b0b":"#ffffff")}class V extends HTMLElement{static observedAttributes=["value","disabled","format","size","radius","tone","show-inputs","glow","block","color"];#t=255;#i=.5;#r=.58;#x="";#p=!1;#s;#b;#c;#h;#e;#d;#f=null;#a;#o;#l;#n=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=X,this.#b=document.createElement("span"),this.#b.className="fx-glow sl__glow",this.#b.setAttribute("aria-hidden","true"),this.#s=document.createElement("div"),this.#s.className="sl",this.#s.setAttribute("role","group"),this.#s.setAttribute("aria-label","Color picker");const i=document.createElement("div");i.className="sl__head",this.#c=document.createElement("span"),this.#c.className="sl__preview",this.#c.setAttribute("aria-hidden","true"),this.#h=document.createElement("div"),this.#h.className="sl__field";const n=document.createElement("span");n.className="sl__hash",n.setAttribute("aria-hidden","true"),n.textContent="#",this.#e=document.createElement("input"),this.#e.className="sl__hex",this.#e.type="text",this.#e.maxLength=6,this.#e.spellcheck=!1,this.#e.setAttribute("aria-label","Hex value"),this.#h.append(n,this.#e),this.#d=document.createElement("span"),this.#d.className="sl__cur-label",i.append(this.#c,this.#h,this.#d);const l=(s,b,_,C)=>{const w=document.createElement("div");w.className="sl__row";const f=document.createElement("span");f.className="sl__label",f.textContent=s;const u=document.createElement("input");return u.className="sl__bar",u.type="range",u.min=String(b),u.max=String(_),u.step="1",u.setAttribute("aria-label",C),w.append(f,u),{row:w,bar:u}},o=l("Hue",0,360,"Hue"),c=l("Saturation",0,100,"Saturation"),h=l("Lightness",0,100,"Lightness");this.#a=o.bar,this.#o=c.bar,this.#l=h.bar,this.#s.append(this.#b,i,o.row,c.row,h.row),t.append(e,this.#s),this.#a.addEventListener("input",s=>this.#m("h",+s.target.value)),this.#o.addEventListener("input",s=>this.#m("s",+s.target.value/100)),this.#l.addEventListener("input",s=>this.#m("l",+s.target.value/100));for(const s of[this.#a,this.#o,this.#l])s.addEventListener("pointerdown",b=>this.#E(s,b));this.#e.addEventListener("input",()=>this.#k()),this.#e.addEventListener("blur",()=>this.#_())}connectedCallback(){T(this,this.getAttribute("color")),this.#p=!0;const t=M(this.getAttribute("value"))||M("#6e56cf");[this.#t,this.#i,this.#r]=t,this.#y(),this.#f=D(this.#s,260,()=>this.hasAttribute("disabled")||this.getAttribute("glow")==="false"),this.#u()}disconnectedCallback(){this.#f?.(),this.#f=null,this.#p=!1,this.#v()}attributeChangedCallback(t,e,i){if(T(this,this.getAttribute("color")),!(!this.#p||e===i))if(t==="value"){if(i&&i.toLowerCase()!==this.#x.toLowerCase()){const n=M(i);n&&([this.#t,this.#i,this.#r]=n,this.#u())}}else this.#y(),t==="format"&&this.#u()}get value(){return this.#g()}set value(t){this.setAttribute("value",t)}#y(){const t=(n,l)=>this.getAttribute(n)??l,e=this.hasAttribute("disabled"),i=t("show-inputs","true")!=="false";this.#s.className=`sl sl--${t("size","md")} sl--r-${t("radius","rounded")} sl--t-${t("tone","default")}`+(e?" is-disabled":"")+(this.hasAttribute("block")?" sl--block":""),this.#h.style.display=i?"":"none",this.#d.style.display=i?"none":"",this.#e.disabled=e;for(const n of[this.#a,this.#o,this.#l])n.disabled=e}#u(){const t=y(this.#t,this.#i,this.#r);this.#s.style.setProperty("--cur",t),this.#c.style.background=t,this.#a.value=String(Math.round(this.#t)),this.#o.value=String(Math.round(this.#i*100)),this.#l.value=String(Math.round(this.#r*100)),this.#a.style.setProperty("--track",Y),this.#o.style.setProperty("--track",`linear-gradient(to right, ${y(this.#t,0,this.#r)}, ${y(this.#t,1,this.#r)})`),this.#l.style.setProperty("--track",`linear-gradient(to right, #000, ${y(this.#t,this.#i,.5)}, #fff)`),document.activeElement!==this.#e&&this.#_(),this.#d.textContent=this.#g()}#_(){this.#e.value=y(this.#t,this.#i,this.#r).replace(/^#/,"")}#g(){const t=this.getAttribute("format")||"hex";if(t==="rgb"){const[e,i,n]=j(this.#t,this.#i,this.#r);return`rgb(${e}, ${i}, ${n})`}return t==="hsl"?`hsl(${Math.round(this.#t)}, ${Math.round(this.#i*100)}%, ${Math.round(this.#r*100)}%)`:y(this.#t,this.#i,this.#r)}#m(t,e){this.hasAttribute("disabled")||(t==="h"?this.#t=e:t==="s"?this.#i=S(e,0,1):this.#r=S(e,0,1),this.#u(),this.#w())}#k(){const t=M(this.#e.value);t&&([this.#t,this.#i,this.#r]=t,this.#u(),this.#w())}#w(){const t=this.#g();this.#x=t,this.setAttribute("value",t);const e={value:t};this.dispatchEvent(new CustomEvent("input",{bubbles:!0,composed:!0,detail:e})),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:e}))}#E(t,e){if(!this.hasAttribute("disabled")){t.classList.add("is-active");try{t.setPointerCapture?.(e.pointerId)}catch{}this.#v(),this.#n=()=>{this.#p&&t.classList.remove("is-active"),this.#v()},document.addEventListener("pointerup",this.#n),document.addEventListener("pointercancel",this.#n)}}#v(){this.#n&&(document.removeEventListener("pointerup",this.#n),document.removeEventListener("pointercancel",this.#n),this.#n=null)}}customElements.define("vs-color-picker-slider",V);
