// import { apiClient } from './api'; // Uncomment when connecting to real backend
import { LATEST_ARRIVALS, ATELIER_STORIES } from '@/constants/index';

// Simulated API Service for Admin Panel Readiness
export const HomeService = {
  // GET /api/home/hero
  getHeroContent: async () => {
    // In production: return apiClient.get('/home/hero');
    return new Promise((resolve) => setTimeout(() => resolve({
      title: "Threads of Tradition",
      subtitle: "Shree Dholi Sati Presents",
      description: "Crafting timeless heritage through meticulously hand-stitched couture. Discover the essence of the modern bride.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKozCGIAasNb2oO3SCz0mlUACnhJgBTTxQCXESC2jAuslQ9QDSEgnc4RUMHoCqDyBt3kZBjsocYpYlkKTQ9geh4_QWAxOpyY8AM3mjKAEH0NwbmJvxdhwNcsZyZ2yT3yd6-z8PVwQSjGDmpb_XUXEjChiMvLgHsel7-xJoDuFzQtcLSiwMmayQZzc4ifArulO6f433FzyeTKSEEanKviFvG-CY1K9W0Tkrdz5ovpTbit6JcNyvvZErABQDoerzJ3texSMD29meXow"
    }), 800));
  },

  // GET /api/home/categories
  getCategories: async () => {
    // In production: return apiClient.get('/home/categories');
    return new Promise((resolve) => setTimeout(() => resolve([
      {
        id: 'bridal',
        title: 'Bridal Lehengas',
        subtitle: 'Discover Masterpieces',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL9T15VHfNaTKXg73Zt0ZpBlExtMxwI32XLkyZCEEKt7JfeZtij2nANizikmnMc6sH0FvekhQpt9J33KfVDlzoYiWBKW1h7y269HBaB60GInHSP02r3yWbEKu9FKksuxQMPiHG-uagvp61s6JJL5PnHByRd1tJxNbPGBgyAelZyhEqFiTKnSY-8K1SPf1Cs7tkJhQQiun-a7Z6VZgwa7xmuX2z6MROJxDmxGmiZ4K9Ueo1BqqhxrzJlx-ya1IJ79CVYN9jDJDPs7U',
        span: 'md:col-span-7'
      },
      {
        id: 'sarees',
        title: 'Heritage Sarees',
        subtitle: 'Shop Classics',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAltSW9MI2gIo9reqNiNm4KmD2wLDTGs9AIlqUF6i8KG7AKJPwSL6XntW2av355NLbiRSvGLNFLdvFgNIDAajIPrKfz-FSOWuifNnOzxRJU9o12XnJMhlA9Yy-gCxuIGtZUNq3dqk_d3-GnvpXNSYo4STIXIy5yiLx5K6XFSDluPNQB3G5ZfKoNikGAYyoXOHVPhXJk6g-UASC2ciwFiag2VcKEfB76gU7WLm-oRnMsryVQESvKS4KZyt-m_Dk-eAuAylSezdLZRu8'
      },
      {
        id: 'groom',
        title: 'The Modern Groom',
        subtitle: 'The New Collective',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvtL3yCSM-lBkLDOdJqMhngmB00bWiTIBPeDSdgXNpO0dZk_GWbimdjU5IdrpqR3dTj5tt7Oxka6G-MbyzL2QzfzpzThdr0SFUFKorFLzoGwq1-tvEwA8k34g-gkrG_JlkOGgLxcc6UFIiWaSanLkz7nyBuyKo2j9EFkr3UAqOs8KfMMgoTpwWARVHCw-qkFkNGPhwz4cJxDNE4G1e97kgLW4Rk53DKE7eWRAvl2wTl5G5bI-loRps4X2fJz4JVtsKKsB0bc0BHKI'
      }
    ]), 600));
  },

  // GET /api/products/latest
  getLatestArrivals: async () => {
    // return apiClient.get('/products?sort=latest&limit=10');
    return new Promise((resolve) => setTimeout(() => resolve(LATEST_ARRIVALS), 1000));
  },

  // GET /api/gallery
  getAtelierStories: async () => {
    // return apiClient.get('/gallery');
    return new Promise((resolve) => setTimeout(() => resolve(ATELIER_STORIES), 700));
  }
};
