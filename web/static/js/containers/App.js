import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import configureStore from '../store'
import routes from '../routes/'

export default class App extends Component {
  render () {
    const history = browserHistory
    const router = (
      <Router history={history}>
        {routes}
      </Router>
    )
    const store = configureStore()

    return (
      <Provider store={store}>
        {router}
      </Provider>
    )
  }
}
