// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../Shared/Components/Button'
import ModalActions from '../../../Reducers/ModalRedux'

type Props = {
  user: Object,
  organization: Object,
  triggerModal: () => void
}

class OrganizationMembers extends Component {
  props: Props

  render () {
    const { user, organization } = this.props
    const { members, invites } = organization

    return (
      <div className='Dashboard-OrganizationMembers'>
        <div className='container'>

          <b>Members</b>
          {
            members.map((member, index) =>
              <div key={index}>
                {member.first_name} {member.last_name} - {member.email} - {member.role}
                {
                  (user.email === member.email) && <span>YOU</span>
                }
                <Button
                  className='button-upgrade'
                  onClick={() => this.props.triggerModal('EDIT_MEMBERSHIP', true, {})}
                  content='Edit'
                  size='small'
                />
                <Button
                  className='button-upgrade'
                  onClick={() => this.props.triggerModal('EDIT_MEMBERSHIP', true, {})}
                  disabled={user.email === member.email}
                  content='Revoke Access'
                  size='small'
                />
              </div>
            )
          }

          {
            invites.length > 0 &&
            <div>
              <b>Pending invites</b>
              {
                invites.map((invite, index) =>
                  <div key={index}>
                    {invite.email} - {invite.role} - date
                    <Button
                      className='button-upgrade'
                      onClick={() => this.props.triggerModal('EDIT_MEMBERSHIP', true, {})}
                      content='Resend'
                      size='small'
                    />
                    <Button
                      className='button-upgrade'
                      onClick={() => this.props.triggerModal('EDIT_MEMBERSHIP', true, {})}
                      content='Cancel Invitation'
                      size='small'
                    />
                  </div>
                )
              }
            </div>
          }

          <Button
            className='button-upgrade'
            onClick={() => this.props.triggerModal('INVITE_USER', true, {})}
            content='Invite A User'
            size='small'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ login, organizations }) => ({
  user: login.session.user,
  organization: organizations.list.find(org => org.id === login.session.user.current_organization_id)
})

const mapDispatchToProps = dispatch => ({
  triggerModal: (modalType: string, isVisible: boolean, modalProps: Object) =>
    dispatch(ModalActions.triggerModal(modalType, isVisible, modalProps))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationMembers)
