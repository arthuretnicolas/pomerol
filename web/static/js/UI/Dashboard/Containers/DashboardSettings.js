// @flow

import React, { Component } from 'react'
import LoginActions from '../../../Reducers/LoginRedux'
import { connect } from 'react-redux'
import Button from '../../Shared/Components/Button'

type Props = {
  logout: () => void
}

class DashboardSettings extends Component {
  props: Props

  render () {
    const { logout } = this.props

    return (
      <div className='container-content'>
        Settings

        <Button onClick={logout}>
          Log out
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(LoginActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSettings)
