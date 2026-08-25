const h=`
  :host { display: inline-flex; }
  .bglow {
    --h:24px; --px:9px; --fs:12px; --gap:5px; --rr:999px;
    --accent:var(--inp-accent,#ededed); --ring:var(--inp-ring,255 255 255);
    --tint:var(--text-secondary,#a1a1a1); --solid-fg:var(--badge-solid-fg,#0b0b0b);
    position:relative; isolation:isolate; display:inline-flex; align-items:center;
    gap:var(--gap); height:var(--h); padding:0 var(--px); border:1px solid transparent;
    border-radius:var(--rr); font:inherit; font-size:var(--fs); font-weight:550;
    line-height:1; letter-spacing:.01em; white-space:nowrap; user-select:none;
    box-shadow:0 0 8px 0 rgb(var(--ring)/.35);
    transition:border-color 200ms ease, background-color 200ms ease, color 200ms ease, box-shadow 200ms ease; }
  /* sizes */
  .bglow--sm{ --h:20px; --px:7px; --fs:11px; --gap:4px; }
  .bglow--lg{ --h:28px; --px:12px; --fs:13px; --gap:6px; }
  /* radii */
  .bglow--r-subtle{ --rr:6px; } .bglow--r-rounded{ --rr:9px; } .bglow--r-pill{ --rr:999px; }
  /* variants */
  .bglow--v-soft{ background:rgb(var(--ring)/.14); color:var(--tint); border-color:rgb(var(--ring)/.22); }
  .bglow--v-solid{ background:rgb(var(--ring)/.92); color:var(--solid-fg); border-color:transparent; }
  .bglow--v-outline{ background:transparent; color:var(--tint); border-color:rgb(var(--ring)/.5); }
  /* breathing halo — max state baked into ::after, only opacity animates (compositable) */
  .bglow.is-breathing{ box-shadow:0 0 6px 0 rgb(var(--ring)/.28); }
  .bglow.is-breathing::after{
    content:''; position:absolute; inset:0; z-index:-1; border-radius:inherit; pointer-events:none;
    box-shadow:0 0 16px 2px rgb(var(--ring)/.55); opacity:0;
    animation:bglow-breathe 2.6s ease-in-out infinite; }
  @keyframes bglow-breathe{ 0%,100%{ opacity:0; } 50%{ opacity:1; } }
  /* status dot */
  .bglow__dot{ width:6px; height:6px; border-radius:999px; background:currentColor; flex:0 0 auto; }
  .bglow__label{ position:relative; z-index:2; }
  .bglow__close{
    position:relative; display:inline-flex; align-items:center; justify-content:center;
    width:1.15em; height:1.15em; margin-right:-2px; padding:0; border:none; border-radius:999px;
    background:transparent; color:inherit; font-size:inherit; cursor:pointer; opacity:.7;
    transition:opacity 160ms ease, background-color 160ms ease; }
  .bglow__close:hover:not(:disabled){ opacity:1; background:rgb(var(--ring)/.18); }
  .bglow--v-solid .bglow__close:hover:not(:disabled){ background:rgb(0 0 0/.18); }
  .bglow__close:focus-visible{ outline:2px solid var(--accent); outline-offset:1px; }
  .bglow__close svg{ width:100%; height:100%; }
  /* tones */
  .bglow--t-danger{ --accent:#ff6369; --ui-accent-fg: #fff; --ring:255 99 105; --tint:var(--inp-t-danger-hint,#ff8a8e); --solid-fg:#160405; }
  .bglow--t-warn{ --accent:#ffb224; --ui-accent-fg: #160f02; --ring:255 178 36; --tint:var(--inp-t-warn-hint,#f5b544); --solid-fg:#160f02; }
  .bglow--t-success{ --accent:#4cc38a; --ui-accent-fg: #fff; --ring:76 195 138; --tint:var(--inp-t-success-hint,#5fd49b); --solid-fg:#04120b; }
  /* disabled */
  .bglow.is-disabled{ opacity:.5; animation:none; box-shadow:none; }
  .bglow.is-disabled::after{ display:none; }
  .bglow.is-disabled .bglow__close{ cursor:not-allowed; }
  @media (prefers-reduced-motion:reduce){
    .bglow{ transition:none; }
    .bglow.is-breathing{ animation:none; }
    .bglow.is-breathing::after{ animation:none; opacity:0; } }
`,g="http://www.w3.org/2000/svg";let a;function f(s){if(a||=document.createElement("canvas").getContext("2d"),!a)return null;a.fillStyle="#000",a.fillStyle=s;const o=a.fillStyle;if(o.charAt(0)==="#")return[parseInt(o.slice(1,3),16),parseInt(o.slice(3,5),16),parseInt(o.slice(5,7),16)];const t=o.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(s,o){const t=o?f(String(o).trim()):null;if(!t){for(const e of u)s.style.removeProperty(e);return}const r=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),i=.2126*r(t[0])+.7152*r(t[1])+.0722*r(t[2])>.45,b=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(e=>Math.round(i?e*.92:e+(255-e)*.16)),n=(e,p)=>s.style.setProperty(e,p);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(e,b);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(e,i?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])n(e,i?"0 0 0":"255 255 255");n("--vs-color",b),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","dot","removable","disabled","breathe","color"];#e;#o;#i;#r;#t;constructor(){super();const o=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=h,this.#e=document.createElement("span"),this.#o=document.createElement("span"),this.#o.className="bglow__dot",this.#o.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="bglow__label",this.#r=document.createElement("slot"),this.#i.append(this.#r),this.#t=document.createElement("button"),this.#t.className="bglow__close",this.#t.type="button";const r=document.createElementNS(g,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");for(const l of["M6 6L18 18","M18 6L6 18"]){const i=document.createElementNS(g,"path");i.setAttribute("d",l),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","1.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),r.append(i)}this.#t.append(r),this.#t.addEventListener("click",()=>this.#s()),this.#e.append(this.#o,this.#i,this.#t),o.append(t,this.#e)}connectedCallback(){d(this,this.getAttribute("color")),this.#n()}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#e&&this.#n()}#n(){const o=(i,b)=>this.getAttribute(i)??b,t=i=>this.hasAttribute(i)&&this.getAttribute(i)!=="false",r=t("disabled"),l=t("removable");this.#e.className=`bglow bglow--${o("size","md")} bglow--v-${o("variant","soft")} bglow--r-${o("radius","pill")} bglow--t-${o("tone","default")}${this.hasAttribute("breathe")?" is-breathing":""}${r?" is-disabled":""}`,this.#r.textContent=o("label","New"),this.#o.style.display=t("dot")?"":"none",this.#t.style.display=l?"":"none",this.#t.disabled=r,this.#t.setAttribute("aria-label",`Remove ${o("label","New")}`)}#s(){this.hasAttribute("disabled")||this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0}))}}customElements.define("vs-badge-glow",m);
