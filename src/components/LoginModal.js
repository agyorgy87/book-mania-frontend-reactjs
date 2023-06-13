import '../css/LoginModal.css';
import React from 'react';
import { Link } from 'react-router-dom'; 

const LoginModal = ({closeModal}) => {

    return (
        <div className="modal-background d-flex justify-content-center align-items-center">
            <div className="modal-container d-flex flex-column">
                <div className="close-modal-container">
                    <button className="close-modal-button" onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="modal-body">
                    You must Login to pay
                </div>
                <div className="modal-footer">
                    <Link>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;

/*

        */