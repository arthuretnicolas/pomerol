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
const FAKE_PROFILE_OBJ = {
  imageUrl: 'daImageUrl',
  email: 'a@aol.com',
  givenName: 'Anton',
  familyName: 'Panibratov'
}

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.loginAttempt('joe@yopmail.com', 'yala1234'))

  t.true(state.attempting)
})

test('success', t => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess({ jwt: FAKE_JWT }))

  t.false(state.attempting)
  t.is(state.jwt, FAKE_JWT)
  t.is(state.error, null)
})

test('failure', t => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure(FAKE_ERROR))

  t.false(state.attempting)
  t.is(state.jwt, '')
  t.is(state.error, FAKE_ERROR)
})

test('cancel', t => {
  const state = reducer(INITIAL_STATE, Actions.loginCancel())

  t.false(state.attempting)
  t.is(state.jwt, '')
  t.is(state.error, 'CANCELLED')
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
  t.is(state.errorSession, FAKE_ERROR)
})

test('loginWithGoogleSuccess', t => {
  const state = reducer(INITIAL_STATE, Actions.loginWithGoogleSuccess(FAKE_JWT, FAKE_PROFILE_OBJ))

  t.false(state.attemptingSession)
  t.is(state.jwt, FAKE_JWT)
  // t.is(state.session.user.email, FAKE_PROFILE_OBJ.email)
  t.is(state.session.user.first_name, FAKE_PROFILE_OBJ.givenName)
  t.is(state.session.user.last_name, FAKE_PROFILE_OBJ.familyName)
  t.is(state.session.user.avatarUrl, FAKE_PROFILE_OBJ.imageUrl)
  t.is(state.errorSession, null)
})
