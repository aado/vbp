import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import SignUpView from "./SignUpView";

class SignUpContainer extends Component {
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      // app
      //   .auth()
      //   .createUserWithEmailAndPassword(email.value, password.value);
      // this.props.history.push("/");
      const user = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      this.props.history.push("/");
      console.log(user);
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);