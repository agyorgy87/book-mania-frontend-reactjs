import "../css/NavigationBar.css"; 
import React from 'react';
import { Link } from 'react-router-dom';
import { ImBooks } from "react-icons/im";
import { CgShoppingCart } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext.js";
import { CartContext } from "../context/CartContext.js";

const NavigationBar = () => {

    let navigate = useNavigate();

    const userData = useContext(UserContext);
    const cartData = useContext(CartContext);

    const logout = () => {
        userData.setValue({}); 
        localStorage.removeItem("token");
        navigate("/");
    }

    return (  
        <div>
            <nav className="navbar navbar-expand-xl">
                <div className="container-fluid">                     
                    <Link to={"/"} className="navbar-brand pt-3 ps-3">                    
                        <p className="name-of-the-website">BOOK MANIA</p> 
                        <ImBooks className="ms-2 icon"/>
                    </Link>  
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>          
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item navigation-menus">
                                <Link to={"/"} className="nav-link active fs-4">HOME</Link>
                            </li>
                            <li className="nav-item navigation-menus">
                                <Link to={"/books"} className="nav-link fs-4">BOOKS</Link>
                            </li>
                            <li className="nav-item navigation-menus">
                                <Link to={"/contact"} className="nav-link fs-4">CONTACTS</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {
                                userData.value.jwt ? 
                                <li className="nav-item navigation-menus">
                                    <Link to={"/wishlist"} className="nav-link user-welcome">Hi, {userData.value.firstName}</Link>     
                                </li>
                                :
                                null
                            } 
                            {
                                userData.value.jwt ?
                                <li className="nav-item navigation-menus">
                                    <Link className="nav-link login-logout-link" onClick={logout}>Log out</Link>
                                </li>
                                :
                                <li className="nav-item navigation-menus">
                                    <Link to={"/login"} className="nav-link login-logout-link" id="sign-in-button">Sign in</Link>
                                </li>
                            }
                            <li className="nav-item navigation-menus"> 
                                <Link to={"/cart"} className="nav-link">
                                    <CgShoppingCart className="fs-2"/>
                                    {
                                        cartData.value.length > 0 ?
                                        <span className="translate-middle badge rounded-pill cart-content-value">
                                            {cartData.value.length}
                                        </span>
                                        :
                                        null
                                    }                                  
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
    }
export default NavigationBar;
