import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Main extends Component {
  render () {
    return (
      <div>
        <div style={{ marginBottom: 15 }}>
          <Link to='/contacts'>Go to contacts</Link>
        </div>

        <h1>Main</h1>
      </div>
    )
  }
}
