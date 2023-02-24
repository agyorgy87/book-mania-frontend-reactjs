import React from 'react';
import "../css/NavigationBar.css";
import {ImBooks} from "react-icons/im";
import {SlBasket} from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {

    let navigate = useNavigate();

    return (
        <div className="navigation-bar">
            <div className="logo">
                <p>BOOK MANIA</p><ImBooks className="icon"/>
            </div>
            <div className="navigation-bar-and-basket">
                <div>
                    <ul className="navigation-bar-menus">
                        <li onClick={() => {navigate("/")}}>HOME</li>
                        <li onClick={() => {navigate("/books")}}>BOOKS</li>
                        <li onClick={() => {navigate("/contact")}}>CONTACT</li>
                    </ul>
                </div>
                <div>
                    <p className="sign-up">LOGIN</p>
                    <SlBasket className="basket-logo"/>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;