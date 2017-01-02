// @flow

export function getOnboardingCompletedSteps (session: Object): number {
  const { user, organizations } = session
  const hasCompleteFirstStep =
    user &&
    user.first_name !== '' &&
    user.last_name !== '' &&
    user.country

  const hasCompletedSecondStep =
    organizations &&
    organizations.length >= 1

  if (!hasCompleteFirstStep) {
    return 0
  }

  if (!hasCompletedSecondStep) {
    return 1
  }

  return 2
}
