// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  increment: ['amount'],
  attemptIncrement: ['amount']
})

export const CounterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  value: 0,
  attempting: false
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const increment = (state: Object, { amount }: Object) =>
  state.merge({
    value: Math.max(state.value + amount, 0)
  })

export const attemptIncrement = (state: Object, { amount }: Object) =>
  state.merge({
    attempting: true
  })

export const successIncrement = (state: Object, { amount }: Object) =>
  state.merge({
    value: Math.max(state.value + amount, 0)
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.INCREMENT]: increment,
  [Types.ATTEMPT_INCREMENT]: attemptIncrement,
  [Types.SUCCESS_INCREMENT]: successIncrement
})
