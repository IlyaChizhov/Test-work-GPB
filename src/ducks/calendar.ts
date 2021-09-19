import { select, take, all, call } from 'redux-saga/effects'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { ReduxStore } from '../redux/store'
import { DateTime } from 'luxon'
import { CalendarEvent, DATE_FORMAT, DateTypes } from '../utils'
import { eventsSelector } from './events'
import { eventChannel, END } from 'redux-saga'

const name = 'calendar'

export interface CalendarState {
  year: number
  month: number
}

const initialState: CalendarState = {
  year: DateTime.local().get('year'),
  month: DateTime.local().get('month'),
}

const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    changeActiveDate: (
      state: CalendarState,
      { payload }: PayloadAction<{ key: DateTypes; date: number }>
    ) => {
      state[payload.key] = payload.date
    },
    initCalendarWatcher: (state) => state,
  },
})

export default reducer

export const { changeActiveDate } = actions

/**
 * Selectors
 **/
export const sliceSelector = (state: ReduxStore): CalendarState => state[name]

export const activeYearSelector = createSelector(sliceSelector, (state) => state.year)
export const activeMonthSelector = createSelector(sliceSelector, (state) => state.month)

/**
 * Sagas
 **/

function intervalChannel(secs: number) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      emitter('')
    }, secs)

    return () => {
      clearInterval(iv)
    }
  })
}

export function* calendarWatcherSaga() {
  // @ts-ignore
  const channel = yield call(intervalChannel, 1000)
  while (true) {
    yield take(channel)

    const { events }: { events: CalendarEvent[] } = yield select(eventsSelector)

    const { day, startTime } = events?.[0]
    const t = DateTime.fromFormat(day, DATE_FORMAT)
    const time = DateTime.fromISO(startTime)

    const modified = t.set({ hour: time.hour, minute: time.minute })

    console.log(modified.toISO())

    const foundEvent = events.find((event) => {
      const { day } = event
      const t = DateTime.fromFormat(day, DATE_FORMAT)
    })
  }
}

export function* saga() {
  yield all([calendarWatcherSaga()])
}
