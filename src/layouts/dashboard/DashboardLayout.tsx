import React from "react"
import { Outlet } from "react-router"
import FooterPanel from "./footer/FooterPanel"
import NavbarHeader from "./navbar-header/NavbarHeader"

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="relative h-full w-full bg-white dark:bg-gray-950 text-tasksync-dark dark:text-white">
        <NavbarHeader />

        <main className="h-full w-full flex pt-16 overflow-x-auto">
          <Outlet />
        </main>

        <FooterPanel />
      </div>
    </>
  )
}

export default MainLayout
