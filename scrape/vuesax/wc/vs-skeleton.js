const d=`
  :host { display: block; }
.sk {
  --w: 100%;
  --h: 14px;
  --r: 6px;
  --dur: 1.4s;
  /* subtle light grey: visible over a dark surface (demo).
     Consumers can override --inp-bg to match their background. */
  --base: var(--vs-color-rgb, var(--inp-bg, 235 235 235));   /* space-separated rgb */
  --bone-a: 0.10;                        /* bone opacity */
  --bone: rgb(var(--base) / var(--bone-a));
  /* cut: how much the band carves into the bone (0-1). It is a mask,
     not a color: it reveals the backdrop → the "shadow" takes its color */
  --sk-cut: 0.85;
  /* tilt: px the notch shifts per row → band slanted across
     the group (~30deg with rows about 24px tall) */
  --sk-tilt: -20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  /* without this it collapses to 0 when the container sets no width (lines
     have no intrinsic width). Consumers may override it freely. */
  min-width: 240px;
  /* container-query: bones measure the group width (cqw) → the
     band sweeps at the same size/speed on all of them = ONE light */
  container-type: inline-size;
}

.sk__bone {
  display: block;
  width: var(--w);
  height: var(--h);
  border-radius: var(--r);
  background: var(--bone);
  position: relative;
  overflow: hidden;
}

.sk__bone--line { width: var(--w); height: var(--h); }
.sk__bone--solid { width: var(--w); height: var(--h); }

/* ── speed ───────────────────────────────────────────────────── */
.sk--s-slow   { --dur: 2.1s; }
.sk--s-normal { --dur: 1.4s; }
.sk--s-fast   { --dur: 0.9s; }

/* ── shimmer: ONE MASK-band that carves into the bone ────────────
   The bone is masked by a transparent notch that sweeps. Where the
   notch passes the bone turns transparent → the BACKDROP shows
   through (if the backdrop is purple, the "shadow" is purple).
   The mask spans the group width (100cqw) and moves in sync across
   every bone → a single coherent sweep. repeat avoids unmasked
   areas; sized in cqw only one notch is visible at a time.
   --ox offsets the bone's horizontal position inside the group. */
@keyframes sk-mask-move {
  from {
    -webkit-mask-position: calc(var(--ox, 0px) + var(--i, 0) * var(--sk-tilt)) 0;
    mask-position: calc(var(--ox, 0px) + var(--i, 0) * var(--sk-tilt)) 0;
  }
  to {
    -webkit-mask-position: calc(var(--ox, 0px) + var(--i, 0) * var(--sk-tilt) + 100cqw) 0;
    mask-position: calc(var(--ox, 0px) + var(--i, 0) * var(--sk-tilt) + 100cqw) 0;
  }
}
.sk--a-shimmer .sk__bone,
.sk--a-both .sk__bone {
  /* opaque across the whole group width except the transparent notch */
  -webkit-mask-image: linear-gradient(
    110deg,
    rgb(0 0 0 / 1) 15%,
    rgb(0 0 0 / calc(1 - var(--sk-cut))) 50%,
    rgb(0 0 0 / 1) 85%
  );
  mask-image: linear-gradient(
    110deg,
    rgb(0 0 0 / 1) 15%,
    rgb(0 0 0 / calc(1 - var(--sk-cut))) 50%,
    rgb(0 0 0 / 1) 85%
  );
  -webkit-mask-size: 100cqw 100%;
  mask-size: 100cqw 100%;
  -webkit-mask-repeat: repeat;
  mask-repeat: repeat;
}
.sk--a-shimmer .sk__bone {
  animation: sk-mask-move var(--dur) linear infinite;
}

/* ── pulse: opacity beat ─────────────────────────────────────── */
@keyframes sk-pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.45; }
}
.sk--a-pulse .sk__bone {
  animation: sk-pulse var(--dur) ease-in-out infinite;
}
/* both: sweeping mask + opacity pulse at the same time */
.sk--a-both .sk__bone {
  animation:
    sk-mask-move var(--dur) linear infinite,
    sk-pulse var(--dur) ease-in-out infinite;
}

/* ── shapes ──────────────────────────────────────────────────── */
.sk--rect   { --h: 120px; --r: 10px; }
.sk--circle .sk__bone--solid,
.sk--avatar .sk__bone--solid {
  --w: 48px;
  --h: 48px;
  --r: 999px;
}
.sk--rect, .sk--circle, .sk--avatar { gap: 0; }

/* card: horizontal layout avatar + stack */
.sk--card {
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;
}
.sk__bone--avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.sk__stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1 1 auto;
}
/* card lines sit avatar(48)+gap(14)=62px from the group edge; shift
   the band so the light crosses avatar and lines perfectly aligned */
.sk--card .sk__stack .sk__bone { --ox: -62px; }

@media (prefers-reduced-motion: reduce) {
  .sk--a-shimmer .sk__bone,
  .sk--a-pulse .sk__bone,
  .sk--a-both .sk__bone { animation-duration: 3s; }
}
`;let l;function k(o){if(l||=document.createElement("canvas").getContext("2d"),!l)return null;l.fillStyle="#000",l.fillStyle=o;const e=l.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const u=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(o,e){const t=e?k(String(e).trim()):null;if(!t){for(const i of u)o.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),n=.2126*s(t[0])+.7152*s(t[1])+.0722*s(t[2])>.45,h=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(i=>Math.round(n?i*.92:i+(255-i)*.16)),r=(i,b)=>o.style.setProperty(i,b);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])r(i,h);r("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])r(i,t.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])r(i,n?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])r(i,n?"0 0 0":"255 255 255");r("--vs-color",h),r("--vs-color-rgb",t.join(" ")),r("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class m extends HTMLElement{static observedAttributes=["shape","animation","speed","count","width","height","radius","color"];#t;#i=null;#a=0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=d,this.#t=document.createElement("div"),this.#t.setAttribute("role","status"),this.#t.setAttribute("aria-busy","true"),this.#t.setAttribute("aria-label","Loading"),e.append(t,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#r()}attributeChangedCallback(){p(this,this.getAttribute("color")),this.#t&&this.#r()}#r(){const e=(a,n)=>this.getAttribute(a)??n,t=e("shape","text"),s=Math.max(1,parseInt(e("count","3"),10)||1);(t!==this.#i||s!==this.#a)&&(this.#i=t,this.#a=s,this.#n(t,s)),this.#t.className=`sk sk--${t} sk--a-${e("animation","shimmer")} sk--s-${e("speed","normal")}`,this.#s("--w",this.getAttribute("width")),this.#s("--h",this.getAttribute("height")),this.#s("--r",this.getAttribute("radius"))}#s(e,t){t?this.#t.style.setProperty(e,t):this.#t.style.removeProperty(e)}#e(e,t,s){const a=document.createElement("span");return a.className=e,a.setAttribute("aria-hidden","true"),a.style.setProperty("--i",String(t)),s&&a.style.setProperty("--w",s),a}#n(e,t){if(this.#t.textContent="",e==="card"){const s=document.createElement("span");s.className="sk__stack",s.setAttribute("aria-hidden","true"),s.append(this.#e("sk__bone sk__bone--line",1,"60%"),this.#e("sk__bone sk__bone--line",2,"90%"),this.#e("sk__bone sk__bone--line",3,"75%")),this.#t.append(this.#e("sk__bone sk__bone--avatar",0),s)}else if(e==="text")for(let s=1;s<=t;s++)this.#t.appendChild(this.#e("sk__bone sk__bone--line",s-1,s===t&&t>1?"65%":null));else this.#t.appendChild(this.#e("sk__bone sk__bone--solid",0))}}customElements.define("vs-skeleton",m);
