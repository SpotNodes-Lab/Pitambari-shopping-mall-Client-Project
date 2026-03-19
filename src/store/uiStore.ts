import { create } from 'zustand'

interface UIStore {
  isCartOpen: boolean
  isMobileMenuOpen: boolean
  cartCount: number
  toggleCart: () => void
  toggleMobileMenu: () => void
  addToCart: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  cartCount: 0,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  addToCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
}))
