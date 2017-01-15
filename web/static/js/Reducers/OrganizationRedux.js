// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  organizationAttempt: [ 'organizationId' ],
  organizationFailure: [ 'error' ],
  organizationSuccess: [ 'organization' ]
})

export const OrganizationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  attempting: false,
  error: null,
  list: []
})

export const organizationAttempt = (state: Object, { organizationId } : { organizationId: string}) =>
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

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORGANIZATION_ATTEMPT]: organizationAttempt,
  [Types.ORGANIZATION_FAILURE]: organizationFailure,
  [Types.ORGANIZATION_SUCCESS]: organizationSuccess
})
