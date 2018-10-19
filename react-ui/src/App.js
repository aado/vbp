import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Users from './pages/Users';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: null,
			fetching: true
		};
	}

  componentDidMount() {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
    return (
      <div className="App">
		<Router>
			<div>
				{/* <Route exact path="/" component={Home} /> */}
				{/* <Route exact path="/login" component={Login} />
				<Route exact path="/authexample" component={Authexample} />
				<Route exact path="/tasktemplate" component={TaskTemplate} />
				<Route exact path="/clients" component={Clients} /> */}
				<Route exact path="/users" component={Users} />
			</div>
		</Router>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to VBP</h2>
        </div>
        <p className="App-intro">
          {'This is '}
          {/* <a href="https://github.com/mars/heroku-cra-node">
            {'create-react-app with a custom Node/Express server'}
          </a><br/> */}
        </p>
        <p className="App-intro">
          {this.state.fetching
            ? 'Fetching message from API'
            : this.state.message}
        </p>
      </div>
    );
  }
}

export default App;
