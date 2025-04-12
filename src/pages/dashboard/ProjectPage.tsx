import {
  closestCenter,
  DndContext,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { taskStore } from "@/stores/taskStore"
import { Task, Tasks } from "@/types"
import * as React from "react"
import { useParams } from "react-router"
import InputAddTask from "./kanban/InputAddTask"
import TaskColumn from "./kanban/TaskColumn"

export default function ProjectPage() {
  const { id } = useParams()
  console.log(id)

  const { tasks, setTasks, fetchTasks } = taskStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  React.useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleDragEnd = (event: {
    active: { id: UniqueIdentifier }
    over: { id: UniqueIdentifier } | null
  }) => {
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
      <div className="h-full overflow-x-auto flex flex-col gap-4 sm:w-auto sm:flex-row sm:gap-0 px-4 py-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
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
        </DndContext>

        {/* Input to add a new task */}
        <InputAddTask />
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
