import loadingSpinner from "@/assets/svg/spiner-loading.svg"
import { useRecoveryStore } from "@/stores/recoveryStore"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import * as yup from "yup"

interface FormData {
  password: string
  confirmPassword: string
}

function ResetPasswordForm() {
  const navigate = useNavigate()
  const { recoveryError, recoveryCode, recoveryEmail, resetPassword } =
    useRecoveryStore()

  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const schema: yup.ObjectSchema<FormData> = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@#$%]/,
        "Password must contain at least one special character (@, #, $, %)"
      )
      .matches(
        /^[a-zA-Z0-9@#$%]+$/,
        "Password can only contain letters and special characters (@, #, $, %)"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
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
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const email = recoveryEmail
    const code = recoveryCode

    if (!email || !code) {
      navigate("/login")
      return
    }

    const resetData = {
      email: email,
      otp: code,
      password: data.password,
    }

    const response = await resetPassword(resetData)

    if (response) {
      navigate("/login")
    } else {
      setIsSubmitting(false)
    }
  }

  const colorConfig = {
    error:
      "focus:shadow-[0px_0px_0px_2px_rgba(255,0,0,0.2)] border-red-400 focus:border-red-300",
    normal:
      "focus:shadow-[0px_0px_0px_2px_rgba(0,100,255,0.2)] border-gray-300 focus:border-blue-400 hover:border-gray-400",
  }

  return (
    <div className="w-full flex justify-center">
      <form className="max-w-md mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-center mb-0">
            Reset your Password
          </h3>
          <Link to="/login" className="text-blue-500">
            Back to login
          </Link>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="mb-1 text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none transition-colors ease-in-out ${
                errors.password ? colorConfig.error : colorConfig.normal
              }`}
              placeholder="********"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute pt-[6px] inset-y-3 right-6 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {!showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </div>
          {errors.password && (
            <p
              className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${
                errors.password
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="mb-1 text-gray-600">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none transition-colors ease-in-out ${
                errors.confirmPassword ? colorConfig.error : colorConfig.normal
              }`}
              placeholder="********"
              {...register("confirmPassword")}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute pt-[6px] inset-y-3 right-6 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {!showConfirmPassword ? (
                <EyeInvisibleOutlined />
              ) : (
                <EyeOutlined />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p
              className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${
                errors.confirmPassword
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          className="w-full flex justify-center mt-2 p-2 bg-blue-600 text-white rounded-md hover:scale-105 cursor-pointer transition"
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
            <label className="cursor-pointer">Change password</label>
          )}
        </button>

        <div className="mt-2">
          <span className="text-red-600">{recoveryError}</span>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordForm
