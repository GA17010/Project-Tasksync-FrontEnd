import { create } from "zustand"

type CustomizerState = {
  Profile_dropdown: boolean
  Notification_dropdown: boolean
  SearchBar_dropdown: boolean
  
  SET_PROFILE_DROPDOWN: () => void
  SET_NOTIFICATION_DROPDOWN: () => void
  SET_SEARCHBAR_DROPDOWN: () => void
}

export const useCustomizerStore = create<CustomizerState>((set) => ({
  Sidebar_drawer: true,
  Profile_dropdown: false,
  Notification_dropdown: false,
  SearchBar_dropdown: false,

  SET_PROFILE_DROPDOWN: () =>
    set((state) => ({ Profile_dropdown: !state.Profile_dropdown })),
  SET_NOTIFICATION_DROPDOWN: () =>
    set((state) => ({ Notification_dropdown: !state.Notification_dropdown })),
  SET_SEARCHBAR_DROPDOWN: () =>
    set((state) => ({ SearchBar_dropdown: !state.SearchBar_dropdown })),
}))
