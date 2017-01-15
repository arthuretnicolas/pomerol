import R from 'ramda'

const jwtSelector = R.path([ 'login', 'jwt' ])
const userIdSelector = R.path([ 'login', 'session', 'user', 'id' ])
const currentOrganizationIdSelector = R.path([ 'login', 'session', 'user', 'current_organization_id' ])

export {
  jwtSelector,
  userIdSelector,
  currentOrganizationIdSelector
}
