import React, { useMemo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { activeMonthSelector, activeYearSelector } from '../../ducks/calendar'
import { getCalendarRows } from '../../utils'
import { DateTime } from 'luxon'
import { DAYS_IN_WEEK } from '../../utils'
import CalendarCell from './CalendarCell'
import styled from 'styled-components'

const StyledRow = styled(TableRow)`
  border: none;
`

const StyledCell = styled(TableCell)`
  padding-bottom: 2px;
  text-align: right;
  border: none;
  font-size: 17px;
`

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
          <StyledRow>
            {daysOfWeek.map((day) => (
              <StyledCell key={day}>
                <div>{day}</div>
              </StyledCell>
            ))}
          </StyledRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledRow key={`${row[0]?.toISO()}-${index}`}>
              {row.map((day) => (
                <CalendarCell key={day.toISO()} day={day} />
              ))}
            </StyledRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
