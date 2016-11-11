import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from 'containers'
import Main from 'components/Main'

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Main} />
    <Route path='/contacts' component={() => <h1>Contacts here</h1>} />
  </Route>
)
