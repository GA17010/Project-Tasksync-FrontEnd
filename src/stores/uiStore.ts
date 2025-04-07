import { create } from "zustand"

interface UIState {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  setIsLoading: (value) => set({ isLoading: value }),
}))
