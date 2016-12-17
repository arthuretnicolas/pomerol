// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signupAttempt: ['email', 'password'],
  signupSuccess: [],
  signupFailure: ['error'],
  signupCancel: []
})

export const SignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  attempting: false,
  error: null
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const attempt = (state: Object, { email, password }: { email: string, password: string }) =>
  state.merge({
    attempting: true
  })

export const success = (state: Object, action: Object) =>
  state.merge({
    attempting: false,
    error: null
  })

export const failure = (state: Object, { error }: Object) =>
  state.merge({
    attempting: false,
    error
  })

export const cancel = (state: Object, action: Object) =>
  state.merge({
    attempting: false,
    error: 'CANCELLED'
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_ATTEMPT]: attempt,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure,
  [Types.SIGNUP_CANCEL]: cancel
})
