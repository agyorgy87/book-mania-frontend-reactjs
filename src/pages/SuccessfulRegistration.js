import React from 'react';
import "../css/SuccessfulRegistration.css";

const SuccessfulRegistration = () => {


  return (
    <>
    <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center">
            <div>
            <svg className="svg" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <path class="circle" d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
                        <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621"/>
                </g>
            </svg>
            </div>
            <div className="registration-text">
                <h3>Registration is successful</h3>
            </div>
            <div className="login-button">
                <button>Login</button>
            </div>
       </div>
    </div>
    </>
  )
}

export default SuccessfulRegistration;