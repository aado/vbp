import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioContent from "./PortfolioContent";

const About = () => {
    return (
        <div>
            <Header pageName="About" activePage="active"/>
				<PortfolioContent/>
			<Footer />
        </div>
    )
}

export default About;