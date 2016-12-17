import { call, put } from 'redux-saga/effects'
import LoginActions from '../Reducers/LoginRedux'

export function * login (api, action) {
  const { email, password } = action
  const response = yield call(api.login, email, password)

  if (response.ok) {
    const { data } = response
    const { jwt } = data
    yield put(LoginActions.loginSuccess(data))
    yield put(LoginActions.fetchSessionAttempt(jwt))
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * logout () {
  // nothing to do
}

export function * fetchSession (api, action) {
  const { jwt } = action
  const response = yield call(api.fetchSession, jwt)

  if (response.ok) {
    yield put(LoginActions.fetchSessionSuccess(response.data))
  } else {
    yield put(LoginActions.fetchSessionFailure())
  }
}
