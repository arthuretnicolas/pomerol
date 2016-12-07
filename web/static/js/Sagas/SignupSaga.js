import { call, put } from 'redux-saga/effects'
import SignupActions from '../Reducers/SignupRedux'
import LoginActions from '../Reducers/LoginRedux'

export function * signup (api, action) {
  const { email, password } = action
  const response = yield call(api.signup, email, password)
  const { data } = response

  if (response.ok) {
    yield put(SignupActions.signupSuccess(data))
    yield put(LoginActions.loginSuccess(data))
  } else {
    yield put(SignupActions.signupFailure())
  }
}
