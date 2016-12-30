import { call, put, select } from 'redux-saga/effects'
import OnboardingActions from '../Reducers/OnboardingRedux'
import { handleErrors } from '../Helpers'
import { jwtSelector } from '../Services/Selectors'

export function * fetchCountries (api, action) {
  const jwt = yield select(jwtSelector)

  const response = yield call(api.fetchCountries, jwt)
  const { data } = response

  if (response.ok) {
    yield put(OnboardingActions.fetchCountriesSuccess(data))
  } else {
    yield put(OnboardingActions.fetchCountriesFailure('problem...'))
    handleErrors(data)
  }
}
