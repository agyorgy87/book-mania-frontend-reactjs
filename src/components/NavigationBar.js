import React from 'react';
import "../css/NavigationBar.css";
import {ImBooks} from "react-icons/im";
import { CgShoppingCart } from "react-icons/cg";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import { Link } from "react-router-dom";


const NavigationBar = () => {

    const userData = useContext(UserContext);

    const logout = () => {
        userData.setValue({});
        localStorage.removeItem("token")
    }

    return (  
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid w-100">  
                    <Link to={"/"} className="navbar-brand pt-3 ps-3">                    
                        <p className="name-of-the-website">BOOK MANIA</p> 
                        <ImBooks className="ms-2 icon"/>
                    </Link>            
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item navigation-menus">
                                <Link to={"/"} className="nav-link active fs-4" style={{ color: "#EEE9DA"}}>HOME</Link>
                            </li>
                            <li className="nav-item navigation-menus">
                                <Link to={"/books"} className="nav-link fs-4" style={{ color: "#EEE9DA"}}>BOOKS</Link>
                            </li>
                            <li className="nav-item navigation-menus">
                                <Link to={"/contact"} className="nav-link fs-4" style={{ color: "#EEE9DA"}}>CONTACTS</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {
                                userData.value.jwt ? 
                                <li className="nav-item navigation-menus">
                                    <Link to={"/wishlist"} className="nav-link fs-4" style={{ color: "#EEE9DA"}}>Hi, {userData.value.firstName}</Link>      
                                </li>
                                :
                                null
                            }
                            {
                                userData.value.jwt ?
                                <li className="nav-item navigation-menus me-3">
                                    <button className="nav-link fs-4 logout-button" style={{color: "#EEE9DA"}} onClick={logout}>LOGOUT</button>
                                </li>
                                :
                                <li className="nav-item navigation-menus me-3">
                                    <Link to={"/login"} className="nav-link fs-4" style={{ color: "#EEE9DA"}}>LOGIN</Link>
                                </li>
                            }
                            <li className="nav-item navigation-menus">
                                <Link to={"/cart"} className="nav-link" style={{color: "#EEE9DA"}}>< CgShoppingCart className="fs-2"/></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavigationBar;
