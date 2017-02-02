import { call, put, select } from 'redux-saga/effects'
import OrganizationActions from '../Reducers/OrganizationRedux'
import ModalActions from '../Reducers/ModalRedux'
import { handleErrors } from '../Helpers'
import { jwtSelector, currentOrganizationIdSelector } from '../Services/Selectors'

export function * fetchOrganization (api, action) {
  const { organizationId } = action
  const jwt = yield select(jwtSelector)

  const response = yield call(api.fetchOrganization, jwt, organizationId)
  const { data } = response

  if (response.ok) {
    yield put(OrganizationActions.organizationSuccess(data))
  } else {
    yield put(OrganizationActions.organizationFailure('Failure')) // do better...
    handleErrors(data)
  }
}

export function * updateOrganization (api, action) {
  const { organizationId, organization } = action
  const jwt = yield select(jwtSelector)

  const response = yield call(api.updateOrganization, jwt, organizationId, organization)
  const { data } = response

  if (response.ok) {
    yield put(OrganizationActions.updateOrganizationSuccess(data))
  } else {
    yield put(OrganizationActions.updateOrganizationFailure(data))
    handleErrors(data)
  }
}

export function * createOrganizationInvite (api, action) {
  const { organizationInvite } = action
  const jwt = yield select(jwtSelector)
  const organizationId = yield select(currentOrganizationIdSelector)

  const response = yield call(api.createOrganizationInvite, jwt, organizationId, organizationInvite)
  const { data } = response

  if (response.ok) {
    yield put(OrganizationActions.createOrganizationInviteSuccess(data))
    yield put(ModalActions.triggerModal('INVITE_USER', false, {}))
  } else {
    yield put(OrganizationActions.createOrganizationInviteFailure(data))
    handleErrors(data)
  }
}
