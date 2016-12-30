// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOnboardingOne from '../../Forms/Components/FormOnboardingOne'
import OnboardingActions from '../../../Reducers/OnboardingRedux'

type CountriesType = {
  top_country_ids: Array<number>,
  countries: Array<{
    name: string,
    id: number
  }>
}
type Props = {
  jwt: string,
  fetchCountriesAttempt: () => void,
  onboarding: {
    attemptingCountries: boolean | null,
    countries: CountriesType | null
  }
}

class OnboardingOne extends Component {
  props: Props

  state = {
    firstName: '',
    lastName: '',
    countryId: null
  }

  componentWillMount () {
    const {
      onboarding,
      fetchCountriesAttempt,
      jwt
    } = this.props

    const shouldFetchCountries =
      onboarding.countries === null &&
      !onboarding.attemptingCountries

    if (shouldFetchCountries) {
      fetchCountriesAttempt(jwt)
    }
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
    const {
      onboarding
      // attemptingRequest
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
            attempting={false}
            countries={onboarding.countries}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login, onboarding }) => ({
  jwt: login.jwt,
  onboarding
})

const mapDispatchToProps = dispatch => ({
  fetchCountriesAttempt: (jwt: string) => dispatch(OnboardingActions.fetchCountriesAttempt(jwt))
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingOne)
