import loadingSpinner from "@/assets/svg/spiner-loading-blue.svg"
import { taskStore } from "@/stores/taskStore"
import { useCustomizerStore } from "@/stores/useCustomerStore"
import { Task } from "@/types"
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

interface FormData {
  content: string
}
function InputAddTask() {
  const {
    inputVisible,
    setInputVisible,
    statusTask,
    resetColumnIndicatorVisible,
  } = useCustomizerStore()
  const { addTask } = taskStore()

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const schema: yup.ObjectSchema<FormData> = yup.object({
    content: yup.string().required("Task is required"),
    // .min(6, "Task must be at least 6 characters"),
  })

  const {
    register,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const id = crypto.randomUUID()
    const newTask: Task = {
      id: id,
      content: data.content,
      status: statusTask,
    }

    // AWAIT FOR THE API RESPONSE
    // const response = await addTask(newTask)
    // if (response) {
    //   setInputVisible()
    // } else {
    //   setIsSubmitting(false)
    // }
    addTask(newTask)

    setIsSubmitting(false)

    setInputVisible()

    setValue("content", "")
  }

  const input_task = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        input_task.current &&
        !input_task.current.contains(target) &&
        inputVisible
      ) {
        setInputVisible()
        resetColumnIndicatorVisible()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [inputVisible, setInputVisible, resetColumnIndicatorVisible])

  React.useEffect(() => {
    useCustomizerStore.setState({
      focusInput: () => {
        setFocus("content")
      },
    })
  }, [setFocus])

  React.useEffect(() => {
    if (inputVisible) {
      setFocus("content")
    }
  }, [inputVisible, setFocus])

  return (
    <>
      <div ref={input_task} className={inputVisible ? "block" : "hidden"}>
        <div className="absolute left-0 bottom-4 px-4 w-full h-10 bg-white z-10">
          <div className="flex items-center border-2 rounded-md border-blue-500">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
              <input
                id="task"
                type="text"
                placeholder="Start typing to add a task..."
                className="px-3 h-11 w-full appearance-none border-none focus:outline-none"
                aria-invalid={errors.content ? "true" : "false"}
                {...register("content")}
              />
              <button
                className="py-2 flex items-center justify-center text-left text-sm px-6 w-20 h-11 font-semibold cursor-pointer rounded-r-sm border-l-2 border-blue-500 text-gray-700 hover:bg-gray-300"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <img
                    src={loadingSpinner}
                    alt="spiner-loading"
                    width="20"
                    height="20"
                  />
                ) : (
                  <label className="cursor-pointer">Add</label>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default InputAddTask
