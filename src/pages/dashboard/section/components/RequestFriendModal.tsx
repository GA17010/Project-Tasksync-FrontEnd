import loadingSpinner from "@/assets/svg/spiner-loading.svg"
import { useFriendStore } from "@/stores/friendStore"
import { FriendRequest } from "@/types"
import { CloseOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as yup from "yup"

function RequestFriendModal() {
  const {
    showRequestFriendModal,
    friendError,
    closeRequestFriendModal,
    sendRequest,
  } = useFriendStore()

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const schema: yup.ObjectSchema<FriendRequest> = yup.object({
    receiver_email: yup
      .string()
      .required("E-mail is required")
      .email("E-mail must be valid")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail must not contain spaces"),
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FriendRequest>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      receiver_email: "",
    },
  })

  const onSubmit: SubmitHandler<FriendRequest> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const email: FriendRequest = {
      receiver_email: data.receiver_email,
    }

    const response = await sendRequest(email)

    if (response) {
      closeRequestFriendModal()

      toast.success("Request sent successfully")

      setValue("receiver_email", "")
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
          showRequestFriendModal ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="relative flex flex-col items-center max-h-2/3 w-full sm:w-2/3  md:w-1/2 lg:w-1/3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-900 rounded-lg ">
          {/* Header */}
          <div className="sticky top-0 w-full text-center border-b border-gray-300 dark:border-gray-500 bg-gray-200 dark:bg-tasksync-dark rounded-t-md">
            <h3 className="py-3 font-semibold">Send request</h3>
          </div>

          {/* List */}
          <form
            className="max-w-md p-4 w-full overflow-y-auto"
            onSubmit={() => handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-1 text-gray-600 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                className={`mt-2 w-full border-2 rounded-md py-2 pr-8 pl-3 text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
                  errors.receiver_email ? colorConfig.error : colorConfig.normal
                }`}
                placeholder="admin@example.com"
                {...register("receiver_email")}
                aria-invalid={errors.receiver_email ? "true" : "false"}
              />
              <p
                className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
                  errors.receiver_email
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                {errors.receiver_email?.message}
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
                <label className="cursor-pointer">Send request</label>
              )}
            </button>

            <div className="mt-2">
              <span className="text-tasksync-danger">{friendError}</span>
            </div>
          </form>

          {/* Close Modal */}
          <button
            type="button"
            onClick={closeRequestFriendModal}
            className="absolute top-1 right-1 py-1.5 px-2.5 text-lg text-tasksync-danger hover:bg-tasksync-danger/20 cursor-pointer rounded-lg"
          >
            <CloseOutlined />
          </button>
        </div>
      </div>
    </>
  )
}

export default RequestFriendModal
