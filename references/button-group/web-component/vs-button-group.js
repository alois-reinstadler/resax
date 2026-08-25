import{_ as h}from"./preload-helper.BlTxHScW.js";const n="vs-button-group-parts",l="var(--vsg-divider, var(--border, rgba(140,140,140,.35)))",u=`
vs-button-group[data-attached]:not([data-vertical]) > *:not(:first-child)::part(button){ border-top-left-radius:0; border-bottom-left-radius:0; }
vs-button-group[data-attached]:not([data-vertical]) > *:not(:last-child)::part(button){ border-top-right-radius:0; border-bottom-right-radius:0; }
vs-button-group[data-attached][data-vertical] > *:not(:first-child)::part(button){ border-top-left-radius:0; border-top-right-radius:0; }
vs-button-group[data-attached][data-vertical] > *:not(:last-child)::part(button){ border-bottom-left-radius:0; border-bottom-right-radius:0; }
vs-button-group[data-attached][data-divider]:not([data-vertical]) > *:not(:first-child)::part(button){ box-shadow: inset 1px 0 0 ${l}; }
vs-button-group[data-attached][data-divider][data-vertical] > *:not(:first-child)::part(button){ box-shadow: inset 0 1px 0 ${l}; }
`;function b(){if(typeof document>"u"||document.getElementById(n))return;const r=document.createElement("style");r.id=n,r.textContent=u,document.head.append(r)}const p=`
  :host { display: inline-flex; vertical-align: middle; }
  :host([block]) { display: flex; width: 100%; }
  :host([hidden]) { display: none; }
  .grp { display: inline-flex; align-items: center; gap: var(--vsg-gap, 0px); isolation: isolate; }
  :host([block]) .grp { display: flex; width: 100%; }
  .grp--v { flex-direction: column; align-items: stretch; }
  /* the slotted buttons stack so a hovered/focused segment lifts its border +
     glow above its neighbours instead of being clipped by the next one */
  ::slotted(*) { position: relative; }
  ::slotted(*:hover), ::slotted(*:focus-within) { z-index: 2; }
  /* attached: pull each segment 1px onto the previous one so the two adjacent
     1px borders collapse into a single hairline (never a 2px seam) */
  .grp--attached:not(.grp--v) ::slotted(*:not(:first-child)) { margin-left: -1px; }
  .grp--attached.grp--v ::slotted(*:not(:first-child)) { margin-top: -1px; }
  .grp--v ::slotted(*) { width: 100%; }
  :host([block]) ::slotted(*) { flex: 1 1 0; }
`,d=["size","variant","tone","radius","disabled"],c=new WeakMap,g="Left,Center,Right";class v extends HTMLElement{static observedAttributes=["orientation","size","variant","tone","radius","gap","divider","block","disabled","items"];#t;#i;#e=[];#s=null;constructor(){super();const s=this.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=p,this.#t=document.createElement("div"),this.#t.className="grp",this.#t.setAttribute("role","group"),this.#i=document.createElement("slot"),this.#t.append(this.#i),s.append(o,this.#t),this.#i.addEventListener("slotchange",()=>{this.#a(),this.#r()}),this.addEventListener("click",this.#n)}connectedCallback(){b(),this.#o()}attributeChangedCallback(s){this.#t&&(s==="items"&&(this.#s=null),this.#o())}#o(){const s=this.getAttribute("orientation")==="vertical",o=Math.max(0,Number(this.getAttribute("gap"))||0),e=o===0;this.#t.className="grp"+(s?" grp--v":"")+(e?" grp--attached":""),this.#t.style.setProperty("--vsg-gap",`${o}px`),this.#t.setAttribute("aria-orientation",s?"vertical":"horizontal");const t=this.getAttribute("aria-label");t!=null?this.#t.setAttribute("aria-label",t):this.#t.removeAttribute("aria-label"),this.toggleAttribute("data-vertical",s),this.toggleAttribute("data-attached",e),this.toggleAttribute("data-divider",this.hasAttribute("divider")),this.#a(),this.#r()}#a(){const s=this.#i.assignedElements(),o=new Set(this.#e);if(s.some(t=>!o.has(t))){if(this.#e.length){for(const t of this.#e)t.remove();this.#e=[]}this.#s=null;return}const e=this.getAttribute("items")??g;if(e!==this.#s){this.#s=e;for(const t of this.#e)t.remove();this.#e=[],customElements.get("vs-button")||h(()=>import("./vs-button.ByL_ww26.js"),[]).catch(()=>{});for(const t of e.split(",").map(i=>i.trim()).filter(Boolean)){const i=document.createElement("vs-button");i.setAttribute("label",t),i.setAttribute("glow",""),this.append(i),this.#e.push(i)}}}#r(){const s=this.hasAttribute("data-vertical"),o=this.hasAttribute("block")||s;for(const e of this.#i.assignedElements()){let t=c.get(e);t||(t=new Set(d.filter(i=>e.hasAttribute(i))),e.hasAttribute("block")&&t.add("block"),c.set(e,t));for(const i of d){if(t.has(i))continue;const a=this.getAttribute(i);a==null?e.removeAttribute(i):e.setAttribute(i,a)}t.has("block")||e.toggleAttribute("block",o)}}#n=s=>{const o=this.#i.assignedElements(),e=o.findIndex(a=>a===s.target||a.contains(s.target));if(e<0)return;const t=o[e];if(t.hasAttribute("disabled"))return;const i=(t.getAttribute("label")||t.textContent||"").trim();this.dispatchEvent(new CustomEvent("press",{detail:{index:e,label:i},bubbles:!0,composed:!0}))}}customElements.define("vs-button-group",v);
