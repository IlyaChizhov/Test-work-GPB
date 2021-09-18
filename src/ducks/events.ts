import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { ReduxStore } from '../redux/store'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { CalendarEvent, DateTypes } from '../utils'
import api from '../api'
import { propSelector } from '../redux/selectors'

const name = 'events'

export interface EventsState {
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
  },
})

export default reducer

export const { loadEvents, eventsLoaded } = actions

/**
 * Selectors
 **/

export const eventsSelector = (state: ReduxStore): EventsState => state[name]

export const eventsIdSelector = createSelector(
  eventsSelector,
  propSelector<string>('eventId'),
  ({ events }, eventId) => events.find(({ id }) => id === eventId)
)

/**
 * Sagas
 **/

export function* loadEventsSaga() {
  try {
    const events: CalendarEvent[] = yield call(api.getAllEvents)
    yield put(eventsLoaded(events))
  } catch (error) {
    //todo notify error
  }
}

export function* saga() {
  yield all([takeEvery(loadEvents, loadEventsSaga)])
}
