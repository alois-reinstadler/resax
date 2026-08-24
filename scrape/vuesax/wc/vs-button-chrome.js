try{globalThis.CSS?.registerProperty?.({name:"--chr-a",syntax:"<angle>",inherits:!0,initialValue:"0deg"})}catch{}try{globalThis.CSS?.registerProperty?.({name:"--bw",syntax:"<length>",inherits:!0,initialValue:"3px"})}catch{}try{globalThis.CSS?.registerProperty?.({name:"--chr-f",syntax:"<number>",inherits:!0,initialValue:"0"})}catch{}try{globalThis.CSS?.registerProperty?.({name:"--chr-blend",syntax:"<number>",inherits:!0,initialValue:"1"})}catch{}const w=l=>(Math.sin(l)+Math.sin(l*1.7+1.3)+Math.sin(l*2.9+2.1)+Math.sin(l*.43+4.7))/4,y=l=>.5+.5*w(l),u=new Set;let p=0;function _(l){p=0;const e=l/1e3;for(const t of u)t._step(e);u.size&&(p=requestAnimationFrame(_))}function S(l){u.add(l),p||(p=requestAnimationFrame(_))}function x(l){u.delete(l),!u.size&&p&&(cancelAnimationFrame(p),p=0)}const $=[{kind:"hi",seed:0,rate:.19,drift:26,w:16,blur:.22,gain:1},{kind:"hi",seed:2.7,rate:.13,drift:-17,w:10,blur:.14,gain:1},{kind:"hi",seed:5.1,rate:.27,drift:41,w:6,blur:.1,gain:1},{kind:"dark",seed:1.4,rate:.11,drift:-23,w:22,blur:.28,gain:1.6},{kind:"dark",seed:4.2,rate:.23,drift:33,w:11,blur:.18,gain:1.5},{kind:"prism",seed:3.3,rate:.17,drift:-29,w:1,blur:.22,gain:1,span:6,roll:.11},{kind:"prism",seed:6,rate:.09,drift:47,w:1,blur:.18,gain:1,span:4,roll:.07},{kind:"prism",seed:1.9,rate:.21,drift:-38,w:1,blur:.26,gain:1,span:8,roll:.15}],A=["var(--p-red, #ff3b30)","var(--p-orange, #ff9500)","var(--p-yellow, #ffe600)","var(--p-green, #34ff8f)","var(--p-cyan, #22e0ff)","var(--p-blue, #2b6cff)","var(--p-violet, #c04cff)","var(--p-magenta, #ff2d95)","var(--p-lime, #b6ff3d)","var(--m-hi)"],M=l=>{let e=l*1664525+1013904223>>>0;return()=>(e=e*1664525+1013904223>>>0)/4294967296};function P(l,e){const t=M(l),i=A.slice();for(let c=i.length-1;c>0;c--){const f=Math.floor(t()*(c+1));[i[c],i[f]]=[i[f],i[c]]}const h=3+Math.floor(t()*2),r=i.slice(0,h),a=r.map(()=>.15+t()*1.85),n=a.reduce((c,f)=>c+f,0),o=[],s=[],m=c=>`${c.toFixed(2)}%`,g=c=>`${(100-c).toFixed(2)}%`;let d=0;for(let c=0;c<h;c++)o.push(`${r[c]} ${m(d)}`),s.unshift(`${r[c]} ${g(d)}`),d+=a[c]/n*e;return o.push(`transparent ${m(d+e*.18)}`),s.unshift(`transparent ${g(d+e*.18)}`),`conic-gradient(from calc(var(--p, 0) * 1deg), ${o.join(", ")}, ${s.join(", ")})`}const T=`
  :host { display: inline-flex; }
  :host([block]) { display: flex; width: 100%; }
  :host([block]) .chr { width: 100%; }

  .chr {
    --h: var(--ctrl-h-md, 40px);
    --r: var(--ctrl-r-md, 12px);
    --fs: var(--ctrl-fs-md, 14px);
    --px: var(--ctrl-px-md, 14px);
    /* the metal — every stop is a token with a literal fallback, so the file is
       portable and a host page can retint the whole alloy from :root */
    --m-hi: var(--chrome-hi, #ffffff);
    --m-mid: var(--chrome-mid, #c3c9d4);
    --m-lo: var(--chrome-lo, #4a505b);
    --m-deep: var(--chrome-deep, #05070a);
    --m-cool: var(--chrome-cool, #d8e4ff);
    --m-warm: var(--chrome-warm, #ffe6cf);
    /* --bw-base is what [thickness] writes; --bw is the live value the layers
       read. Two names because the attribute lands as an inline style, which
       would otherwise outrank any rule that wants to pull on the thickness. */
    --bw: var(--bw-base, 3px);
    --prism: 1;         /* dispersion amount, overwritten by [prism] */

    /* ── hover state, all of it derived from --chr-f ──────────────────────────
       The plate is the theme's PURE ink and the label its exact opposite, so a
       dark page fills white/black-text and a light page fills black/white-text
       with no second rule and no media query. */
    --chr-f: 0;
    --fill-c: var(--chrome-fill, var(--card-ink, #ffffff));
    --fill-ink: var(--chrome-fill-ink, var(--bg, #000000));
    /* the metal holds the edge for the first half — it is still the border while
       the plate is small — then dissolves exactly as the plate arrives at it.
       The two never paint the same pixels: the plate's edge is always inside the
       rim until the rim is already gone. */
    --rim-o: clamp(0, calc((1 - var(--chr-f)) * 2), 1);
    /* the label rides the plate's own fade-in (it is already fully covered by
       it, so the swap is uniform across every glyph), just trailing it slightly
       so the last frames are settled black-on-white rather than grey-on-grey */
    --ink-t: clamp(0, calc((var(--chr-f) - .06) / .3), 1);
    --ink: color-mix(in srgb, var(--fill-ink) calc(var(--ink-t) * 100%), var(--inp-text, #ededed));
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: var(--h);
    padding: 0 var(--px);
    border: 0;
    border-radius: calc(var(--r) * var(--r-mult, 1));
    font-family: inherit;
    font-weight: 500;
    font-size: var(--fs);
    line-height: 1;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition: transform 240ms cubic-bezier(.34, 1.56, .64, 1), opacity 200ms,
      --chr-f 400ms cubic-bezier(.25, .8, .35, 1);
  }
  /* hover / keyboard focus: flood the rim inward. Keyboard gets the same state —
     the outline alone never told you the button had a filled form. */
  .chr:hover:not(:disabled),
  .chr:focus-visible:not(:disabled) { --chr-f: 1; }
  .chr:active:not(:disabled) { transform: scale(.97); }
  .chr:disabled { opacity: .45; cursor: not-allowed; }
  .chr:focus-visible { outline: 2px solid var(--inp-accent, #ededed); outline-offset: 3px; }

  /* sizes */
  .chr--sm { --h: var(--ctrl-h-sm, 32px); --r: var(--ctrl-r-sm, 10px); --fs: var(--ctrl-fs-sm, 13px); --px: var(--ctrl-px-sm, 12px); }
  .chr--md { --h: var(--ctrl-h-md, 40px); --r: var(--ctrl-r-md, 12px); --fs: var(--ctrl-fs-md, 14px); --px: var(--ctrl-px-md, 14px); }
  .chr--lg { --h: var(--ctrl-h-lg, 48px); --r: var(--ctrl-r-lg, 14px); --fs: var(--ctrl-fs-lg, 15px); --px: var(--ctrl-px-lg, 18px); }

  /* radius */
  .chr--r-none { --r: 0px; }
  .chr--r-subtle { --r: 8px; }
  .chr--r-pill { --r: 999px; }
  @supports (corner-shape: squircle) {
    .chr--r-squircle { corner-shape: squircle; --r-mult: 1.7; }
    .chr--r-squircle .chr__ring,
    .chr--r-squircle .chr__shard,
    .chr--r-squircle .chr__fill,
    .chr--r-squircle .chr__ripples { corner-shape: squircle; }
  }

  /* fills — the rim IS the component. The box stays transparent by default so
     whatever is behind (page, image, gradient) shows through the middle. */
  .chr--primary { background: transparent; color: var(--ink); }
  /* opt-in plate for when the button sits on a busy background and the label
     needs a surface to sit on */
  .chr--secondary {
    background: linear-gradient(180deg, var(--btn-secondary-bg-hover, #242424) 0%, var(--btn-secondary-bg, #1a1a1a) 100%);
    color: var(--ink);
    box-shadow: 0 1px 2px rgb(0 0 0 / .35), inset 0 1px 0 rgb(255 255 255 / .07);
  }
  /* quietest form: transparent, dimmer rim */
  .chr--ghost { background: transparent; color: var(--ink); }
  .chr--ghost { --ring-a: .8; }

  /* ── the rim ─────────────────────────────────────────────────────────────
     Every layer is the same trick: a gradient painted over the whole box, then
     masked (xor) down to a --bw ring so only the border survives. The base ring
     is the alloy; the shards on top are what move. */
  .chr__ring, .chr__shard {
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    padding: var(--bw);
    pointer-events: none;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
  }
  /* base alloy. Real chrome mirrors a sky and a ground, so it has hard horizon
     lines — the doubled stops are those mirror edges. Its own angle (--chr-a)
     is advanced by JS at a noisy, sometimes-reversing rate, never linearly. */
  .chr__ring {
    /* --ring-a is the variant's own dimming (ghost), --rim-o the hover fade */
    opacity: calc(var(--rim-o) * var(--ring-a, 1));
    background:
      conic-gradient(from var(--chr-a),
        var(--m-hi) 0%, var(--m-cool) 5%, var(--m-mid) 11%,
        var(--m-deep) 18%, var(--m-deep) 25%, var(--m-hi) 27%,
        var(--m-hi) 36%, var(--m-warm) 40%, var(--m-lo) 45%,
        var(--m-deep) 50%, var(--m-deep) 55%, var(--m-hi) 58%,
        var(--m-mid) 65%, var(--m-deep) 70%, var(--m-deep) 76%,
        var(--m-cool) 79%, var(--m-hi) 85%, var(--m-lo) 93%, var(--m-hi) 100%);
  }

  /* A shard is ONE arc centred on its own angle. Rotating the gradient (rather
     than moving its stops) is what lets an arc sit across 0° without clipping.
     --p angle · --w half-width in % of the perimeter · --o opacity — all three
     written per frame from the noise field. */
  .chr__shard {
    z-index: 2;
    /* per-frame noise gate × the hover fade — no transition of its own: --o is
       rewritten every frame anyway, and --rim-o rides --chr-f's easing */
    opacity: calc(var(--o, 0) * var(--rim-o));
    filter: blur(calc(var(--bw) * var(--b, .2)));
  }
  .chr__shard--hi {
    background:
      conic-gradient(from calc(var(--p, 0) * 1deg),
        var(--m-hi) 0%, rgb(255 255 255 / .55) calc(var(--w, 10) * .45%), transparent calc(var(--w, 10) * 1%),
        transparent calc(100% - var(--w, 10) * 1%), rgb(255 255 255 / .55) calc(100% - var(--w, 10) * .45%), var(--m-hi) 100%);
  }
  /* the blackout: same shape, dark ink. Painted straight over the alloy, which
     is what makes one side of the rim genuinely go out. */
  .chr__shard--dark {
    background:
      conic-gradient(from calc(var(--p, 0) * 1deg),
        var(--m-deep) 0%, var(--m-lo) calc(var(--w, 10) * .5%), transparent calc(var(--w, 10) * 1%),
        transparent calc(100% - var(--w, 10) * 1%), var(--m-lo) calc(100% - var(--w, 10) * .5%), var(--m-deep) 100%);
  }
  /* prismatic dispersion: polished metal splits light where it curves. NOT
     screen-blended — the alloy under these arcs is already near-white and screen
     over white stays white, so the rainbow would die exactly where the metal is
     brightest. Painted straight over, which is also what refraction looks like:
     in that arc the metal IS the colour. */
  .chr__shard--prism {
    /* full strength, never faded by the noise gate: the rainbow arcs travel but
       they don't dim — the colour is the colour */
    /* --chr-blend is the cross-fade slot: a prism arc is TWO stacked layers and a
       re-rolled palette is painted on the hidden one, then faded in. Swapping a
       conic-gradient in place would land as a visible click. The transition sits
       on that number, NOT on opacity, so the hover fade (--rim-o) stays snappy
       instead of inheriting the palette blend's 900ms. */
    opacity: calc(var(--prism, 1) * var(--chr-blend, 1) * var(--rim-o));
    transition: --chr-blend 900ms linear;
    filter: blur(calc(var(--bw) * var(--b, .2))) saturate(1.5);
    /* background is written from JS (prismArc): the palette and the band widths
       re-roll on each shard's own clock, so no two arcs share an order */
  }

  /* No @property support → --chr-a can't hold an <angle>; fall back to a static
     brushed rim and let the shards carry the motion. */
  @supports not (background: conic-gradient(from var(--chr-a), red, blue)) {
    .chr__ring { background: linear-gradient(145deg, var(--m-hi), var(--m-mid) 35%, var(--m-deep) 62%, var(--m-hi)); }
  }

  /* ── the hover plate ──────────────────────────────────────────────────────
     Grows from the centre out until its edge lands exactly where the rim was,
     and the rim dissolves as it arrives — the border hands the edge over to the
     fill instead of competing with it.
     Two earlier shapes were wrong for the SAME reason — they crossed the label
     while it was mid-flip: a ring closing inward pinches shut on the text line
     (reads as a strikethrough), and a plate blooming from the centre sweeps its
     edge across the glyphs (middle letters wash out for ~80ms).
     So the plate STARTS already covering the label — inset by the button's own
     --px, which is exactly where the text box begins — and only ever grows into
     the padding. The label is therefore over a UNIFORM background at every
     frame: it fades from rim-state to plate-state as one piece, never half on
     one and half on the other.
     clip-path (not scale) so the corners never distort into ellipses. */
  .chr__fill {
    position: absolute;
    inset: 0;
    z-index: 3;
    border-radius: inherit;
    pointer-events: none;
    background: var(--fill-c);
    clip-path: inset(
      calc(var(--px) * (1 - var(--chr-f)))
      round calc(var(--r) * var(--r-mult, 1) * (.45 + .55 * var(--chr-f)))
    );
    /* opaque well before the growth ends: the ink swap happens on a settled
       plate, the remaining travel is pure shape */
    opacity: calc(min(1, var(--chr-f) * 2.6));
  }

  .chr__label { position: relative; z-index: 5; display: inline-flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; }
  .chr__label ::slotted(svg) { width: 19px; height: 19px; display: block; }
  .chr--icon { --px: 0px; width: var(--h); gap: 0; }

  /* above the plate (z 3): a press while hovering has to ripple ON the fill,
     not under it. currentColor = --ink, so the ripple flips with the label and
     is correct on both themes without a second palette. */
  .chr__ripples { position: absolute; inset: 0; z-index: 4; border-radius: inherit; overflow: hidden; pointer-events: none; }
  .chr__ripple {
    position: absolute; border-radius: 50%; transform: translate(-50%, -50%) scale(0); opacity: 0; pointer-events: none;
    background: radial-gradient(circle,
      color-mix(in srgb, currentColor 30%, transparent) 0%,
      color-mix(in srgb, currentColor 16%, transparent) 26%,
      color-mix(in srgb, currentColor 6%, transparent) 48%, transparent 72%);
    will-change: transform, opacity;
    animation: chr-rip 760ms cubic-bezier(.22, 1, .36, 1) forwards, chr-fade 760ms cubic-bezier(.25, .1, .25, 1) forwards;
  }
  @keyframes chr-rip { from { transform: translate(-50%, -50%) scale(0); } to { transform: translate(-50%, -50%) scale(1); } }
  @keyframes chr-fade { from { opacity: .75; } to { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) {
    /* the hover STATE stays (it is information, not decoration) — only the
       travel is dropped, so the plate snaps in instead of flooding */
    .chr { transition: none; }
    .chr:active:not(:disabled) { transform: none; }
    .chr__shard { transition: none; }
    .chr__ripple { display: none; }
  }
`;let b;function C(l){if(b||=document.createElement("canvas").getContext("2d"),!b)return null;b.fillStyle="#000",b.fillStyle=l;const e=b.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const E=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function k(l,e){const t=e?C(String(e).trim()):null;if(!t){for(const s of E)l.style.removeProperty(s);return}const i=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4),r=.2126*i(t[0])+.7152*i(t[1])+.0722*i(t[2])>.45,a=`rgb(${t[0]} ${t[1]} ${t[2]})`,n=t.map(s=>Math.round(r?s*.92:s+(255-s)*.16)),o=(s,m)=>l.style.setProperty(s,m);for(const s of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(s,a);o("--btn-primary-bg-hover",`rgb(${n[0]} ${n[1]} ${n[2]})`);for(const s of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(s,t.join(" "));for(const s of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(s,r?"#0b0b0b":"#ffffff");for(const s of["--btn-primary-rip","--btn-primary-glow"])o(s,r?"0 0 0":"255 255 255");o("--vs-color",a),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class z extends HTMLElement{static observedAttributes=["label","variant","size","radius","thickness","speed","chaos","prism","icon-only","disabled","aria-label","title","color"];#e;#s;#a=[];#t;#r;#n;#i;#p=1;#m=1;#f=!0;#o=!1;#b=!1;#l=null;#u=0;#h=1;#c=!1;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=T,this.#e=document.createElement("button"),this.#e.type="button",this.#e.setAttribute("part","button");const i=r=>{const a=document.createElement("span");return a.className=r,a.setAttribute("aria-hidden","true"),a};this.#s=i("chr__ring"),this.#t=i("chr__ripples"),this.#a=$.map(r=>{const a=[i(`chr__shard chr__shard--${r.kind}`)];return r.kind==="prism"&&(a.push(i(`chr__shard chr__shard--${r.kind}`)),a[1].style.setProperty("--chr-blend","0")),{cfg:r,el:a[0],els:a,on:0,phase:null}}),this.#r=document.createElement("span"),this.#r.className="chr__label",this.#r.setAttribute("part","label"),this.#n=document.createElement("slot"),this.#r.append(this.#n);const h=i("chr__fill");this.#e.append(this.#t,this.#s,...this.#a.flatMap(r=>r.els),h,this.#r),e.append(t,this.#e),this.#e.addEventListener("pointerdown",r=>this.#v(r)),this.#e.addEventListener("pointerenter",()=>{this.#c=!0}),this.#e.addEventListener("pointerleave",()=>{this.#c=!1}),this.#b=globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1;for(const r of this.#a)for(const a of r.els)a.style.setProperty("--b",String(r.cfg.blur))}connectedCallback(){k(this,this.getAttribute("color")),this.#g(),this.#i=new IntersectionObserver(e=>{this.#f=e[e.length-1].isIntersecting,this.#d()}),this.#i.observe(this),this._step(0),this.#d()}disconnectedCallback(){this.#i?.disconnect(),this.#i=null,x(this),this.#o=!1}attributeChangedCallback(){k(this,this.getAttribute("color")),this.#e&&this.#g()}#d(){const e=this.#f&&!this.#b&&!this.hasAttribute("disabled");e!==this.#o&&(this.#o=e,e?S(this):x(this))}_step(e){const t=this.#l==null?0:Math.min(.1,Math.max(0,e-this.#l));this.#l=e,this.#h+=((this.#c?2:1)-this.#h)*Math.min(1,t*5),this.#u+=t*this.#p*1.2*this.#h;const i=this.#u,h=this.#m;for(const a of this.#a){const{cfg:n}=a;if(n.kind==="prism"){const d=Math.floor(i*n.roll+n.seed);if(d!==a.phase){const c=a.phase==null;a.phase=d;const f=n.span*(.6+.9*y(d*3.1+n.seed)),v=c?a.on:1-a.on;a.els[v].style.background=P(d*7919+n.seed*104729,f),c||(a.els[v].style.setProperty("--chr-blend","1"),a.els[a.on].style.setProperty("--chr-blend","0"),a.on=v)}}const o=i*n.rate+n.seed,s=n.seed*57+i*n.drift*(.35+.65*h)+170*h*w(o*.7+n.seed),m=n.w*(.35+1.25*y(o*1.9+2.3)),g=Math.min(1,Math.pow(y(o*1.35+n.seed*2),1.7+1.6*(1-h))*n.gain);for(const d of a.els)d.style.setProperty("--p",s.toFixed(1)),d.style.setProperty("--w",m.toFixed(2)),d.style.setProperty("--o",g.toFixed(3))}const r=i*26+45*w(i*.09);this.#s.style.setProperty("--chr-a",`${r.toFixed(1)}deg`)}#g(){const e=(h,r)=>this.getAttribute(h)??r,t=this.hasAttribute("icon-only");this.#e.className=`chr chr--${e("variant","primary")} chr--${e("size","md")} chr--r-${e("radius","squircle")}`+(t?" chr--icon":""),this.#e.disabled=this.hasAttribute("disabled"),this.#n.textContent=e("label","Button");const i=(h,r,a,n)=>{const o=Number(e(h,r));return Number.isFinite(o)?Math.max(a,Math.min(n,o)):r};this.#e.style.setProperty("--bw-base",`${i("thickness",3,1,6)}px`),this.#e.style.setProperty("--prism",`${i("prism",100,0,100)/100}`),this.#p=i("speed",100,0,400)/100,this.#m=i("chaos",70,0,100)/100;for(const h of["aria-label","title"]){const r=this.getAttribute(h);r!=null?this.#e.setAttribute(h,r):this.#e.removeAttribute(h)}this.#d()}#v(e){if(this.#e.disabled)return;const t=this.#e.getBoundingClientRect(),i=e.clientX-t.left,h=e.clientY-t.top,r=Math.max(i,t.width-i),a=Math.max(h,t.height-h),n=Math.hypot(r,a)*2,o=document.createElement("span");for(o.className="chr__ripple",o.style.cssText=`left:${i}px;top:${h}px;width:${n}px;height:${n}px`,o.addEventListener("animationend",()=>o.remove()),this.#t.appendChild(o);this.#t.childElementCount>6;)this.#t.firstElementChild.remove()}}customElements.define("vs-button-chrome",z);
