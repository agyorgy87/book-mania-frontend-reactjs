import '../css/Contact.css';
import { useState } from "react"; 
import NavigationBar from '../components/NavigationBar.js';
import axios from "axios";

const Contact = () => {

    let errors = {
        name: "Please Enter Your Name",
        email: "Please Enter Your Email",
        message: "Please enter Your Message",
        form: "Please fill the form"
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
 
    const [nameErrorMessage, setNameErrorMessage] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState(false);
    const [messageErrorMessage, setMessageErrorMessage] = useState(false);

    const contactFormValidation = (e) => {
        e.preventDefault();
        if(name.length === 0) {
            setNameErrorMessage(true);
        }
        if(email.length === 0 ) {//regex
            setEmailErrorMessage(true);
        }
        if(message.length === 0) {
            setMessageErrorMessage(true);
        }  
    }

    const sendMessage = () => {

        let sender = {
            name: name,
            email: email,
            text: message
        }
        
        axios.post("http://localhost:4000/message-sender", sender)
            .then(reponse => {
                alert("üzenet elküldve")
            })
    }

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
                                <h3>SEND US A MESSAGE</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="contact-form rounded card-body">
                                <form onSubmit={contactFormValidation}>
                                    <div className="mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">Name</label>
                                                <input 
                                                autoFocus
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} 
                                                type="text" 
                                                className="form-control" 
                                                id="name"
                                                />
                                        </div>
                                            {nameErrorMessage ? <p>{errors.name}</p> : null}                                       
                                    </div>                                  
                                    <div className="mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">Email</label>
                                                <input 
                                                value={email} 
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email" 
                                                className="form-control"
                                                id="email"
                                                />
                                        </div>
                                        {emailErrorMessage ? <p>{errors.email}</p> : null}
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-group ">
                                            <label htmlFor="message" className="form-label">Message</label>
                                                <textarea 
                                                    value={message} 
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    type="text" 
                                                    className="form-control textarea" 
                                                    cols="" 
                                                    rows="" 
                                                    placeholder="Your Message"
                                                    />
                                        </div>
                                        {messageErrorMessage ? <p>{errors.message}</p> : null}
                                        
                                    </div>  
                                    <button type="submit" className="btn btn-primary" onClick={sendMessage}>Send Message</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <div className="map-area">
                                <iframe title="address-point" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5391.320466154
                                502!2d19.050786126615044!3d47.496531975698495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f
                                13.1!3m3!1m2!1s0x4741dc41b367cca7%3A0x39a14ced90afac34!2sBudapest%2C%20De%C3%A1k%
                                20Ferenc%20t%C3%A9r%203%2C%201052!5e0!3m2!1sen!2shu!4v1679244151277!5m2!1sen!2shu"
                                allowfullscreen="" loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact;
