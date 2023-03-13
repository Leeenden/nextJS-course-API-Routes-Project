import { Fragment, useContext } from "react"
import Notification from "../ui/notification"
import MainHeader from "./main-header"
import NotificationContext from "../../store/notification-context"

function Layout(props) {
  const notificationCtx = useContext(NotificationContext)

  const activeNotifcation = notificationCtx.notification

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotifcation && (
        <Notification
          title={activeNotifcation.title}
          message={activeNotifcation.message}
          status={activeNotifcation.status}
        />
      )}
    </Fragment>
  )
}

export default Layout
