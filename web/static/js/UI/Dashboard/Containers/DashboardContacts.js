// @flow

import React, { Component } from 'react'
import TagSidebar from '../../Shared/Components/TagSidebar'
import SingleContact from '../Components/SingleContact'
import Header from '../Components/Header'
import SidebarDetails from '../Components/SidebarDetails'
import { contacts } from '../../../Data'
import { connect } from 'react-redux'
import { uniq } from 'ramda'

type Props = {
}

<<<<<<< HEAD
=======
const tagAll = 'All'

>>>>>>> Sorted contacts alphabetically and filtered by companies
class DashboardContacts extends Component {
  props: Props

  state = {
<<<<<<< HEAD
    selectedTag: 'All',
=======
    selectedTag: tagAll,
>>>>>>> Sorted contacts alphabetically and filtered by companies
    selectedContactId: ''
  }

  _onClick = (selectedTag: string) => {
    this.setState({
      selectedTag
    })
  }

  _onChange = (key: string, value: number) => {
    this.setState({
      [key]: value
    })
  }

  _onClickContact = (id: string) => {
    const selectedContactId =
      this.state.selectedContactId === id
        ? '' // unselect
        : id

    this.setState({ selectedContactId })
  }

  render () {
    const {
      selectedTag,
      selectedContactId
    } = this.state
    const showDetails = selectedContactId !== ''
    const selectedContact = contacts.find(contact => contact.id === selectedContactId)

    const sidebarOptions =
      uniq(
        contacts.map(contact => contact.company)
      )

    const filteredContacts =
<<<<<<< HEAD
      selectedTag === 'All'
=======
      selectedTag === tagAll
>>>>>>> Sorted contacts alphabetically and filtered by companies
        ? contacts
        : contacts.filter(contact => contact.company === selectedTag)

    return (
      <div className='Dashboard-DashboardContacts'>
        <div className='container-main'>
          <Header
            name='Contacts'
            callToAction={{
              name: 'Add contact',
              onClick: () => window.alert('Use a curl to add a contact')
            }}
          />

          <div className='content'>
            <div className='container-sidebar'>
              <TagSidebar
                label='Companies'
                tagAll={tagAll}
                data={sidebarOptions}
                selected={selectedTag}
                onClick={this._onClick}
              />
            </div>

            <div className='container-content'>
              <div className='list-contacts'>
                {
                  filteredContacts
                    .sort((contact1, contact2) => contact1.lastName.localeCompare(contact2.lastName))
                    .map((contact, index) =>
                      <SingleContact
                        key={index}
                        contact={contact}
                        onClick={this._onClickContact}
                        selected={selectedContactId === contact.id}
                      />
                    )
                }
              </div>
            </div>
          </div>
        </div>

        <div className={`container-sidebar-details ${showDetails ? 'show-details' : ''}`}>
          {
            showDetails && selectedContact && <SidebarDetails
              contact={selectedContact}
              onClose={() => this._onClickContact('')}
              onEdit={id => { window.alert(`Update user width id: ${id}`) }}
              onClickMember={id => this._onChange('selectedContactId', id)}
              teamMembers={
                contacts
                  .filter(contact => contact.company === selectedContact.company)
                  .filter(contact => contact.id !== selectedContactId)
              }
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContacts)
