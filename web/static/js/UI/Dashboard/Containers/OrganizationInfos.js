// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormOrganizationInfos from '../../Forms/Components/FormOrganizationInfos'
import OrganizationActions from '../../../Reducers/OrganizationRedux'

type Props = {
  updateOrganizationAttempt: () => void,
  attempting: boolean
}

type ValueProps = {
  name: string,
  phone: string,
  website: string,
  address1: string,
  address2: string,
  zip: string,
  city: string,
  country: string,
  id: string
}

class OrganizationInfos extends Component {
  props: Props

  _onSubmit = (values: ValueProps) => {
    const { updateOrganizationAttempt } = this.props
    const {
      id,
      name,
      phone,
      website,
      address1,
      address2,
      zip,
      city,
      country
    } = values

    updateOrganizationAttempt(id, {
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
      attempting
    } = this.props

    return (
      <div className='Dashboard-OrganizationInfos'>
        <div className='form-container'>
          <FormOrganizationInfos
            onSubmit={this._onSubmit}
            attempting={attempting}
            size='small'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ organizations }) => ({
  attempting: organizations.attempting
})

const mapDispatchToProps = dispatch => ({
  updateOrganizationAttempt: (organizationId: string, organization: Object) =>
    dispatch(OrganizationActions.updateOrganizationAttempt(organizationId, organization))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationInfos)
