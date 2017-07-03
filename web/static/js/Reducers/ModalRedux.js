// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  triggerModal: [ 'modalType', 'isVisible', 'modalProps' ]
})

export const ModalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  modalType: null,
  modalProps: {}
})

/* ------------- Reducers ------------- */

export const triggerModal = (state: Object, action: Object) => {
  switch (action.isVisible) {
    case true:
      return state.merge({
        modalType: action.modalType,
        modalProps: action.modalProps
      })
    case false:
      return state.merge({
        modalType: null,
        modalProps: {}
      })
    default:
      return state
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRIGGER_MODAL]: triggerModal
})
