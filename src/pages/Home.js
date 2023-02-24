import '../css/Home.css';
import NavigationBar from '../components/NavigationBar.js';
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { BookContext } from "../context/BookContext.js";

const Home = () => {

    const bookDetails = useContext(BookContext);

    const [newness, setNewness] = useState([]);
    const [onlyKing, setOnlyKing] = useState([]);

    useEffect(() => {  

        fetch("http://localhost:4000/get-all-newness")
            .then(data => data.json())
            .then(parsedData => {
            setNewness(parsedData)
        })

        fetch("http://localhost:4000/get-all-stephen-king-books")
            .then(data => data.json())
            .then(parsedData => {
            setOnlyKing(parsedData)
        })

    }, [])

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
                    Newness
                    {
                        newness.map((book, index) => (
                            <div>  
                                <img src={"http://localhost:4000/books_img/" + book.image} alt="image"/>
                                {book.title}
                                {book.genre}
                                {book.author_name}
                            </div>
                        ))
                    }
                </div>
                <div>
                stephen king books
                    {
                        onlyKing.map((book, index) => (
                            <div>  
                                <img src={"http://localhost:4000/books_img/" + book.image} alt="image"/>
                                {book.title}
                                {book.genre}
                                {book.author_name}
                            </div>
                        ))
                    }
                </div>
                <div>
                success books from bestline publishing
                </div>
                
            </div>
        </div>
    );
}

export default Home;
