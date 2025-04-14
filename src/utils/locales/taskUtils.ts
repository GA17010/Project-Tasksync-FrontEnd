import { Task, Tasks } from "@/types"

export const transformToKanban = (tasks: Task[]): Tasks => {
  const todo: Task[] = []
  const inProgress: Task[] = []
  const inReview: Task[] = []
  const done: Task[] = []

  tasks.forEach((task) => {
    if (task.status === "todo") {
      todo.push(task)
    } else if (task.status === "inProgress") {
      inProgress.push(task)
    } else if (task.status === "inReview") {
      inReview.push(task)
    } else if (task.status === "done") {
      done.push(task)
    }
  })

  return {
    todo,
    inProgress,
    inReview,
    done,
  }
}
