import authService from "@/utils/services/authServices" // Adjust the path as needed
import { create } from "zustand"

interface Credentials {
  email: string
  password: string
}

interface UserData {
  full_name: string
  company?: string
  email: string
  password: string
  confirm_password: string
}

interface User {
  id: string
  full_name: string
  email: string
}

interface AuthStore {
  user: User | null
  errorAuth: string | null
  successAuth: string | null
  isAuthenticated: boolean
  lastAuthCheck: number | null
  unauthorized: boolean
  errorRegister: string | null
  successRegister: string | null
  refreshError: string | null
  registerUser: (userData: UserData) => Promise<boolean>
  login: (credentials: Credentials) => Promise<boolean>
  checkAuth: () => Promise<boolean>
  logout: () => Promise<boolean>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  errorAuth: null,
  successAuth: null,
  isAuthenticated: false,
  lastAuthCheck: null,
  unauthorized: true,
  errorRegister: null,
  successRegister: null,
  refreshError: null,
  registerUser: async (userData: UserData) => {
    try {
      const response = await authService.register(userData)
      console.log(response.data.user, "respuesta")

      set({
        user: response.data.user,
        successRegister: response.data.message,
        lastAuthCheck: Date.now(),
        isAuthenticated: true,
        errorRegister: "",
      })

      return true
    } catch (error) {
      console.log(error)
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ errorRegister: "Connection error" })
      } else if (error instanceof Error) {
        set({ errorRegister: error.message || "Register failed" })
      } else {
        set({ errorRegister: "An unknown error occurred." })
      }
      return false
    }
  },
  login: async (credentials: Credentials) => {
    try {
      const response = await authService.login(credentials)

      set({
        user: response.data.user,
        successAuth: response.data.message,
        lastAuthCheck: Date.now(),
        isAuthenticated: true,
        errorAuth: "",
        unauthorized: false,
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ errorAuth: "Connection error" })
      } else if (error instanceof Error) {
        set({ errorAuth: error.message || "Login failed" })
      } else {
        set({ errorAuth: "An unknown error occurred." })
      }
      return false
    }
  },
  checkAuth: async () => {
    const state = useAuthStore.getState()
    if (
      state.isAuthenticated &&
      state.lastAuthCheck &&
      Date.now() - state.lastAuthCheck < 60000
    ) {
      return true
    }

    try {
      const response = await authService.checkAuth()
      set({
        isAuthenticated: true,
        user: response.data.user,
        lastAuthCheck: Date.now(),
      })

      return true
    } catch (error) {
      if (error) {
        try {
          const refreshResponse = await authService.refreshToken()
          set({
            successAuth: refreshResponse.data.message,
            isAuthenticated: true,
          })

          return true
        } catch (refreshError) {
          if (
            refreshError instanceof TypeError &&
            refreshError.message === "Failed to fetch"
          ) {
            set({ refreshError: "Connection error" })
          } else if (refreshError instanceof Error) {
            set({
              refreshError: refreshError.message || "Refresh token failed",
            })
          } else {
            set({ refreshError: "An unknown error occurred." })
          }
          set({
            isAuthenticated: false,
            lastAuthCheck: null,
          })
          return false
        }
      }
      return false
    }
  },
  logout: async () => {
    try {
      await authService.logout()
      set({
        user: null,
        isAuthenticated: false,
        lastAuthCheck: null,
        successAuth: null,
        errorAuth: null,
        unauthorized: true,
      })
      return true
    } catch {
      return false
    }
  },
}))
