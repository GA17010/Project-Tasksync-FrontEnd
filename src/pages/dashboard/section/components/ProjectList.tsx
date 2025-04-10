import { useNavigate } from "react-router"
import { Project } from "@/types"
import { ProjectOutlined } from "@ant-design/icons"

interface ProjectListProps {
  projects: Project[]
}

function ProjetList({ projects }: ProjectListProps) {
  const navigate = useNavigate()
  return (
    <>
      {projects.map((proj) => (
        <div
          key={proj.id}
          className="p-4 cursor-pointer border-b border-b-gray-300 last:border-none hover:bg-gray-100 text-gray-900"
          onClick={() => navigate(`/dashboard/projects/${proj.id}`)}
        >
          <div className="flex items-center gap-2">
            <ProjectOutlined />
            <span>@{proj.belong}'s</span>
            <span className="mx-2">{proj.title}</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-400">{proj.description}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProjetList
