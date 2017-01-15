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

test('organizationAttempt', t => {
  const state = reducer(INITIAL_STATE, Actions.organizationAttempt(FAKE_ORGANIZATION_ID))

  t.true(state.attempting)
})

test('organizationFailure', t => {
  const stateAttempting = reducer(INITIAL_STATE, Actions.organizationAttempt(FAKE_ORGANIZATION_ID))
  const state = reducer(stateAttempting, Actions.organizationFailure(FAKE_ERROR))

  t.false(state.attempting)
  t.is(state.error, FAKE_ERROR)
})

test('organizationSuccess', t => {
  const stateAttempting = reducer(INITIAL_STATE, Actions.organizationAttempt(FAKE_ORGANIZATION_ID))
  const state = reducer(stateAttempting, Actions.organizationSuccess(FAKE_ORGANIZATION))

  t.false(state.attempting)
  t.is(state.error, null)
  t.true(state.list.map(org => org.id).includes(FAKE_ORGANIZATION_ID))
})
