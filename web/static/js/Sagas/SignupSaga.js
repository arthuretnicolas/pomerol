import { call, put } from 'redux-saga/effects'
import SignupActions from '../Reducers/SignupRedux'
import LoginActions from '../Reducers/LoginRedux'

export function * signup (api, action) {
  const { email, password } = action
  const response = yield call(api.signup, email, password)
  const { data } = response

  if (response.ok) {
    const { jwt } = data

    yield put(SignupActions.signupSuccess())
    yield put(LoginActions.loginSuccess(data))
    yield put(LoginActions.fetchSessionAttempt(jwt))
  } else {
    yield put(SignupActions.signupFailure())
  }
}
