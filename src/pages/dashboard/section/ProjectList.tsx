import Dropdown from "@/components/Dropdown"
import { useAuthStore } from "@/stores/authStore"
import { ProjectResponse } from "@/types"
import { ProjectOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router"
import DropdownProjectMenu from "./components/ProjectDropdownMenu"

interface ProjectListProps {
  project: ProjectResponse
}

function ProjetList({ project }: ProjectListProps) {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  return (
    <div
      key={project.id}
      className="gap-2 flex items-center border-b border-x border-gray-300 dark:border-gray-500 last:rounded-b-2xl hover:bg-gray-100 dark:bg-gray-900/90 dark:hover:bg-gray-800/70"
    >
      <div
        className="p-4 flex-1 cursor-pointer"
        onClick={() => void navigate(`/kanban/project/${project.id}`)}
      >
        <div className="flex flex-wrap items-center gap-2">
          <ProjectOutlined />
          <span>@{project.owner.name}'s</span>
          <span className="mx-2">{project.name}</span>
        </div>
        <div className="mt-2">
          <span className="text-sm text-gray-400">{project.description}</span>
        </div>
      </div>

      {/* More actions */}
      {project.owner.id === user?.id && (
        <>
          <div className="relative">
            <Dropdown
              id={project.id}
              classNameButton={
                "h-8 text-lg md:text-xl lg:text-2xl mr-1 sm:mr-2 lg:mr-8 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-800"
              }
              classNameMenu={"top-1 right-0 sm:mr-2 lg:mr-8"}
            >
              <DropdownProjectMenu project={project} />
            </Dropdown>
          </div>
        </>
      )}
    </div>
  )
}

export default ProjetList
