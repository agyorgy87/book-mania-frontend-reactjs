import '../css/Login.css';
import React from 'react';
import NavigationBar from '../components/NavigationBar.js';
import { useNavigate } from "react-router-dom";

const Login = () => {

    let navigate = useNavigate();

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
                                <form action="">
                                    <input type="text" name="" id="" className="form-control my-2 py-2" placeholder="Username"/>
                                    <input type="text" name="" id="" className="form-control my-4 py-2" placeholder="Password"/>
                                        <div className="text-center mt-3">
                                            <button className="btn btn-primary">Login</button>
                                                <a href="#" className="nav-link link-primary my-2" onClick={() => {navigate("/createaccount")}}>Already have an account?</a>
                                        </div>
                                </form>
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