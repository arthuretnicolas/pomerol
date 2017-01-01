// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOnboardingTwo from '../../Forms/Components/FormOnboardingTwo'
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
    // const { updateUserAttempt } = this.props
    const {
      name,
      phoneNumber,
      website,
      address,
      countryId
    } = this.state

    console.log(name, phoneNumber, website, address, countryId)

    // updateUserAttempt({
    //   first_name: firstName,
    //   last_name: lastName,
    //   country_id: countryId
    // })
  }

  render () {
    const {
      onboarding,
      attemptingUpdate
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
  updateUserAttempt: (userInfos: Object) => dispatch(LoginActions.updateUserAttempt(userInfos))
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingTwo)
