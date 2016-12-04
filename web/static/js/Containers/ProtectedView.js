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
  isAuthenticated: !!login.session
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView)
