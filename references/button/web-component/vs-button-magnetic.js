const m=`
  :host { display: inline-flex; }
  .bmag { --h:var(--ctrl-h-md,40px); --r:var(--ctrl-r-md,12px); --fs:var(--ctrl-fs-md,14px); --px:var(--ctrl-px-md,14px);
    position:relative; isolation:isolate; display:inline-flex; align-items:center; justify-content:center;
    height:var(--h); padding:0 var(--px); border-radius:calc(var(--r)*var(--r-mult,1)); border:1px solid transparent;
    font:inherit; font-weight:500; font-size:var(--fs); line-height:1; cursor:pointer; user-select:none; white-space:nowrap;
    -webkit-tap-highlight-color:transparent;
    /* spring: while moving we follow the cursor with a slight elastic lag;
       on leave, this same transition handles the bounce back to 0. */
    transition:transform 300ms cubic-bezier(.34,1.56,.64,1); }
  .bmag:active:not(:disabled){ transition:transform 90ms ease; }
  .bmag:disabled{ opacity:.45; cursor:not-allowed; }

  .bmag--sm{ --h:var(--ctrl-h-sm,32px); --r:var(--ctrl-r-sm,10px); --fs:var(--ctrl-fs-sm,13px); --px:var(--ctrl-px-sm,12px); }
  .bmag--md{ --h:var(--ctrl-h-md,40px); --r:var(--ctrl-r-md,12px); --fs:var(--ctrl-fs-md,14px); --px:var(--ctrl-px-md,14px); }
  .bmag--lg{ --h:var(--ctrl-h-lg,48px); --r:var(--ctrl-r-lg,14px); --fs:var(--ctrl-fs-lg,15px); --px:var(--ctrl-px-lg,18px); }

  .bmag--r-none{ --r:0px; } .bmag--r-subtle{ --r:8px; } .bmag--r-pill{ --r:999px; }
  @supports (corner-shape: squircle){ .bmag--r-squircle{ corner-shape:squircle; --r-mult:1.7; } }

  .bmag--primary{ background:var(--btn-primary-bg,#ededed); color:var(--btn-primary-fg,#000); }
  .bmag--secondary{ background:var(--btn-secondary-bg,#1a1a1a); color:var(--inp-text,#ededed); border-color:var(--inp-border,#2a2a2a); }
  .bmag--ghost{ background:transparent; color:var(--inp-text,#ededed); border-color:var(--inp-border,#2a2a2a); }

  /* soft radial glow that fades in on hover, reinforcing the pull */
  .bmag__glow{ position:absolute; inset:-1px; z-index:0; border-radius:inherit; pointer-events:none; opacity:0;
    background:radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,.18), transparent 60%);
    transition:opacity 260ms var(--ease-out,ease); }
  .bmag:hover:not(:disabled) .bmag__glow{ opacity:1; }

  .bmag__label{ position:relative; z-index:1; transition:transform 300ms cubic-bezier(.34,1.56,.64,1); }

  @media (prefers-reduced-motion:reduce){ .bmag, .bmag__label{ transition:none; } }
`;let o;function g(s){if(o||=document.createElement("canvas").getContext("2d"),!o)return null;o.fillStyle="#000",o.fillStyle=s;const r=o.fillStyle;if(r.charAt(0)==="#")return[parseInt(r.slice(1,3),16),parseInt(r.slice(3,5),16),parseInt(r.slice(5,7),16)];const t=r.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const h=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(s,r){const t=r?g(String(r).trim()):null;if(!t){for(const e of h)s.style.removeProperty(e);return}const i=e=>(e/=255,e<=.03928?e/12.92:((e+.055)/1.055)**2.4),n=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,p=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(e=>Math.round(n?e*.92:e+(255-e)*.16)),a=(e,b)=>s.style.setProperty(e,b);for(const e of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(e,p);a("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const e of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(e,t.join(" "));for(const e of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(e,n?"#0b0b0b":"#ffffff");for(const e of["--btn-primary-rip","--btn-primary-glow"])a(e,n?"0 0 0":"255 255 255");a("--vs-color",p),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["variant","size","radius","strength","label","disabled","color"];#t;#r;#e;#i;#n;#a;constructor(){super();const r=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=m,this.#t=document.createElement("button"),this.#t.type="button",this.#r=document.createElement("span"),this.#r.className="bmag__glow",this.#r.setAttribute("aria-hidden","true"),this.#e=document.createElement("span"),this.#e.className="bmag__label",this.#i=document.createElement("slot"),this.#e.appendChild(this.#i),this.#t.append(this.#r,this.#e),r.append(t,this.#t),this.#n=i=>this.#o(i),this.#a=()=>this.#l(),this.#t.addEventListener("pointermove",this.#n),this.#t.addEventListener("pointerleave",this.#a)}connectedCallback(){d(this,this.getAttribute("color")),this.#s()}disconnectedCallback(){this.#t.removeEventListener("pointermove",this.#n),this.#t.removeEventListener("pointerleave",this.#a)}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#s()}#s(){const r=(t,i)=>this.getAttribute(t)??i;this.#t.className=`bmag bmag--${r("variant","primary")} bmag--${r("size","md")} bmag--r-${r("radius","pill")}`,this.#t.disabled=this.hasAttribute("disabled"),this.#i.textContent=r("label","Button")}#o(r){if(this.#t.disabled)return;const t=this.#t.getBoundingClientRect(),i=r.clientX-t.left-t.width/2,l=r.clientY-t.top-t.height/2,n=Number(this.getAttribute("strength")??.4);this.#t.style.transform=`translate(${(i*n).toFixed(2)}px, ${(l*n).toFixed(2)}px)`,this.#e.style.transform=`translate(${(i*n*.4).toFixed(2)}px, ${(l*n*.4).toFixed(2)}px)`}#l(){this.#t.style.transform="",this.#e.style.transform=""}}customElements.define("vs-button-magnetic",f);
