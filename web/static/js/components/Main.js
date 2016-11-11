import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Main extends Component {
  static propTypes = {
    routing: PropTypes.object.isRequired
  }

  render () {
    return (
      <div style={{ backgroundColor: 'yellow' }}>
        Main
        <Link to='/contacts'>Go to contacts</Link>
      </div>
    )
  }
}

const mapStateToProps = ({ routing }) => ({
  routing
})

export default connect(mapStateToProps)(Main)
