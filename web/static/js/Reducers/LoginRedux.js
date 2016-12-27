// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginAttempt: [ 'email', 'password' ],
  loginSuccess: [ 'token' ],
  loginFailure: [ 'error' ],
  loginCancel: [],
  logout: [],
  fetchSessionSuccess: [ 'session' ],
  fetchSessionFailure: [ 'error' ],
  fetchSessionAttempt: [ 'jwt' ],
  loginWithGoogleSuccess: [ 'jwt', 'profileObj' ],
  resetPasswordAttempt: [ 'token', 'password' ],
  resetPasswordSuccess: [],
  resetPasswordFailure: [ 'error' ]
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

// exported only for tests
export const emptySession = {
  user: {},
  organizations: []
}

export const INITIAL_STATE = Immutable({
  attempting: false,
  error: null,
  jwt: '',
  attemptingSession: false,
  session: emptySession,
  errorSession: null,
  attemptingReset: false,
  errorResetting: null
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const attempt = (state: Object, { email, password }: { email: string, password: string }) =>
  state.merge({
    attempting: true
  })

type TokenType = {
  token: {
    jwt: string
  }
}
export const success = (state: Object, { token }: TokenType) =>
  state.merge({
    attempting: false,
    error: null,
    jwt: token.jwt
  })

export const failure = (state: Object, { error }: Object) =>
  state.merge({
    attempting: false,
    error,
    jwt: ''
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
    error: null
  })

export const fetchSessionFailure = (state: Object, { error }: Object) =>
  state.merge({
    attemptingSession: false,
    session: emptySession,
    errorSession: error
  })

export const loginWithGoogleSuccess = (state: Object, { jwt, profileObj }: Object) => {
  const session = state.session.merge({
    user: state.session.user.merge({
      id: profileObj.googleId,
      email: profileObj.email,
      first_name: profileObj.givenName,
      last_name: profileObj.familyName,
      avatarUrl: state.session.user.avatarUrl || profileObj.imageUrl
    })
  })

  return state.merge({
    jwt,
    session
  })
}

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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_ATTEMPT]: attempt,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_CANCEL]: cancel,
  [Types.LOGOUT]: logout,
  [Types.FETCH_SESSION_ATTEMPT]: fetchSessionAttempt,
  [Types.FETCH_SESSION_SUCCESS]: fetchSessionSuccess,
  [Types.FETCH_SESSION_FAILURE]: fetchSessionFailure,
  [Types.LOGIN_WITH_GOOGLE_SUCCESS]: loginWithGoogleSuccess,
  [Types.RESET_PASSWORD_ATTEMPT]: resetPasswordAttempt,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure
})
