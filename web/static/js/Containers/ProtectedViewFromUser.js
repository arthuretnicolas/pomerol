// @flow-weak

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

type Props = {
  isRehydrated: boolean,
  isAuthenticated: boolean
}

class ProtectedViewFromUser extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps () {
    this._checkAuth()
  }

  _checkAuth = () => {
    const { isAuthenticated } = this.props

    if (isAuthenticated) {
      browserHistory.push('/github-users')
    }
  }

  render () {
    const {
      children,
      isRehydrated,
      isAuthenticated
    } = this.props

    if (isAuthenticated || !isRehydrated) {
      return null
    }

    return (
      <div style={{ display: 'flex', flex: 1 }}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = ({ startup, login }) => ({
  isAuthenticated: !!login.jwt,
  isAuthenticated: login.session
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedViewFromUser)
