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

const FormResetPassword = ({
  onSubmit,
  handleSubmit,
  submitting,
  attempting,
  valid,
  size = 'base'
}: Props) => (
  <form
    className='Form-FormResetPassword'
    onSubmit={handleSubmit}
  >
    <Form
      header='Reset password'
      text={{
        label: 'Password must be at least 5 character long'
      }}
      buttonSubmit='Reset password'
      contentLoading='Resetting password...'
      attempting={attempting}
      children={
        <div>
          <Field
            name='password'
            type='password'
            fieldType='input'
            required
            component={renderField}
            label='Password'
            placeholder='Your new password'
            validate={[ required ]}
            size={size}
            disabled={submitting || attempting}
          />
        </div>
      }
    />
  </form>
)

export default reduxForm({
  form: 'formResetPassword'
})(FormResetPassword)
