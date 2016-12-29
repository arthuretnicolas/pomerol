// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
  user: Object
}

class OnboardingOne extends Component {
  props: Props

  render () {
    return (
      <div>
        OnboardingOne
      </div>
    )
  }
}

const mapStateToProps = ({ login }) => ({
  use: login.session.user
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingOne)
