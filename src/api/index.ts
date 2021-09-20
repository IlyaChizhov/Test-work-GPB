import { CalendarEvent } from '../utils'
import { set, values, del } from 'idb-keyval'

const api = {
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

export default api
