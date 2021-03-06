// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginAttempt: [ 'email', 'password' ],
  loginSuccess: [ 'jwt' ],
  loginFailure: [ 'error' ],
  loginCancel: [],
  logout: [],
  setJwt: [ 'jwt' ],
  // ******
  fetchSessionSuccess: [ 'session' ],
  fetchSessionFailure: [ 'error' ],
  fetchSessionAttempt: [ 'jwt' ],
  // ******
  preloginWithGoogleSuccess: [ 'code' ],
  // ******
  requestPasswordAttempt: [ 'email' ],
  requestPasswordFailure: [ 'error' ],
  requestPasswordSuccess: [],
  // ******
  resetPasswordAttempt: [ 'token', 'password' ],
  resetPasswordSuccess: [],
  resetPasswordFailure: [ 'error' ],
  // ******
  updateUserAttempt: [ 'user' ],
  updateUserFailure: [ 'error' ],
  updateUserSuccess: [ 'user' ],
  // ******
  createOrganizationAttempt: [ 'organization' ],
  createOrganizationFailure: [ 'error' ],
  createOrganizationSuccess: [ 'organization' ],
  // ******
  setCurrentOrganization: [ 'id' ],
  // ******
  updatePasswordAttempt: [ 'password', 'newPassword' ],
  updatePasswordFailure: [ 'error' ],
  updatePasswordSuccess: []
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

// exported only for tests
export const emptySession = {
  user: null,
  organizations: []
}

export const INITIAL_STATE = Immutable({
  rehydrated: false,
  attempting: false,
  error: null,
  jwt: '',
  // ******
  attemptingSession: false,
  session: emptySession,
  errorSession: null,
  // ******
  attemptingRequest: false,
  errorRequest: null,
  attemptingReset: false,
  errorResetting: null,
  // ******
  attemptingGoogle: null,
  attemptingUpdate: false,
  errorUpdating: null,
  // ******
  attemptingOrganization: false,
  errorOrganisation: null,
  // ******
  attemptingUpdatePassword: false,
  errorUpdatingPassword: null
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const attempt = (state: Object, { email, password }: { email: string, password: string }) =>
  state.merge({
    attempting: true
  })

export const success = (state: Object, { jwt }: { jwt: string }) =>
  state.merge({
    attempting: false,
    attemptingGoogle: false,
    error: null,
    jwt
  })

export const failure = (state: Object, { error }: Object) =>
  state.merge({
    attempting: false,
    error,
    jwt: '',
    attemptingGoogle: false
  })

export const cancel = (state: Object, action: Object) =>
  state.merge({
    attempting: false,
    error: 'CANCELLED',
    jwt: ''
  })

export const logout = (state: Object, action: Object) =>
  state.merge({
    jwt: '',
    session: emptySession
  })

export const setJwt = (state: Object, { jwt }: { jwt: string }) =>
  state.merge({
    jwt
  })

export const fetchSessionAttempt = (state: Object, action: Object) =>
  state.merge({
    attemptingSession: true
  })

type SessionType = {
  session: {
    user: Object,
    organizations: Object
  }
}
export const fetchSessionSuccess = (state: Object, { session }: SessionType) =>
  state.merge({
    attemptingSession: false,
    session,
    errorSession: null
  })

export const fetchSessionFailure = (state: Object, { error }: Object) =>
  state.merge({
    attemptingSession: false,
    session: emptySession,
    errorSession: error
  })

export const preloginWithGoogleSuccess = (state: Object, { code }: { code: string }) =>
  state.merge({
    attemptingGoogle: true
  })

export const requestPasswordAttempt = (state: Object, { email }: { email: string }) =>
  state.merge({
    attemptingRequest: true
  })

export const requestPasswordFailure = (state: Object, { error }: { error: Object }) =>
  state.merge({
    attemptingRequest: false,
    errorRequest: error
  })

export const requestPasswordSuccess = (state: Object, action: Object) =>
  state.merge({
    attemptingRequest: false,
    errorRequest: null
  })

type ResetType = {
  token: string,
  password: string
}
export const resetPasswordAttempt = (state: Object, { token, password }: ResetType) =>
  state.merge({
    attemptingReset: true
  })

export const resetPasswordSuccess = (state: Object, action: Object) =>
  state.merge({
    attemptingReset: false,
    errorResetting: null
  })

export const resetPasswordFailure = (state: Object, { error }: Object) =>
  state.merge({
    attemptingReset: false,
    errorResetting: error
  })

export const updateUserAttempt = (state: Object, action: Object) =>
  state.merge({
    attemptingUpdate: true
  })

export const updateUserFailure = (state: Object, { error }: { error: string }) =>
  state.merge({
    attemptingUpdate: false,
    errorUpdating: error
  })

export const updateUserSuccess = (state: Object, { user }: Object) =>
  state.merge({
    attemptingUpdate: false,
    session: state.session.merge({
      user
    }),
    errorUpdating: null
  })

export const createOrganizationAttempt = (state: Object, { organization }: { organization: Object }) =>
  state.merge({
    attemptingOrganization: true
  })

export const createOrganizationFailure = (state: Object, { error }: { error: string }) =>
  state.merge({
    attemptingOrganization: false,
    errorOrganisation: error
  })

export const createOrganizationSuccess = (state: Object, { organization }: { organization: Object }) => {
  const organizations =
    state.session.organizations
      .filter(org => org.id !== organization.id)
      .concat(organization)

  return state.merge({
    attemptingOrganization: false,
    errorOrganisation: null,
    session: state.session.merge({
      organizations
    })
  })
}

export const setCurrentOrganization = (state: Object, { id }: { id: string }) =>
  state.setIn([ 'session', 'user', 'current_organization_id' ], id)

export const updatePasswordAttempt = (state: Object, { password, newPassword }: { password: string, newPassword: string }) =>
  state.merge({
    attemptingUpdatePassword: true
  })

export const updatePasswordFailure = (state: Object, { error }: { error: string }) =>
  state.merge({
    attemptingUpdatePassword: false,
    errorUpdatingPassword: error
  })

export const updatePasswordSuccess = (state: Object, action: Object) =>
  state.merge({
    attemptingUpdatePassword: false,
    errorUpdatingPassword: null
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_ATTEMPT]: attempt,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_CANCEL]: cancel,
  [Types.LOGOUT]: logout,
  [Types.SET_JWT]: setJwt,
  // ******
  [Types.FETCH_SESSION_ATTEMPT]: fetchSessionAttempt,
  [Types.FETCH_SESSION_SUCCESS]: fetchSessionSuccess,
  [Types.FETCH_SESSION_FAILURE]: fetchSessionFailure,
  // ******
  [Types.PRELOGIN_WITH_GOOGLE_SUCCESS]: preloginWithGoogleSuccess,
  // ******
  [Types.REQUEST_PASSWORD_ATTEMPT]: requestPasswordAttempt,
  [Types.REQUEST_PASSWORD_FAILURE]: requestPasswordFailure,
  [Types.REQUEST_PASSWORD_SUCCESS]: requestPasswordSuccess,
  // ******
  [Types.RESET_PASSWORD_ATTEMPT]: resetPasswordAttempt,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,
  // ******
  [Types.UPDATE_USER_ATTEMPT]: updateUserAttempt,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.UPDATE_USER_FAILURE]: updateUserFailure,
  // ******
  [Types.CREATE_ORGANIZATION_ATTEMPT]: createOrganizationAttempt,
  [Types.CREATE_ORGANIZATION_SUCCESS]: createOrganizationSuccess,
  [Types.CREATE_ORGANIZATION_FAILURE]: createOrganizationFailure,
  // ******
  [Types.SET_CURRENT_ORGANIZATION]: setCurrentOrganization,
  // ******
  [Types.UPDATE_PASSWORD_ATTEMPT]: updatePasswordAttempt,
  [Types.UPDATE_PASSWORD_FAILURE]: updatePasswordFailure,
  [Types.UPDATE_PASSWORD_SUCCESS]: updatePasswordSuccess
})
