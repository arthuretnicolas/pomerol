// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import Grid from '../../Shared/Components/Grid'

type CountriesType = {
  top_country_ids: Array<number>,
  countries: Array<{
    name: string,
    id: number
  }>
}
type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    name: string,
    phoneNumber: string,
    website: string,
    address: string,
    countryId: number | null
  },
  attempting: boolean,
  countries: CountriesType | null
}

export default class FormOnboardingTwo extends Component {
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
      attempting,
      countries
    } = this.props

    const {
      name,
      phoneNumber,
      website,
      address,
      countryId
    } = values

    return (
      <form
        className='Form-FormOnboardingTwo'
        onSubmit={this._onSubmit}
      >
        <Form
          header='Onboarding two'
          text={{
            label: 'Blablabla'
          }}
          buttonSubmit='Next'
          contentLoading='Next...'
          attempting={attempting}
          fullWidthCta
          children={
            <div>
              <Input
                label='Organization name'
                value={name || ''}
                type='text'
                placeholder='Your organization name'
                required
                onChange={event => onChange('name', event && event.target.value)}
              />

              <Grid>
                <Input
                  label='Organization phone number'
                  value={phoneNumber || ''}
                  type='text'
                  placeholder='07 123 456 789'
                  onChange={event => onChange('phoneNumber', event && event.target.value)}
                />
                <Input
                  label='Organization website'
                  value={website || ''}
                  type='url'
                  placeholder='https://example.com'
                  onChange={event => onChange('website', event && event.target.value)}
                />
              </Grid>
              <Textarea
                label='Organization address'
                value={address || ''}
                type='text'
                resize={false}
                placeholder='Your organization address'
                onChange={event => onChange('address', event && event.target.value)}
              />
              {
                !!countries && <Select
                  label='Country'
                  selected={countryId}
                  placeholder='Your country'
                  required
                  onChange={event => onChange('countryId', event && parseInt(event.target.value))}
                  top={countries.top_country_ids}
                  options={countries.countries}
                />
              }
            </div>
          }
        />
      </form>
    )
  }
}