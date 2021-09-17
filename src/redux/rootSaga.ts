import { all } from 'redux-saga/effects'
import { saga as calendarSaga } from '../ducks/calendar'

export default function* rootSaga() {
  yield all([calendarSaga()])
}
