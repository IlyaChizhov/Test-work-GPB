import React from 'react'
import { Button, IconButton, Modal, Paper, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { Close } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../../ducks/events'

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledPaper = styled(Paper)`
  width: 60vw;
  height: 60vh;
  margin: auto;
  position: relative;
  outline: none;
  padding: 25px 16px;
  display: flex;
  flex-direction: column;
`

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 5px;
  top: 5px;
`

const ButtonGroup = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 16px;
  }
`

const Title = styled(Typography)`
  margin-bottom: 14px;
`

export default function DeleteEvent() {
  const history = useHistory()
  const { day, eventId } = useParams<{ day: string; eventId: string }>()
  const dispatch = useDispatch()

  const closeModal = () => {
    history.push(`/day/${day}`)
  }

  const submit = () => {
    dispatch(deleteEvent(eventId))
    closeModal()
  }

  return (
    <StyledModal open={true} onClose={closeModal}>
      <StyledPaper>
        <CloseButton onClick={closeModal}>
          <Close />
        </CloseButton>

        <Title variant="h4">Удалить это событие?</Title>

        <ButtonGroup>
          <Button onClick={closeModal} variant="contained">
            отменить
          </Button>
          <Button onClick={submit} color="primary" variant="contained">
            Удалить
          </Button>
        </ButtonGroup>
      </StyledPaper>
    </StyledModal>
  )
}
