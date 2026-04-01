import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{o as t,s as n}from"./vendor-motion-BitL1NIK.js";import{a as r,i,n as a,o,r as s,t as c}from"./TestimonialsSection-u2HiaiId.js";import{r as l}from"./vendor-styled-NKshhExe.js";import{r as u}from"./index-CnwQUgRa.js";import{a as d,t as f}from"./dataStore-BR75OUEn.js";import{t as p}from"./PageBanner-CxpZgPxT.js";import{t as m}from"./RewardsPromoSection-BufCBMAq.js";var h=e(n(),1),g=t(),_=l.input`
  width: 100%;
  height: 3rem;
  padding: 0.5rem 1rem;

  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-on-surface);

  background-color: var(--color-surface-container-high);
  border-radius: var(--radius-lg);
  border: 2px solid transparent;

  transition: background-color 200ms ease, border-color 200ms ease,
    opacity 200ms ease;

  &::placeholder {
    color: ${`color-mix(in srgb, var(--color-on-surface-variant) 50%, transparent)`};
  }

  &:focus-visible {
    outline: none;
    background-color: var(--color-surface-container-lowest);
    border-color: ${({$error:e})=>e?`var(--color-error)`:`var(--color-primary)`};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`,v=h.forwardRef(({type:e,error:t,...n},r)=>(0,g.jsx)(_,{ref:r,type:e,$error:t,...n}));v.displayName=`Input`;var y=s({name:i().min(2,`Please enter your name.`),email:i().email(`Please enter a valid email.`),phone:i().min(10,`Phone number should be at least 10 digits.`).regex(/^[0-9+ ]+$/,`Phone number can contain only digits, +, and spaces.`),message:i().min(10,`Message should be at least 10 characters.`)}),b=`https://maps.app.goo.gl/inFK5RkQSC2emtky7`,x=`https://www.google.com/maps?output=embed&q=LAL%20BAZAR%2C%20PITAMBARI%20ROAD%2C%20BETTIAH%2C%20BIHAR%2C%20845438%2C%20WEST%20CHAMPARAN&z=17`;function S(){let[e,t]=(0,h.useState)(!1),[n,i]=(0,h.useState)(null),{register:s,handleSubmit:c,reset:l,formState:{errors:f,isSubmitting:p}}=r({resolver:a(y)}),m=(0,h.useMemo)(()=>[{label:`Email`,value:`pitambari.bth@gmail.com`},{label:`Phone`,value:`+91 6203121811`},{label:`Hours`,value:`9 AM to 8 PM`}],[]);async function _(e){i(null);try{await d({name:e.name.trim(),email:e.email.trim(),phone:e.phone.trim(),message:e.message.trim()}),l({name:``,email:``,phone:``,message:``}),t(!0)}catch(e){let t=`Could not send your message.`;if(e&&typeof e==`object`&&`message`in e){let n=e.message;typeof n==`string`&&n.trim()&&(t=n)}i(t)}}return(0,g.jsx)(C,{children:(0,g.jsx)(w,{children:(0,g.jsxs)(T,{children:[(0,g.jsxs)(E,{children:[(0,g.jsx)(D,{children:`Get in Touch`}),(0,g.jsx)(O,{children:`Tell us what you need and our team will get back to you shortly.`}),e?(0,g.jsxs)(k,{children:[(0,g.jsx)(A,{children:`Message sent`}),(0,g.jsx)(j,{children:`Thanks! We will reach out soon to help with your enquiry.`}),(0,g.jsx)(o,{type:`button`,variant:`outline`,style:{marginTop:`1rem`},onClick:()=>t(!1),children:`Send another message`})]}):(0,g.jsxs)(M,{onSubmit:c(_),children:[(0,g.jsxs)(N,{children:[(0,g.jsx)(P,{children:`Name`}),(0,g.jsx)(v,{placeholder:`Your name`,error:!!f.name,...s(`name`)}),f.name&&(0,g.jsx)(F,{children:f.name.message})]}),(0,g.jsxs)(N,{children:[(0,g.jsx)(P,{children:`Email`}),(0,g.jsx)(v,{type:`email`,placeholder:`you@example.com`,error:!!f.email,...s(`email`)}),f.email&&(0,g.jsx)(F,{children:f.email.message})]}),(0,g.jsxs)(N,{children:[(0,g.jsx)(P,{children:`Phone`}),(0,g.jsx)(v,{placeholder:`Phone number`,error:!!f.phone,...s(`phone`)}),f.phone&&(0,g.jsx)(F,{children:f.phone.message})]}),(0,g.jsxs)(N,{children:[(0,g.jsx)(P,{children:`Message`}),(0,g.jsx)(I,{placeholder:`How can we help?`,error:!!f.message,...s(`message`)}),f.message&&(0,g.jsx)(F,{children:f.message.message})]}),n&&(0,g.jsx)(F,{role:`alert`,style:{marginTop:`-0.25rem`},children:n}),(0,g.jsx)(o,{type:`submit`,disabled:p,fullWidthAt:`sm`,children:p?`Sending...`:`Send Message`})]})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(R,{children:`We are here`}),(0,g.jsx)(z,{children:`Visit a showroom for the most curated fittings, or send a message for custom styling guidance.`}),(0,g.jsx)(B,{children:m.map(e=>(0,g.jsxs)(V,{children:[(0,g.jsx)(H,{children:e.label}),(0,g.jsx)(U,{children:e.value})]},e.label))}),(0,g.jsxs)(W,{children:[(0,g.jsx)(G,{children:`Pitambari Store Location`}),(0,g.jsx)(K,{title:`Pitambari Store Location`,src:x,loading:`lazy`,referrerPolicy:`no-referrer-when-downgrade`}),(0,g.jsxs)(q,{href:b,target:`_blank`,rel:`noopener noreferrer`,children:[(0,g.jsx)(u,{size:16,strokeWidth:1.6}),`Open in Google Maps`]})]})]})]})})})}var C=l.section`
  padding-top: 3rem;
  padding-bottom: 5rem;
  background-color: var(--color-background);
`,w=l.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`,T=l.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2rem;
  }
`,E=l.div`
  border: 1px solid color-mix(
    in srgb,
    var(--color-outline-variant) 25%,
    transparent
  );
  border-radius: var(--radius-xl);
  background-color: var(--color-surface-container-lowest);
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`,D=l.h1`
  font-family: var(--font-headline);
  font-weight: 900;
  color: var(--color-on-surface);
  letter-spacing: -0.03em;
  font-size: 2.25rem;
  margin-bottom: 0.75rem;
`,O=l.p`
  color: color-mix(in srgb, var(--color-on-surface) 70%, transparent);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  max-width: 48ch;
`,k=l.div`
  border-radius: var(--radius-xl);
  border: 1px solid color-mix(
    in srgb,
    var(--color-outline-variant) 20%,
    transparent
  );
  background-color: color-mix(
    in srgb,
    var(--color-surface-container-high) 70%,
    transparent
  );
  padding: 1.25rem;
`,A=l.h3`
  font-family: var(--font-headline);
  font-weight: 900;
  color: var(--color-primary);
  margin-bottom: 0.35rem;
`,j=l.p`
  color: color-mix(in srgb, var(--color-on-surface) 70%, transparent);
  line-height: 1.7;
`,M=l.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,N=l.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,P=l.span`
  font-family: var(--font-label);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
`,F=l.p`
  margin-top: -0.15rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-error);
`,I=l.textarea`
  width: 100%;
  min-height: 9rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  border: 2px solid
    ${({error:e})=>e?`var(--color-error)`:`transparent`};
  background-color: var(--color-surface-container-high);

  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-on-surface);

  &:focus-visible {
    outline: none;
    border-color: ${({error:e})=>e?`var(--color-error)`:`var(--color-primary)`};
  }

  &::placeholder {
    color: color-mix(
      in srgb,
      var(--color-on-surface-variant) 55%,
      transparent
    );
  }
`,L=l.aside`
  border-radius: var(--radius-xl);
  background-color: var(--color-surface-container-high);
  padding: 1.5rem;
  border: 1px solid color-mix(
    in srgb,
    var(--color-outline-variant) 25%,
    transparent
  );
`,R=l.h2`
  font-family: var(--font-headline);
  font-weight: 900;
  color: var(--color-on-surface);
  letter-spacing: -0.02em;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`,z=l.p`
  color: color-mix(in srgb, var(--color-on-surface) 70%, transparent);
  line-height: 1.8;
  margin-bottom: 1.25rem;
`,B=l.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`,V=l.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,H=l.span`
  font-family: var(--font-label);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
`,U=l.span`
  font-family: var(--font-body);
  color: var(--color-on-surface);
  font-size: 0.95rem;
`,W=l.div`
  margin-top: 1.25rem;
  border-radius: var(--radius-xl);
  background-color: color-mix(
    in srgb,
    var(--color-surface-container-lowest) 60%,
    transparent
  );
  border: 1px solid
    color-mix(in srgb, var(--color-outline-variant) 18%, transparent);
  padding: 1.15rem;
`,G=l.h3`
  font-family: var(--font-headline);
  font-weight: 900;
  margin-bottom: 0.25rem;
  color: var(--color-primary);
`,K=l.iframe`
  width: 100%;
  height: 220px;
  border: 0;
  border-radius: var(--radius-lg);
  display: block;
  margin-top: 0.6rem;
  background-color: var(--color-surface-container-lowest);
`,q=l.a`
  margin-top: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-label);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-decoration: none;
  color: var(--color-primary);

  &:hover {
    color: var(--color-primary-container);
  }
`;function J(){let{patronReviews:e,rewardsQrBlocks:t,fetchHomeData:n}=f();return(0,h.useEffect)(()=>{n()},[n]),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(p,{title:`Contact`,breadcrumb:`Home > Contact`}),(0,g.jsx)(S,{}),(0,g.jsx)(m,{blocks:t}),(0,g.jsx)(c,{data:e})]})}export{J as ContactPage};