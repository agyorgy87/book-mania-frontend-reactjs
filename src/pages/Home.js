import '../css/Home.css';
import NavigationBar from '../components/NavigationBar.js';
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { BookContext } from "../context/BookContext.js";
import { AiOutlineHeart } from "react-icons/ai"

const Home = () => {

    const bookDetails = useContext(BookContext);

    const [newness, setNewness] = useState([]);
    const [onlyKing, setOnlyKing] = useState([]);
    const [bestlineNotLikeCooking, setBestlineNotLikeCooking] = useState([]);

    useEffect(() => {  

        fetch("http://localhost:4000/get-all-by-newness/1")
            .then(data => data.json())
            .then(parsedData => {
            setNewness(parsedData)
        })

        fetch("http://localhost:4000/get-all-by-author/Stephen%20King")
            .then(data => data.json())
            .then(parsedData => {
            setOnlyKing(parsedData)
        })

        fetch("http://localhost:4000/get-all-by-publisher-and-not-genre-type/Bestline/Cooking")
            .then(data => data.json())
            .then(parsedData => {
            setBestlineNotLikeCooking(parsedData)
        })

    }, [])

    //axios

    return (
        <div className="home-page">
            <div>
                <NavigationBar/>
            </div>
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
            <div className="row"> 
                <div> 
                    <h1 className="d-flex flex-row ps-5">Newness</h1>    
                </div> 
                    <div className="d-flex justify-content-around ps-5 col-xl-">
                        {
                            newness.map((book, index) => (
                                <div class="card mb-3 border-0 " style={{maxWidth: "100vh"}}>
                                    <div class="row g-0">
                                        <div class="col-md-5">
                                            <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} class="img-fluid rounded-0" alt="..." style={{maxHeight: "100%"}}/>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="card-body pt-0">
                                                <h5 class="card-text ">{book.title}</h5>
                                                <p class="card-text">{book.author_name}</p>
                                                <h4 class="card-text">{book.price} $</h4>
                                            </div>
                                            <div className="card-body">
                                            <p><i class="bi bi-heart me-1"></i>Add To Wishlist</p>
                                            {/*<i class="bi bi-heart"></i> -> filled heart icon*/}
                                            <button type="button" className="add-to-cart-buttons">Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div> 
                
                <div>
                stephen king books
                <div className="row w-100 d-flex justify-content-center">                
                    {
                        onlyKing.map((book, index) => (
                            <div class="card mb-3 border-0" style={{maxWidth: "400px"}}>
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} class="img-fluid rounded-0" alt="..." style={{maxHeight: "100%"}}/>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body pt-0">
                                            <h5 class="card-text ">{book.title}</h5>
                                            <p class="card-text">{book.author_name}</p>
                                            <h4 class="card-text">{book.price} $</h4>
                                        </div>
                                        <div className="card-body">
                                        <p><i class="bi bi-heart me-1"></i>Add To Wishlist</p>
                                        {/*<i class="bi bi-heart"></i> -> filled heart icon*/}
                                        <button type="button" className="add-to-cart-buttons">Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                </div>
                <div>
                <div> 
                    <h1 className="">Bestline</h1>    
                    </div> 
                        {
                            bestlineNotLikeCooking.map((book, index) => (
                                <div class="card mb-3 me-1 border-0 " style={{maxWidth: "400px"}}>
                                    <div class="row g-0">
                                        <div class="col-md-5">
                                            <img src={"http://localhost:4000/books_img/" + book.img_directory + "/" + book.image} class="img-fluid rounded-0" alt="..." style={{maxHeight: "100%"}}/>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="card-body pt-0">
                                                <h5 class="card-text ">{book.title}</h5>
                                                <p class="card-text">{book.author_name}</p>
                                                <h4 class="card-text">{book.price} $</h4>
                                            </div>
                                            <div className="card-body">
                                            <p><i class="bi bi-heart me-1"></i>Add To Wishlist</p>
                                            {/*<i class="bi bi-heart"></i> -> filled heart icon*/}
                                            <button type="button" className="add-to-cart-buttons">Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div> 
        </div>
    );
}

export default Home;
