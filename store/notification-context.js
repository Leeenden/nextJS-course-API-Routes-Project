import { createContext, useState, useEffect } from "react"

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function () {},
})

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState()

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null)
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [activeNotification])

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData)
  }

  function hideNotifcationHandler() {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotifcationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
