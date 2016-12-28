import { delay } from 'redux-saga'
import { put } from 'redux-saga/effects'
import CounterActions from '../Reducers/CounterRedux'

export function * incrementWithDelay (action) {
  const { amount } = action

  yield delay(1000)
  yield put(CounterActions.successIncrement(amount))
}
