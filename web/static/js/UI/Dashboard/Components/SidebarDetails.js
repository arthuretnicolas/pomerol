// @flow

import React from 'react'
import Avatar from '../../Shared/Components/Avatar'
import Button from '../../Shared/Components/Button'
import Icon from '../../Shared/Components/Icon'
import Infos from '../../Shared/Components/Infos'

type Props = {
  contact: Object,
  onClose: () => void,
  onEdit: () => void,
  onClickMember: () => void,
  teamMembers: Array<{
    id: string | number,
    name: string
  }>
}
const SidebarDetails = ({
  contact,
  onClose,
  onEdit,
  onClickMember,
  teamMembers
}: Props) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    id,
    email,
    website,
    quoteIds
  } = contact

  return (
    <div className='Dashboard-Sidebar-Details'>
      <div className='header'>
        <div>
          <Button
            className='header-button'
            content={(
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: -4
              }}>
                <Icon
                  name='arrow-right-2'
                  className='primary'
                />

                <span style={{
                  paddingTop: 2
                }}>
                  Hide
                </span>
              </div>
            )}
            onClick={onClose}
            size='small'
            theme='plain plain-primary'
          />
        </div>
        <div>
          <Button
            className='header-button'
            content={(
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon
                  name='edit'
                  className='primary'
                />

                <span style={{
                  paddingLeft: 6,
                  paddingTop: 2
                }}>
                  Edit
                </span>
              </div>
            )}
            onClick={() => onEdit(id)}
            size='small'
            theme='plain plain-primary'
          />
        </div>
      </div>

      <div className='card'>
        <Avatar
          className='card-avatar'
          firstName={firstName}
          lastName={lastName}
          dimensions={60}
        />

        <div className='card-infos'>
          <div className='card-name'>
            {firstName} {lastName}
          </div>

          <div className='card-company'>
            Client company
          </div>
        </div>
      </div>

      <div className='content'>
        <Infos
          label='Contact'
          fields={[
            {
              iconName: 'phone',
              label: phoneNumber
            },
            {
              iconName: 'email',
              label: email,
              link: email ? `mailto:${email}` : ''
            },
            {
              iconName: 'website',
              label: website,
              link: website
            }
          ]}
        />

        {
          !!quoteIds.length && <Infos
            label='Quotes'
            fields={quoteIds.map(quoteId => ({
              iconName: 'quote',
              label: quoteId,
              link: '/quotes'
            }))}
          />
        }

        <Infos
          label='Team members'
          fields={teamMembers.map(member => ({
            iconName: 'user',
            label: `${member.firstName} ${member.lastName}`,
            onClick: () => onClickMember(member.id)
          }))}
        />
      </div>
    </div>
  )
}

export default SidebarDetails
