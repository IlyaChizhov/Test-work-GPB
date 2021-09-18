export interface CalendarEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  remindTime: number
  day: string
}

export type DateTypes = 'year' | 'month'
