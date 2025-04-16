import { create } from "zustand"

// Large
import avatarLarge00 from "@/assets/images/users/large500x500/avatar-00.avif"
import avatarLarge01 from "@/assets/images/users/large500x500/avatar-01.avif"
import avatarLarge02 from "@/assets/images/users/large500x500/avatar-02.avif"
import avatarLarge03 from "@/assets/images/users/large500x500/avatar-03.avif"
import avatarLarge04 from "@/assets/images/users/large500x500/avatar-04.avif"
import avatarLarge05 from "@/assets/images/users/large500x500/avatar-05.avif"
import avatarLarge06 from "@/assets/images/users/large500x500/avatar-06.avif"
import avatarLarge07 from "@/assets/images/users/large500x500/avatar-07.avif"
import avatarLarge08 from "@/assets/images/users/large500x500/avatar-08.avif"
import avatarLarge09 from "@/assets/images/users/large500x500/avatar-09.avif"
import avatarLarge10 from "@/assets/images/users/large500x500/avatar-10.avif"
import avatarLarge11 from "@/assets/images/users/large500x500/avatar-11.avif"
import avatarLarge12 from "@/assets/images/users/large500x500/avatar-12.avif"
import avatarLarge13 from "@/assets/images/users/large500x500/avatar-13.avif"
import avatarLarge14 from "@/assets/images/users/large500x500/avatar-14.avif"

// Small
import avatarSmall00 from "@/assets/images/users/small80x80/avatar-00.avif"
import avatarSmall01 from "@/assets/images/users/small80x80/avatar-01.avif"
import avatarSmall02 from "@/assets/images/users/small80x80/avatar-02.avif"
import avatarSmall03 from "@/assets/images/users/small80x80/avatar-03.avif"
import avatarSmall04 from "@/assets/images/users/small80x80/avatar-04.avif"
import avatarSmall05 from "@/assets/images/users/small80x80/avatar-05.avif"
import avatarSmall06 from "@/assets/images/users/small80x80/avatar-06.avif"
import avatarSmall07 from "@/assets/images/users/small80x80/avatar-07.avif"
import avatarSmall08 from "@/assets/images/users/small80x80/avatar-08.avif"
import avatarSmall09 from "@/assets/images/users/small80x80/avatar-09.avif"
import avatarSmall10 from "@/assets/images/users/small80x80/avatar-10.avif"
import avatarSmall11 from "@/assets/images/users/small80x80/avatar-11.avif"
import avatarSmall12 from "@/assets/images/users/small80x80/avatar-12.avif"
import avatarSmall13 from "@/assets/images/users/small80x80/avatar-13.avif"
import avatarSmall14 from "@/assets/images/users/small80x80/avatar-14.avif"

const userAvatarLarge: Record<string, string> = {
  "avatar-00": avatarLarge00,
  "avatar-01": avatarLarge01,
  "avatar-02": avatarLarge02,
  "avatar-03": avatarLarge03,
  "avatar-04": avatarLarge04,
  "avatar-05": avatarLarge05,
  "avatar-06": avatarLarge06,
  "avatar-07": avatarLarge07,
  "avatar-08": avatarLarge08,
  "avatar-09": avatarLarge09,
  "avatar-10": avatarLarge10,
  "avatar-11": avatarLarge11,
  "avatar-12": avatarLarge12,
  "avatar-13": avatarLarge13,
  "avatar-14": avatarLarge14,
}

const userAvatarSmall: Record<string, string> = {
  "avatar-00": avatarSmall00,
  "avatar-01": avatarSmall01,
  "avatar-02": avatarSmall02,
  "avatar-03": avatarSmall03,
  "avatar-04": avatarSmall04,
  "avatar-05": avatarSmall05,
  "avatar-06": avatarSmall06,
  "avatar-07": avatarSmall07,
  "avatar-08": avatarSmall08,
  "avatar-09": avatarSmall09,
  "avatar-10": avatarSmall10,
  "avatar-11": avatarSmall11,
  "avatar-12": avatarSmall12,
  "avatar-13": avatarSmall13,
  "avatar-14": avatarSmall14,
}

interface UIState {
  isLoading: boolean
  userAvatarLarge: Record<string, string>
  userAvatarSmall: Record<string, string>
  setIsLoading: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: true,
  userAvatarLarge: userAvatarLarge,
  userAvatarSmall: userAvatarSmall,
  setIsLoading: (value) => set({ isLoading: value }),
}))
