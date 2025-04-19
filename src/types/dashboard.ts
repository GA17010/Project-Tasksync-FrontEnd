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

export interface Task {
  id: string
  content: string
  status: string
  assigned_to: Assigned | null
  is_me: boolean
  project_id: string
}

export interface Tasks {
  todo: Task[]
  inProgress: Task[]
  inReview: Task[]
  done: Task[]
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
