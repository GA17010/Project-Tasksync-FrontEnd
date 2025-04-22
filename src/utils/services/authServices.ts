import {
  AuthResponse,
  CheckResponse,
  Credentials,
  RegisterDataRequest,
  User,
} from "@/types"
import apiService from "@/utils/services/apiServices"

const authService = {
  register: async (userData: RegisterDataRequest): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      "/api/register",
      userData
    )
    sessionStorage.setItem("user", JSON.stringify(response.user))
    localStorage.setItem("token", response.token)
    return response
  },

  login: async (credentials: Credentials): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      "/api/login",
      credentials
    )
    sessionStorage.setItem("user", JSON.stringify(response.user))
    localStorage.setItem("token", response.token)
    return response
  },

  logout: async (): Promise<void> => {
    await apiService.post("/api/logout")
    localStorage.removeItem("token")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("listFriends")
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
    sessionStorage.setItem("user", JSON.stringify(response))
    return response
  },
}

export default authService
