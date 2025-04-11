import {
  GiftOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons"

interface IconNotificationDDProps {
  category: "reminder" | "interaction" | "system" | "invitation"
  mainMessage: string
}

const categoryConfig = {
  reminder: { bg: "bg-green-100", text: "text-green-600", icon: GiftOutlined },
  interaction: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    icon: MessageOutlined,
  },
  system: { bg: "bg-red-100", text: "text-red-600", icon: SettingOutlined },
  // invitation: { bg: "", text: "", icon: "" },
}

const IconNotificationDD = ({
  category,
  mainMessage,
}: IconNotificationDDProps) => {
  const isInvitation = category === "invitation"
  const config = categoryConfig[category as keyof typeof categoryConfig]

  return (
    <>
      {!isInvitation ? (
        <span
          className={`mr-3 p-2 flex rounded-full ${config.bg} ${config.text}`}
        >
          <config.icon />
        </span>
      ) : (
        <span className="text-blue-600 mr-3 flex px-2.5 py-1 rounded-full bg-blue-100">
          {mainMessage.charAt(0)}
        </span>
      )}
    </>
  )
}

export default IconNotificationDD
