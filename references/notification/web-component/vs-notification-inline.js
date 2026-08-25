function m(){return matchMedia("(prefers-reduced-motion: reduce)").matches}const u={success:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M7.75 11.9999L10.58 14.8299L16.25 9.16992",1.5]],error:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M9.17004 14.8299L14.83 9.16992",1.5],["M14.83 14.8299L9.17004 9.16992",1.5]],warn:[["M12 9V14",1.5],["M12.0001 21.4093H5.94005C2.47005 21.4093 1.02005 18.9293 2.70005 15.8993L5.82006 10.2793L8.76006 4.9993C10.5401 1.7893 13.4601 1.7893 15.2401 4.9993L18.1801 10.2893L21.3001 15.9093C22.9801 18.9393 21.5201 21.4193 18.0601 21.4193H12.0001V21.4093Z",1.5],["M11.9945 17H12.0035",2]],info:[["M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",1.5],["M12 8V13",1.5],["M11.9945 16H12.0035",2]]},b="http://www.w3.org/2000/svg";function d(l){const t=document.createElementNS(b,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const[e,s]of l){const n=document.createElementNS(b,"path");n.setAttribute("d",e),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width",String(s)),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),t.appendChild(n)}return t}const g=`
  :host { display: block; }
  .nin {
    --acc: var(--ui-accent, #ededed);
    --acc-rgb: var(--ui-ring, 255 255 255);
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    max-width: 480px;
    padding: 14px 14px 14px 18px;
    border-radius: 12px;
    border: 1px solid color-mix(in srgb, rgb(var(--acc-rgb)) 30%, var(--border, #2a2a2a));
    background: color-mix(in srgb, rgb(var(--acc-rgb)) 9%, var(--bg-card, #141414));
    color: var(--text, #ededed);
    overflow: hidden;
    font-family: inherit;
    box-sizing: border-box;
  }
  .nin--success { --acc: #4cc38a; --acc-rgb: 76 195 138; }
  .nin--error { --acc: #ff6369; --acc-rgb: 255 99 105; }
  .nin--warn { --acc: #ffb224; --acc-rgb: 255 178 36; }
  .nin--info { --acc: #6e9bff; --acc-rgb: 110 155 255; }

  /* left accent bar */
  .nin__bar { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--acc); }

  .nin__icon { display: inline-flex; flex: none; color: var(--acc); padding-top: 1px; }
  .nin__icon svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
  .nin__text { display: flex; flex-direction: column; gap: 3px; flex: 1 1 auto; min-width: 0; }
  .nin__title { font-size: 14px; font-weight: 600; }
  .nin__desc { font-size: 13px; line-height: 1.55; color: var(--text-secondary, #b4b4b4); }
  .nin__close {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    margin: -2px -2px 0 0;
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary, #a1a1a1);
    cursor: pointer;
    transition: background-color 160ms ease, color 160ms ease;
  }
  .nin__close:hover { background: var(--inp-hover-bg, rgba(255, 255, 255, 0.08)); color: var(--text, #ededed); }
  .nin__close svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

  /* collapse out on dismiss (matches the SFC's <Transition name="nin"> leave — fade + lift, no height collapse) */
  .nin-leave-active { transition: opacity 220ms ease, transform 220ms ease; }
  .nin-leave-to { opacity: 0; transform: translateY(-4px); }

  @media (prefers-reduced-motion: reduce) {
    .nin-leave-active { transition: none; }
  }
`;let h;function v(l){if(h||=document.createElement("canvas").getContext("2d"),!h)return null;h.fillStyle="#000",h.fillStyle=l;const t=h.fillStyle;if(t.charAt(0)==="#")return[parseInt(t.slice(1,3),16),parseInt(t.slice(3,5),16),parseInt(t.slice(5,7),16)];const e=t.match(/[\d.]+/g);return e&&e.length>=3?[+e[0],+e[1],+e[2]]:null}const x=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function p(l,t){const e=t?v(String(t).trim()):null;if(!e){for(const i of x)l.style.removeProperty(i);return}const s=i=>(i/=255,i<=.03928?i/12.92:((i+.055)/1.055)**2.4),r=.2126*s(e[0])+.7152*s(e[1])+.0722*s(e[2])>.45,a=`rgb(${e[0]} ${e[1]} ${e[2]})`,c=e.map(i=>Math.round(r?i*.92:i+(255-i)*.16)),o=(i,f)=>l.style.setProperty(i,f);for(const i of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(i,a);o("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const i of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(i,e.join(" "));for(const i of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(i,r?"#0b0b0b":"#ffffff");for(const i of["--btn-primary-rip","--btn-primary-glow"])o(i,r?"0 0 0":"255 255 255");o("--vs-color",a),o("--vs-color-rgb",e.join(" ")),o("--vs-color-fg",r?"#0b0b0b":"#ffffff")}class y extends HTMLElement{static observedAttributes=["state","title","description","closable","visible","color"];#t;#n;#r;#a;#c;#i;#o=!1;#s=!1;#l=!1;#e=null;constructor(){super();const t=this.attachShadow({mode:"open"}),e=document.createElement("style");e.textContent=g,this.#t=document.createElement("div"),this.#t.setAttribute("role","alert");const s=document.createElement("span");s.className="nin__bar",s.setAttribute("aria-hidden","true");const n=document.createElement("span");n.className="nin__icon",n.setAttribute("aria-hidden","true"),this.#n={success:d(u.success),error:d(u.error),warn:d(u.warn),info:d(u.info)},n.append(this.#n.success,this.#n.error,this.#n.warn,this.#n.info);const r=document.createElement("div");r.className="nin__text",this.#r=document.createElement("span"),this.#r.className="nin__title";const a=document.createElement("span");a.className="nin__desc",this.#a=document.createElement("slot"),this.#c=document.createTextNode(""),this.#a.appendChild(this.#c),a.appendChild(this.#a),r.append(this.#r,a),this.#i=document.createElement("button"),this.#i.type="button",this.#i.className="nin__close",this.#i.setAttribute("aria-label","Dismiss"),this.#i.appendChild(d([["M6 6L18 18",1.5],["M18 6L6 18",1.5]])),this.#i.addEventListener("click",()=>this.#u()),this.#t.append(s,n,r,this.#i),t.append(e,this.#t)}connectedCallback(){p(this,this.getAttribute("color")),this.#d();const t=this.getAttribute("visible")!=="false";this.#o=!t,this.style.display=t?"":"none",this.#t.classList.remove("nin-leave-active","nin-leave-to"),this.#l=!0}disconnectedCallback(){this.#e&&(this.#t.removeEventListener("transitionend",this.#e),this.#e=null),this.#s=!1}attributeChangedCallback(t){p(this,this.getAttribute("color")),this.#t&&(this.#d(),t==="visible"&&this.#l&&(this.getAttribute("visible")!=="false"?this.#b():this.#p()))}#d(){const t=(c,o)=>this.getAttribute(c)??o,e=t("state","warn"),s=["success","error","warn"].includes(e)?e:"info",n=t("title",""),r=t("description",""),a=this.hasAttribute("closable");this.#t.className=`nin nin--${s}`;for(const c of Object.keys(this.#n))this.#n[c].style.display=c===s?"":"none";this.#r.textContent=n,this.#r.hidden=!n,this.#c.textContent=r,this.#i.style.display=a?"":"none"}#u(){this.hasAttribute("closable")&&(this.getAttribute("visible")!=="false"&&this.setAttribute("visible","false"),this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0})))}#b(){!this.#o&&!this.#s||(this.#e&&(this.#t.removeEventListener("transitionend",this.#e),this.#e=null),this.#s=!1,this.#o=!1,this.#t.classList.remove("nin-leave-active","nin-leave-to"),this.style.display="")}#p(){if(!(this.#o||this.#s)){if(m()){this.#h();return}this.#s=!0,this.#t.classList.add("nin-leave-active"),requestAnimationFrame(()=>{this.#t.classList.add("nin-leave-to")}),this.#e=t=>{t.target!==this.#t||t.propertyName!=="opacity"||(this.#t.removeEventListener("transitionend",this.#e),this.#e=null,this.#h())},this.#t.addEventListener("transitionend",this.#e)}}#h(){this.#s=!1,this.#o=!0,this.style.display="none",this.#t.classList.remove("nin-leave-active","nin-leave-to")}}customElements.define("vs-notification-inline",y);
