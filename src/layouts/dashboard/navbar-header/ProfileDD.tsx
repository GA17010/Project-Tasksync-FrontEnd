import { useUIStore } from "@/stores/uiStore"
import { User } from "@/types"
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
import React from "react"

interface ProfileDDProps {
  user: User
  isSubmitting: boolean
  onClick: () => void
}

function ProfileDD({ user, isSubmitting, onClick }: ProfileDDProps) {
  const [tab, setTab] = React.useState<string>("profile")

  const { userAvatarSmall } = useUIStore()

  const profileItems = [
    { slug: "edit-profile", icon: <EditOutlined />, text: "Edit Profile" },
    { slug: "view-profile", icon: <UserOutlined />, text: "View Profile" },
    {
      slug: "social-profile",
      icon: <ProfileOutlined />,
      text: "Social Profile",
    },
    { slug: "billing", icon: <WalletOutlined />, text: "Billing" },
  ]

  const settingItems = [
    { slug: "support", icon: <QuestionCircleOutlined />, text: "Support" },
    {
      slug: "account-settings",
      icon: <UserOutlined />,
      text: "Account settings",
    },
    { slug: "privacy-center", icon: <LockOutlined />, text: "Privacy center" },
    { slug: "feedback", icon: <CommentOutlined />, text: "Feedback" },
    { slug: "history", icon: <UnorderedListOutlined />, text: "History" },
  ]

  const avatarUrl =
    user.icon && userAvatarSmall[user.icon]
      ? userAvatarSmall[user.icon]
      : userAvatarSmall["avatar-00"]

  return (
    <div>
      <div className="p-5 flex items-center">
        <img
          className="w-10 h-10 rounded-full mx-1 object-cover"
          src={avatarUrl}
          alt="Julia"
          width={40}
          height={40}
        />
        <div className="pl-4 flex flex-col text-left">
          <span className="text-sm font-medium mb-0 sm:block none">
            {user.name}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            @{user.nickname}
          </span>
        </div>
        <div className="ml-auto">
          <button
            type="button"
            className="rounded size-12 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer"
            disabled={isSubmitting}
            onClick={onClick}
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
            type="button"
            onClick={() => {
              setTab("profile")
            }}
            className={`flex-1 p-3 text-center border-b-2 transition-all duration-300 cursor-pointer ${
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
            type="button"
            onClick={() => {
              setTab("setting")
            }}
            className={`flex-1 p-3 border-b-2 transition-all duration-300 cursor-pointer ${
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
              {profileItems.map((item) => (
                <li
                  key={item.slug}
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
                onClick={onClick}
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
              {settingItems.map((item) => (
                <li
                  key={item.slug}
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
