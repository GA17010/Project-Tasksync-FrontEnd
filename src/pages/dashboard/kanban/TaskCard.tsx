import Dropdown from "@/components/Dropdown"
import DropdownMenu from "@/pages/dashboard/kanban/components/DropdownMenu"
import { useDropdownStore } from "@/stores/dropdownStore"
import { useUIStore } from "@/stores/uiStore"
import { TaskResponse } from "@/types"
import { RightCircleTwoTone } from "@ant-design/icons"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface TaskCardProps {
  task: TaskResponse
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
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 100ms ease",
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : "auto",
  }

  const { activeDropdownId } = useDropdownStore()

  const { userAvatarSmall } = useUIStore()

  const avatarUrl =
    task.assigned_to?.icon && userAvatarSmall[task.assigned_to.icon]
      ? userAvatarSmall[task.assigned_to.icon]
      : userAvatarSmall["avatar-00"]

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`p-3 relative text-sm rounded-xl bg-white dark:bg-gray-950 shadow-[0_0_0_calc(1px_/_1)_rgba(63,63,68,0.05),0_1px_calc(3px_/_1)_0_rgba(34,33,81,0.15)] hover:shadow-[0_0_1px_2px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-200 ease-in-out cursor-grab ${
        activeDropdownId === task.id ? "z-20" : "z-0"
      }`}
    >
      <div className="flex justify-between relative items-center gap-2 mb-2">
        <div className="flex gap-2">
          <RightCircleTwoTone />
          <span className="text-xs text-gray-500 dark:text-gray-400 break-words">
            Project name #1
          </span>
        </div>

        {/* More actions */}
        <Dropdown
          id={task.id}
          classNameButton="text-lg hover:bg-gray-300 dark:hover:bg-gray-900"
          classNameMenu="top-0 right-0"
        >
          {/* Container Dropdown */}
          <DropdownMenu task={task} />
        </Dropdown>
      </div>

      <div className="font-medium break-words">{task.content}</div>

      {/* Assign to */}
      {task.assigned_to ? (
        <div className="pt-2 flex items-center gap-2">
          <img
            src={avatarUrl}
            className="w-9 h-9 border border-gray-300 dark:border-gray-500 rounded-full object-cover"
            alt="Friend photo"
            width={36}
            height={36}
          />
          <span>
            {task.assigned_to.name} {task.is_me && "(Me)"}
          </span>
        </div>
      ) : (
        <span className="text-gray-500 dark:text-gray-400 break-words">
          Not assigned
        </span>
      )}
    </div>
  )
}

export default TaskCard
