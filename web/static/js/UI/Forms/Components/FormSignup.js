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

const FormSignup = ({
  onSubmit,
  handleSubmit,
  submitting,
  attempting,
  valid,
  size = 'base'
}: Props) => (
  <form
    className='Form-FormSignup'
    onSubmit={handleSubmit}
  >
    <Form
      header='Get started with a free account'
      text={{
        label: 'Already have a Pomerol account?',
        linkLabel: 'Log in',
        to: '/login'
      }}
      buttonSubmit='Sign up'
      contentLoading='Signing up...'
      attempting={attempting}
      fullWidthCta
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
  form: 'formSignup'
})(FormSignup)
