import { useCustomizerStore } from "@/stores/useCustomerStore"
import { useNotificationStore } from "@/stores/useNotificationStore"
import { BellOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { useEffect, useRef } from "react"
import ListNotificationDD from "./ListNotificationDD"

export default function NotificationDD() {
  const { Notification_dropdown, SET_NOTIFICATION_DROPDOWN } =
    useCustomizerStore()

  const { COUNT_UNREAD_NOTIFICATIONS, SET_IS_READ_ALL } = useNotificationStore()

  const notificationMenu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        notificationMenu.current &&
        !notificationMenu.current.contains(target) &&
        Notification_dropdown
      ) {
        SET_NOTIFICATION_DROPDOWN()
      }
    }

    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [Notification_dropdown, SET_NOTIFICATION_DROPDOWN])

  return (
    <div ref={notificationMenu} className="sm:relative inline-block">
      <button
        type="button"
        className="cursor-pointer ml-2 rounded-md border border-transparent p-2.5 text-sm text-slate-900 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
        onClick={SET_NOTIFICATION_DROPDOWN}
      >
        <div className="relative">
          <BellOutlined className="text-xl" />
          <span className="absolute top-0.5 right-0.5 z-10 grid min-h-[15px] min-w-[15px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 px-1 text-xs text-white">
            {COUNT_UNREAD_NOTIFICATIONS}
          </span>
        </div>
      </button>

      <div
        id="notification-dropdown"
        className={`absolute right-0 top-full origin-[80%_0%] sm:flex-col sm:w-96 w-full flex justify-center ${
          Notification_dropdown
            ? "scale-100 sm:origin-top-right opacity-100 transition-all duration-200 ease-out"
            : "scale-0 sm:origin-top-right opacity-0 transition-all duration-200 ease-in"
        }`}
      >
        <div className="w-[90dvw] sm:w-96 max-h-[50vh] sm:max-h-[340px] flex flex-col overflow-hidden rounded-lg bg-white pt-1 shadow-lg focus:outline-none">
          {/* Header */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h6 className="text-base mb-0">Notifications</h6>
              <div className="relative group">
                <button
                  className="cursor-pointer text-base flex"
                  onClick={SET_IS_READ_ALL}
                >
                  <CheckCircleOutlined className="text-xl text-green-600" />
                </button>
                <div className="absolute right-0 top-full mt-1 z-20 whitespace-nowrap rounded-lg bg-gray-700 py-1.5 px-2.5 text-xs text-white opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <span>Mark all as read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <span className="flex w-full bg-gray-300 h-[1px]"></span>

          {/* List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden hover:overflow-y-auto">
            <ListNotificationDD />
          </div>

          {/* Footer */}
          <div className="flex flex-col justify-center h-10 text-center">
            <span className="flex w-full bg-gray-300 h-[1px]"></span>
            <button className="cursor-pointer text-blue-600 h-full text-sm">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
