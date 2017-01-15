import test from 'ava'
import Actions, {
  reducer,
  INITIAL_STATE,
  emptySession
} from '../../Reducers/LoginRedux'

const FAKE_ID = 777
const FAKE_JWT = 'NFziefoniozef'
const FAKE_ERROR = 'SERVER_DOWN'
const FAKE_SESSION = {
  user: {
    last_name: 'panibratov',
    id: 1,
    current_organization_id: null
  },
  organizations: [
    {
      name: 'Parmentier Corp',
      id: 1
    }
  ]
}
const FAKE_USER = {
  id: 1,
  name: 'JOE',
  organizations: [
    {
      id: 111,
      name: 'Evil Corp'
    }
  ]
}
const FAKE_ORGANIZATION_INPUT = {
  name: 'Big corpo',
  countryId: 1
}
const FAKE_ORGANIZATION_OUTPUT_2 = {
  name: 'Big corpo 2',
  countryId: 1
}
const FAKE_ORGANIZATION_OUTPUT = {
  id: 666,
  name: 'Big corpo',
  members: [{
    role: 'owner',
    name: 'Joe'
  }]
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
  t.false(state.attemptingGoogle)
  t.is(state.jwt, '')
  t.is(state.error, FAKE_ERROR)
})

test('success', t => {
  const stateFailure = reducer(INITIAL_STATE, Actions.loginFailure(FAKE_ERROR))
  const state = reducer(stateFailure, Actions.loginSuccess(FAKE_JWT))

  t.false(state.attempting)
  t.false(state.attemptingGoogle)
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
  const state = reducer(INITIAL_STATE, Actions.preloginWithGoogleSuccess(FAKE_SESSION))
  t.true(state.attemptingGoogle)
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

// update user
test('updateUserAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.updateUserAttempt())

  t.true(state.attemptingUpdate)
})

test('updateUserFailure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.updateUserAttempt())
  const state = reducer(stateAttempt, Actions.updateUserFailure(FAKE_ERROR))

  t.false(state.attemptingUpdate)
  t.is(state.errorUpdating, FAKE_ERROR)
})

test('updateUserSuccess', t => {
  const stateLogged = reducer(INITIAL_STATE, Actions.loginSuccess('joe@yopmail.com', 'yala1234'))
  const stateLoggedWithSession = reducer(stateLogged, Actions.fetchSessionSuccess(FAKE_SESSION))
  const state = reducer(stateLoggedWithSession, Actions.updateUserSuccess(FAKE_USER))

  t.false(state.attemptingUpdate)
  t.is(state.errorUpdating, null)
  t.deepEqual(state.session.user, FAKE_USER)
})

// create organization
test('createOrganizationAttempt', t => {
  const stateLogged = reducer(INITIAL_STATE, Actions.loginSuccess('joe@yopmail.com', 'yala1234'))
  const stateLoggedWithSession = reducer(stateLogged, Actions.fetchSessionSuccess(FAKE_SESSION))
  const state = reducer(stateLoggedWithSession, Actions.createOrganizationAttempt(FAKE_ORGANIZATION_INPUT))

  t.true(state.attemptingOrganization)
})

test('createOrganizationFailure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.createOrganizationAttempt(FAKE_ORGANIZATION_INPUT))
  const state = reducer(stateAttempt, Actions.createOrganizationFailure(FAKE_ERROR))

  t.false(state.attemptingOrganization)
  t.is(state.errorOrganisation, FAKE_ERROR)
})

test('createOrganizationSuccess', t => {
  const stateFailure = reducer(INITIAL_STATE, Actions.createOrganizationFailure(FAKE_ERROR))
  const stateAttempt = reducer(stateFailure, Actions.createOrganizationAttempt(FAKE_ORGANIZATION_INPUT))
  const state = reducer(stateAttempt, Actions.createOrganizationSuccess(FAKE_ORGANIZATION_OUTPUT))

  const listOrganizationIds = state.session.organizations.map(org => org.id)

  t.false(state.attemptingOrganization)
  t.is(state.errorOrganisation, null)
  t.true(listOrganizationIds.includes(FAKE_ORGANIZATION_OUTPUT.id))
})

// update organization
test('updateOrganizationAttempt', t => {
  const stateLogged = reducer(INITIAL_STATE, Actions.loginSuccess('joe@yopmail.com', 'yala1234'))
  const stateLoggedWithSession = reducer(stateLogged, Actions.fetchSessionSuccess(FAKE_SESSION))
  const state = reducer(stateLoggedWithSession, Actions.updateOrganizationAttempt(FAKE_ORGANIZATION_INPUT))

  t.true(state.attemptingOrganization)
})

test('updateOrganizationFailure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.updateOrganizationAttempt(FAKE_ORGANIZATION_INPUT))
  const state = reducer(stateAttempt, Actions.updateOrganizationFailure(FAKE_ERROR))

  t.false(state.attemptingOrganization)
  t.is(state.errorOrganisation, FAKE_ERROR)
})

test('updateOrganizationSuccess', t => {
  const stateWithOrganization = reducer(INITIAL_STATE, Actions.createOrganizationSuccess(FAKE_ORGANIZATION_INPUT))
  const state = reducer(stateWithOrganization, Actions.updateOrganizationSuccess(FAKE_ORGANIZATION_OUTPUT_2))

  const organization = state.session.organizations.find(org => org.id === FAKE_ORGANIZATION_INPUT.id)

  t.false(state.attemptingOrganization)
  t.is(state.errorOrganisation, null)
  t.is(organization.name, FAKE_ORGANIZATION_OUTPUT_2.name)
})

// set current organization
test('setCurrentOrganization', t => {
  const stateLogged = reducer(INITIAL_STATE, Actions.loginSuccess('joe@yopmail.com', 'yala1234'))
  const stateLoggedWithSession = reducer(stateLogged, Actions.fetchSessionSuccess(FAKE_SESSION))
  const state = reducer(stateLoggedWithSession, Actions.setCurrentOrganization(FAKE_ID))

  t.is(state.session.user && state.session.user.current_organization_id, FAKE_ID)
})

// update password
test('updatePasswordAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.updatePasswordAttempt())

  t.true(state.attemptingUpdatePassword)
})

test('updatePasswordFailure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.updatePasswordAttempt())
  const state = reducer(stateAttempt, Actions.updatePasswordFailure(FAKE_ERROR))

  t.false(state.attemptingUpdatePassword)
  t.is(state.errorUpdatingPassword, FAKE_ERROR)
})

test('updatePasswordAttempt', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.updatePasswordAttempt())
  const stateFailure = reducer(stateAttempt, Actions.updatePasswordFailure())
  const state = reducer(stateFailure, Actions.updatePasswordSuccess())

  t.false(state.attemptingUpdatePassword)
  t.is(state.errorUpdatingPassword, null)
})
