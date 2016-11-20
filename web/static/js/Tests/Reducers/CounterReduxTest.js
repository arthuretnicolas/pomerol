import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../Reducers/CounterRedux'

test('increment', t => {
  const state = reducer(INITIAL_STATE, Actions.increment(3))
  const state2 = reducer(state, Actions.increment(-1))
  const state3 = reducer(state, Actions.increment(-666))

  t.deepEqual(state, {
    value: 3,
    attempting: false
  })

  t.deepEqual(state2, {
    value: 2,
    attempting: false
  })

  t.deepEqual(state3, {
    value: 0,
    attempting: false
  })
})

test('attemptIncrement', t => {
  const state = reducer(INITIAL_STATE, Actions.attemptIncrement(2))

  t.deepEqual(state, {
    value: 0,
    attempting: true
  })
})

test('successIncrement', t => {
  const state = reducer(INITIAL_STATE, Actions.successIncrement(2))

  t.deepEqual(state, {
    value: 2,
    attempting: false
  })
})
