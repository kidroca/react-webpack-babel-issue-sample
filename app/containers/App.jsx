import React, { Component } from 'react';
import Login from './Login';

import requester from '../utils/requester';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      loggedIn: false,
      user: null,
      recommendation: null,
      error: null
    }
  }

  render() {

    const {loggedIn, user, plan, error} = this.state;

    const view = loggedIn ? <div>You are logged in</div> : <Login onLogin={this.handleLogin} />;

    const errorView = error && <section className="error">{error}</section>;

    return (
      <main>
        <header>{loggedIn && user.client.identity}</header>
        {errorView}

        <section className="main-view">
          {view}
        </section>
      </main>
    )
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({ error: null });

    const { email, password } = e.currentTarget.elements;
    const credentials = {
      identity: email.value,
      credential: password.value,
      timezone_name: 'Europe/Kiev'
    };

    requester.login(credentials)
      .then(result => this.setState({
        loggedIn: true,
        user: result
      }))
      .catch(error => this.setState({ error: error.message }))
  }
}
