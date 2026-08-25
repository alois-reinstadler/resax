import{attachGlow as v}from"./vs-fx.CLXiCjCI.js";const h="http://www.w3.org/2000/svg";function p(c,t){const e=document.createElementNS(h,"svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");const i=t?c.bold||[]:c.linear||[];if(t){e.setAttribute("fill","currentColor");for(const r of i){const s=document.createElementNS(h,"path");s.setAttribute("d",r),e.appendChild(s)}}else{e.setAttribute("fill","none");for(const r of i){const s=document.createElementNS(h,"path");s.setAttribute("d",r),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),e.appendChild(s)}}return e}const b=[{label:"Home",linear:["M9.02 2.84016L3.63 7.04016C2.73 7.74016 2 9.23016 2 10.3602V17.7702C2 20.0902 3.89 21.9902 6.21 21.9902H17.79C20.11 21.9902 22 20.0902 22 17.7802V10.5002C22 9.29016 21.19 7.74016 20.2 7.05016L14.02 2.72016C12.62 1.74016 10.37 1.79016 9.02 2.84016Z","M12 17.9902V14.9902"],bold:["M20.04 6.81969L14.28 2.78969C12.71 1.68969 10.3 1.74969 8.78999 2.91969L3.77999 6.82969C2.77999 7.60969 1.98999 9.20969 1.98999 10.4697V17.3697C1.98999 19.9197 4.05999 21.9997 6.60999 21.9997H17.39C19.94 21.9997 22.01 19.9297 22.01 17.3797V10.5997C22.01 9.24969 21.14 7.58969 20.04 6.81969ZM12.75 17.9997C12.75 18.4097 12.41 18.7497 12 18.7497C11.59 18.7497 11.25 18.4097 11.25 17.9997V14.9997C11.25 14.5897 11.59 14.2497 12 14.2497C12.41 14.2497 12.75 14.5897 12.75 14.9997V17.9997Z"]},{label:"Profile",linear:["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"],bold:["M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z","M11.9999 14.5C6.98991 14.5 2.90991 17.86 2.90991 22C2.90991 22.28 3.12991 22.5 3.40991 22.5H20.5899C20.8699 22.5 21.0899 22.28 21.0899 22C21.0899 17.86 17.0099 14.5 11.9999 14.5Z"]},{label:"Messages",linear:["M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z","M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"],bold:["M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"]},{label:"Photos",linear:["M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z","M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z","M2.67004 18.9496L7.60004 15.6396C8.39004 15.1096 9.53004 15.1696 10.24 15.7796L10.57 16.0696C11.35 16.7396 12.61 16.7396 13.39 16.0696L17.55 12.4996C18.33 11.8296 19.59 11.8296 20.37 12.4996L22 13.8996"],bold:["M9.00012 10.3801C10.3146 10.3801 11.3801 9.31456 11.3801 8.00012C11.3801 6.68568 10.3146 5.62012 9.00012 5.62012C7.68568 5.62012 6.62012 6.68568 6.62012 8.00012C6.62012 9.31456 7.68568 10.3801 9.00012 10.3801Z","M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z"]},{label:"Music",linear:["M6.28003 21.9998C8.00316 21.9998 9.40003 20.6029 9.40003 18.8798C9.40003 17.1566 8.00316 15.7598 6.28003 15.7598C4.55691 15.7598 3.16003 17.1566 3.16003 18.8798C3.16003 20.6029 4.55691 21.9998 6.28003 21.9998Z","M20.84 16.8003V4.60034C20.84 2.00034 19.21 1.64034 17.56 2.09034L11.32 3.79034C10.18 4.10034 9.40002 5.00034 9.40002 6.30034V8.47034V9.93034V18.8703","M17.72 19.9197C19.4431 19.9197 20.84 18.5228 20.84 16.7997C20.84 15.0766 19.4431 13.6797 17.72 13.6797C15.9968 13.6797 14.6 15.0766 14.6 16.7997C14.6 18.5228 15.9968 19.9197 17.72 19.9197Z","M9.40002 9.52039L20.84 6.40039"],bold:["M20.8901 5.17958V16.4796C20.8901 18.4596 19.2801 20.0696 17.3001 20.0696C15.3301 20.0696 13.7101 18.4596 13.7101 16.4796C13.7101 14.5096 15.3301 12.8996 17.3001 12.8996C18.1401 12.8996 18.8901 13.1896 19.5001 13.6696V7.71958L10.2901 10.3396V18.4096C10.2901 20.3896 8.67011 21.9996 6.70011 21.9996C4.72011 21.9996 3.11011 20.3896 3.11011 18.4096C3.11011 16.4396 4.72011 14.8296 6.70011 14.8296C7.53011 14.8296 8.28011 15.1196 8.89011 15.5896V6.74958C8.89011 5.27958 9.78011 4.13958 11.1901 3.75958L16.9701 2.17958C18.1401 1.85958 19.1301 1.96958 19.8301 2.50958C20.5401 3.03958 20.8901 3.93958 20.8901 5.17958Z"]},{label:"Settings",linear:["M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z","M2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z"],bold:["M20.1 9.21945C18.29 9.21945 17.55 7.93945 18.45 6.36945C18.97 5.45945 18.66 4.29945 17.75 3.77945L16.02 2.78945C15.23 2.31945 14.21 2.59945 13.74 3.38945L13.63 3.57945C12.73 5.14945 11.25 5.14945 10.34 3.57945L10.23 3.38945C9.78 2.59945 8.76 2.31945 7.97 2.78945L6.24 3.77945C5.33 4.29945 5.02 5.46945 5.54 6.37945C6.45 7.93945 5.71 9.21945 3.9 9.21945C2.86 9.21945 2 10.0694 2 11.1194V12.8794C2 13.9194 2.85 14.7794 3.9 14.7794C5.71 14.7794 6.45 16.0594 5.54 17.6294C5.02 18.5394 5.33 19.6994 6.24 20.2194L7.97 21.2094C8.76 21.6794 9.78 21.3995 10.25 20.6094L10.36 20.4194C11.26 18.8494 12.74 18.8494 13.65 20.4194L13.76 20.6094C14.23 21.3995 15.25 21.6794 16.04 21.2094L17.77 20.2194C18.68 19.6994 18.99 18.5294 18.47 17.6294C17.56 16.0594 18.3 14.7794 20.11 14.7794C21.15 14.7794 22.01 13.9294 22.01 12.8794V11.1194C22 10.0794 21.15 9.21945 20.1 9.21945ZM12 15.2494C10.21 15.2494 8.75 13.7894 8.75 11.9994C8.75 10.2094 10.21 8.74945 12 8.74945C13.79 8.74945 15.25 10.2094 15.25 11.9994C15.25 13.7894 13.79 15.2494 12 15.2494Z"]}],g=[.34,.15,.055],u=[.12,.045,.014],f=g.length-1,y=10,x=`
  :host { display: inline-flex; max-width: 100%; }
  .dock {
    --box: 52px;
    --icon: 24px;
    --gap: 6px;
    --pad: 8px;
    --rr: 26px;
    --accent: var(--text, #ededed);
    --ring: 255 255 255; /* glow/ring rgb (space-separated) */
    /* the springy spring — a punchy overshoot so the lift + wave visibly boing.
       Kept SHORT (240ms): the old 420ms curve overshot so late that the icons
       were still settling after the cursor had left them, which read as a
       laggy dock rather than a springy one. */
    --spring: cubic-bezier(0.22, 1.5, 0.36, 1);
    --spring-ms: 240ms;
    display: inline-flex;
    justify-content: center;
    /* room above the bar for the sprung + stretched icons */
    padding-top: calc(var(--box) * 0.95);
    max-width: 100%;
  }
  .dock--sm { --box: 44px; --icon: 20px; --gap: 5px; --pad: 6px; --rr: 20px; }
  .dock--lg { --box: 60px; --icon: 28px; --gap: 8px; --pad: 10px; --rr: 30px; }

  /* ── The glass capsule ── */
  .dock__bar {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: flex-end;
    flex-wrap: wrap; justify-content: center; max-width: 100%;
    gap: var(--gap);
    padding: var(--pad);
    border: 1px solid var(--border, #262626);
    border-radius: var(--rr);
    background: color-mix(in srgb, var(--bg-elevated, #141416) 78%, transparent);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    box-shadow:
      0 1px 0 0 rgba(255, 255, 255, 0.06) inset,
      0 24px 60px -22px rgba(0, 0, 0, 0.6);
    /* the sprung icons rise out of the bar — never clip them */
    overflow: visible;
  }
  .dock--r-none .dock__bar { --rr: 0px; }
  .dock--r-subtle .dock__bar { --rr: 14px; }
  .dock--r-rounded .dock__bar { --rr: 20px; }
  .dock--r-pill .dock__bar { --rr: 999px; }
  @supports (corner-shape: squircle) {
    .dock--r-squircle .dock__bar { corner-shape: squircle; }
  }

  /* proximity glow — a soft ring on the capsule border */
  .fx-glow{ position:absolute; inset:-1px; z-index:1; border-radius:inherit; padding:1px; pointer-events:none;
    background:
      radial-gradient(60px circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.42) 30%, rgb(var(--fx-tint,255 255 255)/.16) 58%, rgb(var(--fx-tint,255 255 255)/0) 82%),
      radial-gradient(200px circle at var(--gx,50%) var(--gy,50%),
        rgb(var(--fx-tint,255 255 255)/.6), rgb(var(--fx-tint,255 255 255)/.27) 42%, rgb(var(--fx-tint,255 255 255)/.08) 66%, rgb(var(--fx-tint,255 255 255)/0) 85%);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); -webkit-mask-composite:xor;
    mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0); mask-composite:exclude;
    opacity:calc(var(--glow,0)*.63); transition:opacity 140ms; }
  .dock__glow { border-radius: inherit; }
  @supports (corner-shape: squircle) {
    .dock--r-squircle .dock__glow { corner-shape: squircle; }
  }

  /* ── Each icon: outer element carries the vertical bounce/wave (lift) ── */
  .dock__item {
    position: relative;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: var(--box);
    height: var(--box);
    padding: 0;
    border: 0;
    border-radius: calc(var(--box) * 0.3);
    background: transparent;
    color: var(--text-secondary, #a6a6a6);
    cursor: pointer;
    /* lift only on the outer node — grows up from the dock floor. The overshoot
       spring + the per-item stagger delay make the wave ripple like jelly. */
    transform: translateY(var(--ty, 0px));
    transform-origin: bottom center;
    transition:
      transform var(--spring-ms) var(--spring),
      background-color 160ms var(--ease-out, ease),
      color 160ms var(--ease-out, ease);
    transition-delay: var(--delay, 0ms), 0ms, 0ms;
    -webkit-tap-highlight-color: transparent;
  }
  @supports (corner-shape: squircle) {
    .dock__item { corner-shape: squircle; border-radius: calc(var(--box) * 0.42); }
  }
  /* Hover tint follows the cursor's own item only — the neighbours already read
     as hovered through the lift, so tinting them too made the whole bar flash. */
  .dock__item:hover { color: var(--text, #ededed); background: rgb(var(--ring) / 0.07); }
  .dock__item:focus-visible { outline: none; color: var(--text, #ededed); box-shadow: 0 0 0 2px rgb(var(--ring) / 0.7); }
  .dock__item.is-active { color: var(--accent); }
  .dock__item:disabled { cursor: not-allowed; }

  /* inner node carries the squash-and-stretch (scaleY/scaleX). Kept on its own
     element so the hover stretch (transform) and the click press (the individual
     'scale' property, below) compose without fighting over one property. */
  .dock__ico {
    display: grid;
    place-items: center;
    width: var(--icon);
    height: var(--icon);
    transform: scaleY(var(--sy, 1)) scaleX(var(--sx, 1));
    transform-origin: bottom center;
    transition: transform var(--spring-ms) var(--spring);
    transition-delay: var(--delay, 0ms);
  }
  .dock__ico svg { width: 100%; height: 100%; display: block; }

  /* click squash → spring back. Animates the individual 'scale' property so it
     layers on TOP of the hover-stretch transform above (they multiply). Shorter
     and shallower than the first pass: at 480ms / 1.18×0.7 the glyph visibly
     deformed, which read as a rendering glitch instead of as weight. */
  .dock__item.is-press .dock__ico { animation: dock-press 320ms cubic-bezier(0.3, 1.25, 0.5, 1) both; }
  @keyframes dock-press {
    0% { scale: 1 1; }
    26% { scale: 1.1 0.86; }   /* squash — wide & short */
    58% { scale: 0.97 1.06; }  /* stretch overshoot — thin & tall */
    100% { scale: 1 1; }
  }

  /* running-app dot under the active icon */
  .dock__dot {
    position: absolute;
    bottom: calc(var(--pad) * -0.5 - 2px);
    left: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--accent);
    translate: -50% 0;
    scale: 0;
    opacity: 0;
    transition: scale 260ms var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)), opacity 200ms ease;
  }
  .dock__item.is-active .dock__dot { scale: 1; opacity: 1; }

  /* ── Tones — recolor accent + glow ── */
  .dock--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --fx-tint: 255 99 105; }
  .dock--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --fx-tint: 255 178 36; }
  .dock--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --fx-tint: 76 195 138; }

  /* ── Disabled ── */
  .dock.is-disabled { opacity: 0.55; pointer-events: none; }

  @media (prefers-reduced-motion: reduce) {
    .dock__item {
      transition: color 160ms ease, background-color 160ms ease;
      transform: none !important;
    }
    .dock__ico { transition: none; transform: none !important; }
    .dock__item.is-press .dock__ico { animation: none; }
    .dock__dot { transition: none; }
  }
`;let d;function k(c){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=c;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const w=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(c,t){const e=t?k(String(t).trim()):null;if(!e){for(const o of w)c.style.removeProperty(o);return}const i=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4),s=.2126*i(e[0])+.7152*i(e[1])+.0722*i(e[2])>.45,n=`rgb(${e[0]} ${e[1]} ${e[2]})`,a=e.map(o=>Math.round(s?o*.92:o+(255-o)*.16)),l=(o,C)=>c.style.setProperty(o,C);for(const o of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])l(o,n);l("--btn-primary-bg-hover",`rgb(${a[0]} ${a[1]} ${a[2]})`);for(const o of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])l(o,e.join(" "));for(const o of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])l(o,s?"#0b0b0b":"#ffffff");for(const o of["--btn-primary-rip","--btn-primary-glow"])l(o,s?"0 0 0":"255 255 255");l("--vs-color",n),l("--vs-color-rgb",e.join(" ")),l("--vs-color-fg",s?"#0b0b0b":"#ffffff")}class _ extends HTMLElement{static observedAttributes=["active","size","radius","tone","bounce","tooltips","disabled","color"];#o;#e;#n;#s=b;#t=[];#r=0;#p;#a=!1;#i=0;#b=0;#u=-1;#d;#h;#f=t=>{const e={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1},i=this.#t.length;if(!i||this.hasAttribute("disabled"))return;const r=this.#t.indexOf(this.shadowRoot.activeElement);if(r<0)return;let s=-1;t.key in e?s=(r+e[t.key]+i)%i:t.key==="Home"?s=0:t.key==="End"&&(s=i-1),!(s<0)&&(t.preventDefault(),this.#v(s))};constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=x,this.#o=document.createElement("nav"),this.#o.setAttribute("aria-label","Dock"),this.#e=document.createElement("div"),this.#e.className="dock__bar",this.#e.setAttribute("role","toolbar"),this.#e.setAttribute("aria-label","Dock"),this.#n=document.createElement("span"),this.#n.className="fx-glow dock__glow",this.#n.setAttribute("aria-hidden","true"),this.#e.append(this.#n),this.#o.append(this.#e),t.append(e,this.#o),this.#d=i=>{this.hasAttribute("disabled")||!this.hasAttribute("bounce")||this.#a||(this.#b=i.clientX,this.#i||(this.#i=requestAnimationFrame(()=>this.#x())))},this.#h=()=>{this.#i&&(cancelAnimationFrame(this.#i),this.#i=0),this.#u!==-1&&this.#l(-1)},this.#e.addEventListener("pointermove",this.#d),this.#e.addEventListener("pointerleave",this.#h),this.#e.addEventListener("keydown",this.#f)}connectedCallback(){m(this,this.getAttribute("color")),this.#a=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.#r=this.#c(Number(this.getAttribute("active")??0)),this.#m(),this.#p=v(this.#e,280,()=>this.hasAttribute("disabled"))}disconnectedCallback(){this.#e.removeEventListener("pointermove",this.#d),this.#e.removeEventListener("pointerleave",this.#h),this.#e.removeEventListener("keydown",this.#f),this.#i&&(cancelAnimationFrame(this.#i),this.#i=0),this.#p?.()}attributeChangedCallback(t){if(m(this,this.getAttribute("color")),!!this.#o){if(t==="active"){this.#C(this.#c(Number(this.getAttribute("active")??0)));return}this.#g()}}set items(t){this.#s=Array.isArray(t)&&t.length?t:b,this.#m()}get items(){return this.#s}#c(t){return Math.max(0,Math.min(this.#s.length-1,t|0))}#v(t){this.#t.forEach((e,i)=>{e&&(e.tabIndex=i===t?0:-1)}),this.#t[t]?.focus()}#m(){this.#r=this.#c(this.#r);for(const e of this.#t)e.remove();this.#t=[];const t=this.hasAttribute("disabled");this.#s.forEach((e,i)=>{const r=document.createElement("button");r.type="button",r.className="dock__item"+(i===this.#r?" is-active":""),r.disabled=t,r.setAttribute("aria-label",e.label||"Item"),i===this.#r&&r.setAttribute("aria-current","page"),r.tabIndex=i===this.#r?0:-1,r.style.setProperty("--ty","0px"),r.style.setProperty("--sy","1"),r.style.setProperty("--sx","1"),r.style.setProperty("--delay","0ms");const s=document.createElement("span");s.className="dock__ico",s.appendChild(p(e,i===this.#r));const n=document.createElement("span");n.className="dock__dot",n.setAttribute("aria-hidden","true"),r.append(s,n),r.addEventListener("click",()=>this.#k(i)),r.addEventListener("focus",()=>{this.#a||this.#l(i)}),r.addEventListener("blur",()=>{this.#e.contains(this.shadowRoot.activeElement)||this.#l(-1)}),r.addEventListener("animationend",()=>r.classList.remove("is-press")),this.#e.append(r),this.#t[i]=r}),this.#g()}#g(){const t=this.getAttribute("size")??"md",e=this.getAttribute("radius")??"squircle",i=this.getAttribute("tone")??"default",r=this.hasAttribute("disabled"),s=this.hasAttribute("tooltips");this.#o.className=`dock dock--${t} dock--r-${e} dock--t-${i}`+(r?" is-disabled":"");for(let n=0;n<this.#t.length;n++){const a=this.#t[n];a&&(a.disabled=r,s?a.title=this.#s[n]?.label||"":a.removeAttribute("title"))}}#y(){const t=this.#e.getBoundingClientRect().left;let e=0,i=1/0;for(let r=0;r<this.#t.length;r++){const s=this.#t[r];if(!s)continue;const n=t+s.offsetLeft+s.offsetWidth/2,a=Math.abs(this.#b-n);a<i&&(i=a,e=r)}return e}#l(t){this.#u=t;for(let e=0;e<this.#t.length;e++){const i=this.#t[e];if(!i)continue;const r=t<0?f+1:Math.abs(e-t);r>f?(i.style.setProperty("--ty","0px"),i.style.setProperty("--sy","1"),i.style.setProperty("--sx","1")):(i.style.setProperty("--ty",(-(g[r]*i.offsetWidth)).toFixed(2)+"px"),i.style.setProperty("--sy",(1+u[r]).toFixed(3)),i.style.setProperty("--sx",(1-u[r]*.75).toFixed(3))),i.style.setProperty("--delay",(t<0?0:r*y)+"ms")}}#x(){this.#i=0,this.#l(this.#y())}#k(t){if(this.hasAttribute("disabled"))return;this.#C(t),this.#w("select",{item:this.#s[t],index:t});const e=this.#t[t];e&&!this.#a&&(e.classList.remove("is-press"),e.offsetWidth,e.classList.add("is-press"))}#C(t){if(t=this.#c(t),t===this.#r&&this.#t[t]?.classList.contains("is-active"))return;const e=this.#r;this.#r=t;for(const i of[e,t]){const r=this.#t[i];if(!r)continue;const s=i===t;r.classList.toggle("is-active",s),s?r.setAttribute("aria-current","page"):r.removeAttribute("aria-current");const n=r.querySelector(".dock__ico");n&&n.replaceChildren(p(this.#s[i],s))}this.#t.forEach((i,r)=>{i&&(i.tabIndex=r===t?0:-1)})}#w(t,e){this.dispatchEvent(new CustomEvent(t,{bubbles:!0,composed:!0,detail:e}))}}customElements.define("vs-dock-bounce",_);
