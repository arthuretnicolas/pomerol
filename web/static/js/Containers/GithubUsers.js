// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import GithubActions from '../Reducers/GithubRedux'
import NavigationBar from '../Components/NavigationBar'

type Props = {
  dispatch: () => any,
  fetchUser: () => null,
  githubUsers: Map<Object>
}

class GithubUsers extends Component {
  props: Props

  static defaultProps = {
    counter: 0
  }

  state = {
    name: ''
  }

  _onChange = (event: Object) => {
    const name = event.target.value
    this.setState({ name })
  }

  _onSubmit = () => {
    const { fetchUser } = this.props
    const { name } = this.state

    fetchUser(name)
    this.setState({ name: '' })
  }

  render () {
    // const { githubUsers } = this.props
    const { name } = this.state

    return (
      <div>
        <NavigationBar />

        <h1>
          Github Users
        </h1>

        <form onSubmit={this._onSubmit}>
          <input
            type='text'
            value={name}
            onChange={this._onChange}
          />

          <button type='submit'>
            Fetch user
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ github }) => ({
  githubUsers: github.users
})

const mapDispatchToProps = dispatch => ({
  fetchUser: (name: string) => dispatch(GithubActions.fetchUserRequest(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(GithubUsers)
