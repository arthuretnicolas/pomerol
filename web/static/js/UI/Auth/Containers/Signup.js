// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
  logout: () => void
}

class Signup extends Component {
  props: Props

  render () {
    return (
      <div className='Signup'>
        da signup
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
