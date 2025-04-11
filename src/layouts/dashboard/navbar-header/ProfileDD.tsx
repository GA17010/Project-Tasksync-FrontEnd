import useravatar from "@/assets/images/users/avatar-1.avif"
import { useAuthStore } from "@/stores/authStore"
import * as React from "react"

import {
  CommentOutlined,
  EditOutlined,
  LockOutlined,
  LogoutOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router"

const ProfileDD = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [tab, setTab] = React.useState<string>("profile")
  const navigate = useNavigate()

  const authStore = useAuthStore()

  const Logout = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const response = await authStore.logout()
    if (response) {
      navigate("/login")
    } else {
      setIsSubmitting(false)
    }
  }

  const profileItems = [
    { icon: <EditOutlined />, text: "Edit Profile" },
    { icon: <UserOutlined />, text: "View Profile" },
    { icon: <ProfileOutlined />, text: "Social Profile" },
    { icon: <WalletOutlined />, text: "Billing" },
  ]

  const settingItems = [
    { icon: <QuestionCircleOutlined />, text: "Support" },
    { icon: <UserOutlined />, text: "Account settings" },
    { icon: <LockOutlined />, text: "Privacy center" },
    { icon: <CommentOutlined />, text: "Feedback" },
    { icon: <UnorderedListOutlined />, text: "History" },
  ]

  return (
    <div>
      <div className="p-5 flex items-center">
        <img
          className="w-10 h-10 rounded-full mx-1"
          src={useravatar}
          alt="Julia"
          width="40"
          height="40"
        />
        <div className="pl-4 flex flex-col text-left">
          <span className="text-sm font-medium mb-0 sm:block none">
            JWT User
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            UI/UX Designer
          </span>
        </div>
        <div className="ml-auto">
          <button
            className="rounded size-12 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-800"
            disabled={isSubmitting}
            onClick={Logout}
          >
            <LogoutOutlined className="flex size-5 text-xl text-tasksync-primary" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-md mx-auto">
        <div className="flex border-b border-gray-200 dark:border-gray-600">
          {/* Button Profile */}
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 p-3 text-center border-b-2 transition-all duration-300 ${
              tab === "profile"
                ? "border-tasksync-primary text-tasksync-primary active:bg-blue-100 dark:active:bg-gray-800"
                : "border-transparent text-gray-800 dark:text-gray-400 active:bg-gray-100 dark:active:bg-gray-800"
            }`}
          >
            <div className="flex justify-center items-center">
              <UserOutlined className="mr-2" /> Profile
            </div>
          </button>

          {/* Button Settings */}
          <button
            onClick={() => setTab("setting")}
            className={`flex-1 p-3 border-b-2 transition-all duration-300 ${
              tab === "setting"
                ? "border-tasksync-primary text-tasksync-primary active:bg-blue-200 dark:active:bg-gray-800"
                : "border-transparent text-gray-800 dark:text-gray-400 active:bg-gray-200 dark:active:bg-gray-800"
            }`}
          >
            <div className="flex justify-center items-center">
              <SettingOutlined className="mr-2" />
              Setting
            </div>
          </button>
        </div>

        <div className="w-full relative overflow-hidden h-[220px]">
          {/* Profile Tab */}
          <div
            className={`absolute w-full transition-all duration-300 ease-in-out ${
              tab === "profile"
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <ul>
              {profileItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-300"
                >
                  <div className="mr-4 text-gray-500 dark:text-gray-300">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
              <li
                className="flex items-center px-4 py-3 text-sm hover:bg-red-100 dark:hover:bg-red-300/10 text-tasksync-danger cursor-pointer transition-all duration-300"
                aria-disabled={isSubmitting}
                onClick={Logout}
              >
                <LogoutOutlined className="mr-4" />
                <span>Logout</span>
              </li>
            </ul>
          </div>

          {/* Setting Tab */}
          <div
            className={`absolute w-full transition-all duration-300 ease-in-out ${
              tab === "setting"
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <ul>
              {settingItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-300"
                >
                  <div className="mr-4 text-gray-500 dark:text-gray-300">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDD
