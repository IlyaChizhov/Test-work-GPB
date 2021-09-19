import React from 'react'
import { useSelector } from 'react-redux'
import { notificationsSelector } from '../../ducks/notifications'
import NotificationSuccess from './NotificationSuccess'
import styled from 'styled-components'
import NotificationInfo from './NotificationInfo'
import NotificationError from './NotificationError'

const Wrap = styled.div`
  position: fixed;
  width: 350px;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  font-size: 17px;
  z-index: 100000;
  padding: 16px;
`

const notificationsLookup = {
  success: NotificationSuccess,
  error: NotificationError,
  notification: NotificationInfo,
}

export default function Notifications() {
  const notificationMap = useSelector(notificationsSelector)

  if (!Object.keys(notificationMap).length) return null

  return (
    <Wrap>
      {Object.values(notificationMap).map((notification) => {
        const Notification = notificationsLookup[notification.status]

        return <Notification key={notification.id} notification={notification} />
      })}
    </Wrap>
  )
}
