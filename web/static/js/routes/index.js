// @flow

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from '../Containers'
import Landing from '../Components/Landing/Landing'
import Counters from '../Containers/Counters'
import GithubUsers from '../Containers/GithubUsers'

// Auth
import ProtectedViewFromUser from '../Containers/ProtectedViewFromUser'
import ProtectedView from '../Containers/ProtectedView'
import Signup from '../Containers/Signup'
import Login from '../Containers/Login'

// Dashboard
import DashboardContainer from '../Containers/Dashboard/DashboardContainer'
import DashboardMain from '../Containers/Dashboard/DashboardMain'
import DashboardQuotes from '../Containers/Dashboard/DashboardQuotes'
import DashboardContacts from '../Containers/Dashboard/DashboardContacts'

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Landing} />
    <Route path='/counters' component={Counters} />
    <Route path='/github-users' component={GithubUsers} />

    <Route component={ProtectedViewFromUser}>
      <Route path='/signup' component={Signup} />
      <Route path='/login' component={Login} />
    </Route>

    <Route component={ProtectedView}>
      <Route path='/counters' component={Counters} />
      <Route path='/github-users' component={GithubUsers} />

      <Route component={DashboardContainer}>
        <Route path='/dashboard' component={DashboardMain} />
        <Route path='/quotes' component={DashboardQuotes} />
        <Route path='/contacts' component={DashboardContacts} />
      </Route>

      <Route path='*' component={() => <h1>Not found!</h1>} />
    </Route>
  </Route>
)
