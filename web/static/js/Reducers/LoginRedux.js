// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginAttempt: ['email', 'password'],
  loginSuccess: ['session'],
  loginFailure: ['error'],
  loginCancel: [],
  logout: []
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  attempting: false,
  error: null,
  session: null
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const attempt = (state: Object, { email, password }: { email: string, password: string }) =>
  state.merge({
    attempting: true
  })

export const success = (state: Object, { session }: Object) =>
  state.merge({
    attempting: false,
    error: null,
    session
  })

export const failure = (state: Object, { error }: Object) =>
  state.merge({
    attempting: false,
    error,
    session: null
  })

export const cancel = (state: Object, action: Object) =>
  state.merge({
    attempting: false,
    error: 'CANCELLED'
  })

export const logout = (state: Object, action: Object) =>
  state.merge({
    attempting: false,
    error: null,
    session: null
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_ATTEMPT]: attempt,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_CANCEL]: cancel,
  [Types.LOGOUT]: logout
})
