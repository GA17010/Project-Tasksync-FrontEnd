import { useCustomizerStore } from "@/stores/useCustomerStore"
import { useNotificationStore } from "@/stores/useNotificationStore"
import {
  BellOutlined,
  CheckCircleOutlined,
  NotificationFilled,
} from "@ant-design/icons"
import React, { useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import ListNotificationDD from "./ListNotificationDD"

export default function NotificationDD() {
  const { Notification_dropdown, SET_NOTIFICATION_DROPDOWN } =
    useCustomizerStore()

  const {
    COUNT_UNREAD_NOTIFICATIONS,
    SET_IS_READ_ALL,
    Data_notification,
    fetchNotification,
  } = useNotificationStore()

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
    return () => {
      window.removeEventListener("click", handleClickOutside)
    }
  }, [Notification_dropdown, SET_NOTIFICATION_DROPDOWN])

  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  // const {  } = useNotificationStore()

  React.useEffect(() => {
    setIsLoading(true)
    fetchNotification()
      .catch(() => {
        toast.error("Error fetching notifications")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [fetchNotification])

  return (
    <div ref={notificationMenu} className="sm:relative inline-block">
      {/* Button Notification */}
      <button
        type="button"
        className="cursor-pointer rounded-lg border border-transparent p-2.5 text-sm  hover:bg-slate-100 dark:hover:bg-tasksync-dark focus:bg-slate-100 dark:focus:bg-tasksync-dark active:bg-slate-100 dark:active:bg-tasksync-dark"
        onClick={SET_NOTIFICATION_DROPDOWN}
      >
        <div className="relative">
          <BellOutlined className="text-xl" />
          <span className="absolute top-0.5 right-0.5 z-10 grid min-h-[15px] min-w-[15px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-tasksync-danger px-1 text-xs text-white">
            {COUNT_UNREAD_NOTIFICATIONS}
          </span>
        </div>
      </button>

      {/* Dropdown Notification */}
      <div
        id="notification-dropdown"
        className={`absolute right-0 top-full origin-[80%_0%] sm:flex-col sm:w-96 w-full flex justify-center transition-all duration-200 ease-out ${
          Notification_dropdown
            ? "scale-100 sm:origin-top-right opacity-100"
            : "scale-0 sm:origin-top-right opacity-0"
        }`}
      >
        <div className="w-[90dvw] sm:w-96 max-h-[50vh] sm:max-h-[340px] flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-950 pt-1 shadow-[0_0_0_2px_rgba(220,220,220,0.8)] dark:shadow-[0_0_0_2px_rgba(130,130,130,0.5)] focus:outline-none">
          {/* Header Notification */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h6 className="text-base mb-0">Notifications</h6>
              <div className="relative group">
                <button
                  type="button"
                  className="cursor-pointer text-base flex"
                  onClick={SET_IS_READ_ALL}
                >
                  <CheckCircleOutlined className="text-xl text-green-600" />
                </button>

                {/* Tooltip */}
                <div className="absolute right-0 top-full mt-1 z-20 whitespace-nowrap rounded-lg bg-tasksync-dark py-1.5 px-2.5 text-xs text-white  opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                  <span>Mark all as read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <span className="flex w-full bg-gray-300 dark:bg-tasksync-dark h-[1px]"></span>

          {isLoading ? (
            <div role="status" className="p-4">
              <div className="animate-pulse flex flex-col gap-3">
                <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded-md w-full"></div>
              </div>
            </div>
          ) : Data_notification.length === 0 ? (
            <div className="p-4 cursor-pointer hover:bg-gray-100 dark:bg-gray-900/90 dark:hover:bg-gray-800/70 rounded-b-2xl border border-gray-300 dark:border-gray-500">
              <div className="h-36 flex flex-col items-center justify-center gap-2">
                <NotificationFilled />
                <span>There are no notifications</span>
              </div>
            </div>
          ) : (
            <>
              {/* List */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden hover:overflow-y-auto">
                <ListNotificationDD />
              </div>

              {/* Footer */}
              <div className="flex flex-col justify-center h-10 text-center">
                <span className="flex w-full bg-gray-300 dark:bg-tasksync-dark h-[1px]"></span>
                <button
                  type="button"
                  className="cursor-pointer text-tasksync-primary h-full text-sm"
                >
                  View All
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
