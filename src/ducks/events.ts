import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { ReduxStore } from '../redux/store'
import { all, call, put, takeEvery, fork } from 'redux-saga/effects'
import { CalendarEvent } from '../utils'
import api from '../api'
import { propSelector } from '../redux/selectors'
import { addNotification, Notification } from './notifications'
import { v1 } from 'uuid'

const name = 'events'

const initialNotification = {
  id: v1(),
  status: 'success',
  description: '',
  hideTimeout: 2000,
}

interface EventsState {
  events: CalendarEvent[]
}

const initialState: EventsState = {
  events: [],
}

const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    loadEvents: (state) => state,
    eventsLoaded: (state, { payload }) => {
      state.events = payload
    },
    saveEvent: (state, { payload }) => state,
    updateEvent: (state, { payload }) => state,
    deleteEvent: (state, { payload }) => state,
  },
})

export default reducer

export const { loadEvents, eventsLoaded, saveEvent, deleteEvent, updateEvent } = actions

/**
 * Selectors
 **/

export const eventsSelector = (state: ReduxStore): EventsState => state[name]

export const eventsIdSelector = createSelector(
  eventsSelector,
  propSelector<string>('eventId'),
  ({ events }, eventId) => events.find(({ id }) => id === eventId) || ({} as CalendarEvent)
)

export const eventsDaySelector = createSelector(
  eventsSelector,
  propSelector<string>('day'),
  ({ events }, day) => events.filter((event) => event.day === day)
)

export const activeEventsDaySelector = createSelector(
  eventsSelector,
  propSelector<string>('day'),
  ({ events }, day) => events.filter((event) => !event.expired && event.day === day)
)

/**
 * Sagas
 **/

function* saveNewEventSaga({ payload }: PayloadAction<CalendarEvent>) {
  try {
    yield call(api.saveEvent, payload)

    yield fork(loadEventsSaga)

    yield put(
      addNotification({ ...initialNotification, message: 'Событие добавлено' } as Notification)
    )
  } catch (error: any) {
    yield put(
      addNotification({
        id: v1(),
        message: 'Произошла ошибка',
        status: 'error',
        description: error?.message,
        hideTimeout: 60 * 1000,
      })
    )
  }
}

export function* updateEventSaga(
  { payload }: PayloadAction<CalendarEvent>,
  withNotification: boolean = true
) {
  try {
    yield call(api.saveEvent, payload)

    yield fork(loadEventsSaga)

    if (withNotification) {
      yield put(
        addNotification({ ...initialNotification, message: 'Событие обновлено' } as Notification)
      )
    }
  } catch (error: any) {
    yield put(
      addNotification({
        id: v1(),
        message: 'Произошла ошибка',
        status: 'error',
        description: error?.message,
        hideTimeout: 60 * 1000,
      })
    )
  }
}

function* deleteEventSaga({ payload }: PayloadAction<string>) {
  try {
    yield call(api.deleteEvent, payload)

    yield fork(loadEventsSaga)

    yield put(
      addNotification({ ...initialNotification, message: 'Событие удалено' } as Notification)
    )
  } catch (error: any) {
    yield put(
      addNotification({
        id: v1(),
        message: 'Произошла ошибка',
        status: 'error',
        description: error?.message,
        hideTimeout: 60 * 1000,
      })
    )
  }
}

function* loadEventsSaga() {
  try {
    const events: CalendarEvent[] = yield call(api.getAllEvents)

    yield put(eventsLoaded(events))
  } catch (error: any) {
    yield put(
      addNotification({
        id: v1(),
        message: 'Произошла ошибка',
        status: 'error',
        description: error?.message,
        hideTimeout: 60 * 1000,
      })
    )
  }
}

export function* saga() {
  yield all([
    takeEvery(loadEvents, loadEventsSaga),
    takeEvery(saveEvent, saveNewEventSaga),
    takeEvery(updateEvent, updateEventSaga),
    takeEvery(deleteEvent, deleteEventSaga),
  ])
}
