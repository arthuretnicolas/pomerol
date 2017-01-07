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

class OnboardingOne extends Component {
  props: Props

  state = {
    firstName: this.props.user.first_name,
    lastName: this.props.user.last_name,
    countryId: this.props.user.countryId
  }

  _onChange = (key, value: string | number) => {
    this.setState({
      [key]: value
    })
  }

  _submit = () => {
    const { updateUserAttempt } = this.props
    const {
      firstName,
      lastName,
      countryId
    } = this.state

    updateUserAttempt({
      first_name: firstName,
      last_name: lastName,
      country_code: countryId
    })
  }

  render () {
    const {
      attemptingUpdate
    } = this.props
    const {
      firstName,
      lastName,
      countryId
    } = this.state

    return (
      <div className='Auth-OnboardingOne'>
        <div className='form-container'>
          <FormOnboardingOne
            onChange={this._onChange}
            onSubmit={this._submit}
            values={{ firstName, lastName, countryId }}
            attempting={attemptingUpdate}
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
