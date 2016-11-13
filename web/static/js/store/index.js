import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import reducers from 'reducers'
import createLogger from 'redux-logger'

const isFrontend = typeof window === 'object'
const isDev = process.env.NODE_ENV === 'development'

const devToolsExt =
  isFrontend && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f

export default function configureStore (initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]

  if (isDev && isFrontend) {
    const logger = createLogger({ collapsed: true })
    middlewares.push(logger)
  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      devToolsExt
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store
}
