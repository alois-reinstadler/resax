const p=`
  :host { display: block; }
.skb {
  --w: 100%;
  --h: 14px;
  --r: var(--ctrl-r-sm, 6px);
  --dur: 1.4s;
  --skb-stagger: 160ms;
  --skb-base: var(--bg-elevated, #161616);
  --skb-bone: var(--vs-color, var(--border, #2a2a2a));

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 240px;
}

.skb__bone {
  display: block;
  width: var(--w);
  height: var(--h);
  border-radius: var(--r);
  background: var(--skb-bone);
}

.skb__bone--line { width: var(--w); height: var(--h); }
.skb__bone--solid { width: var(--w); height: var(--h); }

.skb--s-slow   { --dur: 2.1s; }
.skb--s-normal { --dur: 1.4s; }
.skb--s-fast   { --dur: 0.9s; }

/* ── blink: hard staggered blink (steps) ───────────────────────── */
@keyframes skb-blink {
  0%,  49% { opacity: 0.35; }
  50%, 100% { opacity: 1; }
}
.skb--a-blink .skb__bone {
  animation: skb-blink var(--dur) steps(1, end) infinite;
  animation-delay: calc(var(--i, 0) * var(--skb-stagger));
}

/* ── shapes ──────────────────────────────────────────────────── */
.skb--rect   { --h: 120px; --r: var(--ctrl-r-md, 10px); }
.skb--circle .skb__bone--solid,
.skb--avatar .skb__bone--solid {
  --w: 48px;
  --h: 48px;
  --r: 999px;
}
.skb--rect, .skb--circle, .skb--avatar { gap: 0; }

.skb--card {
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;
}
.skb__bone--avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.skb__stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
}

@media (prefers-reduced-motion: reduce) {
  .skb__bone {
    animation: none !important;
    opacity: 0.85;
  }
}
`;let b;function g(o){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=o;const e=b.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const k=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function h(o,e){const t=e?g(String(e).trim()):null;if(!t){for(const r of k)o.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),a=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(r=>Math.round(a?r*.92:r+(255-r)*.16)),n=(r,d)=>o.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])n(r,l);n("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])n(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])n(r,a?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])n(r,a?"0 0 0":"255 255 255");n("--vs-color",l),n("--vs-color-rgb",t.join(" ")),n("--vs-color-fg",a?"#0b0b0b":"#ffffff")}class u extends HTMLElement{static observedAttributes=["shape","animation","speed","count","width","height","radius","stagger","color"];#t;#r=null;#i=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=p,this.#t=document.createElement("div"),this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-busy","true"),this.#t.setAttribute("aria-label","Loading"),e.append(t,this.#t)}connectedCallback(){h(this,this.getAttribute("color")),this.#n()}attributeChangedCallback(){h(this,this.getAttribute("color")),this.#t&&this.#n()}disconnectedCallback(){}#n(){const e=(a,l)=>this.getAttribute(a)??l,t=e("shape","text"),s=Math.max(1,parseInt(e("count","3"),10)||1);(t!==this.#r||s!==this.#i)&&(this.#r=t,this.#i=s,this.#a(t,s)),this.#t.className=`skb skb--${t} skb--a-${e("animation","blink")} skb--s-${e("speed","normal")}`,this.#s("--w",this.getAttribute("width")),this.#s("--h",this.getAttribute("height")),this.#s("--r",this.getAttribute("radius"));const i=Math.max(0,parseInt(e("stagger","160"),10)||0);this.#t.style.setProperty("--skb-stagger",`${i}ms`)}#s(e,t){t?this.#t.style.setProperty(e,t):this.#t.style.removeProperty(e)}#e(e,t,s){const i=document.createElement("span");return i.className=e,i.setAttribute("aria-hidden","true"),i.style.setProperty("--i",String(t)),s&&i.style.setProperty("--w",s),i}#a(e,t){if(this.#t.textContent="",e==="card"){const s=document.createElement("span");s.className="skb__stack",s.setAttribute("aria-hidden","true"),s.append(this.#e("skb__bone skb__bone--line",1,"60%"),this.#e("skb__bone skb__bone--line",2,"90%"),this.#e("skb__bone skb__bone--line",3,"75%")),this.#t.append(this.#e("skb__bone skb__bone--avatar",0),s)}else if(e==="text")for(let s=1;s<=t;s++)this.#t.appendChild(this.#e("skb__bone skb__bone--line",s-1,s===t&&t>1?"65%":null));else this.#t.appendChild(this.#e("skb__bone skb__bone--solid",0))}}customElements.define("vs-skeleton-blink",u);
