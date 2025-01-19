import "../css/SuccessfulLoginModal.css";
import React from 'react';

const MessageSentSuccessfully = ({setOpenMessageSentSuccessfully}) => {

    return (
        <div className="overlay-login">  
            <div className="login-modal-container d-flex flex-column shadow-lg pt-4 ps-4 pe-4 bg-body-tertiary rounded"> 
                <div className="mb-4 d-flex justify-content-center">
                    <svg className="successfulLogin-svg" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                            <path className="circle" d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
                                <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621"/>
                        </g>
                        </svg> 
                </div>
                <div className="d-flex justify-content-center ps-3 pe-3 mb-4"> 
                    <h4 className="modal-text text-center fs-4">Message sent. We will respond soon.</h4> 
                </div>
                <div className="d-flex justify-content-center ps-4 pe-4">
                    <button className="navigate-to-home btn outline-none fs-5" onClick={() => setOpenMessageSentSuccessfully(false)}>OK</button>
                </div>           
            </div>
        </div>
  )
}

export default MessageSentSuccessfully; 