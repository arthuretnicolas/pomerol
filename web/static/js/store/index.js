// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducers from '../Reducers'
import createLogger from 'redux-logger'
import StartupActions from '../Reducers/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'

const isFrontend = typeof window === 'object'
const isDev = process.env.NODE_ENV === 'development'

const devToolsExt =
  isFrontend && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f

const middlewares = []
const enhancers = []
const config = ReduxPersist.storeConfig

export default function configureStore (initialState: Object) {
  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware()
  middlewares.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */

  if (isDev && isFrontend) {
    const logger = createLogger({ collapsed: true })
    middlewares.push(logger)
  }

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middlewares))

  /* ------------- AutoRehydrate Enhancer ------------- */
  enhancers.push(autoRehydrate())

  const store = createStore(
    reducers,
    initialState,
    compose(
      ...enhancers,
      devToolsExt
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  const startup = () => store.dispatch(StartupActions.startup())

  persistStore(store, config, startup)

  return store
}
