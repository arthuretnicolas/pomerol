import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../Reducers/LoginRedux'

const FAKE_SESSION = {
  userId: 123,
  jwt: 'NFziefoniozef'
}
const FAKE_ERROR = 'SERVER_DOWN'

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.loginAttempt('Joe@yopmail.com', 'yala1234'))

  t.true(state.attempting)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess(FAKE_SESSION))

  t.deepEqual(state, {
    attempting: false,
    error: null,
    session: FAKE_SESSION
  })
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure(FAKE_ERROR))

  t.deepEqual(state, {
    attempting: false,
    error: FAKE_ERROR,
    session: null
  })
})

test('cancel', t => {
  const state = reducer(INITIAL_STATE, Actions.loginCancel())

  t.deepEqual(state, {
    attempting: false,
    error: 'CANCELLED',
    session: null
  })
})

test('canel', t => {
  const stateLogged = reducer(INITIAL_STATE, Actions.loginSuccess(FAKE_SESSION))
  const state = reducer(stateLogged, Actions.logout())

  t.deepEqual(state, {
    attempting: false,
    error: null,
    session: null
  })
})
