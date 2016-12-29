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
      <div className='Dashboard-DashboardSettings'>
        <div className='container'>
          <div>
            Settings
          </div>

          <Button
            onClick={logout}
            text='Log out'
          />
        </div>
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
