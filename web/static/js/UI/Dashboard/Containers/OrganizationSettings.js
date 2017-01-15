// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tabs from '../../Shared/Components/Tabs'
import Header from '../Components/Header'

const tabs = [
  {
    id: 0,
    label: 'Infos'
  },
  {
    id: 1,
    label: 'Members'
  },
  {
    id: 2,
    label: 'Notifications'
  }
]

type Props = {
  // logout: () => void
}

class OrganizationSettings extends Component {
  props: Props

  state = {
    selectedIndex: 0
  }

  _handleSelect = (selectedIndex: number) => {
    this.setState({
      selectedIndex
    })
  }

  render () {
    const { selectedIndex } = this.state

    return (
      <div className='Dashboard-OrganizationSettings'>
        <Header
          name='Organization'
          tabs={(
            <Tabs
              containerStyle={{
                marginLeft: 16
              }}
              selectedIndex={selectedIndex}
              onSelect={this._handleSelect}
              tabs={tabs}
            />
          )}
        />

        <div className='container'>
          {
            selectedIndex === 0 && <div>
              Infos
            </div>
          }

          {
            selectedIndex === 1 && <div>
              Members
            </div>
          }

          {
            selectedIndex === 2 && <div>
              Notifications
            </div>
          }
        </div>
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
