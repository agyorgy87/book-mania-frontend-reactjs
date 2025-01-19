import "../css/ForgotPassword.css";
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { AiOutlineExclamationCircle } from "react-icons/ai"
import NavigationBar from '../components/NavigationBar.js';
import EmailSentSuccessfullyModal from "../modal/EmailSentSuccessfullyModal.js"

const ForgotPassword = () => {

    const userEmailInputRef = useRef(null);

    const [userEmailInput, setUserEmailInput] = useState("");

    const [invalidEmailAddressErrorMessage, setInvalidEmailAddressErrorMessage] = useState(false);

    const [openEmailSentSuccessfully, setOpenEmailSentSuccessfully] = useState(false);

    useEffect(() => {
        if(userEmailInput < 1){
            setInvalidEmailAddressErrorMessage(false);
        }
    },[userEmailInput])

    const envAndLocal = "http://localhost:3001" || process.env.REACT_APP_API_URL


    const sendUserEmail = () => {
        axios.get(envAndLocal + `/get-forgot-password/${userEmailInput}`)
            .then(response => {
                if(response.data.success === true) {
                    setOpenEmailSentSuccessfully(true);
                }else{
                    setInvalidEmailAddressErrorMessage(true);
                }
        })  
    }

    return (
        <div>
            <div>
                <NavigationBar/>
            </div>
            {openEmailSentSuccessfully && <EmailSentSuccessfullyModal/>}
            <div className="col-12 col-sm-8 col-md-4 m-auto forgot-password-container rounded shadow p-3 mt-5">
                <div className="d-flex flex-column justify-content-center mb-3 pt-3 ">
                    <h3 className="text-center pb-2">Reset password</h3>
                    <p className="text-center">Enter your email address and we'll send you an email with a link to reset your password.</p>
                </div>
                <div className="ps-5 pe-5">
                    <div className="email-input-container">
                        <label htmlFor="InputEmail" className="form-label email-password-label">Email</label>
                            <input 
                                autoFocus 
                                type="email" 
                                aria-describedby="emailHelp" 
                                id="InputEmail" 
                                className="form-control email-input"  
                                ref={userEmailInputRef} 
                                onChange={(e) => setUserEmailInput(e.target.value)}                           
                            />
                    </div>
                    { 
                    invalidEmailAddressErrorMessage ?
                        <div className="d-flex mt-1">
                            <AiOutlineExclamationCircle className="forgot-email-alert-mark fs-1 me-1"/>
                                <p className="forgot-email-alert-message text-center">Invalid email address. Please make sure you've entered a valid email and try again.</p>
                        </div>  
                    :
                        null
                    }
                    <div className="mt-4">
                            <button 
                            type="submit"
                            className="btn w-100 fs-5 send-email-button"
                            onClick={sendUserEmail}
                            >Send email</button>
                    </div>
                </div>
                <hr className="mt-4"/>
                <div className="d-flex justify-content-center">
                    <Link className="back-to-sign-in-link mb-2 fw-bold" to={"/login"}>Back to sign in</Link>
                </div>
            </div>
        </div>
  )
}

export default ForgotPassword;