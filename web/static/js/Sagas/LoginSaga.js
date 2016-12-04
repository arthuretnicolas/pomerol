import { call, put } from 'redux-saga/effects'
import LoginActions from '../Reducers/LoginRedux'
import { browserHistory } from 'react-router'

export function * login (api, action) {
  const { email, password } = action
  const response = yield call(api.login, email, password)

  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data))
    browserHistory.push('/dashboard')
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * logout () {
  browserHistory.push('/login')
}
