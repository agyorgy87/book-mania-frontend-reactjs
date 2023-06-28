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
                    <div className="d-flex justify-content-center">
                        <p className="login-name-of-the-website">BOOK MANIA</p> 
                            <ImBooks className="ms-4 book-mania-icon"/>
                    </div>
                    <form className="col-12 col-sm-8 col-md-4 m-auto border rounded form-container" onSubmit={login}>
                        <div className="d-flex justify-content-center mt-4 mb-3">
                            <h2 className="login-text">LOGIN</h2>
                        </div>
                        <div className="mb-3 ps-5 pe-5">
                            <label htmlFor="InputEmail" className="form-label">Email</label>
                            <input autoFocus type="email" value={userEmail} onBlur={() => setTouched(true)} className="form-control email-input" id="InputEmail" aria-describedby="emailHelp" onChange={(e) => setUserEmail(e.target.value)}/>
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
                        <div className="ms-5 me-5 mt-4">
                                <label htmlFor="InputPassword" className="form-label">Password</label>
                            <div className="password-container">                               
                                <input type={passwordShow ? "text" : "password"} className="form-control password-input" id="InputPassword" onChange={(e) => {setPassword(e.target.value); setPasswordInfo(true)} }/>                   
                                    { 
                                    passwordShow ?
                                    <i className="eye-icons bi bi-eye text-dark" onClick={togglePassword}></i>                                      
                                    :
                                    <i className="eye-icons bi bi-eye-slash text-dark" onClick={togglePassword}></i>
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
                        <div className="login-button-container mt-4 ms-5 me-5 mb-4">
                            <button type="submit" className="btn login-button">LOGIN</button>
                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            <Link to={"/forgotpassword"}>Forgot your password?</Link>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center mt-3">
                        <p className="terms-and-policy">Have an account? <Link to={"/createaccount"}>Create Account</Link></p>
                    </div>
                </div>       
            </section>
        </div>
        
    )
}

export default Login