const h=`
  :host { display: block; }
.skg {
  --w: 100%;
  --h: 14px;
  --r: var(--ctrl-r-sm, 6px);
  --dur: 1.4s;
  --skg-angle: 100deg;
  --skg-base: var(--bg-elevated, #161616);
  --skg-bone: var(--vs-color, var(--border, #2a2a2a));

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 240px;
}

.skg__bone {
  display: block;
  width: var(--w);
  height: var(--h);
  border-radius: var(--r);
  background: linear-gradient(
    var(--skg-angle),
    var(--skg-base) 0%,
    var(--skg-bone) 50%,
    var(--skg-base) 100%
  );
  background-size: 200% 100%;
  background-position: 0% 0%;
}

.skg__bone--line { width: var(--w); height: var(--h); }
.skg__bone--solid { width: var(--w); height: var(--h); }

.skg--s-slow   { --dur: 2.1s; }
.skg--s-normal { --dur: 1.4s; }
.skg--s-fast   { --dur: 0.9s; }

/* ── gradient: vein of color flowing horizontally ──────────────── */
@keyframes skg-flow {
  from { background-position: 200% 0%; }
  to   { background-position: -200% 0%; }
}
.skg--a-gradient .skg__bone {
  animation: skg-flow var(--dur) linear infinite;
}

/* ── shapes ──────────────────────────────────────────────────── */
.skg--rect   { --h: 120px; --r: var(--ctrl-r-md, 10px); }
.skg--circle .skg__bone--solid,
.skg--avatar .skg__bone--solid {
  --w: 48px;
  --h: 48px;
  --r: 999px;
}
.skg--rect, .skg--circle, .skg--avatar { gap: 0; }

.skg--card {
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;
}
.skg__bone--avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.skg__stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
}

@media (prefers-reduced-motion: reduce) {
  .skg__bone {
    animation: none !important;
    background-position: 50% 0%;
  }
}
`;let l;function p(a){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=a;const e=l.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function d(a,e){const t=e?p(String(e).trim()):null;if(!t){for(const r of u)a.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,g=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),n=(r,b)=>a.style.setProperty(r,b);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,g);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,o?"0 0 0":"255 255 255");n("--vs-color",g),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class f extends HTMLElement{static observedAttributes=["shape","animation","speed","count","width","height","radius","angle","color"];#t;#r=null;#i=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=h,this.#t=document.createElement("div"),this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-busy","true"),this.#t.setAttribute("aria-label","Loading"),e.append(t,this.#t)}connectedCallback(){d(this,this.getAttribute("color")),this.#n()}attributeChangedCallback(){d(this,this.getAttribute("color")),this.#t&&this.#n()}disconnectedCallback(){}#n(){const e=(o,g)=>this.getAttribute(o)??g,t=e("shape","text"),s=Math.max(1,parseInt(e("count","3"),10)||1);(t!==this.#r||s!==this.#i)&&(this.#r=t,this.#i=s,this.#o(t,s)),this.#t.className=`skg skg--${t} skg--a-${e("animation","gradient")} skg--s-${e("speed","normal")}`,this.#s("--w",this.getAttribute("width")),this.#s("--h",this.getAttribute("height")),this.#s("--r",this.getAttribute("radius"));const i=Number(e("angle","100"))||0;this.#t.style.setProperty("--skg-angle",`${i}deg`)}#s(e,t){t?this.#t.style.setProperty(e,t):this.#t.style.removeProperty(e)}#e(e,t,s){const i=document.createElement("span");return i.className=e,i.setAttribute("aria-hidden","true"),i.style.setProperty("--i",String(t)),s&&i.style.setProperty("--w",s),i}#o(e,t){if(this.#t.textContent="",e==="card"){const s=document.createElement("span");s.className="skg__stack",s.setAttribute("aria-hidden","true"),s.append(this.#e("skg__bone skg__bone--line",1,"60%"),this.#e("skg__bone skg__bone--line",2,"90%"),this.#e("skg__bone skg__bone--line",3,"75%")),this.#t.append(this.#e("skg__bone skg__bone--avatar",0),s)}else if(e==="text")for(let s=1;s<=t;s++)this.#t.appendChild(this.#e("skg__bone skg__bone--line",s-1,s===t&&t>1?"65%":null));else this.#t.appendChild(this.#e("skg__bone skg__bone--solid",0))}}customElements.define("vs-skeleton-gradient",f);
