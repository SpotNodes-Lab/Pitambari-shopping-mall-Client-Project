import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { ShowroomsPage } from "@/pages/ShowroomsPage";
import { ContactPage } from "@/pages/ContactPage";
import { RewardsScanPage } from "@/pages/RewardsScanPage";
import { RewardsCustomerPage } from "@/pages/RewardsCustomerPage";
import { PitambariJewelStudioPage } from "@/pages/PitambariJewelStudioPage";
import { VirasatPage } from "@/pages/VirasatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/showrooms" element={<ShowroomsPage />} />
          <Route path="/showrooms/pitambari-jewel-studio" element={<PitambariJewelStudioPage />} />
          <Route path="/showrooms/virasat" element={<VirasatPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/rewards/scan" element={<RewardsScanPage />} />
        <Route path="/rewards/:token" element={<RewardsCustomerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
