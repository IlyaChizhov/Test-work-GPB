import { all } from 'redux-saga/effects'
import { saga as calendarSaga } from '../ducks/calendar'
import { saga as eventsSaga } from '../ducks/events'

export default function* rootSaga() {
  yield all([calendarSaga(), eventsSaga()])
}
