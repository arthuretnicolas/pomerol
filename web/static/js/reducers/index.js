import { combineReducers } from 'redux'

export default combineReducers({
  counter: require('./CounterRedux').reducer,
  github: require('./GithubRedux').reducer
})
