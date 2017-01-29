// @flow

import React from 'react'
import Form from './Form'
import Link from '../../Shared/Components/Link'
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

const FormForgotPassword = ({
  onSubmit,
  handleSubmit,
  submitting,
  attempting,
  valid,
  size = 'base'
}: Props) => (
  <form
    className='Form-FormForgotPassword'
    onSubmit={handleSubmit}
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
      fullWidthCta
      children={(
        <div>
          <Field
            name='email'
            type='email'
            fieldType='input'
            required
            component={renderField}
            label='Email'
            placeholder='Your email'
            validate={[ required ]}
            size={size}
            disabled={submitting || attempting}
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

export default reduxForm({
  form: 'formForgotPassword'
})(FormForgotPassword)
