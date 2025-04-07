import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "@/layout/dashboard/DashboardLayout"
import HomePage from "@/pages/HomePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [{ path: "", element: <HomePage /> }],
  },
])
