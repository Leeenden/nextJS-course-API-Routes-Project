import { createContext, useState } from "react"

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
})

export function NotificationContextProvider(props) {
  const [activeNotifcation, setActiveNotification] = useState()

  function showNotifcationHandler(notificationData) {
    setActiveNotification(notificationData)
  }

  function hideNotifcationHandler() {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotifcation,
    shiowNotifcation: showNotifcationHandler,
    hideNotification: hideNotifcationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
