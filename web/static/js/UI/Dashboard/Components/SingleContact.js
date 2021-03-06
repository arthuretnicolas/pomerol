// @flow

import React from 'react'
import Avatar from '../../Shared/Components/Avatar'

type ContactType = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  website: string,
  quoteIds: Array<string>,
  company: string,
  country: string,
  id: string
}

type Props = {
  contact: ContactType,
  onClick: (id: string) => void,
  selected: boolean
}

const SingleContact = ({ contact, onClick, selected }: Props) => {
  const {
    firstName,
    lastName,
    company,
    country,
    id
  } = contact

  return (
    <div
      className={`Dashboard-SingleContact ${selected ? 'selected' : ''}`}
      onClick={() => onClick(id)}
    >
      <div>
        <input type='radio' checked={selected} />
      </div>

      <div className='container-avatar'>
        <Avatar firstName={firstName} lastName={lastName} />
      </div>

      <div>
        <div className='name'>
          {contact.firstName}&nbsp;{contact.lastName}
        </div>

        <div className='company'>
          {company} - {country}
        </div>
      </div>
    </div>
  )
}

export default SingleContact
