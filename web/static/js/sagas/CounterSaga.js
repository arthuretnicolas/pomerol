import { put, delay } from 'redux-saga/effects'
import CounterActions from '../reducers/CounterRedux'

export function * incrementWithDelay (action) {
  const { amount } = action

  yield delay(1000)
  yield put(CounterActions.successIncrement(amount))
}
