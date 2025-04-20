import {
  AuthResponse,
  CheckResponse,
  Credentials,
  User,
  RegisterDataRequest,
} from "@/types"
import apiService from "@/utils/services/apiServices"

const authService = {
  register: async (userData: RegisterDataRequest): Promise<AuthResponse> => {
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
    localStorage.setItem("token", response.token)
    return response
  },

  logout: async (): Promise<void> => {
    await apiService.post("/api/logout")
    localStorage.removeItem("token")
  },

  checkAuth: async (): Promise<AuthResponse> => {
    const response = await apiService.get<AuthResponse>("/api/checkAuth")

    return response
  },

  refreshToken: async (): Promise<CheckResponse> => {
    const response = await apiService.post<CheckResponse>("/api/refreshToken")
    return response
  },

  fetchMe: async (): Promise<User> => {
    const response = await apiService.get<User>("/api/me")
    return response
  },
}

export default authService
