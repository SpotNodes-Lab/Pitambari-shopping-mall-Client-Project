import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";

const HomePage = lazy(() =>
  import("@/pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const GalleryPage = lazy(() =>
  import("@/pages/GalleryPage").then((m) => ({ default: m.GalleryPage })),
);
const ShowroomsPage = lazy(() =>
  import("@/pages/ShowroomsPage").then((m) => ({ default: m.ShowroomsPage })),
);
const ContactPage = lazy(() =>
  import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const RewardsScanPage = lazy(() =>
  import("@/pages/RewardsScanPage").then((m) => ({ default: m.RewardsScanPage })),
);
const RewardsCustomerPage = lazy(() =>
  import("@/pages/RewardsCustomerPage").then((m) => ({
    default: m.RewardsCustomerPage,
  })),
);
const PitambariJewelStudioPage = lazy(() =>
  import("@/pages/PitambariJewelStudioPage").then((m) => ({
    default: m.PitambariJewelStudioPage,
  })),
);
const VirasatPage = lazy(() =>
  import("@/pages/VirasatPage").then((m) => ({ default: m.VirasatPage })),
);

function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        minHeight: "40vh",
        alignItems: "center",
        justifyContent: "center",
        color: "#666",
        fontSize: "0.95rem",
      }}
    >
      Loading…
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/showrooms" element={<ShowroomsPage />} />
            <Route
              path="/showrooms/pitambari-jewel-studio"
              element={<PitambariJewelStudioPage />}
            />
            <Route path="/showrooms/virasat" element={<VirasatPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/rewards/scan" element={<RewardsScanPage />} />
          <Route path="/rewards/:token" element={<RewardsCustomerPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
