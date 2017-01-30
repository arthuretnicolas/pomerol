// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../Shared/Components/Button'
import ModalActions from '../../../Reducers/ModalRedux'

type Props = {
  showModal: () => void,
}

class OrganizationMembers extends Component {
  props: Props

  render () {
    return (
      <div className='Dashboard-OrganizationMembers'>
        <div className='container'>
          Members

          <Button
            className='button-upgrade'
            onClick={() => this.props.showModal()}
            content='Invite A User'
            size='small'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(ModalActions.showModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationMembers)
