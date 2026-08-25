function g(){return matchMedia("(prefers-reduced-motion: reduce)").matches}const p={dangerWarn:[["M12 9V14",1.5],["M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z",1.5],["M11.9945 17H12.0035",2]],success:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M7.75 11.9999L10.58 14.8299L16.25 9.16992",1.5]],default:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M12 8V13",1.5],["M11.9945 16H12.0035",2]]},u="http://www.w3.org/2000/svg";function h(a){const t=document.createElementNS(u,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const[e,n]of a){const s=document.createElementNS(u,"path");s.setAttribute("d",e),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width",String(n)),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),t.appendChild(s)}return t}const f=`
  :host { display: block; }
  .bnr {
    --accent: var(--inp-accent, #ededed);
    --ring: var(--inp-ring, 255 255 255);
    --tint: var(--vs-color, var(--text-secondary, #a1a1a1));
    --ease: var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1));
    position: relative; isolation: isolate; box-sizing: border-box;
    display: flex; align-items: flex-start; gap: 12px;
    width: 100%; max-width: 480px;
    padding: 14px 16px 14px 18px;
    border: 1px solid rgb(var(--ring) / 0.14); border-radius: 12px;
    background:
      linear-gradient(90deg, color-mix(in srgb, var(--accent) 12%, transparent), transparent 30%),
      var(--bg-card, #111);
    color: var(--inp-text, #ededed);
    font: inherit; line-height: 1.45; overflow: hidden;
  }

  /* thick accent bar on the left */
  .bnr__bar { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--accent); box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 40%, transparent); }

  .bnr__icon { flex: 0 0 auto; margin-top: 1px; color: var(--accent); font-size: 16px; display: inline-flex; }
  .bnr__icon svg { width: 1.2em; height: 1.2em; display: block; }

  .bnr__body { flex: 1 1 auto; min-width: 0; }
  .bnr__title { margin: 0 0 2px; font-weight: 650; font-size: 14px; }
  .bnr__msg { margin: 0; font-size: 13px; color: var(--tint); }
  .bnr__action { margin-top: 9px; display: flex; gap: 8px; flex-wrap: wrap; }

  .bnr__close {
    flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center;
    width: 1.6em; height: 1.6em; margin: -2px -4px 0 0; padding: 0;
    border: 0; border-radius: 7px; background: transparent; color: inherit; font-size: 15px;
    cursor: pointer; opacity: 0.55; transition: opacity 160ms ease, background 160ms ease;
  }
  .bnr__close:hover:not(:disabled) { opacity: 1; background: rgb(var(--ring) / 0.14); }
  .bnr__close:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
  .bnr__close svg { width: 1em; height: 1em; display: block; }

  /* auto-dismiss progress bar (pauses on hover) */
  .bnr__progress {
    position: absolute; left: 0; bottom: 0; height: 3px; width: 100%;
    transform-origin: left center;
    background: var(--accent);
    animation: bnr-count linear forwards;
  }
  .bnr:hover .bnr__progress { animation-play-state: paused; }
  @keyframes bnr-count { from { transform: scaleX(1); } to { transform: scaleX(0); } }

  /* tones */
  .bnr--t-danger { --accent: #ff6369; --ui-accent-fg: #fff; --ring: 255 99 105; --tint: var(--inp-t-danger-hint, #ff8a8e); }
  .bnr--t-warn { --accent: #ffb224; --ui-accent-fg: #160f02; --ring: 255 178 36; --tint: var(--inp-t-warn-hint, #f5b544); }
  .bnr--t-success { --accent: #4cc38a; --ui-accent-fg: #fff; --ring: 76 195 138; --tint: var(--inp-t-success-hint, #5fd49b); }

  .bnr.is-disabled { opacity: 0.55; }
  .bnr.is-disabled .bnr__close { cursor: not-allowed; }

  /* dismiss: collapse height to 0 with anticipation bounce + blur */
  .bnr.is-closing {
    overflow: hidden; opacity: 0; filter: blur(6px); transform: scale(0.97);
    padding-top: 0 !important; padding-bottom: 0 !important;
    margin-top: 0 !important; margin-bottom: 0 !important;
    border-top-width: 0 !important; border-bottom-width: 0 !important;
    transition:
      height 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      opacity 300ms ease,
      filter 340ms ease,
      transform 440ms cubic-bezier(0.5, -0.45, 0.55, 1),
      padding 440ms cubic-bezier(0.5, -0.45, 0.55, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .bnr__close { transition: none; }
    .bnr__progress { animation: none; display: none; }
  }
`;let d;function v(a){if(d||=document.createElement("canvas").getContext("2d"),!d)return null;d.fillStyle="#000",d.fillStyle=a;const t=d.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const y=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function m(a,t){const e=t?v(String(t).trim()):null;if(!e){for(const i of y)a.style.removeProperty(i);return}const n=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*n(e[0])+.7152*n(e[1])+.0722*n(e[2])>.45,c=`rgb(${e[0]} ${e[1]} ${e[2]})`,l=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),o=(i,b)=>a.style.setProperty(i,b);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,c);o("--btn-primary-bg-hover",`rgb(${l[0]} ${l[1]} ${l[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,r?"0 0 0":"255 255 255");o("--vs-color",c),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class x extends HTMLElement{static observedAttributes=["title","message","tone","icon","dismissible","duration","disabled","color"];#i;#a;#n;#h;#b;#p;#c;#r;#l;#u;#m;#s;#o;#t;#e;#g=!1;#d=0;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=f,this.#i=document.createElement("div"),this.#a=document.createElement("span"),this.#a.className="bnr__bar",this.#a.setAttribute("aria-hidden","true"),this.#n=document.createElement("span"),this.#n.className="bnr__icon",this.#n.setAttribute("aria-hidden","true"),this.#c=document.createElement("slot"),this.#c.name="icon",this.#h=h(p.dangerWarn),this.#b=h(p.success),this.#p=h(p.default),this.#c.append(this.#h,this.#b,this.#p),this.#n.appendChild(this.#c);const n=document.createElement("div");n.className="bnr__body",this.#r=document.createElement("p"),this.#r.className="bnr__title",this.#l=document.createElement("p"),this.#l.className="bnr__msg",this.#u=document.createElement("slot"),this.#m=document.createTextNode(""),this.#u.appendChild(this.#m),this.#l.appendChild(this.#u),this.#s=document.createElement("div"),this.#s.className="bnr__action",this.#s.hidden=!0,this.#o=document.createElement("slot"),this.#o.name="action",this.#s.appendChild(this.#o),this.#o.addEventListener("slotchange",()=>{this.#s.hidden=this.#o.assignedNodes({flatten:!0}).length===0}),n.append(this.#r,this.#l,this.#s),this.#t=document.createElement("button"),this.#t.className="bnr__close",this.#t.type="button",this.#t.setAttribute("aria-label","Close alert");const s=h([["M6 6L18 18",1.5],["M18 6L6 18",1.5]]);this.#t.appendChild(s),this.#t.addEventListener("click",()=>this.#x()),this.#e=document.createElement("span"),this.#e.className="bnr__progress",this.#e.setAttribute("aria-hidden","true"),this.#e.hidden=!0,this.#i.append(this.#a,this.#n,n,this.#t,this.#e),t.append(e,this.#i)}connectedCallback(){m(this,this.getAttribute("color")),this.setAttribute("role","alert"),this.#v(),this.#y()}disconnectedCallback(){this.#f()}attributeChangedCallback(t){m(this,this.getAttribute("color")),this.#i&&(this.#v(),(t==="duration"||t==="disabled")&&(this.#f(),this.#y()))}#v(){const t=(i,b)=>this.getAttribute(i)??b,e=this.hasAttribute("disabled"),n=this.hasAttribute("dismissible"),s=this.hasAttribute("icon"),r=t("tone","default"),c=t("title","Heads up"),l=t("message","Your session expires in 5 minutes."),o=Number(t("duration","0"))||0;this.#i.className=`bnr bnr--t-${r}${e?" is-disabled":""}${this.#g?" is-closing":""}`,this.#n.style.display=s?"":"none",this.#h.style.display=r==="danger"||r==="warn"?"":"none",this.#b.style.display=r!=="success"?"none":"",this.#p.style.display=r==="danger"||r==="warn"||r==="success"?"none":"",this.#r.textContent=c,this.#r.hidden=!c,this.#m.textContent=l,this.#t.style.display=n?"":"none",this.#t.disabled=e,this.#e.hidden=o<=0,this.#e.style.animationDuration=o>0?`${o}ms`:""}#y(){const t=Number(this.getAttribute("duration"))||0;t>0&&!this.hasAttribute("disabled")&&(this.#d=setTimeout(()=>this.#x(),t))}#f(){this.#d&&(clearTimeout(this.#d),this.#d=0)}#x(){if(this.hasAttribute("disabled")||this.#g)return;this.#f();const t=this.#i;if(!t||g()){this.#_();return}const e=t.getBoundingClientRect().height;t.style.height=`${e}px`,this.#g=!0,t.classList.add("is-closing"),t.offsetHeight,requestAnimationFrame(()=>{t.style.height="0px"});const n=s=>{s.propertyName==="height"&&(t.removeEventListener("transitionend",n),this.#_())};t.addEventListener("transitionend",n)}#_(){this.style.display="none",this.dispatchEvent(new CustomEvent("dismiss",{bubbles:!0,composed:!0}))}}customElements.define("vs-alert-banner",x);
