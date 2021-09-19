import React from 'react'
import { Notification } from '../../ducks/notifications'
import styled from 'styled-components'
import { CheckCircle, Close } from '@material-ui/icons'
import useNotification from './useNotification'
import { CloseButton, Message, StyledPaper } from './StyledComponents'

const Icon = styled(CheckCircle)`
  color: green;
  margin-right: 12px;
`

export default function NotificationSuccess({ notification }: { notification: Notification }) {
  const { handleDelete } = useNotification(notification)

  return (
    <StyledPaper>
      <Icon />
      <Message>{notification.message}</Message>

      <CloseButton onClick={handleDelete}>
        <Close />
      </CloseButton>
    </StyledPaper>
  )
}
