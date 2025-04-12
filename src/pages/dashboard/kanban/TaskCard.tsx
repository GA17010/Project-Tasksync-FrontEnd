import { useDropdownStore } from "@/stores/dropdownStore"
import { RightCircleTwoTone } from "@ant-design/icons"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Dropdown from "./Dropdown"
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

  const { activeDropdownId } = useDropdownStore()

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`mb-2 p-3 text-sm rounded-xl bg-white dark:bg-gray-950 shadow-sm cursor-grab transform transition-transform duration-200 hover:scale-[1.02] relative  ${
        activeDropdownId === task.id ? "z-20" : "z-0"
      }`}
    >
      <div className="flex relative items-center gap-2 mb-2">
        <RightCircleTwoTone />

        <span className=" text-xs text-gray-500 dark:text-gray-400 break-words">
          Project name #1
        </span>

        {/* More actions */}
        <Dropdown id={task.id}>
          {/* Container Dropdown */}
          <DropdownMenu id={task.id} />
        </Dropdown>
      </div>

      <div className="font-medium break-words">{task.content}</div>
    </div>
  )
}

export default TaskCard
