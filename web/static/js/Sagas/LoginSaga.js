import { call, put, select } from 'redux-saga/effects'
import LoginActions from '../Reducers/LoginRedux'
import { handleErrors } from '../Helpers'
import { jwtSelector, userIdSelector } from '../Services/Selectors'

export function * login (api, action) {
  const { email, password } = action
  const response = yield call(api.login, email, password)
  const { data } = response

  if (response.ok) {
    const { jwt } = data
    yield put(LoginActions.loginSuccess(jwt))
    yield put(LoginActions.fetchSessionAttempt(jwt))
  } else {
    yield put(LoginActions.loginFailure())
    handleErrors(data)
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

export function * loginWithGoogle (api, action) {
  const { code } = action
  const response = yield call(api.loginWithGoogle, code)
  const { data } = response

  if (response.ok) {
    const { jwt } = data
    yield put(LoginActions.loginSuccess(jwt))
    yield put(LoginActions.fetchSessionAttempt(jwt))
  } else {
    yield put(LoginActions.loginFailure())
    handleErrors(data)
  }
}

export function * requestPassword (api, action) {
  const { email } = action
  const response = yield call(api.requestPassword, email)

  if (response.ok) {
    yield put(LoginActions.requestPasswordSuccess())
  } else {
    const { data } = response
    yield put(LoginActions.requestPasswordFailure(data))
    handleErrors(data)
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
  } else {
    yield put(LoginActions.resetPasswordFailure(data))
    console.warn('Reset password failed')
  }
}

export function * updateUser (api, action) {
  const { user } = action
  const jwt = yield select(jwtSelector)
  const userId = yield select(userIdSelector)

  const response = yield call(api.updateUser, jwt, userId, user)
  const { data } = response

  if (response.ok) {
    yield put(LoginActions.updateUserSuccess(data))
  } else {
    yield put(LoginActions.updateUserFailure(data))
    handleErrors(data)
    console.warn('Update user failed')
  }
}

export function * createOrganization (api, action) {
  const { organization } = action
  const jwt = yield select(jwtSelector)

  const response = yield call(api.createOrganization, jwt, organization)
  const { data } = response

  if (response.ok) {
    yield put(LoginActions.createOrganizationSuccess(data))
    yield put(LoginActions.setCurrentOrganization(data.country.id))
    window.alert('Your organisation has been created successfully !') // TODO: do something better
  } else {
    yield put(LoginActions.createOrganizationFailure(data))
    handleErrors(data)
  }
}

export function * updatePassword (api, action) {
  const { password, newPassword } = action
  const jwt = yield select(jwtSelector)

  const response = yield call(api.updatePassword, jwt, password, newPassword)
  const { data } = response

  if (response.ok) {
    yield put(LoginActions.updatePasswordSuccess())
  } else {
    yield put(LoginActions.updatePasswordFailure('Error updating password'))
    handleErrors(data)
  }
}
