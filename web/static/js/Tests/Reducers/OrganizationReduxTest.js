import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../Reducers/OrganizationRedux'

const FAKE_ORGANIZATION_ID = '123'
const FAKE_ERROR = 'SERVER STILL DOWN'
const FAKE_ORGANIZATION = {
  id: FAKE_ORGANIZATION_ID,
  name: 'Da orga',
  members: [{
    name: 'joe',
    id: 666
  }]
}
const FAKE_ORGANIZATION_INPUT = {
  id: 666,
  name: 'Big corpo',
  countryId: 1
}
const FAKE_ORGANIZATION_OUTPUT_2 = {
  name: 'Big corpo 2',
  countryId: 1,
  id: 666
}

test('fetchOrganizationAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchOrganizationAttempt(FAKE_ORGANIZATION_ID))

  t.true(state.attempting)
})

test('organizationFailure', t => {
  const stateAttempting = reducer(INITIAL_STATE, Actions.fetchOrganizationAttempt(FAKE_ORGANIZATION_ID))
  const state = reducer(stateAttempting, Actions.organizationFailure(FAKE_ERROR))

  t.false(state.attempting)
  t.is(state.error, FAKE_ERROR)
})

test('organizationSuccess', t => {
  const stateAttempting = reducer(INITIAL_STATE, Actions.fetchOrganizationAttempt(FAKE_ORGANIZATION_ID))
  const state = reducer(stateAttempting, Actions.organizationSuccess(FAKE_ORGANIZATION))

  t.false(state.attempting)
  t.is(state.error, null)
  t.true(state.list.map(org => org.id).includes(FAKE_ORGANIZATION_ID))
})

// update organization
test('updateOrganizationAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.updateOrganizationAttempt(FAKE_ORGANIZATION_INPUT))

  t.true(state.attempting)
})

test('updateOrganizationFailure', t => {
  const stateAttempt = reducer(INITIAL_STATE, Actions.updateOrganizationAttempt(FAKE_ORGANIZATION_INPUT))
  const state = reducer(stateAttempt, Actions.updateOrganizationFailure(FAKE_ERROR))

  t.false(state.attempting)
  t.is(state.error, FAKE_ERROR)
})

test('updateOrganizationSuccess', t => {
  const stateFailure = reducer(INITIAL_STATE, Actions.updateOrganizationFailure(FAKE_ERROR))
  const state = reducer(stateFailure, Actions.updateOrganizationSuccess(FAKE_ORGANIZATION_OUTPUT_2))

  const organization = state.list.find(org => org.id === FAKE_ORGANIZATION_INPUT.id)

  t.false(state.attempting)
  t.is(state.error, null)
  t.is(organization.name, FAKE_ORGANIZATION_OUTPUT_2.name)
})
