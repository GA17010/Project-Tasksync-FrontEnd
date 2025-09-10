export interface ProjectRequest {
  name: string
  description?: string
}

export interface ProjectResponse {
  id: string
  name: string
  description: string
  owner: {
    id: string
    name: string
  }
  created_at: Date
  updated_at: Date
}

export interface Assigned {
  id: string
  name: string
  icon: string
}

export interface TaskRequest {
  content: string
  status: string
  assigned_to: string | null
}

export interface TaskResponse {
  id: string
  content: string
  status: string
  assigned_to: Assigned | null
  is_me: boolean
  project_id: string
  updated_at: Date
  created_at: Date
}

export interface Tasks {
  todo: TaskResponse[]
  in_progress: TaskResponse[]
  in_review: TaskResponse[]
  done: TaskResponse[]
}

export interface FriendResponse {
  id: string
  name: string
  nickname: string
  icon: string
  isMe: boolean
}

export interface FriendRequest {
  receiver_email: string
}

export interface NotificationResponse {
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

export interface NotificationRequest {
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