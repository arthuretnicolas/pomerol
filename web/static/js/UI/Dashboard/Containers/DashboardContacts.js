// @flow

import React, { Component } from 'react'
import TagSidebar from '../../Shared/Components/TagSidebar'
import SingleContact from '../Components/SingleContact'
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
    selectedContact: 'none'
  }

  _onClick = (selectedTag: number) => {
    this.setState({
      selectedTag
    })
  }

  _onClickContact = (id: string) => {
    const selectedContact =
      this.state.selectedContact === id
        ? 'none' // unselect
        : id

    this.setState({ selectedContact })
  }

  render () {
    const {
      selectedTag,
      selectedContact
    } = this.state

    return (
      <div className='Dashboard-DashboardContacts'>
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
                  selected={selectedContact === contact.id}
                />
              )
            }
          </div>
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
