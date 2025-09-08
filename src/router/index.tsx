import { lazy } from "react"
import { createBrowserRouter } from "react-router"
import App from "@/App"
import HydrateFallback from "@/components/HydrateFallback"
import { authLoader } from "@/utils/loaders/authLoader"
import { publicLoader } from "@/utils/loaders/publicLoader"

// Lazy load pages
const WelcomePage = lazy(() => import("@/pages/WelcomePage"))
const AuthLayout = lazy(() => import("@/layouts/authentication/AuthLayout"))
const DashboardLayout = lazy(() => import("@/layouts/dashboard/DashboardLayout"))
const KanbanLayout = lazy(() => import("@/layouts/dashboard/KanbanLayout"))

// Authentication pages
const ForgotPasswordPage = lazy(() => import("@/pages/authentication/ForgotPasswordPage"))
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/authentication/RegisterPage"))
const ResetPasswordForm = lazy(() => import("@/pages/authentication/ResetPasswordPage"))
const VerifyCodeForm = lazy(() => import("@/pages/authentication/VerifyCodePage"))

// Dashboard pages
const HomePage = lazy(() => import("@/pages/dashboard/DashboardPage"))
const ProjectPage = lazy(() => import("@/pages/dashboard/ProjectPage"))

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
        children: [{ path: "", Component: HomePage }],
      },
      {
        path: "kanban",
        Component: KanbanLayout,
        loader: authLoader,
        HydrateFallback: HydrateFallback,
        children: [{ path: "project/:id", Component: ProjectPage }],
      },
    ],
  },
])
