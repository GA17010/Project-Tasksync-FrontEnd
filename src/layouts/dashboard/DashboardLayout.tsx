import React from "react"
import { Outlet } from "react-router"
import FooterPanel from "./footer/FooterPanel"
import NavbarHeader from "./navbar-header/NavbarHeader"

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="min-h-screen not-last:bg-white  dark:bg-gray-950 text-tasksync-dark dark:text-white">
        <NavbarHeader />

        <main className="min-h-[calc(100vh-3.5rem)] flex pt-16">
          <Outlet />
        </main>

        <FooterPanel />
      </div>
    </>
  )
}

export default MainLayout
