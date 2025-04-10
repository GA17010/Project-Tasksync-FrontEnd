import bgLogo from "@/assets/logos/logo.avif"
import LogoDark from "@/components/LogoDark"
import { Outlet } from "react-router"
import AuthFooter from "./auth/AuthFooter"

function AuthLayout() {
  return (
    <>
      <div className="h-full fixed flex items-center -translate-x-1/2 bg-inherit filter blur-lg">
        <img
          src={bgLogo}
          alt="Background"
          className="object-cover"
          width="461"
          height="500"
        />
      </div>
      <div className="grid grid-rows-[auto_1fr_auto] place-items-center relative min-h-screen dark:bg-gray-900/80  text-tasksync-dark dark:text-white">
        <div className="w-full">
          <div className="pt-6 pl-6">
            <LogoDark />
          </div>
        </div>

        {/* <!---Login Part--> */}
        <div className="px-3 py-6 md:p-10 w-full flex place-content-center">
          <div className="w-full max-w-[470px] rounded-md shadow-[0px_0px_25px_2px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-900  p-6 sm:p-8 sm:min-w-max md:h-auto md:p-10">
            {/* <!---Forms--> */}

            <Outlet />
            {/* <!---Form--> */}
          </div>
        </div>

        {/* <!---Login Part--> */}
        <div className="w-full">
          <div className="pt-0 pb-6">
            <AuthFooter />
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
