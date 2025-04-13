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

  const {
    focusInput,
    inputActive,
    inputVisible,
    columnIndicatorVisible,
    statusTask,
  } = useCustomizerStore()

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
        inline: "center",
      })
    }
  }, [columnIndicatorVisible, id])

  return (
    <>
      <div className="max-h-2/3 sm:max-h-full w-full sm:w-96 flex-shrink-0">
        <div
          className={`w-full sm:w-96 h-full flex flex-col rounded-2xl border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-gray-900 transition-all duration-200 ease-in-out ${
            columnIndicatorVisible && statusTask === id
              ? "ring-2 ring-blue-500 ring-opacity-50 rounded-2xl"
              : ""
          }`}
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
              <span className="py-0.5 px-1 rounded-lg text-xs text-gray-600 dark:text-gray-800 bg-gray-300 dark:bg-gray-500 ">
                {tasks.length}
              </span>
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-400">
              {descriptionConfig[id as keyof typeof descriptionConfig]}
            </span>
          </div>

          <div className="flex-1 py-1 px-2 min-h-[180px] overflow-y-auto">
            
            {/* Task list */}
            <div
              ref={setNodeRef}
              className="flex flex-1 min-h-full flex-col gap-2.5"
            >
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}

              {/* Column Indicator */}
              <div
                className={`mb-24 flex transition-all duration-200 ease-linear $ ${
                  columnIndicatorVisible === id ? "scale-100" : "scale-0"
                }`}
              >
                <span
                  ref={columnIndicatorRef}
                  className={`h-2 w-full rounded-full ${
                    bgColorConfig[id as keyof typeof bgColorConfig]
                  }`}
                ></span>
              </div>
            </div>
          </div>

          {/* Add task button */}
          <div className="flex">
            <button
              className="px-4 py-2 w-full text-left text-sm font-semibold cursor-pointer rounded-b-2xl text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600/20"
              onClick={handleAddTask}
            >
              + Add Task
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
