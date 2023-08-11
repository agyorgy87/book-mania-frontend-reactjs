import "../css/SuccessfulLoginModal.css";
import React from 'react';
import { useNavigate } from "react-router-dom";

const SuccessfulLoginModal = () => {

    let navigate = useNavigate();

    return (
        <div className="overlay">
            <div className="login-modal-container d-flex flex-column shadow-lg pt-4 pe-5 ps-5 bg-body-tertiary rounded">
                <div className="mb-4 d-flex justify-content-center">
                    <svg className="successfulLogin-svg" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                            <path className="circle" d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
                                <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621"/>
                        </g>
                        </svg> 
                </div>
                <div className="d-flex justify-content-center ps-3 pe-3 mb-4">
                    <h4 className="modal-text fs-4">Successful login</h4>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="navigate-to-home btn outline-none fs-5" onClick={() => {navigate("/")}}>Home Page</button>
                </div>           
            </div>
        </div>
  )
}

export default SuccessfulLoginModal;