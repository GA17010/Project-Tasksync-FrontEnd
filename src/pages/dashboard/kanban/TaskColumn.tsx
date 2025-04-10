import { useCustomizerStore } from "@/stores/useCustomerStore"
import { Task } from "@/types"
import { useDroppable } from "@dnd-kit/core"
import * as React from "react"
import TaskCard from "./TaskCard"
interface TaskColumnProps {
  id: string
  title: string
  tasks: Task[]
}

export default function TaskColumn({ id, title, tasks }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id })

  const colorConfig = {
    todo: "border-green-700 bg-green-200",
    inProgress: "border-yellow-700 bg-yellow-200",
    inReview: "border-purple-700 bg-purple-200",
    done: "border-blue-700 bg-blue-200",
  }
  const bgColorConfig = {
    todo: " bg-green-600",
    inProgress: "bg-yellow-600",
    inReview: "border-purple-700 bg-purple-600",
    done: "bg-blue-600",
  }

  const descriptionConfig = {
    todo: "This task hasn't been started",
    inProgress: "This task is in progress",
    inReview: "This task is in review",
    done: "This task is done",
  }

  const { focusInput, inputActive, inputVisible, columnIndicatorVisible } =
    useCustomizerStore()

  const handleAddTask = () => {
    if (!inputVisible) {
      inputActive(id)
      focusInput()
    }
  }

  const columnIndicatorRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    if (columnIndicatorVisible === id && columnIndicatorRef.current) {
      columnIndicatorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [columnIndicatorVisible, id])

  return (
    <>
      <div
        className="mr-2 w-full sm:w-96 h-full flex flex-col rounded-md transition-all duration-75 border border-gray-300 bg-gray-100"
        ref={setNodeRef}
      >
        {/* Title and Description */}
        <div className="px-4 py-2 items-center gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`h-4 w-4 border-2 rounded-full ${
                colorConfig[id as keyof typeof colorConfig]
              }`}
            ></span>
            <h2 className="font-semibold text-lg">{title}</h2>
            <span className="py-0.5 px-1 rounded-md text-xs text-gray-600 bg-gray-200 ">
              {tasks.length}
            </span>
          </div>
          <span className="text-xs text-gray-700">
            {descriptionConfig[id as keyof typeof descriptionConfig]}
          </span>
        </div>

        <div className="flex-1 py-1 px-2 min-h-[180px] overflow-y-auto">
          {/* Task list */}
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}

          {/* Column Indicator */}
          <div
            className={`flex $ ${
              columnIndicatorVisible === id ? "block" : "hidden"
            }`}
          >
            <span
              ref={columnIndicatorRef}
              className={`h-2 w-full rounded-md ${
                bgColorConfig[id as keyof typeof bgColorConfig]
              }`}
            ></span>
          </div>
        </div>

        {/* Add task button */}
        <div className="flex">
          <button
            className="px-4 py-2 w-full text-left text-sm font-semibold cursor-pointer text-gray-600 hover:bg-gray-200"
            onClick={handleAddTask}
          >
            + Add Task
          </button>
        </div>
      </div>
    </>
  )
}
