import React from "react";
import "../css/Modal.css";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const LoginWarning = (props) => {

    let navigate = useNavigate();

    return (
        <div className="overlay">
            <form className="form d-flex flex-column shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <div className="d-flex flex-row-reverse modal-close-button-container">
                    <button className="modal-close-button" onClick={props.close}><IoMdClose/></button>
                </div>
                <div className="d-flex justify-content-center modal-text-container">
                    <h4 className="modal-text text-center">{props.message}</h4>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="navigate-to-login-button" onClick={() => {navigate("/login")}}>Login</button>
                </div>           
            </form>
        </div>
    );
}

export default LoginWarning;

