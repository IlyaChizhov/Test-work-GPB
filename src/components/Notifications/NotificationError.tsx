import React from 'react'
import { Notification } from '../../ducks/notifications'
import styled from 'styled-components'
import { Close, ErrorOutline } from '@material-ui/icons'
import useNotification from './useNotification'
import { CloseButton, StyledPaper, Message } from './StyledComponents'
import { grayText } from '../../styles/variables'

const Description = styled.div`
  font-size: 14px;
  color: ${grayText};
`

const Icon = styled(ErrorOutline)`
  color: red;
  margin-right: 12px;
`

export default function NotificationError({ notification }: { notification: Notification }) {
  const { handleDelete } = useNotification(notification)

  return (
    <StyledPaper>
      <div>
        <Message>
          <Icon />
          {notification.message}
        </Message>
        <Description>{notification.description}</Description>
      </div>

      <CloseButton onClick={handleDelete}>
        <Close />
      </CloseButton>
    </StyledPaper>
  )
}
