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

/**
 * Sagas
 **/

function* saveNewEventSaga({ payload }: PayloadAction<CalendarEvent>) {
  try {
    yield call(api.saveEvent, payload)

    yield fork(loadEventsSaga, 'new')
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

function* updateEventSaga({ payload }: PayloadAction<CalendarEvent>) {
  try {
    yield call(api.saveEvent, payload)

    yield fork(loadEventsSaga, 'update')
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

    yield fork(loadEventsSaga, 'delete')
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

function* loadEventsSaga(type: 'new' | 'update' | 'delete' = 'new') {
  try {
    const events: CalendarEvent[] = yield call(api.getAllEvents)

    yield put(eventsLoaded(events))

    const initialNotification = {
      id: v1(),
      status: 'success',
      description: '',
      hideTimeout: 2000,
    }

    if (type === 'new') {
      yield put(
        addNotification({ ...initialNotification, message: 'Событие добавлено' } as Notification)
      )
    }

    if (type === 'update') {
      yield put(
        addNotification({ ...initialNotification, message: 'Событие обновлено' } as Notification)
      )
    }

    if (type === 'delete') {
      yield put(
        addNotification({ ...initialNotification, message: 'Событие удалено' } as Notification)
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

export function* saga() {
  yield all([
    takeEvery(loadEvents, loadEventsSaga),
    takeEvery(saveEvent, saveNewEventSaga),
    takeEvery(updateEvent, updateEventSaga),
    takeEvery(deleteEvent, deleteEventSaga),
  ])
}
