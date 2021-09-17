import createStore from './createStore'

const { store } = createStore()

export type AppDispatch = typeof store.dispatch
export type ReduxStore = ReturnType<typeof store.getState>

export { store }
