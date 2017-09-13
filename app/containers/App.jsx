import React, { Component } from 'react';

import Login from './Login';
import Plan from './Plan';
import requester from '../utils/requester';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      loggedIn: false,
      user: null,
      plan: null,
      error: null
    }
  }

  render() {

    const {loggedIn, user, plan, error} = this.state;

    const view = loggedIn
      ? <Plan plan={plan} onDecline={this.handlePlanDecline} onQuestion={this.handlePlanQuestion} />
      : <Login onLogin={this.handleLogin} />;

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
      .then(() => requester.getActivePlan())
      .then(plan => this.setState({ plan }))
      .catch(error => this.onError(error))
  };

  handlePlanDecline = () => {

    this.setState({ error: null });

    requester.declinePlan()
             .then(plan => this.setState({ plan }))
             .catch(error => this.onError(error))
  };

  handlePlanQuestion = () => {

    this.setState({ error: null });

    requester.questionPlan()
             .then(plan => this.setState({ plan }))
             .catch(error => this.onError(error))
  };

  onError(error) {
    this.setState({ error: error.message })
  }
}
