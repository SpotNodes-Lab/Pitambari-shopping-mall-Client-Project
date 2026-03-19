import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function MainLayout() {
  return (
    <div className="font-body bg-background text-on-background antialiased selection:bg-primary selection:text-white min-h-screen flex flex-col scroll-smooth">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
