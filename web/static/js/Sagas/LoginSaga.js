import { call, put } from 'redux-saga/effects'
import LoginActions from '../Reducers/LoginRedux'
import { handleErrors } from '../Helpers'

export function * login (api, action) {
  const { email, password } = action
  const response = yield call(api.login, email, password)
  const { data } = response

  if (response.ok) {
    const { jwt } = data
    yield put(LoginActions.loginSuccess(data))
    yield put(LoginActions.fetchSessionAttempt(jwt))
  } else {
    yield put(LoginActions.loginFailure())
    handleErrors(data.errors)
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

export function * requestPassword (api, action) {
  const { email } = action
  const response = yield call(api.requestPassword, email)

  if (response.ok) {
    yield put(LoginActions.requestPasswordSuccess())
    console.info('Request password successful')
  } else {
    const { data } = response
    yield put(LoginActions.requestPasswordFailure(data))
    handleErrors(data.errors)
  }
}

export function * resetPassword (api, action) {
  const { token, password } = action
  const response = yield call(api.resetPassword, token, password)
  const { data } = response

  if (response.ok) {
    const { jwt } = data
    yield put(LoginActions.fetchSessionAttempt(jwt))
    yield put(LoginActions.resetPasswordSuccess())
    console.info('Reset password successful')
  } else {
    yield put(LoginActions.resetPasswordFailure(data))
    console.warn('Reset password failed')
  }
}
