// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tabs from '../../Shared/Components/Tabs'
import Header from '../Components/Header'
import OrganizationInfos from './OrganizationInfos'

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
  params: {
    selectedIndex?: string
  },
  attemptingOrganization: boolean
}

class OrganizationSettings extends Component {
  props: Props

  state = {
    selectedIndex: parseInt(this.props.params.selectedIndex) || 0
  }

  _handleSelect = (selectedIndex: number) => {
    this.setState({
      selectedIndex
    })
  }

  render () {
    const { attemptingOrganization } = this.props
    const { selectedIndex } = this.state
    const isLoading = selectedIndex === 0 && attemptingOrganization

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
          isLoading={isLoading}
        />

        <div className='container'>
          {
            selectedIndex === 0 && <OrganizationInfos />
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

const mapStateToProps = ({ organizations }) => ({
  attemptingOrganization: organizations.attempting
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSettings)
