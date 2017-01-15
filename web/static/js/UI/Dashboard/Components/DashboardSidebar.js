// @flow

import React from 'react'
import { browserHistory } from 'react-router'
import Infos from '../../Shared/Components/Infos'
import Select from '../../Forms/Components/Select'
import Icon from '../../Shared/Components/Icon'
import { getShortString } from '../../../Helpers'

const ORGANIZATION_MAX_LETTERS = 15

const getSelectMaxWidth = (organizations, selectedOrganizationId) => {
  const selectedOrganization = organizations.find(org => org.id === selectedOrganizationId)

  if (typeof selectedOrganization === 'undefined') {
    return 100
  }

  const nbCharacters = getShortString(selectedOrganization.name, ORGANIZATION_MAX_LETTERS).length

  return (nbCharacters * 10 + 15)
}

type Props = {
  data: Array<{
    category: string,
    options: Array<{
      id: string,
      label: string,
      iconName: string,
      link: string
    }>
  }>,
  organizations: Array<Object>,
  onChange: () => void,
  onClickLogout: () => void,
  selectedOrganizationId: string | null
}

const OrganizationPicker = ({
  organizations,
  onChange,
  selectedOrganizationId
}) => (
  <div className='container-organization'>
    {
      organizations.length === 1 && <div className='organization-name'>
        {organizations.length && organizations[0].alias}
      </div>
    }

    {
      organizations.length >= 2 && <Select
        theme='plain'
        maxWidthSelect={getSelectMaxWidth(organizations, selectedOrganizationId)}
        selected={selectedOrganizationId}
        placeholder='Your organization'
        onChange={event => onChange(event && event.target.value)}
        options={organizations.map(org => ({
          id: org && org.id || '',
          name: getShortString(org && org.alias || '')
        }))}
      />
    }
  </div>
)

const DashboardSidebar = ({
  data,
  organizations,
  onChange,
  onClickLogout,
  selectedOrganizationId
}: Props) => {
  const pathname = browserHistory && browserHistory.getCurrentLocation().pathname

  return (
    <div className='Dashboard-DashboardSidebar'>
      <OrganizationPicker
        organizations={organizations}
        selectedOrganizationId={selectedOrganizationId}
        onChange={onChange}
      />

      {
        data.map((item, index) => (
          <Infos
            theme='dashboard-sidebar'
            key={index}
            label={item.category}
            fields={
              item.options.map(({ id, iconName, label, link }) => ({
                id,
                iconName: iconName,
                label: label,
                link: link,
                isSelected: link === pathname
              }))
            }
          />
        ))
      }

      <div className='container-bottom'>
        <div className='content-bottom'>
          <div className='brand'>
            Pomerol
          </div>

          <div
            className='button-logout'
            onClick={onClickLogout}
          >
            <Icon
              name='switch-off'
              className='icon-logout'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
