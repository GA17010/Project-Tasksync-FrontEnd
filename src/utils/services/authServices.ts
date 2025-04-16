import apiService from "@/utils/services/apiServices"
import { UserData, AuthResponse, Credentials, CheckResponse } from '@/types'

const authService = {
  register: async (userData: UserData): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      "/api/register",
      userData
    )
    localStorage.setItem("token", response.token)
    return response
  },

  login: async (credentials: Credentials): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      "/api/login",
      credentials
    )
    localStorage.setItem("token", response.token);
    return response
  },

  logout: async (): Promise<void> => {
    await apiService.post("/api/logout")
    localStorage.removeItem("token");
  },

  checkAuth: async (): Promise<AuthResponse> => {
    const response = await apiService.get<AuthResponse>("/api/checkAuth")

    return response
  },

  refreshToken: async (): Promise<CheckResponse> => {
    const response = await apiService.post<CheckResponse>("/api/refreshToken")
    return response
  },
}

export default authService
