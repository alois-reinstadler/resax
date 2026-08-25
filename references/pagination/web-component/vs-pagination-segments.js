const g="http://www.w3.org/2000/svg",p={prev:{label:"Previous page",d:"M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"},next:{label:"Next page",d:"M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008"}},b=`
  /* A shrink-to-fit host keeps the rail's intrinsic width forever: with 10+
     segments the next arrow and the counter end up outside the box. */
  :host { display: inline-flex; max-width: 100%; }
.pgs {
  --h: 34px;
  --fs: 13px;
  --barh: 6px;
  --seg-w: 26px;
  --acc: var(--vs-color, var(--text, #ededed));
  --muted: var(--text-muted, #8a8a8a);
  --ring: var(--inp-ring, 255 255 255);
  --sgap: 4px;                 /* gap between segments */
  --seg-active: 2.2;           /* width multiplier for the active one */
  /* damped spring (Apple-like): slight overshoot + micro-bounce */
  --pgs-spring: linear(
    0, 0.02, 0.08, 0.18, 0.32, 0.48, 0.64, 0.78, 0.89, 0.965,
    1.012, 1.038, 1.048, 1.045, 1.034, 1.02, 1.007, 0.998, 0.994, 0.996,
    0.999, 1
  );
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  font-family: inherit;
  font-size: var(--fs);
}
.pgs--sm { --h: 28px; --fs: 12px; --barh: 5px; --seg-w: 20px; }
.pgs--lg { --h: 42px; --fs: 14px; --barh: 8px; --seg-w: 30px; }

/* FIXED-width track (always 1 active) + anchored left → as the active one
   expands it pushes the rest without re-centering the component. */
.pgs__track {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--sgap);
  height: var(--h);
  width: calc(
    var(--seg-w) * var(--seg-active)
    + (var(--n) - 1) * var(--seg-w)
    + (var(--n) - 1) * var(--sgap)
  );
  /* The rail is the only part allowed to give: min-width:auto on a flex item is
     min-content, which here is the whole segment run, so without the 0 the track
     keeps its design width and shoves the next arrow and the counter out of the
     box. Segments squeeze first (below), and once they hit their floor the rail
     becomes a scroller instead of growing — the arrows and label never move. */
  min-width: 0;
  max-width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
}
.pgs__track::-webkit-scrollbar { width: 0; height: 0; }

.pgs__seg {
  position: relative;
  /* shrinkable, but never below a tappable dot — the shrink is weighted by the
     used width, so the current segment stays proportionally the wide head */
  flex: 0 1 auto;
  min-width: 8px;
  width: var(--seg-w);
  height: var(--barh);
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgb(var(--ring) / 0.14);
  cursor: pointer;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  /* expands/contracts with a spring → fluid push and bounce */
  transition:
    width 560ms var(--pgs-spring),
    background-color 320ms ease;
}
.pgs__seg:hover:not(:disabled):not(.is-current) { background: rgb(var(--ring) / 0.28); }
.pgs__seg:disabled { cursor: not-allowed; }
.pgs__seg:focus-visible { outline: 2px solid var(--acc); outline-offset: 3px; }

/* fill: grows from the left; cascade using --i (distance to the current) */
.pgs__fill {
  position: absolute;
  inset: 0;
  transform: scaleX(0);
  transform-origin: left center;
  border-radius: inherit;
  background: var(--acc);
  transition: transform 520ms var(--pgs-spring);
  transition-delay: calc(max(0 - var(--i), 0) * 40ms);
}
.pgs__seg.is-done .pgs__fill,
.pgs__seg.is-current .pgs__fill { transform: scaleX(1); }

/* current segment = leading head: expands with the same spring */
.pgs__seg.is-current {
  width: calc(var(--seg-w) * var(--seg-active));
}

.pgs__label {
  display: inline-flex;
  flex: none;            /* the counter is the point of the label — never squeeze it */
  align-items: baseline;
  gap: 1px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  font-weight: 560;
  user-select: none;
}
.pgs__label-sep { margin: 0 2px; opacity: 0.6; }

.pgs__nav {
  display: inline-flex;
  flex: none;            /* square hit target, kept at 34px even when the rail is starved */
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
.pgs__nav svg { width: 1em; height: 1em; }
.pgs__nav:hover:not(:disabled) { color: var(--acc); background: rgb(var(--ring) / 0.1); }
.pgs__nav:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
.pgs__nav:disabled { opacity: 0.35; cursor: not-allowed; }

.pgs.is-disabled { opacity: 0.55; pointer-events: none; }

@media (prefers-reduced-motion: reduce) {
  .pgs__seg, .pgs__fill, .pgs__nav { transition: none; }
  .pgs__fill { transition-delay: 0ms; }
}
`;let c;function m(h){if(c||=document.createElement("canvas").getContext("2d"),!c)return null;c.fillStyle="#000",c.fillStyle=h;const e=c.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const f=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(h,e){const t=e?m(String(e).trim()):null;if(!t){for(const i of f)h.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,o=`rgb(${t[0]} ${t[1]} ${t[2]})`,l=t.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),a=(i,u)=>h.style.setProperty(i,u);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(i,o);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])a(i,n?"0 0 0":"255 255 255");a("--vs-color",o),a("--vs-color-rgb",t.join(" ")),a("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class v extends HTMLElement{static observedAttributes=["total","current","page","size","tone","show-prev-next","show-label","disabled","color"];#e;#s;#i;#r;#n;#o;#l;#a=[];#h=0;#t=1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=b,this.#e=document.createElement("nav"),this.#e.className="pgs",this.#e.setAttribute("role","navigation"),this.#e.setAttribute("aria-label","Pagination"),this.#i=this.#u(p.prev),this.#r=this.#u(p.next),this.#s=document.createElement("div"),this.#s.className="pgs__track",this.#s.setAttribute("role","group"),this.#n=document.createElement("span"),this.#n.className="pgs__label",this.#n.setAttribute("aria-hidden","true"),this.#o=document.createTextNode("1");const s=document.createElement("span");s.className="pgs__label-sep",s.textContent="/",this.#l=document.createTextNode("1"),this.#n.append(this.#o,s,this.#l),this.#e.append(this.#i,this.#s,this.#r,this.#n),e.append(t,this.#e),this.#i.addEventListener("click",this.#g),this.#r.addEventListener("click",this.#p)}connectedCallback(){d(this,this.getAttribute("color")),this.#d()}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#e&&this.#d()}disconnectedCallback(){this.#i.removeEventListener("click",this.#g),this.#r.removeEventListener("click",this.#p)}get current(){return this.#t}set current(e){this.setAttribute("current",String(e|0))}get page(){return this.#t}set page(e){this.setAttribute("page",String(e|0))}#f(e,t){if(!this.hasAttribute(e))return t;const s=this.getAttribute(e);return s!=="false"&&s!=="0"}#g=()=>this.#c(this.#t-1);#p=()=>this.#c(this.#t+1);#d(){const e=Math.max(1,Math.floor(Number(this.getAttribute("total")??10))||1),t=this.getAttribute("size")||"md",s=this.getAttribute("tone")||"",r=this.hasAttribute("disabled");e!==this.#h&&(this.#h=e,this.#b(e));const n=this.getAttribute("current")??this.getAttribute("page"),o=n==null?this.#t:parseInt(n,10)||1;this.#t=Math.min(Math.max(1,o),e),this.#e.className=["pgs",`pgs--${t}`,r?"is-disabled":""].filter(Boolean).join(" "),this.#e.style.setProperty("--n",String(e)),s?this.#e.style.setProperty("--acc",`var(--${s}, var(--text, #ededed))`):this.#e.style.removeProperty("--acc");const l=this.hasAttribute("show-prev-next"),a=this.hasAttribute("show-label");this.#i.style.display=l?"":"none",this.#r.style.display=l?"":"none",this.#n.style.display=a?"":"none",this.#i.disabled=r||this.#t<=1,this.#r.disabled=r||this.#t>=e,this.#s.setAttribute("aria-label",`Page ${this.#t} of ${e}`),this.#o.data=String(this.#t),this.#l.data=String(e),this.#m(r)}#b(e){for(const t of this.#a)t.seg.remove();this.#a=[];for(let t=1;t<=e;t++){const s=document.createElement("button");s.type="button",s.className="pgs__seg",s.setAttribute("aria-label",`Page ${t}`);const r=document.createElement("span");r.className="pgs__fill",s.appendChild(r);const n=t;s.addEventListener("click",()=>this.#c(n)),this.#s.appendChild(s),this.#a.push({seg:s,fill:r})}}#m(e){for(let t=0;t<this.#a.length;t++){const s=this.#a[t].seg,r=t+1,n=r<this.#t,o=r===this.#t;s.classList.toggle("is-done",n),s.classList.toggle("is-current",o),s.style.setProperty("--i",String(r-this.#t)),s.disabled=e,o?s.setAttribute("aria-current","page"):s.removeAttribute("aria-current")}}#c(e){if(this.hasAttribute("disabled"))return;const t=Math.min(Math.max(1,e),this.#h);t!==this.#t&&(this.#t=t,this.setAttribute("current",String(t)),this.setAttribute("page",String(t)),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:{page:t}})))}#u({d:e,label:t}){const s=document.createElement("button");s.type="button",s.className="pgs__nav",s.setAttribute("aria-label",t);const r=document.createElementNS(g,"svg");r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("fill","none"),r.setAttribute("aria-hidden","true");const n=document.createElementNS(g,"path");return n.setAttribute("d",e),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","1.5"),n.setAttribute("stroke-miterlimit","10"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),r.appendChild(n),s.appendChild(r),s}}customElements.define("vs-pagination-segments",v);
