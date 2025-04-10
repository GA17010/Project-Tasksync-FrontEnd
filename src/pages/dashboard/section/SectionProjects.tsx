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
        <h2 className="text-xl font-bold text-gray-800">Projects</h2>
        <p className="text-gray-500">Here are your projects</p>

        <div className="py-2 w-full flex items-center gap-4">
          <ProjectFilter />

          <button
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded  cursor-pointer"
            onClick={() => navigate("/dashboard/projects/create")}
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="mt-2 w-full flex flex-col rounded-md border border-gray-300">
        <div className="px-4 h-14 flex items-center border-b border-gray-300 text-gray-900 bg-gray-200 ">
          <ProjectOutlined />
          <span className="mx-2">Projects</span>
          <span>{projects.length}</span>
        </div>

        <ProjectList projects={projects} />
      </div>
    </>
  )
}

export default SectionProjets
