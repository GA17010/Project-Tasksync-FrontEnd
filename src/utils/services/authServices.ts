// import { validate } from "vee-validate"
import apiService from "@/utils/services/apiServices"

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

interface AuthResponse {
  data: {
    message: string
    user: {
      id: string
      full_name: string
      email: string
    }
  }
}

interface CheckResponse {
  data: {
    message: string
  }
}

const authService = {
  register: async (userData: UserData): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      "/auth/register",
      userData
    )
    // localStorage.setItem("token", response.token); // Guarda el token en localStorage
    return response
  },

  login: async (credentials: Credentials): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(
      "/auth/login",
      credentials
    )
    // localStorage.setItem("token", response.token); // Guarda el token en localStorage
    return response
  },

  logout: async (): Promise<void> => {
    await apiService.post("/auth/logout")
    // localStorage.removeItem("token"); // Elimina el token del localStorage
  },

  checkAuth: async (): Promise<AuthResponse> => {
    const response = await apiService.get<AuthResponse>("/auth/checkAuth")

    return response
  },

  refreshToken: async (): Promise<CheckResponse> => {
    const response = await apiService.post<CheckResponse>("/auth/refreshToken")
    return response
  },
}

export default authService
