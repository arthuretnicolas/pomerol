import { call, put } from 'redux-saga/effects'
import LoginActions from '../Reducers/LoginRedux'

export function * login (api, action) {
  const { email, password } = action
  const response = yield call(api.login, email, password)

  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data))
  } else {
    yield put(LoginActions.loginFailure())
  }
}
