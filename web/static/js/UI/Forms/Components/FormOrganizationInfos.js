// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'
import Select from './Select'
import Grid from '../../Shared/Components/Grid'
import {
  countries as listCountries,
  topCountries
} from '../../../Data/Countries'

const countries = {
  top: topCountries,
  list: listCountries
}

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    name: string,
    phone: string,
    website: string,
    address1: string,
    address2: string,
    zip: string,
    city: string,
    country: string | null
  },
  attempting: boolean
}

export default class FormOrganizationInfos extends Component {
  props: Props

  _onSubmit = (event: Event) => { // eslint-disable-line
    const { onSubmit } = this.props
    event.preventDefault()

    onSubmit()
  }

  render () {
    const {
      onChange,
      values,
      attempting
    } = this.props

    const {
      name,
      phone,
      website,
      address1,
      address2,
      zip,
      city,
      country
    } = values

    return (
      <form
        className='Form-FormOrganizationInfos'
        onSubmit={this._onSubmit}
      >
        <Form
          buttonSubmit='Update'
          contentLoading='Updating...'
          attempting={attempting}
          buttonSize='small'
          children={
            <div>
              <Input
                label='Organization name'
                value={name || ''}
                type='text'
                placeholder='Your organization name'
                required
                onChange={event => onChange('name', event && event.target.value)}
                size='small'
                disabled={attempting}
              />

              <Grid>
                <Input
                  label='Organization phone number'
                  value={phone || ''}
                  type='text'
                  placeholder='07 123 456 789'
                  onChange={event => onChange('phone', event && event.target.value)}
                  size='small'
                  disabled={attempting}
                />
                <Input
                  label='Organization website'
                  value={website || ''}
                  type='url'
                  placeholder='https://example.com'
                  onChange={event => onChange('website', event && event.target.value)}
                  size='small'
                  disabled={attempting}
                />
              </Grid>

              <Input
                label='Address'
                value={address1}
                type='text'
                placeholder='Address'
                onChange={event => onChange('address1', event && event.target.value)}
                size='small'
                disabled={attempting}
              />

              <Input
                label='Address 2'
                value={address2}
                type='text'
                placeholder='Address 2'
                onChange={event => onChange('address2', event && event.target.value)}
                size='small'
                disabled={attempting}
              />

              <Grid>
                <Input
                  label='Zip / Postal code'
                  value={zip}
                  type='text'
                  placeholder='Zip / Postal code'
                  onChange={event => onChange('zip', event && event.target.value)}
                  size='small'
                  disabled={attempting}
                />
                <Input
                  label='City'
                  value={city}
                  type='text'
                  placeholder='City'
                  onChange={event => onChange('city', event && event.target.value)}
                  size='small'
                  disabled={attempting}
                />
              </Grid>

              <Select
                label='Country'
                selected={country}
                placeholder='Organization country'
                required
                onChange={event => onChange('country', event && event.target.value)}
                top={countries.top}
                options={countries.list}
                size='small'
                disabled={attempting}
              />
            </div>
          }
        />
      </form>
    )
  }
}
