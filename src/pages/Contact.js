import '../css/Contact.css';
import React from "react"; 
import NavigationBar from '../components/NavigationBar.js';

const Contact = () => {

    

    return(
        <div>
            <div>
                <NavigationBar/>
            </div>
            <div className="contact-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12"> 
                            <div className="section-title">
                                <h3>Contact</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="contact-form rounded">
                                <form>
                                    <div class="form-group mb-4">
                                        <input type="text" className="form-control" placeholder="Your Name"/>
                                    </div>
                                    <div class="form-group mb-4">
                                        <input type="email" className="form-control" placeholder="Your Email"/>
                                    </div>
                                    <div class="form-group mb-4">
                                        <textarea className="form-control textarea" cols="" rows="" placeholder="Your Message"></textarea>
                                    </div>
                                    {/*
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div>
                                    */}
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="map-area">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5391.320466154
                                502!2d19.050786126615044!3d47.496531975698495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f
                                13.1!3m3!1m2!1s0x4741dc41b367cca7%3A0x39a14ced90afac34!2sBudapest%2C%20De%C3%A1k%
                                20Ferenc%20t%C3%A9r%203%2C%201052!5e0!3m2!1sen!2shu!4v1679244151277!5m2!1sen!2shu"
                                allowfullscreen="" loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact;
