import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import styled from "styled-components"

const Root = styled.div`
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
`

const Main = styled.main`
  flex-grow: 1;
  padding-top: var(--header-height);
`

export function MainLayout() {
  return (
    <Root>
      <Navbar />
      <Main>
        <Outlet /> 
      </Main>
      <Footer />
    </Root>
  )
}
