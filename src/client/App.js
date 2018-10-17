import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';

import Home from './Home';
import Login from './Login';
import Authexample from './Authexample';
import TaskTemplate from '../pages/TaskTemplate';
import Clients from '../pages/Clients';
import Users from '../pages/Users';

//test comment here
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: null, 
			text: '',
			chats: []
		};
	}

	componentDidMount() {
		fetch('/api/getUsername')
		.then(res => res.json())
		.then(user => this.setState({ username: user.username }));

		const username = this.state.username;
		this.setState({ username });
		const pusher = new Pusher('223aca0f0c8175acf4b3', {
			cluster: 'ap1',
			encrypted: true
		});
		const channel = pusher.subscribe('chat');
		channel.bind('message', data => {
			this.setState({ chats: [...this.state.chats, data], test: '' });
		});
		this.handleTextChange = this.handleTextChange.bind(this);
	}

	handleTextChange(e) {
		if (e.keyCode === 13) {
			const payload = {
				username: this.state.username,
				message: this.state.text
			};
			axios.post('http://localhost:8080/message', payload);
		} else {
			this.setState({ text: e.target.value });
		}
	}

	render() {
		return (
			<div>
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/authexample" component={Authexample} />
					<Route exact path="/tasktemplate" component={TaskTemplate} />
					<Route exact path="/clients" component={Clients} />
					<Route exact path="/users" component={Users} />
				</div>
			</Router>
			</div>
		);
	}
}
