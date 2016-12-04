import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../Reducers/StartupRedux'

test('rehydrate', t => {
  const state = reducer(INITIAL_STATE, Actions.rehydrate())

  t.true(state.rehydrated)
})
