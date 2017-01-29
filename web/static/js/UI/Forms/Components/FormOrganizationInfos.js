// @flow

import React from 'react'
import { connect } from 'react-redux'
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

const FormOrganizationInfos = ({
  onSubmit,
  handleSubmit,
  submitting,
  attempting,
  valid,
  size = 'base'
}: Props) => (
  <form
    className='Form-FormOrganizationInfos'
    onSubmit={handleSubmit}
  >
    <Form
      buttonSubmit='Update'
      contentLoading='Updating...'
      attempting={attempting}
      buttonSize='small'
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
              name='phone'
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
            name='country'
            placeholder='Organization country'
            options={listCountries}
            top={topCountries}
            maxLetters={30}
          >
            <Field
              name='country'
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

const organizationSelector = (login, organizations) => {
  const { current_organization_id } = login.session.user
  return organizations.list.find(org => org.id === current_organization_id) // eslint-disable-line
}

const _FormOrganizationInfos = reduxForm({
  form: 'formOrganizationInfos',
  enableReinitialize: true
})(FormOrganizationInfos)

const __FormOrganizationInfos = connect(
  ({ login, organizations }) => {
    const organization = organizationSelector(login, organizations)

    if (!organization || !organization.name) {
      return {
        initialValues: {}
      }
    }

    const {
      id, // useful when calling backend
      name,
      phone,
      website,
      address1,
      address2,
      zip,
      city,
      country
    } = organization

    return {
      initialValues: {
        id,
        name,
        phone,
        website,
        address1,
        address2,
        zip,
        city,
        country
      }
    }
  })(_FormOrganizationInfos)

export default __FormOrganizationInfos
