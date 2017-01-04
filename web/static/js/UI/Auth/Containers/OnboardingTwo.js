// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOnboardingTwo from '../../Forms/Components/FormOnboardingTwo'
import OnboardingActions from '../../../Reducers/OnboardingRedux'
import LoginActions from '../../../Reducers/LoginRedux'

type CountriesType = {
  top_country_ids: Array<string>,
  countries: Array<{
    name: string,
    id: string
  }>
}
type Props = {
  fetchCountriesAttempt: () => void,
  createOrganizationAttempt: () => void,
  user: Object,
  onboarding: {
    attemptingCountries: boolean | null,
    countries: CountriesType | null
  },
  attemptingOrganization: boolean
}

class OnboardingTwo extends Component {
  props: Props

  state = {
    name: '',
    phoneNumber: '',
    website: '',
    address: '',
    countryId: this.props.user.countryId
  }

  componentWillMount () {
    const {
      onboarding,
      fetchCountriesAttempt
    } = this.props

    const shouldFetchCountries =
      onboarding.countries === null &&
      !onboarding.attemptingCountries

    if (shouldFetchCountries) {
      fetchCountriesAttempt()
    }
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
      address,
      countryId
    } = this.state

    createOrganizationAttempt({
      name,
      phone: phoneNumber,
      website,
      address,
      country_id: countryId
    })
  }

  render () {
    const {
      onboarding,
      attemptingOrganization
    } = this.props
    const {
      name,
      phoneNumber,
      website,
      address,
      countryId
    } = this.state

    return (
      <div className='Auth-OnboardingTwo'>
        <div className='form-container'>
          <FormOnboardingTwo
            onChange={this._onChange}
            onSubmit={this._submit}
            values={{ name, phoneNumber, website, address, countryId }}
            attempting={attemptingOrganization}
            countries={onboarding.countries}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login, onboarding }) => ({
  user: login.session.user,
  onboarding,
  attemptingOrganization: login.attemptingOrganization
})

const mapDispatchToProps = dispatch => ({
  fetchCountriesAttempt: () => dispatch(OnboardingActions.fetchCountriesAttempt()),
  createOrganizationAttempt: (organization: Object) => dispatch(LoginActions.createOrganizationAttempt(organization))
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingTwo)
