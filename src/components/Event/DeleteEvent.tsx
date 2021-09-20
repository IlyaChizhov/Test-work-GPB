import React from 'react'
import { Button, Paper } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { Close } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { ButtonGroup, CloseButton, StyledModal, Title } from './StyledEditorComponents'

const StyledPaper = styled(Paper)`
  width: 500px;
  height: 300px;
  margin: auto;
  position: relative;
  outline: none;
  padding: 25px 16px;
  display: flex;
  flex-direction: column;
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

        <Title variant="h5">Удалить это событие?</Title>

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
