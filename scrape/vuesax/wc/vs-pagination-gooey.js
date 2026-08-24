const l="http://www.w3.org/2000/svg";const b={prev:{label:"Previous page",d:"M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"},next:{label:"Next page",d:"M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"}},A=`
  :host { display: inline-flex; }
.pgg {
  --h: 36px;
  --fs: 14px;
  --gap: 6px;
  --acc: var(--vs-color, var(--text, #ededed));
  --acc-on: var(--bg, #0a0a0a);
  --muted: var(--text-muted, #8a8a8a);
  --ring: var(--inp-ring, 255 255 255);
  /* damped spring (Apple-like): overshoot and micro-bounces as it settles */
  --pgg-spring: linear(
    0, 0.009, 0.035, 0.078, 0.135, 0.205, 0.285, 0.374, 0.469, 0.567,
    0.665, 0.759, 0.847, 0.925, 0.991, 1.043, 1.081, 1.104, 1.113, 1.109,
    1.094, 1.071, 1.043, 1.012, 0.983, 0.958, 0.94, 0.93, 0.928, 0.933,
    0.943, 0.957, 0.973, 0.988, 1.001, 1.011, 1.017, 1.019, 1.018, 1.014,
    1.009, 1.004, 1
  );
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
  font-size: var(--fs);
}
.pgg--sm { --h: 30px; --fs: 13px; --gap: 5px; }
.pgg--lg { --h: 42px; --fs: 15px; --gap: 7px; }

/* ── tones — recolor the blob + active-number text ─────────────── */
.pgg--t-primary { --acc: var(--primary, var(--ui-accent, #ededed)); --acc-on: var(--ui-accent-fg, #0b0b0b); }
.pgg--t-success { --acc: #4cc38a; --acc-on: #04120b; }
.pgg--t-warn    { --acc: #ffb224; --acc-on: #160f02; }
.pgg--t-danger  { --acc: #ff6369; --acc-on: #160405; }

.pgg__defs { position: absolute; width: 0; height: 0; }

.pgg__viewport {
  position: relative;
  overflow: hidden;
  width: calc(var(--win) * var(--h) + (var(--win) - 1) * var(--gap) + var(--padx) * 2);
  height: var(--h);
}
.pgg__track {
  position: absolute;
  top: 0;
  left: var(--padx);
  display: flex;
  gap: var(--gap);
  height: var(--h);
  will-change: transform;
  transition: transform 620ms var(--pgg-spring);
}

/* the goo layer isolates the filter so it only melts the blob */
.pgg__goo {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.pgg__blob {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--h);
  border-radius: 999px;
  background: var(--acc);
  opacity: 0;
  transition:
    transform 620ms var(--pgg-spring),
    width 620ms var(--pgg-spring),
    opacity 200ms ease;
}
.pgg__blob.is-ready { opacity: 1; }
/* subtle squash synced to the spring: backs the bounce without overdoing it */
.pgg__blob.is-wobble { animation: pgg-wobble 620ms var(--pgg-spring); }
@keyframes pgg-wobble {
  0% { scale: 1 1; }
  22% { scale: 1.05 0.96; }
  55% { scale: 0.98 1.02; }
  100% { scale: 1 1; }
}

.pgg__page {
  position: relative;
  z-index: 1;
  flex: 0 0 auto;
  width: var(--h);
  height: var(--h);
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--muted);
  font: inherit;
  font-size: var(--fs);
  font-weight: 560;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  cursor: pointer;
  border-radius: 999px;
  -webkit-tap-highlight-color: transparent;
  transition: color 260ms ease;
}
.pgg__page:hover:not(:disabled):not(.is-active) { color: var(--acc); }
.pgg__page.is-active { color: var(--acc-on); }
.pgg__page:disabled { cursor: not-allowed; }
.pgg__page:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }

.pgg__nav {
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
.pgg__nav:hover:not(:disabled) { color: var(--acc); background: rgb(var(--ring) / 0.1); }
.pgg__nav:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
.pgg__nav:disabled { opacity: 0.35; cursor: not-allowed; }
.pgg__nav svg { display: block; }

.pgg.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .pgg__track, .pgg__blob { transition: opacity 200ms ease; }
  .pgg__blob.is-wobble { animation: none; }
  .pgg__page, .pgg__nav { transition: none; }
}
`;let h;function y(g){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=g;const e=h.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function u(g,e){const t=e?y(String(e).trim()):null;if(!t){for(const n of _)g.style.removeProperty(n);return}const i=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4),s=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(n=>Math.round(s?n*.92:n+(255-n)*.16)),o=(n,p)=>g.style.setProperty(n,p);for(const n of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(n,a);o("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const n of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(n,t.join(" "));for(const n of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(n,s?"#0b0b0b":"#ffffff");for(const n of["--btn-primary-rip","--btn-primary-glow"])o(n,s?"0 0 0":"255 255 255");o("--vs-color",a),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["total","current","page","sibling-count","size","tone","show-prev-next","disabled","color"];#e;#r;#s;#i;#l;#g;#n=[];#h=0;#t=1;#a=0;#o=0;#c=0;#p=null;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=A;const i=`pgg-goo-${Math.round(Math.random()*1e9)}`;this.#e=document.createElement("nav"),this.#e.className="pgg",this.#e.setAttribute("role","navigation"),this.#e.setAttribute("aria-label","Pagination");const r=this.#y(i);this.#l=this.#m(b.prev),this.#g=this.#m(b.next),this.#r=document.createElement("div"),this.#r.className="pgg__viewport",this.#s=document.createElement("div"),this.#s.className="pgg__track";const s=document.createElement("span");s.className="pgg__goo",s.setAttribute("aria-hidden","true"),s.style.filter=`url(#${i})`,this.#i=document.createElement("span"),this.#i.className="pgg__blob",this.#i.addEventListener("animationend",()=>this.#i.classList.remove("is-wobble")),s.appendChild(this.#i),this.#s.appendChild(s),this.#r.appendChild(this.#s),this.#e.append(r,this.#l,this.#r,this.#g),e.append(t,this.#e),this.#l.addEventListener("click",()=>this.#d(this.#t-1)),this.#g.addEventListener("click",()=>this.#d(this.#t+1))}connectedCallback(){u(this,this.getAttribute("color")),this.#b(),typeof ResizeObserver<"u"&&(this.#p=new ResizeObserver(()=>this.#u()),this.#p.observe(this.#r))}disconnectedCallback(){this.#a&&cancelAnimationFrame(this.#a),this.#o&&cancelAnimationFrame(this.#o),this.#c&&cancelAnimationFrame(this.#c),this.#p?.disconnect()}attributeChangedCallback(){u(this,this.getAttribute("color")),this.#e&&this.#b()}get current(){return this.#t}set current(e){this.setAttribute("current",String(e|0))}get page(){return this.#t}set page(e){this.setAttribute("page",String(e|0))}#_(e,t){if(!this.hasAttribute(e))return t;const i=this.getAttribute(e);return i!=="false"&&i!=="0"}#b(){const e=Math.max(1,Math.floor(Number(this.getAttribute("total")??12))||1),t=Math.max(0,parseInt(this.getAttribute("sibling-count")??"1",10)||0),i=Math.max(1,t*2+1),r=this.getAttribute("size")||"md",s=this.getAttribute("tone")||"default",a=this.hasAttribute("disabled");e!==this.#h&&(this.#h=e,this.#f(e));const c=this.getAttribute("current")??this.getAttribute("page"),o=c==null?this.#t:parseInt(c,10)||1,n=Math.min(Math.max(1,o),e),p=n!==this.#t;this.#t=n;const m=n<=1,f=n>=e;this.#e.className=["pgg",`pgg--${r}`,s!=="default"?`pgg--t-${s}`:"",a?"is-disabled":""].filter(Boolean).join(" "),this.#e.style.setProperty("--win",String(i)),this.#e.style.setProperty("--padx","12px");const d=this.hasAttribute("show-prev-next");this.#l.style.display=d?"":"none",this.#g.style.display=d?"":"none",this.#l.disabled=a||m,this.#g.disabled=a||f;for(const v of this.#n)v.disabled=a;this.#v(),this.#A(p)}#f(e){for(const t of this.#n)t.remove();this.#n=[];for(let t=1;t<=e;t++){const i=document.createElement("button");i.type="button",i.className="pgg__page",i.setAttribute("aria-label",`Page ${t}`),i.textContent=String(t);const r=t;i.addEventListener("click",()=>this.#d(r)),this.#s.appendChild(i),this.#n.push(i)}}#v(){for(let e=0;e<this.#n.length;e++){const t=this.#n[e],i=e+1===this.#t;t.classList.toggle("is-active",i),i?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")}}#u(){const e=this.#n[this.#t-1],t=this.#s,i=this.#r;if(!e||!t||!i)return;const r=i.clientWidth,s=t.scrollWidth,a=e.offsetLeft+e.offsetWidth/2,c=Math.min(0,r-24-s),o=Math.max(c,Math.min(0,r/2-12-a));this.#s.style.transform=`translateX(${o}px)`,this.#i.style.transform=`translateX(${e.offsetLeft}px)`,this.#i.style.width=`${e.offsetWidth}px`,this.#i.classList.add("is-ready")}#A(e){this.#a&&cancelAnimationFrame(this.#a),this.#o&&cancelAnimationFrame(this.#o),this.#c&&cancelAnimationFrame(this.#c),this.#a=requestAnimationFrame(()=>{this.#a=0,this.#u(),e&&(this.#i.classList.remove("is-wobble"),this.#o=requestAnimationFrame(()=>{this.#o=0,this.#c=requestAnimationFrame(()=>{this.#c=0,this.isConnected&&this.#i.classList.add("is-wobble")})}))})}#d(e){if(this.hasAttribute("disabled"))return;const t=Math.min(Math.max(1,e),this.#h);t!==this.#t&&(this.#t=t,this.setAttribute("current",String(t)),this.setAttribute("page",String(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{page:t}})))}#y(e){const t=document.createElementNS(l,"svg");t.setAttribute("class","pgg__defs"),t.setAttribute("width","0"),t.setAttribute("height","0"),t.setAttribute("aria-hidden","true");const i=document.createElementNS(l,"defs"),r=document.createElementNS(l,"filter");r.setAttribute("id",e);const s=document.createElementNS(l,"feGaussianBlur");s.setAttribute("in","SourceGraphic"),s.setAttribute("stdDeviation","3"),s.setAttribute("result","b");const a=document.createElementNS(l,"feColorMatrix");return a.setAttribute("in","b"),a.setAttribute("mode","matrix"),a.setAttribute("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -13"),r.append(s,a),i.appendChild(r),t.appendChild(i),t}#m({d:e,label:t}){const i=document.createElement("button");i.type="button",i.className="pgg__nav",i.setAttribute("aria-label",t);const r=document.createElementNS(l,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width","1em"),r.setAttribute("height","1em"),r.setAttribute("aria-hidden","true");const s=document.createElementNS(l,"path");return s.setAttribute("d",e),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-miterlimit","10"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),r.appendChild(s),i.appendChild(r),i}}customElements.define("vs-pagination-gooey",x);
