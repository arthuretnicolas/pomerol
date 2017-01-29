// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOnboardingOne from '../../Forms/Components/FormOnboardingOne'
import LoginActions from '../../../Reducers/LoginRedux'

type Props = {
  updateUserAttempt: () => void,
  user: Object,
  attemptingUpdate: boolean
}

type ValueProps = {
  firstName: string,
  lastName: string,
  countryId: string
}

class OnboardingOne extends Component {
  props: Props

  _onSubmit = (values: ValueProps) => {
    const { updateUserAttempt } = this.props
    const {
      firstName,
      lastName,
      countryId
    } = values

    updateUserAttempt({
      first_name: firstName,
      last_name: lastName,
      country_code: countryId
    })
  }

  render () {
    const { attemptingUpdate } = this.props

    return (
      <div className='Auth-OnboardingOne'>
        <div className='form-container'>
          <FormOnboardingOne
            onSubmit={this._onSubmit}
            attempting={attemptingUpdate}
            size='base'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  user: login.session.user,
  attemptingUpdate: login.attemptingUpdate
})

const mapDispatchToProps = dispatch => ({
  updateUserAttempt: (user: Object) => dispatch(LoginActions.updateUserAttempt(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingOne)
