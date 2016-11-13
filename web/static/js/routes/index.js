import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from 'containers'
import Main from 'components/Main'
import Contacts from 'containers/Contacts'

export default (
  <Route path='/' component={AppContainer}>
    <IndexRoute component={Main} />
    <Route path='/contacts' component={Contacts} />
    <Route path='*' component={() => <h1>Not found!</h1>} />
  </Route>
)
