import{a as e}from"./rolldown-runtime-COnpUsM8.js";import{o as t,s as n}from"./vendor-motion-BitL1NIK.js";import{c as r}from"./vendor-react-XYNKAIcT.js";import{r as i}from"./vendor-styled-NKshhExe.js";var a=e(n(),1);async function o(e,t){let n=await fetch(e,{headers:{"Content-Type":`application/json`},...t});if(!n.ok){let e=await n.text();throw Error(e||`Request failed`)}return n.json()}var s={listCustomers:()=>o(`/api/rewards/customers`),createCustomer:e=>o(`/api/rewards/customers`,{method:`POST`,body:JSON.stringify(e)}),updatePoints:(e,t,n)=>o(`/api/rewards/customers/${e}/points`,{method:`PATCH`,body:JSON.stringify({points:t,note:n})}),getByToken:e=>o(`/api/rewards/customer/${e}`)},c=t();function l(){let{token:e=``}=r(),[t,n]=(0,a.useState)(null),[i,o]=(0,a.useState)(``);return(0,a.useEffect)(()=>{s.getByToken(e).then(n).catch(()=>o(`Rewards profile not found.`))},[e]),i?(0,c.jsx)(u,{children:(0,c.jsx)(d,{children:i})}):t?(0,c.jsx)(u,{children:(0,c.jsxs)(d,{children:[(0,c.jsx)(`h1`,{children:t.name}),(0,c.jsxs)(f,{children:[t.points,` points`]}),(0,c.jsxs)(p,{children:[t.tier,` tier`]}),(0,c.jsx)(`h3`,{children:`Recent Activity`}),(0,c.jsx)(`ul`,{children:t.recentActivity.length===0?(0,c.jsx)(`li`,{children:`No recent activity`}):t.recentActivity.map((e,t)=>(0,c.jsxs)(`li`,{children:[e.type,` (`,e.pointsChange>=0?`+`:``,e.pointsChange,`) - `,e.note]},`${e.createdAt}-${t}`))}),(0,c.jsxs)(m,{children:[(0,c.jsx)(`a`,{href:`/api/rewards/customer/${e}/contact.vcf`,children:`Save Contact`}),(0,c.jsx)(`a`,{href:`https://wa.me/?text=${encodeURIComponent(`My rewards page: ${window.location.origin}/rewards/${e}`)}`,target:`_blank`,rel:`noreferrer`,children:`Share on WhatsApp`})]})]})}):(0,c.jsx)(u,{children:(0,c.jsx)(d,{children:`Loading rewards...`})})}var u=i.main`
  min-height: 100vh;
  background: #f5f7f7;
  padding: 1rem;
  display: grid;
  place-items: center;
`,d=i.section`
  width: min(560px, 100%);
  background: #fff;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  h1 {
    margin-bottom: 0.3rem;
  }

  h3 {
    margin-top: 0.95rem;
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 0;
    padding-left: 1rem;
    color: rgba(0, 0, 0, 0.78);
  }
`,f=i.p`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
`,p=i.p`
  color: var(--color-primary);
  font-weight: 700;
`,m=i.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1rem;

  a {
    text-decoration: none;
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: #111;
    font-weight: 600;
  }
`;export{l as RewardsCustomerPage};