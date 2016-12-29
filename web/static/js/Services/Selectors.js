import R from 'ramda'

const jwtSelector = R.path([ 'login', 'jwt' ])

export {
  jwtSelector
}
