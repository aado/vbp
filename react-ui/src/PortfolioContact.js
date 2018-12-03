import React, { Component } from "react";
import app from "./base";


export default class PortfolioContact extends Component {

    
constructor(props) {
    super(props);

    this.state = {
        text:'',
        messages: [],
    };
}

componentDidMount() {
    // Initialize Firebase
    this.getMessages();
}

getMessages = () => {
    const messageDB = app.database().ref("messages/")
    messageDB.on("value", snapshot => {
        let newMessages = []
        snapshot.forEach(child => {
            const message = child.val()
            newMessages.push({ id: child.key, text: message.text })
        })
        this.setState({ messages: newMessages})
    })
}

renderMessages = () => {
    return this.state.messages.map(message => (  
        <div className="balon1 p-2 m-0 position-relative" data-is="You - 3:20 pm" key={message.id}>
            <a> {message.text} </a>
        </div> 
    ))
}

writeMessageToDB = (message) => {
    app
    .database()
    .ref("messages/")
    .push( {
        text: message
    })
}

getMessages = () => {
    const messageDB = app.database().ref("messages/")
    messageDB.on("value", snapshot => {
        let newMessages = []
        snapshot.forEach(child => {
            const message = child.val()
            newMessages.push({ id: child.key, text: message.text })
        })
        this.setState({ messages: newMessages})
    })
}

onFormAddSubmit = (e) => {
    // e.preventDefault();
    if(e.charCode === 13 && this.state.text.trim() !== "") {
        this.writeMessageToDB(this.state.text);
        this.setState({text:''})
        document.getElementById('message').value = ''
    }
}

render() {
    return (
        
        <div className="container">

        <section id="contact">
			<div className="section-content">
				<h1 className="section-header">Get in <span className="content-header wow fadeIn " data-wow-delay="0.2s" data-wow-duration="2s"> Touch with me</span></h1>
				{/* <h3>Contact us</h3> */}
			</div>
			<div className="contact-section">
			<div className="container">
				{/* <form onSubmit={this.onFormAddSubmit}> */}
			  		<div className="col-md-12">
			  			<div className="form-group">
			  				<label htmlFor ="description"> Message Me</label>
			  			 	<input  className="form-control" id="message" onChange={ e => this.setState({ text: e.target.value })} value={this.state.name} onKeyPress={this.onFormAddSubmit} placeholder="Enter Your Message" />
			  			</div>
			  			{/* <div>
			  			<button type="submit" className="btn btn-default submit" style={{marginRight: '20px'}}><i className="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button>
			  			</div> */}
			  			
					</div>
				{/* </form> */}
			</div>
            </div>
            <br/>
            <div className="jumbotron m-0 p-0 bg-transparent">
                <div className="row m-0 p-0 position-relative">
                    <div className="col-12 p-0 m-0 position-absolute">

                        <div className="bg-sohbet border-0 m-0 p-0 ChatContatainer">
                            <div id="sohbet" className="card border-0 m-0 p-0 position-relative bg-transparent ContentChat">
                                {this.renderMessages()}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
		</section>
        </div>
    )
}
}