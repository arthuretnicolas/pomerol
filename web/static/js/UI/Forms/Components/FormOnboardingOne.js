// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'
import Select from './Select'

type CountriesType = {
  top_country_ids: Array<string>,
  countries: Array<{
    name: string,
    id: string
  }>
}
type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    firstName: string,
    lastName: string,
    countryId: string | null
  },
  attempting: boolean,
  countries: CountriesType | null
}

export default class FormOnboardingOne extends Component {
  props: Props

  _onSubmit = (event: Event) => { // eslint-disable-line
    const { onSubmit } = this.props
    event.preventDefault()

    onSubmit()
  }

  render () {
    const {
      onChange,
      values,
      attempting,
      countries
    } = this.props

    const {
      firstName,
      lastName,
      countryId
    } = values

    return (
      <form
        className='Form-FormOnboardingOne'
        onSubmit={this._onSubmit}
      >
        <Form
          header='Onboarding one'
          text={{
            label: 'Blablabla'
          }}
          buttonSubmit='Next'
          contentLoading='Next...'
          attempting={attempting}
          fullWidthCta
          children={
            <div>
              <Input
                label='First name'
                value={firstName || ''}
                type='text'
                placeholder='Your first name'
                required
                onChange={event => onChange('firstName', event && event.target.value)}
              />
              <Input
                label='Last name'
                value={lastName || ''}
                type='text'
                placeholder='Your last name'
                required
                onChange={event => onChange('lastName', event && event.target.value)}
              />
              {
                !!countries && <Select
                  label='Country'
                  selected={countryId}
                  placeholder='Your country'
                  required
                  onChange={event => onChange('countryId', event && event.target.value)}
                  top={countries.top_country_ids}
                  options={countries.countries}
                />
              }
            </div>
          }
        />
      </form>
    )
  }
}
