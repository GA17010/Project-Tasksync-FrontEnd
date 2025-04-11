import logotipo from "@/assets/logos/logo.avif"
import React from "react"
import { Link } from "react-router"

const LogoLink: React.FC = () => {
  return (
    <div className="flex items-center justify-center md:justify-start gap-4 text-lg font-medium">
      <Link to="/dashboard" className="flex items-center gap-2">
        <img
          id="logotipo"
          className="h-7 min-w-7 w-7"
          src={logotipo}
          alt="Logotipo"
          width={28}
          height={28}
        />
        <span>TaskSync</span>
      </Link>
    </div>
  )
}

export default LogoLink
