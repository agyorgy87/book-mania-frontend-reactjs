import '../css/Login.css';
import React, {useState}  from 'react';
import NavigationBar from '../components/NavigationBar.js';
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
    const [success, setSuccess] = useState("")

    const login = () => {

        let userObj = {
            email: userEmail,
            pass: password
        }

        axios.post("http://localhost:4000/auth", userObj)
            .then(response => {
                if(response.data.error) {
                    setErrorMessage("Invalid Email address or Password");                  
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

    return (
        <div>
            <div>
                <NavigationBar/>
            </div> 
            <section>
                <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-12 col-sm-8 col-md-6 m-auto">
                            <div className="card border-0 shadow">
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        <i className="bi bi-person" style={{fontSize: "3rem"}}></i>
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
                                        <input type="text" name="" id="" className="form-control my-2 py-2" placeholder="Username" onChange={(e) => setUserEmail(e.target.value)}/>
                                        <input type="text" name="" id="" className="form-control my-4 py-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                            <div className="text-center mt-3">
                                                <button className="btn btn-primary" onClick={login}>Login</button>
                                                    <a href="#" className="nav-link link-primary my-2" onClick={() => {navigate("/createaccount")}}>Already have an account?</a>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       
            </section>
        </div>
        
    )
}

export default Login