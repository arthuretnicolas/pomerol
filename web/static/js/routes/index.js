// @flow

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from '../Containers'
import Landing from '../Components/Landing/Landing'
import Contacts from '../Containers/Contacts'
import GithubUsers from '../Containers/GithubUsers'
import Signup from '../Containers/Signup'
import Login from '../Containers/Login'
import DashboardMain from '../Containers/Dashboard/DashboardMain'
import ProtectedView from '../Containers/ProtectedView'
import ProtectedViewFromUser from '../Containers/ProtectedViewFromUser'

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Landing} />

    <Route component={ProtectedViewFromUser}>
      <Route path='/signup' component={Signup} />
      <Route path='/login' component={Login} />
    </Route>

    <Route component={ProtectedView}>
      <Route path='/contacts' component={Contacts} />
      <Route path='/github-users' component={GithubUsers} />
      <Route path='/dashboard' component={DashboardMain} />
      <Route path='*' component={() => <h1>Not found!</h1>} />
    </Route>
  </Route>
)
