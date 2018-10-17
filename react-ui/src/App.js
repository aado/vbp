import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';


const PORT = process.env.PORT || 5000;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: null,
			fetching: true,
			username: null, 
			text: '',
			chats: []
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
		axios.post(`${process.pid}:${PORT}/message`, payload);
	} else {
		this.setState({ text: e.target.value });
	}
}

  render() {
    return (
      <div className="App">
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
		<div className="App">
				<section>
				<ChatList chats={this.state.chats} />
				<ChatBox
					text={this.state.text}
					username={this.state.username}
					handleTextChange={this.handleTextChange}
				/>
				</section>
			</div>
      </div>
    );
  }
}

export default App;
