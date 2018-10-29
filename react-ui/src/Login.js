import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import firebase from 'firebase';

import auth from './base';
// import * as routes from '../../constants/routes';

// const config = {
// 	apiKey: "AIzaSyA92xFCSEknowHMXiWBcz1OS8TdV-pK_iA",
// 	authDomain: "vbpproject-33765.firebaseapp.com",
// 	databaseURL: "https://vbpproject-33765.firebaseio.com",
// 	projectId: "vbpproject-33765",
// 	storageBucket: "vbpproject-33765.appspot.com",
// 	messagingSenderId: "131081195693"
//   };

// //   firebase.initializeApp(config);
  
//   if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//   }
  
//   const auth = firebase.auth();

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    {/* <PasswordForgetLink /> */}
    {/* <SignUpLink /> */}
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push('/home');
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
