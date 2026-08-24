const g="http://www.w3.org/2000/svg";const b=()=>typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches,d={first:{label:"First page",paths:["M18 6l-6 6 6 6M11 6l-6 6 6 6"]},prev:{label:"Previous page",paths:["M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"]},next:{label:"Next page",paths:["M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"]},last:{label:"Last page",paths:["M6 6l6 6-6 6M13 6l6 6-6 6"]}},v=`
  :host { display: inline-flex; }
.pgc {
  --h: 34px;
  --fs: 14px;
  --acc: var(--vs-color, var(--text, #ededed));
  --muted: var(--text-muted, #8a8a8a);
  --ring: var(--inp-ring, 255 255 255);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
  font-size: var(--fs);
}
.pgc--sm { --h: 28px; --fs: 13px; }
.pgc--lg { --h: 42px; --fs: 15px; }

.pgc__readout {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: var(--h);
  padding: 0 8px;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
  letter-spacing: 0.01em;
  font-weight: 600;
  user-select: none;
}
/* number viewport (same mechanism as VsNumber): absolute slot + hidden
   overflow + vertical mask that fades the cut at top/bottom */
.pgc__reel {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.5em;
  min-width: 1.1em;
  overflow: hidden;
  vertical-align: middle;
  transition: width 380ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 28%, #000 72%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, #000 28%, #000 72%, transparent 100%);
}
.pgc__cur {
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: var(--acc);
  will-change: transform, filter, opacity;
}
.pgc__sep { color: var(--muted); font-weight: 400; }
.pgc__total { color: var(--muted); }

/* roll-up: goes up (increment) — old exits upward, new enters from below */
.roll-up-enter-active,
.roll-down-enter-active {
  transition:
    transform 460ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
    filter 280ms ease,
    opacity 240ms ease;
}
.roll-up-leave-active,
.roll-down-leave-active {
  transition:
    transform 360ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)),
    filter 280ms ease,
    opacity 300ms ease;
}
.roll-up-enter-from { transform: translateY(100%); filter: blur(7px); opacity: 0; }
.roll-up-leave-to { transform: translateY(-100%); filter: blur(7px); opacity: 0; }
/* roll-down: goes down (decrement) — old exits below, new enters from above */
.roll-down-enter-from { transform: translateY(-100%); filter: blur(7px); opacity: 0; }
.roll-down-leave-to { transform: translateY(100%); filter: blur(7px); opacity: 0; }

.pgc__nav {
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
.pgc__nav:hover:not(:disabled) { color: var(--acc); background: rgb(var(--ring) / 0.1); }
.pgc__nav:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
.pgc__nav:disabled { opacity: 0.35; cursor: not-allowed; }

.pgc.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .pgc__reel { transition: none; }
  .roll-up-enter-active, .roll-up-leave-active,
  .roll-down-enter-active, .roll-down-leave-active { transition: none; }
  .roll-up-leave-active, .roll-down-leave-active { display: none; }
  .roll-up-enter-from, .roll-up-leave-to,
  .roll-down-enter-from, .roll-down-leave-to { transform: none; filter: none; }
  .pgc__cur { filter: none !important; }
  .pgc__nav { transition: none; }
}
`;let p;function y(c){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=c;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function f(c,e){const t=e?y(String(e).trim()):null;if(!t){for(const r of w)c.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,s=`rgb(${t[0]} ${t[1]} ${t[2]})`,o=t.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),l=(r,h)=>c.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(r,s);l("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])l(r,n?"0 0 0":"255 255 255");l("--vs-color",s),l("--vs-color-rgb",t.join(" ")),l("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["total","current","page","size","show-edges","disabled","color"];#e;#r;#i;#a;#o;#n;#l;#c;#s;#h=0;#t=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=v,this.#e=document.createElement("nav"),this.#e.className="pgc",this.#e.setAttribute("role","navigation"),this.#e.setAttribute("aria-label","Pagination"),this.#n=this.#d(d.first),this.#l=this.#d(d.prev),this.#c=this.#d(d.next),this.#s=this.#d(d.last),this.#r=document.createElement("span"),this.#r.className="pgc__readout",this.#r.setAttribute("aria-live","polite"),this.#i=document.createElement("span"),this.#i.className="pgc__reel";const i=document.createElement("span");i.className="pgc__sep",i.textContent="/",this.#a=document.createElement("span"),this.#a.className="pgc__total",this.#r.append(this.#i,i,this.#a),this.#e.append(this.#n,this.#l,this.#r,this.#c,this.#s),e.append(t,this.#e),this.#n.addEventListener("click",()=>this.#p(1)),this.#l.addEventListener("click",()=>this.#p(this.#t-1)),this.#c.addEventListener("click",()=>this.#p(this.#t+1)),this.#s.addEventListener("click",()=>this.#p(this.#h))}connectedCallback(){f(this,this.getAttribute("color")),this.#u()}attributeChangedCallback(){f(this,this.getAttribute("color")),this.#e&&this.#u()}get current(){return this.#t}set current(e){this.setAttribute("current",String(e|0))}get page(){return this.#t}set page(e){this.setAttribute("page",String(e|0))}#f(e,t){if(!this.hasAttribute(e))return t;const i=this.getAttribute(e);return i!=="false"&&i!=="0"}#u(){const e=Math.max(1,Math.floor(Number(this.getAttribute("total")??12))||1),t=this.getAttribute("size")||"md",i=this.hasAttribute("disabled"),a=this.#f("show-edges",!1);this.#h=e;const n=this.getAttribute("current")??this.getAttribute("page"),s=n==null?this.#t||4:parseInt(n,10)||1,o=Math.min(Math.max(1,s),e),l=this.#t===0,r=o>=this.#t?1:-1,h=!l&&o!==this.#t;this.#t=o;const u=o<=1,m=o>=e;this.#e.className=["pgc",`pgc--${t}`,i?"is-disabled":""].filter(Boolean).join(" "),this.#i.style.width=`calc(${String(o).length} * 1ch + 0.15ch)`,this.#a.textContent=String(e),this.#r.setAttribute("aria-label",`Page ${o} of ${e}`),this.#n.style.display=a?"":"none",this.#s.style.display=a?"":"none",this.#n.disabled=i||u,this.#l.disabled=i||u,this.#c.disabled=i||m,this.#s.disabled=i||m,l||!this.#o?this.#m(o,r,!1):h&&this.#m(o,r,!0)}#m(e,t,i){const a=t>=0?"roll-up":"roll-down",n=document.createElement("span");if(n.className="pgc__cur",n.textContent=String(e),!i||b()){this.#i.textContent="",this.#i.appendChild(n),this.#o=n;return}const s=this.#o;n.classList.add(`${a}-enter-from`,`${a}-enter-active`),this.#i.appendChild(n),requestAnimationFrame(()=>requestAnimationFrame(()=>{n.classList.remove(`${a}-enter-from`)})),this.#g(n,()=>n.classList.remove(`${a}-enter-active`)),s&&(s.classList.add(`${a}-leave-active`),requestAnimationFrame(()=>requestAnimationFrame(()=>{s.classList.add(`${a}-leave-to`)})),this.#g(s,()=>s.remove())),this.#o=n}#g(e,t){let i=!1;const a=s=>{s&&s.propertyName!=="transform"||i||(i=!0,clearTimeout(n),e.removeEventListener("transitionend",a),t())};e.addEventListener("transitionend",a);const n=setTimeout(a,600)}#p(e){if(this.hasAttribute("disabled"))return;const t=Math.min(Math.max(1,e),this.#h);t!==this.#t&&(this.setAttribute("current",String(t)),this.setAttribute("page",String(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{page:t}})))}#d({paths:e,label:t}){const i=document.createElement("button");i.type="button",i.className="pgc__nav",i.setAttribute("aria-label",t);const a=document.createElementNS(g,"svg");a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("width","1em"),a.setAttribute("height","1em"),a.setAttribute("aria-hidden","true");for(const n of e){const s=document.createElementNS(g,"path");s.setAttribute("d",n),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-miterlimit","10"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),a.appendChild(s)}return i.appendChild(a),i}}customElements.define("vs-pagination-compact",x);
