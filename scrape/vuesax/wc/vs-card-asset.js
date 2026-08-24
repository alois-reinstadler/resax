import{FX_CSS as f,attachGlow as v}from"./vs-fx.CLXiCjCI.js";const m="http://www.w3.org/2000/svg",x=["M16.44 8.90039C20.04 9.21039 21.51 11.0604 21.51 15.1104V15.2404C21.51 19.7104 19.72 21.5004 15.25 21.5004H8.73998C4.26998 21.5004 2.47998 19.7104 2.47998 15.2404V15.1104C2.47998 11.0904 3.92998 9.24039 7.46998 8.91039","M12 2V14.88","M15.3499 12.6504L11.9999 16.0004L8.6499 12.6504"],u=["M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z","M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z"],_=["M20.46 6.17969L8.82003 17.8197L3.53003 12.5297"],y=["M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697","M3.5 12H20.33"];function d(n,e="1.6"){const t=document.createElementNS(m,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("fill","none"),t.setAttribute("aria-hidden","true");for(const a of n){const s=document.createElementNS(m,"path");s.setAttribute("d",a),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width",e),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),t.appendChild(s)}return t}const w=`
  :host { display: block; }
  ${f}
  .ca {
    --r: var(--ctrl-r-md, 12px);
    --mr: 12px;                       /* media corner */
    --ink: var(--vs-color, var(--text, #ededed));      /* pure ink: white on dark, black on light */
    --paper: var(--bg, #000);
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* centered island — a max-width card must not hug the left edge of its box */
    margin-inline: auto;
    text-align: left;
    font-family: inherit;
    text-decoration: none;
    color: var(--text, #ededed);
    border-radius: calc(var(--r, 12px) * var(--r-mult, 1) + 10px);
    border: 1px solid var(--border, #232323);
    background: var(--card-bg, var(--bg-card, #141414));
    /* NO lift: the outline is the only thing that reacts */
    transition: border-color 180ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ca--sm { --r: var(--ctrl-r-sm, 10px); --mr: 10px; max-width: 320px; }
  .ca--md { --r: var(--ctrl-r-md, 12px); --mr: 12px; max-width: 380px; }
  .ca--lg { --r: var(--ctrl-r-lg, 14px); --mr: 14px; max-width: 440px; }

  .ca--r-none { --r: 0px; --mr: 0px; }
  .ca--r-subtle { --r: 8px; --mr: 6px; }
  .ca--r-pill { --r: 28px; --mr: 20px; }
  @supports (corner-shape: squircle) {
    .ca--r-squircle { corner-shape: squircle; --r-mult: 1.5; }
  }

  .ca--outlined { background: transparent; }
  .ca--soft {
    background: var(--card-soft-bg, var(--bg-elevated, rgba(255, 255, 255, 0.035)));
    border-color: transparent;
  }
  .ca:hover:not(.is-disabled),
  .ca:focus-visible { border-color: var(--ink); outline: none; }
  .is-disabled { opacity: 0.5; pointer-events: none; }

  .ca__glow { --glow-inset: -1px; }
  .ca:not(.ca--glow) .ca__glow { display: none; }
  @supports (corner-shape: squircle) {
    .ca--r-squircle .ca__glow { corner-shape: squircle; }
  }

  /* media sits INSET from the card edge, so the cover reads as a framed
     thumbnail; aspect-ratio resolves on the border box, so the padding eats
     into the media instead of growing the card */
  .ca__preview {
    position: relative;
    z-index: 2;
    display: grid;
    place-items: center;
    overflow: hidden;
    padding: 10px;
  }
  .ca__cover {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    /* hold the horizon a touch above centre — a dead-centre crop of a 16/9
       landscape puts empty sky in the top half of a 16/10 frame */
    object-position: center 60%;
    border-radius: var(--mr);
    /* RULE: media corners come from clip-path, not border-radius alone — a
       <video> drops its bottom corners during GPU playback, an <img> doesn't,
       and the two must match. */
    clip-path: inset(0 round var(--mr));
    transition: transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .ca:hover .ca__cover { transform: scale(1.03); }

  /* flag row over the media's top-left corner (offsets add the 10px gutter back) */
  .ca__flags {
    position: absolute;
    top: 18px;
    left: 18px;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 4px;
    pointer-events: none;
  }
  .ca__new {
    display: inline-flex;
    align-items: center;
    height: 18px;
    padding: 0 8px;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: 999px;
    color: #0b0b0b;
    background: color-mix(in srgb, #fff 92%, transparent);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
  }

  /* hover actions: glass squircles top-right, grown in from blurred + small */
  .ca__acts {
    position: absolute;
    top: 18px;
    right: 18px;
    z-index: 3;
    display: flex;
    gap: 6px;
  }
  .ca__act {
    width: 36px;
    height: 36px;
    padding: 0;
    display: grid;
    place-items: center;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(18, 18, 18, 0.42);
    -webkit-backdrop-filter: blur(12px) saturate(140%);
    backdrop-filter: blur(12px) saturate(140%);
    color: #fff;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.7);
    filter: blur(6px);
    transition:
      opacity var(--dur-fast, 200ms) var(--ease-out, ease),
      filter var(--dur-fast, 200ms) var(--ease-out, ease),
      background-color 180ms var(--ease-out, ease),
      transform var(--dur-mid, 240ms) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }
  @supports (corner-shape: squircle) {
    .ca__act { corner-shape: squircle; border-radius: 18px; }
  }
  .ca__act svg { width: 17px; height: 17px; }
  .ca:hover .ca__act,
  .ca__act:focus-visible { opacity: 1; transform: none; filter: none; }
  .ca__act:hover { background: rgba(18, 18, 18, 0.66); }
  .ca__act:active { transform: scale(0.94); }
  .ca__act.is-done { color: #6ee7a8; }
  @media (hover: none) {
    .ca__act { opacity: 1; transform: none; filter: none; }
  }

  .ca__foot {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 4px 16px 16px;
  }
  .ca__meta { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
  .ca__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text, #ededed);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ca__cat { font-size: 12px; color: var(--text-muted, #8a8a8a); }

  /* arrow disc — inverts on hover: ink circle + paper arrow, so it flips with
     the theme on its own (no second icon, no hardcoded stroke colour) */
  .ca__go {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    border: 1px solid var(--border, #232323);
    color: var(--text-muted, #8a8a8a);
    transition:
      transform 220ms var(--ease-out, ease),
      background-color 220ms var(--ease-out, ease),
      border-color 220ms var(--ease-out, ease),
      color 220ms var(--ease-out, ease);
  }
  .ca__go svg { width: 16px; height: 16px; }
  .ca:hover .ca__go {
    transform: translateX(2px);
    background: var(--ink);
    border-color: var(--ink);
    color: var(--paper);
  }

  @media (prefers-reduced-motion: reduce) {
    .ca__cover,
    .ca__go { transition: none; }
    .ca:hover .ca__cover { transform: none; }
    .ca__act { transition: opacity var(--dur-fast, 200ms) var(--ease-out, ease); transform: none; filter: none; }
  }
`;let p;function k(n){if(p||=document.createElement("canvas").getContext("2d"),!p)return null;p.fillStyle="#000",p.fillStyle=n;const e=p.fillStyle;if(e.charAt(0)==="#")return[parseInt(e.slice(1,3),16),parseInt(e.slice(3,5),16),parseInt(e.slice(5,7),16)];const t=e.match(/[\d.]+/g);return t&&t.length>=3?[+t[0],+t[1],+t[2]]:null}const C=["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink","--ui-ring","--inp-ring","--fx-tint","--ring","--rip","--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg","--btn-primary-rip","--btn-primary-glow","--btn-primary-bg-hover","--vs-color","--vs-color-rgb","--vs-color-fg"];function b(n,e){const t=e?k(String(e).trim()):null;if(!t){for(const r of C)n.style.removeProperty(r);return}const a=r=>(r/=255,r<=.03928?r/12.92:((r+.055)/1.055)**2.4),i=.2126*a(t[0])+.7152*a(t[1])+.0722*a(t[2])>.45,l=`rgb(${t[0]} ${t[1]} ${t[2]})`,c=t.map(r=>Math.round(i?r*.92:r+(255-r)*.16)),o=(r,h)=>n.style.setProperty(r,h);for(const r of["--ui-accent","--inp-accent","--btn-primary-bg","--card-ink"])o(r,l);o("--btn-primary-bg-hover",`rgb(${c[0]} ${c[1]} ${c[2]})`);for(const r of["--ui-ring","--inp-ring","--fx-tint","--ring","--rip"])o(r,t.join(" "));for(const r of["--ui-accent-fg","--badge-solid-fg","--btn-primary-fg","--accent-fg"])o(r,i?"#0b0b0b":"#ffffff");for(const r of["--btn-primary-rip","--btn-primary-glow"])o(r,i?"0 0 0":"255 255 255");o("--vs-color",l),o("--vs-color-rgb",t.join(" ")),o("--vs-color-fg",i?"#0b0b0b":"#ffffff")}class E extends HTMLElement{static observedAttributes=["variant","size","radius","image","media","badge","title","meta","href","actions","arrow","glow","disabled","color"];#e;#m;#i;#a;#c;#u;#l;#r;#t;#o;#d;#p;#h;#n;#b;#g=0;#v=e=>{e.preventDefault(),e.stopPropagation();const t=this.getAttribute("image")??"";if(!t)return;const a=document.createElement("a");a.href=t,a.download=(t.split("/").pop()||"asset").split("?")[0],a.rel="noopener",document.body.appendChild(a),a.click(),a.remove(),this.dispatchEvent(new CustomEvent("download",{bubbles:!0,composed:!0,detail:{src:t}}))};#x=async e=>{e.preventDefault(),e.stopPropagation();const t=this.getAttribute("image")??"";if(!t)return;const a=new URL(t,location.href).href;try{await navigator.clipboard?.writeText(a)}catch{}this.#t.classList.add("is-done"),this.#o.replaceChildren(d(_,"1.9")),clearTimeout(this.#g),this.#g=setTimeout(()=>{this.#t.classList.remove("is-done"),this.#o.replaceChildren(d(u))},1400),this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0,detail:{src:a}}))};constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("style");t.textContent=w,this.#e=document.createElement("a"),this.#e.className="ca",this.#m=document.createElement("span"),this.#m.className="fx-glow ca__glow",this.#m.setAttribute("aria-hidden","true"),this.#i=document.createElement("div"),this.#i.className="ca__preview",this.#c=document.createElement("div"),this.#c.className="ca__flags",this.#u=document.createElement("span"),this.#u.className="ca__new",this.#c.appendChild(this.#u),this.#a=document.createElement("img"),this.#a.className="ca__cover",this.#a.loading="lazy",this.#a.decoding="async",this.#a.draggable=!1,this.#l=document.createElement("div"),this.#l.className="ca__acts",this.#r=document.createElement("button"),this.#r.type="button",this.#r.className="ca__act ca__act--dl",this.#r.appendChild(d(x)),this.#t=document.createElement("button"),this.#t.type="button",this.#t.className="ca__act ca__act--copy",this.#o=document.createElement("span"),this.#o.style.display="grid",this.#o.appendChild(d(u)),this.#t.appendChild(this.#o),this.#l.append(this.#r,this.#t),this.#i.append(this.#c,this.#a,this.#l),this.#d=document.createElement("div"),this.#d.className="ca__foot";const a=document.createElement("div");a.className="ca__meta",this.#p=document.createElement("span"),this.#p.className="ca__name",this.#h=document.createElement("span"),this.#h.className="ca__cat",a.append(this.#p,this.#h),this.#n=document.createElement("span"),this.#n.className="ca__go",this.#n.setAttribute("aria-hidden","true"),this.#n.appendChild(d(y,"1.7")),this.#d.append(a,this.#n),this.#e.append(this.#m,this.#i,this.#d),e.append(t,this.#e),this.#r.addEventListener("click",this.#v),this.#t.addEventListener("click",this.#x)}connectedCallback(){b(this,this.getAttribute("color")),this.#f(),this.#b=v(this.#e,220,()=>this.#s("disabled")||!this.#s("glow",!0))}disconnectedCallback(){this.#b?.(),this.#b=null,clearTimeout(this.#g)}attributeChangedCallback(){b(this,this.getAttribute("color")),this.#e&&this.#f()}#s(e,t=!1){const a=this.getAttribute(e);return a===null?t:a!=="false"&&a!=="0"}#f(){const e=(h,g)=>this.getAttribute(h)??g,t=this.#s("disabled"),a=this.#s("glow",!0),s=e("image",""),i=e("title",""),l=e("badge",""),c=e("href","");this.#e.className=`ca ca--${e("variant","elevated")} ca--${e("size","md")} ca--r-${e("radius","squircle")}`+(a?" ca--glow":"")+(t?" is-disabled":""),c&&!t?this.#e.setAttribute("href",c):this.#e.removeAttribute("href"),this.#i.style.aspectRatio=e("media","16/10"),this.#i.style.display=s?"":"none",this.#a.getAttribute("src")!==s&&this.#a.setAttribute("src",s),this.#a.setAttribute("alt",i),this.#u.textContent=l,this.#c.style.display=l?"":"none";const o=this.#s("actions",!0)&&!!s;this.#l.style.display=o?"":"none",this.#r.setAttribute("aria-label",`Download ${i||"asset"}`),this.#t.setAttribute("aria-label",`Copy the link to ${i||"asset"}`),this.#r.disabled=t,this.#t.disabled=t;const r=e("meta","");this.#p.textContent=i,this.#p.style.display=i?"":"none",this.#h.textContent=r,this.#h.style.display=r?"":"none",this.#n.style.display=this.#s("arrow",!0)?"":"none",this.#d.style.display=i||r||this.#s("arrow",!0)?"":"none"}}customElements.define("vs-card-asset",E);
