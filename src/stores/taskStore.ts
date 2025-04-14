import { Task, Tasks } from "@/types"
import { transformToKanban } from "@/utils/locales/taskUtils"
import { create } from "zustand"
import { useCustomizerStore } from "./useCustomerStore"

interface TaskStoreState {
  tasks: Tasks

  setTasks: (tasks: Tasks) => void
  fetchTasks: (idProject: string) => void
  addTask: (task: Task) => void
  deleteTask: (tasksId: string) => void
}

export const taskStore = create<TaskStoreState>((set) => ({
  tasks: {
    todo: [],
    inProgress: [],
    inReview: [],
    done: [],
  },

  setTasks(tasks) {
    set({ tasks })
  },
  fetchTasks: (idProject) => {
    console.log(idProject, "idproject")

    //Peticion al backend enviando el idProject (/project/:idProject)

    const tasks1: Task[] = [
      {
        id: "1",
        content: "Crear projecto",
        status: "todo",
        assigned_to: null,
        is_me: false,
        project_id: "1",
      },
      {
        id: "2",
        content: "Configurar base de datos",
        status: "todo",
        assigned_to: null,
        is_me: false,
        project_id: "1",
      },
      {
        id: "3",
        content: "Crear modelo de tareas",
        status: "inProgress",
        assigned_to: {
          id: "1",
          name: "Alice",

          icon: "avatar-2",
        },
        is_me: false,
        project_id: "1",
      },
      {
        id: "4",
        content: "Login y registro",
        status: "done",
        assigned_to: {
          id: "2",
          name: "Bod",

          icon: "avatar-3",
        },
        is_me: false,
        project_id: "1",
      },
      {
        id: "5",
        content: "Register Page",
        status: "inReview",
        assigned_to: {
          id: "3",
          name: "My name",

          icon: "avatar-4",
        },
        is_me: true,
        project_id: "1",
      },
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
