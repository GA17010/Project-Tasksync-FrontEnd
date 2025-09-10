// Configuración base de Fetch
import { ApiError, ApiRequestBody } from "@/types"
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL
const token: string | null = localStorage.getItem("token")

const apiService = {
  get: async <T>(endpoint: string, config?: RequestInit): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      } as HeadersInit,
      credentials: "include",
      ...config,
    })
    return handleResponse<T>(response)
  },

  post: async <T>(
    endpoint: string,
    body?: ApiRequestBody,
    config?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      } as HeadersInit,
      credentials: "include",
      body: JSON.stringify(body),
      ...config,
    })
    return handleResponse<T>(response)
  },

  put: async <T>(
    endpoint: string,
    body: ApiRequestBody,
    config?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      } as HeadersInit,
      credentials: "include",
      body: JSON.stringify(body),
      ...config,
    })
    return handleResponse<T>(response)
  },

  delete: async <T>(
    endpoint: string,
    body?: ApiRequestBody,
    config?: RequestInit
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      } as HeadersInit,
      credentials: "include",
      body: JSON.stringify(body),
      ...config,
    })
    return handleResponse<T>(response)
  },
}

// Función para manejar la respuesta y los errores
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData: unknown = await response.json()
    const error = errorData as ApiError
    throw new Error(error.message ?? "Something went wrong")
  }
  return (await response.json()) as T
}

export default apiService
