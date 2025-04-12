import React from "react"
import { Outlet } from "react-router"
import FooterPanel from "./footer/FooterPanel"
import NavbarHeader from "./navbar-header/NavbarHeader"

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="h-screen w-full flex flex-col bg-white dark:bg-gray-950 text-tasksync-dark dark:text-white overflow-hidden">
        <NavbarHeader />

        <main className="flex-1 pt-16 overflow-x-auto">
          <Outlet />
        </main>

        <FooterPanel />
      </div>
    </>
  )
}

export default MainLayout
