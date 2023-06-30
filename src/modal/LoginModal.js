import React from "react";
import "../css/LoginModal.css";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const LoginModal = (props) => {

    let navigate = useNavigate();

    return (
        <div className="overlay">
            <form className="form">
                <div className="d-flex flex-row-reverse">
                    <button className="modal-close-button" onClick={props.close}><GrClose/></button>
                </div>
                <div>
                    <h4>If you want to buy, please log in. If you don't have an account, register on the site and log in.</h4>
                </div>
                <div className="d-flex justify-content-around mt-5">
                    <button onClick={() => {navigate("/createaccount")}}>Create Account</button>
                    <button onClick={() => {navigate("/login")}}>Login</button>
                </div>           
            </form>
        </div>
    );
}

export default LoginModal;

