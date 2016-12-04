// @flow

import React, { Component } from 'react'
import LoginActions from '../../Reducers/LoginRedux'
import Button from '../../Components/Button'
import { connect } from 'react-redux'

type Props = {
  logout: () => void
}

class DashboardMain extends Component {
  props: Props

  render () {
    const { logout } = this.props

    return (
      <div className='Dashboard-DashboardMain'>
        <div className='container'>
          <div>
            Dashboard main
          </div>

          <Button onClick={logout}>
            Log out
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMain)
