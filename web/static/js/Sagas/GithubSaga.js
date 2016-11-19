import { call, put } from 'redux-saga/effects'
import GithubActions from '../Reducers/GithubRedux'

export function * getUser (api, action) {
  const { name } = action
  const response = yield call(api.getUser, name)

  if (response.ok) {
    yield put(GithubActions.fetchUserSuccess(response.data))
  } else {
    yield put(GithubActions.fetchUserFailure())
  }
}
