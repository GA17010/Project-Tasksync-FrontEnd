// stores/AuthStore.ts
export interface LoginRequestBody {
  email: string
  password: string
}

export interface RegisterRequestBody {
  name: string
  company?: string
  email: string
  password: string
  password_confirmation: string
}

// utils/services/apiServices.ts
export interface UserRequestBody {
  name: string
  nickname: string
  icon?: string
  email: string
  password: string
  password_confirmation: string
}

export interface FriendRequestBody {
  receiver_email: string
}

export interface TaskRequestBody {
  content: string
  status: "todo" | "in_progress" | "in_review" | "done"
  assigned_to: string | null
  project_id?: string
}

export interface NotificationRequestBody {
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

export interface ProjectRequestBody {
  name: string
  description?: string
}

export interface SharedProjectRequestBody {
  user_id: string
}

// Union type para el body de las peticiones
export type ApiRequestBody =
  | LoginRequestBody
  | RegisterRequestBody
  | UserRequestBody
  | FriendRequestBody
  | TaskRequestBody
  | NotificationRequestBody
  | ProjectRequestBody
  | SharedProjectRequestBody

export interface ApiError {
  message?: string
}