import { call, put, select } from 'redux-saga/effects'
import LoginActions from '../Reducers/LoginRedux'
import OrganizationActions from '../Reducers/OrganizationRedux'
import { handleErrors } from '../Helpers'
import {
  jwtSelector,
  userIdSelector,
  currentOrganizationIdSelector
} from '../Services/Selectors'

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

    const organizationId = yield select(currentOrganizationIdSelector)
    if (organizationId) {
      yield put(OrganizationActions.fetchOrganizationAttempt(organizationId))
    }
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
  const previousOrganizationId = yield select(currentOrganizationIdSelector)

  const response = yield call(api.updateUser, jwt, userId, user)
  const { data } = response

  if (response.ok) {
    yield put(LoginActions.updateUserSuccess(data))

    const currentOrganizationId = data.current_organization_id
    if (previousOrganizationId !== currentOrganizationId) {
      yield put(OrganizationActions.fetchOrganizationAttempt(currentOrganizationId))
    }
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
    const organizationId = data.id
    yield put(LoginActions.createOrganizationSuccess(data))
    yield put(LoginActions.setCurrentOrganization(organizationId))
    yield put(OrganizationActions.fetchOrganizationAttempt(organizationId))
    window.alert('Your organization has been created successfully !') // TODO: do something better
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
