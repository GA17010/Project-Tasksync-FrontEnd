import { ProjectRequest, ProjectResponse } from "@/types"
import { create } from "@/utils/locales/zustand"
import projectService from "@/utils/services/projectService"
import toast from "react-hot-toast"

interface ProjectStoreState {
  ListProject: ProjectResponse[] | null
  showProjectFormModal: boolean
  projectError: string | null
  typeModal: string | null
  project: ProjectRequest | null
  projectId: string | null

  closeProjectFormModal: () => void
  setShowCreateProject: () => void
  setShowUpdateProject: (project: ProjectRequest, projectId: string) => void
  createProject: (project: ProjectRequest) => Promise<boolean>
  fetchProject: () => Promise<boolean>
  updateProject: (
    project: ProjectRequest,
    projectId: string
  ) => Promise<boolean>
  deleteProject: (ProjectId: string) => Promise<void>
  sharedProject: (projectId: string, friendId: string) => Promise<boolean>
}

export const useProjectStore = create<ProjectStoreState>()((set) => ({
  ListProject: null,
  showProjectFormModal: false,
  projectError: null,
  createProjSuccess: null,
  typeModal: null,
  project: null,
  projectId: null,

  closeProjectFormModal() {
    set({ showProjectFormModal: false })
  },

  setShowCreateProject() {
    set({
      typeModal: "Create",
      project: null,
      projectId: null,
      projectError: "",
    })
    set((state) => ({ showProjectFormModal: !state.showProjectFormModal }))
  },

  setShowUpdateProject(project: ProjectRequest, projectId: string) {
    set({
      typeModal: "Update",
      projectId: projectId,
      project: project,
      projectError: "",
    })
    set((state) => ({ showProjectFormModal: !state.showProjectFormModal }))
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
        projectError: "",
      })

      toast.success("Project successfully created")
      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ projectError: "Connection error" })
      } else if (error instanceof Error) {
        set({ projectError: "An error occurred while creating the project." })
      } else {
        set({ projectError: "An unknown error occurred." })
      }
      toast.error("An error occurred while creating the project.")
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
        set({ projectError: "Error in obtaining projects, please try again." })
      } else {
        set({ projectError: "An unknown error occurred." })
      }
      return false
    }
  },

  updateProject: async (project: ProjectRequest, projectId: string) => {
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
        projectError: "",
      })

      set({ project: null, projectId: null })
      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ projectError: "Connection error" })
      } else if (error instanceof Error) {
        set({ projectError: "Project update failed, please try again." })
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
        projectError: "",
      })
      toast.success("Project successfully deleted")
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ projectError: "Connection error" })
      } else if (error instanceof Error) {
        set({
          projectError:
            error.message || "Error deleting project, please try again.",
        })
      } else {
        set({ projectError: "An unknown error occurred." })
      }
      set({ showProjectFormModal: false })

      toast.error("Error deleting project, please try again.")
    }
  },

  sharedProject: async (projectId: string, userId: string) => {
    try {
      await projectService.sharedProject(projectId, userId)

      set({
        projectError: "",
      })

      set({ project: null, projectId: null })
      return true
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        set({ projectError: "Connection error" })
      } else if (error instanceof Error) {
        set({ projectError: "Error sharing project, please try again." })
      } else {
        set({ projectError: "An unknown error occurred." })
      }
      return false
    }
  },
}))
