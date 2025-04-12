import { ProjectOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router"
import ProjectFilter from "./components/ProjectFilter"
import ProjectList from "./components/ProjectList"

function SectionProjets() {
  const navigate = useNavigate()

  const projects = [
    {
      id: "1",
      title: "Proyecto A",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      belong: "Nickname 1",
    },
    {
      id: "2",
      title: "Proyecto B",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      belong: "Nickname 1",
    },
    {
      id: "3",
      title: "Proyecto C",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      belong: "Nickname 1",
    },
    {
      id: "4",
      title: "Proyecto D",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      belong: "Nickname 1",
    },
  ]
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
            onClick={() => navigate("/dashboard/projects/create")}
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="mt-2 w-full flex flex-col rounded-2xl border border-gray-300 dark:border-gray-500">
        <div className="px-4 h-14 flex items-center rounded-t-2xl border-b border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-tasksync-dark ">
          <ProjectOutlined />
          <span className="mx-2">Projects</span>
          <span>{projects.length}</span>
        </div>

        {/* Project List */}
        <div>
          {projects.map((proj) => (
            <ProjectList key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </>
  )
}

export default SectionProjets
