import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { eventsDaySelector } from '../../ducks/events'
import { useParams } from 'react-router'
import { convertToTime } from '../../utils'
import styled from 'styled-components'
import { primaryColor } from '../../styles/variables'

const EventItem = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 16px;
`

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`

const Description = styled.div`
  color: gray;
`

const StyledButton = styled(Button)`
  text-transform: none;
  color: ${primaryColor};
`

export default function EventList() {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { day } = useParams<{ day: string }>()

  const events = useSelector((state) => eventsDaySelector(state, { day }))

  const sortedEvents = events.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1
    return 1
  })

  const handleEdit = (id: string) => () => {
    history.push(`${url}/event/${id}/edit`)
  }

  const handleDelete = (id: string) => () => {
    history.push(`${url}/event/${id}/delete`)
  }

  return (
    <div>
      {sortedEvents.map((event) => (
        <EventItem key={event.id}>
          <div>
            <Title>{event.title}</Title>
            <Description>
              {convertToTime(event.startTime)} до {convertToTime(event.endTime)}{' '}
              {event.expired ? '(просрочена)' : null}
            </Description>
          </div>

          <div>
            <StyledButton onClick={handleEdit(event.id)} variant="text">
              Редактировать
            </StyledButton>
            <StyledButton onClick={handleDelete(event.id)} variant="text">
              Удалить
            </StyledButton>
          </div>
        </EventItem>
      ))}
    </div>
  )
}
