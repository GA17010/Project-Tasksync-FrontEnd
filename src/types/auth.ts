// Types Global
export interface User {
  id: string
  name: string
  nickname: string
  icon: string
  email: string
  email_verified_at: boolean | null
  created_at: string
  updated_at: string
}

// utils/services/authServices.ts + type (stores/AuthStore.ts)
export interface AuthResponse {
  user: User
  token: string
}

export interface CheckResponse {
  data: {
    message: string
  }
}



// stores/recoveryStore.ts
export interface Email {
  email: string
}

export interface VerifyData {
  email: string
  otp: string
}

export interface ResetData {
  email: string
  otp: string
  password: string
}
