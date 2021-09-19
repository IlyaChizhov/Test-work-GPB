import React from 'react'
import { Notification } from '../../ducks/notifications'
import styled from 'styled-components'
import { Close } from '@material-ui/icons'
import useNotification from './useNotification'
import { CloseButton, StyledPaper, Message } from './StyledComponents'

const Description = styled.div`
  font-size: 14px;
  color: #575555;
`

export default function NotificationInfo({ notification }: { notification: Notification }) {
  const { handleDelete } = useNotification(notification)

  return (
    <StyledPaper>
      <div>
        <Message>{notification.message}</Message>
        <Description>{notification.description}</Description>
      </div>
      <CloseButton onClick={handleDelete}>
        <Close />
      </CloseButton>
    </StyledPaper>
  )
}
