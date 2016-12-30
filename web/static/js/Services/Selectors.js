import R from 'ramda'

const jwtSelector = R.path([ 'login', 'jwt' ])
const userIdSelector = R.path([ 'login', 'session', 'user', 'id' ])

export {
  jwtSelector,
  userIdSelector
}
