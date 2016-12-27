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

// Dashboard
import DashboardContainer from '../UI/Dashboard/Components/DashboardContainer'
import DashboardMain from '../UI/Dashboard/Containers/DashboardMain'
import DashboardQuotes from '../UI/Dashboard/Containers/DashboardQuotes'
import DashboardContacts from '../UI/Dashboard/Containers/DashboardContacts'
import DashboardSettings from '../UI/Dashboard/Containers/DashboardSettings'

export default (
  <Route path='/'>
    <IndexRoute component={Landing} />

    <Route component={ProtectedViewFromUser}>
      <Route path='/signup' component={Signup} />
      <Route path='/login(/:origin)' component={Login} />
      <Route path='/reset-password/:token' component={ResetPassword} />
    </Route>

    <Route component={ProtectedView}>
      <Route path='/counters' component={Counters} />
      <Route path='/github-users' component={GithubUsers} />

      <Route component={DashboardContainer}>
        <Route path='/dashboard' component={DashboardMain} />
        <Route path='/quotes' component={DashboardQuotes} />
        <Route path='/contacts' component={DashboardContacts} />
        <Route path='/settings' component={DashboardSettings} />
      </Route>

      <Route path='*' component={() => <h1>Not found!</h1>} />
    </Route>
  </Route>
)
