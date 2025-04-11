import { EllipsisOutlined, RightCircleTwoTone } from "@ant-design/icons"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import * as React from "react"
import DropdownMenu from "./DropdownMenu"

interface TaskCardProps {
  task: { id: string; content: string }
}

function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  const [activeDropdownMenu, setActiveDropdownMenu] =
    React.useState<boolean>(false)

  const handleActions = () => setActiveDropdownMenu(!activeDropdownMenu)

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`mb-2 p-3 text-sm rounded-xl bg-white dark:bg-gray-950 shadow-sm cursor-grab transform transition-transform duration-200 hover:scale-[1.02] relative ${
        activeDropdownMenu ? "z-20" : "z-0"
      }`}
    >
      <div className="flex relative items-center gap-2 mb-2">
        <RightCircleTwoTone />

        <span className=" text-xs text-gray-500 dark:text-gray-100 break-words">
          Project name #1
        </span>

        {/* More actions */}
        <button
          className="absolute right-0 px-2.5 rounded-xl text-lg cursor-pointer  hover:bg-gray-300 dark:hover:bg-gray-900"
          onClick={handleActions}
        >
          <EllipsisOutlined />
        </button>

        {/* Dropdown menu */}
        <DropdownMenu active={activeDropdownMenu} id={task.id} />
      </div>

      <div className="text-gray-800 dark:text-gray-500 font-medium break-words">
        {task.content}
      </div>
    </div>
  )
}

export default TaskCard
