import test from 'ava'
import Actions, {
  reducer,
  INITIAL_STATE,
  emptySession
} from '../../Reducers/LoginRedux'

const FAKE_JWT = 'NFziefoniozef'
const FAKE_ERROR = 'SERVER_DOWN'
const FAKE_SESSION = {
  user: {
    last_name: 'panibratov',
    id: 1
  },
  organizations: [
    {
      name: 'Parmentier Corp',
      id: 1
    }
  ]
}

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.loginAttempt('joe@yopmail.com', 'yala1234'))

  t.true(state.attempting)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess({ jwt: FAKE_JWT }))

  t.false(state.attempting)
  t.is(state.jwt, FAKE_JWT)
  t.deepEqual(state.error, null)
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure(FAKE_ERROR))

  t.false(state.attempting)
  t.is(state.jwt, '')
  t.deepEqual(state.error, FAKE_ERROR)
})

test('cancel', t => {
  const state = reducer(INITIAL_STATE, Actions.loginCancel())

  t.false(state.attempting)
  t.is(state.jwt, '')
  t.deepEqual(state.error, 'CANCELLED')
})

test('logout', t => {
  const stateLogged = reducer(INITIAL_STATE, Actions.loginSuccess('joe@yopmail.com', 'yala1234'))
  const stateLoggedWithSession = reducer(stateLogged, Actions.fetchSessionSuccess(FAKE_SESSION))
  const state = reducer(stateLoggedWithSession, Actions.logout())

  t.deepEqual(state, {
    attempting: false,
    error: null,
    jwt: '',
    attemptingSession: false,
    session: emptySession,
    errorSession: null
  })
})

test('fetchSessionAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchSessionAttempt())

  t.true(state.attemptingSession)
})

test('fetchSessionSuccess', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchSessionSuccess(FAKE_SESSION))

  t.false(state.attemptingSession)
  t.deepEqual(state.session, FAKE_SESSION)
  t.is(state.errorSession, null)
})

test('fetchSessionFailure', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchSessionFailure(FAKE_ERROR))

  t.false(state.attemptingSession)
  t.deepEqual(state.session, emptySession)
  t.deepEqual(state.errorSession, FAKE_ERROR)
})
