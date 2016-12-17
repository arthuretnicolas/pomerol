import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../Reducers/LoginRedux'

const FAKE_JWT = 'NFziefoniozef'
const FAKE_ERROR = 'SERVER_DOWN'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.loginAttempt('joe@yopmail.com', 'yala1234'))

  t.true(state.attempting)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess({ jwt: FAKE_JWT }))

  t.deepEqual(state, {
    attempting: false,
    error: null,
    jwt: FAKE_JWT
  })
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure(FAKE_ERROR))

  t.deepEqual(state, {
    attempting: false,
    error: FAKE_ERROR,
    jwt: ''
  })
})

test('cancel', t => {
  const state = reducer(INITIAL_STATE, Actions.loginCancel())

  t.deepEqual(state, {
    attempting: false,
    error: 'CANCELLED',
    jwt: ''
  })
})

test('cancel', t => {
  const stateLogged = reducer(INITIAL_STATE, Actions.loginSuccess('joe@yopmail.com', 'yala1234'))
  const state = reducer(stateLogged, Actions.logout())

  t.deepEqual(state, {
    attempting: false,
    error: null,
    jwt: ''
  })
})
