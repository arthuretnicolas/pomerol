// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOnboardingTwo from '../../Forms/Components/FormOnboardingTwo'
import LoginActions from '../../../Reducers/LoginRedux'

type Props = {
  createOrganizationAttempt: () => void,
  user: Object,
  attemptingOrganization: boolean
}

class OnboardingTwo extends Component {
  props: Props

  state = {
    name: '',
    phoneNumber: '',
    website: '',
    address1: '',
    address2: '',
    zip: '',
    city: '',
    countryId: this.props.user.countryId
  }

  _onChange = (key, value: string | number) => {
    this.setState({
      [key]: value
    })
  }

  _submit = () => {
    const { createOrganizationAttempt } = this.props
    const {
      name,
      phoneNumber,
      website,
      address1,
      address2,
      zip,
      city,
      countryId
    } = this.state

    createOrganizationAttempt({
      name,
      phone: phoneNumber,
      website,
      address1,
      address2,
      zip,
      city,
      country_code: countryId
    })
  }

  render () {
    const {
      attemptingOrganization
    } = this.props
    const {
      name,
      phoneNumber,
      website,
      address1,
      address2,
      zip,
      city,
      countryId
    } = this.state

    return (
      <div className='Auth-OnboardingTwo'>
        <div className='form-container'>
          <FormOnboardingTwo
            onChange={this._onChange}
            onSubmit={this._submit}
            values={{
              name,
              phoneNumber,
              website,
              address1,
              address2,
              zip,
              city,
              countryId
            }}
            attempting={attemptingOrganization}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  user: login.session.user,
  attemptingOrganization: login.attemptingOrganization
})

const mapDispatchToProps = dispatch => ({
  createOrganizationAttempt: (organization: Object) => dispatch(LoginActions.createOrganizationAttempt(organization))
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingTwo)
