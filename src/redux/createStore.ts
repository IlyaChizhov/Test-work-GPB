import { Middleware } from 'redux'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'

/**
 * Middleware
 **/
const sagaMiddleware = createSagaMiddleware()
const middleware: Middleware[] = [sagaMiddleware]

/**
 * Main function
 **/
export default function configure(preloadedState = {}) {
  const store: EnhancedStore = configureStore({ reducer: rootReducer, preloadedState, middleware })

  sagaMiddleware.run(rootSaga)

  return { store }
}
