import React from 'react'
import { DateTime } from 'luxon'
import { DATE_FORMAT } from '../../utils'
import { useSelector } from 'react-redux'
import { activeMonthSelector } from '../../ducks/calendar'
import { activeEventsDaySelector } from '../../ducks/events'
import { Event, EventWrap, Round, StyledCell, StyledLink, Text } from './StyledCalendarComponents'
import { Tooltip } from '@material-ui/core'

interface Props {
  day: DateTime
}

export default function CalendarCell({ day }: Props) {
  const activeMonth = useSelector(activeMonthSelector)
  const formattedDay = day.toFormat(DATE_FORMAT)
  const events = useSelector((state) => activeEventsDaySelector(state, { day: formattedDay }))

  const isToday = formattedDay === DateTime.local().toFormat(DATE_FORMAT)
  const isOutOfMonth = day.month !== activeMonth

  return (
    <StyledCell>
      <Tooltip title={day.toLocaleString(DateTime.DATE_FULL)}>
        <StyledLink $isOutOfMonth={isOutOfMonth} $isToday={isToday} to={`/day/${formattedDay}`}>
          <span>{day.day}</span>
          {Boolean(events.length) && (
            <EventWrap>
              {events.map((event) => (
                <Event key={event.id}>
                  <Round />
                  <Text>{event.title}</Text>
                </Event>
              ))}
            </EventWrap>
          )}
        </StyledLink>
      </Tooltip>
    </StyledCell>
  )
}
