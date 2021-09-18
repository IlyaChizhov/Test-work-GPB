import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { eventsSelector } from '../../ducks/events'

export default function EventList() {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { events } = useSelector(eventsSelector)

  const handleEdit = (id: string) => () => {
    history.push(`${url}/event/${id}/edit`)
  }

  const handleDelete = (id: string) => () => {
    history.push(`${url}/event/${id}/delete`)
  }

  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <div>
            <div>{event.title}</div>
            <div>
              {event.startTime} до {event.endTime}
            </div>
          </div>

          <div>
            <Button onClick={handleEdit(event.id)} variant="text">
              Редактировать
            </Button>
            <Button onClick={handleDelete(event.id)} variant="text">
              Удалить
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
