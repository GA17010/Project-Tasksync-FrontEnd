import loadingSpinner from "@/assets/svg/spiner-loading.svg"
import { useRecoveryStore } from "@/stores/recoveryStore"
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import * as yup from "yup"

interface FormData {
  code: string
}

function VerifyCodeForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const { recoveryError, recoveryEmail, verifyCode } = useRecoveryStore()

  const schema: yup.ObjectSchema<FormData> = yup.object({
    code: yup
      .string()
      .required("Code is required")
      .min(6, "Code must be at least 6 characters"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      code: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    if (!recoveryEmail) {
      navigate("/forgot-password")
      return
    }
    const email = recoveryEmail

    const codeData = { email: email, otp: data.code }

    const response = await verifyCode(codeData)

    if (response) {
      navigate("/reset-password")
    } else {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full max-w-md">
        <div className="w-full flex justify-between mb-4">
          <h3 className="text-2xl font-semibold text-center mb-0">
            Verify Code
          </h3>
          <Link
            to="/login"
            className="text-tasksync-primary flex place-items-center text-sm"
          >
            Back to Login
          </Link>
        </div>

        <div className="pb-4">
          <span className="text-sm text-gray-800 dark:text-gray-400">
            We have sent a verification code to your email address.
          </span>
        </div>

        <div className="flex flex-col mb-6">
          <label
            htmlFor="code"
            className="mb-1 text-gray-600 dark:text-gray-300"
          >
            Code
          </label>
          <input
            id="code"
            type="text"
            placeholder="Enter the code"
            autoComplete="on"
            className={`w-full appearance-none leading-tight focus:outline-none text-sm border rounded-md py-2 pr-10 pl-3 md:text-base transition-colors ease-in-out ${
              errors.code
                ? "focus:shadow-[0px_0px_0px_2px_rgba(255,0,0,0.2)] border-tasksync-danger  focus:border-red-300"
                : "focus:shadow-[0px_0px_0px_2px_rgba(0,100,255,0.2)] border-gray-300 dark:border-gray-500 focus:border-blue-400 dark:focus:border-tasksync-primary hover:border-blue-400 dark:hover:border-tasksync-primary"
            }`}
            aria-invalid={errors.code ? "true" : "false"}
            {...register("code")}
          />
          {errors.code && (
            <p
              className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
                errors.code
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {errors.code.message}
            </p>
          )}
        </div>

        <div>
          <span className="text-xs text-gray-800 dark:text-gray-400">
            Do not forgot to check SPAM box.
          </span>
        </div>

        <button
          className="w-full flex justify-center mt-2 bg-tasksync-primary text-white p-3 rounded-md hover:scale-105 cursor-pointer transition"
          disabled={!isValid || isSubmitting}
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
            <label className="cursor-pointer">Send Password Reset code</label>
          )}
        </button>

        <div className="mt-2">
          <span className="text-tasksync-danger">{recoveryError}</span>
        </div>
      </form>
    </div>
  )
}

export default VerifyCodeForm
