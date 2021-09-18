import React, { useMemo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { activeMonthSelector, activeYearSelector } from '../../ducks/calendar'
import { getCalendarRows } from '../../utils'
import { DateTime } from 'luxon'
import { DAYS_IN_WEEK } from '../../utils'
import CalendarCell from './CalendarCell'

// Info.weekdays('short', { locale: 'en-US' }).map(str => str.substring(0, 2))
const daysOfWeek = Array.from({ length: DAYS_IN_WEEK }, (_, index) =>
  DateTime.local({ locale: 'en-US' }).set({ weekday: index }).weekdayShort.substring(0, 2)
)

export default function CalendarTable() {
  const activeMonth = useSelector(activeMonthSelector)
  const activeYear = useSelector(activeYearSelector)

  const rows = useMemo(() => getCalendarRows(activeMonth, activeYear), [activeMonth, activeYear])

  return (
    <TableContainer component={'div'}>
      <Table>
        <TableHead>
          <TableRow>
            {daysOfWeek.map((day) => (
              <TableCell key={day}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`${row[0]?.toISO()}-${index}`}>
              {row.map((day) => (
                <CalendarCell key={day.toISO()} day={day} />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
