import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../Reducers/OnboardingRedux'
import LoginActions from '../../Reducers/LoginRedux'

const FAKE_JWT = 'NFziefoniozef'
const FAKE_ERROR = 'SERVER_DOWN'
const FAKE_COUNTRIES = {
  'top_country_ids': [
    1
  ],
  'countries': [
    {
      'name': 'Australia',
      'id': 1
    }
  ]
}

test('fetchCountriesAttempt', t => {
  const stateLogged = reducer(INITIAL_STATE, LoginActions.loginSuccess(FAKE_JWT))
  const state = reducer(stateLogged, Actions.fetchCountriesAttempt())

  t.true(state.attemptingCountries)
})

test('fetchCountriesFailure', t => {
  const stateLogged = reducer(INITIAL_STATE, LoginActions.loginSuccess(FAKE_JWT))
  const state = reducer(stateLogged, Actions.fetchCountriesFailure(FAKE_ERROR))

  t.false(state.attemptingCountries)
  t.is(state.countries, null)
})

test('fetchCountriesSuccess', t => {
  const stateLogged = reducer(INITIAL_STATE, LoginActions.loginSuccess(FAKE_JWT))
  const state = reducer(stateLogged, Actions.fetchCountriesSuccess(FAKE_COUNTRIES))

  t.false(state.attemptingCountries)
  t.deepEqual(state.countries, FAKE_COUNTRIES)
})
