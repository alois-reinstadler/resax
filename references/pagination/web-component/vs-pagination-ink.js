const f="http://www.w3.org/2000/svg";const d={first:{label:"First page",paths:["M18 6l-6 6 6 6M11 6l-6 6 6 6"]},prev:{label:"Previous page",paths:["M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"]},next:{label:"Next page",paths:["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"]},last:{label:"Last page",paths:["M6 6l6 6-6 6M13 6l6 6-6 6"]}},x=`
  :host { display: inline-flex; }
.pgi {
  --h: 34px;
  --fs: 14px;
  --gap: 2px;
  --acc: var(--vs-color, var(--text, #ededed));
  --muted: var(--text-muted, #8a8a8a);
  --ring: var(--inp-ring, 255 255 255);
  /* soft spring (Apple-like): slight overshoot + micro-bounce, not overdone */
  --pgi-spring: linear(
    0, 0.02, 0.08, 0.18, 0.32, 0.48, 0.64, 0.78, 0.89, 0.965,
    1.012, 1.038, 1.048, 1.045, 1.034, 1.02, 1.007, 0.998, 0.994, 0.996,
    0.999, 1
  );
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
  font-size: var(--fs);
}
.pgi--sm { --h: 28px; --fs: 13px; }
.pgi--lg { --h: 40px; --fs: 15px; }

/* ── carousel window ──────────────────────────────────────── */
.pgi__viewport {
  position: relative;
  overflow: hidden;
  width: calc(var(--win) * var(--slot) + (var(--win) - 1) * var(--gap) + var(--padx) * 2);
  height: var(--h);
  --slot: calc(var(--h) + 8px);
  /* side mask: numbers fade as they enter/leave, with no hard cutoff */
  --fade: calc(var(--slot) * 0.9);
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 var(--fade),
    #000 calc(100% - var(--fade)),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 var(--fade),
    #000 calc(100% - var(--fade)),
    transparent 100%
  );
}
.pgi__track {
  position: absolute;
  top: 0;
  left: var(--padx);
  display: flex;
  gap: var(--gap);
  height: var(--h);
  will-change: transform;
  transition: transform 560ms var(--pgi-spring);
}

/* number (slot wide enough for 2-3 digits) */
.pgi__num {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: calc(var(--h) + 8px);
  height: var(--h);
  padding: 0 6px;
  border: 0;
  background: transparent;
  color: var(--muted);
  font: inherit;
  font-size: var(--fs);
  font-weight: 520;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  cursor: pointer;
  border-radius: 8px;
  -webkit-tap-highlight-color: transparent;
  transition: color 240ms ease;
}
.pgi__num:hover:not(:disabled):not(.is-active) { color: var(--acc); }
.pgi__num.is-active { color: var(--acc); font-weight: 640; }
.pgi__num:disabled { cursor: not-allowed; }
.pgi__num:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }

/* ink bar under the active number, inside the track (slides along with it) */
.pgi__ink {
  position: absolute;
  left: 0;
  bottom: 1px;
  height: 2.5px;
  border-radius: 999px;
  background: var(--acc);
  opacity: 0;
  pointer-events: none;
  z-index: 0;
  transition:
    transform 560ms var(--pgi-spring),
    width 560ms var(--pgi-spring),
    opacity 200ms ease;
}
.pgi__ink.is-ready { opacity: 1; }

.pgi__nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--h);
  height: var(--h);
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--muted);
  font-size: var(--fs);
  cursor: pointer;
  transition: color 200ms ease, background-color 200ms ease;
  -webkit-tap-highlight-color: transparent;
}
.pgi__nav:hover:not(:disabled) { color: var(--acc); background: rgb(var(--ring) / 0.1); }
.pgi__nav:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
.pgi__nav:disabled { opacity: 0.35; cursor: not-allowed; }

.pgi.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .pgi__track,
  .pgi__ink { transition: opacity 200ms ease; }
  .pgi__ink.is-pop { animation: none; }
  .pgi__num, .pgi__nav { transition: none; }
}
`;let p;function y(c){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=c;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const A=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(c,e){const t=e?y(String(e).trim()):null;if(!t){for(const s of A)c.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),r=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,n=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(s=>Math.round(r?s*.92:s+(255-s)*.16)),a=(s,h)=>c.style.setProperty(s,h);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(s,n);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(s,r?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])a(s,r?"0 0 0":"255 255 255");a("--vs-color",n),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["total","current","page","sibling-count","size","show-prev-next","show-edges","disabled","color"];#i;#r;#s;#t;#o;#l;#c;#h;#n=[];#d=0;#e=1;#a=0;#u=null;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=x,this.#i=document.createElement("nav"),this.#i.className="pgi",this.#i.setAttribute("role","navigation"),this.#i.setAttribute("aria-label","Pagination"),this.#o=this.#g(d.first),this.#l=this.#g(d.prev),this.#c=this.#g(d.next),this.#h=this.#g(d.last),this.#r=document.createElement("div"),this.#r.className="pgi__viewport",this.#s=document.createElement("div"),this.#s.className="pgi__track",this.#t=document.createElement("span"),this.#t.className="pgi__ink",this.#t.setAttribute("aria-hidden","true"),this.#t.addEventListener("animationend",()=>this.#t.classList.remove("is-pop")),this.#s.appendChild(this.#t),this.#r.appendChild(this.#s),this.#i.append(this.#o,this.#l,this.#r,this.#c,this.#h),e.append(t,this.#i),this.#o.addEventListener("click",()=>this.#p(1)),this.#l.addEventListener("click",()=>this.#p(this.#e-1)),this.#c.addEventListener("click",()=>this.#p(this.#e+1)),this.#h.addEventListener("click",()=>this.#p(this.#d))}connectedCallback(){m(this,this.getAttribute("color")),this.#b(),typeof ResizeObserver<"u"&&(this.#u=new ResizeObserver(()=>this.#f()),this.#u.observe(this.#r))}disconnectedCallback(){this.#a&&cancelAnimationFrame(this.#a),this.#u?.disconnect()}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#i&&this.#b()}get current(){return this.#e}set current(e){this.setAttribute("current",String(e|0))}get page(){return this.#e}set page(e){this.setAttribute("page",String(e|0))}#m(e,t){if(!this.hasAttribute(e))return t;const i=this.getAttribute(e);return i!=="false"&&i!=="0"}#b(){const e=Math.max(1,Math.floor(Number(this.getAttribute("total")??12))||1),t=Math.max(0,parseInt(this.getAttribute("sibling-count")??"1",10)||0),i=Math.max(1,t*2+1),o=this.getAttribute("size")||"md",r=this.hasAttribute("disabled");e!==this.#d&&(this.#d=e,this.#v(e));const n=this.getAttribute("current")??this.getAttribute("page"),l=n==null?this.#e:parseInt(n,10)||1,a=Math.min(Math.max(1,l),e),s=a!==this.#e;this.#e=a;const h=a<=1,g=a>=e;this.#i.className=["pgi",`pgi--${o}`,r?"is-disabled":"",h||g?"is-edge":""].filter(Boolean).join(" "),this.#i.style.setProperty("--win",String(i)),this.#i.style.setProperty("--padx","10px");const u=this.hasAttribute("show-prev-next"),b=this.#m("show-edges",!1);this.#o.style.display=b?"":"none",this.#h.style.display=b?"":"none",this.#l.style.display=u?"":"none",this.#c.style.display=u?"":"none",this.#o.disabled=r||h,this.#l.disabled=r||h,this.#c.disabled=r||g,this.#h.disabled=r||g;for(const v of this.#n)v.disabled=r;this.#x(),this.#y(s)}#v(e){for(const t of this.#n)t.remove();this.#n=[];for(let t=1;t<=e;t++){const i=document.createElement("button");i.type="button",i.className="pgi__num",i.setAttribute("aria-label",`Page ${t}`),i.textContent=String(t);const o=t;i.addEventListener("click",()=>this.#p(o)),this.#s.appendChild(i),this.#n.push(i)}}#x(){for(let e=0;e<this.#n.length;e++){const t=this.#n[e],i=e+1===this.#e;t.classList.toggle("is-active",i),i?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")}}#f(){const e=this.#n[this.#e-1],t=this.#s,i=this.#r;if(!e||!t||!i)return;const o=i.clientWidth,r=t.scrollWidth,n=e.offsetLeft+e.offsetWidth/2,l=Math.min(0,o-20-r),a=Math.max(l,Math.min(0,o/2-10-n));this.#s.style.transform=`translateX(${a}px)`,this.#t.style.transform=`translateX(${e.offsetLeft}px)`,this.#t.style.width=`${e.offsetWidth}px`,this.#t.classList.add("is-ready")}#y(e){this.#a&&cancelAnimationFrame(this.#a),this.#a=requestAnimationFrame(()=>{this.#a=0,this.#f(),e&&(this.#t.classList.remove("is-pop"),requestAnimationFrame(()=>requestAnimationFrame(()=>{this.isConnected&&this.#t.classList.add("is-pop")})))})}#p(e){if(this.hasAttribute("disabled"))return;const t=Math.min(Math.max(1,e),this.#d);t!==this.#e&&(this.#e=t,this.setAttribute("current",String(t)),this.setAttribute("page",String(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{page:t}})))}#g({paths:e,label:t}){const i=document.createElement("button");i.type="button",i.className="pgi__nav",i.setAttribute("aria-label",t);const o=document.createElementNS(f,"svg");o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("width","1em"),o.setAttribute("height","1em"),o.setAttribute("aria-hidden","true");for(const r of e){const n=document.createElementNS(f,"path");n.setAttribute("d",r),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-miterlimit","10"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),o.appendChild(n)}return i.appendChild(o),i}}customElements.define("vs-pagination-ink",_);
