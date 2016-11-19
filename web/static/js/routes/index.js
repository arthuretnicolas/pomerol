// @flow

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from '../Containers'
import Main from '../Components/Main'
import Contacts from '../Containers/Contacts'

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Main} />
    <Route path='/contacts' component={Contacts} />
    <Route path='*' component={() => <h1>Not found!</h1>} />
  </Route>
)
