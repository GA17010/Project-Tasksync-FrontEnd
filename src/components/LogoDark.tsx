import logo from "@/assets/logos/logotipo.avif"
import { Link } from "react-router"

function LogoDark() {
  return (
    <>
      <div>
        <Link to="/login">
          <img
            height="24"
            width="97"
            className="max-h-6 object-cover"
            src={logo}
            alt="Logo"
          />
        </Link>
      </div>
    </>
  )
}

export default LogoDark
