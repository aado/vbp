import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioContent from "./PortfolioContent";

const Contact = () => {
    return (
      <div>
		<Header pageName="Contact" activePage="active"/>
		<PortfolioContent/>
		<Footer />
      </div>
    )
}

export default Contact;