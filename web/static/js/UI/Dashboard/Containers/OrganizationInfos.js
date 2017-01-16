// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOrganizationInfos from '../../Forms/Components/FormOrganizationInfos'
import OrganizationActions from '../../../Reducers/OrganizationRedux'

type Props = {
  updateOrganizationAttempt: () => void,
  organization: Object,
  attemptingOrganization: boolean,
  currentOrganizationId: string | null
}

class OrganizationInfos extends Component {
  props: Props

  state = {
    name: (this.props.organization && this.props.organization.name) || '',
    phone: (this.props.organization && this.props.organization.phone) || '',
    website: (this.props.organization && this.props.organization.website) || '',
    address1: (this.props.organization && this.props.organization.address1) || '',
    address2: (this.props.organization && this.props.organization.address2) || '',
    zip: (this.props.organization && this.props.organization.zip) || '',
    city: (this.props.organization && this.props.organization.city) || '',
    country: (this.props.organization && this.props.organization.country) || ''
  }

  componentWillReceiveProps (nextProps) {
    const { organization } = nextProps
    const shouldUpdate =
      organization &&
      (!this.props.organization || (nextProps.currentOrganizationId !== this.props.currentOrganizationId))

    if (shouldUpdate) {
      const {
        name,
        phone,
        website,
        address1,
        address2,
        zip,
        city,
        country
      } = organization

      this.setState({
        name: name || '',
        phone: phone || '',
        website: website || '',
        address1: address1 || '',
        address2: address2 || '',
        zip: zip || '',
        city: city || '',
        country: country || ''
      })
    }
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
      phone,
      website,
      address1,
      address2,
      zip,
      city,
      country
    } = this.state

    updateOrganizationAttempt(organization && organization.id, {
      name,
      phone,
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
      phone,
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
              phone,
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

const organizationSelector = (login, organizations) => {
  const { current_organization_id } = login.session.user
  return organizations.list.find(org => org.id === current_organization_id) // eslint-disable-line
}

const mapStateToProps = ({ login, organizations }) => ({
  user: login.session.user,
  attemptingOrganization: login.attemptingOrganization,
  currentOrganizationId: login.session.user.current_organization_id,
  organization: organizationSelector(login, organizations)
})

const mapDispatchToProps = dispatch => ({
  updateOrganizationAttempt: (organizationId: string, organization: Object) =>
    dispatch(OrganizationActions.updateOrganizationAttempt(organizationId, organization))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationInfos)
