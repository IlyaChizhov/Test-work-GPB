import { DateTime } from 'luxon'

export function convertDateToTime(date: DateTime = DateTime.local()): string {
  return `${date.hour}:${date.minute}`
}
