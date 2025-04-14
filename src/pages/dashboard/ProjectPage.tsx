import { RightCircleTwoTone } from "@ant-design/icons"
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { taskStore } from "@/stores/taskStore"
import { Task, Tasks } from "@/types"
import * as React from "react"
import { useParams } from "react-router"
import AddTaskForm from "./kanban/AddTaskForm"
import AssignToModal from "./kanban/components/AssignToModal"
import TaskColumn from "./kanban/TaskColumn"

export default function ProjectPage() {
  const { id: idProject } = useParams()

  const { tasks, setTasks, fetchTasks } = taskStore()
  const [activeTask, setActiveTask] = React.useState<Task | null>(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  React.useEffect(() => {
    if (!idProject) return
    fetchTasks(idProject)
  }, [fetchTasks, idProject])

  const handleDragStart = (event: { active: { id: UniqueIdentifier } }) => {
    const { active } = event
    const columnId = findColumn(tasks, active.id)
    if (!columnId) return

    const task = tasks[columnId as keyof Tasks].find(
      (task) => task.id === active.id
    )
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: {
    active: { id: UniqueIdentifier }
    over: { id: UniqueIdentifier } | null
  }) => {
    setActiveTask(null)
    if (!event.over) return

    const { active, over } = event

    if (active.id !== over.id) {
      const sourceColumnId = findColumn(tasks, active.id)
      const destinationColumnId = findColumn(tasks, over.id)

      if (!sourceColumnId || !destinationColumnId) return

      if (sourceColumnId === destinationColumnId) {
        const columnTasks = tasks[sourceColumnId as keyof Tasks]
        const oldIndex = columnTasks.findIndex((task) => task.id === active.id)
        const newIndex = columnTasks.findIndex((task) => task.id === over.id)

        const newTasks = {
          ...tasks,
          [sourceColumnId]: arrayMove(columnTasks, oldIndex, newIndex),
        }

        setTasks(newTasks)
      } else {
        const sourceColumnTasks = tasks[sourceColumnId as keyof Tasks]
        const destinationColumnTasks = tasks[destinationColumnId as keyof Tasks]

        const taskToMove = sourceColumnTasks.find(
          (task) => task.id === active.id
        )
        if (!taskToMove) return

        const updatedTask = { ...taskToMove, status: destinationColumnId }

        const newSourceColumnTasks = sourceColumnTasks.filter(
          (task) => task.id !== active.id
        )
        const newDestinationColumnTasks = [
          updatedTask,
          ...destinationColumnTasks,
        ]

        const newTasks = {
          ...tasks,
          [sourceColumnId]: newSourceColumnTasks,
          [destinationColumnId]: newDestinationColumnTasks,
        }

        setTasks(newTasks)
      }
    }
  }

  const handleDragOver = (event: {
    active: { id: UniqueIdentifier }
    over: { id: UniqueIdentifier } | null
  }) => {
    if (!event.over) return

    const { active, over } = event

    const sourceColumnId = findColumn(tasks, active.id)
    const destinationColumnId = over.id

    if (
      !sourceColumnId ||
      !destinationColumnId ||
      !(destinationColumnId in tasks)
    )
      return
    if (sourceColumnId === destinationColumnId) return

    const sourceColumnTasks = tasks[sourceColumnId as keyof Tasks]
    const destinationColumnTasks =
      tasks[destinationColumnId as keyof Tasks] || []

    const taskToMove = sourceColumnTasks.find((task) => task.id === active.id)
    if (!taskToMove) return

    const updatedTask = { ...taskToMove, status: destinationColumnId }

    const newSourceColumnTasks = sourceColumnTasks.filter(
      (task) => task.id !== active.id
    )
    const newDestinationColumnTasks = [...destinationColumnTasks, updatedTask]

    const newTasks = {
      ...tasks,
      [sourceColumnId]: newSourceColumnTasks,
      [destinationColumnId]: newDestinationColumnTasks,
    }

    setTasks(newTasks)
  }
  
  return (
    <>
      <div className="h-full overflow-x-auto flex flex-col gap-4 sm:w-auto sm:flex-row px-4 py-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <SortableContext
              key={columnId}
              items={columnTasks.map((task: Task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <TaskColumn
                id={columnId}
                title={getTitle(columnId)}
                tasks={columnTasks}
              />
            </SortableContext>
          ))}

          <DragOverlay>
            {activeTask ? (
              <div className="p-3 min-w-min text-sm rounded-xl bg-white dark:bg-gray-950 shadow-[0_10px_15px_3px_rgba(34,_33,_81,_0.3)] dark:shadow-[0_10px_15px_3px_rgba(220,220,220,0.2)] transition-shadow duration-200">
                <div className="flex relative items-center gap-2 mb-2">
                  <RightCircleTwoTone />

                  <span className=" text-xs text-gray-500 dark:text-gray-400 break-words">
                    Project name #1
                  </span>
                </div>
                {activeTask.content}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Input to add a new task */}
        {idProject && <AddTaskForm idProject={idProject} />}

        {/* Menu Assigt task to */}
        <AssignToModal />
      </div>
    </>
  )
}

function findColumn(tasks: Tasks, id: UniqueIdentifier) {
  return Object.keys(tasks).find((column) =>
    tasks[column as keyof Tasks].some((task: Task) => task.id === id)
  )
}

function getTitle(columnId: string) {
  switch (columnId) {
    case "todo":
      return "To do"
    case "inProgress":
      return "In Progress "
    case "done":
      return "Finished"
    case "inReview":
      return "In Review"
    default:
      return columnId
  }
}
