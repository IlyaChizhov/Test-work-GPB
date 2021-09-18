import { CalendarEvent } from '../utils/types'
import { set, values } from 'idb-keyval'

export default {
  getAllEvents: () => {
    return values()
  },
  saveEvent: (event: CalendarEvent) => {
    return set(event.id, event)
  },
  updateEvent: (id: string, patch: Partial<CalendarEvent>) => {},
  deleteEvent: (id: string) => {},
  getEventsForDay: (day: string) => {},
}
