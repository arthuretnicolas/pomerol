// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../Shared/Components/Button'

type Props = {
}

class DashboardBilling extends Component {
  props: Props

  render () {
    return (
      <div className='Dashboard-DashboardBilling'>
        <div className='container'>
          <h4 className='title'>
            You are currently using the 30 day free trial.
          </h4>

          <div>
            Your free plan is valid until March, 30th 2017
          </div>

          <Button
            className='button-upgrade'
            onClick={() => window.alert('Coming soon!')}
            content='Upgrade Account'
            size='small'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
  // logout: () => dispatch(LoginActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBilling)
