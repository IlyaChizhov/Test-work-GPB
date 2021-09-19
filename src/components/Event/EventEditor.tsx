import React, { useState } from 'react'
import { Button, IconButton, Modal, Paper, Select, TextField, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { Close } from '@material-ui/icons'
import { v1 } from 'uuid'
import { convertDateToTime } from '../../utils/dateHelpers'
import { DateTime } from 'luxon'
import { CalendarEvent } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { eventsIdSelector, saveEvent, updateEvent } from '../../ducks/events'

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledPaper = styled(Paper)`
  width: 80vw;
  height: 90vh;
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

const StyledField = styled(TextField)`
  margin-bottom: 16px;
  max-width: 400px;
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

const remindsInterval = [5, 15, 30, 60]

const initialEvent = {
  id: '',
  title: 'Новая задача',
  startTime: convertDateToTime(),
  endTime: convertDateToTime(DateTime.local().plus({ hours: 1 })),
  remindTime: remindsInterval[0],
  day: '',
  createdAt: '',
}

interface Props {
  type: 'new' | 'edit'
  event?: CalendarEvent
}

export default function EventEditor({ type = 'new' }: Props) {
  const history = useHistory()
  const { day, eventId } = useParams<{ day: string; eventId: string }>()
  const dispatch = useDispatch()

  const isNew = type === 'new'

  const loadedEvent = useSelector((state) => eventsIdSelector(state, { eventId }))

  const [event, changeEvent] = useState<CalendarEvent>(type === 'new' ? initialEvent : loadedEvent)

  const closeModal = () => {
    history.push(`/day/${day}`)
  }

  const handleChange = (type: string) => (event: any) => {
    changeEvent((state) => ({ ...state, [type]: event.target.value }))
  }

  const submit = () => {
    if (isNew) {
      dispatch(saveEvent({ ...event, id: v1(), createdAt: DateTime.local().toISO() }))
    } else {
      dispatch(updateEvent(event))
    }

    closeModal()
  }

  return (
    <StyledModal open={true} onClose={closeModal}>
      <StyledPaper>
        <CloseButton onClick={closeModal}>
          <Close />
        </CloseButton>

        <Title variant="h5">{isNew ? 'Добавьте новое событие' : 'Измените событие'}</Title>

        <StyledField
          required
          value={event['title']}
          label="Название события"
          variant="outlined"
          onChange={handleChange('title')}
        />
        <StyledField
          required
          type="time"
          value={event['startTime']}
          label="Начало события"
          variant="outlined"
          onChange={handleChange('startTime')}
        />
        <StyledField
          required
          type="time"
          value={event['endTime']}
          label="Окончание события"
          variant="outlined"
          onChange={handleChange('endTime')}
        />
        <Select
          native
          required
          variant="outlined"
          onChange={handleChange('remindTime')}
          value={event['remindTime']}
        >
          {remindsInterval.map((interval) => (
            <option key={interval} value={interval}>
              {interval} минут
            </option>
          ))}
        </Select>

        <ButtonGroup>
          <Button onClick={closeModal} variant="contained">
            отменить
          </Button>
          <Button onClick={submit} color="primary" variant="contained">
            сохранить
          </Button>
        </ButtonGroup>
      </StyledPaper>
    </StyledModal>
  )
}
