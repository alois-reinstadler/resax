const m=`
  :host { display: inline-flex; }
  .bshim { --h:24px; --px:9px; --fs:12px; --gap:5px; --rr:999px;
    --accent:var(--inp-accent,#ededed); --ring:var(--inp-ring,255 255 255);
    --tint:var(--text-secondary,#a1a1a1); --solid-fg:var(--badge-solid-fg,#0b0b0b); --cycle:3.4s;
    position:relative; isolation:isolate; display:inline-flex; align-items:center; gap:var(--gap);
    height:var(--h); padding:0 var(--px); border:1px solid transparent; border-radius:var(--rr);
    overflow:hidden; font:inherit; font-size:var(--fs); font-weight:550; line-height:1;
    letter-spacing:.01em; white-space:nowrap; user-select:none;
    transition:border-color 200ms ease, background-color 200ms ease, color 200ms ease; }
  /* sizes */
  .bshim--sm{ --h:20px; --px:7px; --fs:11px; --gap:4px; }
  .bshim--lg{ --h:28px; --px:12px; --fs:13px; --gap:6px; }
  /* radii */
  .bshim--r-subtle{ --rr:6px; } .bshim--r-rounded{ --rr:9px; } .bshim--r-pill{ --rr:999px; }
  /* variants */
  .bshim--v-soft{ background:rgb(var(--ring)/.14); color:var(--tint); border-color:rgb(var(--ring)/.22); --sheen-c:rgb(var(--ring)/.5); }
  .bshim--v-solid{ background:rgb(var(--ring)/.92); color:var(--solid-fg); border-color:transparent; --sheen-c:rgb(255 255 255 / .55); }
  .bshim--v-outline{ background:transparent; color:var(--tint); border-color:rgb(var(--ring)/.5); --sheen-c:rgb(var(--ring)/.4); }
  /* diagonal sheen sweep — out of flow, absolutely positioned */
  .bshim__sheen{ position:absolute; top:-60%; left:0; z-index:1; width:45%; height:220%; pointer-events:none;
    transform:translateX(-260%) rotate(20deg);
    background:linear-gradient(90deg, transparent 0%, var(--sheen-c,rgb(255 255 255 / .4)) 50%, transparent 100%);
    animation:bshim-sweep var(--cycle) cubic-bezier(.3,.7,.3,1) infinite; }
  @keyframes bshim-sweep{
    0%{ transform:translateX(-260%) rotate(20deg); }
    22%{ transform:translateX(320%) rotate(20deg); }
    100%{ transform:translateX(320%) rotate(20deg); } }
  /* status dot */
  .bshim__dot{ position:relative; z-index:2; width:6px; height:6px; border-radius:999px; background:currentColor; flex:0 0 auto; }
  .bshim__label{ position:relative; z-index:2; }
  .bshim__close{ position:relative; z-index:2; display:inline-flex; align-items:center; justify-content:center;
    width:1.15em; height:1.15em; margin-right:-2px; padding:0; border:none; border-radius:999px;
    background:transparent; color:inherit; font-size:inherit; cursor:pointer; opacity:.7;
    transition:opacity 160ms ease, background-color 160ms ease; }
  .bshim__close:hover:not(:disabled){ opacity:1; background:rgb(var(--ring)/.18); }
  .bshim--v-solid .bshim__close:hover:not(:disabled){ background:rgb(0 0 0 / .18); }
  .bshim__close:focus-visible{ outline:2px solid var(--accent); outline-offset:1px; }
  .bshim__close svg{ width:100%; height:100%; }
  /* tones */
  .bshim--t-danger{ --accent:#ff6369; --ui-accent-fg: #fff; --ring:255 99 105; --tint:var(--inp-t-danger-hint,#ff8a8e); --solid-fg:#160405; }
  .bshim--t-warn{ --accent:#ffb224; --ui-accent-fg: #160f02; --ring:255 178 36; --tint:var(--inp-t-warn-hint,#f5b544); --solid-fg:#160f02; }
  .bshim--t-success{ --accent:#4cc38a; --ui-accent-fg: #fff; --ring:76 195 138; --tint:var(--inp-t-success-hint,#5fd49b); --solid-fg:#04120b; }
  /* disabled */
  .bshim.is-disabled{ opacity:.5; }
  .bshim.is-disabled .bshim__sheen{ animation:none; opacity:0; }
  .bshim.is-disabled .bshim__close{ cursor:not-allowed; }
  @media (prefers-reduced-motion:reduce){
    .bshim{ transition:none; }
    .bshim__sheen{ animation:none; opacity:0; } }
`;let b;function p(l){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=l;const i=b.fillStyle;if(i.charAt(0)==="#")return[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)];const t=i.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const g=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(l,i){const t=i?p(String(i).trim()):null;if(!t){for(const e of g)l.style.removeProperty(e);return}const n=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),o=.2126*n(t[0])+.7152*n(t[1])+.0722*n(t[2])>.45,s=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(e=>Math.round(o?e*.92:e+(255-e)*.16)),a=(e,h)=>l.style.setProperty(e,h);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(e,s);a("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(e,o?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])a(e,o?"0 0 0":"255 255 255");a("--vs-color",s),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["label","variant","size","radius","tone","dot","removable","disabled","shimmer-delay","color"];#e;#s;#i;#r;#n;#t;constructor(){super();const i=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=m,this.#e=document.createElement("span"),this.#e.className="bshim",this.#s=document.createElement("span"),this.#s.className="bshim__sheen",this.#s.setAttribute("aria-hidden","true"),this.#i=document.createElement("span"),this.#i.className="bshim__dot",this.#i.setAttribute("aria-hidden","true"),this.#r=document.createElement("span"),this.#r.className="bshim__label",this.#n=document.createElement("slot"),this.#r.append(this.#n),this.#t=document.createElement("button"),this.#t.className="bshim__close",this.#t.type="button";const n="http://www.w3.org/2000/svg",r=document.createElementNS(n,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");for(const o of["M6 6L18 18","M18 6L6 18"]){const s=document.createElementNS(n,"path");s.setAttribute("d",o),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),r.append(s)}this.#t.append(r),this.#t.addEventListener("click",()=>this.#a()),this.#e.append(this.#s,this.#i,this.#r,this.#t),i.append(t,this.#e)}connectedCallback(){d(this,this.getAttribute("color")),this.#o()}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#e&&this.#o()}#o(){const i=(s,c)=>this.getAttribute(s)??c,t=this.hasAttribute("disabled");this.#e.className=`bshim bshim--${i("size","md")} bshim--v-${i("variant","soft")} bshim--r-${i("radius","pill")} bshim--t-${i("tone","default")}${t?" is-disabled":""}`;const n=Math.max(parseFloat(i("shimmer-delay","2.4"))||0,0);this.#e.style.setProperty("--cycle",`${n+1}s`);const r=i("label","New");this.#n.textContent=r,this.#i.style.display=this.hasAttribute("dot")?"":"none";const o=this.hasAttribute("removable");this.#t.style.display=o?"":"none",this.#t.disabled=t,this.#t.setAttribute("aria-label",`Remove ${r}`)}#a(){this.hasAttribute("disabled")||this.dispatchEvent(new CustomEvent("remove",{bubbles:!0,composed:!0}))}}customElements.define("vs-badge-shimmer",f);
