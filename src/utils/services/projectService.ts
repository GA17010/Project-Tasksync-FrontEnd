import { ProjectRequest } from "@/types"
import apiService from "@/utils/services/apiServices"
import { ProjectResponse} from "@/types"

const projectService = {
  fetchProjects: async (): Promise<ProjectResponse[]> => {
    const response = await apiService.get<ProjectResponse[]>("/api/projects")
    return response
  },

  createProject: async (project: ProjectRequest): Promise<ProjectResponse> => {
    const response = await apiService.post<ProjectResponse>(
      "/api/projects",
      project
    )
    return response
  },

  updateProject: async (
    projectId: string,
    project: ProjectRequest
  ): Promise<ProjectResponse> => {
    const response = await apiService.put<ProjectResponse>(
      `/api/projects/${projectId}`,
      project
    )
    return response
  },

  deleteProject: async (projectId: string): Promise<void> => {
    await apiService.delete(`/api/projects/${projectId}`)
  },
}

export default projectService
