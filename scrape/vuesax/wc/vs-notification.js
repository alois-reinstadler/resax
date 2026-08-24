const p="http://www.w3.org/2000/svg";function it(){return matchMedia("(prefers-reduced-motion: reduce)").matches}function q(t,e){window.dispatchEvent(new CustomEvent(t,{detail:e}))}const b=360,u=44,ot=12,rt="cubic-bezier(0.34, 1.46, 0.44, 1)",K=600,Z=280,W=u+280,C={success:["M20.46 6.17969L8.82003 17.8197L3.53003 12.5297"],error:["M18 6 6 18M6 6l12 12"],warn:["M12 7.75V13","M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z","M11.9945 17H12.0035"],loading:["M21 12a9 9 0 1 1-6.219-8.56"],info:["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z","M12 8V13","M11.9945 16H12.0035"]};function k(t,e){const n=document.createElementNS(p,"svg");n.setAttribute("viewBox","0 0 24 24"),e&&n.setAttribute("class","vsn__spin");for(const s of t){const i=document.createElementNS(p,"path");i.setAttribute("d",s),n.appendChild(i)}return n}const at=`
  :host { display: block; }
  .vsn-demo { display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }
  .vsn-demo__row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
  .vsn-demo__btn {
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid var(--inp-border, #2a2a2a);
    background: var(--bg-input, transparent);
    color: var(--text, #ededed);
    font: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 160ms ease, background-color 160ms ease, transform 160ms ease;
  }
  .vsn-demo__btn:hover { border-color: var(--inp-border-hover, #3d3d3d); }
  .vsn-demo__btn:active { transform: scale(0.96); }
  .vsn-demo__btn--ok:hover { border-color: #4cc38a; color: #4cc38a; }
  .vsn-demo__btn--err:hover { border-color: #ff6369; color: #ff6369; }
  .vsn-demo__btn--warn:hover { border-color: #ffb224; color: #ffb224; }
`,ct=`
  .vsn-host {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
  }
  .vsn-host > * { pointer-events: auto; }
  .vsn-host[data-top='false'] { flex-direction: column-reverse; }
  .vsn-host--top-left, .vsn-host--bottom-left { left: 20px; align-items: flex-start; }
  .vsn-host--top-right, .vsn-host--bottom-right { right: 20px; align-items: flex-end; }
  .vsn-host--top-center, .vsn-host--bottom-center { left: 50%; transform: translateX(-50%); align-items: center; }
  .vsn-host--top-left, .vsn-host--top-center, .vsn-host--top-right { top: 20px; }
  .vsn-host--bottom-left, .vsn-host--bottom-center, .vsn-host--bottom-right { bottom: 20px; }

  .vsn {
    position: relative;
    width: var(--w);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    --in-y: -14px;
    transition: height var(--dur) var(--spring);
    opacity: 0;
    transform: scale(0.8);
    filter: blur(10px);
  }
  .vsn--edge-bottom { --in-y: 14px; }
  .vsn.is-ready { animation: vsn-in 720ms cubic-bezier(0.22, 1.12, 0.36, 1) both, vsn-fade 260ms ease-out both; }
  .vsn.is-exiting { animation: vsn-out 320ms cubic-bezier(0.4, 0, 0.7, 0.2) both; }
  @keyframes vsn-in { 0% { transform: translateY(var(--in-y)) scale(0.9); } 100% { transform: translateY(0) scale(1); } }
  @keyframes vsn-fade { 0% { opacity: 0; filter: blur(9px); } 100% { opacity: 1; filter: blur(0); } }
  @keyframes vsn-out {
    0% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    100% { opacity: 0; transform: translateY(calc(var(--in-y) * 0.5)) scale(0.86); filter: blur(9px); }
  }

  .vsn__goo {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    overflow: visible;
    pointer-events: none;
    filter: var(--vsn-goo-filter, drop-shadow(var(--vsn-shadow, 0 10px 30px rgba(0, 0, 0, 0.45))));
  }
  .vsn__pill, .vsn__body {
    fill: var(--vsn-surface, #1c1c1e);
    transition: x var(--dur) var(--spring), width var(--dur) var(--spring), height var(--dur) var(--spring), y var(--dur) var(--spring);
  }

  .vsn__head { position: absolute; top: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; }
  .vsn--edge-bottom .vsn__goo { top: auto; bottom: 0; }
  .vsn--edge-bottom .vsn__head { top: auto; bottom: 0; }
  .vsn--edge-bottom .vsn__content { top: auto; bottom: var(--pill-h); transform: translateY(6px); }
  .vsn--edge-bottom .vsn__content.is-visible { transform: translateY(0); }
  .vsn--edge-bottom .vsn__content-inner { padding-top: 16px; padding-bottom: 6px; }

  .vsn--align-left .vsn__head { justify-content: flex-start; }
  .vsn--align-right .vsn__head { justify-content: flex-end; }
  .vsn--align-right .vsn__content { text-align: right; }
  .vsn--align-center .vsn__content { text-align: center; }
  .vsn__head-inner {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 0 16px;
    max-width: calc(var(--w) - 16px);
    transition: filter 300ms ease, opacity 300ms ease;
  }
  .vsn__head-inner.is-swapping { animation: vsn-swap 360ms ease; }
  @keyframes vsn-swap { 0% { filter: blur(0); opacity: 1; } 40% { filter: blur(6px); opacity: 0.4; } 100% { filter: blur(0); opacity: 1; } }

  .vsn__badge {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--vsn-badge-bg, rgba(255, 255, 255, 0.08));
    color: var(--vsn-accent, var(--vs-color, #ededed));
  }
  .vsn__badge svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
  /* All five state icons live in the badge at once (toggled per state). The UA
     hidden-attribute rule loses here, so hide inactive ones explicitly — without
     this every icon stacks into one garbled glyph. */
  .vsn__badge svg[hidden] { display: none; }
  .vsn__spin { animation: vsn-spin 0.8s linear infinite; }
  @keyframes vsn-spin { to { transform: rotate(360deg); } }

  .vsn__title { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--vsn-accent, var(--vs-color, #ededed)); }

  .vsn__content {
    position: absolute;
    top: var(--pill-h);
    left: 0;
    right: 0;
    padding: 0 22px;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-6px);
    transition: opacity 240ms ease, transform var(--dur) var(--spring);
  }
  .vsn__content.is-visible { opacity: 1; transform: translateY(0); pointer-events: auto; transition-delay: 90ms; }
  .vsn__content-inner { padding-bottom: 16px; }
  .vsn__desc { margin: 0; font-size: 13px; line-height: 1.5; color: var(--vsn-desc, rgba(255, 255, 255, 0.62)); }
  .vsn__action { display: inline-block; margin-top: 10px; font-size: 13px; font-weight: 600; color: var(--vsn-accent, var(--vs-color, #ededed)); text-decoration: none; }
  .vsn__action:hover { text-decoration: underline; }

  .vsn--success { --vsn-accent: #4cc38a; --vsn-badge-bg: rgba(76, 195, 138, 0.16); }
  .vsn--error { --vsn-accent: #ff6369; --vsn-badge-bg: rgba(255, 99, 105, 0.16); }
  .vsn--warn { --vsn-accent: #ffb224; --vsn-badge-bg: rgba(255, 178, 36, 0.16); }
  .vsn--loading { --vsn-accent: var(--vsn-fg, #ededed); --vsn-badge-bg: rgba(127, 127, 127, 0.16); }
  .vsn--info { --vsn-accent: var(--vsn-fg, #cfcfcf); --vsn-badge-bg: rgba(127, 127, 127, 0.14); }

  .vsn--v-fluent {
    --vsn-surface: color-mix(in srgb, var(--vsn-surface-base, #2a2a30) 88%, transparent);
    --vsn-goo-filter: drop-shadow(0 0 0.5px rgba(255, 255, 255, 0.14)) drop-shadow(0 10px 28px rgba(0, 0, 0, 0.4));
  }
  .vsn--v-outline {
    --vsn-surface: #000000;
    --vsn-goo-filter:
      drop-shadow(1px 0 0 var(--vsn-border, rgba(255, 255, 255, 0.1)))
      drop-shadow(-1px 0 0 var(--vsn-border, rgba(255, 255, 255, 0.1)))
      drop-shadow(0 1px 0 var(--vsn-border, rgba(255, 255, 255, 0.1)))
      drop-shadow(0 -1px 0 var(--vsn-border, rgba(255, 255, 255, 0.1)))
      drop-shadow(0 8px 22px rgba(0, 0, 0, 0.5));
  }
  .vsn--v-glass {
    --vsn-surface: var(--vsn-glass-fill, rgba(124, 124, 134, 0.22));
    --vsn-goo-filter:
      drop-shadow(0.5px 0 0 rgba(255, 255, 255, 0.35))
      drop-shadow(-0.5px 0 0 rgba(255, 255, 255, 0.18))
      drop-shadow(0 -0.5px 0 rgba(255, 255, 255, 0.4))
      drop-shadow(0 14px 36px rgba(0, 0, 0, 0.45));
  }

  @media (prefers-reduced-motion: reduce) {
    .vsn, .vsn__goo, .vsn__pill, .vsn__body, .vsn__content, .vsn__head-inner { transition: none; animation: none; }
  }
`,g={state:"info",variant:"solid",position:"top-center",roundness:16,duration:6e3},v=[];let dt=0;const O=new Map;let P=null,_=null,L=null,x=new Map;function F(t){const e=O.get(t);e&&(clearTimeout(e),O.delete(t))}function z(t,e){F(t),e&&e>0&&O.set(t,setTimeout(()=>w(t),e))}function V(t){return!!(t.description||t.action)}function c(t={}){const e=t.position??g.position,n=v.find(o=>o.position===e&&!o.exiting);if(n)return n.title=t.title??n.state,n.description=t.description,n.state=t.state??g.state,n.variant=t.variant??n.variant,n.roundness=t.roundness??n.roundness,n.action=t.action,n.title||(n.title=n.state),n.duration=t.duration===void 0?g.duration:t.duration,n.swapKey++,z(n.id,n.duration),nt(n),n.id;const s=++dt,i={id:s,title:t.title??"",description:t.description,state:t.state??g.state,variant:t.variant??g.variant,position:e,roundness:t.roundness??g.roundness,duration:t.duration===void 0?g.duration:t.duration,action:t.action,exiting:!1,swapKey:0,_dom:null};return i.title||(i.title=i.state),v.push(i),z(s,i.duration),st(i),s}function J(t,e){const n=v.find(d=>d.id===t);if(!n)return;const s=e.state!==void 0&&e.state!==n.state,i=e.title!==void 0&&e.title!==n.title,o=e.description!==void 0&&e.description!==n.description;Object.assign(n,{title:e.title??n.title,description:e.description!==void 0?e.description:n.description,state:e.state??n.state,variant:e.variant??n.variant,roundness:e.roundness??n.roundness,action:e.action!==void 0?e.action:n.action}),e.duration!==void 0&&(n.duration=e.duration,z(t,n.duration)),s||i?nt(n):o?(H(n),I(n),y(n)):H(n)}function w(t){const e=v.find(n=>n.id===t);!e||e.exiting||(F(t),e.exiting=!0,q("vs-notify-dismiss",{id:t}),gt(e),setTimeout(()=>lt(t),Math.round(K*.6)))}function lt(t){F(t);const e=v.findIndex(s=>s.id===t);if(e<0)return;const[n]=v.splice(e,1);_t(n)}function Q(){for(const t of v.slice())w(t.id)}c.success=(t,e={})=>c({...e,title:t,state:"success"});c.error=(t,e={})=>c({...e,title:t,state:"error"});c.info=(t,e={})=>c({...e,title:t,state:"info"});c.warn=(t,e={})=>c({...e,title:t,state:"warn"});c.loading=(t,e={})=>c({duration:null,...e,title:t,state:"loading"});c.update=J;c.dismiss=w;c.dismissAll=Q;function pt(){_=document.createElement("div"),L=_.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=ct,L.appendChild(t),x=new Map,document.body.appendChild(_);for(const e of v)st(e)}function ut(){for(const t of v){const e=t._dom;e&&(e.expandTimer&&clearTimeout(e.expandTimer),e.swapTimer&&clearTimeout(e.swapTimer),e.ro.disconnect()),t._dom=null}x.clear(),_&&(_.remove(),_=null,L=null)}function vt(t){let e=x.get(t);return e||(e=document.createElement("div"),e.className=`vsn-host vsn-host--${t}`,e.setAttribute("data-top",String(t.startsWith("top"))),L.appendChild(e),x.set(t,e),e)}function ft(t){const e=x.get(t);e&&e.childElementCount===0&&(e.remove(),x.delete(t))}function mt(t){const e=t._dom,n=t.position.startsWith("bottom"),s=t.position.endsWith("left")?"left":t.position.endsWith("right")?"right":"center",i=["vsn",`vsn--${t.state}`,`vsn--v-${t.variant}`,`vsn--align-${s}`,n?"vsn--edge-bottom":"vsn--edge-top"];return e?.ready&&i.push("is-ready"),e?.open&&i.push("is-open"),t.exiting&&i.push("is-exiting"),it()&&i.push("is-reduced"),i.join(" ")}function D(t){t._dom&&(t._dom.panel.className=mt(t))}function H(t){const e=t._dom;if(!e)return;const n=["success","error","warn","loading"].includes(t.state)?t.state:"info";for(const s of Object.keys(e.icons))e.icons[s].toggleAttribute("hidden",s!==n);e.titleEl.textContent=t.title,e.descEl.textContent=t.description||"",e.descEl.hidden=!t.description,e.actionEl.textContent=t.action?t.action.label:"",e.actionEl.hidden=!t.action,e.panel.style.setProperty("--rr",`${t.roundness}px`),e.pillRect.setAttribute("rx",String(t.roundness)),e.pillRect.setAttribute("ry",String(t.roundness)),e.bodyRect.setAttribute("rx",String(t.roundness)),e.bodyRect.setAttribute("ry",String(t.roundness)),e.blurF.setAttribute("stdDeviation",String(Math.max(2,t.roundness*.5))),D(t)}function I(t){const e=t._dom;if(!e)return;const n=e.headerInner.scrollWidth;e.pillWidth=Math.max(120,Math.min(b-8,Math.ceil(n)+ot*2+28)),e.contentH=Math.ceil(e.contentInner.scrollHeight)}function y(t){const e=t._dom;if(!e)return;const n=t.position.startsWith("bottom"),s=t.position.endsWith("left")?"left":t.position.endsWith("right")?"right":"center",i=e.open?e.contentH+16:0,o=u+i,d=s==="left"?0:s==="right"?b-e.pillWidth:(b-e.pillWidth)/2,l=n?W-u:0,a=n?W-u+16-i:u-16;e.panel.style.height=`${o}px`,e.pillRect.style.setProperty("x",`${d}px`),e.pillRect.style.setProperty("y",`${l}px`),e.pillRect.style.setProperty("width",`${e.pillWidth}px`),e.bodyRect.style.setProperty("y",`${a}px`),e.bodyRect.style.setProperty("height",`${i}px`)}function tt(t,e){const n=t._dom;n&&n.open!==e&&(n.open=e,n.content.classList.toggle("is-visible",e),D(t),y(t))}function G(t){V(t)&&t.state!=="loading"&&tt(t,!0)}function et(t){tt(t,!1)}function nt(t){const e=t._dom;e&&(e.expandTimer&&(clearTimeout(e.expandTimer),e.expandTimer=0),e.headerInner.classList.add("is-swapping"),e.swapTimer&&clearTimeout(e.swapTimer),e.swapTimer=setTimeout(()=>{t._dom&&t._dom.headerInner.classList.remove("is-swapping")},380),H(t),requestAnimationFrame(()=>{t._dom&&(I(t),y(t),V(t)&&t.state!=="loading"?e.expandTimer=setTimeout(()=>G(t),Z):et(t))}))}function gt(t){const e=t._dom;e&&(e.expandTimer&&clearTimeout(e.expandTimer),e.expandTimer=0,e.open=!1,e.content.classList.remove("is-visible"),e.ready=!1,D(t),y(t))}function bt(t){t.action&&t.action.onClick?.(),w(t.id)}function ht(t){t.action?.onClick?.(),w(t.id)}function st(t){if(!L||t._dom)return;const e=document.createElement("div");e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.style.setProperty("--w",`${b}px`),e.style.setProperty("--pill-h",`${u}px`),e.style.setProperty("--dur",`${K}ms`),e.style.setProperty("--spring",rt),e.style.height=`${u}px`;const n=document.createElementNS(p,"svg");n.setAttribute("class","vsn__goo"),n.setAttribute("width",String(b)),n.setAttribute("height",String(W)),n.setAttribute("viewBox",`0 0 ${b} ${W}`),n.setAttribute("aria-hidden","true");const s=document.createElementNS(p,"defs"),i=`vsnotif-goo-${t.id}`,o=document.createElementNS(p,"filter");o.setAttribute("id",i),o.setAttribute("x","-20%"),o.setAttribute("y","-20%"),o.setAttribute("width","140%"),o.setAttribute("height","140%"),o.setAttribute("color-interpolation-filters","sRGB");const d=document.createElementNS(p,"feGaussianBlur");d.setAttribute("in","SourceGraphic"),d.setAttribute("stdDeviation",String(Math.max(2,t.roundness*.5))),d.setAttribute("result","blur");const l=document.createElementNS(p,"feColorMatrix");l.setAttribute("in","blur"),l.setAttribute("mode","matrix"),l.setAttribute("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"),l.setAttribute("result","goo");const a=document.createElementNS(p,"feComposite");a.setAttribute("in","SourceGraphic"),a.setAttribute("in2","goo"),a.setAttribute("operator","atop"),o.append(d,l,a),s.appendChild(o);const r=document.createElementNS(p,"g");r.setAttribute("filter",`url(#${i})`);const f=document.createElementNS(p,"rect");f.setAttribute("class","vsn__pill"),f.setAttribute("height",String(u)),f.setAttribute("rx",String(t.roundness)),f.setAttribute("ry",String(t.roundness));const m=document.createElementNS(p,"rect");m.setAttribute("class","vsn__body"),m.setAttribute("x","0"),m.setAttribute("width",String(b)),m.setAttribute("rx",String(t.roundness)),m.setAttribute("ry",String(t.roundness)),r.append(f,m),n.append(s,r);const $=document.createElement("div");$.className="vsn__head",$.style.height=`${u}px`;const A=document.createElement("div");A.className="vsn__head-inner";const E=document.createElement("span");E.className="vsn__badge",E.setAttribute("aria-hidden","true");const h={success:k(C.success),error:k(C.error),warn:k(C.warn),loading:k(C.loading,!0),info:k(C.info)};E.append(h.success,h.error,h.warn,h.loading,h.info);const Y=document.createElement("span");Y.className="vsn__title",A.append(E,Y),$.appendChild(A);const R=document.createElement("div");R.className="vsn__content";const S=document.createElement("div");S.className="vsn__content-inner";const j=document.createElement("p");j.className="vsn__desc";const T=document.createElement("a");T.className="vsn__action",T.href="#",S.append(j,T),R.appendChild(S),e.append(n,$,R),e.addEventListener("click",()=>bt(t)),T.addEventListener("click",U=>{U.stopPropagation(),U.preventDefault(),ht(t)}),e.addEventListener("mouseenter",()=>G(t)),e.addEventListener("mouseleave",()=>et(t));const B=new ResizeObserver(()=>{I(t),y(t)});B.observe(A),B.observe(S),t._dom={panel:e,pillRect:f,bodyRect:m,blurF:d,headerInner:A,contentInner:S,content:R,badge:E,icons:h,titleEl:Y,descEl:j,actionEl:T,ro:B,open:!1,ready:!1,pillWidth:160,contentH:0,expandTimer:0,swapTimer:0},vt(t.position).appendChild(e),H(t),I(t),t._dom.pillRect.style.transition="none",t._dom.bodyRect.style.transition="none",y(t),t._dom.panel.offsetWidth,t._dom.pillRect.style.transition="",t._dom.bodyRect.style.transition="",requestAnimationFrame(()=>{t._dom&&(t._dom.ready=!0,D(t),q("vs-notify-show",{id:t.id}),V(t)&&t.state!=="loading"&&(t._dom.expandTimer=setTimeout(()=>G(t),Z)))})}function _t(t){const e=t._dom;e&&(e.expandTimer&&clearTimeout(e.expandTimer),e.swapTimer&&clearTimeout(e.swapTimer),e.ro.disconnect(),e.panel.remove(),t._dom=null,ft(t.position))}let N;function xt(t){if(N||=document.createElement("canvas").getContext("2d"),!N)return null;N.fillStyle="#000",N.fillStyle=t;const e=N.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const n=e.match(/[\d.]+/g);return n&&n.length>=3?[+n[0],+n[1],+n[2]]:null}const yt=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function X(t,e){const n=e?xt(String(e).trim()):null;if(!n){for(const r of yt)t.style.removeProperty(r);return}const s=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),o=.2126*s(n[0])+.7152*s(n[1])+.0722*s(n[2])>.45,d=`rgb(${n[0]} ${n[1]} ${n[2]})`,l=n.map(r=>Math.round(o?r*.92:r+(255-r)*.16)),a=(r,f)=>t.style.setProperty(r,f);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])a(r,d);a("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])a(r,n.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])a(r,o?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])a(r,o?"0 0 0":"255 255 255");a("--vs-color",d),a("--vs-color-rgb",n.join(" ")),a("--vs-color-fg",o?"#0b0b0b":"#ffffff")}class M extends HTMLElement{static observedAttributes=["title","description","state","variant","position","roundness","duration","color"];#s;#i;#o;#r;#a;#e=0;constructor(){super();const e=this.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=at;const s=document.createElement("div");s.className="vsn-demo";const i=document.createElement("div");i.className="vsn-demo__row";const o=(d,l)=>{const a=document.createElement("button");return a.type="button",a.className=l?`vsn-demo__btn ${l}`:"vsn-demo__btn",a.textContent=d,a};this.#s=o("Trigger (panel)"),this.#i=o("Success","vsn-demo__btn--ok"),this.#o=o("Error","vsn-demo__btn--err"),this.#r=o("Warn","vsn-demo__btn--warn"),this.#a=o("Loading → Success"),i.append(this.#s,this.#i,this.#o,this.#r,this.#a),s.appendChild(i),e.append(n,s),this.#s.addEventListener("click",()=>this.#d()),this.#i.addEventListener("click",()=>this.#c("success","Done")),this.#o.addEventListener("click",()=>this.#c("error","Something failed")),this.#r.addEventListener("click",()=>this.#c("warn","Attention")),this.#a.addEventListener("click",()=>this.#l())}connectedCallback(){X(this,this.getAttribute("color")),P||(P=this,pt())}disconnectedCallback(){clearTimeout(this.#e),this.#e=0,P===this&&(ut(),P=null)}attributeChangedCallback(){X(this,this.getAttribute("color"))}#t(e,n){const s=this.getAttribute(e);return s===null?n:s}#n(e,n){const s=Number(this.getAttribute(e));return Number.isFinite(s)?s:n}#d(){c({title:this.#t("title","Changes saved"),description:this.#t("description","Saved successfully to the database. Refresh to see the changes."),state:this.#t("state","success"),variant:this.#t("variant","solid"),position:this.#t("position","top-center"),roundness:this.#n("roundness",16),duration:this.#n("duration",6e3)})}#c(e,n){c({title:n,state:e,variant:this.#t("variant","solid"),position:this.#t("position","top-center"),roundness:this.#n("roundness",16)})}#l(){const e=this.#t("variant","solid"),n=this.#t("position","top-center"),s=this.#n("roundness",16),i=c.loading("Saving…",{variant:e,position:n,roundness:s});clearTimeout(this.#e),this.#e=setTimeout(()=>{c.update(i,{state:"success",title:"Saved",description:"Your changes are now in the database.",duration:4e3})},1800)}}customElements.define("vs-notification",M);window.vsNotify=c;M.notify=c;M.update=J;M.dismiss=w;M.dismissAll=Q;export{w as dismiss,Q as dismissAll,c as notify,lt as remove,J as update};
