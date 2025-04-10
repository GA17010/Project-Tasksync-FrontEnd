// stores/AuthStore.ts
export interface Credentials {
  email: string
  password: string
}

export interface UserData {
  full_name: string
  company?: string
  email: string
  password: string
  confirm_password: string
}

export interface User {
  id: string
  full_name: string
  email: string
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