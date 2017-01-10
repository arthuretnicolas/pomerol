// @flow

import { combineReducers } from 'redux'
import Immutable from 'seamless-immutable'

const appReducer = combineReducers({
  startup: require('./StartupRedux').reducer,
  counter: require('./CounterRedux').reducer,
  github: require('./GithubRedux').reducer,
  login: require('./LoginRedux').reducer,
  signup: require('./SignupRedux').reducer
})

const rootReducer = (state: Object, action: Object) => {
  if (action.type === 'REHYDRATE') {
    const initialState = Immutable.from(appReducer(state, action))

    const initialStateCleaned =
      initialState.merge({
        login: initialState.login.merge({
          attempting: false,
          attemptingSession: false,
          attemptingRequest: false,
          attemptingGoogle: false,
          attemptingUpdate: false,
          attemptingOrganization: false,
          attemptingUpdatePassword: false
        }),
        signup: initialState.ignup.merge({
          attempting: false
        })
      })

    return initialStateCleaned
  }

  return appReducer(state, action)
}

export default rootReducer
