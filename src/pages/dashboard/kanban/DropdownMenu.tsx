import { taskStore } from "@/stores/taskStore"
import {
  ArrowRightOutlined,
  ArrowsAltOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons"

interface DropdownMenuProps {
  id: string
}

function DropdownMenu({ id }: DropdownMenuProps) {
  const { deleteTask } = taskStore()

  return (
    <>
      <ul className="py-2">
        <li
          onClick={() => deleteTask(id)}
          className="px-4 py-2 text-tasksync-danger hover:bg-red-100 dark:hover:bg-red-300/20 cursor-pointer"
        >
          <DeleteOutlined className="mr-2" />
          Delete
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
          <UsergroupAddOutlined className="mr-2" />
          Assign to
        </li>
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
