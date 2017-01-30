// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  showModal: [],
  hideModal: []
})

export const ModalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isOpen: false
})

/* ------------- Reducers ------------- */

export const showModal = (state: Object, action: Object) =>
  state.merge({
    isOpen: true
  })

export const hideModal = (state: Object, action: Object) =>
  state.merge({
    isOpen: false
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_MODAL]: showModal,
  [Types.HIDE_MODAL]: hideModal
})
