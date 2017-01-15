// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOrganizationInfos from '../../Forms/Components/FormOrganizationInfos'
import LoginActions from '../../../Reducers/LoginRedux'

type Props = {
  updateOrganizationAttempt: () => void,
  organization: Object,
  attemptingOrganization: boolean
}

class OrganizationInfos extends Component {
  props: Props

  state = {
    name: this.props.organization.name || '',
    phoneNumber: this.props.organization.phone || '',
    website: this.props.organization.website || '',
    address1: this.props.organization.address1 || '',
    address2: this.props.organization.address2 || '',
    zip: this.props.organization.zip || '',
    city: this.props.organization.city || '',
    country: this.props.organization.country || ''
  }

  _onChange = (key, value: string | number) => {
    this.setState({
      [key]: value
    })
  }

  _submit = () => {
    const {
      updateOrganizationAttempt,
      organization
    } = this.props
    const {
      name,
      phoneNumber,
      website,
      address1,
      address2,
      zip,
      city,
      country
    } = this.state

    updateOrganizationAttempt(organization && organization.id, {
      name,
      phone: phoneNumber,
      website,
      address1,
      address2,
      zip,
      city,
      country_code: country
    })
  }

  render () {
    const {
      attemptingOrganization
    } = this.props
    const {
      name,
      phoneNumber,
      website,
      address1,
      address2,
      zip,
      city,
      country
    } = this.state

    return (
      <div className='Dashboard-OrganizationInfos'>
        <div className='form-container'>
          <FormOrganizationInfos
            onChange={this._onChange}
            onSubmit={this._submit}
            values={{
              name,
              phoneNumber,
              website,
              address1,
              address2,
              zip,
              city,
              country
            }}
            attempting={attemptingOrganization}
          />
        </div>
      </div>
    )
  }
}

const organizationSelector = login => {
  const { organizations, user } = login.session
  const { current_organization_id } = user

  return organizations.find(org => org.id === current_organization_id) // eslint-disable-line
}

const mapStateToProps = ({ login }) => ({
  user: login.session.user,
  attemptingOrganization: login.attemptingOrganization,
  organization: organizationSelector(login)
})

const mapDispatchToProps = dispatch => ({
  updateOrganizationAttempt: (organizationId: string, organization: Object) =>
    dispatch(LoginActions.updateOrganizationAttempt(organizationId, organization))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationInfos)
