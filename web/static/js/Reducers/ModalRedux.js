// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  showModal: [ 'modalType', 'modalProps' ],
  hideModal: []
})

export const ModalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalType: null,
  modalProps: {}
})

/* ------------- Reducers ------------- */

export const showModal = (state: Object, action: Object) =>
  state.merge({
    modalType: action.modalType,
    modalProps: action.modalProps
  })

export const hideModal = (state: Object, action: Object) =>
  state.merge({
    modalType: null,
    modalProps: {}
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_MODAL]: showModal,
  [Types.HIDE_MODAL]: hideModal
})
