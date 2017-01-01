// @flow

export function getOnboardingCompletedSteps (user: Object): number {
  const hasCompleteFirstStep =
    user &&
    user.first_name !== '' &&
    user.last_name !== '' &&
    user.country

  const hasCompletedSecondStep = user && user.current_organization_id

  if (!hasCompleteFirstStep) {
    return 0
  }

  if (!hasCompletedSecondStep) {
    return 1
  }

  return 2
}
