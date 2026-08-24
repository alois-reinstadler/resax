const h=[{label:"Overview",value:"overview"},{label:"Activity",value:"activity"},{label:"Settings",value:"settings"},{label:"Members",value:"members",disabled:!0}],u=96,m=`
  :host { display: inline-flex; max-width: 100%; }
  :host([block]) { display: flex; width: 100%; }
  .tabs {
    --fs: var(--ctrl-fs-md, 14px);
    --h: var(--ctrl-h-md, 40px);
    --pad: 5px;
    --gap: 2px;
    --tab-px: 14px;
    --r: var(--ctrl-r-md, 12px);
    /* tab/pill radius — default pill (height/2). radius overrides it. */
    --tr: calc(var(--h) / 2);
    /* tone accent */
    --acc: var(--t-acc, #ededed);
    --acc-on: var(--t-on, #000);
    /* water-drop ripple color — black on dark theme, white on light (override below) */
    --drop-rgb: 10 10 10;
    /* segmented "knob" surface (solid/pill, default tone) — clean, not an inverted
       fill. Track is a muted surface, the knob is an elevated card, the icon keeps
       its normal outline color. Light theme overrides these below. */
    --seg-track: var(--bg-elevated, #111111);
    --seg-track-border: var(--border, #1f1f1f);
    --seg-knob: #2c2c2f;
    --seg-knob-fg: var(--text, #ededed);
    --seg-knob-shadow: 0 1px 2px rgba(0, 0, 0, 0.09), 0 1px 1px rgba(0, 0, 0, 0.06);
    --seg-knob-ring: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
    display: inline-flex;
    font-family: inherit;
    font-size: var(--fs);
    max-width: 100%;
  }
  .tabs--block { display: flex; width: 100%; }

  .tabs__list {
    position: relative;
    display: inline-flex;
    gap: var(--gap);
    padding: var(--pad);
    border-radius: calc(var(--tr) + var(--pad));
    width: 100%;
  }

  /* sizes */
  .tabs--sm { --fs: var(--ctrl-fs-sm, 13px); --h: var(--ctrl-h-sm, 32px); --tab-px: 11px; --r: var(--ctrl-r-sm, 10px); }
  .tabs--md { --fs: var(--ctrl-fs-md, 14px); --h: var(--ctrl-h-md, 40px); --tab-px: 14px; --r: var(--ctrl-r-md, 12px); }
  .tabs--lg { --fs: var(--ctrl-fs-lg, 15px); --h: var(--ctrl-h-lg, 48px); --tab-px: 18px; --r: var(--ctrl-r-lg, 14px); }

  /* radii — same as VsButton (solid/pill only; line ignores) */
  .tabs--r-none .tabs__list,
  .tabs--r-none .tabs__tab,
  .tabs--r-none .tabs__indicator { --tr: 0px; }
  .tabs--r-subtle .tabs__list,
  .tabs--r-subtle .tabs__tab,
  .tabs--r-subtle .tabs__indicator { --tr: 8px; }
  .tabs--r-rounded .tabs__list,
  .tabs--r-rounded .tabs__tab,
  .tabs--r-rounded .tabs__indicator { --tr: var(--r); }
  /* pill = default (height/2), no override needed */
  @supports (corner-shape: squircle) {
    .tabs--r-squircle .tabs__list,
    .tabs--r-squircle .tabs__tab,
    .tabs--r-squircle .tabs__indicator { corner-shape: squircle; --tr: calc(var(--r) * 1.7); }
    /* the ripple clip must follow the same shape as the track */
    .tabs--r-squircle .tabs__ripples { corner-shape: squircle; }
  }

  /* icon inside a tab (label replaced by SVG) */
  .tabs__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .tabs__icon svg { width: 18px; height: 18px; display: block; }

  /* iconOnly: square tabs (width = height, no side padding) */
  .tabs--icon { --tab-px: 0px; }
  .tabs--icon .tabs__tab,
  .tabs--icon .tabs__ind-label { width: var(--h); padding: 0; }

  /* tab base */
  .tabs__tab {
    position: relative;
    z-index: 0;
    overflow: visible;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--tab-px);
    border: 0;
    background: transparent;
    --lit: 0;
    --mx: 50%;
    --my: 50%;
    /* radial focus clipped to the glyph: the letters under the cursor brighten,
       the distant ones stay muted. The cursor is a light that sweeps the text. */
    color: var(--text-muted, #8a8a8a);
    background: radial-gradient(
      140px circle at var(--mx) var(--my),
      var(--text, #ededed),
      var(--text, #ededed) 25%,
      var(--text-muted, #8a8a8a) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font: inherit;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border-radius: var(--tr);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition:
      opacity 120ms linear,
      transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  /* sinks in on press */
  .tabs__tab:active:not(:disabled) { transform: scale(0.92); }
  .tabs--block .tabs__tab { flex: 1 1 0; }

  /* The label is its own box so it can be clipped: "text-overflow" needs a block
     container, and the tab is a flex one — an inline-flex parent turns bare text
     into an anonymous flex item that never truncates. Rendered in all three label
     sites (tab, indicator mask clone, drop) so a truncated label stays identical
     across them; the mask reveals the clone through the sliding pill, and any
     mismatch would show as the active label jumping. */
  .tabs__label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* block = fill the track, so a label that doesn't fit must SHRINK, not push the
     list past its container. Flex items default to min-width:auto (never smaller
     than their content), which is what let long labels overflow the panel. */
  .tabs--block .tabs__tab,
  .tabs--block .tabs__ind-label { min-width: 0; }
  /* active in line: solid color (solid/pill use the sliding mask) */
  .tabs--line .tabs__tab.is-active {
    background: none;
    -webkit-text-fill-color: var(--acc);
    color: var(--acc);
  }
  .tabs__tab:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: none;
    -webkit-text-fill-color: var(--text-muted, #8a8a8a);
  }

  /* ripple effect — container clips to the full track radius (.tabs__list) */
  .tabs__ripples {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
  }
  .tabs__ripple {
    position: absolute;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--text, #ededed) 22%, transparent) 0%,
      color-mix(in srgb, var(--text, #ededed) 12%, transparent) 30%,
      color-mix(in srgb, var(--text, #ededed) 4%, transparent) 55%,
      transparent 72%
    );
    opacity: 0;
    will-change: transform, opacity;
    animation:
      tabs-ripple-scale 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
      tabs-ripple-fade 720ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  @keyframes tabs-ripple-scale {
    from { transform: translate(-50%, -50%) scale(0); }
    to   { transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes tabs-ripple-fade {
    from { opacity: 0.8; }
    to   { opacity: 0; }
  }

  /* indicator — Apple-style spring */
  .tabs__indicator {
    position: absolute;
    top: 0;
    left: 0;
    height: var(--h);
    border-radius: var(--tr);
    background: var(--acc);
    opacity: 0;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
    transition:
      transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      width 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      opacity 200ms ease;
  }
  .tabs__indicator.is-ready { opacity: 1; }
  /* pop with Apple bounce on select (scale is independent from transform) */
  .tabs__indicator.is-pop { animation: tabs-pop 460ms cubic-bezier(0.34, 1.4, 0.64, 1); }
  @keyframes tabs-pop {
    0% { scale: 1; }
    38% { scale: 1.099; }
    100% { scale: 1; }
  }

  /* mask: copy of the labels in inverted color, clipped to the pill.
     Its translate compensates for the indicator's → the text stays "fixed" over the
     track while the pill window slides, revealing it letter by letter. */
  .tabs__ind-mask {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    gap: var(--gap);
    padding: var(--pad);
    box-sizing: border-box;
    transition:
      transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1),
      width 420ms cubic-bezier(0.34, 1.4, 0.64, 1);
  }
  .tabs__ind-label {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--h);
    padding: 0 var(--tab-px);
    font: inherit;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    color: var(--acc-on);
  }
  .tabs--block .tabs__ind-label { flex: 1 1 0; }
  .tabs__ind-label.is-disabled { opacity: 0.4; }

  /* variant: line — bottom bar, no background */
  .tabs--line .tabs__list { padding: 0; border-radius: 0; gap: 4px; }
  .tabs--line .tabs__tab { border-radius: 0; --acc-on: var(--acc); }
  .tabs--line .tabs__tab.is-active { color: var(--acc); }
  .tabs--line .tabs__indicator {
    top: auto;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background: var(--acc);
  }

  /* variant: solid — transparent track (border only) + pill = accent */
  .tabs--solid .tabs__list {
    background: transparent;
    border: 1px solid var(--border, #2a2a2a);
  }
  .tabs--solid .tabs__indicator { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35); }

  /* variant: pill — no track, solid pill */
  .tabs--pill .tabs__indicator { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25); }

  /* ── clean segmented "knob" — DEFAULT TONE only (solid & pill) ──────────────
     Not an inverted block: the knob is a neutral elevated card (white in light,
     raised gray in dark) and the icon/label keeps its normal outline color.
     Tones (danger/warn/success) still get the colored accent pill below. */
  .tabs--t-default.tabs--solid .tabs__list {
    background: transparent;
    border-color: var(--seg-track-border);
  }
  .tabs--t-default.tabs--solid .tabs__indicator,
  .tabs--t-default.tabs--pill .tabs__indicator {
    background: var(--seg-knob);
    box-shadow: var(--seg-knob-shadow), var(--seg-knob-ring);
  }
  .tabs--t-default.tabs--solid .tabs__ind-label,
  .tabs--t-default.tabs--pill .tabs__ind-label {
    color: var(--seg-knob-fg);
  }

  /* tones — recolor the accent */
  .tabs--t-default { --t-acc: var(--inp-accent, #ededed); --t-on: var(--bg, #0a0a0a); }
  .tabs--t-danger { --t-acc: #e5484d; --t-on: #fff; }
  .tabs--t-warn { --t-acc: #f5a623; --t-on: #1a1206; }
  .tabs--t-success { --t-acc: #30a46c; --t-on: #fff; }
  /* in line, the color accent also tints the active text */
  .tabs--line.tabs--t-danger .tabs__tab.is-active,
  .tabs--line.tabs--t-warn .tabs__tab.is-active,
  .tabs--line.tabs--t-success .tabs__tab.is-active { color: var(--acc); }

  /* water-drop ripple — expanding double ring punched into the bg color, clipped to
     the tab's letters only (same effect as VsBreadcrumb). Slow & fluid. */
  @property --tabs-r {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }
  .tabs__drop {
    position: absolute;
    inset: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--tab-px);
    pointer-events: none;
    white-space: nowrap;
    font: inherit;
    font-weight: 500;
    line-height: 1;
    --d2: calc(var(--tabs-r) * 0.52);
    background:
      radial-gradient(
        circle at var(--rx, 50%) var(--ry, 50%),
        transparent calc(var(--tabs-r) - 17px),
        rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--tabs-r) - 13px),
        rgb(var(--drop-rgb, 10 10 10) / 0.55) calc(var(--tabs-r) - 6px),
        rgb(var(--drop-rgb, 10 10 10) / 0.98) calc(var(--tabs-r) - 1px),
        rgb(var(--drop-rgb, 10 10 10) / 0.62) calc(var(--tabs-r) + 4px),
        rgb(var(--drop-rgb, 10 10 10) / 0.14) calc(var(--tabs-r) + 11px),
        transparent calc(var(--tabs-r) + 16px)
      ),
      radial-gradient(
        circle at var(--rx, 50%) var(--ry, 50%),
        transparent calc(var(--d2) - 12px),
        rgb(var(--drop-rgb, 10 10 10) / 0.30) calc(var(--d2) - 5px),
        rgb(var(--drop-rgb, 10 10 10) / 0.55) var(--d2),
        rgb(var(--drop-rgb, 10 10 10) / 0.12) calc(var(--d2) + 7px),
        transparent calc(var(--d2) + 12px)
      );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: tabs-drop 1820ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes tabs-drop {
    0%   { --tabs-r: 0px; opacity: 0.4; }
    12%  { opacity: 1; }
    100% { --tabs-r: 150px; opacity: 0; }
  }
  /* light theme: bg is light → flip the drop to white so it reads on dark letters */
  :host-context([data-theme='light']) .tabs {
    --drop-rgb: 255 255 255;
    /* clean segmented knob — light track, pure-white raised knob, dark outline icon */
    --seg-track: #f3f5f7;
    --seg-track-border: #e8ebef;
    --seg-knob: #ffffff;
    --seg-knob-fg: var(--text, #171717);
    --seg-knob-shadow: 0 1px 2px rgba(0, 0, 0, 0.024), 0 2px 6px rgba(0, 0, 0, 0.016);
    --seg-knob-ring: inset 0 0 0 1px rgba(0, 0, 0, 0.04);
  }

  .is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .tabs__indicator { transition: opacity 200ms ease; }
    .tabs__indicator.is-pop { animation: none; }
    .tabs__tab { transition: none; }
    .tabs__tab:active:not(:disabled) { transform: none; }
  }
`;let d;function f(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const v=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(c,t){const e=t?f(String(t).trim()):null;if(!e){for(const r of v)c.style.removeProperty(r);return}const a=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),n=.2126*a(e[0])+.7152*a(e[1])+.0722*a(e[2])>.45,s=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(r=>Math.round(n?r*.92:r+(255-r)*.16)),o=(r,b)=>c.style.setProperty(r,b);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,s);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,e.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,n?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,n?"0 0 0":"255 255 255");o("--vs-color",s),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",n?"#0b0b0b":"#ffffff")}class g extends HTMLElement{static observedAttributes=["model-value","variant","tone","size","radius","block","disabled","icon-only","items","color"];#i;#e;#t;#a;#r;#n=[];#d=[];#p=null;#u=null;#o=0;#c=0;#b=null;#_=!1;#m;#f;#v;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=m,this.#i=document.createElement("div"),this.#i.setAttribute("role","tablist"),this.#e=document.createElement("div"),this.#e.className="tabs__list",this.#t=document.createElement("span"),this.#t.className="tabs__indicator",this.#t.setAttribute("aria-hidden","true"),this.#a=document.createElement("span"),this.#a.className="tabs__ind-mask",this.#r=document.createElement("span"),this.#r.className="tabs__ripples",this.#r.setAttribute("aria-hidden","true"),this.#t.appendChild(this.#a),this.#e.append(this.#t,this.#r),this.#i.appendChild(this.#e),t.append(e,this.#i),this.#m=a=>this.#S(a),this.#f=a=>this.#I(a),this.#v=()=>this.#t.classList.remove("is-pop"),this.#t.addEventListener("animationend",this.#v)}connectedCallback(){p(this,this.getAttribute("color")),this.#y(),this.#x(),this.#i.addEventListener("keydown",this.#m),window.addEventListener("pointermove",this.#f,{passive:!0}),this.#u=new ResizeObserver(()=>this.#h()),this.#u.observe(this.#e),this.#h()}disconnectedCallback(){this.#i.removeEventListener("keydown",this.#m),window.removeEventListener("pointermove",this.#f),this.#t.removeEventListener("animationend",this.#v),this.#u?.disconnect(),this.#u=null,this.#o&&cancelAnimationFrame(this.#o),this.#o=0,this.#c&&cancelAnimationFrame(this.#c),this.#c=0}#C(){if(!this.#e)return;this.#x();const t=this.#s();t.some(e=>e.value===this.modelValue)?this.#h():this.setAttribute("model-value",t[0]?.value??"")}attributeChangedCallback(t){p(this,this.getAttribute("color")),this.#e&&(t==="items"?this.#C():t==="model-value"?(this.#M(),this.#N()):(this.#y(),this.#h()))}set items(t){if(this.#p=Array.isArray(t)&&t.length?t:null,!this.#e)return;this.#x();const e=this.#s();e.some(a=>a.value===this.modelValue)?this.#h():this.setAttribute("model-value",e[0]?.value??"")}get items(){return this.#p??h}set modelValue(t){this.setAttribute("model-value",String(t))}get modelValue(){const t=this.getAttribute("model-value");return t??this.#s()[0]?.value??""}#s(){if(this.#p)return this.#p;const t=this.getAttribute("items");if(t&&t.trim()){const e=t.split(",").map(a=>a.trim()).filter(Boolean);if(e.length)return e.map(a=>({label:a,value:a.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}))}return h}#l(){return this.hasAttribute("disabled")&&this.hasAttribute("disabled")}#L(){return this.hasAttribute("block")&&this.hasAttribute("block")}#$(){return this.hasAttribute("icon-only")&&this.hasAttribute("icon-only")}#g(){return this.getAttribute("variant")??"line"}#y(){const t=(i,n)=>this.getAttribute(i)??n,e=this.#g(),a=this.#l();this.#i.className=["tabs",`tabs--${e}`,`tabs--t-${t("tone","default")}`,`tabs--${t("size","md")}`,`tabs--r-${t("radius","squircle")}`,this.#L()?"tabs--block":"",a?"is-disabled":"",this.#$()?"tabs--icon":""].filter(Boolean).join(" "),this.#i.setAttribute("aria-disabled",a?"true":"false"),this.#z(e)}#z(t){const e=t!=="line",a=this.#a.parentElement===this.#t;e&&!a?this.#t.appendChild(this.#a):!e&&a&&this.#a.remove()}#x(){for(const i of this.#n)i.remove();this.#n=[],this.#d=[],this.#a.textContent="";const t=this.#s(),e=this.modelValue,a=this.#l();t.forEach((i,n)=>{const s=document.createElement("span");s.className="tabs__ind-label"+(i.disabled?" is-disabled":""),s.appendChild(this.#w(i)),this.#a.appendChild(s);const l=document.createElement("button");l.type="button",l.className="tabs__tab"+(i.value===e?" is-active":""),l.setAttribute("role","tab"),l.setAttribute("aria-selected",i.value===e?"true":"false");const o=a||!!i.disabled;l.disabled=o,l.tabIndex=i.value===e?0:-1,l.appendChild(this.#w(i)),l.addEventListener("pointerdown",r=>this.#V(r,i,n)),l.addEventListener("click",()=>this.#A(i)),this.#e.appendChild(l),this.#n.push(l)})}#w(t){const e=document.createElement("span");return t.icon?(e.className="tabs__icon",e.innerHTML=t.icon):(e.className="tabs__label",e.textContent=t.label),e}#M(){const t=this.modelValue,e=this.#s();this.#n.forEach((a,i)=>{const n=e[i];if(!n)return;const s=n.value===t;a.classList.toggle("is-active",s),a.setAttribute("aria-selected",s?"true":"false"),a.tabIndex=s?0:-1})}#N(){requestAnimationFrame(()=>{this.#k(),this.#b&&this.#E(this.#b),this.#t.classList.remove("is-pop"),requestAnimationFrame(()=>requestAnimationFrame(()=>this.#t.classList.add("is-pop")))})}#h(){this.#o||(this.#o=requestAnimationFrame(()=>{this.#o=0,this.#k()}))}#k(){const e=this.#s().findIndex(r=>r.value===this.modelValue),a=this.#n[e];if(!a)return;const i=this.#g(),n=a.offsetLeft,s=a.offsetTop,l=a.offsetWidth,o=this.#e.clientWidth;this.#t.style.transform=`translate(${n}px, ${i==="line"?0:s}px)`,this.#t.style.width=`${l}px`,this.#a.style.transform=`translate(${-n}px, ${-s}px)`,this.#a.style.width=`${o}px`,this.#_||(this.#t.getBoundingClientRect(),this.#t.classList.add("is-ready"),this.#_=!0)}#A(t){if(this.#l()||t.disabled||t.value===this.modelValue)return;this.setAttribute("model-value",t.value);const e={value:t.value,item:t};this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,detail:e})),this.dispatchEvent(new CustomEvent("update:modelValue",{bubbles:!0,composed:!0,detail:e}))}#S(t){if(this.#l())return;const e=this.#s().filter(n=>!n.disabled);if(!e.length)return;const a=e.findIndex(n=>n.value===this.modelValue);let i=-1;t.key==="ArrowRight"||t.key==="ArrowDown"?i=(a+1+e.length)%e.length:t.key==="ArrowLeft"||t.key==="ArrowUp"?i=(a-1+e.length)%e.length:t.key==="Home"?i=0:t.key==="End"&&(i=e.length-1),!(i<0)&&(t.preventDefault(),this.#A(e[i]),requestAnimationFrame(()=>this.#i.querySelector('[role="tab"][aria-selected="true"]')?.focus()))}#V(t,e,a){this.#q(t,e),this.#T(t,e,a)}#q(t,e){if(this.#g()!=="solid"||this.#l()||e.disabled||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const a=this.#e.getBoundingClientRect(),i=t.clientX-a.left,n=t.clientY-a.top,s=Math.max(i,a.width-i),l=Math.max(n,a.height-n),o=Math.hypot(s,l)*2*.7,r=document.createElement("span");for(r.className="tabs__ripple",r.style.cssText=`left:${i}px;top:${n}px;width:${o}px;height:${o}px`,r.addEventListener("animationend",()=>r.remove()),this.#r.appendChild(r);this.#r.childElementCount>6;)this.#r.firstElementChild.remove()}#T(t,e,a){if(this.#l()||e.disabled||e.icon||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const i=this.#n[a];if(!i)return;this.#d[a]?.remove();const n=i.getBoundingClientRect(),s=document.createElement("span");s.className="tabs__drop",s.setAttribute("aria-hidden","true"),s.style.setProperty("--rx",`${t.clientX-n.left}px`),s.style.setProperty("--ry",`${t.clientY-n.top}px`);const l=document.createElement("span");l.className="tabs__label",l.textContent=e.label,s.appendChild(l),s.addEventListener("animationend",()=>{s.remove(),this.#d[a]===s&&(this.#d[a]=null)}),i.appendChild(s),this.#d[a]=s}#E(t){if(this.#l())return;const e=this.#s();for(let a=0;a<e.length;a++){const i=this.#n[a];if(!i)continue;const n=e[a];if(n.disabled||n.value===this.modelValue){i.style.setProperty("--lit","0");continue}const s=i.getBoundingClientRect();i.style.setProperty("--mx",`${t.clientX-s.left}px`),i.style.setProperty("--my",`${t.clientY-s.top}px`);const l=Math.max(s.left,Math.min(t.clientX,s.right)),o=Math.max(s.top,Math.min(t.clientY,s.bottom)),r=Math.hypot(t.clientX-l,t.clientY-o),b=Math.max(0,1-r/u);i.style.setProperty("--lit",b.toFixed(3))}}#I(t){this.#b=t,!this.#c&&(this.#c=requestAnimationFrame(()=>{this.#c=0,this.#b&&this.#E(this.#b)}))}}customElements.define("vs-tabs",g);
