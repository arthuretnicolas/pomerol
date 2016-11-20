import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../Reducers/GithubRedux'

test('fetchUserRequest', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchUserRequest('Joe'))

  t.true(state.fetching)
})

test('fetchUserSuccess', t => {
  const user1 = {
    id: 0,
    name: 'Nicolas'
  }
  const user2 = {
    id: 1,
    name: 'Arthur'
  }

  const state1 = reducer(INITIAL_STATE, Actions.fetchUserSuccess(user1))
  const state2 = reducer(state1, Actions.fetchUserSuccess(user2))

  t.deepEqual(state1, {
    fetching: false,
    error: null,
    users: {
      [ user1.id ]: user1
    },
    ids: [ user1.id ]
  })

  t.deepEqual(state2, {
    fetching: false,
    error: null,
    users: {
      [ user1.id ]: user1,
      [ user2.id ]: user2
    },
    ids: [ user1.id, user2.id ]
  })
})

test('fetchUserFailure', t => {
  const state = reducer(INITIAL_STATE, Actions.fetchUserFailure())

  t.false(state.fetching)
  t.true(state.error)
})
