import { DateTime } from 'luxon'

export const convertToTime = (date: string) => {
  return DateTime.fromISO(date).toFormat('HH:mm')
}
