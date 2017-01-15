// @flow

import React from 'react'
import Form from './Form'
import Input from './Input'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    email: string,
    password: string
  },
  attempting: boolean,
  size?: 'small' | 'base' | 'large'
}

function _onSubmit (event: Event, onSubmit) { // eslint-disable-line
  event.preventDefault()

  onSubmit()
}

const FormLogin = ({
  onChange,
  onSubmit,
  values,
  attempting,
  size = 'base'
}: Props) => {
  const {
    email,
    password
  } = values

  return (
    <form
      className='Form-FormLogin'
      onSubmit={event => _onSubmit(event, onSubmit)}
    >
      <Form
        header='Login in'
        text={{
          label: 'Need a Pomerol account?',
          linkLabel: 'Create an account',
          to: '/signup'
        }}
        buttonSubmit='Log in'
        contentLoading='Logging in...'
        attempting={attempting}
        fullWidthCta
        buttonSize={size}
        children={
          <div>
            <Input
              label='Email'
              value={email}
              type='email'
              placeholder='Your email'
              required
              onChange={event => onChange('email', event && event.target.value)}
              size={size}
              disabled={attempting}
            />
            <Input
              label='Password'
              value={password}
              type='password'
              placeholder='Your password'
              required
              onChange={event => onChange('password', event && event.target.value)}
              size={size}
              disabled={attempting}
            />
          </div>
        }
      />
    </form>
  )
}

export default FormLogin
