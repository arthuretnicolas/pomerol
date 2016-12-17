// @flow

import React, { Component } from 'react'
import TagSidebar from '../../Shared/Components/TagSidebar'
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
    selected: -1
  }

  _onClick = (selected: number) => {
    this.setState({
      selected
    })
  }

  render () {
    const { selected } = this.state
    const selectedLabel = sidebarOptions.reduce((acc, curr) => {
      if (curr.id === selected) {
        return curr.label
      }

      return acc
    }, 'All')

    return (
      <div className='Dashboard-DashboardContacts'>
        <div className='container-sidebar'>
          <TagSidebar
            data={sidebarOptions}
            selected={selected}
            onClick={this._onClick}
          />
        </div>

        <div className='container-content'>
          Selected: {selectedLabel}
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
