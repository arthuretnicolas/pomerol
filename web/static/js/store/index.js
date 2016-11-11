import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from 'reducers'

const devToolsExt =
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f

export default function configureStore (initialState) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      devToolsExt
    )
  )
}
