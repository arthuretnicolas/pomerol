// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tabs from '../../Shared/Components/Tabs'

type Props = {
  // logout: () => void
}

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

  _handleSelect = (selectedIndex, last) => {
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
          selectedIndex={selectedIndex}
          onSelect={this._handleSelect}
          tabs={[
            'Infos',
            'Members',
            'Notifications'
          ]}
          panels={[
            <Container>
              <div>Panel #0</div>
            </Container>,
            <Container>
              <div>Panel #1</div>
            </Container>,
            <Container>
              <div>Panel #2</div>
            </Container>
          ]}
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
