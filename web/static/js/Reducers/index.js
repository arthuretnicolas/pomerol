// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import Immutable from 'seamless-immutable'

const appReducer = combineReducers({
  startup: require('./StartupRedux').reducer,
  counter: require('./CounterRedux').reducer,
  github: require('./GithubRedux').reducer,
  login: require('./LoginRedux').reducer,
  signup: require('./SignupRedux').reducer,
  organizations: require('./OrganizationRedux').reducer,
  form: formReducer
})

const rootReducer = (state: Object, action: Object) => {
  const newState = Immutable.from(appReducer(state, action))

  if (action.type === 'REHYDRATE') {
    const newStateCleaned =
      newState.merge({
        login: newState.login.merge({
          rehydrated: true,
          attempting: false,
          attemptingSession: false,
          attemptingRequest: false,
          attemptingGoogle: false,
          attemptingUpdate: false,
          attemptingOrganization: false,
          attemptingUpdatePassword: false,
          attemptingReset: false
        }),
        signup: newState.signup.merge({
          attempting: false
        }),
        organizations: newState.organizations.merge({
          attempting: false
        })
      })

    return newStateCleaned
  }

  return newState
}

export default rootReducer
