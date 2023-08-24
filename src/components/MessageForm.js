import "../css/MessageForm.css";
import { useState } from "react"; 
import axios from "axios";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


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
        if(nameErrorMessage === false && emailErrorMessage === false && messageErrorMessage === false) {
            axios.post("http://localhost:4000/message-sender", sender)
            .then(reponse => {
                alert("the message is sent");
            })
        }else{
            alert("the message was not sent");
        }  
    }


    return (
        <div className="d-flex contact-form rounded shadow">
                <form onSubmit={contactFormValidation} className="form-message-container ps-4 pt-4 pe-4">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label contact-labels-name">Name</label>
                                <input 
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                type="text" 
                                className="form-control contact-inputs" 
                                id="name"
                                />
                                {nameErrorMessage ? <p>{errors.name}</p> : null} 
                        </div>                                                             
                        <div className="form-group">
                            <label htmlFor="email" className="form-label contact-labels-name">Email</label>
                                <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" 
                                className="form-control contact-inputs"
                                id="email"
                                />
                                {emailErrorMessage ? <p>{errors.email}</p> : null}
                        </div>                       
                        <div className="textarea-container">
                            <div className="form-group textarea-frame">
                                <label htmlFor="message" className="form-label contact-labels-name">Message</label>
                                    <textarea 
                                    value={message} 
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="form-control contact-inputs textarea"  
                                    placeholder="Your Message"
                                    maxLength={1000}
                                    />
                                    {messageErrorMessage ? <p>{errors.message}</p> : null} 
                            </div>                         
                        </div>                                    
                        <div>  
                            <button type="submit" className="btn message-form-button" onClick={sendMessage}>Send Message</button>
                        </div>
                </form>

            <div className="contact-container ps-3">
                <div className="mb-4">
                    <div className="phone-container d-flex mb-4">
                        <div className="phone-icon-container d-flex justify-content-center align-items-center me-2">
                            <BsFillTelephoneFill className="phone-icon"/>    
                        </div>
                        <div className="d-flex flex-column">
                            <p className="phone-text">Phone:</p> 
                            <p className="phone-number">+36 1 234 5678</p>
                        </div>                 
                    </div>
                    <div className="location-container d-flex mb-5">
                        <div className="location-icon-container d-flex justify-content-center align-items-center me-2">
                            <MdLocationOn className="location-icon"/>    
                        </div>
                        <div className="d-flex flex-column">
                            <p className="location-text">Location:</p> 
                            <p className="exact-location-line1">Budapest, 1146</p>
                            <p className="exact-location-line2">Városliget 3.</p>
                        </div> 
                    </div>
                </div>
                <div className="social-container mt-auto ps-4">
                    <p className="follow-us-text fs-4">Follow Us!</p>
                    <div className="d-flex">
                        <FaFacebookF className="social-icons fs-4 me-3"/>
                        <FaTwitter className="social-icons fs-4 me-3"/>
                        <FaInstagram className="social-icons fs-4"/>
                    </div>
                </div>                       
            </div>
        </div>           
    )
}

export default MessageForm;
