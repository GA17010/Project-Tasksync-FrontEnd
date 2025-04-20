import { TaskResponse, Tasks } from "@/types"

export const transformToKanban = (tasks: TaskResponse[]): Tasks => {
  const todo: TaskResponse[] = []
  const in_progress: TaskResponse[] = []
  const in_review: TaskResponse[] = []
  const done: TaskResponse[] = []

  tasks.forEach((task) => {
    if (task.status === "todo") {
      todo.push(task)
    } else if (task.status === "in_progress") {
      in_progress.push(task)
    } else if (task.status === "in_review") {
      in_review.push(task)
    } else if (task.status === "done") {
      done.push(task)
    }
  })

  return {
    todo,
    in_progress,
    in_review,
    done,
  }
}
