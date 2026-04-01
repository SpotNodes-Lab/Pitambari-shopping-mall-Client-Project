import{i as e,o as t}from"./vendor-motion-BitL1NIK.js";import{n}from"./vendor-react-XYNKAIcT.js";import{c as r,d as i}from"./constants-BaYhUlUU.js";import{r as a}from"./vendor-styled-NKshhExe.js";import{r as o}from"./index-CnwQUgRa.js";import{t as s}from"./PageBanner-CxpZgPxT.js";var c=i(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),l=i(`clock`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]),u=i(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),d=t();function f({showrooms:e}){return(0,d.jsx)(p,{children:(0,d.jsx)(m,{children:(0,d.jsx)(h,{children:e.map((e,t)=>(0,d.jsxs)(g,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:`-50px`},transition:{duration:.5,delay:t*.1,ease:`easeOut`},children:[(0,d.jsx)(_,{children:(0,d.jsx)(v,{src:e.image,alt:e.title,loading:`lazy`})}),(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e.title}),(0,d.jsxs)(x,{children:[e.address&&(0,d.jsxs)(S,{children:[(0,d.jsx)(C,{children:(0,d.jsx)(o,{size:15,strokeWidth:2})}),(0,d.jsx)(w,{children:e.address})]}),e.hours&&(0,d.jsxs)(S,{children:[(0,d.jsx)(C,{children:(0,d.jsx)(l,{size:15,strokeWidth:2})}),(0,d.jsx)(w,{children:e.hours})]}),e.phone&&(0,d.jsxs)(S,{children:[(0,d.jsx)(C,{children:(0,d.jsx)(u,{size:15,strokeWidth:2})}),(0,d.jsx)(w,{children:e.phone})]})]}),e.detailsPath?(0,d.jsxs)(E,{to:e.detailsPath,children:[e.cta||`Know More`,` `,(0,d.jsx)(c,{size:16})]}):(0,d.jsxs)(D,{href:e.mapLink||`#`,target:`_blank`,rel:`noopener noreferrer`,children:[e.cta||`Get Directions`,` `,(0,d.jsx)(c,{size:16})]})]})]},e.id))})})})}var p=a.section`
  padding-top: 3rem;
  padding-bottom: 6rem;
  background-color: #faf9f7; /* Soft ivory */
`,m=a.div`
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`,h=a.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    /* If you have 3 locations, this fits them all perfectly in one row */
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
  }
`,g=a(e.div)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  /* Keeps the card from stretching unnecessarily */
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  }
`,_=a.div`
  width: 100%;
  aspect-ratio: 16 / 9; /* Sleek, shorter widescreen ratio */
  background-color: #eaeaea;
  overflow: hidden;
`,v=a.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${g}:hover & {
    transform: scale(1.05);
  }
`,y=a.div`
  /* Significantly tighter padding to keep the card compact */
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Pushes the button to the bottom if cards are different heights */
`,b=a.h3`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: 1.5rem; /* Scaled down from 2.25rem */
  font-weight: 600;
  color: #222222;
  margin-bottom: 1.25rem;
  line-height: 1.2;
`,x=a.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem; /* Tighter gap between address/phone/hours */
  margin-bottom: 2rem;
`,S=a.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`,C=a.div`
  color: var(--color-primary);
  margin-top: 0.15rem;
  flex-shrink: 0;
`,w=a.p`
  font-family: var(--font-body);
  font-size: 0.9rem; /* Scaled down for neatness */
  color: #555555;
  line-height: 1.5;
  margin: 0;
`,T=`
  margin-top: auto; /* Always sits at the bottom */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-headline);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #222222;
  text-decoration: none;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #dcdcdc;
  transition: all 0.3s ease;
  align-self: flex-start; /* Keeps it tight to the left instead of stretching */

  svg {
    transition: transform 0.3s ease;
  }

  ${g}:hover & {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  ${g}:hover & svg {
    transform: translateX(4px);
  }
`,E=a(n)`
  ${T}
`,D=a.a`
  ${T}
`;function O(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s,{title:`Our Businesses`,breadcrumb:`Home > Our Businesses`}),(0,d.jsx)(f,{showrooms:r})]})}export{O as ShowroomsPage};