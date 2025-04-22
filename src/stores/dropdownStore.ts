import { create } from "@/utils/locales/zustand"

interface DropdownState {
  activeDropdownId: string | null
  openDropdown: (id: string) => void
  closeDropdown: (id: string) => void
  closeAllDropdowns: () => void
}

export const useDropdownStore = create<DropdownState>()((set) => ({
  activeDropdownId: null,
  openDropdown: (id) => set({ activeDropdownId: id }),
  closeDropdown: (id) =>
    set((state) =>
      state.activeDropdownId === id ? { activeDropdownId: null } : state
    ),
  closeAllDropdowns: () => set({ activeDropdownId: null }),
}))
