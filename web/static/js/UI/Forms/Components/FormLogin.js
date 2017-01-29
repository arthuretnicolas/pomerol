// @flow

import React from 'react'
import Form from './Form'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../../../Helpers'

type Props = {
  size?: 'small' | 'base' | 'large',
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
  attempting: boolean,
  valid: boolean
}

const required = value => value ? undefined : 'Required'
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength6 = minLength(6)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const yopmail = value =>
  value && /.+@yopmail/.test(value)
    ? 'An actual email is better :)'
    : undefined

const FormLogin = ({
  onSubmit,
  handleSubmit,
  submitting,
  attempting,
  valid,
  size = 'base'
}: Props) => (
  <form
    className='Form-FormLogin'
    onSubmit={handleSubmit}
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
      attempting={submitting || attempting}
      isValid={valid}
      fullWidthCta
      buttonSize={size}
      children={
        <div>
          <Field
            name='email'
            type='text'
            fieldType='input'
            required
            component={renderField}
            label='Email'
            placeholder='Your email'
            validate={[ required, email ]}
            warn={yopmail}
            size={size}
            disabled={submitting || attempting}
          />

          <Field
            name='password'
            type='password'
            fieldType='input'
            required
            component={renderField}
            label='Password'
            placeholder='Your password'
            validate={[ required, minLength6 ]}
            size={size}
            disabled={submitting || attempting}
          />
        </div>
      }
    />
  </form>
)

export default reduxForm({
  form: 'formLogin'
})(FormLogin)
