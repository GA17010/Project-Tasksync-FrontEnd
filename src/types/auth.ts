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

// utils/services/apiServices.ts
export interface Body {
  id?: string
  name?: string
  nickname?: string
  icon?: string
  email?: string
  password?: string
  password_confirmation?: string
  user_id?: string
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

// stores/AuthStore.ts
export interface Credentials {
  email: string
  password: string
}

export interface UserData {
  name: string
  company?: string
  email: string
  password: string
  password_confirmation: string
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

// stores/notificationStore.ts
export interface Data_notification {
  id: number
  message: {
    prefix: string
    main: string
    suffix: string
  }
  timestamps: {
    receivedAt: string
    lastSeen: string
    isRead: boolean
  }
  category: "reminder" | "interaction" | "system" | "invitation"
}
