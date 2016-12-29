// @flow

import React, { Component } from 'react'
import Form from './Form'
import FormInput from './FormInput'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    firstName: string,
    lastName: string,
    countryId: number
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
          header='Onboarding one'
          text={{
            label: 'Blablabla'
          }}
          buttonSubmit='Next'
          textLoading='Next...'
          attempting={attempting}
          fullWidthCta
          children={
            <div>
              <FormInput
                value={firstName}
                type='text'
                placeholder='Your first name'
                required
                onChange={event => onChange('firstName', event && event.target.value)}
              />
              <FormInput
                value={lastName}
                type='text'
                placeholder='Your last name'
                required
                onChange={event => onChange('lastName', event && event.target.value)}
              />
              <FormInput
                value={countryId}
                type='text'
                placeholder='Your country id (to be changed)'
                required
                onChange={event => onChange('countryId', event && event.target.value)}
              />
            </div>
          }
        />
      </form>
    )
  }
}
