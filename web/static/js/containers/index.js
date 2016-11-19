// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, RouterContext, browserHistory, createMemoryHistory, match } from 'react-router'
import rootSaga from '../Sagas'

import configureStore from '../Store'
import routes from '../Routes'

export default class App extends Component {
  render () {
    let initialState, history, router

    if (typeof window === 'undefined') {
      initialState = this.props.initial_state
      history = createMemoryHistory()
      match({ routes, location: this.props.location, history }, (err, redirect, props) => {
        if (props) {
          router = (
            <RouterContext {...props} />
          )
        }

        if (err) {
          // Since it's a very basic app, we don't handle any errors, however in real app you will have do this.
          // Please, refer to https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
          // to find more relevant information.
        }
      })
    } else {
      initialState = window.__INITIAL_STATE__
      history = browserHistory
      router = (
        <Router history={history}>
          {routes}
        </Router>
      )
    }

    const store = configureStore(initialState)
    store.runSaga(rootSaga)

    return (
      <Provider store={store}>
        {router}
      </Provider>
    )
  }
}

/*
  It was our final step in client-side, now we need to compile the server bundle on user’s request to send it to him.
  In a real world I’d use precompiled (cached) bundles which are recompiled on the related state change.
  One day I will cover this topic as well but now we are still building a simple app
  and generating the bundle on the fly will work just fine.
*/
