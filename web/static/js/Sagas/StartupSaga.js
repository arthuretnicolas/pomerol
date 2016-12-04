import { put } from 'redux-saga/effects'
import StartupActions from '../Reducers/StartupRedux'

const isDev = process.env.NODE_ENV === 'development'

// process STARTUP actions
export function * startup (action) {
  if (isDev) {
    console.info('startup')
  }
}

export function * watcherRehydrate () {
  yield put(StartupActions.rehydrate())
}
