import IconMove from "@/assets/svg/move-horizontal.svg"
import { taskStore } from "@/stores/taskStore"
import {
  ArrowRightOutlined,
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
      <div className="absolute top-0 right-0 mt-8 w-48 bg-white shadow-[0px_0px_5px_1px_rgba(0,0,0,0.15)] rounded-lg">
        <ul className="py-2">
          <li
            onClick={() => deleteTask(id)}
            className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
          >
            <DeleteOutlined className="mr-2" />
            Delete
          </li>
          <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
            <UsergroupAddOutlined className="mr-2" />
            Assign to
          </li>
          <li className="px-4 py-2 flex justify-between hover:bg-gray-200 cursor-pointer">
            <div className="flex items-center">
              <img
                src={IconMove}
                alt="Move Icon"
                className="mr-2"
                width={15}
                height={15}
              />
              <span>Move to</span>
            </div>
            <ArrowRightOutlined className="w-3" />
          </li>
        </ul>
      </div>
    </>
  )
}

export default DropdownMenu
