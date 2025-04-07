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
}

const IconNotificationDD = ({
  category,
  mainMessage,
}: IconNotificationDDProps) => {
  const isInvitation = category === "invitation"
  const config = categoryConfig[category]

  return (
    <>
      {!isInvitation ? (
        <span className={`mr-3 p-2 flex rounded-full ${config.bg}`}>
          <config.icon className={config.text} />
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
