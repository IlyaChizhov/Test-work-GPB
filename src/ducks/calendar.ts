import { select, take, all, call, put } from 'redux-saga/effects'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { ReduxStore } from '../redux/store'
import { DateTime } from 'luxon'
import { CalendarEvent, DATE_FORMAT, DateTypes } from '../utils'
import { activeEventsDaySelector, eventsDaySelector, eventsSelector, updateEvent } from './events'
import { eventChannel } from 'redux-saga'
import { addNotification } from './notifications'
import { v1 } from 'uuid'
import { convertToTime } from '../utils/dateHelpers'

const name = 'calendar'
const INTERVAL = 1000

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
  const channel = yield call(intervalChannel, INTERVAL)

  while (true) {
    yield take(channel)

    const events: CalendarEvent[] = yield select((state) =>
      activeEventsDaySelector(state, { day: DateTime.local().toFormat(DATE_FORMAT) })
    )

    const foundEvent = events.find((event) => {
      const { startTime, remindTime } = event
      const remindDate = DateTime.fromISO(startTime).minus({ minutes: remindTime })

      const { milliseconds } = remindDate.diff(DateTime.local()).toObject()

      if (milliseconds && milliseconds < INTERVAL) return event
    })

    if (foundEvent) {
      const { title, startTime, endTime } = foundEvent

      yield put(
        addNotification({
          id: v1(),
          message: 'Напоминание',
          status: 'notification',
          description: `У вас запланировано "${title}" c ${convertToTime(
            startTime
          )} до ${convertToTime(endTime)}`,
          hideTimeout: 60 * 1000,
        })
      )
      yield put(updateEvent({ ...foundEvent, expired: true }))
    }
  }
}

export function* saga() {
  yield all([calendarWatcherSaga()])
}
