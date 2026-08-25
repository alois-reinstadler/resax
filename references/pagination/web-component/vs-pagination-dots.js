const h="http://www.w3.org/2000/svg",p={prev:{label:"Previous page",d:"M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"},next:{label:"Next page",d:"M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"}},b=`
  :host { display: inline-flex; }
.pgd {
  --h: 34px;          /* hit-area height */
  --dot: 8px;         /* dot diameter */
  --pill: 26px;       /* active pill width */
  --fs: 14px;
  --gap: 5px;         /* tight, but with room for the push */
  --acc: var(--vs-color, var(--text, #ededed));
  --muted: var(--text-muted, #8a8a8a);
  --ring: var(--inp-ring, 255 255 255);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
}
.pgd--sm { --h: 28px; --dot: 7px; --pill: 22px; --gap: 4px; --fs: 13px; }
.pgd--lg { --h: 42px; --dot: 10px; --pill: 32px; --gap: 6px; --fs: 15px; }

/* FIXED-width track: there is always 1 pill + (n-1) dots, so the width never
   depends on which one is active → .pgd never re-centers (no wobble).
   Dots are anchored to the left: as the active one expands it pushes the ones
   to its right; the overshoot spills out without moving the left edge. */
.pgd__track {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap);
  height: var(--h);
  width: calc(var(--pill) + (var(--n) - 1) * (var(--dot) + var(--gap)));
}

/* dot → pill: animates its own width, pushing the neighbours (reflow).
   Strong overshoot in the bezier = elastic bounce. */
.pgd__dot {
  position: relative;
  flex: 0 0 auto;
  width: var(--dot);
  height: var(--dot);
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--muted);
  opacity: 0.45;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    width 520ms cubic-bezier(0.34, 1.8, 0.5, 1),
    background-color 320ms ease,
    opacity 320ms ease;
}
.pgd__dot:hover:not(:disabled):not(.is-active) { opacity: 0.8; }
.pgd__dot.is-active {
  width: var(--pill);
  background: var(--acc);
  opacity: 1;
  box-shadow: 0 0 10px rgb(var(--ring) / 0.3);
}
.pgd__dot:disabled { cursor: not-allowed; }
.pgd__dot:focus-visible { outline: 2px solid var(--acc); outline-offset: 3px; }

/* hit area = row height, width of the dot/pill itself (no overlap) */
.pgd__hit {
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + var(--gap));
  height: var(--h);
  transform: translate(-50%, -50%);
}

.pgd__nav {
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
.pgd__nav:hover:not(:disabled) { color: var(--acc); background: rgb(var(--ring) / 0.1); }
.pgd__nav:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
.pgd__nav:disabled { opacity: 0.35; cursor: not-allowed; }
.pgd__nav svg { display: block; }

.pgd.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .pgd__dot { transition: background-color 200ms ease, opacity 200ms ease; }
  .pgd__nav { transition: none; }
}
`;let c;function v(a){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=a;const e=c.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function g(a,e){const t=e?v(String(e).trim()):null;if(!t){for(const r of f)a.style.removeProperty(r);return}const i=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),s=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,d=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(r=>Math.round(s?r*.92:r+(255-r)*.16)),o=(r,u)=>a.style.setProperty(r,u);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,d);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,s?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,s?"0 0 0":"255 255 255");o("--vs-color",d),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["total","current","page","size","show-prev-next","disabled","color"];#e;#n;#r;#s;#i=[];#o=0;#t=1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=b,this.#e=document.createElement("nav"),this.#e.className="pgd",this.#e.setAttribute("role","navigation"),this.#e.setAttribute("aria-label","Pagination"),this.#r=this.#c(p.prev),this.#s=this.#c(p.next),this.#n=document.createElement("div"),this.#n.className="pgd__track",this.#e.append(this.#r,this.#n,this.#s),e.append(t,this.#e),this.#r.addEventListener("click",()=>this.#a(this.#t-1)),this.#s.addEventListener("click",()=>this.#a(this.#t+1))}connectedCallback(){g(this,this.getAttribute("color")),this.#l()}attributeChangedCallback(){g(this,this.getAttribute("color")),this.#e&&this.#l()}get current(){return this.#t}set current(e){this.setAttribute("current",String(e|0))}get page(){return this.#t}set page(e){this.setAttribute("page",String(e|0))}#p(e,t){if(!this.hasAttribute(e))return t;const i=this.getAttribute(e);return i!=="false"&&i!=="0"}#l(){const e=Math.max(1,Math.floor(Number(this.getAttribute("total")??6))||1),t=this.getAttribute("size")||"md",i=this.hasAttribute("disabled");e!==this.#o&&(this.#o=e,this.#d(e));const n=this.getAttribute("current")??this.getAttribute("page"),s=n==null?this.#t:parseInt(n,10)||1;this.#t=Math.min(Math.max(1,s),e);const d=this.#t<=1,l=this.#t>=e;this.#e.className=["pgd",`pgd--${t}`,i?"is-disabled":""].filter(Boolean).join(" "),this.#e.style.setProperty("--n",String(e));const o=this.hasAttribute("show-prev-next");this.#r.style.display=o?"":"none",this.#s.style.display=o?"":"none",this.#r.disabled=i||d,this.#s.disabled=i||l;for(const{btn:r}of this.#i)r.disabled=i;this.#h()}#d(e){for(const t of this.#i)t.btn.remove();this.#i=[];for(let t=1;t<=e;t++){const i=document.createElement("button");i.type="button",i.className="pgd__dot",i.setAttribute("aria-label",`Page ${t}`);const n=document.createElement("span");n.className="pgd__hit",i.appendChild(n);const s=t;i.addEventListener("click",()=>this.#a(s)),this.#n.appendChild(i),this.#i.push({btn:i})}}#h(){for(let e=0;e<this.#i.length;e++){const t=this.#i[e].btn,i=e+1===this.#t;t.classList.toggle("is-active",i),i?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")}}#a(e){if(this.hasAttribute("disabled"))return;const t=Math.min(Math.max(1,e),this.#o);t!==this.#t&&(this.#t=t,this.setAttribute("current",String(t)),this.setAttribute("page",String(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{page:t}})))}#c({d:e,label:t}){const i=document.createElement("button");i.type="button",i.className="pgd__nav",i.setAttribute("aria-label",t);const n=document.createElementNS(h,"svg");n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width","1em"),n.setAttribute("height","1em"),n.setAttribute("aria-hidden","true");const s=document.createElementNS(h,"path");return s.setAttribute("d",e),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-miterlimit","10"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),n.appendChild(s),i.appendChild(n),i}}customElements.define("vs-pagination-dots",m);
