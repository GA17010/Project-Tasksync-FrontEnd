import { useDropdownStore } from "@/stores/dropdownStore"
import { EllipsisOutlined } from "@ant-design/icons"
import * as React from "react"

interface DropdownProps {
  id: string
  children: React.ReactNode
  classNameButton: string
  classNameMenu: string
}

function Dropdown({
  id,
  children,
  classNameButton,
  classNameMenu,
}: DropdownProps) {
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
        className={`${classNameButton} px-2.5 rounded-xl cursor-pointer`}
        onClick={toggleDropdown}
      >
        <EllipsisOutlined />
      </button>

      <div
        ref={dropdownRef}
        className={`${classNameMenu} absolute z-20 mt-8 w-48 bg-white dark:bg-gray-800 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.15)] rounded-lg transition-all duration-100 ${
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
