import { combineReducers } from 'redux'

import calendar from '../ducks/calendar'
import notifications from '../ducks/notifications'
import events from '../ducks/events'

export default combineReducers({
  calendar,
  notifications,
  events,
})
