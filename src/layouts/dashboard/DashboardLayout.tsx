import React from "react"
import { Outlet } from "react-router"
import FooterPanel from "./footer/FooterPanel"
import NavbarHeader from "./navbar-header/NavbarHeader"

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="relative h-full w-full bg-white">
        <NavbarHeader />

        <main className="h-[calc(100vh-3.5rem)] flex w-full pt-16 overflow-x-auto">
          <Outlet />
        </main>

        <FooterPanel />
      </div>
    </>
  )
}

export default MainLayout
