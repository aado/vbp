import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
			<header className="masthead mb-auto">
				<nav className="navbar navbar-toggleable-md">
					<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="container">
						<Link className="navbar-brand" to="/">VBP Time and Task Management</Link>
						<div className="collapse navbar-collapse" id="navbarCollapse">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item active">
									<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/about">About</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/contact">Contact</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/login">Login</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
        );
    }
}

export default Navbar;