import pitambariBusinessThumb from "@/assets/PitambariJweles/Pitambari Image.png";
import virasatBusinessThumb from "@/assets/virasat/Virasat Image.png";
import reel1Mp4 from "@/assets/reels/reel1.mp4";
import reel2Mp4 from "@/assets/reels/reel2.mp4";
import reel3Mp4 from "@/assets/reels/reel3.mp4";
import reel4Mp4 from "@/assets/reels/reel4.mp4";
import reel5Mp4 from "@/assets/reels/reel5.mp4";

/** Curated grid on homepage when CMS `categories.items` is empty or unavailable. */
export const CURATED_CATEGORIES_FALLBACK = [
  {
    id: "bridal",
    title: "Bridal Lehengas",
    subtitle: "Discover Masterpieces",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAL9T15VHfNaTKXg73Zt0ZpBlExtMxwI32XLkyZCEEKt7JfeZtij2nANizikmnMc6sH0FvekhQpt9J33KfVDlzoYiWBKW1h7y269HBaB60GInHSP02r3yWbEKu9FKksuxQMPiHG-uagvp61s6JJL5PnHByRd1tJxNbPGBgyAelZyhEqFiTKnSY-8K1SPf1Cs7tkJhQQiun-a7Z6VZgwa7xmuX2z6MROJxDmxGmiZ4K9Ueo1BqqhxrzJlx-ya1IJ79CVYN9jDJDPs7U",
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
] as const;

/** Instagram reel strip when CMS `reels.items` is empty or invalid (bundled vertical MP4s). */
export const INSTAGRAM_REELS_STATIC_FALLBACK = [
  { id: "local-reel-1", title: "Reel 1", url: reel1Mp4 },
  { id: "local-reel-2", title: "Reel 2", url: reel2Mp4 },
  { id: "local-reel-3", title: "Reel 3", url: reel3Mp4 },
  { id: "local-reel-4", title: "Reel 4", url: reel4Mp4 },
  { id: "local-reel-5", title: "Reel 5", url: reel5Mp4 },
] as const;

/** YouTube Shorts strip when CMS `youtube.items` is empty or invalid. */
export const YOUTUBE_SHORTS_STATIC_FALLBACK = [
  {
    id: "yt-m7fwvj2zq8s",
    title: "YouTube Short 1",
    url: "https://www.youtube.com/shorts/m7FwVj2zQ8s?si=A1ab2tkYtw-sFIGk",
  },
  {
    id: "yt-kmj-gtnfzg",
    title: "YouTube Short 2",
    url: "https://www.youtube.com/shorts/Kmj-gtN_Fzg?si=HgcH-qEJ6GNrmPYY",
  },
  {
    id: "yt-gsjkgcejmym",
    title: "YouTube Short 3",
    url: "https://www.youtube.com/shorts/gSJkGcEJMyM?si=zm5ezETD2mTgwQ4w",
  },
] as const;

export const NAV_LINKS = [
  { name: "Home", href: "/", active: true },
  { name: "About us", href: "/about", active: false },
  { name: "Gallery", href: "/gallery", active: false },
  { name: "Our Businesses", href: "/showrooms", active: false },
  { name: "Contact", href: "/contact", active: false },
];

export const LATEST_ARRIVALS = [
  {
    id: 1,
    name: "Aurelia Silk Set",
    category: "Hand-woven Chanderi",
    price: "₹24,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpftBRjIJBuXeJY1Q5g2_rccqoz4rAZCokfIs2HzLZ5uMDvSkBWdXdWZg9ICacXyg7C46QTzrdpaYk5e0eO0A3sdGq7lqCc5csDJE_pl6mjsYI4o9FulTNdZC5MlDwPwOnMrBrwjyHM6mtnAhA0Lx7ora0g6LslPm_T6GqNk8u2xwDBmJx1MtQEvD639zEe_CEN4rxG-yGWyzHkif9OlsBA5b_dfog99DS94bpr5O05La6Gnwe2nVTf4ie1dvK_S6ka7aHTgSc-3Q",
  },
  {
    id: 2,
    name: "Zari Velvet Lehenga",
    category: "Royal Collection",
    price: "₹89,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBb_FNViAC8_ZOWuJv6NZul0llVfhXVZHcCU1G14vVsZT51eyoXNfO2Ba8aFHFf7-p2Ap0ycVhan_1YIR25xXkPIEvxwo9t66-3hmYk1EN976x2PxmZKJibhdhzX3nVvsb97qV7BWfZzEombcmCXNDtrcszKw_gvMn3KiqEBjQ12fxbtqjxRG8stee0aBaYYXquZz5ogGR6PSf30aVoehyriAk4YiVy3SXAfboIPIyhzVn0xVRKhmLGKVryEv82TSXRmPss-0t9KO4",
  },
  {
    id: 3,
    name: "Pastel Florals Anarkali",
    category: "Summer Soiree",
    price: "₹32,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPx5zYP8klw5wBebderwtBgHLYU-Ra3-_t7-eq9lK-5kFzHPi7op2lEYLrcsmtLx-egyTnTIyiQ9zFJSIcPLTNT6rvvLA2hMVrXul4JfrzthMOGvnJsEWOmGjNW_meUnnD-5RFE5Xo_DxloRmZX65XV7nbORaaF2KGPzHU471FmYmMLnnaHXhccnhqpnfvnaXv4PLKL32POKUmIbIoVIyZ5y8W0DLSEpDgh72mx38l2LSJKZ3RQNylIddtnih1IfD7mtuZRTO6oyA",
  },
  {
    id: 4,
    name: "Regal Sherwani",
    category: "The Groom's Choice",
    price: "₹55,900",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrbTy4WP-i0WhMA_MVUqdUq78kQfdnIr3Eg-xhzcEVlQlhNcS32-Mez-tnKpSBIl5VAIYDYW2PoXCLBoCUsJA7ye9RoGEU2FZhcnp_OEPgc_6mifwvT3AyQl1D0uR04jOMFl248ZapJT5hCUj4hqEqrh04Juh5E65FsFyK7yICv6GSmInBGcL9urZz_8zNRcBKfmIkuGvZ8dNopM1etd2zyF1e13xQq9Nuq6h_29i6jIyDW620w-g11YiIW3yqJG6nmbHbcvUqtnw",
  },
  {
    id: 5,
    name: "Aurelia Silk Set",
    category: "Hand-woven Chanderi",
    price: "₹24,999",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpftBRjIJBuXeJY1Q5g2_rccqoz4rAZCokfIs2HzLZ5uMDvSkBWdXdWZg9ICacXyg7C46QTzrdpaYk5e0eO0A3sdGq7lqCc5csDJE_pl6mjsYI4o9FulTNdZC5MlDwPwOnMrBrwjyHM6mtnAhA0Lx7ora0g6LslPm_T6GqNk8u2xwDBmJx1MtQEvD639zEe_CEN4rxG-yGWyzHkif9OlsBA5b_dfog99DS94bpr5O05La6Gnwe2nVTf4ie1dvK_S6ka7aHTgSc-3Q",
  },
];

export const ATELIER_STORIES = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvF4NUwLSM76qztAsvAJDlTxyVfuDKn_mplo2wXYj_8HjgER9wsi0W1LmB2McBf1yQV2utyevRGFwvoBCfU6Cxoq1d5u7uKGJ3_GqIWgrM3c9zjRYdRl82VtUo8lTpibwqUxY4hgRLQI9lCpTyAXFRoQR5oWFgcVIigyV4PUJJtGtAdELMDTl1FZsMg8x8f3MsP_JD---WFrsoK2e2hepnSywbUGD01T3nwE7lDIPLPtpjMKfLyPnsKAdlBp3-XSh6TSJV9EOU0rY",
    alt: "Customer story 1",
    delay: 0,
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbQyk9ZLOMoK6fXuHdTyYwfqsWDbLsmlPrs13puntFeTGD9Hi8iEmD2uzg5QIrKDMtiWTqzNTivYp0PkZnNmGWl0hjlw5IYr9xLantRF-vHUs8xF1sfxigbAnS_trXiMQr9Ts4fiekeD28Rl1_a1QvYUJNlF4Uo6KEYY9U9zX6w8Pb4_HmaOSioqejwIaK_m-b0MSc4FhAz_yuHuX0eUdCl6GVVV1i9-8FHe7oYPPH-7tmZBaeBtLfYH3-aC7Fsa7Hs_mZIEUeR1k",
    alt: "Customer story 2",
    delay: 0.1,
    mt: true,
  },
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpjpiK2LQInSarDuNTfsNURbFL-sUXSFY3bw8N5zaf4po96dS9DUksSCVpS6XJRnN5cJcfF_1S-pgV5B-5OuazggwHN5pEu9YHth9peO8M-gYpe0HWCSzf3mZwht9-ZpiqMseYRKKh7xihosH1ls_OX9tl-KjZNcHzCJkMT2cXBh2GnV_DfJ-X40j6cMihIjNaTI1W9MvOC6dhNeFNonDvmtYVqY93rGRj_vCdyB88CdzYi-TNDSaUDWHifq65IVGil8jfw-oxRAQ",
    alt: "Customer story 3",
    delay: 0.2,
  },
  {
    id: 4,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJgj_7ZWXjpiepdboyhWW0iqkrDCk-OHXKLv5gW78PndnQF8WffpRGRvfk2K9BGpHnQaFaxNnkCGzIalKnitXEkY24HMH-WqzkcQVV7zCaOkiYgqwCouKh-Pep43aqWQRwg5xza4LJSkIpVcHQxr1M39jwpf5fuYdiZvcv8iUlv_MXmQSdJpM1odKDahHYZXNs460d4W2X6TF0eBLImdx3wLk_FOz9dI7HAcfOcxipmXFFGK0r1OiBgxLhKa8rLmL4WlNmNkglcGQ",
    alt: "Customer story 4",
    delay: 0.3,
    mt: true,
  },
  {
    id: 5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDVKONvvedRbswpKiwjKiMUSG9iwh_7Rr9UAdUbQQLLI-ox0Bvq25nyIV4_E6oYZPNw_umlN79nFX0TsI6Tcjy50fTOCIgNKfTuA3xXCD8YuQdA21M2giStv4rgnZZ4GW_63P6fvWjWHryl_85XMPeCzUFp91xx-DaMN4-sfHw3bkNFCZmFhIm9KKWglB4jvW_CCv6Wp1FsAEipoQdkoV7AqVo4uHkBIVTvutezKNyyy1JvLzjbJBAjAK0f3-MXw2PhtDxwgzsEHI",
    alt: "Customer story 5",
    delay: 0.4,
  },
];

export const SHOWROOMS = [
  {
    id: "pitambari-jewel-studio",
    title: "PITAMBARI JEWEL STUDIO",
    image: pitambariBusinessThumb,
    cta: "Know More",
    detailsPath: "/showrooms/pitambari-jewel-studio",
  },
  {
    id: "virasat",
    title: "VIRASAT",
    image: virasatBusinessThumb,
    cta: "Know More",
    detailsPath: "/showrooms/virasat",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya S.",
    title: "Bridal Specialist",
    quote:
      "Every visit feels like a personal couture consultation. The finishes and fit are consistently exceptional.",
  },
  {
    id: 2,
    name: "Rohit K.",
    title: "Groom’s Wardrobe",
    quote:
      "Elegant, modern, and crafted with care. The team understands what looks premium on real people.",
  },
  {
    id: 3,
    name: "Ananya M.",
    title: "Customer",
    quote:
      "From selection to tailoring, the experience is smooth and thoughtful. The collection speaks for itself.",
  },
  {
    id: 4,
    name: "Meera D.",
    title: "Occasion Shopper",
    quote:
      "Beautiful fabrics, reliable timelines, and a confident recommendation every time. Highly recommended.",
  },
];

export const GALLERY_IMAGES = [
  {
    id: 1,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/20.webp",
    alt: "Bridal Lehenga Collection",
  },
  {
    id: 2,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/12.webp",
    alt: "Royal Groom Sherwani",
  },
  {
    id: 3,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/13.webp",
    alt: "Handwoven Silk Saree",
  },
  {
    id: 4,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/14-1.webp",
    alt: "Designer Anarkali Suit",
  },
  {
    id: 5,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/22.webp",
    alt: "Intricate Zari Work",
  },
  {
    id: 6,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/23.webp",
    alt: "Couple's Festive Wear",
  },
  {
    id: 7,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/15.webp",
    alt: "Classic Kurta Pyjama",
  },
  {
    id: 8,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/16.webp",
    alt: "Bridal Jewelry & Details",
  },
  {
    id: 9,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/17.webp",
    alt: "Pastel Wedding Lehenga",
  },
  {
    id: 10,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/18.webp",
    alt: "Banarasi Silk Saree",
  },
  {
    id: 11,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/19.webp",
    alt: "Premium Fabric Selection",
  },
  {
    id: 12,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/20.webp",
    alt: "Haldi Ceremony Outfits",
  },
  {
    id: 13,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/21.webp",
    alt: "Reception Gown",
  },
  {
    id: 14,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/24.webp",
    alt: "Traditional Menswear",
  },
  {
    id: 15,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/25.webp",
    alt: "Mehendi Special Lehenga",
  },
  {
    id: 16,
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/26.webp",
    alt: "Festive Kids Wear",
  },
];

/** Hero banner slideshow on the Gallery page (above the main grid). */
export const GALLERY_HERO_SLIDES = [
  {
    id: "hero-01",
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/01.webp",
    alt: "Pitambari collection spotlight 1",
  },
  {
    id: "hero-02",
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/02.webp",
    alt: "Pitambari collection spotlight 2",
  },
  {
    id: "hero-03",
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/03.webp",
    alt: "Pitambari collection spotlight 3",
  },
  {
    id: "hero-04",
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/04.webp",
    alt: "Pitambari collection spotlight 4",
  },
  {
    id: "hero-05",
    image:
      "https://shreedholisatiretailmall.com/wp-content/uploads/2025/08/05.webp",
    alt: "Pitambari collection spotlight 5",
  },
] as const;
