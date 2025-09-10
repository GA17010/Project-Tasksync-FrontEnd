import loadingSpinner from "@/assets/svg/spiner-loading.svg"
import { useProjectStore } from "@/stores/projectStore"
import { ProjectRequest } from "@/types"
import { CloseOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

function ProjectFormModal() {
  const {
    showProjectFormModal,
    projectError,
    typeModal,
    project,
    projectId,
    closeProjectFormModal,
    setShowCreateProject,
    createProject,
    updateProject,
  } = useProjectStore()

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const schema: yup.ObjectSchema<ProjectRequest> = yup.object({
    name: yup
      .string()
      .required("Project name is required")
      .max(100, "name must be less than 100 characters"),
    description: yup.string().max(250, "name must be less than 250 characters"),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectRequest>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  })

  React.useEffect(() => {
    if (project) {
      setValue("name", project.name)
      setValue("description", project.description)
    } else {
      setValue("name", "")
      setValue("description", "")
    }
  }, [project, setValue])

  const onSubmit: SubmitHandler<ProjectRequest> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    let response: boolean
    if (typeModal === "Create") {
      response = await createProject(data)
    } else {
      if (projectId) {
        response = await updateProject(data, projectId)
      } else {
        response = false
      }
    }

    if (response) {
      setShowCreateProject()

      setValue("name", "")
      setValue("description", "")
      setIsSubmitting(false)
    } else {
      setIsSubmitting(false)
    }
  }

  const colorConfig = {
    error:
      "focus:shadow-[0px_0px_0px_2px_rgba(255,0,0,0.2)] border-tasksync-danger  focus:border-red-300",
    normal:
      "focus:shadow-[0px_0px_0px_2px_rgba(0,100,255,0.2)] border-gray-300 dark:border-gray-500 focus:border-blue-400 dark:focus:border-tasksync-primary hover:border-blue-400 dark:hover:border-tasksync-primary",
  }

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-screen w-full px-4 sm:px-0 flex flex-col items-center justify-center bg-gray-500/30 dark:bg-gray-900/60 backdrop-blur-lg origin-center transition-all duration-150 ease-in-out z-50 ${
          showProjectFormModal ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="relative flex flex-col items-center max-h-2/3 w-full sm:w-2/3  md:w-1/2 lg:w-1/3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-900 rounded-lg ">
          {/* Header */}
          <div className="sticky top-0 w-full text-center border-b border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-tasksync-dark rounded-t-md">
            <h3 className="py-3 font-semibold">{typeModal} project</h3>
          </div>

          {/* List */}
          <form
            className="max-w-md p-4 w-full overflow-y-auto"
            onSubmit={() => handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="mb-1 text-gray-600 dark:text-gray-300"
              >
                Title
              </label>
              <input
                id="name"
                type="text"
                className={`mt-2 w-full border-2 rounded-md py-2 pr-8 pl-3 text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
                  errors.name ? colorConfig.error : colorConfig.normal
                }`}
                placeholder="Sprint Planning 3 - Mobile Development"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
              />
              <p
                className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
                  errors.name
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                {errors.name?.message}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-1 text-gray-600 dark:text-gray-300"
              >
                Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  className={`mt-2 w-full border-2 rounded-md py-2 pr-8 pl-3 text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
                    errors.description ? colorConfig.error : colorConfig.normal
                  }`}
                  placeholder="Briefly describe the main objective and scope of the project (optional)"
                  {...register("description")}
                  aria-invalid={errors.description ? "true" : "false"}
                />
              </div>
                <p
                  className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
                    errors.description
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  {errors.description?.message}
                </p>
            </div>

            <button
              className="w-full flex justify-center mt-2 p-2 bg-tasksync-primary text-white rounded-md hover:scale-105 cursor-pointer transition"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <img
                  className="w-5 h-5"
                  src={loadingSpinner}
                  alt="spiner-loading"
                  width="20"
                  height="20"
                />
              ) : (
                <label className="cursor-pointer">{typeModal} project</label>
              )}
            </button>

            <div className="mt-2">
              <span className="text-tasksync-danger">{projectError}</span>
            </div>
          </form>

          {/* Close Modal */}
          <button
            type="button"
            onClick={closeProjectFormModal}
            className="absolute top-1 right-1 py-1.5 px-2.5 text-lg text-tasksync-danger hover:bg-tasksync-danger/20 cursor-pointer rounded-lg"
          >
            <CloseOutlined />
          </button>
        </div>
      </div>
    </>
  )
}

export default ProjectFormModal
