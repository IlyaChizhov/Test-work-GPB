import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { ReduxStore } from '../redux/store'
import { propSelector } from '../redux/selectors'

const name = 'notifications'

export interface Notification {
  id: string
  message: string
  status: 'success' | 'error' | 'notification'
  description: string
  hideTimeout: number
}

export interface NotificationsState {
  [key: string]: Notification
}

const initialState: NotificationsState = {}

const { reducer, actions } = createSlice({
  name,
  initialState,
  reducers: {
    addNotification: (state, { payload }: { payload: Notification }) => {
      state[payload.id] = payload
    },
    deleteNotification: (state, { payload }) => {
      delete state[payload]
    },
  },
})

export default reducer

export const { addNotification, deleteNotification } = actions

/**
 * Selectors
 **/

export const notificationsSelector = (state: ReduxStore): NotificationsState => state[name]

export const notificationIdSelector = createSelector(
  notificationsSelector,
  propSelector<string>('id'),
  (notifications, id) => notifications[id] || {}
)
