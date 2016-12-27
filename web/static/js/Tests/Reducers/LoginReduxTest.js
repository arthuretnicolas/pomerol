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

// login

test('attempt', t => {
  const state = reducer(INITIAL_STATE, Actions.loginAttempt('joe@yopmail.com', 'yala1234'))

  t.true(state.attempting)
})

test('failure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.loginAttempt('joe@yopmail.com', 'yala1234'))
  const state = reducer(stateAttempt, Actions.loginFailure(FAKE_ERROR))

  t.false(state.attempting)
  t.is(state.jwt, '')
  t.is(state.error, FAKE_ERROR)
})

test('success', t => {
  const stateFailure = reducer(INITIAL_STATE, Actions.loginFailure(FAKE_ERROR))
  const state = reducer(stateFailure, Actions.loginSuccess({ jwt: FAKE_JWT }))

  t.false(state.attempting)
  t.is(state.jwt, FAKE_JWT)
  t.is(state.error, null)
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

  t.deepEqual(state.session, emptySession)
  t.is(state.jwt, '')
})

// fetch session

test('fetchSessionAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchSessionAttempt())

  t.true(state.attemptingSession)
})

test('fetchSessionFailure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.fetchSessionAttempt())
  const state = reducer(stateAttempt, Actions.fetchSessionFailure(FAKE_ERROR))

  t.false(state.attemptingSession)
  t.deepEqual(state.session, emptySession)
  t.is(state.errorSession, FAKE_ERROR)
})

test('fetchSessionSuccess', t => {
  const stateFailure = reducer(INITIAL_STATE, Actions.fetchSessionFailure(FAKE_ERROR))
  const state = reducer(stateFailure, Actions.fetchSessionSuccess(FAKE_SESSION))

  t.false(state.attemptingSession)
  t.deepEqual(state.session, FAKE_SESSION)
  t.is(state.errorSession, null)
})

// login with google

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

// request password

test('requestPasswordAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.requestPasswordAttempt('a@aol.com'))

  t.true(state.attemptingRequest)
})

test('requestPasswordFailure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.requestPasswordAttempt('a@aol.com'))
  const state = reducer(stateAttempt, Actions.requestPasswordFailure(FAKE_ERROR))

  t.false(state.attemptingRequest)
  t.is(state.errorRequest, FAKE_ERROR)
})

test('requestPasswordSuccess', t => {
  const stateFailure = reducer(INITIAL_STATE, Actions.requestPasswordFailure(FAKE_ERROR))
  const state = reducer(stateFailure, Actions.requestPasswordSuccess('a@aol.com'))

  t.false(state.attemptingRequest)
  t.is(state.errorRequest, null)
})

// reset password
test('resetPasswordAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.resetPasswordAttempt())

  t.true(state.attemptingReset)
})

test('resetPasswordFailure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.resetPasswordAttempt())
  const state = reducer(stateAttempt, Actions.resetPasswordFailure(FAKE_ERROR))

  t.false(state.attemptingReset)
  t.is(state.errorResetting, FAKE_ERROR)
})

test('resetPasswordSuccess', t => {
  const stateFailure = reducer(INITIAL_STATE, Actions.resetPasswordFailure(FAKE_ERROR))
  const state = reducer(stateFailure, Actions.resetPasswordSuccess())

  t.false(state.attemptingReset)
  t.is(state.errorResetting, null)
})
