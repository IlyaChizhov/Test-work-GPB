import { combineReducers } from 'redux'

import calendar from '../ducks/calendar'
import notifications from '../ducks/notifications'

export default combineReducers({
  calendar,
  notifications,
})
