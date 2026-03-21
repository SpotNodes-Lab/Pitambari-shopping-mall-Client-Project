import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { ShowroomsPage } from "@/pages/ShowroomsPage";
import { ContactPage } from "@/pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/showrooms" element={<ShowroomsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
