import{FX_CSS as d,attachGlow as f,pressRipple as b}from"./vs-fx.CLXiCjCI.js";const g=`
/* borders must not push the control out of its cell (inputs default to
   content-box, so width/height 100% + a border overflowed by 2px) */
*, *::before, *::after { box-sizing: border-box; }

:host { display: inline-flex; }
${d}
.otp {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --fs: var(--ctrl-fs-md, 16px);
  --gap: 8px;
  --accent: var(--inp-accent, #ededed);
  --ring: var(--inp-ring, 255 255 255);
  display: inline-flex;
  align-items: center;
  gap: var(--gap);
  font-family: inherit;
}
.otp--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 14px); --gap: 6px; }
.otp--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 18px); --gap: 10px; }

.otp__cell {
  position: relative;
  width: var(--h);
  height: var(--h);
  border-radius: var(--rr, var(--r));
  background: var(--cell-bg, transparent);
  border: 1px solid var(--inp-border, #2a2a2a);
  transform-style: preserve-3d;
  transition:
    border-color 220ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 220ms ease,
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* radii */
.otp--r-subtle .otp__cell { --rr: 8px; }
.otp--r-rounded .otp__cell { --rr: var(--r); }
.otp--r-pill .otp__cell { --rr: 999px; }
@supports (corner-shape: squircle) {
  .otp--r-squircle .otp__cell { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
  .otp--r-squircle .otp__glow { corner-shape: squircle; }
}
.otp--r-pill .otp__glow,
.otp--r-pill .otp__ripples { border-radius: 999px; }
@supports (corner-shape: squircle) {
  .otp--r-squircle .otp__ripples { corner-shape: squircle; }
}

/* click ripple layer (.fx-ripples from vs-fx, clips to the radius) */
.otp__ripples { border-radius: inherit; }

/* proximity glow (.fx-glow from vs-fx) */
.otp__glow {
  --glow-ring: 1px;
  --glow-strength: 0.7;
  border-radius: inherit;
}
.otp__cell.is-focused .otp__glow { opacity: 0; }

/* cell states */
.otp__cell:hover { --cell-bg: var(--inp-hover-bg, rgba(255, 255, 255, 0.05)); border-color: var(--inp-border-hover, #3d3d3d); }
.otp__cell.has-value { border-color: var(--inp-border-hover, #3d3d3d); }
.otp__cell.is-focused {
  border-color: var(--accent);
}

.otp__control {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  border-radius: inherit;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  font-weight: 600;
  text-align: center;
  caret-color: var(--accent);
  outline: none;
}

/* tones — recolor accent, ring and glow */
.otp--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
.otp--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
.otp--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }
.otp--t-danger .otp__cell { border-color: var(--inp-t-danger-rest, #5b1a1d); }
.otp--t-warn .otp__cell { border-color: var(--inp-t-warn-rest, #5a3d10); }
.otp--t-success .otp__cell { border-color: var(--inp-t-success-rest, #1b3b2a); }
.otp--t-danger .otp__cell:hover,
.otp--t-warn .otp__cell:hover,
.otp--t-success .otp__cell:hover { --cell-bg: rgb(var(--ring) / 0.07); border-color: rgb(var(--ring)); }

/* disabled */
.otp.is-disabled { opacity: 0.5; }
.otp.is-disabled .otp__cell { cursor: not-allowed; }
.otp.is-disabled .otp__control { cursor: not-allowed; }

@media (prefers-reduced-motion: reduce) {
  .otp__cell { transition: none; }
}
`,v=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let h;function m(p){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=p;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(p,t){const e=t?m(String(t).trim()):null;if(!e){for(const s of _)p.style.removeProperty(s);return}const r=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),n=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(s=>Math.round(n?s*.92:s+(255-s)*.16)),l=(s,a)=>p.style.setProperty(s,a);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(s,c);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(s,e.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(s,n?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])l(s,n?"0 0 0":"255 255 255");l("--vs-color",c),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["length","value","type","size","radius","tone","disabled","autofocus","mask","color"];#i;#o=[];#t=[];#g=[];#e=[];#a=[];#c=[];#u=-1;#r=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#i=document.createElement("div"),this.#i.className="otp",this.#i.setAttribute("role","group"),this.#i.setAttribute("aria-label","One-time code"),t.append(e,this.#i)}connectedCallback(){u(this,this.getAttribute("color")),this.#v(this.#d()),this.#h(this.getAttribute("value")??""),this.#x(),this.hasAttribute("autofocus")&&requestAnimationFrame(()=>this.#s(0))}disconnectedCallback(){this.#m()}attributeChangedCallback(t){u(this,this.getAttribute("color")),this.isConnected&&(t==="length"&&this.#d()!==this.#r?(this.#v(this.#d()),this.#h(this.getAttribute("value")??"")):t==="value"&&this.#h(this.getAttribute("value")??""),this.#x())}get value(){return this.#e.join("")}set value(t){const e=t==null?"":String(t);this.getAttribute("value")!==e?this.setAttribute("value",e):this.#h(e)}focus(){this.#s(0)}#d(){const t=parseInt(this.getAttribute("length")??"6",10);return Number.isFinite(t)&&t>0?t:6}#f(){return this.getAttribute("type")==="numeric"?/[^0-9]/g:/[^a-zA-Z0-9]/g}#y(){return this.hasAttribute("mask")||this.getAttribute("type")==="password"}#p(t){return t&&this.#y()?"•":t}#v(t){this.#m(),this.#o=[],this.#t=[],this.#g=[],this.#a=[],this.#c=[],this.#e=new Array(t).fill("");const e=this.getAttribute("type")==="numeric";for(let r=0;r<t;r++){const i=document.createElement("div");i.className="otp__cell";const n=document.createElement("span");n.className="fx-glow otp__glow",n.setAttribute("aria-hidden","true");const c=document.createElement("span");c.className="fx-ripples otp__ripples",c.setAttribute("aria-hidden","true");const o=document.createElement("input");o.className="otp__control",o.type="text",o.maxLength=1,o.autocomplete="one-time-code",o.setAttribute("inputmode",e?"numeric":"text"),o.setAttribute("aria-label",`Digit ${r+1} of ${t}`),o.addEventListener("input",a=>this.#A(a,r)),o.addEventListener("keydown",a=>this.#E(a,r)),o.addEventListener("paste",a=>this.#C(a,r)),o.addEventListener("focus",()=>this.#k(r)),o.addEventListener("blur",()=>this.#L());const l=a=>this.#S(a,i,c,r),s=()=>{i.style.transform=""};i.addEventListener("pointerdown",l);for(const a of["pointerup","pointerleave","pointercancel"])i.addEventListener(a,s);this.#c[r]={down:l,up:s},i.append(n,c,o),this.#i.appendChild(i),this.#o[r]=i,this.#t[r]=o,this.#g[r]=c,this.#a[r]=f(i,160,()=>this.hasAttribute("disabled"))}this.#r=t}#m(){for(const t of this.#a)t?.();for(let t=0;t<this.#o.length;t++){const e=this.#o[t],r=this.#c[t];if(e&&r){e.removeEventListener("pointerdown",r.down);for(const i of["pointerup","pointerleave","pointercancel"])e.removeEventListener(i,r.up)}}this.#i.replaceChildren(),this.#a=[],this.#c=[]}#h(t){const e=(t??"").replace(this.#f(),"").slice(0,this.#r);for(let r=0;r<this.#r;r++){const i=e[r]??"";this.#e[r]=i,this.#t[r]&&(this.#t[r].value=this.#p(i))}this.#l()}#s(t){const e=this.#t[t];e&&(e.focus(),e.select())}#n(){const t=this.#e.join("");this.getAttribute("value")!==t&&this.setAttribute("value",t),this.#b("input"),this.#b("change"),this.#w()&&this.#b("complete"),this.#l()}#b(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#e.join("")}}))}#w(){return this.#r>0&&this.#e.every(t=>t!=="")}#A(t,e){const r=t.target,i=r.value.replace(this.#f(),"");if(!i){this.#e[e]="",r.value="",this.#n();return}if(i.length>1){this.#_(i,e);return}const n=i[0];this.#e[e]=n,r.value=this.#p(n),this.#n(),e<this.#r-1&&this.#s(e+1)}#_(t,e){const r=t.replace(this.#f(),"");let i=e;for(const n of r){if(i>=this.#r)break;this.#e[i]=n,this.#t[i]&&(this.#t[i].value=this.#p(n)),i++}this.#n(),this.#s(Math.min(i,this.#r-1))}#E(t,e){const r=t.key;r==="Backspace"?(this.#e[e]?(this.#e[e]="",this.#t[e].value="",this.#n()):e>0&&(this.#e[e-1]="",this.#t[e-1].value="",this.#n(),this.#s(e-1)),t.preventDefault()):r==="ArrowLeft"&&e>0?(this.#s(e-1),t.preventDefault()):r==="ArrowRight"&&e<this.#r-1?(this.#s(e+1),t.preventDefault()):r==="Delete"&&(this.#e[e]="",this.#t[e].value="",this.#n(),t.preventDefault())}#C(t,e){t.preventDefault();const r=t.clipboardData?.getData("text")??"";this.#_(r,e)}#k(t){this.#u=t,this.#l();const e=this.#t[t];e&&e.select()}#L(){this.#u=-1,this.#l()}#S(t,e,r,i){this.hasAttribute("disabled")||v()||b(e,r,t,{max:4})}#x(){const t=(r,i)=>this.getAttribute(r)??i,e=this.hasAttribute("disabled");this.#i.className=`otp otp--${t("size","md")} otp--r-${t("radius","squircle")} otp--t-${t("tone","default")}`+(e?" is-disabled":"");for(let r=0;r<this.#t.length;r++)this.#t[r].disabled=e,this.#t[r].setAttribute("inputmode",t("type","numeric")==="numeric"?"numeric":"text"),this.#t[r].value=this.#p(this.#e[r]??"");this.#l()}#l(){for(let t=0;t<this.#o.length;t++){const e=this.#o[t];e&&(e.classList.toggle("is-focused",this.#u===t),e.classList.toggle("has-value",(this.#e[t]??"")!==""))}}}customElements.define("vs-otp",x);
