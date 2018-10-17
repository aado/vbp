import React, { Component } from 'react';
import Navbar from './components/Navbar';

class Home extends Component {
    render() {
        return (
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Navbar />
                <div className="container">
                    <main role="main" className="inner cover">
                        <h1 className="cover-heading">VBP Time and Task Management</h1>
                        <p className="lead">
                            to make it your own.
                        </p>
                    </main>
                </div>
            </div>
        );
    }
}
export default Home;