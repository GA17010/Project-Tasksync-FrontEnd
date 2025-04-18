// import { useFriendStore } from "@/stores/friendStore"
import { useFriendStore } from "@/stores/friendStore"
import { useProjectStore } from "@/stores/projectStore"
import { ProjectRequest, ProjectResponse } from "@/types"
import {
  DeleteOutlined,
  EditOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons"

interface DropdownProjectMenuProps {
  project: ProjectResponse
}

function DropdownProjectMenu({ project }: DropdownProjectMenuProps) {
  const { setShowUpdateProject, deleteProject } = useProjectStore()
  const { setProjectAndToggleMenu } = useFriendStore()

  const projectRequest: ProjectRequest = {
    name: project.name,
    description: project.description,
  }

  const projectId: string = project.id

  return (
    <>
      <ul className="py-2">
        {/* Option - Delete project */}
        <li
          onClick={() => deleteProject(project.id)}
          className="px-4 py-2 text-tasksync-danger hover:bg-red-100 dark:hover:bg-red-300/20 cursor-pointer"
        >
          <DeleteOutlined className="mr-2" />
          Delete
        </li>

        {/* Option - Add friend */}
        <li
          className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setProjectAndToggleMenu(projectId)}
        >
          <UsergroupAddOutlined className="mr-2" />
          Add friend
        </li>

        {/* Option - Edit project */}
        <li
          className="px-4 py-2 flex hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setShowUpdateProject(projectRequest, projectId)}
        >
          <div className="flex items-center">
            <EditOutlined className="mr-2" />
            <span>Edit proyect</span>
          </div>
        </li>
      </ul>
    </>
  )
}

export default DropdownProjectMenu
