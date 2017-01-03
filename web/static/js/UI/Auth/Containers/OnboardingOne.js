// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOnboardingOne from '../../Forms/Components/FormOnboardingOne'
import OnboardingActions from '../../../Reducers/OnboardingRedux'
import LoginActions from '../../../Reducers/LoginRedux'

type CountriesType = {
  top_country_ids: Array<number>,
  countries: Array<{
    name: string,
    id: number
  }>
}
type Props = {
  fetchCountriesAttempt: () => void,
  updateUserAttempt: () => void,
  user: Object,
  onboarding: {
    attemptingCountries: boolean | null,
    countries: CountriesType | null
  },
  attemptingUpdate: boolean
}

class OnboardingOne extends Component {
  props: Props

  state = {
    firstName: this.props.user.first_name,
    lastName: this.props.user.last_name,
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
    const { updateUserAttempt } = this.props
    const {
      firstName,
      lastName,
      countryId
    } = this.state

    updateUserAttempt({
      first_name: firstName,
      last_name: lastName,
      country_id: countryId
    })
  }

  render () {
    const {
      onboarding,
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
  attemptingUpdate: login.attemptingUpdate
})

const mapDispatchToProps = dispatch => ({
  fetchCountriesAttempt: () => dispatch(OnboardingActions.fetchCountriesAttempt()),
  updateUserAttempt: (user: Object) => dispatch(LoginActions.updateUserAttempt(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingOne)
