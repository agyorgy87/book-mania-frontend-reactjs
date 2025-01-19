import "../css/MessageForm.css";
import { useState } from "react"; 
import axios from "axios";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai"; 
import MessageSentSuccessfully from "../modal/MessageSentSuccessfully";

const MessageForm = () => {

    const [openMessageSentSuccessfully, setOpenMessageSentSuccessfully] = useState(false);

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
            axios.post(envAndLocal + "/message-sender", formData)
            .then(response => {
                setOpenMessageSentSuccessfully(true); 
                setFormData({
                    senderName: "",
                    senderEmail: "",
                    senderMessage: ""
                });
                setErrors({});
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });
        }
 
    }

    return (
        <div className="d-flex contact-form rounded shadow"> 
            <div>
                {openMessageSentSuccessfully && 
                <MessageSentSuccessfully setOpenMessageSentSuccessfully={setOpenMessageSentSuccessfully}/>}  
            </div>
                <form 
                onSubmit={handleSubmit}
                className="form-message-container ps-4 pt-4 pe-4">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label contact-labels-name">Name</label>
                                <div className="input-height">
                                    <input 
                                    autoFocus
                                    type="text"
                                    id="name" 
                                    name="senderName"
                                    className={`form-control contact-inputs ${errors.senderName ? 'input-alert' : ''}`}
                                    value={formData.senderName}
                                    onChange={handleChange}
                                    />
                                </div>
                                {errors.senderName && 
                                    <div className="d-flex">
                                        <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                            <p className="alert-message">{errors.senderName}</p>
                                    </div>
                                }
                        </div>                                                             
                        <div className="form-group">
                            <label htmlFor="email" className="form-label contact-labels-name">Email</label>
                                <div className="input-height">
                                    <input 
                                    type="email" 
                                    id="email"
                                    name="senderEmail"
                                    className={`form-control contact-inputs ${errors.senderEmail ? 'input-alert' : ''}`}
                                    value={formData.senderEmail}
                                    onChange={handleChange}
                                    />
                                </div>
                                {errors.senderEmail && 
                                    <div className="d-flex">
                                        <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                            <p className="alert-message">{errors.senderEmail}</p>
                                    </div>
                                }
                        </div>                       
                        <div className="textarea-container">                          
                            <label htmlFor="message" className="form-label contact-labels-name">Message</label>                                  
                                <textarea 
                                name="senderMessage"                                
                                className={`form-control contact-inputs text-area ${errors.senderMessage ? 'input-alert' : ''}`}
                                maxLength={100}
                                value={formData.senderMessage}
                                onChange={handleChange}
                                /> 
                                {errors.senderMessage && 
                                    <div className="d-flex">
                                        <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                            <p className="alert-message">{errors.senderMessage}</p>
                                    </div>
                                }                                               
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
