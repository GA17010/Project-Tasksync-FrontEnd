import loadingSpinner from "@/assets/svg/spiner-loading.svg"
import { useAuthStore } from "@/stores/authStore"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import * as yup from "yup"

interface FormData {
  firstname: string
  lastname: string
  company?: string
  email: string
  password: string
  confirmPassword: string
}

function RegisterPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const { errorRegister, registerUser } = useAuthStore()

  const schema: yup.ObjectSchema<FormData> = yup.object({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    company: yup.string().optional(),
    email: yup
      .string()
      .required("E-mail is required")
      .email("E-mail must be valid")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "E-mail must not contain spaces"),
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
      firstname: "",
      lastname: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const userData = {
      full_name: `${data.firstname} ${data.lastname}`,
      company: data.company,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
    }

    const response = await registerUser(userData) // Reemplaza con tu función de registro real

    if (response) {
      navigate("/dashboard")
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
          <h3 className="text-2xl font-semibold text-center mb-0">Sign up</h3>
          <Link to="/login" className="text-blue-500">
            Already have an account?
          </Link>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:pr-3 w-full md:w-1/2">
            <div className="mb-4">
              <label htmlFor="firstname" className="mb-1 text-gray-600">
                First Name*
              </label>
              <input
                id="firstname"
                className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none transition-colors ease-in-out ${
                  errors.firstname ? colorConfig.error : colorConfig.normal
                }`}
                placeholder="John"
                {...register("firstname")}
                aria-invalid={errors.firstname ? "true" : "false"}
              />
              {errors.firstname && (
                <p
                  className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${
                    errors.firstname
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  {errors.firstname.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:pl-3 w-full md:w-1/2">
            <div className="mb-4">
              <label htmlFor="lastname" className="mb-1 text-gray-600">
                Last Name*
              </label>
              <input
                id="lastname"
                className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 focus:border text-sm md:text-base focus:outline-none transition-colors ease-in-out ${
                  errors.lastname ? colorConfig.error : colorConfig.normal
                }`}
                placeholder="Doe"
                {...register("lastname")}
                aria-invalid={errors.lastname ? "true" : "false"}
              />
              {errors.lastname && (
                <p
                  className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${
                    errors.lastname
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="mb-1 text-gray-600">
            Company
          </label>
          <input
            id="company"
            type="text"
            className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none transition-colors ease-in-out ${
              errors.company ? colorConfig.error : colorConfig.normal
            }`}
            placeholder="Company Inc."
            {...register("company")}
            aria-invalid={errors.company ? "true" : "false"}
          />
          {errors.company && (
            <p
              className={`text-red-500 text-xs mt-1 transition-all duration-300 ease-in-out ${
                errors.company
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }`}
            >
              {errors.company.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 text-gray-600">
            Email Address*
          </label>
          <input
            id="email"
            type="email"
            autoComplete="on"
            className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none transition-colors ease-in-out ${
              errors.email ? colorConfig.error : colorConfig.normal
            }`}
            placeholder="example@company.com"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
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
        <div className="mb-4">
          <label htmlFor="password" className="mb-1 text-gray-600">
            Password*
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
              className="absolute pt-[6px] inset-y-3 right-6 flex items-center text-gray-500 hover:text-gray-700"
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
            Confirm Password*
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
              className="absolute pt-[6px] inset-y-3 right-6 flex items-center text-gray-500 hover:text-gray-700"
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

        <div className="w-full flex flex-row text-xs justify-center mt-2 mb-7 mb-sm-0 font-medium">
          <h6 className="text-gray-600">
            By Signing up, you agree to our
            {/* <Link to="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </Link> */}
            <button
              onClick={() => console.log("Ir a términos")}
              className="text-blue-500 hover:underline"
            >
              Terms of Service
            </button>
            and
            {/* <Link to="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link> */}
            <button
              onClick={() => console.log("Ir a política de privacidad")}
              className="text-blue-500 hover:underline"
            >
              Privacy Policy
            </button>
          </h6>
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
            <label>Create Account</label>
          )}
        </button>

        <div className="mt-2">
          <span className="text-red-600">{errorRegister}</span>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
