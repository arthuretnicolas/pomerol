// @flow

import React from 'react'
import Form from './Form'
import Select from './SelectBeta'
import Grid from '../../Shared/Components/Grid'
import { Field, reduxForm } from 'redux-form'
import { renderField } from '../../../Helpers'

import {
  countries as listCountries,
  topCountries
} from '../../../Data/Countries'

const required = value => value ? undefined : 'Required'

type Props = {
  size?: 'small' | 'base' | 'large',
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
  attempting: boolean,
  valid: boolean
}

const FormOnboardingTwo = ({
  onSubmit,
  handleSubmit,
  submitting,
  attempting,
  valid,
  size = 'base'
}: Props) => (
  <form
    className='Form-FormOnboardingTwo'
    onSubmit={handleSubmit}
  >
    <Form
      header='Organization'
      text={{
        label: 'Let\'s create your first organization'
      }}
      buttonSubmit='Next'
      contentLoading='Next...'
      attempting={attempting}
      fullWidthCta
      children={
        <div>
          <Field
            name='name'
            type='text'
            fieldType='input'
            required
            component={renderField}
            label='Organization name'
            placeholder='Your organization name'
            validate={[ required ]}
            size={size}
            disabled={submitting || attempting}
          />

          <Grid>
            <Field
              name='phoneNumber'
              type='text'
              fieldType='input'
              component={renderField}
              label='Organization phone number'
              placeholder='07 123 456 789'
              size={size}
              disabled={submitting || attempting}
            />

            <Field
              name='website'
              type='text'
              fieldType='input'
              component={renderField}
              label='Organization website'
              placeholder='https://example.com'
              size={size}
              disabled={submitting || attempting}
            />
          </Grid>

          <Field
            name='address1'
            type='text'
            fieldType='input'
            component={renderField}
            label='Address'
            placeholder='Address'
            size={size}
            disabled={submitting || attempting}
          />

          <Field
            name='address2'
            type='text'
            fieldType='input'
            component={renderField}
            label='Address 2'
            placeholder='Address 2'
            size={size}
            disabled={submitting || attempting}
          />

          <Grid>
            <Field
              name='zip'
              type='text'
              fieldType='input'
              component={renderField}
              label='Zip / Postal code'
              placeholder='Zip / Postal code'
              size={size}
              disabled={submitting || attempting}
            />

            <Field
              name='city'
              type='text'
              fieldType='input'
              component={renderField}
              label='City'
              placeholder='City'
              size={size}
              disabled={submitting || attempting}
            />
          </Grid>

          <Select
            label='Organization country'
            size={size}
            required
            disabled={submitting || attempting}
            name='countryId'
            placeholder='Organization country'
            options={listCountries}
            top={topCountries}
            maxLetters={30}
          >
            <Field
              name='countryId'
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
  form: 'formOnboardingTwo'
})(FormOnboardingTwo)
