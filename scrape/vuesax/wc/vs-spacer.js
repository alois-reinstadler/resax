const o={none:"0",xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"40px"},r=t=>{const e=(t??"").trim();return e?e in o?o[e]:/^-?[\d.]+$/.test(e)?`${e}px`:e:null},a=t=>t.nodeType===3?!!t.textContent.trim():t.nodeType!==1?!1:!(t.tagName==="DIV"||t.tagName==="SPAN")||t.childNodes.length>0,h=`
  :host {
    display: block;
    box-sizing: border-box;
    flex: var(--vs-flex, 1) 1 0%;
    align-self: stretch;
  }
  :host([hidden]) { display: none; }
  /* A sized spacer stops being elastic — it is exactly that long. */
  :host([size]) { flex: 0 0 var(--vs-size, 0px); }

  /* A spacer has nothing of its own to show; demo mode gives it a width and a
     hatched bar purely so the element is visible in a playground. */
  :host([demo]:not([demo="false"])) { width: 100%; min-width: 220px; }

  .ph { display: none; }
  /* The demo bar only exists so the element is visible on its own in a
     playground; a real spacer paints nothing. */
  :host([demo]:not([demo="false"])) .ph {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 32px;
    border-radius: 6px;
    background: repeating-linear-gradient(
      45deg,
      var(--border, #2a2a2a) 0 6px,
      transparent 6px 12px
    );
  }
`;class l extends HTMLElement{static observedAttributes=["flex","size","demo"];#e;#i;#t=[];constructor(){super();const e=this.attachShadow({mode:"open"});this.#i=e;const s=document.createElement("style");s.textContent=h,this.#e=document.createElement("slot"),e.append(s,this.#e),this.#e.addEventListener("slotchange",()=>this.#s())}connectedCallback(){this.#s()}attributeChangedCallback(){this.#e&&this.#s()}#s(){const e=(this.getAttribute("flex")??"").trim(),s=Number(e);e&&Number.isFinite(s)&&s>=0?this.style.setProperty("--vs-flex",String(s)):this.style.removeProperty("--vs-flex");const i=r(this.getAttribute("size"));i?this.style.setProperty("--vs-size",i):this.style.removeProperty("--vs-size"),this.#n()}#n(){const s=this.hasAttribute("demo")&&this.getAttribute("demo")!=="false"&&!this.#e.assignedNodes({flatten:!0}).some(a),i=this.#t.length>0;if(s!==i){if(!s){for(;this.#t.length;)this.#t.pop().remove();return}{const n=document.createElement("span");n.className="ph",this.#t.push(n),this.#i.appendChild(n)}}}}customElements.define("vs-spacer",l);
