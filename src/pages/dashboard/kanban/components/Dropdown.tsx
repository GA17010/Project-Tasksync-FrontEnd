import { useDropdownStore } from "@/stores/dropdownStore" // Asegúrate de la ruta correcta
import { EllipsisOutlined } from "@ant-design/icons"
import * as React from "react"

interface DropdownProps {
  id: string
  children: React.ReactNode
}

function Dropdown({ id, children }: DropdownProps) {
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const activeDropdownId = useDropdownStore((state) => state.activeDropdownId)
  const openDropdown = useDropdownStore((state) => state.openDropdown)
  const closeAllDropdowns = useDropdownStore((state) => state.closeAllDropdowns)

  const isVisible = activeDropdownId === id

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        isVisible
      ) {
        closeAllDropdowns()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [closeAllDropdowns, isVisible])

  const toggleDropdown = () => {
    openDropdown(id)
  }

  return (
    <>
      <button
        className="absolute right-0 top-0 px-2.5 rounded-xl text-lg cursor-pointer  hover:bg-gray-300 dark:hover:bg-gray-900"
        onClick={toggleDropdown}
      >
        <EllipsisOutlined />
      </button>

      <div
        ref={dropdownRef}
        className={`absolute top-0 z-50 right-0 mt-8 w-48 bg-white dark:bg-gray-800 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.15)] rounded-lg transition-all duration-100 ${
          isVisible
            ? "scale-100 origin-top-right opacity-100 ease-out"
            : "scale-0 origin-top-right opacity-0 ease-in"
        }`}
      >
        {children}
      </div>
    </>
  )
}

export default Dropdown
