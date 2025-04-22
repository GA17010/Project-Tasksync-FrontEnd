import { Email, ResetData, VerifyData } from "@/types"
import { create } from "@/utils/locales/zustand"
import recoveryService from "@/utils/services/recoveryServices"

interface RecoveryStore {
  recoveryError: string | null
  successRecovery: string | null
  recoveryEmail: string | null
  recoveryCode: string | null
  forgotPassword: (email: Email) => Promise<boolean>
  verifyCode: (verifyData: VerifyData) => Promise<boolean>
  resetPassword: (resetData: ResetData) => Promise<boolean>
}

export const useRecoveryStore = create<RecoveryStore>()((set) => ({
  recoveryError: null,
  successRecovery: null,
  recoveryEmail: null,
  recoveryCode: null,
  forgotPassword: async (email: Email) => {
    try {
      const response = await recoveryService.forgotPassword(email)
      set({
        successRecovery: response.data.message,
        recoveryError: null,
        recoveryEmail: email.email,
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ recoveryError: "Connection error" })
      } else if (error instanceof Error) {
        set({ recoveryError: error.message || "Invalid Data" })
      } else {
        set({ recoveryError: "An unknown error occurred." })
      }
      return false
    }
  },
  verifyCode: async (verifyData: VerifyData) => {
    try {
      const response = await recoveryService.verifyCode(verifyData)
      set({
        successRecovery: response.data.message,
        recoveryError: null,
        recoveryCode: verifyData.otp,
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ recoveryError: "Connection error" })
      } else if (error instanceof Error) {
        set({ recoveryError: error.message || "Invalid Data" })
      } else {
        set({ recoveryError: "An unknown error occurred." })
      }
      return false
    }
  },
  resetPassword: async (resetData: ResetData) => {
    try {
      const response = await recoveryService.resetPassword(resetData)
      set({
        successRecovery: response.data.message,
        recoveryError: null,
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ recoveryError: "Connection error" })
      } else if (error instanceof Error) {
        set({ recoveryError: error.message || "Invalid Data" })
      } else {
        set({ recoveryError: "An unknown error occurred." })
      }
      return false
    }
  },
}))
