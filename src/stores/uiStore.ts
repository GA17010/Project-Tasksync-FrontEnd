import { create } from "zustand"

import avatar1 from "@/assets/images/users/avatar-1.avif"
import avatar2 from "@/assets/images/users/avatar-2.avif"
import avatar3 from "@/assets/images/users/avatar-3.avif"
import avatar4 from "@/assets/images/users/avatar-4.avif"

const userAvatars: Record<string, string> = {
  "avatar-1": avatar1,
  "avatar-2": avatar2,
  "avatar-3": avatar3,
  "avatar-4": avatar4,
}

interface UIState {
  isLoading: boolean
  userAvatars: Record<string, string>
  setIsLoading: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  userAvatars: userAvatars,
  setIsLoading: (value) => set({ isLoading: value }),
}))
