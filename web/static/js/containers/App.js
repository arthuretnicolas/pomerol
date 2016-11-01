import React, { Component } from "react"

export default class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: 'pink' }}>
        <div>Index</div>

        {this.props.children}
      </div>
    )
  }
}