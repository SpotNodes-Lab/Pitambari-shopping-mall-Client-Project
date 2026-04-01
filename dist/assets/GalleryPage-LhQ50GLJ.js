import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{a as t,i as n,o as r,s as i,t as a}from"./vendor-motion-BitL1NIK.js";import{r as o}from"./constants-BaYhUlUU.js";import{n as s,t as c}from"./chevron-right-Ds8EbfIy.js";import{r as l}from"./vendor-styled-NKshhExe.js";import{c as u,p as d,t as f}from"./dataStore-BR75OUEn.js";import{t as p}from"./PageBanner-CxpZgPxT.js";var m=e(i(),1),h=r(),g=[.22,1,.36,1],_=5500;function v({slides:e}){let n=e&&e.length>0?e:o,[r,i]=(0,m.useState)(0),l=a();(0,m.useEffect)(()=>{i(e=>e<n.length?e:0)},[n.length]);let f=(0,m.useCallback)(e=>{i(t=>(t+e+n.length)%n.length)},[n.length]),p=(0,m.useCallback)(e=>{i(e)},[]);(0,m.useEffect)(()=>{if(l)return;let e=window.setInterval(()=>{i(e=>(e+1)%n.length)},_);return()=>window.clearInterval(e)},[l,n.length]);let v=n[r],j=d(v.image);return(0,h.jsx)(y,{"aria-roledescription":`carousel`,"aria-label":`Featured gallery highlights`,children:(0,h.jsxs)(b,{children:[(0,h.jsxs)(x,{children:[(0,h.jsx)(t,{mode:`wait`,initial:!1,children:(0,h.jsx)(S,{initial:l?{opacity:0}:{opacity:0,scale:1.02,filter:`blur(6px)`},animate:l?{opacity:1}:{opacity:1,scale:1,filter:`blur(0px)`},exit:l?{opacity:0}:{opacity:0,scale:.99,filter:`blur(4px)`},transition:{duration:l?.2:.75,ease:g},children:j?(0,h.jsx)(C,{children:(0,h.jsx)(u,{url:v.image,alt:v.alt})}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(w,{animate:l?void 0:{scale:[1,1.04,1]},transition:l?void 0:{duration:14,repeat:1/0,ease:`easeInOut`},style:{transformOrigin:`50% 50%`},children:(0,h.jsx)(T,{src:v.image,alt:v.alt,loading:r===0?`eager`:`lazy`,decoding:`async`})}),(0,h.jsx)(E,{"aria-hidden":!0}),(0,h.jsx)(D,{"aria-hidden":!0,initial:{x:`-120%`,opacity:0},animate:{x:`120%`,opacity:[0,.12,0]},transition:{duration:2.4,ease:`easeInOut`,repeat:1/0,repeatDelay:5}})]})},v.id)}),(0,h.jsx)(O,{type:`button`,"aria-label":`Previous slide`,onClick:()=>f(-1),children:(0,h.jsx)(s,{size:26,strokeWidth:1.5})}),(0,h.jsx)(O,{type:`button`,$side:`right`,"aria-label":`Next slide`,onClick:()=>f(1),children:(0,h.jsx)(c,{size:26,strokeWidth:1.5})})]}),(0,h.jsx)(k,{role:`tablist`,"aria-label":`Slide indicators`,children:n.map((e,t)=>(0,h.jsx)(A,{type:`button`,role:`tab`,"aria-selected":t===r,"aria-label":`Slide ${t+1} of ${n.length}`,$active:t===r,onClick:()=>p(t)},e.id))})]})})}var y=l.section`
  padding-top: 0;
  padding-bottom: clamp(2rem, 5vw, 3.25rem);
  background: linear-gradient(180deg, #faf9f7 0%, #ffffff 55%);
`,b=l.div`
  /* Full gallery rail width (matches image grid below) */
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(var(--page-gutter-x, 1.5rem) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter-x, 1.5rem) + env(safe-area-inset-right, 0px));
`,x=l.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: clamp(10px, 1.2vw, 16px);
  overflow: hidden;
  aspect-ratio: 16 / 9;
  min-height: clamp(300px, 56vw, 440px);
  max-height: min(72vh, 640px);
  box-shadow:
    0 24px 60px rgba(20, 18, 14, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.04) inset;

  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
    min-height: clamp(240px, 62vw, 360px);
    max-height: min(58vh, 520px);
  }
`,S=l(n.div)`
  position: absolute;
  inset: 0;
`,C=l.div`
  position: absolute;
  inset: 0;
  background: #0a0a0a;
`,w=l(n.div)`
  position: absolute;
  inset: 0;
`,T=l.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Slight horizontal bias helps left-weighted editorial crops feel centered in frame */
  object-position: 46% 48%;
  display: block;

  @media (max-width: 768px) {
    object-position: 50% 45%;
  }
`,E=l.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 90% 85% at 50% 50%,
    transparent 35%,
    rgba(0, 0, 0, 0.14) 100%
  );
`,D=l(n.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 38%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.22) 48%,
    rgba(255, 255, 255, 0) 100%
  );
  mix-blend-mode: soft-light;
`,O=l.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${e=>e.$side===`right`?`right: 0.75rem;`:`left: 0.75rem;`}
  z-index: 4;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition:
    background 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.45);
    transform: translateY(-50%) scale(1.05);
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    ${e=>e.$side===`right`?`right: 0.5rem;`:`left: 0.5rem;`}
  }
`,k=l.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.1rem;
  flex-wrap: wrap;
`,A=l.button`
  width: ${e=>e.$active?`1.65rem`:`7px`};
  height: 7px;
  border-radius: 999px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${e=>e.$active?`color-mix(in srgb, var(--color-primary) 88%, #000)`:`rgba(0, 0, 0, 0.18)`};
  transition:
    width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.25s ease;
  opacity: ${e=>e.$active?1:.55};

  &:hover {
    opacity: 1;
  }
`;function j({images:e,onSelect:t}){return(0,h.jsx)(M,{children:(0,h.jsx)(N,{children:(0,h.jsx)(P,{children:e.map((e,r)=>(0,h.jsx)(n.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:`-50px`},transition:{duration:.6,delay:r%4*.1,ease:`easeOut`},children:(0,h.jsxs)(F,{type:`button`,onClick:()=>t?.(r),"aria-label":`Open ${e.alt} full screen`,children:[(0,h.jsx)(I,{children:d(e.image)?(0,h.jsx)(u,{url:e.image,alt:e.alt}):(0,h.jsx)(L,{src:e.image,alt:e.alt,loading:`lazy`})}),(0,h.jsxs)(R,{children:[(0,h.jsx)(z,{children:e.alt}),(0,h.jsx)(B,{})]})]})},e.id))})})})}var M=l.section`
  padding-top: clamp(2rem, 4vw, 3rem);
  padding-bottom: 8rem;
  background-color: #ffffff; /* Crisp white for maximum contrast */
`,N=l.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`,P=l.div`
  display: grid;
  grid-template-columns: 1fr;
  /* Massive row-gap gives the text room to breathe without looking cluttered */
  row-gap: 3.5rem;
  column-gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 4.5rem; /* Even more breathing room on desktop */
    column-gap: 2.5rem;
  }
`,F=l.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: center; /* Centers the text beautifully under the image */

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 4px;
  }
`,I=l.div`
  width: 100%;
  aspect-ratio: 4 / 5; /* The standard high-fashion editorial ratio */
  overflow: hidden;
  border-radius: 4px; /* Very subtle rounding */
  background-color: #f5f5f5;
  margin-bottom: 1.5rem;
`,L=l.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Prevents stretching and perfectly fills the 4:5 box */
  object-position: top center; /* Focuses on the face/upper body of the model */
  transition: transform 0.8s ease;

  ${F}:hover & {
    transform: scale(1.05);
  }

  ${F}:hover [data-arrival-media="root"] {
    transform: scale(1.05);
  }
`,R=l.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,z=l.h3`
  font-family: var(--font-headline);
  font-weight: 600;
  font-size: 1.15rem;
  color: #222222;
  letter-spacing: 0.03em;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;

  /* Changes color to your primary brand color on hover */
  ${F}:hover & {
    color: var(--color-primary);
  }
`,B=l.div`
  width: 30px;
  height: 2px;
  background-color: var(--color-primary);
  opacity: 0.5;
  transition:
    width 0.4s ease,
    opacity 0.4s ease;

  /* The line gracefully expands when hovered */
  ${F}:hover & {
    width: 50px;
    opacity: 1;
  }
`;function V({open:e,image:t,alt:n,onClose:r,onPrev:i,onNext:a}){return(0,m.useEffect)(()=>{if(!e)return;let t=e=>{e.key===`Escape`&&r(),e.key===`ArrowLeft`&&i(),e.key===`ArrowRight`&&a()};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e,r,i,a]),e?(0,h.jsx)(H,{role:`dialog`,"aria-modal":`true`,"aria-label":`Image preview`,onMouseDown:e=>{e.target===e.currentTarget&&r()},children:(0,h.jsxs)(U,{children:[(0,h.jsxs)(W,{children:[(0,h.jsx)(G,{"aria-hidden":`true`,children:n}),(0,h.jsx)(K,{type:`button`,onClick:r,"aria-label":`Close`,children:`×`})]}),d(t)?(0,h.jsx)(q,{children:(0,h.jsx)(u,{url:t,alt:n,autoplayOnIntersect:!1})}):(0,h.jsx)(J,{src:t,alt:n}),(0,h.jsx)(X,{type:`button`,onClick:i,"aria-label":`Previous image`,children:`‹`}),(0,h.jsx)(Z,{type:`button`,onClick:a,"aria-label":`Next image`,children:`›`})]})}):null}var H=l.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`,U=l.div`
  width: 100%;
  max-width: 1100px;
  background-color: var(--color-surface-container-lowest);
  border-radius: var(--radius-xl);
  border: 1px solid color-mix(
    in srgb,
    var(--color-outline-variant) 20%,
    transparent
  );
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
`,W=l.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  pointer-events: none;
`,G=l.div`
  pointer-events: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
`,K=l.button`
  pointer-events: auto;
  border: none;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  color: var(--color-on-surface);
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  line-height: 1;
  transition: background-color 200ms ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.95);
  }
`,q=l.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 80vh;
  background: #111;
`,J=l.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  background: var(--color-surface-container-high);
`,Y=l.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  border: none;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.75);
  color: var(--color-on-surface);
  font-size: 2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 200ms ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.95);
  }
`,X=l(Y)`
  left: 1rem;
`,Z=l(Y)`
  right: 1rem;
`;function Q(){let{gallery:e,fetchHomeData:t}=f(),{heroSlides:n,gridImages:r}=e;(0,m.useEffect)(()=>{t()},[t]);let[i,a]=(0,m.useState)(null),o=(0,m.useMemo)(()=>i===null?null:r[i]??null,[i,r]),s=i!==null&&o!==null;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p,{title:`Gallery`,breadcrumb:`Home > Gallery`}),(0,h.jsx)(v,{slides:n}),(0,h.jsx)(j,{images:r,onSelect:a}),o&&(0,h.jsx)(V,{open:s,image:o.image,alt:o.alt,onClose:()=>a(null),onPrev:()=>{i!==null&&a(e=>e===null?0:(e-1+r.length)%r.length)},onNext:()=>{i!==null&&a(e=>e===null?0:(e+1)%r.length)}})]})}export{Q as GalleryPage};