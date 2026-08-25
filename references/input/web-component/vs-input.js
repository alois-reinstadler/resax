import{FX_CSS as y,attachGlow as w}from"./vs-fx.CLXiCjCI.js";const C=`
:host { display: inline-flex; }
:host([block]) { display: flex; width: 100%; }
${y}
.inp {
  --h: var(--ctrl-h-md, 40px);
  --r: var(--ctrl-r-md, 12px);
  --px: var(--ctrl-px-md, 14px);
  --fs: var(--ctrl-fs-md, 14px);
  --accent: var(--inp-accent, #ededed); /* default: focus contrasted to the theme */
  --ring: var(--inp-ring, 255 255 255); /* rgb of the ring (spaces) */
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 260px;
  font-family: inherit;
}
.inp--block { display: flex; width: 100%; min-width: 0; }
.inp--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --px: var(--ctrl-px-sm, 12px); --fs: var(--ctrl-fs-sm, 13px); }
.inp--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --px: var(--ctrl-px-lg, 18px); --fs: var(--ctrl-fs-lg, 15px); }

.inp__field {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--h);
  border-radius: var(--rr, var(--r));
  --field-bg: transparent;
  background: var(--field-bg);
  transition:
    transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 220ms ease;
}

/* reusable effects (.fx-glow / .fx-ripples from vs-fx);
   here we only adjust the shape according to the radius */
.inp__glow { --glow-ring: 1px; --glow-strength: 0.9; }
/* on focus the proximity light turns off (the accent border takes over) */
.inp.is-focused .inp__glow { opacity: 0; }
.inp--r-pill .inp__glow,
.inp--r-pill .inp__ripples { border-radius: 999px; }
@supports (corner-shape: squircle) {
  .inp--r-squircle .inp__glow,
  .inp--r-squircle .inp__ripples { corner-shape: squircle; }
}

/* border as a fieldset → the legend opens a real gap in the top line */
.inp__outline {
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
.inp--r-pill .inp__outline { border-radius: 999px; }
@supports (corner-shape: squircle) {
  .inp--r-squircle .inp__outline { corner-shape: squircle; }
}
.inp__legend {
  display: block;
  width: auto;
  max-width: 0.01px;
  height: 0; /* no height → does not shift the border (correct vertical centering) */
  padding: 0;
  font-size: calc(var(--fs) * 0.82);
  line-height: 0;
  white-space: nowrap;
  visibility: hidden; /* only reserves width → cuts the line, without painting text */
  transition: max-width 220ms cubic-bezier(0.34, 1.4, 0.5, 1);
}
.inp__legend span { display: inline-block; padding: 0 4px; }
/* the gap opens only when there is a label and it floats */
.inp.has-label.is-focused .inp__legend,
.inp.has-label.has-value .inp__legend { max-width: 100%; }

/* border states (now on the outline) */
.inp__field:hover .inp__outline { border-color: var(--inp-border-hover, #3d3d3d); }
.inp.is-focused .inp__outline { border-color: var(--accent); }

.inp__field:hover {
  --field-bg: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
}

/* radii */
.inp--r-none .inp__field { --rr: 0px; }
.inp--r-subtle .inp__field { --rr: 8px; }
.inp--r-pill .inp__field { --rr: 999px; }
@supports (corner-shape: squircle) {
  .inp--r-squircle .inp__field { corner-shape: squircle; --rr: calc(var(--r) * 1.7); }
}

.inp__control {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 0 var(--px);
  border: none;
  background: transparent;
  color: var(--inp-text, #ededed);
  font: inherit;
  font-size: var(--fs);
  outline: none;
}
.inp__control::placeholder {
  color: var(--inp-placeholder, #5a5a5a);
  /* the placeholder fades in smoothly on focus */
  transition: color 200ms ease;
}
.has-prefix .inp__control { padding-left: 4px; }

/* prefix */
.inp__prefix {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding-left: var(--px);
  color: var(--inp-prefix, #7a7a7a);
  font-size: var(--fs);
  pointer-events: none;
}

/* floating label */
.inp__label {
  position: absolute;
  z-index: 1;
  left: var(--px);
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
  color: var(--label-color, var(--inp-label, #6a6a6a));
  font-size: var(--fs);
  pointer-events: none;
  /* no background: the real gap is opened by the outline's legend */
  transition:
    transform 240ms cubic-bezier(0.34, 1.4, 0.5, 1),
    color 220ms ease;
}
.has-prefix .inp__label { left: calc(var(--px) + 1.2em); }

/* floats up on focus or with a value */
.inp.is-focused .inp__label,
.inp.has-value .inp__label {
  transform: translateY(calc(-50% - var(--h) / 2)) scale(0.82);
}
/* floated with a value (no focus): faint */
.inp.has-value .inp__label { color: var(--label-color, #8a8a8a); }
/* focused: full opacity (white or black depending on background) */
.inp.is-focused .inp__label { color: var(--label-color-strong, #ededed); }

/* actions (clear / password) */
.inp__actions {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 2px;
  padding-right: calc(var(--px) - 6px);
}
.inp__btn {
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
.inp__btn svg { width: 16px; height: 16px; }
.inp__btn:hover { background: var(--inp-btn-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--inp-text, #ededed); }
.inp__btn:active { transform: scale(0.86); }
.inp__btn--clear svg { width: 14px; height: 14px; }

/* hint */
.inp__hint {
  margin: 0;
  padding: 0 2px;
  font-size: calc(var(--fs) - 1px);
  color: var(--inp-hint, #7a7a7a);
  transition: color 200ms ease;
}

/* tones — recolor accent/ring/focus border and hint */
.inp--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
.inp--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
.inp--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }
.inp--t-danger .inp__hint { color: var(--inp-t-danger-hint, #ff8d91); }
.inp--t-warn .inp__hint { color: var(--inp-t-warn-hint, #ffce6e); }
.inp--t-success .inp__hint { color: var(--inp-t-success-hint, #79d3a6); }
/* in a non-default tone, the border at rest hints at the color */
.inp--t-danger .inp__outline { border-color: var(--inp-t-danger-rest, #5b1a1d); }
.inp--t-warn .inp__outline { border-color: var(--inp-t-warn-rest, #5a3d10); }
.inp--t-success .inp__outline { border-color: var(--inp-t-success-rest, #1b3b2a); }
/* hover tinted with the tone color (not gray) + stronger light */
.inp--t-danger .inp__glow,
.inp--t-warn .inp__glow,
.inp--t-success .inp__glow { --glow-strength: 0.7; }
.inp--t-danger .inp__field:hover,
.inp--t-warn .inp__field:hover,
.inp--t-success .inp__field:hover { --field-bg: rgb(var(--ring) / 0.07); }
/* border on hover follows the tone (not gray) */
.inp--t-danger .inp__field:hover .inp__outline,
.inp--t-warn .inp__field:hover .inp__outline,
.inp--t-success .inp__field:hover .inp__outline { border-color: rgb(var(--ring)); }

/* floating label tinted with the tone color */
.inp--t-danger .inp__label,
.inp--t-warn .inp__label,
.inp--t-success .inp__label { color: rgb(var(--ring) / 0.85); }
.inp--t-danger.is-focused .inp__label,
.inp--t-warn.is-focused .inp__label,
.inp--t-success.is-focused .inp__label { color: rgb(var(--ring)); }

/* placeholder tinted with the tone color, at placeholder opacity */
.inp--t-danger .inp__control::placeholder,
.inp--t-warn .inp__control::placeholder,
.inp--t-success .inp__control::placeholder {
  color: rgb(var(--ring) / 0.8);
}

/* disabled / readonly */
.inp.is-disabled { opacity: 0.5; }
.inp.is-disabled .inp__field { cursor: not-allowed; }
.inp.is-disabled .inp__control { cursor: not-allowed; }
.inp.is-readonly .inp__field { --field-bg: var(--inp-readonly-bg, rgba(255, 255, 255, 0.02)); }

@media (prefers-reduced-motion: reduce) {
  .inp__field,
  .inp__label,
  .inp__btn,
  .inp__control::placeholder { transition: none; }
}
`,v="http://www.w3.org/2000/svg",E=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function u(p,t){const e=document.createElementNS(v,"svg");e.setAttribute("class",p),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.setAttribute("aria-hidden","true");for(const r of t){const n=document.createElementNS(v,"path");n.setAttribute("d",r),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),e.appendChild(n)}return e}let d;function A(p){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=p;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(p,t){const e=t?A(String(t).trim()):null;if(!e){for(const i of k)p.style.removeProperty(i);return}const r=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),a=.2126*r(e[0])+.7152*r(e[1])+.0722*r(e[2])>.45,o=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(a?i*.92:i+(255-i)*.16)),s=(i,c)=>p.style.setProperty(i,c);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])s(i,o);s("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])s(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])s(i,a?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])s(i,a?"0 0 0":"255 255 255");s("--vs-color",o),s("--vs-color-rgb",e.join(" ")),s("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class M extends HTMLElement{static observedAttributes=["value","placeholder","type","disabled","readonly","size","radius","tone","label","hint","clearable","block","prefix","glow","color"];#r;#e;#b;#a;#p;#f;#o;#t;#c;#h;#i;#n;#g;#v;#d;#y;#m;#u=!1;#l=!1;#w=t=>this.#$(t);#C=t=>{t.stopPropagation(),this.#_("change")};#E=t=>this.#q(t);#A=t=>this.#B(t);#k=t=>this.#I(t);#M=()=>this.#P();#L=()=>this.#F();#N=()=>{this.#l=!this.#l,this.#s()};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=C,this.#r=document.createElement("div"),this.#r.className="inp",this.#e=document.createElement("div"),this.#e.className="inp__field",this.#b=document.createElement("span"),this.#b.className="fx-glow inp__glow",this.#b.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="fx-ripples inp__ripples",this.#a.setAttribute("aria-hidden","true"),this.#p=document.createElement("fieldset"),this.#p.className="inp__outline",this.#p.setAttribute("aria-hidden","true");const r=document.createElement("legend");r.className="inp__legend",this.#f=document.createElement("span"),r.appendChild(this.#f),this.#p.appendChild(r),this.#o=document.createElement("span"),this.#o.className="inp__prefix",this.#o.setAttribute("aria-hidden","true"),this.#t=document.createElement("input"),this.#t.className="inp__control",this.#c=document.createElement("label"),this.#c.className="inp__label",this.#h=document.createElement("div"),this.#h.className="inp__actions",this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="inp__btn inp__btn--clear",this.#i.tabIndex=-1,this.#i.setAttribute("aria-label","Clear"),this.#i.appendChild(u("",["M18 6L6 18","M6 6L18 18"])),this.#n=document.createElement("button"),this.#n.type="button",this.#n.className="inp__btn",this.#n.tabIndex=-1,this.#g=u("",["M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42004 13.9799 8.42004 11.9999C8.42004 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z","M12 20.2707C15.53 20.2707 18.82 18.1907 21.11 14.5907C22.01 13.1807 22.01 10.8107 21.11 9.4007C18.82 5.8007 15.53 3.7207 12 3.7207C8.46997 3.7207 5.17997 5.8007 2.88997 9.4007C1.98997 10.8107 1.98997 13.1807 2.88997 14.5907C5.17997 18.1907 8.46997 20.2707 12 20.2707Z"]),this.#v=u("",["M14.53 9.46992L9.47004 14.5299C8.82004 13.8799 8.42004 12.9899 8.42004 11.9999C8.42004 10.0199 10.02 8.41992 12 8.41992C12.99 8.41992 13.88 8.81992 14.53 9.46992Z","M17.82 5.77047C16.07 4.45047 14.07 3.73047 12 3.73047C8.46997 3.73047 5.17997 5.81047 2.88997 9.41047C1.98997 10.8205 1.98997 13.1905 2.88997 14.6005C3.67997 15.8405 4.59997 16.9105 5.59997 17.7705","M8.42004 19.5297C9.56004 20.0097 10.77 20.2697 12 20.2697C15.53 20.2697 18.82 18.1897 21.11 14.5897C22.01 13.1797 22.01 10.8097 21.11 9.39969C20.78 8.87969 20.42 8.38969 20.05 7.92969","M15.5099 12.6992C15.2499 14.1092 14.0999 15.2592 12.6899 15.5192","M9.47 14.5293L2 21.9993","M22 2L14.53 9.47"]),this.#n.append(this.#g,this.#v),this.#h.append(this.#i,this.#n),this.#d=document.createElement("p"),this.#d.className="inp__hint",this.#e.append(this.#b,this.#a,this.#p,this.#o,this.#t,this.#c,this.#h),this.#r.append(this.#e,this.#d),t.append(e,this.#r)}#S(){this.#z(),this.#t.addEventListener("input",this.#w),this.#t.addEventListener("change",this.#C),this.#t.addEventListener("focus",this.#E),this.#t.addEventListener("blur",this.#A),this.#e.addEventListener("pointerdown",this.#k);for(const t of["pointerup","pointerleave","pointercancel"])this.#e.addEventListener(t,this.#M);this.#i.addEventListener("click",this.#L),this.#n.addEventListener("click",this.#N)}#z(){this.#t.removeEventListener("input",this.#w),this.#t.removeEventListener("change",this.#C),this.#t.removeEventListener("focus",this.#E),this.#t.removeEventListener("blur",this.#A),this.#e.removeEventListener("pointerdown",this.#k);for(const t of["pointerup","pointerleave","pointercancel"])this.#e.removeEventListener(t,this.#M);this.#i.removeEventListener("click",this.#L),this.#n.removeEventListener("click",this.#N)}connectedCallback(){this.#S(),m(this,this.getAttribute("color")),this.#s(),this.#x(),this.#m=new MutationObserver(()=>this.#x()),this.#m.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),this.#y=w(this.#e,220,()=>this.hasAttribute("disabled")||this.hasAttribute("readonly")||this.#u||!this.hasAttribute("glow"))}disconnectedCallback(){this.#y?.(),this.#m?.disconnect(),this.#z()}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&this.#s()}get value(){return this.#t.value}set value(t){const e=t==null?"":String(t);this.#t.value!==e&&(this.#t.value=e),this.getAttribute("value")!==e&&this.setAttribute("value",e),this.#s()}focus(){this.#t.focus()}blur(){this.#t.blur()}#s(){const t=(_,x)=>this.getAttribute(_)??x,e=this.hasAttribute("disabled"),r=this.hasAttribute("readonly"),n=t("label",""),a=t("prefix",""),o=t("hint",""),l=t("type","text"),s=l==="password",i=t("value","");this.#t.value!==i&&(this.#t.value=i);const c=this.#t.value.length>0,h=s?this.#l?"text":"password":l;this.#t.type!==h&&(this.#t.type=h);const b=t("placeholder",""),f=n?this.#u?b:"":b;this.#t.getAttribute("placeholder")!==f&&this.#t.setAttribute("placeholder",f),this.#t.disabled=e,this.#t.readOnly=r,n?this.#t.setAttribute("aria-label",n):this.#t.removeAttribute("aria-label"),this.#r.className=`inp inp--${t("size","md")} inp--r-${t("radius","squircle")} inp--t-${t("tone","default")}`+(this.#u?" is-focused":"")+(e?" is-disabled":"")+(r?" is-readonly":"")+(c?" has-value":"")+(n?" has-label":"")+(a?" has-prefix":"")+(this.hasAttribute("block")?" inp--block":""),this.#c.textContent=n,this.#c.style.display=n?"":"none",this.#f.textContent=n||" ",this.#o.textContent=a,this.#o.style.display=a?"":"none";const g=this.hasAttribute("clearable")&&c&&!e&&!r;this.#i.style.display=g?"":"none",this.#n.style.display=s?"":"none",this.#n.setAttribute("aria-label",this.#l?"Hide":"Show"),this.#g.style.display=this.#l?"none":"",this.#v.style.display=this.#l?"":"none",this.#h.style.display=g||s?"":"none",this.#d.textContent=o,this.#d.style.display=o?"":"none"}#$(t){t?.stopPropagation();const e=this.#t.value;this.getAttribute("value")!==e?this.setAttribute("value",e):this.#s(),this.#_("input")}#_(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:{value:this.#t.value}}))}#q(t){this.#u=!0,this.#x(),this.#s(),this.dispatchEvent(new CustomEvent("focus",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#B(t){this.#u=!1,this.#s(),this.dispatchEvent(new CustomEvent("blur",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}#F(){this.#t.value="",this.getAttribute("value")!==""?this.setAttribute("value",""):this.#s(),this.#_("input"),this.dispatchEvent(new CustomEvent("clear",{bubbles:!0,composed:!0})),this.#t.focus()}#I(t){if(this.hasAttribute("disabled")||this.hasAttribute("readonly")||E())return;const e=this.#e.getBoundingClientRect(),r=t.clientX-e.left,n=t.clientY-e.top,a=Math.max(r,e.width-r),o=Math.max(n,e.height-n),l=Math.hypot(a,o)*2,s=document.createElement("span");for(s.className="fx-ripple",s.style.cssText=`left:${r}px;top:${n}px;width:${l}px;height:${l}px`,s.addEventListener("animationend",()=>s.remove()),this.#a.appendChild(s);this.#a.childElementCount>6;)this.#a.firstElementChild.remove();const i=Math.max(-1,Math.min(1,(r/e.width-.5)*2)),c=Math.max(-1,Math.min(1,(n/e.height-.5)*2)),h=1-.2*Math.min(Math.abs(i),Math.abs(c));this.#e.style.transform=`perspective(600px) rotateX(${(-c*5*h).toFixed(2)}deg) rotateY(${(i*8*h).toFixed(2)}deg) scale(.985)`}#P(){this.#e.style.transform=""}#x(){let t=this.parentElement,e=null;for(;t;){const a=getComputedStyle(t).backgroundColor,o=a.match(/[\d.]+/g);if(o&&(o[3]===void 0||parseFloat(o[3])>.1)){const l=a.includes("srgb")||a.startsWith("color(");e=o.slice(0,3).map(s=>l?Number(s)*255:Number(s));break}t=t.parentElement}let r="rgba(255,255,255,0.45)",n="#ffffff";if(e){const[a,o,l]=e,i=(.299*a+.587*o+.114*l)/255>.55;r=i?"rgba(0,0,0,0.42)":"rgba(255,255,255,0.45)",n=i?"#000000":"#ffffff"}this.#r.style.setProperty("--label-color",r),this.#r.style.setProperty("--label-color-strong",n)}}customElements.define("vs-input",M);
