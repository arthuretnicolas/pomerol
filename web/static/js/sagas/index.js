import { takeLatest } from 'redux-saga'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugSettings from '../Config/DebugSettings'

/* ------------- Types ------------- */

import { StartupTypes } from '../Reducers/StartupRedux'
import { CounterTypes } from '../Reducers/CounterRedux'
import { GithubTypes } from '../Reducers/GithubRedux'
import { LoginTypes } from '../Reducers/LoginRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSaga'
import { incrementWithDelay } from './CounterSaga'
import { getUser } from './GithubSaga'
import { login } from './LoginSaga'

/* ------------- API ------------- */

const api = DebugSettings.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(CounterTypes.ATTEMPT_INCREMENT, incrementWithDelay),
    takeLatest(GithubTypes.FETCH_USER_REQUEST, getUser, api),
    takeLatest(LoginTypes.LOGIN_ATTEMPT, login, api)
  ]
}
