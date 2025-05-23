import { RightCircleTwoTone } from "@ant-design/icons"
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
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

import AssignToModal from "@/components/AssignToModal"
import { useFriendStore } from "@/stores/friendStore"
import { taskStore } from "@/stores/taskStore"
import { FriendResponse, TaskResponse, Tasks } from "@/types"
import * as React from "react"
import { useParams } from "react-router"
import CreateTaskForm from "./kanban/CreateTaskForm"
import TaskColumn from "./kanban/TaskColumn"

export default function ProjectPage() {
  const { id: idProject } = useParams()
  const { taskToAssign, handleAssign } = useFriendStore()
  const { tasks, setProject_id, setTasks, fetchTasks, updateTask } = taskStore()

  const [activeTask, setActiveTask] = React.useState<TaskResponse | null>(null)

  React.useEffect(() => {
    if (!idProject) return
    setProject_id(idProject)
    fetchTasks(idProject)
  }, [fetchTasks, idProject, setProject_id])

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const [statusOrigin, setStatusOrigin] = React.useState<string>("")
  const [statusUpdated, setStatusUpdated] = React.useState<string>("")

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const columnId = findColumn(tasks, active.id)
    if (!columnId) return

    setStatusOrigin(columnId?.toString())

    const task = tasks[columnId as keyof Tasks].find(
      (task) => task.id === active.id
    )
    setActiveTask(task || null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event
    if (!idProject) return
    if (over) {
      if (active.id !== over.id) {
        const sourceColumnId = findColumn(tasks, active.id)
        const destinationColumnId = findColumn(tasks, over.id)

        if (!sourceColumnId || !destinationColumnId) return

        if (sourceColumnId === destinationColumnId) {
          const columnTasks = tasks[sourceColumnId as keyof Tasks]
          const oldIndex = columnTasks.findIndex(
            (task) => task.id === active.id
          )
          const newIndex = columnTasks.findIndex((task) => task.id === over.id)
          const newTasks = {
            ...tasks,
            [sourceColumnId]: arrayMove(columnTasks, oldIndex, newIndex),
          }

          setTasks(newTasks)
        } else {
          const sourceColumnTasks = tasks[sourceColumnId as keyof Tasks]
          const destinationColumnTasks =
            tasks[destinationColumnId as keyof Tasks]

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
          updateTask(
            idProject,
            updatedTask.id,
            updatedTask.assigned_to?.id,
            updatedTask.status.toString()
          )

          setTasks(newTasks)
          return
        }
      }
      if (!statusUpdated) return
      if (statusOrigin !== statusUpdated) {
        updateTask(idProject, active.id.toString(), undefined, statusUpdated)
      }
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

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

    setStatusUpdated(destinationColumnId.toString())

    setTasks(newTasks)
  }

  const handleAssignClic = (friend: FriendResponse) => {
    // Notify user

    if (!taskToAssign || !idProject) return

    updateTask(idProject, taskToAssign.id, friend.id)

    handleAssign()
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
              items={columnTasks.map((task: TaskResponse) => task.id)}
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
        {idProject && <CreateTaskForm idProject={idProject} />}

        {/* Menu Assigt task to */}
        <AssignToModal showMe={true} onClick={handleAssignClic} />
      </div>
    </>
  )
}

function findColumn(tasks: Tasks, id: UniqueIdentifier) {
  return Object.keys(tasks).find((column) =>
    tasks[column as keyof Tasks].some((task: TaskResponse) => task.id === id)
  )
}

function getTitle(columnId: string) {
  switch (columnId) {
    case "todo":
      return "To do"
    case "in_progress":
      return "In Progress"
    case "in_review":
      return "In Review"
    case "done":
      return "Finished"
    default:
      return columnId
  }
}
