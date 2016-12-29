// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOnboardingOne from '../../Forms/Components/FormOnboardingOne'

type Props = {
  user: Object
}

class OnboardingOne extends Component {
  props: Props

  state = {
    firstName: '',
    lastName: '',
    countryId: ''
  }

  _onChange = (key, value: string) => {
    this.setState({
      [key]: value
    })
  }

  _submit = () => {
    // const { requestPasswordAttempt } = this.props
    const {
      firstName,
      lastName,
      countryId
    } = this.state

    console.log(firstName, lastName, countryId)
  }

  render () {
    // const { attemptingRequest } = this.props
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
            // attempting={attemptingRequest}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  use: login.session.user
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingOne)
