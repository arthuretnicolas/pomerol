import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from 'reducers'

const isFrontend = typeof window === 'object'
const isDev = process.env.NODE_ENV === 'development'

const devToolsExt =
  isFrontend && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f

const middlewares = [thunkMiddleware]

if (isDev && isFrontend) {
  const createLogger = require('redux-logger')
  const logger = createLogger()
  middlewares.push(logger)
}

export default function configureStore (initialState) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      devToolsExt
    )
  )
}
