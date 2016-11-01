import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Main extends Component {
  static propTypes = {
    routing: PropTypes.object.isRequired
  }

  render () {
    return (
      <div style={{ backgroundColor: 'yellow' }}>
        Main
      </div>
    )
  }
}

const mapStateToProps = ({ routing }) => ({
  routing
})

export default connect(mapStateToProps)(Main)
