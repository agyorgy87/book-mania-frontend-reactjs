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
            {/*
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
            </div>
            */}
            <div className="d-flex justify-content-center">
                <div className="card mt-5 w-75 square border border-3">
                    <div className="row g-0" style={{ backgroundColor: "#fffaf0"}}>
                        <div className="col-md-6 rounded">
                            <img src={"http://localhost:4000/img/bookread.jpg"} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body rounded">
                                <div className="d-flex align-items-center flex-column mb-3">
                                    <div className="mb-5">
                                        <p className="card-title fs-1 d-flex justify-content-center discount-font mt-5" style={{ color: "#6096b4"}}>50% COUPON DISCOUNT</p>
                                        <p className="card-text discount-font">
                                        When paying for the book, enter your code in the "coupon code" field, so you will receive a 50% discount on your purchased books.
                                        We wish you a good reading!</p>
                                        <p className="card-text discount-font">You can find the coupon code in <a href="https://github.com/agyorgy87/book-mania-frontend-reactjs/blob/master/README.md"> my github repository, in CC.md file</a> :)</p>
                                    </div>
                                    <div className="d-flex align-items-center flex-column mt-5">
                                        <p className="card-text discount-font">
                                        "That's the thing about books. They let you travel without moving your feet."</p>
                                        <p className="card-text discount-font">- Jhumpa Lahiri</p>   
                                    </div>
                                </div>
                            </div>
                        </div>
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
    );
}

export default Home;
