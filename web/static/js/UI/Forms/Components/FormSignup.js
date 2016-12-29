// @flow

import React, { Component } from 'react'
import Form from './Form'
import FormInput from './FormInput'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    email: string,
    password: string
  },
  attempting: boolean
}

export default class FormSignup extends Component {
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
      email,
      password
    } = values

    return (
      <form
        className='Form-FormSignup'
        onSubmit={this._onSubmit}
      >
        <Form
          header='Get started with a free account'
          text={{
            label: 'Already have a MailChimp account?',
            linkLabel: 'Log in',
            to: '/login'
          }}
          buttonSubmit='Sign up'
          textLoading='Signing up...'
          attempting={attempting}
          fullWidthCta
          children={
            <div>
              <FormInput
                value={email}
                type='email'
                placeholder='Your email'
                required
                onChange={event => onChange('email', event && event.target.value)}
              />
              <FormInput
                value={password}
                type='password'
                placeholder='Your password'
                required
                minLength={5}
                onChange={event => onChange('password', event && event.target.value)}
              />
            </div>
          }
        />
      </form>
    )
  }
}
