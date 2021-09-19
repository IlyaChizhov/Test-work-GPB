import React from 'react'
import { Notification } from '../../ducks/notifications'
import styled from 'styled-components'
import { Close, ErrorOutline } from '@material-ui/icons'
import useNotification from './useNotification'
import { CloseButton, StyledPaper, Message } from './StyledComponents'

const Description = styled.div`
  font-size: 14px;
  color: #575555;
`

const Icon = styled(ErrorOutline)`
  color: red;
  margin-right: 12px;
`

export default function NotificationError({ notification }: { notification: Notification }) {
  const { handleDelete } = useNotification(notification)

  return (
    <StyledPaper>
      <Message>
        <Icon />
        {notification.message}
      </Message>
      <Description>{notification.description}</Description>
      <CloseButton onClick={handleDelete}>
        <Close />
      </CloseButton>
    </StyledPaper>
  )
}
