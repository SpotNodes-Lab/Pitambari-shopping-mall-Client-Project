// import { apiClient } from './api'; // Uncomment when connecting to real backend
import { ATELIER_STORIES } from "@/constants/index";

// Simulated API Service for Admin Panel Readiness
export const HomeService = {
  // GET /api/home/hero
  getHeroContent: async () => {
    // In production: return apiClient.get('/home/hero');
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            title: "A Legacy of Elegance",
            subtitle: "New Arrivals 2026",
            description:
              "Discover curated collections that blend eighty years of heritage with modern sophistication. Find everything under one roof.",
            mainImage:
              "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/29.webp",
            secondaryImage:
              "https://www.bringitonline.in/uploads/2/2/4/5/22456530/kurta-shawl-photoshoot-mens-ethnic-wear-photoshoot-traditional-dress-poses-for-man-mens-ethnic-wear-for-wedding-traditional-indian-mens-clothing-bringitonline_orig.jpeg",
          }),
        800,
      ),
    );
  },

  // GET /api/home/categories
  getCategories: async () => {
    // In production: return apiClient.get('/home/categories');
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              id: "bridal",
              title: "Bridal Lehengas",
              subtitle: "Discover Masterpieces",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAL9T15VHfNaTKXg73Zt0ZpBlExtMxwI32XLkyZCEEKt7JfeZtij2nANizikmnMc6sH0FvekhQpt9J33KfVDlzoYiWBKW1h7y269HBaB60GInHSP02r3yWbEKu9FKksuxQMPiHG-uagvp61s6JJL5PnHByRd1tJxNbPGBgyAelZyhEqFiTKnSY-8K1SPf1Cs7tkJhQQiun-a7Z6VZgwa7xmuX2z6MROJxDmxGmiZ4K9Ueo1BqqhxrzJlx-ya1IJ79CVYN9jDJDPs7U",
              span: "md:col-span-7",
            },
            {
              id: "sarees",
              title: "Heritage Sarees",
              subtitle: "Shop Classics",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAltSW9MI2gIo9reqNiNm4KmD2wLDTGs9AIlqUF6i8KG7AKJPwSL6XntW2av355NLbiRSvGLNFLdvFgNIDAajIPrKfz-FSOWuifNnOzxRJU9o12XnJMhlA9Yy-gCxuIGtZUNq3dqk_d3-GnvpXNSYo4STIXIy5yiLx5K6XFSDluPNQB3G5ZfKoNikGAYyoXOHVPhXJk6g-UASC2ciwFiag2VcKEfB76gU7WLm-oRnMsryVQESvKS4KZyt-m_Dk-eAuAylSezdLZRu8",
            },
            {
              id: "groom",
              title: "The Modern Groom",
              subtitle: "The New Collective",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDvtL3yCSM-lBkLDOdJqMhngmB00bWiTIBPeDSdgXNpO0dZk_GWbimdjU5IdrpqR3dTj5tt7Oxka6G-MbyzL2QzfzpzThdr0SFUFKorFLzoGwq1-tvEwA8k34g-gkrG_JlkOGgLxcc6UFIiWaSanLkz7nyBuyKo2j9EFkr3UAqOs8KfMMgoTpwWARVHCw-qkFkNGPhwz4cJxDNE4G1e97kgLW4Rk53DKE7eWRAvl2wTl5G5bI-loRps4X2fJz4JVtsKKsB0bc0BHKI",
            },
            {
              id: "kids-festive",
              title: "Children and Festive",
              subtitle: "Discover Masterpieces",
              image:
                "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/21.webp",
            },
            {
              id: "modern-collections",
              title: "Modern Collections",
              subtitle: "Shop Classics",
              image:
                "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/16.webp",
            },
            {
              id: "summer-festive",
              title: "Summer Festive Edit",
              subtitle: "Shop Classics",
              image:
                "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/14-1.webp",
            },
          ]),
        600,
      ),
    );
  },

  // GET /api/gallery
  getAtelierStories: async () => {
    // return apiClient.get('/gallery');
    return new Promise((resolve) =>
      setTimeout(() => resolve(ATELIER_STORIES), 700),
    );
  },
};
