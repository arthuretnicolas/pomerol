// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tabs from '../../Shared/Components/Tabs'

type Props = {
  // logout: () => void
}

// $FlowFixMe
const Container = ({ children }) => (
  <div className='container'>
    {children}
  </div>
)

class OrganizationSettings extends Component {
  props: Props

  state = {
    selectedIndex: 0
  }

  _handleSelect = (selectedIndex: number, previousIndex: number) => {
    this.setState({
      selectedIndex
    })
  }

  render () {
    const { selectedIndex } = this.state

    return (
      <div className='Dashboard-OrganizationSettings'>
        <Tabs
          className='content'
          title='Organization'
          selectedIndex={selectedIndex}
          onSelect={this._handleSelect}
          tabs={[
            'Infos',
            'Members',
            'Notifications'
          ]}
          panels={[
            <div>Infos</div>,
            <div>Members</div>,
            <div>Notifications</div>
          ].map(Container)}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
  // logout: () => dispatch(LoginActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSettings)
