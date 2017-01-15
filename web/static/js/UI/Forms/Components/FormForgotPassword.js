// @flow

import React from 'react'
import Form from './Form'
import Input from './Input'
import Link from '../../Shared/Components/Link'

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    email: string
  },
  attempting: boolean,
  size?: 'small' | 'base' | 'large'
}

function _onSubmit (event: Event, onSubmit) { // eslint-disable-line
  event.preventDefault()

  onSubmit()
}

const FormForgotPassword = ({
  onChange,
  onSubmit,
  values,
  attempting,
  size = 'base'
}: Props) => {
  const { email } = values

  return (
    <form
      className='Form-FormForgotPassword'
      onSubmit={event => _onSubmit(event, onSubmit)}
    >
      <Form
        header='Ask for a new password'
        text={{
          label: 'Enter your email to reset your password.'
        }}
        buttonSubmit='Reset password'
        contentLoading='Reset password...'
        attempting={attempting}
        buttonSize={size}
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
              size={size}
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

export default FormForgotPassword
