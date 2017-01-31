// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import ModalActions from '../../Reducers/ModalRedux'

type Props = {
}

class ModalInviteUser extends Component {
  props: Props

  render () {
    const isOpen = true
    return (
      <ReactModal
        isOpen={isOpen}
        // onAfterOpen={afterOpenFn}
        onRequestClose={() => this.props.hideModal()}
        // closeTimeoutMS={n}
        // style={customStyle}
        contentLabel='Modal'
      >
        <div>Invite user</div>
      </ReactModal>
    )
  }
}

const mapStateToProps = ({ modal }) => ({
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(ModalActions.hideModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalInviteUser)
