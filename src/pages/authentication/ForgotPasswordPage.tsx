import loadingSpinner from "@/assets/svg/spiner-loading.svg"
import { useRecoveryStore } from "@/stores/recoveryStore"
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import * as yup from "yup"

interface FormData {
  email: string
}

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const { forgotPassword, recoveryError } = useRecoveryStore()

  const schema: yup.ObjectSchema<FormData> = yup.object({
    email: yup
      .string()
      .required("E-mail is required")
      .email("E-mail must be valid")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail must not contain spaces"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const response = await forgotPassword(data)

    if (response) {
      void navigate("/verify-code")
    } else {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={() => {
          void handleSubmit(onSubmit)
        }}
        className="mt-6 w-full max-w-md"
      >
        <div className="w-full flex justify-between mb-4">
          <h3 className="text-2xl font-semibold text-center mb-0">
            Forgot Password
          </h3>
          <Link
            to="/login"
            className="text-tasksync-primary flex place-items-center text-sm"
          >
            Back to Login
          </Link>
        </div>

        <div className="flex flex-col mb-6">
          <label
            htmlFor="email"
            className="mb-1 text-gray-600 dark:text-gray-400"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            autoComplete="on"
            className={`w-full appearance-none leading-tight focus:outline-none text-sm border rounded-md py-2 pr-10 pl-3 md:text-base placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
              errors.email
                ? "ffocus:shadow-[0px_0px_0px_2px_rgba(255,0,0,0.2)] border-tasksync-danger  focus:border-red-300"
                : "focus:shadow-[0px_0px_0px_2px_rgba(0,100,255,0.2)] border-gray-300 dark:border-gray-500 focus:border-blue-400 dark:focus:border-tasksync-primary hover:border-blue-400 dark:hover:border-tasksync-primary"
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />
          <p
            className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
              errors.email
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            {errors.email?.message}
          </p>
        </div>

        <div>
          <span className="text-xs text-gray-800 dark:text-gray-500">
            Do not forgot to check SPAM box.
          </span>
        </div>

        <button
          className="w-full flex justify-center mt-2 text-white bg-tasksync-primary p-3 rounded-md hover:scale-105 cursor-pointer transition"
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
            <label className="cursor-pointer">Send Password Reset Email</label>
          )}
        </button>

        <div className="mt-2">
          <span className="text-tasksync-danger">{recoveryError}</span>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
