import { TaskRequest, Tasks } from "@/types"
import { transformToKanban } from "@/utils/locales/taskUtils"
import taskService from "@/utils/services/taskServices"
import { create } from "zustand"
import { useCustomizerStore } from "./useCustomerStore"

interface TaskStoreState {
  tasks: Tasks
  taskError: string | null
  createTaskSuccess: string | null
  project_id: string | null

  setProject_id: (id: string) => void
  setTasks: (tasks: Tasks) => void
  createTask: (task: TaskRequest, project_id: string) => Promise<boolean>
  fetchTasks: (project_id: string) => Promise<boolean>
  updateTask: (
    project_id: string,
    task_id: string,
    user_id_to_assign?: string,
    status?: string
  ) => Promise<boolean>
  deleteTask: (task_id: string) => Promise<boolean>
}

export const taskStore = create<TaskStoreState>((set, get) => ({
  tasks: {
    todo: [],
    in_progress: [],
    in_review: [],
    done: [],
  },
  taskError: null,
  createTaskSuccess: null,
  project_id: null,

  setProject_id: (id: string) => {
    set({ project_id: id })
  },
  setTasks(tasks) {
    set({ tasks })
  },
  fetchTasks: async (project_id) => {
    try {
      const response = await taskService.fetchTasks(project_id)

      set({ tasks: transformToKanban(response) })
      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ taskError: "Connection error" })
      } else if (error instanceof Error) {
        set({ taskError: "Error in obtaining tasks, please try again." })
      } else {
        set({ taskError: "An unknown error occurred." })
      }
      return false
    }
  },
  createTask: async (task: TaskRequest, project_id: string) => {
    try {
      const response = await taskService.createTasks(task, project_id)

      set((state) => {
        const newTasks = { ...state.tasks }
        if (task.status === "todo") {
          newTasks.todo.push(response)
        } else if (task.status === "in_progress") {
          newTasks.in_progress.push(response)
        } else if (task.status === "in_review") {
          newTasks.in_review.push(response)
        } else if (task.status === "done") {
          newTasks.done.push(response)
        }

        return { tasks: newTasks }
      })

      useCustomizerStore.getState().resetColumnIndicatorVisible()

      set({
        createTaskSuccess: "Task successfully created",
        taskError: "",
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ taskError: "Connection error" })
      } else if (error instanceof Error) {
        set({ taskError: "An error occurred while creating the task." })
      } else {
        set({ taskError: "An unknown error occurred." })
      }
      useCustomizerStore.getState().resetColumnIndicatorVisible()
      return false
    }
  },
  updateTask: async (project_id, task_id, user_id_to_assign, status) => {
    try {
      console.log(user_id_to_assign)

      const response = await taskService.updateTask(
        project_id,
        task_id,
        user_id_to_assign,
        status
      )
      console.log(response)

      set((state) => {
        const newTasks = { ...state.tasks }
        newTasks[response.status as keyof Tasks].forEach((task) => {
          if (task.id === response.id) {
            console.log(task, response)
            task.assigned_to = response.assigned_to
            task.status = response.status
          }
        })
        console.log(newTasks)
        return { tasks: newTasks }
      })

      set({
        createTaskSuccess: "Task successfully updated",
        taskError: "",
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ taskError: "Connection error" })
      } else if (error instanceof Error) {
        set({ taskError: "Task update failed, please try again." })
      } else {
        set({ taskError: "An unknown error occurred." })
      }
      return false
    }
  },
  deleteTask: async (task_id: string) => {
    try {
      const project_id = get().project_id
      if (!project_id) return false

      await taskService.deleteTask(project_id, task_id)

      set((state) => {
        const newTasks = { ...state.tasks }
        Object.keys(newTasks).forEach((key) => {
          newTasks[key as keyof Tasks] = newTasks[key as keyof Tasks].filter(
            (tasks) => tasks.id !== task_id
          )
        })

        return { tasks: newTasks }
      })

      set({
        createTaskSuccess: "Task successfully deleted",
        taskError: "",
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ taskError: "Connection error" })
      } else if (error instanceof Error) {
        set({
          taskError: error.message || "Error deleting task, please try again.",
        })
      } else {
        set({ taskError: "An unknown error occurred." })
      }
      return false
    }
  },
}))
