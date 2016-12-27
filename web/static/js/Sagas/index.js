import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Reducers/StartupRedux'
import { CounterTypes } from '../Reducers/CounterRedux'
import { GithubTypes } from '../Reducers/GithubRedux'
import { LoginTypes } from '../Reducers/LoginRedux'
import { SignupTypes } from '../Reducers/SignupRedux'

/* ------------- Sagas ------------- */

import { startup, watcherRehydrate } from './StartupSaga'
import { incrementWithDelay } from './CounterSaga'
import { getUser } from './GithubSaga'
import {
  login,
  logout,
  fetchSession,
  requestPassword,
  resetPassword
} from './LoginSaga'
import { signup } from './SignupSaga'

/* ------------- API ------------- */

const api = DebugSettings.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest('persist/REHYDRATE', watcherRehydrate),
    takeLatest(CounterTypes.ATTEMPT_INCREMENT, incrementWithDelay),
    takeLatest(GithubTypes.FETCH_USER_REQUEST, getUser, api),
    takeLatest(LoginTypes.LOGIN_ATTEMPT, login, api),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(LoginTypes.FETCH_SESSION_ATTEMPT, fetchSession, api),
    takeLatest(LoginTypes.REQUEST_PASSWORD_ATTEMPT, requestPassword, api),
    takeLatest(LoginTypes.RESET_PASSWORD_ATTEMPT, resetPassword, api),
    takeLatest(SignupTypes.SIGNUP_ATTEMPT, signup, api)
  ]
}
