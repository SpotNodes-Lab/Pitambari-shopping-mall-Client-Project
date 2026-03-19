import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainLayout } from "@/components/layouts/MainLayout"
import { HomePage } from "@/pages/HomePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* Future pages go here */}
          {/* <Route path="/lehengas" element={<LehengasPage />} /> */}
          {/* <Route path="/category/:id" element={<CategoryPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
