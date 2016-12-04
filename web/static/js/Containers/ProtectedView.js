// @flow-weak

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

type Props = {
  isAuthenticated: boolean
}

class ProtectedView extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps () {
    this._checkAuth()
  }

  _checkAuth = () => {
    const { isAuthenticated } = this.props

    if (!isAuthenticated && browserHistory) {
      browserHistory.push('/login')
    }
  }

  render () {
    const { children, isAuthenticated } = this.props

    if (!isAuthenticated) {
      return null
    }

    return (
      <div style={{ display: 'flex', flex: 1 }}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
<<<<<<< 497653de286fb87d43f4870bb4e6fdf7148a63fd
  isAuthenticated: !!login.jwt
=======
  isAuthenticated: !!login.session
>>>>>>> Added logout
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView)
