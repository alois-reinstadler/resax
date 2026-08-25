import{FX_CSS as z,attachGlow as C}from"./vs-fx.CLXiCjCI.js";const N=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
${z}
.ta {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --px: var(--ctrl-px-md, 14px);
  --fs: var(--ctrl-fs-md, 14px);
  --py: 11px; /* vertical padding inside the field */
  --lh: 1.5;
  --accent: var(--inp-accent, #ededed); /* default: focus contrasted against the theme */
  --ring: var(--inp-ring, 255 255 255); /* ring rgb, space-separated */
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 280px;
  font-family: inherit;
}
.ta--block { display: flex; width: 100%; min-width: 0; }
.ta--sm { --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); --fs: var(--ctrl-fs-sm, 13px); --py: 8px; }
.ta--lg { --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); --fs: var(--ctrl-fs-lg, 15px); --py: 14px; }

.ta__field {
  position: relative;
  display: flex;
  border-radius: var(--rr, var(--r));
  --field-bg: transparent;
  background: var(--field-bg);
  transition: background-color 220ms ease;
}

/* reusable effects (.fx-glow / .fx-ripples from vs-fx);
   here we only adjust the shape according to the radius */
.ta__glow {
  --glow-ring: 1px;
  --glow-strength: 0.9;
  /* base ring (content-box xor full) + a 3rd layer that subtracts the floated
     label box → the light is carved out behind the label, no opaque bg trick */
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0),
    linear-gradient(#000 0 0);
  -webkit-mask-position: 0 0, 0 0, var(--lmx, 0) var(--lmy, 0);
  -webkit-mask-size: auto, auto, var(--lmw, 0) var(--lmh, 0);
  -webkit-mask-repeat: no-repeat, no-repeat, no-repeat;
  -webkit-mask-composite: xor, source-out;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0),
    linear-gradient(#000 0 0);
  mask-position: 0 0, 0 0, var(--lmx, 0) var(--lmy, 0);
  mask-size: auto, auto, var(--lmw, 0) var(--lmh, 0);
  mask-repeat: no-repeat, no-repeat, no-repeat;
  mask-composite: exclude, subtract;
}
/* on focus the proximity light turns off (the accent border takes over) */
.ta.is-focused .ta__glow { opacity: 0; }
@supports (corner-shape: squircle) {
  .ta--r-squircle .ta__glow,
  .ta--r-squircle .ta__ripples { corner-shape: squircle; }
}

/* border as a fieldset → the legend opens a real gap in the top line */
.ta__outline {
  position: absolute;
  inset: 0;
  z-index: 0;
  margin: 0;
  padding: 0 calc(var(--px) - 5px);
  border: 1px solid var(--inp-border, #2a2a2a);
  border-radius: inherit;
  pointer-events: none;
  min-inline-size: 0;
  transition: border-color 220ms cubic-bezier(0.22, 1, 0.36, 1);
}
@supports (corner-shape: squircle) {
  .ta--r-squircle .ta__outline { corner-shape: squircle; }
}
.ta__legend {
  display: block;
  width: auto;
  max-width: 0.01px;
  height: 0;
  padding: 0;
  font-size: calc(var(--fs) * 0.82);
  line-height: 0;
  white-space: nowrap;
  visibility: hidden; /* only reserves width → cuts the line, without painting text */
  transition: max-width 220ms cubic-bezier(0.34, 1.4, 0.5, 1);
}
.ta__legend span { display: inline-block; padding: 0 4px; }
/* the gap opens only when there is a label and it floats */
.ta.has-label.is-focused .ta__legend,
.ta.has-label.has-value .ta__legend { max-width: 100%; }

/* border states (on the outline) */
.ta__field:hover .ta__outline { border-color: var(--inp-border-hover, #3d3d3d); }
.ta.is-focused .ta__outline { border-color: var(--accent); }
.ta__field:hover { --field-bg: var(--inp-hover-bg, rgba(255, 255, 255, 0.05)); }

/* radii */
.ta--r-none .ta__field { --rr: 0px; }
.ta--r-subtle .ta__field { --rr: 8px; }
@supports (corner-shape: squircle) {
  .ta--r-squircle .ta__field { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
}

.ta__control {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  min-height: calc(var(--rows) * var(--lh) * var(--fs) + var(--py) * 2);
  padding: var(--py) var(--px);
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  line-height: var(--lh);
  outline: none;
  resize: vertical;
}
.ta--resize-none .ta__control { resize: none; }
.ta.is-autosize .ta__control { overflow: hidden; }
.ta__control::placeholder {
  color: var(--inp-placeholder, #5a5a5a);
  transition: color 200ms ease;
}

/* floating label — anchored to the first text line (top), not centered */
.ta__label {
  position: absolute;
  z-index: 1;
  left: var(--px);
  top: var(--py);
  transform-origin: left top;
  color: var(--label-color, var(--inp-label, #6a6a6a));
  font-size: var(--fs);
  line-height: var(--lh);
  pointer-events: none;
  /* at rest: full label, may wrap inside the field */
  max-width: calc(100% - var(--px) * 2);
  white-space: normal;
  transition:
    transform 240ms cubic-bezier(0.34, 1.4, 0.5, 1),
    color 220ms ease;
}
/* floats up to the border line on focus or with a value */
.ta.is-focused .ta__label,
.ta.has-value .ta__label {
  transform: translateY(calc(-1 * var(--py) - var(--fs) * var(--lh) / 2)) scale(0.82);
}
/* floated: single line + ellipsis (text already truncated via #displayLabel) */
.ta.is-focused .ta__label,
.ta.has-value .ta__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ta.has-value .ta__label { color: var(--label-color, #8a8a8a); }
.ta.is-focused .ta__label { color: var(--label-color-strong, #ededed); }

/* clear button — pinned to the top-right corner */
.ta__btn {
  position: absolute;
  z-index: 2;
  top: calc(var(--py) - 3px);
  right: calc(var(--px) - 6px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--inp-btn, #8a8a8a);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, transform 160ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}
.ta__btn svg { width: 14px; height: 14px; }
.ta__btn:hover { background: var(--inp-btn-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--inp-text, #ededed); }
.ta__btn:active { transform: scale(0.86); }

/* meta row: hint + counter */
.ta__meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding: 0 2px;
}
.ta__hint {
  margin: 0;
  font-size: calc(var(--fs) - 1px);
  color: var(--inp-hint, #7a7a7a);
  transition: color 200ms ease;
}
.ta__counter {
  margin-left: auto;
  font-size: calc(var(--fs) - 2px);
  font-variant-numeric: tabular-nums;
  color: var(--inp-hint, #7a7a7a);
  transition: color 200ms ease;
}
.ta__counter.is-full { color: var(--inp-t-danger-hint, #ff8d91); }

/* tones — recolor accent/ring/focus border and hint */
.ta--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
.ta--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
.ta--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }
.ta--t-danger .ta__hint { color: var(--inp-t-danger-hint, #ff8d91); }
.ta--t-warn .ta__hint { color: var(--inp-t-warn-hint, #ffce6e); }
.ta--t-success .ta__hint { color: var(--inp-t-success-hint, #79d3a6); }
/* in a non-default tone, the border at rest hints at the color */
.ta--t-danger .ta__outline { border-color: var(--inp-t-danger-rest, #5b1a1d); }
.ta--t-warn .ta__outline { border-color: var(--inp-t-warn-rest, #5a3d10); }
.ta--t-success .ta__outline { border-color: var(--inp-t-success-rest, #1b3b2a); }
/* hover tinted with the tone color (not gray) + stronger light */
.ta--t-danger .ta__glow,
.ta--t-warn .ta__glow,
.ta--t-success .ta__glow { --glow-strength: 0.7; }
.ta--t-danger .ta__field:hover,
.ta--t-warn .ta__field:hover,
.ta--t-success .ta__field:hover { --field-bg: rgb(var(--ring) / 0.07); }
.ta--t-danger .ta__field:hover .ta__outline,
.ta--t-warn .ta__field:hover .ta__outline,
.ta--t-success .ta__field:hover .ta__outline { border-color: rgb(var(--ring)); }
/* floating label tinted with the tone color */
.ta--t-danger .ta__label,
.ta--t-warn .ta__label,
.ta--t-success .ta__label { color: rgb(var(--ring) / 0.85); }
.ta--t-danger.is-focused .ta__label,
.ta--t-warn.is-focused .ta__label,
.ta--t-success.is-focused .ta__label { color: rgb(var(--ring)); }
/* placeholder tinted with the tone color */
.ta--t-danger .ta__control::placeholder,
.ta--t-warn .ta__control::placeholder,
.ta--t-success .ta__control::placeholder { color: rgb(var(--ring) / 0.8); }

/* disabled / readonly */
.ta.is-disabled { opacity: 0.5; }
.ta.is-disabled .ta__field,
.ta.is-disabled .ta__control { cursor: not-allowed; }
.ta.is-disabled .ta__control { resize: none; }
.ta.is-readonly .ta__field { --field-bg: var(--inp-readonly-bg, rgba(255, 255, 255, 0.02)); }

@media (prefers-reduced-motion: reduce) {
  .ta__field,
  .ta__label,
  .ta__btn,
  .ta__control::placeholder { transition: none; }
}
`,x="http://www.w3.org/2000/svg",$=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function L(c){const t=document.createElementNS(x,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of c){const a=document.createElementNS(x,"path");a.setAttribute("d",e),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),t.appendChild(a)}return t}let h;function S(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const P=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function y(c,t){const e=t?S(String(t).trim()):null;if(!e){for(const i of P)c.style.removeProperty(i);return}const a=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),s=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(s?i*.92:i+(255-i)*.16)),n=(i,d)=>c.style.setProperty(i,d);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(i,o);n("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(i,s?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])n(i,s?"0 0 0":"255 255 255");n("--vs-color",o),n("--vs-color-rgb",e.join(" ")),n("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class q extends HTMLElement{static observedAttributes=["value","placeholder","disabled","readonly","size","radius","tone","label","hint","rows","autosize","resize","maxlength","label-max-chars","clearable","block","glow","color"];#s;#a;#e;#n;#c;#f;#t;#r;#i;#h;#d;#l;#w;#g;#m;#u=!1;#v=0;#E=t=>this.#S(t);#A=t=>{t.stopPropagation(),this.#_("change")};#k=t=>this.#P(t);#z=t=>this.#q(t);#C=t=>this.#B(t);#N=()=>this.#M();constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=N,this.#s=document.createElement("div"),this.#s.className="ta",this.#a=document.createElement("div"),this.#a.className="ta__field",this.#e=document.createElement("span"),this.#e.className="fx-glow ta__glow",this.#e.setAttribute("aria-hidden","true"),this.#n=document.createElement("span"),this.#n.className="fx-ripples ta__ripples",this.#n.setAttribute("aria-hidden","true"),this.#c=document.createElement("fieldset"),this.#c.className="ta__outline",this.#c.setAttribute("aria-hidden","true");const a=document.createElement("legend");a.className="ta__legend",this.#f=document.createElement("span"),a.appendChild(this.#f),this.#c.appendChild(a),this.#t=document.createElement("textarea"),this.#t.className="ta__control",this.#r=document.createElement("label"),this.#r.className="ta__label",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="ta__btn ta__btn--clear",this.#i.tabIndex=-1,this.#i.setAttribute("aria-label","Clear"),this.#i.appendChild(L(["M6 6L18 18","M18 6L6 18"])),this.#a.append(this.#e,this.#n,this.#c,this.#t,this.#r,this.#i),this.#h=document.createElement("div"),this.#h.className="ta__meta",this.#d=document.createElement("p"),this.#d.className="ta__hint",this.#l=document.createElement("span"),this.#l.className="ta__counter",this.#h.append(this.#d,this.#l),this.#s.append(this.#a,this.#h),t.append(e,this.#s)}#L(){this.#$(),this.#t.addEventListener("input",this.#E),this.#t.addEventListener("change",this.#A),this.#t.addEventListener("focus",this.#k),this.#t.addEventListener("blur",this.#z),this.#a.addEventListener("pointerdown",this.#C),this.#i.addEventListener("click",this.#N)}#$(){this.#t.removeEventListener("input",this.#E),this.#t.removeEventListener("change",this.#A),this.#t.removeEventListener("focus",this.#k),this.#t.removeEventListener("blur",this.#z),this.#a.removeEventListener("pointerdown",this.#C),this.#i.removeEventListener("click",this.#N)}connectedCallback(){this.#L(),y(this,this.getAttribute("color")),this.#o(),this.#y(),this.hasAttribute("autosize")&&this.#p(),this.#b(),this.#g=new MutationObserver(()=>this.#y()),this.#g.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),"ResizeObserver"in window&&(this.#m=new ResizeObserver(()=>this.#x()),this.#m.observe(this.#a)),this.#w=C(this.#a,240,()=>this.hasAttribute("disabled")||this.hasAttribute("readonly")||this.#u||!this.hasAttribute("glow"))}disconnectedCallback(){this.#w?.(),this.#g?.disconnect(),this.#m?.disconnect(),clearTimeout(this.#v),this.#$()}attributeChangedCallback(t){y(this,this.getAttribute("color")),this.#t&&(this.#o(),t==="value"&&this.hasAttribute("autosize")&&this.#p())}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#o(),this.hasAttribute("autosize")&&this.#p()}focus(){this.#t.focus()}blur(){this.#t.blur()}#o(){const t=(A,k)=>this.getAttribute(A)??k,e=this.hasAttribute("disabled"),a=this.hasAttribute("readonly"),r=t("label",""),s=t("hint",""),o=Number(t("rows",3))||3,l=this.hasAttribute("autosize"),n=t("resize","vertical"),i=Number(t("maxlength",0))||0,d=t("value","");this.#t.value!==d&&(this.#t.value=d);const u=this.#t.value,p=u.length>0,b=this.#u,w=b||p,g=t("placeholder",""),m=r?b?g:"":g;this.#t.getAttribute("placeholder")!==m&&this.#t.setAttribute("placeholder",m),this.#t.disabled=e,this.#t.readOnly=a,this.#t.rows=o,i>0?this.#t.setAttribute("maxlength",String(i)):this.#t.removeAttribute("maxlength"),r?this.#t.setAttribute("aria-label",r):this.#t.removeAttribute("aria-label"),this.#s.style.setProperty("--rows",String(o)),this.#s.className=`ta ta--${t("size","md")} ta--r-${t("radius","squircle")} ta--t-${t("tone","default")} ta--resize-${l?"none":n}`+(b?" is-focused":"")+(e?" is-disabled":"")+(a?" is-readonly":"")+(p?" has-value":"")+(r?" has-label":"")+(this.hasAttribute("block")?" ta--block":"")+(l?" is-autosize":"");const f=Number(t("label-max-chars",28))||0,v=w&&f>0&&r.length>f?r.slice(0,f).trimEnd()+"…":r;this.#r.textContent=v,this.#r.title=r,this.#r.style.display=r?"":"none",this.#f.textContent=v||" ";const E=this.hasAttribute("clearable")&&p&&!e&&!a;this.#i.style.display=E?"":"none";const _=i>0;this.#d.textContent=s,this.#d.style.display=s?"":"none",this.#l.textContent=`${u.length}/${i}`,this.#l.style.display=_?"":"none",this.#l.classList.toggle("is-full",u.length>=i),this.#h.style.display=s||_?"":"none"}#S(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#o(),this.hasAttribute("autosize")&&this.#p(),this.#b(),this.#_("input")}#_(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#P(t){this.#u=!0,this.#y(),this.#o(),this.#b(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#q(t){this.#u=!1,this.#o(),this.#b(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#M(){this.#t.value="",this.getAttribute("value")!==""?this.setAttribute("value",""):this.#o(),this.hasAttribute("autosize")&&this.#p(),this.#b(),this.#_("input"),this.dispatchEvent(new CustomEvent("clear",{bubbles:!0,composed:!0})),this.#t.focus()}#p(){this.#t.style.height="auto",this.#t.style.height=`${this.#t.scrollHeight}px`}#B(t){if(this.hasAttribute("disabled")||this.hasAttribute("readonly")||$())return;const e=this.#a.getBoundingClientRect(),a=t.clientX-e.left,r=t.clientY-e.top,s=Math.max(a,e.width-a),o=Math.max(r,e.height-r),l=Math.hypot(s,o)*2,n=document.createElement("span");for(n.className="fx-ripple",n.style.cssText=`left:${a}px;top:${r}px;width:${l}px;height:${l}px`,n.addEventListener("animationend",()=>n.remove()),this.#n.appendChild(n);this.#n.childElementCount>6;)this.#n.firstElementChild.remove()}#b(){requestAnimationFrame(()=>this.#x()),clearTimeout(this.#v),this.#v=setTimeout(()=>this.#x(),280)}#x(){const t=this.getAttribute("label")||"",e=this.#u||this.#t.value.length>0;if(!t||this.#r.style.display==="none"||!e){this.#e.style.setProperty("--lmx","0px"),this.#e.style.setProperty("--lmy","0px"),this.#e.style.setProperty("--lmw","0px"),this.#e.style.setProperty("--lmh","0px");return}const a=this.#r.getBoundingClientRect(),r=this.#a.getBoundingClientRect(),s=3;this.#e.style.setProperty("--lmx",`${a.left-r.left-s}px`),this.#e.style.setProperty("--lmy",`${a.top-r.top-s}px`),this.#e.style.setProperty("--lmw",`${a.width+s*2}px`),this.#e.style.setProperty("--lmh",`${a.height+s*2}px`)}#y(){let t=this.parentElement,e=null;for(;t;){const s=getComputedStyle(t).backgroundColor,o=s.match(/[\d.]+/g);if(o&&(o[3]===void 0||parseFloat(o[3])>.1)){const l=s.includes("srgb")||s.startsWith("color(");e=o.slice(0,3).map(n=>l?Number(n)*255:Number(n));break}t=t.parentElement}let a="rgba(255,255,255,0.45)",r="#ffffff";if(e){const[s,o,l]=e,i=(.299*s+.587*o+.114*l)/255>.55;a=i?"rgba(0,0,0,0.42)":"rgba(255,255,255,0.45)",r=i?"#000000":"#ffffff"}this.#s.style.setProperty("--label-color",a),this.#s.style.setProperty("--label-color-strong",r)}}customElements.define("vs-textarea",q);
