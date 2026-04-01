import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{i as t,o as n,s as r}from"./vendor-motion-BitL1NIK.js";import{t as i}from"./TestimonialsSection-u2HiaiId.js";import{r as a}from"./vendor-styled-NKshhExe.js";import{s as o,t as s}from"./dataStore-BR75OUEn.js";import{t as c}from"./PageBanner-CxpZgPxT.js";var l=e(r(),1),u=n();function d({image:e,paragraphs:t,headline:n=`Our Heritage`,eyebrow:r=`Years of Legacy`}){return(0,u.jsx)(f,{children:(0,u.jsx)(p,{children:(0,u.jsxs)(m,{children:[(0,u.jsxs)(h,{initial:{opacity:0,x:-30},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.8,ease:`easeOut`},children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(_,{}),(0,u.jsx)(v,{children:r}),(0,u.jsx)(_,{})]}),(0,u.jsx)(y,{children:n.split(/\s+/).map((e,t,n)=>(0,u.jsxs)(`span`,{className:t===0?`headline-first`:`headline-accent`,children:[e,t<n.length-1?`\xA0`:``]},`${t}-${e}`))}),t.map((e,t)=>(0,u.jsx)(b,{className:t===0?`lead-paragraph`:``,children:e},t))]}),(0,u.jsx)(x,{initial:{opacity:0,x:30},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.8,delay:.2,ease:`easeOut`},children:(0,u.jsx)(S,{children:(0,u.jsx)(C,{src:e,alt:`Our Heritage`,loading:`lazy`})})})]})})})}var f=a.section`
  padding-top: 6rem;
  padding-bottom: 7rem;
  background-color: #ffffff; /* Crisp white to let the images pop */
`,p=a.div`
  max-width: 1250px; /* Slightly narrower to force a tighter, elegant reading line */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`,m=a.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;

  @media (min-width: 900px) {
    grid-template-columns: 1.1fr 0.9fr; /* Text gets slightly more room */
    gap: 6rem;
  }
`,h=a(t.div)`
  display: flex;
  flex-direction: column;
  max-width: 48rem;
`,g=a.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`,_=a.div`
  width: 5px;
  height: 5px;
  background-color: var(--color-primary);
  transform: rotate(45deg);
  opacity: 0.7;
`,v=a.span`
  font-family: var(--font-label);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--color-primary);
`,y=a.h2`
  font-family: var(--font-headline);
  font-weight: 500;
  font-size: 2.75rem;
  line-height: 1.15;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  .headline-first {
    color: #222222;
  }

  .headline-accent {
    color: var(--color-primary);
  }

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`,b=a.p`
  font-family: var(--font-body);
  color: #555555;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;

  /* The first paragraph acts as an introduction, so we make it slightly bolder and larger */
  &.lead-paragraph {
    font-size: 1.1rem;
    color: #333333;
    font-weight: 500;
    margin-bottom: 1.75rem;
  }
`,x=a(t.div)`
  position: relative;
`,S=a.div`
  position: relative;
`,C=a.img`
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5; /* Elegant portrait crop */
  object-fit: cover;
  background-color: #f5f5f5;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`,w=`/assets/pitambri-logo-BbsmK_Ou.png`;function T(){let{patronReviews:e,insights:t,fetchHomeData:n}=s();return(0,l.useEffect)(()=>{n()},[n]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(c,{title:`About us`,breadcrumb:`Home > About us`}),(0,u.jsx)(d,{image:w,paragraphs:[`Pitambari is more than just a place to shop; it is a well-established brand with a long history that dates back over years. Originally founded with the goal of offering exceptional shopping encounters, we have grown to become a reputable presence in the retail sector, recognized for our dedication to high standards, diverse selection, and customer contentment.`,`An inheritance of greatness.`,`Pitambari has been leading the way in the retail industry for more than years, establishing standards for others to emulate. Our adventure started with a tiny shop that emphasized offering top-notch items to our neighborhood. Today, we proudly stand as a diverse retail store serving a varied customer base that appreciates both tradition and modernity.`,`Our dedication to trust, excellence, and customer satisfaction is the foundation of our success. These principles have led us through many years of transformation and expansion, helping us create a dedicated customer following across multiple generations. The tradition of trust and quality is being passed down as families who shopped with us in the past now bring their children and grandchildren to our store.`,`Specially selected sets for all requirements. We take pride in our carefully selected range of products at Pitambari. Our variety consists of top brands, designs, hues, fabrics, and prints in various categories. We offer a variety of styles to cater to all preferences and events, whether you prefer trendy looks or traditional pieces.`]}),(0,u.jsx)(o,{image:t.image||`/assets/sabseSastaCropped-O3TwtTgs.png`,imageAlt:t.imageAlt,imageObjectFit:t.imageObjectFit,headline:t.headline,description:t.description,stats:t.stats}),(0,u.jsx)(i,{data:e})]})}export{T as AboutPage};