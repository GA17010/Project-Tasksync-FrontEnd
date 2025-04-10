import { EllipsisOutlined, RightCircleTwoTone } from "@ant-design/icons"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
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

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="mb-2 p-3 text-sm rounded bg-white shadow-sm cursor-grab"
    >
      <div className="flex relative items-center gap-2 mb-2">
        <RightCircleTwoTone />

        <span className=" text-xs text-gray-500 break-words">
          Project name #1
        </span>

        {/* More actions */}
        <button className="absolute right-0 px-2.5 rounded-md text-lg cursor-pointer bg-gray-100 hover:bg-gray-300">
          <EllipsisOutlined />
        </button>

        {/* Dropdown menu */}
        <DropdownMenu id={task.id}/>
      </div>

      <div className="text-gray-800 font-medium break-words">
        {task.content}
      </div>
    </div>
  )
}

export default TaskCard
