// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
}

class DashboardContacts extends Component {
  props: Props

  render () {
    return (
      <div className='container-content'>
        Contacts
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContacts)
