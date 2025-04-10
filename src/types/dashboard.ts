export interface Project {
  id: string
  title: string
  description: string
  belong: string
}

export interface Task {
  id: string
  content: string
  status: string
}

export interface Tasks {
  todo: Task[]
  inProgress: Task[]
  inReview: Task[]
  done: Task[]
}
