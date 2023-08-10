import '../css/Login.css';
import React, { useState, useEffect }  from 'react';
import NavigationBar from '../components/NavigationBar.js';
import {ImBooks} from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiOutlineExclamationCircle } from "react-icons/ai"

const Login = () => {

    let navigate = useNavigate();

    const userData = useContext(UserContext);
    
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginMessage, setLoginMessage] = useState("");

    const [emailInputError, setEmailInputError] = useState(false);
    const [emailInputErrorMessage, setEmailInputErrorMessage] = useState(false);

    const [passwordInputError, setPasswordInputError] = useState(false);
    const [passwordInputErrorMessage, setPasswordInputErrorMessage] = useState(false);

    const [touched, setTouched] = useState(false);
    
    const [passwordShow, setPasswordShow] = useState(false);

    const [passwordInfo, setPasswordInfo] = useState(false);


    useEffect(() => {
        if(userEmail === "" && password !== "") {
            setEmailInputErrorMessage(true);
        }
    },[userEmail,password])


    useEffect(() => {
        if(userEmail.length > 0) {
            setEmailInputErrorMessage(false);
            setEmailInputError(false);
        }
    }, [userEmail])
    

    useEffect(() => {
        if(password === "") {
            setPasswordInfo(false);  
            setPasswordInputErrorMessage(false);
        }
        if(password.length > 0){
            setPasswordInfo(true);
            setPasswordInputError(false);
            setPasswordInputErrorMessage(false); 
        }   
    },[password])
    

    const togglePassword = () => {
        setPasswordShow(!passwordShow); 
    }

    const login = (e) => {
    if(userEmail === "" && password === ""){
        setLoginMessage("")
    }

    e.preventDefault();

    let userObj = {
        email: userEmail,
        pass: password
    }
        axios.post("http://localhost:4000/auth", userObj)
        .then(response => {
            if(response.data.error) {
                if(userEmail === "" && password === ""){
                    setPasswordInfo(false);
                    setEmailInputError(true);
                    setEmailInputErrorMessage(true);
                    setPasswordInputError(true);
                    setPasswordInputErrorMessage(true);
                }else if(userEmail !== "" && password === ""){
                    setPasswordInputError(true);
                    setPasswordInputErrorMessage(true);
                }else if(userEmail === "" && password !== ""){
                    setEmailInputError(true);
                    setEmailInputErrorMessage(true);
                }else{               
                    setLoginMessage("Invalid Email address or Password. Please try again.");
                    setEmailInputError(true);
                    setEmailInputErrorMessage(false);
                    setPasswordInfo(false);
                    setPasswordInputError(true);
                }   
            }
            else{
                setEmailInputError(false);
                setPasswordInputError(false);
                setLoginMessage("Successful Login.");
                let stringifiedToken = JSON.stringify(response.data);
                localStorage.setItem("token", stringifiedToken);
                setTimeout(() => { navigate("/") }, 2000);
                userData.setValue(response.data);               
            }
        })      
    }

    return (
        <div className="login-page">
            <div>
                <NavigationBar/>
            </div> 
            <section>
                <div className="mt-5">  
                    <form className="col-12 col-sm-8 col-md-4 m-auto form-container rounded shadow p-3 mb-5" onSubmit={login}>
                        <div className="d-flex justify-content-center mt-4 mb-3">
                            <div className="d-flex justify-content-center">
                                <p className="fs-2 login-name-of-the-website">BOOK MANIA</p> 
                                    <ImBooks className="ms-2 fs-2 book-mania-icon"/>
                            </div>
                        </div>
                        <div className="ps-5 pe-5 email-password-container">
                            <label htmlFor="InputEmail" className="form-label email-password-label">Email</label>
                            <input 
                                autoFocus 
                                type="email" 
                                aria-describedby="emailHelp" 
                                id="InputEmail" 
                                className={`form-control email-password-input 
                                ${emailInputError ? 'input-alert' : '' } 
                                ${emailInputErrorMessage ? 'input-alert' : ''}`}
                                value={userEmail} 
                                onBlur={() => setTouched(true)} 
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>                                           
                        {   touched ? 
                                (emailInputErrorMessage ? 
                                    <div className="mt-1 ms-5 me-5 d-flex">
                                        <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                            <p className="alert-message">Please enter an email.</p>
                                    </div>  
                                :
                                null)
                            :
                            null
                        }    
                        {   loginMessage ? 
                                <div className="mt-1 ms-5 me-5 d-flex">
                                    <AiOutlineExclamationCircle className="login-alert-mark fs-3 me-1"/>
                                    <p className="alert-message">{loginMessage}</p>
                                </div>
                                :
                                null
                        }                  
                        <div className="ms-5 me-5 mt-4 email-password-container">
                                <label htmlFor="InputPassword" className="form-label email-password-label">Password</label>
                            <div className="password-container">                               
                                <input 
                                    type={passwordShow ? "text" : "password"} 
                                    className={`form-control email-password-input ${passwordInputError ? 'input-alert' : ''}`}
                                    id="InputPassword" 
                                    onChange={(e) => {setPassword(e.target.value); setPasswordInfo(true)} }
                                />                   
                                    {   passwordShow ?
                                            <i className="eye-icons bi bi-eye fs-4" onClick={togglePassword}></i>                                      
                                            :
                                            <i className="eye-icons bi bi-eye-slash fs-4" onClick={togglePassword}></i>
                                    }
                                    {   passwordInfo ?
                                            <p className="password-help">Your password must be least 8 characters and minimum 1 number.</p>
                                            :
                                            null
                                    } 
                                    {   passwordInputErrorMessage ?
                                            <div className="d-flex mt-1">
                                                <AiOutlineExclamationCircle className="alert-mark fs-5 me-1"/>
                                                <p className="alert-message">Please enter a password.</p>
                                            </div>  
                                            :
                                            null
                                    }                                               
                            </div>
                        </div>             
                        <div className={`login-button-container mt-5 ms-5 me-5 mb-4`}>
                            <button type="submit" className="btn w-100 fs-5 login-button">Sign in</button>
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            <button className="forgot-password-button border-0 fw-bold">Forgot your password?</button>
                        </div>
                        <hr className="mt-2 mb-3"/>
                        <div className="d-flex justify-content-center">
                            <p className="mt-3 me-2 fs-5 fw-lighter ask-account">Have an account?</p> 
                            <Link className="sign-up-link mt-3 fs-5 fw-bold" to={"/createaccount"}>Sign up</Link>
                        </div>
                    </form>
                </div>       
            </section>
        </div>
        
    )
}

export default Login