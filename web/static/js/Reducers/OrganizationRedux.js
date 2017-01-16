// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchOrganizationAttempt: [ 'organizationId' ],
  organizationFailure: [ 'error' ],
  organizationSuccess: [ 'organization' ],
  // ******
  updateOrganizationAttempt: [ 'organizationId', 'organization' ],
  updateOrganizationFailure: [ 'error' ],
  updateOrganizationSuccess: [ 'organization' ]
})

export const OrganizationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  attempting: false,
  error: null,
  list: []
})

export const fetchOrganizationAttempt = (state: Object, { organizationId } : { organizationId: string}) =>
  state.merge({
    attempting: true
  })

export const organizationFailure = (state: Object, { error } : { error: string}) =>
  state.merge({
    attempting: false,
    error
  })

export const organizationSuccess = (state: Object, { organization } : { organization: Object}) => {
  if (!organization) {
    return state
  }

  const list =
    state.list
      .filter(org => org.id !== organization.id)
      .concat(organization)

  return state.merge({
    attempting: false,
    error: null,
    list
  })
}

export const updateOrganizationAttempt = (state: Object, { organizationId, organization }: {organizationId: string, organization: Object }) =>
  state.merge({
    attempting: true
  })

export const updateOrganizationFailure = (state: Object, { error }: { error: string }) =>
  state.merge({
    attempting: false,
    error: error
  })

export const updateOrganizationSuccess = (
  state: Object,
  { organization }: { organization: Object }
) => {
  const existingOrganization =
    state.list.find(org => org.id === organization.id)

  const updatedOrganization =
    typeof existingOrganization === 'undefined'
      ? organization
      : existingOrganization.merge(organization)

  const list =
    state.list
      .filter(org => org.id !== organization.id)
      .concat(updatedOrganization)

  return state.merge({
    attempting: false,
    error: null,
    list
  })
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_ORGANIZATION_ATTEMPT]: fetchOrganizationAttempt,
  [Types.ORGANIZATION_FAILURE]: organizationFailure,
  [Types.ORGANIZATION_SUCCESS]: organizationSuccess,
  [Types.UPDATE_ORGANIZATION_ATTEMPT]: updateOrganizationAttempt,
  [Types.UPDATE_ORGANIZATION_FAILURE]: updateOrganizationFailure,
  [Types.UPDATE_ORGANIZATION_SUCCESS]: updateOrganizationSuccess
})
