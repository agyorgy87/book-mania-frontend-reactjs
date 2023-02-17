import '../css/Home.css';
import NavigationBar from '../components/NavigationBar.js';
//import { useState, useEffect } from "react";

const Home = () => {


    return (
        <div className="home-page">
            <div>
                <NavigationBar/>
            </div>
            <div className="main">
                <div className="coupon-code-container">
                    <div>
                        <img src={"http://localhost:4000/img/bookread.jpg"} className="coupon-code-picture" alt="book"/>
                    </div>
                    <div className="coupon-code-text-container">
                        <div>
                        "50% coupon code can be redeemed"
                        </div>
                    </div>
                </div>
                <div>                          
                4 different newness
                </div>
            </div>
        </div>
    );
}

export default Home;
