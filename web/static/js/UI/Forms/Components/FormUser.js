// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    firstName: string,
    lastName: string,
    email: string
  },
  attempting: boolean
}

export default class FormUser extends Component {
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
      email
    } = values

    return (
      <form
        className='Form-FormUser'
        onSubmit={this._onSubmit}
      >
        <Form
          buttonSubmit='Update'
          buttonSize='small'
          contentLoading='Updating...'
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
                size='small'
              />
              <Input
                label='Last name'
                value={lastName || ''}
                type='text'
                placeholder='Your last name'
                required
                onChange={event => onChange('lastName', event && event.target.value)}
                size='small'
              />
              <Input
                label='Email'
                value={email}
                type='email'
                placeholder='Your email'
                required
                onChange={event => onChange('email', event && event.target.value)}
                size='small'
              />
            </div>
          }
        />
      </form>
    )
  }
}
