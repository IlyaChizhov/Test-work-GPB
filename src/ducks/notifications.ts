import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { ReduxStore } from '../redux/store'
import { DateTime } from 'luxon'
import { DateTypes } from '../utils'

const name = 'notifications'

export interface Notification {
  message: string
}

export interface NotificationsState {
  [key: string]: Notification
}

const initialState: NotificationsState = {}

const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      state[payload.id] = { status: 'loading', ...payload }
    },
    removeNotification: (state, { payload }) => {
      delete state[payload]
    },
  },
})

export default reducer

export const { addNotification, removeNotification } = actions

/**
 * Selectors
 **/

export const notificationsSelector = (state: ReduxStore): NotificationsState => state[name]

// export const notificationIdSelector = createSelector(
//   notificationsSelector,
//   (notifications, entityId) =>
//     Object.keys(notifications).find((id) => Number(id) === Number(entityId))
// )
