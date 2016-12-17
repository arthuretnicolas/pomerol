// @flow-weak

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import EmptyStateDashboard from '../../Shared/Components/EmptyStateDashboard'

type Props = {
  isAuthenticated: boolean
}

class ProtectedView extends Component {
  props: Props

  componentWillMount () {
    this._checkAuth()
  }

  componentWillReceiveProps (nextProps) {
    this._checkAuth(nextProps.isAuthenticated)
  }

  _checkAuth = (isAuthenticated: boolean = this.props.isAuthenticated) => {
    if (!isAuthenticated && browserHistory) {
      browserHistory.push('/login')
    }
  }

  render () {
    const { children, isAuthenticated } = this.props

    console.log('isAuthenticated', isAuthenticated)

    if (!isAuthenticated) {
      return <EmptyStateDashboard />
    }

    return (
      <div style={{ display: 'flex', flex: 1 }}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  isAuthenticated: !!login.session.user.id
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedView)
