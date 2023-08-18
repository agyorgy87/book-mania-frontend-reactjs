import "../css/MessageForm.css";
import { useState } from "react"; 
import axios from "axios";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import facebookLogo from "../icons/facebook.png";
import twitterLogo from "../icons/twitter.png";

const MessageForm = () => {

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


    return (
        <div className="d-flex contact-form rounded shadow">
            <div className="form-message-container ps-4 pt-4 pe-4">
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
                        <div className="form-group">
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
                    <button type="submit" className="btn message-form-button" onClick={sendMessage}>Send Message</button>
                </form>
            </div>
            <div className="contact-container pt-4">
                <div className="address-container">
                    <p><BsFillTelephoneFill className="phone-icon"/>CALL US</p>                   
                    <p>+36 1 234 5678</p>                  
                </div>
                <div className="address-container">
                    <MdLocationOn/>
                    <p>LOCATION</p>
                    <p>Budapest, 1146</p>
                    <p>Városliget 3.</p>
                </div>
                <div>
                    <img src={facebookLogo}/>
                    <img src={twitterLogo}/>
                </div>
            </div>
        </div>           
    )
}

export default MessageForm;
