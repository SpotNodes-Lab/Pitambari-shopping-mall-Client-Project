const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-C4nRuF_V.js","assets/rolldown-runtime-COnpUsM8.js","assets/vendor-motion-BitL1NIK.js","assets/vendor-styled-NKshhExe.js","assets/TestimonialsSection-u2HiaiId.js","assets/dataStore-BR75OUEn.js","assets/constants-BaYhUlUU.js","assets/chevron-right-Ds8EbfIy.js","assets/RewardsPromoSection-BufCBMAq.js","assets/AboutPage-CxePJ78g.js","assets/PageBanner-CxpZgPxT.js","assets/GalleryPage-LhQ50GLJ.js","assets/ShowroomsPage-R6pcSonj.js","assets/vendor-react-XYNKAIcT.js","assets/ContactPage-CeFCzVgg.js","assets/RewardsScanPage-B6AFuBJa.js","assets/RewardsCustomerPage-GV1wERia.js","assets/PitambariJewelStudioPage-BhE1T0tR.js","assets/VirasatPage-Chmz-RoT.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{i as t,n,o as r,r as i,s as a}from"./vendor-motion-BitL1NIK.js";import{a as o,i as s,l as c,n as l,o as u,r as ee,t as te,u as d}from"./vendor-react-XYNKAIcT.js";import{d as f,s as p}from"./constants-BaYhUlUU.js";import{r as m}from"./vendor-styled-NKshhExe.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var h=d(),g=e(a(),1),_=f(`globe`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20`,key:`13o1zl`}],[`path`,{d:`M2 12h20`,key:`9i4pu4`}]]),v=f(`mail`,[[`path`,{d:`m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`,key:`132q7q`}],[`rect`,{x:`2`,y:`4`,width:`20`,height:`16`,rx:`2`,key:`izxlao`}]]),y=f(`map-pin`,[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]),ne=f(`menu`,[[`path`,{d:`M4 5h16`,key:`1tepv9`}],[`path`,{d:`M4 12h16`,key:`1lakjw`}],[`path`,{d:`M4 19h16`,key:`1djgab`}]]),re=f(`share-2`,[[`circle`,{cx:`18`,cy:`5`,r:`3`,key:`gq8acd`}],[`circle`,{cx:`6`,cy:`12`,r:`3`,key:`w7nqdw`}],[`circle`,{cx:`18`,cy:`19`,r:`3`,key:`1xt0gg`}],[`line`,{x1:`8.59`,x2:`15.42`,y1:`13.51`,y2:`17.49`,key:`47mynk`}],[`line`,{x1:`15.41`,x2:`8.59`,y1:`6.51`,y2:`10.49`,key:`1n3mei`}]]),b=f(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),x=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},ie=(e=>e?x(e):x),ae=e=>e;function oe(e,t=ae){let n=g.useSyncExternalStore(e.subscribe,g.useCallback(()=>t(e.getState()),[e,t]),g.useCallback(()=>t(e.getInitialState()),[e,t]));return g.useDebugValue(n),n}var S=e=>{let t=ie(e),n=e=>oe(t,e);return Object.assign(n,t),n},C=(e=>e?S(e):S),w=C(e=>({isCartOpen:!1,isMobileMenuOpen:!1,cartCount:0,toggleCart:()=>e(e=>({isCartOpen:!e.isCartOpen})),toggleMobileMenu:()=>e(e=>({isMobileMenuOpen:!e.isMobileMenuOpen})),addToCart:()=>e(e=>({cartCount:e.cartCount+1}))})),T=r(),E=`https://maps.app.goo.gl/inFK5RkQSC2emtky7`;function D(){let{isMobileMenuOpen:e,toggleMobileMenu:t}=w(),r=u(),{scrollY:a}=n(),[o,s]=(0,g.useState)(!1);i(a,`change`,e=>{s(e>50)});let c=e=>e===`/`?r.pathname===`/`:r.pathname.startsWith(e);return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(O,{$scrolled:o,initial:{y:-100},animate:{y:0},transition:{duration:.8,ease:[.16,1,.3,1]},children:(0,T.jsxs)(k,{children:[(0,T.jsx)(A,{children:p.map(e=>(0,T.jsx)(j,{to:e.href,$active:c(e.href),children:e.name},e.name))}),(0,T.jsxs)(M,{children:[(0,T.jsx)(I,{onClick:t,"aria-label":`Menu`,children:(0,T.jsx)(ne,{size:24,strokeWidth:1.5})}),(0,T.jsx)(N,{to:`/`,children:(0,T.jsx)(`span`,{className:`brand-name`,children:`PITAMBARI`})}),(0,T.jsx)(L,{href:E,target:`_blank`,rel:`noopener noreferrer`,"aria-label":`Visit Pitambri on Google Maps`,children:(0,T.jsx)(y,{size:22,strokeWidth:1.5})})]}),(0,T.jsx)(P,{children:(0,T.jsxs)(F,{href:E,target:`_blank`,rel:`noopener noreferrer`,children:[(0,T.jsx)(y,{size:18,strokeWidth:1.5}),(0,T.jsx)(`span`,{children:`Visit Pitambri`})]})})]})}),(0,T.jsxs)(R,{initial:{opacity:0,x:`-100%`},animate:{opacity:e?1:0,x:e?`0%`:`-100%`},transition:{duration:.4,ease:`easeInOut`},children:[(0,T.jsx)(z,{onClick:t,"aria-label":`Close menu`,children:(0,T.jsx)(b,{size:28,strokeWidth:1.5})}),(0,T.jsx)(B,{children:p.map(e=>(0,T.jsx)(V,{to:e.href,onClick:t,$active:c(e.href),children:e.name},e.name))}),(0,T.jsxs)(H,{children:[(0,T.jsx)(`p`,{children:`Experience the collection in person.`}),(0,T.jsxs)(F,{href:E,target:`_blank`,rel:`noopener noreferrer`,onClick:t,children:[(0,T.jsx)(y,{size:18}),` Visit Pitambri`]})]})]})]})}var O=m(t.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  padding: ${({$scrolled:e})=>e?`1rem 0`:`1.5rem 0`};
  background-color: ${({$scrolled:e})=>e?`rgba(255, 255, 255, 0.95)`:`transparent`};
  backdrop-filter: ${({$scrolled:e})=>e?`blur(12px)`:`none`};
  border-bottom: ${({$scrolled:e})=>e?`1px solid rgba(0,0,0,0.05)`:`1px solid transparent`};
  transition: all 0.3s ease;
`,k=m.div`
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 0 1.25rem;
  }
`,A=m.nav`
  display: flex;
  gap: 2.5rem;
  @media (max-width: 768px) {
    display: none;
  }
`,j=m(l)`
  font-family: var(--font-headline);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  color: ${({$active:e})=>e?`var(--color-primary)`:`var(--color-on-surface)`};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({$active:e})=>e?`100%`:`0%`};
    height: 1px;
    background-color: var(--color-on-surface);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`,M=m.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 769px) {
    justify-content: center;
    gap: 1rem;
    width: auto;
  }
`,N=m(l)`
  text-align: center;
  text-decoration: none;
  display: flex;
  flex-direction: column;

  .brand-name {
    font-family: var(--font-headline);
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--color-on-surface);
  }

  .brand-tagline {
    font-family: var(--font-label);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
    margin-top: 0.1rem;
  }
`,P=m.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`,F=m.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-label);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: var(--color-on-surface);
  padding: 0.5rem 1rem;
  border: 1px solid color-mix(in srgb, var(--color-on-surface) 20%, transparent);
  border-radius: 2px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-on-surface);
    color: var(--color-surface);
  }
`,I=m.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-on-surface);
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`,L=m.a`
  color: var(--color-on-surface);
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`,R=m(t.div)`
  position: fixed;
  inset: 0;
  background-color: var(--color-surface);
  z-index: 100;
  padding: 6rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,z=m.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-on-surface);
`,B=m.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`,V=m(l)`
  font-family: var(--font-headline);
  font-size: 2rem;
  text-decoration: none;
  color: ${({$active:e})=>e?`var(--color-primary)`:`var(--color-on-surface)`};
`,H=m.div`
  border-top: 1px solid
    color-mix(in srgb, var(--color-on-surface) 10%, transparent);
  padding-top: 2rem;

  p {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
    margin-bottom: 1rem;
  }
`,U=`/assets/pitambri-logo-removebg-preview-Bo2gc2W-.png`,W=m.footer`
  background-color: var(--color-footer-surface);
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 2.5rem;
`,G=m.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;

  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: 1.7;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    padding-left: 3rem;
    padding-right: 3rem;
  }
`,K=m.div`
  opacity: 0.9;
  transition: opacity 200ms ease;

  &:hover {
    opacity: 1;
  }
`,q=m.span`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: clamp(1.15rem, 2.5vw, 1.45rem);
  font-weight: 600;
  color: var(--color-on-footer);
  margin-bottom: 0.35rem;
  display: block;
  letter-spacing: 0.38em;
  text-transform: uppercase;
`,se=m.span`
  font-family: var(--font-label);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-on-footer-muted);
  display: block;
  margin-bottom: 1.25rem;
`,ce=m.address`
  margin: 0 0 1.5rem;
  padding: 0;
  font-style: normal;
  color: var(--color-on-footer-muted);
  font-size: 0.8rem;
  line-height: 1.65;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`,J=m.span`
  display: block;
`,le=m.div`
  display: flex;
  gap: 1rem;
`,Y=m.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: var(--color-on-footer);
  transition: color 200ms ease, transform 200ms ease;

  &:hover {
    color: var(--color-footer-accent);
    transform: translateY(-2px);
  }
`,X=m.h4`
  font-family: var(--font-headline);
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-footer-accent);
`,Z=m.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
`,Q=m(l)`
  color: var(--color-on-footer-muted);
  text-decoration: none;
  transition: color 200ms ease, text-decoration-color 200ms ease;

  &:hover {
    color: var(--color-on-footer);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`,ue=m.div`
  margin-top: 5rem;
  border-top: 1px solid color-mix(
    in srgb,
    var(--color-on-footer) 14%,
    transparent
  );
  padding-top: 2.5rem;
  text-align: center;

  color: var(--color-on-footer-muted);
  font-size: 0.75rem;
`,de=m(K)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`,fe=m.img`
  width: clamp(180px, 20vw, 280px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.22));
`;function pe(){return(0,T.jsxs)(W,{children:[(0,T.jsxs)(G,{children:[(0,T.jsxs)(K,{children:[(0,T.jsx)(q,{children:`Pitambari`}),(0,T.jsx)(se,{children:`Atelier & Showrooms`}),(0,T.jsxs)(ce,{children:[(0,T.jsx)(J,{children:`PITAMBARI`}),(0,T.jsx)(J,{children:`LAL BAZAR, PITAMBARI ROAD,`}),(0,T.jsx)(J,{children:`BETTIAH, BIHAR, 845438,`}),(0,T.jsx)(J,{children:`WEST CHAMPARAN`})]}),(0,T.jsxs)(le,{children:[(0,T.jsx)(Y,{"aria-label":`Website`,children:(0,T.jsx)(_,{size:20,strokeWidth:1.5})}),(0,T.jsx)(Y,{"aria-label":`Share`,children:(0,T.jsx)(re,{size:20,strokeWidth:1.5})}),(0,T.jsx)(Y,{"aria-label":`Email`,children:(0,T.jsx)(v,{size:20,strokeWidth:1.5})})]})]}),(0,T.jsxs)(K,{children:[(0,T.jsx)(X,{children:`Explore`}),(0,T.jsxs)(Z,{children:[(0,T.jsx)(`li`,{children:(0,T.jsx)(Q,{to:`/about`,children:`About us`})}),(0,T.jsx)(`li`,{children:(0,T.jsx)(Q,{to:`/gallery`,children:`Gallery`})})]})]}),(0,T.jsxs)(K,{children:[(0,T.jsx)(X,{children:`Showrooms`}),(0,T.jsxs)(Z,{children:[(0,T.jsx)(`li`,{children:(0,T.jsx)(Q,{to:`/showrooms`,children:`View showrooms`})}),(0,T.jsx)(`li`,{children:(0,T.jsx)(Q,{to:`/contact`,children:`Contact form`})})]})]}),(0,T.jsx)(de,{children:(0,T.jsx)(fe,{src:U,alt:`Pitambari logo`,loading:`lazy`})})]}),(0,T.jsxs)(ue,{children:[`© `,new Date().getFullYear(),` Pitambari. All Rights Reserved.`]})]})}var me=m.div`
  font-family: var(--font-body);
  background-color: var(--color-background);
  color: var(--color-on-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  --header-height: 6.5rem;

  @media (min-width: 768px) {
    --header-height: 7rem;
  }

  ::selection {
    background: var(--color-primary);
    color: #ffffff;
  }
`,he=m.main`
  flex-grow: 1;
  padding-top: var(--header-height);
`;function ge(){return(0,T.jsxs)(me,{children:[(0,T.jsx)(D,{}),(0,T.jsx)(he,{children:(0,T.jsx)(ee,{})}),(0,T.jsx)(pe,{})]})}var _e=(0,g.lazy)(()=>c(()=>import(`./HomePage-C4nRuF_V.js`).then(e=>({default:e.HomePage})),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))),ve=(0,g.lazy)(()=>c(()=>import(`./AboutPage-CxePJ78g.js`).then(e=>({default:e.AboutPage})),__vite__mapDeps([9,1,2,3,4,5,6,10]))),ye=(0,g.lazy)(()=>c(()=>import(`./GalleryPage-LhQ50GLJ.js`).then(e=>({default:e.GalleryPage})),__vite__mapDeps([11,1,2,3,5,6,7,10]))),be=(0,g.lazy)(()=>c(()=>import(`./ShowroomsPage-R6pcSonj.js`).then(e=>({default:e.ShowroomsPage})),__vite__mapDeps([12,13,1,2,3,6,10]))),$=(0,g.lazy)(()=>c(()=>import(`./ContactPage-CeFCzVgg.js`).then(e=>({default:e.ContactPage})),__vite__mapDeps([14,1,2,3,4,5,6,8,10]))),xe=(0,g.lazy)(()=>c(()=>import(`./RewardsScanPage-B6AFuBJa.js`).then(e=>({default:e.RewardsScanPage})),__vite__mapDeps([15,1,13,2,3]))),Se=(0,g.lazy)(()=>c(()=>import(`./RewardsCustomerPage-GV1wERia.js`).then(e=>({default:e.RewardsCustomerPage})),__vite__mapDeps([16,1,13,2,3]))),Ce=(0,g.lazy)(()=>c(()=>import(`./PitambariJewelStudioPage-BhE1T0tR.js`).then(e=>({default:e.PitambariJewelStudioPage})),__vite__mapDeps([17,2,1,3,10]))),we=(0,g.lazy)(()=>c(()=>import(`./VirasatPage-Chmz-RoT.js`).then(e=>({default:e.VirasatPage})),__vite__mapDeps([18,2,1,3,10])));function Te(){return(0,T.jsx)(`div`,{role:`status`,"aria-live":`polite`,style:{display:`flex`,minHeight:`40vh`,alignItems:`center`,justifyContent:`center`,color:`#666`,fontSize:`0.95rem`},children:`Loading…`})}function Ee(){return(0,T.jsx)(te,{children:(0,T.jsx)(g.Suspense,{fallback:(0,T.jsx)(Te,{}),children:(0,T.jsxs)(o,{children:[(0,T.jsxs)(s,{element:(0,T.jsx)(ge,{}),children:[(0,T.jsx)(s,{index:!0,element:(0,T.jsx)(_e,{})}),(0,T.jsx)(s,{path:`/about`,element:(0,T.jsx)(ve,{})}),(0,T.jsx)(s,{path:`/gallery`,element:(0,T.jsx)(ye,{})}),(0,T.jsx)(s,{path:`/showrooms`,element:(0,T.jsx)(be,{})}),(0,T.jsx)(s,{path:`/showrooms/pitambari-jewel-studio`,element:(0,T.jsx)(Ce,{})}),(0,T.jsx)(s,{path:`/showrooms/virasat`,element:(0,T.jsx)(we,{})}),(0,T.jsx)(s,{path:`/contact`,element:(0,T.jsx)($,{})})]}),(0,T.jsx)(s,{path:`/rewards/scan`,element:(0,T.jsx)(xe,{})}),(0,T.jsx)(s,{path:`/rewards/:token`,element:(0,T.jsx)(Se,{})})]})})})}(0,h.createRoot)(document.getElementById(`root`)).render((0,T.jsx)(g.StrictMode,{children:(0,T.jsx)(Ee,{})}));export{b as n,y as r,C as t};