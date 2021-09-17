import React from 'react'
import { useSelector } from 'react-redux'
import { activeMonthSelector, activeYearSelector } from '../../ducks/calendar'
import { getDaysForCalendar } from '../../utils'

export default function Calendar() {
  const activeMonth = useSelector(activeMonthSelector)
  const activeYear = useSelector(activeYearSelector)

  const days = getDaysForCalendar(activeMonth, activeYear)

  console.log(days, 'days')

  return <div></div>
}
