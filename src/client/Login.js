import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
import './Login.css';
import logohead from '../pages/components/vbplogohead.png';
import logologin from '../pages/components/vbplogo.png';

export default class Login extends Component {

	constructor(){
		super();

		this.state = {
			username: '',
			password: '',
			redirectToReferrer: false
		};

		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);

    }

    login() {
        if(this.state.username && this.state.password){
            PostData('login',this.state).then((result) => {
                let responseJson = result;
                if(responseJson.userData){         
                    sessionStorage.setItem('userData',JSON.stringify(responseJson));
                    this.setState({redirectToReferrer: true});
                }

            });
        }

    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render() {

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/home'}/>)
        }
         
        if(sessionStorage.getItem('userData')){
            return (<Redirect to={'/home'}/>)
        }

        return (
			<div className="container pt-3">
				<h1 className="text-center mt-5"><img src={logohead} className="img-responsive avatar" alt="logo" style={{'height': '100px', 'marginTop': '60px'}}/></h1>
				<div className="row justify-content-sm-center">
					<div className="col-sm-10 col-md-6">
						<div className="card border-info">
							<div className="card-header">Sign in to continue</div>
							<div className="card-body">
								<div className="row">
									<div className="col-md-4 text-center"><br/>
										<img src="https://placeimg.com/128/128/tech" />
										<img src={logologin} className="img-responsive avatar" alt="logo" style={{'height': '30px'}}/>
									</div>
									<div className="col-md-8">
										<form className="form-signin" action="/vbphome">
											<input type="text" className="form-control mb-2" placeholder="Email" required autoFocus onChange={this.onChange}/>
											<input type="password" className="form-control mb-2" placeholder="Password" required onChange={this.onChange}/>
											<input className="btn btn-lg btn-primary btn-block mb-1" onClick={this.Login} type="submit" value="Login" onClick={this.login} />
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        );
    }
}