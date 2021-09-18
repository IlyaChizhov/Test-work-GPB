import { CalendarEvent } from '../utils/types'

export default {
  saveEvent: (event: CalendarEvent) => {},
  updateEvent: (id: number, path: Partial<CalendarEvent>) => {},
  deleteEvent: (id: number) => {},
  getEventsForDay: (day: string) => {},
}
