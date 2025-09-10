import loadingSpinner from "@/assets/svg/spiner-loading.svg"
import { useAuthStore } from "@/stores/authStore"
import { useUIStore } from "@/stores/uiStore"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import * as React from "react"
import { SubmitHandler, useForm, useWatch } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import * as yup from "yup"
import SelectAvatarModal from "./components/SelectAvatarModal"

interface FormData {
  firstname: string
  lastname: string
  nickname: string
  icon: string
  email: string
  password: string
  confirmPassword: string
}

function RegisterPage() {
  const navigate = useNavigate()
  const { errorRegister, registerUser } = useAuthStore()
  const { userAvatarSmall } = useUIStore()

  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const schema: yup.ObjectSchema<FormData> = yup.object({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    nickname: yup.string().required("Nickname is required"),
    icon: yup
      .string()
      .required("Icon is required")
      .test("isValidIcon", "Invalid avatar selected", (value) => {
        if (!value) return true
        return Object.keys(userAvatarSmall).includes(value)
      }),
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
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstname: "",
      lastname: "",
      nickname: "",
      icon: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const [isAvatarListOpen, setIsAvatarListOpen] = React.useState(false)
  const selectedIcon = useWatch({ control, name: "icon" })

  const handleAvatarSelect = (iconName: string) => {
    setValue("icon", iconName)
    setIsAvatarListOpen(false)
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const userData = {
      name: `${data.firstname} ${data.lastname}`,
      nickname: data.nickname,
      icon: data.icon,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
    }

    const response = await registerUser(userData)

    if (response) {
      void navigate("/dashboard")
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
    <div className="w-full flex justify-center">
      <form
        className="max-w-md mt-5 w-full"
        onSubmit={() => {
          void handleSubmit(onSubmit)
        }}
      >
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-center mb-0">Sign up</h3>
          <Link to="/login" className="text-tasksync-primary">
            Already have an account?
          </Link>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:pr-3 w-full md:w-1/2">
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="mb-1 text-gray-600 dark:text-gray-400"
              >
                First Name*
              </label>
              <input
                id="firstname"
                className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
                  errors.firstname ? colorConfig.error : colorConfig.normal
                }`}
                placeholder="John"
                {...register("firstname")}
                aria-invalid={errors.firstname ? "true" : "false"}
              />
              <p
                className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
                  errors.firstname
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                {errors.firstname?.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:pl-3 w-full md:w-1/2">
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="mb-1 text-gray-600 dark:text-gray-400"
              >
                Last Name*
              </label>
              <input
                id="lastname"
                className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 focus:border text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
                  errors.lastname ? colorConfig.error : colorConfig.normal
                }`}
                placeholder="Doe"
                {...register("lastname")}
                aria-invalid={errors.lastname ? "true" : "false"}
              />
              <p
                className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
                  errors.lastname
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                {errors.lastname?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:pr-3 w-full md:w-1/2">
            <div className="mb-4">
              <label
                htmlFor="nickname"
                className="mb-1 text-gray-600 dark:text-gray-400"
              >
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
                  errors.nickname ? colorConfig.error : colorConfig.normal
                }`}
                placeholder="Johny"
                {...register("nickname")}
                aria-invalid={errors.nickname ? "true" : "false"}
              />
              <p
                className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
                  errors.nickname
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                {errors.nickname?.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:pl-3 w-full md:w-1/2">
            <div className="mb-4 relative">
              <label
                htmlFor="icon"
                className="mb-1 text-gray-600 dark:text-gray-400"
              >
                Choose your Avatar
              </label>
              <button
                type="button"
                className={`mt-2 w-full border-2 rounded-md py-2 pl-3 text-left text-sm md:text-base focus:outline-none transition-colors ease-in-out text-gray-600 dark:text-gray-400 flex items-center justify-between cursor-pointer ${
                  errors.nickname ? colorConfig.error : colorConfig.normal
                }`}
                onClick={() => {
                  setIsAvatarListOpen(!isAvatarListOpen)
                }}
              >
                {selectedIcon ? (
                  <div className="flex items-center">
                    <img
                      src={userAvatarSmall[selectedIcon]}
                      alt="Selected Avatar"
                      className="w-6 h-6 rounded-full mr-2 object-cover"
                    />
                    {selectedIcon}
                  </div>
                ) : (
                  "Select an avatar"
                )}
                <svg
                  className={`w-5 h-5 mr-1 transition-transform ease-in-out ${
                    isAvatarListOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <SelectAvatarModal
                onClick={handleAvatarSelect}
                isOpen={isAvatarListOpen}
                selectedIcon={selectedIcon}
              />

              {/* Hidden field to save the icon name */}
              <input
                type="hidden"
                {...register("icon")}
                value={selectedIcon || ""}
              />

              <p
                className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
                  errors.icon
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2"
                }`}
              >
                {errors.icon?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1 text-gray-600 dark:text-gray-400"
          >
            Email Address*
          </label>
          <input
            id="email"
            type="email"
            autoComplete="on"
            className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
              errors.email ? colorConfig.error : colorConfig.normal
            }`}
            placeholder="example@nickname.com"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
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
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 text-gray-600 dark:text-gray-400"
          >
            Password*
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
                errors.password ? colorConfig.error : colorConfig.normal
              }`}
              placeholder="********"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword)
              }}
              className="absolute pt-[6px] inset-y-3 right-6 flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 cursor-pointer"
            >
              {!showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          </div>
          <p
            className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
              errors.password
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            {errors.password?.message}
          </p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="mb-1 text-gray-600 dark:text-gray-400"
          >
            Confirm Password*
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`mt-2 w-full border-2 rounded-md py-2 pr-10 pl-3 text-sm md:text-base focus:outline-none placeholder-gray-400 dark:placeholder-gray-600 transition-colors ease-in-out ${
                errors.confirmPassword ? colorConfig.error : colorConfig.normal
              }`}
              placeholder="********"
              {...register("confirmPassword")}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => {
                setShowConfirmPassword(!showConfirmPassword)
              }}
              className="absolute pt-[6px] inset-y-3 right-6 flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-400 cursor-pointer"
            >
              {!showConfirmPassword ? (
                <EyeInvisibleOutlined />
              ) : (
                <EyeOutlined />
              )}
            </button>
          </div>
          <p
            className={`text-tasksync-danger text-xs mt-1 transition-all duration-300 ease-in-out ${
              errors.confirmPassword
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            {errors.confirmPassword?.message}
          </p>
        </div>

        <div className="w-full flex flex-row text-xs justify-center mt-2 mb-7 mb-sm-0 font-medium">
          <h6 className="text-gray-600 dark:text-gray-400">
            By Signing up, you agree to our
            <Link
              to="/login"
              className="px-1 text-tasksync-primary hover:underline"
            >
              Terms of Service
            </Link>
            and
            <Link
              to="/login"
              className="px-1 text-tasksync-primary hover:underline"
            >
              Privacy Policy
            </Link>
          </h6>
        </div>
        <button
          className="w-full flex justify-center mt-2 p-2 text-white bg-tasksync-primary rounded-md hover:scale-105 cursor-pointer transition"
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
            <label className="cursor-pointer">Create Account</label>
          )}
        </button>

        <div className="mt-2">
          <span className="text-tasksync-danger">
            {errorRegister} {errors.root?.message}
          </span>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
