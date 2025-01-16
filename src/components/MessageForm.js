import "../css/MessageForm.css";
import { useState } from "react"; 
import axios from "axios";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai"; 


const MessageForm = () => {
/*
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
 
    const [nameErrorMessage, setNameErrorMessage] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState(false);
    const [messageErrorMessage, setMessageErrorMessage] = useState(false);

    let errors = {
        name: "Please Enter Your Name",
        email: "Please Enter Your Email",
        message: "Please enter Your Message",
    }

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    const sendMessage = (e) => {

        e.preventDefault(); 

        let sender = {
            name: name,
            email: email,
            text: message
        }

        if(name.length > 0 && email.length > 0 && message.length > 0){
            axios.post(envAndLocal + "/message-sender", sender)
            .then(response => {
                //1. clean inputs
                //2. modal
                //3. clean errors
                //refresh the page
            })
        }else{
            setNameErrorMessage(true);
            setEmailErrorMessage(true);
            setMessageErrorMessage(true);
        }
    }
*/

    const [formData, setFormData] = useState({
        senderName: "",
        senderEmail: "",
        senderMessage: ""
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
    }

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {}
        if(!formData.senderName.trim()) {
            validationErrors.senderName = "name is required."
        }

        if(!formData.senderEmail.trim()) {
            validationErrors.senderEmail = "email is required."
        } else if(!/\S+@\S+\.\S+/.test(formData.senderEmail)){
            validationErrors.senderEmail = "email is not valid."
        }

        if(!formData.senderMessage.trim()) {
            validationErrors.senderMessage = "message is required."
        } else if(formData.senderMessage.length < 8){
            validationErrors.senderMessage = "low number of characters. Min character 8."
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            axios.post(envAndLocal + "/message-sender", )
            .then(response => {
                //1. clean inputs
                //2. modal
                //3. clean errors
                //refresh the page
            })
        }
 
    }

    return (
        <div className="d-flex contact-form rounded shadow">
                <form 
                onSubmit={handleSubmit}
                //onSubmit={sendMessage} 
                className="form-message-container ps-4 pt-4 pe-4">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label contact-labels-name">Name</label>
                                <div className="input-height">
                                    <input 
                                    autoFocus
                                    onChange={handleChange}
                                    //value={name}
                                    //onChange={(e) => setName(e.target.value)} 
                                    type="text" 
                                    name="senderName"
                                    //className={`form-control contact-inputs ${nameErrorMessage ? 'input-alert' : ''}`}
                                    className={`form-control contact-inputs ${errors.senderName ? 'input-alert' : ''}`}
                                    id="name" 
                                    />
                                </div>
                                {errors.senderName && 
                                    <div className="d-flex">
                                        <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                            <p className="alert-message">{errors.senderName}</p>
                                    </div>
                                }
                                {/*{   nameErrorMessage ?
                                        <div className="d-flex">
                                                <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                                    <p className="alert-message">{errors.name}</p>
                                        </div>
                                    : null 
                                    }
                                    */}
                        </div>                                                             
                        <div className="form-group">
                            <label htmlFor="email" className="form-label contact-labels-name">Email</label>
                                <div className="input-height">
                                    <input 
                                    //value={email} 
                                    //onChange={(e) => setEmail(e.target.value)}
                                    type="email" 
                                    name="senderEmail"
                                    onChange={handleChange}
                                    //className={`form-control contact-inputs ${emailErrorMessage ? 'input-alert' : ''}`}
                                    className={`form-control contact-inputs ${errors.senderEmail ? 'input-alert' : ''}`}
                                    id="email"
                                    />
                                </div>
                                {errors.senderEmail && 
                                    <div className="d-flex">
                                        <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                            <p className="alert-message">{errors.senderEmail}</p>
                                    </div>
                                }
                                {/*{   emailErrorMessage ?
                                        <div className="d-flex">
                                                <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                                    <p className="alert-message">{errors.email}</p>
                                        </div>
                                    : null
                                }
                                    */}
                        </div>                       
                        <div className="textarea-container">                          
                            <label htmlFor="message" className="form-label contact-labels-name">Message</label>                                  
                                <textarea 
                                //value={message} 
                                //onChange={(e) => setMessage(e.target.value)}
                                //className={`form-control contact-inputs textarea ${messageErrorMessage ? 'input-alert' : ''}`}
                                className={`form-control contact-inputs ${errors.senderMessage ? 'input-alert' : ''}`}
                                name="senderMessage"                                 
                                maxLength={100}
                                onChange={handleChange}
                                /> 
                                {errors.senderMessage && 
                                    <div className="d-flex">
                                        <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                            <p className="alert-message">{errors.senderMessage}</p>
                                    </div>
                                }
                                {/*                                
                                {   messageErrorMessage ?
                                        <div className="d-flex">
                                                <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                                    <p className="alert-message">{errors.message}</p>
                                        </div>
                                    : null
                                }   
                                    */}                                                 
                        </div>                                    
                        <div>  
                            <button type="submit" className="btn message-form-button" >Send Message</button>
                        </div>
                </form>
                <div className="contact-container">
                    <div className="mb-4">
                        <div className="phone-container d-flex">
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
                        <div className="social-container-position">
                            <p className="follow-us-text fs-4">Follow Us!</p>
                            <div className="d-flex">
                                <FaFacebookF className="social-icons fs-4 me-4"/>
                                <FaTwitter className="social-icons fs-4 me-4"/>
                                <FaInstagram className="social-icons fs-4"/>
                            </div>
                        </div>
                    </div>                       
                </div>
        </div>           
    )
}

export default MessageForm;
