import React from "react"
import { Outlet } from "react-router"
import FooterPanel from "./footer/FooterPanel"
import NavbarHeader from "./navbar-header/NavbarHeader"

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="relative h-full w-full bg-white">
        <NavbarHeader />

        <main className="w-full pt-16">
          <div>
            <Outlet />
          </div>
          <div className="">
            <FooterPanel />
          </div>
        </main>
      </div>
    </>
  )
}

export default MainLayout
