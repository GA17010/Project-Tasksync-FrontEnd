import { useFriendStore } from "@/stores/friendStore"
import { taskStore } from "@/stores/taskStore"
import { Task } from "@/types"
import {
  ArrowRightOutlined,
  ArrowsAltOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons"

interface DropdownMenuProps {
  task: Task
}

function DropdownMenu({ task }: DropdownMenuProps) {
  const { deleteTask } = taskStore()

  const { setTaskAndToggleMenu } = useFriendStore()

  return (
    <>
      <ul className="py-2">
        {/* Option - Delete Task */}
        <li
          onClick={() => deleteTask(task.id)}
          className="px-4 py-2 text-tasksync-danger hover:bg-red-100 dark:hover:bg-red-300/20 cursor-pointer"
        >
          <DeleteOutlined className="mr-2" />
          Delete
        </li>

        {/* Option - Assign task to */}
        <li
          className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setTaskAndToggleMenu(task)}
        >
          <UsergroupAddOutlined className="mr-2" />
          Assign to
        </li>

        {/* Option - Move task to */}
        <li className="px-4 py-2 flex justify-between hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
          <div className="flex items-center">
            <ArrowsAltOutlined className="mr-2" />
            <span>Move to</span>
          </div>
          <ArrowRightOutlined className="w-3" />
        </li>
      </ul>
    </>
  )
}

export default DropdownMenu
