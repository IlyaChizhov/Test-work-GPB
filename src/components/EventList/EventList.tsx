import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'

const mockEvents = [
  {
    id: '36909f00-1884-11ec-9ef3-e326e4ebefc8',
    title: 'Новая задача',
    startTime: '16:27',
    endTime: '17:27',
    remindTime: 5,
    day: '2021-09-01',
  },
  {
    id: '36909f00-1884-11ec-9ef3-e326e4ebefc8',
    title: 'Новая задача2',
    startTime: '16:27',
    endTime: '17:28',
    remindTime: '60',
    day: '2021-09-01',
  },
]

export default function EventList() {
  const history = useHistory()
  const { url } = useRouteMatch()

  const handleEdit = (id: string) => () => {
    history.push(`${url}/event/${id}/edit`)
  }

  const handleDelete = (id: string) => () => {
    history.push(`${url}/event/${id}/delete`)
  }

  return (
    <div>
      {mockEvents.map((event) => (
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
