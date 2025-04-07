import useravatar from "@/assets/images/users/avatar-1.avif"
import { useCustomizerStore } from "@/stores/useCustomerStore"
import { GithubOutlined, SearchOutlined } from "@ant-design/icons"
import { useEffect, useRef } from "react"
import LogoLink from "../logo/LogoLink"
import NotificationDD from "./NotificationDD"
import ProfileDD from "./ProfileDD"
import SearchBarPanel from "./SearchBarPanel"

export default function NavbarHeader() {
  const {
    Profile_dropdown,
    SearchBar_dropdown,
    SET_PROFILE_DROPDOWN,
    SET_SEARCHBAR_DROPDOWN,
  } = useCustomizerStore()

  const userProfileMenu = useRef<HTMLDivElement>(null)
  const searchBar = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

  return (
    <nav
      className={`h-16 px-4 fixed top-0 z-30 flex items-center w-full bg-white border-b border-gray-300 transition-all duration-200 ease-in-out`}
    >
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        {/* Left Section */}
        <div className="flex items-center">
          <LogoLink />
          {/* Search mobile */}
          <div ref={searchBar} className="lg:hidden relative inline-block">
            <button
              onClick={SET_SEARCHBAR_DROPDOWN}
              className="lg:hidden ml-1 p-2 text-center rounded-sm bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-white"
            >
              <SearchOutlined className="text-base flex items-center" />
            </button>
            {SearchBar_dropdown && (
              <div className="absolute w-60 left-0 pt-0.5 top-full origin-bottom z-10">
                <SearchBarPanel />
              </div>
            )}
          </div>
          {/* Search Desktop */}
          <div className="pl-4 w-60 hidden lg:block">
            <SearchBarPanel />
          </div>
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
              className="rounded-md hover:bg-gray-300 px-2"
            >
              <div className="flex align-center items-center">
                <div className="mr-0 py-1 md:pr-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={useravatar}
                    alt="Julia"
                    width="32"
                    height="32"
                  />
                </div>
                <h6 className="text-medium mb-0 hidden md:block">JWT User</h6>
              </div>
            </button>
            <div
              className={`w-72 absolute right-0 top-full origin-bottom z-10 overflow-auto rounded-lg border border-slate-200 bg-white lg:shadow-lg shadow-sm focus:outline-none ${
                Profile_dropdown
                  ? "scale-100 origin-top-right opacity-100 transition-all duration-300 ease-out"
                  : "scale-0 origin-top-right opacity-0 transition-all duration-300 ease-in"
              }`}
            >
              <ProfileDD />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
