import { DateTime } from 'luxon'
import { DATE_FORMAT } from './constants'

export const convertToTime = (date: string) => {
  return DateTime.fromISO(date).toFormat('HH:mm')
}

export const getInitialDate = (day: string, endTime?: boolean) => {
  const date = DateTime.fromFormat(day, DATE_FORMAT)
  const { hour, minute } = DateTime.local()

  if (endTime) return date.set({ hour: hour + 1, minute }).toISO()

  return date.set({ hour, minute }).toISO()
}
