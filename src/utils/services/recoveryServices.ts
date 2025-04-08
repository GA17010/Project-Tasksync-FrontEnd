import apiService from "./apiServices"

interface Email {
  email: string
}

interface CheckResponse {
  data: {
    message: string
  }
}

interface VerifyData {
  email: string
  otp: string
}

interface ResetData {
  email: string
  otp: string
  password: string
}

const recoveryService = {
  forgotPassword: async (email: Email): Promise<CheckResponse> => {
    const response = await apiService.post<CheckResponse>(
      "/recovery/forgot-password",
      email
    )
    return response
  },
  verifyCode: async (verifyData: VerifyData): Promise<CheckResponse> => {
    const response = await apiService.post<CheckResponse>(
      "/recovery/verify-otp",
      verifyData
    )
    return response
  },
  resetPassword: async (resetData: ResetData): Promise<CheckResponse> => {
    const response = await apiService.post<CheckResponse>(
      "/recovery/reset-password",
      resetData
    )
    return response
  },
}

export default recoveryService
