const f=`
  :host { display: inline-flex; }
  .roll {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --accent: var(--ui-accent, #ededed);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: var(--h);
    padding: 4px;
    border: 1px solid var(--inp-border, #2a2a2a);
    border-radius: calc(var(--r) * 1.25);
    background: var(--bg-elevated, #111);
  }
  .roll--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); }
  .roll--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: calc(var(--ctrl-fs-lg, 15px) + 1px); }

  .roll__btn {
    --bs: calc(var(--h) - 8px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--bs);
    height: var(--bs);
    flex: none;
    padding: 0;
    border: 1px solid var(--inp-border, #2a2a2a);
    border-radius: calc(var(--r) * 0.9);
    background: var(--bg-input, #0d0d0d);
    color: var(--inp-text, #ededed);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: border-color 180ms ease, background-color 180ms ease, opacity 180ms ease;
  }
  .roll__btn:hover:not(:disabled) {
    border-color: var(--inp-border-hover, #3d3d3d);
    background: var(--inp-hover-bg, rgba(255, 255, 255, 0.05));
  }
  .roll__btn:focus-visible { outline: none; border-color: var(--ui-accent, #ededed); }
  .roll__btn:disabled { opacity: 0.35; cursor: not-allowed; }
  .roll__icon {
    width: 56%;
    height: 56%;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .roll__panel {
    display: inline-flex;
    align-items: center;
    height: 1em;
    padding: 0 0.35ch;
    font-size: var(--fs);
    font-weight: 700;
    line-height: 1;
    color: var(--inp-text, #ededed);
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum' 1;
    user-select: none;
  }
  .roll__col {
    position: relative;
    display: inline-block;
    width: 1ch;
    height: 1em;
    overflow: hidden;
    text-align: center;
  }
  .roll__col--sym {
    width: 0.55ch;
    color: color-mix(in srgb, var(--ui-accent, #ededed) 70%, var(--inp-text, #ededed));
  }
  .roll__strip {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    height: 1000%;
    transition: transform 420ms cubic-bezier(0.34, 1.4, 0.5, 1);
    will-change: transform;
  }
  .roll__digit {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .roll--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; }
  .roll--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; }
  .roll--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; }

  .roll.is-disabled { opacity: 0.55; }

  @media (prefers-reduced-motion: reduce) {
    .roll__btn { transition: none; }
    .roll__strip { transition: none; }
  }
`,p="http://www.w3.org/2000/svg";function m(c){const t=document.createElementNS(p,"path");return t.setAttribute("d",c),t.setAttribute("stroke","currentColor"),t.setAttribute("stroke-width","1.5"),t.setAttribute("stroke-linecap","round"),t.setAttribute("stroke-linejoin","round"),t}function d(c){const t=document.createElementNS(p,"svg");t.setAttribute("class","roll__icon"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const e of c)t.appendChild(m(e));return t}let h;function g(c){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=c;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(c,t){const e=t?g(String(t).trim()):null;if(!e){for(const n of v)c.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),o=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,r=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(n=>Math.round(o?n*.92:n+(255-n)*.16)),l=(n,b)=>c.style.setProperty(n,b);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(n,r);l("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(n,e.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(n,o?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])l(n,o?"0 0 0":"255 255 255");l("--vs-color",r),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["value","duration","decimals","prefix","suffix","separator","min","max","step","size","tone","pad","disabled","color"];#t;#s;#i;#r;#o=[];#u=null;#a=0;#l=0;#n=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#t=document.createElement("div"),this.#t.className="roll",this.#t.setAttribute("role","spinbutton"),this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="roll__btn",this.#i.setAttribute("aria-label","Decrease"),this.#i.appendChild(d(["M6 12H18"])),this.#s=document.createElement("span"),this.#s.className="roll__panel",this.#s.setAttribute("aria-hidden","true"),this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="roll__btn",this.#r.setAttribute("aria-label","Increase"),this.#r.appendChild(d(["M6 12H18","M12 18V6"])),this.#t.append(this.#i,this.#s,this.#r),t.append(e,this.#t),this.#i.addEventListener("pointerdown",i=>{i.preventDefault(),this.#C()}),this.#r.addEventListener("pointerdown",i=>{i.preventDefault(),this.#k()});for(const i of[this.#i,this.#r])for(const s of["pointerup","pointerleave","pointercancel"])i.addEventListener(s,()=>this.#d())}connectedCallback(){u(this,this.getAttribute("color")),this.#f()}disconnectedCallback(){this.#d(),this.#n&&(cancelAnimationFrame(this.#n),this.#n=0)}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#s&&(this.#n||(this.#n=requestAnimationFrame(()=>{this.#n=0,this.#f()})))}get value(){return this.#b(this.#e("value",0))}set value(t){this.setAttribute("value",String(t))}#e(t,e){const i=this.getAttribute(t);if(i==null||i==="")return e;const s=Number(i);return Number.isFinite(s)?s:e}#p(){const t=this.getAttribute("decimals");if(t!=null&&t!=="")return Math.max(0,Math.trunc(Number(t))||0);const e=String(this.#e("step",1));return e.includes(".")?e.split(".")[1].length:0}#b(t){return Math.min(this.#e("max",100),Math.max(this.#e("min",0),t))}#v(t){const e=Math.pow(10,this.#p());return Math.round(t*e)/e}#c(){return this.value<=this.#e("min",0)}#h(){return this.value>=this.#e("max",100)}#x(t){const e=this.#p();let i=Math.abs(t).toFixed(e),[s,o]=i.split(".");const r=this.#e("pad",0);r>0&&(s=s.padStart(r,"0"));const a=this.getAttribute("separator");a&&(s=s.replace(/\B(?=(\d{3})+(?!\d))/g,a)),i=s+(o?"."+o:"");const l=t<0?"-":"";return(this.getAttribute("prefix")||"")+l+i+(this.getAttribute("suffix")||"")}#_(){const t=this.getAttribute("duration");return t==null||t===""?"":/^[0-9.]+$/.test(t)?t+"ms":t}#y(t,e){const i=document.createElement("span");if(i.className=e>=0?"roll__col":"roll__col roll__col--sym",e>=0){const s=document.createElement("span");s.className="roll__strip",s.style.transform=`translateY(${e*-10}%)`;for(let o=0;o<10;o++){const r=document.createElement("span");r.className="roll__digit",r.textContent=String(o),s.appendChild(r)}return i.appendChild(s),{el:i,strip:s}}return i.textContent=t,{el:i,strip:null}}#f(){const t=this.value,i=[...this.#x(t)].map(r=>({c:r,digit:r>="0"&&r<="9"?Number(r):-1})),s=i.map(r=>r.digit>=0?"D":"s"+r.c).join("|");if(s!==this.#u){this.#u=s,this.#s.textContent="",this.#o=i.map(a=>this.#y(a.c,a.digit));const r=document.createDocumentFragment();for(const a of this.#o)r.appendChild(a.el);this.#s.appendChild(r)}else for(let r=0;r<i.length;r++){const a=this.#o[r]&&this.#o[r].strip;a&&i[r].digit>=0&&(a.style.transform=`translateY(${i[r].digit*-10}%)`)}const o=this.#_();if(o)for(const r of this.#o)r.strip&&(r.strip.style.transitionDuration=o);this.#A(t)}#A(t){const e=(s,o)=>this.getAttribute(s)??o,i=this.hasAttribute("disabled");this.#t.className=`roll roll--${e("size","md")} roll--t-${e("tone","default")}${i?" is-disabled":""}`,this.#t.setAttribute("aria-valuenow",String(t)),this.#t.setAttribute("aria-valuemin",String(this.#e("min",0))),this.#t.setAttribute("aria-valuemax",String(this.#e("max",100))),i?this.#t.setAttribute("aria-disabled","true"):this.#t.removeAttribute("aria-disabled"),this.#i.disabled=i||this.#c(),this.#r.disabled=i||this.#h()}#w(t){const e=this.#b(this.#v(t));e!==this.value&&(this.setAttribute("value",String(e)),this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0})))}#m(t){this.hasAttribute("disabled")||this.#w(this.value+t*this.#e("step",1))}#g(t){if(this.hasAttribute("disabled"))return;this.#l=t,this.#m(t);let e=340;const i=()=>{if(this.#l===t){if(t===1&&this.#h()||t===-1&&this.#c())return this.#d();this.#m(t),e=Math.max(40,e*.8),this.#a=window.setTimeout(i,e)}};this.#a=window.setTimeout(i,e)}#d(){this.#l=0,this.#a&&(clearTimeout(this.#a),this.#a=0)}#C(){!this.hasAttribute("disabled")&&!this.#c()&&this.#g(-1)}#k(){!this.hasAttribute("disabled")&&!this.#h()&&this.#g(1)}}customElements.define("vs-number-roll-digits",x);
