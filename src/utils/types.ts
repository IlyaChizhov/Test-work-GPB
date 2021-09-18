export interface CalendarEvent {
  id: number
  title: string
  timeStart: number
  timeEnd: number
  remindTime: number
  day: string
}

export type DateTypes = 'year' | 'month'
