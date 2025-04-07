import App from "@/App"
import AuthLayout from "@/layouts/authentication/AuthLayout"
import DashboardLayout from "@/layouts/dashboard/DashboardLayout"
import ForgotPasswordPage from "@/pages/authentication/ForgotPasswordPage"
import LoginPage from "@/pages/authentication/LoginPage"
import RegisterPage from "@/pages/authentication/RegisterPage"
import ResetPasswordForm from "@/pages/authentication/ResetPasswordPage"
import VerifyCodeForm from "@/pages/authentication/VerifyCodePage"
import HomePage from "@/pages/HomePage"
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "",
        Component: AuthLayout,
        children: [
          { path: "login", Component: LoginPage },
          { path: "register", Component: RegisterPage },
          { path: "forgot-password", Component: ForgotPasswordPage },
          { path: "verify-code", Component: VerifyCodeForm },
          { path: "reset-password", Component: ResetPasswordForm },
        ],
      },
      {
        path: "dashboard",
        Component: DashboardLayout,
        // loader: async () => {
        //   await new Promise((resolve) => setTimeout(resolve, 1000)) // simula fetch
        //   return null
        // },
        children: [{ path: "", Component: HomePage }],
      },
    ],
  },
])
