import React from 'react';
import "../css/NavigationBar.css";
import { useNavigate } from "react-router-dom";
import {ImBooks} from "react-icons/im";
import { CgShoppingCart } from "react-icons/cg";



const NavigationBar = () => {

    let navigate = useNavigate();

    return (  
        <div>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand pt-3 ps-3" href="#">                    
                        <p className="fs-2 name-of-the-website" onClick={() => {navigate("/")}}>BOOK MANIA</p> 
                        <ImBooks className="ms-2 fs-1 icon" onClick={() => {navigate("/")}}/>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item navigation-menus">
                            <a class="nav-link active fs-3" aria-current="page" href="#" style={{ color: "#EEE9DA"}} onClick={() => {navigate("/")}}>Home</a>
                        </li>
                        <li class="nav-item navigation-menus">
                            <a class="nav-link fs-3" href="#" style={{ color: "#EEE9DA"}} onClick={() => {navigate("/books")}}>Books</a>
                        </li>
                        <li class="nav-item navigation-menus">
                            <a class="nav-link fs-3" href="#" style={{ color: "#EEE9DA"}} onClick={() => {navigate("/contact")}}>Contacts</a>
                        </li>
                    </ul>
                </div>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item navigation-menus">
                            <a class="nav-link fs-3" href="#" style={{ color: "#EEE9DA"}}>Login</a>
                        </li>
                        <li class="nav-item navigation-menus">
                            <a class="nav-link" href="#" style={{ color: "#EEE9DA"}}>< CgShoppingCart className="fs-1"/></a>
                        </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default NavigationBar;
