// @flow

import React from 'react'
import Form from './Form'
import Select from './SelectBeta'
import { Field, reduxForm } from 'redux-form'
import {
  renderField,
  getSelectContent
} from '../../../Helpers'

import {
  countries as listCountries,
  topCountries
} from '../../../Data/Countries'

const selectContent = getSelectContent('Your country', listCountries, topCountries)

const required = value => value ? undefined : 'Required'

type Props = {
  size?: 'small' | 'base' | 'large',
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
  attempting: boolean,
  valid: boolean
}

const FormOnboardingOne = ({
  onSubmit,
  handleSubmit,
  submitting,
  attempting,
  valid,
  size = 'base'
}: Props) => (
  <form
    className='Form-FormOnboardingOne'
    onSubmit={handleSubmit}
  >
    <Form
      header='Personal infos'
      text={{
        label: 'Let\'s get to know you'
      }}
      buttonSubmit='Next'
      contentLoading='Next...'
      attempting={attempting}
      fullWidthCta
      buttonSize={size}
      children={
        <div>
          <Field
            name='firstName'
            type='text'
            fieldType='input'
            required
            component={renderField}
            label='First name'
            placeholder='Your first name'
            validate={[ required ]}
            size={size}
            disabled={submitting || attempting}
          />

          <Field
            name='lastName'
            type='text'
            fieldType='input'
            required
            component={renderField}
            label='Last name'
            placeholder='Your last name'
            validate={[ required ]}
            size={size}
            disabled={submitting || attempting}
          />

          <Select
            label='Country'
            size={size}
            required
            disabled={submitting || attempting}
            name='countryId'
          >
            <Field
              name='countryId'
              type='text'
              required
              component='select'
              validate={[ required ]}
              disabled={submitting || attempting}
            >
              {selectContent}
            </Field>
          </Select>
        </div>
      }
    />
  </form>
)

export default reduxForm({
  form: 'formOnboardingOne'
})(FormOnboardingOne)
