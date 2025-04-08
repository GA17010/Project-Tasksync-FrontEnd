import loadingSpinner from "@/assets/svg/spiner-loading.svg"
import { useAuthStore } from "@/stores/authStore"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import * as yup from "yup"

interface FormData {
  email: string
  password: string
}

function LoginPage() {
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const schema: yup.ObjectSchema<FormData> = yup.object({
    email: yup
      .string()
      .required("E-mail is required")
      .email("E-mail must be valid")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail must not contain spaces"),

    password: yup
      .string()
      .required("Password is required")
      .max(15, "Password must be less than 15 characters"),
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
      email: "admin@example.com",
      password: "Pa$$w0rd",
    },
  })

  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const { login, errorAuth } = useAuthStore()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)
    
    const response = await login(data)

    if (response) {
      navigate("/dashboard")
    } else {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <h3 className="text-2xl font-semibold text-center mb-0">Login</h3>
        <Link
          to="/register"
          className="text-blue-600 flex place-items-center text-sm"
        >
          Don't Have an account?
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-full">
        <div className="flex flex-col mb-6">
          <label htmlFor="email" className="mb-1 text-gray-600">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="on"
            className={`w-full appearance-none leading-tight focus:outline-none text-sm border rounded-md py-2 pr-10 pl-3 md:text-base transition-colors ease-in-out ${
              errors.email
                ? "focus:shadow-[0px_0px_0px_2px_rgba(255,0,0,0.2)] border-red-400 focus:border-red-300"
                : "focus:shadow-[0px_0px_0px_2px_rgba(0,100,255,0.2)] border-gray-300 focus:border-blue-400 hover:border-blue-400"
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email")}
          />

          {errors.email && (
            <p
              className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${
                errors.email
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password" className="mb-1 text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`w-full appearance-none leading-tight focus:outline-none border border-gray-300 rounded-md py-2 pr-10 pl-3 text-sm md:text-base transition-colors ease-in-out ${
                errors.password
                  ? "focus:shadow-[0px_0px_0px_2px_rgba(255,0,0,0.2)] border-red-400 focus:border-red-300"
                  : "focus:shadow-[0px_0px_0px_2px_rgba(0,100,255,0.2)] border-gray-300 focus:border-blue-400 hover:border-blue-400"
              }`}
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
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

        <div className="flex items-center mt-4 mb-7 mb-sm-0">
          <Link
            to="/forgot-password"
            className="text-gray-800 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="w-full flex justify-center mt-5 bg-blue-600 p-3 rounded-md text-white hover:scale-105 cursor-pointer transition"
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
            <label>Login</label>
          )}
        </button>

        <div className="mt-2">
          <span className="text-red-600">{errorAuth}</span>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
