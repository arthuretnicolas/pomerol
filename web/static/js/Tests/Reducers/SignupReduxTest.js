import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../Reducers/SignupRedux'

const FAKE_JWT = 'NFziefoniozef'
const FAKE_ERROR = 'SERVER_DOWN'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.signupAttempt('joe@yopmail.com', 'yala1234'))

  t.true(state.attempting)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.signupSuccess({ jwt: FAKE_JWT }))

  t.deepEqual(state, {
    attempting: false,
    error: null
  })
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.signupFailure(FAKE_ERROR))

  t.deepEqual(state, {
    attempting: false,
    error: FAKE_ERROR
  })
})

test('cancel', t => {
  const state = reducer(INITIAL_STATE, Actions.signupCancel())

  t.deepEqual(state, {
    attempting: false,
    error: 'CANCELLED'
  })
})
