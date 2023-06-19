import '../css/Login.css';
import React, {useState, useRef}  from 'react';
import NavigationBar from '../components/NavigationBar.js';
import {ImBooks} from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import axios from "axios";

const Login = () => {

    let navigate = useNavigate();

    const userData = useContext(UserContext);
    
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState("");

    const [touched, setTouched] = useState(false);

    const [passwordShow, setPasswordShow] = useState(false);

    const togglePassword = () => {
        setPasswordShow(!passwordShow); 
    }

    const login = () => {

    let userObj = {
        email: userEmail,
        pass: password
    }

    axios.post("http://localhost:4000/auth", userObj)
        .then(response => {
            if(response.data.error) {
                setErrorMessage("Invalid Email address or Password. The password must be least 8 characters and must be least 1 number."); 
            }else{
                setSuccess("Successful Login")
                let stringifiedToken = JSON.stringify(response.data);
                localStorage.setItem("token", stringifiedToken);
                userData.setValue(response.data)
                setTimeout(() => {
                    navigate("/");
                }, "3000"); 
            }
        })       
    }

    const isValid = userEmail !== "";

    

    return (
        <div className="login-page">
            <div>
                <NavigationBar/>
            </div> 
            <section>
                <div className="mt-5 pt-5">
                    <form className="col-12 col-sm-8 col-md-6 m-auto border rounded">
                        <div className="d-flex justify-content-center">
                            <p className="name-of-the-website overwriteing!">BOOK MANIA</p> 
                                <ImBooks className="ms-2 icon"/>
                        </div>
                        <div>
                            <h3>Login</h3>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputEmail" className="form-label">Email address</label>
                            <input autoFocus type="email" value={userEmail} onBlur={() => setTouched(true)} className="form-control" id="InputEmail" aria-describedby="emailHelp" onChange={(e) => setUserEmail(e.target.value)}/>
                        </div>
                        {touched ? 
                            (isValid ? 
                                null 
                                :
                                <div class="alert alert-danger" role="alert">
                                    The email address is not filled.
                                </div>)
                        : null}
                        <div className="mb-3">
                            <label htmlFor="InputPassword" className="form-label">Password</label>
                            <div className="password-container">                               
                                <input type={passwordShow ? "text" : "password"} className="password-input" id="InputPassword" onChange={(e) => setPassword(e.target.value)}/>                   
                                    { passwordShow ?
                                        <i className="eye-icons bi bi-eye text-dark" onClick={togglePassword}></i>                                      
                                        :
                                        <i className="eye-icons bi bi-eye-slash text-dark" onClick={togglePassword}></i>
                                    }                               
                            </div>
                        </div>
                        <div>
                            {
                                success ? 
                                    <div class="alert alert-success" role="alert">
                                        {success}
                                    </div>
                            :
                                null
                            }
                        </div>                
                        <div>
                            {
                                errorMessage ? 
                                    <div class="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                            :
                                null
                            }
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={login}>Submit</button>
                        <a href="#" className="nav-link link-primary my-2" onClick={() => {navigate("/createaccount")}}>Already have an account?</a>
                    </form>
                </div>       
            </section>
        </div>
        
    )
}

export default Login