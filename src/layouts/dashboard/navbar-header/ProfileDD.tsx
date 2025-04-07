import useravatar from "@/assets/images/users/avatar-1.avif"
import { useAuthStore } from "@/stores/authStore"
import { useState } from "react"

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

const ProfileDD = () => {
  const [tab, setTab] = useState<string>("profile")

  const authStore = useAuthStore()

  const Logout = async () => {
    try {
      await authStore.logout()
    } catch (error) {
      console.log(error)
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
          <span className="text-xs text-gray-600">UI/UX Designer</span>
        </div>
        <div className="ml-auto">
          <button
            className="rounded size-12 flex items-center justify-center hover:bg-blue-50"
            onClick={Logout}
          >
            <LogoutOutlined className="flex size-5 text-xl text-blue-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-md mx-auto">
        <div className="flex border-b">
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 p-3 text-center border-b-2 transition-all duration-300 ${
              tab === "profile"
                ? "border-blue-500 text-blue-500 active:bg-blue-100"
                : "border-transparent text-gray-800 active:bg-gray-100"
            }`}
          >
            <div className="flex justify-center items-center">
              <UserOutlined className="mr-2" /> Profile
            </div>
          </button>
          <button
            onClick={() => setTab("setting")}
            className={`flex-1 p-3 border-b-2 transition-all duration-300 ${
              tab === "setting"
                ? "border-blue-500 text-blue-500 active:bg-blue-200"
                : "border-transparent text-gray-800 active:bg-gray-200"
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
                  className="flex items-center px-4 py-3 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer transition-all duration-300"
                >
                  <div className="mr-4 text-gray-500">{item.icon}</div>
                  <span>{item.text}</span>
                </li>
              ))}
              <li
                className="flex items-center px-4 py-3 text-sm hover:bg-red-100 text-red-600 cursor-pointer transition-all duration-300"
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
                  className="flex items-center px-4 py-3 text-sm text-gray-900 hover:bg-gray-100 cursor-pointer transition-all duration-300"
                >
                  <div className="mr-4 text-gray-500">{item.icon}</div>
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
