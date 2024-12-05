import "../css/EmailSentSuccessfullyModal.css"; 
import React from 'react';
import { useNavigate } from "react-router-dom";

const EmailSentSuccessfullyModal = () => {

    let navigate = useNavigate();

    return (
        <div className="overlay-email-sucessfully">  
            <div className="reset-password-modal-container mx-auto d-flex flex-column shadow-lg pt-4 pe-5 ps-5 bg-body-tertiary rounded">
                <div className="mb-4 d-flex justify-content-center"> 
                    <svg className="email-sent-successfully-svg" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                            <path className="circle" d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
                                <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621"/>
                        </g>
                        </svg>
                </div>
                <div className="d-flex justify-content-center mb-3"> 
                    <h4 className="modal-text text-center fs-5">A password reminder has been sent to your email address.</h4>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="navigate-to-login btn outline-none fs-5" onClick={() => {navigate("/login")}}>Sign in</button>
                </div>           
            </div>
        </div>
  )
}

export default EmailSentSuccessfullyModal;