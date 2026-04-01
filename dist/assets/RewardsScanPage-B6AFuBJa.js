import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{o as t,s as n}from"./vendor-motion-BitL1NIK.js";import{s as r}from"./vendor-react-XYNKAIcT.js";import{r as i}from"./vendor-styled-NKshhExe.js";var a=e(n(),1),o=t();function s(){let[e,t]=(0,a.useState)(``),n=r();return(0,o.jsx)(c,{children:(0,o.jsxs)(l,{children:[(0,o.jsx)(`h1`,{children:`Scan & Check Points`}),(0,o.jsx)(`p`,{children:`Paste your rewards code if QR scan does not open automatically.`}),(0,o.jsxs)(`form`,{onSubmit:t=>{t.preventDefault();let r=e.trim();r&&n(`/rewards/${r}`)},children:[(0,o.jsx)(`input`,{value:e,onChange:e=>t(e.target.value),placeholder:`Enter reward token`}),(0,o.jsx)(`button`,{type:`submit`,children:`View My Rewards`})]})]})})}var c=i.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: #f8f8f8;
`,l=i.section`
  width: min(520px, 100%);
  background: #fff;
  border-radius: 14px;
  padding: 1.2rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);

  h1 {
    margin-bottom: 0.5rem;
    font-family: "Playfair Display", "Baskerville", serif;
  }

  p {
    color: rgba(0, 0, 0, 0.66);
    margin-bottom: 0.9rem;
  }

  form {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  input {
    flex: 1;
    min-width: 220px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 0.7rem 0.8rem;
  }

  button {
    border: none;
    background: var(--color-primary);
    color: #fff;
    border-radius: 10px;
    padding: 0.7rem 1rem;
    font-weight: 600;
    cursor: pointer;
  }
`;export{s as RewardsScanPage};