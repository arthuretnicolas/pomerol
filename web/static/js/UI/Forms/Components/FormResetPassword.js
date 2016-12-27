// @flow

import React, { Component } from 'react'
import Form from './Form'
import FormInput from './FormInput'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    password: string
  },
  attempting: boolean
}

export default class FormResetPassword extends Component {
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
      password
    } = values

    return (
      <form
        className='Form-FormResetPassword'
        onSubmit={this._onSubmit}
      >
        <Form
          header='Reset password'
          text={{
            label: 'Need a MailChimp account?'
          }}
          buttonSubmit='Reset password'
          attempting={attempting}
          children={
            <div>
              <div>
                Password must be at least 5 character long
              </div>

              <FormInput
                value={password}
                type='password'
                placeholder='Your new password'
                onChange={event => onChange('password', event && event.target.value)}
              />
            </div>
          }
        />
      </form>
    )
  }
}
