// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    password: string,
    newPassword1: string,
    newPassword2: string
  },
  attempting: boolean,
  disabled?: boolean
}

export default class FormPassword extends Component {
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
      disabled
    } = this.props

    const {
      password,
      newPassword1,
      newPassword2
    } = values

    return (
      <form
        className='Form-FormPassword'
        onSubmit={this._onSubmit}
      >
        <Form
          buttonSubmit='Update'
          buttonSize='small'
          contentLoading='Updating...'
          attempting={attempting}
          fullWidthCta={false}
          disabled={disabled}
          children={
            <div>
              <Input
                label='Verify current password'
                value={password}
                type='password'
                required
                onChange={event => onChange('password', event && event.target.value)}
                size='small'
              />

              <Input
                label='New password'
                value={newPassword1}
                type='password'
                required
                onChange={event => onChange('newPassword1', event && event.target.value)}
                size='small'
              />

              <Input
                label='Verify new password'
                value={newPassword2}
                type='password'
                required
                onChange={event => onChange('newPassword2', event && event.target.value)}
                size='small'
              />
            </div>
          }
        />
      </form>
    )
  }
}
