import { useAuthStore } from "@/stores/authStore"
import { useUIStore } from "@/stores/uiStore"
import { useCustomizerStore } from "@/stores/useCustomerStore"
import { GithubOutlined } from "@ant-design/icons"
import React from "react"
import { useNavigate } from "react-router"
import LogoLink from "../logo/LogoLink"
import NotificationDD from "./NotificationDD"
import ProfileDD from "./ProfileDD"

export default function NavbarHeader() {
  const navigate = useNavigate()
  const { userAvatarSmall } = useUIStore()
  const { user, logout } = useAuthStore()

  const avatarUrl =
    user?.icon && userAvatarSmall[user.icon]
      ? userAvatarSmall[user.icon]
      : userAvatarSmall["avatar-00"]

  const {
    Profile_dropdown,
    SearchBar_dropdown,
    SET_PROFILE_DROPDOWN,
    SET_SEARCHBAR_DROPDOWN,
  } = useCustomizerStore()

  const userProfileMenu = React.useRef<HTMLDivElement>(null)
  const searchBar = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        userProfileMenu.current &&
        !userProfileMenu.current.contains(target) &&
        Profile_dropdown
      ) {
        SET_PROFILE_DROPDOWN()
      }

      if (
        searchBar.current &&
        !searchBar.current.contains(target) &&
        SearchBar_dropdown
      ) {
        SET_SEARCHBAR_DROPDOWN()
      }
    }

    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [
    Profile_dropdown,
    SearchBar_dropdown,
    SET_PROFILE_DROPDOWN,
    SET_SEARCHBAR_DROPDOWN,
  ])

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)

  const handleLogout = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const response = await logout()
    if (response) {
      navigate("/login")
      SET_PROFILE_DROPDOWN()
      SET_SEARCHBAR_DROPDOWN()
    } else {
      setIsSubmitting(false)
    }
  }

  return (
    <nav
      className={`h-16 px-4 fixed top-0 z-30 flex items-center w-full border-b bg-white dark:bg-black border-gray-300 dark:border-gray-800 transition-all duration-200 ease-in-out`}
    >
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        {/* Left Section */}
        <div className="flex items-center">
          <LogoLink />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/GA17010/project-admin"
            target="_blank"
            rel="noreferrer"
            className="text-dark flex rounded-md"
          >
            <GithubOutlined className="size-5" />
          </a>

          <NotificationDD />

          {/* Profile dropdown */}
          <div ref={userProfileMenu} className="relative inline-block">
            <button
              onClick={SET_PROFILE_DROPDOWN}
              className="rounded-md hover:bg-gray-300 dark:hover:bg-tasksync-dark px-2 cursor-pointer"
            >
              <div className="flex justify-center items-center">
                {user ? (
                  <>
                    <div className="mr-0 py-1 md:pr-2">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={avatarUrl}
                        alt="Julia"
                        width={32}
                        height={32}
                      />
                    </div>
                    <h6 className="text-medium mb-0 hidden md:block">
                      {user?.name}
                    </h6>
                  </>
                ) : (
                  <>
                    <div
                      role="status"
                      className="flex items-center justify-center animate-pulse gap-2"
                    >
                      <div className="h-8 w-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      <div className="h-8 w-20 bg-gray-200 rounded-sm dark:bg-gray-700"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                )}
              </div>
            </button>

            {/* Dropdown Profile */}
            <div
              className={`w-72 absolute right-0 top-full origin-bottom z-10 overflow-auto rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-900 lg:shadow-lg shadow-sm focus:outline-none transition-all duration-200 ease-in-out ${
                Profile_dropdown
                  ? "scale-100 origin-top-right opacity-100"
                  : "scale-0 origin-top-right opacity-0"
              }`}
            >
              {user && (
                <ProfileDD
                  user={user}
                  isSubmitting={isSubmitting}
                  onClick={handleLogout}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
