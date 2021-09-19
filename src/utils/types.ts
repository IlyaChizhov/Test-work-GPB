export interface CalendarEvent {
  id: string
  title: string
  startTime: string
  endTime: string
  remindTime: number
  day: string
  createdAt: string
  expired?: boolean
}

export type DateTypes = 'year' | 'month'
