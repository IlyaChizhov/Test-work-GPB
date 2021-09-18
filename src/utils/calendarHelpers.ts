import { DateTime } from 'luxon'
import { CELLS_IN_CALENDAR, DAYS_IN_WEEK, ROWS_IN_CALENDAR } from './constants'

function getDaysInMonth(month: number, year: number): DateTime[] {
  let date = DateTime.local(year, month, 1)
  const days = []

  while (date.get('month') === month) {
    days.push(date)
    date = DateTime.fromJSDate(date.plus({ days: 1 }).toJSDate())
  }

  return days
}

function getDaysInPreviousMonth(month: number, year: number, dayOfWeek: number): DateTime[] {
  const days = getDaysInMonth(month - 1, year)

  return days.slice(days.length - dayOfWeek)
}

function getDaysForCalendar(month: number, year: number): DateTime[] {
  const daysInCurrentMonth = getDaysInMonth(month, year)
  const daysInPrevMonth = getDaysInPreviousMonth(month, year, daysInCurrentMonth[0].weekday)
  const getDaysInNextMonth = getDaysInMonth(month + 1, year)

  return [...daysInPrevMonth, ...daysInCurrentMonth, ...getDaysInNextMonth].slice(
    0,
    CELLS_IN_CALENDAR
  )
}

export function getCalendarRows(month: number, year: number): DateTime[][] {
  const days = getDaysForCalendar(month, year)

  return Array.from({ length: ROWS_IN_CALENDAR }, (_, index) => {
    const start = index * DAYS_IN_WEEK
    const end = start + DAYS_IN_WEEK

    return days.slice(start, end)
  })
}
