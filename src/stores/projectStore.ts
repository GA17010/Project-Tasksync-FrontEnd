import { ProjectRequest, ProjectResponse } from "@/types"
import projectService from "@/utils/services/projectService"
import { create } from "zustand"

interface ProjectStoreState {
  ListProject: ProjectResponse[] | null
  showCreateProject: boolean
  projectError: string | null
  createProjSuccess: string | null

  setShowCreateProject: () => void
  createProject: (project: ProjectRequest) => Promise<boolean>
  fetchProject: () => Promise<boolean>
  updateProject: (
    projectId: string,
    project: ProjectRequest
  ) => Promise<boolean>
  deleteProject: (ProjectId: string) => void
}

export const useProjectStore = create<ProjectStoreState>((set) => ({
  ListProject: null,
  showCreateProject: false,
  projectError: null,
  createProjSuccess: null,

  setShowCreateProject() {
    set((state) => ({ showCreateProject: !state.showCreateProject }))
  },
  createProject: async (project: ProjectRequest) => {
    try {
      const response = await projectService.createProject(project)

      set((state) => {
        const newListProject = state.ListProject
          ? [...state.ListProject, response]
          : [response]
        return { ListProject: newListProject }
      })

      set({
        createProjSuccess: "Project successfully created",
        projectError: "",
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ projectError: "Connection error" })
      } else if (error instanceof Error) {
        set({ projectError: error.message || "Register failed" })
      } else {
        set({ projectError: "An unknown error occurred." })
      }
      return false
    }
  },
  fetchProject: async () => {
    try {
      const response = await projectService.fetchProjects()

      set({
        ListProject: response,
      })
      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ projectError: "Connection error" })
      } else if (error instanceof Error) {
        set({ projectError: error.message || "Error in obtaining projects" })
      } else {
        set({ projectError: "An unknown error occurred." })
      }
      return false
    }
  },
  updateProject: async (projectId: string, project: ProjectRequest) => {
    try {
      const response = await projectService.updateProject(projectId, project)

      set((state) => {
        const newListProject = state.ListProject
          ? state.ListProject.map((project) =>
              project.id === projectId ? response : project
            )
          : [response]

        return { ListProject: newListProject }
      })

      set({
        createProjSuccess: "Project successfully updated",
        projectError: "",
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ projectError: "Connection error" })
      } else if (error instanceof Error) {
        set({ projectError: error.message || "Project update  failed" })
      } else {
        set({ projectError: "An unknown error occurred." })
      }
      return false
    }
  },
  deleteProject: async (projectId: string) => {
    try {
      await projectService.deleteProject(projectId)

      set((state) => {
        const newListProject = state.ListProject
          ? state.ListProject.filter(
              (ListProject) => ListProject.id !== projectId
            )
          : null

        return { ListProject: newListProject }
      })

      set({
        createProjSuccess: "Project successfully deleted",
        projectError: "",
      })

      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ projectError: "Connection error" })
      } else if (error instanceof Error) {
        set({ projectError: error.message || "Error deleting project" })
      } else {
        set({ projectError: "An unknown error occurred." })
      }
      return false
    }
  },
}))
