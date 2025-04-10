import { create } from "zustand"

type CustomizerState = {
  Profile_dropdown: boolean
  Notification_dropdown: boolean
  SearchBar_dropdown: boolean

  statusTask: string
  inputVisible: boolean
  columnIndicatorVisible: string

  focusInput: () => void
  resetColumnIndicatorVisible: () => void
  setInputVisible: () => void
  inputActive: (status: string) => void

  SET_PROFILE_DROPDOWN: () => void
  SET_NOTIFICATION_DROPDOWN: () => void
  SET_SEARCHBAR_DROPDOWN: () => void
}

export const useCustomizerStore = create<CustomizerState>((set) => ({
  Profile_dropdown: false,
  Notification_dropdown: false,
  SearchBar_dropdown: false,

  statusTask: "",
  inputVisible: false,
  columnIndicatorVisible: "",

  focusInput: () => {
    // La lógica para enfocar el input se manejará en el componente del input
  },

  resetColumnIndicatorVisible: () => set({ columnIndicatorVisible: "" }),
  setInputVisible: () =>
    set((state) => ({
      inputVisible: !state.inputVisible,
    })),
  inputActive: (status: string) => {
    set((state) => ({
      inputVisible: !state.inputVisible,
      statusTask: status,
      columnIndicatorVisible: status,
    }))
  },

  SET_PROFILE_DROPDOWN: () =>
    set((state) => ({ Profile_dropdown: !state.Profile_dropdown })),
  SET_NOTIFICATION_DROPDOWN: () =>
    set((state) => ({ Notification_dropdown: !state.Notification_dropdown })),
  SET_SEARCHBAR_DROPDOWN: () =>
    set((state) => ({ SearchBar_dropdown: !state.SearchBar_dropdown })),
}))
