import App from "@/App"
import HydrateFallback from "@/components/HydrateFallback"
import AuthLayout from "@/layouts/authentication/AuthLayout"
import DashboardLayout from "@/layouts/dashboard/DashboardLayout"
import ForgotPasswordPage from "@/pages/authentication/ForgotPasswordPage"
import LoginPage from "@/pages/authentication/LoginPage"
import RegisterPage from "@/pages/authentication/RegisterPage"
import ResetPasswordForm from "@/pages/authentication/ResetPasswordPage"
import VerifyCodeForm from "@/pages/authentication/VerifyCodePage"
import HomePage from "@/pages/dashboard/DashboardPage"
import ProjectPage from "@/pages/dashboard/ProjectPage"
import WelcomePage from "@/pages/WelcomePage"
import { authLoader } from "@/utils/loaders/authLoader"
import { publicLoader } from "@/utils/loaders/publicLoader"
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: WelcomePage,
      },
      {
        path: "",
        Component: AuthLayout,
        loader: publicLoader,
        HydrateFallback: HydrateFallback,
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
        loader: authLoader,
        HydrateFallback: HydrateFallback,
        children: [
          { path: "", Component: HomePage },
          { path: "projects/:id", Component: ProjectPage },
        ],
      },
    ],
  },
])
