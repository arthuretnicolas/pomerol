// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'
import Link from '../../Shared/Components/Link'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    email: string
  },
  attempting: boolean
}

export default class FormForgotPassword extends Component {
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
      email
    } = values

    return (
      <form
        className='Form-FormForgotPassword'
        onSubmit={this._onSubmit}
      >
        <Form
          header='Ask for a new password'
          text={{
            label: 'Enter your email to reset your password.'
          }}
          buttonSubmit='Reset password'
          contentLoading='Reset password...'
          attempting={attempting}
          children={(
            <div>
              <Input
                label='Email'
                value={email}
                type='email'
                placeholder='Your email'
                required
                onChange={event => onChange('email', event && event.target.value)}
                disabled={attempting}
              />
            </div>
          )}
          alternativeCta={(
            <Link to='/login'>
              Return to login
            </Link>
          )}
        />
      </form>
    )
  }
}
