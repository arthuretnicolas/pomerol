// @flow

import React, { Component } from 'react'
import Form from './Form'
import Input from './Input'
import Select from './Select'
import {
  countries as listCountries,
  topCountries
} from '../../../Data/Countries'
import { languages } from '../../../Data/Languages'
import { getShortString } from '../../../Helpers'

const SELECT_MAX_LETTERS = 25

const countries = {
  top: topCountries,
  list: listCountries
}

type Props = {
  onChange: (key: string, value: any) => void,
  onSubmit: () => void,
  values: {
    firstName: string,
    lastName: string,
    email: string,
    countryId: string,
    languageId: string
  },
  attempting: boolean
}

export default class FormUser extends Component {
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
      firstName,
      lastName,
      email,
      countryId,
      languageId
    } = values

    return (
      <form
        className='Form-FormUser'
        onSubmit={this._onSubmit}
      >
        <Form
          buttonSubmit='Update'
          buttonSize='small'
          contentLoading='Updating...'
          attempting={attempting}
          children={
            <div>
              <Input
                label='First name'
                value={firstName || ''}
                type='text'
                placeholder='Your first name'
                required
                onChange={event => onChange('firstName', event && event.target.value)}
                size='small'
              />
              <Input
                label='Last name'
                value={lastName || ''}
                type='text'
                placeholder='Your last name'
                required
                onChange={event => onChange('lastName', event && event.target.value)}
                size='small'
              />
              <Input
                label='Email'
                value={email}
                type='email'
                placeholder='Your email'
                required
                onChange={event => onChange('email', event && event.target.value)}
                size='small'
              />
              <Select
                label='Country'
                selected={countryId}
                placeholder='Select your country'
                required
                onChange={event => onChange('countryId', event && event.target.value)}
                top={countries.top}
                options={countries.list.map(({id, name}) => ({
                  id,
                  name: getShortString(name, SELECT_MAX_LETTERS)
                }))}
                size='small'
              />
              <Select
                label='Language'
                selected={languageId}
                placeholder='Select your language'
                required
                onChange={event => onChange('languageId', event && event.target.value)}
                options={languages.map(({id, name}) => ({
                  id,
                  name: getShortString(name, SELECT_MAX_LETTERS)
                }))}
                size='small'
              />
            </div>
          }
        />
      </form>
    )
  }
}
