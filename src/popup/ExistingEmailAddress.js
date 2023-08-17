import "../css/ExistingEmailAddress.css";
import React from "react";



const ExistingEmailAddress = (props) => { 

    return (
        <div className="overlay">
            <form className="form existing-email-container d-flex flex-column shadow-lg p-3 bg-body-tertiary rounded">
                <div className="d-flex justify-content-center mb-1">
                    <h4 className="alert-modal-text text-center pt-2">Already registered with this email address.</h4>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="close-button btn outline-none fs-5" onClick={props.close}>Close</button>
                </div>           
            </form>
        </div>
    );
}

export default ExistingEmailAddress;