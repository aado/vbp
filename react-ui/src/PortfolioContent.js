import React from "react";
import { Link } from 'react-router-dom';

const PortfolioContent = () => {
    return (
        <div className="container" style={{marginTop: '80px'}}>
            <h1>Portfolio</h1>
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                        <Link to="/home"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></Link>
                        <div className="card-body">
                            <h4 className="card-title">
                            <Link to="/home">Project One</Link>
                            </h4>
                            <p className="card-text">Lorem ipsum dolor sit amet,  repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                        <Link to="/home"><img className="card-img-top" src="http://placehold.it/700x400" alt="" /></Link>
                        <div className="card-body">
                            <h4 className="card-title">
                                <Link to="/home">Project One</Link>
                            </h4>
                            <p className="card-text">Lorem ipsum dolor sit amet, consequatur ut esse! Commodi ea consequatur accusantium, beatae qui deserunt tenetur ipsa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioContent;