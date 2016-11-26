// @flow

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from '../Containers'
import Landing from '../Components/Landing/Landing'
import Contacts from '../Containers/Contacts'
import GithubUsers from '../Containers/GithubUsers'

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Landing} />
    <Route path='/contacts' component={Contacts} />
    <Route path='/github-users' component={GithubUsers} />
    <Route path='*' component={() => <h1>Not found!</h1>} />
  </Route>
)
