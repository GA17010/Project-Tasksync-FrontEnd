import { TaskRequest, TaskResponse } from "@/types"
import apiService from "@/utils/services/apiServices"

const taskService = {
  createTasks: async (
    task: TaskRequest,
    project_id: string
  ): Promise<TaskResponse> => {
    const response = await apiService.post<TaskResponse>(
      `/api/projects/${project_id}/tasks`,
      task
    )
    return response
  },

  fetchTasks: async (project_id: string): Promise<TaskResponse[]> => {
    const response = await apiService.get<TaskResponse[]>(
      `/api/projects/${project_id}/tasks`
    )
    return response
  },

  updateTask: async (
    project_id: string,
    task_id: string,
    user_id_to_assign?: string,
    status?: string
  ): Promise<TaskResponse> => {
    const response = await apiService.put<TaskResponse>(
      `/api/projects/${project_id}/tasks/${task_id}`,
      {
        assigned_to: user_id_to_assign,
        status: status,
      }
    )
    return response
  },

  deleteTask: async (project_id: string, task_id: string): Promise<void> => {
    await apiService.delete(`/api/projects/${project_id}/tasks/${task_id}`)
  },
}

export default taskService
