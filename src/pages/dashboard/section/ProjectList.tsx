import { Project } from "@/types"
import { ProjectOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router"

interface ProjectListProps {
  project: Project
}

function ProjetList({ project }: ProjectListProps) {
  const navigate = useNavigate()
  return (
    <>
      <div
        key={project.id}
        className="p-4 cursor-pointer border-b border-gray-300 dark:border-gray-500 last:border-none last:rounded-b-2xl hover:bg-gray-100 dark:bg-gray-900/90 dark:hover:bg-gray-800/70 "
        onClick={() => navigate(`/kanban/project/${project.id}`)}
      >
        <div className="flex items-center gap-2">
          <ProjectOutlined />
          <span>@{project.belong}'s</span>
          <span className="mx-2">{project.title}</span>
        </div>
        <div className="mt-2">
          <span className="text-sm text-gray-400">{project.description}</span>
        </div>
      </div>
    </>
  )
}

export default ProjetList
