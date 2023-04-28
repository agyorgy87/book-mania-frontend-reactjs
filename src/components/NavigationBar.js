import React from 'react';
import "../css/NavigationBar.css";
import { useNavigate } from "react-router-dom";
import {ImBooks} from "react-icons/im";
import { CgShoppingCart } from "react-icons/cg";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";


const NavigationBar = () => {

    let navigate = useNavigate();

    const userData = useContext(UserContext);

    const logout = () => {
        userData.setValue({});
        localStorage.removeItem("token")
    }

    return (  
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid w-100">  
                
                    <a className="navbar-brand pt-3 ps-3" href="#">                    
                        <p className="name-of-the-website" onClick={() => {navigate("/")}}>BOOK MANIA</p> 
                        <ImBooks className="ms-2 icon" onClick={() => {navigate("/")}}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item navigation-menus">
                            <a className="nav-link active fs-4" aria-current="page" href="#" style={{ color: "#EEE9DA"}} onClick={() => {navigate("/")}}>HOME</a>
                        </li>
                        <li className="nav-item navigation-menus">
                            <a className="nav-link fs-4" href="#" style={{ color: "#EEE9DA"}} onClick={() => {navigate("/books")}}>BOOKS</a>
                        </li>
                        <li className="nav-item navigation-menus">
                            <a className="nav-link fs-4" href="#" style={{ color: "#EEE9DA"}} onClick={() => {navigate("/contact")}}>CONTACTS</a>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {
                            userData.value.jwt ? 
                            <li className="nav-item navigation-menus">
                                <a className="nav-link fs-4" href="#" style={{ color: "#EEE9DA"}}>Hi, {userData.value.firstName} </a>      
                            </li>
                            :
                            null
                        }
                        {
                            userData.value.jwt ?
                            <li className="nav-item navigation-menus">
                                <a className="nav-link fs-4" href="#" style={{ color: "#EEE9DA"}} onClick={logout}>LOG OUT</a>
                            </li>
                            :
                            <li className="nav-item navigation-menus">
                                <a className="nav-link fs-4" href="#" style={{ color: "#EEE9DA"}} onClick={() => {navigate("/login")}}>LOGIN</a>
                            </li>
                        }
                        <li className="nav-item navigation-menus">
                            <a className="nav-link" href="#" style={{ color: "#EEE9DA"}}>< CgShoppingCart className="fs-2"/></a>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default NavigationBar;
