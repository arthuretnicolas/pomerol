import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from 'containers'
import Main from 'components/Main'
import Contacts from 'containers/Contacts'

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Main} />
    <Route path='/contacts' component={Contacts} />
  </Route>
)
