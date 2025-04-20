import AssignToModal from "@/components/AssignToModal"
import { useFriendStore } from "@/stores/friendStore"
import { useProjectStore } from "@/stores/projectStore"
import { FriendResponse } from "@/types"
import { ProjectOutlined } from "@ant-design/icons"
import React from "react"
import ProjectFormModal from "./components/ProjectFormModal"
import ProjectFilter from "./ProjectFilter"
import ProjectList from "./ProjectList"

function SectionProjets() {
  const { ListProject, fetchProject, setShowCreateProject, sharedProject } =
    useProjectStore()
  const { projectId, handleAssign } = useFriendStore()

  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setIsLoading(true)
    fetchProject().finally(() => {
      setIsLoading(false)
    })
  }, [fetchProject])

  const handleAssignClic = (friend: FriendResponse) => {
    // Notify user
    if (!projectId) return

    sharedProject(projectId, friend.id)

    handleAssign()
  }

  const ProjectListSkeleton = () => (
    <div role="status" className="p-4">
      <div className="animate-pulse flex flex-col gap-3">
        <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
      </div>
    </div>
  )

  const EmptyProjectList = () => (
    <div
      className="p-4 cursor-pointer hover:bg-gray-100 dark:bg-gray-900/90 dark:hover:bg-gray-800/70 rounded-b-2xl"
      onClick={setShowCreateProject}
    >
      <div className="h-36 flex flex-col items-center justify-center gap-2">
        <ProjectOutlined />
        <span>There are no projects created</span>
      </div>
    </div>
  )

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
            className="px-4 py-2 text-sm bg-tasksync-primary text-white rounded-full hover:scale-105 cursor-pointer transition"
            onClick={setShowCreateProject}
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="mt-2 mb-16 w-full flex flex-col rounded-2xl border border-gray-300 dark:border-gray-500">
        <div className="px-4 h-14 flex items-center rounded-t-2xl border-b border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-tasksync-dark ">
          <ProjectOutlined />
          <span className="mx-2">Projects</span>
          {ListProject && <span>{ListProject.length}</span>}
        </div>

        {/* Project List */}
        {isLoading ? (
          <ProjectListSkeleton />
        ) : ListProject?.length ? (
          <div>
            {ListProject.map((proj) => (
              <ProjectList key={proj.id} project={proj} />
            ))}
          </div>
        ) : (
          <EmptyProjectList />
        )}

        {/* Modal-Form to create project */}
        <ProjectFormModal />

        {/* Modal-Assign to user */}
        <AssignToModal onClick={handleAssignClic} />
      </div>
    </>
  )
}

export default SectionProjets
