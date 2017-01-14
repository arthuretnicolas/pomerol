// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'
import Select from './Select'
import {
  countries as listCountries,
  topCountries
} from '../../../Data/Countries'

const countries = {
  top: topCountries,
  list: listCountries
}

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    firstName: string,
    lastName: string,
    countryId: string | null
  },
  attempting: boolean
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
      attempting
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
          header='Personal infos'
          text={{
            label: 'Let\'s get to know you'
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
                disabled={attempting}
              />
              <Input
                label='Last name'
                value={lastName || ''}
                type='text'
                placeholder='Your last name'
                required
                onChange={event => onChange('lastName', event && event.target.value)}
                disabled={attempting}
              />
              <Select
                label='Country'
                selected={countryId}
                placeholder='Your country'
                required
                onChange={event => onChange('countryId', event && event.target.value)}
                top={countries.top}
                options={countries.list}
                disabled={attempting}
              />
            </div>
          }
        />
      </form>
    )
  }
}
