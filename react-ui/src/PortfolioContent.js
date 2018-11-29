import React from "react";
// import { Link } from 'react-router-dom';
import elearning from './images/elearning.png';
import profiler from './images/profiler.png';
import nativecamp from './images/nativecamp.png';

const PortfolioContent = () => {
    return (
        <div className="container" style={{marginTop: '80px'}}>
            <h1>Portfolio</h1>
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                        <a href="http://nivlaoda.freecluster.eu/ciictelearning/login?i=1" rel="noopener noreferrer" target="_blank"><img className="card-img-top" src={elearning} alt="" /></a>
                        <div className="card-body">
                            <h4 className="card-title">
                                <a href="http://nivlaoda.freecluster.eu/ciictelearning/login?i=1" rel="noopener noreferrer" target="_blank">NSU ELEARNING</a>
                            </h4>
                            <p className="card-text">Understanding eLearning is simple. eLearning is learning utilizing electronic technologies to access educational curriculum outside of a traditional classroom.  In most cases, it refers to a course, program or degree delivered completely online.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                        <a href="http://nivlaoda.freecluster.eu/ciictonline/login" rel="noopener noreferrer" target="_blank"><img className="card-img-top" src={profiler} alt="" /></a>
                        <div className="card-body">
                            <h4 className="card-title">
                                <a href="http://nivlaoda.freecluster.eu/ciictonline/login" rel="noopener noreferrer" target="_blank">PROFILER</a>
                            </h4>
                            <p className="card-text">Online profiling data, which is information gleaned from a customer's use of a Web site, can be used to target advertisements, personalize Web sites and match services to a specific customer's needs.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                        <a href="http://nivlaoda.freecluster.eu/ciictonline/login"><img className="card-img-top" src={nativecamp} alt="" /></a>
                        <div className="card-body">
                            <h4 className="card-title">
                                <a href="https://nativecamp.net/" rel="noopener noreferrer" target="_blank">NATIVECAMP</a>
                            </h4>
                            <p className="card-text">Online English Language School in Japan, Responsible of some enhancements of some features.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioContent;