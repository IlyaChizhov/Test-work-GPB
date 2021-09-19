import React, { useEffect, useMemo, useState } from 'react'
import { Button, IconButton, Modal, Paper, Select, TextField, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { Close } from '@material-ui/icons'
import { v1 } from 'uuid'
import { DateTime } from 'luxon'
import { CalendarEvent, DATE_FORMAT } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { eventsIdSelector, saveEvent, updateEvent } from '../../ducks/events'
import { convertToTime, getInitialDate } from '../../utils/dateHelpers'

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

export const remindsInterval = [5, 15, 30, 60]

const getInitialState = (day: string) => ({
  id: '',
  title: 'Новая задача',
  startTime: getInitialDate(day),
  endTime: getInitialDate(day, true),
  remindTime: remindsInterval[0],
  day: '',
  createdAt: DateTime.local().toISO(),
})

interface Props {
  type: 'new' | 'edit'
  event?: CalendarEvent
}

export default function EventEditor({ type = 'new' }: Props) {
  const { day, eventId } = useParams<{ day: string; eventId: string }>()
  const history = useHistory()
  const dispatch = useDispatch()

  const loadedEvent = useSelector((state) => eventsIdSelector(state, { eventId }))
  const isEmptyEvent = useMemo(() => !Object.keys(loadedEvent).length, [loadedEvent])

  const isNew = type === 'new'

  const [event, changeEvent] = useState<CalendarEvent>(
    type === 'new' || isEmptyEvent ? getInitialState(day) : loadedEvent
  )

  useEffect(() => {
    if (type === 'edit' && !isEmptyEvent) {
      changeEvent(loadedEvent)
    }
  }, [type, loadedEvent, isEmptyEvent])

  const closeModal = () => {
    history.push(`/day/${day}`)
  }

  const handleChange = (type: string, value: any) => {
    changeEvent((state) => ({ ...state, [type]: value }))
  }

  const handleTimeChange =
    (type: string) =>
    ({ target: { value } }: any) => {
      const date = DateTime.fromFormat(day, DATE_FORMAT)
      const { hour, minute } = DateTime.fromISO(value)
      const newDate = date.set({ hour, minute })

      handleChange(type, newDate.toISO())
    }

  const submit = () => {
    if (isNew) {
      dispatch(saveEvent({ ...event, day, id: v1(), createdAt: DateTime.local().toISO() }))
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
          onChange={({ target: { value } }) => handleChange('title', value)}
        />
        <StyledField
          required
          type="time"
          value={convertToTime(event['startTime'])}
          label="Начало события"
          variant="outlined"
          onChange={handleTimeChange('startTime')}
        />
        <StyledField
          required
          type="time"
          value={convertToTime(event['endTime'])}
          label="Окончание события"
          variant="outlined"
          onChange={handleTimeChange('endTime')}
        />
        <Select
          native
          required
          variant="outlined"
          onChange={({ target: { value } }) => handleChange('remindTime', value)}
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
