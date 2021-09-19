import { CalendarEvent } from '../utils/types'
import { set, values, del } from 'idb-keyval'

export default {
  getAllEvents: () => {
    return values()
  },
  saveEvent: (event: CalendarEvent) => {
    return set(event.id, event)
  },
  deleteEvent: (id: string) => {
    return del(id)
  },
}
