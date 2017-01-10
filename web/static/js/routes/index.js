// @flow

import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Shared
import Counters from '../UI/Shared/Containers/Counters'
import GithubUsers from '../UI/Shared/Containers/GithubUsers'

// Landing
import Landing from '../UI/Landing/Components/Landing'

// Auth
import ProtectedViewFromUser from '../UI/Auth/Containers/ProtectedViewFromUser'
import ProtectedView from '../UI/Auth/Containers/ProtectedView'
import Signup from '../UI/Auth/Containers/Signup'
import Login from '../UI/Auth/Containers/Login'
import ResetPassword from '../UI/Auth/Containers/ResetPassword'
import ForgotPassword from '../UI/Auth/Containers/ForgotPassword'
import OnboardingOne from '../UI/Auth/Containers/OnboardingOne'
import OnboardingTwo from '../UI/Auth/Containers/OnboardingTwo'

// Dashboard
import DashboardContainer from '../UI/Dashboard/Containers/DashboardContainer'
import DashboardMain from '../UI/Dashboard/Containers/DashboardMain'
import DashboardQuotes from '../UI/Dashboard/Containers/DashboardQuotes'
import DashboardContacts from '../UI/Dashboard/Containers/DashboardContacts'
import DashboardBilling from '../UI/Dashboard/Containers/DashboardBilling'
import DashboardProfile from '../UI/Dashboard/Containers/DashboardProfile'
import DashboardSettings from '../UI/Dashboard/Containers/DashboardSettings'

export default (
  <Route path='/'>
    <IndexRoute component={Landing} />

    <Route component={ProtectedViewFromUser}>
      <Route path='/signup' component={Signup} />
      <Route path='/login(/:origin)' component={Login} />
      <Route path='/reset-password/:token' component={ResetPassword} />
      <Route path='/forgot-password' component={ForgotPassword} />
    </Route>

    <Route component={ProtectedView}>
      <Route path='/onboarding-one(/:origin)' component={OnboardingOne} />
      <Route path='/onboarding-two(/:origin)' component={OnboardingTwo} />
      <Route path='/counters' component={Counters} />
      <Route path='/github-users' component={GithubUsers} />

      <Route component={DashboardContainer}>
        <Route path='/contacts' component={DashboardContacts} />
        <Route path='/dashboard' component={DashboardMain} />
        <Route path='/quotes' component={DashboardQuotes} />
        <Route path='/billing' component={DashboardBilling} />
        <Route path='/profile' component={DashboardProfile} />
        <Route path='/settings' component={DashboardSettings} />
      </Route>

      <Route path='*' component={() => <h1>Not found!</h1>} />
    </Route>
  </Route>
)
