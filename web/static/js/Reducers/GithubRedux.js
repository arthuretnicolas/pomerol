// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchUserRequest: [ 'name' ],
  fetchUserSuccess: [ 'user' ],
  fetchUserFailure: null
})

export const GithubTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  users: new Map(),
  ids: []
})

/* ------------- Reducers ------------- */

export const userRequest = (state: Object, { name }: Object) =>
  state.merge({ fetching: true })

export const userSuccess = (state: Object, { user }: Object) =>
  state.merge({
    fetching: false,
    error: null,
    users: state.users.set(user.id, user),
    ids: state.ids.filter(id => id !== user.id).concat(user.id)
  })

export const userFailure = (state: Object) =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_USER_REQUEST]: userRequest,
  [Types.FETCH_USER_SUCCESS]: userSuccess,
  [Types.FETCH_USER_FAILURE]: userFailure
})
