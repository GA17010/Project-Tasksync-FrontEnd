export interface Project {
  id: string
  title: string
  description: string
  belong: string
}

interface Assigned {
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

export interface Friend {
  id: string
  name: string
  nick_name: string
  icon: string
  isMe: boolean
}
