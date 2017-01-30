// @flow

import React from 'react'
import Form from './Form'
import Select from './SelectBeta'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../../../Helpers'

import {
  roles as listRoles
} from '../../../Data/Roles'

type Props = {
  size?: 'small' | 'base' | 'large',
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
  attempting: boolean,
  valid: boolean
}

const required = value => value ? undefined : 'Required'
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const yopmail = value =>
  value && /.+@yopmail/.test(value)
    ? 'An actual email is better :)'
    : undefined

const FormInvite = ({
  onSubmit,
  handleSubmit,
  submitting,
  attempting,
  valid,
  size = 'base'
}: Props) => (
  <form
    className='Form-FormInvite'
    onSubmit={handleSubmit}
  >
    <Form
      header='Invite a user'
      buttonSubmit='Send Invite'
      contentLoading='Sending Invite...'
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
            placeholder='Email address'
            validate={[ required, email ]}
            warn={yopmail}
            size={size}
            disabled={submitting || attempting}
          />

          <Select
            label='User Type'
            size={size}
            required
            disabled={submitting || attempting}
            name='role'
            placeholder='User Type'
            options={listRoles}
            maxLetters={30}
          >
            <Field
              name='role'
              type='text'
              required
              component='select'
              validate={[ required ]}
              disabled={submitting || attempting}
            />
          </Select>
        </div>
      }
    />
  </form>
)

export default reduxForm({
  form: 'formInvite'
})(FormInvite)
