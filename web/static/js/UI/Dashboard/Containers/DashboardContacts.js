// @flow

import React, { Component } from 'react'
import TagSidebar from '../../Shared/Components/TagSidebar'
import SingleContact from '../Components/SingleContact'
import Header from '../Components/Header'
import SidebarDetails from '../Components/SidebarDetails'
import { contacts } from '../../../Data'
import { connect } from 'react-redux'

type Props = {
}

const sidebarOptions = [
  {
    id: 0,
    label: 'Europe'
  },
  {
    id: 1,
    label: 'Asia'
  },
  {
    id: 2,
    label: 'Africa'
  }
]

class DashboardContacts extends Component {
  props: Props

  state = {
    selectedTag: -1,
    selectedContactId: ''
  }

  _onClick = (selectedTag: number) => {
    this.setState({
      selectedTag
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
                data={sidebarOptions}
                selected={selectedTag}
                onClick={this._onClick}
              />
            </div>

            <div className='container-content'>
              <div className='list-contacts'>
                {
                  contacts.map((contact, index) =>
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
            showDetails && <SidebarDetails
              contact={selectedContact}
              onClose={() => this._onClickContact('')}
              onEdit={id => { window.alert(`Update user width id: ${id}`) }}
              teamMembers={[
                {
                  id: 1675671,
                  name: 'John Laine'
                },
                {
                  id: 78167891,
                  name: 'Emile Lui'
                },
                {
                  id: 2679729,
                  name: 'Paul Pope'
                }
              ]}
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
