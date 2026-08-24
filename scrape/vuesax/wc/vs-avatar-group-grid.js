const u=`
  :host { display: inline-block; }
  .gridavg {
    position: relative;
    --sz: 40px;
    --fs: 15px;
    --ov: 0.38;
    --cols: 4;
    --gap: 8px;
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    isolation: isolate;
    transition: gap 420ms cubic-bezier(0.22, 1, 0.36, 1),
                grid-template-columns 420ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .gridavg--xs { --sz: 24px; --fs: 10px; }
  .gridavg--sm { --sz: 32px; --fs: 12px; }
  .gridavg--md { --sz: 40px; --fs: 15px; }
  .gridavg--lg { --sz: 56px; --fs: 20px; }
  .gridavg--xl { --sz: 80px; --fs: 28px; }
  .gridavg--ov-sm { --ov: 0.25; }
  .gridavg--ov-md { --ov: 0.38; }
  .gridavg--ov-lg { --ov: 0.52; }

  /* unfolded state: switch to a real N-column grid + gap */
  .gridavg:hover,
  .gridavg:focus-within {
    grid-auto-flow: row;
    grid-template-columns: repeat(var(--cols), var(--sz));
    gap: var(--gap);
  }

  .gridavg__item {
    position: relative;
    display: grid;
    place-items: center;
    width: var(--sz);
    height: var(--sz);
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    line-height: 0;
    -webkit-tap-highlight-color: transparent;
    margin-left: 0;
    transform: scale(1);
    overflow: hidden;
    transition: margin 420ms cubic-bezier(0.22, 1, 0.36, 1),
                width 420ms cubic-bezier(0.22, 1, 0.36, 1),
                opacity 240ms ease,
                transform 320ms cubic-bezier(0.34, 1.56, 0.5, 1);
    transition-delay: calc(var(--i) * 22ms);
  }
  /* overlap only in the collapsed state (grid-auto-flow: column) */
  .gridavg:not(:hover):not(:focus-within) .gridavg__item + .gridavg__item {
    margin-left: calc(var(--sz) * var(--ov) * -1);
  }
  .gridavg__item:hover { transform: scale(1.12); z-index: 60 !important; }

  /* Unfolding is supposed to REVEAL the group, so every member is rendered:
     the ones past max sit at zero width behind the stack while collapsed and
     open up with the grid. Without this the grid unfolded to max faces plus
     an orphaned +N chip alone on the second row. */
  .gridavg__item--extra { width: 0; opacity: 0; pointer-events: none; }
  /* same specificity as the overlap rule above, later in source — a zero-width
     item must not drag its siblings left as well. */
  .gridavg:not(:hover):not(:focus-within) .gridavg__item + .gridavg__item--extra {
    margin-left: 0;
  }
  .gridavg:hover .gridavg__item--extra,
  .gridavg:focus-within .gridavg__item--extra {
    width: var(--sz);
    opacity: 1;
    pointer-events: auto;
  }
  /* The +N chip only stands in for the hidden faces, so it leaves once they are
     on screen. It goes ABSOLUTE rather than zero-width: as a grid item it would
     still claim a cell, and whenever the member count divides evenly by --cols
     that cell is a whole empty row hanging under the grid.
     transition:none on the way out — animating a chip that has already jumped
     out of its cell just drags a ghost across the first row. */
  .gridavg:hover .gridavg__more,
  .gridavg:focus-within .gridavg__more {
    position: absolute;
    width: 0;
    opacity: 0;
    pointer-events: none;
    transition: none;
  }

  .gridavg__av {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    background: var(--vs-color, var(--bg-elevated, #161616));
    color: var(--text, #ededed);
    font-size: calc(var(--fs) * 0.9);
    font-weight: 600;
    box-shadow: 0 0 0 2px var(--bg, #000);
  }
  .gridavg__av--rounded { border-radius: 30%; }
  .gridavg__av--squircle { border-radius: 26%; }
  @supports (corner-shape: squircle) {
    .gridavg__av--squircle { corner-shape: squircle; }
  }
  .gridavg__img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .gridavg__ini { color: var(--text-secondary, #aaa); letter-spacing: -0.02em; }
  .gridavg__av--chip {
    /* --bg-card is BELOW --bg-elevated on the dark scale (and all but equal to
       the page background), so the old value made the chip vanish — only the
       bare "+N" showed. Lift it and outline it instead. */
    background: var(--vs-color, var(--bg-elevated, #161616));
    box-shadow: 0 0 0 2px var(--bg, #000), inset 0 0 0 1px var(--border, #1f1f1f);
    color: var(--text-secondary, #aaa);
    line-height: 1;
    font-size: calc(var(--fs) * 0.82);
  }

  @media (prefers-reduced-motion: reduce) {
    .gridavg,
    .gridavg__item { transition: none; }
    .gridavg__item:hover { transform: none; }
  }
`,v=[{name:"Ada Lovelace",src:"https://i.pravatar.cc/120?img=5"},{name:"Alan Turing",src:"https://i.pravatar.cc/120?img=12"},{name:"Grace Hopper",src:"https://i.pravatar.cc/120?img=32"},{name:"Linus Torvalds",src:"https://i.pravatar.cc/120?img=68"},{name:"Margaret Hamilton",src:"https://i.pravatar.cc/120?img=47"},{name:"Dennis Ritchie",src:"https://i.pravatar.cc/120?img=51"}];function f(l){return l?l.trim().split(/\s+/).slice(0,2).map(t=>t[0]?.toUpperCase()??"").join(""):"?"}let g;function b(l){if(g||=document.createElement("canvas").getContext("2d"),!g)return null;g.fillStyle="#000",g.fillStyle=l;const t=g.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const _=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(l,t){const e=t?b(String(t).trim()):null;if(!e){for(const r of _)l.style.removeProperty(r);return}const n=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),s=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,o=e.map(r=>Math.round(s?r*.92:r+(255-r)*.16)),i=(r,d)=>l.style.setProperty(r,d);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])i(r,a);i("--btn-primary-bg-hover",`rgb(${o[0]} ${o[1]} ${o[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])i(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])i(r,s?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])i(r,s?"0 0 0":"255 255 255");i("--vs-color",a),i("--vs-color-rgb",e.join(" ")),i("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["max","size","shape","overlap","cols","color"];#a;#t;#i=v;constructor(){super(),this.#a=this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=u,this.#t=document.createElement("div"),this.#t.className="gridavg",this.#a.append(t,this.#t)}connectedCallback(){m(this,this.getAttribute("color")),this.#r()}attributeChangedCallback(){m(this,this.getAttribute("color")),this.#t&&this.#r()}get items(){return this.#i}set items(t){this.#i=Array.isArray(t)?t:v,this.#t&&this.#r()}#e(t,e){return this.getAttribute(t)??e}#s(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}#r(){const t=this.#e("size","md"),e=this.#e("shape","circle"),n=this.#e("overlap","md"),c=Number(this.#e("cols","4"))||4,s=Number(this.#e("max","4"));this.#t.className=`gridavg gridavg--${t} gridavg--ov-${n}`,this.#t.style.setProperty("--cols",String(c));const a=this.#i,o=s>0?Math.min(s,a.length):a.length,i=s>0?Math.max(0,a.length-s):0,r=a.length+(i>0?1:0);for(;this.#t.childElementCount>r;)this.#t.lastElementChild.remove();for(;this.#t.childElementCount<r;)this.#t.appendChild(this.#o());const d=this.#t.children;a.forEach((p,h)=>this.#l(d[h],p,h,a.length-h,e,h>=o)),i>0&&this.#n(d[a.length],i,a.length,a.length+1,e)}#o(){const t=document.createElement("button");t.type="button",t.className="gridavg__item";const e=document.createElement("span");return e.className="gridavg__av",t.appendChild(e),t.addEventListener("click",()=>t._onClick?.()),t}#n(t,e,n,c,s){t.classList.add("gridavg__more"),t.classList.remove("gridavg__item--extra"),t.style.zIndex=String(c),t.style.setProperty("--i",String(n)),t.setAttribute("aria-label",`${e} more`),t._onClick=()=>this.#s("more");const a=t.firstElementChild;a.className=`gridavg__av gridavg__av--chip gridavg__av--${s}`,a.textContent=`+${e}`}#l(t,e,n,c,s,a){t.classList.remove("gridavg__more"),t.classList.toggle("gridavg__item--extra",!!a),t.style.zIndex=String(c),t.style.setProperty("--i",String(n)),t.setAttribute("aria-label",e.name||"Avatar"),t._onClick=()=>this.#s("item",{item:e,index:n});const o=t.firstElementChild;if(o.className=`gridavg__av gridavg__av--${s}`,e.src){let i=o.querySelector("img");i||(o.textContent="",i=document.createElement("img"),i.className="gridavg__img",o.appendChild(i)),i.getAttribute("src")!==e.src&&(i.src=e.src),i.alt=e.name||""}else{let i=o.querySelector(".gridavg__ini");i||(o.textContent="",i=document.createElement("span"),i.className="gridavg__ini",i.setAttribute("aria-hidden","true"),o.appendChild(i)),i.textContent=f(e.name)}}disconnectedCallback(){for(;this.#t.firstChild;)this.#t.firstChild.remove()}}customElements.define("vs-avatar-group-grid",y);
