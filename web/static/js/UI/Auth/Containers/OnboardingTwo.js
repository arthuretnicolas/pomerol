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

type ValueProps = {
  name: string,
  phone: string,
  website: string,
  address1: string,
  address2: string,
  zip: string,
  city: string,
  country: string
}

class OnboardingTwo extends Component {
  props: Props

  _onSubmit = (values: ValueProps) => {
    const { createOrganizationAttempt } = this.props
    const {
      name,
      phone,
      website,
      address1,
      address2,
      zip,
      city,
      country
    } = values

    createOrganizationAttempt({
      name,
      phone,
      website,
      address1,
      address2,
      zip,
      city,
      country_code: country
    })
  }

  render () {
    const { attemptingOrganization } = this.props

    return (
      <div className='Auth-OnboardingTwo'>
        <div className='form-container'>
          <FormOnboardingTwo
            onSubmit={this._onSubmit}
            attempting={attemptingOrganization}
            size='base'
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
