import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { eventsIdSelector, saveEvent, updateEvent } from '../../ducks/events'
import { useEffect, useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import { v1 } from 'uuid'
import { getInitialDate } from '../../utils/dateHelpers'
import { remindsInterval } from './EventEditor'
import { CalendarEvent, DATE_FORMAT } from '../../utils'

const getInitialState = (day: string) => ({
  id: '',
  title: 'Новая задача',
  startTime: getInitialDate(day),
  endTime: getInitialDate(day, true),
  remindTime: remindsInterval[0],
  day: '',
  createdAt: DateTime.local().toISO(),
})

export default function useEventEditor(type: 'new' | 'edit') {
  const { day, eventId } = useParams<{ day: string; eventId: string }>()
  const history = useHistory()
  const dispatch = useDispatch()

  const loadedEvent = useSelector((state) => eventsIdSelector(state, { eventId }))
  const isEmptyEvent = useMemo(() => !Object.keys(loadedEvent).length, [loadedEvent])

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
    if (type === 'new') {
      dispatch(saveEvent({ ...event, day, id: v1(), createdAt: DateTime.local().toISO() }))
    } else {
      dispatch(updateEvent(event))
    }

    closeModal()
  }

  return { event, submit, handleTimeChange, closeModal, handleChange }
}
