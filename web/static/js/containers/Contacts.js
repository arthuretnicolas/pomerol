import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Main extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired
  }

  static defaultProps = {
    counter: 0
  }

  render () {
    const { counter } = this.props

    return (
      <div>
        <div style={{ marginBottom: 15 }}>
          <Link to='/'>Go home</Link>
        </div>

        <h1>Contacts: {counter}</h1>

        <button>+</button>
        <button>-</button>
      </div>
    )
  }
}

const mapStateToProps = ({ counter }) => ({
  counter
})

export default connect(mapStateToProps)(Main)
