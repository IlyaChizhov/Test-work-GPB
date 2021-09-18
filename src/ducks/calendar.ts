import { take, all } from 'redux-saga/effects'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { ReduxStore } from '../redux/store'
import { DateTime } from 'luxon'
import { DateTypes } from '../utils'

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
export function* activeDateSaga() {
  while (true) {
    try {
      yield take(changeActiveDate)
    } catch (error) {}
  }
}

export function* saga() {
  yield all([activeDateSaga()])
}
