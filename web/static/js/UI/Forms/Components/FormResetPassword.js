// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'

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
          buttonSubmit='Reset password'
          contentLoading='Resetting password...'
          attempting={attempting}
          children={
            <div>
              <div>
                Password must be at least 5 character long
              </div>

              <Input
                value={password}
                type='password'
                placeholder='Your new password'
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
