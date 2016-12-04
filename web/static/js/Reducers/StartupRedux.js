// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  rehydrate: null
})

export const StartupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  rehydrated: false
})

export const rehydrate = (state: Object) => state.merge({ rehydrated: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REHYDRATE]: rehydrate
})
