// @flow

export function hasCompleteProfile (user: Object): boolean {
  const hasCompleteProfile =
    user &&
    user.first_name !== '' &&
    user.last_name !== '' &&
    user.country

  return hasCompleteProfile
}
