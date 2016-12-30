// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    email: string,
    password: string
  },
  attempting: boolean
}

export default class FormLogin extends Component {
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
        className='Form-FormLogin'
        onSubmit={this._onSubmit}
      >
        <Form
          header='Login in'
          text={{
            label: 'Need a Pomerol account?',
            linkLabel: 'Create an account',
            to: '/signup'
          }}
          buttonSubmit='Log in'
          textLoading='Logging in...'
          attempting={attempting}
          fullWidthCta
          children={
            <div>
              <Input
                value={email}
                type='email'
                placeholder='Your email'
                required
                onChange={event => onChange('email', event && event.target.value)}
              />
              <Input
                value={password}
                type='password'
                placeholder='Your password'
                required
                onChange={event => onChange('password', event && event.target.value)}
              />
            </div>
          }
        />
      </form>
    )
  }
}
