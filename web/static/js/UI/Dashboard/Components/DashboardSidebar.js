// @flow

import React from 'react'
import { browserHistory } from 'react-router'
import Infos from '../../Shared/Components/Infos'
import Select from '../../Forms/Components/Select'

const ORGANIZATION_MAX_LETTERS = 15

const organizationShortName = organizationName => {
  if (organizationName.length <= ORGANIZATION_MAX_LETTERS) {
    return organizationName
  }

  const shortName = organizationName.substr(organizationName, ORGANIZATION_MAX_LETTERS - 2).trim()
  return `${shortName}...`
}

const getSelectMaxWidth = (organizations, selectedOrganizationId) => {
  const selectedOrganization = organizations.find(org => org.id === selectedOrganizationId)

  if (typeof selectedOrganization === 'undefined') {
    return 100
  }

  const nbCharacters = organizationShortName(selectedOrganization.name).length

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
  selectedOrganizationId: string | null
}

const OrganisationPicker = ({
  organizations,
  onChange,
  selectedOrganizationId
}) => (
  <div className='container-organization'>
    {
      organizations.length === 1 && <div className='organization-name'>
        {organizations.length && (organizations[0].alias || organizations[0].name)}
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
          id: org.id,
          name: organizationShortName(org.alias || org.name)
        }))}
      />
    }
  </div>
)

const DashboardSidebar = ({
  data,
  organizations,
  onChange,
  selectedOrganizationId
}: Props) => {
  const pathname = browserHistory && browserHistory.getCurrentLocation().pathname

  return (
    <div className='Dashboard-DashboardSidebar'>
      <OrganisationPicker
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
    </div>
  )
}

export default DashboardSidebar
