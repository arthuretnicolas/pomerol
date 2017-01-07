import { put, select } from 'redux-saga/effects'
import StartupActions from '../Reducers/StartupRedux'
import LoginActions from '../Reducers/LoginRedux'
import { jwtSelector, userIdSelector } from '../Services/Selectors'

const isDev = process.env.NODE_ENV === 'development'

// process STARTUP actions
export function * startup (action) {
  const jwt = yield select(jwtSelector)
  const userId = yield select(userIdSelector)

  if (userId) {
    yield put(LoginActions.fetchSessionAttempt(jwt))
  }

  if (isDev) {
    console.info('startup')
  }
}

export function * watcherRehydrate () {
  yield put(StartupActions.rehydrate())
}
