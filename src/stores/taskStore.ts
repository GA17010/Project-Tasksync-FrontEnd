import { Task, Tasks } from "@/types"
import { create } from "zustand"
import { useCustomizerStore } from "./useCustomerStore"

interface TaskStoreState {
  // Input_task_dropdown: boolean
  tasks: Tasks
  setTasks: (tasks: Tasks) => void
  fetchTasks: () => void
  addTask: (task: Task) => void
  deleteTask: (tasksId: string) => void
}

export const taskStore = create<TaskStoreState>((set) => ({
  // Input_task_dropdown: false,
  // SET_INPUT_TASK_DROPDOWN: () =>
  //   set((state) => {
  //     return {
  //       Input_task_dropdown: !state.Input_task_dropdown,
  //     }
  //   }),
  tasks: {
    todo: [],
    inProgress: [],
    inReview: [],
    done: [],
  },
  setTasks(tasks) {
    set({ tasks })
  },
  fetchTasks: () => {
    const tasks1: Task[] = [
      { id: "1", content: "Diseñar landing page", status: "todo" },
      { id: "2", content: "Configurar base de datos", status: "todo" },
      { id: "3", content: "Crear modelo de tareas", status: "inProgress" },
      { id: "4", content: "Login y registro", status: "done" },
      { id: "5", content: "Register Page", status: "inReview" },
    ]
    set({ tasks: transformToKanban(tasks1) })
  },
  addTask: (task: Task) => {
    set((state) => {
      const newTasks = { ...state.tasks }
      if (task.status === "todo") {
        newTasks.todo.push(task)
      } else if (task.status === "inProgress") {
        newTasks.inProgress.push(task)
      } else if (task.status === "inReview") {
        newTasks.inReview.push(task)
      } else if (task.status === "done") {
        newTasks.done.push(task)
      }

      return { tasks: newTasks }
    })
    useCustomizerStore.getState().resetColumnIndicatorVisible()
  },
  deleteTask: (taskId: string) => {
    set((state) => {
      const newTasks = { ...state.tasks }
      Object.keys(newTasks).forEach((key) => {
        newTasks[key as keyof Tasks] = newTasks[key as keyof Tasks].filter(
          (tasks) => tasks.id !== taskId
        )
      })

      return { tasks: newTasks }
    })
  },
}))

const transformToKanban = (tasks: Task[]) => {
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
