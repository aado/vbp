import React from "react";

const PortfolioContact = () => {
    return (
        <div className="container" style={{marginTop: '80px'}}>
            <h1>Contact</h1>
            <div className="row">
            <section id="contact">
                <div className="container">
                    <div className="well well-sm">
                        <h3><strong>Contact Us</strong></h3>
                    </div>

                    <div className="row">
                        <div className="col-md-7">
                            Googlemap here
                            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3736489.7218514383!2d90.21589792292741!3d23.857125486636733!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1506502314230" width="100%" height="315" frameborder="0" style="border:0" allowfullscreen></iframe> */}
                        </div>

                        <div className="col-md-5">
                            <h4><strong>Get in Touch</strong></h4>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="" value="" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="" value="" placeholder="E-mail" />
                                </div>
                                <div className="form-group">
                                    <input type="tel" className="form-control" name="" value="" placeholder="Phone" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="" rows="3" placeholder="Message"></textarea>
                                </div>
                                <button className="btn btn-default" type="submit" name="button">
                                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i> Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                </section>
            </div>
        </div>
    )
}

export default PortfolioContact;