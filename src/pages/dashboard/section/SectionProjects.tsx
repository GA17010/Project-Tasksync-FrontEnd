import AssignToModal from "@/components/AssignToModal"
import { useFriendStore } from "@/stores/friendStore"
import { useProjectStore } from "@/stores/projectStore"
import { FriendResponse } from "@/types"
import { ProjectOutlined } from "@ant-design/icons"
import React from "react"
import toast from "react-hot-toast"
import ProjectFormModal from "./components/ProjectFormModal"
import ProjectFilter from "./ProjectFilter"
import ProjectList from "./ProjectList"
import ListSkeleton from "@/components/skeletons/ListSkeleton"

function SectionProjects() {
  const { ListProject, fetchProject, setShowCreateProject, sharedProject } =
    useProjectStore()
  const { projectId, handleAssign } = useFriendStore()

  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setIsLoading(true)
    fetchProject()
      .catch(() => {
        toast.error("Error fetching projects")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [fetchProject])

  const handleAssignClick = (friend: FriendResponse) => {
    if (!projectId) return

    sharedProject(projectId, friend.id)
      .then(() => {
        toast.success(`Request sent to ${friend.name}`)
      })
      .catch(() => {
        toast.error("Error sharing project")
      })
      .finally(() => {
        handleAssign()
      })
  }

  return (
    <>
      <div>
        <h2 className="text-xl font-bold">Projects</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Here are your projects
        </p>

        <div className="py-2 w-full flex items-center gap-4">
          <ProjectFilter />

          <button
            type="button"
            className="px-4 py-2 text-sm bg-tasksync-primary text-white rounded-full hover:scale-105 cursor-pointer transition"
            onClick={setShowCreateProject}
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="mt-2 mb-16 w-full flex flex-col">
        <div className="px-4 h-14 flex items-center rounded-t-2xl border border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-tasksync-dark ">
          <ProjectOutlined />
          <span className="mx-2">Projects</span>
          {ListProject && <span>{ListProject.length}</span>}
        </div>

        {/* Project List */}
        {isLoading ? (
          <ListSkeleton />
        ) : ListProject?.length ? (
          <div>
            {ListProject.map((proj) => (
              <ProjectList key={proj.id} project={proj} />
            ))}
          </div>
        ) : (
          <div
            className="p-4 cursor-pointer hover:bg-gray-100 dark:bg-gray-900/90 dark:hover:bg-gray-800/70 rounded-b-2xl border border-gray-300 dark:border-gray-500"
            onClick={setShowCreateProject}
          >
            <div className="h-36 flex flex-col items-center justify-center gap-2">
              <ProjectOutlined />
              <span>There are no projects created</span>
            </div>
          </div>
        )}

        {/* Modal-Form to create project */}
        <ProjectFormModal />

        {/* Modal-Assign to user */}
        <AssignToModal onClick={handleAssignClick} />
      </div>
    </>
  )
}

export default SectionProjects
