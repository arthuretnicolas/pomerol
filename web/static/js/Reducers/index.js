import { combineReducers } from 'redux'

export default combineReducers({
  startup: require('./StartupRedux').reducer,
  counter: require('./CounterRedux').reducer,
  github: require('./GithubRedux').reducer,
  login: require('./LoginRedux').reducer,
  signup: require('./SignupRedux').reducer,
  onboarding: require('./OnboardingRedux').reducer
})
