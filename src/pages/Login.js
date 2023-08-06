import '../css/Login.css';
import React, {useState }  from 'react';
import NavigationBar from '../components/NavigationBar.js';
import {ImBooks} from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate();

    const userData = useContext(UserContext);
    
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState("");

    const [touched, setTouched] = useState(false);

    const [passwordShow, setPasswordShow] = useState(false);

    const [passwordInfo, setPasswordInfo] = useState(false);

    const togglePassword = () => {
        setPasswordShow(!passwordShow); 
    }

    const login = (e) => {

    e.preventDefault();

    let userObj = {
        email: userEmail,
        pass: password
    }
        axios.post("http://localhost:4000/auth", userObj)
        .then(response => {
            if(response.data.error) {
                if(userEmail === "" && password === ""){
                    setErrorMessage("");
                }else{
                    setErrorMessage("Invalid Email address or Password."); 
                }   
            }
            else{
                setSuccess("Successful Login");
                let stringifiedToken = JSON.stringify(response.data);
                localStorage.setItem("token", stringifiedToken);
                setTimeout(() => { navigate("/") }, 3000);
                userData.setValue(response.data);               
            }
        })      
    }

    let emptyEmailInputErrorMessage;

    const emptyInputError = () => {
        if(userEmail === "" && password === ""){
            emptyEmailInputErrorMessage = false;
        }
        else if(userEmail === "" && password !== ""){
            emptyEmailInputErrorMessage = true;
        }
    }

    emptyInputError(); 

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
                            <label htmlFor="InputEmail" className="form-label">Email</label>
                            <input 
                                autoFocus 
                                type="email" 
                                aria-describedby="emailHelp" 
                                id="InputEmail" 
                                className="form-control email-password-input" 
                                value={userEmail} 
                                onBlur={() => setTouched(true)} 
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>                                           
                        {
                        touched ? 
                            (emptyEmailInputErrorMessage ? 
                                <div className="alert alert-danger ms-5 me-5 ps-4" role="alert">
                                    The email address is not filled.
                                </div> 
                                :
                                null
                                )
                        :
                        null
                        }                       
                        <div className="ms-5 me-5 mt-4 email-password-container">
                                <label htmlFor="InputPassword" className="form-label">Password</label>
                            <div className="password-container">                               
                                <input 
                                    type={passwordShow ? "text" : "password"} 
                                    className="form-control email-password-input" 
                                    id="InputPassword" 
                                    onChange={(e) => {setPassword(e.target.value); setPasswordInfo(true)} }
                                />                   
                                    { 
                                    passwordShow ?
                                    <i className="eye-icons bi bi-eye fs-4" onClick={togglePassword}></i>                                      
                                    :
                                    <i className="eye-icons bi bi-eye-slash fs-4" onClick={togglePassword}></i>
                                    }
                                    {
                                    passwordInfo ?
                                    <p className="password-help">Your password must be least 8 characters and minimum 1 number.</p>
                                    :
                                    null
                                    }                                               
                            </div>
                        </div>
                        <div>
                            {
                                success ? 
                                    <div className="alert alert-success" role="alert">
                                        {success}
                                    </div>
                            :
                                null
                            }
                        </div>                
                        <div>
                            {
                                errorMessage ? 
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                            :
                                null
                            }
                        </div>
                        <div className="login-button-container mt-5 ms-5 me-5 mb-4">
                            <button type="submit" className="btn w-100 h-100 login-button">Sign in</button>
                        </div>
                        <div className="d-flex justify-content-center mb-4">
                            <button className="forgot-password-button border-0 fw-bold">Forgot your password?</button>
                        </div>
                        <hr className="mt-2 mb-3"/>
                        <div className="d-flex justify-content-center">
                            <p className="mt-3 me-2 fs-5 fw-normal ask-account">Have an account?</p> <Link className="sign-up-link mt-3 text-decoration-none fs-5 fw-bold" to={"/createaccount"}>Sign up</Link>
                        </div>
                    </form>
                </div>       
            </section>
        </div>
        
    )
}

export default Login