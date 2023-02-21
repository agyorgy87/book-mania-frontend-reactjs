import '../css/Home.css';
import NavigationBar from '../components/NavigationBar.js';
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { BookContext } from "../context/BookContext.js";

const Home = () => {

    const bookDetails = useContext(BookContext);

    useEffect(() => {  
        fetch("http:/localhost:4000/get-all-newness")
            .then(data => data.json())
            .then(parsedData => {
                bookDetails.setValue(parsedData)
        })
    }, [])

    console.log(bookDetails);

    //axios

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
                {
                                    bookDetails.value.map((book, index) => (
                                        <div>  
                                            {book.title}
                                            {book.genre}
                                            {book.author}
                                        </div>
                                    ))
                                }
                </div>
                <div>
                books of more than 500 pages
                </div>
            </div>
        </div>
    );
}

export default Home;
