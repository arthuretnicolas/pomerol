// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchCountriesAttempt: [ 'jwt' ],
  fetchCountriesFailure: [],
  fetchCountriesSuccess: [ 'countries' ]
})

export const OnboardingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  countries: null,
  attemptingCountries: null
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const fetchCountriesAttempt = (state: Object, action: Object) =>
  state.merge({
    attemptingCountries: true
  })

export const fetchCountriesFailure = (state: Object, action: Object) =>
  state.merge({
    attemptingCountries: false
  })

export const fetchCountriesSuccess = (state: Object, { countries }: { countries: Object }) =>
  state.merge({
    countries,
    attemptingCountries: false
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_COUNTRIES_ATTEMPT]: fetchCountriesAttempt,
  [Types.FETCH_COUNTRIES_FAILURE]: fetchCountriesFailure,
  [Types.FETCH_COUNTRIES_SUCCESS]: fetchCountriesSuccess
})
